import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const blurPercentage = 5; // Adjust blur here

  return (
    <div className="min-h-screen bg- relative flex">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-600 via-black to-gray-600"></div>

      {/* <div className="absolute inset-0 z-0 bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300"></div> */}
      {/* <div className="absolute inset-0 z-0 bg-gradient-to-br from-black via-gray-500-15% to-gray-500"></div> */}

      {/* Background Image */}
      {/* <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(/images/bg3.jpg)`, // image from public folder
          filter: `blur(${blurPercentage}px)`,
        }}
      ></div> */}

      {/* Overlay to darken background */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      {/* Sidebar + Content */}
      <Sidebar />

      <div className="flex-1 flex flex-col relative z-10">
        <Navbar />
        <main className="p-6 min-h-screen">
          <Outlet /> {/* Pages load here */}
        </main>
      </div>
    </div>
  );
}
