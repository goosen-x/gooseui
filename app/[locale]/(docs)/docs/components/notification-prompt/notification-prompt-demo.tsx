"use client"

import { RotateCcw } from "lucide-react"
import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { customToast } from "@/lib/toast"
import { useNotificationPermission } from "@/registry/gooseui/hooks/use-notification-permission"
import { Button } from "@/registry/gooseui/ui/button"
import { NotificationPrompt } from "@/registry/gooseui/ui/notification-prompt"

const en = {
  labels: {
    title: "Turn on notifications",
    description: "We will tell you when something needs your attention.",
    enable: "Allow",
    dismiss: "Not now",
    deniedTitle: "Notifications are blocked",
    deniedDescription:
      "Allow them in your browser's site settings, then reload the page.",
    deniedDismiss: "Got it",
    close: "Close",
  },
  showAgain: "Show again",
  permission: "Browser permission",
  testTitle: "GooseUI",
  testBody: "Notifications are on. This is a test message.",
  granted: "Permission granted",
  denied: "The browser blocked notifications",
  dismissed: "Dismissed. A real app stays quiet for 7 days",
  testFailed: "Permission granted, but this browser cannot show a test message",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    labels: {
      title: "Включить уведомления",
      description: "Сообщим, когда понадобится ваше внимание.",
      enable: "Разрешить",
      dismiss: "Не сейчас",
      deniedTitle: "Уведомления заблокированы",
      deniedDescription:
        "Разрешите их в настройках сайта в браузере и обновите страницу.",
      deniedDismiss: "Понятно",
      close: "Закрыть",
    },
    showAgain: "Показать снова",
    permission: "Разрешение браузера",
    testTitle: "GooseUI",
    testBody: "Уведомления включены. Это тестовое сообщение.",
    granted: "Разрешение получено",
    denied: "Браузер заблокировал уведомления",
    dismissed: "Отказ принят. Настоящее приложение промолчит 7 дней",
    testFailed:
      "Разрешение получено, но этот браузер не может показать тестовое сообщение",
  },
}

function useReplay() {
  const [key, setKey] = React.useState(0)
  return { key, replay: () => setKey((value) => value + 1) }
}

function ReplayButton({
  onClick,
  children,
}: {
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Button type="button" variant="outline" size="sm" onClick={onClick}>
      <RotateCcw />
      {children}
    </Button>
  )
}

export function NotificationPromptDemo() {
  const t = content[useLocale() as Locale]
  const { key, replay } = useReplay()
  const { permission } = useNotificationPermission()

  const granted = () => {
    customToast.success(t.granted)
    try {
      new Notification(t.testTitle, { body: t.testBody })
    } catch {
      customToast.info(t.testFailed)
    }
  }

  return (
    <div className="flex w-full flex-col items-center gap-4 px-4">
      <div className="flex min-h-[148px] w-full items-center justify-center">
        <NotificationPrompt
          key={key}
          forceShow="default"
          delay={0}
          labels={t.labels}
          onGranted={granted}
          onDenied={() => customToast.error(t.denied)}
          onDismiss={() => customToast.info(t.dismissed)}
        />
      </div>
      <ReplayButton onClick={replay}>{t.showAgain}</ReplayButton>
      <p className="text-xs text-muted-foreground">
        {t.permission}:{" "}
        <code className="font-mono text-foreground">{permission}</code>
      </p>
    </div>
  )
}

export function NotificationPromptDeniedDemo() {
  const t = content[useLocale() as Locale]
  const { key, replay } = useReplay()
  return (
    <div className="flex w-full flex-col items-center gap-4 px-4">
      <div className="flex min-h-[132px] w-full items-center justify-center">
        <NotificationPrompt
          key={key}
          forceShow="denied"
          whenDenied="hint"
          delay={0}
          labels={t.labels}
        />
      </div>
      <ReplayButton onClick={replay}>{t.showAgain}</ReplayButton>
    </div>
  )
}

export function NotificationPromptCompactDemo() {
  const t = content[useLocale() as Locale]
  const { key, replay } = useReplay()
  return (
    <div className="flex w-full flex-col items-center gap-4 px-4">
      <div className="flex min-h-[76px] w-full items-center justify-center">
        <NotificationPrompt
          key={key}
          compact
          forceShow="default"
          delay={0}
          labels={t.labels}
          onGranted={() => customToast.success(t.granted)}
          onDenied={() => customToast.error(t.denied)}
        />
      </div>
      <ReplayButton onClick={replay}>{t.showAgain}</ReplayButton>
    </div>
  )
}
