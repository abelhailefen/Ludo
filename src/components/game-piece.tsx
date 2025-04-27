"use client"
type GamePieceProps = {
    color: "red" | "green" | "blue" | "yellow"
    position: number
  }
  
  export default function GamePiece({ color, position }: GamePieceProps) {
    const colorMap = {
      red: "bg-red-300 border-red-700",
      green: "bg-green-300 border-green-700",
      blue: "bg-blue-300 border-blue-700",
      yellow: "bg-yellow-300 border-yellow-700",
    }
  
    return (
      <div
        className={`w-6 h-6 md:w-8 md:h-8 rounded-full ${colorMap[color]} border-2 flex items-center justify-center shadow-md`}
        aria-label={`${color} piece ${position}`}
      >
        <span className="text-xs font-bold text-gray-800">{position}</span>
      </div>
    )
  }
  