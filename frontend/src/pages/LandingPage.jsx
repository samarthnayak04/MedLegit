"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

// Bubble Background Component
const Bubbles = ({
  bubbleCount = 50,
  colors = ["#0b0ec6ff", "#06b6d4", "#fff"],
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const bubbles = [];
    for (let i = 0; i < bubbleCount; i++) {
      const bubble = document.createElement("div");
      const size = Math.random() * 20 + 10;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.borderRadius = "50%";
      bubble.style.position = "absolute";
      bubble.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.bottom = `-${size}px`;
      bubble.style.opacity = Math.random();
      bubble.style.pointerEvents = "none";
      bubble.style.filter = "blur(1px)";
      container.appendChild(bubble);
      bubbles.push({
        element: bubble,
        speed: Math.random() * 2 + 1,
        sway: Math.random() * 50 - 25,
      });
    }

    const animate = () => {
      bubbles.forEach((bubble) => {
        let bottom = parseFloat(bubble.element.style.bottom);
        bottom += bubble.speed;
        bubble.element.style.bottom = `${bottom}px`;
        bubble.element.style.left = `calc(${bubble.element.style.left} + ${
          Math.sin(bottom / 50) * bubble.sway
        }px)`;

        if (bottom > window.innerHeight + 50) {
          bubble.element.style.bottom = `-${parseFloat(
            bubble.element.style.height
          )}px`;
          bubble.element.style.left = `${Math.random() * 100}%`;
        }
      });
      requestAnimationFrame(animate);
    };

    animate();

    return () => bubbles.forEach((b) => b.element.remove());
  }, [bubbleCount, colors]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
    />
  );
};

// ParticleText Component
const ParticleText = ({ text = "MedLegit" }) => (
  <motion.h2
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="text-[7rem] md:text-[10rem] font-extrabold uppercase text-transparent bg-clip-text relative z-10 text-center"
    style={{
      backgroundImage:
        "url(https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?q=80&w=2070&auto=format&fit=crop)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      textShadow: `0 0 30px #0b0ec640`,
      filter: `drop-shadow(0 0 15px #0b0ec660)`,
    }}
  >
    {text}
  </motion.h2>
);

// DecryptingText Component (faster)
const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const DecryptingText = ({ targetText, speed = 3 }) => {
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    let animationFrameId;
    let iteration = 0;
    let isMounted = true;

    const scramble = () => {
      if (!isMounted) return;

      const newText = targetText
        .split("")
        .map((char, index) => {
          if (iteration > index) return targetText[index];
          if (char === " ") return " ";
          return Math.random() > 0.6
            ? CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
            : char;
        })
        .join("");

      setCurrentText(newText);

      if (iteration < targetText.length) {
        iteration += speed; // ⏩ faster reveal
        animationFrameId = requestAnimationFrame(scramble);
      } else {
        setCurrentText(targetText);
      }
    };

    scramble();

    return () => {
      isMounted = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [targetText, speed]);

  return (
    <motion.p
      className="text-xl md:text-2xl text-center z-10 text-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {currentText}
    </motion.p>
  );
};

// ShimmerButton Component (cursor pointer fix)
const ShimmerButton = ({ onClick, text }) => {
  const customCss = `
    @property --angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }
    @keyframes shimmer-spin {
      to { --angle: 360deg; }
    }
  `;
  return (
    <div className="flex items-center justify-center font-sans">
      <style>{customCss}</style>
      <button
        onClick={onClick}
        className="relative inline-flex items-center justify-center p-[1.5px] 
                   bg-gray-300 dark:bg-black rounded-full overflow-hidden 
                   group cursor-pointer"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "conic-gradient(from var(--angle), transparent 25%, #06b6d4, transparent 50%)",
            animation: "shimmer-spin 2.5s linear infinite",
          }}
        />
        <span
          className="relative z-10 inline-flex items-center justify-center w-full h-full 
                         px-8 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-900 
                         rounded-full group-hover:bg-gray-100 dark:group-hover:bg-gray-800 
                         transition-colors duration-300"
        >
          {text}
        </span>
      </button>
    </div>
  );
};

// LandingPage Component
export default function LandingPage() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div className="w-full h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 font-sans">
        <Bubbles /> {/* Floating Bubbles */}
        {/* Navbar */}
        <div className="top-0 left-0 w-full z-50">
          <Navbar />
        </div>
        {/* Main Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-white z-10">
          <ParticleText />

          <div className="mt-4 space-y-2">
            <DecryptingText
              targetText="Your trusted AI platform for healthcare fraud detection, accurate diagnostics, and legal insights."
              speed={3}
            />
            <DecryptingText targetText="Fast. Reliable. Legit." speed={3} />
          </div>

          <div className="mt-6">
            <ShimmerButton
              onClick={() => setShowPopup(true)}
              text="Get Started"
            />
          </div>
        </div>
        {/* Popup */}
        {showPopup && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/60"
            onClick={() => setShowPopup(false)} // close on backdrop click
          >
            <motion.div
              onClick={(e) => e.stopPropagation()} // prevent close inside
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md mx-auto 
                       [background:linear-gradient(45deg,#080b11,theme(colors.slate.800)_50%,#172033)_padding-box,
                       conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,theme(colors.teal.500)_86%,
                       theme(colors.cyan.300)_90%,theme(colors.teal.500)_94%,theme(colors.slate.600/.48))_border-box] 
                       rounded-2xl border border-transparent animate-border"
            >
              {/* Inner Popup Content */}
              <div className="relative text-left z-10 px-8 py-10 rounded-2xl w-full bg-white dark:bg-black shadow-2xl ring-1 ring-cyan-400/40">
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
                  onClick={() => setShowPopup(false)}
                >
                  &times;
                </button>

                {/* MedLegit Logo */}
                <div className="absolute top-4 left-6 text-2xl font-extrabold text-cyan-400">
                  MedLegit
                </div>

                {/* Popup Content */}
                <div className="mt-10 space-y-3 text-gray-700 dark:text-gray-200">
                  <p>
                    We provide{" "}
                    <span className="text-cyan-400 font-semibold">
                      AI-assisted medical diagnostics, fraud detection
                    </span>
                    , and NLP-based{" "}
                    <span className="text-cyan-400 font-semibold">
                      legal risk analysis
                    </span>{" "}
                    to streamline your workflow.
                  </p>
                  <p>
                    Our platform ensures{" "}
                    <span className="text-cyan-400 font-semibold">
                      data security, accuracy
                    </span>
                    , and actionable insights for healthcare and legal
                    professionals.
                  </p>
                  <p>
                    Join users who trust MedLegit to make informed decisions
                    faster and more reliably.
                  </p>
                </div>

                {/* Sign Up Button */}
                <div className="mt-6 flex justify-center space-x-4">
                  <ShimmerButton
                    onClick={() => navigate("/signup")}
                    text="Sign Up"
                  />

                  <button
                    onClick={() => navigate("/signin")}
                    className="px-8 py-3 rounded-full text-cyan-400 border border-cyan-400 hover:bg-cyan-400 hover:text-black transition-all"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
