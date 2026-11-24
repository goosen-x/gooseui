"use client"

import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { customToast } from "@/lib/toast"
import { Button } from "@/registry/gooseui/ui/button"
import { Label } from "@/registry/gooseui/ui/label"
import { Switch } from "@/registry/gooseui/ui/switch"

const en = {
  notifications: "Notifications",
  darkTheme: "Dark theme",
  sound: "Sound",
  save: "Save",
  saved: "Form data",
  on: "on",
  off: "off",
}
const content: Dict<typeof en> = {
  en,
  ru: {
    notifications: "Уведомления",
    darkTheme: "Тёмная тема",
    sound: "Звук",
    save: "Сохранить",
    saved: "Данные формы",
    on: "включены",
    off: "выключены",
  },
}

function useNotify() {
  const t = content[useLocale() as Locale]
  return (label: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    customToast.success(`${label}: ${e.currentTarget.checked ? t.on : t.off}`, {
      duration: 2000,
    })
}

export function PreviewDemo() {
  const t = content[useLocale() as Locale]
  const notify = useNotify()
  return (
    <Switch
      aria-label={t.notifications}
      defaultChecked
      onChange={notify(t.notifications)}
    />
  )
}

export function SizesDemo() {
  const t = content[useLocale() as Locale]
  const notify = useNotify()
  return (
    <>
      {(["sm", "default", "lg"] as const).map((size) => (
        <Switch
          key={size}
          size={size}
          aria-label={t.notifications}
          defaultChecked
          onChange={notify(t.notifications)}
        />
      ))}
    </>
  )
}

export function LabelDemo() {
  const t = content[useLocale() as Locale]
  const notify = useNotify()
  return (
    <>
      <Switch id="label-switch" onChange={notify(t.sound)} />
      <Label htmlFor="label-switch" className="cursor-pointer">
        {t.sound}
      </Label>
    </>
  )
}

export function SettingsDemo() {
  const t = content[useLocale() as Locale]
  const notify = useNotify()
  return (
    <ul className="grid w-64 gap-4">
      {[
        ["notifications", t.notifications, true],
        ["dark", t.darkTheme, false],
        ["sound", t.sound, true],
      ].map(([id, label, on]) => (
        <li key={id as string} className="flex items-center justify-between">
          <Label htmlFor={`settings-${id}`} className="cursor-pointer">
            {label}
          </Label>
          <Switch
            id={`settings-${id}`}
            defaultChecked={on as boolean}
            onChange={notify(label as string)}
          />
        </li>
      ))}
    </ul>
  )
}

export function FormDemo() {
  const t = content[useLocale() as Locale]
  return (
    <form
      className="grid w-64 gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.currentTarget))
        customToast.success(t.saved, { description: JSON.stringify(data) })
      }}
    >
      <div className="flex items-center justify-between">
        <Label htmlFor="form-news" className="cursor-pointer">
          {t.notifications}
        </Label>
        <Switch
          id="form-news"
          name="notifications"
          value="yes"
          defaultChecked
        />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="form-sound" className="cursor-pointer">
          {t.sound}
        </Label>
        <Switch id="form-sound" name="sound" value="on" />
      </div>
      <Button type="submit">{t.save}</Button>
    </form>
  )
}
