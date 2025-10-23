# app/api/routes/user.py
from app.schemas import user as user_schema
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.api.dependencies import get_current_user
from app.models.user import User
from app.models.fraud import FraudCase
from app.models.health import PneumoniaCase
# from app.models.legal import LegalCase
from app.schemas.user import UserDashboardOut, DashboardActivity,UserOut
from datetime import datetime,timezone
router = APIRouter()
# 1. Get current profile
@router.get("/profile", response_model=user_schema.UserOut)
def get_profile(current_user: User = Depends(get_current_user)):
    return current_user


# 3. Get all users (admin purpose)
@router.get("/all", response_model=list[user_schema.UserOut])
def get_all_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@router.get("/dashboard", response_model=UserDashboardOut)
async def get_dashboard(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Returns dashboard stats and top 5 latest user activities.
    """
    # Fetch all user-specific records
    fraud_cases = db.query(FraudCase).filter(FraudCase.user_id == current_user.id).all()
    medical_cases = db.query(PneumoniaCase).filter(PneumoniaCase.user_id == current_user.id).all()
    # legal_cases = db.query(LegalCase).filter(LegalCase.user_id == current_user.id).all()

    # --- Summary Counts ---
    fraud_count = len(fraud_cases)
    medical_count = len(medical_cases)
    # legal_count = len(legal_cases)

    # --- Build Activities ---
    activities = []

    for fc in fraud_cases:
        activities.append(DashboardActivity(
            date=fc.created_at or datetime.now(timezone.utc),
            activity="Fraud detection executed",
            status=f"Flagged: {fc.PotentialFraud}" if getattr(fc, "PotentialFraud", None) else "Completed"
        ))

    for mc in medical_cases:
        prediction = getattr(mc, "prediction", "Unknown")
        confidence = getattr(mc, "confidence", None)
        status = f"{prediction} ({confidence*100:.1f} % confident)" if confidence is not None else prediction

        activities.append(DashboardActivity(
            date=mc.created_at or  datetime.now(timezone.utc),
            activity="Pneumonia detection via X-ray",
            status=status
        ))

    # for lc in legal_cases:
    #     activities.append(DashboardActivity(
    #         date=lc.created_at,
    #         activity="Legal case analysis run",
    #         status="Report Ready"
    #     ))

    # Sort newest first
    activities.sort(key=lambda x: x.date, reverse=True)

    # Top 5 recent activities
    recent_activity = activities[:3]

    return UserDashboardOut(
        user=UserOut.from_orm(current_user),
        fraud_cases=fraud_count,
        medical_reports=medical_count,
        # legal_cases=legal_count,
        recent_activity=recent_activity,
     
    )

@router.get("/activities", response_model=list[DashboardActivity])
def get_all_activities(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    activities = []

    fraud_cases = db.query(FraudCase).filter(FraudCase.user_id == current_user.id).all()
    medical_cases = db.query(PneumoniaCase).filter(PneumoniaCase.user_id == current_user.id).all()

    for fc in fraud_cases:
        activities.append(DashboardActivity(
            date=fc.created_at or datetime.now(timezone.utc),
            activity="Fraud detection executed",
            status=f"Flagged: {fc.PotentialFraud}" if getattr(fc, "PotentialFraud", None) else "Completed"
        ))

    for mc in medical_cases:
        prediction = getattr(mc, "prediction", "Unknown")
        confidence = getattr(mc, "confidence", None)
        status = f"{prediction} ({confidence*100:.1f} % confident)" if confidence is not None else prediction
        activities.append(DashboardActivity(
            date=mc.created_at or datetime.now(timezone.utc),
            activity="Pneumonia detection via X-ray",
            status=status
        ))
         # for lc in legal_cases:
    #     activities.append(DashboardActivity(
    #         date=lc.created_at,
    #         activity="Legal case analysis run",
    #         status="Report Ready"
    #     ))

    activities.sort(key=lambda x: x.date, reverse=True)
    return activities
