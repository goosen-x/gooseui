"use client"

import { BookOpen, Briefcase, Home, Layers, Mail } from "lucide-react"
import { useLocale } from "next-intl"
import { useRef } from "react"
import { ScrollSpy } from "@/registry/gooseui/ui/scroll-spy"

const icons = [
  <Home key="h" />,
  <Layers key="l" />,
  <Briefcase key="b" />,
  <BookOpen key="o" />,
  <Mail key="m" />,
]

const sections = {
  en: [
    ["Home", "A studio that builds interfaces from small, honest parts."],
    ["Services", "Design systems, landing pages and product dashboards."],
    ["Work", "Selected projects for banks, retailers and open source."],
    ["Blog", "Notes on CSS, accessibility and shipping less JavaScript."],
    ["Contact", "Write to us and we answer within one working day."],
  ],
  ru: [
    [
      "Главная",
      "Студия, которая собирает интерфейсы из небольших честных частей.",
    ],
    ["Услуги", "Дизайн-системы, лендинги и продуктовые дашборды."],
    ["Работы", "Избранные проекты для банков, ритейла и open source."],
    ["Блог", "Заметки про CSS, доступность и меньше JavaScript."],
    ["Контакты", "Напишите нам, ответим в течение рабочего дня."],
  ],
}

const filler: Record<"en" | "ru", string> = {
  en: "Scroll the window and watch the panel on the left follow the section that crosses the activation line. Hover the panel to expand every label.",
  ru: "Прокрутите окно: панель слева следует за разделом, который пересёк линию активации. Наведите курсор, чтобы раскрыть все подписи.",
}

function useItems(prefix: string) {
  const locale: "en" | "ru" = useLocale() === "ru" ? "ru" : "en"
  const rows = sections[locale]
  return {
    locale,
    rows,
    items: rows.map(([label], i) => ({
      id: `${prefix}-${i}`,
      label,
      icon: icons[i],
    })),
  }
}

export function ScrollSpyDemo() {
  const { locale, rows, items } = useItems("spy")
  const rootRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative w-full max-w-2xl overflow-hidden rounded-lg border bg-background">
      <div ref={rootRef} className="h-96 overflow-y-auto pr-5 pl-16">
        {rows.map(([label, text], i) => (
          <section
            key={label}
            id={items[i].id}
            className="flex min-h-80 flex-col justify-center gap-2 border-b py-8 last:border-b-0"
          >
            <h3 className="text-xl font-semibold">{label}</h3>
            <p className="text-sm text-muted-foreground">{text}</p>
            <p className="text-sm text-muted-foreground">{filler[locale]}</p>
          </section>
        ))}
      </div>
      <ScrollSpy
        items={items}
        root={rootRef}
        fixed={false}
        showAfter={60}
        offset={120}
        className="left-3"
        labels={{ nav: locale === "ru" ? "Разделы страницы" : "Page sections" }}
      />
    </div>
  )
}

export function ScrollSpyRightDemo() {
  const { locale, rows, items } = useItems("spy-right")
  const rootRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative w-full max-w-2xl overflow-hidden rounded-lg border bg-background">
      <div ref={rootRef} className="h-96 overflow-y-auto pr-16 pl-5">
        {rows.map(([label, text], i) => (
          <section
            key={label}
            id={items[i].id}
            className="flex min-h-80 flex-col justify-center gap-2 border-b py-8 last:border-b-0"
          >
            <h3 className="text-xl font-semibold">{label}</h3>
            <p className="text-sm text-muted-foreground">{text}</p>
          </section>
        ))}
      </div>
      <ScrollSpy
        items={items}
        root={rootRef}
        fixed={false}
        side="right"
        showAfter={0}
        offset={120}
        className="right-3"
        labels={{ nav: locale === "ru" ? "Разделы страницы" : "Page sections" }}
      />
    </div>
  )
}
