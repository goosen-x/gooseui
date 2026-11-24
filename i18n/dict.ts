import type { Locale } from "./routing"

/**
 * Тексты рядом с компонентом: `const content = { en: {...}, ru: {...} } satisfies Dict<...>`.
 * Форма словаря берётся из английской версии, русская обязана ей соответствовать.
 */
export type Dict<T> = Record<Locale, T>

/** Значение на двух языках прямо в конфиге: `description: { en: "...", ru: "..." }` */
export type Localized<T = string> = Dict<T>

export function pick<T>(value: Localized<T>, locale: string): T {
  return value[locale as Locale] ?? value.en
}
