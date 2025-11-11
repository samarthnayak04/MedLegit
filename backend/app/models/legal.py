from sqlalchemy import Column, Integer, Text, ForeignKey, TIMESTAMP, func
from sqlalchemy.orm import relationship
from app.core.db import Base

class LegalCase(Base):
    __tablename__ = "legal_cases"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=True)
    input_text = Column(Text)
    legal_issues = Column(Text)
    relevant_laws = Column(Text)
    result_json = Column(Text)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="legal_cases")
