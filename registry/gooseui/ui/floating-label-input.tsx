import * as React from "react"
import { cn } from "@/lib/utils"

export type FloatingLabelVariant = "outline" | "inset"

type FieldOwnProps = {
  label: React.ReactNode
  /** Helper text under the field */
  hint?: React.ReactNode
  /** Error text. Any truthy value marks the field invalid */
  error?: React.ReactNode
  /** Content before the value (icon, currency sign) */
  prefix?: React.ReactNode
  /** Content after the value (unit, button) */
  suffix?: React.ReactNode
  /** `outline`: the label sits on the border. `inset`: it moves to the top inside the frame */
  variant?: FloatingLabelVariant
  /** Classes for the outer wrapper */
  className?: string
  /** Classes for the bordered frame */
  frameClassName?: string
}

export type FloatingLabelInputProps = FieldOwnProps &
  Omit<React.ComponentProps<"input">, "prefix" | "className">

export type FloatingLabelTextareaProps = FieldOwnProps &
  Omit<React.ComponentProps<"textarea">, "prefix" | "className">

function useFieldIds(
  id: string | undefined,
  hint: React.ReactNode,
  error: React.ReactNode,
  describedBy: string | undefined,
) {
  const autoId = React.useId()
  const fieldId = id ?? autoId
  const hintId = hint ? `${fieldId}-hint` : undefined
  const errorId = error ? `${fieldId}-error` : undefined
  const ariaDescribedBy =
    [describedBy, hintId, errorId].filter(Boolean).join(" ") || undefined
  return { fieldId, hintId, errorId, ariaDescribedBy }
}

const controlBase =
  "peer w-full min-w-0 bg-transparent text-sm text-foreground outline-none placeholder:text-transparent focus:placeholder:text-muted-foreground disabled:cursor-not-allowed autofill:shadow-[inset_0_0_0_1000px_var(--background)] autofill:[-webkit-text-fill-color:var(--foreground)]"

// Floated state: focus, a value (placeholder hidden) or browser autofill.
const outlineLabelFloat =
  "peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:px-1 peer-focus:-ml-1 peer-focus:text-xs peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:-translate-y-1/2 peer-not-placeholder-shown:px-1 peer-not-placeholder-shown:-ml-1 peer-not-placeholder-shown:text-xs peer-autofill:top-0 peer-autofill:-translate-y-1/2 peer-autofill:px-1 peer-autofill:-ml-1 peer-autofill:text-xs"

const insetLabelFloat =
  "peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs peer-autofill:top-2 peer-autofill:translate-y-0 peer-autofill:text-xs"

function labelClasses(
  variant: FloatingLabelVariant,
  multiline: boolean,
  invalid: boolean,
) {
  return cn(
    // left-0: the frame already has horizontal padding, so the label lines up with the typed text
    "pointer-events-none absolute left-0 z-10 max-w-full truncate rounded-sm text-sm leading-none transition-all duration-150 ease-out motion-reduce:transition-none",
    invalid
      ? "text-destructive"
      : "text-muted-foreground peer-focus:text-foreground",
    variant === "outline"
      ? cn(
          "bg-background",
          multiline ? "top-3.5 translate-y-0" : "top-1/2 -translate-y-1/2",
          outlineLabelFloat,
        )
      : cn(
          multiline ? "top-4 translate-y-0" : "top-1/2 -translate-y-1/2",
          insetLabelFloat,
        ),
  )
}

type FieldShellProps = {
  variant: FloatingLabelVariant
  invalid: boolean
  multiline: boolean
  fieldId: string
  label: React.ReactNode
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  hint?: React.ReactNode
  error?: React.ReactNode
  hintId?: string
  errorId?: string
  className?: string
  frameClassName?: string
  children: React.ReactNode
}

