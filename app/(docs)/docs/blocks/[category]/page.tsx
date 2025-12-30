import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BlockCard } from "@/components/blocks/block-card"
import { Button } from "@/components/ui/button"
import {
  BLOCK_CATEGORIES,
  getBlockCategory,
} from "@/lib/config/blocks-categories"
import { getBlocksByCategory } from "@/lib/config/blocks-registry"

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return BLOCK_CATEGORIES.map((c) => ({ category: c.slug }))
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params
  const category = getBlockCategory(categorySlug)

  if (!category) {
    return { title: "Category Not Found" }
  }

  return {
    title: `${category.name} Blocks - GooseUI`,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params
  const category = getBlockCategory(categorySlug)

  if (!category) {
    notFound()
  }

  const blocks = getBlocksByCategory(categorySlug)
  const Icon = category.icon

  return (
    <div className="space-y-8">
      {/* Back link */}
      <Button variant="ghost" size="sm" asChild>
        <Link href="/docs/blocks">
          <ChevronLeft className="mr-1 h-4 w-4" />
          All Blocks
        </Link>
      </Button>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-muted p-2">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {category.name}
            </h1>
            <p className="text-muted-foreground">{category.description}</p>
          </div>
        </div>
      </div>

      {/* Coming soon notice */}
      {category.isComingSoon && (
        <div className="rounded-lg border border-dashed bg-muted/50 p-8 text-center">
          <p className="text-lg font-medium">Coming Soon</p>
          <p className="text-sm text-muted-foreground">
            We&apos;re working on {category.name.toLowerCase()} blocks. Stay
            tuned!
          </p>
        </div>
      )}

      {/* Blocks grid */}
      {blocks.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blocks.map((block) => (
            <BlockCard key={block.slug} block={block} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {blocks.length === 0 && !category.isComingSoon && (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">
            No blocks in this category yet.
          </p>
        </div>
      )}
    </div>
  )
}
