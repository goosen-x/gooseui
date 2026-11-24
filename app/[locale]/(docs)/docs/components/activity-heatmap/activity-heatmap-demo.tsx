import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  type ActivityDay,
  ActivityHeatmap,
} from "@/registry/gooseui/ui/activity-heatmap"

const en = {
  dateLocale: "en-US",
  less: "Less",
  more: "More",
  grid: "Activity over the year",
  total: (n: number) =>
    `${n.toLocaleString("en-US")} activities in the last year`,
  workouts: "Workouts",
  cell: (count: number, date: string) =>
    `${count === 0 ? "No" : count} ${count === 1 ? "activity" : "activities"} on ${date}`,
  workoutCell: (count: number, date: string) =>
    count === 0 ? `Rest day, ${date}` : `${count} min of training, ${date}`,
  clicked: (date: string, count: number) => `${date}: ${count}`,
}

const ruPlural = (n: number, one: string, few: string, many: string) => {
  const m10 = n % 10
  const m100 = n % 100
  if (m10 === 1 && m100 !== 11) return one
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few
  return many
}

export const content: Dict<typeof en> = {
  en,
  ru: {
    dateLocale: "ru-RU",
    less: "Меньше",
    more: "Больше",
    grid: "Активность за год",
    total: (n) =>
      `${n.toLocaleString("ru-RU")} ${ruPlural(n, "действие", "действия", "действий")} за последний год`,
    workouts: "Тренировки",
    cell: (count, date) =>
      count === 0
        ? `${date}: ничего`
        : `${date}: ${count} ${ruPlural(count, "действие", "действия", "действий")}`,
    workoutCell: (count, date) =>
      count === 0 ? `${date}: отдых` : `${date}: ${count} мин тренировки`,
    clicked: (date, count) => `${date}: ${count}`,
  },
}

function useT() {
  return content[useLocale() as Locale]
}

// Deterministic pseudo-random data, so server and client render the same grid
function makeData(
  fromKey: string,
  days: number,
  seed: number,
  scale: number,
): ActivityDay[] {
  let s = seed
  const rnd = () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
  const start = Date.parse(`${fromKey}T00:00:00Z`)
  const out: ActivityDay[] = []
  for (let i = 0; i < days; i++) {
    const d = new Date(start + i * 86_400_000)
    const weekend = d.getUTCDay() === 0 || d.getUTCDay() === 6
    const r = rnd()
    const busy = 0.5 + 0.5 * Math.sin(i / 23)
    const count = r < (weekend ? 0.6 : 0.2) ? 0 : Math.round(r * busy * scale)
    out.push({ date: d.toISOString().slice(0, 10), count })
  }
  return out
}

export const QUARTER = makeData("2026-06-01", 92, 21, 90)
const YEAR = makeData("2025-11-23", 365, 7, 12)
export function ActivityHeatmapPreviewDemo() {
  const t = useT()
  const total = YEAR.reduce((sum, d) => sum + d.count, 0)
  return (
    <div className="w-full max-w-3xl space-y-3 px-4">
      <p className="text-sm font-medium">{t.total(total)}</p>
      <ActivityHeatmap
        data={YEAR}
        from="2025-11-23"
        to="2026-11-22"
        locale={t.dateLocale}
        labels={{ less: t.less, more: t.more, grid: t.grid, cell: t.cell }}
      />
    </div>
  )
}

export function ActivityHeatmapLevelsDemo() {
  const t = useT()
  const data = makeData("2026-05-25", 182, 3, 12)
  return (
    <div className="w-full max-w-md px-4">
      <ActivityHeatmap
        data={data}
        from="2026-05-25"
        to="2026-11-22"
        showWeekdays={false}
        locale={t.dateLocale}
        getLevel={(count) =>
          count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 9 ? 3 : 4
        }
        labels={{ less: t.less, more: t.more, grid: t.grid, cell: t.cell }}
      />
    </div>
  )
}
