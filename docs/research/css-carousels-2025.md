# CSS Carousels в 2025: Полный Аудит

> Исследование современных методов создания каруселей с использованием нативного CSS.
> Автор исследования: GooseUI Team
> Дата: Декабрь 2025

## Содержание

1. [Обзор](#обзор)
2. [Adam Argyle и его вклад](#adam-argyle-и-его-вклад)
3. [CSS Overflow Module Level 5](#css-overflow-module-level-5)
4. [Поддержка браузерами](#поддержка-браузерами)
5. [Базовая реализация](#базовая-реализация)
6. [Продвинутые техники](#продвинутые-техники)
7. [Drag-n-Drop](#drag-n-drop)
8. [Accessibility](#accessibility)
9. [Примеры и демо](#примеры-и-демо)

---

## Обзор

В 2025 году CSS получил нативные инструменты для создания каруселей без JavaScript:

| Свойство/Псевдоэлемент | Назначение | Baseline |
|------------------------|------------|----------|
| `scroll-snap-type` | Привязка скролла | **Widely Available** (96.4%) |
| `scroll-snap-align` | Выравнивание элементов | **Widely Available** |
| `scroll-snap-stop` | Предотвращение пропуска слайдов | **Widely Available** |
| `::scroll-button()` | Кнопки навигации | **Not Baseline** (Chrome 135+) |
| `::scroll-marker` | Индикаторы позиции | **Not Baseline** (Chrome 135+) |
| `::scroll-marker-group` | Контейнер маркеров | **Not Baseline** (Chrome 135+) |

---

## Adam Argyle и его вклад

**Adam Argyle** — бывший Chrome DevRel (7 лет в Google), член CSSWG, создатель:

- [Open Props](https://open-props.style/) — CSS custom properties библиотека
- [GUI Challenges](https://web.dev/shows/gui-challenges) — YouTube серия о построении UI
- [gradient.style](https://gradient.style/) — генератор градиентов CSS4/CSS5
- [transition.style](https://transition.style/) — готовые CSS transitions
- [VisBug](https://visbug.web.app/) — браузерный инструмент для дизайнеров

### Ресурсы

- Сайт: [nerdy.dev](https://nerdy.dev/) / [argyle.ink](https://argyle.ink/)
- GitHub: [github.com/argyleink](https://github.com/argyleink)
- Bluesky: [@nerdy.dev](https://bsky.app/profile/nerdy.dev)
- Chrome DevRel: [developer.chrome.com/authors/adam-argyle](https://developer.chrome.com/authors/adam-argyle)

### Ключевые статьи

- [Carousels with CSS](https://developer.chrome.com/blog/carousels-with-css) — основная статья о CSS каруселях
- [chrome.dev/carousel](https://chrome.dev/carousel/) — галерея 23+ примеров каруселей

---

## CSS Overflow Module Level 5

Спецификация [CSS Overflow Module Level 5](https://drafts.csswg.org/css-overflow-5/) (Working Draft) вводит:

### `::scroll-button()`

Псевдоэлемент для создания кнопок навигации.

**Синтаксис:**
```css
::scroll-button(<direction>) {
  content: "→"; /* Обязательно для отображения */
}
```

**Доступные направления:**
| Значение | Описание |
|----------|----------|
| `up` | Прокрутка вверх |
| `down` | Прокрутка вниз |
| `left` | Прокрутка влево |
| `right` | Прокрутка вправо |
| `block-start` | Начало block-оси |
| `block-end` | Конец block-оси |
| `inline-start` | Начало inline-оси |
| `inline-end` | Конец inline-оси |
| `*` | Все кнопки |

**Особенности:**
- Автоматически создаются как `<button>` элементы
- Доступны с клавиатуры (Tab, Enter, Space)
- Автоматически отключаются (`:disabled`) когда скролл невозможен
- Прокручивают на ~85% видимой области (одна "страница")

### `::scroll-marker`

Псевдоэлемент для создания индикаторов/точек навигации.

**Синтаксис:**
```css
li::scroll-marker {
  content: ""; /* Обязательно */
  /* стили */
}

li::scroll-marker:target-current {
  /* стиль активного маркера */
}
```

**Особенности:**
- Работает как `<a>` — прокручивает к элементу при клике
- Автоматически помещается в `::scroll-marker-group`
- Поддерживает `:target-current` для текущего элемента
- ARIA семантика `tablist`/`tab` из коробки

### `::scroll-marker-group`

Контейнер для группировки маркеров.

**Активация:**
```css
.carousel {
  scroll-marker-group: after; /* или before */
}

.carousel::scroll-marker-group {
  display: flex;
  justify-content: center;
  gap: 8px;
}
```

---

## Поддержка браузерами

### CSS Scroll Snap (Базовые свойства)

**Baseline: Widely Available** — поддерживается с июля 2022

| Браузер | Версия | Поддержка |
|---------|--------|-----------|
| Chrome | 69+ | ✅ Полная |
| Firefox | 68+ | ✅ Полная |
| Safari | 11+ | ✅ Полная |
| Edge | 79+ | ✅ Полная |
| iOS Safari | 11+ | ✅ Полная |

**Глобальное покрытие: 96.4%**

### CSS Carousel Features (Новые псевдоэлементы)

**Baseline: Not Baseline** — экспериментальная технология

| Браузер | Версия | Поддержка |
|---------|--------|-----------|
| Chrome | 135+ | ✅ Полная |
| Edge | 135+ | ✅ Полная |
| Firefox | — | ❌ Не поддерживается |
| Safari | 26+ | ⏳ Ожидается |

**Рекомендация:** Использовать progressive enhancement — базовый скролл работает везде, кнопки и маркеры появляются в Chrome.

---

## Базовая реализация

### Минимальная карусель (работает везде)

```css
.carousel {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  overscroll-behavior-x: contain;

  /* Скрыть скроллбар */
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.carousel::-webkit-scrollbar {
  display: none;
}

.carousel > * {
  flex: 0 0 100%; /* Один слайд на экран */
  scroll-snap-align: start;
}
```

### Предотвращение пропуска слайдов

```css
.carousel > * {
  scroll-snap-align: start;
  scroll-snap-stop: always; /* Останавливаться на каждом слайде */
}
```

### Полная карусель с кнопками и маркерами (Chrome 135+)

```css
.carousel {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  overscroll-behavior-x: contain;
  scroll-marker-group: after;
}

.carousel > * {
  flex: 0 0 100%;
  scroll-snap-align: center;
  scroll-snap-stop: always;
}

/* Кнопки навигации */
.carousel::scroll-button(left),
.carousel::scroll-button(right) {
  content: "";
  border: none;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
}

.carousel::scroll-button(left) {
  content: "←";
}

.carousel::scroll-button(right) {
  content: "→";
}

.carousel::scroll-button(*):hover {
  background: rgba(0, 0, 0, 0.8);
}

.carousel::scroll-button(*):disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* Группа маркеров */
.carousel::scroll-marker-group {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 16px 0;
}

/* Индивидуальные маркеры */
.carousel > *::scroll-marker {
  content: "";
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid transparent;
}

.carousel > *::scroll-marker:target-current {
  background: black;
  transform: scale(1.2);
}

.carousel > *::scroll-marker:hover {
  background: rgba(0, 0, 0, 0.5);
}
```

---

## Продвинутые техники

### Позиционирование кнопок с CSS Anchor

```css
.carousel {
  anchor-name: --carousel;
  position: relative;
}

.carousel::scroll-button(*) {
  position: absolute;
  position-anchor: --carousel;
  align-self: anchor-center;
}

.carousel::scroll-button(left) {
  right: calc(anchor(left) - 24px);
}

.carousel::scroll-button(right) {
  left: calc(anchor(right) - 24px);
}
```

### Нумерованные маркеры

```css
.carousel > * {
  counter-increment: slide;
}

.carousel > *::scroll-marker {
  content: counter(slide);
  font-family: system-ui;
  padding: 4px 12px;
  background: #eee;
  border-radius: 4px;
}

.carousel > *:first-child::scroll-marker {
  content: "Start";
}

.carousel > *:last-child::scroll-marker {
  content: "End";
}
```

### Миниатюры как маркеры

```css
.carousel > *::scroll-marker {
  content: "";
  width: 60px;
  height: 40px;
  background-image: var(--thumb);
  background-size: cover;
  border-radius: 4px;
  opacity: 0.6;
}

.carousel > *::scroll-marker:target-current {
  opacity: 1;
  outline: 2px solid blue;
}
```

---

## Drag-n-Drop

CSS не поддерживает drag-to-scroll нативно. Нужен JavaScript:

### Базовая реализация

```javascript
class CarouselDragger {
  constructor(selector) {
    this.el = document.querySelector(selector);
    this.isDown = false;
    this.startX = 0;
    this.scrollLeft = 0;
    this.preventClick = false;

    this.init();
  }

  init() {
    this.el.addEventListener('mousedown', (e) => this.onMouseDown(e));
    this.el.addEventListener('mousemove', (e) => this.onMouseMove(e));
    this.el.addEventListener('mouseup', () => this.onMouseUp());
    this.el.addEventListener('mouseleave', () => this.onMouseUp());
    this.el.addEventListener('click', (e) => this.onClick(e), true);
  }

  onMouseDown(e) {
    this.isDown = true;
    this.startX = e.pageX - this.el.offsetLeft;
    this.scrollLeft = this.el.scrollLeft;
    this.preventClick = false;
    this.el.style.cursor = 'grabbing';
  }

  onMouseMove(e) {
    if (!this.isDown) return;
    e.preventDefault();

    const x = e.pageX - this.el.offsetLeft;
    const walk = (x - this.startX) * 2; // Множитель скорости
    this.el.scrollLeft = this.scrollLeft - walk;

    if (Math.abs(walk) > 5) {
      this.preventClick = true;
    }
  }

  onMouseUp() {
    this.isDown = false;
    this.el.style.cursor = 'grab';
  }

  onClick(e) {
    if (this.preventClick) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
}

// Использование
new CarouselDragger('.carousel');
```

### CSS для drag-курсора

```css
.carousel {
  cursor: grab;
  user-select: none;
}

.carousel:active {
  cursor: grabbing;
}
```

### Совместимость с scroll-snap

При использовании drag нужно временно отключать snap:

```javascript
onMouseDown(e) {
  // Отключаем snap во время драга
  this.el.style.scrollSnapType = 'none';
  // ...
}

onMouseUp() {
  // Включаем snap обратно
  this.el.style.scrollSnapType = 'x mandatory';
  // ...
}
```

---

## Accessibility

### Встроенная доступность (Chrome 135+)

Браузер автоматически добавляет:

- **Кнопки:** `role="button"`, keyboard navigation
- **Маркеры:** `role="tablist"` / `role="tab"`, arrow keys navigation
- **Screen reader:** объявление текущей позиции

### Fallback для старых браузеров

```html
<div class="carousel" role="region" aria-label="Image carousel">
  <div class="carousel-track">
    <div class="slide" role="group" aria-roledescription="slide" aria-label="1 of 5">
      <!-- content -->
    </div>
    <!-- ... -->
  </div>

  <div class="carousel-nav" role="tablist">
    <button role="tab" aria-selected="true" aria-controls="slide-1">1</button>
    <button role="tab" aria-selected="false" aria-controls="slide-2">2</button>
    <!-- ... -->
  </div>

  <button class="prev" aria-label="Previous slide">←</button>
  <button class="next" aria-label="Next slide">→</button>
</div>
```

### WAI-ARIA Carousel Pattern

Рекомендации: [WAI ARIA Carousel Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)

---

## Примеры и демо

### Официальные ресурсы

1. **[chrome.dev/carousel](https://chrome.dev/carousel/)** — 23+ примеров от Adam Argyle
   - Horizontal, Vertical, Bidirectional
   - 3D карусели, Cover Flow
   - Media players, Weather widgets

2. **[CSS-Tricks: ::scroll-button](https://css-tricks.com/almanac/pseudo-selectors/s/scroll-button/)** — документация с примерами

3. **[MDN: CSS Scroll Snap](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap)** — полное руководство

### Полезные библиотеки

| Библиотека | Описание |
|------------|----------|
| [scroll-snap-carousel](https://github.com/Grsmto/scroll-snap-carousel) | Минимальный хелпер для CSS Scroll Snap |
| [scroll-snap-slider](https://github.com/barthy-koeln/scroll-snap-slider) | Slider с drag и momentum |
| [Smooothy](https://www.cssscript.com/carousel-slider-smooothy/) | Drag, swipe, momentum |

---

## Рекомендации по использованию

### Progressive Enhancement

```css
/* Базовый скролл — работает везде */
.carousel {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

/* Новые фичи — Chrome 135+ */
@supports selector(::scroll-button(right)) {
  .carousel::scroll-button(right) {
    content: "→";
  }

  .carousel::scroll-marker-group {
    display: flex;
  }
}
```

### Когда использовать CSS-only

✅ Подходит:
- Простые галереи изображений
- Карточки товаров
- Testimonials
- Feature tours

❌ Не подходит:
- Автопрокрутка (нужен JS)
- Сложная логика навигации
- Интеграция с API
- Аналитика взаимодействий

---

## Источники

- [Carousels with CSS — Chrome for Developers](https://developer.chrome.com/blog/carousels-with-css)
- [CSS Overflow Module Level 5](https://drafts.csswg.org/css-overflow-5/)
- [MDN: ::scroll-button()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::scroll-button)
- [MDN: ::scroll-marker](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::scroll-marker)
- [Can I Use: CSS Scroll Snap](https://caniuse.com/css-snappoints)
- [chrome.dev/carousel](https://chrome.dev/carousel/)
- [Native CSS Carousels — Jo Mändle](https://www.jomaendle.com/blog/css-carousel)
