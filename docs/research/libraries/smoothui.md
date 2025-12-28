# SmoothUI - Исследование библиотеки

**URL:** https://smoothui.dev/
**GitHub:** https://github.com/educlopez/smoothui
**Автор:** Eduardo Calvo (@educalvolpz)
**Лицензия:** MIT
**Дата исследования:** 2025-12-28

---

## Обзор

SmoothUI — это коллекция бесплатных React UI компонентов с плавными анимациями, построенных на TailwindCSS и Framer Motion. Библиотека полностью совместима с shadcn/ui и предоставляет готовые к продакшену компоненты интерфейса.

### Ключевые особенности

- **Плавные анимации** — встроенные анимации на базе Motion для приятного UX
- **Современный React** — Server Components, TypeScript, оптимизированная производительность
- **TailwindCSS v4** — utility-first CSS с улучшенной поддержкой темной темы
- **shadcn/ui совместимость** — следует тем же паттернам, интегрируется с существующими shadcn/ui проектами
- **Доступность** — соответствие WCAG guidelines
- **Tree-shakeable** — минимальный размер бандла

---

## Технологический стек

| Технология | Описание |
|------------|----------|
| React | Современные паттерны, Server Components, hooks |
| TypeScript | Полная типизация |
| TailwindCSS v4 | Utility-first CSS фреймворк |
| Framer Motion | Библиотека анимаций |
| Next.js | Фреймворк для документации |
| Turbo | Сборка монорепозитория |
| Lucide React | Иконки |

---

## Установка

SmoothUI работает как официальный shadcn registry. Компоненты устанавливаются через shadcn CLI с namespace `@smoothui`:

### Команды установки

```bash
# pnpm
pnpm dlx shadcn@latest add @smoothui/[component-name]

# npm
npx shadcn@latest add @smoothui/[component-name]

# yarn
yarn dlx shadcn@latest add @smoothui/[component-name]

# bun
bunx shadcn@latest add @smoothui/[component-name]
```

### Установка нескольких компонентов

```bash
pnpm dlx shadcn@latest add @smoothui/rich-popover @smoothui/animated-input
```

### Использование после установки

```tsx
import { SiriOrb } from "@/components/smoothui/ui/SiriOrb"
import { RichPopover } from "@/components/smoothui/ui/RichPopover"

export default function App() {
  return (
    <div>
      <SiriOrb size="200px" />
      <RichPopover />
    </div>
  )
}
```

---

## Каталог компонентов (40+)

### Basic UI

| Компонент | Описание |
|-----------|----------|
| `accordion` | Интерактивные сворачиваемые секции |
| `animated-input` | Инпут с плавными анимациями и визуальным фидбеком |
| `animated-progress-bar` | Прогресс-бар с кастомизируемым стилем |
| `basic-dropdown` | Простое выпадающее меню |
| `basic-modal` | Минималистичный диалог |
| `basic-toast` | Легковесные уведомления с auto-dismiss |

### Button Components

| Компонент | Описание |
|-----------|----------|
| `button-copy` | Кнопка копирования с фидбеком успеха |
| `clip-corners-button` | Геометрический дизайн со скошенными углами |
| `dot-morph-button` | Кнопка с морфирующими точками для прогресса |

### Text Effects

| Компонент | Описание |
|-----------|----------|
| `wave-text` | Анимированный волновой эффект по символам |
| `reveal-text` | Поэтапная анимация появления символов |
| `typewriter-text` | Эффект печатной машинки с опциональным зацикливанием |
| `scramble-hover` | Скремблирование символов при наведении |
| `scroll-reveal-paragraph` | Анимация текста при скролле |

### AI Components

| Компонент | Описание |
|-----------|----------|
| `ai-branch` | Анимированная древовидная структура |
| `ai-input` | Командный парсер с AI-friendly интерфейсом |

### Interactive Components

| Компонент | Описание |
|-----------|----------|
| `animated-otp` | Анимированный ввод OTP кода |
| `animated-tags` | Анимированный селектор тегов |
| `app-download-stack` | Стек кнопок загрузки приложения |
| `apple-invites` | Стиль Apple приглашений |
| `contribution-graph` | График контрибуций (GitHub style) |
| `cursor-follow` | Эффект следования за курсором |
| `dynamic-island` | Компактные уведомления с expand/collapse |
| `expandable-cards` | Раскрывающиеся карточки |
| `figma-comments` | Комментарии в стиле Figma |
| `glow-hover-cards` | Карточки со свечением при наведении |
| `github-stars` | Анимация GitHub звезд |
| `image-metadata-preview` | Превью метаданных изображения |
| `infinite-slider` | Бесконечный слайдер |
| `interactive-image-selector` | Интерактивный выбор изображений |
| `job-listings` | Список вакансий |
| `matrix-cards` | Карточки в стиле матрицы |
| `number-flow` | Анимированные числовые переходы для счетчиков и KPI |
| `photo-tabs` | Табы с фото галереей |
| `power-off-slider` | Слайдер выключения |
| `price-flow` | Анимация цен |
| `rich-popover` | Богатые поповеры |
| `reviews-carousel` | Карусель отзывов |
| `siri-orb` | Siri-подобный орб с реактивными волнами |
| `social-selector` | Селектор социальных сетей |
| `scrollable-card-stack` | Прокручиваемый стек карточек |
| `user-avatars` | Аватары пользователей |

