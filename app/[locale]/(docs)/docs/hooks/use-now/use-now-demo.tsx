"use client"

import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { useNow } from "@/registry/gooseui/hooks/use-now"

const en = {
  local: "Local time",
  onPage: "On this page",
  seconds: "s",
  launch: "Until launch",
  launched: "Launched",
  waiting: "Waiting for the browser…",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    local: "Местное время",
    onPage: "На странице",
    seconds: "с",
    launch: "До запуска",
    launched: "Запущено",
    waiting: "Ждём браузер…",
  },
}

function useMountedAt() {
  const [at, setAt] = React.useState<number | null>(null)
  React.useEffect(() => setAt(Date.now()), [])
  return at
}

function pad(value: number) {
  return String(value).padStart(2, "0")
}

export function UseNowDemo() {
  const locale = useLocale()
  const t = content[locale as Locale]
  const now = useNow(1000)
  const mountedAt = useMountedAt()

  return (
    <div className="grid w-full max-w-md grid-cols-2 gap-3 px-4">
      <div className="rounded-lg border bg-background p-4">
        <div className="text-xs text-muted-foreground">{t.local}</div>
        <div className="mt-1 font-mono text-2xl tabular-nums">
          {now === null
            ? "--:--:--"
            : new Date(now).toLocaleTimeString(locale, { hour12: false })}
        </div>
      </div>
      <div className="rounded-lg border bg-background p-4">
        <div className="text-xs text-muted-foreground">{t.onPage}</div>
        <div className="mt-1 font-mono text-2xl tabular-nums">
          {now === null || mountedAt === null
            ? "0"
            : Math.max(0, Math.floor((now - mountedAt) / 1000))}
          <span className="ml-1 text-sm text-muted-foreground">
            {t.seconds}
          </span>
        </div>
      </div>
    </div>
  )
}

export function UseNowCountdownDemo() {
  const t = content[useLocale() as Locale]
  const now = useNow(1000)
  const mountedAt = useMountedAt()

  if (now === null || mountedAt === null) {
    return <p className="text-sm text-muted-foreground">{t.waiting}</p>
  }

  const deadline = mountedAt + 2 * 60_000 + 30_000
  const left = Math.max(0, deadline - now)
  const minutes = Math.floor(left / 60_000)
  const seconds = Math.floor((left % 60_000) / 1000)

  return (
    <div className="text-center">
      <div className="text-xs text-muted-foreground">
        {left === 0 ? t.launched : t.launch}
      </div>
      <div className="mt-1 font-mono text-4xl tabular-nums">
        {pad(minutes)}:{pad(seconds)}
      </div>
    </div>
  )
}

export function UseNowSharedDemo() {
  return (
    <div className="flex gap-3">
      {[0, 1, 2].map((index) => (
        <SharedTile key={index} />
      ))}
    </div>
  )
}

function SharedTile() {
  const now = useNow(1000)
  const second = now === null ? 0 : new Date(now).getSeconds()
  return (
    <div className="flex size-16 items-center justify-center rounded-lg border bg-background font-mono text-xl tabular-nums">
      {pad(second)}
    </div>
  )
}
