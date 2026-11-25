import * as React from "react"

import { cn } from "@/lib/utils"
import { BookingCalendarSubmit } from "@/registry/gooseui/ui/booking-calendar.client"

/** Free times per day: `{ "2026-03-14": ["10:00", "11:30"] }` */
export type BookingSlots = Record<string, string[]>

export type BookingCalendarLabels = {
  previousMonth: string
  nextMonth: string
  timeHeading: string
  selectDay: string
  noTimes: string
  unavailable: string
  book: string
  booking: string
  error: string
}

const DEFAULT_LABELS: BookingCalendarLabels = {
  previousMonth: "Previous month",
  nextMonth: "Next month",
  timeHeading: "Available times",
  selectDay: "Pick a highlighted day to see free times.",
  noTimes: "No free times on this day.",
  unavailable: "no free times",
  book: "Book",
  booking: "Booking…",
  error: "Could not book this time. Please try again.",
}

export type BookingCalendarProps = Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange"
> & {
  /** Free times keyed by "YYYY-MM-DD" */
  slots: BookingSlots
  /** Called with the chosen day and time. May return a promise. Loads a small client island */
  onBook?: (date: string, time: string) => void | Promise<void>
  /** Called when the selected day changes. Loads a small client island */
  onDateChange?: (date: string) => void
  /** Form field name of the day radios */
  name?: string
  /** Form field name of the time radios */
  timeName?: string
  /** BCP 47 locale for month and weekday names */
  locale?: string
  /** First day of the week: 0 = Sunday, 1 = Monday */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  /** Earliest bookable day, "YYYY-MM-DD" or Date */
  minDate?: string | Date
  /** Latest bookable day, "YYYY-MM-DD" or Date */
  maxDate?: string | Date
  /** Day selected on first render */
  defaultDate?: string
  /** Format a time string for display */
  formatTime?: (time: string) => string
  /** Small note under the time heading, e.g. a time zone */
  note?: React.ReactNode
  labels?: Partial<BookingCalendarLabels>
}

const pad = (n: number) => String(n).padStart(2, "0")
const toKey = (y: number, m: number, d: number) =>
  `${y}-${pad(m + 1)}-${pad(d)}`
const utc = (key: string) => {
  const [y, m, d] = key.split("-").map(Number)
  return new Date(Date.UTC(y, m - 1, d))
}
const daysIn = (y: number, m: number) =>
  new Date(Date.UTC(y, m + 1, 0)).getUTCDate()
const toDayKey = (value: string | Date | undefined) => {
  if (value === undefined) return undefined
  if (typeof value === "string") return value.slice(0, 10)
  return toKey(value.getFullYear(), value.getMonth(), value.getDate())
}
// Months are counted as y * 12 + m
const monthOf = (key: string) => {
  const [y, m] = key.split("-").map(Number)
  return y * 12 + m - 1
}

const CSS = `
.gbc-month{display:none}
.gbc-mr:checked+.gbc-month{display:block}
.gbc-mr:focus-visible+.gbc-month .gbc-title{outline:2px solid var(--ring);outline-offset:3px;border-radius:4px}
.gbc-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));grid-template-rows:auto auto repeat(var(--gbc-weeks),auto);gap:2px;align-items:start}
.gbc-head{grid-column:1/-1;grid-row:1}
.gbc-wd{grid-row:2}
.gbc-side{grid-column:1/-1;order:1;margin-top:.75rem;padding-top:.75rem;border-top:1px solid var(--border)}
.gbc-times,.gbc-empty{grid-column:1/-1;order:2;margin-top:.5rem}
.gbc-times{display:none;flex-wrap:wrap;gap:.5rem}
.gbc-di:checked+.gbc-day+.gbc-times{display:flex}
.gbc-grid:has(.gbc-di:checked) .gbc-empty{display:none}
.gbc-di:checked+.gbc-day{background:var(--primary);color:var(--primary-foreground);text-decoration:none}
.gbc-di:focus-visible+.gbc-day{box-shadow:0 0 0 3px color-mix(in oklab,var(--ring) 50%,transparent)}
.gbc:not(:has(.gbc-di:checked+.gbc-day+.gbc-times input:checked)) .gbc-book{opacity:.5;pointer-events:none}
@keyframes gooseui-booking-calendar-day{from{transform:scale(.85);opacity:.6}to{transform:scale(1);opacity:1}}
@keyframes gooseui-booking-calendar-rise{from{opacity:0;transform:translateY(.25rem)}to{opacity:1;transform:translateY(0)}}
@keyframes gooseui-booking-calendar-slot{from{transform:scale(.96)}to{transform:scale(1)}}
@keyframes gooseui-booking-calendar-title{from{opacity:0}to{opacity:1}}
@keyframes gooseui-booking-calendar-error{from{opacity:0;transform:translateY(-.25rem)}to{opacity:1;transform:translateY(0)}}
@keyframes gooseui-booking-calendar-spin{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion:no-preference){
.gbc-day{transition:background-color 120ms,color 120ms}
.gbc-di:checked+.gbc-day{animation:gooseui-booking-calendar-day 180ms cubic-bezier(.2,0,0,1)}
.gbc-mr:checked+.gbc-month .gbc-grid{animation:gooseui-booking-calendar-rise 200ms ease}
.gbc-mr:checked+.gbc-month .gbc-title{animation:gooseui-booking-calendar-title 150ms ease}
.gbc-times>div{animation:gooseui-booking-calendar-rise 160ms ease backwards;animation-delay:calc(var(--i) * 30ms)}
.gbc-time{transition:background-color 120ms,border-color 120ms,color 120ms}
.gbc-time:has(input:checked){animation:gooseui-booking-calendar-slot 140ms ease}
.gbc-book{transition:opacity 200ms,background-color 200ms}
.gbc-book-state{transition:opacity 150ms}
.gbc-spinner{animation:gooseui-booking-calendar-spin 700ms linear infinite}
.gbc-error{animation:gooseui-booking-calendar-error 180ms ease}
}
@media (prefers-reduced-motion:reduce){
.gbc .gbc-day,.gbc .gbc-time,.gbc .gbc-book,.gbc .gbc-book-state{transition:none}
}
@container (min-width:36rem){
.gbc-grid{grid-template-columns:repeat(7,2.5rem) minmax(0,1fr)}
.gbc-head{grid-column:1/8}
.gbc-side{grid-column:8;grid-row:1/3;order:0;margin:0 0 0 1.5rem;padding:0;border:0}
.gbc-times,.gbc-empty{grid-column:8;grid-row:3/-1;margin:0 0 0 1.5rem;align-content:start}
}
`

