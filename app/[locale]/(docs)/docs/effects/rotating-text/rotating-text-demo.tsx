"use client"

import { useLocale } from "next-intl"
import {
  RotatingText,
  type RotatingTextProps,
} from "@/registry/gooseui/effects/rotating-text"

const texts = {
  en: {
    lead: "Build",
    tail: "that people enjoy",
    words: ["websites", "apps", "dashboards", "stores"],
    status: ["LOADING", "SEARCHING", "SORTING", "DONE"],
  },
  ru: {
    lead: "Делаем",
    tail: "для людей",
    words: ["сайты", "приложения", "дашборды", "магазины"],
    status: ["ЗАГРУЗКА", "ПОИСК", "СОРТИРОВКА", "ГОТОВО"],
  },
}

type DemoProps = Partial<Omit<RotatingTextProps, "words">> & {
  variant?: "sentence" | "status"
}

export function RotatingTextDemo({
  variant = "sentence",
  className,
  ...props
}: DemoProps) {
  const locale = useLocale() as keyof typeof texts
  const t = texts[locale] ?? texts.en

  if (variant === "status") {
    return (
      <RotatingText
        words={t.status}
        className={
          className ?? "text-4xl font-bold tracking-widest text-foreground"
        }
        {...props}
      />
    )
  }

  return (
    <p className="text-left text-3xl font-semibold tracking-tight sm:text-4xl">
      {t.lead}{" "}
      <RotatingText
        words={t.words}
        className={className ?? "text-primary"}
        {...props}
      />
      {/* With an animated width the tail follows the word, so it stays on the same line */}
      {props.widthMode === "animate" ? " " : <br />}
      {t.tail}
    </p>
  )
}
