"use client"

import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { customToast } from "@/lib/toast"
import {
  BookingCalendar,
  type BookingCalendarLabels,
} from "@/registry/gooseui/ui/booking-calendar"
import { buildSlots, RU_LABELS } from "./demo-slots"

const en = {
  intl: "en-US",
  booked: "Booked",
  note: "Times are shown in your local time zone",
  rangeNote: "Booking is open for the next two weeks",
  labels: undefined as Partial<BookingCalendarLabels> | undefined,
}

const content: Dict<typeof en> = {
  en,
  ru: {
    intl: "ru-RU",
    booked: "Вы записаны",
    note: "Время указано по вашему часовому поясу",
    rangeNote: "Запись открыта на ближайшие две недели",
    labels: RU_LABELS,
  },
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function useDemo() {
  const t = content[useLocale() as Locale]
  const onBook = async (date: string, time: string) => {
    await wait(1200)
    customToast.success(t.booked, { description: `${date} · ${time}` })
  }
  return { t, onBook }
}

export function BookingCalendarDemo() {
  const { t, onBook } = useDemo()
  const [slots] = React.useState(() => buildSlots(60))
  const [today] = React.useState(() => new Date())
  return (
    <BookingCalendar
      className="max-w-2xl"
      slots={slots}
      locale={t.intl}
      minDate={today}
      note={t.note}
      labels={t.labels}
      onBook={onBook}
    />
  )
}

export function BookingCalendarSundayDemo() {
  const { t, onBook } = useDemo()
  const [slots] = React.useState(() => buildSlots(60))
  return (
    <BookingCalendar
      className="max-w-2xl"
      slots={slots}
      locale="en-US"
      weekStartsOn={0}
      labels={t.labels}
      onBook={onBook}
    />
  )
}

export function BookingCalendarRangeDemo() {
  const { t, onBook } = useDemo()
  const [range] = React.useState(() => {
    const now = new Date()
    const max = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14)
    return { min: now, max }
  })
  const [slots] = React.useState(() => buildSlots(14))
  return (
    <BookingCalendar
      className="max-w-sm"
      slots={slots}
      locale={t.intl}
      minDate={range.min}
      maxDate={range.max}
      note={t.rangeNote}
      labels={t.labels}
      onBook={onBook}
    />
  )
}

export function BookingCalendarErrorDemo() {
  const { t } = useDemo()
  const [slots] = React.useState(() => buildSlots(30))
  return (
    <BookingCalendar
      className="max-w-2xl"
      slots={slots}
      locale={t.intl}
      labels={t.labels}
      onBook={async () => {
        await wait(900)
        throw new Error("Slot taken")
      }}
    />
  )
}
