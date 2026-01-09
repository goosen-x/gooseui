"use client"

/**
 * Generate Customizer
 *
 * Extended theme customizer for the landing page generator
 * Includes: Theme, Color, Font, Radius
 */

import {
  ArrowLeft,
  Check,
  CornerUpRight,
  Moon,
  Palette,
  Sun,
  Type,
} from "lucide-react"
import { MotionConfig, motion } from "motion/react"
import { useTheme } from "next-themes"
import * as React from "react"
import { useClickOutside } from "@/hooks/use-click-outside"
import {
  type FontName,
  fonts,
  RADIUS_MAX,
  RADIUS_MIN,
  useDesignStore,
} from "@/lib/generate/design-store"
import { cn } from "@/lib/utils"
import { Slider } from "@/registry/new-york/ui/slider"

const colors = [
  { name: "zinc", class: "bg-zinc-600" },
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

const toolbarTransition = {
  type: "spring" as const,
  bounce: 0.1,
  duration: 0.2,
}

function ToolbarButton({
  children,
  onClick,
  disabled,
  ariaLabel,
  active,
}: {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  ariaLabel?: string
  active?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        "relative flex size-9 shrink-0 cursor-pointer select-none appearance-none items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        active && "bg-accent text-foreground",
      )}
    >
      {children}
    </button>
  )
}

type Panel = "closed" | "colors" | "fonts" | "radius"

export function GenerateCustomizer({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme()
  const { activeColor, setColor, mounted } = useThemeColor()
  const [panel, setPanel] = React.useState<Panel>("closed")
  const containerRef = React.useRef<HTMLDivElement>(null)

  const { font, radius, setFont, setRadius } = useDesignStore()

  useClickOutside(containerRef, () => {
    setPanel("closed")
  })

  // Load Google Fonts dynamically for preview
  React.useEffect(() => {
    if (!mounted) return

    // Load all fonts for preview
    const fontFamilies = fonts.map((f) => f.value.replace(/ /g, "+"))
    const link = document.getElementById(
      "google-fonts-generate",
    ) as HTMLLinkElement | null

    if (!link) {
      const newLink = document.createElement("link")
      newLink.id = "google-fonts-generate"
      newLink.rel = "stylesheet"
      newLink.href = `https://fonts.googleapis.com/css2?${fontFamilies.map((f) => `family=${f}:wght@400;500;600;700`).join("&")}&display=swap`
      document.head.appendChild(newLink)
    }
  }, [mounted])

  if (!mounted) {
    return (
      <div
        className={cn(
          "fixed bottom-4 left-1/2 z-50 hidden -translate-x-1/2 sm:block",
          className,
        )}
      >
        <div className="h-[52px] w-[172px] animate-pulse rounded-xl border bg-background" />
      </div>
    )
  }

  const getWidth = () => {
    switch (panel) {
      case "colors":
        return "320px"
      case "fonts":
        return "400px"
      case "radius":
        return "300px"
      default:
        return "172px"
    }
  }

  return (
    <MotionConfig transition={toolbarTransition}>
      <div
        className={cn(
          "fixed bottom-4 left-1/2 z-50 hidden -translate-x-1/2 sm:block",
          className,
        )}
        ref={containerRef}
      >
        <div className="rounded-xl border bg-background/80 shadow-lg backdrop-blur-xl">
          <motion.div animate={{ width: getWidth() }} initial={false}>
            <div className="overflow-hidden p-2">
              {panel === "closed" ? (
                <div className="flex space-x-1">
                  {/* Theme Toggle */}
                  <ToolbarButton
                    onClick={() =>
                      setTheme(resolvedTheme === "dark" ? "light" : "dark")
                    }
                    ariaLabel="Toggle theme"
                  >
                    {resolvedTheme === "dark" ? (
                      <Sun className="size-5" />
                    ) : (
                      <Moon className="size-5" />
                    )}
                  </ToolbarButton>

                  {/* Color Picker */}
                  <ToolbarButton
                    onClick={() => setPanel("colors")}
                    ariaLabel="Open color picker"
                  >
                    <Palette className="size-5" />
                  </ToolbarButton>

                  {/* Font Picker */}
                  <ToolbarButton
                    onClick={() => setPanel("fonts")}
                    ariaLabel="Open font picker"
                  >
                    <Type className="size-5" />
                  </ToolbarButton>

                  {/* Radius Picker */}
                  <ToolbarButton
                    onClick={() => setPanel("radius")}
                    ariaLabel="Open radius picker"
                  >
                    <CornerUpRight className="size-5" />
                  </ToolbarButton>
                </div>
              ) : panel === "colors" ? (
                <div className="flex items-center space-x-2">
                  <ToolbarButton
                    onClick={() => setPanel("closed")}
                    ariaLabel="Back"
                  >
                    <ArrowLeft className="size-5" />
                  </ToolbarButton>
                  <div className="flex flex-1 items-center justify-center gap-2">
                    {colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setColor(c.name)}
                        className={cn(
                          "relative size-7 cursor-pointer rounded-full transition-transform hover:scale-110",
                          c.class,
                          activeColor === c.name &&
                            "ring-2 ring-ring ring-offset-2 ring-offset-background",
                        )}
                      >
                        {activeColor === c.name && (
                          <Check className="absolute inset-0 m-auto size-4 text-white dark:text-black" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ) : panel === "fonts" ? (
                <div className="flex items-center space-x-2">
                  <ToolbarButton
                    onClick={() => setPanel("closed")}
                    ariaLabel="Back"
                  >
                    <ArrowLeft className="size-5" />
                  </ToolbarButton>
                  <div className="flex flex-1 items-center gap-1 overflow-x-auto">
                    {fonts.map((f) => (
                      <button
                        key={f.name}
                        onClick={() => setFont(f.name as FontName)}
                        className={cn(
                          "shrink-0 cursor-pointer rounded-md px-2 py-1 text-xs font-medium transition-colors hover:bg-accent",
                          font === f.name &&
                            "bg-primary text-primary-foreground hover:bg-primary",
                        )}
                        style={{ fontFamily: f.value }}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>
                </div>
              ) : panel === "radius" ? (
                <div className="flex items-center space-x-3">
                  <ToolbarButton
                    onClick={() => setPanel("closed")}
                    ariaLabel="Back"
                  >
                    <ArrowLeft className="size-5" />
                  </ToolbarButton>
                  <div
                    className="size-8 shrink-0 border-2 border-muted-foreground/30 bg-muted"
                    style={{ borderRadius: `${radius}px` }}
                  />
                  <Slider
                    value={radius}
                    min={RADIUS_MIN}
                    max={RADIUS_MAX}
                    step={1}
                    onValueChange={setRadius}
                    showValue
                    formatValue={(v) => `${v}px`}
                    size="sm"
                    className="flex-1"
                  />
                </div>
              ) : null}
            </div>
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  )
}
