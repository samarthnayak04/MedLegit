import React from "react";
import { Link } from "react-router-dom";

export default function AboutLegalAnal() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-8">
      <div className="max-w-6xl mx-auto space-y-12">

        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 text-center animate-pulse">
          Legal Analysis & Compliance Detection
        </h1>

        <p className="text-lg md:text-xl text-gray-300 text-center max-w-4xl mx-auto">
          MedLegit AI’s legal module automates document interpretation, compliance verification, and fraud detection using advanced NLP techniques.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-3xl shadow-xl border-l-8 border-cyan-400 hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold text-cyan-300 mb-3">Datasets</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-200">
              <li>Indian Kanoon Precedent Data</li>
              <li>Custom Statutory Dataset (IPC, Consumer Protection, Medical Negligence)</li>
              <li>User-uploaded legal or medical documents (PDF, DOCX, TXT)</li>
            </ul>
          </div>

          <div className="bg-gray-800 p-6 rounded-3xl shadow-xl border-l-8 border-indigo-400 hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold text-indigo-300 mb-3">Methodology</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-200">
              <li>Text extraction & preprocessing (PyMuPDF, docx2txt)</li>
              <li>Transformer-based embeddings for legal analysis</li>
              <li>Automated case summary generation & law matching</li>
              <li>Recommendations for compliance and redressal</li>
            </ul>
          </div>

          <div className="bg-gray-800 p-6 rounded-3xl shadow-xl border-l-8 border-purple-400 hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold text-purple-300 mb-3">System Architecture</h2>
            <p className="text-gray-200 leading-relaxed">
              FastAPI backend with REST endpoints, SQLAlchemy & PostgreSQL for persistence, and React frontend communicating via Axios. JWT tokens used for user authentication.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-3xl shadow-xl border-l-8 border-green-400 hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold text-green-300 mb-3">Outcome</h2>
            <p className="text-gray-200 leading-relaxed">
              Automated, explainable legal analysis, supporting fraud detection, statute recommendation, and compliance tracking. Integrated with medical diagnostics and insurance fraud detection for a complete AI-driven healthcare compliance platform.
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Link
            to="/services"
            className="py-2 px-6 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white font-medium shadow-md transition transform hover:scale-105"
          >
            Back to Services
          </Link>
        </div>

      </div>
    </div>
  );
}
