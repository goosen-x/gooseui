"use client"

import { motion, type Variants } from "motion/react"
import { useTheme } from "next-themes"
import * as React from "react"
import { cn } from "@/lib/utils"

const sunPath =
  "M49 68C59.4934 68 68 59.4934 68 49C68 38.5066 59.4934 30 49 30C38.5066 30 30 38.5066 30 49C30 59.4934 38.5066 68 49 68Z"
const moonPath =
  "M49 68C59.4934 68 68 59.4934 68 49C51.8708 55.947 42.6762 48.1846 49 30C38.5066 30 30 38.5066 30 49C30 59.4934 38.5066 68 49 68Z"

const rayVariant: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut" as const,
    },
  },
}

const raysVariants: Variants = {
  hidden: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
  visible: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
}

interface ThemeToggleProps {
  className?: string
  size?: number
}

export function ThemeToggle({ className, size = 24 }: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className={cn("size-6 animate-pulse rounded-full bg-muted", className)}
        style={{ width: size, height: size }}
      />
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "cursor-pointer rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
        className,
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="-4 -4 106 106"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative overflow-visible"
      >
        {/* Main sun/moon shape */}
        <motion.path
          initial={{ fillOpacity: 0, strokeOpacity: 0 }}
          animate={
            isDark
              ? {
                  fillOpacity: 0.1,
                  strokeOpacity: 1,
                  d: moonPath,
                  scale: 1.75,
                }
              : {
                  fillOpacity: 0.1,
                  strokeOpacity: 1,
                  d: sunPath,
                  scale: 1,
                }
          }
          transition={{
            duration: 0.5,
            ease: "easeOut" as const,
          }}
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          style={{ transformOrigin: "49px 49px" }}
        />

        {/* Sun rays - only visible in light mode */}
        <motion.g
          variants={raysVariants}
          initial="hidden"
          animate={isDark ? "hidden" : "visible"}
          stroke="currentColor"
          strokeWidth="6"
          style={{ strokeLinecap: "round" }}
        >
          {/* Clockwise from top: 12 → 1-2 → 3 → 4-5 → 6 → 7-8 → 9 → 10-11 */}
          <motion.path variants={rayVariant} d="M49 1.5V11" />
          <motion.path
            variants={rayVariant}
            d="M82.5825 15.4175L75.885 22.115"
          />
          <motion.path variants={rayVariant} d="M87 49H96.5" />
          <motion.path
            variants={rayVariant}
            d="M75.885 75.885L82.5825 82.5825"
          />
          <motion.path variants={rayVariant} d="M49 87V96.5" />
          <motion.path
            variants={rayVariant}
            d="M22.115 75.885L15.4175 82.5825"
          />
          <motion.path variants={rayVariant} d="M1.5 49H11" />
          <motion.path
            variants={rayVariant}
            d="M15.4175 15.4175L22.115 22.115"
          />
        </motion.g>
      </motion.svg>
    </button>
  )
}
