"use client"

import { Clock, Sparkles } from "lucide-react"
import Image from "next/image"
import { useLocale } from "next-intl"
import { type Dict, pick } from "@/i18n/dict"
import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import type { BlockItem } from "@/lib/config/blocks-registry"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/gooseui/ui/badge"

const content: Dict<{ new: string; soon: string; featured: string }> = {
  en: { new: "New", soon: "Soon", featured: "Featured" },
  ru: { new: "Новое", soon: "Скоро", featured: "Рекомендуем" },
}

interface BlockCardProps {
  block: BlockItem
  className?: string
}

export function BlockCard({ block, className }: BlockCardProps) {
  const locale = useLocale()
  const t = content[locale as Locale]
  const href = `/docs/blocks/${block.category}/${block.slug}`

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md cursor-pointer",
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
              {block.category === "authentication" && "AU"}
              {block.category === "headers" && "HD"}
              {block.category === "footers" && "FT"}
              {block.category === "hero" && "HR"}
              {block.category === "data-display" && "DD"}
              {block.category === "feedback" && "FB"}
            </div>
          </div>
        )}

        {/* Badges overlay */}
        <div className="absolute left-2 top-2 flex gap-1.5">
          {block.isNew && (
            <Badge variant="secondary" className="bg-blue-500/90 text-white">
              <Sparkles className="mr-1 h-3 w-3" />
              {t.new}
            </Badge>
          )}
          {block.isComingSoon && (
            <Badge variant="secondary" className="bg-gray-500/90 text-white">
              <Clock className="mr-1 h-3 w-3" />
              {t.soon}
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="font-semibold leading-none tracking-tight">
          {block.name}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {pick(block.description, locale)}
        </p>
      </div>

      {/* Featured indicator */}
      {block.isFeatured && (
        <div className="absolute -right-8 top-6 rotate-45 bg-amber-500 px-8 py-0.5 text-xs font-medium text-white">
          {t.featured}
        </div>
      )}
    </Link>
  )
}
