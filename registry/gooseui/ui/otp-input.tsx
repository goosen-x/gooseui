"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type InputOTPStatus = "idle" | "pending" | "success" | "error"

type InputOTPContextValue = {
  value: string
  maxLength: number
  focused: boolean
}

const InputOTPContext = React.createContext<InputOTPContextValue>({
  value: "",
  maxLength: 0,
  focused: false,
})

type InputOTPProps = Omit<
  React.ComponentProps<"input">,
  "value" | "defaultValue" | "onChange" | "maxLength" | "pattern"
> & {
  /** Number of cells. */
  maxLength: number
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  /** Called once when every cell is filled. */
  onComplete?: (value: string) => void
  /** Regular expression a single character has to match. Digits only by default. */
  pattern?: string
  containerClassName?: string
  /** Result of checking the code: pending locks the input, success and error colour the group. Success is green, override it with the --gooseui-otp-success CSS variable. */
  status?: InputOTPStatus
}

const DIGITS = "^[0-9]+$"

const InputOTP = React.forwardRef<HTMLInputElement, InputOTPProps>(
  (
    {
      className,
      containerClassName,
      status = "idle",
      maxLength,
      value: valueProp,
      defaultValue = "",
      onChange,
      onComplete,
      pattern = DIGITS,
      onFocus,
      onBlur,
      children,
      ...props
    },
    ref,
  ) => {
    const [inner, setInner] = React.useState(defaultValue)
    const [focused, setFocused] = React.useState(false)
    const value = valueProp ?? inner
    const allowed = React.useMemo(() => new RegExp(pattern), [pattern])
    const innerRef = React.useRef<HTMLInputElement>(null)
    React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement)

    const update = (raw: string) => {
      const next = Array.from(raw)
        .filter((char) => allowed.test(char))
        .join("")
        .slice(0, maxLength)
      if (valueProp === undefined) setInner(next)
      if (next !== value) {
        onChange?.(next)
        if (next.length === maxLength) onComplete?.(next)
      }
    }

    // the caret always stays at the end, cells are not editable one by one
    const toEnd = (el: HTMLInputElement) => {
      const end = el.value.length
      el.setSelectionRange(end, end)
    }

    const numeric = pattern === DIGITS

    return (
      <InputOTPContext.Provider value={{ value, maxLength, focused }}>
        <div data-status={status} className="group/otp contents">
          <div
            data-slot="input-otp"
            className={cn(
              "cn-input-otp relative flex items-center has-disabled:opacity-50",
              status === "pending" && "has-disabled:opacity-70",
              containerClassName,
            )}
          >
            {children}
            <input
              ref={innerRef}
              data-slot="input-otp-input"
              type="text"
              inputMode={numeric ? "numeric" : "text"}
              autoComplete="one-time-code"
              spellCheck={false}
              autoCapitalize="off"
              {...props}
              value={value}
              maxLength={maxLength}
              onChange={(e) => update(e.target.value)}
              onSelect={(e) => toEnd(e.currentTarget)}
              onFocus={(e) => {
                setFocused(true)
                toEnd(e.currentTarget)
                onFocus?.(e)
              }}
              onBlur={(e) => {
                setFocused(false)
                onBlur?.(e)
              }}
              disabled={status === "pending" || props.disabled}
              aria-invalid={status === "error" ? true : props["aria-invalid"]}
              className={cn(
                "absolute inset-0 size-full bg-transparent text-transparent caret-transparent opacity-0 outline-none selection:bg-transparent disabled:cursor-not-allowed",
                className,
              )}
            />
          </div>
        </div>
      </InputOTPContext.Provider>
    )
  },
)
InputOTP.displayName = "InputOTP"

function InputOTPGroup({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn(
        "flex items-center rounded-md border border-input bg-input/20 shadow-xs transition-[border-color] duration-150 motion-reduce:transition-none dark:bg-input/30",
        // hover: the group hints that it is one field
        "group-hover/otp:border-foreground/30 group-has-disabled/otp:border-input",
        // invalid: the whole code is wrong, so the whole group turns red
        "group-has-aria-invalid/otp:border-destructive",
        // status: success confirms once, error shakes once, both without motion when reduced
        "group-data-[status=success]/otp:border-[var(--gooseui-otp-success,oklch(0.65_0.17_150))] group-data-[status=success]/otp:motion-safe:animate-[gooseui-otp-confirm_300ms_ease-out_1]",
        "group-data-[status=error]/otp:border-destructive group-data-[status=error]/otp:motion-safe:animate-[gooseui-otp-shake_320ms_ease-in-out_1]",
        className,
      )}
      {...props}
    >
      <style href="gooseui-otp-status" precedence="default">
        {
          "@keyframes gooseui-otp-confirm { 0%, 100% { transform: scale(1) } 50% { transform: scale(1.02) } } @keyframes gooseui-otp-shake { 0%, 100% { transform: translateX(0) } 17%, 50%, 83% { transform: translateX(-4px) } 33%, 67% { transform: translateX(4px) } }"
        }
      </style>
      {children}
    </div>
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const { value, maxLength, focused } = React.useContext(InputOTPContext)
  const char = value[index]
  const isActive =
    focused && index === Math.min(value.length, Math.max(maxLength - 1, 0))
  const hasFakeCaret = isActive && index === value.length

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex size-10 items-center justify-center border-r border-input text-lg outline-none transition-[color,box-shadow] duration-150 motion-reduce:transition-none first:rounded-l-[calc(var(--radius-md)-1px)] last:rounded-r-[calc(var(--radius-md)-1px)] last:border-r-0 sm:size-12 sm:text-xl md:size-14 md:text-2xl/relaxed",
        // focus: only the cell that takes the next character gets the Input focus ring,
        // so the ring travels along the code as the user types
        "data-[active=true]:z-10 data-[active=true]:ring-[3px] data-[active=true]:ring-ring/40 data-[active=true]:shadow-[inset_0_0_0_1px_var(--ring)]",
        "group-has-aria-invalid/otp:data-[active=true]:ring-destructive/30 group-has-aria-invalid/otp:data-[active=true]:shadow-[inset_0_0_0_1px_var(--destructive)]",
        // status: pending hides the focus ring, success and error recolour the digits
        "group-data-[status=pending]/otp:data-[active=true]:shadow-none group-data-[status=pending]/otp:data-[active=true]:ring-0",
        "group-data-[status=success]/otp:text-[var(--gooseui-otp-success,oklch(0.65_0.17_150))] group-data-[status=error]/otp:text-destructive",
        "group-data-[status=success]/otp:data-[active=true]:ring-[var(--gooseui-otp-success,oklch(0.65_0.17_150))]/30 group-data-[status=success]/otp:data-[active=true]:shadow-[inset_0_0_0_1px_var(--gooseui-otp-success,oklch(0.65_0.17_150))]",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <style href="gooseui-otp-caret" precedence="default">
            {
              "@keyframes gooseui-otp-caret { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }"
            }
          </style>
          <div className="h-8 w-[0.0625rem] bg-foreground motion-safe:animate-[gooseui-otp-caret_1s_step-end_infinite]" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      className="[&_svg:not([class*='size-'])]:size-8 flex items-center"
      role="separator"
      {...props}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4 sm:size-6 md:size-8"
      >
        <path d="M5 12h14" />
      </svg>
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
