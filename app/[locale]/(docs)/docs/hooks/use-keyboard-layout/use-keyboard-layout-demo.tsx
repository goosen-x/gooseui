"use client"

import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import {
  convertLayout,
  type KeyboardLayout,
  useKeyboardLayout,
} from "@/registry/gooseui/hooks/use-keyboard-layout"
import { Button } from "@/registry/gooseui/ui/button"
import { Input } from "@/registry/gooseui/ui/input"
import { OptionPicker } from "@/registry/gooseui/ui/option-picker"

const en = {
  expects: "Field expects",
  layouts: { ru: "Russian", en: "English" } as Record<KeyboardLayout, string>,
  placeholder: { ru: "Type here or pick a sample", en: "Type here" } as Record<
    KeyboardLayout,
    string
  >,
  samples: "Samples",
  samplesFor: { ru: ["ghbdtn", "rfr ltkf?", "k.,k. xfq"], en: [] as string[] },
  warning: "Looks like the wrong layout. Did you mean",
  fix: "Fix",
  ok: "Layout looks right",
  empty: "Waiting for input",
  input: "Input",
  toRu: "To Russian",
  toEn: "To English",
  result: "Result",
  converterValue: "ghbdtn? rfr ltkf",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    expects: "Поле ждёт",
    layouts: { ru: "русский", en: "английский" },
    placeholder: {
      ru: "Печатайте или выберите пример",
      en: "Печатайте или выберите пример",
    },
    samples: "Примеры",
    samplesFor: {
      ru: ["ghbdtn", "rfr ltkf?", "k.,k. xfq"],
      en: ["руддщ", "цщкдв", "ыщьуерштп"],
    },
    warning: "Похоже, не та раскладка. Вы имели в виду",
    fix: "Исправить",
    ok: "С раскладкой всё в порядке",
    empty: "Ждём ввода",
    input: "Ввод",
    toRu: "В русскую",
    toEn: "В английскую",
    result: "Результат",
    converterValue: "ghbdtn? rfr ltkf",
  },
}

const chip =
  "cursor-pointer rounded-md border bg-background px-2.5 py-1 font-mono text-xs transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"

export function UseKeyboardLayoutDemo() {
  const t = content[useLocale() as Locale]
  const [expected, setExpected] = React.useState<KeyboardLayout>("ru")
  const [value, setValue] = React.useState("")
  const { mismatch, suggestion, fix } = useKeyboardLayout(value, {
    expected,
    onFix: setValue,
  })
  const samples = t.samplesFor[expected]
  const hintId = React.useId()

  return (
    <div className="w-full max-w-md space-y-4 px-4">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-muted-foreground">{t.expects}:</span>
        <OptionPicker
          aria-label={t.expects}
          options={(["ru", "en"] as const).map((layout) => ({
            value: layout,
            label: t.layouts[layout],
          }))}
          value={expected}
          onValueChange={(layout) => {
            setExpected(layout as KeyboardLayout)
            setValue("")
          }}
        />
      </div>

      <Input
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder={t.placeholder[expected]}
        aria-label={t.input}
        aria-describedby={hintId}
        className="h-10 w-full rounded-md border bg-background px-3 text-base outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      />

      {samples.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">{t.samples}:</span>
          {samples.map((sample) => (
            <Button
              variant="ghost"
              key={sample}
              type="button"
              className={chip}
              onClick={() => setValue(sample)}
            >
              {sample}
            </Button>
          ))}
        </div>
      )}

      <div
        id={hintId}
        aria-live="polite"
        className={cn(
          "flex min-h-12 items-center justify-between gap-3 rounded-md border px-3 py-2 text-sm",
          mismatch ? "border-primary/40 bg-primary/5" : "bg-background",
        )}
      >
        {mismatch && suggestion ? (
          <>
            <span>
              {t.warning}{" "}
              <strong className="font-semibold">{suggestion}</strong>?
            </span>
            <Button
              type="button"
              onClick={fix}
              className="h-auto shrink-0 px-3 py-1.5 text-xs"
            >
              {t.fix}
            </Button>
          </>
        ) : (
          <span className="text-muted-foreground">
            {value ? t.ok : t.empty}
          </span>
        )}
      </div>
    </div>
  )
}

export function ConvertLayoutDemo() {
  const t = content[useLocale() as Locale]
  const [value, setValue] = React.useState(t.converterValue)
  const [result, setResult] = React.useState("")

  return (
    <div className="w-full max-w-md space-y-3 px-4">
      <label className="block space-y-1.5 text-sm">
        <span className="text-muted-foreground">{t.input}</span>
        <Input
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          className="h-10 w-full rounded-md border bg-background px-3 font-mono text-base outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </label>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          type="button"
          className={chip}
          onClick={() => setResult(convertLayout(value, "ru"))}
        >
          {t.toRu}
        </Button>
        <Button
          variant="ghost"
          type="button"
          className={chip}
          onClick={() => setResult(convertLayout(value, "en"))}
        >
          {t.toEn}
        </Button>
      </div>
      <div className="min-h-10 rounded-md border bg-background px-3 py-2 font-mono text-sm">
        <span className="mr-2 font-sans text-xs text-muted-foreground">
          {t.result}:
        </span>
        {result}
      </div>
    </div>
  )
}
