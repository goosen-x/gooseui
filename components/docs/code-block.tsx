"use client"

import * as React from "react"
import { highlight } from "sugar-high"
import { cn } from "@/lib/utils"
import { AnimatedCopyButton } from "./animated-copy-button"

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
  const preRef = React.useRef<HTMLPreElement>(null)
  const [showFade, setShowFade] = React.useState(false)

  React.useEffect(() => {
    const pre = preRef.current
    if (!pre) return

    const checkOverflow = () => {
      const isOverflowing = pre.scrollHeight > pre.clientHeight
      const isNotAtBottom = pre.scrollHeight - pre.scrollTop - pre.clientHeight > 10
      setShowFade(isOverflowing && isNotAtBottom)
    }

    checkOverflow()
    pre.addEventListener("scroll", checkOverflow)
    window.addEventListener("resize", checkOverflow)

    return () => {
      pre.removeEventListener("scroll", checkOverflow)
      window.removeEventListener("resize", checkOverflow)
    }
  }, [children])

  return (
    <div className={cn("relative", className)}>
      <pre
        ref={preRef}
        className="overflow-auto rounded-lg border bg-muted/30 p-4 pt-10 md:pt-4 max-h-[25rem]"
      >
        {enableHighlight ? (
          <code
            className="text-sm font-mono leading-relaxed"
            dangerouslySetInnerHTML={{ __html: html! }}
          />
        ) : (
          <code className="text-sm font-mono leading-relaxed">{children}</code>
        )}
      </pre>

      {/* Fade overlay when content overflows */}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-16 rounded-b-lg bg-gradient-to-t from-muted/80 to-transparent transition-opacity duration-200",
          showFade ? "opacity-100" : "opacity-0"
        )}
      />

      <AnimatedCopyButton
        text={children}
        className="absolute right-2 top-2 z-10"
      />
    </div>
  )
}
