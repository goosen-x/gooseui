# HextaUI - Исследование библиотеки

> Дата исследования: 28.12.2024

## Обзор

**HextaUI** - это коллекция готовых к использованию компонентов и блоков, построенная на базе **shadcn/ui**. Библиотека предоставляет расширенные и улучшенные версии стандартных shadcn компонентов с дополнительными блоками для быстрой разработки.

- **Сайт**: https://www.hextaui.com/
- **GitHub**: https://github.com/preetsuthar17/HextaUI
- **npm**: `@hextastudio/ui`
- **Автор**: Preet Suthar (@preetsuthar17)
- **Лицензия**: MIT (core), GPL-3.0 (некоторые части)

## Статистика репозитория

| Метрика         | Значение               |
| --------------- | ---------------------- |
| Stars           | 548                    |
| Forks           | 41                     |
| Contributors    | 10                     |
| Commits         | 900                    |
| Основной язык   | TypeScript (99.6%)     |
| Последний релиз | HextaUI v2 (Июнь 2025) |

## Технологический стек

- **React** - основной UI фреймворк
- **Next.js** - поддержка SSR/SSG
- **TypeScript** - полная типизация
- **Tailwind CSS** - стилизация компонентов
- **Radix UI** - примитивы для компонентов (как в shadcn/ui)
- **Bun** - менеджер пакетов
- **Biome** - линтинг и форматирование
- **OKLCH** - продвинутая система цветов (в темах)

## Установка и использование

### Установка через npm

```bash
npm install @hextastudio/ui@latest
```

### Использование CLI

```bash
# Интерактивный режим выбора компонентов
npx hexta-ui add

# Добавление конкретного компонента
npx hexta-ui add button
npx hexta-ui add dropdown
```

CLI позволяет:

- Выбрать фреймворк (Next.js или React)
- Просмотреть список доступных компонентов
- Скачать компоненты в директорию `src/components/hexta-ui`

### Пример использования

```tsx
import { Button } from "components/ui/button"

export default function Home() {
  return (
    <main>
      <h1>Welcome to HextaUI with Next.js!</h1>
      <Button>Click Me!</Button>
    </main>
  )
}
```

## Список компонентов

### Базовые компоненты

| Категория        | Компоненты                                                                                                                              |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Actions**      | Button, Button Group, Toggle, Toggle Group                                                                                              |
| **Forms**        | Input, Input Group, Input OTP, Textarea, Checkbox, Radio Group, Select, Native Select, Switch, Slider, Date Picker, Color Picker, Field |
| **Layout**       | Card, Separator, Resizable, Scroll Area, Aspect Ratio, Collapsible                                                                      |
| **Navigation**   | Breadcrumb, Navigation Menu, Menubar, Pagination, Sidebar, Tabs, Tree                                                                   |
| **Feedback**     | Alert, Alert Dialog, Dialog, Drawer, Sheet, Toast (Sonner), Tooltip, Hover Card, Progress, Skeleton, Spinner, Empty                     |
| **Data Display** | Avatar, Badge, Table, Calendar, Carousel, Kbd, Label                                                                                    |
| **Overlays**     | Command Menu, Context Menu, Dropdown Menu                                                                                               |
| **Media**        | Video Player                                                                                                                            |

### Уникальные компоненты (не в стандартном shadcn/ui)

- **Color Picker** - полноценный выбор цвета с множеством методов ввода и пресетами
- **Video Player** - медиаплеер для видео
- **Button Group** - группировка кнопок
- **Input Group** - группировка полей ввода
- **Input OTP** - ввод одноразовых паролей
- **Field** - обертка для форм с валидацией
- **Empty** - состояние пустых данных
- **Kbd** - отображение клавиатурных сокращений
- **Spinner** - индикатор загрузки
- **Item** - универсальный элемент списка
- **Tree** - древовидная структура

## Система тем

### Доступные темы

1. **Default** - стандартная тема
2. **Retro Blue** - ретро-синяя
3. **Purple** - фиолетовая
4. **Night Wind** - ночной ветер
5. **Orbiter** - орбитальная
6. **Soft Orange** - мягкая оранжевая

Каждая тема поддерживает светлый и темный режимы.

### Кастомизация через CSS переменные

```css
:root {
  --hu-primary: 221, 83%, 53%;
  --hu-secondary: 210, 40%, 96%;
  --hu-destructive: 0, 84%, 60%;
  --hu-background: 0, 0%, 100%;
  --hu-foreground: 222, 47%, 11%;
  --hu-muted: 210, 40%, 96%;
  --hu-accent: 210, 40%, 96%;
  --hu-border: 214, 32%, 91%;
  --hu-input: 214, 32%, 91%;
  --hu-ring: 221, 83%, 53%;
}
```

