"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

type Orientation = "horizontal" | "vertical"
type Variant = "default" | "underline"

const Context = React.createContext<{
  name: string
  value: string
  setValue: (value: string) => void
  orientation: Orientation
} | null>(null)
const VariantContext = React.createContext<Variant>("default")
// Per variant and orientation. Without anchor positioning (the supports-
// variants switch off) the active tab draws its own pill or line instead.
const triggerStyles = {
  "default-horizontal":
    "data-[state=active]:bg-background data-[state=active]:shadow-sm supports-[anchor-name:--a]:data-[state=active]:bg-transparent supports-[anchor-name:--a]:data-[state=active]:shadow-none",
  "default-vertical":
    "h-8 flex-none justify-start data-[state=active]:bg-background data-[state=active]:shadow-sm supports-[anchor-name:--a]:data-[state=active]:bg-transparent supports-[anchor-name:--a]:data-[state=active]:shadow-none",
  "underline-horizontal":
    "flex-none rounded-b-none px-3 data-[state=active]:shadow-[inset_0_-2px_0_0_var(--foreground)] supports-[anchor-name:--a]:data-[state=active]:shadow-none",
  "underline-vertical":
    "h-9 flex-none justify-start rounded-l-none px-3 data-[state=active]:shadow-[inset_2px_0_0_0_var(--foreground)] supports-[anchor-name:--a]:data-[state=active]:shadow-none",
} as const
function useTabs() {
  const value = React.useContext(Context)
  if (!value) throw new Error("Tabs components require Tabs")
  return value
}

/**
 * The active tab is marked with a CSS anchor and a single indicator element
 * glides to it: left, top, width and height are transitioned, so the pill (or
 * the underline) follows the tab and takes its width. No JavaScript measures
 * anything. Where anchor positioning is missing the indicator stays hidden and
 * the active tab paints its own background, the switch is instant there.
 */
const css = `
[data-slot="tabs-indicator"] {
  display: none;
}
@supports (anchor-name: --gooseui-tab) {
  [data-slot="tabs-list"] {
    anchor-scope: --gooseui-tab;
  }
  [data-slot="tabs-trigger"][data-state="active"] {
    anchor-name: --gooseui-tab;
  }
  [data-slot="tabs-indicator"] {
    display: block;
    position: absolute;
    pointer-events: none;
    position-anchor: --gooseui-tab;
    left: anchor(left, 0px);
    top: anchor(top, 0px);
    width: anchor-size(width, 0px);
    height: anchor-size(height, 0px);
    transition-property: left, top, width, height;
    transition-duration: 220ms;
    transition-timing-function: cubic-bezier(0.32, 0.72, 0, 1);
  }
  [data-slot="tabs-list"][data-variant="underline"][data-orientation="horizontal"] > [data-slot="tabs-indicator"] {
    top: calc(anchor(bottom, 0px) - 1px);
    height: 2px;
  }
  [data-slot="tabs-list"][data-variant="underline"][data-orientation="vertical"] > [data-slot="tabs-indicator"] {
    left: calc(anchor(left, 0px) - 1px);
    width: 2px;
  }
}
@media (prefers-reduced-motion: reduce) {
  [data-slot="tabs-indicator"] {
    transition: none !important;
  }
}
`

function Tabs({
  value,
  defaultValue = "",
  onValueChange,
  orientation = "horizontal",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  orientation?: Orientation
}) {
  const name = React.useId()
  const [internal, setInternal] = React.useState(defaultValue)
  const setValue = (next: string) => {
    if (value === undefined) setInternal(next)
    onValueChange?.(next)
  }
  return (
    <Context.Provider
      value={{ name, value: value ?? internal, setValue, orientation }}
    >
      <div
        data-slot="tabs"
        data-orientation={orientation}
        className={cn(
          "flex gap-2",
          orientation === "vertical" ? "flex-row gap-4" : "flex-col",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </Context.Provider>
  )
}
function TabsList({
  variant = "default",
  indicatorClassName,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  variant?: Variant
  indicatorClassName?: string
}) {
  const { orientation } = useTabs()
  const vertical = orientation === "vertical"
  return (
    <div
      role="radiogroup"
      aria-orientation={orientation}
      data-slot="tabs-list"
      data-variant={variant}
      data-orientation={orientation}
      className={cn(
        "relative inline-flex w-fit text-foreground/70",
        vertical ? "flex-col items-stretch" : "items-center justify-center",
        variant === "default" &&
          cn("bg-muted rounded-lg p-[0.1875rem]", !vertical && "h-9"),
        variant === "underline" &&
          (vertical
            ? "gap-0.5 self-start border-l"
            : "h-10 w-full justify-start gap-1 border-b"),
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        data-slot="tabs-indicator"
        className={cn(
          variant === "default"
            ? "rounded-md bg-background shadow-sm"
            : "rounded-full bg-foreground",
          indicatorClassName,
        )}
      />
      <VariantContext.Provider value={variant}>
        {children}
      </VariantContext.Provider>
      <style href="gooseui-tabs" precedence="default">
        {css}
      </style>
    </div>
  )
}
function TabsTrigger({
  value,
  className,
  children,
  disabled,
  ...props
}: Omit<React.ComponentProps<"input">, "value" | "size" | "type"> & {
  value: string
}) {
  const context = useTabs()
  const variant = React.useContext(VariantContext)
  const kind = `${variant}-${context.orientation}` as const
  const active = context.value === value
  return (
    <label
      data-state={active ? "active" : "inactive"}
      data-slot="tabs-trigger"
      className={cn(
        "relative cursor-pointer inline-flex h-full flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,background-color,box-shadow] duration-200 motion-reduce:transition-none",
        "data-[state=active]:text-foreground data-[state=inactive]:hover:bg-foreground/10 data-[state=inactive]:hover:text-foreground",
        "has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50 has-[:disabled]:pointer-events-none has-[:disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        triggerStyles[kind],
        className,
      )}
    >
      <input
        {...props}
        type="radio"
        className="sr-only"
        name={context.name}
        value={value}
        checked={active}
        onChange={() => context.setValue(value)}
        disabled={disabled}
      />
      {children}
    </label>
  )
}
function TabsContent({
  value,
  className,
  ...props
}: React.ComponentProps<"div"> & { value: string }) {
  const context = useTabs()
  if (context.value !== value) return null
  return (
    <div
      data-slot="tabs-content"
      className={cn(
        "flex-1 outline-none transition-[opacity,translate] duration-200 ease-out starting:translate-y-1.5 starting:opacity-0 motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  )
}
export { Tabs, TabsList, TabsTrigger, TabsContent }
