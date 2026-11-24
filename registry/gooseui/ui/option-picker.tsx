import * as React from "react"

import { cn } from "@/lib/utils"
import { Radio } from "@/registry/gooseui/ui/radio"

export type OptionPickerOption = {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
  disabled?: boolean
}

export type OptionPickerVariant =
  | "segment"
  | "rows"
  | "tiles"
  | "slider"
  | "bars"

export type OptionPickerProps = Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange" | "dir"
> & {
  options: OptionPickerOption[]
  /** Controlled value, used together with onValueChange */
  value?: string
  /** Initial value in uncontrolled mode */
  defaultValue?: string
  /** Called with the picked value. Works inside client components */
  onValueChange?: (value: string) => void
  variant?: OptionPickerVariant
  /** Name of the radio group, so the value is sent with a form */
  name?: string
  disabled?: boolean
  required?: boolean
  /** Text shown by the slider variant before anything is picked */
  emptyLabel?: string
}

// Index rules for the moving highlight, the slider fill and the slider caption.
// Plain CSS can't count, so they are listed up to a sane number of options.
const MAX_INDEX = 24
const P = ".gooseui-option-picker"
const on = (i: number) => `${P}:has([data-i="${i}"]>:checked)`

const styles = `
${Array.from(
  { length: MAX_INDEX },
  (_, i) =>
    `${on(i)}{--op-i:${i}}${on(i)} .op-cur>[data-c="${i}"]{display:block}${on(i)} [data-t="${i}"]{color:var(--foreground);font-weight:500}`,
).join("\n")}
${P} .op-pill{position:absolute;inset-block:.25rem;left:.25rem;width:calc((100% - .5rem - (var(--op-n) - 1) * .25rem) / var(--op-n));translate:calc(var(--op-i,0) * (100% + .25rem)) 0;border-radius:calc(var(--radius) - 2px);background:var(--background);box-shadow:0 1px 2px rgb(0 0 0 / .08);opacity:0;transition:translate 250ms cubic-bezier(.3,.7,.4,1),opacity 150ms}
${P}:has(:checked) .op-pill{opacity:1}
${P} .op-cur>span{display:none}
${P}:not(:has(:checked)) .op-cur>[data-c=empty]{display:block}
${P} .op-fill{width:calc(var(--op-i,0) / var(--op-last) * 100%);opacity:0;transition:width 200ms,opacity 150ms}
${P}:has(:checked) .op-fill{opacity:1}
${P} .op-dot{box-sizing:border-box;width:.75rem;height:.75rem;border-radius:9999px;border:2px solid color-mix(in oklab,var(--foreground) 30%,transparent);background:var(--background);transition:width 200ms,height 200ms,border-color 200ms}
${P} .op-stop:has(~ .op-stop :checked) .op-dot{border-color:var(--primary)}
${P} .op-stop:has(:checked) .op-dot{width:1.25rem;height:1.25rem;border:2px solid var(--primary);background:var(--background);box-shadow:0 1px 3px rgb(0 0 0 / .15)}
${P} .op-bar{background:var(--muted);transition:background-color 300ms}
${P} .op-col:hover .op-bar{background:color-mix(in oklab,var(--foreground) 15%,transparent)}
${P} .op-col:is(:has(:checked),:has(~ .op-col :checked)) .op-bar{background:var(--primary)}
@media (prefers-reduced-motion:reduce){${P} :is(.op-pill,.op-fill,.op-dot,.op-bar){transition:none}}
`

const ring = "has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50"
const off =
  "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 cursor-pointer"

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

/**
 * Radio group on native inputs in five looks. Selection, the moving
 * highlight and keyboard support come from the browser and CSS, so it renders
 * in Server Components and sends its value with a form without JavaScript.
 */
