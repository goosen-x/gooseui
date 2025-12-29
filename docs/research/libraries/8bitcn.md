# 8bitcn/ui - Ретро UI Библиотека

> Исследование проведено: 2025-12-28

## Обзор

**8bitcn/ui** - это библиотека UI-компонентов с 8-битным ретро-стилем оформления. Проект является открытым и бесплатным, лицензирован под MIT License.

**Официальный сайт:** https://www.8bitcn.com/
**GitHub:** https://github.com/TheOrcDev/8bitcn-ui
**Автор:** OrcDev

### Ключевые характеристики

- **1.4k+ звезд** на GitHub
- **MIT лицензия**
- **Фреймворк-агностичная** - работает с React, Vue, Svelte и другими
- **Построена на shadcn/ui** - совместима с экосистемой shadcn
- **Tailwind CSS** для стилизации
- **Radix UI** для доступности

---

## Технологический стек

| Технология   | Назначение               |
| ------------ | ------------------------ |
| TypeScript   | 73.4% кодовой базы       |
| MDX          | 17.8% - документация     |
| CSS          | 8.8% - стили             |
| Next.js      | Фреймворк                |
| Tailwind CSS | Стилизация               |
| Radix UI     | Доступность компонентов  |
| Biome        | Линтинг и форматирование |
| pnpm         | Пакетный менеджер        |

---

## Установка и настройка

### Быстрый старт

```bash
# Добавление первого компонента автоматически регистрирует реестр
pnpm dlx shadcn@latest add @8bitcn/button
```

Эта команда автоматически добавит конфигурацию реестра в `components.json`:

```json
{
  "registries": {
    "@8bitcn": "https://8bitcn.com/r/{name}.json"
  }
}
```

### Альтернативные пакетные менеджеры

```bash
# npm
npx shadcn@latest add @8bitcn/button

# yarn
yarn dlx shadcn@latest add @8bitcn/button

# bun
bunx shadcn@latest add @8bitcn/button
```

### MCP интеграция (опционально)

Для AI-ассистентов можно инициализировать Model Context Protocol:

```bash
pnpm dlx shadcn@latest mcp init
```

---

## Список компонентов (55 шт.)

### Базовые UI компоненты

| Компонент       | Описание               |
| --------------- | ---------------------- |
| Accordion       | Аккордеон              |
| Alert           | Уведомление            |
| Alert Dialog    | Диалог подтверждения   |
| Avatar          | Аватар пользователя    |
| Badge           | Бейдж/метка            |
| Breadcrumb      | Хлебные крошки         |
| Button          | Кнопка                 |
| Calendar        | Календарь              |
| Card            | Карточка               |
| Carousel        | Карусель               |
| Chart           | Графики                |
| Checkbox        | Чекбокс                |
| Collapsible     | Сворачиваемый блок     |
| Combo Box       | Комбобокс              |
| Command         | Командная палитра      |
| Context Menu    | Контекстное меню       |
| Date Picker     | Выбор даты             |
| Dialog          | Модальное окно         |
| Drawer          | Выдвижная панель       |
| Dropdown Menu   | Выпадающее меню        |
| Empty           | Пустое состояние       |
| Hover Card      | Карточка при наведении |
| Input           | Текстовое поле         |
| Input OTP       | Поле ввода OTP         |
| Kbd             | Клавиатурная подсказка |
| Label           | Метка                  |
| Menubar         | Строка меню            |
| Navigation Menu | Навигационное меню     |
| Pagination      | Пагинация              |
| Popover         | Всплывающее окно       |
| Progress        | Прогресс-бар           |
| Radio Group     | Радио-группа           |
| Resizable       | Изменяемый размер      |
| Scroll Area     | Область прокрутки      |
| Select          | Выпадающий список      |
| Separator       | Разделитель            |
| Sheet           | Боковая панель         |
| Sidebar         | Сайдбар                |
| Skeleton        | Скелетон загрузки      |
| Slider          | Слайдер                |
| Spinner         | Индикатор загрузки     |
| Switch          | Переключатель          |
| Table           | Таблица                |
| Tabs            | Вкладки                |
| Textarea        | Многострочное поле     |
| Toast           | Тост-уведомление       |
| Toggle          | Переключатель          |
| Toggle Group    | Группа переключателей  |
| Tooltip         | Подсказка              |

### Игровые компоненты (уникальные)

| Компонент            | Описание                   |
| -------------------- | -------------------------- |
| Health Bar           | Полоса здоровья персонажа  |
| Mana Bar             | Полоса маны/энергии        |
| Enemy Health Display | Отображение здоровья врага |
| Item                 | Игровой предмет            |
| Retro Mode Switcher  | Переключатель ретро-режима |
| Theme Selector       | Выбор темы                 |

---

## Готовые блоки (27 шт.)

### Gaming Blocks (16 блоков)

Уникальная коллекция игровых интерфейсов:

| Блок                | Описание                |
| ------------------- | ----------------------- |
| Audio Settings      | Настройки звука         |
| Chapter Intro       | Введение главы          |
| Character Sheet     | Лист персонажа          |
| Dialogue            | Диалоговое окно         |
| Difficulty Select   | Выбор сложности         |
| Friend List         | Список друзей           |
| Game Over           | Экран окончания игры    |
| Game Progress       | Прогресс игры           |
| Leaderboard         | Таблица лидеров         |
| Main Menu           | Главное меню игры       |
| Pause Menu          | Меню паузы              |
| Player Profile Card | Карточка профиля игрока |
| Quest Log           | Журнал заданий          |
| Save Slots          | Слоты сохранения        |
| Victory Screen      | Экран победы            |

