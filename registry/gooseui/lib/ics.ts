export type IcsDateInput = Date | string | number

export type IcsReminder = {
  /** How long before the start to remind, in minutes. */
  minutesBefore: number
  /** Text of the notification. Defaults to the event title. */
  description?: string
}

export type CalendarEvent = {
  title: string
  start: IcsDateInput
  /** End of the event, or the last day for `allDay`. Defaults to `start + duration`. */
  end?: IcsDateInput
  /** Length in minutes, used when `end` is missing. Defaults to 60. */
  duration?: number
  /** Whole-day event: only the date part of `start` and `end` counts. */
  allDay?: boolean
  description?: string
  location?: string
  url?: string
  /** Stable id. Reuse it to update or cancel the same event later. */
  uid?: string
  /** Minutes before the start, or a reminder object. */
  reminder?: number | IcsReminder
  /** Revision number. Bump it on every change to an already sent event. */
  sequence?: number
  /** Marks the event as cancelled (STATUS:CANCELLED). */
  cancelled?: boolean
}

export type IcsMethod = "PUBLISH" | "REQUEST" | "CANCEL"

export type BuildIcsOptions = {
  /** Defaults to CANCEL when every event is cancelled, otherwise PUBLISH. */
  method?: IcsMethod
  prodId?: string
  /** Calendar name shown by some apps (X-WR-CALNAME). */
  name?: string
  /** Value for DTSTAMP. Defaults to now. */
  stamp?: Date
}

const CRLF = "\r\n"
const encoder = new TextEncoder()

/** Escapes a TEXT value: backslash, semicolon, comma and line breaks. */
export function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r\n|\r|\n/g, "\\n")
}

/**
 * Folds a content line longer than 75 octets (RFC 5545, 3.1).
 * Counts UTF-8 bytes and never splits a character.
 */
export function foldIcsLine(line: string): string {
  if (encoder.encode(line).length <= 75) return line
  const parts: string[] = []
  let current = ""
  let size = 0
  let limit = 75
  for (const char of line) {
    const bytes = encoder.encode(char).length
    if (size + bytes > limit) {
      parts.push(current)
      current = ""
      size = 0
      // Continuation lines start with a space, which counts toward the limit.
      limit = 74
    }
    current += char
    size += bytes
  }
  parts.push(current)
  return parts.join(`${CRLF} `)
}

function toDate(input: IcsDateInput): Date {
  // A bare "YYYY-MM-DD" is parsed as UTC midnight by Date, which lands on the
  // previous day west of UTC. Read it as a local calendar date instead.
  const day =
    typeof input === "string" ? /^(\d{4})-(\d{2})-(\d{2})$/.exec(input) : null
  const date = day
    ? new Date(Number(day[1]), Number(day[2]) - 1, Number(day[3]))
    : input instanceof Date
      ? new Date(input.getTime())
      : new Date(input)
  if (Number.isNaN(date.getTime())) {
    throw new RangeError(`Invalid event date: ${String(input)}`)
  }
  return date
}

const pad = (value: number) => String(value).padStart(2, "0")

/** UTC timestamp like 20250314T093000Z. */
export function formatIcsDate(input: IcsDateInput): string {
  return toDate(input)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "")
}

/** Calendar date like 20250314, taken in local time. */
export function formatIcsDay(input: IcsDateInput): string {
  const date = toDate(input)
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`
}

/** Start and end of the event, with the defaults applied. */
export function resolveEventRange(event: CalendarEvent): {
  start: Date
  end: Date
} {
  const start = toDate(event.start)
  if (event.allDay) {
    start.setHours(0, 0, 0, 0)
    const last = event.end ? toDate(event.end) : new Date(start)
    last.setHours(0, 0, 0, 0)
    // `end` is the last day; DTEND of a whole-day event is exclusive.
    const end = new Date(last > start ? last : start)
    end.setDate(end.getDate() + 1)
    return { start, end }
  }
  const end = event.end
    ? toDate(event.end)
    : new Date(start.getTime() + (event.duration ?? 60) * 60_000)
  return { start, end: end > start ? end : new Date(start.getTime() + 60_000) }
}

function createUid() {
  const random =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`
  return `${random}@calendar-event`
}

