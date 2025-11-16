"use client";
import { useState, useEffect } from "react";
import api from "../api/axios"; // your axios instance

export default function ActivityPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await api.get("/user/activities"); // fetch all activities
        setActivities(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  if (loading) return <div className="text-white p-8">Loading...</div>;

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
    <div className="min-h-screen bg-gray-750 text-gray-100 p-0 m-0 pt-15">
      <h2 className="text-4xl font-bold text-cyan-400 mb-4">All Activities</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-2xl overflow-hidden shadow-lg bg-gray-900 border border-gray-800">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 font-medium text-gray-300">Date</th>
              <th className="p-5 font-medium text-gray-300">Activity</th>
              <th className="p-5 font-medium text-gray-300 text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {activities.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="text-center p-6 text-gray-400 italic"
                >
                  No activities yet.
                </td>
              </tr>
            ) : (
              activities.map((item, idx) => {
                const readableStatus = getReadableStatus(item.status);
                const colorClass = getStatusColor(readableStatus);

                return (
                  <tr
                    key={idx}
                    className="border-b border-gray-800 hover:bg-gray-800/60 transition"
                  >
                    <td className="p-5 text-gray-300">
                      {new Date(item.date).toLocaleString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="p-5 text-gray-200">{item.activity}</td>
                    <td className="p-5 text-center">
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
  );
}
