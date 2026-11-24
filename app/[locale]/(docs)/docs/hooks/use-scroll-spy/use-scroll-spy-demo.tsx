"use client"

import { useLocale } from "next-intl"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useScrollSpy } from "@/registry/gooseui/hooks/use-scroll-spy"
import { Button } from "@/registry/gooseui/ui/button"

const sectionsEn = [
  { id: "spy-intro", title: "Introduction" },
  { id: "spy-setup", title: "Setup" },
  { id: "spy-config", title: "Configuration" },
  { id: "spy-deploy", title: "Deployment" },
  { id: "spy-faq", title: "FAQ" },
]

const sectionsRu = [
  { id: "spy-intro", title: "Введение" },
  { id: "spy-setup", title: "Установка" },
  { id: "spy-config", title: "Настройка" },
  { id: "spy-deploy", title: "Публикация" },
  { id: "spy-faq", title: "Вопросы" },
]

const filler = {
  en: "Scroll this box. The highlighted pill above follows the section whose top has crossed the activation line.",
  ru: "Прокрутите этот блок. Подсвеченная плашка сверху показывает раздел, верх которого уже пересёк линию активации.",
}

function Pills({
  items,
  active,
}: {
  items: { id: string; title: string }[]
  active: string | null
}) {
  return (
    <div className="flex flex-wrap gap-1.5 border-b bg-background/80 p-2">
      {items.map((s) => (
        <span
          key={s.id}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs transition-colors",
            s.id === active
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground",
          )}
        >
          {s.title}
        </span>
      ))}
    </div>
  )
}

export function ScrollSpyBasicDemo() {
  const ru = useLocale() === "ru"
  const sections = ru ? sectionsRu : sectionsEn
  const rootRef = useRef<HTMLDivElement>(null)
  const active = useScrollSpy(
    sections.map((s) => s.id),
    { root: rootRef, offset: 24 },
  )

  return (
    <div className="w-full max-w-lg overflow-hidden rounded-lg border bg-background">
      <Pills items={sections} active={active} />
      <div ref={rootRef} className="h-72 overflow-y-auto px-5">
        {sections.map((s, i) => (
          <section key={s.id} id={s.id} className="py-5">
            <h3 className="mb-2 font-semibold">{s.title}</h3>
            <p className="text-sm text-muted-foreground">
              {ru ? filler.ru : filler.en}
            </p>
            <div
              className="mt-3 rounded-md bg-muted"
              style={{ height: i === sections.length - 1 ? 40 : 140 }}
            />
          </section>
        ))}
      </div>
    </div>
  )
}

export function ScrollSpyOffsetDemo() {
  const ru = useLocale() === "ru"
  const sections = (ru ? sectionsRu : sectionsEn).map((s) => ({
    ...s,
    id: `${s.id}-o`,
  }))
  const rootRef = useRef<HTMLDivElement>(null)
  const active = useScrollSpy(
    sections.map((s) => s.id),
    { root: rootRef, offset: "40%" },
  )

  return (
    <div className="w-full max-w-lg overflow-hidden rounded-lg border bg-background">
      <Pills items={sections} active={active} />
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 z-10 border-t-2 border-dashed border-primary/60"
          style={{ top: "40%" }}
        >
          <span className="absolute right-2 -top-5 text-[10px] text-primary">
            40%
          </span>
        </div>
        <div ref={rootRef} className="h-72 overflow-y-auto px-5">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="py-5">
              <h3 className="mb-2 font-semibold">{s.title}</h3>
              <div className="h-32 rounded-md bg-muted" />
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ScrollSpyDynamicDemo() {
  const ru = useLocale() === "ru"
  const [count, setCount] = useState(2)
  const sections = Array.from({ length: count }, (_, i) => ({
    id: `spy-dyn-${i + 1}`,
    title: `${ru ? "Раздел" : "Section"} ${i + 1}`,
  }))
  const rootRef = useRef<HTMLDivElement>(null)
  const active = useScrollSpy(
    sections.map((s) => s.id),
    { root: rootRef, offset: 24 },
  )

  return (
    <div className="w-full max-w-lg space-y-3">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          type="button"
          onClick={() => setCount((c) => Math.min(c + 1, 8))}
          className="h-8 cursor-pointer rounded-md border bg-background px-3 text-sm transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring outline-none"
        >
          {ru ? "Добавить раздел" : "Add section"}
        </Button>
        <Button
          variant="ghost"
          type="button"
          onClick={() => setCount((c) => Math.max(c - 1, 1))}
          className="h-8 cursor-pointer rounded-md border bg-background px-3 text-sm transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring outline-none"
        >
          {ru ? "Убрать" : "Remove"}
        </Button>
        <span className="ml-auto text-xs text-muted-foreground">
          active: <code className="font-mono">{active ?? "null"}</code>
        </span>
      </div>
      <div className="overflow-hidden rounded-lg border bg-background">
        <Pills items={sections} active={active} />
        <div ref={rootRef} className="h-56 overflow-y-auto px-5">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="py-4">
              <h3 className="mb-2 font-semibold">{s.title}</h3>
              <div className="h-28 rounded-md bg-muted" />
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
