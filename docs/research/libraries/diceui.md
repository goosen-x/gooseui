# DiceUI - Исследование библиотеки

## Общая информация

| Параметр | Значение |
|----------|----------|
| **Название** | Dice UI |
| **Сайт** | https://diceui.com |
| **GitHub** | https://github.com/sadmann7/diceui |
| **Автор** | sadmann7 (@sadmann17) |
| **Лицензия** | MIT |
| **Звезды** | 1,700+ |
| **Релизов** | 62+ |
| **Последний релиз** | @diceui/mention@0.8.0 (ноябрь 2025) |

## Описание

DiceUI - это библиотека доступных UI-компонентов, построенная поверх shadcn/ui. Библиотека предоставляет production-ready компоненты для React-приложений с фокусом на доступность и кастомизацию.

**Слоган:** "Accessible shadcn/ui components built with React, TypeScript, and Tailwind CSS. Copy-paste ready, and customizable."

## Технологический стек

- **Framework:** React
- **Язык:** TypeScript
- **Стилизация:** Tailwind CSS
- **Базовые библиотеки:**
  - Radix UI (примитивы)
  - shadcn/ui (дизайн и реестр)
  - Fumadocs (документация)

## Ключевые принципы

1. **Composable Design** - построение сложных интерфейсов через комбинирование простых, сфокусированных компонентов
2. **shadcn/ui Foundation** - сохранение принципов дизайна и подходов к стилизации от shadcn/ui
3. **Accessibility First** - каждый компонент следует WCAG guidelines, включает ARIA-атрибуты и поддерживает клавиатурную навигацию
4. **Copy-Paste Ready** - без сложной конфигурации, аналогичный опыт установки как у shadcn/ui
5. **Customization** - построено на Tailwind CSS для гибкой настройки дизайн-системы

## Модель установки

DiceUI использует модель распространения shadcn/ui - компоненты копируются напрямую в проект, что позволяет разработчикам кастомизировать и поддерживать компоненты самостоятельно.

```bash
npx shadcn@latest add @diceui/[component-name]
```

---

## Каталог компонентов (47+)

### Формы и ввод

#### Combobox
Поле ввода с выпадающим списком для фильтрации и выбора опций.

**Особенности:**
- Поддержка одиночного и множественного выбора
- Кастомная фильтрация (интеграция с match-sorter)
- Виртуализация для 10000+ элементов (@tanstack/react-virtual)
- Группировка опций
- Debounce фильтрация
- Интеграция с Tags Input

**Основные пропсы:**
| Проп | Тип | Описание |
|------|-----|----------|
| `value` | `Value<Multiple>` | Текущее значение |
| `onValueChange` | `function` | Callback при изменении |
| `inputValue` | `string` | Значение поля ввода |
| `multiple` | `boolean` | Множественный выбор |
| `autoHighlight` | `boolean` | Автовыделение |
| `manualFiltering` | `boolean` | Ручная фильтрация |

**Клавиатура:** Enter (выбор), ArrowUp/Down (навигация), Backspace (удаление), Escape (закрытие)

---

#### Tags Input
Поле ввода тегов с возможностью добавления, редактирования и удаления.

**Особенности:**
- Inline редактирование тегов
- Вставка через Ctrl+V
- Валидация через callback
- Интеграция с Sortable для перетаскивания

**Основные пропсы:**
| Проп | Тип | Описание |
|------|-----|----------|
| `value` | `string[]` | Массив тегов |
| `onValueChange` | `function` | Callback изменения |
| `editable` | `boolean` | Редактирование тегов |
| `addOnPaste` | `boolean` | Добавление при вставке |
| `addOnTab` | `boolean` | Добавление по Tab |
| `max` | `number` | Максимум тегов |
| `onValidate` | `function` | Валидация |

**Клавиатура:** Delete/Backspace (удаление), ArrowLeft/Right (навигация), Enter (добавление/редактирование), Escape (выход из редактирования)

---

#### File Upload
Компонент загрузки файлов с drag-and-drop, превью и отслеживанием прогресса.

**Особенности:**
- Drag-and-drop зона
- Валидация файлов (размер, тип)
- Прогресс загрузки (linear, circular, fill)
- Превью изображений
- RTL поддержка

**Основные пропсы:**
| Проп | Тип | Описание |
|------|-----|----------|
| `value` | `File[]` | Массив файлов |
| `maxFiles` | `number` | Лимит файлов |
| `maxSize` | `number` | Макс. размер в байтах |
| `accept` | `string` | MIME-типы |
| `onUpload` | `function` | Обработчик загрузки |
| `onFileValidate` | `function` | Кастомная валидация |
| `onFileReject` | `function` | Обработчик отклонения |

