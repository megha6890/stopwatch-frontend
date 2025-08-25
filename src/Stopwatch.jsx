import React, { useEffect, useState } from "react";
import axios from "axios";

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const API_BASE_URL =
    "https://stopwatch-backend-dy3z.onrender.com/api/stopwatch";

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/time`);
          setTime(response.data);
        } catch (error) {
          console.error("Error fetching time:", error);
        }
      }, 100);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStart = async () => {
    try {
      // Use the defined base URL for POST request
      await axios.post(`${API_BASE_URL}/start`);
      setIsRunning(true);
    } catch (error) {
      console.error("Error starting stopwatch:", error);
    }
  };

  const handleStop = async () => {
    try {
      // Use the defined base URL for POST request
      await axios.post(`${API_BASE_URL}/stop`);
      setIsRunning(false);
    } catch (error) {
      console.error("Error stopping stopwatch:", error);
    }
  };

  const handleReset = async () => {
    try {
      // Use the defined base URL for POST request
      await axios.post(`${API_BASE_URL}/reset`);
      setTime(0);
      setIsRunning(false);
    } catch (error) {
      console.error("Error resetting stopwatch:", error);
    }
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;
    const pad = (num, size) => num.toString().padStart(size, "0");
    return `${pad(minutes, 2)}:${pad(seconds, 2)}.${pad(milliseconds, 3)}`;
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      <p>{formatTime(time)}</p>
      <button onClick={handleStart} disabled={isRunning}>
        Start
      </button>
      <button onClick={handleStop} disabled={!isRunning}>
        Stop
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default Stopwatch;
