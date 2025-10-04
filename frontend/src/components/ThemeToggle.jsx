import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${
          darkMode ? "bg-primary" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
            darkMode ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
      <span className="text-sm text-gray-700 dark:text-gray-200">
        {/* {darkMode ? "Dark" : "Light"} */}
      </span>
    </div>
  );
}
