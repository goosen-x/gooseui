"use client"

import { Check, Copy, File } from "lucide-react"
import * as React from "react"
import { type BundledLanguage, codeToHtml } from "shiki"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: BundledLanguage
  filename?: string
  highlightLines?: number[]
  className?: string
}

export function CodeBlock({
  code,
  language = "typescript",
  filename,
  highlightLines = [],
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)
  const [html, setHtml] = React.useState<string>("")

  React.useEffect(() => {
    const highlight = async () => {
      const highlighted = await codeToHtml(code, {
        lang: language,
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
        transformers: [
          {
            line(node, line) {
              if (highlightLines.includes(line)) {
                this.addClassToHast(node, "highlighted-line")
              }
            },
          },
        ],
      })
      setHtml(highlighted)
    }

    highlight()
  }, [code, language, highlightLines])

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-muted/50",
        className,
      )}
    >
      {filename && (
        <div className="flex items-center gap-2 border-b bg-muted/80 px-4 py-2 text-sm text-muted-foreground">
          <File className="size-4" />
          <span className="font-medium">{filename}</span>
        </div>
      )}

      <div className="relative">
        <div
          className={cn(
            "overflow-x-auto p-4 text-sm",
            "[&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!p-0",
            "[&_code]:!bg-transparent",
            "[&_.highlighted-line]:bg-primary/10 [&_.highlighted-line]:border-l-2 [&_.highlighted-line]:border-primary [&_.highlighted-line]:-ml-4 [&_.highlighted-line]:pl-[14px] [&_.highlighted-line]:pr-4 [&_.highlighted-line]:-mr-4",
          )}
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <button
          onClick={copyToClipboard}
          className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-md bg-background/80 opacity-0 backdrop-blur-sm transition-all hover:bg-accent group-hover:opacity-100"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="size-4 text-green-500" />
          ) : (
            <Copy className="size-4" />
          )}
        </button>
      </div>
    </div>
  )
}
