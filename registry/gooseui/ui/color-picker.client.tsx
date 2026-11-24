"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  formatHex,
  formatOklch,
  isInP3,
  isInSrgb,
  MAX_CHROMA,
  maxChroma,
  type Oklch,
  parseColor,
  readableTextColor,
  toSrgbGamut,
} from "@/registry/gooseui/ui/color-picker"

const round = (v: number, digits: number) => {
  const f = 10 ** digits
  return Math.round(v * f) / f
}
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const COLUMNS = 64
const CHECKER =
  "repeating-conic-gradient(#d4d4d8 0 25%, #fff 0 50%) 0 0 / 8px 8px"

// The L x C plane is not separable, so it is drawn as thin columns, each a
// vertical lightness ramp at one chroma. The hue comes from --cp-h.
function areaLayers(space: string) {
  return Array.from({ length: COLUMNS }, (_, i) => {
    const c = round(((i + 0.5) / COLUMNS) * MAX_CHROMA, 4)
    return `linear-gradient(to bottom${space}, oklch(1 ${c} var(--cp-h)), oklch(0 ${c} var(--cp-h)))`
  }).join(", ")
}

// Built on first render, not at import time: color-picker.tsx re-exports this
// module, so its constants may not be ready while this module loads
let styles: string | undefined
function getStyles() {
  if (styles) return styles
  const hueStops = Array.from(
    { length: 13 },
    (_, i) => `oklch(0.75 0.15 ${i * 30})`,
  ).join(", ")
  const sizes = Array.from(
    { length: COLUMNS },
    () => `calc(100% / ${COLUMNS} + 1px) 100%`,
  ).join(", ")
  const positions = Array.from(
    { length: COLUMNS },
    (_, i) => `calc(100% * ${i} / ${COLUMNS - 1}) 0`,
  ).join(", ")
  styles = `
.gooseui-cp {
  --cp-solid: oklch(var(--cp-l) var(--cp-c) var(--cp-h));
  --cp-color: oklch(var(--cp-l) var(--cp-c) var(--cp-h) / var(--cp-a));
}
.gooseui-cp-area {
  background-image: ${areaLayers("")};
  background-size: ${sizes};
  background-position: ${positions};
  background-repeat: no-repeat;
}
.gooseui-cp-hue { background: linear-gradient(to right, ${hueStops}); }
.gooseui-cp-alpha {
  background:
    linear-gradient(to right, oklch(var(--cp-l) var(--cp-c) var(--cp-h) / 0), var(--cp-solid)),
    ${CHECKER};
}
.gooseui-cp-checker { background: linear-gradient(var(--cp-color), var(--cp-color)), ${CHECKER}; }
@supports (background: linear-gradient(in oklch, red, blue)) {
  .gooseui-cp-area { background-image: ${areaLayers(" in oklch")}; }
  .gooseui-cp-hue { background: linear-gradient(to right in oklch, ${hueStops}); }
  .gooseui-cp-alpha {
    background:
      linear-gradient(to right in oklch, oklch(var(--cp-l) var(--cp-c) var(--cp-h) / 0), var(--cp-solid)),
      ${CHECKER};
  }
}
.gooseui-cp-thumb {
  background: var(--cp-solid);
  border: 2px solid var(--cp-fg);
  box-shadow: 0 0 0 1px rgb(0 0 0 / .25), 0 1px 3px rgb(0 0 0 / .3);
}
.gooseui-cp-hue .gooseui-cp-thumb { background: oklch(0.75 0.15 var(--cp-h)); border-color: #fff; }
.gooseui-cp-fg { color: var(--cp-fg); }
.gooseui-cp-glow { box-shadow: 0 0 0 4px color-mix(in oklch, var(--cp-solid) 25%, transparent); }
@supports (color: contrast-color(red)) {
  .gooseui-cp-thumb { border-color: contrast-color(var(--cp-solid)); }
  .gooseui-cp-fg { color: contrast-color(var(--cp-solid)); }
}
@supports (color: oklch(from red l c h / 50%)) {
  .gooseui-cp-glow { box-shadow: 0 0 0 4px oklch(from var(--cp-solid) l c h / 25%); }
}
.gooseui-cp-warn { color: var(--warning, var(--destructive)); }
.gooseui-cp-badge {
  color: var(--info, var(--primary));
  border-color: var(--border);
  border-color: color-mix(in oklab, currentColor 35%, transparent);
  background: color-mix(in oklab, currentColor 13%, var(--background));
}
.gooseui-cp-p3 { display: none; }
@media (color-gamut: p3) {
  .gooseui-cp-p3 { display: revert-layer; }
  .gooseui-cp-no-p3 { display: none; }
}
`
  return styles
}

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