function Chevron({ left }: { left?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4"
    >
      <path d={left ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </svg>
  )
}

const navClass =
  "inline-flex size-8 items-center justify-center rounded-md text-muted-foreground"

/**
 * Server-rendered month grid. Day and time are native radio inputs, months
 * switch through hidden radios and :checked, the times of the checked day are
 * shown with a sibling selector. JavaScript is loaded only for onBook and
 * onDateChange.
 */
function BookingCalendar({
  slots,
  onBook,
  onDateChange,
  name = "date",
  timeName = "time",
  locale = "en-US",
  weekStartsOn = 1,
  minDate,
  maxDate,
  defaultDate,
  formatTime = (t) => t,
  note,
  labels: labelsProp,
  className,
  ...props
}: BookingCalendarProps) {
  const labels = { ...DEFAULT_LABELS, ...labelsProp }
  const min = toDayKey(minDate)
  const max = toDayKey(maxDate)
  const uid = React.useId()
  const todayKey = toDayKey(new Date()) as string

  const isOpen = (key: string) =>
    (slots[key]?.length ?? 0) > 0 &&
    (!min || key >= min) &&
    (!max || key <= max)
  const openKeys = Object.keys(slots).filter(isOpen).sort()

  const first = min ?? openKeys[0] ?? defaultDate ?? todayKey
  const startMonth = monthOf(first)
  const endMonth = Math.min(
    startMonth + 23,
    Math.max(startMonth, monthOf(max ?? openKeys.at(-1) ?? first)),
  )
  const initialMonth = monthOf(defaultDate ?? openKeys[0] ?? first)

  const fmt = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(locale, { ...options, timeZone: "UTC" })
  const monthFormat = fmt({ month: "long", year: "numeric" })
  const dayFormat = fmt({
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
  const weekdayShort = fmt({ weekday: "short" })
  const weekdayLong = fmt({ weekday: "long" })

  // 2023-01-01 is a Sunday
  const weekdays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(Date.UTC(2023, 0, 1 + ((weekStartsOn + i) % 7)))
    return { short: weekdayShort.format(date), long: weekdayLong.format(date) }
  })

  const monthId = (index: number) => `${uid}-m${index}`
  const months = Array.from(
    { length: endMonth - startMonth + 1 },
    (_, i) => startMonth + i,
  )

  return (
    <div
      data-slot="booking-calendar"
      className={cn(
        "gbc @container w-full rounded-xl border bg-card p-3 text-card-foreground @xl:p-4",
        className,
      )}
      {...props}
    >
      <style href="gooseui-booking-calendar" precedence="default">
        {CSS}
      </style>
      {months.map((month, index) => {
        const y = Math.floor(month / 12)
        const m = month % 12
        const title = monthFormat.format(new Date(Date.UTC(y, m, 1)))
        const offset =
          (new Date(Date.UTC(y, m, 1)).getUTCDay() - weekStartsOn + 7) % 7
        const count = daysIn(y, m)
        const weeks = Math.ceil((offset + count) / 7)
        const titleId = `${monthId(index)}-title`
        return (
          <React.Fragment key={month}>
            <input
              type="radio"
              id={monthId(index)}
              name={`${uid}-month`}
              // Points to no form, so the month never lands in FormData
              form={`${uid}-none`}
              aria-label={title}
              defaultChecked={month === initialMonth}
              className="gbc-mr sr-only"
            />
            <section
              aria-labelledby={titleId}
              className="gbc-month"
              style={{ "--gbc-weeks": weeks } as React.CSSProperties}
            >
              <div className="gbc-grid">
                <div className="gbc-head mb-2 flex items-center justify-between gap-2">
                  {index > 0 ? (
                    <label
                      htmlFor={monthId(index - 1)}
                      className={cn(
                        navClass,
                        "cursor-pointer select-none transition-colors hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      <Chevron left />
                      <span className="sr-only">{labels.previousMonth}</span>
                    </label>
                  ) : (
                    <span className={cn(navClass, "opacity-40")}>
                      <Chevron left />
                    </span>
                  )}
                  <h3
                    id={titleId}
                    className="gbc-title text-sm font-medium capitalize"
                  >
                    {title}
                  </h3>
                  {index < months.length - 1 ? (
                    <label
                      htmlFor={monthId(index + 1)}
                      className={cn(
                        navClass,
                        "cursor-pointer select-none transition-colors hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      <Chevron />
                      <span className="sr-only">{labels.nextMonth}</span>
                    </label>
                  ) : (
                    <span className={cn(navClass, "opacity-40")}>
                      <Chevron />
                    </span>
                  )}
                </div>

                {weekdays.map((w, i) => (
                  <abbr
                    key={w.long}
                    title={w.long}
                    aria-hidden="true"
                    style={{ gridColumn: i + 1 }}
                    className="gbc-wd pb-1 text-center text-xs font-medium text-muted-foreground no-underline"
                  >
                    {w.short}
                  </abbr>
                ))}

                {Array.from({ length: count }, (_, i) => {
                  const key = toKey(y, m, i + 1)
                  const column = ((offset + i) % 7) + 1
                  const label = dayFormat.format(utc(key))
                  const today = key === todayKey
                  if (!isOpen(key)) {
                    return (
                      <span
                        key={key}
                        style={{ gridColumn: column }}
                        className={cn(
                          "mx-auto flex size-9 items-center justify-center text-sm text-muted-foreground/40 tabular-nums",
                          today && "underline underline-offset-4",
                        )}
                      >
                        <span aria-hidden="true">{i + 1}</span>
                        <span className="sr-only">
                          {label}, {labels.unavailable}
                        </span>
                      </span>
                    )
                  }
                  const times = slots[key] ?? []
                  const id = `${uid}-${key}`
                  return (
                    <React.Fragment key={key}>
                      <input
                        type="radio"
                        id={id}
                        name={name}
                        value={key}
                        data-day=""
                        aria-label={label}
                        aria-current={today ? "date" : undefined}
                        defaultChecked={key === defaultDate}
                        className="gbc-di sr-only"
                      />
                      <label
                        htmlFor={id}
                        style={{ gridColumn: column }}
                        className={cn(
                          "gbc-day mx-auto flex size-9 cursor-pointer select-none items-center justify-center rounded-full text-sm font-medium tabular-nums hover:bg-accent hover:text-accent-foreground",
                          today && "underline underline-offset-4",
                        )}
                      >
                        {i + 1}
                      </label>
                      <div
                        role="radiogroup"
                        aria-label={`${labels.timeHeading}: ${label}`}
                        className="gbc-times"
                      >
                        {times.map((time, timeIndex) => (
                          <div
                            key={time}
                            style={
                              {
                                "--i": Math.min(timeIndex, 7),
                              } as React.CSSProperties
                            }
                          >
                            <label className="gbc-time block cursor-pointer select-none rounded-md border px-3 py-1.5 text-sm tabular-nums not-has-checked:hover:bg-accent not-has-checked:hover:text-accent-foreground has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60 has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50">
                              <input
                                type="radio"
                                name={timeName}
                                value={time}
                                data-time=""
                                className="sr-only"
                              />
                              {formatTime(time)}
                            </label>
                          </div>
                        ))}
                      </div>
                    </React.Fragment>
                  )
                })}

                <div className="gbc-side">
                  <div className="text-sm font-medium">
                    {labels.timeHeading}
                  </div>
                  {note && (
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {note}
                    </div>
                  )}
                </div>
                <p className="gbc-empty text-sm text-muted-foreground">
                  {openKeys.length > 0 ? labels.selectDay : labels.noTimes}
                </p>
              </div>
            </section>
          </React.Fragment>
        )
      })}

      <div className="mt-4 flex justify-end border-t pt-3">
        {onBook || onDateChange ? (
          <BookingCalendarSubmit
            onBook={onBook}
            onDateChange={onDateChange}
            labels={labels}
            className={buttonClass}
          />
        ) : (
          <button type="submit" className={buttonClass}>
            {labels.book}
          </button>
        )}
      </div>
    </div>
  )
}

const buttonClass =
  "gbc-book relative inline-flex h-9 w-full cursor-pointer select-none items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs outline-none hover:bg-primary/90 focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 @xl:w-auto"

export { BookingCalendar }
