import * as React from "react"

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
  return (
    <div className="space-y-4">
      <h2
        id="preview"
        className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
      >
        Preview
      </h2>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
        {children}
      </div>
    </div>
  )
}
