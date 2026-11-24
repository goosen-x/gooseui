"use client"

import { Heart, Star, ThumbsUp } from "lucide-react"
import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { customToast } from "@/lib/toast"
import { ClickSparks } from "@/registry/gooseui/effects/click-sparks"
import { Button } from "@/registry/gooseui/ui/button"

const en = {
  clickAnywhere: "Click anywhere in this area",
  like: "Like",
  star: "Star",
  love: "Love",
  liked: "Clicked",
  burst: "Burst",
  bounce: "Custom easing",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    clickAnywhere: "Кликните в любом месте этой области",
    like: "Нравится",
    star: "В избранное",
    love: "Люблю",
    liked: "Нажато",
    burst: "Взрыв",
    bounce: "Своя кривая",
  },
}

export function ClickSparksDemo() {
  const t = content[useLocale() as Locale]
  return (
    <ClickSparks className="flex h-64 w-full cursor-pointer select-none items-center justify-center text-primary">
      <p className="text-sm text-muted-foreground">{t.clickAnywhere}</p>
    </ClickSparks>
  )
}

export function ClickSparksButtonsDemo() {
  const t = content[useLocale() as Locale]
  const items = [
    { label: t.like, icon: ThumbsUp },
    { label: t.star, icon: Star },
    { label: t.love, icon: Heart },
  ]
  return (
    <ClickSparks
      count={10}
      radius={36}
      color="var(--primary)"
      className="flex flex-wrap justify-center gap-3 p-6"
    >
      {items.map(({ label, icon: Icon }) => (
        <Button
          key={label}
          variant="outline"
          onClick={() => customToast.success(t.liked, { description: label })}
        >
          <Icon aria-hidden className="size-4" />
          {label}
        </Button>
      ))}
    </ClickSparks>
  )
}

// Overshoots past 1 and settles back
const backOut = (t: number) => {
  const c = 1.70158
  return 1 + (c + 1) * (t - 1) ** 3 + c * (t - 1) ** 2
}

export function ClickSparksStyleDemo() {
  const t = content[useLocale() as Locale]
  return (
    <div className="grid w-full max-w-xl grid-cols-2 gap-4 px-4">
      <ClickSparks
        color="var(--chart-1)"
        count={16}
        radius={56}
        length={18}
        lineWidth={1.5}
        duration={650}
        className="flex h-36 cursor-pointer select-none items-center justify-center rounded-lg border bg-card"
      >
        <span className="text-sm text-muted-foreground">{t.burst}</span>
      </ClickSparks>
      <ClickSparks
        color="var(--chart-2)"
        count={6}
        radius={32}
        length={14}
        lineWidth={3}
        duration={500}
        easing={backOut}
        className="flex h-36 cursor-pointer select-none items-center justify-center rounded-lg border bg-card"
      >
        <span className="text-sm text-muted-foreground">{t.bounce}</span>
      </ClickSparks>
    </div>
  )
}
