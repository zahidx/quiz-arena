"use client"; // Added use client directive

import { useState, useEffect } from "react";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../components/Firebase";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast"; // Import react-hot-toast

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
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
      setMessage("All fields are required!");
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

      // Show toast notification after successful save
      toast.success("Profile saved successfully!");

      // Clear input fields after save
      setName(""); // Clear name
      setAge(""); // Clear age
      setPhone(""); // Clear phone

      fetchUserProfile();
    } catch (error) {
      console.error("Error saving profile:", error);
      setMessage("Failed to save profile. Please try again.");
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

  const handleUpdate = async () => {
    if (!name || !age || !phone) {
      setMessage("All fields are required!");
      return;
    }

    try {
      const docRef = doc(db, "profiles", userId);
      await updateDoc(docRef, {
        name,
        age: parseInt(age, 10),
        phone,
        timestamp: new Date(),
      });
      toast.success("Profile updated successfully!");
      // Clear input fields after save
      setName(""); // Clear name
      setAge(""); // Clear age
      setPhone(""); // Clear phone

      setIsEditing(false);
      fetchUserProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile. Please try again.");
      toast.error("Failed to update profile. Please try again.");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#474E93] dark:bg-[#0F1032]">
  <div className="flex flex-col md:flex-row w-full max-w-6xl gap-8 ml-10 mr-10 mt-10">
        {/* Section 1: User Input Profile */}
        <div className="w-full md:w-1/2 p-6 md:p-10 rounded-3xl shadow-xl border border-gray-400 dark:border-gray-700 transform transition-all duration-500 hover:scale-105 bg-gradient-to-l dark:from-[#0E1628] dark:to-[#100643]">
          {/* Title */}
          <h1 className="text-2xl md:text-4xl font-extrabold mb-6 md:mb-8 text-center text-white tracking-tight">
            Complete Your Profile
          </h1>

          {/* Message */}
          {message && (
            <div
              className={`text-center mb-6 p-4 rounded-lg ${
                message.includes("success")
                  ? "bg-green-300 text-green-800"
                  : "bg-red-300 text-red-800"
              } shadow-md`}
            >
              {message}
            </div>
          )}

          {/* Name Field */}
          <div className="mb-4 md:mb-6">
            <label className="block text-base md:text-lg font-medium text-white mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 md:px-6 py-3 md:py-4 border border-transparent rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:ring-purple-500 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg focus:shadow-lg"
              placeholder="Enter your full name"
            />
          </div>

          {/* Age Field */}
          <div className="mb-4 md:mb-6">
            <label className="block text-base md:text-lg font-medium text-white mb-2">
              Age
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 md:px-6 py-3 md:py-4 border border-transparent rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:ring-purple-500 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg focus:shadow-lg"
              placeholder="Enter your age"
            />
          </div>

          {/* Phone Field */}
          <div className="mb-4 md:mb-6">
            <label className="block text-base md:text-lg font-medium text-white mb-2">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 md:px-6 py-3 md:py-4 border border-transparent rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:ring-purple-500 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg focus:shadow-lg"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`w-full py-3 md:py-4 rounded-2xl text-white font-semibold transition duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
              isSaving
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            }`}
          >
            {isSaving ? "Saving..." : "Save Profile"}
          </button>
        </div>

        {/* Section 2: User Profile */}
        <div className="w-full md:w-1/2 text-gray-50 p-6 md:p-8 rounded-3xl dark:border-gray-700 transform transition-all duration-500 hover:scale-105 bg-gradient-to-l dark:from-[#0E1628] dark:to-[#100643]">
          {/* Profile Picture and Info */}
          <div className="flex flex-col items-center text-center">
            {/* Profile Picture */}
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-indigo-600 dark:to-indigo-800 text-white w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center shadow-xl transform transition-all duration-300 hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 md:w-16 md:h-16"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12zM12 13.5c-2.892 0-8.5 1.454-8.5 4.353V20.5h17v-2.647C20.5 14.954 14.892 13.5 12 13.5z" />
              </svg>
            </div>

            {/* User Name */}
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-50 dark:text-white mt-4 md:mt-6">
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-center text-gray-900 w-full border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 dark:bg-gray-800 dark:text-white dark:focus:border-indigo-400"
                />
              ) : (
                userProfile?.name || "John Doe"
              )}
            </h2>

            {/* User Role */}
            <p className="text-gray-50 dark:text-gray-400 text-sm italic flex items-center justify-center gap-2 mt-2">
              <span>{userProfile?.role || "Active User"}</span>
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            </p>
          </div>

          {/* User Details */}
          <div className="mt-8 space-y-4">
            {/* Age */}
            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded-md shadow-md hover:scale-105 transform transition-all duration-300">
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Age:
              </span>
              <span className="text-gray-900 dark:text-white font-semibold">
                {isEditing ? (
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-16 text-gray-900 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  userProfile?.age || "N/A"
                )}
              </span>
            </div>

            {/* Phone */}
            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded-md shadow-md hover:scale-105 transform transition-all duration-300">
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Phone:
              </span>
              <span className="text-gray-900 dark:text-white font-semibold">
                {isEditing ? (
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-40 text-gray-900 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  userProfile?.phone || "N/A"
                )}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row sm:justify-center sm:gap-4 gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-md transform transition-all duration-300 hover:scale-105"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-md transform transition-all duration-300 hover:scale-105"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setName(userProfile?.name || "");
                  setAge(userProfile?.age || "");
                  setPhone(userProfile?.phone || "");
                  setIsEditing(true);
                }}
                className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md transform transition-all duration-300 hover:scale-105"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            marginTop: "3.1rem", // Customize padding (pt-96 equivalent)
            backgroundColor: "var(--toast-background)", // Default background color
            color: "var(--toast-text)", // Default text color
          },
        }}
      />

      <style jsx global>{`
        :root {
          --toast-background: #ffffff;
          --toast-text: #000000;
        }

        @media (prefers-color-scheme: dark) {
          :root {
            --toast-background: #333333;
            --toast-text: #ffffff;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
