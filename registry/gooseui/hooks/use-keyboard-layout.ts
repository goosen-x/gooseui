"use client"

import { useCallback, useMemo } from "react"

export type KeyboardLayout = "en" | "ru"

// Same physical keys on QWERTY (en) and JCUKEN (ru), unshifted then shifted.
// Cyrillic here is key mapping data, not UI text.
const EN_KEYS =
  "`qwertyuiop[]asdfghjkl;'zxcvbnm,./" +
  '~QWERTYUIOP{}ASDFGHJKL:"ZXCVBNM<>?@#$^&|'
const RU_KEYS =
  "ёйцукенгшщзхъфывапролджэячсмитьбю." +
  'ЁЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,"№;:?/'

const EN_TO_RU = new Map<string, string>()
const RU_TO_EN = new Map<string, string>()
for (let i = 0; i < EN_KEYS.length; i++) {
  EN_TO_RU.set(EN_KEYS[i], RU_KEYS[i])
  RU_TO_EN.set(RU_KEYS[i], EN_KEYS[i])
}

const LATIN = /[a-z]/i
const CYRILLIC = /[а-яё]/i
const VOWELS: Record<KeyboardLayout, RegExp> = {
  en: /[aeiou]/,
  ru: /[аеёиоуыэюя]/,
}
// Letter combinations that almost never occur in real words
const UNLIKELY: Record<KeyboardLayout, RegExp[]> = {
  en: [/q(?!u)/g, /[jqvxz]{2}/g, /[^aeiouy\W]{5,}/g],
  ru: [
    /^[ьъы]/g,
    /[ьъ]{2}/g,
    /[аеёиоуыэюя][ьъ]/g,
    /[йцкнгшщзхфвпрлджчсмтб]{5,}/g,
    /ъ(?![еёюя])/g,
  ],
}

/** Convert text as if it had been typed on the other layout: "ghbdtn" → "привет" */
export function convertLayout(text: string, to: KeyboardLayout): string {
  const map = to === "ru" ? EN_TO_RU : RU_TO_EN
  let out = ""
  for (const char of text) out += map.get(char) ?? char
  return out
}

/** Which script dominates the text, or null when there are no letters */
export function detectLayout(text: string): KeyboardLayout | null {
  let en = 0
  let ru = 0
  for (const char of text) {
    if (LATIN.test(char)) en++
    else if (CYRILLIC.test(char)) ru++
  }
  if (en === 0 && ru === 0) return null
  return en >= ru ? "en" : "ru"
}

/** How unlike a real word in `lang` the token looks. 0 means plausible */
function penalty(token: string, lang: KeyboardLayout): number {
  const word = token.toLowerCase()
  const letters = word.replace(lang === "en" ? /[^a-z]/g : /[^а-яё]/g, "")
  if (letters.length === 0) return 4
  let score = 0
  // Leading "y" is a consonant ("yes"), so it does not save a vowel-less word
  const vowelSource = lang === "en" ? letters.replace(/(?!^)y/g, "a") : letters
  const vowels = (vowelSource.match(new RegExp(VOWELS[lang], "g")) ?? []).length
  if (vowels === 0 && letters.length >= 2) score += 2
  const ratio = vowels / letters.length
  if (letters.length >= 4 && (ratio < 0.25 || ratio > 0.8)) score += 1
  for (const pattern of UNLIKELY[lang]) {
    score += 2 * (letters.match(pattern) ?? []).length
  }
  // Punctuation between letters ("k.,k.") is a strong hint of a wrong layout
  if (/[a-zа-яё][^a-zа-яё'\-\s]+[a-zа-яё]/i.test(word)) score += 2
  return score
}

export type LayoutMismatch = {
  /** True when most words look typed on the wrong layout */
  mismatch: boolean
  /** Text with the mistyped words converted, the rest untouched */
  fixed: string
  /** Layout the mistyped words were typed on */
  from: KeyboardLayout | null
}

/**
 * Find words typed on the wrong layout. With `expected`, only words in the
 * other script are checked; without it, both directions are.
 */
export function detectLayoutMismatch(
  text: string,
  expected?: KeyboardLayout,
): LayoutMismatch {
  const parts = text.split(/(\s+)/)
  let candidates = 0
  let mistyped = 0
  const tally: Record<KeyboardLayout, number> = { en: 0, ru: 0 }

  const fixed = parts
    .map((part) => {
      if (/^\s*$/.test(part)) return part
      const source = detectLayout(part)
      if (!source || (expected && source === expected)) return part
      const target: KeyboardLayout = source === "en" ? "ru" : "en"
      candidates++
      const converted = convertLayout(part, target)
      if (penalty(converted, target) < penalty(part, source)) {
        mistyped++
        tally[source]++
        return converted
      }
      return part
    })
    .join("")

  const mismatch = mistyped > 0 && mistyped * 2 > candidates
  return {
    mismatch,
    fixed: mismatch ? fixed : text,
    from: mismatch ? (tally.en >= tally.ru ? "en" : "ru") : null,
  }
}

export type UseKeyboardLayoutOptions = {
  /** Layout the field expects. Omit to check both directions */
  expected?: KeyboardLayout
  /** Ignore text with fewer letters than this */
  minLength?: number
  /** Called by fix() with the corrected text */
  onFix?: (fixed: string) => void
}

export type UseKeyboardLayoutResult = {
  /** The text looks typed on the wrong layout */
  mismatch: boolean
  /** Corrected text, or null when nothing to fix */
  suggestion: string | null
  /** Layout the text was actually typed on */
  typedLayout: KeyboardLayout | null
  /** Pass the suggestion to onFix and return it */
  fix: () => string
}

export function useKeyboardLayout(
  value: string,
  { expected, minLength = 2, onFix }: UseKeyboardLayoutOptions = {},
): UseKeyboardLayoutResult {
  const result = useMemo(() => {
    const letters = (value.match(/[a-zа-яё]/gi) ?? []).length
    if (letters < minLength) return null
    return detectLayoutMismatch(value, expected)
  }, [value, expected, minLength])

  const mismatch = result?.mismatch ?? false
  const suggestion = mismatch && result ? result.fixed : null

  const fix = useCallback(() => {
    const next = suggestion ?? value
    if (suggestion !== null) onFix?.(next)
    return next
  }, [suggestion, value, onFix])

  return {
    mismatch,
    suggestion,
    typedLayout: mismatch && result ? result.from : null,
    fix,
  }
}
