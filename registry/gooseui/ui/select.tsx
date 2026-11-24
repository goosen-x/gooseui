import type * as React from "react"
import { cn } from "@/lib/utils"
import {
  SelectOptionContent,
  SelectTrigger,
} from "@/registry/gooseui/ui/select.client"

// A native <select>, rendered on the server. Browsers with customizable select
// (appearance: base-select) get a fully styled picker; everything for it sits
// behind @supports, so other browsers keep the native picker styled like Input.
const css = `
[data-slot="select"]:has(> [data-slot="select-placeholder"]:checked) { color: var(--muted-foreground); }
@supports (appearance: base-select) {
  [data-slot="select"], [data-slot="select"]::picker(select) { appearance: base-select; }
  [data-slot="select"] { display: flex; align-items: center; gap: .5rem; padding-inline-end: .625rem; }
  [data-slot="select-wrapper"] > [data-slot="select-chevron"] { display: none; }
  [data-slot="select"] > button { display: flex; flex: 1; min-width: 0; align-items: center; padding: 0; border: 0; background: none; color: inherit; font: inherit; text-align: start; }
  [data-slot="select"] selectedcontent { display: flex; flex: 1; min-width: 0; align-items: center; gap: .5rem; overflow: hidden; white-space: nowrap; }
  [data-slot="select"] selectedcontent [data-slot="select-option-description"] { display: none; }
  [data-slot="select"] selectedcontent [data-slot="select-option-label"] { overflow: hidden; text-overflow: ellipsis; }
  [data-slot="select"]::picker-icon { content: ""; flex: none; width: 1rem; height: 1rem; margin-inline-start: auto; background: currentColor; opacity: .5; transition: rotate .2s;
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") center / contain no-repeat; }
  [data-slot="select"]:open::picker-icon { rotate: 180deg; }
  [data-slot="select"]::picker(select) {
    box-sizing: border-box; min-width: anchor-size(width); max-height: min(20rem, 60dvh); overflow-y: auto;
    margin-block: .25rem; padding: .25rem; border: 1px solid var(--border); border-radius: var(--radius);
    background: var(--popover); color: var(--popover-foreground);
    box-shadow: 0 10px 30px -10px rgb(0 0 0 / .25), 0 2px 6px -2px rgb(0 0 0 / .1);
    position-try-fallbacks: flip-block;
    opacity: 0; translate: 0 -.25rem;
    transition: opacity .15s, translate .15s, display .15s allow-discrete, overlay .15s allow-discrete;
  }
  [data-slot="select"]:open::picker(select) { opacity: 1; translate: 0 0; }
  @starting-style { [data-slot="select"]:open::picker(select) { opacity: 0; translate: 0 -.25rem; } }
  [data-slot="select"] option {
    display: flex; align-items: center; gap: .5rem; min-height: 2rem; padding: .375rem .5rem;
    border-radius: calc(var(--radius) - 2px); background: transparent; color: var(--popover-foreground);
    font-size: .875rem; font-weight: 400; cursor: default; outline: none;
  }
  [data-slot="select"] option:is(:hover, :focus-visible):not(:disabled) { background: var(--accent); color: var(--accent-foreground); }
  [data-slot="select"] option:focus-visible { box-shadow: inset 0 0 0 2px color-mix(in oklab, var(--ring) 60%, transparent); }
  [data-slot="select"] option:disabled { opacity: .5; }
  [data-slot="select"] option:checked { font-weight: 500; }
  [data-slot="select"] option::checkmark { order: 1; margin-inline-start: auto; color: var(--primary); }
  [data-slot="select"] optgroup { padding-block-start: .375rem; font-size: .75rem; font-weight: 500; color: var(--muted-foreground); }
  [data-slot="select"] optgroup + optgroup { margin-block-start: .25rem; border-block-start: 1px solid var(--border); }
  @media (prefers-reduced-motion: reduce) {
    [data-slot="select"]::picker(select), [data-slot="select"]::picker-icon { transition: none; }
  }
}
`

const sizes = {
  sm: "h-8 pl-2.5 pr-8 text-sm",
  md: "h-9 pl-3 pr-9 text-base md:text-sm",
  lg: "h-10 pl-4 pr-10 text-base",
} as const

export type SelectProps = Omit<
  React.ComponentProps<"select">,
  "value" | "defaultValue" | "size" | "multiple"
> & {
  /** Selected option value (controlled, needs onChange or onValueChange) */
  value?: string
  /** Initial value when uncontrolled */
  defaultValue?: string
  /** Called with the new value. Works only when Select is rendered from a client component */
  onValueChange?: (value: string) => void
  /** Text shown while nothing is selected. Adds an empty, hidden option */
  placeholder?: string
  size?: keyof typeof sizes
  /** Class for the wrapper element (width, margins) */
  wrapperClassName?: string
}

function Select({
  value,
  defaultValue,
  onValueChange,
  onChange,
  placeholder,
  size = "md",
  className,
  wrapperClassName,
  children,
  ...props
}: SelectProps) {
  const initial = defaultValue ?? (placeholder !== undefined ? "" : undefined)
  return (
    <span
      data-slot="select-wrapper"
      className={cn("relative inline-flex w-full", wrapperClassName)}
    >
      <style href="gooseui-select" precedence="default">
        {css}
      </style>
      <select
        {...props}
        data-slot="select"
        data-size={size}
        {...(value !== undefined ? { value } : { defaultValue: initial })}
        onChange={
          onChange || onValueChange
            ? (event) => {
                onChange?.(event)
                onValueChange?.(event.target.value)
              }
            : undefined
        }
        className={cn(
          "w-full min-w-0 appearance-none truncate rounded-md border border-input bg-transparent shadow-xs transition-[color,box-shadow] outline-none dark:bg-input/30",
          "[&_option]:bg-popover [&_option]:text-popover-foreground [&_optgroup]:bg-popover [&_optgroup]:text-muted-foreground",
          "focus-visible:border-ring focus-visible:ring-[5px] focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/30 aria-invalid:focus-visible:border-destructive",
          "disabled:cursor-not-allowed disabled:opacity-50",
          sizes[size],
          className,
        )}
      >
        <SelectTrigger />
        {placeholder !== undefined && (
          <option value="" disabled hidden data-slot="select-placeholder">
            {placeholder}
          </option>
        )}
        {children}
      </select>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        data-slot="select-chevron"
        className={cn(
          "pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 opacity-50",
          size === "sm" ? "right-2.5" : size === "lg" ? "right-3.5" : "right-3",
        )}
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </span>
  )
}

export type SelectOptionProps = Omit<
  React.ComponentProps<"option">,
  "value" | "label"
> & {
  value: string
  /** Leading icon. Shown only in browsers with customizable select */
  icon?: React.ReactNode
  /** Secondary line under the label. Shown only in the open picker of customizable select */
  description?: React.ReactNode
}

function SelectOption({
  value,
  icon,
  description,
  children,
  ...props
}: SelectOptionProps) {
  return (
    <option {...props} value={value} data-slot="select-option">
      {icon || description ? (
        <SelectOptionContent icon={icon} description={description}>
          {children}
        </SelectOptionContent>
      ) : (
        children
      )}
    </option>
  )
}

export type SelectGroupProps = Omit<
  React.ComponentProps<"optgroup">,
  "label"
> & {
  /** Group heading */
  label: string
}

function SelectGroup(props: SelectGroupProps) {
  return <optgroup data-slot="select-group" {...props} />
}

export { Select, SelectGroup, SelectOption }
