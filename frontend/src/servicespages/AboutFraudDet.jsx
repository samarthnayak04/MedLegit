import React from "react";
import { Link } from "react-router-dom";

export default function AboutFraudDet() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Header */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500 text-center animate-pulse">
          Fraud Detection Module
        </h1>

        {/* Overview Section */}
        <section className="bg-gray-800 p-8 rounded-3xl shadow-xl border-l-8 border-purple-400 hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-bold text-purple-300 mb-3">Overview</h2>
          <p className="text-gray-200 leading-relaxed">
            This module focuses on detecting suspicious insurance claims to prevent financial losses and ensure compliance. Using AI and Machine Learning, the system identifies potentially fraudulent activities in healthcare claims and assists auditors in making informed decisions.
          </p>
        </section>

        {/* Key Features Section */}
        <section className="bg-gray-800 p-8 rounded-3xl shadow-xl border-l-8 border-indigo-400 hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-bold text-indigo-300 mb-3">Key Features</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>AI-powered claim analysis for suspicious activities</li>
            <li>Real-time alerts for potential fraud</li>
            <li>Auditor-friendly dashboards with actionable insights</li>
            <li>Historical pattern recognition for improved accuracy</li>
          </ul>
        </section>

        {/* Benefits Section */}
        <section className="bg-gray-800 p-8 rounded-3xl shadow-xl border-l-8 border-cyan-400 hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-bold text-cyan-300 mb-3">Benefits</h2>
          <p className="text-gray-200 leading-relaxed">
            Reduces financial losses, improves auditing efficiency, ensures compliance, and builds trust in insurance and healthcare processes.
          </p>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-6">
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
