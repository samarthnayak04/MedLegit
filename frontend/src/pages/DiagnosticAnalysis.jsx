import React, { useState, useRef } from "react";
import { Upload } from "lucide-react";
import api from "../api/axios"; // your axios instance with interceptors
import toast from "react-hot-toast";
export default function DiagnosticAnalysis() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;

    setImage(URL.createObjectURL(file));
    setResult(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/health/pneumonia", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
      } else if (err.response?.status === 400) {
        toast.error("Invalid file format. Please upload a valid image.");
      } else if (err.response?.status === 500) {
        toast.error("Server error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="p-6 text-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-indigo-400">
        Diagnostic Analysis
      </h2>

      {/* Upload / Drag & Drop */}
      <div
        className={`p-6 shadow-md rounded-2xl mb-6 border-2 border-dashed transition
          ${
            dragActive
              ? "border-indigo-500 bg-gray-800"
              : "border-gray-700 bg-gray-900"
          }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-4">
          <label
            htmlFor="imageUpload"
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <Upload className="w-10 h-10 text-indigo-500 mb-2" />
            <span className="text-gray-200 font-medium text-center">
              {image
                ? "Image Selected"
                : dragActive
                ? "Drop image here"
                : "Click or Drag & Drop Lung Image"}
            </span>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              ref={inputRef}
              onChange={handleImageUpload}
            />
          </label>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="p-6 shadow-md rounded-2xl text-center border border-gray-700 bg-gray-900">
          <p className="text-gray-300 font-medium">Analyzing image... ⏳</p>
        </div>
      )}

      {/* Results */}
      {!loading && image && result && (
        <div className="p-6 shadow-md rounded-2xl border border-gray-700 bg-gray-900 space-y-4">
          <h3 className="text-xl font-semibold text-indigo-300">
            Prediction Result
          </h3>

          {/* Uploaded Image */}
          <div className="flex justify-center">
            <img
              src={image}
              alt="Uploaded Lung"
              className="rounded-xl max-w-xs border border-gray-600"
            />
          </div>

          {/* Result Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-gray-100">
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="p-3 font-medium text-gray-300">ID</td>
                  <td className="p-3">{result.id}</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-3 font-medium text-gray-300">Prediction</td>
                  <td className="p-3">{result.prediction}</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-3 font-medium text-gray-300">Confidence</td>
                  <td className="p-3">
                    {(result.confidence * 100).toFixed(2)}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
