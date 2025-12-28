# UI Layouts - Исследование библиотеки

> **Дата исследования:** 2025-12-28
> **Версия:** Актуальная (2.8k GitHub stars)
> **Сайт:** https://ui-layouts.com
> **GitHub:** https://github.com/ui-layouts/uilayouts

## Обзор

UI Layouts — это open-source библиотека интерактивных React/Next.js компонентов с фокусом на креативный дизайн и анимации. Позиционируется как "полный toolkit с компонентами, эффектами, дизайн-инструментами и готовыми блоками" для создания современных интерфейсов.

### Ключевые характеристики

- **100+ компонентов** — интерактивные React/Next.js элементы
- **30+ готовых блоков** — предустановленные секции для быстрой разработки
- **Лицензия:** MIT
- **Язык:** TypeScript (81.7%), MDX (17.2%)
- **Автор:** Naymur (@naymur_dev)

## Технологический стек

| Технология | Назначение |
|------------|------------|
| React / Next.js | Основной фреймворк |
| TailwindCSS | Стилизация |
| Framer Motion (motion) | Основные анимации |
| GSAP | Продвинутые анимации |
| Three.js / R3F | 3D-эффекты |
| Cobe | 3D Globe компонент |
| Embla Carousel | Карусели |
| Lenis | Smooth scrolling |
| tsparticles | Частицы (Sparkles) |
| Number Flow | Анимированные числа |

## Установка

### Требования

- Node.js
- TailwindCSS (обязательно)
- Framer Motion (для большинства компонентов)

### Базовая установка

```bash
npm install motion clsx tailwind-merge
```

### Утилита cn (обязательная)

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Установка компонентов

Два способа добавления компонентов:

```bash
# UI Layouts CLI
npx uilayouts@latest add [component-name]

# Через shadcn CLI (совместимость)
npx shadcn@latest add 'https://www.ui-layouts.com/r/[component-name].json'
```

## Каталог компонентов

### Визуальные эффекты

| Компонент | Описание | Зависимости |
|-----------|----------|-------------|
| **Mesh Gradients** | Градиентные визуальные эффекты | — |
| **Image Ripple Effect** | Интерактивные ripple-анимации на изображениях | motion |
| **R3F Blob** | 3D blob-анимации | Three.js, R3F |
| **Sparkles** | Декоративные эффекты частиц | @tsparticles/react, @tsparticles/slim |
| **Clip-Path** | CSS clip-path эффекты с SVG | — |
| **Image Mousetrail** | Изображения следуют за курсором | motion |
| **Image Reveal** | Анимации появления изображений | motion |
| **Video-Masking** | Маскирование видео | — |
| **Globe** | Интерактивный 3D-глобус | cobe |

### Интерактивные компоненты

| Компонент | Описание | Зависимости |
|-----------|----------|-------------|
| **Tabs** | Vercel-style табы с анимациями | motion |
| **Accordion** | Аккордеон с multi-expand | motion |
| **Carousel** | Карусель с множеством вариаций | embla-carousel, embla-carousel-autoplay |
| **Range Slider** | Анимированный слайдер | shadcn/ui slider, @number-flow/react |
| **Motion Number** | Анимированные счетчики | @number-flow/react |
| **Drag Items** | Перетаскиваемые элементы | motion |
| **Horizontal Scroll** | Горизонтальная прокрутка | motion, lenis |
| **Sticky Scroll** | Sticky-эффекты при скролле | lenis |
| **Image Accordion** | Аккордеон с изображениями | motion |

### Модальные окна и оверлеи

| Компонент | Описание |
|-----------|----------|
| **Modal** | Модальные диалоги |
| **Drawer** | Боковые панели |

### Карточки и лейауты

| Компонент | Описание |
|-----------|----------|
| **Card** | Карточки с hover-эффектами |
| **Stacking Card** | Многослойные анимированные карточки |
| **Grid** | Система сеток (Box, Condition, Normal Grid) |

### Формы

| Компонент | Описание | Установка |
|-----------|----------|-----------|
| **Password Input** | Защищенное поле пароля | `npx uilayouts@latest add password-input` |
| **Tags Input** | Мульти-тег ввод (YouTube-style) | `npx uilayouts@latest add tags-input` |
| **Date Picker** | Выбор даты/времени | — |
| **Multi Selector** | Множественный выбор | — |

### Кнопки

19+ вариантов креативных кнопок:
- Background shine / spotlight
- Hover flip (top, left)
- Underline effects
- Multiple shadows
- Rotating gradients
- Cross-arrow indicators

## Детальный обзор ключевых компонентов

### Tabs

Vercel-style табы с плавными переходами без внешних библиотек табов.

```typescript
import { TabsProvider, TabsBtn, TabsContent } from '@/components/ui/tabs';

<TabsProvider defaultValue="login" wobbly={true}>
  <div className="flex items-center w-fit dark:bg-[#1a1c20]">
    <TabsBtn value="login">Login</TabsBtn>
    <TabsBtn value="register">Register</TabsBtn>
  </div>
  <TabsContent value="login">
    {/* Login content */}
  </TabsContent>
  <TabsContent value="register">
    {/* Register content */}
  </TabsContent>
</TabsProvider>
```

**Props:**
- `defaultValue` — начально выбранный таб
- `wobbly` (boolean, default: true) — эффект "колебания"
- `hover` (boolean, default: false) — активация по наведению

### Accordion

Гибкий multi-expand аккордеон.

```typescript
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from '@/components/ui/accordion';

<Accordion defaultValue="item-1" multiple={false}>
  <AccordionItem value="item-1">
    <AccordionHeader>Question 1</AccordionHeader>
    <AccordionPanel>Answer 1</AccordionPanel>
  </AccordionItem>
</Accordion>
```

