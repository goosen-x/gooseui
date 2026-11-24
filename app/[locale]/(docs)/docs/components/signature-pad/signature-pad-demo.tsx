"use client"

import { Download, Eraser, Undo2 } from "lucide-react"
import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { customToast } from "@/lib/toast"
import { Button } from "@/registry/gooseui/ui/button"
import {
  SignaturePad,
  type SignaturePadHandle,
} from "@/registry/gooseui/ui/signature-pad"

const en = {
  canvas: "Signature pad",
  placeholder: "Sign here",
  undo: "Undo",
  clear: "Clear",
  save: "Save PNG",
  saved: "Signature saved",
  savedText: (w: number, h: number, kb: string) =>
    `Trimmed image ${w}×${h} px, ${kb} KB`,
  result: "Trimmed result",
  empty: "Draw something first",
  drawing: "Drawing…",
  idle: "Waiting for the pen",
  strokes: (n: number) => `Strokes: ${n}`,
  submit: "Confirm",
  draw: "Draw",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    canvas: "Поле для подписи",
    placeholder: "Распишитесь здесь",
    undo: "Отменить",
    clear: "Стереть",
    save: "Сохранить PNG",
    saved: "Подпись сохранена",
    savedText: (w: number, h: number, kb: string) =>
      `Обрезанная картинка ${w}×${h} px, ${kb} КБ`,
    result: "Обрезанный результат",
    empty: "Сначала нарисуйте что-нибудь",
    drawing: "Рисуем…",
    idle: "Ждём перо",
    strokes: (n: number) => `Штрихов: ${n}`,
    submit: "Подтвердить",
    draw: "Рисуйте",
  },
}

function useT() {
  return content[useLocale() as Locale]
}

function useObjectUrl() {
  const [url, setUrl] = React.useState<string | null>(null)
  React.useEffect(
    () => () => {
      if (url) URL.revokeObjectURL(url)
    },
    [url],
  )
  return [url, setUrl] as const
}

export function SignaturePadPreviewDemo() {
  const t = useT()
  const pad = React.useRef<SignaturePadHandle>(null)
  const [empty, setEmpty] = React.useState(true)
  const [url, setUrl] = useObjectUrl()

  const save = async () => {
    if (!pad.current || pad.current.isEmpty()) {
      customToast.warning(t.empty)
      return
    }
    // Dark ink on transparent background works on any document
    const blob = await pad.current.toBlob({ trim: true, color: "#111827" })
    if (!blob) return
    const img = new Image()
    const next = URL.createObjectURL(blob)
    img.onload = () =>
      customToast.success(t.saved, {
        description: t.savedText(
          img.naturalWidth,
          img.naturalHeight,
          (blob.size / 1024).toFixed(1),
        ),
      })
    img.src = next
    setUrl(next)
  }

  return (
    <div className="w-full max-w-lg space-y-3 px-4">
      <SignaturePad
        ref={pad}
        onChange={(state) => setEmpty(state.isEmpty)}
        labels={{ canvas: t.canvas, placeholder: t.placeholder }}
      />
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer"
          disabled={empty}
          onClick={() => pad.current?.undo()}
        >
          <Undo2 className="size-4" aria-hidden="true" />
          {t.undo}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer"
          disabled={empty}
          onClick={() => {
            pad.current?.clear()
            setUrl(null)
          }}
        >
          <Eraser className="size-4" aria-hidden="true" />
          {t.clear}
        </Button>
        <Button
          size="sm"
          className="ml-auto cursor-pointer"
          disabled={empty}
          onClick={save}
        >
          <Download className="size-4" aria-hidden="true" />
          {t.save}
        </Button>
      </div>
      {url && (
        <div className="space-y-1.5">
          <p className="text-xs text-muted-foreground">{t.result}</p>
          <img
            src={url}
            alt={t.result}
            className="max-h-24 rounded-md border bg-white p-2"
          />
        </div>
      )}
    </div>
  )
}

export function SignaturePadPenDemo() {
  const t = useT()
  return (
    <div className="grid w-full max-w-lg gap-3 px-4 sm:grid-cols-2">
      <SignaturePad
        penWidth={4}
        showGuide={false}
        className="h-36 border-solid text-primary"
        labels={{ canvas: t.canvas, placeholder: t.draw }}
      />
      <SignaturePad
        penColor="#2563eb"
        penWidth={1.5}
        className="h-36 bg-muted/40"
        labels={{ canvas: t.canvas, placeholder: t.placeholder }}
      />
    </div>
  )
}

export function SignaturePadEventsDemo() {
  const t = useT()
  const [drawing, setDrawing] = React.useState(false)
  const [count, setCount] = React.useState(0)
  return (
    <div className="w-full max-w-lg space-y-3 px-4">
      <SignaturePad
        className="h-40"
        onBegin={() => setDrawing(true)}
        onEnd={() => setDrawing(false)}
        onChange={(state) => setCount(state.strokeCount)}
        labels={{ canvas: t.canvas, placeholder: t.placeholder }}
      />
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="text-muted-foreground" aria-live="polite">
          {drawing ? t.drawing : t.idle} · {t.strokes(count)}
        </span>
        <Button
          size="sm"
          className="cursor-pointer"
          disabled={count === 0}
          onClick={() => customToast.success(t.submit)}
        >
          {t.submit}
        </Button>
      </div>
    </div>
  )
}
