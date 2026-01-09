"use client"

import { AnimatePresence, motion, type Transition } from "motion/react"
import * as React from "react"
import { cn } from "@/lib/utils"

interface SlidingNumberProps {
  value: number
  className?: string
  padStart?: number
  decimalSeparator?: string
  transition?: Transition
}

function SlidingDigit({
  digit,
  transition,
}: {
  digit: string
  transition?: Transition
}) {
  return (
    <div className="relative inline-flex h-[1em] w-[0.65em] items-center justify-center overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={digit}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={
            transition ?? {
              type: "spring",
              stiffness: 500,
              damping: 35,
            }
          }
          className="absolute inset-0 flex items-center justify-center"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

function SlidingNumber({
  value,
  className,
  padStart = 0,
  decimalSeparator = ".",
  transition,
}: SlidingNumberProps) {
  const formattedValue = React.useMemo(() => {
    const str = value.toString()
    if (padStart > 0) {
      return str.padStart(padStart, "0")
    }
    return str
  }, [value, padStart])

  const chars = formattedValue.split("")

  return (
    <span
      className={cn(
        "inline-flex items-center tabular-nums font-medium",
        className,
      )}
    >
      {chars.map((char, index) => {
        const isDigit = /\d/.test(char)
        const isSeparator = char === decimalSeparator || char === ","
        const key = `${index}-${isDigit ? "d" : "s"}`

        if (isSeparator) {
          return (
            <span key={key} className="w-[0.25em]">
              {char}
            </span>
          )
        }

        if (isDigit) {
          return <SlidingDigit key={key} digit={char} transition={transition} />
        }

        return (
          <span key={key} className="inline-flex">
            {char}
          </span>
        )
      })}
    </span>
  )
}

export { SlidingNumber, type SlidingNumberProps }
