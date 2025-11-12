import { useState, useEffect } from "react";
import api from "../api/axios";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiShield,
  FiActivity,
  FiFileText,
  FiMenu,
  FiLogOut,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const getInitials = (first, last) => {
    const f = first?.charAt(0)?.toUpperCase() || "";
    const l = last?.charAt(0)?.toUpperCase() || "";
    return f + l;
  };

  const getColorFromName = (name) => {
    const colors = [
      "#1F2937",
      "#264653",
      "#3A015C",
      "#494A49",
      "#581845",
      "#5c4d3b",
      "#334155",
      "#475569",
      "#1e293b",
      "#414b62ff",
      "#3f3f46",
      "#4b5563",
      "#34495e",
      "#3b4d45",
      "#5d3e4a",
      "#455a64",
      "#4a3e5d",
    ];
    const hash = Array.from(name).reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    );
    const index = hash % colors.length;
    return colors[index];
  };

  const initials = getInitials(user.first_name, user.last_name);
  const bgColor = getColorFromName(initials);

  const fullName = `${
    user.first_name
      ? user.first_name[0].toUpperCase() + user.first_name.slice(1)
      : ""
  } ${
    user.last_name
      ? user.last_name[0].toUpperCase() + user.last_name.slice(1)
      : ""
  }`;

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
    {
      id: "/dashboard/fraud",
      icon: <FiShield size={18} />,
      label: "Fraud Detection",
    },
    {
      id: "/dashboard/diagnostic",
      icon: <FiActivity size={18} />,
      label: "Diagnostic Analysis",
    },
    {
      id: "/dashboard/legal",
      icon: <FiFileText size={18} />,
      label: "Legal Case Analysis",
    },
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
          className={`fixed left-0 top-0 md:top-10 h-screen md:h-[calc(95vh)] mt-0 md:mt-4  
            bg-gradient-to-br from-gray-900/30 to-gray-900/50 
            backdrop-blur-lg border border-gray-800 shadow-xl rounded-2xl p-6
            flex flex-col z-30 overflow-hidden`}
        >
          {/* User Avatar + Toggle */}
          <div className="flex items-center justify-between mb-4 mt-2">
            <div className="flex items-center gap-2 overflow-hidden">
              <motion.div
                initial={{ scale: 1, opacity: 1 }}
                animate={
                  isExpanded
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0, opacity: 0 }
                }
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="h-9 w-9 md:h-9 md:w-9 rounded-full flex items-center justify-center 
                  text-white font-semibold text-lg shadow-md origin-left"
                style={{ backgroundColor: bgColor }}
              >
                {initials || "U"}
              </motion.div>

              <motion.div
                initial={{ opacity: 1, x: 0 }}
                animate={
                  isExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                }
                transition={{ duration: 0.3 }}
                className="flex flex-col"
              >
                <span className="text-sm md:text-base font-semibold text-white drop-shadow-md">
                  {fullName}
                </span>
              </motion.div>
            </div>

            <button
              onClick={toggleSidebar}
              className="text-gray-300 hover:text-white focus:outline-none flex-shrink-0"
            >
              <FiMenu size={20} />
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
                transition-all duration-200 cursor-pointer${
                  !isExpanded ? "justify-center" : ""
                }`}
              onClick={async () => {
                try {
                  const res = await api.post("/auth/logout");
                  if (res.status === 200) {
                    localStorage.removeItem("access_token");
                    window.location.href = "/";
                    console.log("Logged out successfully");
                  } else {
                    console.error("Logout failed", res);
                  }
                } catch (err) {
                  console.error("Error logging out:", err);
                }
              }}
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
