import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPreview } from "@/components/docs/docs-preview"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { DocsSection } from "@/components/docs/docs-section"
import { InstallCommand } from "@/components/docs/install-command"
import { type Dict, pick } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  docsNavigation,
  filterDraftItems,
  navTitle,
} from "@/lib/config/docs-navigation"
import { type CatalogItem, SearchPanelDemo } from "./search-panel-demo"

const en = {
  preview: "Preview",
  auditFeature0Description: "Displays the modal dialog",
  auditFeature1Description: "Styles the search dialog backdrop",
  description:
    "Versatile search component with 5 variants: instant search, command palette, scoped search, contextual suggestions, and federated multi-source search.",
  aFlexibleSearchComponent:
    "A flexible search component with 5 different search patterns. Choose the variant that best fits your use case: live instant search, command palette (⌘K), scoped search with filters, contextual suggestions, or federated multi-source search. It is a client component: React keeps the query and calls onQueryChange. The command palette is a native <dialog>, so Escape, the focus trap and the backdrop come from the browser. Icons are inline SVG, there are no dependencies besides React.",
  browserSupport: "Browser Support",
  supportDescription: "Opens the search panel as a modal.",
  browserSupportText:
    "The command palette opens with showModal() on a native <dialog>. Everything else is regular HTML with React state.",
  interactiveDemo: "Interactive demo showcasing all 5 search variants.",
  installation: "Installation",
  usage: "Usage",
  variants: "Variants",
  n1InstantSearch: "1. Instant Search",
  resultsAppearAsYouType:
    "Results appear as you type with configurable debounce. Best for quick lookups and autocomplete.",
  n2CommandPalette: "2. Command Palette",
  modalSearchTriggeredByK:
    "Modal search triggered by ⌘K (Ctrl+K). Supports both search and commands with > prefix.",
  n3ScopedSearch: "3. Scoped Search",
  searchWithTabsFiltersTo:
    "Search with tabs/filters to narrow down results by category.",
  n4ContextualSuggestions: "4. Contextual Suggestions",
  showsRecentSearches:
    "Shows recent searches, trending items, and personalized suggestions before typing.",
  n5FederatedSearch: "5. Federated Search",
  searchAcrossMultiple:
    "Search across multiple sources simultaneously with grouped results.",
  props: "Props",
  searchPatternVariant: "Search pattern variant",
  panelWidth: "Panel width",
  inputPlaceholderText: "Input placeholder text",
  debounceDelayInMsInstant: "Debounce delay in ms (instant variant)",
  availableScopesScoped: "Available scopes (scoped variant)",
  callbackWhenSearchQuery: "Callback when search query changes",
  arrayOfSearchResults: "Array of search results",
  showLoadingState: "Show loading state",
  messageWhenNoResults: "Message when no results",
  callbackWhenResultIs: "Callback when result is selected",
  triggerLabelText: "Text of the command palette trigger",
  openText: "Controlled open state of the command palette",
  onOpenChangeText: "Called when the command palette opens or closes",
  hotkeyText:
    "Cmd/Ctrl+K toggles the palette, false leaves the shortcut to you",
  triggerText: "Replaces the built-in trigger button, null renders none",
  clearLabelText: "Accessible name of the clear button",
  defaultResultsText:
    "Groups of results shown while the query is empty, so users see what to type",
  onScopeChangeText: "Callback when the active scope changes",
  commandLabelsText:
    "Footer and group texts of the palette (hint, hintSuffix, commands, navigate, open, close, noCommands)",
  loadingMessageText: "Text next to the spinner",
  searchresultType: "SearchResult Type",
  features: "Features",
  n5SearchPatterns: "5 Search Patterns",
  instantCommandPalette:
    " — instant, command palette, scoped, contextual, federated",
  keyboardNavigationK: (
    <>
      <strong className="text-foreground">Keyboard Navigation</strong> — ⌘K
      opens the command palette, Tab moves through results, Escape closes
    </>
  ),
  debouncedInput: "Debounced Input",
  configurableDelayFor: " — configurable delay for instant search",
  multiSource: "Multi-Source",
  searchAcrossMultipleData:
    " — search across multiple data sources simultaneously",
  contextual: "Contextual",
  showsRecentTrendingAnd:
    " — shows recent, trending, and personalized suggestions",
  accessible: "Accessible",
  properAriaAttributesAnd: " — proper ARIA attributes and keyboard support",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    preview: "Превью",
    auditFeature0Description: "Показывает модальное окно",
    auditFeature1Description: "Оформляет подложку диалога поиска",
    description:
      "Универсальный компонент поиска в 5 вариантах: мгновенный поиск, палитра команд, поиск по разделам, контекстные подсказки и федеративный поиск по нескольким источникам.",
    aFlexibleSearchComponent:
      "Гибкий компонент поиска с 5 паттернами. Выберите вариант под свою задачу: мгновенный поиск по мере ввода, палитра команд (⌘K), поиск по разделам с фильтрами, контекстные подсказки или федеративный поиск по нескольким источникам. Это клиентский компонент: запрос хранит React и передаёт его в onQueryChange. Палитра команд сделана на нативном <dialog>, поэтому Escape, удержание фокуса и затемнение фона даёт браузер. Иконки встроены как SVG, зависимостей, кроме React, нет.",
    browserSupport: "Поддержка браузеров",
    supportDescription: "Открывает панель поиска в модальном окне.",
    browserSupportText:
      "Палитра команд открывается через showModal() у нативного <dialog>. Всё остальное обычный HTML и состояние React.",
    interactiveDemo: "Интерактивное демо всех 5 вариантов поиска.",
    installation: "Установка",
    usage: "Использование",
    variants: "Варианты",
    n1InstantSearch: "1. Мгновенный поиск",
    resultsAppearAsYouType:
      "Результаты появляются по мере ввода, debounce настраивается. Подходит для быстрого поиска и автодополнения.",
    n2CommandPalette: "2. Палитра команд",
    modalSearchTriggeredByK:
      "Модальный поиск по ⌘K (Ctrl+K). Ищет и выполняет команды с префиксом >.",
    n3ScopedSearch: "3. Поиск по разделам",
    searchWithTabsFiltersTo:
      "Поиск с вкладками и фильтрами: результаты сужаются по категории.",
    n4ContextualSuggestions: "4. Контекстные подсказки",
    showsRecentSearches:
      "До ввода запроса показывает недавние запросы, популярное и персональные подсказки.",
    n5FederatedSearch: "5. Федеративный поиск",
    searchAcrossMultiple:
      "Поиск сразу по нескольким источникам, результаты сгруппированы.",
    props: "Пропсы",
    searchPatternVariant: "Вариант паттерна поиска",
    panelWidth: "Ширина панели",
    inputPlaceholderText: "Текст плейсхолдера в поле ввода",
    debounceDelayInMsInstant: "Задержка debounce в мс (вариант instant)",
    availableScopesScoped: "Доступные разделы (вариант scoped)",
    callbackWhenSearchQuery: "Колбэк при изменении запроса",
    arrayOfSearchResults: "Массив результатов поиска",
    showLoadingState: "Показывать состояние загрузки",
    messageWhenNoResults: "Сообщение, если результатов нет",
    callbackWhenResultIs: "Колбэк при выборе результата",
    triggerLabelText: "Текст кнопки, открывающей палитру команд",
    openText: "Управляемое состояние открытия палитры команд",
    onOpenChangeText: "Вызывается, когда палитра открывается или закрывается",
    hotkeyText: "⌘/Ctrl+K переключает палитру, false оставляет сочетание вам",
    triggerText: "Заменяет встроенную кнопку, null не рисует кнопку вовсе",
    clearLabelText: "Доступное имя кнопки очистки",
    defaultResultsText:
      "Группы результатов до ввода запроса: пользователь сразу видит, что искать",
    onScopeChangeText: "Колбэк при смене активного раздела",
    commandLabelsText:
      "Тексты подвала и групп палитры (hint, hintSuffix, commands, navigate, open, close, noCommands)",
    loadingMessageText: "Текст рядом со спиннером",
    searchresultType: "Тип SearchResult",
    features: "Возможности",
    n5SearchPatterns: "5 паттернов поиска",
    instantCommandPalette:
      ": instant, палитра команд, scoped, contextual, federated",
    keyboardNavigationK: (
      <>
        <strong className="text-foreground">Навигация с клавиатуры</strong>: ⌘K
        открывает палитру команд, Tab переходит по результатам, Escape закрывает
      </>
    ),
    debouncedInput: "Debounce при вводе",
    configurableDelayFor: ": настраиваемая задержка для мгновенного поиска",
    multiSource: "Несколько источников",
    searchAcrossMultipleData: ": поиск сразу по нескольким источникам данных",
    contextual: "Контекстность",
    showsRecentTrendingAnd: ": недавние, популярные и персональные подсказки",
    accessible: "Доступность",
    properAriaAttributesAnd:
      ": корректные ARIA-атрибуты и поддержка клавиатуры",
  },
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return {
    title: "Search Panel",
    description: t.description,
  }
}

