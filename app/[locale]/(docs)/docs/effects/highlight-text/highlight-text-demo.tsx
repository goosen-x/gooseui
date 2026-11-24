"use client"

import { useLocale } from "next-intl"
import { useId, useState } from "react"
import { HighlightText } from "@/registry/gooseui/effects/highlight-text"
import { Checkbox } from "@/registry/gooseui/ui/checkbox"
import { Input } from "@/registry/gooseui/ui/input"
import { Label } from "@/registry/gooseui/ui/label"

const texts = {
  en: {
    label: "Search",
    placeholder: "Try: creme jalapeno",
    diacritics: "Ignore diacritics",
    query: "creme tea",
    items: [
      "Café menu: crème brûlée with fresh berries",
      "Jalapeño nachos and a lime soda",
      "Green tea, mint tea and lemonade",
      "Smoothie of the day (ask the barista)",
    ],
  },
  ru: {
    label: "Поиск",
    placeholder: "Попробуйте: елка чай",
    diacritics: "Без учёта ё/е и диакритики",
    query: "елка чай",
    items: [
      "Ёлка в кадке и зелёный чай на веранде",
      "Чай с чабрецом и мёдом (по сезону)",
      "Кофе, какао и горячий шоколад",
      "Пирог с яблоками и корицей",
    ],
  },
}

export function HighlightTextDemo() {
  const locale = useLocale() as keyof typeof texts
  const t = texts[locale] ?? texts.en
  const [query, setQuery] = useState(t.query)
  const [ignoreDiacritics, setIgnoreDiacritics] = useState(true)
  const inputId = useId()
  const checkboxId = useId()

  return (
    <div className="w-full max-w-md space-y-4 px-4">
      <div className="space-y-2">
        <label htmlFor={inputId} className="text-sm font-medium">
          {t.label}
        </label>
        <Input
          id={inputId}
          type="search"
          value={query}
          placeholder={t.placeholder}
          onChange={(e) => setQuery(e.target.value)}
          className="flex h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Checkbox
            id={checkboxId}
            size="sm"
            checked={ignoreDiacritics}
            onChange={(e) => setIgnoreDiacritics(e.target.checked)}
          />
          <Label htmlFor={checkboxId} className="cursor-pointer">
            {t.diacritics}
          </Label>
        </div>
      </div>
      <ul className="divide-y rounded-lg border bg-background text-sm">
        {t.items.map((item) => (
          <li key={item} className="px-3 py-2">
            <HighlightText
              text={item}
              query={query}
              ignoreDiacritics={ignoreDiacritics}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
