"use client"

import { useLocale } from "next-intl"
import * as React from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Button } from "@/registry/gooseui/ui/button"
import {
  Combobox,
  ComboboxOption,
  type ComboboxOptionData,
} from "@/registry/gooseui/ui/combobox"
import { Label } from "@/registry/gooseui/ui/label"

const en = {
  framework: "Framework",
  frameworkPlaceholder: "Search frameworks…",
  value: "Value:",
  none: "none",
  frameworkHint: "Type “st” or “re”, then ArrowDown, Home/End, Enter, Escape.",
  frameworks: {
    next: "React, full-stack, Vercel",
    remix: "Formerly Remix",
    astro: "Content sites, islands",
    nuxt: "Vue, full-stack",
    sveltekit: "Svelte, full-stack",
    "solid-start": "Solid, fine-grained reactivity",
    qwik: "Resumable apps",
    gatsby: "No longer actively developed",
    angular: "Google, batteries included",
    ember: "Convention over configuration",
  } as Record<string, string>,
  labels: "Issue labels",
  labelsPlaceholder: "Add labels…",
  labelsHint:
    "Backspace in the empty field removes the last label. Type a new name and press Enter to create it.",
  save: "Save labels",
  formHint: "Submit to see FormData",
  labelDescriptions: {
    bug: "Something isn't working",
    docs: "Improvements to documentation",
    enhancement: "New feature or request",
    "good-first-issue": "Good for newcomers",
    "help-wanted": "Extra attention is needed",
    wontfix: "Archived label",
  } as Record<string, string>,
  city: "Office city",
  cityPlaceholder: "Start typing a city…",
  searching: "Searching cities…",
  noCity: "No city found",
  typeToSearch: "Type to search",
  cityHint: "Results arrive after a simulated 600 ms request.",
  noResults: "No results",
  add: "Add",
  quotes: ["“", "”"],
  remove: "Remove",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    framework: "Фреймворк",
    frameworkPlaceholder: "Найти фреймворк…",
    value: "Значение:",
    none: "нет",
    frameworkHint:
      "Наберите «st» или «re», затем стрелка вниз, Home/End, Enter, Escape.",
    frameworks: {
      next: "React, фулстек, Vercel",
      remix: "Бывший Remix",
      astro: "Контентные сайты, острова",
      nuxt: "Vue, фулстек",
      sveltekit: "Svelte, фулстек",
      "solid-start": "Solid, точечная реактивность",
      qwik: "Возобновляемые приложения",
      gatsby: "Больше активно не развивается",
      angular: "Google, всё в комплекте",
      ember: "Соглашения вместо настроек",
    },
    labels: "Метки задачи",
    labelsPlaceholder: "Добавить метки…",
    labelsHint:
      "Backspace в пустом поле удаляет последнюю метку. Введите новое название и нажмите Enter, чтобы создать метку.",
    save: "Сохранить метки",
    formHint: "Отправьте форму, чтобы увидеть FormData",
    labelDescriptions: {
      bug: "Что-то не работает",
      docs: "Правки документации",
      enhancement: "Новая возможность или запрос",
      "good-first-issue": "Подойдёт новичкам",
      "help-wanted": "Нужна помощь",
      wontfix: "Архивная метка",
    },
    city: "Город офиса",
    cityPlaceholder: "Начните вводить город…",
    searching: "Ищем города…",
    noCity: "Город не найден",
    typeToSearch: "Начните вводить",
    cityHint: "Результаты приходят после имитации запроса на 600 мс.",
    noResults: "Ничего не найдено",
    add: "Добавить",
    quotes: ["«", "»"],
    remove: "Удалить",
  },
}

const ruPlural = (n: number) => {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return "результат"
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14))
    return "результата"
  return "результатов"
}

/** Localized texts for the props that take functions */
function useMessages() {
  const locale = useLocale() as Locale
  const t = content[locale]
  return {
    t,
    messages: {
      emptyMessage: t.noResults,
      addMessage: (query: string) => (
        <>
          {t.add} {t.quotes[0]}
          <span className="font-medium">{query}</span>
          {t.quotes[1]}
        </>
      ),
      resultsMessage: (n: number) =>
        locale === "ru"
          ? `${n} ${ruPlural(n)}`
          : `${n} result${n === 1 ? "" : "s"}`,
      removeLabel: (label: string) => `${t.remove} ${label}`,
    },
  }
}

const frameworks: [string, string][] = [
  ["next", "Next.js"],
  ["remix", "React Router"],
  ["astro", "Astro"],
  ["nuxt", "Nuxt"],
  ["sveltekit", "SvelteKit"],
  ["solid-start", "SolidStart"],
  ["qwik", "Qwik City"],
  ["gatsby", "Gatsby"],
  ["angular", "Angular"],
  ["ember", "Ember.js"],
]

