"use client"

import { useLocale } from "next-intl"
import type { CSSProperties } from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { PaintRollerLoader } from "@/registry/gooseui/ui/paint-roller-loader"

const en = {
  loading: "Loading",
  preparing: "Preparing your workspace",
  repainting: "Applying the new theme",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    loading: "Загрузка",
    preparing: "Готовим рабочее пространство",
    repainting: "Применяем новую тему",
  },
}

export function PaintRollerLoaderDemo() {
  const t = content[useLocale() as Locale]
  return <PaintRollerLoader size={220} label={t.preparing} />
}

export function PaintRollerLoaderSizesDemo() {
  const t = content[useLocale() as Locale]
  return (
    <div className="flex flex-wrap items-center justify-center gap-10">
      <PaintRollerLoader size={80} srLabel={t.loading} />
      <PaintRollerLoader size={140} srLabel={t.loading} duration={1800} />
      <PaintRollerLoader size={200} srLabel={t.loading} duration={3200} />
    </div>
  )
}

export function PaintRollerLoaderColorsDemo() {
  const t = content[useLocale() as Locale]
  return (
    <div className="flex flex-wrap items-center justify-center gap-10">
      <PaintRollerLoader
        size={140}
        srLabel={t.loading}
        style={{ "--paint-roller-color": "var(--chart-1)" } as CSSProperties}
      />
      <PaintRollerLoader
        size={140}
        label={t.repainting}
        style={
          {
            "--paint-roller-color": "var(--chart-2)",
            "--paint-roller-frame": "var(--muted-foreground)",
          } as CSSProperties
        }
      />
    </div>
  )
}
