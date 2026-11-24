"use client"

import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  HoverScrollScreenshot,
  type HoverScrollVariant,
} from "@/registry/gooseui/ui/hover-scroll-screenshot"

const SRC = "/demo/hover-scroll-screenshot/landing.svg"

const en = {
  alt: "Landing page mockup",
  variants: {
    glide: "Even scroll from top to bottom",
    bounce: "Overshoots the end and settles",
    zoom: "Starts zoomed in, zooms out while scrolling",
  },
  slow: "Slow, 10 seconds",
  fixed: "Fixed 3 seconds",
  cardTitle: "Studio landing page",
  cardText: "Marketing site, 9 sections",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    alt: "Макет лендинга",
    variants: {
      glide: "Ровная прокрутка сверху вниз",
      bounce: "Проскакивает конец и возвращается",
      zoom: "Сначала крупно, при прокрутке отдаляется",
    },
    slow: "Медленно, 10 секунд",
    fixed: "Ровно 3 секунды",
    cardTitle: "Лендинг студии",
    cardText: "Маркетинговый сайт, 9 блоков",
  },
}

function useT() {
  return content[useLocale() as Locale]
}

export function HoverScrollScreenshotDemo() {
  const t = useT()
  return (
    <div className="w-full max-w-md px-4">
      <HoverScrollScreenshot src={SRC} alt={t.alt} className="shadow-sm" />
    </div>
  )
}

const VARIANTS: HoverScrollVariant[] = ["glide", "bounce", "zoom"]

export function HoverScrollScreenshotVariantsDemo() {
  const t = useT()
  return (
    <div className="grid w-full gap-6 px-4 sm:grid-cols-3">
      {VARIANTS.map((variant) => (
        <figure key={variant} className="space-y-2">
          <HoverScrollScreenshot
            src={SRC}
            alt={`${t.alt}: ${variant}`}
            variant={variant}
          />
          <figcaption className="text-sm">
            <span className="font-mono text-xs">{variant}</span>
            <span className="block text-muted-foreground">
              {t.variants[variant]}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

export function HoverScrollScreenshotSpeedDemo() {
  const t = useT()
  return (
    <div className="grid w-full max-w-2xl gap-6 px-4 sm:grid-cols-2">
      <figure className="space-y-2">
        <HoverScrollScreenshot src={SRC} alt={t.alt} duration={10000} />
        <figcaption className="text-muted-foreground text-sm">
          {t.slow}
        </figcaption>
      </figure>
      <figure className="space-y-2">
        <HoverScrollScreenshot src={SRC} alt={t.alt} duration={3000} />
        <figcaption className="text-muted-foreground text-sm">
          {t.fixed}
        </figcaption>
      </figure>
    </div>
  )
}

export function HoverScrollScreenshotCardDemo() {
  const t = useT()
  return (
    <div className="w-full max-w-sm px-4">
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <HoverScrollScreenshot
          src={SRC}
          alt={t.alt}
          variant="zoom"
          className="aspect-[16/10] rounded-none border-0 border-b"
        />
        <div className="p-4">
          <p className="font-medium">{t.cardTitle}</p>
          <p className="text-muted-foreground text-sm">{t.cardText}</p>
        </div>
      </div>
    </div>
  )
}