function FieldShell({
  variant,
  invalid,
  multiline,
  fieldId,
  label,
  prefix,
  suffix,
  hint,
  error,
  hintId,
  errorId,
  className,
  frameClassName,
  children,
}: FieldShellProps) {
  return (
    <div className={cn("w-full", className)}>
      <div
        data-invalid={invalid || undefined}
        className={cn(
          "relative flex w-full gap-2 rounded-md border border-input bg-background px-3 shadow-xs transition-[border-color,box-shadow]",
          multiline ? "items-start" : "items-center",
          "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50",
          "data-[invalid]:border-destructive data-[invalid]:focus-within:ring-destructive/20",
          "has-[:disabled]:opacity-50",
          // The textarea owns the right padding, so its resize handle sits in the frame corner
          multiline && !suffix && "pr-0",
          frameClassName,
        )}
      >
        {prefix && (
          <span
            className={cn(
              "flex shrink-0 items-center text-sm text-muted-foreground [&_svg]:size-4",
              multiline && "pt-3.5",
            )}
          >
            {prefix}
          </span>
        )}
        <div className="relative min-w-0 flex-1 self-stretch">
          {children}
          <label
            htmlFor={fieldId}
            className={labelClasses(variant, multiline, invalid)}
          >
            {label}
          </label>
        </div>
        {suffix && (
          <span
            className={cn(
              "flex shrink-0 items-center text-sm text-muted-foreground [&_svg]:size-4",
              multiline && "pt-3.5",
            )}
          >
            {suffix}
          </span>
        )}
      </div>
      {hint && !error && (
        <p id={hintId} className="mt-1.5 px-3 text-xs text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1.5 px-3 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export function FloatingLabelInput({
  label,
  hint,
  error,
  prefix,
  suffix,
  variant = "outline",
  className,
  frameClassName,
  id,
  placeholder = " ",
  "aria-describedby": describedBy,
  ...props
}: FloatingLabelInputProps) {
  const { fieldId, hintId, errorId, ariaDescribedBy } = useFieldIds(
    id,
    hint && !error ? hint : null,
    error,
    describedBy,
  )
  const invalid = Boolean(error) || props["aria-invalid"] === true
  return (
    <FieldShell
      variant={variant}
      invalid={invalid}
      multiline={false}
      fieldId={fieldId}
      label={label}
      prefix={prefix}
      suffix={suffix}
      hint={hint}
      error={error}
      hintId={hintId}
      errorId={errorId}
      className={className}
      frameClassName={frameClassName}
    >
      <input
        {...props}
        id={fieldId}
        placeholder={placeholder}
        aria-invalid={invalid || undefined}
        aria-describedby={ariaDescribedBy}
        className={cn(
          controlBase,
          variant === "outline" ? "h-11" : "h-14 pt-5 pb-1.5",
        )}
      />
    </FieldShell>
  )
}

export function FloatingLabelTextarea({
  label,
  hint,
  error,
  prefix,
  suffix,
  variant = "outline",
  className,
  frameClassName,
  id,
  placeholder = " ",
  rows = 4,
  "aria-describedby": describedBy,
  ...props
}: FloatingLabelTextareaProps) {
  const { fieldId, hintId, errorId, ariaDescribedBy } = useFieldIds(
    id,
    hint && !error ? hint : null,
    error,
    describedBy,
  )
  const invalid = Boolean(error) || props["aria-invalid"] === true
  return (
    <FieldShell
      variant={variant}
      invalid={invalid}
      multiline
      fieldId={fieldId}
      label={label}
      prefix={prefix}
      suffix={suffix}
      hint={hint}
      error={error}
      hintId={hintId}
      errorId={errorId}
      className={className}
      frameClassName={frameClassName}
    >
      <textarea
        {...props}
        id={fieldId}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={invalid || undefined}
        aria-describedby={ariaDescribedBy}
        className={cn(
          controlBase,
          "block resize-y",
          !suffix && "pr-3",
          variant === "outline" ? "py-3" : "pt-7 pb-2",
        )}
      />
    </FieldShell>
  )
}
