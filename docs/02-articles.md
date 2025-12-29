# 10 статей о создании компонентных библиотек (2023-2025)

## Сводная таблица

| #   | Тема                             | Источник        | Год  |
| --- | -------------------------------- | --------------- | ---- |
| 1   | shadcn Registry (основы)         | ui.shadcn.com   | 2024 |
| 2   | shadcn Registry (начало работы)  | ui.shadcn.com   | 2024 |
| 3   | Публикация кастомных компонентов | niels.foo       | 2024 |
| 4   | React + TypeScript библиотека    | LogRocket       | 2024 |
| 5   | Библиотека с Storybook           | Dev.to          | 2024 |
| 6   | Vite для библиотек               | victorlillo.dev | 2024 |
| 7   | Экосистема shadcn                | Dev.to          | 2024 |
| 8   | Turborepo монорепо               | mavro.dev       | 2024 |
| 9   | Design tokens                    | Penpot          | 2024 |
| 10  | Управление UI-компонентами       | ouassim.tech    | 2024 |

---

## 1. Официальная документация shadcn/ui Registry

**URL:** https://ui.shadcn.com/docs/registry

**Краткое содержание:**

- Полное руководство по созданию собственного registry
- Структура `registry.json` с полями: name, homepage, items
- Поддержка любых фреймворков (Next.js, Vite, Vue, Svelte)
- Типы элементов: `registry:ui`, `registry:block`, `registry:hook`
- Автоматическая генерация через `shadcn build`

**Ключевые выводы:**

- Registry — система дистрибуции кода, не привязанная к npm
- Компоненты устанавливаются в исходный код проекта
- С августа 2024 CLI поддерживает пользовательские registry

---

## 2. Getting Started with shadcn Registry

**URL:** https://ui.shadcn.com/docs/registry/getting-started

**Краткое содержание:**

- Пошаговая инструкция создания registry с нуля
- Структура: `registry/[STYLE]/[NAME]/component.tsx`
- Конфигурация через `package.json` скрипт `registry:build`
- Тестирование: `http://localhost:3000/r/[NAME].json`
- Публикация через Vercel или другой хостинг

**Ключевые выводы:**

