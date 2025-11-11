from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
import json
import docx2txt
import PyPDF2
from io import BytesIO

from app.core.db import get_db
from app.crud import legal as crud_legal
from app.ml import legal_agent
from app.api.dependencies import get_current_user  # your auth dependency

router = APIRouter()

# ------------------------
# Text extraction utilities
# ------------------------
def extract_text_from_file(uploaded_file: UploadFile):
    filename = uploaded_file.filename.lower()

    if filename.endswith(".docx"):
        text_data = docx2txt.process(uploaded_file.file)
        return text_data

    elif filename.endswith(".pdf"):
        text_data = ""
        try:
            pdf_reader = PyPDF2.PdfReader(BytesIO(uploaded_file.file.read()))
            for page in pdf_reader.pages:
                text_data += page.extract_text() or ""
            return text_data
        except Exception:
            raise HTTPException(status_code=400, detail="Unable to read PDF file")

    else:
        raise HTTPException(status_code=400, detail="Unsupported file format. Use PDF or DOCX.")


# ------------------------
# Main analysis endpoint
# ------------------------
@router.post("/analyze")
async def analyze_legal_endpoint(
    text_input: str = Form(None),
    file: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)  # ensures authentication
):
    """
    Analyze either raw text or uploaded document for legal implications.
    Only authenticated users can run this.
    """

    # Validate input
    if not text_input and not file:
        raise HTTPException(status_code=400, detail="Please provide either text or a document.")

    # Extract text from file if provided
    if file:
        extracted_text = extract_text_from_file(file)
        text_to_analyze = extracted_text.strip()
    else:
        text_to_analyze = text_input.strip()

    if not text_to_analyze:
        raise HTTPException(status_code=400, detail="No valid text found for analysis.")

    # Run ML legal analysis
    result = legal_agent.analyze_legal(text_to_analyze)
    result_str = json.dumps(result)


    # Use current authenticated user's ID
    user_id = current_user.id

#         return {
#             "message": "Legal case analyzed and saved successfully",
#             "case_id": legal_case.id,
#             
#             "legal_issues": result.get("legal_issues"),
#             "relevant_laws": result.get("relevant_laws"),
#             "recommendations": result.get("recommendations")
#         }


    # Save to DB
    db_obj = crud_legal.create_legal_case(
        db=db,
        user_id=user_id,
        input_text=text_to_analyze,
        legal_issues=json.dumps(result.get("legal_implications", [])),
        relevant_laws=json.dumps(result.get("relevant_laws", [])),
        result_json=result_str
    )

    return JSONResponse({
        "user_id": db_obj.user_id,
        "input_text": db_obj.input_text[:300] + ("..." if len(db_obj.input_text) > 300 else ""),
        "analysis": result
    })
