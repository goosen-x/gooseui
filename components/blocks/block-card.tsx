"use client"

import { Clock, Lock, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { BlockItem, BlockTier } from "@/lib/config/blocks-registry"
import { cn } from "@/lib/utils"

interface BlockCardProps {
  block: BlockItem
  className?: string
}

const tierConfig: Record<BlockTier, { label: string; className: string }> = {
  free: {
    label: "Free",
    className: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
  pro: {
    label: "Pro",
    className: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  team: {
    label: "Team",
    className: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
}

export function BlockCard({ block, className }: BlockCardProps) {
  const tier = tierConfig[block.tier]
  const href = `/docs/blocks/${block.category}/${block.slug}`

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md",
        block.isComingSoon && "pointer-events-none opacity-60",
        className,
      )}
    >
      {/* Preview Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {block.previewImage ? (
          <Image
            src={block.previewImage}
            alt={block.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
            <div className="text-4xl text-muted-foreground/30">
              {block.category === "web3" && "W3"}
              {block.category === "dashboard" && "DB"}
              {block.category === "marketing" && "MK"}
              {block.category === "e-commerce" && "EC"}
              {block.category === "forms" && "FM"}
              {block.category === "ai" && "AI"}
            </div>
          </div>
        )}

        {/* Badges overlay */}
        <div className="absolute left-2 top-2 flex gap-1.5">
          {block.isNew && (
            <Badge variant="secondary" className="bg-blue-500/90 text-white">
              <Sparkles className="mr-1 h-3 w-3" />
              New
            </Badge>
          )}
          {block.isComingSoon && (
            <Badge variant="secondary" className="bg-gray-500/90 text-white">
              <Clock className="mr-1 h-3 w-3" />
              Soon
            </Badge>
          )}
        </div>

        {/* Tier badge */}
        <div className="absolute right-2 top-2">
          <Badge className={cn("gap-1", tier.className)}>
            {block.tier !== "free" && <Lock className="h-3 w-3" />}
            {tier.label}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="font-semibold leading-none tracking-tight">
          {block.name}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {block.description}
        </p>
      </div>

      {/* Featured indicator */}
      {block.isFeatured && (
        <div className="absolute -right-8 top-6 rotate-45 bg-amber-500 px-8 py-0.5 text-xs font-medium text-white">
          Featured
        </div>
      )}
    </Link>
  )
}
