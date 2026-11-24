"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { HighlightText } from "@/registry/gooseui/effects/highlight-text"
import {
  Kbd,
  KbdArrowDownIcon,
  KbdArrowUpIcon,
  KbdEnterIcon,
  KbdGroup,
} from "@/registry/gooseui/ui/kbd"

/* -------------------------------------------------------------------------------------------------
 * Types
 * -------------------------------------------------------------------------------------------------*/

export interface SearchResult {
  id: string
  title: string
  description?: string
  category?: string
  icon?: React.ReactNode
  href?: string
  keywords?: string[]
  /** When set, selecting the result puts this text into the input instead of calling onSelect (recent searches) */
  query?: string
}

/** Group of results shown before the user types anything */
export interface SearchResultGroup {
  id?: string
  label: string
  icon?: React.ReactNode
  items: SearchResult[]
}

export interface SearchSource {
  id: string
  name: string
  icon?: React.ReactNode
  results: SearchResult[]
}

type SearchPanelVariant =
  | "instant"
  | "command"
  | "scoped"
  | "contextual"
  | "federated"
type SearchPanelSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full"

/* -------------------------------------------------------------------------------------------------
 * Icons
 * -------------------------------------------------------------------------------------------------*/

function Icon({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-4 shrink-0", className)}
    >
      {children}
    </svg>
  )
}

const SearchIcon = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </Icon>
)
const XIcon = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Icon>
)
const CommandIcon = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
  </Icon>
)
const FileIcon = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v5h5M16 13H8M16 17H8M10 9H8" />
  </Icon>
)
const ClockIcon = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </Icon>
)
const FlameIcon = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5Z" />
  </Icon>
)
const SparklesIcon = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z" />
    <path d="M19 15v4M17 17h4M5 3v4M3 5h4" />
  </Icon>
)
const HashIcon = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18" />
  </Icon>
)
const FolderIcon = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
  </Icon>
)
const GithubIcon = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </Icon>
)
const MessageIcon = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
  </Icon>
)
const FilterIcon = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="M22 3H2l8 9.46V19l4 2v-8.54Z" />
  </Icon>
)

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -------------------------------------------------------------------------------------------------*/

const sizeClasses: Record<SearchPanelSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-[40rem]",
  full: "max-w-full",
}

/** Same call shape as the former cva helper: searchPanelVariants({ variant, size }) */
function searchPanelVariants({
  variant = "instant",
  size = "md",
}: {
  variant?: SearchPanelVariant | null
  size?: SearchPanelSize | null
} = {}) {
  return cn(
    "w-full overflow-hidden rounded-lg border bg-background shadow-lg",
    variant === "command" &&
      "overflow-visible rounded-xl border-none shadow-2xl ring-4 ring-neutral-200/80 dark:bg-neutral-900 dark:ring-neutral-800",
    sizeClasses[size ?? "md"],
  )
}

const rowClass =
  "flex w-full cursor-pointer items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
const headingClass =
  "flex items-center gap-2 px-3 py-1 text-xs font-medium text-muted-foreground"
// Command variant: the former cmdk look, rows are bordered pills, headings sit lower
const commandRowClass =
  "flex h-9 w-full cursor-pointer items-center gap-3 rounded-md border border-transparent px-3 text-left font-medium transition-colors hover:border-input hover:bg-accent/50 focus-visible:border-input focus-visible:bg-accent/50 focus-visible:outline-none"
const commandHeadingClass =
  "flex items-center gap-2 px-3 pb-1 pt-3 text-xs font-medium text-muted-foreground"
const spinner = (
  <span className="mr-2 size-4 animate-spin rounded-full border-2 border-primary border-t-transparent motion-reduce:animate-none" />
)

/** Stagger index of a row: the first six rows appear one after another. */
const itemStyle = (index: number) =>
  ({ "--i": Math.min(index, 5) }) as React.CSSProperties

