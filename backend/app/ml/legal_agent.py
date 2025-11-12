# modules/legal_agent.py
import logging
import threading
from typing import List, Dict, Any, Optional
from io import BytesIO
import os
import re
from collections import Counter

from transformers import pipeline
from PyPDF2 import PdfReader
from docx import Document

logger = logging.getLogger(__name__)

# -----------------------------
# Legal Knowledge Base
# -----------------------------
LEGAL_ISSUES = {
    "lack of informed consent": {
        "law": "Indian Medical Council Regulations, 2002",
        "statute_quote": "A physician shall seek informed consent from the patient before performing any diagnostic or therapeutic procedure."
    },
    "medical negligence": {
        "law": "Indian Penal Code (Section 304A)",
        "statute_quote": "Whoever causes death by a rash or negligent act shall be punished with imprisonment or fine."
    },
    "causing injury by negligence": {
        "law": "Indian Penal Code (Section 337)",
        "statute_quote": "Whoever causes hurt to any person by doing any act so rashly or negligently as to endanger human life shall be punished."
    },
    "delayed,improper treatment": {
        "law": "Consumer Protection Act, 2019 / IMC Regulations, 2002",
        "statute_quote": "Every physician shall act with reasonable skill and knowledge; delay or lack of diligence causing harm may amount to deficiency in service."
    },
    "documentation lapse": {
        "law": "Indian Medical Council (Professional Conduct, Etiquette and Ethics) Regulations, 2002",
        "statute_quote": "Physicians shall maintain proper medical records and make them available to patients or legal authorities when required."
    },
    "confidentiality breach": {
        "law": "IMC Regulations, 2002 – Clause 7.14",
        "statute_quote": "The physician shall not disclose the secrets of a patient that have been learned in the exercise of his or her profession except under compelling circumstances."
    },
    "false medical certificate or report": {
        "law": "Indian Penal Code (Section 197) / IMC Regulations, 2002",
        "statute_quote": "Issuing a false certificate or document by a medical practitioner is a punishable offence."
    },
    "unqualified or unethical practice": {
        "law": "IMC Regulations, 2002 – Chapter 1",
        "statute_quote": "A physician shall not permit or aid unqualified persons to practice medicine or perform professional duties."
    }
}

LEGAL_LABELS: List[str] = list(LEGAL_ISSUES.keys())

# -----------------------------
# Lazy, thread-safe classifier loader (TF-first)
# -----------------------------
_classifier = None
_classifier_lock = threading.Lock()

def get_classifier(model_name: str = "facebook/bart-large-mnli",
                   prefer_framework: Optional[str] = None,
                   device: int = -1):
    """
    Returns a singleton transformers pipeline for zero-shot classification.
    prefer_framework: "tf" or "pt" or None (auto-detect).
    device: -1 for CPU, 0+ for GPU.
    """
    global _classifier
    if _classifier is None:
        with _classifier_lock:
            if _classifier is None:
                framework = prefer_framework
                # Try to auto-detect PyTorch (prefer pt if torch available)
                if framework is None:
                    try:
                        import torch  # type: ignore
                        framework = "pt"
                    except Exception:
                        framework = "tf"

                if framework == "pt":
                    # If running PT, ensure TF disabled if needed
                    os.environ.setdefault("TRANSFORMERS_NO_TF", "1")

                try:
                    _classifier = pipeline(
                        "zero-shot-classification",
                        model=model_name,
                        framework=framework,
                        device=device,
                    )
                    logger.info("Loaded classifier model=%s framework=%s device=%s", model_name, framework, device)
                except Exception as exc:
                    logger.exception("Failed to load transformer pipeline: %s", exc)
                    raise

    return _classifier

# -----------------------------
# File text extraction helper (NEW)
# -----------------------------
def extract_text_from_bytes(file_bytes: bytes, filename: str) -> str:
    """
    Extract text from a PDF or DOCX file provided as bytes.
    Returns extracted text (may be empty string).
    """
    name = filename.lower()
    if name.endswith(".pdf"):
        try:
            reader = PdfReader(BytesIO(file_bytes))
            text = []
            for page in reader.pages:
                page_text = page.extract_text() or ""
                text.append(page_text)
            return "\n".join(text).strip()
        except Exception as e:
            logger.exception("PDF extraction failed: %s", e)
            return ""
    elif name.endswith(".docx"):
        try:
            # python-docx can accept a file-like
            doc = Document(BytesIO(file_bytes))
            paragraphs = [p.text for p in doc.paragraphs if p.text]
            return "\n".join(paragraphs).strip()
        except Exception as e:
            logger.exception("DOCX extraction failed: %s", e)
            return ""
    else:
        raise ValueError("Unsupported file type. Use PDF or DOCX.")

