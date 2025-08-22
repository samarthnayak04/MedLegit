import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md h-screen p-6 hidden md:block">
      <h1 className="text-2xl font-bold text-purple-600 mb-8">MedLegit</h1>
      <nav className="space-y-4">
        <Link to="/" className="block text-gray-700 hover:text-purple-600">
          Dashboard
        </Link>
        <Link to="/fraud" className="block text-gray-700 hover:text-purple-600">
          Fraud Detection
        </Link>
        <Link
          to="/diagnostic"
          className="block text-gray-700 hover:text-purple-600"
        >
          Diagnostic Analysis
        </Link>
        <Link to="/legal" className="block text-gray-700 hover:text-purple-600">
          Legal Case Analysis
        </Link>
        <Link
          to="/reports"
          className="block text-gray-700 hover:text-purple-600"
        >
          Reports
        </Link>
        <Link
          to="/settings"
          className="block text-gray-700 hover:text-purple-600"
        >
          Settings
        </Link>
      </nav>
    </aside>
  );
}
