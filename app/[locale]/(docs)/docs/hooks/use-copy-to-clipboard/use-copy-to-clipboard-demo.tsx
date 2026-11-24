"use client"

import { Check, Copy } from "lucide-react"
import { useLocale } from "next-intl"
import * as React from "react"
import { useCopyToast } from "@/hooks/use-copy-toast"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { useCopyToClipboard } from "@/registry/gooseui/hooks/use-copy-to-clipboard"
import { Button } from "@/registry/gooseui/ui/button"
import { Input } from "@/registry/gooseui/ui/input"

const en = {
  inputLabel: "Text to copy",
  initial: "Hello from the clipboard",
  copy: "Copy",
  copied: "Copied",
  state: "copied",
  toast: "Copied to clipboard",
  colors: "Palette",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    inputLabel: "Текст для копирования",
    initial: "Привет из буфера обмена",
    copy: "Копировать",
    copied: "Скопировано",
    state: "copied",
    toast: "Скопировано в буфер обмена",
    colors: "Палитра",
  },
}

const buttonClass =
  "inline-flex h-9 cursor-pointer items-center gap-2 rounded-md border bg-background px-3 text-sm font-medium outline-none transition-colors hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50"

export function UseCopyToClipboardDemo() {
  const t = content[useLocale() as Locale]
  const [text, setText] = React.useState(t.initial)
  const toast = useCopyToast()()
  const { copy, copied } = useCopyToClipboard({
    onCopy: toast.onCopy,
    onError: toast.onCopyError,
  })
  const inputId = React.useId()

  return (
    <div className="w-full max-w-sm space-y-3 px-4">
      <label htmlFor={inputId} className="text-sm font-medium">
        {t.inputLabel}
      </label>
      <div className="flex gap-2">
        <Input
          id={inputId}
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="h-9 min-w-0 flex-1 rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
        <Button
          variant="ghost"
          type="button"
          onClick={() => copy(text)}
          className={buttonClass}
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? t.copied : t.copy}
        </Button>
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        {t.state}: {String(copied)}
      </p>
    </div>
  )
}

export function UseCopyToastDemo() {
  const t = content[useLocale() as Locale]
  const toast = useCopyToast()(t.toast)
  const { copy } = useCopyToClipboard({
    onCopy: toast.onCopy,
    onError: toast.onCopyError,
  })

  return (
    <Button
      variant="ghost"
      type="button"
      onClick={() => copy("npm install motion")}
      className={cn(buttonClass, "font-mono")}
    >
      <Copy className="size-4" />
      npm install motion
    </Button>
  )
}

const swatches = ["#0f172a", "#2563eb", "#16a34a", "#f59e0b", "#e11d48"]

export function UseCopyListDemo() {
  const t = content[useLocale() as Locale]
  const toast = useCopyToast()()
  const { copy, copiedText } = useCopyToClipboard({
    timeout: 1500,
    onCopy: toast.onCopy,
    onError: toast.onCopyError,
  })

  return (
    <div className="space-y-2">
      <p className="text-center text-xs text-muted-foreground">{t.colors}</p>
      <div className="flex flex-wrap justify-center gap-1">
        {swatches.map((hex) => (
          <Button
            variant="ghost"
            key={hex}
            type="button"
            onClick={() => copy(hex)}
            aria-label={`${t.copy} ${hex}`}
            className="group h-auto w-20 cursor-pointer flex-col gap-1.5 rounded-lg p-1.5 outline-none hover:scale-100 focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <span
              className="relative flex size-12 items-center justify-center overflow-hidden rounded-lg text-white shadow-sm ring-1 ring-black/10 ring-inset transition-transform group-hover:scale-105 dark:ring-white/15"
              style={{ backgroundColor: hex }}
            >
              <Check
                className={cn(
                  "size-5 transition-all duration-200",
                  copiedText === hex
                    ? "scale-100 opacity-100"
                    : "scale-50 opacity-0",
                )}
              />
            </span>
            <span
              className={cn(
                "w-full truncate text-center text-[11px] transition-colors",
                copiedText === hex
                  ? "font-medium text-foreground"
                  : "font-mono text-muted-foreground",
              )}
            >
              {copiedText === hex ? t.copied : hex}
            </span>
          </Button>
        ))}
      </div>
    </div>
  )
}
