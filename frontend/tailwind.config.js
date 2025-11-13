import { color } from "framer-motion";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#06b6d4", // cyan for theme
        darkBg: "#0f172a",
      },
    },
  },
  plugins: [],
};