**Вариации:**
- Single Layout — один раскрытый элемент
- Multi Layout — несколько раскрытых
- Grid Layout — двухколоночное расположение

### Carousel

На базе Embla Carousel с расширенной функциональностью.

```typescript
import { Carousel, Slider, SliderContainer, SliderDotButton } from '@/components/ui/carousel';
import { EmblaOptionsType } from 'embla-carousel';

function DefaultSlider() {
  const OPTIONS: EmblaOptionsType = { loop: false };
  return (
    <Carousel options={OPTIONS}>
      <SliderContainer>
        <Slider className="w-full">
          <div className="bg-blue-500 h-[300px]" />
        </Slider>
      </SliderContainer>
      <SliderDotButton />
    </Carousel>
  );
}
```

**Вариации:** выравнивание, масштабирование, миниатюры, вертикальная ориентация, автозапуск.

### Image Mousetrail

Изображения появляются по траектории курсора.

```typescript
<MouseTrail
  items={images}
  imgClass="w-40 h-48"
  distance={20}
  maxNumberOfImages={5}
  fadeAnimation={false}
/>
```

**Props:**
| Prop | Type | Default | Описание |
|------|------|---------|----------|
| items | array | required | Массив изображений |
| imgClass | string | 'w-40 h-48' | CSS классы для изображений |
| distance | number | 20 | Расстояние между изображениями |
| maxNumberOfImages | number | 5 | Максимум изображений в trail |
| fadeAnimation | boolean | false | Автофейд после остановки |

### Globe

3D интерактивный глобус на базе Cobe.

```typescript
<Earth
  theta={0.25}
  dark={1}
  scale={1.1}
  diffuse={1.2}
  mapSamples={40000}
  mapBrightness={6}
  baseColor={[0.4, 0.6509, 1]}
  markerColor={[1, 0, 0]}
  glowColor={[0.2745, 0.5765, 0.898]}
/>
```

### Sparkles

Анимированные частицы на базе tsparticles.

```typescript
<Sparkles
  size={1.2}
  density={800}
  speed={1.5}
  color="#ffffff"
  opacity={1}
  hover={false}
  mousemove={false}
/>
```

### Tags Input

YouTube/GitHub-style ввод тегов.

```typescript
'use client';
import { TagsInput } from '@/components/ui/tags-input';
import { useState } from 'react';

export default function App() {
  const [tags, setTags] = useState<string[]>([]);
  return <TagsInput tags={tags} setTags={setTags} editTag={true} />;
}
```

**Клавиши:** Enter, Comma (добавление), Backspace (удаление).

### Horizontal Scroll

Горизонтальная прокрутка с привязкой к вертикальному скроллу.

```typescript
'use client'
import { ReactLenis } from 'lenis/react'

export default function HorizontalScroll() {
  return (
    <ReactLenis root>
      {/* content */}
    </ReactLenis>
  )
}
```

> **Важно:** Не добавляйте `flex` или `grid` к родительскому `div/section`.

### Motion Number

Анимированные числовые счетчики на базе Number Flow.

```bash
npm install @number-flow/react
```

**Примеры использования:**
- Dashboards с метриками
- Upvote счетчики
- Финансовые дисплеи
- Trading интерфейсы

## Grid System

Три типа сеток:

### Box Grid
```css
grid grid-rows-10 grid-cols-12 grid-flow-col gap-2
```
Точный контроль позиционирования с row/column spans.

### Condition Grid
```css
lg:columns-2 columns-1
```
Респонсивная многоколоночная раскладка.

### Normal Grid
Стандартное равномерное распределение.

## Особенности

### Сильные стороны

1. **Фокус на анимациях** — богатый набор motion-эффектов
2. **Креативный дизайн** — уникальные визуальные компоненты
3. **Совместимость с shadcn/ui** — можно устанавливать через shadcn CLI
4. **Dark mode** — встроенная поддержка темной темы
5. **TypeScript** — полная типизация
6. **Модульность** — каждый компонент устанавливается отдельно
7. **Активная разработка** — регулярные обновления

### Ограничения

1. **Зависимости** — требует много библиотек (motion, embla, lenis, etc.)
2. **Размер бандла** — 3D-компоненты увеличивают размер
3. **Документация** — некоторые страницы возвращают 404
4. **Фокус на эффектах** — меньше базовых UI-компонентов

## Сравнение с альтернативами

| Критерий | UI Layouts | shadcn/ui | Radix UI |
|----------|------------|-----------|----------|
| Фокус | Анимации, эффекты | Базовые компоненты | Примитивы |
| Стилизация | TailwindCSS | TailwindCSS | CSS-in-JS / любой |
| Установка | CLI / copy-paste | CLI | npm |
| 3D-эффекты | Да | Нет | Нет |
| Accessibility | Частично | Полная | Полная |
| Bundle size | Больше | Меньше | Минимальный |

## Связанные проекты

- **ui-layouts/cursify** — библиотека анимаций курсора для React/Next.js
- **ui-layouts/ui-tools** — генераторы теней, SVG, градиентов, паттернов

## Рекомендации по использованию

### Когда использовать

- Landing pages с креативным дизайном
- Портфолио и showcase сайты
- Маркетинговые страницы
- Проекты, требующие уникальных визуальных эффектов

### Когда не использовать

- Enterprise приложения с фокусом на accessibility
- Проекты с критичными требованиями к bundle size
- Простые CRUD-приложения

## Источники

- [UI Layouts - Официальный сайт](https://ui-layouts.com/)
- [GitHub репозиторий](https://github.com/ui-layouts/uilayouts)
- [GitHub организация](https://github.com/ui-layouts)
- [Cursify - Cursor Animation Library](https://github.com/ui-layouts/cursify)
- [UI Tools](https://github.com/ui-layouts/ui-tools)
