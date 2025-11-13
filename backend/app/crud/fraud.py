from sqlalchemy.orm import Session
from app.models.fraud import FraudCase
from typing import List
from datetime import datetime, timezone
def create_fraud_case(db: Session, user_id: int, provider: str, potential_fraud: str, fraud_prob: float):
    # Ensure fraud_prob is stored as percentage (rounded to 2 decimals)
    fraud_prob_percentage = round(fraud_prob, 2)

    db_case = FraudCase(
        user_id=user_id,
        Provider=provider,
        PotentialFraud=potential_fraud,
        Fraud_Probability=fraud_prob_percentage,
        created_at=datetime.now(timezone.utc)
    )
    db.add(db_case)
    db.commit()
    db.refresh(db_case)
    return db_case

def get_user_fraud_cases(db: Session, user_id: int) -> List[FraudCase]:
    return db.query(FraudCase).filter(FraudCase.user_id == user_id).all()
