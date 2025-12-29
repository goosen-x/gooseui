"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

// Custom icons
function MarkdownIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 15V9l2 3 2-3v6" />
      <path d="M17 9v6l-2-2" />
    </svg>
  )
}

function V0Icon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5765 16.0805H36.0006V19.7762H26.5765C22.7164 19.7762 19.5765 16.6426 19.5765 12.7848V3.68923H23.4999V12.6479L32.8398 3.4609C32.756 3.4268 32.6398 3.39552 32.5765 3.39552H23.3919V0Z"
        fill="currentColor"
      />
      <path
        d="M13.7688 19.9999L0 0L4.53479 0L13.6391 13.2145L22.7434 0H27.2782L13.7688 19.9999Z"
        fill="currentColor"
      />
    </svg>
  )
}

function ChatGPTIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"
        fill="currentColor"
      />
    </svg>
  )
}

function ClaudeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16.734 2.037a.644.644 0 0 0-.631.521L13.09 16.631a.644.644 0 0 0 .631.767h2.207a.644.644 0 0 0 .631-.521l3.013-14.073a.644.644 0 0 0-.631-.767zM8.472 2.037a.644.644 0 0 0-.631.521L4.828 16.631a.644.644 0 0 0 .631.767h2.207a.644.644 0 0 0 .631-.521l1.38-6.448 2.89 6.687a.644.644 0 0 0 .591.39h2.404a.644.644 0 0 0 .591-.91l-3.62-8.116 2.34-5.694a.644.644 0 0 0-.595-.849H11.96a.644.644 0 0 0-.608.429L9.683 6.824 8.472 2.037z"
        fill="currentColor"
      />
    </svg>
  )
}

// Copy to clipboard utility
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement("textarea")
    textArea.value = text
    textArea.style.position = "fixed"
    textArea.style.left = "-999999px"
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand("copy")
      return true
    } catch {
      return false
    } finally {
      document.body.removeChild(textArea)
    }
  }
}

interface DocsPageNavProps {
  title?: string
  prevHref?: string
  nextHref?: string
  // Component info for actions
  componentSlug?: string // e.g., "button", "card"
  registryUrl?: string // e.g., "https://gooseui.pro/r/button.json"
  sourceUrl?: string // GitHub raw URL for markdown
  className?: string
}

