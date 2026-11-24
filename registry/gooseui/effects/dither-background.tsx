"use client"

import { type ComponentProps, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export type DitherPattern = "waves" | "noise" | "radial"

export type DitherBackgroundProps = Omit<ComponentProps<"div">, "children"> & {
  /** Size of one dither cell in CSS pixels */
  pixelSize?: number
  /** Animation speed multiplier, 0 freezes the field */
  speed?: number
  /** Color of the lit cells, any CSS color or var() */
  colorFront?: string
  /** Color of the unlit cells, any CSS color or var() */
  colorBack?: string
  /** Shape of the underlying smooth field */
  pattern?: DitherPattern
  /** Field zoom, higher values give larger shapes */
  scale?: number
  /** Frames per second cap */
  fps?: number
}

// 8x8 Bayer matrix, normalized to thresholds in (0, 1)
const BAYER_8 = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36,
  14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41,
  51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23,
  61, 29, 53, 21,
].map((v) => (v + 0.5) / 64)

// Keeps per-frame work bounded on very large surfaces
const MAX_CELLS = 160_000

// Periodic table of random lattice values for the noise pattern, so no sin() hash runs per cell
const LATTICE = 64
const lattice = (() => {
  const table = new Float32Array(LATTICE * LATTICE)
  let seed = 0x9e3779b9
  for (let i = 0; i < table.length; i++) {
    // mulberry32
    seed = (seed + 0x6d2b79f5) | 0
    let z = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    z = (z + Math.imul(z ^ (z >>> 7), 61 | z)) ^ z
    table[i] = ((z ^ (z >>> 14)) >>> 0) / 4294967296
  }
  return table
})()

// Lattice indices and fade weights for one octave along one axis
type Axis = { i0: Int32Array; i1: Int32Array; u: Float32Array }

const makeAxis = (n: number): Axis => ({
  i0: new Int32Array(n),
  i1: new Int32Array(n),
  u: new Float32Array(n),
})

function fillAxis(
  axis: Axis,
  n: number,
  step: number,
  offset: number,
  stride: number,
) {
  for (let i = 0; i < n; i++) {
    const p = i * step + offset
    const f = Math.floor(p)
    const r = p - f
    axis.i0[i] = (f & (LATTICE - 1)) * stride
    axis.i1[i] = ((f + 1) & (LATTICE - 1)) * stride
    // Quintic fade: zero first and second derivative on the lattice, no visible grid
    axis.u[i] = r * r * r * (r * (r * 6 - 15) + 10)
  }
}

function sampleOctave(cx: Axis, cy: Axis, px: number, py: number) {
  const y0 = cy.i0[py]
  const y1 = cy.i1[py]
  const x0 = cx.i0[px]
  const x1 = cx.i1[px]
  const a = lattice[y0 + x0]
  const b = lattice[y0 + x1]
  const c = lattice[y1 + x0]
  const d = lattice[y1 + x1]
  const ux = cx.u[px]
  const uy = cy.u[py]
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy
}

// Per-axis tables: everything that depends only on a column or only on a row is computed once per frame
type Buffers = {
  w: number
  h: number
  colA: Float32Array
  colB: Float32Array
  colC: Float32Array
  rowA: Float32Array
  rowB: Float32Array
  rowC: Float32Array
  nx1: Axis
  nx2: Axis
  ny1: Axis
  ny2: Axis
}

function makeBuffers(w: number, h: number): Buffers {
  return {
    w,
    h,
    colA: new Float32Array(w),
    colB: new Float32Array(w),
    colC: new Float32Array(w),
    rowA: new Float32Array(h),
    rowB: new Float32Array(h),
    rowC: new Float32Array(h),
    nx1: makeAxis(w),
    nx2: makeAxis(w),
    ny1: makeAxis(h),
    ny2: makeAxis(h),
  }
}

