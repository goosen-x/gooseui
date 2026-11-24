"use client"

import { Star } from "lucide-react"
import {
  type ComponentProps,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
  useRef,
  useState,
} from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/gooseui/ui/button"
import { SlidingNumber } from "@/registry/gooseui/ui/sliding-number"

export type TapCoinProps = Omit<
  ComponentProps<"button">,
  "children" | "value" | "onClick"
> & {
  /** Called on every tap with the added amount */
  onTap?: (value: number) => void
  /** Amount added per tap, shown as "+N" */
  value?: number
  /** Coin face content */
  children?: ReactNode
  /** Coin diameter in px */
  size?: number
  /** Max tilt angle in degrees */
  maxTilt?: number
  formatValue?: (value: number) => string
  disabled?: boolean
}

type Float = { id: number; x: number; y: number; text: string }

const MAX_FLOATS = 24

const STYLES = `
@keyframes gooseui-tap-coin-float {
  0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
  15% { opacity: 1; transform: translate(-50%, -80%) scale(1.05); }
  100% { opacity: 0; transform: translate(-50%, -260%) scale(1); }
}
@keyframes gooseui-tap-coin-fade {
  0%, 100% { opacity: 0; }
  20%, 70% { opacity: 1; }
}
.gooseui-tap-coin-float {
  animation: gooseui-tap-coin-float 0.9s ease-out forwards;
  transform: translate(-50%, -50%);
}
.gooseui-tap-coin-button {
  transform: rotateX(var(--tap-coin-tilt-x, 0deg)) rotateY(var(--tap-coin-tilt-y, 0deg)) scale(var(--tap-coin-scale, 1));
  transform-style: preserve-3d;
  transition: transform 150ms ease-out;
}
@media (prefers-reduced-motion: reduce) {
  .gooseui-tap-coin-float { animation-name: gooseui-tap-coin-fade; }
  .gooseui-tap-coin-button { transform: none; }
}
`

export function TapCoin({
  onTap,
  value = 1,
  children,
  size = 200,
  maxTilt = 16,
  formatValue = (v) => `+${v}`,
  disabled = false,
  className,
  style,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  onLostPointerCapture,
  "aria-label": ariaLabel = "Tap",
  ...props
}: TapCoinProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const pointers = useRef(new Set<number>())
  const nextId = useRef(0)
  const [floats, setFloats] = useState<Float[]>([])
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [pressed, setPressed] = useState(false)

  const emit = (x: number, y: number) => {
    onTap?.(value)
    const id = nextId.current++
    setFloats((list) =>
      [...list, { id, x, y, text: formatValue(value) }].slice(-MAX_FLOATS),
    )
  }

  const release = (pointerId: number) => {
    pointers.current.delete(pointerId)
    if (pointers.current.size === 0) {
      setPressed(false)
      setTilt({ x: 0, y: 0 })
    }
  }

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    onPointerDown?.(event)
    if (disabled || event.button !== 0) return
    event.currentTarget.setPointerCapture(event.pointerId)
    pointers.current.add(event.pointerId)
    const rect = wrapperRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    setPressed(true)
    // Tilt toward the pressed point; reduced motion turns it off in CSS
    const dx = (x / rect.width - 0.5) * 2
    const dy = (y / rect.height - 0.5) * 2
    setTilt({ x: -dy * maxTilt, y: dx * maxTilt })
    emit(x, y)
  }

  return (
    <div
      ref={wrapperRef}
      className={cn("relative inline-block shrink-0", className)}
      style={{ width: size, height: size, perspective: size * 4, ...style }}
    >
      <style href="gooseui-tap-coin" precedence="default">
        {STYLES}
      </style>
      <button
        type="button"
        aria-label={ariaLabel}
        disabled={disabled}
        onPointerDown={handlePointerDown}
        onPointerUp={(e) => {
          onPointerUp?.(e)
          release(e.pointerId)
        }}
        onPointerCancel={(e) => {
          onPointerCancel?.(e)
          release(e.pointerId)
        }}
        onLostPointerCapture={(e) => {
          onLostPointerCapture?.(e)
          release(e.pointerId)
        }}
        onClick={(e) => {
          // Pointer taps are handled on pointerdown; keyboard clicks have detail 0
          if (e.detail !== 0 || disabled) return
          emit(size / 2, size / 2)
        }}
        className="gooseui-tap-coin-button group/coin relative block size-full cursor-pointer touch-manipulation rounded-full outline-none select-none [-webkit-tap-highlight-color:transparent] focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-offset-4 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
        style={
          {
            "--tap-coin-tilt-x": `${tilt.x}deg`,
            "--tap-coin-tilt-y": `${tilt.y}deg`,
            "--tap-coin-scale": pressed ? 0.96 : 1,
          } as CSSProperties
        }
        {...props}
      >
        {/* Reeded edge */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[3%] rounded-full"
          style={{
            background:
              "repeating-conic-gradient(from 0deg, color-mix(in oklch, var(--tap-coin-face, var(--primary)) 85%, white) 0deg 2deg, color-mix(in oklch, var(--tap-coin-face, var(--primary)) 60%, black) 2deg 4deg)",
            transform: `translateZ(${-size * 0.03}px)`,
          }}
        />
        {/* Face */}
        <span
          className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full font-bold"
          style={
            {
              color: "var(--tap-coin-fg, var(--primary-foreground))",
              fontSize: size * 0.28,
              background:
                "radial-gradient(circle at 35% 30%, color-mix(in oklch, var(--tap-coin-face, var(--primary)) 75%, white), var(--tap-coin-face, var(--primary)) 55%, color-mix(in oklch, var(--tap-coin-face, var(--primary)) 70%, black))",
              boxShadow:
                "inset 0 0 0 calc(var(--coin-size) * 0.045) color-mix(in oklch, var(--tap-coin-face, var(--primary)) 80%, black), inset 0 0 0 calc(var(--coin-size) * 0.06) color-mix(in oklch, var(--tap-coin-face, var(--primary)) 70%, white)",
              "--coin-size": `${size}px`,
            } as CSSProperties
          }
        >
          {children}
          {/* Shine */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at 30% 25%, rgb(255 255 255 / 0.35), transparent 45%)",
            }}
          />
        </span>
      </button>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-visible"
      >
        {floats.map((f) => (
          <span
            key={f.id}
            className="gooseui-tap-coin-float absolute font-bold whitespace-nowrap text-foreground [text-shadow:0_1px_2px_var(--background)]"
            style={{ left: f.x, top: f.y, fontSize: Math.max(16, size * 0.11) }}
            onAnimationEnd={() =>
              setFloats((list) => list.filter((item) => item.id !== f.id))
            }
          >
            {f.text}
          </span>
        ))}
      </span>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* TapToEarn: a finished tap-to-earn screen built around the coin.            */
