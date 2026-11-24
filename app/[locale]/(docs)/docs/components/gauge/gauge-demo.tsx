"use client"

import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Button } from "@/registry/gooseui/ui/button"
import { Gauge, type GaugeThreshold } from "@/registry/gooseui/ui/gauge"

const en = {
  score: "Score",
  random: "Random value",
  low: "Low",
  medium: "Medium",
  high: "High",
  cpu: "CPU load",
  normal: "Normal",
  busy: "Busy",
  critical: "Critical",
  disk: "Disk usage",
  mood: "Market mood",
  fear: "Fear",
  neutral: "Neutral",
  greed: "Greed",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    score: "Оценка",
    random: "Случайное значение",
    low: "Низкий",
    medium: "Средний",
    high: "Высокий",
    cpu: "Нагрузка CPU",
    normal: "Норма",
    busy: "Высокая",
    critical: "Критично",
    disk: "Занято на диске",
    mood: "Настроение рынка",
    fear: "Страх",
    neutral: "Спокойно",
    greed: "Жадность",
  },
}

function useT() {
  return content[useLocale() as Locale]
}

export function GaugePreviewDemo() {
  const t = useT()
  const [value, setValue] = React.useState(72)
  // Red near zero, yellow in the middle, green near the top
  const thresholds: GaugeThreshold[] = [
    { from: 0, color: "oklch(0.63 0.23 27)", label: t.low },
    { from: 45, color: "oklch(0.82 0.17 85)", label: t.medium },
    { from: 85, color: "oklch(0.68 0.18 150)", label: t.high },
  ]
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-8 px-4">
      <Gauge value={value} label={t.score} thresholds={thresholds} showRange />
      <Gauge
        value={value}
        variant="bar"
        label={t.score}
        thresholds={thresholds}
        showRange
      />
      <Button
        variant="outline"
        onClick={() => setValue(Math.round(Math.random() * 100))}
      >
        {t.random}
      </Button>
    </div>
  )
}

export function GaugeThresholdsDemo() {
  const t = useT()
  const [value, setValue] = React.useState(58)
  React.useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (reduced) return
    const id = setInterval(() => {
      setValue((v) =>
        Math.max(5, Math.min(98, v + Math.round((Math.random() - 0.45) * 30))),
      )
    }, 1800)
    return () => clearInterval(id)
  }, [])
  return (
    <Gauge
      value={value}
      label={t.cpu}
      formatValue={(v) => `${Math.round(v)}%`}
      thresholds={[
        { from: 0, color: "var(--primary)", label: t.normal },
        {
          from: 60,
          color: "color-mix(in oklch, var(--destructive) 55%, var(--primary))",
          label: t.busy,
        },
        { from: 85, color: "var(--destructive)", label: t.critical },
      ]}
    />
  )
}

export function GaugeBarDemo() {
  const t = useT()
  return (
    <div className="w-full max-w-sm space-y-6 px-4">
      <Gauge
        variant="bar"
        value={23}
        label={t.mood}
        thickness={8}
        thresholds={[
          { from: 0, color: "var(--destructive)", label: t.fear },
          { from: 45, color: "var(--muted-foreground)", label: t.neutral },
          { from: 60, color: "var(--primary)", label: t.greed },
        ]}
      />
      <Gauge
        variant="bar"
        value={412}
        max={512}
        label={t.disk}
        showLevel={false}
        showRange
        formatValue={(v) => `${Math.round(v)} GB`}
        thresholds={[{ from: 0, color: "var(--primary)" }]}
      />
    </div>
  )
}

export function GaugeCompactDemo() {
  const t = useT()
  return (
    <div className="flex flex-wrap items-end justify-center gap-6">
      <Gauge
        value={32}
        thickness={10}
        showLevel={false}
        label={t.score}
        className="w-28"
      />
      <Gauge
        value={64}
        thickness={10}
        showLevel={false}
        label={t.score}
        className="w-28"
      />
      <Gauge
        value={91}
        thickness={10}
        showLevel={false}
        label={t.score}
        className="w-28"
      />
    </div>
  )
}
