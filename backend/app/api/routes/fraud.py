from fastapi import APIRouter, HTTPException, Depends,File,UploadFile
import io
from sqlalchemy.orm import Session
from typing import List
import pandas as pd

from app.schemas.fraud import FraudPredictionIn, FraudPredictionOut
from app.ml.fraud_model import fraud_model, FEATURE_NAMES
from app.core.db import get_db
from app.crud import fraud as crud_fraud
from app.core.security import get_current_user
from app.models.user import User

router = APIRouter()

@router.post("/json-claims", response_model=List[FraudPredictionOut])
async def predict_fraud(
    claims: List[FraudPredictionIn],
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not claims:
        raise HTTPException(status_code=400, detail="No claim data provided.")

    df = pd.DataFrame([c.dict() for c in claims])
    X = df[FEATURE_NAMES]

    try:
        predictions = fraud_model.predict(X)
        probabilities = fraud_model.predict_proba(X)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {e}")

    results = []
    for i, pred in enumerate(predictions):
        # Convert probability → percentage (0–100, rounded to 2 decimals)
        fraud_prob_percentage = round(probabilities[i] * 100, 2)

        out = FraudPredictionOut(
            Provider=df.iloc[i]["Provider"],
            PotentialFraud="Yes" if pred == 1 else "No",
            Fraud_Probability=fraud_prob_percentage
        )

        # Save to DB (percentage stored, not raw 0–1 float)
        crud_fraud.create_fraud_case(
            db=db,
            user_id=current_user.id,
            provider=out.Provider,
            potential_fraud=out.PotentialFraud,
            fraud_prob=fraud_prob_percentage
        )
        results.append(out)

    return results

@router.post("/insurance-claims", response_model=List[FraudPredictionOut])
async def upload_fraud_csv(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # 1. Check file type
    if not file.filename.lower().endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are supported")

    # 2. Load into DataFrame
    try:
        contents = await file.read()
        df = pd.read_csv(io.StringIO(contents.decode("utf-8")))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to parse CSV file: {e}")
    finally:
        await file.close()

    # 3. Check required features
    missing = [col for col in FEATURE_NAMES if col not in df.columns]
    if missing:
        raise HTTPException(
            status_code=400,
            detail=f"Missing required columns: {missing}",
        )

    # 4. Prepare data
    X = df[FEATURE_NAMES]

    try:
        predictions = fraud_model.predict(X)
        probabilities = fraud_model.predict_proba(X) # Probability of fraud (class=1)
    except Exception as e:
        print(f"ERROR: Model prediction failed for user {current_user.id}: {e}")
        raise HTTPException(
            status_code=500,
            detail="Internal Server Error: Failed to generate prediction.",
        )

    # 5. Format + save results
    results = []
    for i, pred in enumerate(predictions):
        fraud_prob_percentage = round(probabilities[i] * 100, 2)
        potential_fraud = "Yes" if pred == 1 else "No"
        provider = df.iloc[i]["Provider"] if "Provider" in df.columns else "Unknown"

        out = FraudPredictionOut(
            Provider=provider,
            PotentialFraud=potential_fraud,
            Fraud_Probability=fraud_prob_percentage,
        )

        try:
            crud_fraud.create_fraud_case(
                db=db,
                user_id=current_user.id,
                provider=provider,
                potential_fraud=potential_fraud,
                fraud_prob=fraud_prob_percentage,
            )
        except Exception as db_err:
            print(f"DB ERROR: Failed to save fraud case for user {current_user.id}: {db_err}")

        results.append(out)

    return results


@router.post("/public", response_model=List[FraudPredictionOut])
async def predict_upload_only(
    file: UploadFile = File(...),
):
    if not file.filename.lower().endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are supported")

    try:
        contents = await file.read()
        df = pd.read_csv(io.StringIO(contents.decode("utf-8")))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to parse CSV file: {e}")
    finally:
        await file.close()

    missing = [col for col in FEATURE_NAMES if col not in df.columns]
    if missing:
        raise HTTPException(
            status_code=400,
            detail=f"Missing required columns: {missing}",
        )

    
    X = df[FEATURE_NAMES]

    try:
        predictions = fraud_model.predict(X)
        probabilities = fraud_model.predict_proba(X)  # Probability of fraud (class=1)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {e}")

    # 5. Format results (no DB saving here)
    results = []
    for i, pred in enumerate(predictions):
        fraud_prob_percentage = round(probabilities[i] * 100, 2)
        potential_fraud = "Yes" if pred == 1 else "No"
        provider = df.iloc[i]["Provider"] if "Provider" in df.columns else "Unknown"

        out = FraudPredictionOut(
            Provider=provider,
            PotentialFraud=potential_fraud,
            Fraud_Probability=fraud_prob_percentage,
        )
        results.append(out)

    return results