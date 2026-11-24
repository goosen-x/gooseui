"use client"

import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/gooseui/ui/button"
import {
  ThemeCustomizerBar,
  ThemeCustomizerCorner,
  ThemeCustomizerDock,
  ThemeCustomizerPill,
  ThemeCustomizerSidebar,
  ThemeCustomizerToolbar,
} from "@/registry/gooseui/ui/theme-customizer"

const en = {
  compactFloatingPillWith: "Compact floating pill with popup color picker",
  horizontalBarWithAll: "Horizontal bar with all options visible",
  verticalSidebarOnThe: "Vertical sidebar on the right edge",
  macosStyleDockAt: "macOS-style dock at the bottom",
  minimalExpandableButtonIn: "Minimal expandable button in corner",
  animatedExpandingToolbarWith: "Expanding toolbar with a CSS width transition",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    compactFloatingPillWith:
      "Компактная плавающая «таблетка» со всплывающим выбором цвета",
    horizontalBarWithAll: "Горизонтальная панель, все опции на виду",
    verticalSidebarOnThe: "Вертикальная панель у правого края",
    macosStyleDockAt: "Док в стиле macOS внизу",
    minimalExpandableButtonIn: "Минималистичная раскрывающаяся кнопка в углу",
    animatedExpandingToolbarWith:
      "Тулбар, который раскрывается CSS-переходом ширины",
  },
}

function useT() {
  return content[useLocale() as Locale]
}

type Variant = "pill" | "bar" | "sidebar" | "dock" | "corner" | "toolbar"

function getVariants(t: ReturnType<typeof useT>) {
  return [
    {
      id: "pill",
      name: "Pill",
      description: t.compactFloatingPillWith,
    },
    {
      id: "bar",
      name: "Bar",
      description: t.horizontalBarWithAll,
    },
    {
      id: "sidebar",
      name: "Sidebar",
      description: t.verticalSidebarOnThe,
    },
    { id: "dock", name: "Dock", description: t.macosStyleDockAt },
    {
      id: "corner",
      name: "Corner",
      description: t.minimalExpandableButtonIn,
    },
    {
      id: "toolbar",
      name: "Toolbar",
      description: t.animatedExpandingToolbarWith,
    },
  ] satisfies { id: Variant; name: string; description: string }[]
}

export function ThemeCustomizerDemo() {
  const t = useT()
  const variants = getVariants(t)
  const [active, setActive] = React.useState<Variant>("pill")

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => (
          <Button
            variant="ghost"
            key={v.id}
            type="button"
            onClick={() => setActive(v.id)}
            className={cn(
              "cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors",
              active === v.id
                ? "border-primary bg-primary text-primary-foreground"
                : "hover:bg-accent",
            )}
          >
            {v.name}
          </Button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        {variants.find((v) => v.id === active)?.description}
      </p>

      <div className="min-h-[18.75rem] rounded-xl border bg-muted/30 p-8 overflow-x-auto">
        <div className="flex min-w-fit items-center justify-center min-h-[14.75rem]">
          {active === "pill" && <ThemeCustomizerPill inline />}
          {active === "bar" && <ThemeCustomizerBar />}
          {active === "sidebar" && <ThemeCustomizerSidebar inline />}
          {active === "dock" && <ThemeCustomizerDock inline />}
          {active === "corner" && <ThemeCustomizerCorner inline />}
          {active === "toolbar" && <ThemeCustomizerToolbar inline />}
        </div>
      </div>
    </div>
  )
}
