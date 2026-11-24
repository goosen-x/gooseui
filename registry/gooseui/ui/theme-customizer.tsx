"use client"

import { useTheme } from "next-themes"
import * as React from "react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/registry/gooseui/ui/theme-toggle"

const colors = [
  { name: "zinc", class: "bg-zinc-500" },
  { name: "red", class: "bg-red-500" },
  { name: "orange", class: "bg-orange-500" },
  { name: "green", class: "bg-green-500" },
  { name: "blue", class: "bg-blue-500" },
  { name: "violet", class: "bg-violet-500" },
  { name: "pink", class: "bg-pink-500" },
]

const DEFAULT_COLOR = "green"

// The active color is read by CSS from data-theme-color on <html>, so the
// right swatch is marked on the very first paint, before hydration.
const activeSelectors = (suffix: string) =>
  colors
    .map((c) => {
      const root =
        c.name === DEFAULT_COLOR
          ? `:root:is([data-theme-color="${c.name}"], :not([data-theme-color]))`
          : `:root[data-theme-color="${c.name}"]`
      return `${root} .gooseui-tc [data-color="${c.name}"]${suffix}`
    })
    .join(",\n")

const css = `
.gooseui-tc-check {
  display: none;
}
${activeSelectors(" .gooseui-tc-check")} {
  display: block;
}
${activeSelectors(".gooseui-tc-ring")} {
  box-shadow: 0 0 0 2px var(--background), 0 0 0 4px var(--ring);
}
.gooseui-tc-pop {
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
}
@starting-style {
  .gooseui-tc-pop {
    opacity: 0;
    transform: translateY(0.5rem);
  }
}
.gooseui-tc-toolbar {
  transition: width 0.25s
    linear(0, 0.3 10%, 0.7 25%, 0.95 40%, 1.03 55%, 1.01 75%, 1);
}
.gooseui-tc-wiggle:hover .gooseui-tc-brush {
  transform-origin: top center;
  animation: gooseui-tc-wiggle 0.6s ease-in-out;
}
@keyframes gooseui-tc-wiggle {
  25% { rotate: -10deg; }
  75% { rotate: 10deg; }
}
@media (prefers-reduced-motion: reduce) {
  .gooseui-tc-pop,
  .gooseui-tc-toolbar {
    transition: none;
  }
  .gooseui-tc-wiggle:hover .gooseui-tc-brush {
    animation: none;
  }
}
`

function Styles() {
  return (
    <style href="gooseui-theme-customizer" precedence="default">
      {css}
    </style>
  )
}

// ============================================================================
// Icons
// ============================================================================

type IconProps = { className?: string }

function Icon({
  className,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

function SunIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2m-7.07-17.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </Icon>
  )
}

function MoonIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </Icon>
  )
}

function MonitorIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <path d="M8 21h8m-4-4v4" />
    </Icon>
  )
}

function CheckIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M20 6 9 17l-5-5" />
    </Icon>
  )
}

function ArrowLeftIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="m12 19-7-7 7-7M19 12H5" />
    </Icon>
  )
}

function PaintbrushIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="m14.622 17.897-10.68-2.913M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z" />
      <path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15" />
    </Icon>
  )
}

function BrushCleaningIcon({ className }: IconProps) {
  return (
    <Icon className={cn("gooseui-tc-brush", className)}>
      <path d="m16 22-1-4" />
      <path d="M19 13.99a1 1 0 0 0 1-1V12a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v.99a1 1 0 0 0 1 1" />
      <path d="M5 14h14l1.973 6.767A1 1 0 0 1 20 22H4a1 1 0 0 1-.973-1.233z" />
      <path d="m8 22 1-4" />
    </Icon>
  )
}

// ============================================================================
// State
// ============================================================================

const subscribeNoop = () => () => {}

function useMounted() {
  return React.useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  )
}

