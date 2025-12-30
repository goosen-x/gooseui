# CSS Carousel: Примеры кода

> Готовые примеры реализации каруселей для копирования.

## Содержание

1. [Базовая карусель](#1-базовая-карусель)
2. [Карусель с кнопками (Chrome 135+)](#2-карусель-с-кнопками)
3. [Карусель с индикаторами](#3-карусель-с-индикаторами)
4. [Полная карусель](#4-полная-карусель)
5. [Вертикальная карусель](#5-вертикальная-карусель)
6. [Drag-to-scroll](#6-drag-to-scroll)
7. [Карусель с миниатюрами](#7-карусель-с-миниатюрами)

---

## 1. Базовая карусель

Работает во всех современных браузерах (96.4% покрытие).

### HTML

```html
<ul class="carousel">
  <li class="slide">Slide 1</li>
  <li class="slide">Slide 2</li>
  <li class="slide">Slide 3</li>
  <li class="slide">Slide 4</li>
</ul>
```

### CSS

```css
.carousel {
  /* Layout */
  display: flex;
  gap: 1rem;
  padding: 0;
  margin: 0;
  list-style: none;

  /* Scroll behavior */
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  overscroll-behavior-x: contain;

  /* Hide scrollbar */
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.carousel::-webkit-scrollbar {
  display: none;
}

.slide {
  /* Each slide takes full width */
  flex: 0 0 100%;
  scroll-snap-align: start;

  /* Styling */
  min-height: 300px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 2rem;
  border-radius: 1rem;
}
```

---

## 2. Карусель с кнопками

**Требует Chrome 135+ / Edge 135+**

### HTML

```html
<ul class="carousel">
  <li class="slide">Slide 1</li>
  <li class="slide">Slide 2</li>
  <li class="slide">Slide 3</li>
</ul>
```

### CSS

```css
.carousel {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  overscroll-behavior-x: contain;
  scrollbar-width: none;

  /* Для позиционирования кнопок */
  position: relative;
  anchor-name: --carousel;
}

.slide {
  flex: 0 0 100%;
  scroll-snap-align: center;
  scroll-snap-stop: always;
  min-height: 300px;
  background: #f0f0f0;
  border-radius: 1rem;
}

/* Общие стили кнопок */
.carousel::scroll-button(*) {
  /* Позиционирование */
  position: absolute;
  position-anchor: --carousel;
  align-self: anchor-center;

  /* Стили */
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}

.carousel::scroll-button(*):hover {
  background: rgba(0, 0, 0, 0.9);
  transform: scale(1.1);
}

.carousel::scroll-button(*):disabled {
  opacity: 0.3;
  cursor: not-allowed;
  transform: none;
}

/* Левая кнопка */
.carousel::scroll-button(left) {
  content: "←";
  left: calc(anchor(left) + 16px);
}

/* Правая кнопка */
.carousel::scroll-button(right) {
  content: "→";
  right: calc(100% - anchor(right) + 16px);
}
```

---

## 3. Карусель с индикаторами

**Требует Chrome 135+ / Edge 135+**

### HTML

```html
<ul class="carousel">
  <li class="slide">Slide 1</li>
  <li class="slide">Slide 2</li>
  <li class="slide">Slide 3</li>
  <li class="slide">Slide 4</li>
</ul>
```

### CSS

```css
.carousel {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;

  /* Активируем маркеры */
  scroll-marker-group: after;
}

.slide {
  flex: 0 0 100%;
  scroll-snap-align: center;
  min-height: 300px;
  background: #e0e0e0;
  border-radius: 1rem;
}

/* Контейнер маркеров */
.carousel::scroll-marker-group {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 20px 0;
}

/* Маркеры (точки) */
.slide::scroll-marker {
  content: "";
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.2);
  border: 2px solid transparent;
  transition: all 0.2s ease;
  cursor: pointer;
}

.slide::scroll-marker:hover {
  background: rgba(0, 0, 0, 0.4);
}

/* Активный маркер */
.slide::scroll-marker:target-current {
  background: #000;
  transform: scale(1.3);
}
```

---

## 4. Полная карусель

Кнопки + индикаторы + все фишки.

### HTML

```html
<div class="carousel-wrapper">
  <ul class="carousel" id="gallery">
    <li class="slide" style="--bg: #ff6b6b;">1</li>
    <li class="slide" style="--bg: #4ecdc4;">2</li>
    <li class="slide" style="--bg: #45b7d1;">3</li>
    <li class="slide" style="--bg: #96ceb4;">4</li>
    <li class="slide" style="--bg: #ffeaa7;">5</li>
  </ul>
</div>
```

### CSS

```css
.carousel-wrapper {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.carousel {
  /* Layout */
  display: flex;
  gap: 1rem;
  padding: 0;
  margin: 0;
  list-style: none;

  /* Scrolling */
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  overscroll-behavior-x: contain;
  scrollbar-width: none;

  /* Features */
  scroll-marker-group: after;
  anchor-name: --carousel;
}

.carousel::-webkit-scrollbar {
  display: none;
}

.slide {
  flex: 0 0 100%;
  scroll-snap-align: center;
  scroll-snap-stop: always;

  min-height: 400px;
  display: grid;
  place-items: center;
  background: var(--bg, #ccc);
  color: white;
  font-size: 4rem;
  font-weight: bold;
  border-radius: 1rem;
}

/* ===== Кнопки ===== */
.carousel::scroll-button(*) {
  position: absolute;
  position-anchor: --carousel;
  align-self: anchor-center;
  z-index: 10;

  width: 56px;
  height: 56px;
  border: none;
  border-radius: 50%;
  background: white;
  color: #333;
  font-size: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.2s;
}

.carousel::scroll-button(*):hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.carousel::scroll-button(*):disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}

.carousel::scroll-button(left) {
  content: "‹";
  left: -28px;
}

.carousel::scroll-button(right) {
  content: "›";
  right: -28px;
}

/* ===== Маркеры ===== */
.carousel::scroll-marker-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 24px 0;
}

.slide::scroll-marker {
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
}

.slide::scroll-marker:hover {
  background: rgba(0, 0, 0, 0.5);
  transform: scale(1.2);
}

.slide::scroll-marker:target-current {
  background: #333;
  width: 24px;
  border-radius: 5px;
}

/* ===== Progressive Enhancement ===== */
@supports not selector(::scroll-button(right)) {
  /* Fallback для старых браузеров */
  .carousel-wrapper::before {
    content: "← Swipe →";
    display: block;
    text-align: center;
    padding: 8px;
    color: #666;
    font-size: 0.875rem;
  }
}
```

---

## 5. Вертикальная карусель

### HTML

```html
<ul class="vertical-carousel">
  <li class="slide">Section 1</li>
  <li class="slide">Section 2</li>
  <li class="slide">Section 3</li>
</ul>
```

### CSS

```css
.vertical-carousel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 400px;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  scroll-marker-group: after;
}

.vertical-carousel .slide {
  flex: 0 0 100%;
  scroll-snap-align: start;
  background: #f0f0f0;
  border-radius: 1rem;
}

/* Кнопки для вертикальной прокрутки */
.vertical-carousel::scroll-button(up) {
  content: "↑";
}

.vertical-carousel::scroll-button(down) {
  content: "↓";
}

/* Маркеры сбоку */
.vertical-carousel::scroll-marker-group {
  position: absolute;
  right: -30px;
  top: 50%;
  transform: translateY(-50%);
  flex-direction: column;
  gap: 8px;
}
```

---

## 6. Drag-to-scroll

JavaScript для поддержки перетаскивания мышью.

### JavaScript (TypeScript)

```typescript
interface DragState {
  isDown: boolean;
  startX: number;
  scrollLeft: number;
  preventClick: boolean;
}

function initCarouselDrag(selector: string): void {
  const carousel = document.querySelector<HTMLElement>(selector);
  if (!carousel) return;

  const state: DragState = {
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    preventClick: false,
  };

  // Mouse events
  carousel.addEventListener('mousedown', (e: MouseEvent) => {
    state.isDown = true;
    state.startX = e.pageX - carousel.offsetLeft;
    state.scrollLeft = carousel.scrollLeft;
    state.preventClick = false;
    carousel.style.cursor = 'grabbing';
    carousel.style.scrollSnapType = 'none';
  });

  carousel.addEventListener('mousemove', (e: MouseEvent) => {
    if (!state.isDown) return;
    e.preventDefault();

    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - state.startX) * 2;
    carousel.scrollLeft = state.scrollLeft - walk;

    if (Math.abs(walk) > 5) {
      state.preventClick = true;
    }
  });

  const endDrag = () => {
    state.isDown = false;
    carousel.style.cursor = 'grab';
    carousel.style.scrollSnapType = 'x mandatory';
  };

  carousel.addEventListener('mouseup', endDrag);
  carousel.addEventListener('mouseleave', endDrag);

  // Prevent click after drag
  carousel.addEventListener('click', (e: MouseEvent) => {
    if (state.preventClick) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);
}

// Init
initCarouselDrag('.carousel');
```

### CSS для drag

```css
.carousel {
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
}

.carousel:active {
  cursor: grabbing;
}

/* Предотвращаем выделение изображений */
.carousel img {
  pointer-events: none;
  -webkit-user-drag: none;
}
```

---

## 7. Карусель с миниатюрами

### HTML

```html
<div class="gallery">
  <ul class="main-carousel">
    <li class="slide" style="--thumb: url(img1-thumb.jpg);">
      <img src="img1.jpg" alt="Image 1">
    </li>
    <li class="slide" style="--thumb: url(img2-thumb.jpg);">
      <img src="img2.jpg" alt="Image 2">
    </li>
    <li class="slide" style="--thumb: url(img3-thumb.jpg);">
      <img src="img3.jpg" alt="Image 3">
    </li>
  </ul>
</div>
```

### CSS

```css
.main-carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scroll-marker-group: after;
  gap: 0;
}

.main-carousel .slide {
  flex: 0 0 100%;
  scroll-snap-align: center;
}

.main-carousel .slide img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

/* Миниатюры как маркеры */
.main-carousel::scroll-marker-group {
  display: flex;
  gap: 8px;
  padding: 16px;
  justify-content: center;
  background: #f5f5f5;
}

.main-carousel .slide::scroll-marker {
  content: "";
  width: 80px;
  height: 60px;
  background-image: var(--thumb);
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  border: 3px solid transparent;
  opacity: 0.6;
  transition: all 0.2s;
  cursor: pointer;
}

.main-carousel .slide::scroll-marker:hover {
  opacity: 0.9;
}

.main-carousel .slide::scroll-marker:target-current {
  opacity: 1;
  border-color: #007bff;
  transform: scale(1.05);
}
```

---

## Feature Detection

```css
/* Проверка поддержки новых фич */
@supports selector(::scroll-button(right)) {
  /* Chrome 135+ styles */
  .carousel::scroll-button(right) {
    content: "→";
  }
}

@supports not selector(::scroll-button(right)) {
  /* Fallback для Firefox, Safari */
  .carousel-nav {
    display: flex; /* Показываем JS кнопки */
  }
}
```

```javascript
// JavaScript feature detection
const supportsScrollButton = CSS.supports('selector(::scroll-button(right))');

if (!supportsScrollButton) {
  // Add JavaScript navigation buttons
  initFallbackNavigation('.carousel');
}
```

---

## Ссылки

- [chrome.dev/carousel](https://chrome.dev/carousel/) — 23+ примеров
- [MDN: CSS Scroll Snap](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap)
- [Chrome Blog: Carousels with CSS](https://developer.chrome.com/blog/carousels-with-css)
