"use client"

import { useLocale } from "next-intl"
import * as React from "react"
import { useCopyToast } from "@/hooks/use-copy-toast"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { customToast } from "@/lib/toast"
import { PHONE_COUNTRIES } from "@/registry/gooseui/lib/phone-countries"
import { Button } from "@/registry/gooseui/ui/button"
import { CopyButton } from "@/registry/gooseui/ui/copy-button"
import { Label } from "@/registry/gooseui/ui/label"
import {
  PhoneInput,
  type PhoneValueMeta,
} from "@/registry/gooseui/ui/phone-input"

const en = {
  defaultCountry: "US",
  phone: "Phone",
  country: "Country",
  search: "Search country",
  noCountry: "No country found",
  sentValue: "Value sent to the form",
  valid: "the number is complete",
  invalid: "the number is incomplete",
  empty: "nothing entered",
  hint: "We call only to confirm the order",
  copy: "Copy",
  copied: "Copied",
  pasteHint: "Copy a sample, then paste it into the field",
  invalidText: "Enter the full phone number",
  requiredText: "Enter a phone number",
  submit: "Send",
  sent: "Sent",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    defaultCountry: "RU",
    phone: "Телефон",
    country: "Страна",
    search: "Найти страну",
    noCountry: "Страна не найдена",
    sentValue: "Что уходит в форму",
    valid: "номер полный",
    invalid: "номер неполный",
    empty: "ничего не введено",
    hint: "Мы позвоним только для подтверждения заказа",
    copy: "Скопировать",
    copied: "Скопировано",
    pasteHint: "Скопируйте образец и вставьте его в поле",
    invalidText: "Введите номер полностью",
    requiredText: "Введите номер",
    submit: "Отправить",
    sent: "Отправлено",
  },
}

function useT() {
  return content[useLocale() as Locale]
}

// Texts and country names of the picker in the current language
function usePicker() {
  const t = useT()
  return {
    locale: useLocale(),
    labels: {
      country: t.country,
      search: t.search,
      empty: t.noCountry,
      incomplete: t.invalidText,
      required: t.requiredText,
    },
  }
}

function ValueLine({ value, meta }: { value: string; meta?: PhoneValueMeta }) {
  const t = useT()
  return (
    <p className="mt-3 text-sm text-muted-foreground">
      {t.sentValue}:{" "}
      {value ? (
        <code className="font-mono text-foreground">{value}</code>
      ) : (
        t.empty
      )}
      {value && <>, {meta?.isValid ? t.valid : t.invalid}</>}
    </p>
  )
}

export function PhoneInputDemo() {
  const t = useT()
  const picker = usePicker()
  const [value, setValue] = React.useState("")
  return (
    <div className="group/demo grid w-full max-w-xs gap-2">
      <Label htmlFor="phone-demo">{t.phone}</Label>
      <PhoneInput
        id="phone-demo"
        defaultCountry={t.defaultCountry}
        {...picker}
        value={value}
        onValueChange={setValue}
      />
      <p className="text-sm text-muted-foreground group-has-[input[aria-invalid=true]]/demo:hidden">
        {t.hint}
      </p>
    </div>
  )
}

export function PhoneInputValueDemo() {
  const t = useT()
  const picker = usePicker()
  const [value, setValue] = React.useState("")
  const [meta, setMeta] = React.useState<PhoneValueMeta>()
  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor="phone-value">{t.phone}</Label>
      <PhoneInput
        id="phone-value"
        defaultCountry={t.defaultCountry}
        {...picker}
        value={value}
        onValueChange={(next, info) => {
          setValue(next)
          setMeta(info)
        }}
      />
      <ValueLine value={value} meta={meta} />
    </div>
  )
}

const SAMPLES = [
  "8 (900) 123-45-67",
  "+7 701 234 5678",
  "+44 20 7946 0958",
  "0049 30 1234 5678",
  "+1 415 555 0123 ext 99",
]

function SampleChip({ text }: { text: string }) {
  const t = useT()
  const copyToast = useCopyToast()
  return (
    <span className="inline-flex items-center gap-1 rounded-md border bg-background py-0.5 pr-0.5 pl-2 font-mono text-xs">
      {text}
      <CopyButton
        variant="inline"
        value={text}
        {...copyToast()}
        labels={{ copy: `${t.copy}: ${text}`, copied: t.copied }}
      />
    </span>
  )
}

export function PhoneInputPasteDemo() {
  const t = useT()
  const picker = usePicker()
  const [value, setValue] = React.useState("")
  const [meta, setMeta] = React.useState<PhoneValueMeta>()
  return (
    <div className="w-full max-w-sm space-y-3">
      <p className="text-xs text-muted-foreground">{t.pasteHint}</p>
      <div className="flex flex-wrap gap-1.5">
        {SAMPLES.map((sample) => (
          <SampleChip key={sample} text={sample} />
        ))}
      </div>
      <PhoneInput
        aria-label={t.phone}
        {...picker}
        defaultCountry="RU"
        value={value}
        onValueChange={(next, info) => {
          setValue(next)
          setMeta(info)
        }}
      />
      <ValueLine value={value} meta={meta} />
    </div>
  )
}

const LIMITED = PHONE_COUNTRIES.filter((c) =>
  ["NL", "DE", "FR", "PL", "ES", "IT"].includes(c.code),
)

export function PhoneInputCountriesDemo() {
  const t = useT()
  const picker = usePicker()
  const [value, setValue] = React.useState("+31612345678")
  const [meta, setMeta] = React.useState<PhoneValueMeta>({
    isValid: true,
    country: LIMITED.find((c) => c.code === "NL") ?? LIMITED[0],
  })
  return (
    <div className="w-full max-w-xs space-y-2">
      <PhoneInput
        aria-label={t.phone}
        {...picker}
        countries={LIMITED}
        preferredCountries={["NL", "DE"]}
        value={value}
        onValueChange={(next, info) => {
          setValue(next)
          setMeta(info)
        }}
      />
      <ValueLine value={value} meta={meta} />
    </div>
  )
}

export function PhoneInputFormDemo() {
  const t = useT()
  const picker = usePicker()
  return (
    <form
      className="w-full max-w-xs space-y-3"
      onSubmit={(event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        customToast.success(t.sent, { description: String(data.get("phone")) })
      }}
    >
      <div className="grid gap-2">
        <Label htmlFor="phone-form">{t.phone}</Label>
        <PhoneInput
          id="phone-form"
          name="phone"
          defaultCountry={t.defaultCountry}
          {...picker}
        />
      </div>
      <Button type="submit" className="h-9 px-4">
        {t.submit}
      </Button>
    </form>
  )
}
