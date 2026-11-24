"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Native <dialog>: the browser gives focus trapping, Esc and the top layer.
// Entry and exit run on @starting-style + transition-behavior: allow-discrete.
// JavaScript only fetches the star count, opens on a timer and remembers
// the choice in localStorage.
const css = `
.gooseui-gsd {
  opacity: 0;
  scale: 0.95;
  transition:
    opacity 0.2s ease-out,
    scale 0.2s ease-out,
    overlay 0.2s allow-discrete,
    display 0.2s allow-discrete;
}
.gooseui-gsd[open] {
  opacity: 1;
  scale: 1;
}
@starting-style {
  .gooseui-gsd[open] {
    opacity: 0;
    scale: 0.95;
  }
}
.gooseui-gsd::backdrop {
  background: rgb(0 0 0 / 0);
  backdrop-filter: blur(0);
  transition:
    background 0.2s,
    backdrop-filter 0.2s,
    overlay 0.2s allow-discrete,
    display 0.2s allow-discrete;
}
.gooseui-gsd[open]::backdrop {
  background: rgb(0 0 0 / 0.4);
  backdrop-filter: blur(2px);
}
@starting-style {
  .gooseui-gsd[open]::backdrop {
    background: rgb(0 0 0 / 0);
    backdrop-filter: blur(0);
  }
}
html:has(.gooseui-gsd[open]) {
  overflow: hidden;
}
.gooseui-gsd-sparkle {
  animation: gooseui-gsd-twinkle 3s ease-in-out infinite;
}
.gooseui-gsd-hero {
  animation: gooseui-gsd-pop 0.7s
    linear(0, 0.35 10%, 0.8 22%, 1.12 34%, 1.16 40%, 1.06 52%, 0.98 64%, 1.01 80%, 1) 0.1s both;
}
.gooseui-gsd-float {
  animation: gooseui-gsd-float 3s ease-in-out infinite;
}
.gooseui-gsd-fill,
.gooseui-gsd-marker {
  transition:
    width 1s cubic-bezier(0.22, 1, 0.36, 1) 0.2s,
    left 1s cubic-bezier(0.22, 1, 0.36, 1) 0.2s,
    scale 1s cubic-bezier(0.22, 1, 0.36, 1) 0.2s;
}
.gooseui-gsd-fill {
  width: var(--progress);
}
.gooseui-gsd-marker {
  left: var(--progress);
  scale: var(--marker);
}
@starting-style {
  .gooseui-gsd[open] .gooseui-gsd-fill {
    width: 0;
  }
  .gooseui-gsd[open] .gooseui-gsd-marker {
    left: 0;
    scale: 0;
  }
}
@keyframes gooseui-gsd-twinkle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.9; }
}
@keyframes gooseui-gsd-pop {
  from { opacity: 0; scale: 0.4; rotate: -30deg; }
  30% { opacity: 1; }
  to { opacity: 1; scale: 1; rotate: 0deg; }
}
@keyframes gooseui-gsd-float {
  0%, 100% { translate: 0 0; }
  50% { translate: 0 -4px; }
}
@media (prefers-reduced-motion: reduce) {
  .gooseui-gsd,
  .gooseui-gsd::backdrop,
  .gooseui-gsd-fill,
  .gooseui-gsd-marker {
    transition: none;
  }
  .gooseui-gsd-sparkle,
  .gooseui-gsd-hero,
  .gooseui-gsd-float {
    animation: none;
  }
}
`

// ============================================================================
// Icons
// ============================================================================

const STAR_PATH =
  "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"

function StarIcon({
  className,
  strokeWidth = 2,
}: {
  className?: string
  strokeWidth?: number
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={STAR_PATH} />
    </svg>
  )
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

// ============================================================================
// Night sky header
// ============================================================================

const CONSTELLATIONS: [number, number][][] = [
  [
    [36, 128],
    [62, 62],
    [118, 86],
  ],
  [
    [254, 112],
    [306, 62],
    [380, 118],
  ],
]

const SPARKLES: { x: number; y: number; r: number; delay: number }[] = [
  { x: 20, y: 40, r: 1, delay: 0 },
  { x: 92, y: 24, r: 1.6, delay: 1.2 },
  { x: 150, y: 132, r: 1.2, delay: 0.6 },
  { x: 176, y: 30, r: 0.9, delay: 2.1 },
  { x: 228, y: 22, r: 1.4, delay: 0.3 },
  { x: 236, y: 70, r: 1, delay: 1.7 },
  { x: 282, y: 140, r: 1.1, delay: 0.9 },
  { x: 342, y: 26, r: 1.5, delay: 2.4 },
  { x: 372, y: 82, r: 0.9, delay: 1.4 },
  { x: 388, y: 150, r: 1.2, delay: 0.2 },
  { x: 128, y: 150, r: 0.8, delay: 1.9 },
  { x: 10, y: 150, r: 1, delay: 2.7 },
]

function NightSky({ badge }: { badge?: React.ReactNode }) {
  return (
    <div className="relative h-40 overflow-hidden bg-[radial-gradient(ellipse_at_50%_40%,#2a2f5a_0%,#12152b_55%,#07080f_100%)]">
      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 400 160"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {CONSTELLATIONS.map((points) => (
          <g key={points.join()}>
            <polyline
              points={points.map((p) => p.join(",")).join(" ")}
              fill="none"
              stroke="white"
              strokeOpacity={0.3}
              strokeDasharray="2 3"
            />
            {points.map(([x, y]) => (
              <circle
                key={`${x}-${y}`}
                cx={x}
                cy={y}
                r={2.6}
                fill="white"
                style={{ filter: "drop-shadow(0 0 3px rgba(255,255,255,.9))" }}
              />
            ))}
          </g>
        ))}
        {SPARKLES.map((s) => (
          <circle
            key={`${s.x}-${s.y}`}
            className="gooseui-gsd-sparkle"
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="white"
            opacity={0.2}
            style={{ animationDelay: `${s.delay}s` }}
          />
        ))}
      </svg>

      <div className="gooseui-gsd-hero absolute top-7 left-[calc(50%-2rem)]">
        <div className="gooseui-gsd-float">
          <HeroStar />
        </div>
      </div>

      {badge && (
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/85 backdrop-blur-sm">
          {badge}
        </span>
      )}
    </div>
  )
}

