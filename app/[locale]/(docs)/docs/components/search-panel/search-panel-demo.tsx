"use client"

import {
  Clock,
  Flame,
  Github,
  Globe,
  Layers,
  Moon,
  Puzzle,
  Search,
  Sparkles,
  Webhook,
} from "lucide-react"
import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import { useRouter } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import { customToast } from "@/lib/toast"
import { Button } from "@/registry/gooseui/ui/button"
import {
  SearchPanel,
  SearchPanelCommands,
  SearchPanelFederated,
  SearchPanelResults,
  SearchPanelSuggestions,
  type SearchResult,
  type SearchResultGroup,
  type SearchSource,
} from "@/registry/gooseui/ui/search-panel"

/** Item of the real GooseUI catalog, built on the server for the current locale */
export interface CatalogItem {
  slug: string
  title: string
  description: string
  /** Section id: docs, components, effects, hooks */
  section: string
  /** Localized section name */
  sectionTitle: string
  href: string
  keywords: string[]
}

const en = {
  variants: {
    instant: "Instant",
    command: "Command",
    scoped: "Scoped",
    contextual: "Contextual",
    federated: "Federated",
  },
  popular: "Popular",
  recentQueries: "Recent searches",
  commands: "Commands",
  searchComponents: "Search GooseUI: carousel, button, hook…",
  commandPlaceholder: "For example: carousel, theme, hook",
  trigger: "Search…",
  pressHint: "Click the button to open the palette",
  scopedPlaceholder: "Search in the section…",
  contextualPlaceholder: "Search or pick a similar component…",
  federatedPlaceholder: "Search across all sources…",
  noResults: "Nothing found",
  examplesIn: (section: string) => `Examples in “${section}”`,
  similarTo: "Similar to Button",
  scopeComponents: "Components",
  scopeEffects: "Effects",
  scopeHooks: "Hooks",
  sourceDocs: "Documentation",
  sourceComponents: "Components",
  sourceEffects: "Effects",
  sourceHooks: "Hooks",
  cmdTheme: "Switch theme",
  cmdThemeDesc: "Toggle between light and dark",
  cmdThemeDone: "Theme switched",
  cmdLang: "Switch language",
  cmdLangDesc: "English ↔ Russian",
  cmdLangDone: "Language switched",
  cmdGithub: "Open GitHub",
  cmdGithubDesc: "GooseUI repository",
  cmdGithubDone: "Opening GitHub…",
  cmdThemeKeys: ["theme", "dark", "light"],
  cmdLangKeys: ["language", "locale", "russian"],
  cmdGithubKeys: ["github", "repo", "source"],
  labels: {
    hint: "Start with",
    hintSuffix: "for commands",
    noCommands: "No commands found",
    commands: "Commands",
    navigate: "navigate",
    open: "open",
    close: "close",
  },
  clearLabel: "Clear search",
  emptyMessage: "Nothing found",
  noResultsMessage: 'Nothing found for "{query}"',
  recent: ["carousel", "tooltip", "hook"],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    variants: {
      instant: "Мгновенный",
      command: "Команды",
      scoped: "По разделам",
      contextual: "Контекстный",
      federated: "Федеративный",
    },
    popular: "Популярное",
    recentQueries: "Недавние запросы",
    commands: "Команды",
    searchComponents: "Поиск по GooseUI: carousel, button, хук…",
    commandPlaceholder: "Например: carousel, тема, hook",
    trigger: "Поиск…",
    pressHint: "Нажмите кнопку, чтобы открыть палитру",
    scopedPlaceholder: "Поиск в разделе…",
    contextualPlaceholder: "Ищите или выберите похожий компонент…",
    federatedPlaceholder: "Поиск по всем источникам…",
    noResults: "Ничего не найдено",
    examplesIn: (section: string) => `Примеры в разделе «${section}»`,
    similarTo: "Похожие на Button",
    scopeComponents: "Компоненты",
    scopeEffects: "Эффекты",
    scopeHooks: "Хуки",
    sourceDocs: "Документация",
    sourceComponents: "Компоненты",
    sourceEffects: "Эффекты",
    sourceHooks: "Хуки",
    cmdTheme: "Сменить тему",
    cmdThemeDesc: "Переключить светлую и тёмную",
    cmdThemeDone: "Тема переключена",
    cmdLang: "Переключить язык",
    cmdLangDesc: "Русский ↔ английский",
    cmdLangDone: "Язык переключён",
    cmdGithub: "Открыть GitHub",
    cmdGithubDesc: "Репозиторий GooseUI",
    cmdGithubDone: "Открываем GitHub…",
    cmdThemeKeys: ["тема", "тему", "тёмная", "светлая", "theme"],
    cmdLangKeys: ["язык", "локаль", "английский", "language"],
    cmdGithubKeys: ["гитхаб", "репозиторий", "github"],
    labels: {
      hint: "Начните с",
      hintSuffix: "для команд",
      noCommands: "Команды не найдены",
      commands: "Команды",
      navigate: "выбрать",
      open: "открыть",
      close: "закрыть",
    },
    clearLabel: "Очистить поиск",
    emptyMessage: "Ничего не найдено",
    noResultsMessage: "Ничего не найдено по запросу «{query}»",
    recent: ["carousel", "tooltip", "хук"],
  },
}

