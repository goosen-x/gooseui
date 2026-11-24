import type * as React from "react"
import { cn } from "@/lib/utils"

// Scroll-driven: the nearest scroller (the page or a scroll container) drives
// the header from full to compact over the first `compactThreshold` px.
// Without scroll-driven animations the header simply stays full size.
const css = `
@keyframes gooseui-mh-header{to{padding-block:.5rem}}
@keyframes gooseui-mh-logo{to{height:var(--mh-logo-compact)}}
@keyframes gooseui-mh-nav{to{gap:.5rem;font-size:.875rem}}
@media (prefers-reduced-motion:no-preference){
@supports (animation-timeline:scroll()){
[data-gooseui-morphing-header],[data-gooseui-morphing-logo]:not([data-compact]),[data-gooseui-morphing-nav]:not([data-compact]){
animation-timing-function:linear;animation-fill-mode:both;animation-timeline:scroll(nearest);animation-range:0px var(--mh-threshold,100px)}
[data-gooseui-morphing-header]{animation-name:gooseui-mh-header}
[data-gooseui-morphing-logo]:not([data-compact]){animation-name:gooseui-mh-logo}
[data-gooseui-morphing-nav]:not([data-compact]){animation-name:gooseui-mh-nav}
}}
`

interface MorphingHeaderProps {
  children: React.ReactNode
  as?: "header" | "div"
  className?: string
  /** Scroll distance in px over which the header becomes compact */
  compactThreshold?: number
}

/**
 * Morphing Header
 *
 * Sticky header that shrinks while the page scrolls.
 * Pure CSS: scroll-driven animations on the nearest scroller, no JavaScript.
 */
export function MorphingHeader({
  children,
  as: Tag = "header",
  className,
  compactThreshold = 100,
}: MorphingHeaderProps) {
  return (
    <Tag
      data-gooseui-morphing-header=""
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 py-4 backdrop-blur",
        className,
      )}
      style={
        { "--mh-threshold": `${compactThreshold}px` } as React.CSSProperties
      }
      aria-label={Tag === "header" ? "Site header" : undefined}
    >
      <style href="gooseui-morphing-header" precedence="default">
        {css}
      </style>
      <div className="mx-auto max-w-screen-xl px-4">{children}</div>
    </Tag>
  )
}

interface MorphingLogoProps {
  src: string
  alt?: string
  className?: string
  /** Compact size */
  compactSize?: number
  /** Full size */
  fullSize?: number
  /** Always show the compact size, without the scroll animation */
  isCompact?: boolean
}

/**
 * Morphing Logo
 *
 * Logo that shrinks from `fullSize` to `compactSize` together with the header.
 */
export function MorphingLogo({
  src,
  alt = "",
  className,
  compactSize = 32,
  fullSize = 48,
  isCompact = false,
}: MorphingLogoProps) {
  return (
    <img
      src={src}
      alt={alt}
      data-gooseui-morphing-logo=""
      data-compact={isCompact || undefined}
      className={cn("w-auto", className)}
      style={
        {
          height: isCompact ? compactSize : fullSize,
          "--mh-logo-compact": `${compactSize}px`,
        } as React.CSSProperties
      }
    />
  )
}

interface MorphingNavProps {
  children: React.ReactNode
  className?: string
  /** Always show the compact spacing, without the scroll animation */
  isCompact?: boolean
}

/**
 * Morphing Nav
 *
 * Navigation whose gap and font size shrink together with the header.
 */
export function MorphingNav({
  children,
  className,
  isCompact = false,
}: MorphingNavProps) {
  return (
    <nav
      data-gooseui-morphing-nav=""
      data-compact={isCompact || undefined}
      className={cn(
        "flex items-center",
        isCompact ? "gap-2 text-sm" : "gap-4",
        className,
      )}
    >
      {children}
    </nav>
  )
}
