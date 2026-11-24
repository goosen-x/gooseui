"use client"

import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { useScrollThreshold } from "@/registry/gooseui/hooks/use-scroll-threshold"

const en = {
  brand: "Acme Store",
  links: ["Catalog", "Sale", "Help"],
  offset: "scrollTop",
  state: "compact",
  down: "on past 80px going down",
  up: "off below 32px going up",
  scroll: "Scroll this box slowly back and forth around 32–80px",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    brand: "Магазин",
    links: ["Каталог", "Скидки", "Помощь"],
    offset: "scrollTop",
    state: "compact",
    down: "включается после 80px вниз",
    up: "выключается ниже 32px вверх",
    scroll: "Медленно покрутите блок туда-обратно между 32 и 80px",
  },
}

const SCALE = 160

function Mark({
  at,
  label,
  className,
}: {
  at: number
  label: string
  className: string
}) {
  return (
    <span
      className="absolute top-0 flex flex-col items-center"
      style={{ left: `${(at / SCALE) * 100}%` }}
      title={label}
    >
      <span className={cn("h-6 w-px", className)} />
    </span>
  )
}

export function UseScrollThresholdDemo() {
  const t = content[useLocale() as Locale]
  const container = React.useRef<HTMLDivElement>(null)
  const compact = useScrollThreshold(80, { releaseAt: 32, container })
  const [offset, setOffset] = React.useState(0)

  return (
    <div className="w-full max-w-md space-y-3 px-4">
      <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
        <span>
          {t.offset}: {Math.round(offset)}
        </span>
        <span>
          {t.state}: <span className="text-foreground">{String(compact)}</span>
        </span>
      </div>
      <div className="relative h-6" aria-hidden="true">
        <div className="absolute inset-x-0 top-3 h-px bg-border" />
        <Mark at={32} label={t.up} className="bg-muted-foreground" />
        <Mark at={80} label={t.down} className="bg-primary" />
        <span
          className="absolute top-1.5 size-3 -translate-x-1/2 rounded-full border-2 border-background bg-foreground"
          style={{ left: `${(Math.min(offset, SCALE) / SCALE) * 100}%` }}
        />
      </div>
      <div className="flex justify-between text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-px bg-muted-foreground" />
          {t.up}
        </span>
        <span className="flex items-center gap-1.5 text-primary">
          <span className="h-3 w-px bg-primary" />
          {t.down}
        </span>
      </div>
      <div
        ref={container}
        onScroll={(event) => setOffset(event.currentTarget.scrollTop)}
        className="relative h-80 overflow-y-auto rounded-lg border bg-background"
      >
        <header
          className={cn(
            "sticky top-0 z-10 flex items-center justify-between border-b bg-background/95 px-4 backdrop-blur transition-all duration-200 motion-reduce:transition-none",
            compact ? "h-11 shadow-sm" : "h-16",
          )}
        >
          <span
            className={cn(
              "font-semibold transition-all duration-200 motion-reduce:transition-none",
              compact ? "text-sm" : "text-lg",
            )}
          >
            {t.brand}
          </span>
          <nav className="flex gap-3 text-xs text-muted-foreground">
            {t.links.map((link) => (
              <span key={link}>{link}</span>
            ))}
          </nav>
        </header>
        <div className="space-y-3 p-4" style={{ height: 900 }}>
          <p className="text-sm text-muted-foreground">{t.scroll}</p>
          {[0, 1, 2, 3, 4].map((index) => (
            <div key={index} className="h-24 rounded-md bg-muted" />
          ))}
        </div>
      </div>
    </div>
  )
}
