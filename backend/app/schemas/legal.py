
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

# from pydantic import BaseModel, ConfigDict
# from datetime import datetime
# from typing import List, Optional
# class LegalCaseOut(BaseModel):
#     id: int
#     user_id: int
#     
#     legal_issues: List[str]
#     relevant_laws: List[str]
#     recommendations: Optional[List[str]] = []
#     created_at: datetime
#     model_config = ConfigDict(from_attributes=True)

