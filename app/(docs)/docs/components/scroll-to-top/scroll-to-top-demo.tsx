"use client"

import * as React from "react"
import {
  ScrollToTop,
  ScrollToTopPill,
  ScrollToTopMinimal,
  ScrollToTopProgress,
} from "@/registry/new-york/ui/scroll-to-top"

/**
 * Demo wrapper that creates a scrollable container
 * to demonstrate the ScrollToTop component
 */
function DemoContainer({
  children,
  label,
}: {
  children: React.ReactNode
  label: string
}) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = React.useState(false)

  const handleScroll = () => {
    if (containerRef.current) {
      setScrolled(containerRef.current.scrollTop > 50)
    }
  }

  const scrollDown = () => {
    containerRef.current?.scrollTo({ top: 300, behavior: "smooth" })
  }

  return (
    <div className="relative">
      <div className="text-sm font-medium mb-2 text-center">{label}</div>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="relative w-48 h-64 overflow-y-auto border rounded-lg bg-background"
      >
        {/* Content to scroll */}
        <div className="p-4 space-y-4">
          <p className="text-sm text-muted-foreground">
            Scroll down to see the button appear.
          </p>
          {!scrolled && (
            <button
              onClick={scrollDown}
              className="text-xs text-primary underline cursor-pointer"
            >
              Click to scroll
            </button>
          )}
          {/* Spacer content */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="h-8 bg-muted/50 rounded animate-pulse"
              style={{ animationDelay: `${i * 50}ms` }}
            />
          ))}
        </div>
        {/* ScrollToTop button - positioned relative to container */}
        <div className="sticky bottom-0 left-0 right-0 h-0">
          {children}
        </div>
      </div>
    </div>
  )
}

/**
 * Interactive demo showing all variants side by side
 */
export function ScrollToTopDemo() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <DemoContainer label="Default">
        <ScrollToTop
          threshold={50}
          className="absolute bottom-4 right-4 static translate-y-0 opacity-100"
        />
      </DemoContainer>

      <DemoContainer label="Pill">
        <ScrollToTopPill
          threshold={50}
          className="absolute bottom-4 right-4 static translate-y-0 opacity-100"
          label="Back up"
        />
      </DemoContainer>

      <DemoContainer label="Minimal">
        <ScrollToTopMinimal
          threshold={50}
          className="absolute bottom-4 right-4 static translate-y-0 opacity-100"
        />
      </DemoContainer>

      <DemoContainer label="Progress">
        <ScrollToTopProgress
          threshold={50}
          className="absolute bottom-4 right-4 static translate-y-0 opacity-100"
        />
      </DemoContainer>
    </div>
  )
}

/**
 * Simple static preview showing all variants
 */
export function ScrollToTopPreview() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-8">
      {/* Default */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center justify-center size-12 rounded-full bg-primary text-primary-foreground shadow-lg cursor-pointer hover:scale-110 transition-transform">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m5 12 7-7 7 7" />
            <path d="M12 19V5" />
          </svg>
        </div>
        <span className="text-xs text-muted-foreground">Default</span>
      </div>

      {/* Pill */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-lg cursor-pointer hover:bg-primary/90 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
          <span>Scroll to top</span>
        </div>
        <span className="text-xs text-muted-foreground">Pill</span>
      </div>

      {/* Minimal */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center justify-center size-10 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m5 12 7-7 7 7" />
            <path d="M12 19V5" />
          </svg>
        </div>
        <span className="text-xs text-muted-foreground">Minimal</span>
      </div>

      {/* Progress */}
      <div className="flex flex-col items-center gap-2">
        <div className="relative flex items-center justify-center size-12 bg-background rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
          <svg
            className="absolute inset-0 -rotate-90"
            width="48"
            height="48"
            viewBox="0 0 48 48"
          >
            <circle
              cx="24"
              cy="24"
              r="21"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-muted"
            />
            <circle
              cx="24"
              cy="24"
              r="21"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="132"
              strokeDashoffset="66"
              className="text-primary"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="relative z-10"
          >
            <path d="m5 12 7-7 7 7" />
            <path d="M12 19V5" />
          </svg>
        </div>
        <span className="text-xs text-muted-foreground">Progress (50%)</span>
      </div>
    </div>
  )
}

/**
 * Default variant demo
 */
export function ScrollToTopDefaultDemo() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center size-12 rounded-full bg-primary text-primary-foreground shadow-lg cursor-pointer hover:scale-110 transition-transform">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m5 12 7-7 7 7" />
          <path d="M12 19V5" />
        </svg>
      </div>
    </div>
  )
}

/**
 * Pill variant demo
 */
export function ScrollToTopPillDemo() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-lg cursor-pointer hover:bg-primary/90 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
        <span>Scroll to top</span>
      </div>
    </div>
  )
}

/**
 * Minimal variant demo
 */
export function ScrollToTopMinimalDemo() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center size-10 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m5 12 7-7 7 7" />
          <path d="M12 19V5" />
        </svg>
      </div>
    </div>
  )
}

/**
 * Progress variant demo
 */
export function ScrollToTopProgressDemo() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative flex items-center justify-center size-12 bg-background rounded-full shadow-lg border cursor-pointer hover:scale-110 transition-transform">
        <svg
          className="absolute inset-0 -rotate-90"
          width="48"
          height="48"
          viewBox="0 0 48 48"
        >
          <circle
            cx="24"
            cy="24"
            r="21"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-muted"
          />
          <circle
            cx="24"
            cy="24"
            r="21"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="132"
            strokeDashoffset="33"
            className="text-primary"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative z-10"
        >
          <path d="m5 12 7-7 7 7" />
          <path d="M12 19V5" />
        </svg>
      </div>
    </div>
  )
}
