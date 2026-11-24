import { useLocale } from "next-intl"
import type * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"

const content: Dict<{ title: string }> = {
  en: { title: "Preview" },
  ru: { title: "Превью" },
}

interface DocsPreviewProps {
  /** Optional description shown before preview */
  description?: string
  /** Preview content */
  children: React.ReactNode
}

/**
 * Preview section for documentation pages
 *
 * Usage:
 * ```tsx
 * <DocsPreview description="Click on the card to open the dialog.">
 *   <MyComponent />
 * </DocsPreview>
 * ```
 */
export function DocsPreview({ description, children }: DocsPreviewProps) {
  const t = content[useLocale() as Locale]

  return (
    <div className="space-y-4">
      <h2
        id="preview"
        className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
      >
        {t.title}
      </h2>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      <div className="flex justify-center p-4 bg-muted/30 rounded-lg">
        {children}
      </div>
    </div>
  )
}
