"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import LudoBoard from "@/components/ludo-board";

// Connect to your backend!
const socket = io("https://ludo-production.up.railway.app", {
  transports: ["websocket"],
});

export default function LudoGame() {
  const [color, setColor] = useState<string | null>(null);
  const [turn, setTurn] = useState<string | null>(null);
  const [players, setPlayers] = useState<Record<string, string>>({});
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);

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

    socket.on("dice-rolled", (value) => {
      // When another player rolls the dice
      setDiceValue(value);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleDiceRoll = (value: number) => {
    setDiceValue(value);
    // Emit the dice roll to other players
    socket.emit("roll-dice", value);
    
    // In a real implementation, you would also emit a move event
    // after the player selects which piece to move
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Ludo Game</h1>
      
      <div className="mb-6 text-center">
        {color ? (
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <span>You are playing as:</span>
              <div 
                className={`w-4 h-4 rounded-full ${
                  color === "red" ? "bg-red-500" : 
                  color === "green" ? "bg-green-500" : 
                  color === "blue" ? "bg-blue-500" : 
                  color === "yellow" ? "bg-yellow-500" : ""
                }`}
              />
              <span className="capitalize">{color}</span>
            </div>
            
            {turn && (
              <div className="mt-2">
                <span className="font-medium">Current turn: </span>
                <span className={`capitalize font-bold ${
                  turn === color ? "text-green-600" : "text-gray-600"
                }`}>
                  {turn === color ? "Your turn!" : turn}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="animate-pulse">Connecting to game...</div>
        )}
      </div>
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Players in game:</h2>
        <div className="flex gap-3 justify-center">
          {Object.entries(players).map(([socketId, playerColor]) => (
            <div 
              key={socketId} 
              className="flex items-center gap-1"
            >
              <div 
                className={`w-3 h-3 rounded-full ${
                  playerColor === "red" ? "bg-red-500" : 
                  playerColor === "green" ? "bg-green-500" : 
                  playerColor === "blue" ? "bg-blue-500" : 
                  playerColor === "yellow" ? "bg-yellow-500" : ""
                }`}
              />
              <span className="capitalize">{playerColor}</span>
              {playerColor === color && <span>(You)</span>}
            </div>
          ))}
        </div>
      </div>
      
      <LudoBoard 
        playerColor={color} 
        currentTurn={turn} 
        diceValue={diceValue}
        onDiceRoll={handleDiceRoll}
      />
    </main>
  );
}
