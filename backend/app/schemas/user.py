# backend/app/schemas/user.py
from pydantic import BaseModel, EmailStr,ConfigDict 

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    email: EmailStr

    # class Config:
    #     orm_mode = True #allows reading from sqlalchemy objectsyes
    model_config = ConfigDict(from_attributes=True)
# class UserHistoryOut:
    



class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
