from sqlalchemy import Column, Integer, Float, String, ForeignKey, Boolean,TIMESTAMP, func
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
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="fraud_cases")
