"use client"

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
  const visible = Boolean(
    items.some(
      (entry) => entry.href === pathname.replace(/^\/(ru|en)(?=\/)/, ""),
    ),
  )
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
  }, [pathname])
  useEffect(() => {
    if (editing) input.current?.focus()
  }, [editing])
  const navigate = useCallback(
    (direction: number, decisions: Data["decisions"]) => {
      for (let step = 1; step < items.length; step++) {
        const next =
          items[(index + direction * step + items.length) % items.length]
        if (!decisions.items[next.slug]?.status) {
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
    if (!item || !data) return
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
  }, [item, data, save, navigate])
  if (!item) return null
  const decision = data?.decisions.items[item.slug]
  const result = data?.results[item.slug]
  const manifest = data?.manifests[item.slug]
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
  const checked = items.filter(
    (entry) => data?.decisions.items[entry.slug]?.status,
  ).length
  return (
    <aside
      data-dev-only
      ref={panel}
      aria-label="Панель приёмки"
      className="fixed inset-x-0 bottom-0 z-[100] max-h-[60vh] overflow-y-auto border-t border-border bg-background/95 px-4 py-3 shadow-[0_-0.5rem_2rem_rgba(0,0,0,0.12)] backdrop-blur md:px-6"
    >
      <div className="mx-auto flex max-w-[100rem] flex-wrap items-center gap-x-6 gap-y-3">
        <div className="min-w-0 flex-1 basis-80">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <strong className="text-base">{navTitle(item, locale)}</strong>
            <span className="text-muted-foreground">
              {(
                {
                  accepted: "Опубликован",
                  revise: "Доработать",
                  delete: "Удалить",
                } as Record<string, string>
              )[decision?.status || ""] || "Черновик"}
            </span>
            <span role="status" className="text-emerald-600">
              {message}
            </span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            {result ? (
              result.problems.length ? (
                <details>
                  <summary className="cursor-pointer text-red-600">
                    Найдено проблем: {result.problems.length}
                  </summary>
                  <ul>
                    {result.problems.map((problem) => (
                      <li key={problem}>{problem}</li>
                    ))}
                  </ul>
                </details>
              ) : (
                <span className="text-emerald-600">
                  ✓ Автопроверка пройдена
                </span>
              )
            ) : (
              <span>Автопроверка не запускалась</span>
            )}
            <span>
              {jsAfter == null
                ? "JS в браузере: нет данных"
                : jsAfter === 0
                  ? "JS: 0 — работает без JavaScript"
                  : `JS в браузере: ${size(jsAfter)}${jsOwn == null ? "" : ` (из них свой код: ${size(jsOwn)})`}`}
            </span>
            {manifest?.verdict ? (
              <span>
                {verdict}
                {manifest.jsBefore != null &&
                  jsAfter != null &&
                  ` · было ${size(manifest.jsBefore)} → стало ${jsAfter === 0 ? "0" : size(jsAfter)}`}
              </span>
            ) : (
              <span
                className="text-muted-foreground/60"
                title="Компонент ещё не проходил переделку на HTML и CSS"
              >
                Не переписывался под минимум JS
              </span>
            )}
            {!!manifest?.breaking?.length && (
              <details>
                <summary className="cursor-pointer text-amber-600">
                  Что изменилось в API: {manifest.breaking.length}
                </summary>
                <ul>
                  {manifest.breaking.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
              </details>
            )}
          </div>
          <div className="mt-2 flex items-center gap-3 text-xs">
            <Button
              variant="ghost"
              type="button"
              className="cursor-pointer underline"
              onClick={() => data && navigate(-1, data.decisions)}
            >
              ← предыдущая
            </Button>
            <span className="text-muted-foreground">
              принято решений: {checked} из {items.length}
            </span>
            <Button
              variant="ghost"
              type="button"
              className="cursor-pointer underline"
              onClick={() => data && navigate(1, data.decisions)}
            >
              следующая →
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="ghost"
            type="button"
            disabled={!data || saving}
            onClick={() => void save("accepted")}
            className="cursor-pointer rounded-md bg-emerald-700 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            Опубликовать <span className="opacity-60">1</span>
          </Button>
          <Button
            variant="ghost"
            type="button"
            disabled={!data || saving}
            onClick={() => {
              setComment(decision?.comment || "")
              setEditing(true)
            }}
            className="cursor-pointer rounded-md bg-amber-400 px-4 py-3 text-sm font-semibold text-black disabled:opacity-50"
          >
            Доработать <span className="opacity-60">2</span>
          </Button>
          <Button
            variant="ghost"
            type="button"
            disabled={!data || saving}
            onClick={() => void save("delete")}
            className="cursor-pointer rounded-md bg-red-700 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            Удалить <span className="opacity-60">3</span>
          </Button>
        </div>
        {editing && (
          <form
            className="flex w-full items-end gap-2"
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
              className="min-w-0 flex-1 rounded-md border bg-background p-2 text-sm"
            />
            <Button
              variant="ghost"
              disabled={saving}
              className="cursor-pointer rounded-md bg-foreground px-4 py-2 text-sm text-background"
              type="submit"
            >
              Сохранить
            </Button>
          </form>
        )}
      </div>
    </aside>
  )
}
