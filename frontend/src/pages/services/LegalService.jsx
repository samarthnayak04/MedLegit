import React from "react";
import { Link } from "react-router-dom";

export default function LegalService() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans py-16 px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 text-center animate-pulse">
          Legal Analysis & Compliance Detection
        </h1>

        {/* Sections Container */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Overview Section */}
          <section className="flex-1 bg-gray-800 p-8 rounded-3xl shadow-xl border-l-8 border-cyan-400 hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">Overview</h2>
            <p className="text-gray-200 leading-relaxed">
              Our Legal Analysis & Compliance Detection system uses curated
              datasets including Indian Kanoon precedents, statutory laws (IPC,
              Consumer Protection, Medical Negligence), and user-uploaded
              documents. Leveraging advanced NLP and transformer-based
              embeddings, it automates legal analysis, providing real-time
              insights, case summaries, and compliance recommendations.
            </p>
          </section>

          {/* Key Features Section */}
          <section className="flex-1 bg-gray-800 p-8 rounded-3xl shadow-xl border-l-8 border-indigo-400 hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">
              Key Features
            </h2>
            <ul className="list-disc list-inside space-y-3 text-gray-200">
              <li>
                Text extraction & preprocessing using PyMuPDF and docx2txt
              </li>
              <li>Transformer-based embeddings for accurate legal analysis</li>
              <li>Automated case summary generation and law matching</li>
              <li>
                FastAPI backend with PostgreSQL and JWT-based secure access
              </li>
              <li>Integration with MedLegit modules for real-time insights</li>
            </ul>
          </section>

          {/* Benefits Section */}
          <section className="flex-1 bg-gray-800 p-8 rounded-3xl shadow-xl border-l-8 border-green-400 hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold text-green-300 mb-4">Benefits</h2>
            <p className="text-gray-200 leading-relaxed space-y-2">
              - Automated, explainable legal analysis for uploaded documents.
              <br />
              - Detects potential fraud, statutory violations, and compliance
              issues.
              <br />
              - Provides actionable recommendations for legal redressal.
              <br />
              - Seamlessly integrates with Pneumonia Detection and Insurance
              Fraud modules.
              <br />- Supports hospitals, insurance providers, and legal
              professionals in AI-driven compliance.
            </p>
          </section>
        </div>

        {/* Navigation Button */}
        <div className="flex justify-center mt-8">
          <Link
            to="/services"
            className="py-3 px-8 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white font-medium shadow-md transition transform hover:scale-105"
          >
            Back to Services
          </Link>
        </div>
      </div>
    </div>
  );
}
