"use client"

import { Check, Clock, Code, Copy, Eye, Sparkles } from "lucide-react"
import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { BlockItem } from "@/lib/config/blocks-registry"
import { cn } from "@/lib/utils"

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
  const [copied, setCopied] = React.useState(false)

  const copyToClipboard = async () => {
    if (block.sourceCode) {
      await navigator.clipboard.writeText(block.sourceCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

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
        {block.isFeatured && (
          <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400">
            Featured
          </Badge>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="preview" className="w-full">
        <div className="flex items-center justify-between border-b px-4">
          <TabsList className="h-10 bg-transparent p-0">
            <TabsTrigger
              value="preview"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none gap-1.5 rounded-none border-b-2 border-transparent px-3 pb-3 pt-2 data-[state=active]:border-foreground cursor-pointer"
            >
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none gap-1.5 rounded-none border-b-2 border-transparent px-3 pb-3 pt-2 data-[state=active]:border-foreground cursor-pointer"
              disabled={!block.sourceCode}
            >
              <Code className="h-4 w-4" />
              Code
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
                <p>Coming Soon</p>
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
              <code className="text-sm">
                {block.sourceCode || "// Source code not available"}
              </code>
            </pre>
            {block.sourceCode && (
              <button
                onClick={copyToClipboard}
                className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-md bg-background/80 backdrop-blur-sm transition-colors hover:bg-accent cursor-pointer"
                aria-label="Copy code"
              >
                {copied ? (
                  <Check className="size-4 text-green-500" />
                ) : (
                  <Copy className="size-4" />
                )}
              </button>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Description */}
      <div className="border-t px-4 py-3">
        <p className="text-sm text-muted-foreground">{block.description}</p>
      </div>
    </div>
  )
}
