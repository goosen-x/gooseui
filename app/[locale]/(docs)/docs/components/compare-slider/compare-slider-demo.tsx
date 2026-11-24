"use client"

import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Button } from "@/registry/gooseui/ui/button"
import { CompareSlider } from "@/registry/gooseui/ui/compare-slider"

const en = {
  before: "Before",
  after: "After",
  original: "Original",
  cutout: "Cutout",
  oldCard: "Old layout",
  newCard: "New layout",
  plan: "Team plan",
  perMonth: "per month",
  features: ["Unlimited projects", "Shared workspaces", "Priority support"],
  cta: "Start trial",
  position: "Position",
  reset: "Reset",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    before: "До",
    after: "После",
    original: "Исходник",
    cutout: "Без фона",
    oldCard: "Старая вёрстка",
    newCard: "Новая вёрстка",
    plan: "Тариф для команды",
    perMonth: "в месяц",
    features: [
      "Проекты без ограничений",
      "Общие пространства",
      "Быстрая поддержка",
    ],
    cta: "Попробовать",
    position: "Позиция",
    reset: "Сбросить",
  },
}

function useT() {
  return content[useLocale() as Locale]
}

function Landscape({ muted = false }: { muted?: boolean }) {
  const sky = muted ? ["#9ca3af", "#d1d5db"] : ["#38bdf8", "#fde68a"]
  const far = muted ? "#6b7280" : "#6366f1"
  const near = muted ? "#4b5563" : "#0f766e"
  const sun = muted ? "#e5e7eb" : "#fb923c"
  const id = `sky${React.useId().replace(/[^a-zA-Z0-9]/g, "")}`
  return (
    <svg
      viewBox="0 0 800 450"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky[0]} />
          <stop offset="1" stopColor={sky[1]} />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill={`url(#${id})`} />
      <circle cx="590" cy="150" r="58" fill={sun} />
      <path
        d="M0 300 L150 170 L260 260 L390 130 L540 280 L660 190 L800 290 L800 450 L0 450 Z"
        fill={far}
        opacity="0.85"
      />
      <path
        d="M0 360 C 140 300 260 380 400 330 S 650 290 800 340 L800 450 L0 450 Z"
        fill={near}
      />
      <path
        d="M0 410 C 200 380 380 430 560 400 S 760 390 800 400 L800 450 L0 450 Z"
        fill={muted ? "#374151" : "#065f46"}
      />
    </svg>
  )
}

function Sticker({ withBackground }: { withBackground: boolean }) {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full"
      aria-hidden
    >
      {withBackground ? (
        <>
          <rect width="400" height="300" fill="#e2e8f0" />
          <rect y="210" width="400" height="90" fill="#cbd5e1" />
          <circle cx="70" cy="60" r="90" fill="#f1f5f9" />
        </>
      ) : null}
      <ellipse cx="200" cy="232" rx="78" ry="12" fill="#000" opacity="0.15" />
      <rect x="140" y="80" width="120" height="150" rx="22" fill="#f97316" />
      <rect x="158" y="100" width="84" height="56" rx="10" fill="#fff7ed" />
      <circle cx="184" cy="190" r="12" fill="#fff7ed" />
      <circle cx="216" cy="190" r="12" fill="#fff7ed" />
      <rect x="186" y="54" width="28" height="30" rx="8" fill="#ea580c" />
    </svg>
  )
}

export function CompareSliderDemo() {
  const t = useT()
  return (
    <div className="w-full max-w-2xl px-4">
      <CompareSlider
        before={<Landscape muted />}
        after={<Landscape />}
        beforeLabel={t.before}
        afterLabel={t.after}
      />
    </div>
  )
}

export function CompareSliderCheckerboardDemo() {
  const t = useT()
  return (
    <div className="w-full max-w-md px-4">
      <CompareSlider
        className="aspect-[4/3]"
        checkerboard
        defaultPosition={60}
        before={<Sticker withBackground />}
        after={<Sticker withBackground={false} />}
        beforeLabel={t.original}
        afterLabel={t.cutout}
      />
    </div>
  )
}

function PricingCard({ modern }: { modern: boolean }) {
  const t = useT()
  if (!modern) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 bg-muted p-6 text-center font-serif">
        <p className="font-bold text-lg underline">{t.plan}</p>
        <p className="text-3xl">$24</p>
        <p className="text-sm">{t.perMonth}</p>
        <ul className="list-disc pl-5 text-left text-sm">
          {t.features.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <span className="mt-1 border border-foreground px-3 py-1 text-sm">
          {t.cta}
        </span>
      </div>
    )
  }
  return (
    <div className="flex h-full flex-col justify-center gap-4 bg-card p-6">
      <div>
        <p className="font-medium text-muted-foreground text-sm">{t.plan}</p>
        <p className="mt-1 font-semibold text-4xl tracking-tight">
          $24
          <span className="ml-1 font-normal text-base text-muted-foreground">
            {t.perMonth}
          </span>
        </p>
      </div>
      <ul className="space-y-2 text-sm">
        {t.features.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-primary" />
            {item}
          </li>
        ))}
      </ul>
      <span className="inline-flex h-9 items-center justify-center rounded-md bg-primary font-medium text-primary-foreground text-sm">
        {t.cta}
      </span>
    </div>
  )
}

export function CompareSliderVerticalDemo() {
  const t = useT()
  return (
    <div className="w-full max-w-xs px-4">
      <CompareSlider
        orientation="vertical"
        className="aspect-[3/4]"
        before={<PricingCard modern={false} />}
        after={<PricingCard modern />}
        beforeLabel={t.oldCard}
        afterLabel={t.newCard}
      />
    </div>
  )
}

export function CompareSliderControlledDemo() {
  const t = useT()
  const [position, setPosition] = React.useState(30)
  return (
    <div className="w-full max-w-xl space-y-4 px-4">
      <CompareSlider
        position={position}
        onPositionChange={setPosition}
        before={<Landscape muted />}
        after={<Landscape />}
      />
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-auto text-muted-foreground text-sm tabular-nums">
          {t.position}: {Math.round(position)}%
        </span>
        {[0, 25, 50, 75, 100].map((value) => (
          <Button
            key={value}
            size="sm"
            variant={Math.round(position) === value ? "default" : "outline"}
            className="cursor-pointer tabular-nums"
            onClick={() => setPosition(value)}
          >
            {value}
          </Button>
        ))}
      </div>
    </div>
  )
}
