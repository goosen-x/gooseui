"use client"

import * as React from "react"

type Labels = { book: string; booking: string; error: string }

/**
 * Book button island. Day, time and month selection work without it; this
 * only clears a time left over from another day, reports day changes and runs
 * onBook with a pending state.
 */
export function BookingCalendarSubmit({
  onBook,
  onDateChange,
  labels,
  className,
}: {
  onBook?: (date: string, time: string) => void | Promise<void>
  onDateChange?: (date: string) => void
  labels: Labels
  className?: string
}) {
  const ref = React.useRef<HTMLButtonElement>(null)
  const [error, setError] = React.useState(false)
  const [pending, startTransition] = React.useTransition()
  const onDateChangeRef = React.useRef(onDateChange)
  onDateChangeRef.current = onDateChange

  const root = () => ref.current?.closest('[data-slot="booking-calendar"]')
  const checked = (attr: string) =>
    root()?.querySelector<HTMLInputElement>(`input[${attr}]:checked`)

  React.useEffect(() => {
    const block = ref.current?.closest('[data-slot="booking-calendar"]')
    if (!block) return
    const onChange = (event: Event) => {
      const input = event.target as HTMLInputElement
      setError(false)
      if (!input.hasAttribute("data-day")) return
      for (const time of block.querySelectorAll<HTMLInputElement>(
        "input[data-time]:checked",
      ))
        time.checked = false
      onDateChangeRef.current?.(input.value)
    }
    block.addEventListener("change", onChange)
    return () => block.removeEventListener("change", onChange)
  }, [])

  const book = (event: React.MouseEvent) => {
    if (!onBook) return
    event.preventDefault()
    const date = checked("data-day")?.value
    const time = checked("data-time")
    if (!date || !time) return
    setError(false)
    startTransition(async () => {
      try {
        await onBook(date, time.value)
        time.checked = false
      } catch {
        setError(true)
      }
    })
  }

  return (
    <div className="flex w-full flex-col items-end gap-2">
      {error && (
        <p role="alert" className="gbc-error w-full text-sm text-destructive">
          {labels.error}
        </p>
      )}
      <button
        ref={ref}
        type="submit"
        onClick={book}
        disabled={pending}
        aria-busy={pending || undefined}
        className={className}
      >
        <span className="inline-grid place-items-center">
          <span
            className="gbc-book-state col-start-1 row-start-1"
            aria-hidden={pending}
            style={{ opacity: pending ? 0 : 1 }}
          >
            {labels.book}
          </span>
          <span
            className="gbc-book-state col-start-1 row-start-1 inline-flex items-center justify-center gap-2"
            style={{ opacity: pending ? 1 : 0 }}
            aria-hidden={!pending}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
              className="gbc-spinner size-4"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            {labels.booking}
          </span>
        </span>
      </button>
    </div>
  )
}
