from sqlalchemy import Column, Integer, Float, String, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.db import Base

class FraudCase(Base):
    __tablename__ = "insurance_claims"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    Provider = Column(String, nullable=False)
    PotentialFraud = Column(String, nullable=False)
    Fraud_Probability = Column(Float, nullable=False) #stored as percentage
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="fraud_cases")
