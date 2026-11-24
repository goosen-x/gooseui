"use client"

import { useLocale } from "next-intl"
import { useCopyToast } from "@/hooks/use-copy-toast"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { CopyField } from "@/registry/gooseui/ui/copy-field"

const en = {
  title: "Customer",
  name: "Name",
  nameValue: "Alex Morgan",
  emailValue: "alex.morgan@example.com",
  email: "Email",
  phone: "Phone",
  order: "Order",
  address: "Address",
  addressValue: "221 Pine Street, Apartment 14, Springfield, 49201",
  apiKey: "API key",
  copy: "Copy",
  copied: "Copied",
  copiedToast: "Copied",
  emailCopied: "Email copied",
  keyCopied: "API key copied",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    title: "Клиент",
    name: "Имя",
    nameValue: "Анна Смирнова",
    emailValue: "anna.smirnova@example.com",
    email: "Почта",
    phone: "Телефон",
    order: "Заказ",
    address: "Адрес",
    addressValue: "ул. Садовая, д. 12, кв. 48, г. Тихоречье, 123456",
    apiKey: "API-ключ",
    copy: "Копировать",
    copied: "Скопировано",
    copiedToast: "Скопировано",
    emailCopied: "Email скопирован",
    keyCopied: "API-ключ скопирован",
  },
}

const API_KEY = "demo_key_7f3k29qd4mvb0r8npz6wcy"

export function CopyFieldDemo() {
  const t = content[useLocale() as Locale]
  const copyToast = useCopyToast()
  const labels = { copy: t.copy, copied: t.copied }
  const labelClassName = "w-20"

  return (
    <div className="w-full max-w-sm space-y-1 rounded-lg border bg-background p-4">
      <div className="mb-2 text-sm font-semibold">{t.title}</div>
      <CopyField
        label={t.name}
        value={t.nameValue}
        {...copyToast(t.copiedToast)}
        labels={labels}
        labelClassName={labelClassName}
      />
      <CopyField
        label={t.email}
        value={t.emailValue}
        {...copyToast(t.emailCopied)}
        labels={labels}
        labelClassName={labelClassName}
      />
      <CopyField
        label={t.phone}
        value="+1 555 0142 778"
        {...copyToast(t.copiedToast)}
        labels={labels}
        labelClassName={labelClassName}
      />
      <CopyField
        label={t.order}
        value="ORD-2048-7731"
        mono
        {...copyToast(t.copiedToast)}
        labels={labels}
        labelClassName={labelClassName}
      />
    </div>
  )
}

export function CopyFieldTruncateDemo() {
  const t = content[useLocale() as Locale]
  const copyToast = useCopyToast()
  const labels = { copy: t.copy, copied: t.copied }
  return (
    <div className="w-full max-w-xs space-y-1 rounded-lg border bg-background p-4">
      <CopyField
        label={t.address}
        value={t.addressValue}
        {...copyToast(t.copiedToast)}
        labels={labels}
      />
      <CopyField
        label={t.address}
        value={t.addressValue}
        truncate={false}
        {...copyToast(t.copiedToast)}
        labels={labels}
      />
    </div>
  )
}

export function CopyFieldMaskedDemo() {
  const t = content[useLocale() as Locale]
  const copyToast = useCopyToast()
  return (
    <div className="w-full max-w-sm rounded-lg border bg-background p-4">
      <CopyField
        label={t.apiKey}
        value={API_KEY}
        displayValue={`${API_KEY.slice(0, 8)}••••••••${API_KEY.slice(-4)}`}
        mono
        {...copyToast(t.keyCopied)}
        labels={{ copy: t.copy, copied: t.copied }}
      />
    </div>
  )
}
