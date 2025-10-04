"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle"; // adjust path if needed

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const menuRef = useRef(null);

  // Close mobile menu when clicking outside
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
    { name: "Home", to: "/" },
    { name: "About Us", to: "/about" },
    { name: "Services", to: "/services" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <header className="w-full bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-lg shadow-lg px-4 sm:px-6 py-3 flex justify-between items-center relative z-50">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <Link to="/">
          {" "}
          {/* <-- Wrap logo in Link */}
          <span className="text-4xl font-bold text-white tracking-wide cursor-pointer">
            MedLegit
          </span>
        </Link>
        <div className="bg-white p-2 rounded-full shadow-md">
          {/* Optional logo image */}
          {/* <img src="/images/Logo1.png" alt="MedLegit Logo" className="w-10 h-10 object-contain" /> */}
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        {navLinks.map((link, idx) => (
          <Link
            key={idx}
            to={link.to}
            className="px-3 py-1 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all"
          >
            {link.name}
          </Link>
        ))}
        <ThemeToggle />
      </nav>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMobileMenu(!mobileMenu)}
        className="md:hidden text-gray-300 hover:text-white focus:outline-none"
      >
        {mobileMenu ? (
          <FiX className="w-6 h-6" />
        ) : (
          <FiMenu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            ref={menuRef}
            className="absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-md shadow-lg z-40 flex flex-col md:hidden"
          >
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.to}
                onClick={() => setMobileMenu(false)}
                className="px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-all"
              >
                {link.name}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
