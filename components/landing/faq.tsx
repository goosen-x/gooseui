"use client"

import { useTranslations } from "next-intl"
import { HelpCircle, Download, Palette, Code, Shield, Zap } from "lucide-react"

const faqIcons = [HelpCircle, Download, Palette, Code, Shield, Zap]
const faqKeys = ["q1", "q2", "q3", "q4", "q5", "q6"] as const

export function FAQ() {
  const t = useTranslations("faq")

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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {faqKeys.map((key, index) => {
            const Icon = faqIcons[index]
            return (
              <div
                key={key}
                className="rounded-xl border bg-card p-6 hover:shadow-md transition-shadow"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">{t(`${key}.question`)}</h3>
                <p className="text-sm text-muted-foreground">
                  {t(`${key}.answer`)}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
