"use client"

import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Rating } from "@/registry/gooseui/ui/rating"
import { RatingBreakdown } from "@/registry/gooseui/ui/rating-breakdown"

const en = {
  total: (n: number) => `${n.toLocaleString("en-US")} ratings`,
  row: (score: number, count: number, percent: number) =>
    `Score ${score}: ${count} (${Math.round(percent)}%)`,
  summary: (avg: number, max: number) =>
    `Average ${avg.toFixed(1)} out of ${max}`,
  rate: "Add your rating",
  votes: (n: number) => `${n} votes`,
}

const content: Dict<typeof en> = {
  en,
  ru: {
    total: (n: number) => `Оценок: ${n.toLocaleString("ru-RU")}`,
    row: (score: number, count: number, percent: number) =>
      `Оценка ${score}: ${count} (${Math.round(percent)}%)`,
    summary: (avg: number, max: number) =>
      `Средняя оценка ${avg.toFixed(1).replace(".", ",")} из ${max}`,
    rate: "Поставьте свою оценку",
    votes: (n: number) => `Голосов: ${n}`,
  },
}

function useT() {
  return content[useLocale() as Locale]
}

export function RatingBreakdownPreviewDemo() {
  const t = useT()
  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-6 px-4">
      <RatingBreakdown
        counts={{ 5: 812, 4: 264, 3: 91, 2: 38, 1: 54 }}
        labels={{ total: t.total, row: t.row, summary: t.summary }}
      />
    </div>
  )
}

export function RatingBreakdownLiveDemo() {
  const t = useT()
  const [counts, setCounts] = React.useState([1, 2, 4, 9, 14])
  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-6 px-4">
      <RatingBreakdown
        counts={counts}
        animate={false}
        labels={{ total: t.total, row: t.row, summary: t.summary }}
      />
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-muted-foreground">{t.rate}</span>
        <Rating
          value={null}
          onValueChange={(v) => {
            if (!v) return
            setCounts((prev) => prev.map((c, i) => (i === v - 1 ? c + 1 : c)))
          }}
        />
      </div>
    </div>
  )
}

export function RatingBreakdownTenDemo() {
  const t = useT()
  return (
    <div className="w-full max-w-lg px-4">
      <RatingBreakdown
        counts={[0, 1, 1, 2, 4, 7, 12, 18, 9, 5]}
        shape="sparkle"
        formatAverage={(avg) => `${avg.toFixed(1)}/10`}
        labels={{ total: t.votes, row: t.row, summary: t.summary }}
        className="[&_ul]:gap-1"
      />
    </div>
  )
}
