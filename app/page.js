"use client";
import Link from "next/link";
import Footer from "./components/Footer";
import { FaListAlt, FaRegCheckCircle, FaTrophy } from "react-icons/fa";
import { FaStar, FaMedal } from "react-icons/fa"; // Add FaMedal here

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between dark:text-white bg-background">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-gradient-to-r from-[#1E2A47] to-[#4C2F72] text-white shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://path/to/your/galaxy-image.jpg')] bg-cover bg-center bg-opacity-30"></div>
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FF6347] animate__animated animate__fadeIn animate__delay-1s">
          Welcome to QuizArena
        </h1>
        <p className="pt-5 text-lg text-gray-300 mb-8 animate__animated animate__fadeIn animate__delay-2s">
          Test your knowledge with exciting quizzes. Challenge yourself and
          others to top the leaderboard!
        </p>
        <Link href="/quiz">
          <button className="bg-gradient-to-r from-[#1E2A47] to-[#4C2F72] text-white px-6 py-3 rounded-md shadow-xl transform hover:scale-110 hover:opacity-90 transition-all duration-300 ease-in-out relative overflow-hidden group">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#4C2F72] to-[#1E2A47] opacity-50 group-hover:opacity-0 transition-all duration-500 ease-in-out"></span>
            <span className="relative z-10 text-lg font-semibold">
              Start Quiz
            </span>
            <span className="absolute top-0 left-0 w-0 h-full bg-white opacity-30 transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </button>
        </Link>
      </section>

      {/* How it Works Section */}
      <section className="bg-gradient-to-r from-[#1E2A47] to-[#4C2F72] dark:from-[#0E1628] dark:to-[#380643] text-center py-20 relative pl-20 pr-20">
        <h2 className="text-4xl font-semibold text-white mb-6 animate__animated animate__fadeIn animate__delay-1s">
          How it Works
        </h2>
        <p className="text-lg text-gray-300 mb-10 animate__animated animate__fadeIn animate__delay-2s">
          Choose a category, start answering questions, and challenge others to
          beat your score!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* First Card: Choose Category */}
          <div className="bg-white text-center py-8 px-6 rounded-lg shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300 animate__animated animate__fadeIn animate__delay-3s dark:bg-[#1F2937] dark:text-white">
            <div className="flex justify-center items-center text-6xl text-[#4C2F72] mb-4 dark:text-white">
              <FaListAlt />
            </div>
            <h3 className="text-xl font-semibold text-[#4C2F72] dark:text-[#ddd3ea]">
              Choose Your Category
            </h3>
            <p className="text-gray-500 mt-2 dark:text-gray-300">
              Pick your favorite quiz category.
            </p>
          </div>

          {/* Second Card: Answer Questions */}
          <div className="bg-white text-center py-8 px-6 rounded-lg shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300 animate__animated animate__fadeIn animate__delay-4s dark:bg-[#1F2937] dark:text-white">
            <div className="flex justify-center items-center text-6xl text-[#4C2F72] mb-4 dark:text-white">
              <FaRegCheckCircle />
            </div>
            <h3 className="text-xl font-semibold text-[#4C2F72] dark:text-[#ddd3ea]">
              Answer Questions
            </h3>
            <p className="text-gray-500 mt-2 dark:text-gray-300">
              Test your knowledge with various questions.
            </p>
          </div>

          {/* Third Card: Compete & Win */}
          <div className="bg-white text-center py-8 px-6 rounded-lg shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300 animate__animated animate__fadeIn animate__delay-5s dark:bg-[#1F2937] dark:text-white">
            <div className="flex justify-center items-center text-6xl text-[#4C2F72] mb-4 dark:text-white">
              <FaTrophy />
            </div>
            <h3 className="text-xl font-semibold text-[#4C2F72] dark:text-[#ddd3ea]">
              Compete & Win
            </h3>
            <p className="text-gray-500 mt-2 dark:text-gray-300">
              Climb the leaderboard and challenge friends!
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 text-center bg-gradient-to-r from-[#1E2A47] to-[#4C2F72] dark:from-[#0E1628] dark:to-[#380643] text-white relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-r from-[#4C2F72] to-[#1E2A47] opacity-30 dark:bg-gradient-to-r dark:from-[#1F2937] dark:to-[#4B5563] transform scale-150 -z-10"></div>

  <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 animate__animated animate__fadeIn animate__delay-1s">
    Leaderboard
  </h2>
  <p className="text-lg sm:text-xl mb-8 text-gray-200 dark:text-gray-400 animate__animated animate__fadeIn animate__delay-2s">
    See how you stack up against the best players! Challenge your friends and climb the ranks.
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate__animated animate__fadeIn animate__delay-3s pl-20 pr-20">
    {/* Top Rank Card */}
    <div className="bg-gradient-to-r from-[#E69A10] to-[#D1A100] dark:bg-gradient-to-r dark:from-[#1F2937] dark:to-[#0F1629] text-center py-8 px-6 rounded-lg shadow-2xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
      <div className="flex justify-center items-center text-6xl text-white mb-4">
        <FaTrophy />
      </div>
      <h3 className="text-2xl font-semibold text-white mb-2">Top Player</h3>
      <p className="text-lg text-white">#1 Rank</p>
      <p className="text-gray-200 dark:text-gray-400">Achieved an unbeatable score!</p>
    </div>

    {/* Mid Rank Card */}
    <div className="bg-gradient-to-r from-[#E69A10] to-[#D1A100] dark:bg-gradient-to-r dark:from-[#1F2937] dark:to-[#0F1629] text-center py-8 px-6 rounded-lg shadow-2xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
      <div className="flex justify-center items-center text-6xl text-white mb-4">
        <FaStar />
      </div>
      <h3 className="text-2xl font-semibold text-white mb-2">Second Place</h3>
      <p className="text-lg text-white">#2 Rank</p>
      <p className="text-gray-200 dark:text-gray-400">Consistently dominating the quiz!</p>
    </div>

    {/* Bottom Rank Card */}
    <div className="bg-gradient-to-r from-[#E69A10] to-[#D1A100] dark:bg-gradient-to-r dark:from-[#1F2937] dark:to-[#0F1629] text-center py-8 px-6 rounded-lg shadow-2xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
      <div className="flex justify-center items-center text-6xl text-white mb-4">
        <FaMedal />
      </div>
      <h3 className="text-2xl font-semibold text-white mb-2">Third Place</h3>
      <p className="text-lg text-white">#3 Rank</p>
      <p className="text-gray-200 dark:text-gray-400">Strong performance in every quiz!</p>
    </div>
  </div>

  <div className="mt-8">
    <Link href="/leaderboard">
      <button className="font-semibold bg-gradient-to-r from-[#1E2A47] to-[#4C2F72] text-white px-8 py-4 rounded-xl shadow-2xl transform hover:scale-110 hover:opacity-90 transition-all duration-300 ease-in-out relative overflow-hidden group">
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#4C2F72] to-[#1E2A47] opacity-50 group-hover:opacity-0 transition-all duration-500 ease-in-out"></span>
        <span className="relative z-10 text-lg">View Full Leaderboard</span>
        <span className="absolute top-0 left-0 w-0 h-full bg-white opacity-30 transition-all duration-300 ease-in-out group-hover:w-full"></span>
      </button>
    </Link>
  </div>
</section>


      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Home;
