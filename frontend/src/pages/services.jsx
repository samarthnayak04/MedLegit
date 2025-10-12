"use client";
import { motion } from "framer-motion";
import { Shield, Heart, FileText } from "lucide-react";
import Navbar from "../components/Navbar";

const services = [
  {
    id: 1,
    icon: <Shield className="w-10 h-10 text-indigo-400" />,
    title: "Fraud Detection",
    description:
      "AI-powered detection of suspicious insurance claims to prevent financial losses and ensure compliance.",
    gradient: "from-purple-600 to-indigo-600",
  },
  {
    id: 2,
    icon: <Heart className="w-10 h-10 text-red-400" />,
    title: "Medical Diagnosis",
    description:
      "Advanced AI-assisted medical diagnostics for faster, accurate analysis of X-rays, CT scans, and reports.",
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    id: 3,
    icon: <FileText className="w-10 h-10 text-green-400" />,
    title: "Legal Analysis",
    description:
      "NLP-based legal risk assessment and compliance checks to guide healthcare and insurance decisions.",
    gradient: "from-green-600 to-emerald-500",
  },
];

export default function Services() {
  return (
    <section className="relative bg-gray-900 text-white min-h-screen flex items-center justify-center overflow-hidden">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
            Our Services
          </h2>
          <p className="mt-4 text-gray-300 text-lg md:text-xl">
            Comprehensive solutions combining AI, healthcare, and legal
            expertise.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-700 flex flex-col items-start gap-4 transition"
            >
              <div
                className={`p-4 rounded-xl bg-gradient-to-r ${service.gradient} shadow-lg`}
              >
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-white">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="mt-auto py-2 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full text-white font-medium shadow-lg hover:shadow-xl transition"
              >
                Learn More
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
