import { ChevronLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { Block } from "@/components/blocks/block"
import { type Dict, pick } from "@/i18n/dict"
import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import {
  blocksCategoriesMetadata,
  getCategoryById,
  getDisplayBlocksByCategory,
  hasBlockComponent,
  isDevelopment,
} from "@/lib/blocks"
import { getBlockCode } from "@/lib/blocks/utils.server"
import { BLOCKS_ENABLED } from "@/lib/config/features"
import { Button } from "@/registry/gooseui/ui/button"

const en = {
  notFound: "Category Not Found",
  metaTitle: (name: string) => `${name} Blocks`,
  allBlocks: "All Blocks",
  soon: "Coming Soon",
  working: (name: string) =>
    `We're working on ${name.toLowerCase()} blocks. Stay tuned!`,
  empty: "No blocks in this category yet.",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    notFound: "Категория не найдена",
    metaTitle: (name) => `Блоки: ${name}`,
    allBlocks: "Все блоки",
    soon: "Скоро",
    working: (name) =>
      `Мы работаем над блоками «${name}». Следите за новостями!`,
    empty: "В этой категории пока нет блоков.",
  },
}

interface CategoryPageProps {
  params: Promise<{ locale: string; category: string }>
}

export async function generateStaticParams() {
  if (!BLOCKS_ENABLED) return []
  return blocksCategoriesMetadata.map((c) => ({ category: c.id }))
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { locale, category: categoryId } = await params
  const t = content[locale as Locale]
  const category = getCategoryById(categoryId)

  if (!category) {
    return { title: t.notFound }
  }

  return {
    title: t.metaTitle(pick(category.name, locale)),
    description: pick(category.description, locale),
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale, category: categoryId } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
  const category = getCategoryById(categoryId)
  const isDevMode = isDevelopment()

  if (!category) {
    notFound()
  }

  const blocks = getDisplayBlocksByCategory(categoryId)
  const Icon = category.icon

  // Get code for each block
  const blocksWithCode = await Promise.all(
    blocks.map(async (block) => {
      const code = await getBlockCode(block.id)
      return { ...block, code }
    }),
  )

  return (
    <div className="space-y-8">
      {/* Back link */}
      <Button variant="ghost" size="sm" asChild className="cursor-pointer">
        <Link href="/docs/blocks">
          <ChevronLeft className="mr-1 h-4 w-4" />
          {t.allBlocks}
        </Link>
      </Button>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-muted p-2">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">
                {pick(category.name, locale)}
              </h1>
              {category.isComingSoon && isDevMode && (
                <span className="text-xs bg-muted px-2 py-0.5 rounded">
                  DEV
                </span>
              )}
            </div>
            <p className="text-muted-foreground">
              {pick(category.description, locale)}
            </p>
          </div>
        </div>
      </div>

      {/* Coming soon notice (only in dev mode) */}
      {category.isComingSoon && isDevMode && (
        <div className="rounded-lg border border-dashed bg-muted/50 p-8 text-center">
          <p className="text-lg font-medium">{t.soon}</p>
          <p className="text-sm text-muted-foreground">
            {t.working(pick(category.name, locale))}
          </p>
        </div>
      )}

      {/* Blocks list */}
      {blocksWithCode.length > 0 && (
        <div className="space-y-12">
          {blocksWithCode.map((block) => (
            <Block
              key={block.id}
              block={block}
              code={block.code || ""}
              hasComponent={hasBlockComponent(block.id)}
            />
          ))}
        </div>
      )}

      {/* Empty state */}
      {blocks.length === 0 && !category.isComingSoon && (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">{t.empty}</p>
        </div>
      )}
    </div>
  )
}
