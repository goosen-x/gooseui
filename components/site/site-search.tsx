"use client"

import {
  ComponentIcon,
  FileTextIcon,
  Flame,
  FunctionSquareIcon,
  Github,
  Globe,
  Moon,
  SearchIcon,
  SparklesIcon,
} from "lucide-react"
import { useLocale } from "next-intl"
import { useTheme } from "next-themes"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { useIsMac } from "@/hooks/use-is-mac"
import type { Dict } from "@/i18n/dict"
import { pick } from "@/i18n/dict"
import { usePathname, useRouter } from "@/i18n/navigation"
import { type Locale, routing } from "@/i18n/routing"
import {
  getSearchableItems,
  type NavItem,
  navTitle,
} from "@/lib/config/docs-navigation"
import { siteConfig } from "@/lib/config/navigation"
import { cn } from "@/lib/utils"
import { Kbd, KbdGroup } from "@/registry/gooseui/ui/kbd"
import {
  SearchPanel,
  SearchPanelCommands,
  type SearchResult,
} from "@/registry/gooseui/ui/search-panel"

type Section = "pages" | "components" | "effects" | "hooks"

const SECTIONS: Section[] = ["pages", "components", "effects", "hooks"]

const SECTION_ICONS: Record<Section, React.ReactNode> = {
  pages: <FileTextIcon className="size-4 text-muted-foreground" />,
  components: <ComponentIcon className="size-4 text-muted-foreground" />,
  effects: <SparklesIcon className="size-4 text-muted-foreground" />,
  hooks: <FunctionSquareIcon className="size-4 text-muted-foreground" />,
}

const POPULAR = [
  "/docs/components/button",
  "/docs/components/carousel",
  "/docs/components/morphing-dialog",
  "/docs/components/tabs",
  "/docs/components/search-panel",
]

const en = {
  searchDocsLong: "Search docs...",
  searchShort: "Search...",
  placeholder: "Search docs, components, hooks...",
  popular: "Popular",
  sections: {
    pages: "Pages",
    components: "Components",
    effects: "Effects",
    hooks: "Hooks",
  } as Record<Section, string>,
  cmdTheme: "Switch theme",
  cmdThemeDesc: "Toggle between light and dark",
  cmdThemeKeys: ["theme", "dark", "light"],
  cmdLang: "Switch language",
  cmdLangDesc: "English ↔ Russian",
  cmdLangKeys: ["language", "locale", "russian"],
  cmdGithub: "Open GitHub",
  cmdGithubDesc: "GooseUI repository",
  cmdGithubKeys: ["github", "repo", "source"],
  labels: {
    hint: "Start with",
    hintSuffix: "for commands",
    noCommands: "No commands found",
    commands: "Commands",
    navigate: "select",
    open: "open",
    close: "close",
  },
  clearLabel: "Clear search",
  noResults: 'Nothing found for "{query}"',
}
const content: Dict<typeof en> = {
  en,
  ru: {
    searchDocsLong: "Поиск в доках...",
    searchShort: "Поиск...",
    placeholder: "Поиск по докам, компонентам, хукам...",
    popular: "Популярное",
    sections: {
      pages: "Страницы",
      components: "Компоненты",
      effects: "Эффекты",
      hooks: "Хуки",
    },
    cmdTheme: "Сменить тему",
    cmdThemeDesc: "Переключить светлую и тёмную",
    cmdThemeKeys: ["тема", "тему", "тёмная", "светлая", "theme"],
    cmdLang: "Переключить язык",
    cmdLangDesc: "Русский ↔ английский",
    cmdLangKeys: ["язык", "локаль", "английский", "language"],
    cmdGithub: "Открыть GitHub",
    cmdGithubDesc: "Репозиторий GooseUI",
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
    noResults: "Ничего не найдено по запросу «{query}»",
  },
}

interface Entry {
  section: Section
  item: NavItem
  slug: string
}

const searchData = getSearchableItems()
const entries: Entry[] = SECTIONS.flatMap((section) =>
  searchData[section].map((item) => ({
    section,
    item,
    slug: item.href.split("/").pop() ?? "",
  })),
)

// Все открытые триггеры поиска на странице: ⌘K обрабатывает один, видимый
const triggers = new Set<HTMLElement>()

