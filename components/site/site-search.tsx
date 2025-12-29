"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  ArrowRightIcon,
  CircleIcon,
  CornerDownLeftIcon,
  SearchIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Kbd } from "@/components/ui/kbd"

interface SearchLink {
  title: string
  href: string
}

interface SearchFAQ {
  question: string
  href: string
}

interface SiteSearchProps {
  links?: SearchLink[]
  faqs?: SearchFAQ[]
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SiteSearch({
  links = [],
  faqs = [],
  open,
  onOpenChange,
}: SiteSearchProps) {
  const router = useRouter()
  const [internalOpen, setInternalOpen] = React.useState(false)

  const isOpen = open ?? internalOpen
  const setIsOpen = onOpenChange ?? setInternalOpen

  // Keyboard shortcut to open search
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen(!isOpen)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [isOpen, setIsOpen])

  const handleSelect = React.useCallback(
    (href: string) => {
      setIsOpen(false)
      router.push(href)
    },
    [router, setIsOpen]
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogHeader className="sr-only">
        <DialogTitle>Search documentation...</DialogTitle>
        <DialogDescription>Search for a command to run...</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn(
          "overflow-hidden rounded-xl border-none p-2 pb-11",
          "shadow-2xl ring-4 ring-neutral-200/80",
          "dark:bg-neutral-900 dark:ring-neutral-800"
        )}
        showCloseButton={false}
      >
        <Command
          className={cn(
            "rounded-none bg-transparent",
            "**:data-[slot=command-input-wrapper]:mb-0",
            "**:data-[slot=command-input-wrapper]:h-9",
            "**:data-[slot=command-input-wrapper]:rounded-md",
            "**:data-[slot=command-input-wrapper]:border",
            "**:data-[slot=command-input-wrapper]:border-input",
            "**:data-[slot=command-input-wrapper]:bg-input/50",
            "**:data-[slot=command-input]:!h-9",
            "**:data-[slot=command-input]:py-0"
          )}
        >
          <CommandInput placeholder="Type a command or search..." />
          <CommandList className="no-scrollbar min-h-80 max-h-[300px] scroll-py-1 scroll-pt-2 scroll-pb-1.5">
            <CommandEmpty>No results found.</CommandEmpty>

            {links.length > 0 && (
              <CommandGroup heading="Links">
                {links.map((link) => (
                  <CommandItem
                    key={link.href}
                    value={link.title}
                    onSelect={() => handleSelect(link.href)}
                    className={cn(
                      "h-9 rounded-md border border-transparent !px-3 font-medium",
                      "data-[selected=true]:border-input data-[selected=true]:bg-input/50"
                    )}
                  >
                    <ArrowRightIcon className="mr-2 h-4 w-4" />
                    {link.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {links.length > 0 && faqs.length > 0 && <CommandSeparator />}

            {faqs.length > 0 && (
              <CommandGroup heading="FAQ">
                {faqs.map((faq) => (
                  <CommandItem
                    key={faq.href}
                    value={faq.question}
                    onSelect={() => handleSelect(faq.href)}
                    className={cn(
                      "h-9 rounded-md border border-transparent !px-3 font-medium",
                      "data-[selected=true]:border-input data-[selected=true]:bg-input/50"
                    )}
                  >
                    <div className="mr-2 flex h-4 w-4 items-center justify-center">
                      <CircleIcon className="h-3 w-3" />
                    </div>
                    {faq.question}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>

        {/* Footer */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 z-20",
            "flex h-10 items-center gap-2 px-4",
            "rounded-b-xl border-t border-t-neutral-100 bg-neutral-50",
            "text-xs font-medium text-muted-foreground",
            "dark:border-t-neutral-700 dark:bg-neutral-800"
          )}
        >
          <div className="flex items-center gap-2">
            <Kbd className="border">
              <CornerDownLeftIcon className="size-3" />
            </Kbd>
            Go to Page
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Trigger button component
export function SiteSearchTrigger({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground",
        className
      )}
      {...props}
    >
      <SearchIcon className="h-4 w-4" />
      <span className="hidden lg:inline-flex">Search documentation...</span>
      <span className="lg:hidden">Search...</span>
      <Kbd className="ml-auto hidden lg:inline-flex">
        <span className="text-xs">⌘</span>K
      </Kbd>
    </button>
  )
}
