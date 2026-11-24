"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type RotaryDialLabels = {
  /** Accessible name of the dial */
  label?: string
  /** Text announced for the current value */
  valueText?: (item: string, index: number) => string
}

export type RotaryDialProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue" | "children"
> & {
  /** Items on the rotating ring, in clockwise order */
  items: readonly string[]
  /** Index of the item under the pointer (controlled) */
  value?: number
  /** Initial index when uncontrolled */
  defaultValue?: number
  onValueChange?: (index: number) => void
  /** Fixed outer ring, read against the rotating ring under the pointer */
  outerItems?: readonly string[]
  /** Rendered size in px */
  size?: number
  /** Content in the hub. Shows the current item by default */
  renderCenter?: (item: string, index: number) => React.ReactNode
  /** Items per PageUp / PageDown */
  pageStep?: number
  disabled?: boolean
  labels?: RotaryDialLabels
  ref?: React.Ref<HTMLDivElement>
}

const VIEW = 200
const C = VIEW / 2
const WHEEL_STEP = 40

/**
 * Damped spring, about 8% overshoot and one swing back. Tune it from outside:
 * --rotary-dial-easing and --rotary-dial-duration on the dial or any ancestor
 */
const STYLES = `
.goose-rotary-dial-motion {
  transition-property: transform, fill;
  transition-duration: var(--rotary-dial-duration, 520ms);
  transition-timing-function: var(--rotary-dial-easing, cubic-bezier(0.34, 1.56, 0.64, 1));
}
@supports (transition-timing-function: linear(0, 1)) {
  .goose-rotary-dial-motion {
    transition-timing-function: var(--rotary-dial-easing, linear(0, 0.024, 0.086, 0.175, 0.279, 0.39, 0.5, 0.606, 0.703, 0.789, 0.864, 0.925, 0.975, 1.013, 1.041, 1.061, 1.072, 1.077, 1.078, 1.075, 1.069, 1.061, 1.053, 1.044, 1.036, 1.028, 1.02, 1.014, 1.009, 1.004, 1.001, 0.998, 0.996, 0.995, 0.994, 0.994, 0.994, 0.994, 0.995, 0.995, 0.996, 0.997, 0.997, 0.998, 1));
  }
}
.goose-rotary-dial-motion[data-dragging] { transition-property: fill; }
@media (prefers-reduced-motion: reduce) {
  .goose-rotary-dial-motion {
    transition-duration: 120ms;
    transition-timing-function: ease-out;
  }
}
`

const round = (n: number) => Math.round(n * 1000) / 1000
const mod = (n: number, m: number) => ((n % m) + m) % m

function polar(radius: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return {
    x: round(C + radius * Math.cos(rad)),
    y: round(C + radius * Math.sin(rad)),
  }
}

/** Font size in viewBox units that fits `count` labels of `chars` length */
function fitFont(radius: number, count: number, chars: number) {
  const slot = (2 * Math.PI * radius) / Math.max(count, 1)
  return round(
    Math.max(5, Math.min(15, (slot * 0.75) / Math.max(1, chars * 0.62))),
  )
}

/** Same angle as `target` (mod 360) but closest to `from`, so the ring never spins the long way */
function nearestTurn(from: number, target: number) {
  return target + Math.round((from - target) / 360) * 360
}

function Ring({
  items,
  radius,
  activeIndex,
  className,
}: {
  items: readonly string[]
  radius: number
  activeIndex: number
  className?: string
}) {
  const step = 360 / Math.max(items.length, 1)
  const longest = items.reduce((max, item) => Math.max(max, item.length), 1)
  const fontSize = fitFont(radius, items.length, longest)
  return (
    <g className={className}>
      {items.map((item, index) => {
        const angle = round(index * step)
        const { x, y } = polar(radius, angle)
        return (
          <text
            key={index}
            x={x}
            y={y}
            transform={`rotate(${angle} ${x} ${y})`}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={fontSize}
            className={cn(
              "goose-rotary-dial-motion select-none font-mono",
              index === activeIndex
                ? "fill-foreground font-bold"
                : "fill-muted-foreground",
            )}
          >
            {item}
          </text>
        )
      })}
    </g>
  )
}

