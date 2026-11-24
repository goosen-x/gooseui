import { useLocale } from "next-intl"
import type * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  ScrollToTop,
  ScrollToTopMinimal,
  ScrollToTopPill,
  ScrollToTopProgress,
  ScrollToTopText,
} from "@/registry/gooseui/ui/scroll-to-top"

const en = {
  scrollDownToSeeThe: "Scroll down to see the button appear.",
  backUp: "Back up",
  scrollToTop: "Scroll to top",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    scrollDownToSeeThe: "Прокрутите вниз, чтобы появилась кнопка.",
    backUp: "Наверх",
    scrollToTop: "Наверх",
  },
}

/**
 * A small scroll area. The button inside follows this area, not the page,
 * because the scroll timeline is bound to the nearest scroller.
 */
function DemoContainer({
  id,
  label,
  children,
}: {
  id: string
  label?: string
  children: React.ReactNode
}) {
  const t = content[useLocale() as Locale]
  return (
    <div>
      {label && (
        <div className="mb-2 text-center text-sm font-medium">{label}</div>
      )}
      <div className="relative h-64 w-48 overflow-y-auto scroll-smooth rounded-lg border bg-background">
        <span id={id} />
        <div className="space-y-4 p-4">
          <p className="text-sm text-muted-foreground">
            {t.scrollDownToSeeThe}
          </p>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="h-8 rounded bg-muted/50" />
          ))}
        </div>
        <div className="sticky bottom-0 h-0">{children}</div>
      </div>
    </div>
  )
}

const place = "absolute bottom-4 right-4"

export function ScrollToTopPreview() {
  const t = content[useLocale() as Locale]
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DemoContainer id="stt-preview-default" label="Default">
        <ScrollToTop
          threshold={50}
          href="#stt-preview-default"
          label={t.scrollToTop}
          className={place}
        />
      </DemoContainer>
      <DemoContainer id="stt-preview-pill" label="Pill">
        <ScrollToTopPill
          threshold={50}
          href="#stt-preview-pill"
          label={t.backUp}
          className={place}
        />
      </DemoContainer>
      <DemoContainer id="stt-preview-progress" label="Progress">
        <ScrollToTopProgress
          threshold={50}
          href="#stt-preview-progress"
          label={t.scrollToTop}
          className={place}
        />
      </DemoContainer>
    </div>
  )
}

export function ScrollToTopDefaultDemo() {
  const t = content[useLocale() as Locale]
  return (
    <DemoContainer id="stt-default">
      <ScrollToTop
        threshold={50}
        size="sm"
        href="#stt-default"
        label={t.scrollToTop}
        className={place}
      />
    </DemoContainer>
  )
}

export function ScrollToTopPillDemo() {
  const t = content[useLocale() as Locale]
  return (
    <DemoContainer id="stt-pill">
      <ScrollToTopPill
        threshold={50}
        href="#stt-pill"
        label={t.scrollToTop}
        className={place}
      />
    </DemoContainer>
  )
}

export function ScrollToTopMinimalDemo() {
  const t = content[useLocale() as Locale]
  return (
    <DemoContainer id="stt-minimal">
      <ScrollToTopMinimal
        threshold={50}
        href="#stt-minimal"
        label={t.scrollToTop}
        className={place}
      />
    </DemoContainer>
  )
}

export function ScrollToTopProgressDemo() {
  const t = content[useLocale() as Locale]
  return (
    <DemoContainer id="stt-progress">
      <ScrollToTopProgress
        threshold={50}
        href="#stt-progress"
        label={t.scrollToTop}
        className={place}
      />
    </DemoContainer>
  )
}

export function ScrollToTopTextDemo() {
  const t = content[useLocale() as Locale]
  return (
    <DemoContainer id="stt-text">
      <ScrollToTopText
        threshold={50}
        href="#stt-text"
        label={t.scrollToTop}
        className={place}
      />
    </DemoContainer>
  )
}
