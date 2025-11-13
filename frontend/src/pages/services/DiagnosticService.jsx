import React from "react";
import { Link } from "react-router-dom";

export default function DiagnosticService() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-16 px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 text-center">
          AI-powered Pneumonia Detection Service
        </h1>

        {/* Sections Container */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Overview Section */}
          <section className="flex-1 bg-gray-800 p-8 rounded-3xl shadow-xl border-l-8 border-cyan-400 hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">Overview</h2>
            <p className="text-gray-200 leading-relaxed">
              Our Pneumonia Detection service automates the identification of
              pneumonia from chest X-ray images using advanced AI. Leveraging
              deep learning and transfer learning with ResNet50, the system
              classifies images into <span className="font-bold">Normal</span>{" "}
              and <span className="font-bold">Pneumonia</span> categories,
              providing fast and reliable diagnostic support.
            </p>
          </section>

          {/* Key Features Section */}
          <section className="flex-1 bg-gray-800 p-8 rounded-3xl shadow-xl border-l-8 border-purple-400 hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold text-purple-300 mb-4">
              Key Features
            </h2>
            <ul className="list-disc list-inside space-y-3 text-gray-200">
              <li>
                AI-powered analysis of chest X-rays for pneumonia detection
              </li>
              <li>High accuracy (~96%) and reliable diagnostic performance</li>
              <li>Fast, automated results with confidence scoring</li>
              <li>
                Seamless integration with MedLegit dashboard for real-time
                insights
              </li>
              <li>
                Supports healthcare providers in early detection and patient
                care
              </li>
            </ul>
          </section>

          {/* Benefits Section */}
          <section className="flex-1 bg-gray-800 p-8 rounded-3xl shadow-xl border-l-8 border-green-400 hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold text-green-300 mb-4">Benefits</h2>
            <p className="text-gray-200 leading-relaxed space-y-2">
              - Accelerates diagnosis and reduces manual effort.
              <br />
              - Improves accuracy in detecting pneumonia cases.
              <br />
              - Provides actionable insights with confidence scores.
              <br />
              - Integrates smoothly with existing healthcare workflows.
              <br />- Enhances patient care and supports clinical
              decision-making.
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
