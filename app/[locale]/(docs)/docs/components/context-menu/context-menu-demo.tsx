"use client"

import {
  Copy,
  Download,
  FileSpreadsheet,
  FileText,
  Folder,
  Image as ImageIcon,
  Link,
  Mail,
  MessageSquare,
  SquareArrowOutUpRight,
  Trash2,
  Users,
} from "lucide-react"
import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { customToast } from "@/lib/toast"
import { cn } from "@/lib/utils"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/registry/gooseui/ui/context-menu"

const en = {
  files: [
    ["Q3 revenue forecast.xlsx", "248 KB · edited 2 h ago"],
    ["Onboarding checklist.docx", "36 KB · edited yesterday"],
    ["Offsite Lisbon 2026", "142 photos"],
    ["Homepage hero v4.png", "1.8 MB · edited Nov 12"],
  ],
  fileHint: "Shift+F10 for actions",
  open: "Open",
  download: "Download",
  duplicate: "Duplicate",
  share: "Share",
  copyLink: "Copy link",
  email: "Send by email",
  post: "Post to #design-team",
  access: "Manage access…",
  delete: "Delete",
  copySuffix: "copy",
  justNow: "just now",
  opened: "Opened",
  downloading: "Downloading",
  duplicated: "Duplicated",
  linkCopied: "Link copied",
  emailDraft: "Email draft created",
  posted: "Posted to #design-team",
  deleted: "Moved to Trash",
  reset: "Reset files",
  canvasLabel: "Wireframe canvas. Shift+F10 for view options",
  view: "View",
  grid: "Show grid",
  snap: "Snap to grid",
  rulers: "Rulers",
  zoom: "Zoom",
  on: "on",
  off: "off",
  shapes: ["Header", "Search", "Product grid"],
  typeahead:
    "Type a letter to jump to an item: s cycles through Show grid and Snap to grid.",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    files: [
      ["Прогноз выручки Q3.xlsx", "248 КБ · изменён 2 ч назад"],
      ["Чек-лист онбординга.docx", "36 КБ · изменён вчера"],
      ["Выезд в Лиссабон 2026", "142 фото"],
      ["Обложка главной v4.png", "1,8 МБ · изменён 12 ноя"],
    ],
    fileHint: "Shift+F10 — действия",
    open: "Открыть",
    download: "Скачать",
    duplicate: "Дублировать",
    share: "Поделиться",
    copyLink: "Скопировать ссылку",
    email: "Отправить по почте",
    post: "Отправить в #design-team",
    access: "Настроить доступ…",
    delete: "Удалить",
    copySuffix: "копия",
    justNow: "только что",
    opened: "Открыт файл",
    downloading: "Скачивается",
    duplicated: "Создана копия",
    linkCopied: "Ссылка скопирована",
    emailDraft: "Черновик письма создан",
    posted: "Отправлено в #design-team",
    deleted: "Перемещено в корзину",
    reset: "Вернуть файлы",
    canvasLabel: "Холст с макетом. Shift+F10 — настройки вида",
    view: "Вид",
    grid: "Показать сетку",
    snap: "Привязка к сетке",
    rulers: "Линейки",
    zoom: "Масштаб",
    on: "вкл",
    off: "выкл",
    shapes: ["Шапка", "Поиск", "Сетка товаров"],
    typeahead:
      "Нажмите букву, чтобы перейти к пункту: «п» переключает между «Показать сетку» и «Привязка к сетке».",
  },
}

const icons = [FileSpreadsheet, FileText, Folder, ImageIcon]

type FileEntry = {
  id: string
  name: string
  meta: string
  icon: React.ComponentType<{ className?: string }>
}

function initialFiles(t: typeof en): FileEntry[] {
  return t.files.map(([name, meta], i) => ({
    id: String(i),
    name,
    meta,
    icon: icons[i] ?? FileText,
  }))
}

