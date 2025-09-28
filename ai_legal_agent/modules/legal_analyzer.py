# modules/legal_analyzer.py

import os
from transformers import pipeline
from concurrent.futures import ThreadPoolExecutor, as_completed

# =====================
# Load HuggingFace models
# =====================

print("Loading summarization and zero-shot classification models...")
summarizer = pipeline(
    "summarization",
    model="facebook/bart-large-cnn",
    device=-1  # CPU, change to 0 for GPU
)

classifier = pipeline(
    "zero-shot-classification",
    model="facebook/bart-large-mnli",
    device=-1
)

print("Models loaded successfully.")

# =====================
# Legal Issues Knowledge Base
# =====================

LEGAL_ISSUES = {
    "lack of informed consent": {
        "law": "Indian Medical Council Regulations",
        "statute_quote": "Every physician shall obtain informed consent from the patient before any medical procedure…"
    },
    "delayed treatment": {
        "law": "Indian Medical Council Regulations / Consumer Protection Act",
        "statute_quote": "Every physician shall act with reasonable skill and knowledge, and any delay causing harm may be subject to legal action."
    },
    "documentation lapse": {
        "law": "Indian Medical Council Regulations",
        "statute_quote": "All medical procedures and decisions must be documented in the patient's records to ensure transparency and accountability."
    },
    "medical negligence": {
        "law": "Indian Penal Code",
        "statute_quote": "Whoever causes death or injury by negligence shall be punished with imprisonment…"
    }
}

LEGAL_LABELS = list(LEGAL_ISSUES.keys())

# =====================
# Utility: Text Chunking
# =====================

def chunk_text(text, max_length=800):
    words = text.split()
    return [" ".join(words[i:i + max_length]) for i in range(0, len(words), max_length)]

# =====================
# Summarize a single chunk
# =====================

def summarize_chunk(chunk):
    try:
        return summarizer(chunk, max_length=60, min_length=20, do_sample=False)[0]['summary_text']
    except Exception as e:
        return f"Error summarizing chunk: {str(e)}"

# =====================
# Main Analyzer Function
# =====================

def analyze_legal(document_text: str):
    result = {}

    # --- Step 1: Parallel Summarization ---
    try:
        chunks = chunk_text(document_text, max_length=800)
        chunk_summaries = []

        with ThreadPoolExecutor(max_workers=4) as executor:
            futures = {executor.submit(summarize_chunk, chunk): chunk for chunk in chunks}
            for future in as_completed(futures):
                chunk_summaries.append(future.result())

        final_summary = " ".join(chunk_summaries)

    except Exception as e:
        final_summary = f"Error generating summary: {str(e)}"

    result["summary"] = final_summary

    # --- Step 2: Legal classification ---
    try:
        classification = classifier(document_text, candidate_labels=LEGAL_LABELS, multi_label=True)
    except Exception as e:
        classification = {"labels": [], "scores": []}

    legal_implications = []
    for label, score in zip(classification.get("labels", []), classification.get("scores", [])):
        if score > 0.5:
            legal_implications.append({
                "confidence_score": round(score, 2),
                "description": f"Possible legal concern detected: {label.replace('_', ' ')}.",
                "issue": label,
                "relevant_law": LEGAL_ISSUES[label]["law"],
                "statute_quote": LEGAL_ISSUES[label]["statute_quote"]
            })

    if not legal_implications:
        legal_implications = [{"message": "No significant legal implications detected for this document."}]

    result["legal_implications"] = legal_implications

    # --- Step 3: Recommendations ---
    recommendations = []
    for item in legal_implications:
        if "issue" in item:
            if item["issue"] == "lack of informed consent":
                recommendations.append("Ensure all consent forms are signed and documented.")
            elif item["issue"] == "delayed treatment":
                recommendations.append("Ensure rapid trauma transfer protocols and clear handover procedures.")
            elif item["issue"] == "documentation lapse":
                recommendations.append("Document all clinical decisions, diagnostic findings, and surgical procedures.")
            elif item["issue"] == "medical negligence":
                recommendations.append("Implement regular training in trauma management and consent procedures.")

    if not recommendations:
        recommendations = ["No specific recommendations — case appears compliant."]

    result["recommendations"] = list(set(recommendations))

    return result
