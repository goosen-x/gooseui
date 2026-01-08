"use client"

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  MoonIcon,
  PaletteIcon,
  SunIcon,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { usePostHog } from "posthog-js/react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { getPrevNextNavigation } from "@/lib/config/docs-navigation"
import { getRegistryUrl } from "@/lib/config/registry"
import { cn } from "@/lib/utils"

const themeColors = [
  { name: "zinc", class: "bg-zinc-500" },
  { name: "red", class: "bg-red-500" },
  { name: "orange", class: "bg-orange-500" },
  { name: "green", class: "bg-green-500" },
  { name: "blue", class: "bg-blue-500" },
  { name: "violet", class: "bg-violet-500" },
  { name: "pink", class: "bg-pink-500" },
]

// Custom icons
function MarkdownIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M22.27 19.385H1.73A1.73 1.73 0 010 17.655V6.345a1.73 1.73 0 011.73-1.73h20.54A1.73 1.73 0 0124 6.345v11.308a1.73 1.73 0 01-1.73 1.731zM5.769 15.923v-4.5l2.308 2.885 2.307-2.885v4.5h2.308V8.078h-2.308l-2.307 2.885-2.308-2.885H3.46v7.847zM21.232 12h-2.309V8.077h-2.307V12h-2.308l3.461 4.039z" />
    </svg>
  )
}

function V0Icon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M14.066 6.028v2.22h5.729q.075-.001.148.005l-5.853 5.752a2 2 0 0 1-.024-.309V8.247h-2.353v5.45c0 2.322 1.935 4.222 4.258 4.222h5.675v-2.22h-5.675q-.03 0-.059-.003l5.729-5.629q.006.082.006.166v5.465H24v-5.465a4.204 4.204 0 0 0-4.205-4.205zM0 8.245l8.28 9.266c.839.94 2.396.346 2.396-.914V8.245H8.19v5.44l-4.86-5.44Z" />
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
        d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"
        fill="currentColor"
      />
    </svg>
  )
}

function T3ChatIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 258 199"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M165.735 25.0701L188.947 0.972412H0.465994V25.0701H165.735Z"
        fill="currentColor"
      />
      <path
        d="M163.981 96.3239L254.022 3.68314L221.206 3.68295L145.617 80.7609L163.981 96.3239Z"
        fill="currentColor"
      />
      <path
        d="M233.658 131.418C233.658 155.075 214.48 174.254 190.823 174.254C171.715 174.254 155.513 161.738 150 144.439L146.625 133.848L127.329 153.143L129.092 157.336C139.215 181.421 163.034 198.354 190.823 198.354C227.791 198.354 257.759 168.386 257.759 131.418C257.759 106.937 244.399 85.7396 224.956 74.0905L220.395 71.3582L202.727 89.2528L210.788 93.5083C224.403 100.696 233.658 114.981 233.658 131.418Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M88.2625 192.669L88.2626 45.6459H64.1648L64.1648 192.669H88.2625Z"
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
  /** Manual override for previous link (auto-derived if not provided) */
  prevHref?: string
  /** Manual override for next link (auto-derived if not provided) */
  nextHref?: string
  // Component info for actions
  componentSlug?: string // e.g., "button", "card"
  registryUrl?: string // e.g., "https://gooseui.pro/r/button.json"
  sourceUrl?: string // GitHub raw URL for markdown
  className?: string
}