function isTypingTarget(target: EventTarget | null) {
  return (
    (target instanceof HTMLElement && target.isContentEditable) ||
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
  )
}

export function SiteSearch() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale() as Locale
  const t = content[locale]
  const isMac = useIsMac()
  const { resolvedTheme, setTheme } = useTheme()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  // Смена key сбрасывает введённый запрос после закрытия окна
  const [session, setSession] = useState(0)
  const [query, setQuery] = useState("")

  const handleOpenChange = useCallback((next: boolean) => {
    setOpen(next)
    if (!next) {
      setSession((value) => value + 1)
      setQuery("")
    }
  }, [])

  useEffect(() => {
    const trigger = triggerRef.current
    if (!trigger) return
    triggers.add(trigger)
    return () => {
      triggers.delete(trigger)
    }
  }, [])

  // ⌘K / Ctrl+K и «/» открывают поиск; при нескольких экземплярах реагирует один
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isCmdK = e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)
      const isSlash = e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey
      if (!isCmdK && !isSlash) return
      if (isSlash && isTypingTarget(e.target)) return
      if (e.defaultPrevented) return
      const mine = triggerRef.current
      const owner =
        [...triggers].find((trigger) => trigger.offsetParent !== null) ??
        [...triggers][0]
      if (!mine || mine !== owner) return
      e.preventDefault()
      setOpen((current) => !current)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  const toResult = useCallback(
    ({ section, item, slug }: Entry): SearchResult => ({
      id: item.href,
      title: navTitle(item, locale),
      description: item.description
        ? pick(item.description, locale)
        : undefined,
      category: t.sections[section],
      icon: SECTION_ICONS[section],
      href: item.href,
      keywords: [...(item.keywords ?? []), slug],
    }),
    [locale, t],
  )

  const all = useMemo(() => entries.map(toResult), [toResult])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q || query.startsWith(">")) return []
    return all.filter((result) =>
      [result.title, result.description, ...(result.keywords ?? [])].some(
        (value) => value?.toLowerCase().includes(q),
      ),
    )
  }, [all, query])

  const popular = useMemo(
    () => [
      {
        id: "popular",
        label: t.popular,
        icon: <Flame className="size-3" />,
        items: POPULAR.map((href) => all.find((r) => r.href === href)).filter(
          (r): r is SearchResult => Boolean(r),
        ),
      },
    ],
    [all, t],
  )

  const commands = [
    {
      id: "theme",
      title: t.cmdTheme,
      description: t.cmdThemeDesc,
      icon: <Moon className="size-4" />,
      keywords: t.cmdThemeKeys,
      action: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
    },
    {
      id: "language",
      title: t.cmdLang,
      description: t.cmdLangDesc,
      icon: <Globe className="size-4" />,
      keywords: t.cmdLangKeys,
      action: () => {
        const next = routing.locales.find((code) => code !== locale)
        if (next) router.replace(pathname, { locale: next })
      },
    },
    {
      id: "github",
      title: t.cmdGithub,
      description: t.cmdGithubDesc,
      icon: <Github className="size-4" />,
      keywords: t.cmdGithubKeys,
      action: () => window.open(siteConfig.links.github, "_blank", "noopener"),
    },
  ]

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center gap-2 rounded-md border border-input",
          "bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground",
          "shadow-sm transition-colors cursor-pointer",
          "hover:bg-accent hover:text-accent-foreground",
          "md:w-40 lg:w-56",
        )}
      >
        <SearchIcon className="size-4" />
        <span className="hidden truncate whitespace-nowrap lg:inline-flex">
          {t.searchDocsLong}
        </span>
        <span className="inline-flex whitespace-nowrap lg:hidden">
          {t.searchShort}
        </span>
        <KbdGroup className="ml-auto hidden sm:inline-flex">
          <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </button>

      <SearchPanel
        key={session}
        variant="command"
        open={open}
        onOpenChange={handleOpenChange}
        hotkey={false}
        trigger={null}
        onQueryChange={setQuery}
        placeholder={t.placeholder}
        clearLabel={t.clearLabel}
      >
        <SearchPanelCommands
          commands={commands}
          results={results}
          defaultResults={popular}
          labels={t.labels}
          noResultsMessage={t.noResults}
          onSelect={(result) => {
            if (result.href) router.push(result.href)
          }}
        />
      </SearchPanel>
    </>
  )
}
