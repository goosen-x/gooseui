"use client"

import { MapPin } from "lucide-react"
import { useLocale } from "next-intl"
import { useState } from "react"
import { customToast } from "@/lib/toast"
import { Checkbox } from "@/registry/gooseui/ui/checkbox"
import { Label } from "@/registry/gooseui/ui/label"
import { Searchbar } from "@/registry/gooseui/ui/searchbar"

type City = { name: string; country: string; population: number }

const citiesEn: City[] = [
  { name: "Amsterdam", country: "Netherlands", population: 921 },
  { name: "Athens", country: "Greece", population: 643 },
  { name: "Barcelona", country: "Spain", population: 1620 },
  { name: "Berlin", country: "Germany", population: 3878 },
  { name: "Bern", country: "Switzerland", population: 134 },
  { name: "Bratislava", country: "Slovakia", population: 475 },
  { name: "Brussels", country: "Belgium", population: 1222 },
  { name: "Budapest", country: "Hungary", population: 1706 },
  { name: "Copenhagen", country: "Denmark", population: 660 },
  { name: "Dublin", country: "Ireland", population: 592 },
  { name: "Helsinki", country: "Finland", population: 674 },
  { name: "Lisbon", country: "Portugal", population: 545 },
  { name: "Ljubljana", country: "Slovenia", population: 295 },
  { name: "London", country: "United Kingdom", population: 8866 },
  { name: "Madrid", country: "Spain", population: 3332 },
  { name: "Milan", country: "Italy", population: 1371 },
  { name: "Munich", country: "Germany", population: 1512 },
  { name: "Oslo", country: "Norway", population: 709 },
  { name: "Paris", country: "France", population: 2102 },
  { name: "Porto", country: "Portugal", population: 232 },
  { name: "Prague", country: "Czechia", population: 1357 },
  { name: "Riga", country: "Latvia", population: 605 },
  { name: "Rome", country: "Italy", population: 2749 },
  { name: "Stockholm", country: "Sweden", population: 984 },
  { name: "Tallinn", country: "Estonia", population: 457 },
  { name: "Valencia", country: "Spain", population: 807 },
  { name: "Vienna", country: "Austria", population: 2006 },
  { name: "Vilnius", country: "Lithuania", population: 593 },
  { name: "Warsaw", country: "Poland", population: 1863 },
  { name: "Zurich", country: "Switzerland", population: 443 },
]

const citiesRu: City[] = [
  { name: "Амстердам", country: "Нидерланды", population: 921 },
  { name: "Афины", country: "Греция", population: 643 },
  { name: "Барселона", country: "Испания", population: 1620 },
  { name: "Берлин", country: "Германия", population: 3878 },
  { name: "Берн", country: "Швейцария", population: 134 },
  { name: "Братислава", country: "Словакия", population: 475 },
  { name: "Брюссель", country: "Бельгия", population: 1222 },
  { name: "Будапешт", country: "Венгрия", population: 1706 },
  { name: "Вена", country: "Австрия", population: 2006 },
  { name: "Вильнюс", country: "Литва", population: 593 },
  { name: "Валенсия", country: "Испания", population: 807 },
  { name: "Варшава", country: "Польша", population: 1863 },
  { name: "Дублин", country: "Ирландия", population: 592 },
  { name: "Копенгаген", country: "Дания", population: 660 },
  { name: "Лиссабон", country: "Португалия", population: 545 },
  { name: "Лондон", country: "Великобритания", population: 8866 },
  { name: "Любляна", country: "Словения", population: 295 },
  { name: "Мадрид", country: "Испания", population: 3332 },
  { name: "Милан", country: "Италия", population: 1371 },
  { name: "Мюнхен", country: "Германия", population: 1512 },
  { name: "Осло", country: "Норвегия", population: 709 },
  { name: "Париж", country: "Франция", population: 2102 },
  { name: "Порту", country: "Португалия", population: 232 },
  { name: "Прага", country: "Чехия", population: 1357 },
  { name: "Рига", country: "Латвия", population: 605 },
  { name: "Рим", country: "Италия", population: 2749 },
  { name: "Стокгольм", country: "Швеция", population: 984 },
  { name: "Таллин", country: "Эстония", population: 457 },
  { name: "Хельсинки", country: "Финляндия", population: 674 },
  { name: "Цюрих", country: "Швейцария", population: 443 },
]

const text = {
  en: {
    placeholder: "Search a city…",
    selected: "Selected",
    thousand: "k residents",
    loading: "Searching…",
    empty: "No cities match",
    error: "Server did not respond",
    failLabel: "Simulate a network error",
    countryPlaceholder: "Type at least 3 letters…",
  },
  ru: {
    placeholder: "Найдите город…",
    selected: "Выбрано",
    thousand: "тыс. жителей",
    loading: "Ищем…",
    empty: "Таких городов нет",
    error: "Сервер не ответил",
    failLabel: "Сымитировать ошибку сети",
    countryPlaceholder: "Введите хотя бы 3 буквы…",
  },
}

