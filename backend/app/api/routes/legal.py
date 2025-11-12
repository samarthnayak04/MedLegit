# app/api/routes/legal.py
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
import json
from typing import Any

from app.core.db import get_db
from app.crud import legal as crud_legal
from app.ml import legal_agent
from app.api.dependencies import get_current_user

router = APIRouter()


@router.post("/analyze")
async def analyze_legal_endpoint(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user),
):
   

    if not file:
        raise HTTPException(status_code=400, detail="Please upload a PDF or DOCX file.")

    # read bytes
    file_bytes = await file.read()

    # 1) Create fast document summary (very quick)
    try:
        document_summary = legal_agent.summarize_document_bytes(file_bytes, file.filename, max_sentences=3)
    except Exception as e:
        # summarization should be lightweight; if it fails, continue but warn in response
        document_summary = ""
        logger_msg = f"Document summarization failed: {e}"
        # We don't raise here — we prefer to continue to analysis
        # but include a short warning in the returned analysis message if needed.

    # 2) Extract text for analysis
    try:
        text_to_analyze = legal_agent.extract_text_from_bytes(file_bytes, file.filename).strip()
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))

    if not text_to_analyze:
        raise HTTPException(status_code=400, detail="Uploaded file contained no readable text.")

    # 3) Run full legal analysis (this may load the model if not already loaded)
    result = legal_agent.analyze_legal(text_to_analyze)

    # 4) Extract top issue + confidence (if any)
    implications = result.get("legal_implications", []) or []
    top = implications[0] if implications and isinstance(implications[0], dict) else None
    top_issue = top.get("issue") if top else None
    confidence_score = top.get("confidence_score") if top else None

    # 5) Save minimal info to DB. Support both compact and legacy create_legal_case signatures.
    db_obj = None
    try:
        # Preferred compact signature (db, user_id, top_issue, confidence_score)
        db_obj = crud_legal.create_legal_case(
            db=db,
            user_id=current_user.id,
            top_issue=top_issue,
            confidence_score=confidence_score
        )
    except TypeError:
        # Fallback to older signature: store truncated input_text, legal_issues, relevant_laws, result_json
        try:
            db_obj = crud_legal.create_legal_case(
                db=db,
                user_id=current_user.id,
                input_text=(text_to_analyze[:2000] + ("..." if len(text_to_analyze) > 2000 else "")),
                legal_issues=json.dumps(implications if isinstance(implications, list) else []),
                relevant_laws=json.dumps(result.get("relevant_laws", [])),
                result_json=json.dumps(result)
            )
        except Exception as e:
            # If DB write fails, surface a 500 with the error
            raise HTTPException(status_code=500, detail=f"DB write failed: {e}")
    except Exception as e:
        # Any other error trying to save
        raise HTTPException(status_code=500, detail=f"DB write failed: {e}")

    # 6) Prepare response
    response: dict[str, Any] = {
        "user_id": current_user.id,
        "analysis_id": getattr(db_obj, "id", None),
        "file_name": file.filename,
        "document_summary": document_summary,
        "analysis": result,   # full analysis returned to client (not stored)
    }

    return JSONResponse(response)
