"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface SmartFormFieldProps {
  children: React.ReactNode
  className?: string
  /** Error message to show when invalid */
  errorMessage?: string
  /** Success message to show when valid */
  successMessage?: string
}

/**
 * Smart Form Field
 *
 * Uses CSS :has() selector for JavaScript-free
 * form validation visual feedback.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/:has
 */
export function SmartFormField({
  children,
  className,
  errorMessage = "This field is invalid",
  successMessage = "Looks good!",
}: SmartFormFieldProps) {
  return (
    <div
      className={cn(
        "group/field relative",
        // Valid state (has valid input that's not empty)
        "[&:has(input:valid:not(:placeholder-shown))]:text-green-600",
        "[&:has(input:valid:not(:placeholder-shown))_.field-success]:block",
        "[&:has(input:valid:not(:placeholder-shown))_input]:border-green-500",
        "[&:has(input:valid:not(:placeholder-shown))_input]:ring-green-500/20",
        // Invalid state (has invalid input that user has interacted with)
        "[&:has(input:invalid:not(:placeholder-shown))]:text-destructive",
        "[&:has(input:invalid:not(:placeholder-shown))_.field-error]:block",
        "[&:has(input:invalid:not(:placeholder-shown))_input]:border-destructive",
        "[&:has(input:invalid:not(:placeholder-shown))_input]:ring-destructive/20",
        className,
      )}
    >
      {children}
      <p className="field-error mt-1.5 hidden text-sm text-destructive">
        {errorMessage}
      </p>
      <p className="field-success mt-1.5 hidden text-sm text-green-600">
        {successMessage}
      </p>
    </div>
  )
}

interface SmartFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode
}

/**
 * Smart Form
 *
 * Container for SmartFormField components with
 * CSS-only validation states.
 */
export function SmartForm({ children, className, ...props }: SmartFormProps) {
  return (
    <form
      className={cn(
        "space-y-4",
        // Form-level valid state
        "[&:has(:invalid)_.submit-btn]:opacity-50",
        "[&:has(:invalid)_.submit-btn]:cursor-not-allowed",
        className,
      )}
      {...props}
    >
      {children}
    </form>
  )
}
