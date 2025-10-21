"use client";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", { email, password });
      alert("Signup successful! Please login.");
      navigate("/signin");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <>
      <style jsx>{`
        @property --border-angle {
          syntax: "<angle>";
          inherits: true;
          initial-value: 0deg;
        }
        @keyframes border-spin {
          100% {
            --border-angle: 360deg;
          }
        }
        .animate-border {
          animation: border-spin 6s linear infinite;
        }
      `}</style>

      <div className="w-full h-screen bg-gray-900 flex items-center justify-center px-6">
        <div className="w-full max-w-md [background:linear-gradient(45deg,#080b11,#1e293b_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),#47556980_80%,#14b8a680_86%,#22d3ee_90%,#14b8a680_94%,#47556980)_border-box] rounded-2xl border border-transparent animate-border p-[1.5px]">
          <div className="relative bg-gray-900 dark:bg-black rounded-2xl p-10 text-center w-full">
            <h1 className="text-3xl font-bold mb-2 text-white">Sign Up</h1>
            <p className="text-sm mb-6 text-gray-400">
              Create your account to get started
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <button
                type="submit"
                className="mt-2 bg-cyan-500 hover:bg-cyan-600 transition-colors duration-300 py-3 rounded-lg text-white font-semibold"
              >
                Register
              </button>
            </form>

            <p className="mt-6 text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/signin" className="text-cyan-400 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
