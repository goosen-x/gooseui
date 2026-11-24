"use client"

// Particle physics follow canvas-confetti by Kiril Vatev (catdad/canvas-confetti, MIT):
// launch speed and angle, per-frame step, wobble, tilt and the quad "paper flip" drawing.
// Steps are scaled by real frame time so the speed is the same on 60 and 120 Hz screens.

import {
  type ComponentProps,
  type MouseEvent,
  type RefObject,
  useCallback,
  useMemo,
} from "react"
import { cn } from "@/lib/utils"

export type ConfettiShape = "square" | "circle" | "strip"

export type ConfettiPreset = "low" | "medium" | "high" | "burst"

export type ConfettiOrigin =
  | { x: number; y: number }
  | Element
  | RefObject<Element | null>

export type ConfettiOptions = {
  /** Intensity preset, explicit options override it. "medium" equals the canvas-confetti defaults */
  preset?: ConfettiPreset
  /** Viewport point in px, an element or a ref. Defaults to the lower middle of the screen */
  origin?: ConfettiOrigin
  /** Number of particles */
  particleCount?: number
  /** Launch direction in degrees, 90 is straight up */
  angle?: number
  /** Cone width in degrees */
  spread?: number
  /** Initial speed in px per frame at 60 fps, each particle gets 50-150% of it */
  startVelocity?: number
  /** Downward acceleration, 1 by default */
  gravity?: number
  /** Velocity multiplier per frame, lower stops faster, 0.9 by default */
  decay?: number
  /** Horizontal wind per frame */
  drift?: number
  /** Lifetime in frames (60 per second) */
  ticks?: number
  /** Particle size multiplier */
  scalar?: number
  /** CSS colors. Defaults to a bright palette */
  colors?: string[]
  shapes?: ConfettiShape[]
  /** z-index of the overlay canvas */
  zIndex?: number
  /** Skip the effect for prefers-reduced-motion, true by default */
  respectReducedMotion?: boolean
}

export const confettiPresets: Record<
  ConfettiPreset,
  Required<
    Pick<
      ConfettiOptions,
      "particleCount" | "spread" | "startVelocity" | "ticks" | "scalar"
    >
  >
> = {
  low: {
    particleCount: 30,
    spread: 55,
    startVelocity: 35,
    ticks: 160,
    scalar: 0.9,
  },
  medium: {
    particleCount: 50,
    spread: 45,
    startVelocity: 45,
    ticks: 200,
    scalar: 1,
  },
  high: {
    particleCount: 130,
    spread: 70,
    startVelocity: 55,
    ticks: 240,
    scalar: 1,
  },
  burst: {
    particleCount: 100,
    spread: 360,
    startVelocity: 30,
    ticks: 180,
    scalar: 1,
  },
}

type Particle = {
  x: number
  y: number
  wobble: number
  wobbleSpeed: number
  velocity: number
  angle2D: number
  tiltAngle: number
  color: string
  shape: ConfettiShape
  tick: number
  totalTicks: number
  decay: number
  drift: number
  gravity: number
  scalar: number
}

const DEFAULT_COLORS = [
  "#26ccff",
  "#a25afd",
  "#ff5e7e",
  "#88ff5a",
  "#fcff42",
  "#ffa62d",
  "#ff36ff",
]

// One shared canvas for every burst on the page
let canvas: HTMLCanvasElement | null = null
let ctx: CanvasRenderingContext2D | null = null
let particles: Particle[] = []
let frame = 0
let lastTime = 0
let dpr = 1
const waiters: Array<() => void> = []

function resize() {
  if (!canvas || !ctx) return
  dpr = window.devicePixelRatio || 1
  // Backing store in device pixels, drawing stays in CSS pixels
  canvas.width = Math.round(window.innerWidth * dpr)
  canvas.height = Math.round(window.innerHeight * dpr)
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function mount(zIndex: number) {
  if (canvas) {
    canvas.style.zIndex = String(zIndex)
    return
  }
  canvas = document.createElement("canvas")
  canvas.setAttribute("aria-hidden", "true")
  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: String(zIndex),
  })
  document.body.appendChild(canvas)
  ctx = canvas.getContext("2d")
  resize()
  window.addEventListener("resize", resize)
}

function unmount() {
  cancelAnimationFrame(frame)
  frame = 0
  window.removeEventListener("resize", resize)
  canvas?.remove()
  canvas = null
  ctx = null
  particles = []
  for (const done of waiters.splice(0)) done()
}

// Advances one particle by dt frames and draws it. Returns false when it is done.
function step(c: CanvasRenderingContext2D, p: Particle, dt: number, h: number) {
  p.x += (Math.cos(p.angle2D) * p.velocity + p.drift) * dt
  p.y += (Math.sin(p.angle2D) * p.velocity + p.gravity) * dt
  p.velocity *= p.decay ** dt

  p.wobble += p.wobbleSpeed * dt
  p.tiltAngle += 0.1 * dt
  const tiltSin = Math.sin(p.tiltAngle)
  const tiltCos = Math.cos(p.tiltAngle)
  const random = Math.random() + 2
  const reach = 10 * p.scalar
  // Strips are narrow: the wobble swing is squeezed on one axis
  const sx = p.shape === "strip" ? 0.35 : 1
  const wobbleX = p.x + reach * Math.cos(p.wobble) * sx
  const wobbleY = p.y + reach * Math.sin(p.wobble)

  const progress = p.tick / p.totalTicks
  p.tick += dt

  const x1 = p.x + random * tiltCos
  const y1 = p.y + random * tiltSin
  const x2 = wobbleX + random * tiltCos
  const y2 = wobbleY + random * tiltSin

  c.globalAlpha = Math.max(0, 1 - progress)
  c.fillStyle = p.color
  c.beginPath()
  if (p.shape === "circle") {
    c.ellipse(
      p.x,
      p.y,
      Math.abs(x2 - x1) * 0.6,
      Math.abs(y2 - y1) * 0.6,
      (Math.PI / 10) * p.wobble,
      0,
      2 * Math.PI,
    )
  } else {
    c.moveTo(p.x, p.y)
    c.lineTo(wobbleX, y1)
    c.lineTo(x2, y2)
    c.lineTo(x1, wobbleY)
  }
  c.closePath()
  c.fill()

  return p.tick < p.totalTicks && p.y < h + 100
}

