"use client"

import * as React from "react"
import { Check, Moon, Palette, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const colors = [
  { name: "zinc", class: "bg-zinc-900 dark:bg-zinc-50" },
  { name: "red", class: "bg-red-500" },
  { name: "orange", class: "bg-orange-500" },
  { name: "green", class: "bg-green-500" },
  { name: "blue", class: "bg-blue-500" },
  { name: "violet", class: "bg-violet-500" },
  { name: "pink", class: "bg-pink-500" },
]

export function FloatingNav() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [showColors, setShowColors] = React.useState(false)
  const [activeColor, setActiveColor] = React.useState("zinc")

  React.useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("theme-color")
    if (saved) setActiveColor(saved)
  }, [])

  const setColor = (colorName: string) => {
    setActiveColor(colorName)
    localStorage.setItem("theme-color", colorName)
    document.documentElement.setAttribute("data-theme-color", colorName)
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return (
      <nav
        aria-label="Floating Navigation"
        className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full border bg-background/70 p-1 shadow-lg backdrop-blur-xl"
      >
        <div className="size-9 animate-pulse rounded-full bg-muted" />
        <div className="size-9 animate-pulse rounded-full bg-muted" />
      </nav>
    )
  }

  return (
    <>
      <nav
        aria-label="Floating Navigation"
        className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full border bg-background/70 p-1 shadow-lg backdrop-blur-xl transition-all"
      >
        <button
          aria-label="Theme Switcher"
          className="flex size-9 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-accent"
          type="button"
          onClick={toggleTheme}
        >
          {resolvedTheme === "dark" ? (
            <Sun className="size-5" aria-hidden="true" />
          ) : (
            <Moon className="size-5" aria-hidden="true" />
          )}
        </button>
        <button
          aria-label="Color Picker"
          className={cn(
            "flex size-9 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-accent",
            showColors && "bg-accent"
          )}
          type="button"
          onClick={() => setShowColors(!showColors)}
        >
          <Palette className="size-5" aria-hidden="true" />
        </button>
      </nav>

      {showColors && (
        <div className="fixed bottom-20 left-1/2 z-50 flex -translate-x-1/2 gap-2 rounded-full border bg-background/70 px-3 py-2 shadow-lg backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2">
          {colors.map((c) => (
            <button
              key={c.name}
              onClick={() => setColor(c.name)}
              className={cn(
                "relative size-7 rounded-full transition-transform hover:scale-110",
                c.class
              )}
            >
              {activeColor === c.name && (
                <Check className="absolute inset-0 m-auto size-4 text-white dark:text-black" />
              )}
              <span className="sr-only">{c.name}</span>
            </button>
          ))}
        </div>
      )}
    </>
  )
}
