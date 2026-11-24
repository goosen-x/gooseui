"use client"

import { Minus, Plus } from "lucide-react"
import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Button } from "@/registry/gooseui/ui/button"
import { StepProgress } from "@/registry/gooseui/ui/step-progress"

const en = {
  back: "Previous step",
  next: "Next step",
  label: "Step {step} of {total}",
  upload: "Uploading files",
  steps: ["Account", "Profile", "Team", "Billing", "Review"],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    back: "Предыдущий шаг",
    next: "Следующий шаг",
    label: "Шаг {step} из {total}",
    upload: "Загрузка файлов",
    steps: ["Аккаунт", "Профиль", "Команда", "Оплата", "Проверка"],
  },
}

const iconButton =
  "inline-flex size-9 cursor-pointer items-center justify-center rounded-md border bg-background transition-colors hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40"

export function StepProgressDemo() {
  const t = content[useLocale() as Locale]
  const [step, setStep] = React.useState(2)
  const total = t.steps.length
  return (
    <div className="w-full max-w-md space-y-6">
      <StepProgress step={step} total={total} label={t.label} />
      <div className="flex items-center justify-between gap-3">
        <Button
          variant="ghost"
          type="button"
          aria-label={t.back}
          disabled={step <= 1}
          onClick={() => setStep((s) => Math.max(s - 1, 1))}
          className={iconButton}
        >
          <Minus className="size-4" />
        </Button>
        <span className="text-sm font-medium">{t.steps[step - 1]}</span>
        <Button
          variant="ghost"
          type="button"
          aria-label={t.next}
          disabled={step >= total}
          onClick={() => setStep((s) => Math.min(s + 1, total))}
          className={iconButton}
        >
          <Plus className="size-4" />
        </Button>
      </div>
    </div>
  )
}

export function StepProgressVariantsDemo() {
  const t = content[useLocale() as Locale]
  return (
    <div className="w-full max-w-md space-y-6">
      <StepProgress step={1} total={4} label={t.label} showCounter={false} />
      <StepProgress step={3} total={8} label={t.label} showPercent={false} />
      <StepProgress step={6} total={6} label={t.label} animated={false} />
    </div>
  )
}

export function StepProgressColorDemo() {
  const t = content[useLocale() as Locale]
  return (
    <div className="w-full max-w-md space-y-6">
      <StepProgress
        step={2}
        total={5}
        label={t.label}
        className="text-primary"
      />
      <StepProgress
        step={4}
        total={5}
        label={t.upload}
        className="text-muted-foreground"
      />
    </div>
  )
}
