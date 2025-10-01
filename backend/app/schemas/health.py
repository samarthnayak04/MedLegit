from pydantic import BaseModel, ConfigDict
from datetime import datetime

class PneumoniaCaseOut(BaseModel):
    id: int
    user_id: int
    prediction: str
    confidence: float
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
