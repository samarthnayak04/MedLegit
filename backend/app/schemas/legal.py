
from pydantic import BaseModel
from datetime import datetime
from typing import Optional



class LegalAnalysisOut(BaseModel):
    id: int
    user_id: int
    top_issue: str | None = None
    confidence_score: float | None = None
    input_text: str | None = None
    created_at: datetime

    class Config:
        from_attributes = True


