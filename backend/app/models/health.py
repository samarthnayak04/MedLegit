import uuid
from sqlalchemy import Column, String, Float, ForeignKey, TIMESTAMP, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import func
from sqlalchemy.orm import relationship
from app.models.user import User
from app.core.db import Base

class PneumoniaCase(Base):
    __tablename__ = "pneumonia_cases"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    prediction = Column(String(50), nullable=False)
    confidence = Column(Float, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="pneumonia_cases")