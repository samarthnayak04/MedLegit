"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

// Floating Neon Bubbles
const NeonBubbles = ({ count = 15 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const bubbles = [];
    const colors = ["#06b6d4", "#0ea5e9", "#22d3ee"];

    for (let i = 0; i < count; i++) {
      const bubble = document.createElement("div");
      const size = Math.random() * 15 + 8;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.borderRadius = "50%";
      bubble.style.position = "absolute";
      bubble.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      bubble.style.opacity = Math.random() * 0.4 + 0.3;
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.bottom = `-${size}px`;
      bubble.style.pointerEvents = "none";
      bubble.style.filter = "blur(2px)";
      container.appendChild(bubble);
      bubbles.push({
        element: bubble,
        speed: Math.random() * 1.2 + 0.5,
        sway: Math.random() * 25 - 12,
      });
    }

    const animate = () => {
      bubbles.forEach((b) => {
        let bottom = parseFloat(b.element.style.bottom);
        bottom += b.speed;
        b.element.style.bottom = `${bottom}px`;
        b.element.style.left = `calc(${b.element.style.left} + ${
          Math.sin(bottom / 50) * b.sway
        }px)`;
        if (bottom > 200) {
          b.element.style.bottom = `-${parseFloat(b.element.style.height)}px`;
          b.element.style.left = `${Math.random() * 100}%`;
        }
      });
      requestAnimationFrame(animate);
    };

    animate();

    return () => bubbles.forEach((b) => b.element.remove());
  }, [count]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none" />
  );
};

export default function Footer() {
  return (
    <footer className="fixed relative w-full bg-gradient-to-t from-gray-900 to-gray-800 text-gray-200 pt-16 pb-8 overflow-hidden">
      <NeonBubbles />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 relative z-10">
        {/* About
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-cyan-400">MedLegit</h3>
          <p className="text-gray-400">
            AI-powered medical diagnostics, fraud detection, and legal insights.
            Trusted by healthcare and legal professionals globally.
          </p>
        </div> */}

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-cyan-400">Quick Links</h3>
          <ul className="space-y-2">
            <li className="hover:text-cyan-300 transition cursor-pointer">
              Home
            </li>
            <li className="hover:text-cyan-300 transition cursor-pointer">
              About
            </li>
            <li className="hover:text-cyan-300 transition cursor-pointer">
              Services
            </li>
            <li className="hover:text-cyan-300 transition cursor-pointer">
              Contact
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-cyan-400">Connect</h3>
          <p className="text-gray-400">contact@medlegit.com</p>
          <div className="flex items-center gap-4 mt-2">
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#"
              className="text-gray-400 hover:text-cyan-400"
            >
              <FaTwitter size={22} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#"
              className="text-gray-400 hover:text-cyan-400"
            >
              <FaLinkedin size={22} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#"
              className="text-gray-400 hover:text-cyan-400"
            >
              <FaGithub size={22} />
            </motion.a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm relative z-10">
        &copy; {new Date().getFullYear()} MedLegit. All rights reserved.
      </div>
    </footer>
  );
}
