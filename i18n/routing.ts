import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["en", "ru"],
  defaultLocale: "en",
  // "/" — английский, "/ru/..." — русский
  localePrefix: "as-needed",
  // язык браузера не переключает сайт сам
  localeDetection: false,
})

export type Locale = (typeof routing.locales)[number]
