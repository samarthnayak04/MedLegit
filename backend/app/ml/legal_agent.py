# modules/legal_agent.py

from transformers import pipeline

# -----------------------------
# Load the zero-shot model once
# -----------------------------
print("🚀 Loading zero-shot classification model...")
classifier = pipeline(
    "zero-shot-classification",
    model="facebook/bart-large-mnli",
    device=-1  # Use 0 if you have a GPU
)
print("✅ Model loaded successfully.")


# -----------------------------
# Legal Knowledge Base
# -----------------------------
LEGAL_ISSUES = {
    "lack of informed consent": {
        "law": "Indian Medical Council Regulations",
        "statute_quote": "Every physician shall obtain informed consent from the patient before any medical procedure."
    },
    "delayed treatment": {
        "law": "Consumer Protection Act / IMC Regulations",
        "statute_quote": "Every physician shall act with reasonable skill and knowledge, and any delay causing harm may be subject to legal action."
    },
    "documentation lapse": {
        "law": "Indian Medical Council Regulations",
        "statute_quote": "All medical procedures and decisions must be documented in the patient's records to ensure transparency."
    },
    "medical negligence": {
        "law": "Indian Penal Code (Section 304A)",
        "statute_quote": "Whoever causes death or injury by negligence shall be punished with imprisonment or fine."
    },
}

LEGAL_LABELS = list(LEGAL_ISSUES.keys())


# -----------------------------
# Core Analysis Function
# -----------------------------
def analyze_legal(text: str, confidence_threshold: float = 0.6):
    """
    Analyze a medical/legal text and detect possible legal implications.

    Returns:
        dict: {
            "legal_implications": [ {issue, confidence_score, relevant_law, statute_quote}, ... ],
            "recommendations": [str, ...],
            "message": str (optional)
        }
    """
    # Basic input validation
    if not text or not text.strip():
        return {
            "legal_implications": [],
            "recommendations": [],
            "message": "No valid text provided for analysis."
        }

    try:
        # Run classification
        classification = classifier(
            text,
            candidate_labels=LEGAL_LABELS,
            multi_label=True
        )
    except Exception as e:
        return {
            "legal_implications": [],
            "recommendations": [],
            "message": f"Error during model inference: {str(e)}"
        }

    # Extract high-confidence results
    legal_implications = []
    for label, score in zip(classification.get("labels", []), classification.get("scores", [])):
        if score >= confidence_threshold:
            legal_implications.append({
                "issue": label,
                "confidence_score": round(float(score), 2),
                "relevant_law": LEGAL_ISSUES[label]["law"],
                "statute_quote": LEGAL_ISSUES[label]["statute_quote"]
            })

    # No implications found
    if not legal_implications:
        return {
            "legal_implications": ["No significant legal implications detected."],
            "recommendations": ["No Recommendations"],
            "message": "No legal implications."
        }

    # Generate actionable recommendations
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

    # Remove duplicates and finalize
    return {
        "legal_implications": legal_implications,
        "recommendations": sorted(list(set(recommendations))),
        "message": "Analysis completed successfully."
    }