function loop(time: number) {
  if (!ctx || !canvas) {
    // No 2D context: drop the burst so promises resolve and later bursts can start
    unmount()
    return
  }
  // Normalize to 60 fps so speed does not depend on the display rate
  const dt = lastTime ? Math.min((time - lastTime) / 16.667, 3) : 1
  lastTime = time
  const h = window.innerHeight
  ctx.clearRect(0, 0, window.innerWidth, h)

  const c = ctx
  particles = particles.filter((p) => step(c, p, dt, h))
  c.globalAlpha = 1

  if (particles.length === 0) {
    unmount()
    return
  }
  frame = requestAnimationFrame(loop)
}

function resolveOrigin(origin: ConfettiOrigin | undefined) {
  if (!origin) return { x: window.innerWidth / 2, y: window.innerHeight * 0.65 }
  const el =
    origin instanceof Element
      ? origin
      : "current" in origin
        ? origin.current
        : null
  if (el) {
    const r = el.getBoundingClientRect()
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
  }
  if ("x" in origin) return origin
  return { x: window.innerWidth / 2, y: window.innerHeight * 0.65 }
}

// Normalizes a user color to something canvas understands (resolves var() and
// bare HSL channels like "220 70% 50%"). Invalid values are dropped.
function resolveColors(values: string[]) {
  const probe = document.createElement("span")
  probe.style.display = "none"
  document.body.appendChild(probe)
  const out: string[] = []
  for (const value of values) {
    for (const candidate of [value, `hsl(${value})`]) {
      if (!CSS.supports("color", candidate)) continue
      probe.style.color = candidate
      out.push(getComputedStyle(probe).color || candidate)
      break
    }
  }
  probe.remove()
  return out.length ? out : DEFAULT_COLORS
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}

/**
 * Fires one burst. Resolves when the overlay is cleared.
 * Safe to call many times, bursts share one canvas.
 */
export function fireConfetti(options: ConfettiOptions = {}): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve()
  const {
    preset = "medium",
    origin,
    angle = 90,
    gravity = 1,
    decay = 0.9,
    drift = 0,
    colors,
    shapes = ["square", "strip", "circle"],
    zIndex = 100,
    respectReducedMotion = true,
  } = options
  if (respectReducedMotion && prefersReducedMotion()) return Promise.resolve()

  const base = confettiPresets[preset]
  const count = Math.max(
    0,
    Math.round(options.particleCount ?? base.particleCount),
  )
  const spread = options.spread ?? base.spread
  const velocity = options.startVelocity ?? base.startVelocity
  const ticks = options.ticks ?? base.ticks
  const scalar = options.scalar ?? base.scalar
  if (count === 0) return Promise.resolve()

  const palette = colors?.length ? resolveColors(colors) : DEFAULT_COLORS
  const { x, y } = resolveOrigin(origin)
  mount(zIndex)

  const radAngle = (angle * Math.PI) / 180
  const radSpread = (spread * Math.PI) / 180
  for (let i = 0; i < count; i++) {
    particles.push({
      x,
      y,
      wobble: Math.random() * 10,
      wobbleSpeed: Math.min(0.11, Math.random() * 0.1 + 0.05),
      velocity: velocity * 0.5 + Math.random() * velocity,
      angle2D: -radAngle + (0.5 * radSpread - Math.random() * radSpread),
      tiltAngle: (Math.random() * 0.5 + 0.25) * Math.PI,
      color: palette[i % palette.length],
      shape: shapes[Math.floor(Math.random() * shapes.length)] ?? "square",
      tick: 0,
      totalTicks: ticks,
      decay,
      drift,
      gravity: gravity * 3,
      scalar,
    })
  }

  const done = new Promise<void>((resolve) => waiters.push(resolve))
  if (!frame) {
    lastTime = 0
    frame = requestAnimationFrame(loop)
  }
  return done
}

/** Returns a stable fire function with default options merged in */
export function useConfetti(defaults?: ConfettiOptions) {
  const key = JSON.stringify(defaults ?? {}, (k, v) =>
    k === "origin" ? undefined : v,
  )
  const base = useMemo(() => defaults, [key])
  const origin = defaults?.origin

  const fire = useCallback(
    (options?: ConfettiOptions) =>
      fireConfetti({ ...base, origin, ...options }),
    [base, origin],
  )
  return { fire }
}

export type ConfettiButtonProps = ComponentProps<"button"> & {
  /** Burst options, origin defaults to the button itself */
  options?: ConfettiOptions
}

export function ConfettiButton({
  options,
  onClick,
  className,
  type = "button",
  ...props
}: ConfettiButtonProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event)
    if (event.defaultPrevented) return
    fireConfetti({ origin: event.currentTarget, ...options })
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      className={cn(
        "inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium whitespace-nowrap text-primary-foreground transition-[color,background-color,transform] outline-none hover:bg-primary/90 focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 motion-reduce:active:scale-100",
        className,
      )}
      {...props}
    />
  )
}
