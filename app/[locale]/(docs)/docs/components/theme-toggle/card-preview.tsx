"use client"

import * as React from "react"
import { ThemeToggle } from "@/registry/gooseui/ui/theme-toggle"

export default function CardPreview() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light")
  return <ThemeToggle theme={theme} onThemeChange={setTheme} />
}
