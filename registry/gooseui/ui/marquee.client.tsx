"use client"

import { useEffect, useRef } from "react"

const easeOut = (p: number) => 1 - (1 - p) ** 3
const easeInOut = (p: number) =>
  p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2

/**
 * Brakes the parent .gooseui-marquee smoothly: instead of freezing the CSS animation it
 * eases its playbackRate between 1 and 0, so the track never jumps.
 */
export function MarqueeBrake({
  stopDuration,
  onHover,
}: {
  stopDuration: number
  onHover: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = ref.current?.parentElement
    const track = root?.querySelector(".gooseui-marquee-track")
    if (!root || !track) return

    let hovered = false
    let focused = false
    let frame = 0
    // Without JS the CSS pause still works; now this component takes over
    root.setAttribute("data-brake", "")

    const run = () => {
      cancelAnimationFrame(frame)
      const animation = track.getAnimations()[0]
      if (!animation) return
      const stop = (onHover && hovered) || focused
      const from = animation.playbackRate
      const to = stop ? 0 : 1
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / Math.max(stopDuration, 1), 1)
        animation.playbackRate =
          from + (to - from) * (stop ? easeOut : easeInOut)(p)
        if (p < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }

    const enter = () => {
      hovered = true
      run()
    }
    const leave = () => {
      hovered = false
      run()
    }
    const focusIn = () => {
      focused = true
      run()
    }
    const focusOut = (e: FocusEvent) => {
      if (e.relatedTarget instanceof Node && root.contains(e.relatedTarget))
        return
      focused = false
      run()
    }

    root.addEventListener("mouseenter", enter)
    root.addEventListener("mouseleave", leave)
    root.addEventListener("focusin", focusIn)
    root.addEventListener("focusout", focusOut)
    return () => {
      cancelAnimationFrame(frame)
      root.removeAttribute("data-brake")
      root.removeEventListener("mouseenter", enter)
      root.removeEventListener("mouseleave", leave)
      root.removeEventListener("focusin", focusIn)
      root.removeEventListener("focusout", focusOut)
    }
  }, [stopDuration, onHover])

  return <span ref={ref} hidden />
}
