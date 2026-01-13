import { CodeBlock } from "@/components/docs/code-block"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPreview } from "@/components/docs/docs-preview"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { DocsSection } from "@/components/docs/docs-section"
import { InstallCommand } from "@/components/docs/install-command"

import { SearchPanelDemo } from "./search-panel-demo"

export const metadata = {
  title: "Search Panel",
  description:
    "Versatile search component with 5 variants: instant search, command palette, scoped search, contextual suggestions, and federated multi-source search.",
}

export default function SearchPanelPage() {
  return (
    <div className="space-y-8">
      <DocsPageNav title="Search Panel" />

      <p className="text-muted-foreground">
        A flexible search component with 5 different search patterns. Choose the
        variant that best fits your use case: live instant search, command
        palette (⌘K), scoped search with filters, contextual suggestions, or
        federated multi-source search.
      </p>

      <DocsPreview description="Interactive demo showcasing all 5 search variants.">
        <SearchPanelDemo />
      </DocsPreview>

      <DocsSection id="installation" title="Installation">
        <InstallCommand packageName="@gooseui/search-panel" />
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <CodeBlock>{`import {
  SearchPanel,
  SearchPanelResults,
  SearchPanelSuggestions,
  SearchPanelFederated,
  SearchPanelCommands,
} from "@/components/ui/search-panel"

export default function MySearch() {
  const [results, setResults] = useState([])

  return (
    <SearchPanel
      variant="instant"
      placeholder="Search components..."
      onQueryChange={(query) => {
        // Fetch results based on query
        setResults(searchData(query))
      }}
    >
      <SearchPanelResults
        results={results}
        onSelect={(result) => console.log(result)}
      />
    </SearchPanel>
  )
}`}</CodeBlock>
      </DocsSection>

      <DocsSection id="variants" title="Variants">
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-3">1. Instant Search</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Results appear as you type with configurable debounce. Best for
              quick lookups and autocomplete.
            </p>
            <CodeBlock>{`<SearchPanel variant="instant" debounce={150}>
  <SearchPanelResults results={results} />
</SearchPanel>`}</CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">2. Command Palette</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Modal search triggered by ⌘K (Ctrl+K). Supports both search and
              commands with &gt; prefix.
            </p>
            <CodeBlock>{`<SearchPanel variant="command" placeholder="Search or type > for commands">
  <SearchPanelCommands
    commands={[
      { id: "theme", title: "Toggle theme", action: () => toggleTheme() },
      { id: "settings", title: "Open settings", shortcut: "⌘," },
    ]}
    results={results}
  />
</SearchPanel>`}</CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">3. Scoped Search</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Search with tabs/filters to narrow down results by category.
            </p>
            <CodeBlock>{`<SearchPanel
  variant="scoped"
  scopes={[
    { id: "all", label: "All" },
    { id: "docs", label: "Docs" },
    { id: "code", label: "Code" },
  ]}
  defaultScope="all"
>
  <SearchPanelResults results={filteredResults} />
</SearchPanel>`}</CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">
              4. Contextual Suggestions
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Shows recent searches, trending items, and personalized
              suggestions before typing.
            </p>
            <CodeBlock>{`<SearchPanel variant="contextual">
  <SearchPanelSuggestions
    recent={[{ id: "1", title: "carousel" }]}
    trending={[{ id: "2", title: "button" }]}
    suggested={[{ id: "3", title: "Based on your history..." }]}
  />
  <SearchPanelResults results={results} />
</SearchPanel>`}</CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">5. Federated Search</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Search across multiple sources simultaneously with grouped
              results.
            </p>
            <CodeBlock>{`<SearchPanel variant="federated">
  <SearchPanelFederated
    sources={[
      { id: "components", name: "Components", results: [...] },
      { id: "docs", name: "Documentation", results: [...] },
      { id: "github", name: "GitHub Issues", results: [...] },
    ]}
    onSelect={(result, source) => console.log(result, source)}
  />
</SearchPanel>`}</CodeBlock>
          </div>
        </div>
      </DocsSection>

      <DocsSection id="props" title="Props">
        <h3 className="text-base font-medium mb-3">SearchPanel</h3>
        <DocsPropsTable
          props={[
            {
              name: "variant",
              type: '"instant" | "command" | "scoped" | "contextual" | "federated"',
              default: '"instant"',
              description: "Search pattern variant",
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg" | "xl" | "full"',
              default: '"md"',
              description: "Panel width",
            },
            {
              name: "placeholder",
              type: "string",
              default: '"Search..."',
              description: "Input placeholder text",
            },
            {
              name: "debounce",
              type: "number",
              default: "150",
              description: "Debounce delay in ms (instant variant)",
            },
            {
              name: "scopes",
              type: "{ id: string; label: string }[]",
              description: "Available scopes (scoped variant)",
            },
            {
              name: "onQueryChange",
              type: "(query: string) => void",
              description: "Callback when search query changes",
            },
          ]}
        />

        <h3 className="text-base font-medium mb-3 mt-8">SearchPanelResults</h3>
        <DocsPropsTable
          props={[
            {
              name: "results",
              type: "SearchResult[]",
              default: "[]",
              description: "Array of search results",
            },
            {
              name: "loading",
              type: "boolean",
              default: "false",
              description: "Show loading state",
            },
            {
              name: "emptyMessage",
              type: "string",
              default: '"No results found"',
              description: "Message when no results",
            },
            {
              name: "onSelect",
              type: "(result: SearchResult) => void",
              description: "Callback when result is selected",
            },
          ]}
        />

        <h3 className="text-base font-medium mb-3 mt-8">SearchResult Type</h3>
        <CodeBlock>{`interface SearchResult {
  id: string
  title: string
  description?: string
  category?: string
  icon?: React.ReactNode
  href?: string
  keywords?: string[]
}`}</CodeBlock>
      </DocsSection>

      <DocsSection id="features" title="Features">
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">5 Search Patterns</strong> —
            instant, command palette, scoped, contextual, federated
          </li>
          <li>
            <strong className="text-foreground">Keyboard Navigation</strong> —
            ⌘K shortcut for command palette, arrow keys for results
          </li>
          <li>
            <strong className="text-foreground">Debounced Input</strong> —
            configurable delay for instant search
          </li>
          <li>
            <strong className="text-foreground">Multi-Source</strong> — search
            across multiple data sources simultaneously
          </li>
          <li>
            <strong className="text-foreground">Contextual</strong> — shows
            recent, trending, and personalized suggestions
          </li>
          <li>
            <strong className="text-foreground">Accessible</strong> — proper
            ARIA attributes and keyboard support
          </li>
        </ul>
      </DocsSection>
    </div>
  )
}
