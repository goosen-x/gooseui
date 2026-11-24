"use client"

import { MessageCircle, RotateCcw } from "lucide-react"
import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import {
  resetDeferredInteraction,
  useDeferredInteraction,
} from "@/registry/gooseui/hooks/use-deferred-interaction"
import { Button } from "@/registry/gooseui/ui/button"

const en = {
  waiting: "Waiting for the first interaction",
  waitingHint:
    "Scroll, press a key or tap anywhere. Without that, the widget loads after 15 seconds.",
  ready: "Ready to load",
  readyHint: "Third-party scripts can start now",
  chat: "Support chat",
  chatText: "Hi! Ask us anything.",
  reset: "Reset",
  shared: "Same flag, another component",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    waiting: "Ждём первого действия",
    waitingHint:
      "Прокрутите, нажмите клавишу или коснитесь экрана. Если ничего не делать, виджет загрузится через 15 секунд.",
    ready: "Можно загружать",
    readyHint: "Сторонние скрипты уже можно подключать",
    chat: "Чат поддержки",
    chatText: "Здравствуйте! Спрашивайте.",
    reset: "Сбросить",
    shared: "Тот же флаг в другом компоненте",
  },
}

function SharedBadge() {
  const t = content[useLocale() as Locale]
  const ready = useDeferredInteraction(null)
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <span
        className={cn(
          "size-2 rounded-full",
          ready ? "bg-primary" : "bg-muted-foreground/40",
        )}
      />
      {t.shared}:{" "}
      <span className="font-mono text-foreground">{String(ready)}</span>
    </div>
  )
}

export function UseDeferredInteractionDemo() {
  const t = content[useLocale() as Locale]
  const ready = useDeferredInteraction(15_000)

  return (
    <div className="w-full max-w-md space-y-4 px-4">
      <div className="rounded-lg border bg-background p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="font-medium">{ready ? t.ready : t.waiting}</div>
            <p className="mt-1 text-sm text-muted-foreground">
              {ready ? t.readyHint : t.waitingHint}
            </p>
          </div>
          <Button
            variant="ghost"
            type="button"
            onClick={() => resetDeferredInteraction()}
            className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-md border bg-background px-2.5 py-1 text-xs hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
            {t.reset}
          </Button>
        </div>
        <div className="mt-4 border-t pt-3">
          <SharedBadge />
        </div>
      </div>

      <div className="flex justify-end">
        {ready ? (
          <div className="flex items-end gap-2 animate-in fade-in-0 slide-in-from-bottom-2 motion-reduce:animate-none">
            <div className="rounded-lg rounded-br-none border bg-card px-3 py-2 text-sm shadow-sm">
              <div className="text-xs font-medium">{t.chat}</div>
              {t.chatText}
            </div>
            <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
              <MessageCircle className="size-5" aria-hidden="true" />
            </span>
          </div>
        ) : (
          <span className="size-10 rounded-full border border-dashed" />
        )}
      </div>
    </div>
  )
}
