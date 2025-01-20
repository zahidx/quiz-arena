// components/Footer.js
"use client";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#0E1628] to-[#380643] text-white py-16 pt-20 relative overflow-hidden dark:bg-gradient-to-r dark:from-[#0b193b] dark:to-[#3f1a48]">
      <div className="absolute inset-0 bg-[url('https://path/to/your/galaxy-image.jpg')] bg-cover bg-center bg-opacity-30 dark:bg-opacity-20"></div>
      <div className="container mx-auto px-6 relative z-10">
        {/* Footer Top Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-semibold animate__animated animate__fadeIn animate__delay-0.5s text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600 dark:from-yellow-400 dark:to-pink-600">
            "Unleash Your Quiz Potential"
          </h2>
          <p className="text-xl mt-3 text-gray-200 animate__animated animate__fadeIn animate__delay-1s dark:text-gray-300">
            The ultimate destination for challenging your knowledge with thrilling quizzes.
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-8 mb-12 animate__animated animate__fadeIn animate__delay-2s">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-blue-600 hover:text-blue-400 transform hover:scale-110 hover:rotate-12 transition duration-300 dark:text-blue-500 dark:hover:text-blue-400"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-blue-400 hover:text-blue-300 transform hover:scale-110 hover:rotate-12 transition duration-300 dark:text-blue-300 dark:hover:text-blue-200"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-pink-600 hover:text-pink-400 transform hover:scale-110 hover:rotate-12 transition duration-300 dark:text-pink-500 dark:hover:text-pink-400"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-red-600 hover:text-red-400 transform hover:scale-110 hover:rotate-12 transition duration-300 dark:text-red-500 dark:hover:text-red-400"
            aria-label="YouTube"
          >
            <FaYoutube />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-blue-800 hover:text-blue-600 transform hover:scale-110 hover:rotate-12 transition duration-300 dark:text-blue-600 dark:hover:text-blue-500"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-gray-700 hover:text-gray-500 transform hover:scale-110 hover:rotate-12 transition duration-300 dark:text-gray-600 dark:hover:text-gray-500"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </div>

        {/* Footer Bottom Section */}
        <div className="text-center animate__animated animate__fadeIn animate__delay-3s">
          <p className="text-sm text-gray-200 dark:text-gray-300">
            &copy; {new Date().getFullYear()} QuizArena. All rights reserved.
          </p>
        </div>
      </div>
      {/* Glowing border effect */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#E5970F] to-[#F0A300] animate__animated animate__pulse animate__infinite animate__delay-1s dark:from-[#F0A300] dark:to-[#E5970F]"></div>
    </footer>
  );
};

export default Footer;
