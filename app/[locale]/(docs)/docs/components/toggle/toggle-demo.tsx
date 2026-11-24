"use client"

import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { customToast } from "@/lib/toast"
import { Toggle } from "@/registry/gooseui/ui/toggle"
import { BoldIcon, ItalicIcon, StarIcon, UnderlineIcon } from "./icons"

const en = {
  bold: "Bold",
  italic: "Italic",
  underline: "Underline",
  favorite: "Favorite",
  state: (label: string, on: boolean) => `${label}: ${on ? "on" : "off"}`,
}

const content: Dict<typeof en> = {
  en,
  ru: {
    bold: "Жирный",
    italic: "Курсив",
    underline: "Подчёркнутый",
    favorite: "Избранное",
    state: (label: string, on: boolean) =>
      `${label}: ${on ? "включено" : "выключено"}`,
  },
}

const wrap =
  "flex flex-wrap justify-center gap-2 rounded-lg bg-muted/30 px-4 py-12"

export function ToggleDemo({ all = false }: { all?: boolean }) {
  const t = content[useLocale() as Locale]
  const items = all ? [t.bold, t.italic, t.underline] : [t.bold]

  return (
    <div className={wrap}>
      {items.map((label) => (
        <Toggle
          key={label}
          onPressedChange={(on) => customToast.info(t.state(label, on))}
        >
          {label}
        </Toggle>
      ))}
    </div>
  )
}

export function ToggleIconDemo() {
  const t = content[useLocale() as Locale]
  const items = [
    { label: t.bold, icon: <BoldIcon /> },
    { label: t.italic, icon: <ItalicIcon /> },
    { label: t.underline, icon: <UnderlineIcon /> },
  ]
  return (
    <div className={wrap}>
      {items.map(({ label, icon }) => (
        <Toggle
          key={label}
          size="icon"
          aria-label={label}
          onPressedChange={(on) => customToast.info(t.state(label, on))}
        >
          {icon}
        </Toggle>
      ))}
      <Toggle
        size="icon"
        variant="outline"
        aria-label={t.favorite}
        className="data-[state=on]:[&_svg]:fill-current"
        onPressedChange={(on) => customToast.info(t.state(t.favorite, on))}
      >
        <StarIcon />
      </Toggle>
    </div>
  )
}

export function ToggleIconTextDemo() {
  const t = content[useLocale() as Locale]
  const items = [
    { label: t.bold, icon: <BoldIcon /> },
    { label: t.italic, icon: <ItalicIcon /> },
  ]
  return (
    <div className={wrap}>
      {items.map(({ label, icon }) => (
        <Toggle
          key={label}
          variant="outline"
          className="px-3"
          onPressedChange={(on) => customToast.info(t.state(label, on))}
        >
          {icon}
          {label}
        </Toggle>
      ))}
    </div>
  )
}
