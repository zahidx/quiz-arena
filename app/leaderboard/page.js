"use client";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/Firebase"; // Assuming Firebase.js is configured
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaSpinner } from 'react-icons/fa';


const LeaderboardPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "profiles"));
        const userList = querySnapshot.docs.map((doc) => doc.data());
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Function to mask phone number
  const maskPhoneNumber = (phone) => {
    return phone.replace(/(\d{3})(\d{4})(\d{2})/, "$1******$3");
  };

  // Function to display time ago
  const timeAgo = (timestamp) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);

    const minute = 60;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 365 * day;

    if (diffInSeconds < minute) {
      return `${diffInSeconds} second${diffInSeconds === 1 ? "" : "s"} ago`;
    } else if (diffInSeconds < hour) {
      const minutes = Math.floor(diffInSeconds / minute);
      return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    } else if (diffInSeconds < day) {
      const hours = Math.floor(diffInSeconds / hour);
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    } else if (diffInSeconds < month) {
      const days = Math.floor(diffInSeconds / day);
      return `${days} day${days === 1 ? "" : "s"} ago`;
    } else if (diffInSeconds < year) {
      const months = Math.floor(diffInSeconds / month);
      return `${months} month${months === 1 ? "" : "s"} ago`;
    } else {
      const years = Math.floor(diffInSeconds / year);
      return `${years} year${years === 1 ? "" : "s"} ago`;
    }
  };

  return (
    <div className="min-h-screen py-16 px-8 bg-[#232B4C] text-white">
  <div className="max-w-5xl mx-auto  p-10 rounded-xl ">
    <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#fc9219] to-[#FF9A25] mb-12">
      Leaderboard
    </h1>

    {loading ? (
  <div className="flex justify-center items-center">
    <FaSpinner className="animate-spin text-4xl text-blue-500" />
    <p className="text-center text-gray-400 text-lg ml-4">Loading...</p>
  </div>
) : (
      <>
        {users.length > 0 ? (
          <div className="space-y-2">
            {users.map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gradient-to-r from-[#3b3b3b] to-[#4a4a4a] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center">
                    {/* Font Awesome Icon */}
                    <i className="fas fa-user-circle text-3xl text-gray-400"></i>
                  </div>
                  <div className="text-lg font-semibold text-white">
                    {user.name}
                  </div>
                </div>

                <div className="text-gray-300 text-md">
                  {maskPhoneNumber(user.phone)}
                </div>
                <div className="text-sm text-gray-400">
                  {timeAgo(user.timestamp.toDate())}
                </div>

                <div className="text-lg font-bold text-green-400">
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-red-500 text-xl font-semibold">No users found.</p>
        )}
      </>
    )}
  </div>
</div>

  );
};

export default LeaderboardPage;
