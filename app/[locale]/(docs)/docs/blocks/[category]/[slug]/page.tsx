import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { Block } from "@/components/blocks/block"
import { BlockPreview } from "@/components/blocks/block-preview"
import { type Dict, pick } from "@/i18n/dict"
import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import { getBlockById, hasBlockComponent } from "@/lib/blocks"
import { getBlockCode } from "@/lib/blocks/utils.server"
import { getBlockCategory } from "@/lib/config/blocks-categories"
import {
  BLOCK_ITEMS,
  getBlock,
  getBlockRegistryUrl,
  getBlocksByCategory,
} from "@/lib/config/blocks-registry"
import { BLOCKS_ENABLED } from "@/lib/config/features"
import { Badge } from "@/registry/gooseui/ui/badge"
import { Button } from "@/registry/gooseui/ui/button"
import { BlockDocs } from "./block-docs"

const en = {
  notFound: "Block Not Found",
  metaTitle: (name: string) => `${name} - Blocks`,
  new: "New",
  featured: "Featured",
  soon: "Coming Soon",
  working:
    "We're working on this block. Join the waitlist to get notified when it's ready.",
  waitlist: "Join Waitlist",
  more: (name: string) => `More ${name} Blocks`,
}

const content: Dict<typeof en> = {
  en,
  ru: {
    notFound: "Блок не найден",
    metaTitle: (name) => `${name} - Блоки`,
    new: "Новое",
    featured: "Рекомендуем",
    soon: "Скоро",
    working:
      "Мы работаем над этим блоком. Встаньте в список ожидания, и мы сообщим, когда он будет готов.",
    waitlist: "В список ожидания",
    more: (name) => `Ещё блоки: ${name}`,
  },
}

interface BlockPageProps {
  params: Promise<{ locale: string; category: string; slug: string }>
}

export async function generateStaticParams() {
  if (!BLOCKS_ENABLED) return []
  return BLOCK_ITEMS.map((block) => ({
    category: block.category,
    slug: block.slug,
  }))
}

export async function generateMetadata({ params }: BlockPageProps) {
  const { locale, slug } = await params
  const t = content[locale as Locale]
  const block = getBlock(slug)

  if (!block) {
    return { title: t.notFound }
  }

  return {
    title: t.metaTitle(block.name),
    description: pick(block.description, locale),
  }
}

export default async function BlockPage({ params }: BlockPageProps) {
  const { locale, category: categorySlug, slug } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]

  const category = getBlockCategory(categorySlug)
  const block = getBlock(slug)

  if (!category || !block || block.category !== categorySlug) {
    notFound()
  }

  const liveBlock = block.blockId ? getBlockById(block.blockId) : undefined
  const liveCode = liveBlock ? await getBlockCode(liveBlock.id) : null
  const installCommand = `npx shadcn@latest add ${getBlockRegistryUrl(slug)}`
  const CategoryIcon = category.icon

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{block.name}</h1>
            {block.isNew && (
              <Badge className="bg-primary text-white">{t.new}</Badge>
            )}
            {block.isFeatured && (
              <Badge className="bg-amber-500/10 text-amber-600">
                {t.featured}
              </Badge>
            )}
          </div>
          <p className="text-lg text-muted-foreground">
            {pick(block.description, locale)}
          </p>
        </div>
      </div>

      {/* Coming soon notice */}
      {block.isComingSoon ? (
        <div className="rounded-lg border border-dashed bg-muted/50 p-12 text-center">
          <div className="mx-auto max-w-md space-y-4">
            <div className="rounded-full bg-muted p-4 w-fit mx-auto">
              <CategoryIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold">{t.soon}</h2>
            <p className="text-muted-foreground">{t.working}</p>
            <Button>{t.waitlist}</Button>
          </div>
        </div>
      ) : liveBlock ? (
        <Block
          block={liveBlock}
          code={liveCode ?? ""}
          hasComponent={hasBlockComponent(liveBlock.id)}
          showHeading={false}
        />
      ) : (
        /* Preview */
        <BlockPreview
          name={block.name}
          installCommand={installCommand}
          sourceCode={block.sourceCode}
        />
      )}

      {/* Docs: installation, usage, props */}
      {liveBlock && <BlockDocs slug={slug} locale={locale as Locale} />}

      {/* Related blocks */}
      <section className="space-y-4 pt-8 border-t">
        <h2 className="text-xl font-semibold">
          {t.more(pick(category.name, locale))}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {getBlocksByCategory(categorySlug)
            .filter((b) => b.slug !== slug)
            .slice(0, 4)
            .map((relatedBlock) => (
              <Link
                key={relatedBlock.slug}
                href={`/docs/blocks/${categorySlug}/${relatedBlock.slug}`}
                className="group rounded-lg border p-4 hover:bg-muted/50"
              >
                <h3 className="font-medium group-hover:text-primary">
                  {relatedBlock.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {pick(relatedBlock.description, locale)}
                </p>
              </Link>
            ))}
        </div>
      </section>
    </div>
  )
}
