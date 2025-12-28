# Шаблоны и стартеры для создания UI-библиотек

## Сводная таблица

| Шаблон | Технологии | Лучше для |
|--------|-----------|-----------|
| [shadcn registry-template](https://github.com/shadcn-ui/registry-template) | Next.js, Tailwind v4 | Создание registry |
| [Turborepo design-system](https://github.com/vercel/turborepo/tree/main/examples/design-system) | Turborepo, Storybook, tsup | Дизайн-система |
| [dan5py/turborepo-shadcn-ui](https://github.com/dan5py/turborepo-shadcn-ui) | Turborepo, shadcn, Next.js | Monorepo с shadcn |
| [typescript-react-package-starter](https://github.com/TimMikeladze/typescript-react-package-starter) | tsup, Storybook, Vitest | npm пакеты |
| Nx Workspace | Nx, Storybook | Enterprise |

---

## 1. Официальные шаблоны shadcn Registry

### 1.1 shadcn-ui/registry-template (Tailwind v4)

**URL:** https://github.com/shadcn-ui/registry-template

Официальный шаблон от создателей shadcn/ui.

**Технологии:**
- Next.js
- TypeScript (75.6%)
- Tailwind CSS v4
- pnpm
- shadcn CLI

**Как начать:**
```bash
git clone https://github.com/shadcn-ui/registry-template.git
cd registry-template
pnpm install
# Определите компоненты в registry.json
pnpm build  # запускает shadcn build
```

**Особенности:**
- Компоненты в `registry.json`
- Сборка через `shadcn build`
- Статические файлы в `public/r/[name].json`
- Интеграция с v0

---

### 1.2 shadcn-ui/registry-template-v3 (Tailwind v3)

**URL:** https://github.com/shadcn-ui/registry-template-v3

Версия для Tailwind CSS v3.

---

### 1.3 Альтернативные шаблоны

| Репозиторий | Описание |
|-------------|----------|
| [bcanfield/shadcn-registry-starter](https://github.com/bcanfield/shadcn-registry-starter) | Registry для организаций |
| [iloveitaly/shadcn-registry-template-github-pages](https://github.com/iloveitaly/shadcn-registry-template-github-pages) | GitHub Pages без Next.js |

---

## 2. Turborepo + shadcn Monorepo

### 2.1 dan5py/turborepo-shadcn-ui

**URL:** https://github.com/dan5py/turborepo-shadcn-ui

Turborepo стартер с shadcn/ui.

**Технологии:**
- Turborepo
- Next.js
- shadcn/ui
- Tailwind CSS
- pnpm

**Как начать:**
```bash
git clone https://github.com/dan5py/turborepo-shadcn-ui.git
cd turborepo-shadcn-ui
pnpm install
pnpm dev
```

---

### 2.2 Другие Turborepo стартеры

| Репозиторий | Описание |
|-------------|----------|
| [Binabh/vite-shadcn-turborepo](https://github.com/Binabh/vite-shadcn-turborepo) | React + Vite в Turborepo |
| [trungung/shadcn-vite-react-typescript-monorepo](https://github.com/trungung/shadcn-vite-react-typescript-monorepo) | Минимальный Vite monorepo |
| [bytaesu/turborepo-shadcn-tailwind-v4](https://github.com/bytaesu/turborepo-shadcn-tailwind-v4) | Tailwind CSS v4 |

---

## 3. Vercel Design System (Turborepo)

**URL:** https://github.com/vercel/turborepo/tree/main/examples/design-system

Официальный пример от Vercel.

**Технологии:**
- Turborepo
- React
- TypeScript
- Tsup (бандлер на esbuild)
- Storybook (на Vite)
- ESLint, Prettier
- Changesets (версионирование)
- GitHub Actions

**Структура:**
```
apps/
  docs/          # Storybook документация
packages/
  ui/            # React компоненты
  typescript-config/
  eslint-config/
```

**Как начать:**
```bash
npx create-turbo@latest -e design-system
cd my-turborepo
pnpm install
pnpm dev     # Storybook превью
pnpm build   # Сборка всех пакетов
```

---

## 4. Nx Monorepo

**URL:** https://nx.dev/

Nx для создания переиспользуемой библиотеки `ui`.

**Технологии:**
- Nx
- React / Angular / Vue
- TypeScript
- Storybook
- Jest
- ESLint

**Как начать:**
```bash
npx create-nx-workspace@latest my-org
cd my-org
nx g @nx/react:library ui
nx g @nx/storybook:configuration ui
```

**Особенности:**
- `--publishable` флаг для npm
- Storybook интеграция
- Atomic Design организация
- Инкрементальные сборки

---

## 5. Vite Library Mode

### 5.1 IgnacioNMiranda/vite-component-library-template

**URL:** https://github.com/IgnacioNMiranda/vite-component-library-template

Vite + React стартер.

---

### 5.2 rayyamhk/vite-react-component-library-starter

**URL:** https://github.com/rayyamhk/vite-react-component-library-starter

Полный набор инструментов для разработки и тестирования.

---

## 6. tsup-based шаблоны

### 6.1 TimMikeladze/typescript-react-package-starter

**URL:** https://github.com/TimMikeladze/typescript-react-package-starter

Разработка и публикация TypeScript/React пакетов.

**Технологии:**
- tsup (ESM и CJS)
- TypeScript
- React
- Storybook
- Vitest
- Biome (линтинг)
- PostCSS
- GitHub Actions

**Как начать:**
```bash
git clone https://github.com/TimMikeladze/typescript-react-package-starter.git
cd typescript-react-package-starter
pnpm install
pnpm dev
```

---

### 6.2 Другие tsup шаблоны

| Репозиторий | Описание |
|-------------|----------|
| [vfshera/tsup-react-library-starter](https://github.com/vfshera/tsup-react-library-starter) | Простой React с tsup |
| [Yukioru/react-library-tsup](https://github.com/Yukioru/react-library-tsup) | UI библиотека на React |

---

## 7. Storybook Design System

### 7.1 storybookjs/design-system (Официальный)

**URL:** https://github.com/storybookjs/design-system

Официальная дизайн-система Storybook.

---

### 7.2 chromaui/learnstorybook-design-system-template

**URL:** https://github.com/chromaui/learnstorybook-design-system-template

Boilerplate для туториала "Design Systems for Developers".

---

### 7.3 nima70/tailwind-shadcn-storybook-boilerplate

**URL:** https://github.com/nima70/tailwind-shadcn-storybook-boilerplate

Storybook + Tailwind + Shadcn.

---

## 8. CLI инструменты

### shadcn CLI

```bash
npx shadcn@latest init
npx shadcn@latest add button
npx shadcn build  # Сборка registry
```

### create-turbo

```bash
npx create-turbo@latest
npx create-turbo@latest -e design-system
```

### Nx CLI

```bash
npx create-nx-workspace@latest
nx g @nx/react:library ui --publishable
```

---

## Рекомендации по выбору

| Сценарий | Рекомендация |
|----------|--------------|
| **Быстрый старт registry** | [shadcn registry-template](https://github.com/shadcn-ui/registry-template) |
| **Полноценная дизайн-система** | [Turborepo design-system](https://github.com/vercel/turborepo/tree/main/examples/design-system) |
| **Monorepo с shadcn** | [dan5py/turborepo-shadcn-ui](https://github.com/dan5py/turborepo-shadcn-ui) |
| **Публикация npm пакета** | [typescript-react-package-starter](https://github.com/TimMikeladze/typescript-react-package-starter) |
| **Enterprise с Nx** | [Nx Workspace](https://nx.dev/) |
| **Только Storybook** | [storybookjs/design-system](https://github.com/storybookjs/design-system) |

---

## Источники

- [shadcn Registry Documentation](https://ui.shadcn.com/docs/registry)
- [shadcn Monorepo Guide](https://ui.shadcn.com/docs/monorepo)
- [Turborepo Design System Example](https://github.com/vercel/turborepo/tree/main/examples/design-system)
- [Vercel Monorepo Templates](https://vercel.com/templates/monorepos)
- [Nx Design System with Storybook](https://blog.nrwl.io/build-your-design-system-with-storybook-nx-e3bde4087ad8)
- [awesome-storybook](https://github.com/lauthieb/awesome-storybook)
