"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function FloatingNav() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <nav
      aria-label="Floating Navigation"
      className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center justify-center gap-1 whitespace-nowrap rounded-full border bg-background/70 px-1 py-1 text-foreground shadow-lg backdrop-blur-xl transition-all"
    >
      <button
        aria-label="Theme Switcher"
        className="flex size-9 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-accent"
        type="button"
        onClick={toggleTheme}
      >
        {mounted ? (
          resolvedTheme === "dark" ? (
            <Sun className="size-5" aria-hidden="true" />
          ) : (
            <Moon className="size-5" aria-hidden="true" />
          )
        ) : (
          <div className="size-5" />
        )}
      </button>
    </nav>
  )
}
