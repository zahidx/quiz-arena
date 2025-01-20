// pages/index.js
"use client";
import Link from "next/link";
import Footer from "./components/Footer";

const Home = () => {
  return (
    <div className="bg-background min-h-screen flex flex-col justify-between dark:text-white">
      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <h1 className="text-5xl font-bold text-blue-800 mb-4">
          Welcome to QuizArena
        </h1>
        <p className="text-lg text-gray-200 mb-8">
          Test your knowledge with exciting quizzes. Challenge yourself and
          others to top the leaderboard!
        </p>
        <Link href="/quiz">
          <button className="bg-gradient-to-r from-[#0E1628] to-[#380643] text-white px-6 py-3 rounded-md shadow-lg hover:opacity-90 transition duration-300">
            Start Quiz
          </button>
        </Link>
      </section>

      {/* How it Works Section */}
      <section className="bg-gradient-to-r from-[#0E1628] to-[#380643] text-center py-20">
        <h2 className="text-3xl font-semibold text-white mb-4">How it Works</h2>
        <p className="text-lg text-gray-200 mb-6">
          Choose a category, start answering questions, and challenge others to
          beat your score!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white text-center py-6 px-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Choose Your Category</h3>
            <p className="text-gray-500 mt-2">Pick your favorite quiz category.</p>
          </div>
          <div className="bg-white text-center py-6 px-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Answer Questions</h3>
            <p className="text-gray-500 mt-2">Test your knowledge with various questions.</p>
          </div>
          <div className="bg-white text-center py-6 px-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Compete & Win</h3>
            <p className="text-gray-500 mt-2">Climb the leaderboard and challenge friends!</p>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="py-20 text-center bg-gray-800 text-white">
        <h2 className="text-3xl font-semibold mb-4">Leaderboard</h2>
        <p className="text-lg mb-6">See how you stack up against other players!</p>
        <Link href="/leaderboard">
          <button className="bg-gradient-to-r from-[#0E1628] to-[#380643] text-white px-6 py-3 rounded-md shadow-lg hover:opacity-90 transition duration-300">
            View Leaderboard
          </button>
        </Link>
      </section>

      {/* Footer Section */}
<Footer />
    </div>
  );
};

export default Home;
