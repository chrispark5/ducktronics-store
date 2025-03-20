import React, { useState, useEffect } from "react";

const DuckMoodIndicator = () => {
  const [mood, setMood] = useState("happy"); // Default mood is "happy"

  useEffect(() => {
    const moods = ["happy", "grumpy", "surprised", "sleepy"];
    const moodInterval = setInterval(() => {
      setMood(moods[Math.floor(Math.random() * moods.length)]);
      console.log("changing mood to ");
    }, 3000); // Change mood every 3 seconds for demo

    return () => clearInterval(moodInterval);
  }, []);

  return (
    <div className="">
      <div className={`å ${mood}`}>
        {mood === "happy" && "🦆😊"}
        {mood === "grumpy" && "🦆😠"}
        {mood === "surprised" && "🦆😲"}
        {mood === "sleepy" && "🦆😴"}
      </div>
      {/* <p className="mood-text">The duck is feeling {mood}!</p> */}
    </div>
  );
};

export default DuckMoodIndicator;
