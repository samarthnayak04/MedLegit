import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function About() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col justify-center items-center">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        About Us
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-gray-300 max-w-3xl text-center leading-relaxed"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        We provide AI-assisted medical-legal solutions to streamline healthcare
        and legal workflows. Our platform empowers professionals to make faster,
        smarter, and fully informed decisions, combining cutting-edge technology
        with domain expertise for accuracy, transparency, and trust.
      </motion.p>

      <motion.div
        className="mt-8 flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-lg font-medium hover:shadow-xl transition">
          Learn More
        </button>
        <button
          onClick={() => navigate("/contact")}
          className="px-6 py-3 border border-indigo-500 rounded-full font-medium text-indigo-400 hover:text-white hover:bg-indigo-600 transition"
        >
          Contact Us
        </button>
      </motion.div>
    </section>
  );
}
