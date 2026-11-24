"use client"

import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { RelativeTime } from "@/registry/gooseui/ui/relative-time"

const en = {
  events: [
    { label: "Build finished", offset: -20_000 },
    { label: "Comment added", offset: -5 * 60_000 },
    { label: "Backup created", offset: -3 * 3_600_000 },
    { label: "Invoice sent", offset: -26 * 3_600_000 },
    { label: "Next sync", offset: 2 * 86_400_000 },
  ],
  fresh: "Updated",
  staleHint: "Marked stale after 1 minute",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    events: [
      { label: "Сборка завершена", offset: -20_000 },
      { label: "Новый комментарий", offset: -5 * 60_000 },
      { label: "Резервная копия", offset: -3 * 3_600_000 },
      { label: "Счёт отправлен", offset: -26 * 3_600_000 },
      { label: "Следующая синхронизация", offset: 2 * 86_400_000 },
    ],
    fresh: "Обновлено",
    staleHint: "Через минуту значение считается устаревшим",
  },
}

// Demo dates are relative to the moment of mount, so they render only in the browser.
function useBase() {
  const [base, setBase] = React.useState<number | null>(null)
  React.useEffect(() => setBase(Date.now()), [])
  return base
}

export function RelativeTimeDemo() {
  const locale = useLocale()
  const t = content[locale as Locale]
  const base = useBase()

  return (
    <ul className="w-full max-w-sm divide-y rounded-lg border bg-background">
      {t.events.map((event) => (
        <li
          key={event.label}
          className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
        >
          <span>{event.label}</span>
          {base === null ? (
            <span className="h-4 w-20 rounded bg-muted" />
          ) : (
            <RelativeTime
              date={base + event.offset}
              locale={locale}
              className="text-muted-foreground"
            />
          )}
        </li>
      ))}
    </ul>
  )
}

export function RelativeTimeLocalesDemo() {
  const locale = useLocale()
  const base = useBase()
  const locales =
    locale === "ru" ? ["ru", "en", "de", "ja"] : ["en", "de", "es", "ja"]

  return (
    <div className="grid w-full max-w-sm grid-cols-[auto_1fr] gap-x-6 gap-y-2 px-4 text-sm">
      {locales.map((code) => (
        <React.Fragment key={code}>
          <span className="font-mono text-muted-foreground">{code}</span>
          {base === null ? (
            <span className="h-4 w-24 rounded bg-muted" />
          ) : (
            <RelativeTime date={base - 3 * 86_400_000} locale={code} />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export function RelativeTimeStaleDemo() {
  const locale = useLocale()
  const t = content[locale as Locale]
  const base = useBase()

  return (
    <div className="space-y-3 text-center text-sm">
      <div className="flex flex-wrap justify-center gap-6">
        {[-10_000, -50_000, -5 * 60_000].map((offset) => (
          <div
            key={offset}
            className="rounded-lg border bg-background px-4 py-3"
          >
            <div className="text-xs text-muted-foreground">{t.fresh}</div>
            {base === null ? (
              <span className="mt-1 block h-4 w-20 rounded bg-muted" />
            ) : (
              <RelativeTime
                date={base + offset}
                locale={locale}
                staleAfter={60_000}
                updateInterval={5000}
                className="mt-1 block font-medium"
              />
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">{t.staleHint}</p>
    </div>
  )
}

export function RelativeTimeShortDemo() {
  const locale = useLocale()
  const base = useBase()

  return (
    <div className="flex flex-wrap justify-center gap-4 text-sm">
      {(["long", "short", "narrow"] as const).map((style) => (
        <div key={style} className="rounded-lg border bg-background px-4 py-3">
          <div className="font-mono text-xs text-muted-foreground">{style}</div>
          {base === null ? (
            <span className="mt-1 block h-4 w-20 rounded bg-muted" />
          ) : (
            <RelativeTime
              date={base - 2 * 3_600_000}
              locale={locale}
              formatStyle={style}
              className="mt-1 block"
            />
          )}
        </div>
      ))}
    </div>
  )
}
