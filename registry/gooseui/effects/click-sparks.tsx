"use client"

import { type ComponentProps, type MouseEvent, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export type ClickSparksEasing =
  | "linear"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | ((t: number) => number)

export type ClickSparksProps = ComponentProps<"div"> & {
  /** Stroke color, any CSS color. currentColor follows the text color */
  color?: string
  /** Number of sparks per click */
  count?: number
  /** Distance the sparks travel, in pixels */
  radius?: number
  /** Initial stroke length, in pixels */
  length?: number
  /** Stroke width, in pixels */
  lineWidth?: number
  /** Lifetime of a burst, in milliseconds */
  duration?: number
  /** Easing preset or a custom function from [0, 1] to [0, 1] */
  easing?: ClickSparksEasing
  /** Turns the effect off without unmounting */
  disabled?: boolean
}

type Burst = {
  x: number
  y: number
  start: number
  offset: number
  color: string
}

const EASINGS: Record<
  Exclude<ClickSparksEasing, (t: number) => number>,
  (t: number) => number
> = {
  linear: (t) => t,
  "ease-in": (t) => t * t,
  "ease-out": (t) => 1 - (1 - t) * (1 - t),
  "ease-in-out": (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2),
}

export function ClickSparks({
  color = "currentColor",
  count = 8,
  radius = 24,
  length = 10,
  lineWidth = 2,
  duration = 400,
  easing = "ease-out",
  disabled = false,
  className,
  children,
  onClick,
  ...props
}: ClickSparksProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const burstsRef = useRef<Burst[]>([])
  const rafRef = useRef(0)
  // Latest settings for the running loop without restarting it
  const settingsRef = useRef({
    count,
    radius,
    length,
    lineWidth,
    duration,
    easing,
  })
  settingsRef.current = { count, radius, length, lineWidth, duration, easing }

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
      burstsRef.current = []
    }
  }, [])

  const tick = (now: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) {
      rafRef.current = 0
      return
    }
    const s = settingsRef.current
    const ease = typeof s.easing === "function" ? s.easing : EASINGS[s.easing]
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.lineCap = "round"
    ctx.lineWidth = s.lineWidth
    const sparks = Math.max(1, Math.round(s.count))
    const life = Math.max(1, s.duration)

    burstsRef.current = burstsRef.current.filter((b) => {
      const progress = (now - b.start) / life
      if (progress >= 1) return false
      const e = ease(Math.max(0, progress))
      const dist = e * s.radius
      const len = s.length * (1 - e)
      ctx.strokeStyle = b.color
      ctx.beginPath()
      for (let i = 0; i < sparks; i++) {
        const a = b.offset + (i / sparks) * Math.PI * 2
        const cos = Math.cos(a)
        const sin = Math.sin(a)
        ctx.moveTo(b.x + cos * dist, b.y + sin * dist)
        ctx.lineTo(b.x + cos * (dist + len), b.y + sin * (dist + len))
      }
      ctx.stroke()
      return true
    })

    rafRef.current = burstsRef.current.length ? requestAnimationFrame(tick) : 0
  }

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    onClick?.(event)
    const canvas = canvasRef.current
    if (disabled || !canvas) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const rect = canvas.getBoundingClientRect()
    let x = event.clientX - rect.left
    let y = event.clientY - rect.top
    // Keyboard activation has no pointer position, burst from the target center
    if (event.detail === 0 && event.target instanceof Element) {
      const t = event.target.getBoundingClientRect()
      x = t.left + t.width / 2 - rect.left
      y = t.top + t.height / 2 - rect.top
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = Math.round(rect.width * dpr)
    const h = Math.round(rect.height * dpr)
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
    }

    canvas.style.color = color
    burstsRef.current.push({
      x,
      y,
      start: performance.now(),
      offset: Math.random() * Math.PI * 2,
      color: getComputedStyle(canvas).color,
    })
    if (!rafRef.current) rafRef.current = requestAnimationFrame(tick)
  }

  return (
    <div className={cn("relative", className)} onClick={handleClick} {...props}>
      {children}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full"
      />
    </div>
  )
}
