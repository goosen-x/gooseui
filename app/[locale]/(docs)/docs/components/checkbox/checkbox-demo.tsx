"use client"

import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { customToast } from "@/lib/toast"
import { Button } from "@/registry/gooseui/ui/button"
import { Checkbox } from "@/registry/gooseui/ui/checkbox"

const en = {
  acceptTermsAndConditions: "Accept terms and conditions",
  defaultVariant: "Default variant",
  destructiveVariant: "Destructive variant",
  successVariant: "Success variant",
  smallSize: "Small size",
  defaultSize: "Default size",
  largeSize: "Large size",
  news: "Send me the newsletter",
  terms: "I accept the terms",
  submit: "Submit",
  sent: "Form value",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    acceptTermsAndConditions: "Принимаю условия использования",
    defaultVariant: "Вариант default",
    destructiveVariant: "Вариант destructive",
    successVariant: "Вариант success",
    smallSize: "Размер sm",
    defaultSize: "Размер default",
    largeSize: "Размер lg",
    news: "Присылать рассылку",
    terms: "Принимаю условия",
    submit: "Отправить",
    sent: "Значение формы",
  },
}

export function CheckboxPreview() {
  const t = content[useLocale() as Locale]

  return (
    <div className="flex items-center justify-center rounded-lg bg-muted/30 px-4 py-12">
      <Checkbox label={t.acceptTermsAndConditions} />
    </div>
  )
}

export function CheckboxVariants() {
  const t = content[useLocale() as Locale]

  return (
    <div className="flex flex-col gap-4">
      <Checkbox variant="default" label={t.defaultVariant} />
      <Checkbox variant="destructive" label={t.destructiveVariant} />
      <Checkbox variant="success" label={t.successVariant} />
    </div>
  )
}

export function CheckboxSizes() {
  const t = content[useLocale() as Locale]

  return (
    <div className="flex flex-col gap-4">
      <Checkbox size="sm" label={t.smallSize} />
      <Checkbox size="default" label={t.defaultSize} />
      <Checkbox size="lg" label={t.largeSize} />
    </div>
  )
}

export function CheckboxWithoutLabel() {
  return (
    <div className="flex items-center gap-4">
      <Checkbox size="sm" />
      <Checkbox size="default" />
      <Checkbox size="lg" />
    </div>
  )
}

export function CheckboxFormDemo() {
  const t = content[useLocale() as Locale]

  return (
    <form
      className="flex flex-col items-start gap-4"
      onSubmit={(event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        customToast.success(t.sent, {
          description: [...data.entries()]
            .map(([key, value]) => `${key}=${String(value)}`)
            .join(", "),
        })
      }}
    >
      <Checkbox name="news" value="yes" label={t.news} defaultChecked />
      <Checkbox name="terms" value="yes" label={t.terms} required />
      <Button type="submit" className="h-9 px-4">
        {t.submit}
      </Button>
    </form>
  )
}
