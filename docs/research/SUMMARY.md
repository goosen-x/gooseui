# Сводный отчёт: Исследование библиотек компонентов

> **Дата исследования:** 28 декабря 2025
> **Исследовано библиотек:** 20
> **Цель:** Выявление лучших практик и идей для GooseLabs UI

---

## Обзор исследованных библиотек

### Статистика

| Категория | Библиотек | Примеры |
|-----------|-----------|---------|
| Анимации и эффекты | 5 | MagicUI, Aceternity UI, Motion Primitives, Animate UI, SmoothUI |
| AI и чат-интерфейсы | 2 | Assistant UI, Prompt Kit |
| Стилизованные | 3 | RetroUI, 8bitcn, Cult UI |
| Общего назначения | 5 | KokonutUI, Eldora UI, HextaUI, DiceUI, React Bits |
| Блоки и layouts | 3 | ShadcnBlocks, UI Layouts, Kibo UI |
| Специализированные | 2 | Plate (редактор), Supabase UI (realtime) |

---

## Топ-библиотеки по категориям

### 🏆 Лучшие для анимаций

| Библиотека | GitHub Stars | Уникальные компоненты |
|------------|--------------|----------------------|
| **MagicUI** | 19.8k | Border Beam, Animated Beam, Globe, Orbiting Circles |
| **React Bits** | 21k | Aurora, Hyperspeed, BlobCursor, SplashCursor |
| **Motion Primitives** | - | Text Scramble, Border Trail, Morphing Dialog |
| **Aceternity UI** | - | 3D GitHub Globe, Parallax Scroll, Spotlight |

### 🤖 Лучшие для AI-интерфейсов

| Библиотека | GitHub Stars | Особенности |
|------------|--------------|-------------|
| **Assistant UI** | 7.8k | 15+ AI провайдеров, Thread/Composer/Message примитивы |
| **Prompt Kit** | 2.4k | Chain of Thought, Reasoning, 12 loader вариантов |

### 🎨 Лучшие стилизованные

| Библиотека | Стиль | GitHub Stars |
|------------|-------|--------------|
| **RetroUI** | NeoBrutalism | 1.2k |
| **8bitcn** | 8-bit/Retro Gaming | 1.4k |

### 📦 Лучшие для блоков

| Библиотека | Блоков | Особенности |
|------------|--------|-------------|
| **ShadcnBlocks** | 1110+ | Figma Kit, 11 шаблонов, API для CLI |
| **Kibo UI** | 41 | Gantt, Kanban, Rich Editor |

---

## Ключевые технические паттерны

### 1. Модель распространения

**Copy-paste через shadcn CLI** — доминирующий подход:

```bash
npx shadcn@latest add @[registry]/[component]
```

**Преимущества:**
- Полный контроль над кодом
- Нет vendor lock-in
- Лёгкая кастомизация

### 2. Технологический стек

| Технология | Использование | Примечание |
|------------|---------------|------------|
| **React + TypeScript** | 100% | Стандарт индустрии |
| **TailwindCSS** | 100% | Обязательная зависимость |
| **Framer Motion** | 85% | Основная библиотека анимаций |
| **Radix UI** | 70% | Доступность и примитивы |
| **GSAP** | 20% | Сложные анимации |
| **Three.js** | 15% | 3D эффекты |

### 3. MCP Server интеграция

Многие библиотеки предоставляют MCP серверы для AI-ассистентов:
- MagicUI
- Eldora UI
- SmoothUI
- Prompt Kit
- React Bits

### 4. Цветовая система

**OKLCH** становится стандартом:
```css
--brand-primary: oklch(0.72 0.2 352.53);
```

---

## Уникальные компоненты для внедрения

### Высокий приоритет (часто встречаются, высокий спрос)

| Компонент | Источник | Описание |
|-----------|----------|----------|
| **Border Beam** | MagicUI | Анимированная граница |
| **Animated Beam** | MagicUI | Соединительные лучи |
| **Globe** | Multiple | 3D интерактивный глобус |
| **Dock** | Cult UI, React Bits | macOS-style dock |
| **Dynamic Island** | SmoothUI | Apple-style уведомления |
| **Number Flow** | Multiple | Анимированные числа |
| **Kanban** | DiceUI, Kibo UI | Drag-and-drop доски |
| **Data Table** | DiceUI | Продвинутые таблицы |

### Средний приоритет (уникальные решения)

| Компонент | Источник | Описание |
|-----------|----------|----------|
| **Text Scramble** | Motion Primitives | Matrix-style эффект |
| **Siri Orb** | SmoothUI | AI-визуализация |
| **Liquid Glass** | KokonutUI | Glassmorphism |
| **Device Mockups** | Eldora UI | iPhone, MacBook, iPad |
| **Health/Mana Bar** | 8bitcn | Игровые индикаторы |
| **Tour** | DiceUI | Onboarding |

### Низкий приоритет (нишевые)

