import type * as React from "react"
import { Slot } from "@/lib/slot"
import { cn } from "@/lib/utils"

const variants = {
  // Light theme background is darkened a bit so white text keeps 4.5:1
  default:
    "border-transparent bg-[color-mix(in_oklab,var(--primary)_78%,black)] text-primary-foreground dark:bg-primary",
  secondary: "border-transparent bg-secondary text-secondary-foreground",
  destructive:
    "border-transparent bg-[color-mix(in_oklab,var(--destructive)_85%,black)] text-white dark:bg-destructive dark:text-background",
  outline: "text-foreground",
  // Soft states: background is the token mixed into --background, text and border share the hue
  success:
    "border-[color-mix(in_oklab,var(--success)_35%,transparent)] bg-[color-mix(in_oklab,var(--success)_13%,var(--background))] text-success",
  warning:
    "border-[color-mix(in_oklab,var(--warning)_35%,transparent)] bg-[color-mix(in_oklab,var(--warning)_13%,var(--background))] text-warning",
  info: "border-[color-mix(in_oklab,var(--info)_35%,transparent)] bg-[color-mix(in_oklab,var(--info)_13%,var(--background))] text-info",
  neutral: "border-border bg-muted text-foreground",
  beta: "border-primary bg-primary/10 text-primary uppercase tracking-wider font-semibold",
  draft:
    "border-muted-foreground bg-muted text-muted-foreground uppercase tracking-wider font-semibold",
  experimental:
    "border-destructive bg-destructive/10 text-destructive uppercase tracking-wider font-semibold",
  // Quiet status: no fill, no border, only a coloured dot (set the colour with `tone`)
  status:
    "gap-1.5 rounded-none border-0 bg-transparent px-0 py-0 text-[13px] font-normal text-foreground",
} as const

const tones = {
  success: {
    dot: "bg-[color-mix(in_oklab,var(--success)_65%,white)] dark:bg-success",
    text: "",
  },
  info: {
    dot: "bg-[color-mix(in_oklab,var(--info)_65%,white)] dark:bg-info",
    text: "",
  },
  warning: {
    dot: "bg-[color-mix(in_oklab,var(--warning)_65%,white)] dark:bg-warning",
    text: "",
  },
  muted: { dot: "bg-muted-foreground/40", text: "text-muted-foreground" },
  // The one accent: the text is red too, darkened in light theme for contrast
  danger: {
    dot: "bg-destructive",
    text: "font-medium text-[color-mix(in_oklab,var(--destructive)_85%,black)] dark:text-destructive",
  },
} as const

const sizes = {
  sm: "px-1.5 py-0 text-[0.6875rem] [&>svg]:size-2.5",
  default: "px-2 py-0.5 text-xs [&>svg]:size-3",
  lg: "px-3 py-1 text-sm gap-1.5 [&>svg]:size-3.5",
} as const

const linkStyles =
  "cursor-pointer transition-[filter,box-shadow] hover:brightness-95 dark:hover:brightness-125 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"

export type BadgeProps = React.ComponentProps<"span"> & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  /** Colour of the dot. With `variant="status"` it also sets the text style. Needs `dot` */
  tone?: keyof typeof tones
  /** Status dot before the text. `"pulse"` adds a pulsing ring (off under reduced motion) */
  dot?: boolean | "pulse"
  /** Render the only child (`<a>`, `<button>`) with badge styles. Dot is not added in this mode */
  asChild?: boolean
}

export function Badge({
  className,
  variant = "default",
  size = "default",
  dot = false,
  tone,
  asChild = false,
  children,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span"
  const interactive = asChild
  const toneStyle = tone ? tones[tone] : undefined
  return (
    <Comp
      data-slot="badge"
      className={cn(
        "inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-full border font-medium [&>svg]:shrink-0 [&>svg]:pointer-events-none",
        sizes[size],
        variants[variant],
        variant === "status" && toneStyle?.text,
        interactive && linkStyles,
        className,
      )}
      {...props}
    >
      {dot && !asChild ? (
        <>
          <span
            aria-hidden="true"
            className="relative inline-flex size-1.5 shrink-0"
          >
            {dot === "pulse" && (
              <span
                className={cn(
                  "absolute inset-0 animate-ping rounded-full opacity-60 motion-reduce:animate-none",
                  toneStyle?.dot ?? "bg-current",
                )}
              />
            )}
            <span
              className={cn(
                "relative size-1.5 rounded-full",
                toneStyle?.dot ?? "bg-current",
              )}
            />
          </span>
          {children}
        </>
      ) : (
        children
      )}
    </Comp>
  )
}

/** Round cross button for removable badges (tags). Pass `onClick` from a client component */
export function BadgeRemove({
  className,
  children,
  "aria-label": ariaLabel = "Remove",
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="badge-remove"
      aria-label={ariaLabel}
      className={cn(
        "-mr-1 inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full opacity-70 transition-[opacity,background-color] hover:bg-current/15 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      {...props}
    >
      {children ?? (
        <svg
          viewBox="0 0 12 12"
          className="size-2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" />
        </svg>
      )}
    </button>
  )
}

/** Round counter for notifications. Place it with `absolute` over an icon or a button */
export function BadgeCount({
  className,
  count,
  max = 99,
  children,
  ...props
}: Omit<React.ComponentProps<"span">, "children"> & {
  count?: number
  max?: number
  children?: React.ReactNode
}) {
  const text =
    children ?? (count !== undefined && count > max ? `${max}+` : count)
  return (
    <span
      data-slot="badge-count"
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-[0.6875rem] font-semibold leading-none tabular-nums text-white ring-2 ring-background",
        className,
      )}
      {...props}
    >
      {text}
    </span>
  )
}
