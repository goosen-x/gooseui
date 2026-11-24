"use client"

import { useCopyToast } from "@/hooks/use-copy-toast"
import type { Locale } from "@/i18n/routing"
import {
  ShareButtons,
  type ShareButtonsLabels,
} from "@/registry/gooseui/ui/share-buttons"

const ruLabels: ShareButtonsLabels = {
  share: "Поделиться",
  copy: "Скопировать ссылку",
  copied: "Ссылка скопирована",
  native: "Другие способы…",
  shareOn: (name) => `Поделиться: ${name}`,
}

type DemoProps = { locale: Locale }

// The registry component reports `copy` through onShare; the toast lives on the site.
function useShareToast() {
  const toast = useCopyToast()()
  return (action: string) => {
    if (action === "copy") toast.onCopy()
  }
}

// No url: the island fills in the address of this page on click
export function ShareButtonsDemo({ locale }: DemoProps) {
  const ru = locale === "ru"
  const onShare = useShareToast()
  return <ShareButtons onShare={onShare} labels={ru ? ruLabels : undefined} />
}

export function ShareButtonsLabeledDemo({ locale }: DemoProps) {
  const ru = locale === "ru"
  const onShare = useShareToast()
  return (
    <ShareButtons
      onShare={onShare}
      networks={["telegram", "whatsapp", "x"]}
      showLabels
      size="sm"
      className="justify-center"
      labels={ru ? ruLabels : undefined}
    />
  )
}

export function ShareButtonsMenuDemo({ locale }: DemoProps) {
  const ru = locale === "ru"
  const onShare = useShareToast()
  return (
    <ShareButtons
      onShare={onShare}
      layout="menu"
      url="https://example.com/articles/hello"
      title={ru ? "Пример статьи" : "Example article"}
      networks={["telegram", "whatsapp", "x", "linkedin", "facebook", "email"]}
      align="center"
      labels={ru ? ruLabels : undefined}
    />
  )
}

export function ShareButtonsSizesDemo({ locale }: DemoProps) {
  const ru = locale === "ru"
  const onShare = useShareToast()
  return (
    <div className="flex flex-col items-center gap-4">
      {(["sm", "default", "lg"] as const).map((size) => (
        <ShareButtons
          key={size}
          onShare={onShare}
          size={size}
          networks={["telegram", "whatsapp", "x", "linkedin", "email"]}
          labels={ru ? ruLabels : undefined}
        />
      ))}
    </div>
  )
}

export function ShareButtonsBrandDemo({ locale }: DemoProps) {
  const ru = locale === "ru"
  const onShare = useShareToast()
  return (
    <ShareButtons
      onShare={onShare}
      variant="brand"
      labels={ru ? ruLabels : undefined}
    />
  )
}
