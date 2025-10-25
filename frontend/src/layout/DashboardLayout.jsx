// DashboardLayout.jsx
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-950 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-[250px] transition-all duration-300">
        <Navbar fixed />

        <main className="flex-1 p-4 md:p-6 mt-16 md:mt-0 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
