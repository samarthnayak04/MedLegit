"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiHome,
  FiInfo,
  FiSettings,
  FiPhone,
} from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Navbar({ fixed = false }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", to: "/dashboard", icon: <FiHome className="w-5 h-5" /> },
    { name: "About Us", to: "/about", icon: <FiInfo className="w-5 h-5" /> },
    {
      name: "Services",
      to: "/services",
      icon: <FiSettings className="w-5 h-5" />,
    },
    { name: "Contact", to: "/contact", icon: <FiPhone className="w-5 h-5" /> },
  ];

  return (
    <header
      className={`w-full ${
        fixed ? "fixed top-0 left-0 z-50" : "relative z-40 mb-8"
      }`}
    >
      <motion.div
        className="flex justify-between items-center px-4 sm:px-6 py-3 rounded-b-2xl 
          bg-slate-900/50 backdrop-blur-xl shadow-lg shadow-black/10 border-b border-blue-900/10 relative"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <img
            src="/images/logo.png"
            alt="MedLegit Logo"
            className="w-11 h-11 scale-165 relative top-[1px]"
          />
          <span className="inline-block text-2xl md:text-3xl font-extrabold tracking-wide text-white leading-none relative top-[1px] drop-shadow-lg">
            MedLegit
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-4">
          {navLinks.map((link, idx) => (
            <motion.div
              key={idx}
              className="relative group flex items-center gap-1"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              <motion.div
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
                  opacity: 0,
                }}
                whileHover={{ opacity: 1, scale: 1.2 }}
                transition={{ duration: 0.3 }}
              />
              <Link
                to={link.to}
                className="flex items-center gap-2 px-4 py-2 text-gray-200 hover:text-cyan-400 transition-colors rounded-lg relative z-10 font-medium"
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          aria-label="Toggle navigation menu"
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
        >
          {mobileMenu ? (
            <FiX className="w-7 h-7" />
          ) : (
            <FiMenu className="w-7 h-7" />
          )}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.nav
              ref={menuRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="absolute top-full left-0 w-full bg-gray-950/95 backdrop-blur-md border-t border-gray-700 shadow-lg flex flex-col md:hidden"
            >
              {navLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.to}
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center gap-2 px-6 py-4 text-gray-300 hover:text-cyan-400 hover:bg-gray-800 transition-all duration-300"
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
