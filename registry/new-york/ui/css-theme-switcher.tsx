"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CSSThemeSwitcherProps {
  className?: string
}

/**
 * CSS Theme Switcher
 *
 * Uses light-dark() function + :has() selector
 * for CSS-only theme switching.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark
 */
export function CSSThemeSwitcher({ className }: CSSThemeSwitcherProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border bg-card p-1",
        className,
      )}
    >
      <label className="relative cursor-pointer">
        <input
          type="radio"
          name="theme"
          value="light"
          className="peer sr-only"
          defaultChecked
        />
        <span
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full",
            "transition-colors",
            "peer-checked:bg-primary peer-checked:text-primary-foreground",
          )}
        >
          <SunIcon className="h-4 w-4" />
        </span>
      </label>
      <label className="relative cursor-pointer">
        <input
          type="radio"
          name="theme"
          value="dark"
          className="peer sr-only"
        />
        <span
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full",
            "transition-colors",
            "peer-checked:bg-primary peer-checked:text-primary-foreground",
          )}
        >
          <MoonIcon className="h-4 w-4" />
        </span>
      </label>
      <label className="relative cursor-pointer">
        <input
          type="radio"
          name="theme"
          value="system"
          className="peer sr-only"
        />
        <span
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full",
            "transition-colors",
            "peer-checked:bg-primary peer-checked:text-primary-foreground",
          )}
        >
          <MonitorIcon className="h-4 w-4" />
        </span>
      </label>
    </div>
  )
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}

function MonitorIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  )
}

/**
 * CSS light-dark() demo styles
 */
export function CSSThemeSwitcherStyles() {
  return (
    <style jsx global>{`
      /* Example of light-dark() usage */
      .light-dark-demo {
        background-color: light-dark(#ffffff, #1a1a1a);
        color: light-dark(#1a1a1a, #ffffff);
        border-color: light-dark(#e5e5e5, #333333);
      }
    `}</style>
  )
}
