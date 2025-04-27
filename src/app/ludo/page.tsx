"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:ludo-production.up.railway.app4000");

export default function LudoGame() {
  const [color, setColor] = useState<string | null>(null);
  const [turn, setTurn] = useState<string | null>(null);
  const [players, setPlayers] = useState<Record<string, string>>({});

  useEffect(() => {
    socket.emit("join-room", "room-1");

    socket.on("color-assigned", (assigned) => {
      setColor(assigned);
    });

    socket.on("turn-changed", (currentTurn) => {
      setTurn(currentTurn);
    });

    socket.on("player-list", (players) => {
      setPlayers(players);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <main className="min-h-screen p-4 bg-green-100 flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">🎲 Ludo Game</h1>

      {/* Game Info */}
      <div className="text-center">
        <p className="text-lg">Your color: <strong>{color}</strong></p>
        <p className="text-lg">Current turn: <strong>{turn}</strong></p>
      </div>

      {/* Ludo Board Placeholder */}
      <div className="grid grid-cols-3 gap-1 bg-white p-4 rounded-lg shadow-md w-[300px] h-[300px]">
        <div className="bg-red-400 rounded-md flex items-center justify-center">Red Home</div>
        <div className="bg-yellow-400 rounded-md flex items-center justify-center">Yellow Home</div>
        <div className="bg-green-400 rounded-md flex items-center justify-center">Green Home</div>
        <div className="col-span-3 bg-blue-400 rounded-md flex items-center justify-center h-[80px]">Blue Home</div>
      </div>

      {/* Dice */}
      <div className="flex flex-col items-center gap-2">
        <button
          disabled={color !== turn}
          className={`px-6 py-2 text-white rounded ${
            color === turn ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Roll Dice 🎲
        </button>
        <p className="text-sm text-gray-600">* Only clickable on your turn</p>
      </div>

      {/* Player List */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Players in Room:</h2>
        <ul className="list-disc pl-6">
          {Object.entries(players).map(([id, c]) => (
            <li key={id} className="text-sm">{id} — {c}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
