"use client"

import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import { Button } from "@/registry/new-york/ui/button"
import { BorderBeam } from "@/registry/new-york/effects/border-beam"

export function Hero() {
  const t = useTranslations("hero")

  return (
    <div className="min-h-[calc(100svh-5rem)] py-20 max-w-6xl mx-auto text-center px-6">
      <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium mb-6">
        <span className="mr-2">✨</span>
        <span>{t("badge")}</span>
      </div>

      <h1 className="mt-4 max-w-4xl mx-auto text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] font-bold tracking-tight text-balance">
        {t("title")}
      </h1>

      <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground text-balance">
        {t("description")}
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" asChild>
          <Link href="/docs">{t("getStarted")}</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/docs/components/button">{t("components")}</Link>
        </Button>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{t("openSource")}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{t("typescript")}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{t("tailwind")}</span>
        </div>
      </div>

      <div className="mt-16 relative">
        <div className="relative overflow-hidden rounded-xl border bg-muted/30 p-2">
          <div className="rounded-lg border bg-background overflow-hidden">
            <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <code className="text-xs text-muted-foreground ml-2">
                npx shadcn@latest add @gooseui/button
              </code>
            </div>
            <div className="p-8 flex items-center justify-center gap-4 min-h-[200px]">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>
          <BorderBeam duration={8} />
        </div>
      </div>
    </div>
  )
}
