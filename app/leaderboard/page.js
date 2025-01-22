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
    <div className="min-h-screen bg-[#232B4C] text-white py-12 px-4 sm:py-16 sm:px-8">
  <div className="max-w-6xl mx-auto bg-[#232B4C] p-6 sm:p-12 rounded-xl shadow-lg">
    <h1 className="text-3xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#FC9219] to-[#FF9A25] mb-6 sm:mb-8">
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
                className="p-4 bg-gradient-to-r from-[#1F2A40] to-[#2B3C5A] rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
              >
                {/* Card Content */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center">
                  {/* Ranking and Username */}
                  <div className="flex flex-col w-full sm:w-1/4 mb-4 sm:mb-0">
                    <div className="text-lg font-semibold text-[#00ff51]">#{index + 1}</div>
                    <div className="text-lg sm:text-xl font-semibold text-white mt-1">{entry.userName}</div>
                  </div>

                  {/* Score and Percentage */}
                  <div className="flex flex-col w-full sm:w-1/3 mb-4 sm:mb-0">
                    <div className="text-gray-300 text-sm sm:text-base">
                      <span className="font-medium">Score:</span> {entry.score} / {entry.totalQuestions}
                    </div>
                    <div className="text-gray-400 text-sm sm:text-base mt-1">
                      <span className="font-medium">Percentage:</span> {entry.percentage.toFixed(2)}%
                    </div>
                  </div>

                  {/* Date and Preferences */}
                  <div className="flex flex-col w-full sm:w-1/3">
                    <div className="text-gray-400 text-sm sm:text-base">
                      <span className="font-medium">Date:</span> {entry.timestamp.toLocaleString()}
                    </div>
                    <div className="text-gray-400 text-sm sm:text-base mt-1">
                      <span className="font-medium">Difficulty:</span> {entry.difficulty}
                      {" | "}
                      <span className="font-medium">Type:</span> {entry.type}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-red-500 text-lg sm:text-xl font-semibold">
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
