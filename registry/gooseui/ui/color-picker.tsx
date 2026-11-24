// Color math only, no "use client": the helpers work in Server Components too.
// The interactive picker lives in color-picker.client.tsx.

/* ------------------------------------------------------------------ */
/* Color math: OKLCH <-> OKLab <-> linear sRGB (Björn Ottosson's matrices) */
/* ------------------------------------------------------------------ */

export type Oklch = {
  /** Lightness, 0..1 */
  l: number
  /** Chroma, 0..~0.4 */
  c: number
  /** Hue in degrees, 0..360 */
  h: number
  /** Opacity, 0..1 */
  alpha: number
}

/** Right edge of the chroma axis. Covers sRGB and Display P3 at every hue */
export const MAX_CHROMA = 0.4

function oklchToLinearSrgb({ l, c, h }: Oklch): [number, number, number] {
  const rad = (h * Math.PI) / 180
  const a = c * Math.cos(rad)
  const b = c * Math.sin(rad)
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3
  return [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ]
}

function linearToGamma(x: number) {
  const sign = x < 0 ? -1 : 1
  const v = Math.abs(x)
  return sign * (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055)
}

function gammaToLinear(x: number) {
  const sign = x < 0 ? -1 : 1
  const v = Math.abs(x)
  return sign * (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
}

/** Gamma-encoded sRGB channels, 0..1, not clipped (out-of-gamut colors fall outside 0..1) */
export function oklchToRgb(color: Oklch): [number, number, number] {
  const [r, g, b] = oklchToLinearSrgb(color)
  return [linearToGamma(r), linearToGamma(g), linearToGamma(b)]
}

/** sRGB channels 0..1 to OKLCH */
export function rgbToOklch(r: number, g: number, b: number, alpha = 1): Oklch {
  const lr = gammaToLinear(r)
  const lg = gammaToLinear(g)
  const lb = gammaToLinear(b)
  const l_ = Math.cbrt(
    0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb,
  )
  const m_ = Math.cbrt(
    0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb,
  )
  const s_ = Math.cbrt(
    0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb,
  )
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_
  const A = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_
  const B = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_
  const c = Math.hypot(A, B)
  const h = c < 1e-4 ? 0 : ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360
  return { l: L, c, h, alpha }
}

// Loose enough to absorb rounding in hex round trips
const EPS = 1e-5
const inUnit = (eps: number) => (v: number) => v >= -eps && v <= 1 + eps

export function isInSrgb(color: Oklch, eps = EPS) {
  return oklchToLinearSrgb(color).every(inUnit(eps))
}

export function isInP3(color: Oklch, eps = EPS) {
  const [r, g, b] = oklchToLinearSrgb(color)
  return [
    0.8224621 * r + 0.177538 * g,
    0.0331941 * r + 0.9668058 * g,
    0.0170827 * r + 0.0723974 * g + 0.9105199 * b,
  ].every(inUnit(eps))
}

/** Largest chroma at this lightness and hue that still fits the gamut */
export function maxChroma(l: number, h: number, gamut: "srgb" | "p3" = "srgb") {
  const test = gamut === "srgb" ? isInSrgb : isInP3
  let lo = 0
  let hi = MAX_CHROMA
  for (let i = 0; i < 18; i++) {
    const mid = (lo + hi) / 2
    // Strict: near black the channels are tiny and any tolerance would let chroma run away
    if (test({ l, c: mid, h, alpha: 1 }, 0)) lo = mid
    else hi = mid
  }
  return lo
}

/** Keeps lightness and hue, lowers chroma until the color fits sRGB */
export function toSrgbGamut(color: Oklch): Oklch {
  const l = Math.min(1, Math.max(0, color.l))
  const next = { ...color, l }
  if (isInSrgb(next)) return next
  return { ...next, c: Math.min(color.c, maxChroma(l, color.h)) }
}

const round = (v: number, digits: number) => {
  const f = 10 ** digits
  return Math.round(v * f) / f
}

/** `oklch(0.7 0.15 250)` or `oklch(0.7 0.15 250 / 50%)` */
export function formatOklch({ l, c, h, alpha }: Oklch) {
  const base = `${round(l, 3)} ${round(c, 3)} ${round(h, 1)}`
  return alpha < 1
    ? `oklch(${base} / ${Math.round(alpha * 100)}%)`
    : `oklch(${base})`
}

/** `#rrggbb` (or `#rrggbbaa`), mapped into sRGB first */
export function formatHex(color: Oklch) {
  const hex = (v: number) =>
    Math.round(Math.min(1, Math.max(0, v)) * 255)
      .toString(16)
      .padStart(2, "0")
  const [r, g, b] = oklchToRgb(toSrgbGamut(color))
  return `#${hex(r)}${hex(g)}${hex(b)}${color.alpha < 1 ? hex(color.alpha) : ""}`
}

const NUM = "[-+]?(?:\\d+\\.?\\d*|\\.\\d+)(?:e[-+]?\\d+)?"
const OKLCH_RE = new RegExp(
  `^oklch\\(\\s*(${NUM}%?|none)\\s+(${NUM}%?|none)\\s+(${NUM}(?:deg)?|none)\\s*(?:\\/\\s*(${NUM}%?|none)\\s*)?\\)$`,
  "i",
)

function parseNumber(
  token: string | undefined,
  percentScale: number,
  fallback: number,
) {
  if (!token || token === "none") return fallback
  return token.endsWith("%")
    ? (Number.parseFloat(token) / 100) * percentScale
    : Number.parseFloat(token)
}

/** Reads `oklch(...)` and `#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`. Returns null for anything else */
export function parseColor(input: string): Oklch | null {
  const text = input.trim()
  const match = OKLCH_RE.exec(text)
  if (match) {
    const l = parseNumber(match[1], 1, 0)
    const c = parseNumber(match[2], MAX_CHROMA, 0)
    const h = parseNumber(match[3]?.replace(/deg$/i, ""), 1, 0)
    const alpha = parseNumber(match[4], 1, 1)
    if ([l, c, h, alpha].some(Number.isNaN)) return null
    return {
      l: Math.min(1, Math.max(0, l)),
      c: Math.max(0, c),
      h: ((h % 360) + 360) % 360,
      alpha: Math.min(1, Math.max(0, alpha)),
    }
  }
  const hex = /^#?([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i.exec(text)?.[1]
  if (!hex) return null
  const full =
    hex.length <= 4
      ? hex
          .split("")
          .map((ch) => ch + ch)
          .join("")
      : hex
  const channel = (i: number) =>
    Number.parseInt(full.slice(i * 2, i * 2 + 2), 16) / 255
  return rgbToOklch(
    channel(0),
    channel(1),
    channel(2),
    full.length === 8 ? channel(3) : 1,
  )
}

/** Any supported color string to `#rrggbb`. Null when it cannot be parsed */
export function oklchToHex(value: string) {
  const color = parseColor(value)
  return color ? formatHex(color) : null
}

/** Any supported color string to `oklch(...)`. Null when it cannot be parsed */
export function hexToOklch(value: string) {
  const color = parseColor(value)
  return color ? formatOklch(color) : null
}

/** Black or white, whichever reads better on this color (WCAG luminance) */
export function readableTextColor(color: Oklch) {
  const [r, g, b] = oklchToLinearSrgb(toSrgbGamut(color)).map((v) =>
    Math.min(1, Math.max(0, v)),
  )
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.179 ? "#000" : "#fff"
}

export {
  ColorPicker,
  type ColorPickerLabels,
  type ColorPickerProps,
} from "@/registry/gooseui/ui/color-picker.client"
