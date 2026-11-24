"use client"

import { useLocale } from "next-intl"
import { useEffect, useState } from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Button } from "@/registry/gooseui/ui/button"
import {
  RippleLoader,
  type RippleLoaderOrigin,
} from "@/registry/gooseui/ui/ripple-loader"

const en = {
  loading: "Loading",
  save: "Save",
  saving: "Saving",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    loading: "Загрузка",
    save: "Сохранить",
    saving: "Сохраняем",
  },
}

const origins: RippleLoaderOrigin[] = [
  "center",
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
]

export function RippleLoaderDemo() {
  const t = content[useLocale() as Locale]
  return <RippleLoader size={96} gap={4} label={t.loading} />
}

export function RippleLoaderOriginsDemo() {
  const t = content[useLocale() as Locale]
  return (
    <div className="flex flex-wrap items-end justify-center gap-6">
      {origins.map((o) => (
        <div key={o} className="flex flex-col items-center gap-2">
          <RippleLoader size={56} origin={o} label={t.loading} />
          <code className="font-mono text-xs text-muted-foreground">{o}</code>
        </div>
      ))}
    </div>
  )
}

export function RippleLoaderGridDemo() {
  const t = content[useLocale() as Locale]
  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      <RippleLoader
        grid={3}
        size={56}
        shape="square"
        gap={0}
        label={t.loading}
      />
      <RippleLoader
        grid={4}
        size={64}
        shape="circle"
        origin="top-left"
        className="text-foreground"
        label={t.loading}
      />
      <RippleLoader
        grid={5}
        size={72}
        gap={3}
        duration={2000}
        className="text-muted-foreground"
        label={t.loading}
      />
    </div>
  )
}

export function RippleLoaderButtonDemo() {
  const t = content[useLocale() as Locale]
  const [busy, setBusy] = useState(false)
  useEffect(() => {
    if (!busy) return
    const id = setTimeout(() => setBusy(false), 2500)
    return () => clearTimeout(id)
  }, [busy])
  return (
    <Button onClick={() => setBusy(true)} disabled={busy} className="min-w-32">
      {busy ? (
        <>
          <RippleLoader
            size={16}
            gap={1}
            className="text-primary-foreground"
            label={t.saving}
          />
          {t.saving}
        </>
      ) : (
        t.save
      )}
    </Button>
  )
}
