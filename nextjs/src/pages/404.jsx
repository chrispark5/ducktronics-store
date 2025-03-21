import Crosshair from "@/blocks/Animations/Crosshair/Crosshair";
import SearchAppBar from "@/components/Navbar";
import React, { useState, useEffect, useRef } from "react";

const DuckHunt = () => {
  const [ducks, setDucks] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(7);
  const [gameStarted, setGameStarted] = useState(false); // State to control the dialog

  useEffect(() => {
    if (!gameStarted) return; // Only start spawning ducks if the game has started

    const interval = setInterval(() => {
      setDucks((prevDucks) => [
        ...prevDucks,
        {
          id: Math.random(),
          x: Math.random() * 80 + 10, // Random X position (10%-90%)
          y: Math.random() * 60 + 20, // Random Y position (20%-80%)
        },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStarted]);

  useEffect(() => {
    if (!gameStarted || timeLeft <= 0) return; // Only decrement time if the game has started

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, gameStarted]);

  const restartGame = () => {
    setDucks([]);
    setScore(0);
    setTimeLeft(7);
    setGameStarted(false); // Show the dialog again after restarting
  };

  const shootDuck = (id) => {
    setDucks((prevDucks) => prevDucks.filter((duck) => duck.id !== id));
    setScore(score + 1);
  };
  const containerRef = useRef(null);

  return (
    <>
      <SearchAppBar />

      <div className="game-container my-20" ref={containerRef}>
        <Crosshair containerRef={containerRef} color="red" />
        <h1>🦆 Duck Hunt</h1>
        <p>
          Time Left: {timeLeft}s | Score: {score}
        </p>
        {!gameStarted ? (
          <div className="game-area">
            <div className="dialog text-center p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-lg">
              <h1 className="text-3xl font-bold text-red-600">
                404 - Page Not Found
              </h1>
              <p className="text-lg text-gray-800 mt-4">
                Oops! The page you’re looking for doesn’t exist. But hey, why
                not play a game of Duck Hunt instead?
              </p>
              <button
                onClick={() => setGameStarted(true)}
                className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
              >
                🎮 Start Game
              </button>
            </div>
          </div>
        ) : (
          <>
            {timeLeft === 0 ? (
              <div className="text-center p-6 bg-yellow-100 border border-yellow-300 rounded-lg shadow-lg game-area ">
                {score >= 3 ? (
                  <>
                    <h2 className="text-2xl font-bold text-red-600">
                      🎯 Game Over! Final Score: {score}
                    </h2>
                    <h3 className="text-lg text-gray-800 mt-2">
                      🦆 You’ve mastered the hunt! Enjoy a{" "}
                      <span className="font-bold text-green-600">100% OFF</span>{" "}
                      coupon:
                    </h3>
                    <p className="text-xl font-mono bg-green-100 text-green-700 px-4 py-2 mt-3 inline-block rounded-lg border border-green-400">
                      🏆 <span className="select-all">DUCKHUNTCHAMP</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Copy this code and use it at checkout!
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-red-600">
                      💀 Game Over! Final Score: {score}
                    </h2>
                    <h3 className="text-lg text-gray-800 mt-2">
                      🦆 The ducks outsmarted you this time... but don’t give
                      up!
                    </h3>
                    <p className="text-md text-gray-700 mt-3">
                      Keep practicing and come back for revenge. The ducks won’t
                      know what hit them!
                    </p>
                    <button
                      onClick={restartGame}
                      className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
                    >
                      🔄 Try Again
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="game-area">
                {ducks.map((duck) => (
                  <div
                    key={duck.id}
                    className="duck"
                    style={{ top: `${duck.y}%`, left: `${duck.x}%` }}
                    onClick={() => shootDuck(duck.id)}
                  >
                    🦆
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default DuckHunt;
