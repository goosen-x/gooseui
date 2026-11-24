"use client"

import { Bike, Car, Footprints, TrainFront } from "lucide-react"
import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { customToast } from "@/lib/toast"
import { Button } from "@/registry/gooseui/ui/button"
import {
  OptionPicker,
  type OptionPickerVariant,
} from "@/registry/gooseui/ui/option-picker"

const en = {
  variant: "Variant",
  plan: "Plan",
  plans: [
    { value: "starter", label: "Starter", description: "1 seat" },
    { value: "team", label: "Team", description: "Up to 10 seats" },
    { value: "studio", label: "Studio", description: "Unlimited" },
  ],
  selected: "Selected",
  nothing: "nothing",
  commute: "How do you get to work?",
  transport: [
    { value: "walk", label: "On foot", description: "Under 2 km" },
    { value: "bike", label: "By bike", description: "2–10 km" },
    { value: "train", label: "By train", description: "Any distance" },
    { value: "car", label: "By car", description: "Any distance" },
  ],
  effort: "How hard was the task?",
  levels: [
    { value: "1", label: "Easy" },
    { value: "2", label: "Fine" },
    { value: "3", label: "Tricky" },
    { value: "4", label: "Hard" },
    { value: "5", label: "Brutal" },
  ],
  emptyLabel: "Not selected",
  submit: "Submit",
  sent: "Form value",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    variant: "Вид",
    plan: "Тариф",
    plans: [
      { value: "starter", label: "Старт", description: "1 место" },
      { value: "team", label: "Команда", description: "До 10 мест" },
      { value: "studio", label: "Студия", description: "Без лимита" },
    ],
    selected: "Выбрано",
    nothing: "ничего",
    commute: "Как вы добираетесь до работы?",
    transport: [
      { value: "walk", label: "Пешком", description: "До 2 км" },
      { value: "bike", label: "На велосипеде", description: "2–10 км" },
      {
        value: "train",
        label: "На электричке",
        description: "Любое расстояние",
      },
      { value: "car", label: "На машине", description: "Любое расстояние" },
    ],
    effort: "Насколько сложной была задача?",
    levels: [
      { value: "1", label: "Легко" },
      { value: "2", label: "Нормально" },
      { value: "3", label: "Непросто" },
      { value: "4", label: "Сложно" },
      { value: "5", label: "Жесть" },
    ],
    emptyLabel: "Не выбрано",
    submit: "Отправить",
    sent: "Значение формы",
  },
}

const VARIANTS: OptionPickerVariant[] = [
  "segment",
  "rows",
  "tiles",
  "slider",
  "bars",
]

const ICONS: Record<string, React.ReactNode> = {
  walk: <Footprints />,
  bike: <Bike />,
  train: <TrainFront />,
  car: <Car />,
}

function useT() {
  return content[useLocale() as Locale]
}

export function OptionPickerDemo() {
  const t = useT()
  const [variant, setVariant] = React.useState<OptionPickerVariant>("segment")
  const [plan, setPlan] = React.useState("team")
  const current = t.plans.find((p) => p.value === plan)

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-xs text-muted-foreground">{t.variant}</span>
        <OptionPicker
          aria-label={t.variant}
          options={VARIANTS.map((name) => ({ value: name, label: name }))}
          value={variant}
          onValueChange={(value) => setVariant(value as OptionPickerVariant)}
        />
      </div>
      <OptionPicker
        aria-label={t.plan}
        variant={variant}
        options={t.plans}
        value={plan}
        onValueChange={setPlan}
        emptyLabel={t.emptyLabel}
      />
      <p className="text-sm text-muted-foreground">
        {t.selected}:{" "}
        <span className="font-medium text-foreground">
          {current?.label ?? t.nothing}
        </span>
      </p>
    </div>
  )
}

export function OptionPickerIconsDemo() {
  const t = useT()
  const options = t.transport.map((o) => ({ ...o, icon: ICONS[o.value] }))
  return (
    <div className="grid w-full max-w-xl gap-6">
      <OptionPicker
        aria-label={t.commute}
        variant="tiles"
        options={options}
        defaultValue="bike"
      />
      <OptionPicker
        aria-label={t.commute}
        variant="rows"
        options={options}
        defaultValue="train"
      />
    </div>
  )
}

export function OptionPickerScaleDemo() {
  const t = useT()
  return (
    <div className="grid w-full max-w-md gap-8">
      <OptionPicker
        aria-label={t.effort}
        variant="slider"
        options={t.levels}
        emptyLabel={t.emptyLabel}
      />
      <OptionPicker
        aria-label={t.effort}
        variant="bars"
        options={t.levels}
        defaultValue="3"
      />
    </div>
  )
}

export function OptionPickerFormDemo() {
  const t = useT()
  return (
    <form
      className="w-full max-w-md space-y-4"
      onSubmit={(event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        customToast.success(t.sent, {
          description: `plan = ${String(data.get("plan"))}`,
        })
      }}
    >
      <OptionPicker
        aria-label={t.plan}
        name="plan"
        variant="segment"
        options={t.plans}
        defaultValue="starter"
      />
      <Button type="submit" className="h-9 px-4">
        {t.submit}
      </Button>
    </form>
  )
}
