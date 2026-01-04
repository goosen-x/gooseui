import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BlockPreview } from "@/components/blocks/block-preview"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BLOCK_CATEGORIES,
  getBlockCategory,
} from "@/lib/config/blocks-categories"
import {
  BLOCK_ITEMS,
  getBlock,
  getBlockRegistryUrl,
  getBlocksByCategory,
} from "@/lib/config/blocks-registry"

interface BlockPageProps {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  return BLOCK_ITEMS.map((block) => ({
    category: block.category,
    slug: block.slug,
  }))
}

export async function generateMetadata({ params }: BlockPageProps) {
  const { slug } = await params
  const block = getBlock(slug)

  if (!block) {
    return { title: "Block Not Found" }
  }

  return {
    title: `${block.name} - GooseUI Blocks`,
    description: block.description,
  }
}

export default async function BlockPage({ params }: BlockPageProps) {
  const { category: categorySlug, slug } = await params

  const category = getBlockCategory(categorySlug)
  const block = getBlock(slug)

  if (!category || !block || block.category !== categorySlug) {
    notFound()
  }

  const installCommand = `npx shadcn@latest add ${getBlockRegistryUrl(slug)}`
  const CategoryIcon = category.icon

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/docs/blocks" className="hover:text-foreground">
          Blocks
        </Link>
        <span>/</span>
        <Link
          href={`/docs/blocks/${categorySlug}`}
          className="hover:text-foreground"
        >
          {category.name}
        </Link>
        <span>/</span>
        <span className="text-foreground">{block.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{block.name}</h1>
            {block.isNew && (
              <Badge className="bg-blue-500/10 text-blue-600">New</Badge>
            )}
            {block.isFeatured && (
              <Badge className="bg-amber-500/10 text-amber-600">Featured</Badge>
            )}
          </div>
          <p className="text-lg text-muted-foreground">{block.description}</p>
        </div>
      </div>

      {/* Coming soon notice */}
      {block.isComingSoon ? (
        <div className="rounded-lg border border-dashed bg-muted/50 p-12 text-center">
          <div className="mx-auto max-w-md space-y-4">
            <div className="rounded-full bg-muted p-4 w-fit mx-auto">
              <CategoryIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold">Coming Soon</h2>
            <p className="text-muted-foreground">
              We&apos;re working on this block. Join the waitlist to get
              notified when it&apos;s ready.
            </p>
            <Button>Join Waitlist</Button>
          </div>
        </div>
      ) : (
        /* Preview */
        <BlockPreview
          name={block.name}
          installCommand={installCommand}
          sourceCode={block.sourceCode}
        />
      )}

      {/* Related blocks */}
      <section className="space-y-4 pt-8 border-t">
        <h2 className="text-xl font-semibold">More {category.name} Blocks</h2>
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
                  {relatedBlock.description}
                </p>
              </Link>
            ))}
        </div>
      </section>
    </div>
  )
}
