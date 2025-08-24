import { Link } from "react-router-dom";
import {
  FiHome,
  FiShield,
  FiActivity,
  FiFileText,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";

export default function Sidebar() {
  return (
    <aside
      className="w-64 h-[calc(90vh-4rem)] ml-4 font-bold
      bg-gradient-to-br from-gray-900/70 to-gray-800/70 
      backdrop-blur-lg border border-gray-500 shadow-xl 
      rounded-2xl p-6 hidden md:flex flex-col"
    >
      {/* Logo */}
      <h1 className="text-2xl font-extrabold text-white tracking-wide mb-10">
        MedLegit
      </h1>

      {/* Navigation */}
      <nav className="space-y-3">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg 
          text-gray-200 hover:text-white hover:bg-indigo-600/30 
          transition-all duration-200"
        >
          <FiHome size={18} className="text-indigo-400" />
          Dashboard
        </Link>

        <Link
          to="/fraud"
          className="flex items-center gap-3 px-3 py-2 rounded-lg 
          text-gray-200 hover:text-white hover:bg-indigo-600/30 
          transition-all duration-200"
        >
          <FiShield size={18} className="text-purple-400" />
          Fraud Detection
        </Link>

        <Link
          to="/diagnostic"
          className="flex items-center gap-3 px-3 py-2 rounded-lg 
          text-gray-200 hover:text-white hover:bg-indigo-600/30 
          transition-all duration-200"
        >
          <FiActivity size={18} className="text-cyan-400" />
          Diagnostic Analysis
        </Link>

        <Link
          to="/legal"
          className="flex items-center gap-3 px-3 py-2 rounded-lg 
          text-gray-200 hover:text-white hover:bg-indigo-600/30 
          transition-all duration-200"
        >
          <FiFileText size={18} className="text-emerald-400" />
          Legal Case Analysis
        </Link>

        <Link
          to="/reports"
          className="flex items-center gap-3 px-3 py-2 rounded-lg 
          text-gray-200 hover:text-white hover:bg-indigo-600/30 
          transition-all duration-200"
        >
          <FiBarChart2 size={18} className="text-blue-400" />
          Reports
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg 
          text-gray-200 hover:text-white hover:bg-indigo-600/30 
          transition-all duration-200"
        >
          <FiSettings size={18} className="text-pink-400" />
          Settings
        </Link>
      </nav>
    </aside>
  );
}
