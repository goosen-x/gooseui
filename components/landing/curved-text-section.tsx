"use client"

import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { CurvedText } from "@/registry/gooseui/ui/curved-text"

const en = {
  text: "GooseUI ✦ Premium Components ✦ shadcn/ui ✦ React ✦ Tailwind CSS ✦ ",
}
const content: Dict<typeof en> = {
  en,
  ru: {
    text: "GooseUI ✦ Премиум-компоненты ✦ shadcn/ui ✦ React ✦ Tailwind CSS ✦ ",
  },
}

export function CurvedTextSection() {
  const t = content[useLocale() as Locale]
  return (
    <section className="py-4 sm:py-8 -mt-60 lg:-mt-72">
      <CurvedText
        text={t.text}
        duration={80}
        direction="right"
        fontSize={40}
        flatness={2.0}
        height={300}
        curve="up"
        className="text-primary/80 [&_text]:[font-size:28px] sm:[&_text]:[font-size:40px]"
        separator="✦"
        separatorClassName="fill-foreground"
      />
    </section>
  )
}
