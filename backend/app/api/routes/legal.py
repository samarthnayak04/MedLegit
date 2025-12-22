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

    file_bytes = await file.read()

    # ---- 1) Summarize file (non-critical failure allowed) ----
    try:
        document_summary = legal_agent.summarize_document_bytes(
            file_bytes, file.filename, max_sentences=3
        )
    except Exception:
        document_summary = ""  # fallback if summarizer fails

    # ---- 2) Extract text for analysis ----
    try:
        text_to_analyze = legal_agent.extract_text_from_bytes(file_bytes, file.filename).strip()
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))

    if not text_to_analyze:
        raise HTTPException(status_code=400, detail="Uploaded file contained no readable text.")

    # ---- 3) Run LLM-based legal analysis ----
    analysis_text = document_summary or text_to_analyze[:1000]
    result = legal_agent.analyze_legal(analysis_text)


    implications = result.get("legal_implications", []) or []
    top = implications[0] if implications and isinstance(implications[0], dict) else None

    top_issue = top.get("issue") if top else None

    # Normalize confidence score: Always store float, never None
    raw_score = top.get("confidence_score") if top else None
    try:
        confidence_score = float(raw_score) if raw_score is not None else 0.0
    except Exception:
        confidence_score = 0.0

    # ---- 4) Save analysis record ----
    try:
        db_obj = crud_legal.create_legal_case(
    db=db,
    user_id=current_user.id,
    top_issue=top_issue,
    confidence_score=confidence_score
    )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

    # ---- 5) Return response back to the user ----
    response: dict[str, Any] = {
        "user_id": current_user.id,
        "analysis_id": getattr(db_obj, "id", None),
        "file_name": file.filename,
        "document_summary": document_summary,
        "analysis": result,
    }

    return JSONResponse(response)
