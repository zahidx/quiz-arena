"use client";
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa"; // Font Awesome icons

const DarkModeToggler = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check the saved theme in localStorage and apply the corresponding class to body
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      // Apply the theme class to the body based on saved preference
      if (savedTheme === "dark") {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    } else {
      // If no theme is saved, default to light theme
      document.body.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev ? "dark" : "light";
      // Save the current theme to localStorage
      localStorage.setItem("theme", newTheme);
      // Toggle dark class on the body
      if (newTheme === "dark") {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
      return !prev;
    });
  };

  return (
    <button onClick={toggleDarkMode} className="text-white text-2xl">
      {isDarkMode ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default DarkModeToggler;
