import { ChevronRight, MoreHorizontal } from "lucide-react"
import type * as React from "react"

import { cn } from "@/lib/utils"

type BreadcrumbSeparatorType = "chevron" | "slash" | "dot" | "arrow"
type BreadcrumbVariant = "default" | "pill"

// Everything that cannot be a utility class lives here.
// Separators are drawn by ::before between items (a mask of an inline SVG, so
// they follow the text colour). An explicit <BreadcrumbSeparator /> still
// works: the item that follows it gets no ::before, so nothing is doubled.
// Edge fades: the list is a horizontal scroller, and two registered custom
// properties are driven by its own scroll position (scroll-driven animations).
// A fade appears only on a side that has something to scroll to. Without
// animation-timeline support the mask is simply not applied.
const css = `
@property --gooseui-bc-sep{syntax:"*";inherits:true;initial-value:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m9 18 6-6-6-6'/%3E%3C/svg%3E")}
@property --gooseui-bc-fade-s{syntax:"<length>";inherits:false;initial-value:0px}
@property --gooseui-bc-fade-e{syntax:"<length>";inherits:false;initial-value:0px}
@keyframes gooseui-bc-fade-s{from{--gooseui-bc-fade-s:0px}to{--gooseui-bc-fade-s:2rem}}
@keyframes gooseui-bc-fade-e{from{--gooseui-bc-fade-e:2rem}to{--gooseui-bc-fade-e:0px}}
[data-separator=slash]{--gooseui-bc-sep:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='M16 4 8 20'/%3E%3C/svg%3E")}
[data-separator=dot]{--gooseui-bc-sep:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='2.5' fill='%23000'/%3E%3C/svg%3E")}
[data-separator=arrow]{--gooseui-bc-sep:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12h14m-6-6 6 6-6 6'/%3E%3C/svg%3E")}
[data-slot=breadcrumb-list]>[data-slot=breadcrumb-item]:not(:first-child)::before{content:"";flex:none;inline-size:.875rem;block-size:.875rem;background:currentColor;opacity:.6;-webkit-mask:var(--gooseui-bc-sep) center/contain no-repeat;mask:var(--gooseui-bc-sep) center/contain no-repeat}
[data-slot=breadcrumb-list]>[data-slot=breadcrumb-item]:not(:first-child):dir(rtl)::before{transform:scaleX(-1)}
[data-slot=breadcrumb-separator]+[data-slot=breadcrumb-item]::before{display:none}
@media (min-width:40rem){[data-slot=breadcrumb-list]>[data-slot=breadcrumb-item]:not(:first-child)::before{margin-inline-end:.25rem}}
@supports (animation-timeline:scroll()){
[data-slot=breadcrumb-list]{
-webkit-mask-image:linear-gradient(to right,transparent,#000 var(--gooseui-bc-fade-s),#000 calc(100% - var(--gooseui-bc-fade-e)),transparent);
mask-image:linear-gradient(to right,transparent,#000 var(--gooseui-bc-fade-s),#000 calc(100% - var(--gooseui-bc-fade-e)),transparent);
animation:gooseui-bc-fade-s linear both,gooseui-bc-fade-e linear both;
animation-timeline:scroll(self inline),scroll(self inline);
animation-range:0 2rem,calc(100% - 2rem) 100%}
[data-slot=breadcrumb-list]:dir(rtl){
-webkit-mask-image:linear-gradient(to left,transparent,#000 var(--gooseui-bc-fade-s),#000 calc(100% - var(--gooseui-bc-fade-e)),transparent);
mask-image:linear-gradient(to left,transparent,#000 var(--gooseui-bc-fade-s),#000 calc(100% - var(--gooseui-bc-fade-e)),transparent)}
}
`

// Variant = a handful of custom properties that links and the current page
// read. They inherit, so the closest element that sets them wins:
// <BreadcrumbList variant> overrides <Breadcrumb variant>.
const variantVars: Record<BreadcrumbVariant, string> = {
  default:
    "[--bc-px:0px] [--bc-py:0px] [--bc-radius:0.25rem] [--bc-hover-bg:transparent] [--bc-page-bg:transparent] [--bc-page-weight:400] [--bc-underline:1px]",
  pill: "[--bc-px:0.625rem] [--bc-py:0.25rem] [--bc-radius:9999px] [--bc-hover-bg:color-mix(in_oklab,var(--muted)_70%,transparent)] [--bc-page-bg:var(--muted)] [--bc-page-weight:500] [--bc-underline:0px]",
}

interface BreadcrumbStyleProps {
  /** Glyph drawn between items. Not needed with an explicit BreadcrumbSeparator. */
  separator?: BreadcrumbSeparatorType
  /** "pill" turns items into rounded pills; the current page gets a muted fill. */
  variant?: BreadcrumbVariant
}

function Breadcrumb({
  separator,
  variant,
  className,
  children,
  ...props
}: React.ComponentProps<"nav"> & BreadcrumbStyleProps) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      data-separator={separator}
      data-variant={variant}
      className={cn(
        "max-w-full min-w-0",
        variant && variantVars[variant],
        className,
      )}
      {...props}
    >
      <style href="gooseui-breadcrumb" precedence="default">
        {css}
      </style>
      {children}
    </nav>
  )
}

function BreadcrumbList({
  separator,
  variant,
  className,
  ...props
}: React.ComponentProps<"ol"> & BreadcrumbStyleProps) {
  return (
    <ol
      data-slot="breadcrumb-list"
      data-separator={separator}
      data-variant={variant}
      className={cn(
        "text-muted-foreground -m-1 flex flex-nowrap items-center gap-1.5 overflow-x-auto overscroll-x-contain p-1 text-sm [scrollbar-width:none] sm:gap-2.5 [&::-webkit-scrollbar]:hidden",
        variant && variantVars[variant],
        className,
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn(
        "inline-flex max-w-full shrink-0 items-center gap-1.5",
        className,
      )}
      {...props}
    />
  )
}

function BreadcrumbLink({ className, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      data-slot="breadcrumb-link"
      className={cn(
        // Underline grows from the left on hover (background-size), the
        // transition is off under prefers-reduced-motion.
        "inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--bc-radius,0.25rem)] px-[var(--bc-px,0px)] py-[var(--bc-py,0px)] outline-none",
        "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_var(--bc-underline,1px)] bg-[position:0_calc(100%-1px)] bg-no-repeat",
        "hover:text-foreground hover:bg-[length:100%_var(--bc-underline,1px)] hover:bg-[color:var(--bc-hover-bg,transparent)]",
        "focus-visible:text-foreground focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-2",
        "motion-safe:transition-[color,background-color,background-size] motion-safe:duration-300",
        className,
      )}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn(
        "text-foreground min-w-0 truncate rounded-[var(--bc-radius,0.25rem)] bg-[color:var(--bc-page-bg,transparent)] px-[var(--bc-px,0px)] py-[var(--bc-py,0px)] [font-weight:var(--bc-page-weight,400)]",
        className,
      )}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center [&>svg]:size-3.5 rtl:[&>svg]:-scale-x-100",
        className,
      )}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  )
}

export type { BreadcrumbSeparatorType, BreadcrumbVariant }
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
