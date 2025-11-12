from sqlalchemy import Column, Integer, Text, ForeignKey, TIMESTAMP, func, Float
from sqlalchemy.orm import relationship
from app.core.db import Base

class LegalCase(Base):
    __tablename__ = "legal_cases"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # ✅ minimal storage
    top_issue = Column(Text, nullable=True)
    confidence_score = Column(Float, nullable=True)

    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="legal_cases")
