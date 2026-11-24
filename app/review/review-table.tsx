"use client"

import { useState } from "react"

export type ReviewRow = {
  slug: string
  title: string
  section: string
  group: string
  href: string | null
  verdict: string | null
  before: number | null
  after: number | null
  breaking: string[]
  problems: string[] | null
}
type Decision = { status: string; comment: string }
type Decisions = { items: Record<string, Decision>; comment: string }
const sizes = (n: number | null) =>
  n === null ? "—" : `${(n / 1024).toFixed(1)} КБ`

export function ReviewTable({
  rows,
  initialDecisions,
}: {
  rows: ReviewRow[]
  initialDecisions: Decisions
}) {
  const [data, setData] = useState(initialDecisions)
  const [filter, setFilter] = useState("all")
  const [message, setMessage] = useState("")
  const [saving, setSaving] = useState(false)
  const checked = rows.filter((row) =>
    Boolean(data.items[row.slug]?.status),
  ).length
  const filtered = rows.filter(
    (row) =>
      filter === "all" ||
      (filter === "pending" && !data.items[row.slug]?.status) ||
      (filter === "problems" && (row.problems?.length ?? 0) > 0) ||
      (filter === "css" && row.verdict === "css-only"),
  )
  async function save(next: Decisions) {
    setSaving(true)
    setMessage("")
    try {
      const response = await fetch("/review/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      })
      if (!response.ok) throw new Error("Не удалось сохранить")
      setData(next)
      setMessage("Сохранено")
    } catch {
      setMessage("Ошибка сохранения. Попробуйте ещё раз.")
    } finally {
      setSaving(false)
    }
  }
  return (
    <main className="min-h-screen bg-[#f4f3ed] text-[#18221e]">
      <header className="border-b border-[#b5beb5] bg-[#1c3028] px-6 py-10 text-[#f4f3ed] md:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#b6d4a9]">
          GooseUI / внутренний контроль
        </p>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="font-serif text-5xl tracking-tight md:text-6xl">
              Приёмка реестра
            </h1>
            <p className="mt-3 text-sm text-[#c7d4c9]">
              Проверки, изменения API и решения по каждой позиции.
            </p>
          </div>
          <p className="font-mono text-sm">
            Проверено{" "}
            <strong className="text-2xl text-[#c8ecae]">{checked}</strong> из{" "}
            {rows.length}
          </p>
        </div>
      </header>
      <div className="px-6 py-8 md:px-12">
        <div className="flex flex-wrap items-center gap-2" aria-label="Фильтры">
          {[
            ["all", "Все"],
            ["pending", "Без решения"],
            ["problems", "Проблемы автопроверки"],
            ["css", "CSS-only"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              aria-pressed={filter === value}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm ${filter === value ? "border-[#1c3028] bg-[#1c3028] text-white" : "border-[#b5beb5] hover:bg-white"}`}
            >
              {label}
            </button>
          ))}
          <span
            className="ml-auto font-mono text-xs text-[#506258]"
            role="status"
          >
            {saving ? "Сохранение…" : message}
          </span>
        </div>
        <div className="mt-6 overflow-x-auto rounded-lg border border-[#c5ccc4] bg-white">
          <table className="w-full min-w-[78rem] border-collapse text-left text-sm">
            <thead className="bg-[#e7ebe3] font-mono text-xs uppercase tracking-wide text-[#526458]">
              <tr>
                {[
                  "Позиция / группа",
                  "Вердикт / JS",
                  "Автопроверка",
                  "Превью",
                  "Изменения API",
                  "Решение",
                ].map((label) => (
                  <th key={label} className="p-4 font-medium">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <ReviewEntry
                  key={row.slug}
                  row={row}
                  decision={data.items[row.slug]}
                  disabled={saving}
                  onSave={(decision) =>
                    save({
                      ...data,
                      items: { ...data.items, [row.slug]: decision },
                    })
                  }
                />
              ))}
            </tbody>
          </table>
        </div>
        <form
          className="mt-8 max-w-3xl"
          onSubmit={(event) => {
            event.preventDefault()
            const form = new FormData(event.currentTarget)
            void save({ ...data, comment: String(form.get("comment") || "") })
          }}
        >
          <label
            htmlFor="general-comment"
            className="block font-serif text-2xl"
          >
            Общий комментарий
          </label>
          <textarea
            id="general-comment"
            name="comment"
            defaultValue={data.comment}
            rows={4}
            className="mt-3 w-full rounded border border-[#aebbb0] bg-white p-3"
          />
          <button
            disabled={saving}
            className="mt-3 cursor-pointer rounded bg-[#1c3028] px-5 py-2 text-white disabled:opacity-50"
            type="submit"
          >
            Сохранить комментарий
          </button>
        </form>
      </div>
    </main>
  )
}

function ReviewEntry({
  row,
  decision,
  disabled,
  onSave,
}: {
  row: ReviewRow
  decision?: Decision
  disabled: boolean
  onSave: (decision: Decision) => void
}) {
  const [comment, setComment] = useState(decision?.comment || "")
  const [status, setStatus] = useState(decision?.status || "")
  return (
    <tr className="border-t border-[#e1e6df] align-top">
      <td className="p-4">
        <strong className="block text-base">{row.title}</strong>
        <span className="font-mono text-xs text-[#738078]">{row.slug}</span>
        <p className="mt-2 text-xs text-[#526458]">
          {row.section}
          {row.group ? ` / ${row.group}` : ""}
        </p>
        {row.href && (
          <div className="mt-2 flex gap-3">
            <a
              className="cursor-pointer underline"
              href={row.href}
              target="_blank"
              rel="noreferrer"
            >
              EN ↗
            </a>
            <a
              className="cursor-pointer underline"
              href={`/ru${row.href}`}
              target="_blank"
              rel="noreferrer"
            >
              Открыть с панелью ↗
            </a>
          </div>
        )}
      </td>
      <td className="p-4">
        <span className="font-mono text-xs">
          {row.verdict || "нет манифеста"}
        </span>
        <p className="mt-2 whitespace-nowrap">
          {sizes(row.before)} → {sizes(row.after)}
        </p>
      </td>
      <td className="max-w-72 p-4">
        {row.problems === null ? (
          <span className="text-[#877853]">Нет результатов</span>
        ) : row.problems.length === 0 ? (
          <span className="font-medium text-green-700">✓ Успешно</span>
        ) : (
          <details>
            <summary className="cursor-pointer font-medium text-red-700">
              ✕ Проблем: {row.problems.length}
            </summary>
            <ul className="mt-2 space-y-1 text-xs text-red-800">
              {row.problems.map((problem) => (
                <li key={problem}>{problem}</li>
              ))}
            </ul>
          </details>
        )}
      </td>
      <td className="p-4">
        <div className="flex gap-2">
          {["light", "dark"].map((theme) => (
            <a
              key={theme}
              href={`/review/api/shots/${row.slug}-${theme}.png`}
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer"
            >
              <img
                src={`/review/api/shots/${row.slug}-${theme}.png`}
                alt={`${row.title}: ${theme}`}
                loading="lazy"
                className="h-12 w-20 rounded border border-[#d3dbd3] object-cover"
              />
            </a>
          ))}
        </div>
      </td>
      <td className="max-w-60 p-4 text-xs">
        {row.breaking.length ? (
          <ul className="space-y-1">
            {row.breaking.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        ) : (
          "—"
        )}
      </td>
      <td className="min-w-56 p-4">
        <form
          onSubmit={(event) => {
            event.preventDefault()
            onSave({ status, comment })
          }}
        >
          <label className="sr-only" htmlFor={`status-${row.slug}`}>
            Решение для {row.title}
          </label>
          <select
            id={`status-${row.slug}`}
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="w-full cursor-pointer rounded border border-[#aebbb0] bg-white p-2"
          >
            <option value="">Без решения</option>
            <option value="accepted">Принят</option>
            <option value="revise">Доработать</option>
            <option value="delete">Удалить</option>
          </select>
          <label className="sr-only" htmlFor={`comment-${row.slug}`}>
            Комментарий для {row.title}
          </label>
          <textarea
            id={`comment-${row.slug}`}
            placeholder="Комментарий"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            rows={2}
            className="mt-2 w-full rounded border border-[#aebbb0] p-2"
          />
          <button
            type="submit"
            disabled={disabled}
            className="mt-2 cursor-pointer rounded bg-[#1c3028] px-3 py-1.5 text-xs text-white disabled:opacity-50"
          >
            Сохранить
          </button>
        </form>
      </td>
    </tr>
  )
}
