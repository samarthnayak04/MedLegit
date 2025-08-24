import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Example user
  const user = { name: "Anurag Sharma" };
  const firstLetter = user.name.charAt(0).toUpperCase();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className="w-full max-w-6xl mx-auto mt-5 rounded-2xl
      bg-gradient-to-br from-gray-900/70 to-gray-800/70
      backdrop-blur-lg border border-gray-500 shadow-lg 
      px-4 sm:px-6 py-3 flex justify-end items-center relative
      mx-4"
    >
      {/* Profile Avatar */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpen(!open)}
          className="w-11 h-11 rounded-full bg-indigo-600 text-white 
          flex items-center justify-center font-bold shadow-md 
          hover:scale-105 hover:shadow-[0_0_15px_rgba(99,102,241,0.6)]
          transition-all duration-200"
        >
          {firstLetter}
        </button>

        {/* Dropdown Menu with Animation */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-3 w-48 
                bg-gray-900/95 backdrop-blur-md 
                shadow-xl rounded-xl py-2 border border-gray-700 z-50"
            >
              <button
                className="flex items-center gap-2 w-full px-4 py-2 text-sm 
                text-gray-200 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <FiUser className="text-gray-400" /> Edit Profile
              </button>
              <button
                className="flex items-center gap-2 w-full px-4 py-2 text-sm 
                text-red-500 hover:bg-red-600/20 rounded-lg transition-colors"
              >
                <FiLogOut className="text-red-400" /> Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
