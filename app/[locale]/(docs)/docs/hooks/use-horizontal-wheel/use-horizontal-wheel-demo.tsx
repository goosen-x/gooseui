"use client"

import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { useHorizontalWheel } from "@/registry/gooseui/hooks/use-horizontal-wheel"

const en = {
  label: "Accommodation options",
  hint: "Hover the row and turn the mouse wheel. At either end the page scrolls again.",
  items: [
    "Mountain cabin",
    "Lake house",
    "City loft",
    "Beach hut",
    "Forest lodge",
    "Desert camp",
    "River barge",
    "Island villa",
    "Ski chalet",
    "Garden studio",
  ],
  night: "/ night",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    label: "Варианты жилья",
    hint: "Наведите на ряд и покрутите колесо мыши. У любого края снова прокручивается страница.",
    items: [
      "Домик в горах",
      "Дом у озера",
      "Лофт в центре",
      "Хижина у моря",
      "Лесной домик",
      "Лагерь в пустыне",
      "Баржа на реке",
      "Вилла на острове",
      "Шале у склона",
      "Студия в саду",
    ],
    night: "/ ночь",
  },
}

export function UseHorizontalWheelDemo() {
  const t = content[useLocale() as Locale]
  const ref = useHorizontalWheel()

  return (
    <div className="w-full max-w-xl space-y-3 px-4">
      <p className="text-sm text-muted-foreground">{t.hint}</p>
      <div
        ref={ref}
        tabIndex={0}
        role="region"
        aria-label={t.label}
        className="flex gap-3 overflow-x-auto overscroll-x-contain rounded-lg pb-3"
      >
        {t.items.map((item, index) => (
          <div
            key={item}
            className="w-44 shrink-0 overflow-hidden rounded-lg border bg-card"
          >
            <div
              className="h-24 bg-primary"
              style={{ opacity: 0.25 + (index % 5) * 0.15 }}
            />
            <div className="p-3">
              <div className="text-sm font-medium">{item}</div>
              <div className="text-xs text-muted-foreground">
                ${80 + index * 15} {t.night}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