function usePointerDrag(onMove: (x: number, y: number) => void) {
  const move = (event: React.PointerEvent<HTMLElement>) => {
    const r = event.currentTarget.getBoundingClientRect()
    onMove(
      clamp01((event.clientX - r.left) / r.width),
      clamp01((event.clientY - r.top) / r.height),
    )
  }
  return {
    onPointerDown: (event: React.PointerEvent<HTMLElement>) => {
      if (event.button !== 0) return
      event.preventDefault()
      event.currentTarget.setPointerCapture(event.pointerId)
      event.currentTarget.focus({ preventScroll: true })
      move(event)
    },
    onPointerMove: (event: React.PointerEvent<HTMLElement>) => {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) move(event)
    },
  }
}

const focusRing =
  "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"

function WarningIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}

function ColorSlider({
  label,
  value,
  max,
  step,
  bigStep,
  valueText,
  onChange,
  disabled,
  className,
}: {
  label: string
  value: number
  max: number
  step: number
  bigStep: number
  valueText: string
  onChange: (value: number) => void
  disabled: boolean
  className: string
}) {
  const drag = usePointerDrag((x) => onChange(x * max))
  return (
    <div
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-label={label}
      aria-orientation="horizontal"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={round(value, 3)}
      aria-valuetext={valueText}
      aria-disabled={disabled || undefined}
      data-slot="color-picker-slider"
      className={cn(
        "relative h-3.5 cursor-pointer touch-none rounded-full shadow-[inset_0_0_0_1px_rgb(0_0_0/0.08)]",
        focusRing,
        className,
      )}
      {...drag}
      onKeyDown={(event) => {
        const delta = event.shiftKey ? bigStep : step
        const next =
          event.key === "ArrowRight" || event.key === "ArrowUp"
            ? value + delta
            : event.key === "ArrowLeft" || event.key === "ArrowDown"
              ? value - delta
              : event.key === "PageUp"
                ? value + bigStep
                : event.key === "PageDown"
                  ? value - bigStep
                  : event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? max
                      : null
        if (next === null) return
        event.preventDefault()
        onChange(Math.min(max, Math.max(0, next)))
      }}
    >
      <span
        aria-hidden
        className="gooseui-cp-thumb pointer-events-none absolute top-1/2 size-4.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: `calc(0.5625rem + (100% - 1.125rem) * ${round(value / max, 4)})`,
        }}
      />
    </div>
  )
}

function gamutPath(h: number, gamut: "srgb" | "p3") {
  const points: string[] = []
  for (let i = 0; i <= 50; i++) {
    const l = i / 50
    points.push(
      `${round((maxChroma(l, h, gamut) / MAX_CHROMA) * 100, 2)},${round((1 - l) * 100, 2)}`,
    )
  }
  return points.join(" ")
}

/* ------------------------------------------------------------------ */
/* ColorPicker                                                         */
/* ------------------------------------------------------------------ */

const DEFAULT_COLOR: Oklch = { l: 0.62, c: 0.19, h: 255, alpha: 1 }

const DEFAULT_LABELS = {
  /** Name of the lightness x chroma area */
  area: "Lightness and chroma",
  lightness: "Lightness",
  chroma: "chroma",
  hue: "Hue",
  degrees: "degrees",
  opacity: "Opacity",
  /** Label of the text field (visually hidden) */
  input: "Color value (oklch or hex)",
  swatches: "Swatches",
  /** Tooltip of the P3 badge */
  p3: "Shown in Display P3 on this screen",
  widerThanSrgb: "Wider than sRGB",
  outsideSrgb: "Outside sRGB",
  outsideSrgbAndP3: "Outside sRGB and P3",
  fitToSrgb: "Fit to sRGB",
}

export type ColorPickerLabels = typeof DEFAULT_LABELS

export type ColorPickerProps = Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange"
> & {
  /** Controlled value: any `oklch(...)` or hex string */
  value?: string
  defaultValue?: string
  /** Receives the color in `format` on every change */
  onValueChange?: (value: string) => void
  /** Preset colors (oklch or hex) shown under the picker */
  swatches?: string[]
  /** Show the opacity slider */
  showAlpha?: boolean
  /** Output format. Hex values are mapped into sRGB first */
  format?: "oklch" | "hex"
  /** Adds a hidden input with this name, for plain form posts */
  name?: string
  disabled?: boolean
  /** Texts for labels, hints and screen readers */
  labels?: Partial<ColorPickerLabels>
}

