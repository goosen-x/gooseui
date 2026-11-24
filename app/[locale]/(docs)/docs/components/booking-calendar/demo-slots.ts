import type {
  BookingCalendarLabels,
  BookingSlots,
} from "@/registry/gooseui/ui/booking-calendar"

const pad = (n: number) => String(n).padStart(2, "0")
const keyOf = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

const TIMES = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00", "18:30"]

// Neutral demo data: weekdays only, a different set of times per day
export function buildSlots(days: number): BookingSlots {
  const slots: BookingSlots = {}
  const today = new Date()
  for (let i = 1; i <= days; i++) {
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + i,
    )
    const dow = date.getDay()
    if (dow === 0 || dow === 6 || date.getDate() % 5 === 0) continue
    slots[keyOf(date)] = TIMES.filter((_, t) => (t + date.getDate()) % 3 !== 0)
  }
  return slots
}

export const RU_LABELS: Partial<BookingCalendarLabels> = {
  previousMonth: "Предыдущий месяц",
  nextMonth: "Следующий месяц",
  timeHeading: "Свободное время",
  selectDay: "Выберите подсвеченный день, чтобы увидеть время.",
  noTimes: "В этот день свободного времени нет.",
  unavailable: "нет свободного времени",
  book: "Записаться",
  booking: "Записываем…",
  error: "Не получилось записаться. Попробуйте ещё раз.",
}
