"use client";
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa"; // Font Awesome icons

const DarkModeToggler = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check the saved theme in localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Save the current theme to localStorage
    const newTheme = !isDarkMode ? "dark" : "light";
    localStorage.setItem("theme", newTheme);

    // Toggle dark class on the body
    if (newTheme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  return (
    <button onClick={toggleDarkMode} className="text-white text-2xl">
      {isDarkMode ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default DarkModeToggler;
