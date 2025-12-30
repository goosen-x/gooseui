"use client"

import * as React from "react"
import { Check, Copy, ExternalLink, MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  children: string
  className?: string
}

const AI_SERVICES = [
  {
    name: "ChatGPT",
    icon: () => (
      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
      </svg>
    ),
    getUrl: (code: string) =>
      `https://chatgpt.com/?q=${encodeURIComponent(`Explain this code:\n\n${code}`)}`,
  },
  {
    name: "Claude",
    icon: () => (
      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.709 15.955l4.72-2.647.08-.08v-.08H4.79l-.08.08v2.647l-.08.08h.08zm8.837-4.893l-4.16 2.327-.08.08v4.653l.08.08h.08l4.08-2.247.08-.08v-4.733l-.08-.08h-.08zm5.517-.08l-.08.08v4.733l.08.08 4.16 2.247h.08l.08-.08v-4.653l-.08-.08-4.24-2.327zm-1.357-.76l4.24-2.407.08-.08V3.082l-.08-.08h-.08l-4.16 2.327-.08.08v4.733l.08.08zm-8.277 0l.08-.08V5.41l-.08-.08-4.16-2.327h-.08l-.08.08v4.653l.08.08 4.24 2.407zm4.879-2.407l-4.32-2.407-.08-.08H9.83l-.08.08v4.733l.08.08 4.16 2.327.08-.08V7.895l.08-.08h-.08z" />
      </svg>
    ),
    getUrl: (code: string) =>
      `https://claude.ai/new?q=${encodeURIComponent(`Explain this code:\n\n${code}`)}`,
  },
  {
    name: "Perplexity",
    icon: () => (
      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4a9.6 9.6 0 110 19.2 9.6 9.6 0 010-19.2zm0 3.6a6 6 0 100 12 6 6 0 000-12zm0 2.4a3.6 3.6 0 110 7.2 3.6 3.6 0 010-7.2z" />
      </svg>
    ),
    getUrl: (code: string) =>
      `https://www.perplexity.ai/search?q=${encodeURIComponent(`Explain this code:\n\n${code}`)}`,
  },
  {
    name: "T3 Chat",
    icon: () => (
      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fontSize="10"
          fill="currentColor"
        >
          T3
        </text>
      </svg>
    ),
    getUrl: (code: string) =>
      `https://t3.chat/new?q=${encodeURIComponent(`Explain this code:\n\n${code}`)}`,
    highlight: true,
  },
]

export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("group relative", className)}>
      <pre className="overflow-x-auto rounded-lg bg-muted p-4">
        <code className="text-sm">{children}</code>
      </pre>

      <div className="absolute right-2 top-2 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={copyToClipboard}
          className="flex size-8 items-center justify-center rounded-md bg-background/80 backdrop-blur-sm transition-colors hover:bg-accent"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="size-4 text-green-500" />
          ) : (
            <Copy className="size-4" />
          )}
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex size-8 items-center justify-center rounded-md bg-background/80 backdrop-blur-sm transition-colors hover:bg-accent"
              aria-label="More options"
            >
              <MoreVertical className="size-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {AI_SERVICES.map((service) => (
              <DropdownMenuItem
                key={service.name}
                asChild
                className={cn(
                  "cursor-pointer",
                  service.highlight && "text-orange-500"
                )}
              >
                <a
                  href={service.getUrl(children)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <service.icon />
                    Open in {service.name}
                  </span>
                  <ExternalLink className="size-3 opacity-50" />
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
