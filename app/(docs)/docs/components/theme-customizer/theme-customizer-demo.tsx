"use client"

import * as React from "react"
import { Moon, Sun, Palette, Check, Monitor, Paintbrush } from "lucide-react"
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

function useThemeColor() {
  const [activeColor, setActiveColor] = React.useState("zinc")
  const [mounted, setMounted] = React.useState(false)

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

  return { activeColor, setColor, mounted }
}

// Demo versions - inline, not fixed
function DemoPill() {
  const { setTheme, resolvedTheme } = useTheme()
  const { activeColor, setColor, mounted } = useThemeColor()
  const [showColors, setShowColors] = React.useState(false)

  if (!mounted) return <div className="h-11 w-24 animate-pulse rounded-full bg-muted" />

  return (
    <div className="relative inline-flex flex-col items-center gap-2">
      <div className="flex gap-1 rounded-full border bg-background/70 p-1 shadow-lg backdrop-blur-xl">
        <button
          className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-accent"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          {resolvedTheme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </button>
        <button
          className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-accent"
          onClick={() => setShowColors(!showColors)}
        >
          <Palette className="size-5" />
        </button>
      </div>
      {showColors && (
        <div className="flex gap-2 rounded-full border bg-background/70 px-3 py-2 shadow-lg backdrop-blur-xl">
          {colors.map((c) => (
            <button
              key={c.name}
              onClick={() => setColor(c.name)}
              className={cn("relative size-7 rounded-full transition-transform hover:scale-110", c.class)}
            >
              {activeColor === c.name && <Check className="absolute inset-0 m-auto size-4 text-white dark:text-black" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function DemoBar() {
  const { theme, setTheme } = useTheme()
  const { activeColor, setColor, mounted } = useThemeColor()

  if (!mounted) return <div className="h-12 w-80 animate-pulse rounded-full bg-muted" />

  return (
    <div className="inline-flex items-center gap-4 rounded-full border bg-background/70 px-4 py-2 shadow-lg backdrop-blur-xl">
      <div className="flex gap-1">
        {[
          { value: "light", icon: Sun },
          { value: "dark", icon: Moon },
          { value: "system", icon: Monitor },
        ].map(({ value, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={cn(
              "flex size-8 items-center justify-center rounded-md transition-colors",
              theme === value ? "bg-primary text-primary-foreground" : "hover:bg-accent"
            )}
          >
            <Icon className="size-4" />
          </button>
        ))}
      </div>
      <div className="h-6 w-px bg-border" />
      <div className="flex gap-1.5">
        {colors.map((c) => (
          <button
            key={c.name}
            onClick={() => setColor(c.name)}
            className={cn(
              "size-6 rounded-full transition-all hover:scale-110",
              c.class,
              activeColor === c.name && "ring-2 ring-ring ring-offset-2 ring-offset-background"
            )}
          />
        ))}
      </div>
    </div>
  )
}

function DemoSidebar() {
  const { setTheme, resolvedTheme } = useTheme()
  const { activeColor, setColor, mounted } = useThemeColor()

  if (!mounted) return <div className="h-80 w-12 animate-pulse rounded-2xl bg-muted" />

  return (
    <div className="inline-flex flex-col gap-2 rounded-2xl border bg-background/70 p-2 shadow-lg backdrop-blur-xl">
      <button
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-accent"
      >
        {resolvedTheme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </button>
      <div className="mx-auto h-px w-6 bg-border" />
      {colors.map((c) => (
        <button
          key={c.name}
          onClick={() => setColor(c.name)}
          className={cn("relative size-8 rounded-full transition-transform hover:scale-110", c.class)}
        >
          {activeColor === c.name && <Check className="absolute inset-0 m-auto size-4 text-white dark:text-black" />}
        </button>
      ))}
    </div>
  )
}

function DemoDock() {
  const { setTheme, resolvedTheme } = useTheme()
  const { activeColor, setColor, mounted } = useThemeColor()

  if (!mounted) return <div className="h-14 w-96 animate-pulse rounded-2xl bg-muted" />

  return (
    <div className="inline-flex gap-1 rounded-2xl border bg-background/80 p-1.5 shadow-2xl backdrop-blur-xl">
      <button
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        className="group flex size-10 items-center justify-center rounded-xl bg-muted/50 transition-all hover:-translate-y-1 hover:bg-accent"
      >
        {resolvedTheme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
      </button>
      <div className="mx-1 w-px bg-border" />
      {colors.map((c) => (
        <button
          key={c.name}
          onClick={() => setColor(c.name)}
          className={cn(
            "relative size-10 rounded-xl transition-all hover:-translate-y-1",
            c.class,
            activeColor === c.name && "ring-2 ring-primary ring-offset-2 ring-offset-background"
          )}
        >
          {activeColor === c.name && <Check className="absolute inset-0 m-auto size-5 text-white drop-shadow-md dark:text-black" />}
        </button>
      ))}
    </div>
  )
}

function DemoCorner() {
  const { setTheme, resolvedTheme } = useTheme()
  const { activeColor, setColor, mounted } = useThemeColor()
  const [expanded, setExpanded] = React.useState(false)

  if (!mounted) return <div className="size-12 animate-pulse rounded-full bg-muted" />

  return (
    <div className="inline-flex flex-col-reverse items-end gap-2">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex size-12 items-center justify-center rounded-full border bg-background shadow-lg transition-transform hover:scale-105"
      >
        <Paintbrush className={cn("size-5 transition-transform", expanded && "rotate-45")} />
      </button>
      {expanded && (
        <div className="flex flex-col gap-2 rounded-2xl border bg-background/90 p-2 shadow-lg backdrop-blur-xl">
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="flex size-10 items-center justify-center rounded-xl transition-colors hover:bg-accent"
          >
            {resolvedTheme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
          <div className="h-px bg-border" />
          {colors.map((c) => (
            <button
              key={c.name}
              onClick={() => setColor(c.name)}
              className={cn("relative size-10 rounded-xl transition-transform hover:scale-105", c.class)}
            >
              {activeColor === c.name && <Check className="absolute inset-0 m-auto size-5 text-white dark:text-black" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

type Variant = "pill" | "bar" | "sidebar" | "dock" | "corner"

const variants: { id: Variant; name: string; description: string }[] = [
  { id: "pill", name: "Pill", description: "Compact floating pill with popup color picker" },
  { id: "bar", name: "Bar", description: "Horizontal bar with all options visible" },
  { id: "sidebar", name: "Sidebar", description: "Vertical sidebar on the right edge" },
  { id: "dock", name: "Dock", description: "macOS-style dock at the bottom" },
  { id: "corner", name: "Corner", description: "Minimal expandable button in corner" },
]

export function ThemeCustomizerDemo() {
  const [active, setActive] = React.useState<Variant>("pill")

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => (
          <button
            key={v.id}
            onClick={() => setActive(v.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              active === v.id
                ? "border-primary bg-primary text-primary-foreground"
                : "hover:bg-accent"
            )}
          >
            {v.name}
          </button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        {variants.find((v) => v.id === active)?.description}
      </p>

      <div className="flex min-h-[300px] items-center justify-center rounded-xl border bg-muted/30 p-8">
        {active === "pill" && <DemoPill />}
        {active === "bar" && <DemoBar />}
        {active === "sidebar" && <DemoSidebar />}
        {active === "dock" && <DemoDock />}
        {active === "corner" && <DemoCorner />}
      </div>
    </div>
  )
}