/** Single value with descriptions, controlled. */
export function ComboboxFrameworkDemo() {
  const { t, messages } = useMessages()
  const [framework, setFramework] = React.useState("next")
  const options: ComboboxOptionData[] = frameworks.map(([value, label]) => ({
    value,
    label,
    description: t.frameworks[value],
    disabled: value === "gatsby",
  }))
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="combobox-framework">{t.framework}</Label>
      <Combobox
        {...messages}
        inputProps={{ id: "combobox-framework" }}
        options={options}
        value={framework}
        onValueChange={setFramework}
        placeholder={t.frameworkPlaceholder}
      />
      <p className="text-sm text-muted-foreground">
        {t.value} <code>{framework || t.none}</code>. {t.frameworkHint}
      </p>
    </div>
  )
}

const labels: [string, string][] = [
  ["bug", "bug"],
  ["docs", "documentation"],
  ["enhancement", "enhancement"],
  ["good-first-issue", "good first issue"],
  ["help-wanted", "help wanted"],
  ["needs-triage", "needs triage"],
  ["performance", "performance"],
  ["wontfix", "wontfix"],
]

/** Several values as chips, custom values, inside a form. */
export function ComboboxTagsDemo() {
  const { t, messages } = useMessages()
  const [submitted, setSubmitted] = React.useState<string[] | null>(null)
  return (
    <form
      className="grid w-full max-w-md gap-4 rounded-lg border bg-card p-5"
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(
          new FormData(event.currentTarget).getAll("tags").map(String),
        )
      }}
    >
      <div className="grid gap-2">
        <Label htmlFor="combobox-tags">{t.labels}</Label>
        <Combobox
          {...messages}
          multiple
          name="tags"
          allowCustomValue
          defaultValue={["bug", "needs-triage"]}
          inputProps={{ id: "combobox-tags" }}
          placeholder={t.labelsPlaceholder}
        >
          {labels.map(([value, label]) => (
            <ComboboxOption
              key={value}
              value={value}
              description={t.labelDescriptions[value]}
              disabled={value === "wontfix"}
            >
              {label}
            </ComboboxOption>
          ))}
        </Combobox>
        <p className="text-xs text-muted-foreground">{t.labelsHint}</p>
      </div>
      <Button type="submit" className="w-fit">
        {t.save}
      </Button>
      <pre className="rounded-md bg-muted p-3 text-xs">
        {submitted ? JSON.stringify({ tags: submitted }) : t.formHint}
      </pre>
    </form>
  )
}

const cities = [
  "Amsterdam",
  "Athens",
  "Auckland",
  "Austin",
  "Barcelona",
  "Berlin",
  "Bogotá",
  "Boston",
  "Brussels",
  "Buenos Aires",
  "Cairo",
  "Cape Town",
  "Chicago",
  "Copenhagen",
  "Dublin",
  "Edinburgh",
  "Helsinki",
  "Istanbul",
  "Lisbon",
  "London",
  "Los Angeles",
  "Madrid",
  "Melbourne",
  "Mexico City",
  "Montreal",
  "Mumbai",
  "Munich",
  "Nairobi",
  "New York",
  "Oslo",
  "Paris",
  "Prague",
  "Reykjavík",
  "Rome",
  "San Francisco",
  "São Paulo",
  "Seoul",
  "Singapore",
  "Stockholm",
  "Sydney",
  "Tokyo",
  "Toronto",
  "Vienna",
  "Warsaw",
  "Zürich",
]

function searchCities(query: string) {
  const q = query.trim().toLowerCase()
  return new Promise<ComboboxOptionData[]>((resolve) =>
    setTimeout(
      () =>
        resolve(
          cities
            .filter((c) => c.toLowerCase().includes(q))
            .slice(0, 8)
            .map((c) => ({ value: c.toLowerCase(), label: c })),
        ),
      600,
    ),
  )
}

/** Server-side search: filter={false}, loading and a controlled input. */
export function ComboboxAsyncDemo() {
  const { t, messages } = useMessages()
  const [text, setText] = React.useState("")
  const [value, setValue] = React.useState("")
  const [results, setResults] = React.useState<ComboboxOptionData[]>([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const q = text.trim()
    if (!q) {
      setResults([])
      setLoading(false)
      return
    }
    let cancelled = false
    setLoading(true)
    const timer = setTimeout(() => {
      searchCities(q).then((list) => {
        if (cancelled) return
        setResults(list)
        setLoading(false)
      })
    }, 200)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [text])

  // Keep the chosen city in the list so its label resolves after the search clears
  const options = React.useMemo(() => {
    if (!value || results.some((r) => r.value === value)) return results
    const label = cities.find((c) => c.toLowerCase() === value) ?? value
    return [...results, { value, label }]
  }, [results, value])

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="combobox-city">{t.city}</Label>
      <Combobox
        {...messages}
        inputProps={{ id: "combobox-city" }}
        placeholder={t.cityPlaceholder}
        options={text.trim() ? options : []}
        filter={false}
        loading={loading}
        loadingMessage={t.searching}
        emptyMessage={text.trim() ? t.noCity : t.typeToSearch}
        inputValue={text}
        onInputValueChange={setText}
        value={value}
        onValueChange={setValue}
      />
      <p className="text-sm text-muted-foreground">
        {t.cityHint} {t.value} <code>{value || t.none}</code>
      </p>
    </div>
  )
}
