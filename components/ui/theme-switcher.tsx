"use client"

import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Theme = "light" | "dark" | "system"

const themes: Theme[] = ["light", "dark", "system"]

const themeIcons: Record<Theme, React.ElementType> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
}

interface ThemeSwitcherProps extends React.ComponentProps<typeof Button> {
  /** Show label next to icon */
  showLabel?: boolean
}

function ThemeSwitcher({
  className,
  showLabel = false,
  ...props
}: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = (theme as Theme) || "system"
  const Icon = themeIcons[currentTheme]

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(currentTheme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size={showLabel ? "default" : "icon"}
        className={cn("relative overflow-hidden", className)}
        disabled
        {...props}
      >
        <span className="size-4 animate-pulse rounded bg-muted" />
        {showLabel && (
          <span className="ml-2 w-12 h-4 animate-pulse rounded bg-muted" />
        )}
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size={showLabel ? "default" : "icon"}
      onClick={cycleTheme}
      className={cn("relative overflow-hidden", className)}
      aria-label={`Current theme: ${currentTheme}. Click to change.`}
      {...props}
    >
      <div className="relative size-4">
        {themes.map((t) => {
          const ThemeIcon = themeIcons[t]
          const isActive = t === currentTheme
          return (
            <ThemeIcon
              key={t}
              className={cn(
                "absolute inset-0 size-4 transition-all duration-300",
                isActive
                  ? "rotate-0 scale-100 opacity-100"
                  : "rotate-90 scale-0 opacity-0",
              )}
            />
          )
        })}
      </div>
      {showLabel && <span className="ml-2 capitalize">{currentTheme}</span>}
    </Button>
  )
}

export { ThemeSwitcher, type ThemeSwitcherProps }
