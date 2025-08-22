export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar + Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md h-screen hidden md:block">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-purple-600">MedLegit</h1>
          </div>
          <nav className="p-6 space-y-4">
            <a href="#" className="block text-gray-700 hover:text-purple-600">
              Dashboard
            </a>
            <a href="#" className="block text-gray-700 hover:text-purple-600">
              Cases
            </a>
            <a href="#" className="block text-gray-700 hover:text-purple-600">
              Reports
            </a>
            <a href="#" className="block text-gray-700 hover:text-purple-600">
              Compliance
            </a>
            <a href="#" className="block text-gray-700 hover:text-purple-600">
              Profile
            </a>
            <a href="#" className="block text-gray-700 hover:text-purple-600">
              Settings
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
              Logout
            </button>
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-gray-700">
                Active Cases
              </h3>
              <p className="text-3xl font-bold text-purple-600 mt-2">12</p>
              <p className="text-gray-500 mt-1">
                Ongoing legal/medical compliance checks
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-gray-700">
                Reports Generated
              </h3>
              <p className="text-3xl font-bold text-purple-600 mt-2">8</p>
              <p className="text-gray-500 mt-1">
                AI-powered compliance summaries
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-gray-700">
                Compliance Score
              </h3>
              <p className="text-3xl font-bold text-green-600 mt-2">92%</p>
              <p className="text-gray-500 mt-1">Based on latest audits</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
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
                    <td className="p-4">Aug 20, 2025</td>
                    <td className="p-4">New compliance case uploaded</td>
                    <td className="p-4 text-purple-600 font-semibold">
                      In Review
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-4">Aug 18, 2025</td>
                    <td className="p-4">Report generated</td>
                    <td className="p-4 text-green-600 font-semibold">
                      Completed
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-4">Aug 15, 2025</td>
                    <td className="p-4">Case compliance check initiated</td>
                    <td className="p-4 text-yellow-600 font-semibold">
                      Pending
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
