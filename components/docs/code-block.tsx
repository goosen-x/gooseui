"use client"

import * as React from "react"
import { highlight } from "sugar-high"
import { AnimatedCopyButton } from "./animated-copy-button"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  children: string
  className?: string
  enableHighlight?: boolean
}

export function CodeBlock({
  children,
  className,
  enableHighlight = true,
}: CodeBlockProps) {
  const html = enableHighlight ? highlight(children) : null

  return (
    <div className={cn("relative", className)}>
      <pre className="overflow-x-auto rounded-lg border bg-muted/30 p-4 max-h-[25rem]">
        {enableHighlight ? (
          <code
            className="text-sm font-mono leading-relaxed"
            dangerouslySetInnerHTML={{ __html: html! }}
          />
        ) : (
          <code className="text-sm font-mono leading-relaxed">{children}</code>
        )}
      </pre>

      <AnimatedCopyButton
        text={children}
        className="absolute right-2 top-2 z-10"
      />
    </div>
  )
}
