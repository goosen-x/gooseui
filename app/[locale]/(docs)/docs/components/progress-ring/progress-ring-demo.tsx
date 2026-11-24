"use client"

import { Check, Minus, Plus } from "lucide-react"
import { useLocale } from "next-intl"
import { useState } from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Button } from "@/registry/gooseui/ui/button"
import {
  ProgressRing,
  type ProgressRingThreshold,
} from "@/registry/gooseui/ui/progress-ring"

const en = {
  less: "Decrease",
  more: "Increase",
  upload: "Upload progress",
  storage: "Storage used",
  tasks: "tasks",
  steps: "Onboarding steps",
  loading: "Loading",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    less: "Меньше",
    more: "Больше",
    upload: "Загрузка файла",
    storage: "Занято места",
    tasks: "задач",
    steps: "Шаги онбординга",
    loading: "Загрузка",
  },
}

const thresholds: ProgressRingThreshold[] = [
  { from: 0, color: "var(--primary)" },
  { from: 70, color: "var(--chart-4)" },
  { from: 90, color: "var(--destructive)" },
]

export function ProgressRingDemo() {
  const t = content[useLocale() as Locale]
  const [value, setValue] = useState(64)
  const step = (d: number) => setValue((v) => Math.min(100, Math.max(0, v + d)))
  return (
    <div className="flex items-center gap-6">
      <Button
        variant="outline"
        size="icon"
        aria-label={t.less}
        onClick={() => step(-10)}
      >
        <Minus />
      </Button>
      <ProgressRing value={value} size={120} thickness={10} label={t.upload} />
      <Button
        variant="outline"
        size="icon"
        aria-label={t.more}
        onClick={() => step(10)}
      >
        <Plus />
      </Button>
    </div>
  )
}

export function ProgressRingSizesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <ProgressRing value={25} size={40} thickness={4} />
      <ProgressRing value={50} size={64} thickness={6} />
      <ProgressRing value={75} size={96} thickness={12} />
      <ProgressRing value={90} size={128} thickness={4} rounded={false} />
    </div>
  )
}

export function ProgressRingThresholdsDemo() {
  const t = content[useLocale() as Locale]
  const values = [42, 78, 96]
  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      {values.map((v) => (
        <ProgressRing
          key={v}
          value={v}
          size={88}
          thickness={8}
          thresholds={thresholds}
          label={t.storage}
        />
      ))}
    </div>
  )
}

export function ProgressRingContentDemo() {
  const t = content[useLocale() as Locale]
  const [done, setDone] = useState(3)
  const total = 5
  return (
    <div className="flex flex-col items-center gap-4">
      <ProgressRing
        value={done}
        max={total}
        size={112}
        thickness={9}
        label={t.steps}
      >
        {done === total ? (
          <Check className="size-8 text-primary" aria-hidden />
        ) : (
          <span className="flex flex-col items-center gap-1">
            <span className="text-2xl">
              {done}/{total}
            </span>
            <span className="text-xs font-normal text-muted-foreground">
              {t.tasks}
            </span>
          </span>
        )}
      </ProgressRing>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setDone((d) => (d >= total ? 0 : d + 1))}
      >
        <Plus aria-hidden />
        {done >= total ? "0" : "+1"}
      </Button>
    </div>
  )
}

export function ProgressRingIndeterminateDemo() {
  const t = content[useLocale() as Locale]
  return (
    <div className="flex items-center gap-8">
      <ProgressRing indeterminate size={48} thickness={5} label={t.loading} />
      <ProgressRing
        indeterminate
        size={72}
        thickness={4}
        color="var(--muted-foreground)"
        label={t.loading}
      />
    </div>
  )
}
