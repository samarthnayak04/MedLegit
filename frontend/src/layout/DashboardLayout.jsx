import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex relative">
      {/* Gradient Background same as LandingPage */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 to-gray-800" />

      {/* Optional Overlay for darkening */}
      <div className="absolute inset-0 bg-black/20 z-0" />

      {/* Sidebar */}
      <div className="fixed top-20 left-4 bottom-4 z-10">
        <Sidebar />
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col relative z-10 ml-64 md:ml-[250px]">
        {/* Navbar fixed like LandingPage */}
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        {/* Main content with top padding to avoid overlap */}
        <main className="p-6 pt-24 min-h-screen">
          <Outlet /> {/* Nested pages render here */}
        </main>
      </div>
    </div>
  );
}