/** File cards: items with icons and shortcuts, a submenu and a destructive action */
export function ContextMenuFilesDemo() {
  const t = content[useLocale() as Locale]
  const [files, setFiles] = React.useState(() => initialFiles(t))

  return (
    <div className="w-full max-w-3xl space-y-3 px-4">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {files.map((file) => (
          <li key={file.id}>
            <ContextMenu>
              <ContextMenuTrigger
                aria-label={`${file.name}. ${t.fileHint}`}
                className="flex h-full cursor-default flex-col gap-3 rounded-lg border bg-card p-4 text-card-foreground transition-colors hover:bg-accent/50 data-[state=open]:border-ring data-[state=open]:bg-accent/60"
              >
                <file.icon className="size-8 text-muted-foreground" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{file.meta}</p>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem
                  shortcut="⌘O"
                  onSelect={() =>
                    customToast.info(t.opened, { description: file.name })
                  }
                >
                  <SquareArrowOutUpRight />
                  {t.open}
                </ContextMenuItem>
                <ContextMenuItem
                  onSelect={() =>
                    customToast.info(t.downloading, { description: file.name })
                  }
                >
                  <Download />
                  {t.download}
                </ContextMenuItem>
                <ContextMenuItem
                  shortcut="⌘D"
                  onSelect={() => {
                    const dot = file.name.lastIndexOf(".")
                    const name =
                      dot > 0
                        ? `${file.name.slice(0, dot)} (${t.copySuffix})${file.name.slice(dot)}`
                        : `${file.name} (${t.copySuffix})`
                    setFiles((all) => {
                      const index = all.findIndex((f) => f.id === file.id)
                      const next = [...all]
                      next.splice(index + 1, 0, {
                        ...file,
                        id: `${file.id}-${Date.now()}`,
                        name,
                        meta: t.justNow,
                      })
                      return next
                    })
                    customToast.success(t.duplicated, { description: name })
                  }}
                >
                  <Copy />
                  {t.duplicate}
                </ContextMenuItem>
                <ContextMenuSub>
                  <ContextMenuSubTrigger>
                    <Users />
                    {t.share}
                  </ContextMenuSubTrigger>
                  <ContextMenuSubContent>
                    <ContextMenuItem
                      onSelect={() =>
                        customToast.success(t.linkCopied, {
                          description: file.name,
                        })
                      }
                    >
                      <Link />
                      {t.copyLink}
                    </ContextMenuItem>
                    <ContextMenuItem
                      onSelect={() =>
                        customToast.success(t.emailDraft, {
                          description: file.name,
                        })
                      }
                    >
                      <Mail />
                      {t.email}
                    </ContextMenuItem>
                    <ContextMenuItem
                      onSelect={() =>
                        customToast.success(t.posted, {
                          description: file.name,
                        })
                      }
                    >
                      <MessageSquare />
                      {t.post}
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem disabled>
                      <Users />
                      {t.access}
                    </ContextMenuItem>
                  </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSeparator />
                <ContextMenuItem
                  variant="destructive"
                  shortcut="⌘⌫"
                  onSelect={() => {
                    setFiles((all) => all.filter((f) => f.id !== file.id))
                    customToast.success(t.deleted, { description: file.name })
                  }}
                >
                  <Trash2 />
                  {t.delete}
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </li>
        ))}
      </ul>
      {files.length !== t.files.length && (
        <div className="flex justify-end text-sm text-muted-foreground">
          <button
            type="button"
            className="cursor-pointer underline underline-offset-4 hover:text-foreground"
            onClick={() => setFiles(initialFiles(t))}
          >
            {t.reset}
          </button>
        </div>
      )}
    </div>
  )
}

const shapes = [
  { x: 24, y: 24, w: 120, h: 64, tone: "bg-sky-500/20 border-sky-500/50" },
  {
    x: 160,
    y: 24,
    w: 160,
    h: 64,
    tone: "bg-violet-500/20 border-violet-500/50",
  },
  {
    x: 24,
    y: 104,
    w: 296,
    h: 112,
    tone: "bg-emerald-500/20 border-emerald-500/50",
  },
]

/** Canvas: checkbox items, a labelled radio group and typeahead */
export function ContextMenuCanvasDemo() {
  const t = content[useLocale() as Locale]
  const [grid, setGrid] = React.useState(true)
  const [snap, setSnap] = React.useState(false)
  const [rulers, setRulers] = React.useState(false)
  const [zoom, setZoom] = React.useState("100")
  const zoomLabel = React.useId()

  return (
    <div className="w-full max-w-xl space-y-3 px-4">
      <ContextMenu>
        <ContextMenuTrigger
          aria-label={t.canvasLabel}
          className={cn(
            "relative h-64 overflow-hidden rounded-lg border bg-background",
            rulers &&
              "border-t-[6px] border-l-[6px] border-t-foreground/15 border-l-foreground/15",
          )}
          style={
            grid
              ? {
                  backgroundImage:
                    "linear-gradient(to right, color-mix(in oklab, currentColor 10%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, currentColor 10%, transparent) 1px, transparent 1px)",
                  backgroundSize: `${(16 * Number(zoom)) / 100}px ${(16 * Number(zoom)) / 100}px`,
                }
              : undefined
          }
        >
          <div
            className="absolute top-0 left-0 origin-top-left transition-transform motion-reduce:transition-none"
            style={{ scale: Number(zoom) / 100 }}
          >
            {shapes.map((shape, i) => (
              <div
                key={shape.tone}
                className={cn(
                  "absolute flex items-center justify-center rounded-md border text-xs font-medium",
                  shape.tone,
                )}
                style={{
                  left: shape.x,
                  top: shape.y,
                  width: shape.w,
                  height: shape.h,
                }}
              >
                {t.shapes[i]}
              </div>
            ))}
          </div>
          <p className="absolute right-3 bottom-2 text-xs text-muted-foreground">
            {zoom}% · {t.grid.toLowerCase()} {grid ? t.on : t.off}
          </p>
        </ContextMenuTrigger>
        <ContextMenuContent className="min-w-52">
          <ContextMenuLabel inset>{t.view}</ContextMenuLabel>
          <ContextMenuCheckboxItem
            checked={grid}
            onCheckedChange={setGrid}
            shortcut="⌘'"
          >
            {t.grid}
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            checked={snap}
            onCheckedChange={setSnap}
            shortcut="⇧⌘'"
          >
            {t.snap}
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            checked={rulers}
            onCheckedChange={setRulers}
            shortcut="⇧R"
          >
            {t.rulers}
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuLabel inset id={zoomLabel}>
            {t.zoom}
          </ContextMenuLabel>
          <ContextMenuRadioGroup
            value={zoom}
            onValueChange={setZoom}
            aria-labelledby={zoomLabel}
          >
            <ContextMenuRadioItem value="50">50%</ContextMenuRadioItem>
            <ContextMenuRadioItem value="100" shortcut="⇧0">
              100%
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="200">200%</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
      <p className="text-sm text-muted-foreground">{t.typeahead}</p>
    </div>
  )
}
