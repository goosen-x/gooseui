"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface BalancedHeadingProps {
  children: React.ReactNode
  className?: string
  /** Heading level */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

/**
 * Balanced Heading
 *
 * Uses CSS text-wrap: balance for automatically
 * balanced multi-line headings.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap
 */
export function BalancedHeading({
  children,
  className,
  as: Component = "h2",
}: BalancedHeadingProps) {
  return (
    <Component
      className={cn(
        "font-bold tracking-tight",
        // text-wrap: balance
        "[text-wrap:balance]",
        // Size defaults
        Component === "h1" && "text-4xl md:text-5xl lg:text-6xl",
        Component === "h2" && "text-3xl md:text-4xl",
        Component === "h3" && "text-2xl md:text-3xl",
        Component === "h4" && "text-xl md:text-2xl",
        Component === "h5" && "text-lg md:text-xl",
        Component === "h6" && "text-base md:text-lg",
        className,
      )}
    >
      {children}
    </Component>
  )
}

interface PrettyParagraphProps {
  children: React.ReactNode
  className?: string
}

/**
 * Pretty Paragraph
 *
 * Uses CSS text-wrap: pretty to prevent orphans
 * and improve paragraph typography.
 *
 * @see https://webkit.org/blog/16547/better-typography-with-text-wrap-pretty/
 */
export function PrettyParagraph({ children, className }: PrettyParagraphProps) {
  return (
    <p
      className={cn(
        "leading-relaxed",
        // text-wrap: pretty
        "[text-wrap:pretty]",
        className,
      )}
    >
      {children}
    </p>
  )
}

interface BalancedTextProps {
  children: React.ReactNode
  className?: string
  /** Text wrap mode */
  mode?: "balance" | "pretty" | "stable"
}

/**
 * Balanced Text
 *
 * Generic component for applying text-wrap CSS property.
 */
export function BalancedText({
  children,
  className,
  mode = "balance",
}: BalancedTextProps) {
  return (
    <span
      className={cn(
        mode === "balance" && "[text-wrap:balance]",
        mode === "pretty" && "[text-wrap:pretty]",
        mode === "stable" && "[text-wrap:stable]",
        className,
      )}
    >
      {children}
    </span>
  )
}