// Rows fade in through @starting-style when they mount; stable keys mean rows
// that stay between two queries are not animated again. Pure CSS, no JS timers.
const css = `
.gooseui-search-panel-reveal{overflow:hidden;transition:opacity 160ms ease-out}
.gooseui-search-panel-reveal[data-state="closed"]{height:0;opacity:0;visibility:hidden;pointer-events:none;transition:opacity 120ms ease-in,visibility 0s linear 120ms}
@supports (interpolate-size:allow-keywords){
.gooseui-search-panel-reveal{interpolate-size:allow-keywords;height:var(--gooseui-search-panel-height,auto);transition:height 180ms ease-out,opacity 160ms ease-out}
.gooseui-search-panel-reveal[data-state="closed"]{height:0;transition:height 150ms ease-in,opacity 120ms ease-in,visibility 0s linear 150ms}
}
.gooseui-search-panel-item{transition:opacity 180ms ease-out calc(var(--i,0)*30ms),transform 180ms ease-out calc(var(--i,0)*30ms)}
.gooseui-search-panel-status{transition:opacity 180ms ease-out}
@starting-style{
.gooseui-search-panel-reveal[data-state="open"]{opacity:0}
.gooseui-search-panel-item{opacity:0;transform:translateY(-0.25rem)}
.gooseui-search-panel-status{opacity:0}
}
@supports (interpolate-size:allow-keywords){@starting-style{.gooseui-search-panel-reveal[data-state="open"]{height:0}}}
@media (prefers-reduced-motion:reduce){
.gooseui-search-panel-reveal,.gooseui-search-panel-item,.gooseui-search-panel-status{transition:none!important}
}`

/**
 * Animated container: opens and closes with a fade and a height transition.
 * The last content is kept while closing so it can fade out.
 */
