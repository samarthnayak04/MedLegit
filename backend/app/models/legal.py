# from sqlalchemy import Column, Integer, Text, ForeignKey, JSON, TIMESTAMP
# from sqlalchemy.orm import relationship
# from sqlalchemy.sql import func
# from app.core.db import Base

# class LegalCase(Base):
#     __tablename__ = "legal_cases"

#     id = Column(Integer, primary_key=True, autoincrement=True)
#     user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
#     case_text = Column(Text, nullable=False)
#     summary = Column(Text, nullable=False)
#     legal_issues = Column(JSON, nullable=False)
#     relevant_laws = Column(JSON, nullable=False)
#     recommendations = Column(JSON, nullable=True)
#     created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

#     user = relationship("User", back_populates="legal_cases")  # string reference avoids import
