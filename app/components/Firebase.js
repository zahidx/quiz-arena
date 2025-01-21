// Firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZVwLU8Cv3znyRrOLBFgaaaG6se2L2hTw",
  authDomain: "quiz-arena-24077.firebaseapp.com",
  projectId: "quiz-arena-24077",
  storageBucket: "quiz-arena-24077.firebasestorage.app",
  messagingSenderId: "139427028516",
  appId: "1:139427028516:web:9dc4f99b3c24c9203282b1",
  measurementId: "G-Y96KEMHW3M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore instance
export const db = getFirestore(app);