---

#### Checkbox Group
Группа чекбоксов с управлением состоянием.

#### Mask Input
Поле ввода с маской (телефон, карта и т.д.).

#### Segmented Input
Сегментированное поле ввода (OTP, PIN-коды).

#### Time Picker
Выбор времени.

---

### Отображение данных

#### Data Table
Мощный компонент таблицы с TanStack Table и URL-состоянием через nuqs.

**Особенности:**
- Расширенная фильтрация (text, number, date, select, multi-select)
- Мультиколоночная сортировка
- Серверная и клиентская пагинация
- Переключение видимости колонок
- Выделение строк с action bar
- Закрепление колонок (left/right)
- Клавиатурная навигация
- Мобильная адаптация

**Клавиатурные сочетания:**
- `Ctrl+Shift+F` - меню фильтров
- `Ctrl+Shift+S` - меню сортировки
- `Backspace/Delete` - удаление фильтра/сортировки

---

#### Data Grid
Сетка данных с редактированием.

#### Kanban
Drag-and-drop доска для организации задач по колонкам.

**Основные пропсы:**
| Проп | Тип | Описание |
|------|-----|----------|
| `value` | `Record` | Данные колонок |
| `onValueChange` | `function` | Callback изменения |
| `getItemValue` | `function` | Извлечение ID |
| `orientation` | `"vertical" \| "horizontal"` | Ориентация |

**Клавиатура:** Enter/Space (захват/отпуск), Arrow keys (навигация), Escape (отмена)

---

#### Listbox
Навигируемые списки выбора и сетки.

**Режимы:**
- Vertical - стандартная вертикальная навигация
- Horizontal - горизонтальная навигация
- Mixed - для сеток (2D навигация)

**Поддержка:** множественный выбор, виртуализация, группировка

---

#### Avatar Group
Группа аватаров с переполнением.

#### Badge Overflow
Бейджи с управлением переполнением.

#### Marquee
Бегущая строка/карусель.

#### QR Code
Генерация QR-кодов.

#### Rating
Компонент рейтинга (звезды).

#### Timeline
Временная шкала событий.

---

### Интерактивные элементы

#### Action Bar
Плавающая панель действий для bulk-операций над выделенными элементами.

**Особенности:**
- Позиционирование (top/bottom)
- Выравнивание (start/center/end)
- Roving focus навигация
- RTL поддержка

**Компоненты:**
- `ActionBarSelection` - отображение количества выбранных
- `ActionBarGroup` - группа действий
- `ActionBarItem` - отдельное действие
- `ActionBarClose` - кнопка закрытия
- `ActionBarSeparator` - разделитель

---

#### Color Picker
Выбор цвета с поддержкой HEX, RGB, HSL, HSB форматов.

**Компоненты:**
- `ColorPickerArea` - 2D область выбора
- `ColorPickerHueSlider` - регулятор оттенка
- `ColorPickerAlphaSlider` - регулятор прозрачности
- `ColorPickerEyeDropper` - пипетка (Chrome/Edge 95+)
- `ColorPickerFormatSelect` - выбор формата
- `ColorPickerInput` - поле ввода значения

---

#### Compare Slider
Сравнение изображений с ползунком.

#### Cropper
Обрезка изображений и видео.

**Особенности:**
- Масштабирование и поворот
- Форма области (rectangle/circle)
- Поддержка видео
- LRU-кэширование для производительности

**Основные пропсы:**
| Проп | Тип | Описание |
|------|-----|----------|
| `crop` | `{x, y}` | Позиция |
| `zoom` | `number` | Масштаб |
| `rotation` | `number` | Угол поворота |
| `aspectRatio` | `number` | Соотношение сторон |
| `shape` | `"rectangle" \| "circle"` | Форма области |

---

#### Media Player
Полнофункциональный плеер для видео и аудио на базе media-chrome.

**Компоненты:**
- `MediaPlayerVideo` / `MediaPlayerAudio` - медиа элементы
- `MediaPlayerPlay` - play/pause
- `MediaPlayerSeek` - таймлайн с превью
- `MediaPlayerVolume` - громкость
- `MediaPlayerTime` - время
- `MediaPlayerPlaybackSpeed` - скорость (0.5x-2x)
- `MediaPlayerFullscreen` - полноэкранный режим
- `MediaPlayerPiP` - картинка в картинке

**Клавиатура:**
- Space/K - play/pause
- F - полноэкранный режим
- M - mute
- Arrows - перемотка/громкость
- < / > - скорость воспроизведения
- 0-9 - переход к %
- P - picture-in-picture