function Reveal({
  open,
  children,
}: {
  open: boolean
  children: React.ReactNode
}) {
  const outer = React.useRef<HTMLDivElement>(null)
  const inner = React.useRef<HTMLDivElement>(null)
  const snapshot = React.useRef<React.ReactNode>(null)
  if (open) snapshot.current = children

  // Keeps the outer height in sync with its content so it can be transitioned
  React.useEffect(() => {
    const node = inner.current
    if (!node || typeof ResizeObserver === "undefined") return
    const observer = new ResizeObserver(([entry]) => {
      const height =
        entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height
      outer.current?.style.setProperty(
        "--gooseui-search-panel-height",
        `${height}px`,
      )
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={outer}
      data-state={open ? "open" : "closed"}
      inert={!open}
      className="gooseui-search-panel-reveal"
    >
      <style href="gooseui-search-panel" precedence="default">
        {css}
      </style>
      <div ref={inner}>{open ? children : snapshot.current}</div>
    </div>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Context
 * -------------------------------------------------------------------------------------------------*/

interface SearchPanelContextValue {
  query: string
  setQuery: (query: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  variant: string
  activeScope: string
  setActiveScope: (scope: string) => void
  /** Puts a query into the input and focuses it */
  applyQuery: (query: string) => void
}

const SearchPanelContext = React.createContext<SearchPanelContextValue | null>(
  null,
)

function useSearchPanel() {
  const context = React.useContext(SearchPanelContext)
  if (!context) {
    throw new Error("useSearchPanel must be used within a <SearchPanel />")
  }
  return context
}

/* -------------------------------------------------------------------------------------------------
 * SearchPanel
 * -------------------------------------------------------------------------------------------------*/

interface SearchPanelProps extends React.ComponentProps<"div"> {
  variant?: SearchPanelVariant | null
  size?: SearchPanelSize | null
  /** Controlled query value */
  value?: string
  /** Callback when query changes */
  onQueryChange?: (query: string) => void
  /** Placeholder text */
  placeholder?: string
  /** Debounce delay in ms (for instant variant) */
  debounce?: number
  /** Available scopes for scoped variant */
  scopes?: { id: string; label: string }[]
  /** Default scope */
  defaultScope?: string
  /** Callback when the active scope changes */
  onScopeChange?: (scope: string) => void
  /** Label of the command palette trigger */
  triggerLabel?: string
  /** Accessible label of the clear button */
  clearLabel?: string
  /** Controlled open state of the command palette */
  open?: boolean
  /** Called when the command palette wants to open or close */
  onOpenChange?: (open: boolean) => void
  /** Cmd/Ctrl+K toggles the command palette, pass false to handle the shortcut yourself */
  hotkey?: boolean
  /** Replaces the built-in command palette trigger, pass null to render no trigger */
  trigger?: React.ReactNode
}

function SearchPanel({
  className,
  children,
  variant = "instant",
  size,
  value,
  onQueryChange,
  placeholder = "Search...",
  debounce = 150,
  scopes = [],
  defaultScope = "all",
  onScopeChange,
  triggerLabel = "Search...",
  clearLabel = "Clear search",
  open,
  onOpenChange,
  hotkey = true,
  trigger,
  ...props
}: SearchPanelProps) {
  const [query, setQueryState] = React.useState(value || "")
  const [innerOpen, setInnerOpen] = React.useState(false)
  const isOpen = open ?? innerOpen
  const isOpenRef = React.useRef(isOpen)
  isOpenRef.current = isOpen
  const setIsOpen = React.useCallback(
    (next: boolean | ((current: boolean) => boolean)) => {
      const value = typeof next === "function" ? next(isOpenRef.current) : next
      setInnerOpen(value)
      onOpenChange?.(value)
    },
    [onOpenChange],
  )
  const [activeScope, setActiveScopeState] = React.useState(defaultScope)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const dialogRef = React.useRef<HTMLDialogElement>(null)
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined)
  const isCommand = variant === "command"

  const setQuery = React.useCallback(
    (next: string) => {
      setQueryState(next)
      clearTimeout(timer.current)
      if (variant === "instant" && debounce > 0) {
        timer.current = setTimeout(() => onQueryChange?.(next), debounce)
      } else {
        onQueryChange?.(next)
      }
    },
    [variant, debounce, onQueryChange],
  )

  const setActiveScope = React.useCallback(
    (scope: string) => {
      setActiveScopeState(scope)
      onScopeChange?.(scope)
    },
    [onScopeChange],
  )

  const applyQuery = React.useCallback(
    (next: string) => {
      setQuery(next)
      inputRef.current?.focus()
    },
    [setQuery],
  )

  // Arrow keys move between result rows, Enter in the input opens the first one
  const onPanelKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowDown", "ArrowUp", "Enter"].includes(e.key)) return
    const input = inputRef.current
    const target = e.target as HTMLElement
    const rows = Array.from(
      e.currentTarget.querySelectorAll<HTMLButtonElement>(
        ".gooseui-search-panel-item button",
      ),
    ).filter((row) => !row.closest("[inert]"))
    const index = rows.indexOf(target as HTMLButtonElement)
    if (index === -1 && target !== input) return
    if (e.key === "Enter") {
      if (index === -1 && rows[0]) {
        e.preventDefault()
        rows[0].click()
      }
      return
    }
    if (rows.length === 0) return
    e.preventDefault()
    if (e.key === "ArrowDown") {
      rows[Math.min(index + 1, rows.length - 1)].focus()
    } else if (index <= 0) {
      input?.focus()
    } else {
      rows[index - 1].focus()
    }
  }

  // The native dialog handles Escape, focus trapping and the backdrop
  React.useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  // Cmd/Ctrl+K toggles the palette
  React.useEffect(() => {
    if (!isCommand || !hotkey) return
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setIsOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [isCommand, hotkey, setIsOpen])

  const contextValue = React.useMemo(
    () => ({
      query,
      setQuery,
      isOpen,
      setIsOpen,
      variant: variant || "instant",
      activeScope,
      setActiveScope,
      applyQuery,
    }),
    [
      query,
      setQuery,
      isOpen,
      setIsOpen,
      variant,
      activeScope,
      setActiveScope,
      applyQuery,
    ],
  )

  const field = (
    <div className={cn(isCommand && "p-2")}>
      <div
        className={cn(
          "flex items-center px-3",
          isCommand && "h-9 rounded-md border border-input bg-input/50",
        )}
      >
        <SearchIcon className="text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={isCommand ? undefined : () => setIsOpen(true)}
          placeholder={placeholder}
          aria-label={placeholder}
          autoFocus={isCommand}
          className={cn(
            "flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground",
            isCommand ? "h-full py-0" : "py-3",
          )}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label={clearLabel}
            className="cursor-pointer rounded-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            <XIcon />
          </button>
        )}
      </div>
    </div>
  )

  if (isCommand) {
    return (
      <SearchPanelContext.Provider value={contextValue}>
        {trigger === undefined ? (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-haspopup="dialog"
            className="inline-flex cursor-pointer items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <SearchIcon />
            <span>{triggerLabel}</span>
            <KbdGroup className="ml-auto">
              <Kbd>
                <CommandIcon />
              </Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </button>
        ) : (
          trigger
        )}
        <dialog
          ref={dialogRef}
          onClose={() => setIsOpen(false)}
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
          aria-label={placeholder}
          className="mx-auto mb-3 mt-3 max-h-[calc(100dvh-1.5rem)] w-full max-w-[calc(100%-1.5rem)] overflow-visible bg-transparent p-0 backdrop:bg-black/50 [--gsp-gap:0.75rem] sm:mb-4 sm:mt-[max(12vh,1rem)] sm:max-h-[calc(100dvh-max(12vh,1rem)-1rem)] sm:max-w-[calc(100%-2rem)] sm:[--gsp-gap:max(12vh,1rem)]"
        >
          {isOpen && (
            <div
              onKeyDown={onPanelKeyDown}
              className={cn(
                searchPanelVariants({
                  variant,
                  size: size ?? "2xl",
                }),
                "mx-auto",
                className,
              )}
              {...props}
            >
              {field}
              {children}
            </div>
          )}
        </dialog>
      </SearchPanelContext.Provider>
    )
  }

  return (
    <SearchPanelContext.Provider value={contextValue}>
      <div
        onKeyDown={onPanelKeyDown}
        className={cn(searchPanelVariants({ variant, size }), className)}
        {...props}
      >
        {variant === "scoped" && scopes.length > 0 && (
          <div className="flex items-center gap-1 border-b px-3 py-2">
            {scopes.map((scope) => (
              <button
                key={scope.id}
                type="button"
                aria-pressed={activeScope === scope.id}
                onClick={() => setActiveScope(scope.id)}
                className="cursor-pointer rounded-md px-3 py-1 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground aria-pressed:bg-primary aria-pressed:text-primary-foreground"
              >
                {scope.label}
              </button>
            ))}
          </div>
        )}
        {field}
        {children}
      </div>
    </SearchPanelContext.Provider>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Shared pieces
 * -------------------------------------------------------------------------------------------------*/

/** Match highlight shared by all variants: same marker as Searchbar. */
export function Highlight({ text, query }: { text: string; query: string }) {
  return (
    <HighlightText
      text={text}
      query={query}
      ignoreDiacritics
      markClassName="rounded-[0.125rem] bg-primary/15 text-foreground"
    />
  )
}

function ResultText({
  result,
  query,
}: {
  result: SearchResult
  query?: string
}) {
  const ctx = useSearchPanel()
  const q = query ?? ctx.query
  const compact = ctx.variant === "command"
  return (
    <span className="min-w-0 flex-1">
      <span className="block truncate text-sm font-medium">
        <Highlight text={result.title} query={q} />
      </span>
      {result.description && !compact && (
        <span className="block truncate text-xs text-muted-foreground">
          <Highlight text={result.description} query={q} />
        </span>
      )}
    </span>
  )
}

function Status({ children }: { children: React.ReactNode }) {
  return (
    <div className="gooseui-search-panel-status flex items-center justify-center py-6 text-center text-sm text-muted-foreground">
      {children}
    </div>
  )
}

function ResultGroups({
  groups,
  onPick,
}: {
  groups: SearchResultGroup[]
  onPick: (result: SearchResult, group: SearchResultGroup) => void
}) {
  const compact = useSearchPanel().variant === "command"
  let offset = 0
  return (
    <>
      {groups
        .filter((group) => group.items.length > 0)
        .map((group) => {
          const base = offset
          offset += group.items.length
          return (
            <div
              key={group.id ?? group.label}
              className={cn(
                "border-t first:border-t-0",
                compact ? "pb-1" : "py-2",
              )}
            >
              <div className={compact ? commandHeadingClass : headingClass}>
                {group.icon}
                {group.label}
              </div>
              <ul>
                {group.items.map((item, index) => (
                  <li
                    key={item.id}
                    style={itemStyle(base + index)}
                    className="gooseui-search-panel-item"
                  >
                    <button
                      type="button"
                      onClick={() => onPick(item, group)}
                      className={compact ? commandRowClass : rowClass}
                    >
                      {item.icon ||
                        (item.query !== undefined ? (
                          <ClockIcon className="text-muted-foreground" />
                        ) : (
                          <FileIcon className="text-muted-foreground" />
                        ))}
                      <ResultText result={item} query="" />
                      {item.category && !compact && (
                        <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          {item.category}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
    </>
  )
}

/* -------------------------------------------------------------------------------------------------
 * SearchPanelResults (Instant Search)
 * -------------------------------------------------------------------------------------------------*/

interface SearchPanelResultsProps
  extends Omit<React.ComponentProps<"div">, "results" | "onSelect"> {
  results?: SearchResult[]
  /** Groups shown while the query is empty */
  defaultResults?: SearchResultGroup[]
  loading?: boolean
  emptyMessage?: string
  loadingMessage?: string
  onSelect?: (result: SearchResult) => void
}

function SearchPanelResults({
  className,
  results = [],
  defaultResults = [],
  loading = false,
  emptyMessage = "No results found",
  loadingMessage = "Searching...",
  onSelect,
  ...props
}: SearchPanelResultsProps) {
  const { query, applyQuery } = useSearchPanel()
  const showDefaults =
    query === "" && defaultResults.some((group) => group.items.length > 0)
  const open = query !== "" || results.length > 0 || showDefaults

  return (
    <Reveal open={open}>
      <div
        className={cn("max-h-80 overflow-y-auto border-t", className)}
        aria-busy={loading}
        {...props}
      >
        {showDefaults ? (
          <ResultGroups
            groups={defaultResults}
            onPick={(result) =>
              result.query !== undefined
                ? applyQuery(result.query)
                : onSelect?.(result)
            }
          />
        ) : loading && results.length === 0 ? (
          <Status key="loading">
            {spinner}
            {loadingMessage}
          </Status>
        ) : results.length === 0 ? (
          <Status key="empty">{emptyMessage}</Status>
        ) : (
          <ul className="py-2">
            {results.map((result, index) => (
              <li
                key={result.id}
                style={itemStyle(index)}
                className="gooseui-search-panel-item"
              >
                <button
                  type="button"
                  onClick={() => onSelect?.(result)}
                  className={rowClass}
                >
                  {result.icon || (
                    <FileIcon className="text-muted-foreground" />
                  )}
                  <ResultText result={result} query={query} />
                  {result.category && (
                    <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      {result.category}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Reveal>
  )
}

/* -------------------------------------------------------------------------------------------------
 * SearchPanelSuggestions (Contextual)
 * -------------------------------------------------------------------------------------------------*/

interface SearchPanelSuggestionsProps
  extends Omit<React.ComponentProps<"div">, "onSelect"> {
  recent?: SearchResult[]
  trending?: SearchResult[]
  suggested?: SearchResult[]
  labels?: { recent?: string; trending?: string; suggested?: string }
  onSelect?: (result: SearchResult) => void
}

function SearchPanelSuggestions({
  className,
  recent = [],
  trending = [],
  suggested = [],
  labels,
  onSelect,
  ...props
}: SearchPanelSuggestionsProps) {
  const { query } = useSearchPanel()

  const groups = [
    {
      id: "recent",
      label: labels?.recent ?? "Recent",
      icon: <ClockIcon className="size-3" />,
      items: recent,
    },
    {
      id: "trending",
      label: labels?.trending ?? "Trending",
      icon: <FlameIcon className="size-3" />,
      items: trending,
    },
    {
      id: "suggested",
      label: labels?.suggested ?? "Suggested for you",
      icon: <SparklesIcon className="size-3" />,
      items: suggested,
    },
  ].filter((group) => group.items.length > 0)
  const open = query === "" && groups.length > 0
  let offset = 0

  return (
    <Reveal open={open}>
      <div
        className={cn("max-h-80 overflow-y-auto border-t", className)}
        {...props}
      >
        {groups.map((group) => {
          const base = offset
          offset += group.items.length
          return (
            <div key={group.id} className="border-t py-2 first:border-t-0">
              <div className={headingClass}>
                {group.icon}
                {group.label}
              </div>
              <ul>
                {group.items.map((item, index) => (
                  <li
                    key={item.id}
                    style={itemStyle(base + index)}
                    className="gooseui-search-panel-item"
                  >
                    <button
                      type="button"
                      onClick={() => onSelect?.(item)}
                      className={rowClass}
                    >
                      {group.id === "suggested" &&
                        (item.icon || (
                          <HashIcon className="text-muted-foreground" />
                        ))}
                      {group.id === "suggested" ? (
                        <ResultText result={item} query="" />
                      ) : (
                        <span className="text-sm">{item.title}</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </Reveal>
  )
}

/* -------------------------------------------------------------------------------------------------
 * SearchPanelFederated (Multi-source)
 * -------------------------------------------------------------------------------------------------*/

interface SearchPanelFederatedProps
  extends Omit<React.ComponentProps<"div">, "onSelect"> {
  sources?: SearchSource[]
  /** Groups shown while the query is empty, the group label is the source name */
  defaultResults?: SearchResultGroup[]
  loading?: boolean
  loadingMessage?: string
  emptyMessage?: string
  noResultsMessage?: string
  onSelect?: (result: SearchResult, source: SearchSource) => void
}

const sourceIcons: Record<string, React.ReactNode> = {
  components: <FolderIcon />,
  docs: <FileIcon />,
  github: <GithubIcon />,
  slack: <MessageIcon />,
}

function SearchPanelFederated({
  className,
  sources = [],
  defaultResults = [],
  loading = false,
  loadingMessage = "Searching across sources...",
  emptyMessage = "No results found",
  noResultsMessage = "No results",
  onSelect,
  ...props
}: SearchPanelFederatedProps) {
  const { query, applyQuery } = useSearchPanel()
  const showDefaults =
    query === "" && defaultResults.some((group) => group.items.length > 0)
  let offset = 0

  return (
    <Reveal open={query !== "" || showDefaults}>
      <div
        className={cn("max-h-96 overflow-y-auto border-t", className)}
        aria-busy={loading}
        {...props}
      >
        {showDefaults ? (
          <ResultGroups
            groups={defaultResults}
            onPick={(result, group) =>
              result.query !== undefined
                ? applyQuery(result.query)
                : onSelect?.(result, {
                    id: group.id ?? group.label,
                    name: group.label,
                    icon: group.icon,
                    results: group.items,
                  })
            }
          />
        ) : loading && sources.length === 0 ? (
          <Status key="loading">
            {spinner}
            {loadingMessage}
          </Status>
        ) : sources.length === 0 ? (
          <Status key="empty">{emptyMessage}</Status>
        ) : (
          sources.map((source) => {
            const shown = source.results.slice(0, 3)
            const base = offset
            offset += shown.length
            return (
              <div key={source.id} className="border-b py-2 last:border-b-0">
                <div className={headingClass}>
                  {source.icon || sourceIcons[source.id] || (
                    <FilterIcon className="size-3" />
                  )}
                  {source.name}
                </div>
                {shown.length === 0 ? (
                  <div className="gooseui-search-panel-status px-3 py-2 text-xs text-muted-foreground">
                    {noResultsMessage}
                  </div>
                ) : (
                  <ul>
                    {shown.map((result, index) => (
                      <li
                        key={result.id}
                        style={itemStyle(base + index)}
                        className="gooseui-search-panel-item"
                      >
                        <button
                          type="button"
                          onClick={() => onSelect?.(result, source)}
                          className={rowClass}
                        >
                          <ResultText result={result} query={query} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })
        )}
      </div>
    </Reveal>
  )
}

/* -------------------------------------------------------------------------------------------------
 * SearchPanelCommands (Command Palette)
 * -------------------------------------------------------------------------------------------------*/

interface SearchPanelCommand {
  id: string
  title: string
  description?: string
  icon?: React.ReactNode
  shortcut?: string
  /** Extra words that match the command in a regular search */
  keywords?: string[]
  action: () => void
}

interface SearchPanelCommandsProps
  extends Omit<React.ComponentProps<"div">, "results" | "onSelect"> {
  commands?: SearchPanelCommand[]
  results?: SearchResult[]
  /** Groups shown while the query is empty, commands are added after them */
  defaultResults?: SearchResultGroup[]
  onSelect?: (result: SearchResult) => void
  labels?: {
    /** Text before the ">" key in the footer */
    hint?: string
    /** Text after the ">" key in the footer */
    hintSuffix?: string
    noCommands?: string
    /** Heading of the commands group */
    commands?: string
    navigate?: string
    open?: string
    close?: string
  }
  /** Message for an empty query result, {query} is replaced */
  noResultsMessage?: string
}

function SearchPanelCommands({
  className,
  commands = [],
  results = [],
  defaultResults = [],
  onSelect,
  labels,
  noResultsMessage = 'No results for "{query}"',
  ...props
}: SearchPanelCommandsProps) {
  const { query, setIsOpen, applyQuery } = useSearchPanel()
  const showCommands = query.startsWith(">")
  const cmdQuery = showCommands
    ? query.slice(1).trim().toLowerCase()
    : query.trim().toLowerCase()
  const matchedCommands =
    query === ""
      ? commands
      : commands.filter((cmd) =>
          [cmd.title, cmd.description, ...(cmd.keywords ?? [])].some((value) =>
            value?.toLowerCase().includes(cmdQuery),
          ),
        )
  const shownResults = showCommands || query === "" ? [] : results
  const resultGroups: {
    category?: string
    items: { result: SearchResult; index: number }[]
  }[] = []
  shownResults.forEach((result, index) => {
    const last = resultGroups[resultGroups.length - 1]
    if (last && last.category === result.category) {
      last.items.push({ result, index })
    } else {
      resultGroups.push({
        category: result.category,
        items: [{ result, index }],
      })
    }
  })
  const defaults = query === "" ? defaultResults : []
  const defaultsCount = defaults.reduce(
    (total, group) => total + group.items.length,
    0,
  )
  const hasContent =
    query === "" ? defaultsCount > 0 || matchedCommands.length > 0 : true
  const commandsHeading = (
    <div className={commandHeadingClass}>
      <CommandIcon className="size-3" />
      {labels?.commands ?? "Commands"}
    </div>
  )

  const commandRows = (offset: number) => (
    <ul>
      {matchedCommands.map((cmd, index) => (
        <li
          key={cmd.id}
          style={itemStyle(offset + index)}
          className="gooseui-search-panel-item"
        >
          <button
            type="button"
            onClick={() => {
              cmd.action()
              setIsOpen(false)
            }}
            className={commandRowClass}
          >
            {cmd.icon || <CommandIcon className="text-muted-foreground" />}
            <ResultText result={cmd} query={cmdQuery} />
            {cmd.shortcut && <Kbd>{cmd.shortcut}</Kbd>}
          </button>
        </li>
      ))}
    </ul>
  )

  return (
    <Reveal open>
      {hasContent && (
        <div
          className={cn(
            "mx-2 max-h-[min(24rem,calc(100dvh-var(--gsp-gap,0px)-1.5rem-9rem))] min-h-0 overflow-y-auto",
            className,
          )}
          {...props}
        >
          {query === "" && (
            <>
              <ResultGroups
                groups={defaults}
                onPick={(result) => {
                  if (result.query !== undefined) {
                    applyQuery(result.query)
                    return
                  }
                  onSelect?.(result)
                  setIsOpen(false)
                }}
              />
              {matchedCommands.length > 0 && (
                <div className={cn("pb-1", defaultsCount > 0 && "border-t")}>
                  {commandsHeading}
                  {commandRows(defaultsCount)}
                </div>
              )}
            </>
          )}

          {query !== "" && showCommands && (
            <div className="pb-1">
              {matchedCommands.length === 0 ? (
                <p className="gooseui-search-panel-status px-3 py-2 text-sm text-muted-foreground">
                  {labels?.noCommands ?? "No commands found"}
                </p>
              ) : (
                commandRows(0)
              )}
            </div>
          )}

          {query !== "" && !showCommands && (
            <>
              {resultGroups.map((group, groupIndex) => (
                <div
                  key={group.category ?? "results"}
                  className={cn("pb-1", groupIndex > 0 && "border-t")}
                >
                  {group.category && (
                    <div className={commandHeadingClass}>{group.category}</div>
                  )}
                  <ul>
                    {group.items.map(({ result, index }) => (
                      <li
                        key={result.id}
                        style={itemStyle(index)}
                        className="gooseui-search-panel-item"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            onSelect?.(result)
                            setIsOpen(false)
                          }}
                          className={commandRowClass}
                        >
                          {result.icon || (
                            <FileIcon className="text-muted-foreground" />
                          )}
                          <ResultText result={result} query={query} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {matchedCommands.length > 0 && (
                <div
                  className={cn("pb-1", shownResults.length > 0 && "border-t")}
                >
                  {commandsHeading}
                  {commandRows(shownResults.length)}
                </div>
              )}
              {shownResults.length === 0 && matchedCommands.length === 0 && (
                <Status key="empty">
                  {noResultsMessage.replace("{query}", query)}
                </Status>
              )}
            </>
          )}
        </div>
      )}
      <div className="mt-1 hidden items-center justify-between gap-4 border-t px-4 py-2.5 text-xs text-muted-foreground sm:flex">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <KbdGroup>
              <Kbd>
                <KbdArrowUpIcon />
              </Kbd>
              <Kbd>
                <KbdArrowDownIcon />
              </Kbd>
            </KbdGroup>
            {labels?.navigate ?? "select"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Kbd>
              <KbdEnterIcon />
            </Kbd>
            {labels?.open ?? "open"}
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5">
          <Kbd>Esc</Kbd>
          {labels?.close ?? "close"}
        </span>
      </div>
    </Reveal>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -------------------------------------------------------------------------------------------------*/

export {
  SearchPanel,
  SearchPanelResults,
  SearchPanelSuggestions,
  SearchPanelFederated,
  SearchPanelCommands,
  useSearchPanel,
  searchPanelVariants,
  type SearchPanelProps,
  type SearchPanelResultsProps,
  type SearchPanelSuggestionsProps,
  type SearchPanelFederatedProps,
  type SearchPanelCommandsProps,
  type SearchPanelCommand,
}
