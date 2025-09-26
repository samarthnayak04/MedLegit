from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
import pandas as pd

from app.schemas.fraud import FraudPredictionIn, FraudPredictionOut
from app.ml.fraud_model import fraud_model, FEATURE_NAMES
from app.core.db import get_db
from app.crud import fraud as crud_fraud
from app.core.security import get_current_user # <-- CORRECTED IMPORT LOCATION
# OR if you have a dedicated dependency file:
# from app.api.deps import get_current_user
from app.models.user import User

router = APIRouter()

@router.post("/insurance", response_model=List[FraudPredictionOut])
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
        out = FraudPredictionOut(
            Provider=df.iloc[i]["Provider"],
            PotentialFraud="Yes" if pred == 1 else "No",
            Fraud_Probability=probabilities[i]
        )
        # Save to DB
        crud_fraud.create_fraud_case(
            db=db,
            user_id=current_user.id,
            provider=out.Provider,
            potential_fraud=out.PotentialFraud,
            fraud_prob=out.Fraud_Probability
        )
        results.append(out)

    return results