function HeroStar() {
  const id = React.useId()
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-16"
      style={{
        filter:
          "drop-shadow(0 0 0.75rem rgba(250,204,21,.65)) drop-shadow(0 0 1.75rem rgba(250,204,21,.35))",
      }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff3a3" />
          <stop offset="45%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <path
        d="M11.48 2.5a.6.6 0 0 1 1.04 0l2.6 5.27 5.82.85a.6.6 0 0 1 .33 1.02l-4.21 4.1.99 5.8a.6.6 0 0 1-.87.63L12 17.43l-5.2 2.74a.6.6 0 0 1-.87-.63l.99-5.8-4.2-4.1a.6.6 0 0 1 .33-1.02l5.82-.85z"
        fill={`url(#${id}-fill)`}
        stroke="#fde68a"
        strokeWidth={0.6}
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ============================================================================
// Stars data
// ============================================================================

function useGitHubStars(owner: string, repo: string, initialStars?: number) {
  const [stars, setStars] = React.useState<number | null>(initialStars ?? null)
  const [isLoading, setIsLoading] = React.useState(initialStars === undefined)

  React.useEffect(() => {
    if (initialStars !== undefined) {
      setStars(initialStars)
      setIsLoading(false)
      return
    }
    const controller = new AbortController()
    fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { Accept: "application/vnd.github.v3+json" },
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setStars(data.stargazers_count ?? null)
      })
      .catch(() => {})
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false)
      })
    return () => controller.abort()
  }, [owner, repo, initialStars])

  return { stars, isLoading }
}

function readStorage(key?: string) {
  if (!key) return false
  try {
    return localStorage.getItem(key) !== null
  } catch {
    return false
  }
}

function writeStorage(key: string | undefined, value: string) {
  if (!key) return
  try {
    localStorage.setItem(key, value)
  } catch {
    // Storage unavailable (private mode, blocked cookies)
  }
}

// ============================================================================
// GitHubStarDialog
// ============================================================================

interface GitHubStarDialogProps {
  /** GitHub repository owner */
  owner: string
  /** GitHub repository name */
  repo: string
  /** Star goal shown in the title and progress bar */
  goal?: number
  /** Override fetched star count (SSR, tests, rate limits) */
  initialStars?: number
  /** Dialog title. Defaults to "Help us reach {goal} stars" */
  title?: React.ReactNode
  /** Text under the title */
  description?: React.ReactNode
  /** Pill text in the night sky header. Pass null to hide */
  badge?: React.ReactNode
  /** Secondary button text */
  dismissText?: React.ReactNode
  /** Primary button text */
  ctaText?: React.ReactNode
  /** Element that opens the dialog. Gets an onClick handler */
  trigger?: React.ReactElement<{
    onClick?: (event: React.MouseEvent<HTMLElement>) => void
  }>
  /** Controlled open state */
  open?: boolean
  /** Controlled open state handler */
  onOpenChange?: (open: boolean) => void
  /** Open automatically on mount */
  defaultOpen?: boolean
  /** Delay before auto open, ms */
  delay?: number
  /** localStorage key. Once dismissed or starred, the dialog stops auto opening */
  storageKey?: string
  /** Called when the user clicks the GitHub button */
  onStar?: () => void
  /** Additional classes for the dialog content */
  className?: string
}

