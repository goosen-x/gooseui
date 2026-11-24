"use client"

import { RotateCcw } from "lucide-react"
import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { useNearViewport } from "@/registry/gooseui/hooks/use-near-viewport"
import { Button } from "@/registry/gooseui/ui/button"

const en = {
  scroll: "Scroll down inside the box",
  waiting: "Waiting",
  loaded: "Loaded",
  widget: "Sales chart",
  widgetHint: "Mounted only when the block came within 120px of the box edge",
  placeholder: "The chart is not mounted yet",
  reset: "Reset",
  margin: "rootMargin",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    scroll: "Прокрутите блок вниз",
    waiting: "Ждёт",
    loaded: "Загружен",
    widget: "График продаж",
    widgetHint: "Смонтирован, только когда блок подошёл к краю на 120px",
    placeholder: "График ещё не смонтирован",
    reset: "Сбросить",
    margin: "rootMargin",
  },
}

const BARS = [42, 68, 55, 80, 62, 91, 74, 58, 86, 70]

function HeavyChart() {
  return (
    <svg viewBox="0 0 200 80" className="h-24 w-full" aria-hidden="true">
      {BARS.map((value, index) => (
        <rect
          key={index}
          x={index * 20 + 4}
          y={80 - value * 0.8}
          width="12"
          height={value * 0.8}
          rx="2"
          className="fill-primary"
          opacity={0.45 + value / 200}
        />
      ))}
    </svg>
  )
}

function LazyBlock({ root }: { root: HTMLElement }) {
  const t = content[useLocale() as Locale]
  const [ref, isNear] = useNearViewport({ root, rootMargin: "120px" })

  return (
    <div ref={ref} className="rounded-lg border bg-background p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium">{t.widget}</span>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-xs",
            isNear
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground",
          )}
        >
          {isNear ? t.loaded : t.waiting}
        </span>
      </div>
      {isNear ? (
        <>
          <HeavyChart />
          <p className="mt-2 text-xs text-muted-foreground">{t.widgetHint}</p>
        </>
      ) : (
        <div className="flex h-24 items-center justify-center rounded-md border border-dashed text-xs text-muted-foreground">
          {t.placeholder}
        </div>
      )}
    </div>
  )
}

export function UseNearViewportDemo() {
  const t = content[useLocale() as Locale]
  const [root, setRoot] = React.useState<HTMLDivElement | null>(null)
  const [round, setRound] = React.useState(0)

  return (
    <div className="w-full max-w-md space-y-3 px-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{t.scroll}</span>
        <Button
          variant="ghost"
          type="button"
          onClick={() => {
            root?.scrollTo({ top: 0 })
            setRound((value) => value + 1)
          }}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border bg-background px-2.5 py-1 text-xs hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <RotateCcw className="size-3.5" aria-hidden="true" />
          {t.reset}
        </Button>
      </div>
      <div
        ref={setRoot}
        className="h-72 overflow-y-auto rounded-lg border bg-muted/40 p-3"
      >
        <div className="space-y-3">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
            <div key={index} className="space-y-2 rounded-lg bg-background p-4">
              <div className="h-2.5 w-2/3 rounded bg-muted" />
              <div className="h-2.5 w-full rounded bg-muted" />
              <div className="h-2.5 w-5/6 rounded bg-muted" />
            </div>
          ))}
          {root && <LazyBlock key={round} root={root} />}
        </div>
      </div>
    </div>
  )
}
