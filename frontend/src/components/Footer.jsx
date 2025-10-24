"use client";
import React from "react";

// Reusable SVG icons
const GitHubIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.801 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.727-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.835 2.809 1.305 3.492.998.108-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.562 21.801 24 17.303 24 12 24 5.373 18.627 0 12 0z" />
  </svg>
);

const LinkedInIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8.34 19H5.67V9.56h2.67V19zM7 8.33a1.55 1.55 0 1 1 0-3.11 1.55 1.55 0 0 1 0 3.11zM19 19h-2.67v-4.65c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.78 1.21-1.78 2.46V19h-2.67V9.56h2.56v1.29h.04c.36-.68 1.24-1.39 2.55-1.39 2.73 0 3.24 1.8 3.24 4.14V19z" />
  </svg>
);

const TwitterIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 4.56c-.89.39-1.83.65-2.83.77a4.93 4.93 0 0 0 2.16-2.72 9.85 9.85 0 0 1-3.13 1.2A4.92 4.92 0 0 0 16.62 3c-2.72 0-4.93 2.21-4.93 4.93 0 .39.04.76.12 1.12A13.97 13.97 0 0 1 1.67 3.15a4.93 4.93 0 0 0-.67 2.48c0 1.7.87 3.2 2.19 4.08a4.9 4.9 0 0 1-2.23-.62v.06c0 2.38 1.69 4.36 3.94 4.8a4.94 4.94 0 0 1-2.22.08 4.93 4.93 0 0 0 4.6 3.42A9.86 9.86 0 0 1 0 21.54 13.9 13.9 0 0 0 7.55 23.5c9.05 0 14.01-7.5 14.01-14v-.64c.96-.7 1.8-1.56 2.44-2.54z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 py-14 px-6 font-inter">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-4">
          <h3 className="text-3xl font-extrabold text-white-400">MedLegit</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Empowering healthcare through <span className="text-cyan-400">AI-driven document verification</span> and <span className="text-cyan-400">legal compliance</span>.
            Making medical paperwork safer, faster, and more reliable.
          </p>
          <div className="flex space-x-5 pt-2">
            <a href="#" className="text-gray-500 hover:text-cyan-400 transition-transform transform hover:scale-110"><GitHubIcon size={26} /></a>
            <a href="#" className="text-gray-500 hover:text-cyan-400 transition-transform transform hover:scale-110"><LinkedInIcon size={26} /></a>
            <a href="#" className="text-gray-500 hover:text-cyan-400 transition-transform transform hover:scale-110"><TwitterIcon size={26} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3 text-gray-400">
            <li><a href="#" className="hover:text-cyan-400 transition">Home</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">About Us</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">Our Services</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">Case Studies</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">AI Compliance Blog</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Resources</h3>
          <ul className="space-y-3 text-gray-400">
            <li><a href="#" className="hover:text-cyan-400 transition">FAQs</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">Legal Guidelines</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">Healthcare Standards</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">Terms of Use</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
          <p className="text-gray-400">AI & Legal Research Wing, MedLegit HQ</p>
          <p className="text-gray-400">Email: support@medlegit.ai</p>
          <p className="text-gray-400">Phone: +91 98765 43210</p>
          <p className="text-gray-400">Available: Mon–Fri, 9 AM – 6 PM</p>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm pt-2 mt-10 border-t border-gray-700">
        <p>&copy; {new Date().getFullYear()} MedLegit. All rights reserved.</p>
        <p className="mt-1">Built with <span className="text-cyan-400">AI + Trust</span> by the MedLegit Team 🧠⚖️</p>
      </div>
    </footer>
  );
};

export default Footer;
