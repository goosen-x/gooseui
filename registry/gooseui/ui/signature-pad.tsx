"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type Point = { x: number; y: number }

export type SignatureStroke = {
  points: Point[]
  /** `null` means the pen follows the current text color */
  color: string | null
  width: number
}

export type SignatureExportOptions = {
  /** Crop empty space around the signature */
  trim?: boolean
  /** Extra space kept around the signature when trimming, in CSS pixels */
  padding?: number
  /** Image MIME type, PNG by default */
  type?: string
  quality?: number
  /** Ink color in the exported image. Defaults to the color on screen */
  color?: string
  /** Fill behind the signature. Transparent by default */
  background?: string
  /** Pixel density of the image. Defaults to the device pixel ratio */
  scale?: number
}

export type SignaturePadHandle = {
  clear: () => void
  undo: () => void
  isEmpty: () => boolean
  toDataURL: (options?: SignatureExportOptions) => string
  toBlob: (options?: SignatureExportOptions) => Promise<Blob | null>
  /** A copy of the recorded strokes in CSS pixels */
  getStrokes: () => SignatureStroke[]
}

export type SignaturePadLabels = {
  /** Accessible name of the canvas */
  canvas: string
  /** Hint shown while the pad is empty */
  placeholder: string
}

export type SignaturePadProps = Omit<
  React.ComponentProps<"div">,
  "onChange" | "children" | "ref"
> & {
  ref?: React.Ref<SignaturePadHandle>
  /** Pen color. Follows the current text color when omitted */
  penColor?: string
  /** Line width in CSS pixels */
  penWidth?: number
  disabled?: boolean
  /** Draw a guide line near the bottom */
  showGuide?: boolean
  onChange?: (state: { isEmpty: boolean; strokeCount: number }) => void
  onBegin?: () => void
  onEnd?: () => void
  labels?: Partial<SignaturePadLabels>
}

const defaultLabels: SignaturePadLabels = {
  canvas: "Signature pad",
  placeholder: "Sign here",
}

const mid = (a: Point, b: Point): Point => ({
  x: (a.x + b.x) / 2,
  y: (a.y + b.y) / 2,
})

// Smooth path: straight to the first midpoint, quadratic curves through
// each recorded point to the next midpoint, straight to the last point.
function drawStroke(
  ctx: CanvasRenderingContext2D,
  stroke: SignatureStroke,
  color: string,
) {
  const { points, width } = stroke
  if (points.length === 0) return
  ctx.strokeStyle = color
  ctx.fillStyle = color
  ctx.lineWidth = width
  ctx.lineCap = "round"
  ctx.lineJoin = "round"

  if (points.length === 1) {
    ctx.beginPath()
    ctx.arc(points[0].x, points[0].y, width / 2, 0, Math.PI * 2)
    ctx.fill()
    return
  }

  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)
  let prev = mid(points[0], points[1])
  ctx.lineTo(prev.x, prev.y)
  for (let i = 1; i < points.length - 1; i++) {
    const next = mid(points[i], points[i + 1])
    ctx.quadraticCurveTo(points[i].x, points[i].y, next.x, next.y)
    prev = next
  }
  const last = points[points.length - 1]
  ctx.lineTo(last.x, last.y)
  ctx.stroke()
}

// Draws only the newest segment while the pen is moving
function drawTail(
  ctx: CanvasRenderingContext2D,
  stroke: SignatureStroke,
  color: string,
) {
  const p = stroke.points
  const n = p.length
  if (n < 2) return
  ctx.strokeStyle = color
  ctx.lineWidth = stroke.width
  ctx.lineCap = "round"
  ctx.lineJoin = "round"
  ctx.beginPath()
  if (n === 2) {
    const m = mid(p[0], p[1])
    ctx.moveTo(p[0].x, p[0].y)
    ctx.lineTo(m.x, m.y)
  } else {
    const from = mid(p[n - 3], p[n - 2])
    const to = mid(p[n - 2], p[n - 1])
    ctx.moveTo(from.x, from.y)
    ctx.quadraticCurveTo(p[n - 2].x, p[n - 2].y, to.x, to.y)
  }
  ctx.stroke()
}