// Writes the lit/unlit mask into the alpha channel of the image
function renderField(
  data: Uint8ClampedArray,
  buf: Buffers,
  pattern: DitherPattern,
  t: number,
  scale: number,
) {
  const { w, h, colA, colB, colC, rowA, rowB, rowC } = buf
  // Field units are rows, so the shape does not stretch with the aspect ratio
  const unit = 1 / (h * scale)

  if (pattern === "noise") {
    const { nx1, nx2, ny1, ny2 } = buf
    fillAxis(nx1, w, unit * 2, t * 0.3, 1)
    fillAxis(nx2, w, unit * 4, -t * 0.22, 1)
    fillAxis(ny1, h, unit * 2, -t * 0.15, LATTICE)
    fillAxis(ny2, h, unit * 4, t * 0.35, LATTICE)
    for (let py = 0; py < h; py++) rowA[py] = (1 - py / h) * 0.3 - 0.22
    for (let py = 0; py < h; py++) {
      const row = (py & 7) * 8
      const base = rowA[py]
      let o = py * w * 4 + 3
      for (let px = 0; px < w; px++) {
        const n =
          sampleOctave(nx1, ny1, px, py) * 0.7 +
          sampleOctave(nx2, ny2, px, py) * 0.3
        // Contrast around the middle so the lit and unlit regions read as shapes
        const v = (n - 0.5) * 1.1 + 0.5 + base
        data[o] = v > BAYER_8[row + (px & 7)] ? 255 : 0
        o += 4
      }
    }
    return
  }

  if (pattern === "radial") {
    // colA: dx squared, rowA: dy squared
    for (let px = 0; px < w; px++) {
      const dx = (px - w / 2) / h
      colA[px] = dx * dx
    }
    for (let py = 0; py < h; py++) {
      const dy = py / h - 0.5
      rowA[py] = dy * dy
    }
    const invScale = 1 / scale
    const phase = t * 1.6
    for (let py = 0; py < h; py++) {
      const row = (py & 7) * 8
      const dy2 = rowA[py]
      let o = py * w * 4 + 3
      for (let px = 0; px < w; px++) {
        const d = Math.sqrt(colA[px] + dy2) * invScale
        const v = 1 - d * 1.3 + Math.sin(d * 14 - phase) * 0.12
        data[o] = v > BAYER_8[row + (px & 7)] ? 255 : 0
        o += 4
      }
    }
    return
  }

  // waves: sin(x*3.5 + y*3.5 - 1.1t) is split into column and row factors
  for (let px = 0; px < w; px++) {
    const x = px * unit
    colA[px] = Math.sin(x * 5 + t * 0.9)
    const b = x * 3.5 - t * 1.1
    colB[px] = Math.sin(b)
    colC[px] = Math.cos(b)
  }
  for (let py = 0; py < h; py++) {
    const y = py * unit
    rowA[py] = Math.cos(y * 4 - t * 0.6)
    rowB[py] = Math.sin(y * 3.5)
    rowC[py] = Math.cos(y * 3.5)
  }
  for (let py = 0; py < h; py++) {
    const row = (py & 7) * 8
    const base = 0.08 + (1 - py / h) * 0.6
    const ra = rowA[py]
    const rb = rowB[py]
    const rc = rowC[py]
    let o = py * w * 4 + 3
    for (let px = 0; px < w; px++) {
      const wave = colA[px] * ra * 0.5 + (colB[px] * rc + colC[px] * rb) * 0.5
      const v = base + wave * 0.3
      data[o] = v > BAYER_8[row + (px & 7)] ? 255 : 0
      o += 4
    }
  }
}

function resolveColor(el: HTMLElement, value: string) {
  el.style.color = value
  return getComputedStyle(el).color
}

