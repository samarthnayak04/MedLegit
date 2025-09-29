import React, { useState } from "react";
import { Upload } from "lucide-react";

export default function FraudDetection() {
  const [results, setResults] = useState([]);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);

      // ✅ Mock backend-like response
      setLoading(true);
      setTimeout(() => {
        const mockOutput = [
          { Provider: "PRV51002", PotentialFraud: "No", Fraud_Probability: 0.01 },
          { Provider: "PRV99999", PotentialFraud: "Yes", Fraud_Probability: 92.39 },
        ];
        setResults(mockOutput);
        setLoading(false);
      }, 1200);
    }
  };

  return (
    <div className="p-6 text-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-indigo-400">
        Fraud Detection
      </h2>

      {/* Upload Box */}
      <div className="p-6 shadow-md rounded-2xl mb-6 border border-gray-700 bg-gray-900">
        <div className="flex flex-col items-center justify-center space-y-4">
          <label
            htmlFor="fileUpload"
            className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-400 rounded-xl p-6 cursor-pointer hover:bg-gray-800 transition"
          >
            <Upload className="w-10 h-10 text-indigo-500 mb-2" />
            <span className="text-gray-200 font-medium">
              {fileName || "Upload CSV file"}
            </span>
            <input
              id="fileUpload"
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
          {fileName && (
            <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-xl hover:bg-indigo-700 transition">
              Process File
            </button>
          )}
        </div>
      </div>

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
                  <th className="p-3 border-b border-gray-700">Potential Fraud</th>
                  <th className="p-3 border-b border-gray-700">Fraud Probability (%)</th>
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
                    <td className="p-3 border-b border-gray-700">{row.Fraud_Probability.toFixed(2)}%</td>
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