export function DocsPageNav({
  title,
  prevHref: prevHrefProp,
  nextHref: nextHrefProp,
  componentSlug,
  registryUrl: registryUrlProp,
  sourceUrl,
  className,
}: DocsPageNavProps) {
  const pathname = usePathname()
  const posthog = usePostHog()
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const [copiedAction, setCopiedAction] = React.useState<string | null>(null)
  const [activeColor, setActiveColor] = React.useState("zinc")

  // Auto-derive prev/next from navigation config
  const { prev, next } = React.useMemo(
    () => getPrevNextNavigation(pathname),
    [pathname],
  )
  const prevHref = prevHrefProp ?? prev?.href
  const nextHref = nextHrefProp ?? next?.href

  React.useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("theme-color")
    if (saved) setActiveColor(saved)
  }, [])

  const handleColorChange = (colorName: string) => {
    setActiveColor(colorName)
    localStorage.setItem("theme-color", colorName)
    document.documentElement.setAttribute("data-theme-color", colorName)
  }

  // Auto-derive registryUrl from pathname if not provided
  // e.g., /docs/components/button -> button -> https://gooseui.pro/r/button.json
  const registryUrl = React.useMemo(() => {
    if (registryUrlProp) return registryUrlProp

    // Extract slug from pathname
    const segments = pathname.split("/").filter(Boolean)
    const slug = segments[segments.length - 1]

    if (
      slug &&
      slug !== "docs" &&
      slug !== "components" &&
      slug !== "effects"
    ) {
      return getRegistryUrl(slug)
    }

    return undefined
  }, [registryUrlProp, pathname])

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
      posthog.capture("page_copied", {
        page: pathname,
        component: componentSlug || title,
      })
      setTimeout(() => setCopied(false), 2000)
    }
  }, [getPageContent, posthog, pathname, componentSlug, title])

  // View as Markdown - opens GitHub raw or generates markdown
  const handleViewMarkdown = React.useCallback(() => {
    posthog.capture("open_in_tool", {
      tool: "markdown",
      page: pathname,
      component: componentSlug || title,
    })
    if (sourceUrl) {
      window.open(sourceUrl, "_blank")
    } else {
      // Generate and show markdown in new tab
      const content = generateCodeForAI()
      const blob = new Blob([content], { type: "text/markdown" })
      const url = URL.createObjectURL(blob)
      window.open(url, "_blank")
    }
  }, [sourceUrl, generateCodeForAI, posthog, pathname, componentSlug, title])

  // Open in v0 - uses official v0 API
  // Docs: https://ui.shadcn.com/docs/registry/open-in-v0
  const handleOpenInV0 = React.useCallback(() => {
    posthog.capture("open_in_tool", {
      tool: "v0",
      page: pathname,
      component: componentSlug || title,
    })
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
  }, [registryUrl, generateCodeForAI, posthog, pathname, componentSlug, title])

  // Open in ChatGPT - pass content via URL parameter
  const handleOpenInChatGPT = React.useCallback(async () => {
    posthog.capture("open_in_tool", {
      tool: "chatgpt",
      page: pathname,
      component: componentSlug || title,
    })
    const content = generateCodeForAI()
    const encodedContent = encodeURIComponent(content)

    // URL length limit is ~2000 chars, use URL param if content fits
    if (encodedContent.length < 1800) {
      window.open(`https://chat.openai.com/?q=${encodedContent}`, "_blank")
    } else {
      // Fallback to clipboard for long content
      await copyToClipboard(content)
      setCopiedAction("chatgpt")
      setTimeout(() => setCopiedAction(null), 3000)
      window.open("https://chat.openai.com/", "_blank")
    }
  }, [generateCodeForAI, posthog, pathname, componentSlug, title])

  // Open in Claude - pass content via URL parameter
  const handleOpenInClaude = React.useCallback(async () => {
    posthog.capture("open_in_tool", {
      tool: "claude",
      page: pathname,
      component: componentSlug || title,
    })
    const content = generateCodeForAI()
    const encodedContent = encodeURIComponent(content)

    // URL length limit is ~2000 chars, use URL param if content fits
    if (encodedContent.length < 1800) {
      window.open(`https://claude.ai/new?q=${encodedContent}`, "_blank")
    } else {
      // Fallback to clipboard for long content
      await copyToClipboard(content)
      setCopiedAction("claude")
      setTimeout(() => setCopiedAction(null), 3000)
      window.open("https://claude.ai/new", "_blank")
    }
  }, [generateCodeForAI, posthog, pathname, componentSlug, title])

  // Open in T3 Chat - pass content via URL parameter
  const handleOpenInT3Chat = React.useCallback(async () => {
    posthog.capture("open_in_tool", {
      tool: "t3chat",
      page: pathname,
      component: componentSlug || title,
    })
    const content = generateCodeForAI()
    const encodedContent = encodeURIComponent(content)

    // URL length limit is ~2000 chars, use URL param if content fits
    if (encodedContent.length < 1800) {
      window.open(`https://t3.chat/new?q=${encodedContent}`, "_blank")
    } else {
      // Fallback to clipboard for long content
      await copyToClipboard(content)
      setCopiedAction("t3chat")
      setTimeout(() => setCopiedAction(null), 3000)
      window.open("https://t3.chat/new", "_blank")
    }
  }, [generateCodeForAI, posthog, pathname, componentSlug, title])

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
    {
      icon: T3ChatIcon,
      label:
        copiedAction === "t3chat"
          ? "Copied! Opening T3 Chat..."
          : "Open in T3 Chat",
      onClick: handleOpenInT3Chat,
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
          "sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none",
        )}
      >
        {/* Copy Page Button Group */}
        <div className="bg-secondary group/buttons relative flex rounded-lg *:data-[slot=button]:focus-visible:relative *:data-[slot=button]:focus-visible:z-10">
          <Button
            variant="secondary"
            size="sm"
            className="rounded-md shadow-none h-8 md:h-7 md:text-[0.8rem]"
            onClick={handleCopyPage}
          >
            <span className="relative overflow-hidden h-4 inline-flex items-center">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 transition-transform duration-300 ease-in-out",
                  copied && "-translate-y-full",
                )}
              >
                <CopyIcon className="size-4" />
                <span>Copy Page</span>
              </span>
              <span
                className={cn(
                  "absolute top-full left-0 inline-flex items-center gap-1.5 transition-transform duration-300 ease-in-out",
                  copied && "-translate-y-[calc(100%-2px)]",
                )}
              >
                <CheckIcon className="size-4" />
                <span>Copied!</span>
              </span>
            </span>
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
              "sm:right-7 sm:!h-7",
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
            <DropdownMenuContent align="center" side="top" className="w-52">
              {menuItems.map((item) => (
                <DropdownMenuItem key={item.label} onClick={item.onClick}>
                  <item.icon className="size-4" />
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Theme Toggle - Mobile only */}
        {mounted && (
          <Button
            variant="secondary"
            size="icon"
            className="ml-auto size-8 rounded-md shadow-none sm:hidden"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            {resolvedTheme === "dark" ? (
              <SunIcon className="size-4" />
            ) : (
              <MoonIcon className="size-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        )}

        {/* Color Picker - Mobile only */}
        {mounted && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="size-8 rounded-md shadow-none sm:hidden"
              >
                <PaletteIcon className="size-4" />
                <span className="sr-only">Change color</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              align="center"
              className="min-w-0 p-2"
            >
              <div className="flex flex-col gap-2">
                {themeColors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => handleColorChange(c.name)}
                    className={cn(
                      "relative size-6 cursor-pointer rounded-full transition-transform hover:scale-110",
                      c.class,
                      activeColor === c.name &&
                        "ring-2 ring-ring ring-offset-2 ring-offset-background",
                    )}
                  >
                    {activeColor === c.name && (
                      <CheckIcon className="absolute inset-0 m-auto size-3 text-white dark:text-black" />
                    )}
                    <span className="sr-only">{c.name}</span>
                  </button>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Navigation Buttons */}
        {prevHref && (
          <Button
            variant="secondary"
            size="icon"
            className={cn(
              "size-8 rounded-md shadow-none md:size-7",
              !mounted && "ml-auto",
              mounted && "sm:ml-auto",
            )}
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
              !prevHref && !mounted && "ml-auto",
              !prevHref && mounted && "sm:ml-auto",
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
