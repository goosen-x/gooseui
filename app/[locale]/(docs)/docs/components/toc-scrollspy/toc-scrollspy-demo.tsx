"use client"

import { useLocale } from "next-intl"
import { useRef } from "react"
import {
  TocScrollspy,
  type TocScrollspyItem,
} from "@/registry/gooseui/ui/toc-scrollspy"

const textEn =
  "Short paragraph of placeholder text. Scroll the article and watch the marker on the right follow the section you are reading."
const textRu =
  "Короткий абзац с текстом-заполнителем. Прокрутите статью: маркер справа переезжает к разделу, который вы читаете."

const structure = {
  en: [
    { id: "toc-start", title: "Getting started", level: 2 },
    { id: "toc-install", title: "Install the CLI", level: 3 },
    { id: "toc-login", title: "Sign in", level: 3 },
    { id: "toc-project", title: "Your first project", level: 2 },
    { id: "toc-structure", title: "Folder structure", level: 3 },
    { id: "toc-deploy", title: "Deploy", level: 2 },
    { id: "toc-next", title: "What next", level: 2 },
  ],
  ru: [
    { id: "toc-start", title: "Первые шаги", level: 2 },
    { id: "toc-install", title: "Установка CLI", level: 3 },
    { id: "toc-login", title: "Вход", level: 3 },
    { id: "toc-project", title: "Первый проект", level: 2 },
    { id: "toc-structure", title: "Структура папок", level: 3 },
    { id: "toc-deploy", title: "Публикация", level: 2 },
    { id: "toc-next", title: "Что дальше", level: 2 },
  ],
}

function Article({ items, text }: { items: TocScrollspyItem[]; text: string }) {
  return (
    <article className="min-w-0 space-y-3 pb-8">
      {items.map((item, i) => {
        const Tag = item.level === 3 ? "h4" : "h3"
        return (
          <div key={item.id} className="space-y-2">
            <Tag
              id={item.id}
              className={
                item.level === 3
                  ? "pt-2 text-sm font-semibold"
                  : "pt-4 text-base font-semibold"
              }
            >
              {item.title}
            </Tag>
            <p className="text-sm text-muted-foreground">{text}</p>
            {i < items.length - 1 && (
              <div className="h-16 rounded-md bg-muted" />
            )}
          </div>
        )
      })}
    </article>
  )
}

export function TocScrollspyDemo() {
  const ru = useLocale() === "ru"
  const items = ru ? structure.ru : structure.en
  const rootRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={rootRef}
      className="h-96 w-full max-w-2xl overflow-y-auto rounded-lg border bg-background px-5"
    >
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1fr_11rem]">
        <Article items={items} text={ru ? textRu : textEn} />
        <TocScrollspy
          items={items}
          root={rootRef}
          offset={16}
          updateHash={false}
          className="hidden pt-4 sm:block"
          labels={{ title: ru ? "На странице" : "On this page" }}
        />
      </div>
    </div>
  )
}

export function TocScrollspySelectorDemo() {
  const ru = useLocale() === "ru"
  const rootRef = useRef<HTMLDivElement>(null)
  const articleRef = useRef<HTMLDivElement>(null)
  const sections = ru
    ? ["Обзор", "Тарифы", "Безопасность", "Поддержка"]
    : ["Overview", "Pricing", "Security", "Support"]

  return (
    <div
      ref={rootRef}
      className="h-80 w-full max-w-2xl overflow-y-auto rounded-lg border bg-background px-5"
    >
      <div className="grid grid-cols-[1fr_9rem] gap-6">
        <div ref={articleRef} className="space-y-3 pb-8">
          {sections.map((title, i) => (
            <div key={title} className="space-y-2">
              <h3 id={`toc-sel-${i}`} className="pt-4 text-base font-semibold">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {ru ? textRu : textEn}
              </p>
              <div className="h-20 rounded-md bg-muted" />
            </div>
          ))}
        </div>
        <TocScrollspy
          selector="h3"
          container={articleRef}
          root={rootRef}
          updateHash={false}
          title={null}
          labels={{ nav: ru ? "Разделы" : "Sections" }}
          className="pt-4"
        />
      </div>
    </div>
  )
}
