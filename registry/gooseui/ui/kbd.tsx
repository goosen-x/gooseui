import { cn } from "@/lib/utils"

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "pointer-events-none inline-flex h-5 min-w-5 w-fit select-none items-center justify-center gap-1 rounded-[5px] border border-border bg-muted px-1.5 font-sans text-[11px] font-medium leading-none text-muted-foreground shadow-[inset_0_-1px_0_var(--border)]",
        "[&_svg]:size-3 [&_svg]:shrink-0",
        "[[data-slot=tooltip-content]_&]:border-background/20 [[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background [[data-slot=tooltip-content]_&]:shadow-none",
        className,
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

const iconProps = {
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const

/** Key icons: same size, centered inside Kbd */
function KbdEnterIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M13 3v4.5a1.5 1.5 0 0 1-1.5 1.5H3" />
      <path d="m6 6-3 3 3 3" />
    </svg>
  )
}

function KbdArrowUpIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M8 13V3" />
      <path d="m3.5 7.5 4.5-4.5 4.5 4.5" />
    </svg>
  )
}

function KbdArrowDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M8 3v10" />
      <path d="m3.5 8.5 4.5 4.5 4.5-4.5" />
    </svg>
  )
}

export { Kbd, KbdGroup, KbdEnterIcon, KbdArrowUpIcon, KbdArrowDownIcon }
