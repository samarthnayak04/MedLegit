"use client";
import React from "react";
import { Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 py-12 px-6 font-inter">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-32 gap-y-10">
        {/* Left: Brand Info */}
        <div className="space-y-4">
          <h3 className="text-3xl font-extrabold text-white">MedLegit</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            AI-powered platform ensuring{" "}
            <span className="text-cyan-400">authenticity</span> in healthcare
            documents. Detects fraud, verifies diagnosis, and supports{" "}
            <span className="text-cyan-400">legal transparency</span>.
          </p>
        </div>

        {/* Middle: Links */}
        <div className="space-y-2 flex flex-col justify-start items-start">
          <h3 className="text-xl font-bold text-white mb-2">Links</h3>
          <Link
            to="/dashboard"
            className="hover:text-cyan-400 transition text-sm"
          >
            Home
          </Link>
          <Link to="/about" className="hover:text-cyan-400 transition text-sm">
            About Us
          </Link>

          <Link
            to="/services"
            className="hover:text-cyan-400 transition text-sm"
          >
            Our Services
          </Link>
        </div>

        {/* Right: Contact */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-2">Contact</h3>

          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-cyan-400 mt-1" />
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-white font-medium">contact@medlegit.com</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h3 text-cyan-400 mt-1" />
            <div>
              <p className="text-gray-400 text-sm">Location</p>
              <p className="text-white font-medium">Bengaluru, India</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-gray-500 text-xs py-2 mt-4 border-t border-gray-700 ">
        <p className="mt-1 pt-2">
          &copy; {new Date().getFullYear()} MedLegit. Built with{" "}
          <span className="text-cyan-400">AI + Trust</span> 🧠⚖️. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
