"use client"

import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { customToast } from "@/lib/toast"
import { useNotificationPermission } from "@/registry/gooseui/hooks/use-notification-permission"
import { Button } from "@/registry/gooseui/ui/button"

const en = {
  request: "Ask for permission",
  dismiss: "Dismiss",
  reset: "Reset dismissal",
  resetDone: "Dismissal cleared",
  result: "Browser answer",
  note: "Permission is read from the browser. If you already answered, change it in the site settings to try again.",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    request: "Спросить разрешение",
    dismiss: "Отказаться",
    reset: "Сбросить отказ",
    resetDone: "Отказ сброшен",
    result: "Ответ браузера",
    note: "Разрешение читается из браузера. Если вы уже ответили, измените его в настройках сайта, чтобы попробовать снова.",
  },
}

const DEMO_KEY = "gooseui-demo-notification-dismissed-at"

export function UseNotificationPermissionDemo() {
  const t = content[useLocale() as Locale]
  const notifications = useNotificationPermission({ storageKey: DEMO_KEY })

  const rows: [string, string][] = [
    ["permission", notifications.permission],
    ["isSupported", String(notifications.isSupported)],
    ["isDismissed", String(notifications.isDismissed)],
    ["shouldOffer", String(notifications.shouldOffer)],
  ]

  return (
    <div className="w-full max-w-sm space-y-4 px-4">
      <dl className="divide-y rounded-lg border bg-background font-mono text-sm">
        {rows.map(([name, value]) => (
          <div
            key={name}
            className="flex items-center justify-between px-4 py-2"
          >
            <dt>{name}</dt>
            <dd
              className={
                value === "true" || value === "granted"
                  ? "text-foreground"
                  : "text-muted-foreground"
              }
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={async () => {
            const result = await notifications.request()
            customToast.info(`${t.result}: ${result}`)
          }}
        >
          {t.request}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={notifications.dismiss}
        >
          {t.dismiss}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            notifications.resetDismiss()
            customToast.info(t.resetDone)
          }}
        >
          {t.reset}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">{t.note}</p>
    </div>
  )
}
