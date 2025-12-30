"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

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
  const { resolvedTheme } = useTheme()
  const [time, setTime] = React.useState<Date | null>(null)
  const [mounted, setMounted] = React.useState(false)
  const [colonVisible, setColonVisible] = React.useState(true)

  const offColor = resolvedTheme === "dark" ? "#333" : "#ddd"

  React.useEffect(() => {
    setMounted(true)
    setTime(new Date())

    const timeInterval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    const blinkInterval = setInterval(() => {
      setColonVisible((prev) => !prev)
    }, 500)

    return () => {
      clearInterval(timeInterval)
      clearInterval(blinkInterval)
    }
  }, [])

  if (!mounted || !time) {
    return (
      <div className={cn("flex items-center justify-center gap-1", className)}>
        <Digit digit={0} color={color} offColor={offColor} />
        <Digit digit={0} color={color} offColor={offColor} />
        <Colon color={color} offColor={offColor} />
        <Digit digit={0} color={color} offColor={offColor} />
        <Digit digit={0} color={color} offColor={offColor} />
        {showSeconds && (
          <>
            <Colon color={color} offColor={offColor} />
            <Digit digit={0} color={color} offColor={offColor} />
            <Digit digit={0} color={color} offColor={offColor} />
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
      <Digit digit={hourTens} color={color} offColor={offColor} />
      <Digit digit={hourOnes} color={color} offColor={offColor} />
      <Colon color={color} offColor={offColor} visible={colonVisible} />
      <Digit digit={minTens} color={color} offColor={offColor} />
      <Digit digit={minOnes} color={color} offColor={offColor} />
      {showSeconds && (
        <>
          <Colon color={color} offColor={offColor} visible={colonVisible} />
          <Digit digit={secTens} color={color} offColor={offColor} />
          <Digit digit={secOnes} color={color} offColor={offColor} />
        </>
      )}
    </div>
  )
}

function Colon({
  color,
  offColor,
  visible = true,
}: {
  color: string
  offColor: string
  visible?: boolean
}) {
  const displayColor = visible ? color : offColor
  return (
    <div className="relative w-[10px] h-[110px] mx-2 flex flex-col items-center justify-center gap-[15px]">
      <div
        className="w-[10px] h-[10px]"
        style={{ backgroundColor: displayColor }}
      />
      <div
        className="w-[10px] h-[10px]"
        style={{ backgroundColor: displayColor }}
      />
    </div>
  )
}

function Digit({
  digit,
  color,
  offColor,
}: {
  digit: number
  color: string
  offColor: string
}) {
  const off = offColor

  // Segment patterns for each digit
  // [top, middle, bottom, topLeft, topRight, bottomLeft, bottomRight]
  const patterns: Record<number, boolean[]> = {
    0: [true, false, true, true, true, true, true],
    1: [false, false, false, false, true, false, true],
    2: [true, true, true, false, true, true, false],
    3: [true, true, true, false, true, false, true],
    4: [false, true, false, true, true, false, true],
    5: [true, true, true, true, false, false, true],
    6: [true, true, true, true, false, true, true],
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
