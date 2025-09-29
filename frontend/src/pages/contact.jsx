'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent!\n\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="relative bg-gray-900 text-white py-20 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-24 -left-24 w-60 h-60 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row gap-12">
        {/* Contact Info */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
            Contact Us
          </h2>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            Have questions or want to get in touch? Reach out and we'll respond as quickly as possible.
          </p>

          <div className="space-y-4">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-4 bg-gray-800 p-5 rounded-2xl shadow-lg">
              <Mail className="w-6 h-6 text-indigo-400" />
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white font-medium">contact@medlegit.com</p>
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-4 bg-gray-800 p-5 rounded-2xl shadow-lg">
              <Phone className="w-6 h-6 text-indigo-400" />
              <div>
                <p className="text-gray-400 text-sm">Phone</p>
                <p className="text-white font-medium">+91 98765 43210</p>
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-4 bg-gray-800 p-5 rounded-2xl shadow-lg">
              <MapPin className="w-6 h-6 text-indigo-400" />
              <div>
                <p className="text-gray-400 text-sm">Address</p>
                <p className="text-white font-medium">123 MedLegit St, New Delhi, India</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          onSubmit={handleSubmit}
          className="md:w-1/2 bg-gray-800 p-8 rounded-3xl shadow-2xl space-y-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-900 text-white border border-gray-700 focus:border-indigo-500 outline-none transition"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-900 text-white border border-gray-700 focus:border-indigo-500 outline-none transition"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="w-full p-4 rounded-xl bg-gray-900 text-white border border-gray-700 focus:border-indigo-500 outline-none transition resize-none"
            required
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full font-medium shadow-lg hover:shadow-xl transition"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
