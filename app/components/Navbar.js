"use client";
import Link from 'next/link';
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import DarkModeToggler from "./DarkModeToggler";
import { db } from "./Firebase";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch userId from local storage or your authentication method
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      checkProfileStatus(storedUserId);
    } else {
      // Handle case if no userId is found (perhaps prompt login or set default)
      console.error("User not logged in");
      setLoading(false);
    }
  }, []);

  const checkProfileStatus = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, "profiles", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setProfileCompleted(userData.profileCompleted);
      } else {
        setProfileCompleted(null); // Set to null if no profile found
      }
      setLoading(false);
    } catch (error) {
      console.error("Error checking profile status:", error);
      setProfileCompleted(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if modal has been shown before in localStorage
    const modalShown = localStorage.getItem("modalShown");
    if (modalShown === "true") {
      setShowModal(false); // Prevent showing modal if it was already shown
    } else if (profileCompleted === null || profileCompleted === false) {
      setShowModal(true);
      localStorage.setItem("modalShown", "true"); // Mark modal as shown in localStorage
    }
  }, [profileCompleted]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleQuizNavigation = (e) => {
    e.preventDefault();

    if (profileCompleted === null || profileCompleted === false) {
      setShowModal(true);
    } else if (profileCompleted === true) {
      router.push("/quiz");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-[#0E1628] to-[#380643] dark:bg-gradient-to-r dark:from-[#0E0C35] dark:to-[#0d1323] p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-semibold text-xl animate-move">QuizArena</div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link href="/" passHref>
              <span className="text-white hover:text-gray-300 dark:text-gray-300 dark:hover:text-white">Home</span>
            </Link>
          </li>
          <li>
            <Link href="/leaderboard" passHref>
              <span className="text-white hover:text-gray-300 dark:text-gray-300 dark:hover:text-white">Leaderboard</span>
            </Link>
          </li>
          <li>
            <span
              onClick={handleQuizNavigation}
              className="nav-link cursor-pointer text-white hover:text-gray-300 dark:text-gray-300 dark:hover:text-white"
            >
              Quiz
            </span>
          </li>
          <li>
            <Link href="/profile" passHref>
              <span className="text-white hover:text-gray-300 dark:text-gray-300 dark:hover:text-white">Profile</span>
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
          <ul className="md:hidden absolute top-16 left-0 w-full bg-gradient-to-r from-[#0E1628] to-[#380643] dark:bg-gradient-to-r dark:from-[#380643] dark:to-[#0d1323] p-4 space-y-4 z-10">
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
              <span
                onClick={handleQuizNavigation}
                className="text-white hover:text-gray-300 dark:text-gray-300 dark:hover:text-white cursor-pointer"
              >
                Quiz
              </span>
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

        {/* Dark Mode Toggle Component */}
        <DarkModeToggler />
      </div>

      {/* Modal for profile completion */}
      {showModal && (profileCompleted === null || profileCompleted === false) && !loading && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white bg-opacity-90 w-[90%] sm:w-[400px] p-8 rounded-2xl shadow-2xl relative transform scale-100 transition-transform duration-300 ease-in-out">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition duration-300 ease-in-out"
            >
              <span className="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 font-extrabold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Title */}
            <h3 className="text-center text-2xl font-extrabold text-gray-900 tracking-wide">🚀 Complete Your Profile</h3>

            {/* Modal Description */}
            <p className="text-center text-gray-700 mt-4 leading-relaxed">
              Unlock access to the quiz section by completing your profile. This ensures a personalized and seamless experience for you.
            </p>

            {/* Action Button */}
            <div className="mt-6 text-center">
              <Link href="/profile">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gradient-to-r from-[#2c3e50] to-[#34495e] text-white font-semibold rounded-lg hover:bg-gradient-to-r hover:from-[#34495e] hover:to-[#2c3e50] focus:outline-none focus:ring-2 focus:ring-[#1a252f] transition-all duration-300 ease-in-out"
                >
                  Go to Profile
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