### Authentication Blocks (4 блока)

| Блок                  | Описание             |
| --------------------- | -------------------- |
| Login Form            | Форма входа          |
| Login Page            | Страница входа       |
| Login Form with Icons | Форма с иконками     |
| Login Form with Image | Форма с изображением |

### Dashboard Blocks (1 блок)

| Блок      | Описание                               |
| --------- | -------------------------------------- |
| Dashboard | Полный дашборд с сайдбаром и графиками |

### Calendar Blocks (3 блока)

| Блок                 | Описание               |
| -------------------- | ---------------------- |
| Calendar Block       | Блок календаря         |
| Range Calendar       | Календарь с диапазоном |
| Single Date Calendar | Выбор одной даты       |

### Charts Blocks (3 блока)

| Блок               | Описание                |
| ------------------ | ----------------------- |
| Bar Chart          | Столбчатая диаграмма    |
| Multiple Bar Chart | Множественная диаграмма |
| Step Area Chart    | Ступенчатая диаграмма   |

---

## Примеры использования

### Button

```bash
pnpm dlx shadcn@latest add @8bitcn/button
```

```tsx
import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return <Button>Click me</Button>
}
```

Особенности:

- Пиксельные границы со всех сторон
- Декоративные углы
- Анимация при нажатии (`active:translate-y-1`)
- Поддержка темной темы

### Card

```bash
pnpm dlx shadcn@latest add @8bitcn/card
```

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CardDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project</CardDescription>
      </CardHeader>
      <CardContent>{/* Содержимое карточки */}</CardContent>
      <CardFooter>
        <Button>Create</Button>
      </CardFooter>
    </Card>
  )
}
```

### Dialog

```bash
pnpm dlx shadcn@latest add @8bitcn/dialog
```

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>This is the dialog description.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

### Health Bar (игровой компонент)

```bash
pnpm dlx shadcn@latest add @8bitcn/health-bar
```

```tsx
import { HealthBar } from "@/components/ui/health-bar"

export function HealthBarDemo() {
  return <HealthBar currentHealth={75} maxHealth={100} />
}
```

Особенности:

- Пиксельная стилизация
- Плавные анимации изменения
- Поддержка ретро-режима с отдельными сегментами

### Mana Bar (игровой компонент)

```bash
pnpm dlx shadcn@latest add @8bitcn/mana-bar
```

```tsx
import { ManaBar } from "@/components/ui/mana-bar"

export function ManaBarDemo() {
  return <ManaBar currentMana={45} maxMana={100} />
}
```

### Enemy Health Display (игровой компонент)

```bash
pnpm dlx shadcn@latest add @8bitcn/enemy-health-display
```

```tsx
import { EnemyHealthDisplay } from "@/components/ui/enemy-health-display"

export function EnemyDemo() {
  return (
    <EnemyHealthDisplay
      enemyName="Fire Dragon"
      currentHealth={850}
      maxHealth={1000}
      level={25}
    />
  )
}
```

Опциональные пропсы:

- `level` - уровень врага
- `showLevel` - показывать ли уровень
- `showHealthText` - показывать ли текст здоровья
- `variant` - вариант стилизации
- `colorScheme` - цветовая схема
- `size` - размер (sm/md/lg)

---

## Темизация

### Поддерживаемые темы

- **Light** - светлая тема
- **Dark** - темная тема
- **System** - автоопределение по системным настройкам

### Реализация

Темизация реализована через:

- CSS-классы на корневом элементе
- `ThemeProvider` и `ActiveThemeProvider` для управления состоянием
- LocalStorage для сохранения выбора пользователя
- Динамическое свойство `colorScheme`

---

## Преимущества

1. **Уникальный стиль** - аутентичный 8-битный дизайн, выделяющийся среди стандартных UI
2. **Shadcn совместимость** - полная интеграция с экосистемой shadcn/ui
3. **Игровые компоненты** - уникальные элементы для игровых интерфейсов
4. **Доступность** - построена на Radix UI с поддержкой клавиатурной навигации
5. **Гибкость** - легко кастомизируется через Tailwind CSS
6. **Готовые блоки** - 27 готовых шаблонов для быстрого старта

---

## Идеальные случаи использования

- Игровые приложения и интерфейсы
- Ретро-тематические веб-сайты
- Креативные портфолио
- Ностальгические бренд-проекты
- Проекты, требующие уникальной визуальной идентичности

---

## Спонсоры проекта

- **Shadcn Studio** (MYTHIC уровень)
- **Shadcn Blocks**
- **Trigger.dev**
- **Coolify**
- **Vercel OSS Program**

---

## Источники

- [Официальный сайт 8bitcn](https://www.8bitcn.com/)
- [GitHub репозиторий](https://github.com/TheOrcDev/8bitcn-ui)
- [Документация компонентов](https://www.8bitcn.com/docs/components)
- [Документация блоков](https://www.8bitcn.com/docs/blocks)
- [Product Hunt](https://www.producthunt.com/products/8bitcn)
- [All Shadcn - 8bitcn](https://allshadcn.com/components/8bitcnui/)