export function RotaryDial({
  items,
  value: valueProp,
  defaultValue = 0,
  onValueChange,
  outerItems,
  size = 260,
  renderCenter,
  pageStep = 5,
  disabled = false,
  labels,
  className,
  style,
  ref,
  onKeyDown,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  ...rest
}: RotaryDialProps) {
  const count = items.length
  const step = 360 / Math.max(count, 1)
  const [internal, setInternal] = React.useState(defaultValue)
  const current = count > 0 ? mod(Math.round(valueProp ?? internal), count) : 0

  // Continuous ring angle in degrees; the item at angle 0 sits under the pointer
  const [rotation, setRotationState] = React.useState(() => -current * step)
  const rotationRef = React.useRef(rotation)
  const setRotation = React.useCallback((next: number) => {
    rotationRef.current = next
    setRotationState(next)
  }, [])
  const [dragging, setDragging] = React.useState(false)
  const rootRef = React.useRef<HTMLDivElement | null>(null)
  const drag = React.useRef<{ pointer: number; last: number } | null>(null)
  const wheelAcc = React.useRef(0)
  const latest = React.useRef({
    current,
    count,
    valueProp,
    onValueChange,
    disabled,
  })
  latest.current = { current, count, valueProp, onValueChange, disabled }

  const commit = React.useCallback((next: number) => {
    const {
      current: now,
      count: n,
      valueProp: controlled,
      onValueChange: cb,
    } = latest.current
    if (n === 0) return
    const index = mod(next, n)
    if (index === now) return
    // Guard against repeated calls before the next render
    latest.current.current = index
    if (controlled === undefined) setInternal(index)
    cb?.(index)
  }, [])

  // Follow value changes that did not come from dragging. Also runs when a drag
  // ends, so a controlled value that ignored the drag pulls the ring back
  React.useEffect(() => {
    if (dragging || drag.current) return
    setRotation(nearestTurn(rotationRef.current, -current * step))
  }, [current, step, setRotation, dragging])

  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    },
    [ref],
  )

  // Native listener: React's onWheel is passive and cannot stop page scroll
  React.useEffect(() => {
    const node = rootRef.current
    if (!node) return
    const handle = (event: WheelEvent) => {
      if (latest.current.disabled || latest.current.count === 0) return
      event.preventDefault()
      wheelAcc.current +=
        Math.abs(event.deltaY) > Math.abs(event.deltaX)
          ? event.deltaY
          : event.deltaX
      const steps = Math.trunc(wheelAcc.current / WHEEL_STEP)
      if (steps !== 0) {
        wheelAcc.current -= steps * WHEEL_STEP
        commit(latest.current.current + steps)
      }
    }
    node.addEventListener("wheel", handle, { passive: false })
    return () => node.removeEventListener("wheel", handle)
  }, [commit])

  const pointerAngle = (event: React.PointerEvent) => {
    const rect = rootRef.current?.getBoundingClientRect()
    if (!rect) return 0
    const dx = event.clientX - (rect.left + rect.width / 2)
    const dy = event.clientY - (rect.top + rect.height / 2)
    return (Math.atan2(dy, dx) * 180) / Math.PI
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    onPointerDown?.(event)
    if (event.defaultPrevented || disabled || count === 0 || event.button !== 0)
      return
    event.currentTarget.setPointerCapture(event.pointerId)
    drag.current = { pointer: event.pointerId, last: pointerAngle(event) }
    setDragging(true)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(event)
    if (event.defaultPrevented) return
    const state = drag.current
    if (!state || state.pointer !== event.pointerId) return
    // atan2 jumps at ±180°, so accumulate deltas instead of absolute angles
    const angle = pointerAngle(event)
    let delta = angle - state.last
    if (delta > 180) delta -= 360
    if (delta < -180) delta += 360
    state.last = angle
    const next = rotationRef.current + delta
    setRotation(next)
    commit(Math.round(-next / step))
  }

  // Always runs, so a user handler cannot leave the drag stuck
  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = drag.current
    if (!state || state.pointer !== event.pointerId) return
    drag.current = null
    setDragging(false)
    const snapped = Math.round(-rotationRef.current / step)
    setRotation(-snapped * step)
    commit(snapped)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event)
    if (event.defaultPrevented || disabled || count === 0) return
    const moves: Record<string, number> = {
      ArrowRight: 1,
      ArrowUp: 1,
      ArrowLeft: -1,
      ArrowDown: -1,
      PageUp: pageStep,
      PageDown: -pageStep,
    }
    let next: number | null = null
    if (event.key in moves) next = current + moves[event.key]
    else if (event.key === "Home") next = 0
    else if (event.key === "End") next = count - 1
    if (next === null) return
    event.preventDefault()
    commit(next)
  }

  const hasOuter = Boolean(outerItems && outerItems.length > 0)
  const innerEdge = hasOuter ? 74 : 97
  const innerText = hasOuter ? 62 : 82
  const hubRadius = hasOuter ? 46 : 62
  const item = items[current] ?? ""
  const valueText = labels?.valueText?.(item, current) ?? item

  return (
    <div
      ref={setRefs}
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-label={labels?.label ?? "Dial"}
      aria-valuemin={0}
      aria-valuemax={Math.max(count - 1, 0)}
      aria-valuenow={current}
      aria-valuetext={valueText}
      aria-disabled={disabled || undefined}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={(event) => {
        onPointerUp?.(event)
        endDrag(event)
      }}
      onPointerCancel={(event) => {
        onPointerCancel?.(event)
        endDrag(event)
      }}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative shrink-0 touch-none select-none rounded-full outline-none",
        "focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        disabled
          ? "cursor-not-allowed opacity-50"
          : dragging
            ? "cursor-grabbing"
            : "cursor-grab",
        className,
      )}
      style={{ width: size, height: size, ...style }}
      {...rest}
    >
      <style href="goose-rotary-dial" precedence="goose-ui">
        {STYLES}
      </style>
      <svg
        viewBox={`-8 -8 ${VIEW + 16} ${VIEW + 16}`}
        className="size-full overflow-visible"
        aria-hidden="true"
      >
        {hasOuter && outerItems && (
          <>
            <circle
              cx={C}
              cy={C}
              r={98}
              className="fill-muted/60 stroke-border"
              strokeWidth={1}
            />
            <Ring items={outerItems} radius={87} activeIndex={0} />
          </>
        )}
        <circle
          cx={C}
          cy={C}
          r={innerEdge}
          className="fill-card stroke-border"
          strokeWidth={1}
        />
        <g
          className="goose-rotary-dial-motion"
          data-dragging={dragging || undefined}
          style={{
            transform: `rotate(${round(rotation)}deg)`,
            transformOrigin: `${C}px ${C}px`,
          }}
        >
          <Ring items={items} radius={innerText} activeIndex={current} />
        </g>
        <circle
          cx={C}
          cy={C}
          r={hubRadius}
          className="fill-background stroke-border"
          strokeWidth={1}
        />
        <line
          x1={C}
          y1={C - (hasOuter ? 98 : innerEdge)}
          x2={C}
          y2={C - hubRadius}
          className="stroke-primary/40"
          strokeWidth={1}
          strokeDasharray="2 3"
        />
        <path
          d={`M ${C} ${C - (hasOuter ? 98 : innerEdge) + 2} l -6 -9 h 12 Z`}
          className="fill-primary"
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="flex min-w-0 flex-col items-center justify-center overflow-hidden text-center"
          style={{
            width: `${((hubRadius * 2 * 0.72) / (VIEW + 16)) * 100}%`,
            height: `${((hubRadius * 2 * 0.72) / (VIEW + 16)) * 100}%`,
          }}
        >
          {renderCenter ? (
            renderCenter(item, current)
          ) : (
            <span className="truncate font-mono text-3xl font-bold tabular-nums">
              {item}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
