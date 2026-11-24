import { setRequestLocale } from "next-intl/server"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import { Button } from "@/registry/gooseui/ui/button"

type Props = { params: Promise<{ locale: string }> }

const en = {
  metaTitle: "Documentation",
  description: "Guide to using GooseUI",
  navTitle: "Introduction",
  whatIs: "What is GooseUI?",
  whatIsText:
    "GooseUI is a collection of ready-made components for React that you can copy and paste into your projects. It's not an npm package — you get full control over the code.",
  features: "Features",
  featureList: [
    "Accessible components using native HTML and CSS",
    "Minimal JavaScript, maximum browser APIs",
    "Styling via Tailwind CSS 4",
    "Dark theme out of the box",
    "Full TypeScript support",
    "Minimal external dependencies",
    "Copy-paste installation via CLI",
  ],
  quickStart: "Quick Start",
  quickStartText: "Start by installing components via shadcn CLI:",
  installation: "Installation",
  components: "Components",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    metaTitle: "Документация",
    description: "Руководство по работе с GooseUI",
    navTitle: "Введение",
    whatIs: "Что такое GooseUI?",
    whatIsText:
      "GooseUI — набор готовых компонентов для React, которые можно скопировать в свой проект. Это не npm-пакет: код целиком в вашем распоряжении.",
    features: "Возможности",
    featureList: [
      "Доступные компоненты на нативном HTML и CSS",
      "Минимум JavaScript, максимум браузерных API",
      "Стили на Tailwind CSS 4",
      "Тёмная тема из коробки",
      "Полная поддержка TypeScript",
      "Минимум внешних зависимостей",
      "Установка через CLI одной командой",
    ],
    quickStart: "Быстрый старт",
    quickStartText: "Установите компоненты через shadcn CLI:",
    installation: "Установка",
    components: "Компоненты",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: t.metaTitle, description: t.description }
}

export default async function IntroductionPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
  const toc = [
    { id: "what-is-gooseui", title: t.whatIs, level: 2 },
    { id: "features", title: t.features, level: 2 },
    { id: "quick-start", title: t.quickStart, level: 2 },
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-6">
        <DocsPageNav title={t.navTitle} />
        <p className="text-lg text-muted-foreground">{t.description}</p>

        <div className="space-y-4">
          <h2
            id="what-is-gooseui"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.whatIs}
          </h2>
          <p className="leading-7">{t.whatIsText}</p>
        </div>

        <div className="space-y-4">
          <h2
            id="features"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.features}
          </h2>
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            {t.featureList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h2
            id="quick-start"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.quickStart}
          </h2>
          <p className="leading-7">{t.quickStartText}</p>
          <InstallCommand packageName="@gooseui/button" />
        </div>

        <div className="flex gap-4 pt-4">
          <Button asChild>
            <Link href="/docs/installation">{t.installation}</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/components">{t.components}</Link>
          </Button>
        </div>
      </div>
    </DocsPage>
  )
}
