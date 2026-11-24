"use client"

import {
  ChevronDown,
  Monitor,
  RotateCcw,
  Smartphone,
  Tablet,
} from "lucide-react"
import { useLocale } from "next-intl"
import { useCopyToast } from "@/hooks/use-copy-toast"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { useCopyToClipboard } from "@/registry/gooseui/hooks/use-copy-to-clipboard"
import { Button } from "@/registry/gooseui/ui/button"
import { CopyButton } from "@/registry/gooseui/ui/copy-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/gooseui/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/registry/gooseui/ui/tabs"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/gooseui/ui/toggle-group"

const en = {
  desktop: "Desktop",
  tablet: "Tablet",
  mobile: "Mobile",
  preview: "Preview",
  code: "Code",
  select: "Select",
  openV0: "Open in v0",
  copyClaude: "Copy to Claude",
  copyChatGPT: "Copy to ChatGPT",
  copyCode: "Copy code",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    desktop: "Десктоп",
    tablet: "Планшет",
    mobile: "Мобильный",
    preview: "Превью",
    code: "Код",
    select: "Выбрать",
    openV0: "Открыть в v0",
    copyClaude: "Копировать для Claude",
    copyChatGPT: "Копировать для ChatGPT",
    copyCode: "Копировать код",
  },
}

export type ViewportSize = "desktop" | "tablet" | "mobile"
export type PreviewTab = "preview" | "code"

interface BlockPreviewToolbarProps {
  viewport: ViewportSize
  onViewportChange: (viewport: ViewportSize) => void
  activeTab: PreviewTab
  onTabChange: (tab: PreviewTab) => void
  onRefresh?: () => void
  sourceCode?: string
  installCommand?: string
  className?: string
}

export function BlockPreviewToolbar({
  viewport,
  onViewportChange,
  activeTab,
  onTabChange,
  onRefresh,
  sourceCode,
  installCommand,
  className,
}: BlockPreviewToolbarProps) {
  const t = content[useLocale() as Locale]
  const copyToast = useCopyToast()
  const toast = copyToast()
  const { copy } = useCopyToClipboard({
    onCopy: toast.onCopy,
    onError: toast.onCopyError,
  })

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-t-lg border border-b-0 bg-muted/50 px-4 py-2",
        className,
      )}
    >
      {/* Left: Install command */}
      {installCommand && (
        <div className="flex items-center gap-2 rounded-md bg-background py-1 pr-1.5 pl-3 font-mono text-sm">
          <span className="text-muted-foreground">$</span>
          <span className="max-w-[200px] truncate">{installCommand}</span>
          <CopyButton
            variant="inline"
            value={installCommand}
            {...copyToast()}
          />
        </div>
      )}

      {/* Center: Viewport + Tabs */}
      <div className="flex items-center gap-2">
        {/* Viewport switcher */}
        <ToggleGroup
          type="single"
          value={viewport}
          onValueChange={(v) => v && onViewportChange(v as ViewportSize)}
          className="bg-background rounded-md border"
        >
          <ToggleGroupItem value="desktop" size="sm" aria-label={t.desktop}>
            <Monitor className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="tablet" size="sm" aria-label={t.tablet}>
            <Tablet className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="mobile" size="sm" aria-label={t.mobile}>
            <Smartphone className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>

        {/* Refresh button */}
        {onRefresh && (
          <Button variant="ghost" size="icon" onClick={onRefresh}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        )}

        {/* Divider */}
        <div className="h-6 w-px bg-border" />

        {/* Preview/Code tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => onTabChange(v as PreviewTab)}
        >
          <TabsList className="h-8">
            <TabsTrigger value="preview" className="text-xs">
              {t.preview}
            </TabsTrigger>
            <TabsTrigger value="code" className="text-xs">
              {t.code}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Right: Actions dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            {t.select}
            <ChevronDown className="ml-1 h-3.5 w-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>{t.openV0}</DropdownMenuItem>
          <DropdownMenuItem>{t.copyClaude}</DropdownMenuItem>
          <DropdownMenuItem>{t.copyChatGPT}</DropdownMenuItem>
          <DropdownMenuItem
            disabled={!sourceCode}
            onClick={() => sourceCode && copy(sourceCode)}
          >
            {t.copyCode}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