export default async function SearchPanelPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]

  // Real catalog of the site in the current language: the demo searches it
  const catalog: CatalogItem[] = filterDraftItems(docsNavigation)
    .filter((section) =>
      ["getting-started", "components", "effects", "hooks"].includes(
        section.slug,
      ),
    )
    .flatMap((section) =>
      section.items
        .filter((item) => !item.isComingSoon && item.slug !== "search-panel")
        .map((item) => ({
          slug: item.slug,
          title: navTitle(item, locale),
          description: item.description ? pick(item.description, locale) : "",
          section: section.slug === "getting-started" ? "docs" : section.slug,
          sectionTitle: pick(section.title, locale),
          href: item.href,
          keywords: item.keywords ?? [],
        })),
    )

  const toc = [
    { id: "browser-support", title: t.browserSupport, level: 2 },
    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "variants", title: t.variants, level: 2 },
    { id: "props", title: t.props, level: 2 },
    { id: "features", title: t.features, level: 2 },
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Search Panel" />

        <p className="text-muted-foreground">{t.aFlexibleSearchComponent}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "dialog",
              description: t.auditFeature0Description,
            },
            {
              featureId: "backdrop",
              description: t.auditFeature1Description,
            },
          ]}
        />

        <DocsPreview description={t.interactiveDemo}>
          <SearchPanelDemo catalog={catalog} />
        </DocsPreview>

        <DocsSection id="installation" title={t.installation}>
          <InstallCommand packageName="@gooseui/search-panel" />
        </DocsSection>

        <DocsSection id="usage" title={t.usage}>
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
        defaultResults={[
          { label: "Popular", items: [{ id: "1", title: "Button" }] },
          { label: "Recent", items: [{ id: "2", title: "carousel", query: "carousel" }] },
        ]}
        onSelect={(result) => console.log(result)}
      />
    </SearchPanel>
  )
}`}</CodeBlock>
        </DocsSection>

        <DocsSection id="variants" title={t.variants}>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.n1InstantSearch}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.resultsAppearAsYouType}
              </p>
              <CodeBlock>{`<SearchPanel variant="instant" debounce={150}>
  <SearchPanelResults results={results} />
