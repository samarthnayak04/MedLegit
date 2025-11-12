from sqlalchemy.orm import Session
from app.models.legal import LegalCase

def create_legal_case(db: Session, user_id: int, top_issue: str,
                              confidence_score: float):
    db_obj = LegalCase(
        user_id=user_id,
        top_issue=top_issue,
        confidence_score=confidence_score,
        
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj


def get_user_legal_cases(db: Session, user_id: int):
    return db.query(LegalCase).filter(LegalCase.user_id == user_id).all()
