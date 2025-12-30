# Navbar Improvements

#p2 #ui #navigation

## Текущее состояние

Навигация сайта GooseUI включает:
- Header с логотипом и основными ссылками
- Docs sidebar с категориями компонентов
- Site search (Cmd+K)

## Идеи для улучшения

### 1. Mega Menu для компонентов

Добавить выпадающее меню при наведении на "Components":

```
┌─────────────────────────────────────────────────────────────────────┐
│ [GooseUI]  [Docs]  [Components ▼]  [Blocks]  [Pricing]     [Search] │
├─────────────────────────────────────────────────────────────────────┤
│  ┌───────────────┬───────────────┬───────────────┬───────────────┐  │
│  │ Getting       │ Components    │ Effects       │ Blocks        │  │
│  │ Started       │               │               │               │  │
│  │               │ Button        │ Border Beam   │ Web3          │  │
│  │ Introduction  │ Card          │ Glow          │ Dashboard     │  │
│  │ Installation  │ Input         │ Shine         │ Marketing     │  │
│  │ CLI           │ Toast         │               │ E-commerce    │  │
│  │               │ Carousel      │               │               │  │
│  │               │ + 10 more     │               │ [Browse All]  │  │
│  └───────────────┴───────────────┴───────────────┴───────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

### 2. Sticky Header с прогрессом чтения

- Header прилипает при скролле
- Progress bar показывает прогресс чтения страницы
- Уменьшается высота при скролле

### 3. Breadcrumbs в Header

Показывать путь к текущей странице:

```
[GooseUI] / Docs / Components / Button
```

### 4. Command Menu (Cmd+K) улучшения

- [ ] Группировка по категориям
- [ ] Показывать превью компонентов
- [ ] Recent searches
- [ ] Keyboard navigation hints
- [ ] Фильтр по типу (components, effects, blocks)

### 5. Mobile Navigation

- Hamburger menu
- Bottom navigation bar
- Swipe gestures

### 6. Theme Toggle в Header

Уже реализовано, но можно улучшить:
- [ ] Анимация переключения
- [ ] System/Light/Dark picker

### 7. Version Selector

Показывать версию и возможность переключения:

```
[v1.0.0 ▼]
  └── v1.0.0 (current)
  └── v0.9.0
  └── v0.8.0
```

### 8. Локализация

Переключатель языка:
- [EN] / [RU]
- Флаги стран

## Референсы

| Сайт | Что нравится |
|------|--------------|
| shadcn/ui | Минималистичный header, отличный command menu |
| Radix | Mega menu, чистый дизайн |
| Vercel | Прогресс чтения, sticky header |
| Linear | Keyboard-first navigation |

## Приоритеты

1. **High**: Mega menu для компонентов
2. **High**: Улучшения Command Menu
3. **Medium**: Mobile navigation
4. **Medium**: Breadcrumbs
5. **Low**: Version selector
6. **Low**: Reading progress

---

Создано: 2024-12-30
Статус: idea
