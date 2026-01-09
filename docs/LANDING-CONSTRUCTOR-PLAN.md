# Landing Page Constructor - План реализации

## Концепция

**Бесплатно:** Blocks (отдельные секции для лендинга)
**Платно:** Landing Constructor — визуальный конструктор лендинга с экспортом через shadcn CLI

## Структура конструктора

```
┌─────────────────────────────────────────┐
│           HEADER (выбор из 3+)          │
├─────────────────────────────────────────┤
│           HERO (слайдер вариантов)      │
├─────────────────────────────────────────┤
│           BRANDS (слайдер)              │
├─────────────────────────────────────────┤
│           SERVICES (слайдер)            │
├─────────────────────────────────────────┤
│           [+ Добавить секцию]           │
├─────────────────────────────────────────┤
│           FOOTER (выбор из 3+)          │
└─────────────────────────────────────────┘
```

## Секции конструктора

### 1. Header (обязательно)
- header-01: Simple Header
- header-02: Header with CTA
- header-03: Header with Auth
- + новые варианты

### 2. Hero (обязательно)
- hero-01: Classic Hero (заголовок + CTA + изображение)
- hero-02: Split Hero (текст слева, изображение справа)
- hero-03: Video Hero (с фоновым видео)
- hero-04: Animated Hero (с анимациями)
- hero-05: Gradient Hero (градиентный фон)

### 3. Brands/Logos (опционально)
- brands-01: Logo Carousel (бегущая строка)
- brands-02: Logo Grid (сетка)
- brands-03: Logo with Text ("Нам доверяют")

### 4. Services/Features (опционально)
- services-01: Cards Grid (сетка карточек)
- services-02: Bento Grid (bento-стиль)
- services-03: Icon List (список с иконками)
- services-04: Tabs (табы с контентом)

### 5. Дополнительные секции
- pricing: Таблица цен
- testimonials: Отзывы
- faq: Вопросы и ответы
- cta: Call to Action
- stats: Статистика/метрики
- team: Команда
- contact: Контакты/форма

### 6. Footer (обязательно)
- footer-01: Simple Footer
- footer-02: Multi-Column Footer
- footer-03: Footer with Newsletter

## UI конструктора

### Левая панель (Preview)
```
┌────────────────────────────────────┐
│  [Desktop] [Tablet] [Mobile]       │
├────────────────────────────────────┤
│                                    │
│         Live Preview               │
│         (iframe)                   │
│                                    │
└────────────────────────────────────┘
```

### Правая панель (Sections)
```
┌────────────────────────────────────┐
│  Sections                    [+]   │
├────────────────────────────────────┤
│  ☰ Header      [header-01 ▼]       │
│  ☰ Hero        [hero-02 ▼]         │
│  ☰ Brands      [brands-01 ▼]  [×]  │
│  ☰ Services    [services-03 ▼][×]  │
│  ☰ Footer      [footer-02 ▼]       │
├────────────────────────────────────┤
│  [Download Landing]                │
└────────────────────────────────────┘
```

### Слайдер выбора варианта
```
┌────────────────────────────────────────────┐
│  Select Hero Section                       │
├────────────────────────────────────────────┤
│  ◀ [Preview 1] [Preview 2] [Preview 3] ▶   │
│                                            │
│     hero-01      hero-02      hero-03      │
│     Classic      Split        Video        │
└────────────────────────────────────────────┘
```

## Экспорт

### Команда скачивания
```bash
npx shadcn@latest add "https://gooseui.pro/r/landing/{config-hash}.json"
```

### Структура экспорта
```
components/
├── landing/
│   ├── header.tsx
│   ├── hero.tsx
│   ├── brands.tsx
│   ├── services.tsx
│   └── footer.tsx
└── page.tsx (собранный лендинг)
```

## Файловая структура проекта

```
app/
├── (marketing)/
│   └── constructor/
│       └── page.tsx              # Страница конструктора
│
├── api/
│   └── landing/
│       └── [hash]/
│           └── route.ts          # API для генерации JSON

components/
├── constructor/
│   ├── constructor-preview.tsx   # Live preview iframe
│   ├── constructor-sidebar.tsx   # Панель секций
│   ├── section-picker.tsx        # Слайдер выбора
│   ├── section-item.tsx          # Элемент секции (drag)
│   └── download-button.tsx       # Кнопка скачивания

lib/
├── constructor/
│   ├── types.ts                  # Типы конструктора
│   ├── sections.ts               # Реестр секций
│   ├── generate-landing.ts       # Генерация кода
│   └── hash.ts                   # Хеширование конфига

registry/new-york/blocks/
├── hero/
│   ├── hero-classic.tsx
│   ├── hero-split.tsx
│   └── hero-video.tsx
├── brands/
│   ├── brands-carousel.tsx
│   └── brands-grid.tsx
├── services/
│   ├── services-cards.tsx
│   ├── services-bento.tsx
│   └── services-tabs.tsx
```

## Монетизация

### Бесплатно
- Просмотр всех блоков
- Копирование кода вручную
- 1 экспорт в день (?)

### Pro ($X/месяц)
- Неограниченные экспорты
- Доступ к premium секциям
- Сохранение конфигураций
- Кастомизация цветов/шрифтов
- Приоритетная поддержка

## Этапы реализации

### Этап 1: Блоки (2-3 недели)
- [ ] Создать hero секции (5 вариантов)
- [ ] Создать brands секции (3 варианта)
- [ ] Создать services секции (4 варианта)
- [ ] Добавить в registry

### Этап 2: Конструктор UI (1-2 недели)
- [ ] Страница /constructor
- [ ] Live preview компонент
- [ ] Sidebar с секциями
- [ ] Drag & drop сортировка
- [ ] Слайдер выбора вариантов

### Этап 3: Экспорт (1 неделя)
- [ ] API генерации JSON
- [ ] Хеширование конфигурации
- [ ] Генерация page.tsx
- [ ] Тестирование shadcn add

### Этап 4: Монетизация (1 неделя)
- [ ] Интеграция Stripe/Paddle
- [ ] Система лицензий
- [ ] Rate limiting для бесплатных
- [ ] Dashboard пользователя

## Технические детали

### Конфигурация лендинга
```typescript
interface LandingConfig {
  id: string
  sections: SectionConfig[]
  theme?: {
    primaryColor?: string
    font?: string
  }
}

interface SectionConfig {
  type: 'header' | 'hero' | 'brands' | 'services' | 'footer' | ...
  variant: string  // e.g., 'hero-02'
  order: number
  props?: Record<string, unknown>
}
```

### API Response
```json
{
  "name": "landing-abc123",
  "type": "registry:block",
  "files": [
    {
      "path": "components/landing/page.tsx",
      "type": "registry:component"
    },
    {
      "path": "components/landing/header.tsx",
      "type": "registry:component"
    }
  ],
  "dependencies": ["lucide-react", "framer-motion"]
}
```

## Конкуренты для анализа

- [blocks.so](https://blocks.so) - UI blocks marketplace
- [tailblocks.cc](https://tailblocks.cc) - Free Tailwind blocks
- [shuffle.dev](https://shuffle.dev) - Visual editor ($$$)
- [relume.io](https://relume.io) - AI landing builder

## Следующие шаги

1. **Сначала:** Создать базовые hero/brands/services блоки
2. **Затем:** Простой конструктор без монетизации
3. **Потом:** Добавить экспорт через shadcn
4. **Наконец:** Монетизация
