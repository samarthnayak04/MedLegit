"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Scale, Lightbulb, Copy } from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function LegalAnalysisTabs() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [isTabLoading, setIsTabLoading] = useState(false);

  const tabs = [
    { id: 1, name: "Summary", icon: <FileText /> },
    { id: 2, name: "Legal Implications", icon: <Scale /> },
    { id: 3, name: "Recommendations", icon: <Lightbulb /> },
  ];

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;
    setFile(uploadedFile);
  };

  const submitFile = async () => {
    if (!file) return toast.error("Please choose a file first.");
    setLoading(true);
    setResults(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/legal/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ✅ FIX: include document_summary correctly
      setResults({
        ...res.data.analysis,
        document_summary: res.data.document_summary,
      });

      toast.success("Analysis complete.");
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
      } else if (err.response?.status === 400) {
        toast.error(err.response?.data?.detail || "Invalid file format.");
      } else {
        toast.error("Server error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab) {
      setIsTabLoading(true);
      const timer = setTimeout(() => setIsTabLoading(false), 240);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Copied to clipboard"))
      .catch(() => toast.error("Copy failed"));
  }

  // Render Legal Implication Cards
  const renderImplicationCard = (item, idx) => {
    const confidence = Math.min(
      Math.max((item.confidence_score ?? 0) * 100, 0),
      100
    );
    return (
      <motion.div
        layout
        key={idx}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        className="bg-gradient-to-tr from-gray-900/60 to-black/30 border border-gray-800 rounded-2xl p-5 shadow-md hover:shadow-lg transition"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-indigo-300 font-semibold text-lg">
              {item.issue}
            </h3>
            <p className="text-sm text-gray-400 mt-1">{item.brief || ""}</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="text-xs text-gray-300">Confidence</div>
            <div className="px-2 py-1 rounded-full bg-gray-800/50 text-xs font-medium text-gray-100">
              {confidence.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* progress bar + law pill */}
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                style={{ width: `${confidence}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">Model confidence</div>
          </div>

          <div className="ml-4">
            <span className="inline-block px-3 py-1 rounded-full bg-gray-800/60 text-xs text-gray-200 border border-gray-700">
              {item.relevant_law || "Relevant law not provided"}
            </span>
          </div>
        </div>

        {item.statute_quote && (
          <blockquote className="mt-4 border-l-2 border-gray-800 pl-4 italic text-gray-400 text-sm">
            “{item.statute_quote}”
          </blockquote>
        )}

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="text-xs text-gray-500">
            Source: {item.source || "Model / Knowledge base"}
          </div>
          <button
            onClick={() =>
              copyToClipboard(`${item.issue}\n\n${item.statute_quote || ""}`)
            }
            className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-md bg-gray-800/60 hover:bg-gray-800 transition cursor-pointer"
          >
            <Copy className="w-4 h-4" /> Copy
          </button>
        </div>
      </motion.div>
    );
  };

  const renderRecommendations = (recs = []) => {
    if (!recs.length)
      return (
        <p className="text-gray-400">
          No recommendations generated for this document.
        </p>
      );

    return (
      <div className="space-y-3">
        {recs.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-gray-900/60 border border-gray-800 rounded-xl flex items-start justify-between gap-4"
          >
            <div>
              <div className="text-sm font-semibold text-indigo-300">
                Step {i + 1}
              </div>
              <div className="text-gray-300 mt-1">{r}</div>
            </div>
            <button
              className="text-xs px-3 py-1 rounded-md bg-gray-800/60 hover:bg-gray-800 cursor-pointer"
              onClick={() => copyToClipboard(r)}
            >
              Copy
            </button>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 min-h-[32rem] bg-gradient-to-br from-gray-1000 to-gray-1100 text-gray-100 font-sans">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold mb-6 mt-6 text-indigo-400">
          Legal Case Analysis
        </h2>
        <div className="text-sm text-gray-400">
          Upload a document to get started
        </div>
      </div>

      {/* Upload Section */}
      <div className="p-6 shadow-lg rounded-2xl mb-8 border border-gray-700 bg-gray-900">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <label
            htmlFor="fileUpload"
            className="flex-1 flex items-center gap-4 p-4 border-2 border-dashed border-gray-700 rounded-xl cursor-pointer hover:bg-gray-800 transition"
          >
            <div className="p-3 rounded-md bg-gray-800/40">
              <Upload className="w-8 h-8 text-indigo-400" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-200">
                {file?.name || "Drop or choose a PDF / DOCX file"}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                We analyze legal issues, laws and recommendations
              </div>
            </div>
            <input
              id="fileUpload"
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          <div className="flex gap-3">
            <button
              onClick={submitFile}
              disabled={!file || loading}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
            <button
              onClick={() => {
                setFile(null);
                setResults(null);
              }}
              className="px-4 py-2 rounded-lg bg-gray-800 text-sm text-gray-200 cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {!loading && results && (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Tabs */}
          <aside className="md:w-60">
            <div className="bg-black/10 backdrop-blur-lg rounded-xl p-3 space-y-3 sticky top-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <span className="w-6 h-6 inline-flex items-center justify-center">
                    {tab.icon}
                  </span>
                  <span className="flex-1 text-left">{tab.name}</span>
                  <span className="text-xs text-gray-300">
                    {tab.id === 2
                      ? results.legal_implications?.length ?? 0
                      : results.recommendations?.length ?? 0}
                  </span>
                </button>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 relative rounded-xl bg-gray-900/90 backdrop-blur-lg shadow-lg p-6 overflow-auto min-h-[25rem]">
            <AnimatePresence>
              {isTabLoading && (
                <motion.div
                  key="loader"
                  className="absolute inset-0 z-20 flex items-center justify-center bg-gray-900/70 backdrop-blur-sm rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-indigo-300 text-sm">Switching view…</div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4 text-left"
              >
                {/* Summary */}
                {activeTab === 1 && (
                  <div className="space-y-6">
                    {results.document_summary ? (
                      <div className="p-4 bg-gray-900/60 border border-gray-800 rounded-xl shadow-md">
                        <h4 className="text-lg font-semibold text-indigo-300 mb-2">
                          Document Summary
                        </h4>
                        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                          {results.document_summary}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-400">No summary available.</p>
                    )}
                  </div>
                )}

                {/* Legal Implications */}
                {activeTab === 2 && (
                  <div className="grid grid-cols-1 gap-4">
                    {Array.isArray(results.legal_implications) &&
                    results.legal_implications.length > 0 ? (
                      results.legal_implications.map((it, idx) =>
                        renderImplicationCard(it, idx)
                      )
                    ) : (
                      <p className="text-gray-400">
                        No legal issues detected for this document.
                      </p>
                    )}
                  </div>
                )}

                {/* Recommendations */}
                {activeTab === 3 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg text-indigo-300 font-semibold">
                        Recommendations
                      </h4>
                      <button
                        onClick={() => {
                          const text = (results.recommendations || []).join(
                            "\n\n"
                          );
                          const blob = new Blob([text], { type: "text/plain" });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = "recommendations.txt";
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                        className="text-xs px-3 py-1 rounded-md bg-gray-800/60 cursor-pointer"
                      >
                        Export
                      </button>
                    </div>
                    {renderRecommendations(results.recommendations)}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
