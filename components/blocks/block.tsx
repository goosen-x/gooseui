"use client"

import {
  Check,
  Code,
  Copy,
  ExternalLink,
  Eye,
  Link as LinkIcon,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react"
import Link from "next/link"
import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { BlockMetadata } from "@/lib/blocks"
import { getBlockComponent } from "@/lib/blocks"
import { cn } from "@/lib/utils"

type ViewSize = "100%" | "60%" | "30%"

interface BlockProps {
  block: BlockMetadata
  code: string
  hasComponent?: boolean
  className?: string
}

export function Block({ block, code, hasComponent, className }: BlockProps) {
  const [view, setView] = React.useState<"preview" | "code">("preview")
  const [size, setSize] = React.useState<ViewSize>("100%")
  const [copied, setCopied] = React.useState(false)
  const BlockComponent = hasComponent ? getBlockComponent(block.id) : null

  const copyCode = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${block.id}`
    await navigator.clipboard.writeText(url)
  }

  return (
    <section
      id={block.id}
      className={cn("scroll-mt-20 space-y-4", className)}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold tracking-tight">{block.name}</h2>
          {block.isNew && (
            <Badge variant="secondary" className="bg-blue-500/10 text-blue-600">
              New
            </Badge>
          )}
          {block.isComingSoon && (
            <Badge variant="secondary" className="bg-muted">
              Coming Soon
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 cursor-pointer"
            onClick={copyLink}
            title="Copy link"
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 cursor-pointer"
            asChild
          >
            <Link
              href={`/blocks/preview/${block.id}`}
              target="_blank"
              title="Open in new tab"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground">{block.description}</p>

      {/* Tabs */}
      <Tabs value={view} onValueChange={(v) => setView(v as "preview" | "code")}>
        <div className="flex items-center justify-between gap-4 border-b pb-3">
          <TabsList className="h-9">
            <TabsTrigger value="preview" className="gap-1.5 cursor-pointer">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="gap-1.5 cursor-pointer">
              <Code className="h-4 w-4" />
              Code
            </TabsTrigger>
          </TabsList>

          {/* Size toggle (only in preview mode) */}
          {view === "preview" && (
            <ToggleGroup
              type="single"
              value={size}
              onValueChange={(v) => v && setSize(v as ViewSize)}
              className="hidden sm:flex"
            >
              <ToggleGroupItem
                value="100%"
                size="sm"
                aria-label="Desktop"
                className="cursor-pointer"
              >
                <Monitor className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="60%"
                size="sm"
                aria-label="Tablet"
                className="cursor-pointer"
              >
                <Tablet className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="30%"
                size="sm"
                aria-label="Mobile"
                className="cursor-pointer"
              >
                <Smartphone className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          )}

          {/* Copy button (only in code mode) */}
          {view === "code" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={copyCode}
              className="gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-500" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          )}
        </div>

        {/* Preview */}
        <TabsContent value="preview" className="mt-4">
          <div
            className="mx-auto overflow-hidden rounded-lg border bg-background transition-all duration-300"
            style={{ width: size }}
          >
            {BlockComponent ? (
              <div
                className="w-full overflow-hidden"
                style={{ minHeight: block.iframeHeight || 200 }}
              >
                <BlockComponent />
              </div>
            ) : (
              <div
                className="flex items-center justify-center bg-muted/50"
                style={{ minHeight: block.iframeHeight || 200 }}
              >
                <p className="text-muted-foreground">Preview not available</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Code */}
        <TabsContent value="code" className="mt-4">
          {code ? (
            <CodeBlock className="max-h-[500px]">{code}</CodeBlock>
          ) : (
            <div className="flex items-center justify-center rounded-lg border bg-muted/50 p-8">
              <p className="text-muted-foreground">Code not available</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  )
}
