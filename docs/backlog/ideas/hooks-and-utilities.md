# Hooks and Utilities

#p2 #hooks #utilities

## Описание

Добавить секции Hooks и Utilities в библиотеку GooseUI. Это расширит функциональность за пределы визуальных компонентов и предоставит разработчикам полезные утилиты для повседневных задач.

## Что хочется

### Hooks

- [ ] `useMediaQuery` — отслеживание CSS media queries и брейкпоинтов
- [ ] `useLocalStorage` — синхронизация состояния с localStorage (с поддержкой cross-tab sync)
- [ ] `useCopyToClipboard` — копирование текста в буфер обмена
- [ ] `useDebounce` — дебаунс значений
- [ ] `useThrottle` — троттлинг значений
- [ ] `useClickOutside` — обнаружение кликов вне элемента
- [ ] `useKeyPress` — обработка нажатий клавиш
- [ ] `useWindowSize` — отслеживание размеров окна
- [ ] `useScrollPosition` — позиция скролла
- [ ] `useIntersectionObserver` — Intersection Observer API
- [ ] `useMounted` — проверка монтирования компонента (для SSR)
- [ ] `useToggle` — переключение boolean состояния
- [ ] `usePrevious` — предыдущее значение
- [ ] `useHover` — отслеживание hover состояния
- [ ] `useFocus` — отслеживание focus состояния

### Utilities

- [ ] `cn` — merge classNames (уже есть)
- [ ] `formatCurrency` — форматирование валюты
- [ ] `formatNumber` — форматирование чисел
- [ ] `formatDate` — форматирование дат
- [ ] `formatRelativeTime` — относительное время ("5 минут назад")
- [ ] `slugify` — создание slug из строки
- [ ] `truncate` — обрезка текста
- [ ] `capitalize` — капитализация строки
- [ ] `generateId` — генерация уникальных ID
- [ ] `deepMerge` — глубокое слияние объектов
- [ ] `omit` / `pick` — работа с объектами

## Референсы

| Библиотека | Ссылка | Что понравилось |
| ---------- | ------ | --------------- |
| aevr/ui | https://ui.aevr.space/ | Структура hooks + utilities, number-formatter |
| useHooks | https://usehooks.com/ | Большая коллекция хуков с хорошей документацией |
| shadcn.io | https://www.shadcn.io/hooks/use-media-query | Хуки с SSR поддержкой |
| Shadcn Hooks | https://allshadcn.com/tools/shadcn-hooks/ | 20+ хуков с TypeScript |
| HookAgain | https://allshadcn.com/tools/hookagain/ | Интеграция с shadcn CLI |
| react-hooked | https://react-hooked.vercel.app/ | Установка через shadcn CLI |
| shadcn-ui/ui | https://github.com/shadcn-ui/ui/blob/main/apps/www/hooks/ | Официальные хуки shadcn |

## Примеры использования

### useMediaQuery

```tsx
import { useMediaQuery } from "@/hooks/use-media-query"

function Component() {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  return isDesktop ? <DesktopNav /> : <MobileNav />
}
```

### useCopyToClipboard

```tsx
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"

function CopyButton({ text }: { text: string }) {
  const [copy, isCopied] = useCopyToClipboard()

  return (
    <Button onClick={() => copy(text)}>
      {isCopied ? "Copied!" : "Copy"}
    </Button>
  )
}
```

### useLocalStorage

```tsx
import { useLocalStorage } from "@/hooks/use-local-storage"

function Component() {
  const [theme, setTheme] = useLocalStorage("theme", "light")

  return (
    <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Toggle Theme
    </Button>
  )
}
```

### formatCurrency

```tsx
import { formatCurrency } from "@/utils/format-currency"

formatCurrency(1234.56, "USD") // "$1,234.56"
formatCurrency(1234.56, "RUB") // "1 234,56 ₽"
formatCurrency(1234.56, "EUR") // "€1,234.56"
```

### formatRelativeTime

```tsx
import { formatRelativeTime } from "@/utils/format-relative-time"

formatRelativeTime(new Date(Date.now() - 5 * 60 * 1000)) // "5 minutes ago"
formatRelativeTime(new Date(Date.now() - 24 * 60 * 60 * 1000)) // "yesterday"
```

## Структура файлов

```
registry/
├── new-york/
│   ├── hooks/
│   │   ├── use-media-query.tsx
│   │   ├── use-local-storage.tsx
│   │   ├── use-copy-to-clipboard.tsx
│   │   └── ...
│   └── utils/
│       ├── format-currency.ts
│       ├── format-number.ts
│       └── ...
```

## Установка через CLI

```bash
# Hooks
npx shadcn@latest add https://gooseui.pro/r/use-media-query.json
npx shadcn@latest add https://gooseui.pro/r/use-copy-to-clipboard.json

# Utilities
npx shadcn@latest add https://gooseui.pro/r/format-currency.json
```

## Задачи для реализации

1. [ ] Создать структуру папок для hooks и utilities в registry
2. [ ] Добавить первые 5 хуков (useMediaQuery, useCopyToClipboard, useLocalStorage, useDebounce, useClickOutside)
3. [ ] Добавить первые 3 утилиты (formatCurrency, formatNumber, formatDate)
4. [ ] Создать JSON-файлы для registry
5. [ ] Добавить документацию для каждого хука/утилиты
6. [ ] Добавить секции Hooks и Utilities в сайдбар документации
7. [ ] Обновить лендинг — добавить упоминание hooks и utilities

## Заметки

- Все хуки должны быть SSR-safe (проверка `typeof window !== 'undefined'`)
- TypeScript типизация обязательна
- Каждый хук/утилита должен быть независимым (без лишних зависимостей)
- Можно использовать `npx shadcn add` формат для установки

---

Создано: 2025-12-30
Статус: idea