</SearchPanel>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.n2CommandPalette}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.modalSearchTriggeredByK}
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
              <h3 className="text-lg font-medium mb-3">{t.n3ScopedSearch}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.searchWithTabsFiltersTo}
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
                {t.n4ContextualSuggestions}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.showsRecentSearches}
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
              <h3 className="text-lg font-medium mb-3">
                {t.n5FederatedSearch}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.searchAcrossMultiple}
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

        <DocsSection id="props" title={t.props}>
          <h3 className="text-base font-medium mb-3">SearchPanel</h3>
          <DocsPropsTable
            props={[
              {
                name: "variant",
                type: '"instant" | "command" | "scoped" | "contextual" | "federated"',
                default: '"instant"',
                description: t.searchPatternVariant,
              },
              {
                name: "size",
                type: '"sm" | "md" | "lg" | "xl" | "full"',
                default: '"md"',
                description: t.panelWidth,
              },
              {
                name: "placeholder",
                type: "string",
                default: '"Search..."',
                description: t.inputPlaceholderText,
              },
              {
                name: "debounce",
                type: "number",
                default: "150",
                description: t.debounceDelayInMsInstant,
              },
              {
                name: "scopes",
                type: "{ id: string; label: string }[]",
                description: t.availableScopesScoped,
              },
              {
                name: "onScopeChange",
                type: "(scope: string) => void",
                description: t.onScopeChangeText,
              },
              {
                name: "onQueryChange",
                type: "(query: string) => void",
                description: t.callbackWhenSearchQuery,
              },
              {
                name: "triggerLabel",
                type: "string",
                default: '"Search..."',
                description: t.triggerLabelText,
              },
              {
                name: "clearLabel",
                type: "string",
                default: '"Clear search"',
                description: t.clearLabelText,
              },
              {
                name: "open",
                type: "boolean",
                description: t.openText,
              },
              {
                name: "onOpenChange",
                type: "(open: boolean) => void",
                description: t.onOpenChangeText,
              },
              {
                name: "hotkey",
                type: "boolean",
                default: "true",
                description: t.hotkeyText,
              },
              {
                name: "trigger",
                type: "ReactNode | null",
                description: t.triggerText,
              },
            ]}
          />

          <h3 className="text-base font-medium mb-3 mt-8">
            SearchPanelResults
          </h3>
          <DocsPropsTable
            props={[
              {
                name: "results",
                type: "SearchResult[]",
                default: "[]",
                description: t.arrayOfSearchResults,
              },
              {
                name: "loading",
                type: "boolean",
                default: "false",
                description: t.showLoadingState,
              },
              {
                name: "defaultResults",
                type: "SearchResultGroup[]",
                default: "[]",
                description: t.defaultResultsText,
              },
              {
                name: "emptyMessage",
                type: "string",
                default: '"No results found"',
                description: t.messageWhenNoResults,
              },
              {
                name: "loadingMessage",
                type: "string",
                default: '"Searching..."',
                description: t.loadingMessageText,
              },
              {
                name: "onSelect",
                type: "(result: SearchResult) => void",
                description: t.callbackWhenResultIs,
              },
            ]}
          />

          <h3 className="text-base font-medium mb-3 mt-8">
            SearchPanelCommands / SearchPanelFederated
          </h3>
          <DocsPropsTable
            props={[
              {
                name: "defaultResults",
                type: "SearchResultGroup[]",
                default: "[]",
                description: t.defaultResultsText,
              },
              {
                name: "labels",
                type: "{ hint?, hintSuffix?, commands?, navigate?, open?, close?, noCommands? }",
                description: t.commandLabelsText,
              },
            ]}
          />

          <h3 className="text-base font-medium mb-3 mt-8">
            {t.searchresultType}
          </h3>
          <CodeBlock>{`interface SearchResult {
  id: string
  title: string
  description?: string
  category?: string
  icon?: React.ReactNode
  href?: string
  keywords?: string[]
  query?: string // puts the text into the input on select
}

interface SearchResultGroup {
  id?: string
  label: string
  icon?: React.ReactNode
  items: SearchResult[]
}`}</CodeBlock>
        </DocsSection>

        <DocsSection id="features" title={t.features}>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <strong className="text-foreground">{t.n5SearchPatterns}</strong>
              {t.instantCommandPalette}
            </li>
            <li>{t.keyboardNavigationK}</li>
            <li>
              <strong className="text-foreground">{t.debouncedInput}</strong>
              {t.configurableDelayFor}
            </li>
            <li>
              <strong className="text-foreground">{t.multiSource}</strong>
              {t.searchAcrossMultipleData}
            </li>
            <li>
              <strong className="text-foreground">{t.contextual}</strong>
              {t.showsRecentTrendingAnd}
            </li>
            <li>
              <strong className="text-foreground">{t.accessible}</strong>
              {t.properAriaAttributesAnd}
            </li>
          </ul>
        </DocsSection>
      </div>
    </DocsPage>
  )
}