---

#### Tour
Guided tour для onboarding пользователей.

**Особенности:**
- Spotlight эффект с cutout
- Шаги с таргетингом элементов
- Авто-скролл к элементам
- Модальный режим с блокировкой скролла

**Основные компоненты:**
- `TourSpotlight` - затемнение фона
- `TourSpotlightRing` - кольцо вокруг элемента
- `TourStep` - шаг тура
- `TourArrow` - указатель
- `TourPrev/Next/Skip` - навигация
- `TourStepCounter` - счетчик шагов

---

#### Angle Slider
Круговой слайдер для выбора угла.

#### Speed Dial
Меню быстрых действий.

---

### Визуальные индикаторы

#### Circular Progress
Круговой прогресс-бар.

#### Gauge
Индикатор-датчик.

#### Status
Статус-индикатор.

#### Stat
Отображение статистики.

#### Stepper
Пошаговый индикатор прогресса.

---

### Специализированные компоненты

#### Mention
Упоминания с триггер-символом (например, @).

**Основные пропсы:**
| Проп | Тип | Описание |
|------|-----|----------|
| `trigger` | `string` | Символ активации (по умолчанию "@") |
| `value` | `string` | Текущее значение |
| `onFilter` | `function` | Кастомная фильтрация |

---

#### Sortable
Drag-and-drop сортировка элементов.

**Ориентации:** vertical, horizontal, mixed

**Клавиатура:** Space/Enter (захват), Arrow keys (перемещение), Escape (отмена)

---

#### Editable
Редактируемый текст inline.

#### FPS
Счетчик кадров в секунду.

#### Key Value
Отображение пар ключ-значение.

#### Relative Time Card
Карточка с относительным временем.

#### Scroll Spy
Отслеживание скролла для навигации.

#### Scroller
Кастомный скроллер.

#### Stack
Компонент укладки элементов.

---

## Утилиты (9)

| Утилита | Назначение |
|---------|------------|
| Client Only | Рендеринг только на клиенте |
| Composition | Хелперы для композиции |
| Direction Provider | Провайдер RTL/LTR |
| Hitbox | Расширение области клика |
| Pending | Состояние ожидания |
| Portal | Рендеринг в портал |
| Presence | Анимации присутствия |
| Visually Hidden | Скрытие для скринридеров |

---

## Сравнение с аналогами

| Критерий | DiceUI | shadcn/ui | Radix UI |
|----------|--------|-----------|----------|
| Модель установки | Copy-paste | Copy-paste | npm |
| Количество компонентов | 47+ | ~40 | ~30 |
| Сложные компоненты | Data Table, Kanban, Tour | Базовые | Примитивы |
| Доступность | WCAG | WCAG | WCAG |
| Стилизация | Tailwind | Tailwind | CSS-in-JS/любой |
| Кастомизация | Полная | Полная | Ограниченная |

---

## Особенности и преимущества

### Плюсы
- Расширенный набор компонентов поверх shadcn/ui
- Сложные компоненты (Data Table, Kanban, Tour, Media Player)
- Полная доступность (WCAG, ARIA, клавиатура)
- Copy-paste модель без vendor lock-in
- Активная разработка (62+ релизов)
- MIT лицензия

### Минусы
- Молодой проект (может быть менее стабильным)
- Требует shadcn/ui как основу
- 39 открытых issues

---

## Примеры установки

### Один компонент
```bash
npx shadcn@latest add @diceui/combobox
```

### Несколько компонентов
```bash
npx shadcn@latest add @diceui/combobox @diceui/tags-input @diceui/file-upload
```

### npm установка (для headless)
```bash
npm install @diceui/combobox
```

---

## CSS-переменные

Компоненты используют CSS-переменные для позиционирования:

```css
--dice-transform-origin    /* Точка трансформации */
--dice-anchor-width        /* Ширина якоря */
--dice-anchor-height       /* Высота якоря */
--dice-available-width     /* Доступная ширина */
--dice-available-height    /* Доступная высота */
```

---

## Ссылки

- **Документация:** https://www.diceui.com/docs
- **GitHub:** https://github.com/sadmann7/diceui
- **Twitter автора:** https://twitter.com/sadmann17

---

## Заключение

DiceUI - отличное расширение для shadcn/ui, предоставляющее production-ready компоненты для сложных UI-задач. Особенно полезны: Data Table с URL-состоянием, Kanban для task management, Tour для onboarding, Media Player для медиа-контента, Combobox с виртуализацией.

Рекомендуется для проектов, которые уже используют shadcn/ui и нуждаются в расширенных компонентах без потери консистентности дизайн-системы.
