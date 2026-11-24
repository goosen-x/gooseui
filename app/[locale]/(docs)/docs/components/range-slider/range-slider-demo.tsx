"use client"

import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Input } from "@/registry/gooseui/ui/input"
import {
  type NullableRangeValue,
  RangeSlider,
  type RangeValue,
} from "@/registry/gooseui/ui/range-slider"

const en = {
  min: "Minimum",
  max: "Maximum",
  from: "From",
  to: "To",
  any: "Any",
  price: "Price",
  hours: "Working hours",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    min: "Минимум",
    max: "Максимум",
    from: "От",
    to: "До",
    any: "Любая",
    price: "Цена",
    hours: "Рабочие часы",
  },
}

function useT() {
  return content[useLocale() as Locale]
}

const money = (v: number) => `$${v.toLocaleString("en-US")}`
const hour = (v: number) => `${String(v).padStart(2, "0")}:00`

export function RangeSliderPreviewDemo() {
  const t = useT()
  const [value, setValue] = React.useState<RangeValue>([20, 80])
  return (
    <div className="w-full max-w-sm space-y-2 px-4">
      <RangeSlider
        value={value}
        onValueChange={setValue}
        labels={{ min: t.min, max: t.max }}
      />
      <p className="text-center font-mono text-xs text-muted-foreground">
        [{value[0]}, {value[1]}]
      </p>
    </div>
  )
}

function NumberField({
  label,
  value,
  placeholder,
  onCommit,
}: {
  label: string
  value: number | null
  placeholder: string
  onCommit: (value: number | null) => void
}) {
  const [draft, setDraft] = React.useState<string | null>(null)
  const commit = () => {
    if (draft === null) return
    const n = draft.trim() === "" ? null : Number(draft)
    setDraft(null)
    onCommit(n === null || Number.isFinite(n) ? n : value)
  }
  return (
    <label className="flex-1 space-y-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <Input
        type="number"
        inputMode="numeric"
        placeholder={placeholder}
        value={draft ?? (value === null ? "" : String(value))}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit()
        }}
      />
    </label>
  )
}

export function RangeSliderFieldsDemo() {
  const t = useT()
  const min = 0
  const max = 2000
  const gap = 100
  const [value, setValue] = React.useState<NullableRangeValue>([250, null])
  const [lo, hi] = value

  const setLo = (n: number | null) => {
    const upper = (hi ?? max) - gap
    const v = n === null ? null : Math.max(min, Math.min(n, upper))
    setValue([v === null || v <= min ? null : v, hi])
  }
  const setHi = (n: number | null) => {
    const lower = (lo ?? min) + gap
    const v = n === null ? null : Math.min(max, Math.max(n, lower))
    setValue([lo, v === null || v >= max ? null : v])
  }

  return (
    <div className="w-full max-w-sm space-y-5 px-4">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium">{t.price}</span>
        <span className="text-xs text-muted-foreground tabular-nums">
          {lo === null && hi === null
            ? t.any
            : `${lo === null ? "" : money(lo)} – ${hi === null ? "" : money(hi)}`}
        </span>
      </div>
      <RangeSlider
        nullableEdges
        min={min}
        max={max}
        step={50}
        minGap={gap}
        value={value}
        onValueChange={setValue}
        formatValue={money}
        showValues={false}
        labels={{ min: t.from, max: t.to }}
      />
      <div className="flex gap-3">
        <NumberField
          label={t.from}
          value={lo}
          placeholder={money(min)}
          onCommit={setLo}
        />
        <NumberField
          label={t.to}
          value={hi}
          placeholder={money(max)}
          onCommit={setHi}
        />
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        {`{ min: ${lo ?? "null"}, max: ${hi ?? "null"} }`}
      </p>
    </div>
  )
}

export function RangeSliderFormatDemo() {
  const t = useT()
  return (
    <div className="w-full max-w-sm space-y-3 px-4">
      <span className="text-sm font-medium">{t.hours}</span>
      <RangeSlider
        min={0}
        max={24}
        minGap={2}
        defaultValue={[9, 18]}
        formatValue={hour}
        labels={{ min: t.from, max: t.to }}
      />
    </div>
  )
}
