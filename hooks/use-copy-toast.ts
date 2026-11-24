"use client"

import { useLocale } from "next-intl"
import { useMemo } from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { customToast } from "@/lib/toast"

const en = {
  copy: "Copy",
  copied: "Copied",
  failed: "Couldn't copy",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    copy: "Копировать",
    copied: "Скопировано",
    failed: "Не удалось скопировать",
  },
}

/**
 * Site-side bridge between copy controls and toasts. Registry components know
 * nothing about toasts: spread the result into `CopyButton`. It also carries
 * localized `labels` for the button.
 *
 *     <CopyButton value={code} {...copyToast("Code copied")} />
 */
export function useCopyToast() {
  const t = content[useLocale() as Locale]
  return useMemo(
    () => (message?: string) => ({
      onCopy: () => customToast.success(message ?? t.copied),
      onCopyError: () => customToast.error(t.failed),
      // Localized accessible names; pass `labels` after the spread to override.
      labels: { copy: t.copy, copied: t.copied },
    }),
    [t],
  )
}
