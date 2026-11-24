"use client"

import { Clock, Code, Eye, Sparkles } from "lucide-react"
import { useLocale } from "next-intl"
import type * as React from "react"
import { useCopyToast } from "@/hooks/use-copy-toast"
import { type Dict, pick } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import type { BlockItem } from "@/lib/config/blocks-registry"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/gooseui/ui/badge"
import { CopyButton } from "@/registry/gooseui/ui/copy-button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/gooseui/ui/tabs"

const en = {
  new: "New",
  soon: "Soon",
  comingSoon: "Coming Soon",
  featured: "Featured",
  preview: "Preview",
  code: "Code",
  noSource: "// Source code not available",
  copyCode: "Copy code",
  codeCopied: "Code copied",
  copied: "Copied",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    new: "Новое",
    soon: "Скоро",
    comingSoon: "Скоро",
    featured: "Рекомендуем",
    preview: "Превью",
    code: "Код",
    noSource: "// Исходный код недоступен",
    copyCode: "Копировать код",
    codeCopied: "Код скопирован",
    copied: "Скопировано",
  },
}

interface BlockCardPreviewProps {
  block: BlockItem
  preview?: React.ReactNode
  className?: string
}

export function BlockCardPreview({
  block,
  preview,
  className,
}: BlockCardPreviewProps) {
  const locale = useLocale()
  const t = content[locale as Locale]
  const copyToast = useCopyToast()

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-card",
        block.isComingSoon && "opacity-60",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold leading-none tracking-tight">
            {block.name}
          </h3>
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
        {block.isFeatured && (
          <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400">
            {t.featured}
          </Badge>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="preview" className="w-full">
        <div className="flex items-center justify-between border-b px-4">
          <TabsList variant="underline" className="border-b-0">
            <TabsTrigger value="preview" className="gap-1.5">
              <Eye className="h-4 w-4" />
              {t.preview}
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="gap-1.5"
              disabled={!block.sourceCode}
            >
              <Code className="h-4 w-4" />
              {t.code}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="preview" className="mt-0">
          <div className="flex min-h-[12.5rem] items-center justify-center bg-muted/30 p-6">
            {preview ? (
              preview
            ) : block.isComingSoon ? (
              <div className="text-center text-muted-foreground">
                <Clock className="mx-auto mb-2 h-8 w-8" />
                <p>{t.comingSoon}</p>
              </div>
            ) : (
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
            )}
          </div>
        </TabsContent>

        <TabsContent value="code" className="mt-0">
          <div className="relative">
            <pre className="max-h-[18.75rem] overflow-auto bg-muted p-4">
              <code className="text-sm">{block.sourceCode || t.noSource}</code>
            </pre>
            {block.sourceCode && (
              <CopyButton
                size="sm"
                value={block.sourceCode}
                {...copyToast(t.codeCopied)}
                labels={{ copy: t.copyCode, copied: t.copied }}
                className="absolute right-2 top-2 bg-background/80 backdrop-blur-sm"
              />
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Description */}
      <div className="border-t px-4 py-3">
        <p className="text-sm text-muted-foreground">
          {pick(block.description, locale)}
        </p>
      </div>
    </div>
  )
}