function strokeBounds(strokes: SignatureStroke[]) {
  let left = Number.POSITIVE_INFINITY
  let top = Number.POSITIVE_INFINITY
  let right = Number.NEGATIVE_INFINITY
  let bottom = Number.NEGATIVE_INFINITY
  for (const s of strokes) {
    const r = s.width / 2
    for (const p of s.points) {
      left = Math.min(left, p.x - r)
      top = Math.min(top, p.y - r)
      right = Math.max(right, p.x + r)
      bottom = Math.max(bottom, p.y + r)
    }
  }
  return right < left ? null : { left, top, right, bottom }
}

export function SignaturePad({
  ref,
  penColor,
  penWidth = 2.5,
  disabled = false,
  showGuide = true,
  onChange,
  onBegin,
  onEnd,
  labels: labelsProp,
  className,
  ...rest
}: SignaturePadProps) {
  const labels = { ...defaultLabels, ...labelsProp }
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const strokes = React.useRef<SignatureStroke[]>([])
  const active = React.useRef<{ id: number; stroke: SignatureStroke } | null>(
    null,
  )
  const size = React.useRef({ width: 0, height: 0 })
  const [empty, setEmpty] = React.useState(true)

  // Keep callbacks fresh without re-binding listeners
  const callbacks = React.useRef({ onChange, onBegin, onEnd })
  callbacks.current = { onChange, onBegin, onEnd }

  const inkColor = React.useCallback((stroke: SignatureStroke) => {
    if (stroke.color) return stroke.color
    const canvas = canvasRef.current
    return canvas ? getComputedStyle(canvas).color : "#000"
  }, [])

  const redraw = React.useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    const dpr = window.devicePixelRatio || 1
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    for (const s of strokes.current) drawStroke(ctx, s, inkColor(s))
  }, [inkColor])

  const notify = React.useCallback(() => {
    const count = strokes.current.length
    setEmpty(count === 0)
    callbacks.current.onChange?.({ isEmpty: count === 0, strokeCount: count })
  }, [])

  // Match the backing store to the element size and device pixel ratio
  React.useEffect(() => {
    const wrapper = wrapperRef.current
    const canvas = canvasRef.current
    if (!wrapper || !canvas) return
    const resize = () => {
      const rect = wrapper.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      size.current = { width: rect.width, height: rect.height }
      canvas.width = Math.max(1, Math.round(rect.width * dpr))
      canvas.height = Math.max(1, Math.round(rect.height * dpr))
      redraw()
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(wrapper)
    return () => observer.disconnect()
  }, [redraw])

  // Ink that follows the text color must be repainted when the theme changes
  React.useEffect(() => {
    if (penColor) return
    const observer = new MutationObserver(redraw)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style", "data-theme"],
    })
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    media.addEventListener("change", redraw)
    return () => {
      observer.disconnect()
      media.removeEventListener("change", redraw)
    }
  }, [penColor, redraw])

  const pointFrom = (event: { clientX: number; clientY: number }) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    return rect
      ? { x: event.clientX - rect.left, y: event.clientY - rect.top }
      : { x: 0, y: 0 }
  }

  const onPointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (disabled || active.current) return
    if (event.pointerType === "mouse" && event.button !== 0) return
    event.preventDefault()
    try {
      event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
      // Pointer may already be gone; drawing still works without capture
    }
    const stroke: SignatureStroke = {
      points: [pointFrom(event)],
      color: penColor ?? null,
      width: penWidth,
    }
    active.current = { id: event.pointerId, stroke }
    strokes.current.push(stroke)
    const ctx = canvasRef.current?.getContext("2d")
    if (ctx) drawStroke(ctx, stroke, inkColor(stroke))
    setEmpty(false)
    callbacks.current.onBegin?.()
  }

  const onPointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const current = active.current
    if (!current || current.id !== event.pointerId) return
    const ctx = canvasRef.current?.getContext("2d")
    if (!ctx) return
    const color = inkColor(current.stroke)
    // Coalesced events give a smoother line on fast movement
    const events = event.nativeEvent.getCoalescedEvents?.() ?? [
      event.nativeEvent,
    ]
    for (const e of events.length ? events : [event.nativeEvent]) {
      const point = pointFrom(e)
      const last = current.stroke.points[current.stroke.points.length - 1]
      if (Math.hypot(point.x - last.x, point.y - last.y) < 0.75) continue
      current.stroke.points.push(point)
      drawTail(ctx, current.stroke, color)
    }
  }

  const finish = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const current = active.current
    if (!current || current.id !== event.pointerId) return
    active.current = null
    // Repaint so the final segment and the dot-to-line switch are exact
    redraw()
    notify()
    callbacks.current.onEnd?.()
  }

  const render = React.useCallback(
    (options: SignatureExportOptions = {}) => {
      const {
        trim = false,
        padding = 8,
        color,
        background,
        scale = window.devicePixelRatio || 1,
      } = options
      const { width, height } = size.current
      let box = { left: 0, top: 0, right: width, bottom: height }
      if (trim) {
        const b = strokeBounds(strokes.current)
        if (b) {
          box = {
            left: Math.max(0, b.left - padding),
            top: Math.max(0, b.top - padding),
            right: Math.min(width, b.right + padding),
            bottom: Math.min(height, b.bottom + padding),
          }
        }
      }
      const w = Math.max(1, box.right - box.left)
      const h = Math.max(1, box.bottom - box.top)
      const out = document.createElement("canvas")
      out.width = Math.max(1, Math.round(w * scale))
      out.height = Math.max(1, Math.round(h * scale))
      const ctx = out.getContext("2d")
      if (ctx) {
        if (background) {
          ctx.fillStyle = background
          ctx.fillRect(0, 0, out.width, out.height)
        }
        ctx.setTransform(
          scale,
          0,
          0,
          scale,
          -box.left * scale,
          -box.top * scale,
        )
        for (const s of strokes.current)
          drawStroke(ctx, s, color ?? inkColor(s))
      }
      return out
    },
    [inkColor],
  )

  React.useImperativeHandle(
    ref,
    () => ({
      clear: () => {
        strokes.current = []
        active.current = null
        redraw()
        notify()
      },
      undo: () => {
        if (active.current) return
        strokes.current.pop()
        redraw()
        notify()
      },
      isEmpty: () => strokes.current.length === 0,
      toDataURL: (options) =>
        render(options).toDataURL(
          options?.type ?? "image/png",
          options?.quality,
        ),
      toBlob: (options) =>
        new Promise((resolve) => {
          render(options).toBlob(
            resolve,
            options?.type ?? "image/png",
            options?.quality,
          )
        }),
      getStrokes: () =>
        strokes.current.map((s) => ({
          ...s,
          points: s.points.map((p) => ({ ...p })),
        })),
    }),
    [notify, redraw, render],
  )

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "relative h-48 w-full overflow-hidden rounded-lg border border-dashed bg-background text-foreground",
        disabled && "opacity-60",
        className,
      )}
      {...rest}
    >
      {showGuide && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 bottom-10 border-b border-border"
        />
      )}
      {empty && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 bottom-12 select-none text-sm text-muted-foreground"
        >
          {labels.placeholder}
        </span>
      )}
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={labels.canvas}
        aria-disabled={disabled || undefined}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finish}
        onPointerCancel={finish}
        onLostPointerCapture={finish}
        className={cn(
          "absolute inset-0 size-full touch-none",
          disabled ? "cursor-not-allowed" : "cursor-crosshair",
        )}
      />
    </div>
  )
}
