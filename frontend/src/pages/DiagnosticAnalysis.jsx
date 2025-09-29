import React, { useState } from "react";
import { Upload } from "lucide-react";

export default function DiagnosticAnalysis() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));

      // Mock API response
      setLoading(true);
      setTimeout(() => {
        const mockOutput = {
          id: "39c4a6bf-05c0-456a-8e92-aa314aa75062",
          prediction: "Pneumonia",
          confidence: 0.5222964286804199,
          created_at: new Date().toISOString(),
        };
        setResult(mockOutput);
        setLoading(false);
      }, 1200);
    }
  };

  return (
    <div className="p-6 text-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-indigo-400">
        Diagnostic Analysis
      </h2>

      {/* Image Upload */}
      <div className="p-6 shadow-md rounded-2xl mb-6 border border-gray-700 bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <label
            htmlFor="imageUpload"
            className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-400 rounded-xl p-6 cursor-pointer hover:bg-gray-800 transition"
          >
            <Upload className="w-10 h-10 text-indigo-500 mb-2" />
            <span className="text-gray-200 font-medium">
              {image ? "Image Selected" : "Upload Lung Image"}
            </span>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
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

      {/* Display Image & Results */}
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
                  <td className="p-3">{(result.confidence * 100).toFixed(2)}%</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-gray-300">Created At</td>
                  <td className="p-3">{new Date(result.created_at).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
