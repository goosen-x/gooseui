"use client"

import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  RevealOnScroll,
  RevealOnScrollStyles,
} from "@/registry/gooseui/effects/reveal-on-scroll"
import { Card, CardContent } from "@/registry/gooseui/ui/card"
import { ScrollContainer } from "@/registry/gooseui/ui/scroll-container"

const en = {
  label: "Reveal on scroll demo",
  intro: "Keep scrolling: each card appears as it enters the window.",
  direction: "Direction",
  text: "This card is revealed by the scroll position of the window.",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    label: "Демо появления при прокрутке",
    intro: "Прокручивайте дальше: каждая карточка появляется при входе в окно.",
    direction: "Направление",
    text: "Эта карточка появляется по положению прокрутки окна.",
  },
}

const directions = [
  "up",
  "left",
  "right",
  "fade",
  "down",
  "up",
  "left",
  "right",
  "fade",
  "down",
] as const

export function RevealOnScrollDemo() {
  const locale = useLocale() as Locale
  const t = content[locale] ?? content.en

  return (
    <div className="w-full max-w-xl">
      <RevealOnScrollStyles />
      {/* view() uses the nearest scrollable ancestor: this window, not the page.
          overflow-x is clipped so the 40px side slides do not add a horizontal scrollbar. */}
      <ScrollContainer
        height="20rem"
        tabIndex={0}
        aria-label={t.label}
        data-testid="reveal-window"
        className="h-80 rounded-md border bg-background px-6"
        style={{ overflowX: "hidden" }}
      >
        {/* The intro fills the first screen, so the first card starts below the fold */}
        <p className="flex h-72 items-center justify-center text-center text-sm text-muted-foreground">
          {t.intro}
        </p>
        <div className="space-y-6 pb-24">
          {directions.map((direction, i) => (
            <RevealOnScroll key={i} direction={direction}>
              <Card>
                <CardContent className="space-y-1">
                  <p className="text-sm font-medium">
                    {t.direction}:{" "}
                    <code className="font-mono text-xs">{direction}</code>
                  </p>
                  <p className="text-sm text-muted-foreground">{t.text}</p>
                </CardContent>
              </Card>
            </RevealOnScroll>
          ))}
        </div>
      </ScrollContainer>
    </div>
  )
}
