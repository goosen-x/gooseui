"use client"

import { useTheme } from "next-themes"
import * as React from "react"
import { cn } from "@/lib/utils"

interface DigitalClockProps {
  className?: string
  showSeconds?: boolean
  use24Hour?: boolean
  color?: string
  /** Scale factor for the clock size (default: 1) */
  scale?: number
}

export function DigitalClock({
  className,
  showSeconds = true,
  use24Hour = true,
  color = "#82FA58",
  scale = 1,
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
        <Digit digit={0} color={color} offColor={offColor} scale={scale} />
        <Digit digit={0} color={color} offColor={offColor} scale={scale} />
        <Colon color={color} offColor={offColor} scale={scale} />
        <Digit digit={0} color={color} offColor={offColor} scale={scale} />
        <Digit digit={0} color={color} offColor={offColor} scale={scale} />
        {showSeconds && (
          <>
            <Colon color={color} offColor={offColor} scale={scale} />
            <Digit digit={0} color={color} offColor={offColor} scale={scale} />
            <Digit digit={0} color={color} offColor={offColor} scale={scale} />
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
      <Digit digit={hourTens} color={color} offColor={offColor} scale={scale} />
      <Digit digit={hourOnes} color={color} offColor={offColor} scale={scale} />
      <Colon
        color={color}
        offColor={offColor}
        visible={colonVisible}
        scale={scale}
      />
      <Digit digit={minTens} color={color} offColor={offColor} scale={scale} />
      <Digit digit={minOnes} color={color} offColor={offColor} scale={scale} />
      {showSeconds && (
        <>
          <Colon
            color={color}
            offColor={offColor}
            visible={colonVisible}
            scale={scale}
          />
          <Digit
            digit={secTens}
            color={color}
            offColor={offColor}
            scale={scale}
          />
          <Digit
            digit={secOnes}
            color={color}
            offColor={offColor}
            scale={scale}
          />
        </>
      )}
    </div>
  )
}

function Colon({
  color,
  offColor,
  visible = true,
  scale = 1,
}: {
  color: string
  offColor: string
  visible?: boolean
  scale?: number
}) {
  const displayColor = visible ? color : offColor
  const s = scale

  return (
    <div
      className="relative flex flex-col items-center justify-center"
      style={{
        width: `${10 * s}px`,
        height: `${110 * s}px`,
        marginLeft: `${8 * s}px`,
        marginRight: `${8 * s}px`,
        gap: `${15 * s}px`,
      }}
    >
      <div
        style={{
          width: `${10 * s}px`,
          height: `${10 * s}px`,
          backgroundColor: displayColor,
        }}
      />
      <div
        style={{
          width: `${10 * s}px`,
          height: `${10 * s}px`,
          backgroundColor: displayColor,
        }}
      />
    </div>
  )
}

function Digit({
  digit,
  color,
  offColor,
  scale = 1,
}: {
  digit: number
  color: string
  offColor: string
  scale?: number
}) {
  const off = offColor
  const s = scale

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

  // All dimensions scaled
  const w = 60 * s
  const h = 110 * s
  const seg = 10 * s
  const inner = 50 * s
  const vSeg = 40 * s

  // Build gradient for 7-segment display
  const background = `
    linear-gradient(90deg, transparent ${seg}px, ${p[0] ? color : off} ${seg}px, ${p[0] ? color : off} ${inner}px, transparent ${inner}px),
    linear-gradient(90deg, transparent ${seg}px, ${p[1] ? color : off} ${seg}px, ${p[1] ? color : off} ${inner}px, transparent ${inner}px),
    linear-gradient(90deg, transparent ${seg}px, ${p[2] ? color : off} ${seg}px, ${p[2] ? color : off} ${inner}px, transparent ${inner}px),
    linear-gradient(90deg, ${p[3] ? color : off} ${seg}px, transparent ${seg}px, transparent ${inner}px, ${p[4] ? color : off} ${inner}px),
    linear-gradient(90deg, ${p[5] ? color : off} ${seg}px, transparent ${seg}px, transparent ${inner}px, ${p[6] ? color : off} ${inner}px)
  `

  return (
    <div
      className="relative"
      style={{
        width: `${w}px`,
        height: `${h}px`,
        marginLeft: `${5 * s}px`,
        marginRight: `${5 * s}px`,
        backgroundImage: background,
        backgroundPosition: `0 0, 0 ${inner}px, 0 ${h - seg}px, 0 ${seg}px, 0 ${h / 2 + seg / 2}px`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${w}px ${seg}px, ${w}px ${seg}px, ${w}px ${seg}px, ${w}px ${vSeg}px, ${w}px ${vSeg}px`,
      }}
    />
  )
}
