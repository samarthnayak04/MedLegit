import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiShield,
  FiActivity,
  FiFileText,
  FiBarChart2,
  FiSettings,
  FiMenu,
  FiLogOut,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsExpanded(window.innerWidth > 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const menuItems = [
    { id: "/dashboard", icon: <FiHome size={18} />, label: "Dashboard" },
    { id: "/dashboard/fraud", icon: <FiShield size={18} />, label: "Fraud Detection" },
    { id: "/dashboard/diagnostic", icon: <FiActivity size={18} />, label: "Diagnostic Analysis" },
    { id: "/dashboard/legal", icon: <FiFileText size={18} />, label: "Legal Case Analysis" },
    { id: "/dashboard/reports", icon: <FiBarChart2 size={18} />, label: "Reports" },
  ];

  const sidebarVariants = {
    expanded: { width: "250px" },
    collapsed: { width: "64px" },
  };

  const overlayVariants = {
    visible: { opacity: 0.5 },
    hidden: { opacity: 0 },
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isExpanded && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black z-20"
          onClick={toggleSidebar}
        />
      )}

      <AnimatePresence>
        <motion.aside
          initial={isExpanded ? "expanded" : "collapsed"}
          animate={isExpanded ? "expanded" : "collapsed"}
          variants={sidebarVariants}
          transition={{ duration: 0.3 }}
          className={`fixed left-0 top-20 h-[calc(95vh-4rem)] mt-4 ml-4 
            bg-gradient-to-br from-gray-900/70 to-gray-800/70 
            backdrop-blur-lg border border-gray-700 shadow-xl rounded-2xl p-6
            flex flex-col z-30 overflow-hidden`}
        >
          {/* User Avatar + Toggle */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                alt="User Avatar"
                className="h-10 w-10 rounded-full object-cover"
              />
              {isExpanded && (
                <div className="flex flex-col">
                  <span className="text-white font-medium">John Doe</span>
                  <span className="text-gray-400 text-sm">Admin</span>
                </div>
              )}
            </div>
            <button
              onClick={toggleSidebar}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <FiMenu />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 flex flex-col gap-3">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.id}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg 
                    text-gray-200 hover:text-white hover:bg-indigo-600/30
                    transition-all duration-200
                    ${isActive ? "bg-indigo-600/40 text-white" : ""} 
                    ${!isExpanded ? "justify-center" : ""}`}
                >
                  {item.icon}
                  {isExpanded && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="mt-6">
            <button
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg 
                text-red-500 hover:text-white hover:bg-red-600/20
                transition-all duration-200 ${!isExpanded ? "justify-center" : ""}`}
            >
              <FiLogOut size={18} />
              {isExpanded && <span>Logout</span>}
            </button>
          </div>
        </motion.aside>
      </AnimatePresence>
    </>
  );
}
