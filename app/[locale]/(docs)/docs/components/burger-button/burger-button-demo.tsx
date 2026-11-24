"use client"

import { useLocale } from "next-intl"
import type { CSSProperties } from "react"
import { useState } from "react"
import {
  BurgerButton,
  type BurgerButtonVariant,
} from "@/registry/gooseui/ui/burger-button"
import { Button } from "@/registry/gooseui/ui/button"

const ruLabels = { open: "Открыть меню", close: "Закрыть меню", menu: "Меню" }

export function BurgerButtonDemo() {
  const ru = useLocale() === "ru"
  return <BurgerButton size="lg" labels={ru ? ruLabels : undefined} />
}

export function BurgerButtonVariantsDemo() {
  const ru = useLocale() === "ru"
  const variants: BurgerButtonVariant[] = ["cross", "squeeze", "spin", "arrow"]
  return (
    <div className="flex flex-wrap items-end justify-center gap-8">
      {variants.map((v) => (
        <div key={v} className="flex flex-col items-center gap-2">
          <BurgerButton variant={v} labels={ru ? ruLabels : undefined} />
          <span className="font-mono text-xs text-muted-foreground">{v}</span>
        </div>
      ))}
    </div>
  )
}

export function BurgerButtonSizesDemo() {
  const ru = useLocale() === "ru"
  return (
    <div className="flex items-center gap-4">
      <BurgerButton
        size="sm"
        appearance="ghost"
        labels={ru ? ruLabels : undefined}
      />
      <BurgerButton
        size="md"
        appearance="outline"
        labels={ru ? ruLabels : undefined}
      />
      <BurgerButton
        size="lg"
        appearance="solid"
        labels={ru ? ruLabels : undefined}
      />
    </div>
  )
}

export function BurgerButtonControlledDemo() {
  const ru = useLocale() === "ru"
  const [open, setOpen] = useState(false)
  const items = ru
    ? ["Главная", "Каталог", "О нас", "Контакты"]
    : ["Home", "Catalog", "About", "Contact"]
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-lg border bg-background">
      <div className="flex items-center justify-between border-b px-3 py-2">
        <div className="size-6 rounded-md bg-primary" aria-hidden />
        <BurgerButton
          open={open}
          onOpenChange={setOpen}
          appearance="ghost"
          aria-controls="burger-demo-menu"
          labels={ru ? ruLabels : undefined}
        />
      </div>
      <nav
        id="burger-demo-menu"
        hidden={!open}
        aria-label={ru ? "Основное меню" : "Main menu"}
        className="p-2"
      >
        <ul className="space-y-0.5">
          {items.map((item) => (
            <li key={item}>
              <Button
                variant="ghost"
                type="button"
                onClick={() => setOpen(false)}
                className="w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm transition-colors outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
              >
                {item}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      {!open && (
        <p className="px-3 py-6 text-center text-sm text-muted-foreground">
          {ru ? "Нажмите на бургер" : "Press the burger"}
        </p>
      )}
    </div>
  )
}

export function BurgerButtonPopoverDemo() {
  const ru = useLocale() === "ru"
  const items = ru
    ? ["Главная", "Каталог", "О нас", "Контакты"]
    : ["Home", "Catalog", "About", "Contact"]
  return (
    <div className="flex w-full max-w-sm items-center justify-between rounded-lg border bg-background px-3 py-2">
      <div className="size-6 rounded-md bg-primary" aria-hidden />
      <BurgerButton
        popoverTarget="burger-popover-menu"
        variant="arrow"
        appearance="ghost"
        labels={ru ? ruLabels : undefined}
        style={{ anchorName: "--burger-popover" } as CSSProperties}
      />
      <nav
        id="burger-popover-menu"
        popover="auto"
        aria-label={ru ? "Основное меню" : "Main menu"}
        // Anchor positioning is an extra: without it the browser centers the popover
        className="w-48 rounded-lg border bg-popover p-1 text-popover-foreground shadow-md supports-[top:anchor(bottom)]:m-0 supports-[top:anchor(bottom)]:mt-2 supports-[top:anchor(bottom)]:[position-anchor:--burger-popover] supports-[top:anchor(bottom)]:[inset:auto] supports-[top:anchor(bottom)]:[top:anchor(bottom)] supports-[top:anchor(bottom)]:[right:anchor(right)]"
      >
        <ul>
          {items.map((item) => (
            <li key={item}>
              <a
                href="#popover-menu"
                className="block cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-accent"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export function BurgerButtonCssMenuDemo() {
  const ru = useLocale() === "ru"
  const items = ru
    ? ["Главная", "Каталог", "О нас", "Контакты"]
    : ["Home", "Catalog", "About", "Contact"]
  return (
    <div className="group/header w-full max-w-sm overflow-hidden rounded-lg border bg-background">
      <div className="flex items-center justify-between border-b px-3 py-2">
        <div className="size-6 rounded-md bg-primary" aria-hidden />
        <BurgerButton
          variant="squeeze"
          appearance="ghost"
          aria-controls="burger-css-menu"
          labels={ru ? ruLabels : undefined}
        />
      </div>
      <nav
        id="burger-css-menu"
        aria-label={ru ? "Основное меню" : "Main menu"}
        className="hidden p-2 group-has-[.gb_:checked]/header:block"
      >
        <ul className="space-y-0.5">
          {items.map((item) => (
            <li key={item}>
              <a
                href="#css-menu"
                className="block cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-accent"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
