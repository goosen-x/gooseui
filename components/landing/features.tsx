"use client"

import { useTranslations } from "next-intl"
import {
  Sparkles,
  Zap,
  Code2,
  Palette,
  Blocks,
  Terminal
} from "lucide-react"

const featureIcons = [Sparkles, Zap, Code2, Palette, Blocks, Terminal]
const featureKeys = ['animations', 'installation', 'control', 'styling', 'blocks', 'cli'] as const

export function Features() {
  const t = useTranslations("features")

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featureKeys.map((key, index) => {
            const Icon = featureIcons[index]
            return (
              <div
                key={key}
                className="relative group rounded-xl border bg-card p-6 hover:shadow-lg transition-shadow"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t(`${key}.title`)}</h3>
                <p className="text-muted-foreground">{t(`${key}.description`)}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
