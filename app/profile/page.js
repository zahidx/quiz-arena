"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../components/Firebase"; // Import Firestore instance from Firebase.js

const ProfilePage = () => {
  // State to manage user input (Name, Age, Phone) and other components
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false); // To manage saving state
  const [userProfile, setUserProfile] = useState(null); // To store fetched user profile

  // Handle saving user profile to Firestore
  const handleSave = async () => {
    // Validate if all fields are filled
    if (!name || !age || !phone) {
      setMessage("All fields are required!");
      return;
    }

    setIsSaving(true); // Set saving state to true when saving
    try {
      // Save profile information in Firestore
      await addDoc(collection(db, "profiles"), {
        name,
        age: parseInt(age, 10), // Convert age to number
        phone,
        timestamp: new Date(),
      });
      setMessage("Profile saved successfully!"); // Show success message
      setName(""); // Clear input fields
      setAge("");
      setPhone("");
      fetchUserProfile(); // Fetch the profile to show
    } catch (error) {
      console.error("Error saving profile:", error);
      setMessage("Failed to save profile. Please try again."); // Show error message if saving fails
    } finally {
      setIsSaving(false); // Set saving state to false when done
    }
  };

  // Fetch user profile from Firestore
  const fetchUserProfile = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "profiles"));
      const profiles = [];
      querySnapshot.forEach((doc) => {
        profiles.push(doc.data());
      });
      if (profiles.length > 0) {
        setUserProfile(profiles[0]); // Set user profile if data exists
      } else {
        setUserProfile(null); // No data found
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  // Fetch the user profile when the page loads
  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-6xl gap-8"> {/* Horizontal Flex Layout */}
        
        {/* Section 1: User Input */}
        <div className="w-1/2 bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Create Profile</h1>
          {message && (
            <div
              className={`text-center mb-4 ${
                message.includes("success") ? "text-green-500" : "text-red-500"
              }`}
            >
              {message}
            </div>
          )}
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-2">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`w-full py-2 rounded-lg transition ${
              isSaving
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {isSaving ? "Saving..." : "Save Profile"}
          </button>
        </div>

{/* Section 2: Fetch and Show User Profile */}
<div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
  <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">User Profile</h2>
  {userProfile ? (
    <div className="space-y-6">
      {/* User Profile Information */}
      <div className="flex justify-between text-lg font-medium text-gray-700 bg-gray-100 rounded-lg p-2">
        <span>Name:</span>
        <span className="font-normal text-gray-900">{userProfile.name}</span>
      </div>
      <div className="flex justify-between text-lg font-medium text-gray-700 bg-gray-100 rounded-lg p-2">
        <span>Age:</span>
        <span className="font-normal text-gray-900">{userProfile.age}</span>
      </div>
      <div className="flex justify-between text-lg font-medium text-gray-700 bg-gray-100 rounded-lg p-2">
        <span>Phone:</span>
        <span className="font-normal text-gray-900">{userProfile.phone}</span>
      </div>
    </div>
  ) : (
    <div className="text-center text-xl font-semibold text-red-500">No data found for you.</div>
  )}
</div>


        
      </div>
    </div>
  );
};

export default ProfilePage;
