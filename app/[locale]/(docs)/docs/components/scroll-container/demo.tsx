"use client"

import { FileText, Folder, Image as ImageIcon } from "lucide-react"
import { useLocale } from "next-intl"
import { useState } from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Badge } from "@/registry/gooseui/ui/badge"
import { Label } from "@/registry/gooseui/ui/label"
import { ScrollContainer } from "@/registry/gooseui/ui/scroll-container"
import { Switch } from "@/registry/gooseui/ui/switch"

type Row = { a: string; b: string; c: string }
type Kind = "folder" | "doc" | "image"
type FileRow = Row & { kind: Kind }

const en = {
  default: "Default",
  minimal: "Minimal",
  primary: "Primary",
  autoHide: "Hide without hover",
  chat: [
    { a: "Anna", b: "Did you see the new build?", c: "10:02" },
    { a: "Max", b: "Yes, the review is almost done", c: "10:04" },
    { a: "Anna", b: "Great, I will merge after lunch", c: "10:05" },
    { a: "Ivan", b: "Can someone check the staging deploy?", c: "10:11" },
    { a: "Max", b: "On it, give me five minutes", c: "10:12" },
    { a: "Max", b: "Staging is green, no errors in the logs", c: "10:19" },
    { a: "Olga", b: "Updated the pricing page copy", c: "10:26" },
    { a: "Anna", b: "Looks good, thanks!", c: "10:27" },
    { a: "Ivan", b: "Release notes are in the doc", c: "10:41" },
    { a: "Olga", b: "Added a screenshot to the changelog", c: "10:43" },
    { a: "Max", b: "Let's ship it tomorrow morning", c: "10:50" },
    { a: "Anna", b: "Agreed, I will post the announcement", c: "10:52" },
  ] satisfies Row[],
  files: [
    { a: "Design", b: "12 files", c: "Today", kind: "folder" },
    { a: "roadmap-2026.pdf", b: "2.4 MB", c: "Mon", kind: "doc" },
    { a: "hero-banner.png", b: "860 KB", c: "Mon", kind: "image" },
    { a: "Invoices", b: "38 files", c: "Sun", kind: "folder" },
    { a: "brand-guidelines.pdf", b: "5.1 MB", c: "Sat", kind: "doc" },
    { a: "team-photo.jpg", b: "3.2 MB", c: "Fri", kind: "image" },
    { a: "meeting-notes.md", b: "14 KB", c: "Fri", kind: "doc" },
    { a: "Archive", b: "104 files", c: "Thu", kind: "folder" },
    { a: "logo-dark.svg", b: "6 KB", c: "Wed", kind: "image" },
    { a: "contract-draft.docx", b: "212 KB", c: "Wed", kind: "doc" },
    { a: "Screenshots", b: "57 files", c: "Tue", kind: "folder" },
    { a: "budget-q4.xlsx", b: "420 KB", c: "Tue", kind: "doc" },
  ] satisfies FileRow[],
  notices: [
    { a: "Anna Petrova", b: "commented on your pull request", c: "2 min" },
    { a: "GitHub", b: "Build #482 passed", c: "14 min" },
    { a: "Max Orlov", b: "mentioned you in #design", c: "32 min" },
    { a: "Billing", b: "Invoice for November is ready", c: "1 h" },
    { a: "Olga Smirnova", b: "invited you to the Launch project", c: "2 h" },
    { a: "Vercel", b: "Deployment is live on production", c: "3 h" },
    { a: "Ivan Kuznetsov", b: "liked your comment", c: "5 h" },
    { a: "Security", b: "New sign-in from Chrome on macOS", c: "Yesterday" },
    {
      a: "Anna Petrova",
      b: "shared the file roadmap-2026.pdf",
      c: "Yesterday",
    },
    { a: "Calendar", b: "Planning starts in 15 minutes", c: "Yesterday" },
    { a: "Support", b: "Your request #1204 is resolved", c: "Mon" },
    { a: "Max Orlov", b: "assigned you a task", c: "Mon" },
  ] satisfies Row[],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    default: "Обычная",
    minimal: "Минимальная",
    primary: "Акцентная",
    autoHide: "Скрывать без наведения",
    chat: [
      { a: "Анна", b: "Ты видела новую сборку?", c: "10:02" },
      { a: "Макс", b: "Да, ревью почти закончил", c: "10:04" },
      { a: "Анна", b: "Отлично, смёржу после обеда", c: "10:05" },
      { a: "Иван", b: "Кто-нибудь проверит деплой на стейдже?", c: "10:11" },
      { a: "Макс", b: "Беру, дайте пять минут", c: "10:12" },
      { a: "Макс", b: "Стейдж зелёный, в логах чисто", c: "10:19" },
      { a: "Ольга", b: "Обновила тексты на странице тарифов", c: "10:26" },
      { a: "Анна", b: "Выглядит хорошо, спасибо!", c: "10:27" },
      { a: "Иван", b: "Заметки к релизу лежат в документе", c: "10:41" },
      { a: "Ольга", b: "Добавила скриншот в changelog", c: "10:43" },
      { a: "Макс", b: "Давайте выкатим завтра утром", c: "10:50" },
      { a: "Анна", b: "Согласна, напишу анонс", c: "10:52" },
    ],
    files: [
      { a: "Дизайн", b: "12 файлов", c: "Сегодня", kind: "folder" },
      { a: "roadmap-2026.pdf", b: "2,4 МБ", c: "Пн", kind: "doc" },
      { a: "hero-banner.png", b: "860 КБ", c: "Пн", kind: "image" },
      { a: "Счета", b: "38 файлов", c: "Вс", kind: "folder" },
      { a: "brand-guidelines.pdf", b: "5,1 МБ", c: "Сб", kind: "doc" },
      { a: "team-photo.jpg", b: "3,2 МБ", c: "Пт", kind: "image" },
      { a: "meeting-notes.md", b: "14 КБ", c: "Пт", kind: "doc" },
      { a: "Архив", b: "104 файла", c: "Чт", kind: "folder" },
      { a: "logo-dark.svg", b: "6 КБ", c: "Ср", kind: "image" },
      { a: "contract-draft.docx", b: "212 КБ", c: "Ср", kind: "doc" },
      { a: "Скриншоты", b: "57 файлов", c: "Вт", kind: "folder" },
      { a: "budget-q4.xlsx", b: "420 КБ", c: "Вт", kind: "doc" },
    ],
    notices: [
      {
        a: "Анна Петрова",
        b: "оставила комментарий к вашему pull request",
        c: "2 мин",
      },
      { a: "GitHub", b: "Сборка #482 прошла", c: "14 мин" },
      { a: "Макс Орлов", b: "упомянул вас в #design", c: "32 мин" },
      { a: "Биллинг", b: "Счёт за ноябрь готов", c: "1 ч" },
      { a: "Ольга Смирнова", b: "пригласила вас в проект Launch", c: "2 ч" },
      { a: "Vercel", b: "Деплой выкачен на продакшен", c: "3 ч" },
      { a: "Иван Кузнецов", b: "оценил ваш комментарий", c: "5 ч" },
      { a: "Безопасность", b: "Новый вход из Chrome на macOS", c: "Вчера" },
      {
        a: "Анна Петрова",
        b: "поделилась файлом roadmap-2026.pdf",
        c: "Вчера",
      },
      { a: "Календарь", b: "Планирование начнётся через 15 минут", c: "Вчера" },
      { a: "Поддержка", b: "Ваше обращение №1204 решено", c: "Пн" },
      { a: "Макс Орлов", b: "назначил вам задачу", c: "Пн" },
    ],
  },
}

