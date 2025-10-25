import React from "react";
import { Link } from "react-router-dom";

export default function DetectionService() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-16 px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500 text-center animate-pulse">
          AI-powered Insurance Fraud Detection Service
        </h1>

        {/* Sections Container */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Overview Section */}
          <section className="flex-1 bg-gray-800 p-8 rounded-3xl shadow-xl border-l-8 border-purple-400 hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold text-purple-300 mb-4">
              Overview
            </h2>
            <p className="text-gray-200 leading-relaxed">
              Our Medicare Fraud Detection service helps insurance providers
              identify suspicious claims and potentially fraudulent activities
              using advanced AI and machine learning. The system analyzes
              historical claim and provider data to flag anomalies, helping
              auditors take informed actions and reduce financial losses.
            </p>
          </section>

          {/* Key Features Section */}
          <section className="flex-1 bg-gray-800 p-8 rounded-3xl shadow-xl border-l-8 border-indigo-400 hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">
              Key Features
            </h2>
            <ul className="list-disc list-inside space-y-3 text-gray-200">
              <li>AI-powered claim analysis for suspicious activities</li>
              <li>Real-time alerts for potential fraud</li>
              <li>Auditor-friendly dashboards with actionable insights</li>
              <li>Historical pattern recognition for improved accuracy</li>
              <li>
                Advanced ML models: Logistic Regression, Random Forest, XGBoost
              </li>
            </ul>
          </section>

          {/* Benefits Section */}
          <section className="flex-1 bg-gray-800 p-8 rounded-3xl shadow-xl border-l-8 border-green-400 hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold text-green-300 mb-4">Benefits</h2>
            <p className="text-gray-200 leading-relaxed space-y-2">
              - Reduces financial losses by up to{" "}
              <span className="font-bold text-green-300">$2M/year</span>.<br />-
              Improves auditing efficiency by{" "}
              <span className="font-bold text-green-300">30%</span>.<br />
              - Enhances compliance and trust in healthcare processes.
              <br />- Provides actionable insights to proactively detect
              suspicious providers.
            </p>
          </section>
        </div>

        {/* Navigation Button */}
        <div className="flex justify-center gap-4 mt-8">
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
