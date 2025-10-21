from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import relationship

from datetime import datetime
from app.core.db import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    fraud_cases = relationship("FraudCase", back_populates="user")
    pneumonia_cases = relationship("PneumoniaCase", back_populates="user")
    # legal_cases = relationship("LegalCase", back_populates="user", cascade="all, delete-orphan")
