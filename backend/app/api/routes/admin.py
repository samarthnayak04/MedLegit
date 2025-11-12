from fastapi import APIRouter, Depends, HTTPException, Header
from app.api.dependencies import get_current_user,verify_admin
from sqlalchemy.orm import Session
from app.models.user import User
from app.models.fraud import FraudCase
from app.models.health import PneumoniaCase
from app.models.legal import LegalCase
from app.core.db import get_db

router = APIRouter()



@router.delete("/user/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db), _: bool = Depends(verify_admin)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(404, "User not found")
    db.delete(user)
    db.commit()
    return {"message": f"User {user_id} deleted"}


@router.delete("/pneumonia/{case_id}")
def delete_pneumonia_case(case_id: int, db: Session = Depends(get_db), _: bool = Depends(verify_admin)):
    case = db.query(PneumoniaCase).filter(PneumoniaCase.id == case_id).first()
    if not case:
        raise HTTPException(404, "Pneumonia case not found")
    db.delete(case)
    db.commit()
    return {"message": f"Pneumonia case {case_id} deleted"}


@router.delete("/legal/{case_id}")
def delete_legal_case(case_id: int, db: Session = Depends(get_db), _: bool = Depends(verify_admin)):
    case = db.query(LegalCase).filter(LegalCase.id == case_id).first()
    if not case:
        raise HTTPException(404, "Legal case not found")
    db.delete(case)
    db.commit()
    return {"message": f"Legal case {case_id} deleted"}


@router.delete("/insurance/{claim_id}")
def delete_insurance_claim(claim_id: int, db: Session = Depends(get_db), _: bool = Depends(verify_admin)):
    claim = db.query(FraudCase).filter(FraudCase.id == claim_id).first()
    if not claim:
        raise HTTPException(404, "Insurance claim not found")
    db.delete(claim)
    db.commit()
    return {"message": f"Insurance claim {claim_id} deleted"}