type VariantId = keyof typeof en.variants
const VARIANTS: VariantId[] = [
  "instant",
  "command",
  "scoped",
  "contextual",
  "federated",
]

const POPULAR = [
  "button",
  "carousel",
  "morphing-dialog",
  "searchbar",
  "tabs",
  "marquee",
]
const SCOPE_EXAMPLES: Record<string, string[]> = {
  components: ["button", "carousel", "tabs"],
  effects: ["border-beam", "confetti", "glitch-text"],
  hooks: ["use-now", "use-copy-to-clipboard"],
}
const SIMILAR_TO_BUTTON = [
  "copy-button",
  "burger-button",
  "toggle",
  "theme-toggle",
]

function matches(item: CatalogItem, query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return [item.title, item.description, item.slug, ...item.keywords].some(
    (value) => value.toLowerCase().includes(q),
  )
}

export function SearchPanelDemo({ catalog }: { catalog: CatalogItem[] }) {
  const locale = useLocale() as Locale
  const t = content[locale]
  const router = useRouter()

  const [variant, setVariant] = React.useState<VariantId>("instant")
  const [query, setQuery] = React.useState("")
  const [scope, setScope] = React.useState("components")
  const [commandOpen, setCommandOpen] = React.useState(false)

  const bySlug = React.useMemo(
    () => new Map(catalog.map((item) => [item.slug, item])),
    [catalog],
  )

  const toResult = React.useCallback(
    (item: CatalogItem, withCategory = true): SearchResult => ({
      id: `${item.section}:${item.slug}`,
      title: item.title,
      description: item.description,
      category: withCategory ? item.sectionTitle : undefined,
      href: item.href,
    }),
    [],
  )
  const pickSlugs = React.useCallback(
    (slugs: string[], withCategory = true) =>
      slugs
        .map((slug) => bySlug.get(slug))
        .filter((item): item is CatalogItem => Boolean(item))
        .map((item) => toResult(item, withCategory)),
    [bySlug, toResult],
  )

  const open = React.useCallback(
    (result: SearchResult) => {
      if (result.href) router.push(result.href)
    },
    [router],
  )

  const search = React.useMemo(
    () =>
      query === "" || query.startsWith(">")
        ? []
        : catalog
            .filter((item) => matches(item, query))
            .map((i) => toResult(i)),
    [catalog, query, toResult],
  )

  const scopeSections: Record<string, string> = {
    components: t.scopeComponents,
    effects: t.scopeEffects,
    hooks: t.scopeHooks,
  }
  const scopedResults = React.useMemo(
    () =>
      query === ""
        ? []
        : catalog
            .filter((item) => item.section === scope && matches(item, query))
            .map((i) => toResult(i, false)),
    [catalog, query, scope, toResult],
  )

  const popularGroup: SearchResultGroup = {
    id: "popular",
    label: t.popular,
    icon: <Flame className="size-3" />,
    items: pickSlugs(POPULAR),
  }
  const recentGroup: SearchResultGroup = {
    id: "recent",
    label: t.recentQueries,
    icon: <Clock className="size-3" />,
    items: t.recent.map((text, i) => ({
      id: `recent-${i}`,
      title: text,
      query: text,
    })),
  }

  const commands = [
    {
      id: "theme",
      title: t.cmdTheme,
      description: t.cmdThemeDesc,
      icon: <Moon className="size-4" />,
      keywords: t.cmdThemeKeys,
      action: () => customToast.success(t.cmdThemeDone),
    },
    {
      id: "language",
      title: t.cmdLang,
      description: t.cmdLangDesc,
      icon: <Globe className="size-4" />,
      keywords: t.cmdLangKeys,
      action: () => customToast.success(t.cmdLangDone),
    },
    {
      id: "github",
      title: t.cmdGithub,
      description: t.cmdGithubDesc,
      icon: <Github className="size-4" />,
      keywords: t.cmdGithubKeys,
      action: () => customToast.info(t.cmdGithubDone),
    },
  ]

  const sectionNames: Record<string, string> = {
    docs: t.sourceDocs,
    components: t.sourceComponents,
    effects: t.sourceEffects,
    hooks: t.sourceHooks,
  }
  const sectionIcons: Record<string, React.ReactNode> = {
    docs: <Layers className="size-3" />,
    components: <Puzzle className="size-3" />,
    effects: <Sparkles className="size-3" />,
    hooks: <Webhook className="size-3" />,
  }
  const sources: SearchSource[] = Object.keys(sectionNames)
    .map((id) => ({
      id,
      name: sectionNames[id],
      icon: sectionIcons[id],
      results: catalog
        .filter((item) => item.section === id && matches(item, query))
        .map((i) => toResult(i, false)),
    }))
    .filter((source) => source.results.length > 0)
  const federatedDefaults: SearchResultGroup[] = Object.keys(sectionNames).map(
    (id) => ({
      id,
      label: sectionNames[id],
      icon: sectionIcons[id],
      items: catalog
        .filter((item) => item.section === id)
        .slice(0, id === "docs" ? 1 : 2)
        .map((item) => ({
          ...toResult(item, false),
          category: sectionNames[id],
        })),
    }),
  )

  const commonProps = {
    onQueryChange: setQuery,
    clearLabel: t.clearLabel,
  }

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="flex flex-wrap justify-center gap-2">
        {VARIANTS.map((v) => (
          <Button
            key={v}
            type="button"
            variant={variant === v ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setVariant(v)
              setQuery("")
            }}
          >
            {t.variants[v]}
          </Button>
        ))}
      </div>

      <div className="min-h-[24rem]">
        {variant === "instant" && (
          <SearchPanel
            key="instant"
            variant="instant"
            placeholder={t.searchComponents}
            size="full"
            {...commonProps}
          >
            <SearchPanelResults
              results={search}
              defaultResults={[popularGroup, recentGroup]}
              emptyMessage={t.emptyMessage}
              onSelect={open}
            />
          </SearchPanel>
        )}

        {variant === "command" && (
          <div className="text-center">
            <p className="mb-4 text-sm text-muted-foreground">{t.pressHint}</p>
            <SearchPanel
              key="command"
              variant="command"
              placeholder={t.commandPlaceholder}
              triggerLabel={t.trigger}
              hotkey={false}
              trigger={
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCommandOpen(true)}
                >
                  <Search className="size-4" />
                  {t.trigger}
                </Button>
              }
              open={commandOpen}
              onOpenChange={setCommandOpen}
              {...commonProps}
            >
              <SearchPanelCommands
                commands={commands}
                results={search}
                defaultResults={[
                  { ...popularGroup, items: popularGroup.items.slice(0, 3) },
                ]}
                labels={t.labels}
                noResultsMessage={t.noResultsMessage}
                onSelect={open}
              />
            </SearchPanel>
          </div>
        )}

        {variant === "scoped" && (
          <SearchPanel
            key="scoped"
            variant="scoped"
            placeholder={t.scopedPlaceholder}
            scopes={[
              { id: "components", label: t.scopeComponents },
              { id: "effects", label: t.scopeEffects },
              { id: "hooks", label: t.scopeHooks },
            ]}
            defaultScope="components"
            onScopeChange={setScope}
            size="full"
            {...commonProps}
          >
            <SearchPanelResults
              results={scopedResults}
              defaultResults={[
                {
                  id: `examples-${scope}`,
                  label: t.examplesIn(scopeSections[scope]),
                  icon: <Sparkles className="size-3" />,
                  items: pickSlugs(SCOPE_EXAMPLES[scope] ?? [], false),
                },
              ]}
              emptyMessage={t.emptyMessage}
              onSelect={open}
            />
          </SearchPanel>
        )}

        {variant === "contextual" && (
          <SearchPanel
            key="contextual"
            variant="contextual"
            placeholder={t.contextualPlaceholder}
            size="full"
            {...commonProps}
          >
            <SearchPanelSuggestions
              suggested={pickSlugs(SIMILAR_TO_BUTTON, false)}
              labels={{ suggested: t.similarTo }}
              onSelect={open}
            />
            <SearchPanelResults
              results={search}
              emptyMessage={t.emptyMessage}
              onSelect={open}
            />
          </SearchPanel>
        )}

        {variant === "federated" && (
          <SearchPanel
            key="federated"
            variant="federated"
            placeholder={t.federatedPlaceholder}
            size="full"
            {...commonProps}
          >
            <SearchPanelFederated
              sources={sources}
              defaultResults={federatedDefaults}
              emptyMessage={t.emptyMessage}
              noResultsMessage={t.noResults}
              onSelect={open}
            />
          </SearchPanel>
        )}
      </div>
    </div>
  )
}
