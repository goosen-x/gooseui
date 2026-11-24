import { Plus } from "lucide-react"
import Link from "next/link"
import { setRequestLocale } from "next-intl/server"
import { CategoryCard } from "@/components/blocks/category-card"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { getDisplayCategories, isDevelopment } from "@/lib/blocks"
import { Button } from "@/registry/gooseui/ui/button"

type Props = { params: Promise<{ locale: string }> }

const en = {
  metaTitle: "Blocks",
  title: "Blocks",
  request: "Request a block",
  description: "Free, open-source UI blocks. Copy and paste into your apps.",
  hero: "Free, open-source UI blocks built with React, Tailwind CSS, and shadcn/ui. Copy and paste into your apps.",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    metaTitle: "Блоки",
    title: "Блоки",
    request: "Запросить блок",
    description:
      "Бесплатные UI-блоки с открытым кодом. Копируйте в свои приложения.",
    hero: "Бесплатные UI-блоки с открытым кодом на React, Tailwind CSS и shadcn/ui. Копируйте в свои приложения.",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: t.metaTitle, description: t.description }
}

export default async function BlocksPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
  const isDevMode = isDevelopment()
  const categories = getDisplayCategories()

  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tight">{t.title}</h1>
          <Button asChild className="cursor-pointer">
            <Link
              href="https://github.com/goosenx/gooseui/issues/new?labels=block-request&title=Block+request:+"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Plus className="mr-2 h-4 w-4" />
              {t.request}
            </Link>
          </Button>
        </div>
        <p className="max-w-2xl text-lg text-muted-foreground">{t.hero}</p>
      </div>

      {/* Categories Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            showDevBadge={isDevMode && category.isComingSoon}
          />
        ))}
      </div>
    </div>
  )
}
