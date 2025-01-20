// pages/timer.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Timer = ({ onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const router = useRouter();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdown);
          onTimeUp(); // Callback when time is up
          router.push("/quiz"); // Navigate back to quiz page
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [onTimeUp, router]);

  return (
    <div className="timer-container">
      <h2>Time Remaining: {timeLeft} seconds</h2>
    </div>
  );
};

export default Timer;
