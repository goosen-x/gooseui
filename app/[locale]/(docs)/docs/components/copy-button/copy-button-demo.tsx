"use client"

import { useLocale } from "next-intl"
import { useCopyToast } from "@/hooks/use-copy-toast"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { CopyButton } from "@/registry/gooseui/ui/copy-button"

const en = {
  token: "Invite code",
  icon: "icon",
  label: "label",
  inline: "inline",
  copy: "Copy",
  copied: "Copied",
  copyLink: "Copy link",
  linkCopied: "Link copied",
  codeCopied: "Code copied",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    token: "Код приглашения",
    icon: "icon",
    label: "label",
    inline: "inline",
    copy: "Копировать",
    copied: "Скопировано",
    copyLink: "Копировать ссылку",
    linkCopied: "Ссылка скопирована",
    codeCopied: "Код скопирован",
  },
}

const CODE = "GOOSE-7F3K-29QD"
const LINK = "https://example.com/invite/7f3k29qd"

/** All three variants side by side. */
export function CopyButtonDemo() {
  const t = content[useLocale() as Locale]
  const copyToast = useCopyToast()
  const labels = { copy: t.copy, copied: t.copied }
  return (
    <div className="flex w-full max-w-sm flex-col gap-4 px-4">
      <div className="flex items-center justify-between gap-2 rounded-lg border bg-background py-1.5 pr-1.5 pl-3">
        <div className="min-w-0">
          <div className="text-xs text-muted-foreground">{t.token}</div>
          <code className="font-mono text-sm">{CODE}</code>
        </div>
        <CopyButton value={CODE} {...copyToast(t.codeCopied)} labels={labels} />
      </div>
      <div className="flex items-center justify-between gap-1 rounded-md border bg-background py-1 pr-1 pl-2.5 text-sm">
        <span className="truncate font-mono text-[0.92em]">{LINK}</span>
        <CopyButton
          variant="inline"
          value={LINK}
          {...copyToast(t.linkCopied)}
          labels={{ copy: t.copyLink, copied: t.linkCopied }}
        />
      </div>
      <div className="flex justify-center">
        <CopyButton
          value={LINK}
          variant="label"
          {...copyToast(t.linkCopied)}
          labels={{ copy: t.copyLink, copied: t.linkCopied }}
        />
      </div>
    </div>
  )
}

export function CopyButtonVariantsDemo() {
  const t = content[useLocale() as Locale]
  const copyToast = useCopyToast()
  const props = {
    ...copyToast(t.codeCopied),
    labels: { copy: t.copy, copied: t.copied },
  }
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <CopyButton value="sm" size="sm" {...props} />
      <CopyButton value="md" {...props} />
      <CopyButton value="sm" size="sm" variant="label" {...props} />
      <CopyButton value="md" variant="label" {...props} />
      <CopyButton value="inline" variant="inline" {...props} />
    </div>
  )
}

/** onCopy with a plain callback: the toast comes from the site, not from the component. */
export function CopyButtonToastDemo() {
  const t = content[useLocale() as Locale]
  const copyToast = useCopyToast()
  return (
    <CopyButton
      value={LINK}
      variant="label"
      {...copyToast(t.linkCopied)}
      labels={{ copy: t.copyLink, copied: t.linkCopied }}
    />
  )
}
