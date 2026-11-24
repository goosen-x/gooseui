"use client"

import { useTheme } from "next-themes"
import {
  type ComponentProps,
  type MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react"
import { flushSync } from "react-dom"
import { cn } from "@/lib/utils"

function Sun({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}

function Moon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}

export type ThemeTransitionVariant = "fade" | "scale" | "slide" | "circle"

export type ThemeTransitionOptions = {
  variant?: ThemeTransitionVariant
  /** Transition duration in ms. */
  duration?: number
  /** CSS easing function. */
  easing?: string
}

/** Viewport point the circle grows from. */
export type ThemeTransitionOrigin = { x: number; y: number }

const STYLE_ATTR = "data-gooseui-theme-transition"

function buildCss(
  variant: ThemeTransitionVariant,
  duration: number,
  easing: string,
  origin: ThemeTransitionOrigin,
) {
  const timing = `${duration}ms ${easing} both`
  const base = `::view-transition-old(root),::view-transition-new(root){animation:none;mix-blend-mode:normal;}`

  switch (variant) {
    case "fade":
      return `::view-transition-old(root),::view-transition-new(root){animation-duration:${duration}ms;animation-timing-function:${easing};}`
    case "scale":
      return `${base}
@keyframes gooseui-tt-scale{from{opacity:0;transform:scale(1.06)}to{opacity:1;transform:scale(1)}}
::view-transition-new(root){animation:gooseui-tt-scale ${timing};}`
    case "slide":
      return `${base}
@keyframes gooseui-tt-slide{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0 0 0 0)}}
::view-transition-new(root){animation:gooseui-tt-slide ${timing};}`
    case "circle": {
      const { x, y } = origin
      const r = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      )
      return `${base}
@keyframes gooseui-tt-circle{from{clip-path:circle(0px at ${x}px ${y}px)}to{clip-path:circle(${Math.ceil(r)}px at ${x}px ${y}px)}}
::view-transition-new(root){animation:gooseui-tt-circle ${timing};}`
    }
  }
}

function canAnimate() {
  return (
    typeof document !== "undefined" &&
    "startViewTransition" in document &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}

/** `useTheme` from next-themes with a View Transition around every theme change. */
export function useThemeTransition({
  variant = "circle",
  duration = 500,
  easing = "ease-in-out",
}: ThemeTransitionOptions = {}) {
  const themeState = useTheme()
  const { setTheme: applyTheme, resolvedTheme } = themeState

  const setTheme = useCallback(
    (theme: string, origin?: ThemeTransitionOrigin) => {
      if (!canAnimate()) {
        applyTheme(theme)
        return
      }
      const point = origin ?? {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      }
      const style = document.createElement("style")
      style.setAttribute(STYLE_ATTR, "")
      style.textContent = buildCss(variant, duration, easing, point)
      document.head.appendChild(style)

      const transition = document.startViewTransition(() => {
        // Commit the theme class synchronously so the new snapshot sees it
        flushSync(() => applyTheme(theme))
      })
      transition.finished.finally(() => style.remove()).catch(() => {})
    },
    [applyTheme, variant, duration, easing],
  )

  const toggleTheme = useCallback(
    (origin?: ThemeTransitionOrigin) => {
      setTheme(resolvedTheme === "dark" ? "light" : "dark", origin)
    },
    [resolvedTheme, setTheme],
  )

  return { ...themeState, setTheme, toggleTheme }
}

/** Click point, or the element center for keyboard activation. */
export function getTransitionOrigin(
  event: MouseEvent<HTMLElement>,
): ThemeTransitionOrigin {
  if (event.detail > 0) return { x: event.clientX, y: event.clientY }
  const rect = event.currentTarget.getBoundingClientRect()
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
}

export type ThemeTransitionToggleProps = Omit<
  ComponentProps<"button">,
  "children"
> &
  ThemeTransitionOptions & {
    labels?: { toLight?: string; toDark?: string }
  }

export function ThemeTransitionToggle({
  variant,
  duration,
  easing,
  labels,
  className,
  onClick,
  ...props
}: ThemeTransitionToggleProps) {
  const { resolvedTheme, toggleTheme } = useThemeTransition({
    variant,
    duration,
    easing,
  })
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === "dark"
  const label = isDark
    ? (labels?.toLight ?? "Switch to light theme")
    : (labels?.toDark ?? "Switch to dark theme")

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={!mounted}
      className={cn(
        "inline-flex size-9 cursor-pointer items-center justify-center rounded-md border bg-background text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-default disabled:opacity-60",
        className,
      )}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) toggleTheme(getTransitionOrigin(event))
      }}
      {...props}
    >
      {isDark ? (
        <Sun className="size-4" aria-hidden="true" />
      ) : (
        <Moon className="size-4" aria-hidden="true" />
      )}
    </button>
  )
}
