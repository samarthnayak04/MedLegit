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
