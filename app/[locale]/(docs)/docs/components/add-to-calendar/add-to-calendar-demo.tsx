import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import type { CalendarEvent } from "@/registry/gooseui/lib/ics"
import {
  AddToCalendar,
  type AddToCalendarLabels,
} from "@/registry/gooseui/ui/add-to-calendar"

const en = {
  event: {
    title: "Design systems meetup",
    description: "Talks about tokens, theming and docs. Doors open at 18:30.",
    location: "Main hall, 12 Example Street",
  },
  workshop: "Accessibility workshop",
  holiday: "Team offsite",
  date: "Thu, April 15 · 19:00–21:00 local time",
  labels: null as Partial<AddToCalendarLabels> | null,
}

const content: Dict<typeof en> = {
  en,
  ru: {
    event: {
      title: "Митап по дизайн-системам",
      description: "Доклады про токены, темы и документацию. Сбор с 18:30.",
      location: "Большой зал, ул. Примерная, 12",
    },
    workshop: "Воркшоп по доступности",
    holiday: "Выезд команды",
    date: "Чт, 15 апреля · 19:00–21:00 по местному времени",
    labels: {
      trigger: "В календарь",
      apple: "Apple Календарь",
      ics: "Другой календарь (.ics)",
    },
  },
}

const START = "2027-04-15T19:00:00"

type DemoProps = { locale: Locale }

function demo(locale: Locale) {
  const t = content[locale]
  return { t, labels: t.labels ?? undefined }
}

export function AddToCalendarDemo({ locale }: DemoProps) {
  const { t, labels } = demo(locale)
  const event: CalendarEvent = {
    uid: "design-systems-meetup-2027@example.com",
    title: t.event.title,
    description: t.event.description,
    location: t.event.location,
    url: "https://example.com/meetup",
    start: START,
    duration: 120,
    reminder: 60,
  }

  return (
    <div className="flex flex-col items-center gap-4 px-4 text-center">
      <div className="rounded-lg border bg-card px-6 py-4">
        <div className="font-medium">{t.event.title}</div>
        <div className="mt-1 text-sm text-muted-foreground">{t.date}</div>
      </div>
      <AddToCalendar event={event} labels={labels} />
    </div>
  )
}

export function AddToCalendarOutlineDemo({ locale }: DemoProps) {
  const { t, labels } = demo(locale)
  return (
    <AddToCalendar
      event={{ title: t.workshop, start: START, duration: 90 }}
      providers={["google", "apple", "outlook", "office365", "ics"]}
      variant="outline"
      size="sm"
      labels={labels}
    />
  )
}

export function AddToCalendarAllDayDemo({ locale }: DemoProps) {
  const { t, labels } = demo(locale)
  return (
    <AddToCalendar
      event={{
        title: t.holiday,
        start: "2027-06-10",
        end: "2027-06-11",
        allDay: true,
      }}
      providers={["google", "ics"]}
      variant="outline"
      labels={labels}
    />
  )
}
