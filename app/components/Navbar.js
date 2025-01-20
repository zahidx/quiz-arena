"use client"; // Adding this to ensure the correct client-side behavior

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa"; // Font Awesome icons

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggling the menu

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-[#0E1628] to-[#380643] dark:bg-gradient-to-r dark:from-[#380643] dark:to-[#0E1628] p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-semibold text-xl animate-move">
          QuizArena
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link href="/" passHref>
              <span className="text-white hover:text-gray-300 dark:text-gray-300 dark:hover:text-white">
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link href="/leaderboard" passHref>
              <span className="text-white hover:text-gray-300 dark:text-gray-300 dark:hover:text-white">
                Leaderboard
              </span>
            </Link>
          </li>
          <li>
            <Link href="/quiz" passHref>
              <span className="text-white hover:text-gray-300 dark:text-gray-300 dark:hover:text-white">
                Start Quiz
              </span>
            </Link>
          </li>
          <li>
            <Link href="/profile" passHref>
              <span className="text-white hover:text-gray-300 dark:text-gray-300 dark:hover:text-white">
                Profile
              </span>
            </Link>
          </li>
        </ul>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <ul className="md:hidden absolute top-16 left-0 w-full bg-gradient-to-r from-[#0E1628] to-[#380643] dark:bg-gradient-to-r dark:from-[#380643] dark:to-[#0E1628] p-4 space-y-4">
            <li>
              <Link href="/" passHref>
                <span
                  className="text-white hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
                  onClick={toggleMenu}
                >
                  Home
                </span>
              </Link>
            </li>
            <li>
              <Link href="/leaderboard" passHref>
                <span
                  className="text-white hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
                  onClick={toggleMenu}
                >
                  Leaderboard
                </span>
              </Link>
            </li>
            <li>
              <Link href="/quiz" passHref>
                <span
                  className="text-white hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
                  onClick={toggleMenu}
                >
                  Start Quiz
                </span>
              </Link>
            </li>
            <li>
              <Link href="/profile" passHref>
                <span
                  className="text-white hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
                  onClick={toggleMenu}
                >
                  Profile
                </span>
              </Link>
            </li>
          </ul>
        )}

        {/* Dark Mode Toggle */}
        <button onClick={toggleDarkMode} className="text-white text-2xl">
          {isDarkMode ? <FaMoon /> : <FaSun />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
