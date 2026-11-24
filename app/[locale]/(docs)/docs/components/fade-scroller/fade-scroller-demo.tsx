"use client"

import { useLocale } from "next-intl"
import { useState } from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Button } from "@/registry/gooseui/ui/button"
import { FadeScroller } from "@/registry/gooseui/ui/fade-scroller"

const en = {
  tableLabel: "Plan comparison table",
  chipsLabel: "Topics",
  listLabel: "Activity log",
  arrows: { previous: "Scroll back", next: "Scroll forward" },
  columns: [
    "Plan",
    "Price",
    "Projects",
    "Storage",
    "Members",
    "History",
    "Support",
    "Domains",
    "API calls",
  ],
  plans: [
    ["Starter", "$0", "3", "1 GB", "1", "7 days", "Forum", "-", "1k / day"],
    ["Team", "$12", "20", "50 GB", "10", "90 days", "Email", "1", "50k / day"],
    [
      "Business",
      "$39",
      "Unlimited",
      "500 GB",
      "50",
      "1 year",
      "Chat",
      "5",
      "500k / day",
    ],
    [
      "Enterprise",
      "Custom",
      "Unlimited",
      "Custom",
      "Unlimited",
      "Forever",
      "Manager",
      "Unlimited",
      "Custom",
    ],
  ],
  chips: [
    "Design",
    "Frontend",
    "Accessibility",
    "Animation",
    "Testing",
    "Performance",
    "Typography",
    "Color",
    "Layout",
    "Forms",
    "Icons",
    "Motion",
    "Dark mode",
    "Tokens",
  ],
  events: [
    "Deployed preview",
    "Merged pull request",
    "Opened issue",
    "Updated settings",
    "Invited member",
    "Rotated key",
    "Archived project",
    "Renamed branch",
    "Restored backup",
    "Changed plan",
    "Exported report",
    "Added domain",
  ],
  ago: (n: number) => `${n} min ago`,
}

const content: Dict<typeof en> = {
  en,
  ru: {
    tableLabel: "Таблица сравнения тарифов",
    chipsLabel: "Темы",
    listLabel: "Журнал действий",
    arrows: { previous: "Прокрутить назад", next: "Прокрутить вперёд" },
    columns: [
      "Тариф",
      "Цена",
      "Проекты",
      "Хранилище",
      "Участники",
      "История",
      "Поддержка",
      "Домены",
      "Запросы API",
    ],
    plans: [
      [
        "Старт",
        "0 ₽",
        "3",
        "1 ГБ",
        "1",
        "7 дней",
        "Форум",
        "-",
        "1 тыс. / день",
      ],
      [
        "Команда",
        "990 ₽",
        "20",
        "50 ГБ",
        "10",
        "90 дней",
        "Почта",
        "1",
        "50 тыс. / день",
      ],
      [
        "Бизнес",
        "2990 ₽",
        "Без лимита",
        "500 ГБ",
        "50",
        "1 год",
        "Чат",
        "5",
        "500 тыс. / день",
      ],
      [
        "Корпоративный",
        "По запросу",
        "Без лимита",
        "По запросу",
        "Без лимита",
        "Всегда",
        "Менеджер",
        "Без лимита",
        "По запросу",
      ],
    ],
    chips: [
      "Дизайн",
      "Фронтенд",
      "Доступность",
      "Анимация",
      "Тесты",
      "Скорость",
      "Типографика",
      "Цвет",
      "Сетка",
      "Формы",
      "Иконки",
      "Движение",
      "Тёмная тема",
      "Токены",
    ],
    events: [
      "Выложено превью",
      "Влит pull request",
      "Открыта задача",
      "Изменены настройки",
      "Приглашён участник",
      "Заменён ключ",
      "Проект в архиве",
      "Ветка переименована",
      "Восстановлена копия",
      "Сменён тариф",
      "Выгружен отчёт",
      "Добавлен домен",
    ],
    ago: (n: number) => `${n} мин назад`,
  },
}

function useT() {
  return content[useLocale() as Locale]
}

export function FadeScrollerTableDemo() {
  const t = useT()
  return (
    <FadeScroller
      label={t.tableLabel}
      labels={t.arrows}
      className="w-full max-w-2xl rounded-lg border bg-background"
    >
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            {t.columns.map((col) => (
              <th
                key={col}
                className="whitespace-nowrap p-3 text-left font-medium"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {t.plans.map((row) => (
            <tr key={row[0]} className="border-t">
              {row.map((cell, i) => (
                <td
                  key={i}
                  className={
                    i === 0
                      ? "whitespace-nowrap p-3 font-medium"
                      : "whitespace-nowrap p-3 text-muted-foreground"
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </FadeScroller>
  )
}

export function FadeScrollerChipsDemo() {
  const t = useT()
  const [active, setActive] = useState(0)
  return (
    <FadeScroller
      label={t.chipsLabel}
      labels={t.arrows}
      hideScrollbar
      fadeSize={56}
      className="w-full max-w-md"
    >
      <div className="flex gap-2 py-1">
        {t.chips.map((chip, i) => (
          <Button
            variant="ghost"
            key={chip}
            type="button"
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className="h-8 shrink-0 cursor-pointer rounded-full border px-3 text-sm whitespace-nowrap transition-colors hover:bg-accent aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {chip}
          </Button>
        ))}
      </div>
    </FadeScroller>
  )
}

export function FadeScrollerVerticalDemo() {
  const t = useT()
  return (
    <FadeScroller
      orientation="vertical"
      label={t.listLabel}
      labels={t.arrows}
      className="h-64 w-full max-w-sm rounded-lg border bg-background"
    >
      <ul className="divide-y">
        {t.events.map((event, i) => (
          <li
            key={event}
            className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
          >
            <span>{event}</span>
            <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
              {t.ago((i + 1) * 7)}
            </span>
          </li>
        ))}
      </ul>
    </FadeScroller>
  )
}
