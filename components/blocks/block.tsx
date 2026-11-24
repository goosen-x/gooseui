"use client"

import {
  Code,
  ExternalLink,
  Eye,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react"
import Link from "next/link"
import { useLocale } from "next-intl"
import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { useCopyToast } from "@/hooks/use-copy-toast"
import { type Dict, pick } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import type { BlockMetadata } from "@/lib/blocks"
import { getBlockComponent } from "@/lib/blocks"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/gooseui/ui/badge"
import { Button } from "@/registry/gooseui/ui/button"
import { CopyButton } from "@/registry/gooseui/ui/copy-button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/gooseui/ui/tabs"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/gooseui/ui/toggle-group"

const en = {
  new: "New",
  copyLink: "Copy link",
  linkCopied: "Link copied",
  codeCopied: "Code copied",
  openNewTab: "Open in new tab",
  preview: "Preview",
  code: "Code",
  desktop: "Desktop",
  tablet: "Tablet",
  mobile: "Mobile",
  copied: "Copied",
  copy: "Copy",
  noPreview: "Preview not available",
  noCode: "Code not available",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    new: "Новое",
    copyLink: "Копировать ссылку",
    linkCopied: "Ссылка скопирована",
    codeCopied: "Код скопирован",
    openNewTab: "Открыть в новой вкладке",
    preview: "Превью",
    code: "Код",
    desktop: "Десктоп",
    tablet: "Планшет",
    mobile: "Мобильный",
    copied: "Скопировано",
    copy: "Копировать",
    noPreview: "Превью недоступно",
    noCode: "Код недоступен",
  },
}

type ViewSize = "100%" | "60%" | "30%"

interface BlockProps {
  block: BlockMetadata
  code: string
  hasComponent?: boolean
  /** Показывать заголовок, бейджи и описание (на странице одного блока скрыты: их даёт H1 страницы) */
  showHeading?: boolean
  className?: string
}

export function Block({
  block,
  code,
  hasComponent,
  showHeading = true,
  className,
}: BlockProps) {
  const locale = useLocale()
  const t = content[locale as Locale]
  const [view, setView] = React.useState<"preview" | "code">("preview")
  const [size, setSize] = React.useState<ViewSize>("100%")
  const copyToast = useCopyToast()
  const BlockComponent = hasComponent ? getBlockComponent(block.id) : null

  const blockUrl = () =>
    `${window.location.origin}${window.location.pathname}#${block.id}`

  return (
    <section id={block.id} className={cn("scroll-mt-20 space-y-4", className)}>
      {/* Header */}
      <div
        className={cn(
          "flex items-center",
          showHeading ? "justify-between" : "justify-end",
        )}
      >
        {showHeading ? (
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold tracking-tight">
              {block.name}
            </h2>
            {block.isNew && (
              <Badge
                variant="secondary"
                className="bg-blue-500/10 text-blue-600"
              >
                {t.new}
              </Badge>
            )}
            {block.isComingSoon && (
              <Badge variant="secondary" className="bg-muted">
                Coming Soon
              </Badge>
            )}
          </div>
        ) : null}
        <div className="flex items-center gap-2">
          <CopyButton
            value={blockUrl}
            {...copyToast(t.linkCopied)}
            labels={{ copy: t.copyLink, copied: t.copied }}
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 cursor-pointer"
            asChild
          >
            <Link
              href={`/blocks/preview/${block.id}`}
              target="_blank"
              title={t.openNewTab}
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Description */}
      {showHeading && (
        <p className="text-sm text-muted-foreground">
          {pick(block.description, locale)}
        </p>
      )}

      {/* Tabs */}
      <Tabs
        value={view}
        onValueChange={(v) => setView(v as "preview" | "code")}
      >
        <div className="flex items-center justify-between gap-4 border-b pb-3">
          <TabsList className="h-9">
            <TabsTrigger value="preview" className="gap-1.5 cursor-pointer">
              <Eye className="h-4 w-4" />
              {t.preview}
            </TabsTrigger>
            <TabsTrigger value="code" className="gap-1.5 cursor-pointer">
              <Code className="h-4 w-4" />
              {t.code}
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
                aria-label={t.desktop}
                className="cursor-pointer"
              >
                <Monitor className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="60%"
                size="sm"
                aria-label={t.tablet}
                className="cursor-pointer"
              >
                <Tablet className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="30%"
                size="sm"
                aria-label={t.mobile}
                className="cursor-pointer"
              >
                <Smartphone className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          )}

          {/* Copy button (only in code mode) */}
          {view === "code" && code && (
            <CopyButton
              variant="label"
              value={code}
              {...copyToast(t.codeCopied)}
              labels={{ copy: t.copy, copied: t.copied }}
            />
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
                <p className="text-muted-foreground">{t.noPreview}</p>
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
              <p className="text-muted-foreground">{t.noCode}</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  )
}
