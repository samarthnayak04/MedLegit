# from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
# from sqlalchemy.orm import Session
# from app.core.security import get_current_user
# from app.core.db import get_db
# from app.ml import legal_agent
# from app.crud import legal_crud
# from app.models.user import User
# import os
# import textract

# router = APIRouter()

# UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ALLOWED_EXTENSIONS = {"pdf", "docx", "txt"}

# def allowed_file(filename: str):
#     return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


# @router.post("/legal/analyze")
# async def analyze_legal_case(
#     file: UploadFile = File(...),
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     """
#     Uploads a legal document (PDF/DOCX/TXT),
#     analyzes it using AI, and saves the result in the DB.
#     """
#     try:
#         # ✅ Validate file type
#         if not allowed_file(file.filename):
#             raise HTTPException(status_code=400, detail="Unsupported file format")

#         # ✅ Save uploaded file
#         file_path = os.path.join(UPLOAD_FOLDER, file.filename)
#         with open(file_path, "wb") as f:
#             f.write(await file.read())

#         # ✅ Extract text from document
#         try:
#             text = textract.process(file_path).decode("utf-8")
#         except Exception:
#             raise HTTPException(status_code=500, detail="Failed to extract text from file")

#         # ✅ Run AI legal analysis
#         result = legal_agent.analyze(text)

#         

#         return {
#             "message": "Legal case analyzed and saved successfully",
#             "case_id": legal_case.id,
#             "summary": result.get("summary"),
#             "legal_issues": result.get("legal_issues"),
#             "relevant_laws": result.get("relevant_laws"),
#             "recommendations": result.get("recommendations")
#         }

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")
