"use client"

import { useEffect } from "react"

type AnimatedTimerTickerProps = {
  targetId: string
  showSeconds: boolean
  use24Hour: boolean
}

/** Writes the current time into the server markup once a second. Renders nothing. */
export function AnimatedTimerTicker({
  targetId,
  showSeconds,
  use24Hour,
}: AnimatedTimerTickerProps) {
  useEffect(() => {
    const root = document.getElementById(targetId)
    if (!root) return
    const slots = root.querySelectorAll<HTMLElement>("[data-v]")
    const text = root.querySelector<HTMLElement>("[data-text]")
    let timer = 0

    const tick = () => {
      const now = new Date()
      const hours = use24Hour ? now.getHours() : now.getHours() % 12 || 12
      const parts = [hours, now.getMinutes()]
      if (showSeconds) parts.push(now.getSeconds())
      const value = parts.map((n) => String(n).padStart(2, "0"))
      const digits = value.join("")
      slots.forEach((slot, i) => {
        slot.dataset.v = digits[i]
      })
      if (text) text.textContent = value.join(":")
      root.dataset.ready = ""
      // Align ticks with the wall clock second
      timer = window.setTimeout(tick, 1000 - now.getMilliseconds())
    }

    tick()
    return () => window.clearTimeout(timer)
  }, [targetId, showSeconds, use24Hour])

  return null
}
