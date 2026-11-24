"use client"

import { useLocale } from "next-intl"
import {
  ScrollWordReveal,
  type ScrollWordRevealProps,
} from "@/registry/gooseui/effects/scroll-word-reveal"

const texts = {
  en: {
    hint: "Scroll inside this box",
    statement:
      "Good interfaces explain themselves. We study how people work, sketch the flow, build it carefully and keep polishing after launch.",
    short: "Every word waits for its turn.",
  },
  ru: {
    hint: "Прокрутите внутри блока",
    statement:
      "Хороший интерфейс объясняет себя сам. Мы смотрим, как люди работают, рисуем сценарий, аккуратно собираем его и продолжаем шлифовать после запуска.",
    short: "Каждое слово ждёт своей очереди.",
  },
}

type DemoProps = Partial<Omit<ScrollWordRevealProps, "text">> & {
  variant?: "statement" | "short"
}

export function ScrollWordRevealDemo({
  variant = "statement",
  className,
  ...props
}: DemoProps) {
  const locale = useLocale() as keyof typeof texts
  const t = texts[locale] ?? texts.en
  return (
    <div className="relative h-[360px] w-full overflow-y-auto rounded-lg">
      <div className="flex h-[360px] items-end justify-center pb-6 text-sm text-muted-foreground">
        {t.hint} ↓
      </div>
      <div className="mx-auto max-w-2xl px-6">
        <ScrollWordReveal
          text={variant === "short" ? t.short : t.statement}
          offset={[1, 0.3]}
          className={
            className ??
            "text-2xl leading-snug font-semibold tracking-tight sm:text-3xl"
          }
          {...props}
        />
      </div>
      <div className="h-[360px]" />
    </div>
  )
}
