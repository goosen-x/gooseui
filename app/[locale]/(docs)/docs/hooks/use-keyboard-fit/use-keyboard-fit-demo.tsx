"use client"

import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { useKeyboardFit } from "@/registry/gooseui/hooks/use-keyboard-fit"
import { Input } from "@/registry/gooseui/ui/input"
import { Slider } from "@/registry/gooseui/ui/slider"

const en = {
  keyboard: "Keyboard",
  open: "open",
  closed: "closed",
  height: "--keyboard-height",
  viewport: "--viewport-height",
  top: "--viewport-top",
  placeholder: "Tap here on a phone",
  hint: "On a desktop the keyboard stays closed. Open this page on a phone, tap the field and watch the values.",
  simulate: "Simulated keyboard",
  send: "Send",
  message: "Message",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    keyboard: "Клавиатура",
    open: "открыта",
    closed: "закрыта",
    height: "--keyboard-height",
    viewport: "--viewport-height",
    top: "--viewport-top",
    placeholder: "Коснитесь на телефоне",
    hint: "На компьютере клавиатура не открывается. Откройте страницу на телефоне, коснитесь поля и посмотрите на значения.",
    simulate: "Имитация клавиатуры",
    send: "Отправить",
    message: "Сообщение",
  },
}

function useRootVar(name: string) {
  const [value, setValue] = React.useState("")
  React.useEffect(() => {
    const read = () =>
      setValue(document.documentElement.style.getPropertyValue(name) || "-")
    read()
    const observer = new MutationObserver(read)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    })
    return () => observer.disconnect()
  }, [name])
  return value
}

export function UseKeyboardFitDemo() {
  const t = content[useLocale() as Locale]
  const { height, open } = useKeyboardFit()
  const viewport = useRootVar("--viewport-height")
  const top = useRootVar("--viewport-top")

  const rows = [
    [t.keyboard, open ? t.open : t.closed],
    [t.height, `${height}px`],
    [t.viewport, viewport],
    [t.top, top],
  ]

  return (
    <div className="w-full max-w-md space-y-4 px-4">
      <dl className="grid grid-cols-2 gap-2">
        {rows.map(([label, value]) => (
          <div key={label} className="rounded-lg border bg-background p-3">
            <dt className="font-mono text-[11px] text-muted-foreground">
              {label}
            </dt>
            <dd
              className={cn(
                "mt-1 font-mono text-lg tabular-nums",
                label === t.keyboard && open && "text-primary",
              )}
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>
      <Input
        type="text"
        placeholder={t.placeholder}
        className="h-10 w-full rounded-md border bg-background px-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <p className="text-xs text-muted-foreground">{t.hint}</p>
    </div>
  )
}

export function UseKeyboardFitSimulation() {
  const t = content[useLocale() as Locale]
  const [keyboard, setKeyboard] = React.useState(140)

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-4 px-4 sm:flex-row sm:items-start">
      <div className="relative h-80 w-44 shrink-0 overflow-hidden rounded-[1.75rem] border-4 border-foreground/80 bg-background">
        <div className="space-y-2 p-3">
          <div className="ml-auto h-6 w-24 rounded-lg bg-primary/80" />
          <div className="h-6 w-28 rounded-lg bg-muted" />
          <div className="ml-auto h-6 w-20 rounded-lg bg-primary/80" />
        </div>
        <div
          className="absolute inset-x-0 flex gap-1.5 border-t bg-card p-2 transition-[bottom] duration-150 motion-reduce:transition-none"
          style={{ bottom: keyboard }}
        >
          <div className="h-7 flex-1 rounded-md border bg-background px-2 text-[10px] leading-7 text-muted-foreground">
            {t.message}
          </div>
          <div className="h-7 rounded-md bg-primary px-2 text-[10px] leading-7 text-primary-foreground">
            {t.send}
          </div>
        </div>
        <div
          className="absolute inset-x-0 bottom-0 grid grid-cols-6 content-start gap-1 bg-muted p-1.5 transition-[height] duration-150 motion-reduce:transition-none"
          style={{ height: keyboard }}
        >
          {Array.from({ length: keyboard > 40 ? 18 : 0 }, (_, index) => (
            <span key={index} className="h-5 rounded-sm bg-background" />
          ))}
        </div>
      </div>
      <div className="w-full space-y-2 text-sm">
        <span className="flex justify-between">
          <span>{t.simulate}</span>
          <span className="font-mono text-muted-foreground">{keyboard}px</span>
        </span>
        <Slider
          label={t.simulate}
          min={0}
          max={180}
          value={keyboard}
          onValueChange={setKeyboard}
          className="w-full cursor-pointer accent-primary"
        />
      </div>
    </div>
  )
}
