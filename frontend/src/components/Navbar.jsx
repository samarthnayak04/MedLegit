"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

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
    <header
      className="w-full bg-slate-900/70 backdrop-blur-xl shadow-lg shadow-black/40 
  border-b border-blue-500/20 px-4 sm:px-6 py-3 flex justify-between items-center relative z-50"
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <span className="text-3xl md:text-4xl font-extrabold tracking-wide cursor-pointer bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text drop-shadow-lg">
          MedLegit
        </span>
        {/* Optional Icon */}
        {/* <span className="text-cyan-400 text-2xl">⚖️</span> */}
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        {navLinks.map((link, idx) => (
          <Link
            key={idx}
            to={link.to}
            className="relative text-gray-200 hover:text-cyan-300 transition duration-300 
              after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1 
              after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full"
          >
            {link.name}
          </Link>
        ))}

        {/* CTA Button */}
      </nav>

      {/* Mobile Hamburger */}
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            ref={menuRef}
            className="absolute top-full left-0 w-full bg-gray-950/95 border-t border-gray-700 
              backdrop-blur-md shadow-lg z-40 flex flex-col md:hidden"
          >
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.to}
                onClick={() => setMobileMenu(false)}
                className="px-6 py-4 text-gray-300 hover:text-cyan-400 hover:bg-gray-800 transition-all duration-300"
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
