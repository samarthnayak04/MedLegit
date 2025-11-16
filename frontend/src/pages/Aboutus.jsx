"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    title: "AI in Healthcare",
    desc: "At MedLegit, we believe technology should make healthcare and law more transparent, reliable, and human-centered. Our mission is to bridge the gap between medical data and legal integrity using advanced AI models — helping professionals make decisions that truly matter.",
    img: "/images/img/i1.png",
  },
  {
    id: 2,
    title: "Medical Document Verification",
    desc: "We are redefining how sensitive healthcare and legal information is handled. MedLegit’s intelligent ecosystem ensures every document, report, and analysis is verified with precision — protecting patients, doctors, insurers, and legal professionals from errors and fraud.",
    img: "/images/img/i2.png",
  },
  {
    id: 3,
    title: "Smart Legal Analysis",
    desc: "Behind every feature lies a vision — to simplify complex decisions, reduce uncertainty, and uphold ethical standards. Our AI-driven approach doesn’t replace expertise; it strengthens it. With MedLegit, every insight is backed by integrity and innovation.",
    img: "/images/img/i3.png",
  },
];

export default function AboutUs() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const textVariants = {
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
  };

  const imageVariants = {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 50, opacity: 0 },
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800 overflow-x-hidden">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div
        onClick={nextSlide}
        className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-8 py-16 md:py-24 cursor-pointer relative z-10"
      >
        {/* Left Content */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0 text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[current].id}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              {/* Text */}
              <div className="relative z-10 max-w-full md:max-w-xl px-2 sm:px-0">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg leading-snug sm:leading-tight">
                  {slides[current].title}
                </h1>
                <p className="text-base sm:text-lg leading-relaxed text-gray-300 tracking-wide mb-6 sm:mb-8">
                  {slides[current].desc}
                </p>

                {/* Navigation Dots */}
                <div className="flex space-x-2 sm:space-x-3 mt-4 sm:mt-6">
                  {slides.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full cursor-pointer transition-all duration-300 ${
                        idx === current
                          ? "bg-white scale-110"
                          : "bg-gray-500 hover:bg-gray-400"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrent(idx);
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center px-2 sm:px-0 mt-6 md:mt-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={slides[current].id}
              src={slides[current].img}
              alt={slides[current].title}
              className="w-full max-w-full sm:max-w-[500px] md:max-w-[550px] max-h-[350px] sm:max-h-[500px] md:max-h-[650px] object-contain rounded-3xl"
              variants={imageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
