"use client"

import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Button } from "@/registry/gooseui/ui/button"
import { StatCounter } from "@/registry/gooseui/ui/stat-counter"

const en = {
  numberLocale: "en-US",
  users: "Active users",
  uptime: "Uptime",
  rating: "Average rating",
  revenue: "Monthly revenue",
  downloads: "Downloads",
  orders: "Orders today",
  replay: "Replay",
  windowTitle: "Our numbers",
  windowIntro:
    "Scroll the window down. The counters below start from zero and finish as they come fully into view.",
  windowOutro:
    "Scroll back up and they count down again: the number follows the scroll position, not the clock.",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    numberLocale: "ru-RU",
    users: "Активных пользователей",
    uptime: "Время работы",
    rating: "Средняя оценка",
    revenue: "Выручка за месяц",
    downloads: "Скачиваний",
    orders: "Заказов сегодня",
    replay: "Повторить",
    windowTitle: "Наши цифры",
    windowIntro:
      "Прокрутите окно вниз. Счётчики ниже стартуют с нуля и заканчивают, когда полностью въехали в видимую область.",
    windowOutro:
      "Прокрутите обратно, и они отсчитают назад: число идёт за положением прокрутки, а не за часами.",
  },
}

type DemoProps = { locale: Locale }

export function StatCounterPreviewDemo({ locale }: DemoProps) {
  const t = content[locale]
  const stats = [
    { value: 12400, suffix: "+", label: t.users },
    { value: 99.9, decimals: 1, suffix: "%", label: t.uptime },
    { value: 4.9, decimals: 1, label: t.rating },
    { value: 12000, suffix: "+", label: t.downloads },
  ]
  return (
    <div
      data-stat-window=""
      className="h-80 w-full max-w-3xl overflow-y-auto rounded-lg border bg-background"
    >
      <div className="space-y-3 px-6 pt-8 pb-72">
        <h3 className="text-xl font-semibold">{t.windowTitle}</h3>
        <p className="text-sm text-muted-foreground">{t.windowIntro}</p>
      </div>
      <div className="grid grid-cols-2 gap-6 px-6 py-6 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <StatCounter
              trigger="scroll"
              value={s.value}
              decimals={s.decimals}
              suffix={s.suffix}
              locale={t.numberLocale}
              className="text-3xl font-bold text-primary"
            />
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
      <p className="px-6 pt-40 pb-12 text-sm text-muted-foreground">
        {t.windowOutro}
      </p>
    </div>
  )
}

export function StatCounterFormatDemo({ locale }: DemoProps) {
  const t = content[locale]
  return (
    <div className="grid gap-6 text-center sm:grid-cols-2">
      <div>
        <StatCounter
          value={84250}
          locale={t.numberLocale}
          formatOptions={{
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 0,
          }}
          className="text-3xl font-bold"
        />
        <div className="mt-1 text-sm text-muted-foreground">{t.revenue}</div>
      </div>
      <div>
        <StatCounter
          value={2400000}
          locale={t.numberLocale}
          formatOptions={{ notation: "compact", maximumFractionDigits: 1 }}
          className="text-3xl font-bold"
        />
        <div className="mt-1 text-sm text-muted-foreground">{t.downloads}</div>
      </div>
    </div>
  )
}

export function StatCounterRepeatDemo({ locale }: DemoProps) {
  const t = content[locale]
  const [run, setRun] = React.useState(0)
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <StatCounter
          key={run}
          trigger="mount"
          value={1284}
          locale={t.numberLocale}
          className="text-4xl font-bold"
        />
        <div className="mt-1 text-sm text-muted-foreground">{t.orders}</div>
      </div>
      <Button variant="outline" size="sm" onClick={() => setRun((n) => n + 1)}>
        {t.replay}
      </Button>
    </div>
  )
}
