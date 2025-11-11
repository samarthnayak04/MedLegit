# backend/app/crud/legal.py
from sqlalchemy.orm import Session
from app.models.legal import LegalCase

def create_legal_case(db: Session, user_id: int, input_text: str, legal_issues: str, relevant_laws: str, result_json: str):
    db_obj = LegalCase(
        user_id=user_id,
        input_text=input_text,
        legal_issues=legal_issues,
        relevant_laws=relevant_laws,
        result_json=result_json
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj
