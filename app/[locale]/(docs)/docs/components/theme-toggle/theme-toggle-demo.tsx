"use client"

import { useTheme } from "next-themes"
import * as React from "react"
import { ThemeToggle } from "@/registry/gooseui/ui/theme-toggle"

interface ThemeToggleDemoProps {
  withLabel?: boolean
  labels?: { light: string; dark: string }
}

export function ThemeToggleDemo({
  withLabel,
  labels = { light: "Light", dark: "Dark" },
}: ThemeToggleDemoProps) {
  // Демо привязано к реальной теме сайта
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  const theme = mounted && resolvedTheme === "dark" ? "dark" : "light"
  const toggle = (
    <ThemeToggle theme={theme} onThemeChange={setTheme} disabled={!mounted} />
  )
  if (!withLabel) return toggle
  return (
    <div className="flex items-center gap-2">
      {toggle}
      <span className="text-sm">
        {theme === "dark" ? labels.dark : labels.light}
      </span>
    </div>
  )
}
