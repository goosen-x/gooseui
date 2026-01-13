"use client"

import {
  FileText,
  Folder,
  Github,
  MessageSquare,
  Moon,
  Settings,
  Sun,
} from "lucide-react"
import * as React from "react"

import {
  SearchPanel,
  SearchPanelCommands,
  SearchPanelFederated,
  SearchPanelResults,
  SearchPanelSuggestions,
  type SearchResult,
  type SearchSource,
} from "@/registry/new-york/ui/search-panel"

// Sample data
const sampleResults: SearchResult[] = [
  {
    id: "1",
    title: "Button",
    description: "Button with various variants and sizes",
    category: "component",
    icon: <Folder className="size-4 text-blue-500" />,
  },
  {
    id: "2",
    title: "Carousel",
    description: "Image and content carousel slider",
    category: "component",
    icon: <Folder className="size-4 text-blue-500" />,
  },
  {
    id: "3",
    title: "Input",
    description: "Text input field component",
    category: "component",
    icon: <Folder className="size-4 text-blue-500" />,
  },
  {
    id: "4",
    title: "Card",
    description: "Container for grouping content",
    category: "component",
    icon: <Folder className="size-4 text-blue-500" />,
  },
  {
    id: "5",
    title: "Toast",
    description: "Notification toast messages",
    category: "component",
    icon: <Folder className="size-4 text-blue-500" />,
  },
]

const recentItems: SearchResult[] = [
  { id: "r1", title: "carousel" },
  { id: "r2", title: "button" },
  { id: "r3", title: "theme customizer" },
]

const trendingItems: SearchResult[] = [
  { id: "t1", title: "morphing-dialog" },
  { id: "t2", title: "digital-clock" },
  { id: "t3", title: "promo-banner" },
]

const suggestedItems: SearchResult[] = [
  {
    id: "s1",
    title: "CarouselDots",
    description: "Based on: carousel.tsx",
    icon: <Folder className="size-4 text-purple-500" />,
  },
  {
    id: "s2",
    title: "CarouselNav",
    description: "Based on: carousel.tsx",
    icon: <Folder className="size-4 text-purple-500" />,
  },
]

const federatedSources: SearchSource[] = [
  {
    id: "components",
    name: "Components",
    icon: <Folder className="size-3" />,
    results: [
      { id: "f1", title: "Button", description: "Primary action button" },
      { id: "f2", title: "ButtonGroup", description: "Group of buttons" },
    ],
  },
  {
    id: "docs",
    name: "Documentation",
    icon: <FileText className="size-3" />,
    results: [
      {
        id: "f3",
        title: "Getting Started",
        description: "Installation guide...",
      },
      { id: "f4", title: "Theming", description: "Customize colors and..." },
    ],
  },
  {
    id: "github",
    name: "GitHub Issues",
    icon: <Github className="size-3" />,
    results: [
      {
        id: "f5",
        title: "#142: Button variant bug",
        description: "Fixed in...",
      },
    ],
  },
  {
    id: "slack",
    name: "Slack",
    icon: <MessageSquare className="size-3" />,
    results: [
      {
        id: "f6",
        title: "Check the button docs",
        description: "@john in #dev",
      },
    ],
  },
]

const commands = [
  {
    id: "theme-dark",
    title: "Set theme to dark",
    description: "Switch to dark mode",
    icon: <Moon className="size-4" />,
    action: () => alert("Theme set to dark"),
  },
  {
    id: "theme-light",
    title: "Set theme to light",
    description: "Switch to light mode",
    icon: <Sun className="size-4" />,
    action: () => alert("Theme set to light"),
  },
  {
    id: "settings",
    title: "Open settings",
    description: "Configure application settings",
    icon: <Settings className="size-4" />,
    shortcut: "⌘,",
    action: () => alert("Opening settings..."),
  },
]

export function SearchPanelDemo() {
  const [variant, setVariant] = React.useState<
    "instant" | "command" | "scoped" | "contextual" | "federated"
  >("instant")
  const [results, setResults] = React.useState<SearchResult[]>([])
  const [loading, setLoading] = React.useState(false)
  const [activeScope, setActiveScope] = React.useState("all")

  const handleSearch = React.useCallback(
    (query: string) => {
      if (!query) {
        setResults([])
        return
      }

      setLoading(true)

      // Simulate API delay
      setTimeout(() => {
        const filtered = sampleResults.filter(
          (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description?.toLowerCase().includes(query.toLowerCase()),
        )

        // Apply scope filter for scoped variant
        if (variant === "scoped" && activeScope !== "all") {
          // In real app, filter by scope
        }

        setResults(filtered)
        setLoading(false)
      }, 300)
    },
    [variant, activeScope],
  )

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      {/* Variant selector */}
      <div className="flex flex-wrap gap-2 justify-center">
        {(
          ["instant", "command", "scoped", "contextual", "federated"] as const
        ).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => {
              setVariant(v)
              setResults([])
            }}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors cursor-pointer ${
              variant === v
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>

      {/* Search panels */}
      <div className="min-h-[20rem]">
        {variant === "instant" && (
          <SearchPanel
            variant="instant"
            placeholder="Search components..."
            onQueryChange={handleSearch}
            size="full"
          >
            <SearchPanelResults
              results={results}
              loading={loading}
              onSelect={(r) => alert(`Selected: ${r.title}`)}
            />
          </SearchPanel>
        )}

        {variant === "command" && (
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Click the button or press{" "}
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">⌘K</kbd>
            </p>
            <SearchPanel
              variant="command"
              placeholder="Search or type > for commands..."
              onQueryChange={handleSearch}
              size="lg"
            >
              <SearchPanelCommands
                commands={commands}
                results={results}
                onSelect={(r) => alert(`Selected: ${r.title}`)}
              />
            </SearchPanel>
          </div>
        )}

        {variant === "scoped" && (
          <SearchPanel
            variant="scoped"
            placeholder="Search..."
            scopes={[
              { id: "all", label: "All" },
              { id: "docs", label: "Docs" },
              { id: "code", label: "Code" },
              { id: "issues", label: "Issues" },
            ]}
            defaultScope="all"
            onQueryChange={handleSearch}
            size="full"
          >
            <SearchPanelResults
              results={results}
              loading={loading}
              onSelect={(r) => alert(`Selected: ${r.title}`)}
            />
          </SearchPanel>
        )}

        {variant === "contextual" && (
          <SearchPanel
            variant="contextual"
            placeholder="Search..."
            onQueryChange={handleSearch}
            size="full"
          >
            <SearchPanelSuggestions
              recent={recentItems}
              trending={trendingItems}
              suggested={suggestedItems}
              onSelect={(r) => alert(`Selected: ${r.title}`)}
            />
            <SearchPanelResults
              results={results}
              loading={loading}
              onSelect={(r) => alert(`Selected: ${r.title}`)}
            />
          </SearchPanel>
        )}

        {variant === "federated" && (
          <SearchPanel
            variant="federated"
            placeholder="Search across all sources..."
            onQueryChange={handleSearch}
            size="full"
          >
            <SearchPanelFederated
              sources={results.length > 0 ? federatedSources : []}
              loading={loading}
              onSelect={(r, s) => alert(`Selected: ${r.title} from ${s.name}`)}
            />
          </SearchPanel>
        )}
      </div>
    </div>
  )
}