function OptionPicker({
  options,
  value,
  defaultValue,
  onValueChange,
  variant = "segment",
  name,
  disabled = false,
  required,
  emptyLabel = "Not selected",
  className,
  style,
  ...props
}: OptionPickerProps) {
  const id = React.useId()
  const controlled = value !== undefined && onValueChange !== undefined
  const initial = value ?? defaultValue

  const radio = (o: OptionPickerOption, i: number, visible = false) => {
    const Input = visible ? Radio : "input"
    return (
      <Input
        type="radio"
        id={`${id}-${i}`}
        name={name ?? `gooseui-option-picker${id}`}
        // Without a name the group stays out of any surrounding form
        form={name ? undefined : `${id}-none`}
        value={o.value}
        disabled={disabled || o.disabled}
        required={required}
        onChange={onValueChange ? () => onValueChange(o.value) : undefined}
        {...(controlled
          ? { checked: value === o.value }
          : { defaultChecked: initial === o.value })}
        className={visible ? undefined : "sr-only"}
      />
    )
  }

  let body: React.ReactNode

  if (variant === "segment") {
    body = (
      <div className="relative grid auto-cols-fr grid-flow-col gap-1 rounded-lg bg-muted p-1">
        <span aria-hidden="true" className="op-pill" />
        {options.map((o, i) => (
          <label
            key={o.value}
            data-i={i}
            className={cn(
              "relative flex items-center justify-center gap-2 rounded-md px-3 py-2 text-center text-sm leading-tight text-muted-foreground transition-colors motion-reduce:transition-none [&_svg]:size-4 [&_svg]:shrink-0",
              "hover:text-foreground has-[:checked]:font-medium has-[:checked]:text-foreground",
              ring,
              off,
            )}
          >
            {radio(o, i)}
            {o.icon}
            <span>{o.label}</span>
          </label>
        ))}
      </div>
    )
  } else if (variant === "rows") {
    body = (
      <div className="divide-y overflow-hidden rounded-lg border">
        {options.map((o, i) => (
          <label
            key={o.value}
            data-i={i}
            className={cn(
              "group flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors motion-reduce:transition-none [&_svg]:size-4 [&_svg]:shrink-0",
              "hover:bg-accent/50 has-[:checked]:bg-accent has-[:checked]:text-accent-foreground has-[:focus-visible]:ring-inset",
              ring,
              off,
            )}
          >
            {radio(o, i, true)}
            {o.icon && <span className="text-muted-foreground">{o.icon}</span>}
            <span className="flex-1 group-has-[:checked]:font-medium">
              {o.label}
            </span>
            {o.description && (
              <span className="text-xs text-muted-foreground">
                {o.description}
              </span>
            )}
          </label>
        ))}
      </div>
    )
  } else if (variant === "tiles") {
    body = (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-2">
        {options.map((o, i) => (
          <label
            key={o.value}
            data-i={i}
            className={cn(
              "group relative flex flex-col items-start gap-1 rounded-lg border bg-card p-3 text-left transition-[border-color,background-color,box-shadow] motion-reduce:transition-none [&_svg]:size-5",
              "hover:border-foreground/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:ring-1 has-[:checked]:ring-primary",
              ring,
              off,
            )}
          >
            {radio(o, i)}
            <CheckIcon className="absolute top-2.5 right-2.5 size-3.5! opacity-0 transition-opacity group-has-[:checked]:opacity-100 motion-reduce:transition-none" />
            {o.icon && (
              <span className="mb-1 text-muted-foreground">{o.icon}</span>
            )}
            <span className="pr-5 text-sm leading-tight font-semibold">
              {o.label}
            </span>
            {o.description && (
              <span className="text-xs leading-tight text-muted-foreground">
                {o.description}
              </span>
            )}
          </label>
        ))}
      </div>
    )
  } else if (variant === "slider") {
    const last = Math.max(options.length - 1, 1)
    body = (
      <div style={{ "--op-last": last } as React.CSSProperties}>
        <div aria-hidden="true" className="op-cur mb-3 text-lg font-semibold">
          <span data-c="empty" className="text-muted-foreground/60">
            {emptyLabel}
          </span>
          {options.map((o, i) => (
            <span key={o.value} data-c={i}>
              {o.label}
            </span>
          ))}
        </div>
        <div className="relative mx-2 h-8">
          <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-muted" />
          <div className="op-fill absolute top-1/2 left-0 h-1.5 -translate-y-1/2 rounded-full bg-primary" />
          {options.map((o, i) => (
            <label
              key={o.value}
              data-i={i}
              className={cn(
                "op-stop absolute top-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full",
                ring,
                off,
              )}
              style={{ left: `${(i / last) * 100}%` }}
            >
              {radio(o, i)}
              <span aria-hidden="true" className="op-dot" />
            </label>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="mt-1 flex justify-between gap-2 text-xs text-muted-foreground"
        >
          {options.map((o, i) => (
            <label
              key={o.value}
              htmlFor={`${id}-${i}`}
              data-t={i}
              className={cn(
                "cursor-pointer hover:text-foreground",
                i === 0
                  ? "text-left"
                  : i === last
                    ? "text-right"
                    : "text-center",
              )}
            >
              {o.label}
            </label>
          ))}
        </div>
      </div>
    )
  } else {
    body = (
      <div className="grid auto-cols-fr grid-flow-col gap-2">
        {options.map((o, i) => (
          <label
            key={o.value}
            data-i={i}
            className={cn(
              "op-col group flex flex-col items-stretch gap-2 rounded-md p-1 text-left",
              ring,
              off,
            )}
          >
            {radio(o, i)}
            <span className="flex h-16 items-end">
              <span
                className="op-bar w-full rounded-md"
                style={{ height: `${((i + 1) / options.length) * 100}%` }}
              />
            </span>
            <span className="text-xs leading-tight text-muted-foreground group-has-[:checked]:font-semibold group-has-[:checked]:text-foreground">
              {o.label}
            </span>
            {o.description && (
              <span className="text-[11px] leading-tight text-muted-foreground">
                {o.description}
              </span>
            )}
          </label>
        ))}
      </div>
    )
  }

  return (
    <div
      role="radiogroup"
      aria-disabled={disabled || undefined}
      aria-required={required || undefined}
      data-slot="option-picker"
      data-variant={variant}
      className={cn("gooseui-option-picker w-full", className)}
      style={
        {
          "--op-n": Math.max(options.length, 1),
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <style href="gooseui-option-picker" precedence="default">
        {styles}
      </style>
      {body}
    </div>
  )
}

export { OptionPicker }
