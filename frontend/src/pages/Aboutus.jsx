"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    title: "AI in Healthcare",
    desc: "Leveraging Artificial Intelligence, our platform helps medical professionals and legal experts analyze patient records, prescriptions, and reports with unmatched accuracy. By detecting anomalies and verifying document authenticity, we ensure that decisions are made faster and with complete confidence, reducing errors and improving outcomes.",
    img: "/images/img/img1.jpeg",
  },
  {
    id: 2,
    title: "Medical Document Verification",
    desc: "Our AI-powered system streamlines the verification process for medical and legal documents, ensuring transparency and trust. From insurance claims to hospital records, each document is cross-checked for authenticity and compliance, saving time, reducing manual effort, and maintaining regulatory standards.",
    img: "/images/img/img2.jpeg",
  },
  {
    id: 3,
    title: "Smart Legal Analysis",
    desc: "Complex healthcare files often contain vast amounts of data and intricate legal information. Our smart analysis tool scans these documents, highlights key insights, and provides actionable recommendations in seconds. Professionals can quickly identify risks, compliance issues, and important details, enabling faster and smarter decision-making.",
    img: "/images/img/img3.jpeg",
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
    <div className="min-h-screen w-full relative text-white">
      {/* Background gradients */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226, 232, 240, 0.15), transparent 70%), #000000",
        }}
      />
      {/* <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(60deg, rgba(255, 0, 100, 0.2) 0, rgba(255, 0, 100, 0.2) 1px, transparent 1px, transparent 22px),
            repeating-linear-gradient(-60deg, rgba(0, 255, 200, 0.15) 0, rgba(0, 255, 200, 0.15) 1px, transparent 1px, transparent 22px),
            repeating-linear-gradient(0deg, rgba(255, 0, 100, 0.2) 0, rgba(255, 0, 100, 0.2) 1px, transparent 1px, transparent 22px)
          `,
          backgroundSize: "44px 44px",
        }}
      /> */}

      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Content */}
      <div
        onClick={nextSlide}
        className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 py-32 cursor-pointer relative z-10"
      >
        {/* Left Content */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={slides[current].id}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl font-bold mb-6">{slides[current].title}</h1>
              <p className="text-xl leading-relaxed">{slides[current].desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Image */}
        <div className="md:w-1/3 flex justify-center">
          <AnimatePresence exitBeforeEnter>
            <motion.img
              key={slides[current].id}
              src={slides[current].img}
              alt={slides[current].title}
              className="w-[300px] h-[400px] object-cover rounded-2xl shadow-lg"
              variants={imageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-10 space-x-3 relative z-10">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`w-4 h-4 rounded-full cursor-pointer transition-colors ${
              idx === current ? "bg-white" : "bg-gray-500"
            }`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
}
