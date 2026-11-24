"use client"

import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { customToast } from "@/lib/toast"
import { RotaryDial } from "@/registry/gooseui/ui/rotary-dial"

const en = {
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  short: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  month: "Month",
  shift: "shift",
  cipherLabel: "Cipher wheel",
  cipherValue: (shift: number, from: string, to: string) =>
    `Shift ${shift}, ${from} becomes ${to}`,
  plain: "Plain text",
  encoded: "Encoded",
  sample: "MEET ME AT THE OLD BRIDGE",
  digit: (n: number) => `Digit ${n}`,
  lockHint: "Find the code. Hint: the digits add up to 13.",
  opened: "Unlocked",
  openedText: "The code was 4 2 7",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    months: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    short: [
      "янв",
      "фев",
      "мар",
      "апр",
      "май",
      "июн",
      "июл",
      "авг",
      "сен",
      "окт",
      "ноя",
      "дек",
    ],
    month: "Месяц",
    shift: "сдвиг",
    cipherLabel: "Шифровальный диск",
    cipherValue: (shift, from, to) =>
      `Сдвиг ${shift}, ${from} становится ${to}`,
    plain: "Открытый текст",
    encoded: "Шифр",
    sample: "MEET ME AT THE OLD BRIDGE",
    digit: (n) => `Цифра ${n}`,
    lockHint: "Подберите код. Подсказка: сумма цифр равна 13.",
    opened: "Открыто",
    openedText: "Код был 4 2 7",
  },
}

const ALPHABET = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i),
)
const DIGITS = Array.from({ length: 10 }, (_, i) => String(i))

export function RotaryDialMonthDemo() {
  const t = content[useLocale() as Locale]
  const [month, setMonth] = React.useState(5)
  return (
    <RotaryDial
      items={t.short}
      value={month}
      onValueChange={setMonth}
      labels={{ label: t.month, valueText: (_, i) => t.months[i] }}
      renderCenter={(_, i) => (
        <>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
            {t.month}
          </span>
          <span className="text-lg font-semibold leading-tight">
            {t.months[i]}
          </span>
        </>
      )}
    />
  )
}

function caesar(text: string, shift: number) {
  return text.replace(/[A-Z]/g, (c) =>
    String.fromCharCode(((c.charCodeAt(0) - 65 + shift) % 26) + 65),
  )
}

export function RotaryDialCipherDemo() {
  const t = content[useLocale() as Locale]
  const [shift, setShift] = React.useState(3)
  return (
    <div className="flex flex-col items-center gap-6 px-4 md:flex-row md:gap-10">
      <RotaryDial
        items={ALPHABET}
        outerItems={ALPHABET}
        value={shift}
        onValueChange={setShift}
        size={280}
        labels={{
          label: t.cipherLabel,
          valueText: (to, i) => t.cipherValue(i, "A", to),
        }}
        renderCenter={(to, i) => (
          <>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              {t.shift}
            </span>
            <span className="font-mono text-2xl font-bold tabular-nums">
              {i}
            </span>
            <span className="font-mono text-xs text-primary">A → {to}</span>
          </>
        )}
      />
      <dl className="w-full max-w-64 space-y-3 font-mono text-sm">
        <div>
          <dt className="mb-1 font-sans text-xs text-muted-foreground">
            {t.plain}
          </dt>
          <dd className="break-words">{t.sample}</dd>
        </div>
        <div>
          <dt className="mb-1 font-sans text-xs text-muted-foreground">
            {t.encoded}
          </dt>
          <dd className="break-words font-semibold text-primary">
            {caesar(t.sample, shift)}
          </dd>
        </div>
      </dl>
    </div>
  )
}

const CODE = [4, 2, 7]

export function RotaryDialLockDemo() {
  const t = content[useLocale() as Locale]
  const [code, setCode] = React.useState([0, 0, 0])
  const opened = React.useRef(false)

  const update = (slot: number, digit: number) => {
    const next = code.map((d, i) => (i === slot ? digit : d))
    setCode(next)
    const match = next.every((d, i) => d === CODE[i])
    if (match && !opened.current) {
      customToast.success(t.opened, { description: t.openedText })
    }
    opened.current = match
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap justify-center gap-3">
        {code.map((digit, slot) => (
          <RotaryDial
            key={slot}
            items={DIGITS}
            value={digit}
            onValueChange={(d) => update(slot, d)}
            size={140}
            labels={{ label: t.digit(slot + 1) }}
          />
        ))}
      </div>
      <p className="text-sm text-muted-foreground">{t.lockHint}</p>
    </div>
  )
}
