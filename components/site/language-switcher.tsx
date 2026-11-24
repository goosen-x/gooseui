"use client"

import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import { getPathname, usePathname, useRouter } from "@/i18n/navigation"
import { type Locale, routing } from "@/i18n/routing"
import { LanguageSwitcher as Switcher } from "@/registry/gooseui/ui/language-switcher"

const NAMES: Record<Locale, string> = { en: "English", ru: "Русский" }

const en = {
  group: "Language",
}
const content: Dict<typeof en> = {
  en,
  ru: {
    group: "Язык",
  },
}

interface LanguageSwitcherProps {
  className?: string
}

// Обёртка сайта: ссылки ведут на ту же страницу на другом языке (работают без JS),
// а с JS язык меняется без перезагрузки через router.replace
export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()

  return (
    <Switcher
      className={className}
      value={locale}
      labels={{ language: content[locale].group }}
      languages={routing.locales.map((code) => ({
        code,
        label: NAMES[code],
        href: getPathname({ href: pathname, locale: code }),
      }))}
      onValueChange={(code) =>
        router.replace(pathname, { locale: code as Locale })
      }
    />
  )
}