# -----------------------------
# Fast extractive document summarizer (NEW)
# -----------------------------
def fast_extractive_summary(text: str, max_sentences: int = 3, min_sentence_length: int = 20) -> str:
    """
    Fast extractive summary of the original document (2-3 sentences).
    - Splits text into sentences, scores them by word-frequency, picks top N.
    - Preserves original order for readability.
    - Extremely fast (no models), suitable for immediate UI display.
    """
    if not text:
        return ""

    # Split into sentences (keeps punctuation)
    sentences = re.split(r'(?<=[.!?])\s+', text.strip())

    # Filter out very short sentences (like headers) to keep summary meaningful
    sentences = [s.strip() for s in sentences if len(re.sub(r'\s+', ' ', s.strip())) >= min_sentence_length]
    if not sentences:
        # fallback to raw short text
        sentences = re.split(r'(?<=[.!?])\s+', text.strip())

    # If doc is already short, return it (or first N sentences)
    if len(sentences) <= max_sentences:
        return " ".join(sentences).strip()

    # Build word frequency (ignore very short words crudely by length only)
    words = re.findall(r'\w+', text.lower())
    words = [w for w in words if len(w) > 2]  # drop 1-2 char words
    freq = Counter(words)

    # Score sentences by sum of word frequencies
    scored = []
    for s in sentences:
        s_words = re.findall(r'\w+', s.lower())
        s_words = [w for w in s_words if len(w) > 2]
        score = sum(freq.get(w, 0) for w in s_words)
        scored.append((score, s))

    # Pick top N sentences
    top = sorted(scored, key=lambda x: x[0], reverse=True)[:max_sentences]
    top_sentences = [s for _, s in top]

    # Preserve original order
    ordered = [s for s in sentences if s in top_sentences]

    summary = " ".join(ordered).strip()
    summary = re.sub(r'\s+', ' ', summary).strip()
    return summary

def summarize_document_bytes(file_bytes: bytes, filename: str, max_sentences: int = 3) -> str:
    """
    Convenience helper: extract text from file bytes and return fast extractive summary.
    Use this from your route when you only want the document summary without running the model.
    """
    text = extract_text_from_bytes(file_bytes, filename)
    return fast_extractive_summary(text, max_sentences=max_sentences)

# -----------------------------
# Fast extractive summary helper for analysis results (EXISTING)
# -----------------------------
def build_extractive_summary(result: Dict[str, Any], max_issues: int = 2) -> str:
    """
    Build a short 2-3 sentence extractive summary from the analysis dict.
    Very fast (string operations only).
    """
    # prefer an existing summary returned by model if present
    if isinstance(result.get("summary"), str) and result.get("summary").strip():
        return result["summary"].strip()

    parts = []
    implications = result.get("legal_implications", []) or []
    recommendations = result.get("recommendations", []) or []

    # If legal_implications is a list of dicts, use them; otherwise fallback
    if implications and isinstance(implications[0], dict):
        for imp in implications[:max_issues]:
            issue = imp.get("issue")
            conf = imp.get("confidence_score")
            if issue:
                if conf is not None:
                    # confidence_score stored as e.g. 0.99 -> show as percentage
                    try:
                        parts.append(f"{issue} (confidence {conf*100:.0f}%).")
                    except Exception:
                        parts.append(f"{issue}.")
                else:
                    parts.append(f"{issue}.")
    else:
        # fallback: if model returned a string message
        if isinstance(implications, str):
            parts.append(implications)

    if recommendations:
        first_rec = recommendations[0].rstrip(".")
        parts.append(f"Suggested action: {first_rec}.")

    summary = " ".join(parts[:3]).strip()
    return summary

# -----------------------------
# Core Analysis Function (unchanged behaviour, attaches analysis summary)
# -----------------------------
def analyze_legal(text: str, confidence_threshold: float = 0.6) -> Dict[str, Any]:
    """
    Perform zero-shot classification to detect legal issues and produce recommendations.
    Attaches a fast extractive summary of the analysis in result['summary'].
    """
    if not text or not text.strip():
        return {
            "legal_implications": [],
            "recommendations": [],
            "message": "No valid text provided for analysis.",
        }

    try:
        # Keep prefer_framework None to auto-detect (or pass 'pt' if you have torch)
        classifier = get_classifier(prefer_framework=None)
    except Exception as e:
        return {
            "legal_implications": [],
            "recommendations": [],
            "message": f"Model load failed: {str(e)}",
        }

    try:
        classification = classifier(
            text,
            candidate_labels=LEGAL_LABELS,
            multi_label=True
        )
    except Exception as e:
        logger.exception("Model inference error: %s", e)
        return {
            "legal_implications": [],
            "recommendations": [],
            "message": f"Error during model inference: {str(e)}",
        }

    legal_implications = []
    for label, score in zip(classification.get("labels", []), classification.get("scores", [])):
        if score >= confidence_threshold:
            legal_implications.append({
                "issue": label,
                "confidence_score": round(float(score), 2),
                "relevant_law": LEGAL_ISSUES[label]["law"],
                "statute_quote": LEGAL_ISSUES[label]["statute_quote"]
            })

    if not legal_implications:
        result = {
            "legal_implications": [],
            "recommendations": [],
            "message": "No legal implications.",
        }
        result["summary"] = build_extractive_summary(result)
        return result

    recommendations = []
    for item in legal_implications:
        issue = item["issue"]
        if issue == "lack of informed consent":
            recommendations.append("Ensure all consent forms are properly signed and stored.")
        elif issue == "delayed treatment":
            recommendations.append("Improve triage and emergency response protocols.")
        elif issue == "documentation lapse":
            recommendations.append("Maintain detailed and accurate medical documentation.")
        elif issue == "medical negligence":
            recommendations.append("Train staff on standard of care and procedural compliance.")

    result = {
        "legal_implications": legal_implications,
        "recommendations": sorted(list(set(recommendations))),
        "message": "Analysis completed successfully."
    }
    # attach a fast extractive summary of the analysis (not the document)
    
    return result
