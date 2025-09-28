# Main Flask application
import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from config import UPLOAD_FOLDER, ALLOWED_EXTENSIONS
from modules.document_reader import read_docx, read_pdf, read_txt
from modules.legal_analyzer import analyze_legal

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/upload", methods=["POST"])
def upload():
    # ----------- Option 1: JSON input ----------
    if request.is_json:
        data = request.get_json()
        case_text = data.get("case_text", "").strip()
        if not case_text:
            return jsonify({"error": "case_text is required in JSON"}), 400

        report = analyze_legal(case_text)
        return jsonify(report)

    # ----------- Option 2: File upload ----------
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(filepath)

        ext = filename.rsplit(".", 1)[1].lower()
        if ext == "pdf":
            content = read_pdf(filepath)
        elif ext == "docx":
            content = read_docx(filepath)
        elif ext == "txt":
            content = read_txt(filepath)
        else:
            return jsonify({"error": "Unsupported file format"}), 400

        report = analyze_legal(content)
        return jsonify(report)

    return jsonify({"error": "File type not allowed"}), 400


if __name__ == "__main__":
    app.run(port=5000, debug=True)
