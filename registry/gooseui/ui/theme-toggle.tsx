"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/gooseui/ui/button"

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const

interface IconState {
  className?: string
  animate: boolean
  visible: boolean
  pending: boolean
  rotate: string
}

function Sun({ className, animate, visible, pending, rotate }: IconState) {
  return (
    <svg
      className={cn("gooseui-theme-toggle-icon", className)}
      data-icon="sun"
      data-animate={animate}
      data-visible={visible}
      data-pending={pending || undefined}
      style={{ "--gooseui-tt-rotate": rotate } as React.CSSProperties}
      {...iconProps}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function Moon({ className, animate, visible, pending, rotate }: IconState) {
  return (
    <svg
      className={cn("gooseui-theme-toggle-icon", className)}
      data-icon="moon"
      data-animate={animate}
      data-visible={visible}
      data-pending={pending || undefined}
      style={{ "--gooseui-tt-rotate": rotate } as React.CSSProperties}
      {...iconProps}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}

// Keyframes вместо transition: next-themes (disableTransitionOnChange)
// вставляет `* { transition: none !important }`, animation он не глушит.
// Анимируем свойства rotate/scale (Tailwind v4), чтобы конечный кадр
// совпадал со статичными классами.
const styles = `
@keyframes gooseui-theme-toggle-in {
  from { rotate: var(--gooseui-tt-rotate); scale: 0; opacity: 0; }
  to { rotate: 0deg; scale: 1; opacity: 1; }
}
@keyframes gooseui-theme-toggle-out {
  from { rotate: 0deg; scale: 1; opacity: 1; }
  to { rotate: var(--gooseui-tt-rotate); scale: 0; opacity: 0; }
}
.gooseui-theme-toggle-icon[data-animate="true"][data-visible="true"] {
  animation: gooseui-theme-toggle-in 300ms ease both;
}
.gooseui-theme-toggle-icon[data-animate="true"][data-visible="false"] {
  animation: gooseui-theme-toggle-out 300ms ease both;
}
/* theme не передан (до монтирования): иконка следует классу .dark на предке */
.gooseui-theme-toggle-icon[data-pending][data-icon="moon"] { display: none; }
.dark .gooseui-theme-toggle-icon[data-pending][data-icon="moon"] { display: block; }
.dark .gooseui-theme-toggle-icon[data-pending][data-icon="sun"] { display: none; }
@media (prefers-reduced-motion: reduce) {
  .gooseui-theme-toggle-icon { animation: none !important; }
}
`

type Theme = "light" | "dark"
interface ThemeToggleProps
  extends Omit<React.ComponentProps<typeof Button>, "onChange" | "size"> {
  /** Можно не передавать до монтирования: иконка берётся из класса .dark. */
  theme?: Theme
  onThemeChange: (theme: Theme) => void
  size?: number
}

function ThemeToggle({
  theme,
  onThemeChange,
  size = 24,
  className,
  onClick,
  ...props
}: ThemeToggleProps) {
  const pending = theme === undefined
  const dark = theme === "dark"
  // Анимация только после клика пользователя: первый рендер и
  // переход undefined -> реальная тема остаются статичными.
  const [animate, setAnimate] = React.useState(false)
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn("cursor-pointer text-muted-foreground", className)}
      aria-label={
        pending
          ? "Toggle theme"
          : dark
            ? "Switch to light mode"
            : "Switch to dark mode"
      }
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        setAnimate(true)
        const isDark = pending
          ? document.documentElement.classList.contains("dark")
          : dark
        onThemeChange(isDark ? "light" : "dark")
      }}
      {...props}
    >
      <style href="gooseui-theme-toggle" precedence="default">
        {styles}
      </style>
      <span
        className="relative block shrink-0"
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        <Sun
          animate={animate}
          visible={!dark}
          pending={pending}
          rotate="90deg"
          className={cn(
            "absolute inset-0 size-full",
            !pending &&
              (dark
                ? "rotate-90 scale-0 opacity-0"
                : "rotate-0 scale-100 opacity-100"),
          )}
        />
        <Moon
          animate={animate}
          visible={dark}
          pending={pending}
          rotate="-90deg"
          className={cn(
            "absolute inset-0 size-full",
            !pending &&
              (dark
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-90 scale-0 opacity-0"),
          )}
        />
      </span>
    </Button>
  )
}

export { ThemeToggle, type ThemeToggleProps }
