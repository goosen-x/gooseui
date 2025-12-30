# Promo Banner Popup

#p3 #component #marketing

## Описание

Промо-баннер в стиле Creative Tim — всплывающий popup для акций, анонсов и специальных предложений. Появляется в углу экрана с возможностью закрытия.

## Что хочется

- [ ] Popup баннер с тёмным/светлым фоном
- [ ] Кнопка закрытия (X)
- [ ] Анимированная "бегущая строка" снизу (marquee)
- [ ] Градиентный фон с изображениями продуктов
- [ ] Зачёркнутая старая цена + новая цена
- [ ] Countdown или "X DAYS LEFT" лента
- [ ] Запоминание в localStorage (не показывать снова)
- [ ] Настраиваемая задержка появления

## Референсы

| Библиотека | Ссылка | Что понравилось |
| ---------- | ------ | --------------- |
| Creative Tim | https://www.creative-tim.com/ui/campaign | Дизайн, marquee лента, градиент |
| Vercel | Их announcement banners | Минимализм |

## Примеры использования

```tsx
// Вариант 1: Как компонент
<PromoBanner
  title="Winter Campaign"
  headline="START 2026 WITH A BANG!"
  price={229}
  originalPrice={1444}
  ctaText="Get Bundle"
  ctaHref="/pricing"
  marqueeText="3 DAYS LEFT | FIRST 100"
  onClose={() => {}}
/>

// Вариант 2: Через Provider
<PromoBannerProvider
  config={{
    delay: 5000, // показать через 5 сек
    storageKey: "promo-winter-2026",
    expiresAt: new Date("2026-01-15"),
  }}
>
  <App />
</PromoBannerProvider>
```

## Структура компонента

```
┌─────────────────────────────────────┐ ✕
│  🏷️ Logo                            │
│                                     │
│  Winter Campaign Edition            │
│  ══════════════════════════════════ │
│  START 2026 WITH A BANG!            │
│                                     │
│  Starting from                      │
│  $229  ̶$̶1̶,̶4̶4̶4̶                       │
│                                     │
│  [Product Images Grid]              │
│                                     │
├─────────────────────────────────────┤
│ ◀ 3 DAYS LEFT | FIRST 100 | 3 DAYS ▶│ ← marquee
└─────────────────────────────────────┘
```

## Задачи для реализации

- [ ] Создать базовый компонент PromoBanner
- [ ] Добавить Marquee компонент (или использовать существующий)
- [ ] Реализовать анимацию появления (slide-in)
- [ ] Добавить localStorage persistence
- [ ] Создать PromoBannerProvider для глобального управления
- [ ] Добавить поддержку тёмной/светлой темы
- [ ] Написать документацию с примерами

## Варианты позиционирования

- `bottom-right` (как у Creative Tim)
- `bottom-left`
- `center` (modal style)
- `top-banner` (полноширинный)

## Заметки

- Важно не раздражать пользователей — показывать 1 раз за сессию или реже
- Добавить респект к `prefers-reduced-motion` для marquee
- Возможно сделать отдельным пакетом для маркетинга

---

Создано: 2024-12-30
Статус: idea
