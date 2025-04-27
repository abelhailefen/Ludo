"use client"

import { useState } from "react"
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react"
import { Button } from "@/components/ui/button"

type DiceRollerProps = {
  onRoll: (value: number) => void
  value: number
}

export default function DiceRoller({ onRoll, value }: DiceRollerProps) {
  const [isRolling, setIsRolling] = useState(false)

  const rollDice = () => {
    setIsRolling(true)

    // Simulate dice rolling animation
    const rollInterval = setInterval(() => {
      const randomValue = Math.floor(Math.random() * 6) + 1
      onRoll(randomValue)
    }, 100)

    // Stop rolling after a short delay
    setTimeout(() => {
      clearInterval(rollInterval)
      setIsRolling(false)
      const finalValue = Math.floor(Math.random() * 6) + 1
      onRoll(finalValue)
    }, 1000)
  }

  const renderDice = () => {
    switch (value) {
      case 1:
        return <Dice1 className="w-12 h-12" />
      case 2:
        return <Dice2 className="w-12 h-12" />
      case 3:
        return <Dice3 className="w-12 h-12" />
      case 4:
        return <Dice4 className="w-12 h-12" />
      case 5:
        return <Dice5 className="w-12 h-12" />
      case 6:
        return <Dice6 className="w-12 h-12" />
      default:
        return <Dice1 className="w-12 h-12" />
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className={`p-2 bg-white rounded-lg shadow-lg ${isRolling ? "animate-bounce" : ""}`}>{renderDice()}</div>
      <Button onClick={rollDice} disabled={isRolling} className="bg-purple-600 hover:bg-purple-700">
        {isRolling ? "Rolling..." : "Roll Dice"}
      </Button>
    </div>
  )
}
