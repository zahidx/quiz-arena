"use client";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/Firebase"; // Firebase configuration
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FaSpinner } from "react-icons/fa";

const LeaderboardPage = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        console.log("Fetching scores from quiz_scores collection...");
        const scoresCollection = collection(db, "quiz_scores");
        const scoresSnapshot = await getDocs(scoresCollection);

        const fetchedScores = scoresSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            userName: data.userName || "Unknown User", // Fetch user name directly from the data
            score: data.score || 0,
            totalQuestions: data.totalQuestions || 0,
            percentage: data.percentage || 0,
            timestamp: data.timestamp.toDate(), // Convert Firestore timestamp
            preferences: data.preferences || {},
            difficulty: data.preferences?.difficulty || "Unknown Difficulty",
            type: data.preferences?.type || "Unknown Type",
          };
        });

        console.log("Fetched Scores:", fetchedScores);

        // Sort scores by percentage descending
        const sortedScores = fetchedScores.sort((a, b) => b.percentage - a.percentage);
        setScores(sortedScores);
      } catch (error) {
        console.error("Error fetching scores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div className="min-h-screen bg-[#1E2A47] text-white py-16 px-8">
      <div className="max-w-6xl mx-auto bg-[#232B4C] p-12 rounded-xl shadow-lg">
        <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#FC9219] to-[#FF9A25] mb-8">
          Leaderboard
        </h1>

        {loading ? (
          <div className="flex justify-center items-center">
            <FaSpinner className="animate-spin text-4xl text-blue-500" />
            <p className="text-center text-gray-400 text-lg ml-4">Loading...</p>
          </div>
        ) : (
          <>
            {scores.length > 0 ? (
              <div className="space-y-6">
                {scores.map((entry, index) => (
                  <div
                    key={entry.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center p-6 bg-gradient-to-r from-[#3B3B3B] to-[#4A4A4A] rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out"
                  >
                    {/* Ranking and Username */}
                    <div className="flex flex-col sm:flex-row sm:w-1/4 mb-4 sm:mb-0 sm:mr-6">
                      <div className="text-lg font-semibold text-[#FFD700]">
                        #{index + 1}
                      </div>
                      <div className="text-xl font-semibold text-white mt-2 sm:mt-0 sm:ml-4">{entry.userName}</div>
                    </div>

                    {/* Score and Percentage (Horizontal Layout for larger screens, vertical on mobile) */}
                    <div className="w-full sm:w-1/2 text-center mb-4 sm:mb-0 sm:mr-6">
                      <div className="text-lg text-gray-300">
                        <span className="font-medium">Score:</span> {entry.score} / {entry.totalQuestions}
                      </div>
                      <div className="text-lg text-gray-400 mt-2 sm:mt-0">
                        <span className="font-medium">Percentage:</span> {entry.percentage.toFixed(2)}%
                      </div>
                    </div>

                    {/* Date and Preferences (Category, Difficulty, Type) */}
                    <div className="w-full sm:w-1/4 text-left sm:text-right">
                      <div className="text-sm text-gray-400">
                        <span className="font-medium">Date:</span> {entry.timestamp.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        <span className="font-medium">Difficulty:</span> {entry.difficulty} |{" "}
                        <span className="font-medium">Type:</span> {entry.type}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-red-500 text-xl font-semibold">
                No Scores Found
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;
