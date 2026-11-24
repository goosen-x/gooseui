"use client"

import { useLocale } from "next-intl"
import {
  getTransitionOrigin,
  ThemeTransitionToggle,
  type ThemeTransitionVariant,
  useThemeTransition,
} from "@/registry/gooseui/effects/theme-transition"
import { Button } from "@/registry/gooseui/ui/button"

const variants: ThemeTransitionVariant[] = ["circle", "fade", "scale", "slide"]

const texts = {
  en: {
    toggle: "Ready-made toggle",
    toLight: "Switch to light theme",
    toDark: "Switch to dark theme",
  },
  ru: {
    toggle: "Готовая кнопка",
    toLight: "Включить светлую тему",
    toDark: "Включить тёмную тему",
  },
}

function VariantButton({ variant }: { variant: ThemeTransitionVariant }) {
  const { toggleTheme } = useThemeTransition({ variant, duration: 600 })
  return (
    <Button
      variant="ghost"
      type="button"
      onClick={(event) => toggleTheme(getTransitionOrigin(event))}
      className="h-9 cursor-pointer rounded-md border bg-background px-4 font-mono text-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {variant}
    </Button>
  )
}

export function ThemeTransitionDemo() {
  const locale = useLocale() as keyof typeof texts
  const t = texts[locale] ?? texts.en

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap justify-center gap-2">
        {variants.map((variant) => (
          <VariantButton key={variant} variant={variant} />
        ))}
      </div>
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span>{t.toggle}</span>
        <ThemeTransitionToggle
          labels={{ toLight: t.toLight, toDark: t.toDark }}
        />
      </div>
    </div>
  )
}