type Strings = typeof en

const fileIcons = { folder: Folder, doc: FileText, image: ImageIcon }

const Chat = ({ rows }: { rows: Row[] }) => (
  <ul className="divide-y">
    {rows.map((r, i) => (
      <li key={i} className="px-3 py-2 text-sm">
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-medium">{r.a}</span>
          <span className="text-xs text-muted-foreground">{r.c}</span>
        </div>
        <p className="text-muted-foreground">{r.b}</p>
      </li>
    ))}
  </ul>
)

const Files = ({ rows }: { rows: FileRow[] }) => (
  <ul className="divide-y">
    {rows.map((r, i) => {
      const Icon = fileIcons[r.kind]
      return (
        <li key={i} className="flex items-center gap-2 px-3 py-2 text-sm">
          <Icon className="size-4 shrink-0 text-muted-foreground" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium">{r.a}</p>
            <p className="text-xs text-muted-foreground">{r.b}</p>
          </div>
          <span className="text-xs text-muted-foreground">{r.c}</span>
        </li>
      )
    })}
  </ul>
)

const Notices = ({ rows }: { rows: Row[] }) => (
  <ul className="divide-y">
    {rows.map((r, i) => (
      <li key={i} className="space-y-1 px-3 py-2 text-sm">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="neutral" size="sm" dot className="max-w-[70%]">
            <span className="truncate">{r.a}</span>
          </Badge>
          <span className="text-xs text-muted-foreground">{r.c}</span>
        </div>
        <p className="text-muted-foreground">{r.b}</p>
      </li>
    ))}
  </ul>
)

type Variant = "default" | "minimal" | "primary"

function Window({
  variant,
  autoHide,
  t,
}: {
  variant: Variant
  autoHide: boolean
  t: Strings
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{t[variant]}</p>
      <ScrollContainer
        height="16rem"
        variant={variant}
        autoHide={autoHide}
        className="rounded-lg border bg-background"
      >
        {variant === "default" && <Chat rows={t.chat} />}
        {variant === "minimal" && <Files rows={t.files as FileRow[]} />}
        {variant === "primary" && <Notices rows={t.notices} />}
      </ScrollContainer>
    </div>
  )
}

export function ScrollContainerDemo() {
  const t = content[useLocale() as Locale]
  const [autoHide, setAutoHide] = useState(false)
  const variants: Variant[] = ["default", "minimal", "primary"]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Switch
          id="scroll-container-auto-hide"
          checked={autoHide}
          onChange={(e) => setAutoHide(e.target.checked)}
        />
        <Label htmlFor="scroll-container-auto-hide" className="cursor-pointer">
          {t.autoHide}
        </Label>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {variants.map((v) => (
          <Window key={v} variant={v} autoHide={autoHide} t={t} />
        ))}
      </div>
    </div>
  )
}