export function DocsPageNav({
  title,
  prevHref,
  nextHref,
  componentSlug,
  registryUrl,
  sourceUrl,
  className,
}: DocsPageNavProps) {
  const pathname = usePathname()
  const [copied, setCopied] = React.useState(false)
  const [copiedAction, setCopiedAction] = React.useState<string | null>(null)

  // Get page content for copying
  const getPageContent = React.useCallback(() => {
    // Get main content area
    const main = document.querySelector("main")
    if (!main) return ""

    // Clone to avoid modifying the DOM
    const clone = main.cloneNode(true) as HTMLElement

    // Remove navigation elements
    clone.querySelectorAll(".docs-nav, nav, .toc").forEach((el) => el.remove())

    // Get text content with basic formatting
    const content = clone.innerText || clone.textContent || ""
    return content.trim()
  }, [])

  // Generate code block for AI
  const generateCodeForAI = React.useCallback(() => {
    const pageContent = getPageContent()
    const componentName = title || componentSlug || "Component"

    return `# ${componentName}

${pageContent}

---
Source: https://gooseui.pro${pathname}
${registryUrl ? `Registry: ${registryUrl}` : ""}
`
  }, [getPageContent, title, componentSlug, pathname, registryUrl])

  // Copy Page handler
  const handleCopyPage = React.useCallback(async () => {
    const content = getPageContent()
    const success = await copyToClipboard(content)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [getPageContent])

  // View as Markdown - opens GitHub raw or generates markdown
  const handleViewMarkdown = React.useCallback(() => {
    if (sourceUrl) {
      window.open(sourceUrl, "_blank")
    } else {
      // Generate and show markdown in new tab
      const content = generateCodeForAI()
      const blob = new Blob([content], { type: "text/markdown" })
      const url = URL.createObjectURL(blob)
      window.open(url, "_blank")
    }
  }, [sourceUrl, generateCodeForAI])

  // Open in v0 - uses official v0 API
  // Docs: https://ui.shadcn.com/docs/registry/open-in-v0
  const handleOpenInV0 = React.useCallback(() => {
    if (registryUrl) {
      const v0Url = `https://v0.dev/chat/api/open?url=${encodeURIComponent(registryUrl)}`
      window.open(v0Url, "_blank")
    } else {
      // Fallback: copy code and open v0
      const content = generateCodeForAI()
      copyToClipboard(content).then(() => {
        setCopiedAction("v0")
        setTimeout(() => setCopiedAction(null), 3000)
        window.open("https://v0.dev/chat", "_blank")
      })
    }
  }, [registryUrl, generateCodeForAI])

  // Open in ChatGPT - copy code first, then open
  const handleOpenInChatGPT = React.useCallback(async () => {
    const content = generateCodeForAI()
    await copyToClipboard(content)
    setCopiedAction("chatgpt")
    setTimeout(() => setCopiedAction(null), 3000)
    window.open("https://chat.openai.com/", "_blank")
  }, [generateCodeForAI])

  // Open in Claude - copy code first, then open
  const handleOpenInClaude = React.useCallback(async () => {
    const content = generateCodeForAI()
    await copyToClipboard(content)
    setCopiedAction("claude")
    setTimeout(() => setCopiedAction(null), 3000)
    window.open("https://claude.ai/new", "_blank")
  }, [generateCodeForAI])

  // Menu items configuration
  const menuItems = [
    {
      icon: MarkdownIcon,
      label: "View as Markdown",
      onClick: handleViewMarkdown,
    },
    {
      icon: V0Icon,
      label: copiedAction === "v0" ? "Copied! Opening v0..." : "Open in v0",
      onClick: handleOpenInV0,
    },
    {
      icon: ChatGPTIcon,
      label:
        copiedAction === "chatgpt"
          ? "Copied! Opening ChatGPT..."
          : "Open in ChatGPT",
      onClick: handleOpenInChatGPT,
    },
    {
      icon: ClaudeIcon,
      label:
        copiedAction === "claude"
          ? "Copied! Opening Claude..."
          : "Open in Claude",
      onClick: handleOpenInClaude,
    },
  ]

  return (
    <div className={cn("flex items-start justify-between", className)}>
      {title && (
        <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
          {title}
        </h1>
      )}

      <div
        className={cn(
          "docs-nav",
          "bg-background/80 border-border/50",
          "fixed inset-x-0 bottom-0 isolate z-50",
          "flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm",
          "sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none"
        )}
      >
        {/* Copy Page Button Group */}
        <div className="bg-secondary group/buttons relative flex rounded-lg *:data-[slot=button]:focus-visible:relative *:data-[slot=button]:focus-visible:z-10">
          <Button
            variant="secondary"
            size="sm"
            className="gap-1.5 rounded-md shadow-none h-8 md:h-7 md:text-[0.8rem]"
            onClick={handleCopyPage}
          >
            {copied ? (
              <CheckIcon className="size-4" />
            ) : (
              <CopyIcon className="size-4" />
            )}
            {copied ? "Copied!" : "Copy Page"}
          </Button>

          {/* Desktop Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="peer -ml-0.5 hidden size-8 rounded-md shadow-none sm:flex md:size-7"
              >
                <ChevronDownIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              {menuItems.map((item) => (
                <DropdownMenuItem key={item.label} onClick={item.onClick}>
                  <item.icon className="size-4" />
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Separator between buttons */}
          <Separator
            orientation="vertical"
            className={cn(
              "!bg-foreground/10 absolute top-0 right-8 z-0 !h-8",
              "peer-focus-visible:opacity-0",
              "sm:right-7 sm:!h-7"
            )}
          />

          {/* Mobile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="peer -ml-0.5 flex size-8 rounded-md shadow-none sm:hidden"
              >
                <ChevronDownIcon className="size-4 rotate-180" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="top" className="w-52">
              {menuItems.map((item) => (
                <DropdownMenuItem key={item.label} onClick={item.onClick}>
                  <item.icon className="size-4" />
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Navigation Buttons */}
        {prevHref && (
          <Button
            variant="secondary"
            size="icon"
            className="ml-auto size-8 rounded-md shadow-none md:size-7"
            asChild
          >
            <Link href={prevHref}>
              <ArrowLeftIcon className="size-4" />
              <span className="sr-only">Previous</span>
            </Link>
          </Button>
        )}

        {nextHref && (
          <Button
            variant="secondary"
            size="icon"
            className={cn(
              "size-8 rounded-md shadow-none md:size-7",
              !prevHref && "ml-auto"
            )}
            asChild
          >
            <Link href={nextHref}>
              <span className="sr-only">Next</span>
              <ArrowRightIcon className="size-4" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