- Используйте [registry-template](https://github.com/shadcn-ui/registry-template)
- Указывайте `registryDependencies` и `dependencies`
- Путь импорта `@/registry` обязателен

---

## 3. Publishing Custom shadcn/ui Components

**URL:** https://www.niels.foo/post/publishing-custom-shadcn-ui-components

**Краткое содержание:**

- Практическое руководство по публикации кастомных компонентов
- Build-скрипт на TypeScript для генерации JSON-схем
- Метаданные: `cssVars`, `tailwind config`, зависимости
- Next.js + Vercel для хостинга
- Полный контроль над обновлениями

**Ключевые выводы:**

- Registry упрощает переиспользование между проектами
- Компоненты в исходном коде, а не в node_modules
- Гибкость выше, чем у npm-пакетов

---

## 4. How to Build a Component Library with React and TypeScript

**URL:** https://blog.logrocket.com/how-to-build-component-library-react-typescript/

**Краткое содержание:**

- Принцип единственной ответственности (SRP)
- Структура: компонент/стили/типы/тесты в одной директории
- Сборка через Rollup (CommonJS и ESM)
- TypeScript интерфейсы для props
- React в `peerDependencies`

**Ключевые выводы:**

- Разделяйте логику, стили и представление
- PascalCase для имён компонентов
- Storybook для документирования

---

## 5. Build and Publish a Component Library (React + Storybook)

**URL:** https://dev.to/abhijitdotsharma/build-and-publish-a-component-library-react-typescript-storybook-34ba

**Краткое содержание:**

- Инициализация с TypeScript и React как devDependencies
- `tsconfig.json` для ESNext модулей и declaration файлов
- Rollup с плагинами: node-resolve, typescript, commonjs, dts
- Публикация на npm с entry points (main, module, types)
- Тестирование через npm install

**Ключевые выводы:**

- index.ts на каждом уровне для удобного импорта
- `npm link` для локального тестирования
- CSS файлы импортируются в компоненты

---

## 6. React Component Library with Vite

**URL:** https://victorlillo.dev/blog/react-typescript-vite-component-library

**Краткое содержание:**

- Vite Library Mode для сборки
- `vite-plugin-dts` для генерации типов
- `vite-plugin-lib-inject-css` для стилей
- ESLint v9, Prettier, Stylelint
- Vitest + React Testing Library

**Ключевые выводы:**

- Vite быстрее Rollup для современных проектов
- `prepublishOnly` гарантирует прохождение тестов
- `type: "module"` и правильные exports

---

## 7. 10 Component Libraries for shadcn UI

**URL:** https://dev.to/bytefer/10-component-libraries-you-must-know-to-use-shadcn-ui-3ma1

**Краткое содержание:**

- **Plate** (11K+ stars) — rich-text редактор
- **Vaul** (6.3K+ stars) — drawer для мобильных
- **Autoform** (2.9K+ stars) — автогенерация форм
- **shadcn-table** (2.7K+ stars) — серверная сортировка
- **emblor** — tag input, **sortable** — drag-and-drop

**Ключевые выводы:**

- shadcn расширяется через экосистему
- MIT-лицензия и совместимость
- Выбирайте компоненты под конкретные use cases

---

## 8. Building Production-Ready Monorepo with Turborepo

**URL:** https://mavro.dev/blog/building-production-monorepo-turborepo

**Краткое содержание:**

- Трёхуровневая архитектура: Apps, Packages, Config packages
- Оркестрация через `^build` в turbo.json
- Syncpack для единых версий зависимостей
- Smart компоненты (apps) vs Pure компоненты (packages)
- CI/CD pipeline с удалённым кешированием

**Ключевые выводы:**

- Холодная сборка: 2м 34с, с кешем: 0,8с
- "Если две части нуждаются в коде, он становится пакетом"
- Turborepo идеален для design system

---

## 9. Design Tokens and CSS Variables

**URL:** https://penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables/

**Краткое содержание:**

- Трёхуровневая структура: primitives → semantic → component
- Naming: `category/type/property/variant/state`
- CSS переменные в `:root`
- Темизация через переопределение примитивов
- Accessibility: high-contrast, color blindness

**Ключевые выводы:**

- Токены — единый источник правды
- Переменные для повторяющихся значений
- Lint для проверки целостности токенов

---

## 10. Shadcn Registry: A Better Way to Manage UI Components

**URL:** https://ouassim.tech/notes/shadcn-registry-a-better-way-to-manage-your-ui-components/

**Краткое содержание:**

- Полный контроль над настройкой и обновлениями
- Согласованность с гибкостью для кастомизации
- `registry-item.json` для элементов реестра
- Обновление `tailwind.config.ts`
- Переадресация Next.js для URL-схемы

**Ключевые выводы:**

- Registry лучше npm для внутренних библиотек
- `--output` флаг для изменения директории
- Деплой на публичный URL для команды

---

## Дополнительные ресурсы

### GitHub репозитории

- [shadcn-ui/registry-template](https://github.com/shadcn-ui/registry-template)
- [vantezzen/shadcn-registry-template](https://github.com/vantezzen/shadcn-registry-template)

### Vercel Templates

- [Design System with Turborepo](https://vercel.com/templates/react/turborepo-design-system)
- [Monorepo with Turborepo](https://vercel.com/templates/next.js/monorepo-turborepo)

---

## Общие выводы

1. **shadcn Registry** становится стандартом для UI-компонентов в 2024-2025
2. **Архитектура**: единственная ответственность, разделение concerns, строгая типизация
3. **Инструменты**: Vite вытесняет CRA, Rollup для библиотек, Turborepo для монорепо
4. **Design tokens** с трёхуровневой структурой обеспечивают масштабируемость
5. **Storybook** — обязательный инструмент для документации
