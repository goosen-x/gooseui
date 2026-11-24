"use client"

import { RotateCcw } from "lucide-react"
import { useLocale } from "next-intl"
import { type ReactNode, useEffect, useRef } from "react"
import type { Locale } from "@/i18n/routing"
import { customToast } from "@/lib/toast"
import { Button } from "@/registry/gooseui/ui/button"
import {
  type CookieConsentValue,
  useCookieConsent,
} from "@/registry/gooseui/ui/cookie-consent"
import { content } from "./cookie-consent-content"

function FakePage() {
  return (
    <div aria-hidden className="space-y-3 p-6">
      <div className="h-4 w-1/3 rounded bg-muted" />
      <div className="h-3 w-2/3 rounded bg-muted/70" />
      <div className="h-3 w-1/2 rounded bg-muted/70" />
      <div className="grid grid-cols-3 gap-3 pt-3">
        <div className="h-20 rounded-lg bg-muted/60" />
        <div className="h-20 rounded-lg bg-muted/60" />
        <div className="h-20 rounded-lg bg-muted/60" />
      </div>
    </div>
  )
}

export function Frame({
  storageKey,
  withCategories,
  height = "h-[340px]",
  children,
}: {
  storageKey: string
  withCategories?: boolean
  height?: string
  children: ReactNode
}) {
  const t = content[useLocale() as Locale]
  const { consent, isLoaded, reset } = useCookieConsent(storageKey)
  const ref = useRef<HTMLDivElement>(null)

  // The banner fires a bubbling "cookieconsent" event after the choice is stored
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const onChoice = (e: Event) => {
      const value = (e as CustomEvent<CookieConsentValue>).detail
      if (value.status === "declined") customToast.info(t.declined)
      else customToast.success(value.status === "custom" ? t.saved : t.accepted)
    }
    node.addEventListener("cookieconsent", onChoice)
    return () => node.removeEventListener("cookieconsent", onChoice)
  }, [t])

  return (
    <div className="w-full space-y-3">
      <div
        ref={ref}
        className={`relative w-full overflow-hidden rounded-lg border bg-background ${height}`}
      >
        <FakePage />
        {children}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="text-muted-foreground">
          {t.status}:{" "}
          <code className="font-mono text-xs text-foreground">
            {isLoaded && consent
              ? JSON.stringify({
                  status: consent.status,
                  ...(withCategories ? { categories: consent.categories } : {}),
                })
              : t.none}
          </code>
        </span>
        <Button size="sm" variant="outline" onClick={reset} disabled={!consent}>
          <RotateCcw aria-hidden />
          {t.showAgain}
        </Button>
      </div>
    </div>
  )
}

export function CookieConsentHookDemo() {
  const t = content[useLocale() as Locale]
  const { consent, isAllowed, reset } = useCookieConsent(
    "gooseui-demo-cookie-categories",
  )
  const on = isAllowed("analytics")
  return (
    <div className="flex w-full max-w-sm flex-col gap-3 rounded-lg border bg-card p-4 text-sm">
      <div className="flex items-center justify-between gap-3">
        <span>{t.analyticsLine}</span>
        <span
          className={
            on
              ? "rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
              : "rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
          }
        >
          {on ? t.allowed : t.blocked}
        </span>
      </div>
      <Button size="sm" variant="outline" onClick={reset} disabled={!consent}>
        <RotateCcw aria-hidden />
        {t.showAgain}
      </Button>
    </div>
  )
}
