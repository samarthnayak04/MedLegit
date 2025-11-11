from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional, List
from datetime import datetime

from app.schemas.fraud import FraudCaseOut
from app.schemas.health import PneumoniaCaseOut
from app.schemas.legal import LegalAnalysisOut

class UserBase(BaseModel):
    id: int
    email: str
    # full_name: Optional[str] = None
    is_active: bool
    model_config = ConfigDict(from_attributes=True)

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str
class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    email: EmailStr
    first_name:str
    last_name:str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class DashboardActivity(BaseModel):
    date: datetime
    activity: str
    status: str

    class Config:
        from_attributes= True


class UserDashboardOut(BaseModel):
    user: UserOut
    fraud_cases: int
    medical_reports: int
    # legal_cases: int
    recent_activity: List[DashboardActivity]
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    
