import json

def load_statutes():
    with open("data/statutes.json", "r", encoding="utf-8") as f:
        return json.load(f)

def match_statute(issue):
    statutes = load_statutes()
    matches = [statute for statute in statutes if issue.lower() in statute["issue"].lower()]
    return matches if matches else []
