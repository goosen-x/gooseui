"use client"
import { useState } from "react"
import {
  type LanguageOption,
  LanguageSwitcher,
} from "@/registry/gooseui/ui/language-switcher"

const plain: LanguageOption[] = [
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
]

const flags: LanguageOption[] = [
  { code: "en", label: "English", flag: <span aria-hidden="true">🇬🇧</span> },
  { code: "ru", label: "Русский", flag: <span aria-hidden="true">🇷🇺</span> },
  { code: "de", label: "Deutsch", flag: <span aria-hidden="true">🇩🇪</span> },
  { code: "fr", label: "Français", flag: <span aria-hidden="true">🇫🇷</span> },
  { code: "es", label: "Español", flag: <span aria-hidden="true">🇪🇸</span> },
]

// Ссылки с href: работают без JavaScript (по ним можно перейти и в новой вкладке)
const links: LanguageOption[] = plain.map((language) => ({
  ...language,
  href: `#lang-${language.code}`,
}))

export function LanguageSwitcherDemo({
  variant = "button",
  languages = plain,
  showLabel,
  useLinks = false,
  label = "Language",
}: {
  variant?: "button" | "select"
  languages?: "plain" | "flags" | LanguageOption[]
  showLabel?: boolean
  useLinks?: boolean
  label?: string
}) {
  const list =
    languages === "flags" ? flags : languages === "plain" ? plain : languages
  const [value, setValue] = useState("en")
  return (
    <div className={variant === "select" ? "w-56" : undefined}>
      <LanguageSwitcher
        languages={useLinks ? links : list}
        value={value}
        onValueChange={setValue}
        variant={variant}
        showLabel={showLabel}
        labels={{ language: label }}
      />
    </div>
  )
}

// Только ссылки, без onValueChange: переключение целиком на браузере
export function LanguageSwitcherLinksDemo({ label = "Language" }) {
  return (
    <LanguageSwitcher
      languages={links}
      value="en"
      labels={{ language: label }}
      showLabel
    />
  )
}