function useThemeColor() {
  const [activeColor, setActiveColor] = React.useState(DEFAULT_COLOR)

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("theme-color")
      if (!saved) return
      setActiveColor(saved)
      // Apply the saved color if the app has no inline script for it
      if (!document.documentElement.hasAttribute("data-theme-color")) {
        document.documentElement.setAttribute("data-theme-color", saved)
      }
    } catch {
      // Storage unavailable
    }
  }, [])

  const setColor = (colorName: string) => {
    setActiveColor(colorName)
    document.documentElement.setAttribute("data-theme-color", colorName)
    try {
      localStorage.setItem("theme-color", colorName)
    } catch {
      // Storage unavailable
    }
  }

  return { activeColor, setColor }
}

// Closes a popup on a pointer down outside the container or on Escape
function useDismiss(
  open: boolean,
  ref: React.RefObject<HTMLElement | null>,
  close: () => void,
) {
  const closeRef = React.useRef(close)
  closeRef.current = close

  React.useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) closeRef.current()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeRef.current()
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open, ref])
}

// ============================================================================
// Shared parts
// ============================================================================

// Icon size in px for the Tailwind size-* class passed via iconClassName.
const ICON_SIZES: Record<string, number> = { "size-4": 16, "size-5": 20 }

function ThemeToggleButton({
  className,
  iconClassName = "size-5",
}: {
  className?: string
  iconClassName?: string
}) {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useMounted()
  return (
    <ThemeToggle
      theme={
        mounted ? (resolvedTheme === "dark" ? "dark" : "light") : undefined
      }
      onThemeChange={setTheme}
      size={ICON_SIZES[iconClassName] ?? 20}
      className={cn("p-0 hover:text-foreground", className)}
    />
  )
}

function ColorSwatch({
  color,
  activeColor,
  onSelect,
  ring,
  check = true,
  className,
  checkClassName = "size-4",
}: {
  color: (typeof colors)[number]
  activeColor: string
  onSelect: (name: string) => void
  ring?: boolean
  check?: boolean
  className?: string
  checkClassName?: string
}) {
  return (
    <button
      type="button"
      data-color={color.name}
      aria-label={color.name}
      aria-pressed={activeColor === color.name}
      onClick={() => onSelect(color.name)}
      className={cn(
        "relative cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        ring && "gooseui-tc-ring",
        color.class,
        className,
      )}
    >
      {check && (
        <CheckIcon
          className={cn(
            "gooseui-tc-check absolute inset-0 m-auto text-white",
            checkClassName,
          )}
        />
      )}
    </button>
  )
}

type VariantProps = {
  className?: string
  /** Render in place instead of fixed to the viewport */
  inline?: boolean
}

