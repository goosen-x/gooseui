"use client"

import {
  ComponentIcon,
  CornerDownLeftIcon,
  FileTextIcon,
  FlaskConicalIcon,
  SearchIcon,
  SparklesIcon,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"

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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { useIsMac } from "@/hooks/use-is-mac"
import { useMutationObserver } from "@/hooks/use-mutation-observer"
import { getSearchableItems } from "@/lib/config/docs-navigation"
import { cn } from "@/lib/utils"

// Get navigation data from shared config
const searchData = getSearchableItems()

function CommandMenuItem({
  children,
  className,
  onHighlight,
  ...props
}: React.ComponentProps<typeof CommandItem> & {
  onHighlight?: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useMutationObserver(ref, (mutations) => {
    for (const mutation of mutations) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "aria-selected" &&
        ref.current?.getAttribute("aria-selected") === "true"
      ) {
        onHighlight?.()
      }
    }
  })

  return (
    <CommandItem
      ref={ref}
      className={cn(
        "h-9 rounded-md border border-transparent !px-3 font-medium cursor-pointer",
        "data-[selected=true]:border-input data-[selected=true]:bg-accent/50",
        className,
      )}
      {...props}
    >
      {children}
    </CommandItem>
  )
}

export function SiteSearch() {
  const router = useRouter()
  const isMac = useIsMac()
  const [open, setOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<
    "page" | "component" | "effect" | "experimental" | null
  >(null)
  const [copyPayload, setCopyPayload] = useState("")

  const runCommand = useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  // Global keyboard shortcuts
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Cmd/Ctrl+K or "/" opens the menu
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={cn(
            "inline-flex items-center gap-2 rounded-md border border-input",
            "bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground",
            "shadow-sm transition-colors cursor-pointer",
            "hover:bg-accent hover:text-accent-foreground",
            "md:w-40 lg:w-56",
          )}
          onClick={() => setOpen(true)}
        >
          <SearchIcon className="size-4" />
          <span className="hidden lg:inline-flex">Search docs...</span>
          <span className="inline-flex lg:hidden">Search...</span>
          <KbdGroup className="ml-auto hidden sm:inline-flex">
            <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className={cn(
          "rounded-xl border-none bg-clip-padding p-2 pb-11 shadow-2xl",
          "ring-4 ring-neutral-200/80",
          "dark:bg-neutral-900 dark:ring-neutral-800",
        )}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Search documentation</DialogTitle>
          <DialogDescription>
            Search for pages and components...
          </DialogDescription>
        </DialogHeader>

        <Command
          className={cn(
            "rounded-none bg-transparent",
            "**:data-[slot=command-input-wrapper]:bg-input/50",
            "**:data-[slot=command-input-wrapper]:border-input",
            "**:data-[slot=command-input]:!h-9",
            "**:data-[slot=command-input]:py-0",
            "**:data-[slot=command-input-wrapper]:mb-0",
            "**:data-[slot=command-input-wrapper]:!h-9",
            "**:data-[slot=command-input-wrapper]:rounded-md",
            "**:data-[slot=command-input-wrapper]:border",
          )}
          filter={(value, search, keywords) => {
            const extendValue = value + " " + (keywords?.join(" ") || "")
            if (extendValue.toLowerCase().includes(search.toLowerCase())) {
              return 1
            }
            return 0
          }}
        >
          <CommandInput placeholder="Type a command or search..." />

          <CommandList className="max-h-[300px]">
            <CommandEmpty>No results found.</CommandEmpty>

            {/* Pages */}
            <CommandGroup
              heading="Pages"
              className="!p-0 [&_[cmdk-group-heading]]:!p-3 [&_[cmdk-group-heading]]:!pb-1"
            >
              {searchData.pages.map((item) => (
                <CommandMenuItem
                  key={item.href}
                  value={item.title}
                  keywords={item.keywords}
                  onHighlight={() => {
                    setSelectedType("page")
                    setCopyPayload("")
                  }}
                  onSelect={() => runCommand(() => router.push(item.href))}
                >
                  <FileTextIcon className="mr-2 size-4 text-muted-foreground" />
                  {item.title}
                </CommandMenuItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            {/* Components */}
            <CommandGroup
              heading="Components"
              className="!p-0 [&_[cmdk-group-heading]]:!p-3 [&_[cmdk-group-heading]]:!pb-1"
            >
              {searchData.components.map((item) => {
                const componentName = item.href.split("/").pop()
                return (
                  <CommandMenuItem
                    key={item.href}
                    value={item.title}
                    keywords={["component", componentName || ""]}
                    onHighlight={() => {
                      setSelectedType("component")
                      setCopyPayload(
                        `npx shadcn@latest add https://gooseui.pro/r/${componentName}.json`,
                      )
                    }}
                    onSelect={() => runCommand(() => router.push(item.href))}
                  >
                    <ComponentIcon className="mr-2 size-4 text-muted-foreground" />
                    {item.title}
                  </CommandMenuItem>
                )
              })}
            </CommandGroup>

            <CommandSeparator />

            {/* Effects */}
            <CommandGroup
              heading="Effects"
              className="!p-0 [&_[cmdk-group-heading]]:!p-3 [&_[cmdk-group-heading]]:!pb-1"
            >
              {searchData.effects.map((item) => {
                const effectName = item.href.split("/").pop()
                return (
                  <CommandMenuItem
                    key={item.href}
                    value={item.title}
                    keywords={["effect", effectName || ""]}
                    onHighlight={() => {
                      setSelectedType("effect")
                      setCopyPayload(
                        `npx shadcn@latest add https://gooseui.pro/r/${effectName}.json`,
                      )
                    }}
                    onSelect={() => runCommand(() => router.push(item.href))}
                  >
                    <SparklesIcon className="mr-2 size-4 text-muted-foreground" />
                    {item.title}
                  </CommandMenuItem>
                )
              })}
            </CommandGroup>

            {/* Experimental */}
            {searchData.experimental.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup
                  heading="Experimental"
                  className="!p-0 [&_[cmdk-group-heading]]:!p-3 [&_[cmdk-group-heading]]:!pb-1"
                >
                  {searchData.experimental.map((item) => {
                    const itemName = item.href.split("/").pop()
                    return (
                      <CommandMenuItem
                        key={item.href}
                        value={item.title}
                        keywords={["experimental", itemName || ""]}
                        onHighlight={() => {
                          setSelectedType("experimental")
                          setCopyPayload(
                            `npx shadcn@latest add https://gooseui.pro/r/${itemName}.json`,
                          )
                        }}
                        onSelect={() => runCommand(() => router.push(item.href))}
                      >
                        <FlaskConicalIcon className="mr-2 size-4 text-muted-foreground" />
                        {item.title}
                      </CommandMenuItem>
                    )
                  })}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>

        {/* Dynamic Footer */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 z-20",
            "flex h-10 items-center gap-2 px-4",
            "rounded-b-xl border-t",
            "border-t-neutral-100 bg-neutral-50",
            "dark:border-t-neutral-700 dark:bg-neutral-800",
            "text-muted-foreground text-xs font-medium",
          )}
        >
          <div className="flex items-center gap-2">
            <Kbd className="border">
              <CornerDownLeftIcon className="size-3" />
            </Kbd>
            {selectedType === "page" && "Go to Page"}
            {selectedType === "component" && "Go to Component"}
            {selectedType === "effect" && "Go to Effect"}
            {selectedType === "experimental" && "Go to Experimental"}
            {!selectedType && "Select"}
          </div>

          {copyPayload && (
            <>
              <div className="h-4 w-px bg-border" />
              <code className="text-[10px] truncate max-w-[280px] text-muted-foreground/70">
                {copyPayload}
              </code>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
