# Cult UI - Исследование библиотеки

**URL:** https://www.cult-ui.com/
**GitHub:** https://github.com/nolly-studio/cult-ui
**Лицензия:** MIT
**Автор:** Jordan-Gilliam (@nolansym)
**Статистика:** 3.1k звезд, 134 форка

---

## Описание

Cult UI - это коллекция свободных и открытых компонентов, совместимых с Shadcn/ui. Позиционируется как решение "построенное дизайн-инженерами, настроенное для vibe coding".

**Важно:** Это НЕ библиотека компонентов в традиционном понимании. Это коллекция переиспользуемых компонентов, которые можно скопировать и вставить в свои приложения. Философия полного владения кодом.

---

## Технологический стек

- **React** + **TypeScript** (основа)
- **Tailwind CSS** (стилизация)
- **Framer Motion** (анимации)
- **Next.js** (интеграция и шаблоны)
- **Shadcn/ui** (совместимость)
- **Three.js / WebGL** (для шейдерных эффектов)
- **Jotai** (управление состоянием в некоторых компонентах)

---

## Установка

### Предварительные требования

```bash
pnpm add -D tailwindcss@latest clsx tailwind-merge framer-motion
```

Создать утилиту `lib/utils.ts`:

```typescript
import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### CLI установка (shadcn v3)

Добавить реестр в `components.json`:

```json
{
  "registries": {
    "@cult-ui": "https://cult-ui.com/r/{name}.json"
  }
}
```

Установка компонентов:

```bash
npx shadcn@beta add @cult-ui/text-gif
npx shadcn@beta add @cult-ui/texture-card @cult-ui/texture-button
npx shadcn@beta search @cult-ui --query "texture-button"
```

### Ручная установка

Скопировать код компонента со страницы документации.

### Прямая установка через URL

```bash
pnpm dlx shadcn@latest add https://cult-ui.com/r/dynamic-island.json
pnpm dlx shadcn@latest add https://cult-ui.com/r/floating-panel.json
```

---

## Каталог компонентов

### Кнопки и элементы управления

| Компонент | Описание |
|-----------|----------|
| **Neumorph Button** | Кнопка с neumorphism эффектом |
| **Family Button** | Кнопка с family-стилем |
| **Family Drawer** | Выдвижная панель (new) |
| **Texture Button** | Кнопка с текстурой и градиентами (6 вариантов: primary, accent, secondary, destructive, minimal, icon) |
| **Bg Animate Button** | Кнопка с анимированным градиентным фоном (7 градиентов: sunrise, ocean, candy, default, forest, sunset, nebula) |

### Карточки и контейнеры

| Компонент | Описание |
|-----------|----------|
| **Expandable Screen** | Раскрывающийся экран (new) |
| **Expandable Card** | Раскрывающаяся карточка с анимацией |
| **Minimal Card** | Минималистичная карточка |
| **Neumorph Eyebrow** | Neumorphism элемент |
| **Texture Card** | Карточка с текстурой |
| **Shift Card** | Карточка со сдвигом |
| **Browser Window** | Имитация окна браузера (new) |
| **Texture Overlay** | Текстурный оверлей |
| **Distorted Glass** | Эффект искаженного стекла (new) |
| **Background Texture** | Фоновая текстура (new) |

### Лейаут и формы

| Компонент | Описание |
|-----------|----------|
| **Morph Surface** | Морфирующая поверхность (new) |
| **Direction Aware Tabs** | Табы с direction-aware анимацией переключения |
| **Side Panel** | Боковая панель |
| **Floating Panel** | Headless composable плавающая панель с accessibility |
| **Popover** | Всплывающее окно |
| **Popover Form** | Форма во всплывающем окне |
| **Sortable List** | Сортируемый список |
| **Toolbar Expandable** | Расширяемый тулбар |
| **Code Block** | Блок кода (new) |

### Онбординг и туры

| Компонент | Описание |
|-----------|----------|
| **Feature Carousel** | Карусель для демонстрации фич |
| **Intro Disclosure** | Раскрытие информации при онбординге |
| **Loading Carousel** | Карусель загрузки |

### Интерактивные элементы

| Компонент | Описание |
|-----------|----------|
| **Dynamic Island** | Компонент в стиле Apple Dynamic Island с состояниями: compact, large, tall, long, medium |
| **Color Picker** | Выбор цвета |
| **Timer** | Таймер |
| **MacOS Dock** | Док в стиле macOS с magnification эффектом |
| **Squiggle Arrow** | Волнистая стрелка (new) |

### Медиа

| Компонент | Описание |
|-----------|----------|
| **Stripe Bg Guides** | Направляющие линии в стиле Stripe |
| **Logo Carousel** | Карусель логотипов |
| **3D Carousel** | 3D карусель |
| **Hover Video Player** | Видеоплеер при наведении |
| **Bg Media Hero** | Hero-секция с медиа фоном |
| **Tweet Grid** | Сетка твитов |
| **YouTube Video Player** | YouTube плеер |

### Типографика и текст

| Компонент | Описание |
|-----------|----------|
| **Text Gif** | Текст с GIF эффектом |
| **Gradient Heading** | Заголовок с градиентом |
| **Text Animate** | Анимация текста (8 типов: rollIn, whipIn, fadeIn, popIn, fadeInUp, shiftInUp, whipInUp, calmInUp) |
| **Typewriter** | Эффект печатной машинки |
| **Animated Number** | Анимированные числа |

### Визуальные эффекты

| Компонент | Описание |
|-----------|----------|
| **LightBoard** | Интерактивная световая доска с dot-matrix отображением текста и возможностью рисования |
| **Fractal Grid** | Фрактальная сетка |
| **Canvas Fractal Grid** | Canvas-версия фрактальной сетки |
| **Shader Lens Blur** | WebGL шейдерный эффект линзового размытия с mouse tracking |

---

## Детальный разбор ключевых компонентов

### Dynamic Island

Универсальный компонент, вдохновленный Apple Dynamic Island.

**Особенности:**
- Множество состояний размера: compact, large, tall, long, medium
- Context-based управление через хуки
- Интеграция с Framer Motion

**API:**
```tsx
import {
  DynamicIslandProvider,
  DynamicIsland,
  DynamicContainer,
  DynamicTitle,
  DynamicDescription,
  useDynamicIslandSize
} from "@/components/ui/dynamic-island"

