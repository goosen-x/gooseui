"use client"

import { useTheme } from "next-themes"
import * as React from "react"
import { ThemeToggle as RegistryThemeToggle } from "@/registry/gooseui/ui/theme-toggle"

export function ThemeToggle({
  className,
  size = 24,
}: {
  className?: string
  size?: number
}) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return (
    <RegistryThemeToggle
      className={className}
      size={size}
      theme={
        mounted ? (resolvedTheme === "dark" ? "dark" : "light") : undefined
      }
      onThemeChange={setTheme}
      disabled={!mounted}
    />
  )
}