export function ColorPicker({
  value,
  defaultValue,
  onValueChange,
  swatches,
  showAlpha = false,
  format = "oklch",
  name,
  disabled = false,
  labels,
  className,
  style,
  ...props
}: ColorPickerProps) {
  const t = { ...DEFAULT_LABELS, ...labels }
  const inputId = React.useId()
  const [color, setColor] = React.useState<Oklch>(
    () => parseColor(value ?? defaultValue ?? "") ?? DEFAULT_COLOR,
  )
  const [draft, setDraft] = React.useState<string | null>(null)
  // The last string we sent out; echoing it back must not reset the hue of a grey
  const emitted = React.useRef<string | null>(null)
  const [prevValue, setPrevValue] = React.useState(value)
  if (value !== prevValue) {
    setPrevValue(value)
    if (value !== undefined && value !== emitted.current) {
      const parsed = parseColor(value)
      if (parsed) setColor(parsed.c < 5e-4 ? { ...parsed, h: color.h } : parsed)
    }
  }

  const output = (c: Oklch) =>
    format === "hex" ? formatHex(c) : formatOklch(c)
  const current = output(color)

  const update = (next: Oklch) => {
    const fixed = {
      l: clamp01(next.l),
      c: Math.min(MAX_CHROMA, Math.max(0, next.c)),
      h: ((next.h % 360) + 360) % 360,
      alpha: clamp01(next.alpha),
    }
    setColor(fixed)
    const out = output(fixed)
    emitted.current = out
    if (out !== current) onValueChange?.(out)
  }

  const applyText = (text: string, keepAlpha: boolean) => {
    const parsed = parseColor(text)
    if (!parsed) return false
    update({
      ...parsed,
      h: parsed.c < 5e-4 ? color.h : parsed.h,
      alpha:
        keepAlpha && !/\/|#[\da-f]{4}$|#[\da-f]{8}$/i.test(text.trim())
          ? color.alpha
          : parsed.alpha,
    })
    return true
  }

  const inSrgb = isInSrgb(color)
  const inP3 = isInP3(color)
  const srgbLine = React.useMemo(() => gamutPath(color.h, "srgb"), [color.h])
  const p3Line = React.useMemo(() => gamutPath(color.h, "p3"), [color.h])
  const draftInvalid = draft !== null && parseColor(draft) === null

  const areaDrag = usePointerDrag((x, y) =>
    update({ ...color, l: 1 - y, c: x * MAX_CHROMA }),
  )
  const currentHex = formatHex({ ...color, alpha: 1 })

  return (
    <div
      {...props}
      data-slot="color-picker"
      aria-disabled={disabled || undefined}
      className={cn(
        "gooseui-cp flex w-64 flex-col gap-3 select-none",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      style={
        {
          ...style,
          "--cp-l": round(color.l, 4),
          "--cp-c": round(color.c, 4),
          "--cp-h": round(color.h, 2),
          "--cp-a": round(color.alpha, 3),
          "--cp-fg": readableTextColor(color),
        } as React.CSSProperties
      }
    >
      <style href="gooseui-color-picker" precedence="default">
        {getStyles()}
      </style>
      {name && <input type="hidden" name={name} value={current} />}

      <div
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-label={t.area}
        aria-roledescription="2D slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(color.l * 100)}
        aria-valuetext={`${t.lightness} ${Math.round(color.l * 100)}%, ${t.chroma} ${round(color.c, 3)}${inSrgb ? "" : `, ${t.outsideSrgb}`}`}
        aria-disabled={disabled || undefined}
        data-slot="color-picker-area"
        className={cn(
          "gooseui-cp-area relative aspect-[4/3] w-full cursor-crosshair touch-none rounded-md shadow-[inset_0_0_0_1px_rgb(0_0_0/0.08)]",
          focusRing,
        )}
        {...areaDrag}
        onKeyDown={(event) => {
          const fine = !event.shiftKey
          const dl = fine ? 0.01 : 0.1
          const dc = fine ? 0.005 : 0.05
          const moves: Record<string, Partial<Oklch>> = {
            ArrowUp: { l: color.l + dl },
            ArrowDown: { l: color.l - dl },
            ArrowRight: { c: color.c + dc },
            ArrowLeft: { c: color.c - dc },
            PageUp: { l: color.l + 0.1 },
            PageDown: { l: color.l - 0.1 },
            Home: { c: 0 },
            End: { c: maxChroma(color.l, color.h) },
          }
          const move = moves[event.key]
          if (!move) return
          event.preventDefault()
          update({ ...color, ...move })
        }}
      >
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 size-full overflow-visible"
        >
          <polyline
            points={p3Line}
            fill="none"
            stroke="white"
            strokeOpacity={0.55}
            strokeWidth={1}
            strokeDasharray="2 3"
            vectorEffect="non-scaling-stroke"
            className="gooseui-cp-p3"
          />
          <polyline
            points={srgbLine}
            fill="none"
            stroke="white"
            strokeOpacity={0.85}
            strokeWidth={1.25}
            strokeDasharray="4 3"
            vectorEffect="non-scaling-stroke"
            style={{ filter: "drop-shadow(0 0 1px rgb(0 0 0 / .45))" }}
          />
        </svg>
        <span
          aria-hidden
          className="gooseui-cp-thumb pointer-events-none absolute size-4.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: `${(Math.min(color.c, MAX_CHROMA) / MAX_CHROMA) * 100}%`,
            top: `${(1 - color.l) * 100}%`,
          }}
        />
      </div>

      <div className="flex items-center gap-3">
        <div
          aria-hidden
          className="gooseui-cp-checker gooseui-cp-glow grid size-10 shrink-0 place-items-center rounded-full border text-xs font-semibold"
        >
          <span className="gooseui-cp-fg">Aa</span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2.5">
          <ColorSlider
            label={t.hue}
            className="gooseui-cp-hue"
            value={color.h}
            max={360}
            step={1}
            bigStep={10}
            valueText={`${Math.round(color.h)} ${t.degrees}`}
            disabled={disabled}
            onChange={(h) => update({ ...color, h: h >= 360 ? 359.9 : h })}
          />
          {showAlpha && (
            <ColorSlider
              label={t.opacity}
              className="gooseui-cp-alpha"
              value={color.alpha}
              max={1}
              step={0.01}
              bigStep={0.1}
              valueText={`${Math.round(color.alpha * 100)}%`}
              disabled={disabled}
              onChange={(alpha) => update({ ...color, alpha })}
            />
          )}
        </div>
      </div>

      <label htmlFor={inputId} className="sr-only">
        {t.input}
      </label>
      <input
        id={inputId}
        value={draft ?? current}
        spellCheck={false}
        autoComplete="off"
        disabled={disabled}
        aria-invalid={draftInvalid || undefined}
        data-slot="color-picker-input"
        className={cn(
          "flex h-8 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 font-mono text-xs shadow-xs transition-[color,box-shadow] outline-none select-text dark:bg-input/30",
          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/30",
        )}
        onChange={(event) => {
          setDraft(event.target.value)
          applyText(event.target.value, true)
        }}
        onBlur={() => setDraft(null)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && draft !== null && applyText(draft, true))
            setDraft(null)
          if (event.key === "Escape" && draft !== null) {
            event.preventDefault()
            setDraft(null)
          }
        }}
      />

      {!inSrgb && (
        <div
          data-slot="color-picker-gamut"
          className="flex items-center gap-2 text-xs"
          aria-live="polite"
        >
          {inP3 ? (
            <>
              <span
                title={t.p3}
                className="gooseui-cp-p3 gooseui-cp-badge inline-flex items-center rounded-full border px-1.5 text-[0.6875rem] font-medium"
              >
                P3
              </span>
              <span className="gooseui-cp-p3 text-muted-foreground">
                {t.widerThanSrgb}
              </span>
              <span className="gooseui-cp-no-p3 gooseui-cp-warn flex items-center gap-1">
                <WarningIcon className="size-3.5" />
                {t.outsideSrgb}
              </span>
            </>
          ) : (
            <span className="gooseui-cp-warn flex items-center gap-1">
              <WarningIcon className="size-3.5" />
              {t.outsideSrgbAndP3}
            </span>
          )}
          <button
            type="button"
            className={cn(
              "ml-auto h-6 cursor-pointer rounded-md px-2 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              focusRing,
            )}
            onClick={() => update(toSrgbGamut(color))}
          >
            {t.fitToSrgb}
          </button>
        </div>
      )}

      {swatches && swatches.length > 0 && (
        <div
          role="group"
          aria-label={t.swatches}
          data-slot="color-picker-swatches"
          className="flex flex-wrap gap-1.5"
        >
          {swatches.map((swatch) => {
            const parsed = parseColor(swatch)
            if (!parsed) return null
            const selected = formatHex({ ...parsed, alpha: 1 }) === currentHex
            return (
              <button
                key={swatch}
                type="button"
                title={swatch}
                aria-label={swatch}
                aria-pressed={selected}
                disabled={disabled}
                className={cn(
                  "size-6 cursor-pointer rounded-md shadow-[inset_0_0_0_1px_rgb(0_0_0/0.12)] transition-transform hover:scale-110 motion-reduce:transition-none motion-reduce:hover:scale-100",
                  "aria-pressed:ring-2 aria-pressed:ring-foreground aria-pressed:ring-offset-2 aria-pressed:ring-offset-background",
                  focusRing,
                )}
                style={{ background: swatch }}
                onClick={() =>
                  update({
                    ...parsed,
                    h: parsed.c < 5e-4 ? color.h : parsed.h,
                    alpha: color.alpha,
                  })
                }
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