// Variant 1: Floating Pill with Popup
export function ThemeCustomizerPill({ className, inline }: VariantProps) {
  const { activeColor, setColor } = useThemeColor()
  const [showColors, setShowColors] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const popupId = React.useId()

  useDismiss(showColors, containerRef, () => setShowColors(false))

  // Static positioning passed through className also means inline mode
  const isInline = inline || className?.includes("static")

  return (
    <div
      ref={containerRef}
      className={cn("gooseui-tc", isInline && "relative inline-block")}
    >
      <Styles />
      <nav
        className={cn(
          "z-50 flex items-center gap-1 rounded-full border bg-background/70 p-1 shadow-lg backdrop-blur-xl",
          !isInline && "fixed bottom-5 left-1/2 -translate-x-1/2",
          className,
        )}
      >
        <ThemeToggleButton className="size-9 rounded-full" />
        <button
          type="button"
          aria-label="Choose color"
          aria-expanded={showColors}
          aria-controls={popupId}
          className="gooseui-tc-wiggle flex size-9 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={() => setShowColors(!showColors)}
        >
          <BrushCleaningIcon className="size-5" />
        </button>
      </nav>

      {showColors && (
        <div
          id={popupId}
          className={cn(
            "gooseui-tc-pop z-50 flex justify-center gap-1.5 rounded-xl border bg-background/70 p-2 shadow-lg backdrop-blur-xl",
            isInline
              ? "absolute bottom-full left-0 mb-2 sm:right-0 sm:left-auto"
              : "fixed bottom-20 left-1/2 -translate-x-1/2 gap-2 rounded-full px-3 py-2",
          )}
        >
          {colors.map((c) => (
            <ColorSwatch
              key={c.name}
              color={c}
              activeColor={activeColor}
              onSelect={setColor}
              className={cn(
                "transition-transform hover:scale-110",
                isInline ? "size-6" : "size-7",
              )}
              checkClassName={isInline ? "size-3" : "size-4"}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Variant 2: Inline Bar with All Options
const THEME_OPTIONS = [
  { value: "light", label: "Light", icon: SunIcon },
  { value: "dark", label: "Dark", icon: MoonIcon },
  { value: "system", label: "System", icon: MonitorIcon },
]

export function ThemeCustomizerBar({ className }: VariantProps) {
  const { theme, setTheme } = useTheme()
  const mounted = useMounted()
  const { activeColor, setColor } = useThemeColor()

  return (
    <div
      className={cn(
        "gooseui-tc flex items-center gap-4 rounded-full border bg-background/70 px-4 py-2 shadow-lg backdrop-blur-xl",
        className,
      )}
    >
      <Styles />
      <div className="flex gap-1">
        {THEME_OPTIONS.map(({ value, label, icon: OptionIcon }) => {
          const active = mounted && theme === value
          return (
            <button
              key={value}
              type="button"
              aria-label={label}
              aria-pressed={active}
              onClick={() => setTheme(value)}
              className={cn(
                "flex size-8 cursor-pointer items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active ? "bg-primary text-white" : "hover:bg-accent",
              )}
            >
              <OptionIcon className="size-4" />
            </button>
          )
        })}
      </div>

      <div className="h-6 w-px bg-border" />

      <div className="flex gap-1.5">
        {colors.map((c) => (
          <ColorSwatch
            key={c.name}
            color={c}
            activeColor={activeColor}
            onSelect={setColor}
            ring
            check={false}
            className="size-6 transition-transform hover:scale-110"
          />
        ))}
      </div>
    </div>
  )
}

// Variant 3: Vertical Sidebar
export function ThemeCustomizerSidebar({ className, inline }: VariantProps) {
  const { activeColor, setColor } = useThemeColor()

  return (
    <div
      className={cn(
        "gooseui-tc z-50 flex flex-col items-center gap-2 rounded-2xl border bg-background/70 p-2 shadow-lg backdrop-blur-xl",
        inline ? "inline-flex" : "fixed top-1/2 right-4 -translate-y-1/2",
        className,
      )}
    >
      <Styles />
      <ThemeToggleButton
        className="size-8 rounded-full"
        iconClassName="size-4"
      />

      <div className="mx-auto h-px w-6 bg-border" />

      {colors.map((c) => (
        <ColorSwatch
          key={c.name}
          color={c}
          activeColor={activeColor}
          onSelect={setColor}
          className="size-8 transition-transform hover:scale-110"
        />
      ))}
    </div>
  )
}

// Variant 4: Bottom Dock (macOS style)
export function ThemeCustomizerDock({ className, inline }: VariantProps) {
  const { activeColor, setColor } = useThemeColor()

  return (
    <div
      className={cn(
        "gooseui-tc z-50 flex items-center gap-1 rounded-2xl border bg-background/80 p-1.5 shadow-2xl backdrop-blur-xl",
        inline ? "inline-flex" : "fixed bottom-4 left-1/2 -translate-x-1/2",
        className,
      )}
    >
      <Styles />
      <ThemeToggleButton className="size-10 rounded-xl bg-muted/50 transition-all hover:-translate-y-1" />

      <div className="mx-1 h-10 w-px bg-border" />

      {colors.map((c) => (
        <ColorSwatch
          key={c.name}
          color={c}
          activeColor={activeColor}
          onSelect={setColor}
          ring
          className="size-10 rounded-xl transition-all hover:-translate-y-1"
          checkClassName="size-5 drop-shadow-md dark:text-black"
        />
      ))}
    </div>
  )
}

// Variant 5: Minimal Corner
export function ThemeCustomizerCorner({ className, inline }: VariantProps) {
  const { activeColor, setColor } = useThemeColor()
  const [expanded, setExpanded] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const panelId = React.useId()

  useDismiss(expanded, containerRef, () => setExpanded(false))

  return (
    <div
      ref={containerRef}
      className={cn(
        "gooseui-tc z-50 flex flex-col-reverse items-end gap-2",
        inline ? "inline-flex" : "fixed right-4 bottom-4",
        className,
      )}
    >
      <Styles />
      <button
        type="button"
        aria-label="Theme settings"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded(!expanded)}
        className="flex size-12 cursor-pointer items-center justify-center rounded-full border bg-background shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <PaintbrushIcon
          className={cn("size-5 transition-transform", expanded && "rotate-45")}
        />
      </button>

      {expanded && (
        <div
          id={panelId}
          className="gooseui-tc-pop flex flex-col items-center gap-2 rounded-2xl border bg-background/90 p-2 shadow-lg backdrop-blur-xl"
        >
          <ThemeToggleButton className="size-10 rounded-xl" />

          <div className="h-px w-full bg-border" />

          {colors.map((c) => (
            <ColorSwatch
              key={c.name}
              color={c}
              activeColor={activeColor}
              onSelect={setColor}
              className="size-10 rounded-xl transition-transform hover:scale-105"
              checkClassName="size-5"
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Variant 6: Expanding Toolbar
function ToolbarButton({
  children,
  onClick,
  ariaLabel,
  className,
  expanded,
}: {
  children: React.ReactNode
  onClick?: () => void
  ariaLabel?: string
  className?: string
  expanded?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={expanded}
      className={cn(
        "relative flex size-9 shrink-0 cursor-pointer select-none appearance-none items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]",
        className,
      )}
    >
      {children}
    </button>
  )
}

export function ThemeCustomizerToolbar({ className, inline }: VariantProps) {
  const { activeColor, setColor } = useThemeColor()
  const [isOpen, setIsOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  useDismiss(isOpen, containerRef, () => setIsOpen(false))

  return (
    <div
      className={cn(
        "gooseui-tc z-50",
        inline
          ? "inline-block"
          : "fixed bottom-4 left-1/2 hidden -translate-x-1/2 sm:block",
        className,
      )}
      ref={containerRef}
    >
      <Styles />
      <div className="rounded-xl border bg-background/80 shadow-lg backdrop-blur-xl">
        <div
          className="gooseui-tc-toolbar overflow-hidden"
          style={{ width: isOpen ? 320 : 100 }}
        >
          <div className="p-2">
            {!isOpen ? (
              <div className="flex items-center space-x-1">
                <ThemeToggleButton className="size-9 rounded-lg" />
                <ToolbarButton
                  onClick={() => setIsOpen(true)}
                  ariaLabel="Open color picker"
                  expanded={false}
                  className="gooseui-tc-wiggle"
                >
                  <BrushCleaningIcon className="size-5" />
                </ToolbarButton>
              </div>
            ) : (
              <div className="flex w-[304px] items-center space-x-2">
                <ToolbarButton
                  onClick={() => setIsOpen(false)}
                  ariaLabel="Back"
                  expanded
                >
                  <ArrowLeftIcon className="size-5" />
                </ToolbarButton>
                <div className="flex flex-1 items-center justify-center gap-2">
                  {colors.map((c) => (
                    <ColorSwatch
                      key={c.name}
                      color={c}
                      activeColor={activeColor}
                      onSelect={setColor}
                      ring
                      className="size-7 transition-transform hover:scale-110"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Default export - the pill variant
export { ThemeCustomizerPill as ThemeCustomizer }
