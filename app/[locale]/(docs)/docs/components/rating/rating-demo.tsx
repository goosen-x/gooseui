"use client"

import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { customToast } from "@/lib/toast"
import { Button } from "@/registry/gooseui/ui/button"
import { Rating } from "@/registry/gooseui/ui/rating"

const en = {
  yourRating: "Your rating",
  notRated: "Not rated yet",
  of: "of",
  thanks: "Thanks for the rating",
  thanksText: (v: number) => `You picked ${v} of 5`,
  group: "Rate this article",
  item: (v: number, max: number) => `${v} of ${max}`,
  summary: (v: number, max: number) => `Rated ${v} out of ${max}`,
  reviews: "reviews",
  send: "Send",
  sent: "Form sent",
  clearHint: "Click the selected star again to clear",
  quality: "Quality",
  delivery: "Delivery",
  support: "Support",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    yourRating: "Ваша оценка",
    notRated: "Пока без оценки",
    of: "из",
    thanks: "Спасибо за оценку",
    thanksText: (v: number) => `Вы поставили ${v} из 5`,
    group: "Оцените статью",
    item: (v: number, max: number) => `${v} из ${max}`,
    summary: (v: number, max: number) => `Оценка ${v} из ${max}`,
    reviews: "отзывов",
    send: "Отправить",
    sent: "Форма отправлена",
    clearHint: "Повторный клик по выбранной звезде снимает оценку",
    quality: "Качество",
    delivery: "Доставка",
    support: "Поддержка",
  },
}

function useT() {
  return content[useLocale() as Locale]
}

export function RatingPreviewDemo() {
  const t = useT()
  const [value, setValue] = React.useState<number | null>(null)
  return (
    <div className="flex flex-col items-center gap-3">
      <Rating
        size="lg"
        value={value}
        onValueChange={(v) => {
          setValue(v)
          if (v) customToast.success(t.thanks, { description: t.thanksText(v) })
        }}
        labels={{ group: t.group, item: t.item }}
      />
      <p className="text-sm text-muted-foreground tabular-nums">
        {value ? `${t.yourRating}: ${value} ${t.of} 5` : t.notRated}
      </p>
    </div>
  )
}

export function RatingReadOnlyDemo() {
  const t = useT()
  const items = [
    { value: 4.7, count: 1284 },
    { value: 3.4, count: 96 },
    { value: 1.8, count: 12 },
  ]
  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <div key={item.value} className="flex items-center gap-3">
          <Rating readOnly value={item.value} labels={{ summary: t.summary }} />
          <span className="text-sm font-medium tabular-nums">
            {item.value.toFixed(1)}
          </span>
          <span className="text-sm text-muted-foreground">
            {item.count.toLocaleString("en-US")} {t.reviews}
          </span>
        </div>
      ))}
    </div>
  )
}

export function RatingShapesDemo() {
  const t = useT()
  return (
    <div className="flex flex-col items-center gap-4">
      <Rating
        shape="sparkle"
        defaultValue={3}
        size="lg"
        labels={{ item: t.item }}
      />
      <Rating
        shape="sparkle"
        max={10}
        defaultValue={7}
        size="sm"
        className="text-foreground"
        labels={{ item: t.item }}
      />
      <Rating
        readOnly
        shape="sparkle"
        value={3.5}
        labels={{ summary: t.summary }}
      />
    </div>
  )
}

export function RatingFormDemo() {
  const t = useT()
  return (
    <form
      className="flex w-full max-w-xs flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const parts = ["quality", "delivery", "support"].map(
          (key) => `${key}=${data.get(key) || "-"}`,
        )
        customToast.success(t.sent, { description: parts.join(", ") })
      }}
    >
      {(
        [
          ["quality", t.quality],
          ["delivery", t.delivery],
          ["support", t.support],
        ] as const
      ).map(([key, label]) => (
        <div key={key} className="flex items-center justify-between gap-4">
          <span className="text-sm">{label}</span>
          <Rating
            name={key}
            allowClear
            size="sm"
            labels={{ group: label, item: t.item }}
          />
        </div>
      ))}
      <p className="text-xs text-muted-foreground">{t.clearHint}</p>
      <Button type="submit" className="cursor-pointer">
        {t.send}
      </Button>
    </form>
  )
}
