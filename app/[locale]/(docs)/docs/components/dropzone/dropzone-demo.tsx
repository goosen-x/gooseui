"use client"

import { ImagePlus } from "lucide-react"
import { useLocale } from "next-intl"
import { useState } from "react"
import { customToast } from "@/lib/toast"
import { Button } from "@/registry/gooseui/ui/button"
import { Dropzone, formatBytes } from "@/registry/gooseui/ui/dropzone"

const text = {
  en: {
    sample: "Add a sample image",
    sent: "Files ready",
    submit: "Upload",
    front: "Front side",
    back: "Back side",
    imagesHint: undefined,
    slotHint: undefined,
    docsHint: "PDF or Word, up to 10 MB",
    labels: undefined,
  },
  ru: {
    sample: "Добавить пример картинки",
    sent: "Файлы готовы",
    submit: "Загрузить",
    front: "Лицевая сторона",
    back: "Обратная сторона",
    imagesHint: "До 2 МБ · не больше 4 файлов",
    slotHint: "До 5 МБ",
    docsHint: "PDF или Word, до 10 МБ",
    labels: {
      title: "Перетащите файлы сюда или нажмите, чтобы выбрать",
      dragging: "Отпустите, чтобы добавить",
      slotTitle: "Добавить фото",
      replace: "Заменить",
      remove: "Удалить",
      typeError: (file: File) => `${file.name}: такой тип файла не подходит`,
      sizeError: (file: File, max: number) =>
        `${file.name} больше ${formatBytes(max)}`,
      countError: (max: number) =>
        max === 1
          ? "Можно добавить только один файл"
          : `Не больше ${max} файлов`,
    },
  },
}

function useText() {
  return useLocale() === "ru" ? text.ru : text.en
}

const hues = [210, 280, 340, 30, 150]

/** Draws a gradient PNG so the demo works without files on hand. */
function makeSampleImage(index: number): Promise<File> {
  const canvas = document.createElement("canvas")
  canvas.width = 480
  canvas.height = 320
  const ctx = canvas.getContext("2d")
  const hue = hues[index % hues.length]
  if (ctx) {
    const gradient = ctx.createLinearGradient(0, 0, 480, 320)
    gradient.addColorStop(0, `hsl(${hue} 80% 60%)`)
    gradient.addColorStop(1, `hsl(${(hue + 60) % 360} 80% 45%)`)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 480, 320)
    ctx.fillStyle = "rgba(255,255,255,0.35)"
    ctx.beginPath()
    ctx.arc(360, 90, 50, 0, Math.PI * 2)
    ctx.fill()
  }
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(
        new File([blob ?? new Blob()], `sample-${index + 1}.png`, {
          type: "image/png",
          lastModified: Date.now(),
        }),
      )
    }, "image/png")
  })
}

export function DropzoneDemo() {
  const t = useText()
  const [files, setFiles] = useState<File[]>([])
  const [count, setCount] = useState(0)

  return (
    <div className="w-full max-w-md space-y-3 px-4">
      <Dropzone
        accept="image/*"
        maxSize={2 * 1024 * 1024}
        maxFiles={4}
        value={files}
        onValueChange={setFiles}
        labels={{ ...t.labels, hint: t.imagesHint }}
      />
      <div className="flex items-center justify-between gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={files.length >= 4}
          onClick={async () => {
            const file = await makeSampleImage(count)
            setCount((value) => value + 1)
            setFiles((current) => [...current, file])
          }}
          className="text-muted-foreground"
        >
          <ImagePlus className="size-4" />
          {t.sample}
        </Button>
        <Button
          type="button"
          size="sm"
          disabled={files.length === 0}
          onClick={() =>
            customToast.success(t.sent, {
              description: files.map((file) => file.name).join(", "),
            })
          }
        >
          {t.submit}
        </Button>
      </div>
    </div>
  )
}

export function DropzoneSlotDemo() {
  const t = useText()
  return (
    <div className="flex flex-wrap justify-center gap-4 px-4">
      {[t.front, t.back].map((label) => (
        <div key={label} className="space-y-2">
          <Dropzone
            variant="slot"
            accept="image/png,image/jpeg,image/webp"
            maxSize={5 * 1024 * 1024}
            labels={{ ...t.labels, hint: t.slotHint }}
            aria-label={label}
          />
          <p className="text-center text-xs text-muted-foreground">{label}</p>
        </div>
      ))}
    </div>
  )
}

export function DropzoneDocumentsDemo() {
  const t = useText()
  return (
    <div className="w-full max-w-md px-4">
      <Dropzone
        accept=".pdf,.doc,.docx,application/pdf"
        maxSize={10 * 1024 * 1024}
        maxFiles={1}
        labels={{ ...t.labels, hint: t.docsHint }}
      />
    </div>
  )
}