function useDemo() {
  const locale = useLocale()
  const isRu = locale === "ru"
  return { t: isRu ? text.ru : text.en, cities: isRu ? citiesRu : citiesEn }
}

/** Fake API: filters a local list after a random delay, honours the abort signal. */
function searchCities(
  cities: City[],
  query: string,
  signal: AbortSignal,
  fail = false,
): Promise<City[]> {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(
      () => {
        if (fail) {
          reject(new Error("Network error"))
          return
        }
        const q = query.toLowerCase()
        resolve(
          cities
            .filter(
              (city) =>
                city.name.toLowerCase().includes(q) ||
                city.country.toLowerCase().includes(q),
            )
            .slice(0, 8),
        )
      },
      300 + Math.random() * 400,
    )
    signal.addEventListener("abort", () => {
      window.clearTimeout(timer)
      reject(new DOMException("Aborted", "AbortError"))
    })
  })
}

function Highlight({ text, query }: { text: string; query: string }) {
  const index = text.toLowerCase().indexOf(query.trim().toLowerCase())
  if (!query.trim() || index < 0) return <>{text}</>
  const end = index + query.trim().length
  return (
    <>
      {text.slice(0, index)}
      <mark className="rounded-[0.125rem] bg-primary/15 text-foreground">
        {text.slice(index, end)}
      </mark>
      {text.slice(end)}
    </>
  )
}

export function SearchbarDemo() {
  const { t, cities } = useDemo()
  return (
    <div className="w-full max-w-sm px-4">
      <Searchbar<City>
        inputClassName="ring-0 ring-transparent transition-[color,border-color,box-shadow] duration-200 motion-reduce:transition-none"
        aria-label={t.placeholder}
        placeholder={t.placeholder}
        fetcher={(query, signal) => searchCities(cities, query, signal)}
        getItemLabel={(city) => city.name}
        getItemKey={(city) => city.name}
        // Search also matches the country, so show it: otherwise "pa" → Barcelona looks random
        renderItem={(city, { query }) => (
          <span className="flex min-w-0 items-baseline gap-1.5">
            <span className="truncate">
              <Highlight text={city.name} query={query} />
            </span>
            <span className="truncate text-xs text-muted-foreground">
              · <Highlight text={city.country} query={query} />
            </span>
          </span>
        )}
        labels={{ loading: t.loading, empty: t.empty, error: t.error }}
        onSelect={(city) =>
          customToast.success(`${t.selected}: ${city.name}`, {
            description: city.country,
          })
        }
      />
    </div>
  )
}

export function SearchbarRenderItemDemo() {
  const { t, cities } = useDemo()
  return (
    <div className="w-full max-w-sm px-4">
      <Searchbar<City>
        inputClassName="ring-0 ring-transparent transition-[color,border-color,box-shadow] duration-200 motion-reduce:transition-none"
        aria-label={t.placeholder}
        placeholder={t.placeholder}
        fetcher={(query, signal) => searchCities(cities, query, signal)}
        getItemLabel={(city) => city.name}
        getItemKey={(city) => city.name}
        labels={{ loading: t.loading, empty: t.empty, error: t.error }}
        renderItem={(city, { query }) => (
          <div className="flex items-center gap-3">
            <MapPin className="size-4 shrink-0 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <div className="truncate font-medium">
                <Highlight text={city.name} query={query} />
              </div>
              <div className="truncate text-xs text-muted-foreground">
                {city.country}
              </div>
            </div>
            <span className="text-xs text-muted-foreground tabular-nums">
              {city.population} {t.thousand}
            </span>
          </div>
        )}
      />
    </div>
  )
}

export function SearchbarStatesDemo() {
  const { t, cities } = useDemo()
  const [fail, setFail] = useState(true)
  return (
    <div className="w-full max-w-sm space-y-3 px-4">
      <Searchbar<City>
        inputClassName="ring-0 ring-transparent transition-[color,border-color,box-shadow] duration-200 motion-reduce:transition-none"
        aria-label={t.countryPlaceholder}
        placeholder={t.countryPlaceholder}
        minLength={3}
        debounce={400}
        fetcher={(query, signal) => searchCities(cities, query, signal, fail)}
        getItemLabel={(city) => city.name}
        getItemKey={(city) => city.name}
        labels={{ loading: t.loading, empty: t.empty, error: t.error }}
      />
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Checkbox
          id="simulate-network-error"
          size="sm"
          checked={fail}
          onChange={(event) => setFail(event.target.checked)}
        />
        <Label htmlFor="simulate-network-error" className="cursor-pointer">
          {t.failLabel}
        </Label>
      </div>
    </div>
  )
}
