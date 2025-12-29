# Package Manager Tabs

#p2 #component #docs

## Описание

Виджет для отображения команд установки с переключателем между npm/pnpm/yarn/bun и кнопкой копирования.

## Что хочется

- [ ] Табы: npm, pnpm, yarn, bun
- [ ] Запоминание выбора пользователя (localStorage)
- [ ] Кнопка Copy с фидбеком
- [ ] Подсветка синтаксиса команды
- [ ] Иконка терминала

## Референсы

| Библиотека | Ссылка                     | Что понравилось |
| ---------- | -------------------------- | --------------- |
| 8bitcn/ui  | https://8bitcn.com         | Полный виджет   |
| shadcn/ui  | https://ui.shadcn.com/docs | Простые табы    |

## Пример использования

```tsx
<PackageManagerTabs
  commands={{
    npm: "npx shadcn@latest add",
    pnpm: "pnpm dlx shadcn@latest add",
    yarn: "npx shadcn@latest add",
    bun: "bunx --bun shadcn@latest add",
  }}
  package="@gooseui/button"
/>
```

## Структура компонента

```tsx
// components/docs/package-manager-tabs.tsx
"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy, Check, Terminal } from "lucide-react"

interface PackageManagerTabsProps {
  commands: {
    npm: string
    pnpm: string
    yarn: string
    bun: string
  }
  package: string
}
```

## Задачи для реализации

- [ ] Создать компонент PackageManagerTabs
- [ ] Добавить копирование в буфер
- [ ] Сохранение выбора в localStorage
- [ ] Стилизация под GooseUI
- [ ] Интеграция в MDX документацию

---

Создано: 2024-12-29
Источник: 8bitcn/ui
Статус: idea
