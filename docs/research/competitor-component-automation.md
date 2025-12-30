# Анализ автоматизации компонентов у конкурентов

> Детальный анализ того, как разные shadcn-registry библиотеки автоматизируют добавление компонентов, генерацию registry JSON и навигацию в сайдбаре.
> Дата исследования: 2024-12-30

## Содержание

1. [Обзор репозиториев](#обзор-репозиториев)
2. [Сравнительная таблица](#сравнительная-таблица)
3. [Детальный анализ по библиотекам](#детальный-анализ-по-библиотекам)
4. [Паттерны автоматизации](#паттерны-автоматизации)
5. [Рекомендации для GooseUI](#рекомендации-для-gooseui)

---

## Обзор репозиториев

| Библиотека | GitHub | Stars | Лицензия |
|------------|--------|-------|----------|
| **shadcn/ui** (официальный) | [shadcn-ui/ui](https://github.com/shadcn-ui/ui) | 80k+ | MIT |
| **Magic UI** | [magicuidesign/magicui](https://github.com/magicuidesign/magicui) | 19k+ | MIT |
| **Motion Primitives** | [ibelick/motion-primitives](https://github.com/ibelick/motion-primitives) | 4.4k | MIT |
| **Aceternity UI** | Closed source (только registry) | — | — |
| **Cult UI** | [nolly-studio/cult-ui](https://github.com/nolly-studio/cult-ui) | — | MIT |
| **8bitcn/ui** | [TheOrcDev/8bitcn-ui](https://github.com/TheOrcDev/8bitcn-ui) | — | MIT |
| **Animate UI** | [imskyleen/animate-ui](https://github.com/imskyleen/animate-ui) | 2.6k | MIT |
| **Registry Template** | [shadcn-ui/registry-template](https://github.com/shadcn-ui/registry-template) | — | MIT |

---

## Сравнительная таблица

| Функция | shadcn/ui | Magic UI | Motion Primitives | Cult UI | 8bitcn |
|---------|-----------|----------|-------------------|---------|--------|
| **Registry JSON автогенерация** | ✅ `shadcn build` | ✅ Build script | ❌ Manual | ✅ Custom script | ✅ `shadcn build` |
| **Sidebar auto-generation** | ❌ Manual | ❌ Manual | ❌ Manual | ✅ Fumadocs | ❌ Manual |
| **File-based routing** | ❌ | ❌ | ❌ | ✅ | ❌ |
| **TypeScript definitions** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **registry.json конфиг** | ✅ | ✅ | ❌ | ✅ | ✅ |
| **Автодобавление dependencies** | ✅ CLI | ✅ CLI | ✅ CLI | ✅ CLI | ✅ CLI |

---

## Детальный анализ по библиотекам

### 1. shadcn/ui (Официальный шаблон)

**Репозиторий:** [shadcn-ui/registry-template](https://github.com/shadcn-ui/registry-template)

#### Структура проекта

```
├── registry/
│   └── new-york/
│       └── ui/
│           └── component.tsx
├── registry.json          # Конфиг компонентов
├── public/r/              # Сгенерированные JSON
└── package.json           # build script
```

#### Процесс добавления компонента

1. **Создать компонент** в `registry/new-york/ui/`
2. **Добавить в `registry.json`**:
```json
{
  "name": "button",
  "type": "registry:ui",
  "files": [
    { "path": "ui/button.tsx", "type": "registry:ui" }
  ],
  "dependencies": ["@radix-ui/react-slot"]
}
```
3. **Запустить build**: `pnpm registry:build`
4. **Вручную добавить** в навигацию (docs-sidebar)

#### Ключевой скрипт

```json
{
  "scripts": {
    "registry:build": "shadcn build"
  }
}
```

#### Уровень автоматизации: 🟡 Средний
- ✅ Registry JSON генерируется автоматически
- ❌ Sidebar/навигация — вручную
- ❌ Docs page — вручную

---

### 2. Magic UI

**Репозиторий:** [magicuidesign/magicui](https://github.com/magicuidesign/magicui)

#### Структура

```
├── registry/
│   ├── index.tsx           # Главный индекс
│   ├── registry-ui.ts      # UI компоненты
│   ├── registry-hooks.ts   # Хуки
│   └── registry-lib.ts     # Утилиты
├── content/docs/           # MDX документация
└── scripts/
    └── build-registry.ts   # Кастомный build
```

#### Процесс добавления

1. **Создать компонент** в `registry/default/ui/`
2. **Добавить в `registry-ui.ts`**:
```typescript
export const registryUI = [
  {
    name: "magic-card",
    type: "registry:ui",
    files: ["ui/magic-card.tsx"],
    dependencies: ["framer-motion"],
  },
]
```
3. **Запустить build** — генерирует `__index__.tsx`
4. **Создать MDX** в `content/docs/components/`
5. **Вручную добавить** в навигацию

#### Автогенерируемый файл

Скрипт создаёт `__index__.tsx` для экспорта всех компонентов:

```typescript
// Auto-generated
export * from "./magic-card"
export * from "./animated-beam"
```

#### Уровень автоматизации: 🟡 Средний
- ✅ Registry build автоматический
- ✅ Index re-exports генерируются
- ❌ Навигация — вручную

---

### 3. Motion Primitives

**Репозиторий:** [ibelick/motion-primitives](https://github.com/ibelick/motion-primitives)

#### Структура

```
├── components/
│   └── core/
│       └── text-effect.tsx
├── config/
│   └── navigation.ts      # Ручная навигация
└── app/docs/              # Next.js pages
```

#### Особенности

- **Нет централизованного registry.json** — компоненты разбросаны
- **TypeScript definitions** в отдельных файлах
- **Навигация** полностью ручная в `navigation.ts`

#### Уровень автоматизации: 🔴 Низкий
- ❌ Нет build script для registry
- ❌ Навигация вручную
- ✅ Типизированные компоненты

---

### 4. Cult UI

**Репозиторий:** [nolly-studio/cult-ui](https://github.com/nolly-studio/cult-ui)

#### Структура

```
├── registry/
│   └── [component]/
│       ├── index.tsx
│       └── registry.json   # Per-component config
├── content/docs/           # Fumadocs MDX
└── source.config.ts        # Fumadocs config
```

#### Ключевое отличие: Fumadocs

Cult UI использует [Fumadocs](https://fumadocs.dev/) для документации:

```typescript
// source.config.ts
import { defineDocs } from "fumadocs-mdx/config"

export const docs = defineDocs({
  dir: "content/docs",
})
```

#### Преимущества Fumadocs

1. **Автогенерация навигации** из файловой структуры:
```
content/docs/
├── components/
│   ├── button.mdx → /docs/components/button
│   └── card.mdx   → /docs/components/card
```

2. **Метаданные из frontmatter**:
```mdx
---
title: Button
description: A clickable button component
---
```

3. **Sidebar строится автоматически** на основе директорий

#### Уровень автоматизации: 🟢 Высокий
- ✅ Registry JSON — per-component
- ✅ Навигация — автоматическая (Fumadocs)
- ✅ Docs pages — из MDX

---

### 5. 8bitcn/ui

**Репозиторий:** [TheOrcDev/8bitcn-ui](https://github.com/TheOrcDev/8bitcn-ui)

#### Структура

```
├── registry.json           # Централизованный конфиг
├── registry/
│   └── default/
│       └── ui/
└── public/r/               # Generated JSON files
```

#### Подход

Использует официальный `shadcn build` без модификаций:

```json
// registry.json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "8bitcn",
  "homepage": "https://www.8bitcn.com",
  "items": [
    {
      "name": "button",
      "type": "registry:ui",
      "files": [{ "path": "registry/default/ui/button.tsx" }]
    }
  ]
}
```

#### Уровень автоматизации: 🟡 Средний
- ✅ Стандартный shadcn build
- ❌ Навигация вручную

---

### 6. Animate UI

**Репозиторий:** [imskyleen/animate-ui](https://github.com/imskyleen/animate-ui)

#### Структура

```
├── registry/
│   ├── animate-ui/
│   │   └── ui/
│   └── registry.ts         # TypeScript config
├── public/r/               # Generated
└── app/docs/
```

#### Уровень автоматизации: 🟡 Средний
- ✅ Registry через TypeScript
- ❌ Навигация вручную

---

## Паттерны автоматизации

### Паттерн 1: Централизованный registry.json

**Используют:** shadcn/ui, 8bitcn, Animate UI

```json
{
  "items": [
    { "name": "button", "type": "registry:ui", "files": [...] }
  ]
}
```

**Плюсы:**
- Простота понимания
- Один источник истины
- Работает с `shadcn build`

**Минусы:**
- Вручную добавлять каждый компонент
- Легко забыть

---

### Паттерн 2: TypeScript registry

**Используют:** Magic UI, Animate UI

```typescript
// registry-ui.ts
export const registryUI: RegistryItem[] = [
  {
    name: "button",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-slot"],
  },
]
```

**Плюсы:**
- Type safety
- Автокомплит в IDE
- Можно добавить логику

**Минусы:**
- Требует кастомный build script

---

### Паттерн 3: Per-component registry

**Используют:** Cult UI

```
registry/
├── button/
│   ├── index.tsx
│   └── registry.json
└── card/
    ├── index.tsx
    └── registry.json
```

**Плюсы:**
- Самодостаточные компоненты
- Легко копировать/перемещать
- Меньше merge conflicts

**Минусы:**
- Много файлов
- Сложнее централизованный build

---

### Паттерн 4: File-based navigation (Fumadocs)

**Используют:** Cult UI

```
content/docs/
├── _meta.json              # Section config
├── components/
│   ├── _meta.json          # Category order
│   ├── button.mdx
│   └── card.mdx
```

**Плюсы:**
- Навигация генерируется автоматически
- Добавил файл → появился в sidebar
- Порядок через `_meta.json`

**Минусы:**
- Зависимость от Fumadocs
- Требует перестройки docs структуры

---

## Рекомендации для GooseUI

### Текущее состояние GooseUI

- ❌ Навигация вручную в `components/docs-sidebar.tsx`
- ❌ Навигация дублируется в `lib/config/navigation.ts`
- ✅ Registry JSON через `shadcn build`
- ❌ Нет автогенерации

### Варианты улучшения

#### Вариант A: Минимальные изменения

**Что делать:**
1. Унифицировать навигацию — только `components/docs-sidebar.tsx`
2. Удалить дублирование в `lib/config/navigation.ts`
3. Добавить checklist в `.claude/skills/add-component.md` (уже сделано)

**Сложность:** 🟢 Низкая

---

#### Вариант B: TypeScript registry + auto-sidebar

**Что делать:**
1. Создать `lib/config/registry.ts` как единый источник
2. Генерировать `docsNavConfig` из registry
3. Build script обновляет sidebar

```typescript
// lib/config/registry.ts
export const REGISTRY: Component[] = [
  {
    slug: "button",
    name: "Button",
    category: "components",
    isNew: false
  },
  {
    slug: "carousel",
    name: "Carousel",
    category: "components",
    isNew: true
  },
]

// Генерация sidebar
export const generateSidebarNav = () => {
  const components = REGISTRY.filter(c => c.category === "components")
  return components.map(c => ({
    title: c.name,
    href: `/docs/components/${c.slug}`,
    isNew: c.isNew,
  }))
}
```

**Сложность:** 🟡 Средняя

---

#### Вариант C: Переход на Fumadocs

**Что делать:**
1. Установить `fumadocs-core`, `fumadocs-mdx`, `fumadocs-ui`
2. Переструктурировать docs в `content/docs/`
3. Использовать MDX вместо TSX для docs
4. Настроить `source.config.ts`

**Плюсы:**
- Полная автоматизация навигации
- Современный стек
- OpenAPI/TypeScript auto-docs

**Минусы:**
- Значительная переработка
- Зависимость от Fumadocs

**Сложность:** 🔴 Высокая

---

### Рекомендуемый путь

**Этап 1 (сейчас):** Вариант A
- Удалить дублирование навигации
- Улучшить скилл добавления компонентов

**Этап 2 (опционально):** Вариант B
- Если много компонентов — автогенерация sidebar
- TypeScript registry как source of truth

**Этап 3 (будущее):** Рассмотреть Fumadocs
- При полном рефакторинге документации

---

---

## Дополнительные репозитории (анализ от 30.12.2024)

### 7. Eldora UI

**Репозиторий:** [karthikmudunuri/eldoraui](https://github.com/karthikmudunuri/eldoraui)

#### Процесс добавления (5 файлов)

```
1. registry/eldoraui/example-component.tsx    # Основной компонент
2. registry/example/example-component-demo.tsx # Демо
3. content/docs/components/example-component.mdx # Документация
4. registry/registry-ui.ts                    # Добавить в реестр UI
5. registry/registry-examples.ts              # Добавить демо
```

**Build команда:** `pnpm build:registry`

**Время добавления:** ~10 минут (по утверждению авторов)

#### Уровень автоматизации: 🟡 Средний
- ✅ Структурированный registry
- ❌ Навигация вручную
- ✅ Чёткий checklist

---

### 8. Dice UI

**Репозиторий:** [sadmann7/diceui](https://github.com/sadmann7/diceui)

#### Особенность: Monorepo с отдельными пакетами

```
packages/
├── @diceui/combobox/
│   ├── src/
│   │   ├── index.ts
│   │   ├── component-root.tsx
│   │   └── types.ts
│   ├── test/
│   ├── package.json
│   ├── tsconfig.json
│   └── tsup.config.ts
├── @diceui/mention/
├── @diceui/tags-input/
└── @diceui/shared/         # Утилиты и типы
```

#### Требования к компонентам

- **TypeScript**: обязательно, с экспортом типов
- **Accessibility**: WAI-ARIA, ARIA атрибуты, тесты с screen readers
- **Стилизация**: через prop `style`, примитивные компоненты
- **Тесты**: обязательны в `test/`

#### Commit convention

```
feat(combobox): add new feature
fix(mention): fix bug
docs(tags-input): update docs
test(checkbox-group): add tests
```

#### Уровень автоматизации: 🟢 Высокий
- ✅ Отдельные пакеты — независимые билды
- ✅ tsup для сборки
- ✅ Changesets для версионирования
- ❌ Навигация вручную

---

### 9. Kibo UI

**Репозиторий:** [haydenbleasel/kibo](https://github.com/haydenbleasel/kibo)

#### Структура monorepo

```
apps/docs/           # Документация
packages/            # Компоненты
scripts/             # Утилиты registry
```

#### Инструменты

- **tsup** — для сборки компонентов
- **Turbo** — для управления monorepo
- **Biome** — линтинг и форматирование
- **Auto (.autorc)** — автоматизация релизов
- **CodeRabbit** — автоматизированные ревью

#### Уровень автоматизации: 🟢 Высокий
- ✅ Auto для релизов
- ✅ Scripts для registry
- ✅ CodeRabbit для ревью

---

### 10. KokonutUI

**Репозиторий:** [kokonut-labs/kokonutui](https://github.com/kokonut-labs/kokonutui)

#### Структура

```
app/                 # Next.js приложение
components/          # React компоненты
registry/            # Registry конфигурация
content/docs/        # Документация
hooks/               # Кастомные хуки
lib/                 # Утилиты
scripts/             # Build скрипты
config/              # Конфигурации
```

#### Конфигурационные файлы

- `registry.json` — каталог компонентов
- `components.json` — конфигурация shadcn

#### Contributing

Открытый подход: "Feel free to create any pull requests or issues"

#### Уровень автоматизации: 🟡 Средний
- ✅ Registry структура
- ✅ Vercel OSS sponsor
- ❌ Нет детального contributing guide

---

### 11. UI Layouts

**Репозиторий:** [ui-layouts/uilayouts](https://github.com/ui-layouts/uilayouts)

#### Структура monorepo

```
apps/ui-layout/      # Основное приложение
packages/            # Shared пакеты
```

#### Требования к компонентам

```bash
# Обязательные зависимости
tailwindcss
framer-motion
clsx
tailwind-merge
```

```typescript
// Обязательный cn() helper
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

#### Уровень автоматизации: 🟡 Средний
- ✅ Turbo для monorepo
- ❌ Нет детального contributing

---

### 12. React Bits

**Репозиторий:** [DavidHDev/react-bits](https://github.com/DavidHDev/react-bits)

#### ⚠️ Важное ограничение

**Новые компоненты от сообщества НЕ принимаются!**

Только:
- Улучшения существующих компонентов
- Исправления ошибок

#### Требования к PR

1. **Все 4 варианта** компонента должны быть обновлены:
   - JS-CSS
   - JS-TW (Tailwind)
   - TS-CSS
   - TS-TW (Tailwind)

2. Тестирование на desktop и mobile
3. Проверка консоли на ошибки
4. Скриншоты/видео в PR

#### Branch naming

```
feat/<feature-name>
feat/fix-x-component
```

#### Уровень автоматизации: 🔴 Низкий
- ❌ Закрыто для новых компонентов
- ❌ Нет автогенерации

---

### 13. Intent UI

**Репозиторий:** [intentui/intentui](https://github.com/intentui/intentui)

#### Особенность: React Aria Components

Компоненты построены на базе **React Aria Components** от Adobe (accessibility-first).

#### Структура

```
src/                 # Исходный код
public/              # Статика
.husky/              # Git hooks
```

#### Конфигурация

- `registry.json` — регистр компонентов
- `source.config.ts` — конфигурация
- `biome.json` — линтинг

#### Уровень автоматизации: 🟡 Средний
- ✅ Registry JSON
- ✅ React Aria для accessibility
- ❌ Детали contributing не публичны

---

### 14. assistant-ui

**Репозиторий:** [assistant-ui/assistant-ui](https://github.com/assistant-ui/assistant-ui)

#### Структура monorepo

```
packages/            # Core библиотеки
apps/                # Приложения
examples/            # Демо и примеры
python/              # Python интеграции
scripts/             # Build скрипты
```

#### Tech stack

- **TypeScript** (71.6%)
- **MDX** (21.2%)
- **Python** (5.9%)
- **pnpm** + **Turbo** + **Biome**
- **Husky** для Git hooks

#### Масштаб проекта

- 2,401 commits
- 1,132 releases
- Backed by **Y Combinator**

#### Уровень автоматизации: 🟢 Высокий
- ✅ Mature monorepo setup
- ✅ Множество релизов (автоматизация)
- ✅ Changesets

---

## Сводная таблица (расширенная)

| Библиотека | Registry | Sidebar Auto | Monorepo | Build Tool | Contributing |
|------------|----------|--------------|----------|------------|--------------|
| shadcn/ui | JSON | ❌ | ✅ | shadcn build | ✅ Detailed |
| Magic UI | TypeScript | ❌ | ✅ | Custom | ✅ 5 files |
| Motion Primitives | ❌ | ❌ | ❌ | — | ✅ Basic |
| Cult UI | Per-component | ✅ Fumadocs | ✅ | shadcn build | ✅ Basic |
| 8bitcn | JSON | ❌ | ❌ | shadcn build | ❌ |
| Animate UI | TypeScript | ❌ | ✅ | pnpm registry:build | ✅ Detailed |
| **Eldora UI** | TypeScript | ❌ | ❌ | pnpm build:registry | ✅ 5 files |
| **Dice UI** | Packages | ❌ | ✅ | tsup | ✅ Detailed |
| **Kibo UI** | Scripts | ❌ | ✅ | tsup + auto | ✅ |
| **KokonutUI** | JSON | ❌ | ❌ | — | 🟡 Open |
| **UI Layouts** | — | ❌ | ✅ | Turbo | 🟡 Basic |
| **React Bits** | — | ❌ | ❌ | — | ⚠️ Closed |
| **Intent UI** | JSON | ❌ | ❌ | — | 🟡 Basic |
| **assistant-ui** | Packages | ❌ | ✅ | Turbo | ✅ |

---

## Ключевые инсайты

### 1. Паттерн "5 файлов"

Magic UI и Eldora UI используют структурированный подход:
1. Компонент
2. Демо
3. MDX документация
4. Registry UI
5. Registry Examples

**Время добавления:** ~10 минут

### 2. Monorepo = масштабируемость

Крупные проекты (Dice UI, Kibo UI, assistant-ui) используют:
- **Turbo** для orchestration
- **pnpm workspaces**
- **Changesets** для версионирования
- **tsup** для сборки пакетов

### 3. React Aria для accessibility

Intent UI и Dice UI строят компоненты на React Aria — это обеспечивает WAI-ARIA compliance "из коробки".

### 4. Fumadocs — единственное решение для auto-sidebar

Только **Cult UI** использует Fumadocs для автоматической генерации навигации. Остальные — вручную.

### 5. Закрытый contributing (React Bits)

Некоторые популярные библиотеки **не принимают** новые компоненты от сообщества — только bugfixes.

---

## Источники

- [shadcn/ui Registry Template](https://github.com/shadcn-ui/registry-template)
- [Magic UI](https://github.com/magicuidesign/magicui)
- [Motion Primitives](https://github.com/ibelick/motion-primitives)
- [Cult UI](https://github.com/nolly-studio/cult-ui)
- [8bitcn/ui](https://github.com/TheOrcDev/8bitcn-ui)
- [Animate UI](https://github.com/animate-ui/animate-ui)
- [Eldora UI](https://github.com/karthikmudunuri/eldoraui)
- [Dice UI](https://github.com/sadmann7/diceui)
- [Kibo UI](https://github.com/haydenbleasel/kibo)
- [KokonutUI](https://github.com/kokonut-labs/kokonutui)
- [UI Layouts](https://github.com/ui-layouts/uilayouts)
- [React Bits](https://github.com/DavidHDev/react-bits)
- [Intent UI](https://github.com/intentui/intentui)
- [assistant-ui](https://github.com/assistant-ui/assistant-ui)
- [Fumadocs](https://fumadocs.dev/)
- [shadcn Registry Documentation](https://ui.shadcn.com/docs/registry)