function GitHubStarDialog({
  owner,
  repo,
  goal = 1000,
  initialStars,
  title,
  description = "If these components saved you time, a star on GitHub takes a second and helps other developers find the project.",
  badge = "Open source · Free forever",
  dismissText = "Maybe later",
  ctaText = "Star on GitHub",
  trigger,
  open: openProp,
  onOpenChange,
  defaultOpen = false,
  delay = 0,
  storageKey,
  onStar,
  className,
}: GitHubStarDialogProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null)
  const titleId = React.useId()
  const descriptionId = React.useId()
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : uncontrolledOpen
  const { stars, isLoading } = useGitHubStars(owner, repo, initialStars)

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange],
  )

  React.useEffect(() => {
    if (!defaultOpen || readStorage(storageKey)) return
    const timer = setTimeout(() => setOpen(true), delay)
    return () => clearTimeout(timer)
  }, [defaultOpen, delay, storageKey, setOpen])

  // Sync React state with the native dialog
  React.useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  // Esc, the close buttons and a backdrop click close the dialog natively.
  // If React still thinks it is open, the user dismissed it.
  const handleClose = () => {
    if (!open) return
    writeStorage(storageKey, "dismissed")
    setOpen(false)
  }

  const handleStar = () => {
    writeStorage(storageKey, "starred")
    onStar?.()
    setOpen(false)
  }

  const count = stars ?? 0
  const progress = Math.min(100, goal > 0 ? (count / goal) * 100 : 0)
  const remaining = Math.max(0, goal - count)
  const format = (n: number) => n.toLocaleString("en-US")

  const triggerElement = React.isValidElement(trigger)
    ? React.cloneElement(trigger, {
        onClick: (event: React.MouseEvent<HTMLElement>) => {
          trigger.props.onClick?.(event)
          if (!event.defaultPrevented) setOpen(true)
        },
      })
    : null

  return (
    <>
      <style href="gooseui-github-star-dialog" precedence="default">
        {css}
      </style>
      {triggerElement}
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onClose={handleClose}
        onClick={(event) => {
          // A click on the dialog element itself is a click on ::backdrop,
          // the content fills the box completely
          if (event.target === event.currentTarget) event.currentTarget.close()
        }}
        className={cn(
          "gooseui-gsd fixed inset-0 m-auto h-fit max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-3xl border bg-background p-0 text-foreground shadow-2xl outline-none",
          className,
        )}
      >
        <div className="relative">
          <NightSky badge={badge} />

          <form method="dialog">
            <button
              type="submit"
              className="absolute top-3 right-3 flex size-8 cursor-pointer items-center justify-center rounded-full border-2 border-white/60 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              aria-label="Close"
            >
              <CloseIcon className="size-4" />
            </button>
          </form>

          <div className="px-6 pt-6 pb-5 text-center">
            <h2 id={titleId} className="text-2xl font-bold tracking-tight">
              {title ?? (
                <>
                  Help us reach{" "}
                  <span className="text-amber-500">{format(goal)}</span> stars
                </>
              )}
            </h2>
            <p
              id={descriptionId}
              className="mt-2 text-sm text-pretty text-muted-foreground"
            >
              {description}
            </p>

            <div className="mt-5 text-left">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 font-semibold tabular-nums">
                  <StarIcon className="size-4 fill-amber-400 text-amber-400" />
                  {isLoading ? (
                    <span className="inline-block h-4 w-8 animate-pulse rounded bg-muted" />
                  ) : stars !== null ? (
                    format(stars)
                  ) : (
                    "—"
                  )}
                </span>
                {!isLoading && stars !== null && (
                  <span className="text-muted-foreground tabular-nums">
                    {remaining > 0
                      ? `${format(remaining)} to go`
                      : "Goal reached!"}
                  </span>
                )}
              </div>

              <div
                className="relative h-2.5 rounded-full bg-muted"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={goal}
                aria-valuenow={count}
                aria-label="Stars progress"
                style={
                  {
                    "--progress": `${isLoading ? 0 : progress}%`,
                    "--marker": isLoading ? 0 : 1,
                  } as React.CSSProperties
                }
              >
                <div className="gooseui-gsd-fill absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300" />
                <div className="gooseui-gsd-marker absolute top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <StarIcon
                    className="size-5 fill-amber-400 text-amber-500 drop-shadow-[0_0_0.25rem_rgba(251,191,36,0.7)]"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </div>
          </div>

          <form
            method="dialog"
            className="flex items-center justify-end gap-2 border-t bg-muted/40 px-6 py-4"
          >
            <button
              type="submit"
              className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              {dismissText}
            </button>
            <a
              href={`https://github.com/${owner}/${repo}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleStar}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-lg bg-foreground px-3 py-2 text-sm font-medium text-background transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <GitHubIcon className="size-4" />
              <StarIcon className="size-4 transition-colors group-hover:fill-amber-400 group-hover:text-amber-400" />
              {ctaText}
              {stars !== null && (
                <span className="rounded bg-background/15 px-1.5 py-0.5 text-xs tabular-nums">
                  {format(stars)}
                </span>
              )}
            </a>
          </form>
        </div>
      </dialog>
    </>
  )
}

export { GitHubStarDialog, type GitHubStarDialogProps }