export function DitherBackground({
  pixelSize = 3,
  speed = 1,
  colorFront = "var(--primary)",
  colorBack = "var(--background)",
  pattern = "waves",
  scale = 1,
  fps = 30,
  className,
  style,
  ...props
}: DitherBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const probe = document.createElement("span")
    probe.style.display = "none"
    root.appendChild(probe)

    let colors = { front: "", back: "" }
    const readColors = () => {
      colors = {
        front: resolveColor(probe, colorFront),
        back: resolveColor(probe, colorBack),
      }
    }
    readColors()

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    let reduced = motionQuery.matches
    let visible = true
    let raf = 0
    let last = 0
    let elapsed = 0
    let image: ImageData | null = null
    let buffers: Buffers | null = null

    const resize = () => {
      const rect = root.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      const deviceW = rect.width * dpr
      const deviceH = rect.height * dpr
      // The cell is a whole number of device pixels, so every dot is the same size on any screen
      let cellD = Math.max(1, Math.round(pixelSize * dpr))
      while ((deviceW / cellD) * (deviceH / cellD) > MAX_CELLS) cellD += 1
      const w = Math.max(1, Math.ceil(deviceW / cellD))
      const h = Math.max(1, Math.ceil(deviceH / cellD))
      // Canvas CSS size is exactly w * cellD device pixels, the overflow is clipped by the root
      canvas.style.width = `${(w * cellD) / dpr}px`
      canvas.style.height = `${(h * cellD) / dpr}px`
      if (!image || canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        image = ctx.createImageData(w, h)
        // Mask is white, only alpha changes per frame
        image.data.fill(255)
        buffers = makeBuffers(w, h)
      }
    }

    const draw = (t: number) => {
      if (!image) resize()
      if (!image || !buffers) return
      const { width: w, height: h, data } = image
      renderField(data, buffers, pattern, t, scale)
      ctx.putImageData(image, 0, 0)
      ctx.globalCompositeOperation = "source-in"
      ctx.fillStyle = colors.front
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = "destination-over"
      ctx.fillStyle = colors.back
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = "source-over"
    }

    const frameInterval = 1000 / Math.max(1, fps)
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      const delta = now - last
      if (delta < frameInterval) return
      last = now
      elapsed += Math.min(delta, 100) * 0.001 * speed
      draw(elapsed)
    }

    const sync = () => {
      cancelAnimationFrame(raf)
      raf = 0
      const running = visible && !document.hidden && !reduced && speed !== 0
      // Paint right away so the first frame does not wait for the frame interval
      draw(elapsed)
      if (running) {
        last = performance.now()
        raf = requestAnimationFrame(loop)
      }
    }

    const ro = new ResizeObserver(() => {
      resize()
      draw(elapsed)
    })
    ro.observe(root)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      sync()
    })
    io.observe(root)

    const onVisibility = () => sync()
    document.addEventListener("visibilitychange", onVisibility)

    const onMotion = () => {
      reduced = motionQuery.matches
      sync()
    }
    motionQuery.addEventListener("change", onMotion)

    // Theme switches usually toggle a class or attribute on <html>
    const onTheme = () => {
      readColors()
      draw(elapsed)
    }
    const mo = new MutationObserver(onTheme)
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style", "data-theme"],
    })
    const schemeQuery = window.matchMedia("(prefers-color-scheme: dark)")
    schemeQuery.addEventListener("change", onTheme)

    // devicePixelRatio changes when the window moves to another display or the page is zoomed
    let dprQuery: MediaQueryList | null = null
    const onDpr = () => {
      watchDpr()
      resize()
      draw(elapsed)
    }
    const watchDpr = () => {
      dprQuery?.removeEventListener("change", onDpr)
      dprQuery = window.matchMedia(
        `(resolution: ${window.devicePixelRatio}dppx)`,
      )
      dprQuery.addEventListener("change", onDpr)
    }
    watchDpr()

    resize()
    sync()

    return () => {
      dprQuery?.removeEventListener("change", onDpr)
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      motionQuery.removeEventListener("change", onMotion)
      schemeQuery.removeEventListener("change", onTheme)
      probe.remove()
    }
  }, [pixelSize, speed, colorFront, colorBack, pattern, scale, fps])

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      style={{ backgroundColor: colorBack, ...style }}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="block max-w-none"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  )
}
