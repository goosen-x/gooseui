# Animated SVG Components

Компоненты с анимированными SVG элементами (как в Checkbox).

## Техника

CSS-only анимация через `stroke-dasharray` + `stroke-dashoffset`. Один непрерывный path рисует фигуру.

**Преимущества:**
- Нет зависимостей
- Работает с `:has()`, `:checked`, Tailwind
- Отличная производительность

---

## Эффекты (CSS-only, без библиотек)

### 1. Logo Animation
Рисование лого при загрузке страницы.

**Реализация:**
- SVG path с `stroke-dasharray: totalLength`
- CSS `@keyframes` анимирует `stroke-dashoffset` от totalLength до 0
- Запуск через `animation-delay` или `IntersectionObserver`

```css
.logo-path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: draw 2s ease forwards;
}
@keyframes draw {
  to { stroke-dashoffset: 0; }
}
```

### 2. Line Drawing Effects
Эффект "рисующейся" иконки при hover/появлении.

**Реализация:**
- Иконки как SVG paths
- `stroke-dasharray` + `stroke-dashoffset`
- Trigger: `:hover`, `:focus`, или scroll-driven animation

### 3. Path Morphing (menu → close)
Трансформация иконок через CSS transitions.

**Реализация:**
- Три `<line>` элемента для hamburger
- CSS transforms: `rotate()`, `translateY()`, `scaleX()`
- Средняя линия: `opacity: 0`

```css
.hamburger.open .line-1 { transform: rotate(45deg) translateY(8px); }
.hamburger.open .line-2 { opacity: 0; }
.hamburger.open .line-3 { transform: rotate(-45deg) translateY(-8px); }
```

### 4. Motion Paths
Объекты движущиеся по кривой (CSS `offset-path`).

**Реализация:**
- `offset-path: path('M0,0 C...')`
- `offset-distance: 0%` → `100%`
- CSS animation или scroll-driven

```css
.moving-element {
  offset-path: path('M0,100 Q50,0 100,100');
  animation: move 3s linear infinite;
}
@keyframes move {
  to { offset-distance: 100%; }
}
```

### 5. Border Beam (улучшение)
Текущий эффект использует `@property --angle`. Можно добавить:
- SVG path вместо CSS gradient для более точного контроля
- `stroke-dasharray` анимация по периметру
- Glow эффект через `filter: drop-shadow()`

---

## Input компоненты

| Компонент | Анимация | Приоритет |
|-----------|----------|-----------|
| Radio | Круг + точка появляется из центра | High |
| Switch | Морфинг ползунка (○ → ●) | High |
| Loading Circle | Бесконечное рисование круга | Medium |
| Success Icon | Галочка рисуется после действия | Medium |
| Error Icon | X рисуется | Medium |
| Hamburger → X | Три линии морфятся в крестик | Medium |
| Play → Pause | Треугольник → две палочки | Low |
| Copy → Check | После копирования галочка | Low |

---

## Outline Mode (Hover Draw Effect)

Эффект из CodePen - иконки при hover:
1. FadeOut fill (opacity 1 → 0)
2. Draw stroke (stroke-dashoffset анимация)
3. FadeIn fill (opacity 0 → 1)

**Техника:**
```css
.icon {
  fill: currentColor;
  stroke: currentColor;
  stroke-width: 0;
  transition: fill 0.3s, stroke-width 0.3s;
}

.icon:hover {
  fill: transparent;
  stroke-width: 2;
}

.icon path {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  transition: stroke-dashoffset 0.5s ease 0.2s;
}

.icon:hover path {
  stroke-dashoffset: 0;
}
```

**Реализация в SVGDrawable:**
```tsx
<SVGDrawable mode="outline" trigger="hover">
  <svg>
    <path d="..." fill="currentColor" />
  </svg>
</SVGDrawable>
```

**Props:**
- `mode="outline"` — включает outline режим
- `trigger="hover"` — анимация при hover (default для outline)
- `fillDuration` — длительность fade fill (ms)
- `drawDuration` — длительность draw stroke (ms)

**Приоритет:** Medium

---

## TextDrawable Component

Компонент для анимации текста как SVG path. Любой шрифт → анимированные буквы.

**Зависимости:**
- [text-to-svg](https://www.npmjs.com/package/text-to-svg) или [opentype.js](https://github.com/opentypejs/opentype.js)

**API:**
```tsx
<TextDrawable
  text="GOOSE"
  font="/fonts/Inter-Bold.woff2"
  fontSize={48}
  draw="0 1"
  duration={2000}
  stagger={100}
  trigger="mount" | "hover" | "view"
/>
```

**Реализация:**
1. Загрузка шрифта через opentype.js
2. Конвертация текста в SVG paths (`font.getPath()`)
3. Каждая буква = отдельный path для stagger
4. Передача paths в SVGDrawable для анимации

**Фичи:**
- Любой .woff/.woff2/.ttf/.otf шрифт
- Letter spacing, line height
- Text align (left, center, right)
- Per-letter stagger
- Hover/mount/view triggers
- Responsive sizing

**Референсы:**
- [text-to-svg npm](https://www.npmjs.com/package/text-to-svg)
- [opentype.js](https://github.com/opentypejs/opentype.js)
- [CodePen: text to path](https://codepen.io/herrstrietzel/pen/GRYxQNd)

**Приоритет:** High

---

## Animated Icons Library

Создание библиотеки анимированных иконок с использованием SVGDrawable.

**Идея:**
- Набор готовых анимированных иконок (checkmark, x, arrows, loading, etc.)
- Каждая иконка = компонент с настраиваемой анимацией
- Использует SVGDrawable под капотом
- Интеграция с shadcn/ui стилями

**Примеры иконок:**
- AnimatedCheck - галочка с анимацией рисования
- AnimatedX - крестик с анимацией
- AnimatedArrow - стрелка с направлением
- AnimatedSpinner - кастомный лоадер
- AnimatedHeart - сердечко (для лайков)
- AnimatedStar - звезда (для рейтинга)

**API:**
```tsx
<AnimatedCheck
  trigger="mount" | "hover" | "click" | "manual"
  duration={500}
  color="green"
/>
```

---

## Референсы

- Текущий Checkbox: `registry/new-york/ui/checkbox.tsx`
- CSS offset-path: https://developer.mozilla.org/en-US/docs/Web/CSS/offset-path
- Scroll-driven animations: https://scroll-driven-animations.style/
