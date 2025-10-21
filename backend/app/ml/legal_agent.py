# import json, os
# from pathlib import Path
# from transformers import pipeline
# from sentence_transformers import SentenceTransformer, util
# import torch

# # Load summarizer + QA + sentence transformer
# summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
# qa_model = pipeline("question-answering", model="deepset/bert-base-cased-squad2")
# sbert = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

# # Load statutes & precedents
# DATA_DIR = Path(__file__).resolve().parent.parent / "data"
# with open(DATA_DIR / "statutes.json", "r") as f:
#     STATUTES = json.load(f)
# with open(DATA_DIR / "precedents.json", "r") as f:
#     PRECEDENTS = json.load(f)


# class LegalAgent:
#     def __init__(self):
#         print("✅ Legal agent initialized.")

#     def extract_clauses(self, text):
#         questions = [
#             "What are the key legal issues in this case?",
#             "What are the liabilities mentioned?",
#             "What is the outcome or judgment?"
#         ]
#         answers = []
#         for q in questions:
#             try:
#                 res = qa_model(question=q, context=text)
#                 if res and res.get("answer"):
#                     answers.append(res["answer"])
#             except Exception:
#                 continue
#         return answers

#     def summarize(self, text):
#         try:
#             return summarizer(text[:4000], max_length=180, min_length=50, do_sample=False)[0]["summary_text"]
#         except Exception:
#             return text[:500]

#     def match_precedents(self, summary):
#         query_emb = sbert.encode(summary, convert_to_tensor=True)
#         scores = []
#         for p in PRECEDENTS:
#             case_emb = sbert.encode(p["summary"], convert_to_tensor=True)
#             sim = util.pytorch_cos_sim(query_emb, case_emb).item()
#             scores.append((p, sim))
#         scores.sort(key=lambda x: x[1], reverse=True)
#         return [s[0] for s in scores[:3]]

#     def find_laws(self, summary):
#         hits = []
#         for s in STATUTES:
            
#             if any(word.lower() in summary.lower() for word in s["title"].split()):
#                 hits.append(s)
#         return hits[:3]

#     def analyze(self, text: str):
#         summary = self.summarize(text)
#         clauses = self.extract_clauses(text)
#         precedents = self.match_precedents(summary)
#         laws = self.find_laws(summary)
#         return {
#             "summary": summary,
#             "legal_issues": clauses,
#             "relevant_laws": [l["section"] for l in laws],
#             "similar_cases": [p["case"] for p in precedents],
#             "recommendations": ["Review top similar cases", "Consult applicable IPC sections"]
#         }


# legal_agent = LegalAgent()
