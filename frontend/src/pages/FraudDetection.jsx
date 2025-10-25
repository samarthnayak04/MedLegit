import React, { useState, useRef } from "react";
import { Upload, RotateCcw } from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";
export default function FraudDetection() {
  const [results, setResults] = useState([]);
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Core upload logic
  const uploadFile = async (file) => {
    if (!file) return;

    setFileName(file.name);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/fraud/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResults(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
      } else if (err.response?.status === 400) {
        toast.error("Invalid file format. Please upload a csv file.");
      } else if (err.response?.status === 500) {
        toast.error("Server error. Please try again later.");
      }
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  const readCSVFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text
        .trim()
        .split("\n")
        .map((line) => line.split(","));
      setFileContent(lines);
    };
    reader.readAsText(file);
  };
  // Handle file input
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    uploadFile(file);
  };

  // Handle drag & drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    uploadFile(file);
  };

  const handleReset = () => {
    setFileName("");
    setResults([]);
    setFileContent([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="p-6 text-gray-100">
      <h2 className="text-3xl font-bold mb-6 mt-8 md:mt-12 gap-3 text-indigo-400">
        Fraud Detection
      </h2>

      {/* Upload / Drag & Drop Box */}
      <div
        className={`p-6 shadow-md rounded-2xl mb-6 border-2 border-dashed ${
          dragActive
            ? "border-indigo-600 bg-gray-800"
            : "border-gray-700 bg-gray-900"
        } transition`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <label
            htmlFor="fileUpload"
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <Upload className="w-10 h-10 text-indigo-500 mb-2" />
            <span className="text-gray-200 font-medium">
              {fileName || "Drag & drop CSV file here or click to upload"}
            </span>
            <input
              ref={fileInputRef}
              id="fileUpload"
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>

          {fileName && (
            <button
              onClick={handleReset}
              className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset File
            </button>
          )}
        </div>
      </div>
      {/* 👇 Display uploaded CSV content */}
      {fileContent.length > 0 && (
        <div className="p-6 shadow-md rounded-2xl mb-6 border border-gray-700 bg-gray-900">
          <h3 className="text-xl font-semibold mb-4 text-indigo-300">
            Uploaded CSV Preview
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-gray-100">
              <thead>
                <tr className="bg-gray-800 text-left text-gray-200">
                  {fileContent[0].map((header, i) => (
                    <th key={i} className="p-3 border-b border-gray-700">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fileContent.slice(1, 6).map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className="p-3 border-b border-gray-700">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {fileContent.length > 6 && (
            <p className="text-gray-400 text-sm mt-2">
              Showing first 5 rows only...
            </p>
          )}
        </div>
      )}

      {/* Results */}
      {loading && (
        <div className="p-6 shadow-md rounded-2xl text-center border border-gray-700 bg-gray-900">
          <p className="text-gray-300 font-medium">Processing file... ⏳</p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="p-6 shadow-md rounded-2xl border border-gray-700 bg-gray-900">
          <h3 className="text-xl font-semibold mb-4 text-indigo-300">
            Detection Results
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-gray-100">
              <thead>
                <tr className="bg-gray-800 text-left text-gray-200">
                  <th className="p-3 border-b border-gray-700">Provider</th>
                  <th className="p-3 border-b border-gray-700">
                    Potential Fraud
                  </th>
                  <th className="p-3 border-b border-gray-700">
                    Fraud Probability (%)
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-3 border-b border-gray-700 font-medium">
                      {row.Provider}
                    </td>
                    <td
                      className={`p-3 border-b border-gray-700 font-semibold ${
                        row.PotentialFraud === "Yes"
                          ? "text-red-500"
                          : "text-green-400"
                      }`}
                    >
                      {row.PotentialFraud}
                    </td>
                    <td className="p-3 border-b border-gray-700">
                      {row.Fraud_Probability.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
