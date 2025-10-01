from fastapi import APIRouter, File, UploadFile, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

# 👈 IMPORT YOUR CRUD FUNCTION
from app.crud.health import create_pneumonia_case 

from app.core.db import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.health import PneumoniaCase
from app.schemas.health import PneumoniaCaseOut
from app.ml.pneumonia_model import pneumonia_model

router = APIRouter()

@router.post("/pneumonia", response_model=PneumoniaCaseOut)
async def predict_pneumonia(
    file: UploadFile = File(...),
    db: Session = Depends(get_db), # 👈 RE-ENABLED DB CONNECTION
    current_user: User = Depends(get_current_user)
):
    try:
        contents = await file.read()
        result, confidence = pneumonia_model.predict(contents)

        # 1. Call the CRUD function to save the data
        case = create_pneumonia_case(
            db=db,
            user_id=current_user.id,
            prediction=result,
            confidence=confidence,
        )
        # 2. Return the ORM object directly. s
        # This resolves the ResponseValidationError by including id, created_at, etc.
        return case 

    except Exception as e:
        # Error handling remains, but is now less likely for DB issues
        raise HTTPException(status_code=500, detail=f"Prediction failed: {e}")
    

@router.post("/public")
async def predict_pneumonia_public(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        result, confidence = pneumonia_model.predict(contents)

        # Direct response (no DB, no auth)
        return {
            "prediction": result,
            "confidence": confidence
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {e}")