| Компонент | Источник | Описание |
|-----------|----------|----------|
| **Contribution Graph** | SmoothUI | GitHub-style |
| **WebGL Shaders** | Cult UI | Визуальные эффекты |
| **Realtime Cursors** | Supabase UI | Коллаборация |

---

## Рекомендации для GooseLabs UI

### 1. Архитектура

```
gooselabs-ui/
├── registry/
│   ├── ui/          # Базовые компоненты
│   ├── blocks/      # Готовые секции
│   └── effects/     # Анимации и эффекты
├── docs/            # Документация
└── examples/        # Примеры использования
```

### 2. Обязательные зависимости

```json
{
  "peerDependencies": {
    "react": "^18.0.0",
    "tailwindcss": "^3.4.0 || ^4.0.0",
    "motion": "^11.0.0"
  }
}
```

### 3. CLI команды

```bash
# Инициализация
npx gooselabs init

# Добавление компонента
npx gooselabs add button
npx gooselabs add @gooselabs/border-beam

# Просмотр компонента
npx gooselabs view button
```

### 4. Категории компонентов

1. **Core UI** — Button, Card, Input, Dialog, etc.
2. **Data Display** — Table, Charts, Stats
3. **Navigation** — Tabs, Sidebar, Dock
4. **Feedback** — Toast, Progress, Skeleton
5. **Animation** — Text effects, Borders, Cursors
6. **AI** — Chat, Message, Composer
7. **3D** — Globe, Blobs, Particles
8. **Blocks** — Hero, Pricing, Features, Footer

### 5. Документация

Рекомендуемая структура страницы компонента:
1. Название и описание
2. Живой пример (preview)
3. Установка (CLI команда)
4. Использование (код)
5. Props API (таблица)
6. Вариации
7. Accessibility notes
8. Related components

---

## Метрики успешных библиотек

| Библиотека | Stars | Фактор успеха |
|------------|-------|---------------|
| React Bits | 21k | Уникальные анимации, 4 варианта кода |
| MagicUI | 19.8k | Landing-фокус, MCP интеграция |
| Plate | 15.7k | Специализация (редактор), глубина |
| Assistant UI | 7.8k | AI-тренд, 15+ провайдеров |
| Kibo UI | 3.5k | Сложные компоненты (Gantt, Kanban) |

### Ключевые факторы успеха:
1. **Уникальность** — компоненты, которых нет в других библиотеках
2. **Качество документации** — живые примеры, понятный API
3. **Лёгкость интеграции** — shadcn CLI совместимость
4. **Активное развитие** — регулярные обновления
5. **Социальное доказательство** — примеры использования

---

## Заключение

Исследование 20 библиотек выявило чёткие тренды:

1. **shadcn/ui ecosystem** — доминирующая модель распространения
2. **Motion/Framer Motion** — стандарт для анимаций
3. **AI-компоненты** — растущий сегмент
4. **Copy-paste** — предпочтительнее npm-зависимостей
5. **MCP интеграция** — конкурентное преимущество

Для GooseLabs UI рекомендуется:
- Следовать shadcn-модели установки
- Фокусироваться на уникальных компонентах
- Обеспечить качественную документацию
- Интегрировать MCP server
- Поддерживать как CSS, так и Tailwind варианты

---

## Файлы исследования

| Библиотека | Файл |
|------------|------|
| MagicUI | [magicui.md](./libraries/magicui.md) |
| Aceternity UI | [aceternity-ui.md](./libraries/aceternity-ui.md) |
| Motion Primitives | [motion-primitives.md](./libraries/motion-primitives.md) |
| Animate UI | [animate-ui.md](./libraries/animate-ui.md) |
| SmoothUI | [smoothui.md](./libraries/smoothui.md) |
| Assistant UI | [assistant-ui.md](./libraries/assistant-ui.md) |
| Prompt Kit | [prompt-kit.md](./libraries/prompt-kit.md) |
| RetroUI | [retroui.md](./libraries/retroui.md) |
| 8bitcn | [8bitcn.md](./libraries/8bitcn.md) |
| Cult UI | [cult-ui.md](./libraries/cult-ui.md) |
| KokonutUI | [kokonutui.md](./libraries/kokonutui.md) |
| Eldora UI | [eldora-ui.md](./libraries/eldora-ui.md) |
| HextaUI | [hextaui.md](./libraries/hextaui.md) |
| DiceUI | [diceui.md](./libraries/diceui.md) |
| React Bits | [react-bits.md](./libraries/react-bits.md) |
| ShadcnBlocks | [shadcnblocks.md](./libraries/shadcnblocks.md) |
| UI Layouts | [ui-layouts.md](./libraries/ui-layouts.md) |
| Kibo UI | [kibo-ui.md](./libraries/kibo-ui.md) |
| Plate | [plate.md](./libraries/plate.md) |
| Supabase UI | [supabase-ui.md](./libraries/supabase-ui.md) |
