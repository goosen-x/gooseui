"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const DIGIT_CLASSES = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
]

interface DigitalClockProps {
  className?: string
  showSeconds?: boolean
  use24Hour?: boolean
  color?: string
}

export function DigitalClock({
  className,
  showSeconds = true,
  use24Hour = true,
  color = "#82FA58",
}: DigitalClockProps) {
  const [time, setTime] = React.useState<Date | null>(null)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    setTime(new Date())

    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted || !time) {
    return (
      <div className={cn("flex items-center justify-center gap-1", className)}>
        <Digit digit={0} color={color} />
        <Digit digit={0} color={color} />
        <Colon color={color} />
        <Digit digit={0} color={color} />
        <Digit digit={0} color={color} />
        {showSeconds && (
          <>
            <Colon color={color} />
            <Digit digit={0} color={color} />
            <Digit digit={0} color={color} />
          </>
        )}
      </div>
    )
  }

  let hours = time.getHours()
  if (!use24Hour) {
    hours = hours % 12 === 0 ? 12 : hours % 12
  }
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()

  const hourTens = Math.floor(hours / 10)
  const hourOnes = hours % 10
  const minTens = Math.floor(minutes / 10)
  const minOnes = minutes % 10
  const secTens = Math.floor(seconds / 10)
  const secOnes = seconds % 10

  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      <Digit digit={hourTens} color={color} />
      <Digit digit={hourOnes} color={color} />
      <Colon color={color} />
      <Digit digit={minTens} color={color} />
      <Digit digit={minOnes} color={color} />
      {showSeconds && (
        <>
          <Colon color={color} />
          <Digit digit={secTens} color={color} />
          <Digit digit={secOnes} color={color} />
        </>
      )}
    </div>
  )
}

function Colon({ color }: { color: string }) {
  return (
    <div
      className="relative w-[10px] h-[110px] mx-1"
      style={{
        background: `
          linear-gradient(-90deg, ${color} 10px, transparent 10px),
          linear-gradient(-90deg, ${color} 10px, transparent 10px)
        `,
        backgroundPosition: "0 40px, 0 65px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "10px 10px, 10px 10px",
      }}
    />
  )
}

function Digit({ digit, color }: { digit: number; color: string }) {
  const off = "#333"

  // Segment patterns for each digit
  // [top, middle, bottom, topLeft, topRight, bottomLeft, bottomRight]
  const patterns: Record<number, boolean[]> = {
    0: [true, false, true, true, true, true, true],
    1: [false, false, false, false, true, false, true],
    2: [true, true, true, false, true, true, false],
    3: [true, true, true, false, true, false, true],
    4: [false, true, false, true, true, false, true],
    5: [true, true, true, true, false, false, true],
    6: [false, true, true, true, false, true, true],
    7: [true, false, false, false, true, false, true],
    8: [true, true, true, true, true, true, true],
    9: [true, true, true, true, true, false, true],
  }

  const p = patterns[digit] || patterns[0]

  // Build gradient for 7-segment display
  const background = `
    linear-gradient(90deg, transparent 10px, ${p[0] ? color : off} 10px, ${p[0] ? color : off} 50px, transparent 50px),
    linear-gradient(90deg, transparent 10px, ${p[1] ? color : off} 10px, ${p[1] ? color : off} 50px, transparent 50px),
    linear-gradient(90deg, transparent 10px, ${p[2] ? color : off} 10px, ${p[2] ? color : off} 50px, transparent 50px),
    linear-gradient(90deg, ${p[3] ? color : off} 10px, transparent 10px, transparent 50px, ${p[4] ? color : off} 50px),
    linear-gradient(90deg, ${p[5] ? color : off} 10px, transparent 10px, transparent 50px, ${p[6] ? color : off} 50px)
  `

  return (
    <div
      className="relative w-[60px] h-[110px] mx-[5px]"
      style={{
        backgroundImage: background,
        backgroundPosition: "0 0, 0 50px, 0 100px, 0 10px, 0 60px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "60px 10px, 60px 10px, 60px 10px, 60px 40px, 60px 40px",
      }}
    />
  )
}
