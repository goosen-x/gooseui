import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Block } from "@/components/blocks/block"
import { Button } from "@/components/ui/button"
import {
  blocksCategoriesMetadata,
  getCategoryById,
  getDisplayBlocksByCategory,
  isDevelopment,
  hasBlockComponent,
} from "@/lib/blocks"
import { getBlockCode } from "@/lib/blocks/utils.server"

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return blocksCategoriesMetadata.map((c) => ({ category: c.id }))
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: categoryId } = await params
  const category = getCategoryById(categoryId)

  if (!category) {
    return { title: "Category Not Found" }
  }

  return {
    title: `${category.name} Blocks - GooseUI`,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categoryId } = await params
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
    })
  )

  return (
    <div className="space-y-8">
      {/* Back link */}
      <Button variant="ghost" size="sm" asChild className="cursor-pointer">
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
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">
                {category.name}
              </h1>
              {category.isComingSoon && isDevMode && (
                <span className="text-xs bg-muted px-2 py-0.5 rounded">DEV</span>
              )}
            </div>
            <p className="text-muted-foreground">{category.description}</p>
          </div>
        </div>
      </div>

      {/* Coming soon notice (only in dev mode) */}
      {category.isComingSoon && isDevMode && (
        <div className="rounded-lg border border-dashed bg-muted/50 p-8 text-center">
          <p className="text-lg font-medium">Coming Soon</p>
          <p className="text-sm text-muted-foreground">
            We&apos;re working on {category.name.toLowerCase()} blocks. Stay
            tuned!
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
          <p className="text-muted-foreground">
            No blocks in this category yet.
          </p>
        </div>
      )}
    </div>
  )
}
