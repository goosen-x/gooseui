import { Plus } from "lucide-react"
import Link from "next/link"
import { BlockCard } from "@/components/blocks/block-card"
import { Button } from "@/components/ui/button"
import { BLOCK_CATEGORIES } from "@/lib/config/blocks-categories"
import {
  getBlocksByCategory,
  getFeaturedBlocks,
} from "@/lib/config/blocks-registry"

export const metadata = {
  title: "Blocks - GooseUI",
  description: "Premium UI blocks for React and Next.js applications",
}

export default function BlocksPage() {
  const featuredBlocks = getFeaturedBlocks()

  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tight">Blocks</h1>
          <Button asChild>
            <Link
              href="https://github.com/goosen-x/gooseui/issues/new?labels=block-request&title=Block+request:+"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add a block
            </Link>
          </Button>
        </div>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Premium UI blocks for Web3, Dashboards, Marketing, and E-commerce.
          Copy and paste into your apps.
        </p>
      </div>

      {/* Featured blocks */}
      {featuredBlocks.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Featured</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredBlocks.map((block) => (
              <BlockCard key={block.slug} block={block} />
            ))}
          </div>
        </section>
      )}

      {/* Categories with blocks */}
      {BLOCK_CATEGORIES.map((category) => {
        const blocks = getBlocksByCategory(category.slug)
        if (blocks.length === 0) return null

        const Icon = category.icon

        return (
          <section key={category.slug} className="space-y-4">
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-2xl font-semibold">{category.name}</h2>
              <span className="text-sm text-muted-foreground">
                ({blocks.length})
              </span>
            </div>
            <p className="text-muted-foreground">{category.description}</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blocks.slice(0, 6).map((block) => (
                <BlockCard key={block.slug} block={block} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
