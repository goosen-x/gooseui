# Animated SVG Components

Компоненты с анимированными SVG элементами (как в Checkbox).

## Техника

CSS-only анимация через `stroke-dasharray` + `stroke-dashoffset`. Один непрерывный path рисует фигуру.

**Преимущества:**
- Нет зависимостей (anime.js не нужен)
- Работает с `:has()`, `:checked`, Tailwind
- Отличная производительность

## Компоненты

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

## Референсы

- Текущий Checkbox: `registry/new-york/ui/checkbox.tsx`
- anime.js (для сложных анимаций): https://animejs.com/documentation/svg/createdrawable

## Когда нужен anime.js

- Сложные timeline анимации
- Морфинг между разными shapes
- Motion paths