<DynamicIslandProvider initialSize="compact">
  <DynamicIsland id="main">
    <DynamicContainer>
      <DynamicTitle>Title</DynamicTitle>
      <DynamicDescription>Description</DynamicDescription>
    </DynamicContainer>
  </DynamicIsland>
</DynamicIslandProvider>
```

### Floating Panel

Headless composable плавающая панель.

**Особенности:**
- Полная accessibility (keyboard navigation, ARIA, focus management)
- Composable архитектура
- Framer Motion анимации

**Субкомпоненты:**
- `FloatingPanelRoot` - контейнер с context
- `FloatingPanelTrigger` - триггер открытия
- `FloatingPanelContent` - контент с анимацией
- `FloatingPanelForm` - форма
- `FloatingPanelLabel`, `FloatingPanelTextarea`, `FloatingPanelFooter`
- `FloatingPanelCloseButton`, `FloatingPanelSubmitButton`

### Text Animate

Анимация текста посимвольно.

**8 типов анимации:**
1. **rollIn** - плавное появление с вращением
2. **whipIn** - быстрое появление с импульсом
3. **fadeIn** - плавное появление
4. **popIn** - появление с spring эффектом
5. **fadeInUp** - появление снизу с fade
6. **shiftInUp** - резкий сдвиг снизу
7. **whipInUp** - whip + движение снизу
8. **calmInUp** - мягкое появление снизу

### Shader Lens Blur

WebGL шейдерный эффект.

**Технологии:**
- Three.js для управления сценой
- WebGL fragment shaders
- Signed Distance Field (SDF) для отрисовки форм
- Jotai для state management

**Формы:** square, circle, hollow circle, triangle

**Возможности:**
- Mouse tracking с инверсией
- 4 цветовых канала для градиентов
- Респонсивность через ResizeObserver
- 60fps анимация через requestAnimationFrame

### LightBoard

Интерактивная световая доска.

**Особенности:**
- Настраиваемая сетка световых точек
- Отображение текста в dot-matrix стиле
- Рисование мышью/touch
- 4 уровня яркости
- Алгоритм Bresenham для линий
- Выбор шрифта (default, seven-segment)

---

## Уникальные особенности Cult UI

### 1. Дизайн-инженерный подход
Компоненты создаются дизайн-инженерами с фокусом на визуальное качество и детали анимации.

### 2. Neumorphism и текстуры
Уникальные стили с эффектами neumorphism, текстурами и градиентами.

### 3. WebGL/Shader эффекты
Продвинутые визуальные эффекты через Three.js и WebGL шейдеры.

### 4. Apple-inspired компоненты
Dynamic Island, macOS Dock - компоненты, вдохновленные дизайном Apple.

### 5. Headless + Composable
Floating Panel и другие компоненты следуют headless/composable паттерну.

### 6. AI интеграции
Блоки для интеграции с Google Gemini, OpenAI, Anthropic Claude, Upstash.

### 7. Полное владение кодом
Copy-paste подход дает полный контроль над кодом компонентов.

---

## AI Patterns (aisdkagents.com)

В июле 2024 добавлено 72 новых паттерна для AI агентов:
- Интеграция с Google Gemini 2.5 Flash
- Генерация и редактирование изображений
- Анализ текста
- Rate limiting через Upstash

---

## Шаблоны Next.js

- **Logo GPT** - генерация логотипов
- **Directory** - каталог/директория
- **Travel Stash** - travel приложение
- **Landing Page** - лендинг
- **Cult SEO** - SEO шаблон
- **Manifest** - манифест

---

## Pro версия

Доступна на https://pro.cult-ui.com/ с дополнительными компонентами и шаблонами.

---

## Выводы

### Сильные стороны

1. Уникальный визуальный стиль с neumorphism и текстурами
2. Продвинутые анимации через Framer Motion
3. WebGL/Shader эффекты для premium UI
4. Apple-inspired компоненты (Dynamic Island, Dock)
5. Полная совместимость с Shadcn/ui
6. MIT лицензия - можно использовать коммерчески
7. Активное развитие и поддержка

### Потенциальные применения

- Landing pages с premium дизайном
- SaaS дашборды с уникальным стилем
- AI продукты с интеграциями
- Приложения с фокусом на UX/анимации
- Онбординг flow

### Рекомендации по использованию

1. Использовать как дополнение к Shadcn/ui
2. Выборочно добавлять компоненты через CLI
3. Кастомизировать под свой дизайн-язык
4. Обращать внимание на bundle size при использовании WebGL компонентов

---

*Дата исследования: 2025-12-28*