function eventLines(event: CalendarEvent, stamp: string): string[] {
  const { start, end } = resolveEventRange(event)
  const lines = [
    "BEGIN:VEVENT",
    `UID:${event.uid ?? createUid()}`,
    `DTSTAMP:${stamp}`,
  ]

  if (event.allDay) {
    lines.push(
      `DTSTART;VALUE=DATE:${formatIcsDay(start)}`,
      `DTEND;VALUE=DATE:${formatIcsDay(end)}`,
    )
  } else {
    lines.push(`DTSTART:${formatIcsDate(start)}`, `DTEND:${formatIcsDate(end)}`)
  }

  // A cancellation must outrank the original, which defaults to SEQUENCE:0.
  const sequence = event.sequence ?? (event.cancelled ? 1 : 0)
  if (sequence > 0) lines.push(`SEQUENCE:${sequence}`)
  if (event.cancelled) lines.push("STATUS:CANCELLED")

  lines.push(`SUMMARY:${escapeIcsText(event.title)}`)
  if (event.description)
    lines.push(`DESCRIPTION:${escapeIcsText(event.description)}`)
  if (event.location) lines.push(`LOCATION:${escapeIcsText(event.location)}`)
  if (event.url) lines.push(`URL:${event.url}`)

  if (event.reminder !== undefined && !event.cancelled) {
    const reminder =
      typeof event.reminder === "number"
        ? { minutesBefore: event.reminder }
        : event.reminder
    const minutes = Math.max(0, Math.round(reminder.minutesBefore))
    lines.push(
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      `TRIGGER:-PT${minutes}M`,
      `DESCRIPTION:${escapeIcsText(reminder.description ?? event.title)}`,
      "END:VALARM",
    )
  }

  lines.push("END:VEVENT")
  return lines
}

/** Builds an iCalendar (.ics) file with one or more events. */
export function buildIcs(
  events: CalendarEvent | readonly CalendarEvent[],
  {
    method,
    prodId = "-//GooseUI//Add to Calendar//EN",
    name,
    stamp = new Date(),
  }: BuildIcsOptions = {},
): string {
  const list: readonly CalendarEvent[] = Array.isArray(events)
    ? events
    : [events as CalendarEvent]
  const resolvedMethod =
    method ??
    (list.length > 0 && list.every((event) => event.cancelled)
      ? "CANCEL"
      : "PUBLISH")
  const dtstamp = formatIcsDate(stamp)

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:${prodId}`,
    "CALSCALE:GREGORIAN",
    `METHOD:${resolvedMethod}`,
    ...(name ? [`X-WR-CALNAME:${escapeIcsText(name)}`] : []),
    ...list.flatMap((event) => eventLines(event, dtstamp)),
    "END:VCALENDAR",
  ]
  return lines.map(foldIcsLine).join(CRLF) + CRLF
}

function googleDates(event: CalendarEvent) {
  const { start, end } = resolveEventRange(event)
  return event.allDay
    ? `${formatIcsDay(start)}/${formatIcsDay(end)}`
    : `${formatIcsDate(start)}/${formatIcsDate(end)}`
}

/** Link that opens a prefilled event in Google Calendar. */
export function googleCalendarUrl(event: CalendarEvent): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: googleDates(event),
  })
  const details = [event.description, event.url].filter(Boolean).join("\n\n")
  if (details) params.set("details", details)
  if (event.location) params.set("location", event.location)
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function isoDay(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function isoUtc(date: Date) {
  return date.toISOString().replace(/\.\d{3}Z$/, "Z")
}

/**
 * Link that opens a prefilled event in Outlook on the web.
 * `office` targets work and school accounts (Microsoft 365).
 */
export function outlookCalendarUrl(
  event: CalendarEvent,
  account: "personal" | "office" = "personal",
): string {
  const { start, end } = resolveEventRange(event)
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: event.title,
    startdt: event.allDay ? isoDay(start) : isoUtc(start),
    enddt: event.allDay ? isoDay(end) : isoUtc(end),
  })
  if (event.allDay) params.set("allday", "true")
  const body = [event.description, event.url].filter(Boolean).join("\n\n")
  if (body) params.set("body", body)
  if (event.location) params.set("location", event.location)
  const host = account === "office" ? "outlook.office.com" : "outlook.live.com"
  return `https://${host}/calendar/0/deeplink/compose?${params.toString()}`
}