### Поддерживаемые шрифты

- Inter
- Playfair Display
- Rubik
- Onest
- Tasa Orbiter

## HextaUI Pro

Платная версия с дополнительными блоками для быстрой разработки.

### Ценообразование

| План    | Цена   | Описание                          |
| ------- | ------ | --------------------------------- |
| Solo    | $169   | Для индивидуальных разработчиков  |
| Startup | $669   | Для команд                        |
| Шаблоны | от $49 | Отдельные шаблоны (AI SaaS и др.) |

Все покупки - одноразовые, без подписки, с пожизненным доступом.

### Pro блоки

- **Authentication** - полные флоу авторизации с социальными логинами, сбросом пароля, валидацией
- **Dashboard** - дашборды с графиками, метриками и визуализацией данных в реальном времени
- **E-commerce** - витрины товаров с корзиной, wishlist и quick view
- **Hero секции** - конверсионно-оптимизированные с CTA и social proof
- **Формы** - многошаговые формы с валидацией и загрузкой файлов
- **Навигация** - адаптивные меню с пользовательскими профилями

## Уникальные особенности

### 1. Расширение shadcn/ui

HextaUI не заменяет shadcn/ui, а расширяет его. Компоненты модифицированы и улучшены для лучшего соответствия реальным потребностям разработки.

### 2. Полная свобода кастомизации

Компоненты копируются в проект - нет vendor lock-in. Можно изменять что угодно.

### 3. CLI для быстрого добавления

Не нужно вручную копировать код - CLI автоматизирует процесс.

### 4. Готовые блоки

Целые секции (hero, auth, dashboard) можно скопировать и использовать сразу.

### 5. Активная разработка

900 коммитов, 10 контрибьюторов, регулярные релизы.

### 6. Благотворительность

2-5% от месячного дохода HextaUI направляется на благотворительность.

## Сравнение с shadcn/ui

| Критерий              | shadcn/ui  | HextaUI                                |
| --------------------- | ---------- | -------------------------------------- |
| Базовые компоненты    | Да         | Да (расширенные)                       |
| Готовые блоки         | Нет        | Да (Pro)                               |
| CLI                   | shadcn CLI | hexta-ui CLI                           |
| Темы                  | Базовые    | 6+ тем с вариациями                    |
| Уникальные компоненты | -          | Color Picker, Video Player, Tree и др. |
| Стоимость             | Бесплатно  | Бесплатно (core) / Платно (Pro)        |
| Лицензия              | MIT        | MIT / GPL-3.0                          |

## Преимущества

1. **Быстрый старт** - готовые компоненты из коробки
2. **Совместимость с shadcn/ui** - легкая миграция
3. **TypeScript поддержка** - полная типизация
4. **Dark mode** - встроенная поддержка
5. **Responsive** - адаптивный дизайн
6. **Документация** - подробные примеры использования
7. **Открытый исходный код** - можно изучать и контрибьютить

## Ограничения

1. **Молодой проект** - меньше community и ресурсов чем у established библиотек
2. **Зависимость от shadcn/ui** - изменения в shadcn/ui могут влиять на HextaUI
3. **Pro контент платный** - продвинутые блоки требуют покупки
4. **Кривая обучения** - для новичков в design systems

## Источники

- [HextaUI Official](https://www.hextaui.com/)
- [GitHub Repository](https://github.com/preetsuthar17/HextaUI)
- [HextaUI Pro](https://pro.hextaui.com)
- [All Shadcn - HextaUI](https://allshadcn.com/components/hextaui/)
- [All UtilityCSS - HextaUI](https://allutilitycss.com/tools/hextaui/)
- [Shadcn Templates - HextaUI](https://shadcntemplates.com/theme/preetsuthar17-hextaui)

## Рекомендации по использованию

### Когда использовать HextaUI:

- Нужны расширенные компоненты поверх shadcn/ui
- Требуется быстрый старт с готовыми темами
- Проект на Next.js/React + Tailwind CSS
- Нужны уникальные компоненты (Color Picker, Video Player)

### Когда НЕ использовать:

- Проект не использует React/Next.js
- Требуется полный контроль над стилями без Tailwind
- Нет возможности инвестировать в изучение специфики библиотеки
- Критична максимальная стабильность и долгосрочная поддержка

---

_Документ создан для внутреннего исследования библиотек UI компонентов._
