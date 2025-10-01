from sqlalchemy.orm import Session
from app.models.health import PneumoniaCase

def create_pneumonia_case(db: Session, user_id: str, prediction: str, confidence: float):
    case = PneumoniaCase(
        user_id=user_id,
        prediction=prediction,
        confidence=confidence
    )
    db.add(case)
    db.commit()
    db.refresh(case)
    return case

def get_user_cases(db: Session, user_id: str):
    return db.query(PneumoniaCase).filter(PneumoniaCase.user_id == user_id).all()
