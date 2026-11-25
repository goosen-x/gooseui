"use client"

import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Pencil,
  Trash2,
} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import {
  docsNavigation,
  groupNavItems,
  navTitle,
} from "@/lib/config/docs-navigation"
import { Button } from "@/registry/gooseui/ui/button"
import { Textarea } from "@/registry/gooseui/ui/textarea"

type Decision = { status: string; comment: string }
type Data = {
  decisions: { items: Record<string, Decision>; comment: string }
  results: Record<
    string,
    { problems: string[]; js: number | null; jsOwn?: number | null }
  >
  manifests: Record<
    string,
    {
      verdict?: string
      jsBefore?: number
      jsAfter?: number
      breaking?: string[]
      how?: { en?: string; ru?: string }
    }
  >
}
const items = docsNavigation
  .filter((section) =>
    ["components", "effects", "hooks"].includes(section.slug),
  )
  .flatMap((section) => {
    const visible = section.items.filter((item) => !item.isComingSoon)
    return section.groups
      ? groupNavItems(visible, section.groups).flatMap((group) => group.items)
      : visible
  })
const size = (value?: number | null) =>
  `${(value! / 1024).toFixed(1).replace(".", ",")} кБ`

export default function ReviewPanel() {
  const pathname = usePathname()
  const router = useRouter()
  const [data, setData] = useState<Data | null>(null)
  const [editing, setEditing] = useState(false)
  const [comment, setComment] = useState("")
  const [message, setMessage] = useState("")
  const [saving, setSaving] = useState(false)
  const input = useRef<HTMLTextAreaElement>(null)
  const panel = useRef<HTMLElement>(null)
  const locale = pathname.startsWith("/ru/") ? "ru" : "en"
  const path = pathname.replace(/^\/(ru|en)(?=\/)/, "")
  const index = items.findIndex((item) => item.href === path)
  const item = items[index]
  useEffect(() => {
    fetch("/review/api")
      .then((response) => response.json())
      .then(setData)
      .catch(() => setMessage("Ошибка загрузки"))
  }, [])
  const isDraft =
    Boolean(item) && data?.decisions.items[item.slug]?.status !== "accepted"
  const visible = Boolean(data) && isDraft
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const node = panel.current
    const root = document.documentElement
    if (!node) return
    const update = () =>
      root.style.setProperty("--review-panel-h", `${node.offsetHeight}px`)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(node)
    return () => {
      observer.disconnect()
      root.style.removeProperty("--review-panel-h")
    }
  }, [visible])
  useEffect(() => {
    setEditing(false)
    setComment("")
    setOpen(false)
  }, [pathname])
  useEffect(() => {
    if (editing) input.current?.focus()
  }, [editing])
  const navigate = useCallback(
    (direction: number, decisions: Data["decisions"]) => {
      for (let step = 1; step < items.length; step++) {
        const next =
          items[(index + direction * step + items.length) % items.length]
        if (decisions.items[next.slug]?.status !== "accepted") {
          router.push(`${locale === "ru" ? "/ru" : ""}${next.href}`)
          return
        }
      }
    },
    [index, locale, router],
  )
  const save = useCallback(
    async (status: string, text = "") => {
      if (!item || !data || saving) return
      setSaving(true)
      setMessage("")
      try {
        const fresh = (await fetch("/review/api").then((response) =>
          response.json(),
        )) as Data
        const decisions = {
          ...fresh.decisions,
          items: {
            ...fresh.decisions.items,
            [item.slug]: { status, comment: text },
          },
        }
        const response = await fetch("/review/api", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(decisions),
        })
        if (!response.ok) throw new Error()
        setData({ ...fresh, decisions })
        setEditing(false)
        setMessage("Сохранено")
        setTimeout(() => {
          navigate(1, decisions)
          setMessage("")
        }, 500)
      } catch {
        setMessage("Ошибка сохранения")
      } finally {
        setSaving(false)
      }
    },
    [item, data, saving, navigate],
  )
  useEffect(() => {
    if (!item || !data || !isDraft) return
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      if (
        event.defaultPrevented ||
        target.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey
      )
        return
      if (event.key === "1") void save("accepted")
      else if (event.key === "2") {
        setComment(data.decisions.items[item.slug]?.comment || "")
        setEditing(true)
      } else if (event.key === "3") void save("delete")
      else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        // Arrows belong to the focused demo (sliders, tabs, scroll regions);
        // the panel flips pages only when nothing on the page has focus
        if (target !== document.body && target !== document.documentElement)
          return
        navigate(event.key === "ArrowRight" ? 1 : -1, data.decisions)
      } else return
      event.preventDefault()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [item, data, isDraft, save, navigate])
  if (!item || !data || !isDraft) return null
  const decision = data.decisions.items[item.slug]
  const result = data.results[item.slug]
  const manifest = data.manifests[item.slug]
  const jsAfter = manifest?.jsAfter ?? result?.js
  // Own code is shown only when it explains a noticeably smaller part of the total
  const jsOwn =
    manifest?.jsAfter == null &&
    result?.js != null &&
    result.jsOwn != null &&
    result.js - result.jsOwn > 512
      ? result.jsOwn
      : null
  const how = manifest?.how?.ru || manifest?.how?.en
  const verdict =
    manifest?.verdict === "css-only"
      ? "Без JavaScript"
      : manifest?.verdict === "css-first"
        ? `HTML и CSS: ${how || "JS только для части функций"}`
        : manifest?.verdict === "js"
          ? "Нужен JavaScript"
          : manifest?.verdict
  const left = items.filter(
    (entry) => data.decisions.items[entry.slug]?.status !== "accepted",
  ).length
  const statusLabel =
    (
      {
        revise: "Доработать",
        delete: "Удалить",
      } as Record<string, string>
    )[decision?.status || ""] || "Черновик"
  const small = "h-7 gap-1 px-2 text-xs"
  const kbd = "ml-0.5 text-[0.625rem] opacity-60"
  return (
    <aside
      data-dev-only
      ref={panel}
      aria-label="Панель приёмки"
      className="fixed right-3 bottom-3 z-[100] max-h-[70vh] w-[min(22rem,calc(100vw-1.5rem))] space-y-2 overflow-y-auto rounded-lg border border-border bg-background/95 p-2.5 text-xs shadow-lg backdrop-blur"
    >
      <div className="flex items-center gap-2">
        <strong className="min-w-0 flex-1 truncate text-sm">
          {navTitle(item, locale)}
        </strong>
        <span className="shrink-0 text-muted-foreground">{statusLabel}</span>
        <Button
          variant="ghost"
          size="icon"
          type="button"
          className="size-6"
          aria-expanded={open}
          aria-label="Подробности автопроверок"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <ChevronDown /> : <ChevronUp />}
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-x-2 text-muted-foreground">
        {result ? (
          result.problems.length ? (
            <span className="text-destructive">
              Проблем: {result.problems.length}
            </span>
          ) : (
            <span className="text-emerald-600">✓ Автопроверка</span>
          )
        ) : (
          <span>Автопроверка не запускалась</span>
        )}
        <span>
          ·{" "}
          {jsAfter == null
            ? "JS: нет данных"
            : jsAfter === 0
              ? "JS: 0"
              : `JS: ${size(jsAfter)}`}
        </span>
        <span role="status" className="text-emerald-600">
          {message}
        </span>
      </div>
      {open && (
        <div className="space-y-1.5 border-t border-border pt-2 text-muted-foreground">
          {result?.problems.length ? (
            <ul className="list-disc pl-4 text-destructive">
              {result.problems.map((problem) => (
                <li key={problem}>{problem}</li>
              ))}
            </ul>
          ) : null}
          <p>
            {jsAfter == null
              ? "JS в браузере: нет данных"
              : jsAfter === 0
                ? "JS: 0, работает без JavaScript"
                : `JS в браузере: ${size(jsAfter)}${jsOwn == null ? "" : ` (из них свой код: ${size(jsOwn)})`}`}
          </p>
          <p>
            {manifest?.verdict
              ? `${verdict}${
                  manifest.jsBefore != null && jsAfter != null
                    ? ` · было ${size(manifest.jsBefore)} → стало ${jsAfter === 0 ? "0" : size(jsAfter)}`
                    : ""
                }`
              : "Не переписывался под минимум JS"}
          </p>
          {!!manifest?.breaking?.length && (
            <div>
              <p className="text-amber-600">
                Что изменилось в API: {manifest.breaking.length}
              </p>
              <ul className="list-disc pl-4">
                {manifest.breaking.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </div>
          )}
          {decision?.comment && (
            <p className="text-foreground">Комментарий: {decision.comment}</p>
          )}
        </div>
      )}
      <div className="flex items-center gap-1.5">
        <Button
          type="button"
          className={small}
          disabled={saving}
          title="Опубликовать (1)"
          onClick={() => void save("accepted")}
        >
          <Check /> Опубликовать<span className={kbd}>1</span>
        </Button>
        <Button
          type="button"
          variant="secondary"
          className={small}
          disabled={saving}
          title="Доработать (2)"
          onClick={() => {
            setComment(decision?.comment || "")
            setEditing(true)
          }}
        >
          <Pencil /> Доработать<span className={kbd}>2</span>
        </Button>
        <Button
          type="button"
          variant="destructive"
          className={small}
          disabled={saving}
          title="Удалить (3)"
          onClick={() => void save("delete")}
        >
          <Trash2 />
          <span className={kbd}>3</span>
        </Button>
      </div>
      {editing && (
        <form
          className="space-y-1.5"
          onSubmit={(event) => {
            event.preventDefault()
            void save("revise", comment)
          }}
        >
          <Textarea
            ref={input}
            aria-label="Комментарий к доработке"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault()
                void save("revise", comment)
              }
            }}
            placeholder="Что нужно доработать?"
            rows={2}
            className="min-h-0 w-full rounded-md border bg-background p-2 text-xs"
          />
          <Button type="submit" className={small} disabled={saving}>
            Сохранить
          </Button>
        </form>
      )}
      <div className="flex items-center justify-between text-muted-foreground">
        <Button
          variant="ghost"
          size="icon"
          type="button"
          className="size-6"
          aria-label="Предыдущая"
          onClick={() => navigate(-1, data.decisions)}
        >
          <ChevronLeft />
        </Button>
        <span>черновиков: {left}</span>
        <Button
          variant="ghost"
          size="icon"
          type="button"
          className="size-6"
          aria-label="Следующая"
          onClick={() => navigate(1, data.decisions)}
        >
          <ChevronRight />
        </Button>
      </div>
    </aside>
  )
}