---

## Примеры компонентов

### Siri Orb

```bash
pnpm dlx shadcn add @smoothui/siri-orb
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `size?` | `string` | Размеры орба |
| `className?` | `string` | Дополнительные CSS классы |
| `colors?` | `object` | Кастомная конфигурация цветов |
| `animationDuration?` | `number` | Скорость вращения в мс |

### Animated Input

```bash
pnpm dlx shadcn add @smoothui/animated-input
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `value?` | `string` | Контролируемое значение |
| `defaultValue?` | `string` | Начальное значение |
| `onChange?` | `function` | Обработчик изменений |
| `label` | `string` | Текст лейбла |
| `placeholder?` | `string` | Placeholder текст |
| `disabled?` | `boolean` | Состояние disabled |
| `className?` | `string` | Классы контейнера |
| `inputClassName?` | `string` | Классы инпута |
| `labelClassName?` | `string` | Классы лейбла |
| `icon?` | `ReactNode` | Опциональная иконка |

### Dynamic Island

```bash
pnpm dlx shadcn add @smoothui/dynamic-island
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `view?` | `"music" \| "notification" \| "timer" \| "ring" \| "idle"` | Режим отображения |
| `onViewChange?` | `function` | Callback смены режима |
| `idleContent?` | `ReactNode` | Контент в idle режиме |
| `ringContent?` | `ReactNode` | Контент для звонка |
| `timerContent?` | `ReactNode` | Контент таймера |
| `className?` | `string` | CSS классы |

### Scrollable Card Stack

```bash
pnpm dlx shadcn add @smoothui/scrollable-card-stack
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `items` | `array` | Коллекция данных карточек |
| `cardHeight?` | `number` | Высота карточек |
| `perspective?` | `number` | 3D перспектива |
| `transitionDuration?` | `number` | Длительность анимации в мс |
| `className?` | `string` | CSS классы |

### Number Flow

```bash
pnpm dlx shadcn add @smoothui/number-flow
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `value?` | `number` | Числовое значение |
| `onChange?` | `function` | Callback изменения |
| `min?` | `number` | Минимальное значение |
| `max?` | `number` | Максимальное значение |
| `className?` | `string` | CSS классы |
| `digitClassName?` | `string` | Классы для цифр |
| `buttonClassName?` | `string` | Классы для кнопок |

---

## Блоки (20+)

Готовые секции страниц с анимациями:

### Hero Blocks

| Блок | Описание | Установка |
|------|----------|-----------|
| Hero Grid | Современная hero секция с анимированным grid фоном | `@smoothui/header-1` |
| Hero Product | Premium product hero с badge и анимированными заголовками | `@smoothui/header-2` |
| Hero Block 3 | Coming soon | `@smoothui/header-3` |

### Другие блоки

| Категория | Описание |
|-----------|----------|
| **FAQs** | Секции часто задаваемых вопросов |
| **Footer** | Футер секции |
| **Logo Clouds** | Секции с логотипами партнеров |
| **Pricing** | Таблицы цен |
| **Stats** | Секции статистики |
| **Team Sections** | Секции команды |
| **Testimonial** | Отзывы |

---

## Принципы дизайна

### Философия

1. **Beautiful by Default** — компоненты хорошо выглядят из коробки с продуманными цветами, отступами и типографикой
2. **Accessible First** — соответствие WCAG guidelines
3. **Performance Focused** — минимальный размер бандла, эффективные анимации

### Цветовая система (OKLCH)

```css
/* Brand Colors */
--brand-primary: oklch(0.72 0.2 352.53);
--brand-secondary: oklch(0.66 0.21 354.31);
```

### Методы кастомизации

1. **CSS Variables** — глобальное переопределение токенов (цвета, отступы, радиусы)
2. **Tailwind Classes** — utility классы для компонентов
3. **Component Props** — props типа size, variant, color

---

## Статистика репозитория

| Метрика | Значение |
|---------|----------|
| Stars | 623 |
| Forks | 29 |
| Commits | 456 |
| Issues | 0 |
| Pull Requests | 0 |

---

## Преимущества

- Готовые к продакшену компоненты с анимациями
- Полная совместимость с shadcn/ui ecosystem
- Простая установка через shadcn CLI
- TypeScript поддержка из коробки
- Отличная документация с живыми примерами
- Активная разработка
- MIT лицензия

## Недостатки

- Относительно молодая библиотека (может быть менее стабильной)
- Зависимость от Framer Motion увеличивает bundle size
- Меньше компонентов чем у mature библиотек

---

## Применимость для GooseLabs UI

SmoothUI может быть полезен для:

1. **Заимствования анимационных паттернов** — изучение подходов к анимациям
2. **Вдохновения для компонентов** — Siri Orb, Dynamic Island, Number Flow
3. **Интеграции отдельных компонентов** — благодаря shadcn совместимости
4. **Блоков для лендингов** — Hero, Pricing, Testimonials секции

---

## Ссылки

- Главная: https://smoothui.dev/
- Документация: https://smoothui.dev/docs/guides
- Компоненты: https://smoothui.dev/docs/components
- Блоки: https://smoothui.dev/docs/blocks
- GitHub: https://github.com/educlopez/smoothui
- Twitter автора: https://twitter.com/educalvolpz
