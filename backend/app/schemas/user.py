from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional, List
from datetime import datetime

from app.schemas.fraud import FraudCaseOut
from app.schemas.health import PneumoniaCaseOut
# from app.schemas.legal import LegalCaseOut

class UserBase(BaseModel):
    id: int
    email: str
    full_name: Optional[str] = None
    is_active: bool
    model_config = ConfigDict(from_attributes=True)

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    email: EmailStr
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class UserHistoryOut(BaseModel):
    user: UserOut
    fraud_cases: List[FraudCaseOut] = []
    pneumonia_cases: List[PneumoniaCaseOut] = []
    # legal_cases: List[LegalCaseOut] = []

    model_config = ConfigDict(from_attributes=True)

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
