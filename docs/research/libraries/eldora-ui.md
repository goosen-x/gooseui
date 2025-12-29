# Eldora UI - Исследование библиотеки

## Обзор

**Eldora UI** — это современная open-source библиотека UI компонентов для создания визуально привлекательных веб-интерфейсов. Позиционируется как "идеальный компаньон для shadcn/ui" и ориентирована на design engineers.

- **Официальный сайт**: https://www.eldoraui.site/
- **GitHub**: https://github.com/karthikmudunuri/eldoraui
- **Лицензия**: MIT
- **Статистика**: 1.8k+ звезд, 72 форка

## Технологический стек

- **React** — основной фреймворк
- **TypeScript** — типизация (85.5% кодовой базы)
- **Tailwind CSS** — стилизация
- **Framer Motion** — анимации
- **Radix UI** — примитивы для accessibility

## Ключевые особенности

1. **150+ анимированных компонентов** — готовые к использованию элементы
2. **Copy-paste подход** — компоненты копируются в проект, а не устанавливаются как зависимости
3. **Совместимость с shadcn/ui** — тот же процесс установки и CLI
4. **Поддержка темной темы** — все компоненты автоматически адаптируются
5. **WCAG accessibility** — соответствие стандартам доступности
6. **Tree-shaking** — оптимизированный размер бандла

## Каталог компонентов

### Mockups (Устройства)

- Browser
- iPad
- iPhone 17 Pro
- MacBook Pro
- Safari Browser

### Buttons (Кнопки)

- Animated Shiny Button
- Live Button
- Shimmer Button
- Spotlight Button
- Animated Border Button

### Text Animations (Текстовые анимации)

- Blur In Text
- Dock Text
- Fade Text
- Font Weight Text
- Gradual Spacing Text
- Letter Pull Up Text
- Multi Direction Slide Text
- Scale Letter Text
- Separate Away Text
- Wavy Text
- Word Pull Up Text

### Core Components (Основные компоненты)

- Animated Badge
- Animated List
- Bento Grid
- Card Flip Hover
- Clerk OTP
- Cobe Globe
- Code Snippet
- Dynamic Square
- Features
- GitHub Inline Comments
- Grid
- Integrations
- Logo Cloud
- Logo Timeline
- Map
- Orbit Rotation
- Scratch To Reveal
- Scale Slider
- Scroll Progress
- Signature
- Sphere Animation
- Static Stepper
- Terminal
- Testimonial Slider
- Testimonials
- Tweet Grid
- Wrap Container

### Special Animations (Специальные анимации)

- Animated Frameworks
- SVG Ripple Effect

### Backgrounds (Фоны)

- Hacker Background
- Novatrix Background

## Установка

### Метод 1: CLI (рекомендуемый)

Eldora UI использует тот же процесс установки, что и shadcn/ui:

```bash
# Инициализация проекта
pnpm dlx shadcn@latest init

# Добавление компонента
pnpm dlx shadcn@latest add @eldoraui/terminal

# Или через прямой URL
npx shadcn@latest add 'https://eldoraui.site/r/terminal'
```

### Метод 2: Ручная установка

1. Установите зависимости:

```bash
npm i clsx tailwind-merge tailwind-variants framer-motion
```

2. Создайте утилиту для классов в `utils/classes.ts`:

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

3. Скопируйте код нужного компонента из документации

## MCP Server (интеграция с AI)

Eldora UI предоставляет официальный MCP сервер для интеграции с AI-ассистентами:

### Автоматическая установка

```bash
npx @eldoraui/cli@latest install <client>
```

Поддерживаемые клиенты: `cursor`, `windsurf`, `claude`, `cline`, `roo-cline`

### Ручная установка

Добавьте в конфигурацию MCP вашей IDE:

```json
{
  "mcpServers": {
    "@eldoraui/mcp": {
      "command": "npx",
      "args": ["-y", "@eldoraui/mcp@latest"]
    }
  }
}
```

### Доступные инструменты MCP

- **getUIComponents** — полный каталог компонентов
- **getLayout** — компоненты сеток и разметки
- **getMedia** — терминалы, маркизы, комментарии
- **getMotion** — анимационные компоненты
- **getTextEffects** — текстовые эффекты
- **getButtons** — специализированные кнопки
- **getEffects** — сложные эффекты (глобусы, ripple)
- **getBackgrounds** — фоны
- **getDevices** — имитаторы устройств

## Версия 2.0

Eldora UI 2.0 включает следующие улучшения:

- **50+ блоков и шаблонов** для быстрого создания landing pages
- **13 новых текстовых анимаций**
- **Интерактивные hover-эффекты** для карточек и кнопок
- **Улучшенная документация** с live-демонстрациями
- **Оптимизация производительности** — уменьшен размер бандла

## Структура проекта

Репозиторий организован как monorepo с использованием pnpm workspaces:

```
eldoraui/
├── apps/
│   └── www/           # Документация и сайт
├── registry.json      # Реестр компонентов
├── turbo.json         # Конфигурация Turborepo
├── pnpm-workspace.yaml
└── lefthook.yml       # Git hooks
```

## Вдохновение

Библиотека создана под влиянием:

- shadcn/ui
- Aceternity UI
- Magic UI

## Сравнение с аналогами

| Особенность       | Eldora UI | shadcn/ui | Magic UI |
| ----------------- | --------- | --------- | -------- |
| Анимации          | +++       | +         | +++      |
| Компоненты        | 150+      | 50+       | 50+      |
| CLI               | shadcn    | shadcn    | shadcn   |
| MCP Server        | Да        | Да        | Нет      |
| Mockups устройств | Да        | Нет       | Нет      |

## Применение

Eldora UI идеально подходит для:

- **Landing pages** — блоки, герои, features
- **Marketing сайты** — testimonials, pricing, logo clouds
- **Portfolio** — готовые шаблоны
- **SaaS продукты** — интерактивные демо, онбординг

## Ресурсы

- **Документация**: https://eldoraui.site/docs
- **Компоненты**: https://eldoraui.site/docs/components
- **GitHub**: https://github.com/karthikmudunuri/eldoraui
- **Discord**: Ссылка на сайте
- **NPM MCP**: @eldoraui/mcp

## Источники

- [Eldora UI - Официальный сайт](https://www.eldoraui.site/)
- [GitHub - karthikmudunuri/eldoraui](https://github.com/karthikmudunuri/eldoraui)
- [Introducing Eldora UI - DEV Community](https://dev.to/karthikmudunuri/introducing-eldora-ui-22m5)
- [Introducing EldoraUI 2.0 - DEV Community](https://dev.to/karthikmudunuri/introducing-eldoraui-20-11f6)
- [GitHub - eldorauiofficial/mcp](https://github.com/eldorauiofficial/mcp)
- [Eldora UI - Product Hunt](https://www.producthunt.com/products/eldora-ui)

---

_Исследование проведено: 2025-12-28_
