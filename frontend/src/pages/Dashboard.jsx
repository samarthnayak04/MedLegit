export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Fraud Detection */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-gray-700">
            Fraud Cases Detected
          </h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">27</p>
          <p className="text-gray-500 mt-1">
            Suspicious insurance claims flagged
          </p>
        </div>

        {/* Medical Diagnosis */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-gray-700">
            Medical Reports Analyzed
          </h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">15</p>
          <p className="text-gray-500 mt-1">
            AI-assisted pneumonia/X-ray detections
          </p>
        </div>

        {/* Legal Analysis */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-gray-700">
            Legal Cases Processed
          </h3>
          <p className="text-3xl font-bold text-green-600 mt-2">9</p>
          <p className="text-gray-500 mt-1">NLP-based legal risk assessments</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Recent Activity
        </h3>
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 font-medium text-gray-600">Date</th>
                <th className="p-4 font-medium text-gray-600">Activity</th>
                <th className="p-4 font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-4">Aug 22, 2025</td>
                <td className="p-4">
                  Fraud detection run on insurance claim batch
                </td>
                <td className="p-4 text-purple-600 font-semibold">Flagged 3</td>
              </tr>
              <tr className="border-t">
                <td className="p-4">Aug 20, 2025</td>
                <td className="p-4">X-ray analyzed for pneumonia detection</td>
                <td className="p-4 text-green-600 font-semibold">Completed</td>
              </tr>
              <tr className="border-t">
                <td className="p-4">Aug 18, 2025</td>
                <td className="p-4">Legal case analysis completed using NLP</td>
                <td className="p-4 text-blue-600 font-semibold">
                  Report Ready
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
