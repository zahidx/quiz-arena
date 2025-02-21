"use client";

import { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../components/Firebase";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      const newUserId = "user" + new Date().getTime();
      localStorage.setItem("userId", newUserId);
      setUserId(newUserId);
    } else {
      setUserId(storedUserId);
    }
  }, []);

  const handleSave = async () => {
    if (!name || !age || !phone) {
      toast.error("All fields are required!");
      return;
    }

    setIsSaving(true);
    try {
      await setDoc(doc(db, "profiles", userId), {
        name,
        age: parseInt(age, 10),
        phone,
        profileCompleted: true,
        timestamp: new Date(),
      });

      // Navigate to /quiz on successful profile save.
      router.push("/quiz");
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const docRef = doc(db, "profiles", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserProfile(docSnap.data());
      } else {
        setUserProfile(null);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:to-gray-900 p-6">
      <Toaster />
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-10">
        {/* Left Section - Form */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-6">
            Complete Your Profile
          </h1>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 mt-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3 mt-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your age"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 mt-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your phone number"
              />
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`w-full py-3 mt-4 rounded-lg text-white font-semibold transition duration-300 transform hover:scale-105 ${
                isSaving
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              }`}
            >
              {isSaving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </div>

        {/* Right Section - User Profile Display with Icon */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl p-8 shadow-lg text-white">
          <FaUserCircle size={64} className="mb-4" />
          <h2 className="text-2xl font-bold mb-4">Profile Overview</h2>
          {userProfile ? (
            <div className="space-y-4 text-lg">
              <p>
                <span className="font-semibold">Name:</span> {userProfile.name}
              </p>
              <p>
                <span className="font-semibold">Age:</span> {userProfile.age}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {userProfile.phone}
              </p>
              <p className="mt-4 text-sm text-gray-200">
                Profile completed on{" "}
                {new Date(userProfile.timestamp.seconds * 1000).toLocaleString()}
              </p>
            </div>
          ) : (
            <p className="text-lg">No profile data found. Please fill in the form.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
