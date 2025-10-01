from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.schemas import user as user_schema
from app.api.dependencies import get_current_user
from app.models.user import User
from app.models.fraud import FraudCase
# from app.models.health import PneumoniaCase
# from app.models.legal import LegalCase

router = APIRouter()

# 1. Get current profile
@router.get("/profile", response_model=user_schema.UserOut)
def get_profile(current_user: User = Depends(get_current_user)):
    return current_user

# 2. Get user history
@router.get("/history", response_model=user_schema.UserHistoryOut)
def get_history(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    fraud_cases = db.query(FraudCase).filter(FraudCase.user_id == current_user.id).all()

    # pneumonia_cases = db.query(PneumoniaCase).filter(PneumoniaCase.user_id == current_user.id).all()
    # legal_cases = db.query(LegalCase).filter(LegalCase.user_id == current_user.id).all()

    fraud_cases_out = [
        user_schema.FraudCaseOut(
            id=fc.id,
            # FIX: Use the exact PascalCase/TitleCase field names expected by FraudCaseOut
            Provider=fc.Provider,          # Changed from 'provider'
            PotentialFraud=fc.PotentialFraud,  # Changed from 'potential_fraud'
            Fraud_Probability=fc.Fraud_Probability, # Changed from 'fraud_prob'
            created_at=fc.created_at
        )
        for fc in fraud_cases
    ]
    
    return user_schema.UserHistoryOut(
        user=current_user,
        fraud_cases=fraud_cases_out,
        # pneumonia_cases=pneumonia_cases,
        # legal_cases=legal_cases
    )

# 3. Get all users (admin purpose)
@router.get("/all", response_model=list[user_schema.UserOut])
def get_all_users(db: Session = Depends(get_db)):
    return db.query(User).all()
