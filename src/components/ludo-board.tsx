"use client"
import GamePiece from "./game-piece"
import DiceRoller from "./dice-roller"

type LudoBoardProps = {
  playerColor: string | null
  currentTurn: string | null
  diceValue: number
  onDiceRoll: (value: number) => void
}

export default function LudoBoard({ playerColor, currentTurn, diceValue, onDiceRoll }: LudoBoardProps) {
  // This would be expanded in a real game with player turns and piece movement
  const canRollDice = playerColor === currentTurn

  return (
    <div className="w-full max-w-2xl aspect-square">
      <div className="relative w-full h-full">
        {/* Main board container */}
        <div className="w-full h-full grid grid-cols-3 grid-rows-3 border-2 border-gray-800">
          {/* Top-left quadrant (Red) */}
          <div
            className={`bg-red-500 border-2 border-gray-800 p-2 flex items-center justify-center ${currentTurn === "red" ? "ring-4 ring-red-300 ring-opacity-70" : ""}`}
          >
            <div className="w-full h-full bg-red-600 rounded-lg flex flex-wrap gap-2 p-4 items-center justify-center">
              <GamePiece color="red" position={1} />
              <GamePiece color="red" position={2} />
              <GamePiece color="red" position={3} />
              <GamePiece color="red" position={4} />
            </div>
          </div>

          {/* Top-center (path) */}
          <div className="border-2 border-gray-800 grid grid-cols-3 grid-rows-6">
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={`top-${i}`}
                className={`border border-gray-400 flex items-center justify-center ${
                  i === 7 ? "bg-green-200" : "bg-gray-200"
                }`}
              >
                {i === 7 && <div className="w-3 h-3 bg-green-500 rounded-full" />}
              </div>
            ))}
          </div>

          {/* Top-right quadrant (Green) */}
          <div
            className={`bg-green-500 border-2 border-gray-800 p-2 flex items-center justify-center ${currentTurn === "green" ? "ring-4 ring-green-300 ring-opacity-70" : ""}`}
          >
            <div className="w-full h-full bg-green-600 rounded-lg flex flex-wrap gap-2 p-4 items-center justify-center">
              <GamePiece color="green" position={1} />
              <GamePiece color="green" position={2} />
              <GamePiece color="green" position={3} />
              <GamePiece color="green" position={4} />
            </div>
          </div>

          {/* Middle-left (path) */}
          <div className="border-2 border-gray-800 grid grid-rows-3 grid-cols-6">
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={`left-${i}`}
                className={`border border-gray-400 flex items-center justify-center ${
                  i === 10 ? "bg-red-200" : "bg-gray-200"
                }`}
              >
                {i === 10 && <div className="w-3 h-3 bg-red-500 rounded-full" />}
              </div>
            ))}
          </div>

          {/* Center (home) */}
          <div className="border-2 border-gray-800 bg-white">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-3/4 h-3/4 bg-gray-200 transform rotate-45 flex items-center justify-center">
                <span className="transform -rotate-45 text-xl font-bold">HOME</span>
              </div>
            </div>
          </div>

          {/* Middle-right (path) */}
          <div className="border-2 border-gray-800 grid grid-rows-3 grid-cols-6">
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={`right-${i}`}
                className={`border border-gray-400 flex items-center justify-center ${
                  i === 7 ? "bg-yellow-200" : "bg-gray-200"
                }`}
              >
                {i === 7 && <div className="w-3 h-3 bg-yellow-500 rounded-full" />}
              </div>
            ))}
          </div>

          {/* Bottom-left quadrant (Blue) */}
          <div
            className={`bg-blue-500 border-2 border-gray-800 p-2 flex items-center justify-center ${currentTurn === "blue" ? "ring-4 ring-blue-300 ring-opacity-70" : ""}`}
          >
            <div className="w-full h-full bg-blue-600 rounded-lg flex flex-wrap gap-2 p-4 items-center justify-center">
              <GamePiece color="blue" position={1} />
              <GamePiece color="blue" position={2} />
              <GamePiece color="blue" position={3} />
              <GamePiece color="blue" position={4} />
            </div>
          </div>

          {/* Bottom-center (path) */}
          <div className="border-2 border-gray-800 grid grid-cols-3 grid-rows-6">
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={`bottom-${i}`}
                className={`border border-gray-400 flex items-center justify-center ${
                  i === 10 ? "bg-blue-200" : "bg-gray-200"
                }`}
              >
                {i === 10 && <div className="w-3 h-3 bg-blue-500 rounded-full" />}
              </div>
            ))}
          </div>

          {/* Bottom-right quadrant (Yellow) */}
          <div
            className={`bg-yellow-500 border-2 border-gray-800 p-2 flex items-center justify-center ${currentTurn === "yellow" ? "ring-4 ring-yellow-300 ring-opacity-70" : ""}`}
          >
            <div className="w-full h-full bg-yellow-600 rounded-lg flex flex-wrap gap-2 p-4 items-center justify-center">
              <GamePiece color="yellow" position={1} />
              <GamePiece color="yellow" position={2} />
              <GamePiece color="yellow" position={3} />
              <GamePiece color="yellow" position={4} />
            </div>
          </div>
        </div>

        {/* Dice roller */}
        <div className="absolute -right-24 top-1/2 transform -translate-y-1/2">
          <DiceRoller onRoll={onDiceRoll} value={diceValue} disabled={!canRollDice} />
        </div>
      </div>
    </div>
  )
}
