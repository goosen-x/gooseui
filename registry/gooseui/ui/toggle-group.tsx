"use client"

import type { VariantProps } from "class-variance-authority"
import * as React from "react"
import { toggleVariants } from "@/components/ui/toggle"
import { cn } from "@/lib/utils"

type Size = VariantProps<typeof toggleVariants>["size"]
type GroupVariant = "default" | "outline" | "ghost"
type Variants = { variant?: GroupVariant; size?: Size }
const Context = React.createContext<{
  name: string
  multiple: boolean
  value: string[]
  setValue: (value: string, checked: boolean) => void
  variant?: Variants["variant"]
  size?: Variants["size"]
  spacing: number
} | null>(null)

type ToggleGroupProps = Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange"
> &
  Variants & { spacing?: number } & (
    | {
        type: "single"
        value?: string
        defaultValue?: string
        onValueChange?: (value: string) => void
      }
    | {
        type: "multiple"
        value?: string[]
        defaultValue?: string[]
        onValueChange?: (value: string[]) => void
      }
  )

function ToggleGroup({
  type,
  value,
  defaultValue,
  onValueChange,
  variant,
  size,
  spacing = 0,
  children,
  className,
  ...props
}: ToggleGroupProps) {
  const name = React.useId()
  const multiple = type === "multiple"
  const toArray = (v?: string | string[]) =>
    v === undefined ? undefined : Array.isArray(v) ? v : v ? [v] : []
  const [internal, setInternal] = React.useState<string[]>(
    toArray(defaultValue) ?? [],
  )
  const current = toArray(value) ?? internal
  const setValue = (item: string, checked: boolean) => {
    const next = multiple
      ? checked
        ? [...current, item]
        : current.filter((v) => v !== item)
      : [item]
    if (value === undefined) setInternal(next)
    if (multiple) (onValueChange as ((v: string[]) => void) | undefined)?.(next)
    else (onValueChange as ((v: string) => void) | undefined)?.(item)
  }
  return (
    <Context.Provider
      value={{
        name,
        multiple,
        value: current,
        setValue,
        variant,
        size,
        spacing,
      }}
    >
      <div
        role={multiple ? "group" : "radiogroup"}
        data-slot="toggle-group"
        data-variant={variant ?? "default"}
        className={cn(
          "flex w-fit items-center",
          (variant ?? "default") === "default" &&
            "rounded-lg bg-muted p-1 dark:bg-input/40",
          variant === "outline" &&
            "overflow-hidden rounded-md border border-input shadow-xs",
          variant === "ghost" && "rounded-md",
          className,
        )}
        style={{ gap: `${spacing * 0.25}rem`, ...props.style }}
        {...props}
      >
        {children}
      </div>
    </Context.Provider>
  )
}
function ToggleGroupItem({
  value,
  variant,
  size,
  className,
  children,
  disabled,
  ...props
}: Omit<React.ComponentProps<"input">, "size" | "type" | "value"> &
  Variants & { value: string }) {
  const context = React.useContext(Context)
  if (!context) throw new Error("ToggleGroupItem requires ToggleGroup")
  return (
    <label
      className={cn(
        toggleVariants({ variant: "default", size: size ?? context.size }),
        "relative cursor-pointer select-none min-w-0 shrink-0 has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:checked]:hover:bg-[color-mix(in_oklab,var(--primary)_94%,black)] dark:has-[:checked]:hover:bg-[color-mix(in_oklab,var(--primary)_84%,var(--foreground))] has-[:checked]:hover:text-primary-foreground has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50 has-[:disabled]:pointer-events-none has-[:disabled]:opacity-50",
        (size ?? context.size) === "icon" ? "w-9 px-0" : "w-auto px-3",
        (variant ?? context.variant ?? "default") === "default" &&
          "rounded-md hover:bg-foreground/10 hover:text-foreground has-[:checked]:shadow-sm",
        (variant ?? context.variant) === "outline" &&
          "rounded-none hover:bg-accent hover:text-accent-foreground not-first:border-l not-first:border-input",
        (variant ?? context.variant) === "ghost" &&
          context.spacing === 0 &&
          "rounded-none first:rounded-l-md last:rounded-r-md",
        className,
      )}
    >
      <input
        {...props}
        className="sr-only"
        type={context.multiple ? "checkbox" : "radio"}
        name={context.name}
        value={value}
        checked={context.value.includes(value)}
        onChange={(event) => context.setValue(value, event.target.checked)}
        disabled={disabled}
      />
      {children}
    </label>
  )
}
export { ToggleGroup, ToggleGroupItem }
