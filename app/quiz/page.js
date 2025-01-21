"use client";
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, PointElement, LineElement);

const Quiz = () => {

  const [preferences, setPreferences] = useState({
    difficulty: "any",
    type: "any",
    category: "9", // Default to General Knowledge
  });
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timeUp, setTimeUp] = useState(false); // Time-up state
  const [timeLeft, setTimeLeft] = useState(30); // Timer for each question, starting from 30 seconds

  const API_BASE = "https://opentdb.com/api.php?amount=40&encode=url3986";

  // Build the API URL based on user preferences
  const buildApiUrl = () => {
    let url = `${API_BASE}&category=${preferences.category}`;
    if (preferences.difficulty !== "any") {
      url += `&difficulty=${preferences.difficulty}`;
    }
    if (preferences.type !== "any") {
      url += `&type=${preferences.type}`;
    }
    return url;
  };

  // Fetch and process questions
  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(buildApiUrl());
      const data = await response.json();

      // Decode and randomize questions
      const decodedQuestions = data.results.map((question) => ({
        ...question,
        question: decodeURIComponent(question.question),
        correct_answer: decodeURIComponent(question.correct_answer),
        incorrect_answers: question.incorrect_answers.map((answer) =>
          decodeURIComponent(answer)
        ),
      }));
      const randomizedQuestions = decodedQuestions
        .sort(() => Math.random() - 0.5)
        .slice(0, 15);

      setQuestions(randomizedQuestions);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setIsLoading(false);
    }
  };

  // Handle preferences change
  const handlePreferenceChange = (key, value) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  // Start the quiz
  const startQuiz = () => {
    fetchQuestions();
  };

  // Shuffle options (correct + incorrect answers)
  const getShuffledOptions = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const allOptions = [
      currentQuestion.correct_answer,
      ...currentQuestion.incorrect_answers,
    ];
    return allOptions.sort(() => Math.random() - 0.5);
  };

  // Handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  // Handle the "Next" or "Finish" button click
  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];

    // If no option is selected, treat it as a wrong answer
    if (selectedOption === null) {
      setScore((prevScore) => prevScore - 1); // Subtract a point for not selecting an answer
    } else if (selectedOption === currentQuestion.correct_answer) {
      setScore((prevScore) => prevScore + 1); // Increment score for correct answer
    }

    // Move to the next question or finish the quiz
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null); // Reset selected option
      setTimeLeft(30); // Reset the timer for the next question
      setTimeUp(false); // Reset the time-up state
    } else {
      setQuizCompleted(true); // End the quiz
    }
  };

  // Handle time-up event
  const handleTimeUp = () => {
    setTimeUp(true); // Trigger time-up state
  };

  // Timer effect to countdown for each question
  useEffect(() => {
    if (timeLeft === 0) {
      handleTimeUp(); // Trigger time-up when timer hits zero
      return;
    }

    if (!timeUp) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000); // Countdown every second
      return () => clearTimeout(timer); // Cleanup the timer on effect cleanup
    }
  }, [timeLeft, timeUp]);

  // Automatically go to the next question when time is up
  useEffect(() => {
    if (timeUp) {
      handleNextQuestion(); // Go to next question after time-up
    }
  }, [timeUp]);



  // Score chart data
  const scorePercentage = (score / questions.length) * 100;

  const chartData = {
    labels: ['Score'],
    datasets: [
      {
        label: 'Your Score',
        data: [score],
        borderColor: '#28a745',
        backgroundColor: '#28a745',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Total Questions',
        data: [questions.length],
        borderColor: '#6c757d',
        backgroundColor: '#6c757d',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <div className="container mx-auto py-10 px-4 text-center bg-[#252B4D] dark:bg-[#0E1628] dark:text-white">
      <h1 className="text-5xl font-bold text-[#FF8C2E] dark:text-indigo-400 mb-6">
        Quiz Arena
      </h1>

      {isLoading ? (
        <p className="text-lg text-gray-600">Loading questions...</p>
      ) : quizCompleted ? (









        <div className="bg-gradient-to-r from-[#0A1F35] to-[#1B3A4B] p-8 rounded-xl shadow-lg max-w-3xl mx-auto mt-12 text-center">
        <h2 className="text-4xl font-extrabold text-white mb-4">Quiz Completed!</h2>
        <p className="text-lg font-medium text-gray-300 mb-6">Well done! Here are your results.</p>
        
        <div className="mb-6">
          <p className="text-2xl font-semibold text-white">
            Your score: <span className="text-yellow-400">{score}/{questions.length}</span>
          </p>
        </div>
  
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-100">
                Score Progress
              </span>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-100">
                {Math.round(scorePercentage)}%
              </span>
            </div>
            <div className="flex mb-2 justify-between">
              <div className="w-full bg-teal-200 rounded-full">
                <div className="bg-teal-500 text-xs leading-none py-1 text-center text-white rounded-full" style={{ width: `${scorePercentage}%` }}></div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Score Chart */}
        <div className="mb-6">
          <Line data={chartData} />
        </div>
  
        <div>
        {/* <button
      onClick={() => router.push('/')}
      className="py-3 px-6 rounded-full bg-gradient-to-r from-teal-500 to-teal-400 text-white text-lg font-semibold shadow-md transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
    >
      Go to Home
    </button> */}

        </div>
      </div>










      ) : questions.length === 0 ? (
        
        // Set Preferences section start for the quiz
        <div className="bg-gradient-to-r from-[#0E1628] to-[#380643] p-8 rounded-xl shadow-2xl max-w-lg mx-auto mt-12">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF5C8D] to-[#04D8B7] mb-8 text-center">
            Set Your Preferences
          </h2>

          {/* Select Category */}
          <div className="mb-8">
            <label className="block text-white mb-3 font-medium text-lg tracking-wide">
              Select Category
            </label>
            <select
              value={preferences.category}
              onChange={(e) => handlePreferenceChange("category", e.target.value)}
              className="w-full p-4 bg-gray-800 text-white rounded-lg shadow-lg border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
            >
              <option value="9" className="bg-gray-700 text-white">
                General Knowledge
              </option>
              <option value="18" className="bg-gray-700 text-white">
                Science
              </option>
              <option value="21" className="bg-gray-700 text-white">
                Sports
              </option>
              <option value="22" className="bg-gray-700 text-white">
                Geography
              </option>
              <option value="11" className="bg-gray-700 text-white">
                Movies
              </option>
              <option value="15" className="bg-gray-700 text-white">
                Entertainment
              </option>
            </select>
          </div>

          
          {/* Select Difficulty */}
          <div className="mb-8">
            <label className="block text-white mb-3 font-medium text-lg tracking-wide">
              Select Difficulty
            </label>
            <select
              value={preferences.difficulty}
              onChange={(e) =>
                handlePreferenceChange("difficulty", e.target.value)
              }
              className={`w-full p-4 text-white rounded-lg shadow-lg border-2 border-transparent focus:ring-2 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105
    ${preferences.difficulty === "any"
        ? "bg-gradient-to-r from-blue-800 to-blue-700"
        : ""}
    ${preferences.difficulty === "easy"
        ? "bg-gradient-to-r from-green-800 to-green-600"
        : ""}
    ${preferences.difficulty === "medium"
        ? "bg-gradient-to-r from-yellow-800 to-yellow-600"
        : ""}
    ${preferences.difficulty === "hard"
        ? "bg-gradient-to-r from-red-700 to-red-600"
        : ""}`}
            >
              <option value="any" className="bg-gray-700 text-white">
                Any
              </option>
              <option value="easy" className="bg-gray-700 text-white">
                Easy
              </option>
              <option value="medium" className="bg-gray-700 text-white">
                Medium
              </option>
              <option value="hard" className="bg-gray-700 text-white">
                Hard
              </option>
            </select>
          </div>

          

          {/* Select Question Type */}
          <div className="mb-8">
            <label className="block text-white mb-3 font-medium text-lg tracking-wide">
              Select Question Type
            </label>
            <select
              value={preferences.type}
              onChange={(e) => handlePreferenceChange("type", e.target.value)}
              className="w-full p-4 bg-gray-800 text-white rounded-lg shadow-lg border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
            >
              <option value="any" className="bg-gray-700 text-white">
                Any
              </option>
              <option value="multiple" className="bg-gray-700 text-white">
                Multiple Choice
              </option>
              <option value="boolean" className="bg-gray-700 text-white">
                True/False
              </option>
            </select>
          </div>

          <button
            onClick={startQuiz}
            className="w-48 py-3 px-6 text-white font-semibold rounded-xl border-2 border-transparent bg-gradient-to-r from-[#034b2e] to-[#032151] hover:from-[#3B82F6] hover:to-[#13034b]  hover:border-[#160250] transition-all duration-400 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#af0606] shadow-md"
          >
            Start Quiz
          </button>
        </div>
      ) : (

// Quiz content start for the quiz
<div className="bg-gradient-to-r from-[#0E1628] to-[#380643] text-white rounded-lg p-8 shadow-xl max-w-3xl mx-auto mt-10">
  <h2 className="text-3xl font-semibold text-center mb-6 text-[#FF8C2E]">
    Question {currentQuestionIndex + 1}/{questions.length}
  </h2>
  
  <p className="text-xl text-center mb-8 max-w-3xl mx-auto leading-relaxed">
    {questions[currentQuestionIndex].question}
  </p>

  {/* Timer Display */}
  <div className="text-2xl font-semibold text-[#FF8C2E] mb-6">
    Time left: {timeLeft}s
  </div>

  <div className="flex flex-col space-y-4 mb-8">
    {getShuffledOptions().map((option, index) => (
      <button
        key={index}
        onClick={() => handleOptionSelect(option)}
        className={`py-4 px-6 rounded-lg text-lg font-medium shadow-md transition-all duration-300 ease-in-out transform 
        ${selectedOption === option 
          ? 'bg-gradient-to-r from-[#3B82F6] to-[#0288D1]' // Selected option color (blue gradient)
          : 'bg-gradient-to-r from-indigo-800 to-indigo-600 hover:scale-105 hover:from-indigo-700 hover:to-indigo-500' // Default color (hover effect)
        }`}
      >
        {option}
      </button>
    ))}
  </div>

  <div className="flex justify-center space-x-4 mt-8">
  <button
  onClick={handleNextQuestion}
  className="py-4 px-8 rounded-xl bg-gradient-to-r from-blue-500 to-teal-900 text-lg font-semibold text-white shadow-md transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
>
  {currentQuestionIndex + 1 < questions.length ? "Next" : "Finish"}
</button>



  </div>

  
</div>
// Quiz content end for the quiz





      )}
    </div>
  );
};

export default Quiz;
