"use client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard stats
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/user/dashboard");
        setData(res.data);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div className="text-white p-8">Loading...</div>;

  // Helper: make status readable
  const getReadableStatus = (status) => {
    if (status.includes("Flagged: Yes")) return "Flagged — High Risk";
    if (status.includes("Flagged: No")) return "Verified — No Irregularities";

    if (status.includes("Pneumonia")) {
      const confidence = parseFloat(status.match(/\d+(\.\d+)?/g)?.[0] || 0);
      if (confidence > 80) return "Pneumonia Detected (Critical)";
      if (confidence > 50) return "Possible Pneumonia (Needs Review)";
      return "Clear — No Signs of Pneumonia";
    }

    return status;
  };

  // Helper: assign Tailwind color classes
  const getStatusColor = (status) => {
    if (status.includes("Flagged — High Risk"))
      return "bg-red-800 text-red-200 shadow-red-500/20";
    if (status.includes("Verified — No Irregularities"))
      return "bg-green-800 text-green-200 shadow-green-500/20";
    if (status.includes("Pneumonia Detected"))
      return "bg-red-800 text-red-200 shadow-red-500/20";
    if (status.includes("Possible Pneumonia"))
      return "bg-orange-800 text-orange-200 shadow-orange-500/20";
    if (status.includes("Clear — No Signs"))
      return "bg-green-800 text-green-200 shadow-green-500/20";
    return "bg-blue-800 text-blue-200 shadow-blue-500/20";
  };

  return (
    <div className="min-h-screen w-full p-4 sm:p-6 md:p-8 text-gray-100 overflow-x-hidden">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <h2 className="text-3xl sm:text-4xl font-bold text-indigo-400 tracking-tight">
          Overview
        </h2>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
        {/* Fraud Detection */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-2xl shadow-lg text-white hover:scale-105 transform transition">
          <h3 className="text-lg font-semibold">Insurance Claims Checked</h3>
          <p className="text-4xl font-extrabold mt-2">
            {data.fraud_cases || 0}
          </p>
          <p className="text-purple-200 mt-1">
            AI-assisted insurance fraud detection
          </p>
        </div>

        {/* Medical Diagnosis */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 rounded-2xl shadow-lg text-white hover:scale-105 transform transition">
          <h3 className="text-lg font-semibold">Medical Reports Analyzed</h3>
          <p className="text-4xl font-extrabold mt-2">
            {data.medical_reports || 0}
          </p>
          <p className="text-blue-200 mt-1">
            AI-assisted pneumonia detection via X-rays
          </p>
        </div>

        {/* Legal Analysis */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-2xl shadow-lg text-white hover:scale-105 transform transition">
          <h3 className="text-lg font-semibold">Legal Cases Processed</h3>
          <p className="text-4xl font-extrabold mt-2">
            {data.legal_cases || 0}
          </p>
          <p className="text-green-200 mt-1">
            NLP-based legal risk assessments
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
          <h3 className="text-2xl font-bold">Recent Activity</h3>
          <Link
            to="/dashboard/activities"
            className="text-cyan-400 hover:text-cyan-300 font-semibold transition"
          >
            See All
          </Link>
        </div>

        <div className="overflow-x-auto rounded-2xl shadow-lg bg-gray-900 border border-gray-800">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-4 sm:p-5 font-medium text-gray-300 whitespace-nowrap">
                  Date
                </th>
                <th className="p-4 sm:p-5 font-medium text-gray-300 whitespace-nowrap">
                  Activity
                </th>
                <th className="p-4 sm:p-5 font-medium text-gray-300 text-center whitespace-nowrap">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {data.recent_activity.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center p-5 text-gray-400 italic"
                  >
                    No recent activity found.
                  </td>
                </tr>
              ) : (
                data.recent_activity.map((item, idx) => {
                  const readableStatus = getReadableStatus(item.status);
                  const colorClass = getStatusColor(readableStatus);
                  return (
                    <tr
                      key={idx}
                      className="border-t border-gray-800 hover:bg-gray-800 transition"
                    >
                      <td className="p-4 sm:p-5 whitespace-nowrap">
                        {new Date(item.date).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="p-4 sm:p-5 whitespace-nowrap">
                        {item.activity}
                      </td>
                      <td className="p-4 sm:p-5 text-center whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold shadow-md ${colorClass}`}
                        >
                          {readableStatus}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
