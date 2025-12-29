"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TimerCharProps {
  char: string
}

function TimerChar({ char }: TimerCharProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [height, setHeight] = React.useState(0)

  React.useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight)
    }
  }, [])

  if (char === ":") {
    return (
      <div className="flex items-center justify-center h-[60px] md:h-[100px] lg:h-[150px] w-5 md:w-10 lg:w-12">
        <span className="text-white text-4xl md:text-6xl lg:text-8xl">:</span>
      </div>
    )
  }

  const number = parseInt(char)
  const top = height > 0 ? number * height * -1 : 0

  return (
    <div
      ref={ref}
      className="relative h-[60px] md:h-[100px] lg:h-[150px] w-[30px] md:w-[50px] lg:w-[80px] overflow-hidden"
    >
      <div
        className="absolute left-0 flex flex-col w-full transition-[top] duration-200 ease-out"
        style={{ top }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
          <div
            key={digit}
            className="flex items-center justify-center h-[60px] md:h-[100px] lg:h-[150px] w-full"
          >
            <span
              className={cn(
                "text-white transition-all duration-300",
                number === digit
                  ? "text-4xl md:text-6xl lg:text-8xl opacity-100"
                  : "text-2xl md:text-3xl lg:text-4xl opacity-5"
              )}
            >
              {digit}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface AnimatedTimerProps {
  className?: string
  showSeconds?: boolean
  use24Hour?: boolean
}

export function AnimatedTimer({
  className,
  showSeconds = true,
  use24Hour = false,
}: AnimatedTimerProps) {
  const [time, setTime] = React.useState<Date>(new Date())

  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      if (now.getSeconds() !== time.getSeconds()) {
        setTime(now)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [time])

  const formatSegment = (segment: number): string => {
    return segment < 10 ? `0${segment}` : String(segment)
  }

  const getHours = (hours: number): number => {
    if (use24Hour) return hours
    return hours % 12 === 0 ? 12 : hours % 12
  }

  const getTimeString = (): string => {
    const hours = formatSegment(getHours(time.getHours()))
    const minutes = formatSegment(time.getMinutes())
    const seconds = formatSegment(time.getSeconds())

    return showSeconds
      ? `${hours}:${minutes}:${seconds}`
      : `${hours}:${minutes}`
  }

  const chars = getTimeString().split("")

  return (
    <div
      className={cn(
        "rounded-xl md:rounded-2xl lg:rounded-[22px] bg-gradient-to-br from-blue-600 to-red-500 p-1",
        className
      )}
    >
      <div className="flex items-center bg-zinc-900 rounded-lg md:rounded-xl lg:rounded-[20px] px-3 md:px-4 lg:px-5">
        {chars.map((char, index) => (
          <TimerChar key={index} char={char} />
        ))}
      </div>
    </div>
  )
}
