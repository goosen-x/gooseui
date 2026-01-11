"use client"

import { cva, type VariantProps } from "class-variance-authority"
import {
  Clock,
  Command,
  FileText,
  Filter,
  Flame,
  Folder,
  Github,
  Hash,
  MessageSquare,
  Search,
  Sparkles,
  X,
} from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

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
}

export interface SearchSource {
  id: string
  name: string
  icon?: React.ReactNode
  results: SearchResult[]
}

/* -------------------------------------------------------------------------------------------------
 * SearchPanel Variants
 * -------------------------------------------------------------------------------------------------*/

const searchPanelVariants = cva(
  "w-full rounded-lg border bg-background shadow-lg overflow-hidden",
  {
    variants: {
      variant: {
        instant: "",
        command: "border-border/50",
        scoped: "",
        contextual: "",
        federated: "",
      },
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        full: "max-w-full",
      },
    },
    defaultVariants: {
      variant: "instant",
      size: "md",
    },
  }
)

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
}

const SearchPanelContext = React.createContext<SearchPanelContextValue | null>(
  null
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

interface SearchPanelProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof searchPanelVariants> {
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
  ...props
}: SearchPanelProps) {
  const [query, setQueryState] = React.useState(value || "")
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeScope, setActiveScope] = React.useState(defaultScope)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const debounceRef = React.useRef<NodeJS.Timeout | null>(null)

  const setQuery = React.useCallback(
    (newQuery: string) => {
      setQueryState(newQuery)

      if (variant === "instant" && debounce > 0) {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current)
        }
        debounceRef.current = setTimeout(() => {
          onQueryChange?.(newQuery)
        }, debounce)
      } else {
        onQueryChange?.(newQuery)
      }
    },
    [variant, debounce, onQueryChange]
  )

  // Keyboard shortcut for command variant
  React.useEffect(() => {
    if (variant !== "command") return

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
        if (!isOpen) {
          setTimeout(() => inputRef.current?.focus(), 0)
        }
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [variant, isOpen])

  const contextValue = React.useMemo(
    () => ({
      query,
      setQuery,
      isOpen,
      setIsOpen,
      variant: variant || "instant",
      activeScope,
      setActiveScope,
    }),
    [query, setQuery, isOpen, variant, activeScope]
  )

  // Command palette overlay
  if (variant === "command") {
    return (
      <SearchPanelContext.Provider value={contextValue}>
        {/* Trigger button */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
        >
          <Search className="size-4" />
          <span>Search...</span>
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <Command className="size-3" />K
          </kbd>
        </button>

        {/* Modal overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50"
            onClick={() => setIsOpen(false)}
          >
            <div
              className={cn(searchPanelVariants({ variant, size }), className)}
              onClick={(e) => e.stopPropagation()}
              {...props}
            >
              <div className="flex items-center border-b px-3">
                <Search className="size-4 text-muted-foreground shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={placeholder}
                  className="flex-1 bg-transparent py-3 px-2 text-sm outline-none placeholder:text-muted-foreground"
                  autoFocus
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>
              {children}
            </div>
          </div>
        )}
      </SearchPanelContext.Provider>
    )
  }

  // Default variants
  return (
    <SearchPanelContext.Provider value={contextValue}>
      <div
        className={cn(searchPanelVariants({ variant, size }), className)}
        {...props}
      >
        {/* Scoped tabs */}
        {variant === "scoped" && scopes.length > 0 && (
          <div className="flex items-center gap-1 border-b px-3 py-2">
            {scopes.map((scope) => (
              <button
                key={scope.id}
                type="button"
                onClick={() => setActiveScope(scope.id)}
                className={cn(
                  "px-3 py-1 text-sm rounded-md transition-colors cursor-pointer",
                  activeScope === scope.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {scope.label}
              </button>
            ))}
          </div>
        )}

        {/* Search input */}
        <div className="flex items-center px-3">
          <Search className="size-4 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className="flex-1 bg-transparent py-3 px-2 text-sm outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Results area */}
        {children}
      </div>
    </SearchPanelContext.Provider>
  )
}

/* -------------------------------------------------------------------------------------------------
 * SearchPanelResults (Instant Search)
 * -------------------------------------------------------------------------------------------------*/

interface SearchPanelResultsProps
  extends Omit<React.ComponentProps<"div">, "results" | "onSelect"> {
  results?: SearchResult[]
  loading?: boolean
  emptyMessage?: string
  onSelect?: (result: SearchResult) => void
}

function SearchPanelResults({
  className,
  results = [],
  loading = false,
  emptyMessage = "No results found",
  onSelect,
  ...props
}: SearchPanelResultsProps) {
  const { query } = useSearchPanel()

  if (!query && results.length === 0) return null

  return (
    <div
      className={cn("border-t max-h-80 overflow-y-auto", className)}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
          <div className="size-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
          Searching...
        </div>
      ) : results.length === 0 ? (
        <div className="py-6 text-center text-sm text-muted-foreground">
          {emptyMessage}
        </div>
      ) : (
        <ul className="py-2">
          {results.map((result) => (
            <li key={result.id}>
              <button
                type="button"
                onClick={() => onSelect?.(result)}
                className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-accent cursor-pointer transition-colors"
              >
                {result.icon || (
                  <FileText className="size-4 text-muted-foreground shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {result.title}
                  </div>
                  {result.description && (
                    <div className="text-xs text-muted-foreground truncate">
                      {result.description}
                    </div>
                  )}
                </div>
                {result.category && (
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                    {result.category}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
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
  onSelect?: (result: SearchResult) => void
}

function SearchPanelSuggestions({
  className,
  recent = [],
  trending = [],
  suggested = [],
  onSelect,
  ...props
}: SearchPanelSuggestionsProps) {
  const { query } = useSearchPanel()

  // Hide suggestions when there's a query
  if (query) return null

  const hasContent =
    recent.length > 0 || trending.length > 0 || suggested.length > 0
  if (!hasContent) return null

  return (
    <div
      className={cn("border-t max-h-80 overflow-y-auto", className)}
      {...props}
    >
      {recent.length > 0 && (
        <div className="py-2">
          <div className="flex items-center gap-2 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Clock className="size-3" />
            Recent
          </div>
          <ul>
            {recent.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onSelect?.(item)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-accent cursor-pointer transition-colors"
                >
                  <span className="text-sm">{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {trending.length > 0 && (
        <div className="py-2 border-t">
          <div className="flex items-center gap-2 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Flame className="size-3" />
            Trending
          </div>
          <ul>
            {trending.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onSelect?.(item)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-accent cursor-pointer transition-colors"
                >
                  <span className="text-sm">{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {suggested.length > 0 && (
        <div className="py-2 border-t">
          <div className="flex items-center gap-2 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3" />
            Suggested for you
          </div>
          <ul>
            {suggested.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onSelect?.(item)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-accent cursor-pointer transition-colors"
                >
                  {item.icon || <Hash className="size-4 text-muted-foreground" />}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate">{item.title}</div>
                    {item.description && (
                      <div className="text-xs text-muted-foreground truncate">
                        {item.description}
                      </div>
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------------------------------
 * SearchPanelFederated (Multi-source)
 * -------------------------------------------------------------------------------------------------*/

interface SearchPanelFederatedProps
  extends Omit<React.ComponentProps<"div">, "onSelect"> {
  sources?: SearchSource[]
  loading?: boolean
  onSelect?: (result: SearchResult, source: SearchSource) => void
}

function SearchPanelFederated({
  className,
  sources = [],
  loading = false,
  onSelect,
  ...props
}: SearchPanelFederatedProps) {
  const { query } = useSearchPanel()

  if (!query) return null

  const sourceIcons: Record<string, React.ReactNode> = {
    components: <Folder className="size-4" />,
    docs: <FileText className="size-4" />,
    github: <Github className="size-4" />,
    slack: <MessageSquare className="size-4" />,
  }

  return (
    <div
      className={cn("border-t max-h-96 overflow-y-auto", className)}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
          <div className="size-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
          Searching across sources...
        </div>
      ) : sources.length === 0 ? (
        <div className="py-6 text-center text-sm text-muted-foreground">
          No results found
        </div>
      ) : (
        sources.map((source) => (
          <div key={source.id} className="py-2 border-b last:border-b-0">
            <div className="flex items-center gap-2 px-3 py-1 text-xs font-medium text-muted-foreground">
              {source.icon || sourceIcons[source.id] || (
                <Filter className="size-3" />
              )}
              {source.name}
            </div>
            {source.results.length === 0 ? (
              <div className="px-3 py-2 text-xs text-muted-foreground">
                No results
              </div>
            ) : (
              <ul>
                {source.results.slice(0, 3).map((result) => (
                  <li key={result.id}>
                    <button
                      type="button"
                      onClick={() => onSelect?.(result, source)}
                      className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-accent cursor-pointer transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-sm truncate">{result.title}</div>
                        {result.description && (
                          <div className="text-xs text-muted-foreground truncate">
                            {result.description}
                          </div>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
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
  action: () => void
}

interface SearchPanelCommandsProps
  extends Omit<React.ComponentProps<"div">, "results" | "onSelect"> {
  commands?: SearchPanelCommand[]
  results?: SearchResult[]
  onSelect?: (result: SearchResult) => void
}

function SearchPanelCommands({
  className,
  commands = [],
  results = [],
  onSelect,
  ...props
}: SearchPanelCommandsProps) {
  const { query, setIsOpen } = useSearchPanel()

  // Filter commands by query
  const filteredCommands = React.useMemo(() => {
    if (!query.startsWith(">")) return []
    const cmdQuery = query.slice(1).trim().toLowerCase()
    if (!cmdQuery) return commands
    return commands.filter(
      (cmd) =>
        cmd.title.toLowerCase().includes(cmdQuery) ||
        cmd.description?.toLowerCase().includes(cmdQuery)
    )
  }, [query, commands])

  const showCommands = query.startsWith(">")
  const showResults = !showCommands && query.length > 0 && results.length > 0

  if (!showCommands && !showResults && !query) {
    return (
      <div className={cn("border-t py-4", className)} {...props}>
        <div className="px-3 text-xs text-muted-foreground">
          Type to search or use{" "}
          <kbd className="px-1 py-0.5 bg-muted rounded text-[10px]">&gt;</kbd>{" "}
          for commands
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn("border-t max-h-80 overflow-y-auto", className)}
      {...props}
    >
      {showCommands && (
        <ul className="py-2">
          {filteredCommands.length === 0 ? (
            <li className="px-3 py-2 text-sm text-muted-foreground">
              No commands found
            </li>
          ) : (
            filteredCommands.map((cmd) => (
              <li key={cmd.id}>
                <button
                  type="button"
                  onClick={() => {
                    cmd.action()
                    setIsOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-accent cursor-pointer transition-colors"
                >
                  {cmd.icon || <Command className="size-4 text-muted-foreground" />}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{cmd.title}</div>
                    {cmd.description && (
                      <div className="text-xs text-muted-foreground">
                        {cmd.description}
                      </div>
                    )}
                  </div>
                  {cmd.shortcut && (
                    <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">
                      {cmd.shortcut}
                    </kbd>
                  )}
                </button>
              </li>
            ))
          )}
        </ul>
      )}

      {showResults && (
        <ul className="py-2">
          {results.map((result) => (
            <li key={result.id}>
              <button
                type="button"
                onClick={() => {
                  onSelect?.(result)
                  setIsOpen(false)
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-accent cursor-pointer transition-colors"
              >
                {result.icon || (
                  <FileText className="size-4 text-muted-foreground" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{result.title}</div>
                  {result.description && (
                    <div className="text-xs text-muted-foreground truncate">
                      {result.description}
                    </div>
                  )}
                </div>
                {result.category && (
                  <span className="text-xs text-muted-foreground">
                    {result.category}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}

      {!showCommands && !showResults && query && (
        <div className="py-6 text-center text-sm text-muted-foreground">
          No results for "{query}"
        </div>
      )}
    </div>
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