/* -------------------------------------------------------------------------- */

export interface TapToEarnLabels {
  balance: string
  tap: string
  energy: string
  refill: string
}

export interface TapToEarnProps {
  /** Starting balance */
  initialScore?: number
  /** Points added per tap */
  value?: number
  /** Energy capacity; every tap spends one unit */
  maxEnergy?: number
  /** Coin diameter in px */
  coinSize?: number
  /** Coin face content, a star by default */
  children?: ReactNode
  /** Texts of the screen, English by default */
  labels?: Partial<TapToEarnLabels>
  /** Called after every tap with the new balance */
  onScoreChange?: (score: number) => void
  className?: string
}

const DEFAULT_LABELS: TapToEarnLabels = {
  balance: "Balance",
  tap: "Tap the coin",
  energy: "Energy",
  refill: "Refill",
}

export function TapToEarn({
  initialScore = 0,
  value = 1,
  maxEnergy = 20,
  coinSize = 200,
  children,
  labels,
  onScoreChange,
  className,
}: TapToEarnProps) {
  const t = { ...DEFAULT_LABELS, ...labels }
  const [score, setScore] = useState(initialScore)
  const [energy, setEnergy] = useState(maxEnergy)

  const handleTap = (amount: number) => {
    const next = score + amount
    setScore(next)
    setEnergy((e) => Math.max(0, e - 1))
    onScoreChange?.(next)
  }

  return (
    <div
      className={cn(
        "mx-auto flex w-72 max-w-full flex-col items-center gap-8",
        className,
      )}
    >
      <div className="text-center">
        <div className="text-xs tracking-wide text-muted-foreground uppercase">
          {t.balance}
        </div>
        <div className="text-4xl font-bold tabular-nums">
          <SlidingNumber value={score} />
        </div>
      </div>

      <TapCoin
        size={coinSize}
        value={value}
        disabled={energy === 0}
        aria-label={t.tap}
        onTap={handleTap}
      >
        {children ?? <Star className="size-1/3 fill-current" />}
      </TapCoin>

      <div className="w-full space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{t.energy}</span>
          <span className="tabular-nums">
            {energy} / {maxEnergy}
          </span>
        </div>
        <div
          role="progressbar"
          aria-label={t.energy}
          aria-valuemin={0}
          aria-valuemax={maxEnergy}
          aria-valuenow={energy}
          className="h-2 overflow-hidden rounded-full bg-muted"
        >
          <div
            className="h-full rounded-full bg-primary transition-[width]"
            style={{ width: `${(energy / maxEnergy) * 100}%` }}
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full cursor-pointer"
          disabled={energy === maxEnergy}
          onClick={() => setEnergy(maxEnergy)}
        >
          {t.refill}
        </Button>
      </div>
    </div>
  )
}
