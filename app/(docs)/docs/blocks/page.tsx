import { Plus } from "lucide-react"
import Link from "next/link"
import { CategoryCard } from "@/components/blocks/category-card"
import { Button } from "@/components/ui/button"
import {
  getDisplayCategories,
  isDevelopment,
} from "@/lib/blocks"

export const metadata = {
  title: "Blocks - GooseUI",
  description: "Free, open-source UI blocks. Copy and paste into your apps.",
}

export default function BlocksPage() {
  const isDevMode = isDevelopment()
  const categories = getDisplayCategories()

  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tight">Blocks</h1>
          <Button asChild className="cursor-pointer">
            <Link
              href="https://github.com/goosenx/gooseui/issues/new?labels=block-request&title=Block+request:+"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Plus className="mr-2 h-4 w-4" />
              Request a block
            </Link>
          </Button>
        </div>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Free, open-source UI blocks built with React, Tailwind CSS, and shadcn/ui.
          Copy and paste into your apps.
        </p>
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
