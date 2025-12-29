# 8bitcn/ui

https://8bitcn.com
https://github.com/theorcdev/8bitcn-ui

## Стек

- Next.js + TypeScript
- MDX для документации
- Drizzle ORM (для чего?)
- pnpm
- Biome (линтер)

## Что понравилось

### 1. Страница /components — грид всех компонентов
- Все компоненты на одной странице
- Удобно для обзора

### 2. Страница спонсоров
- Уровни: Mythic, Legendary и др.
- Кнопка "Become a Sponsor"
- Благодарности партнёрам

### 3. Search в header (⌘K)
- Быстрый поиск по документации
- Горячая клавиша Cmd+K

### 4. Package Manager Tabs
Виджет для копирования команд с переключателем:
- npm
- pnpm
- yarn
- bun

```tsx
// Примерная структура
<PackageManagerTabs
  command="shadcn@latest add"
  package="button"
/>
```

С кнопкой Copy для копирования команды.

### 5. Переключение темы
- Light/Dark
- Автоопределение системной темы

## Компоненты

- Buttons (пиксельный стиль)
- Dropdown Menu
- Slider, Switch
- Cards
- Dialog (Game Over, Main Menu)
- Alerts (Info, Warning)
- Select, DatePicker

## Структура репозитория

```
/components    — UI компоненты
/app           — Next.js app
/content/docs  — MDX документация
/db            — Drizzle ORM
/hooks         — React хуки
/lib           — утилиты
/server        — серверная логика
/public        — статика
```

## Заметки

- Концепт copy/paste, не npm пакет
- MIT лицензия
- 1.4k звёзд на GitHub
- Поддержка Vercel OSS
