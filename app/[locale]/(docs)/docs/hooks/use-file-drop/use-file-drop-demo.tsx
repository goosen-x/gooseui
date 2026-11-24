"use client"

import { FileText, ImageIcon, Upload } from "lucide-react"
import { useLocale } from "next-intl"
import { useState } from "react"
import { customToast } from "@/lib/toast"
import { cn } from "@/lib/utils"
import { useFileDrop } from "@/registry/gooseui/hooks/use-file-drop"
import { Textarea } from "@/registry/gooseui/ui/textarea"

const text = {
  en: {
    drop: "Drag images here",
    release: "Release to drop",
    nested: "Nested elements do not make the highlight flicker",
    rejectedType: "Not an image",
    rejectedCount: "One file at a time",
    dropped: "Dropped",
    files: "files",
    notesTitle: "Notes",
    notesPlaceholder: "Drop a .txt or .md file onto this card to load it",
    notesDrop: "Drop to replace the text",
    disabled: "Disabled",
  },
  ru: {
    drop: "Перетащите сюда картинки",
    release: "Отпустите, чтобы бросить",
    nested: "Вложенные элементы не заставляют подсветку мигать",
    rejectedType: "Это не картинка",
    rejectedCount: "По одному файлу",
    dropped: "Получено",
    files: "файл(ов)",
    notesTitle: "Заметка",
    notesPlaceholder:
      "Бросьте на карточку файл .txt или .md, чтобы загрузить текст",
    notesDrop: "Отпустите, чтобы заменить текст",
    disabled: "Выключено",
  },
}

function useText() {
  return useLocale() === "ru" ? text.ru : text.en
}

export function UseFileDropDemo() {
  const t = useText()
  const [files, setFiles] = useState<File[]>([])
  const { isDragging, dropProps } = useFileDrop({
    accept: "image/*",
    multiple: true,
    onDrop: (dropped) => {
      setFiles(dropped)
      customToast.success(`${t.dropped}: ${dropped.length} ${t.files}`)
    },
    onReject: (rejected) =>
      customToast.error(t.rejectedType, {
        description: rejected.map((file) => file.name).join(", "),
      }),
  })

  return (
    <div className="w-full max-w-md px-4">
      <div
        {...dropProps}
        className={cn(
          "rounded-xl border-2 border-dashed bg-background p-6 transition-colors",
          isDragging && "border-primary bg-primary/5",
        )}
      >
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Upload className="size-5" />
          </span>
          <div>
            <p className="font-medium">{isDragging ? t.release : t.drop}</p>
            <p className="text-xs text-muted-foreground">{t.nested}</p>
          </div>
        </div>
        <ul className="mt-4 space-y-1 text-sm">
          {files.map((file) => (
            <li
              key={`${file.name}-${file.size}`}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <ImageIcon className="size-4 shrink-0" />
              <span className="truncate">{file.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function UseFileDropNotesDemo() {
  const t = useText()
  const [notes, setNotes] = useState("")
  const { isDragging, dropProps } = useFileDrop({
    accept: [".txt", ".md", "text/plain"],
    onDrop: async ([file]) => setNotes(await file.text()),
    onReject: (_files, reason) =>
      customToast.error(reason === "count" ? t.rejectedCount : t.rejectedType),
  })

  return (
    <div className="w-full max-w-md px-4">
      <div
        {...dropProps}
        className="relative rounded-xl border bg-card p-4 text-card-foreground"
      >
        <div className="mb-2 flex items-center gap-2 text-sm font-medium">
          <FileText className="size-4" />
          {t.notesTitle}
        </div>
        <Textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder={t.notesPlaceholder}
          rows={4}
          aria-label={t.notesTitle}
          className="w-full resize-none rounded-md border bg-background p-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
        {isDragging && (
          <div className="absolute inset-0 flex items-center justify-center rounded-xl border-2 border-primary bg-background/90 text-sm font-medium">
            {t.notesDrop}
          </div>
        )}
      </div>
    </div>
  )
}
