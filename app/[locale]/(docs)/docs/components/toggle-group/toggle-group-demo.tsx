"use client"

import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { customToast } from "@/lib/toast"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/gooseui/ui/toggle-group"
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  GridIcon,
  ItalicIcon,
  ListIcon,
  UnderlineIcon,
} from "../toggle/icons"

const en = {
  alignment: "Alignment",
  left: "Left",
  center: "Center",
  right: "Right",
  justify: "Justify",
  formatting: "Text formatting",
  bold: "Bold",
  italic: "Italic",
  underline: "Underline",
  view: "View",
  list: "List",
  grid: "Grid",
  selected: (label: string) => `Alignment: ${label.toLowerCase()}`,
  viewSelected: (label: string) => `View: ${label.toLowerCase()}`,
  none: "none",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    alignment: "Выравнивание",
    left: "Слева",
    center: "По центру",
    right: "Справа",
    justify: "По ширине",
    formatting: "Форматирование текста",
    bold: "Жирный",
    italic: "Курсив",
    underline: "Подчёркнутый",
    view: "Вид",
    list: "Список",
    grid: "Сетка",
    selected: (label: string) => `Выравнивание: ${label.toLowerCase()}`,
    viewSelected: (label: string) => `Вид: ${label.toLowerCase()}`,
    none: "ничего",
  },
}

const wrap =
  "flex flex-wrap justify-center gap-6 rounded-lg bg-muted/30 px-4 py-12"

export function ToggleGroupDemo() {
  const t = content[useLocale() as Locale]
  const options = [
    { value: "left", label: t.left },
    { value: "center", label: t.center },
    { value: "right", label: t.right },
  ]

  return (
    <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
      <ToggleGroup
        type="single"
        defaultValue="left"
        aria-label={t.alignment}
        onValueChange={(value) =>
          customToast.info(
            t.selected(options.find((o) => o.value === value)?.label ?? value),
          )
        }
      >
        {options.map((o) => (
          <ToggleGroupItem key={o.value} value={o.value}>
            {o.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}

export function ToggleGroupFormattingDemo() {
  const t = content[useLocale() as Locale]
  const items = [
    { value: "bold", label: t.bold, icon: <BoldIcon /> },
    { value: "italic", label: t.italic, icon: <ItalicIcon /> },
    { value: "underline", label: t.underline, icon: <UnderlineIcon /> },
  ]
  return (
    <div className={wrap}>
      <ToggleGroup
        type="multiple"
        variant="outline"
        size="icon"
        aria-label={t.formatting}
        onValueChange={(value) =>
          customToast.info(
            `${t.formatting}: ${
              value.length
                ? value
                    .map((v) => items.find((i) => i.value === v)?.label ?? v)
                    .join(", ")
                    .toLowerCase()
                : t.none
            }`,
          )
        }
      >
        {items.map((o) => (
          <ToggleGroupItem key={o.value} value={o.value} aria-label={o.label}>
            {o.icon}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}

export function ToggleGroupIconsDemo() {
  const t = content[useLocale() as Locale]
  const align = [
    { value: "left", label: t.left, icon: <AlignLeftIcon /> },
    { value: "center", label: t.center, icon: <AlignCenterIcon /> },
    { value: "right", label: t.right, icon: <AlignRightIcon /> },
    { value: "justify", label: t.justify, icon: <AlignJustifyIcon /> },
  ]
  const view = [
    { value: "list", label: t.list, icon: <ListIcon /> },
    { value: "grid", label: t.grid, icon: <GridIcon /> },
  ]
  return (
    <div className={wrap}>
      <ToggleGroup
        type="single"
        variant="outline"
        size="icon"
        defaultValue="left"
        aria-label={t.alignment}
        onValueChange={(value) =>
          customToast.info(
            t.selected(align.find((o) => o.value === value)?.label ?? value),
          )
        }
      >
        {align.map((o) => (
          <ToggleGroupItem key={o.value} value={o.value} aria-label={o.label}>
            {o.icon}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <ToggleGroup
        type="single"
        variant="outline"
        size="icon"
        defaultValue="list"
        aria-label={t.view}
        onValueChange={(value) =>
          customToast.info(
            t.viewSelected(view.find((o) => o.value === value)?.label ?? value),
          )
        }
      >
        {view.map((o) => (
          <ToggleGroupItem key={o.value} value={o.value} aria-label={o.label}>
            {o.icon}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}

export function ToggleGroupIconTextDemo() {
  const t = content[useLocale() as Locale]
  const view = [
    { value: "list", label: t.list, icon: <ListIcon /> },
    { value: "grid", label: t.grid, icon: <GridIcon /> },
  ]
  return (
    <div className={wrap}>
      <ToggleGroup
        type="single"
        variant="outline"
        defaultValue="list"
        aria-label={t.view}
        onValueChange={(value) =>
          customToast.info(
            t.viewSelected(view.find((o) => o.value === value)?.label ?? value),
          )
        }
      >
        {view.map((o) => (
          <ToggleGroupItem key={o.value} value={o.value}>
            {o.icon}
            {o.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}
