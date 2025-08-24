export default function Dashboard() {
  return (
    <div className="space-y-10 text-gray-100">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold tracking-tight">
          Dashboard Overview
        </h2>
        <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg shadow hover:shadow-lg transition">
          Download Report
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Fraud Detection */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-2xl shadow-lg text-white hover:scale-105 transform transition">
          <h3 className="text-lg font-semibold">Fraud Cases Detected</h3>
          <p className="text-4xl font-extrabold mt-2">27</p>
          <p className="text-purple-200 mt-1">
            Suspicious insurance claims flagged
          </p>
        </div>

        {/* Medical Diagnosis */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 rounded-2xl shadow-lg text-white hover:scale-105 transform transition">
          <h3 className="text-lg font-semibold">Medical Reports Analyzed</h3>
          <p className="text-4xl font-extrabold mt-2">15</p>
          <p className="text-blue-200 mt-1">
            AI-assisted pneumonia/X-ray detections
          </p>
        </div>

        {/* Legal Analysis */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-2xl shadow-lg text-white hover:scale-105 transform transition">
          <h3 className="text-lg font-semibold">Legal Cases Processed</h3>
          <p className="text-4xl font-extrabold mt-2">9</p>
          <p className="text-green-200 mt-1">
            NLP-based legal risk assessments
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Recent Activity</h3>
        <div className="overflow-hidden rounded-2xl shadow-lg bg-gray-900 border border-gray-800">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-5 font-medium text-gray-300">Date</th>
                <th className="p-5 font-medium text-gray-300">Activity</th>
                <th className="p-5 font-medium text-gray-300 text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-800 hover:bg-gray-800 transition">
                <td className="p-5">Aug 22, 2025</td>
                <td className="p-5">
                  Fraud detection run on insurance claim batch
                </td>
                <td className="p-5 text-center">
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-purple-900 text-purple-300">
                    Flagged 3
                  </span>
                </td>
              </tr>
              <tr className="border-t border-gray-800 hover:bg-gray-800 transition">
                <td className="p-5">Aug 20, 2025</td>
                <td className="p-5">X-ray analyzed for pneumonia detection</td>
                <td className="p-5 text-center">
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-900 text-green-300">
                    Completed
                  </span>
                </td>
              </tr>
              <tr className="border-t border-gray-800 hover:bg-gray-800 transition">
                <td className="p-5">Aug 18, 2025</td>
                <td className="p-5">Legal case analysis completed using NLP</td>
                <td className="p-5 text-center">
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-900 text-blue-300">
                    Report Ready
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
