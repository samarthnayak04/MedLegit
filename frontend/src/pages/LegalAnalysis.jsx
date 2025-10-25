"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload } from "lucide-react";

export default function LegalAnalysisTabs() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [isTabLoading, setIsTabLoading] = useState(false);

  const tabs = [
    { id: 1, name: "Case Summary", icon: "📄" },
    { id: 2, name: "Legal Implications", icon: "⚖️" },
    { id: 3, name: "Recommendations", icon: "💡" },
  ];

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setLoading(true);

    setTimeout(() => {
      const mockData = {
        legal_implications: [
          {
            confidence_score: 0.99,
            description:
              "Possible legal concern detected: lack of informed consent.",
            issue: "lack of informed consent",
            relevant_law: "Indian Medical Council Regulations",
            statute_quote:
              "Every physician shall obtain informed consent from the patient before any medical procedure…",
          },
          {
            confidence_score: 0.98,
            description: "Possible legal concern detected: delayed treatment.",
            issue: "delayed treatment",
            relevant_law:
              "Indian Medical Council Regulations / Consumer Protection Act",
            statute_quote:
              "Every physician shall act with reasonable skill and knowledge, and any delay causing harm may be subject to legal action.",
          },
          {
            confidence_score: 0.97,
            description: "Possible legal concern detected: medical negligence.",
            issue: "medical negligence",
            relevant_law: "Indian Penal Code",
            statute_quote:
              "Whoever causes death or injury by negligence shall be punished with imprisonment…",
          },
        ],
        recommendations: [
          "Document all clinical decisions, diagnostic findings, and surgical procedures.",
          "Ensure all consent forms are signed and documented.",
          "Ensure rapid trauma transfer protocols and clear handover procedures.",
          "Implement regular training in trauma management and consent procedures.",
        ],
        summary:
          "The patient underwent an appendectomy at City Hospital. The consent form was signed but the risks associated with the surgery were not properly explained. The patient stated that they were not informed about potential complications such as infection or bleeding.",
      };
      setResults(mockData);
      setLoading(false);
    }, 1200);
  };

  // Handle tab loading
  useEffect(() => {
    if (activeTab) {
      setIsTabLoading(true);
      const timer = setTimeout(() => setIsTabLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  // Tab content mapping
  const renderTabContent = () => {
    if (!results) return null;

    if (activeTab === 1) return <p>{results.summary}</p>;
    if (activeTab === 2)
      return results.legal_implications.map((item, idx) => (
        <div
          key={idx}
          className="p-4 mb-4 bg-gray-900 border border-gray-800 rounded-xl shadow-lg"
        >
          <p className="text-indigo-400 font-semibold">{item.description}</p>
          <p className="text-gray-400 text-sm">
            Issue: {item.issue} | Confidence: {item.confidence_score}
          </p>
          <p className="text-gray-300 text-sm">Law: {item.relevant_law}</p>
          <blockquote className="text-gray-500 italic mt-1 text-sm">
            "{item.statute_quote}"
          </blockquote>
        </div>
      ));
    if (activeTab === 3)
      return (
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          {results.recommendations.map((rec, idx) => (
            <li key={idx}>{rec}</li>
          ))}
        </ul>
      );
  };

  return (
    <div className="p-6 min-h-[32rem] bg-gradient-to-br from-gray-900 to-gray-1000 text-gray-100 font-sans">
      <h2 className="text-3xl font-bold mb-6 text-indigo-400">
        Legal Case Analysis
      </h2>

      {/* Upload Box */}
      <div className="p-6 shadow-lg rounded-2xl mb-8 border border-gray-700 bg-gray-900">
        <div className="flex flex-col items-center justify-center space-y-4">
          <label
            htmlFor="fileUpload"
            className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-400 rounded-xl p-6 cursor-pointer hover:bg-gray-800 transition"
          >
            <Upload className="w-10 h-10 text-indigo-500 mb-2" />
            <span className="text-gray-200 font-medium">
              {file?.name || "Upload PDF or DOC file"}
            </span>
            <input
              id="fileUpload"
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="p-6 shadow-lg rounded-2xl text-center border border-gray-700 bg-gray-900">
          <p className="text-gray-300 font-medium">Processing file... ⏳</p>
        </div>
      )}

      {/* Tabs */}
      {!loading && results && (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-56 flex md:flex-col bg-black/10 backdrop-blur-lg rounded-xl p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative group flex items-center gap-3 px-4 py-3 mb-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 relative rounded-xl bg-gray-900/90 backdrop-blur-lg shadow-lg p-6 overflow-auto min-h-[25rem]">
            <AnimatePresence>
              {isTabLoading && (
                <motion.div
                  key="loader"
                  className="absolute inset-0 z-20 flex items-center justify-center bg-gray-900/70 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg
                    className="animate-spin h-8 w-8 text-indigo-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 text-left text-gray-300"
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
