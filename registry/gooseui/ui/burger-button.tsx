import type * as React from "react"
import { cn } from "@/lib/utils"

export type BurgerButtonVariant = "cross" | "squeeze" | "spin" | "arrow"

export type BurgerButtonLabels = {
  /** Name of the closed button in controlled mode */
  open: string
  /** Name of the open button in controlled mode */
  close: string
  /** Name of the toggle in checkbox and popover modes, its state is announced separately */
  menu: string
}

export type BurgerButtonProps = Omit<
  React.ComponentProps<"button">,
  "children" | "onChange"
> & {
  /** Controlled state. Renders a button that calls onOpenChange */
  open?: boolean
  /** Initial state of the built-in checkbox */
  defaultOpen?: boolean
  /** Called with the next state. Works inside client components */
  onOpenChange?: (open: boolean) => void
  /**
   * Id of an element with the popover attribute. The button opens it through
   * popovertarget and follows its open state, all without JavaScript
   */
  popoverTarget?: string
  /** Name of the built-in checkbox, so the state is sent with a form */
  name?: string
  /** Animation used to switch into the open state. */
  variant?: BurgerButtonVariant
  size?: "sm" | "md" | "lg"
  appearance?: "outline" | "ghost" | "solid"
  labels?: Partial<BurgerButtonLabels>
}

const DEFAULT_LABELS: BurgerButtonLabels = {
  open: "Open menu",
  close: "Close menu",
  menu: "Menu",
}

const sizes = {
  sm: { button: "size-8", width: 16, gap: 5 },
  md: { button: "size-10", width: 20, gap: 6 },
  lg: { button: "size-12", width: 24, gap: 7 },
} as const

const appearances = {
  outline: "border bg-background text-foreground hover:bg-accent",
  ghost: "bg-transparent text-foreground hover:bg-accent",
  solid: "bg-primary text-primary-foreground hover:bg-primary/90",
} as const

// Closed widths differ; on hover all lines even out
const CLOSED_WIDTHS = ["66%", "100%", "40%"]

/** Open-state rules for any selector that matches an open burger. */
function openRules(o: string) {
  const line = (n: number) => `${o} .gb-line:nth-child(${n})`
  return `
${line(1)}{translate:0 var(--gb-g)}
${line(3)}{translate:0 calc(var(--gb-g) * -1)}
${o} .gb-bar{width:100%}
${line(1)} .gb-bar{rotate:45deg}
${line(2)} .gb-bar{opacity:0}
${line(3)} .gb-bar{rotate:-45deg}
${o}[data-variant=arrow] .gb-line:nth-child(1) .gb-bar{rotate:40deg;width:55%}
${o}[data-variant=arrow] .gb-line:nth-child(2) .gb-bar{opacity:1}
${o}[data-variant=arrow] .gb-line:nth-child(3) .gb-bar{rotate:-40deg;width:55%}
${o}[data-variant=spin] .gb-icon{rotate:180deg}
${o}[data-variant=squeeze] .gb-line{transition-delay:0s}
${o}[data-variant=squeeze] .gb-bar{transition-delay:150ms}`
}

const styles = `
.gb .gb-icon{position:relative;display:block;width:var(--gb-w);height:calc(var(--gb-g) * 2 + 2px);transition:rotate 300ms ease-out}
.gb .gb-line{position:absolute;inset-inline:0;display:block;height:2px;top:calc(var(--gb-n) * var(--gb-g));transition:translate 300ms ease-out}
.gb .gb-bar{position:absolute;right:0;display:block;height:2px;border-radius:9999px;background:currentColor;width:var(--gb-cw);transition:rotate 300ms ease-out,width 300ms ease-out,opacity 300ms ease-out}
.gb:hover .gb-bar{width:100%}
.gb[data-variant=arrow] .gb-bar{transform-origin:right}
.gb[data-variant=squeeze] :is(.gb-line,.gb-bar){transition-duration:150ms}
.gb[data-variant=squeeze] .gb-line{transition-delay:150ms}
${openRules(".gb:is([data-state=open],:has(> input:checked))")}
@media (prefers-reduced-motion:reduce){.gb :is(.gb-icon,.gb-line,.gb-bar){transition:none}}
`

const safeId = (id: string) => id.replace(/["\\]/g, "")

function Lines({ width, gap }: { width: number; gap: number }) {
  return (
    <span
      aria-hidden="true"
      className="gb-icon"
      style={
        { "--gb-w": `${width}px`, "--gb-g": `${gap}px` } as React.CSSProperties
      }
    >
      {CLOSED_WIDTHS.map((w, i) => (
        <span
          key={w}
          className="gb-line"
          style={{ "--gb-n": i } as React.CSSProperties}
        >
          <span
            className="gb-bar"
            style={{ "--gb-cw": w } as React.CSSProperties}
          />
        </span>
      ))}
    </span>
  )
}

/**
 * Burger toggle drawn and animated in CSS. Three modes, none of them needs
 * client JavaScript for the animation:
 * - default: a visually hidden checkbox inside a label, so `:has(:checked)`
 *   can also show a CSS-only menu;
 * - `popoverTarget`: a popovertarget button that follows `:popover-open`;
 * - `open`: a controlled button for state kept in a client component.
 */
export function BurgerButton({
  open,
  defaultOpen = false,
  onOpenChange,
  popoverTarget,
  name,
  variant = "cross",
  size = "md",
  appearance = "outline",
  labels: labelsProp,
  className,
  onClick,
  disabled,
  id,
  "aria-controls": ariaControls,
  ...props
}: BurgerButtonProps) {
  const labels = { ...DEFAULT_LABELS, ...labelsProp }
  const s = sizes[size]
  const target = popoverTarget ? safeId(popoverTarget) : undefined
  const root = cn(
    "gb inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md transition-colors",
    "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50",
    "disabled:pointer-events-none disabled:opacity-50 has-[:disabled]:pointer-events-none has-[:disabled]:opacity-50",
    s.button,
    appearances[appearance],
    className,
  )
  const style = (
    <style href="gooseui-burger-button" precedence="default">
      {styles}
    </style>
  )
  const lines = <Lines width={s.width} gap={s.gap} />

  if (open !== undefined || target) {
    return (
      <button
        type="button"
        id={id}
        disabled={disabled}
        aria-controls={ariaControls ?? target}
        aria-expanded={open}
        aria-label={target ? labels.menu : open ? labels.close : labels.open}
        data-state={open ? "open" : "closed"}
        data-variant={variant}
        data-for={target}
        popoverTarget={target}
        onClick={
          onClick || onOpenChange
            ? (event) => {
                onClick?.(event)
                if (!event.defaultPrevented && open !== undefined)
                  onOpenChange?.(!open)
              }
            : undefined
        }
        className={root}
        {...props}
      >
        {style}
        {target && (
          <style href={`gooseui-burger-button-${target}`} precedence="default">
            {openRules(
              `:root:has([id="${target}"]:popover-open) .gb[data-for="${target}"]`,
            )}
          </style>
        )}
        {lines}
      </button>
    )
  }

  return (
    <label
      data-variant={variant}
      className={root}
      {...(props as React.ComponentProps<"label">)}
    >
      {style}
      <input
        type="checkbox"
        id={id}
        name={name}
        disabled={disabled}
        defaultChecked={defaultOpen}
        aria-label={labels.menu}
        aria-controls={ariaControls}
        onChange={
          onOpenChange
            ? (event) => onOpenChange(event.currentTarget.checked)
            : undefined
        }
        className="sr-only"
      />
      {lines}
    </label>
  )
}
