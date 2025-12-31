"use client"

import {
  type SpringOptions,
  useInView,
  useMotionValue,
  useSpring,
} from "motion/react"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedNumberProps {
  value: number
  className?: string
  springOptions?: SpringOptions
}

export function AnimatedNumber({
  value,
  className,
  springOptions = {
    bounce: 0,
    duration: 2000,
  },
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, springOptions)
  const isInView = useInView(ref, { once: true, margin: "0px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [motionValue, isInView, value])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(
          Math.round(latest),
        )
      }
    })

    return () => unsubscribe()
  }, [springValue])

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      0
    </span>
  )
}
