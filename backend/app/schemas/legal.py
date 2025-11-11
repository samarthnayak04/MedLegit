from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class LegalAnalysisCreate(BaseModel):
    input_text: str
    result_json: str

class LegalAnalysisOut(BaseModel):
    id: int
    user_id: int
    input_text: str
    result_json: str
    created_at: datetime

    class Config:
        orm_mode = True
