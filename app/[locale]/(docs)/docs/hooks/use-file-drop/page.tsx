import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { UseFileDropDemo, UseFileDropNotesDemo } from "./use-file-drop-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  description: "Drag-and-drop files onto any element, with accept filtering",
  intro:
    "A hook that turns any element into a file drop target. It returns handlers to spread on the element and an isDragging flag. Nested children do not make the flag flicker, files are filtered by accept, and rejected ones come back with a reason.",
  preview: "Preview",
  previewHint:
    "Drag a few images from your desktop onto the box. Other files are rejected with a toast.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  notesTitle: "Drop onto an existing card",
  notesText:
    "The hook does not render anything, so the drop target can be any block: here a note card shows an overlay while a text file is over it. multiple is off, so two files at once are rejected with the count reason.",
  helperTitle: "Checking files yourself",
  helperText:
    "matchesAccept is exported too. Use it for files from a file picker or the clipboard, so every source follows the same rules.",
  parameters: "Parameters",
  returns: "Return value",
  headers: {
    name: "Name",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  paramAccept:
    'MIME types, wildcards and extensions, like the accept attribute: "image/*,.pdf"',
  paramMultiple: "Accept more than one file per drop",
  paramDisabled: "Ignore drags and drops",
  paramOnDrop: "Called with the accepted files",
  paramOnReject: 'Called with rejected files and the reason: "type" or "count"',
  retIsDragging: "true while files are dragged over the element",
  retDropProps:
    "onDragEnter, onDragOver, onDragLeave, onDrop and data-dragging for the element",
  features: "Features",
  featureList: [
    [
      "No flicker",
      "dragenter and dragleave fire for every child, so the hook counts depth instead of toggling a flag",
    ],
    ["Files only", "dragging text or links over the element is ignored"],
    [
      "Recovery",
      "a drop or a cancelled drag elsewhere on the page resets the state",
    ],
    [
      "Fresh callbacks",
      "onDrop and onReject can change between renders without re-binding",
    ],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description: "Перетаскивание файлов на любой элемент с фильтром по типу",
    intro:
      "Хук превращает любой элемент в зону для файлов. Он возвращает обработчики, которые нужно разложить на элемент, и флаг isDragging. Вложенные элементы не заставляют флаг мигать, файлы фильтруются по accept, а отклонённые приходят с причиной.",
    preview: "Превью",
    previewHint:
      "Перетащите на блок несколько картинок с рабочего стола. Остальные файлы будут отклонены с уведомлением.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    notesTitle: "Бросок на готовую карточку",
    notesText:
      "Хук ничего не рисует, поэтому зоной может быть любой блок: здесь карточка заметки показывает подложку, пока над ней текстовый файл. multiple выключен, и два файла сразу отклоняются с причиной count.",
    helperTitle: "Своя проверка файлов",
    helperText:
      "matchesAccept тоже экспортируется. С ним файлы из диалога выбора или буфера обмена проверяются по тем же правилам.",
    parameters: "Параметры",
    returns: "Что возвращает",
    headers: {
      name: "Имя",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    paramAccept:
      'MIME-типы, маски и расширения, как в атрибуте accept: "image/*,.pdf"',
    paramMultiple: "Принимать несколько файлов за раз",
    paramDisabled: "Не реагировать на перетаскивание",
    paramOnDrop: "Вызывается с принятыми файлами",
    paramOnReject:
      'Вызывается с отклонёнными файлами и причиной: "type" или "count"',
    retIsDragging: "true, пока файлы находятся над элементом",
    retDropProps:
      "onDragEnter, onDragOver, onDragLeave, onDrop и data-dragging для элемента",
    features: "Возможности",
    featureList: [
      [
        "Без мигания",
        "dragenter и dragleave приходят от каждого дочернего элемента, поэтому хук считает глубину, а не переключает флаг",
      ],
      ["Только файлы", "перетаскивание текста или ссылок хук пропускает"],
      [
        "Сброс",
        "бросок или отменённое перетаскивание в другом месте страницы сбрасывает состояние",
      ],
      [
        "Свежие колбэки",
        "onDrop и onReject можно менять между рендерами, обработчики не пересоздаются",
      ],
    ],
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "useFileDrop", description: t.description }
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[500px] text-sm">
        <thead className="bg-muted">
          <tr>
            {headers.map((header) => (
              <th key={header} className="p-3 text-left font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-t">
              {row.map((cell, index) => (
                <td
                  key={`${row[0]}-${index}`}
                  className={
                    index < row.length - 1 ? "p-3 font-mono text-xs" : "p-3"
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default async function UseFileDropPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]

  const toc = [
    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "examples", title: t.examples, level: 2 },
    { id: "parameters", title: t.parameters, level: 2 },
    { id: "returns", title: t.returns, level: 2 },
    { id: "features", title: t.features, level: 2 },
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="useFileDrop" />

        <p className="text-muted-foreground">{t.intro}</p>

        <div className="space-y-4">
          <h2
            id="preview"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center rounded-lg bg-muted/30 py-12">
            <UseFileDropDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/use-file-drop" />
        </div>

        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.usage}
          </h2>
          <CodeBlock>{`"use client"

import { useFileDrop } from "@/hooks/use-file-drop"

export default function Example() {
  const { isDragging, dropProps } = useFileDrop({
    accept: "image/*",
    multiple: true,
    onDrop: (files) => upload(files),
    onReject: (files, reason) => console.warn(reason, files),
  })

  return (
    <div
      {...dropProps}
      className={isDragging ? "border-primary bg-primary/5" : "border-dashed"}
    >
      Drag images here
    </div>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="examples"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.examples}
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-lg font-medium">{t.notesTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.notesText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 py-8">
                <UseFileDropNotesDemo />
              </div>
              <CodeBlock className="mt-4">{`import { Textarea } from "@/components/ui/textarea"

const { isDragging, dropProps } = useFileDrop({
  accept: [".txt", ".md", "text/plain"],
  onDrop: async ([file]) => setNotes(await file.text()),
  onReject: (_files, reason) =>
    toast.error(reason === "count" ? "One file at a time" : "Not a text file"),
})

<div {...dropProps} className="relative">
  <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
  {isDragging && <div className="absolute inset-0">Drop to replace the text</div>}
</div>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.helperTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.helperText}
              </p>
              <CodeBlock>{`import { matchesAccept } from "@/hooks/use-file-drop"

function onPaste(event: React.ClipboardEvent) {
  const files = Array.from(event.clipboardData.files)
  const images = files.filter((file) => matchesAccept(file, "image/*"))
  if (images.length > 0) upload(images)
}`}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="parameters"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.parameters}
          </h2>
          <Table
            headers={[
              t.headers.name,
              t.headers.type,
              t.headers.default,
              t.headers.description,
            ]}
            rows={[
              ["accept", "string | string[]", "-", t.paramAccept],
              ["multiple", "boolean", "false", t.paramMultiple],
              ["disabled", "boolean", "false", t.paramDisabled],
              ["onDrop", "(files: File[]) => void", "-", t.paramOnDrop],
              [
                "onReject",
                '(files: File[], reason: "type" | "count") => void',
                "-",
                t.paramOnReject,
              ],
            ]}
          />
        </div>

        <div className="space-y-4">
          <h2
            id="returns"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.returns}
          </h2>
          <Table
            headers={[t.headers.name, t.headers.type, t.headers.description]}
            rows={[
              ["isDragging", "boolean", t.retIsDragging],
              ["dropProps", "FileDropProps", t.retDropProps],
            ]}
          />
        </div>

        <div className="space-y-4">
          <h2
            id="features"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.features}
          </h2>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            {t.featureList.map(([name, text]) => (
              <li key={name}>
                <strong className="text-foreground">{name}</strong>: {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DocsPage>
  )
}
