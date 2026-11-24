"use client"

import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import { BorderBeam } from "@/registry/gooseui/effects/border-beam"
import { Button } from "@/registry/gooseui/ui/button"

const en = {
  title: "Ready to Get Started?",
  description: "Add your first component to your project right now",
  docs: "Documentation",
}
const content: Dict<typeof en> = {
  en,
  ru: {
    title: "Готовы начать?",
    description: "Добавьте первый компонент в проект прямо сейчас",
    docs: "Документация",
  },
}

export function CTA() {
  const t = content[useLocale() as Locale]
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div
          className="relative overflow-hidden border bg-card p-8 md:p-12 text-center"
          style={
            {
              cornerShape: "squircle",
              borderRadius: "1.5rem",
            } as React.CSSProperties
          }
        >
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {t.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              {t.description}
            </p>
            <div
              className="mt-6 border bg-muted/50 px-4 py-3 font-mono text-xs sm:text-sm max-w-md mx-auto overflow-x-auto"
              style={
                {
                  cornerShape: "squircle",
                  borderRadius: "1rem",
                } as React.CSSProperties
              }
            >
              <span className="whitespace-nowrap">
                npx shadcn@latest add @gooseui/button
              </span>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button squircle size="lg" asChild>
                <Link href="/docs">{t.docs}</Link>
              </Button>
              <Button squircle size="lg" variant="outline" asChild>
                <a
                  href="https://github.com/goosen-x/gooseui"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </Button>
            </div>
          </div>
          <BorderBeam
            duration={10}
            colorFrom="#10b981"
            colorTo="#3b82f6"
            squircle
          />
        </div>
      </div>
    </section>
  )
}
