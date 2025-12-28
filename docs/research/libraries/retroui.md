# RetroUI - NeoBrutalism React Component Library

> Библиотека React компонентов в стиле NeoBrutalism, построенная на TailwindCSS

**Официальный сайт:** https://retroui.dev
**GitHub:** https://github.com/Logging-Studio/RetroUI
**Лицензия:** MIT
**Последний релиз:** v1.2.3 (30 ноября 2025)

---

## Обзор

RetroUI — это библиотека UI-компонентов для React, созданная в уникальном стиле **NeoBrutalism**. Библиотека решает проблему однотипности современных UI-библиотек, предлагая смелый, выразительный дизайн с характерными чертами:

- Толстые границы (border-2)
- Контрастные тени
- Яркие цвета
- Ретро-эстетика с современным подходом

### Философия дизайна

> "Most of the UI libraries out here are very generic and hard to distinguish from each other."

RetroUI создана для тех, кто хочет выделиться среди типовых веб-интерфейсов и создать запоминающийся пользовательский опыт.

---

## Технологии

| Технология | Использование |
|------------|---------------|
| React | Основной фреймворк |
| TypeScript | 70.6% кодовой базы |
| TailwindCSS | Стилизация компонентов |
| Radix UI | Примитивы доступности |
| class-variance-authority (CVA) | Управление вариантами |
| Next.js | Демо-сайт и документация |
| Embla Carousel | Carousel компонент |
| react-day-picker | Calendar компонент |
| lucide-react | Иконки |

---

## Статистика репозитория

- **1.2k+** звезд на GitHub
- **46** форков
- **21+** контрибьюторов
- **404** коммитов
- **29** релизов
- Участник программы Vercel Open Source Software

---

## Установка

### Требования
- React 18+
- TailwindCSS 3+
- TypeScript (рекомендуется)

### Поддерживаемые фреймворки
- Next.js (основной)
- Vite

### CLI установка (рекомендуется)

```bash
# Установка отдельного компонента
npx shadcn@latest add @retroui/button

# Установка нескольких компонентов
npx shadcn@latest add @retroui/card @retroui/input @retroui/badge
```

### Ручная установка

```bash
# Установка зависимостей Radix UI
npm install @radix-ui/react-accordion
npm install @radix-ui/react-avatar
npm install @radix-ui/react-checkbox
npm install @radix-ui/react-dialog
npm install @radix-ui/react-label
npm install @radix-ui/react-popover
npm install @radix-ui/react-progress
npm install @radix-ui/react-select
npm install @radix-ui/react-switch
npm install @radix-ui/react-tooltip

# Дополнительные зависимости
npm install class-variance-authority
npm install lucide-react
npm install embla-carousel-react
npm install react-day-picker
```

---

## Каталог компонентов

### Базовые компоненты

#### Button
Главный интерактивный элемент с несколькими вариантами стилизации.

**Варианты:**
- `default` — основной стиль с тенью и эффектами наведения
- `secondary` — вторичный вариант
- `outline` — прозрачный фон с границей
- `link` — текстовый стиль с подчеркиванием
- `ghost` — минимальный стиль

**Размеры:** `sm`, `md`, `lg`, `icon`

```tsx
import { Button } from "@/components/retroui/Button"

<Button variant="default" size="md">
  Click me
</Button>

<Button variant="outline" size="lg">
  <Icon /> With Icon
</Button>
```

---

#### Badge
Компонент для отображения меток и статусов.

**Варианты:**
- `default` — `bg-muted text-muted-foreground`
- `outline` — граница без заливки
- `solid` — инвертированные цвета
- `surface` — с primary фоном

**Размеры:** `sm`, `md`, `lg`

```tsx
import { Badge } from "@/components/retroui/Badge"

<Badge variant="solid" size="md">New</Badge>
<Badge variant="outline" className="rounded-full">Beta</Badge>
```

---

#### Avatar
Компонент для отображения аватаров пользователей.

**Структура:** Compound component pattern

```tsx
import { Avatar } from "@/components/retroui/Avatar"

<Avatar>
  <Avatar.Image src="/avatar.jpg" alt="User Name" />
  <Avatar.Fallback>UN</Avatar.Fallback>
</Avatar>

// С кастомным размером
<Avatar className="h-20 w-20">
  <Avatar.Image src="/avatar.jpg" alt="User" />
  <Avatar.Fallback>UN</Avatar.Fallback>
</Avatar>
```

---

### Форм-элементы

#### Input
Текстовое поле ввода с поддержкой состояния ошибки.

```tsx
import { Input } from "@/components/retroui/Input"
import { Label } from "@/components/retroui/Label"

// Базовый input
<Input placeholder="Enter text..." />

// С Label
<div>
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="name@example.com" />
</div>

// Состояние ошибки
<Input aria-invalid placeholder="Invalid input" />
<span className="text-red-500">Error message</span>
```

---

#### Textarea
Многострочное текстовое поле.

```tsx
import { Textarea } from "@/components/retroui/Textarea"

<Textarea
  rows={4}
  placeholder="Type something..."
  className="w-full"
/>
```

---

#### Select
Выпадающий список для выбора опций.

**Структура:**
- `Select` — корневой компонент
- `Select.Trigger` — кнопка открытия
- `Select.Value` — отображение значения
- `Select.Content` — контейнер опций
- `Select.Group` — группировка
- `Select.Item` — отдельная опция
- `Select.Label` — метка группы
- `Select.Separator` — разделитель

```tsx
import { Select } from "@/components/retroui/Select"

<Select>
  <Select.Trigger className="w-60">
    <Select.Value placeholder="Select option" />
  </Select.Trigger>
  <Select.Content>
    <Select.Group>
      <Select.Label>Fruits</Select.Label>
      <Select.Item value="apple">Apple</Select.Item>
      <Select.Item value="banana">Banana</Select.Item>
    </Select.Group>
    <Select.Separator />
    <Select.Group>
      <Select.Label>Vegetables</Select.Label>
      <Select.Item value="carrot">Carrot</Select.Item>
    </Select.Group>
  </Select.Content>
</Select>
```

---

#### Checkbox
Чекбокс для выбора опций.

**Варианты:** `default`, `outline`, `solid`
**Размеры:** `sm`, `md`, `lg`

```tsx
import { Checkbox } from "@/components/retroui/Checkbox"
import { Label } from "@/components/retroui/Label"

<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms</Label>
</div>

<Checkbox variant="solid" size="lg" />
```

---

#### Switch
Переключатель для boolean значений.

```tsx
import { Switch } from "@/components/retroui/Switch"

<div className="flex items-center gap-2">
  <Switch id="notifications" />
  <label htmlFor="notifications">Email Notifications</label>
</div>

// Disabled
<Switch disabled />
```

---

#### Label
Универсальный компонент меток для форм.

```tsx
import { Label } from "@/components/retroui/Label"

<Label htmlFor="input-id">Field Label</Label>
```

---

### Контейнеры

#### Card
Карточка для отображения контента.

**Структура:**
- `Card` — основной контейнер
- `Card.Header` — заголовочная секция
- `Card.Title` — заголовок (h3)
- `Card.Description` — описание
- `Card.Content` — содержимое

```tsx
import { Card } from "@/components/retroui/Card"

// Базовая карточка
<Card>
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Card description text</Card.Description>
  </Card.Header>
  <Card.Content>
    <p>Content goes here</p>
  </Card.Content>
</Card>

// Product Card
<Card className="w-72">
  <img src="/product.jpg" alt="Product" className="w-full" />
  <Card.Header>
    <Card.Title>Product Name</Card.Title>
    <Card.Description>$99.00</Card.Description>
  </Card.Header>
  <Card.Content>
    <Button className="w-full">Add to Cart</Button>
  </Card.Content>
</Card>
```

---

#### Accordion
Раскрывающиеся секции для FAQ и контента.

**Структура:**
- `Accordion` — корневой компонент
- `Accordion.Item` — отдельная секция
- `Accordion.Header` — заголовок-триггер
- `Accordion.Content` — скрытое содержимое

```tsx
import { Accordion } from "@/components/retroui/Accordion"

<Accordion type="single" collapsible className="w-full space-y-4">
  <Accordion.Item value="item-1">
    <Accordion.Header>What is RetroUI?</Accordion.Header>
    <Accordion.Content>
      RetroUI is a NeoBrutalism styled React component library.
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Header>How to install?</Accordion.Header>
    <Accordion.Content>
      Use npx shadcn@latest add @retroui/component-name
    </Accordion.Content>
  </Accordion.Item>
</Accordion>
```

---

### Обратная связь

#### Alert
Уведомления и предупреждения.

**Варианты:** `default`, `solid`
**Статусы:** `success`, `info`, `error`, `warning`

```tsx
import { Alert } from "@/components/retroui/Alert"
import { CheckCircle, XIcon, InfoIcon } from "lucide-react"

// Success Alert
<Alert status="success">
  <CheckCircle className="h-5 w-5" />
  <Alert.Title>Success!</Alert.Title>
  <Alert.Description>Operation completed successfully.</Alert.Description>
</Alert>

// Error Alert (solid variant)
<Alert variant="solid" status="error">
  <XIcon className="h-5 w-5" />
  <Alert.Title>Error</Alert.Title>
  <Alert.Description>Something went wrong.</Alert.Description>
</Alert>

// Info Alert
<Alert status="info">
  <InfoIcon className="h-5 w-5" />
  <Alert.Title>Info</Alert.Title>
  <Alert.Description>Here's some information.</Alert.Description>
</Alert>
```

---

#### Progress
Индикатор прогресса.

```tsx
import { Progress } from "@/components/retroui/Progress"

<Progress value={75} className="w-full" />

// С анимацией
const [progress, setProgress] = useState(0)
useEffect(() => {
  const timer = setInterval(() => {
    setProgress((prev) => (prev >= 100 ? 0 : prev + 10))
  }, 500)
  return () => clearInterval(timer)
}, [])

<Progress value={progress} />
```

---

#### Tooltip
Всплывающие подсказки.

**Варианты:** `default`, `primary`, `solid`

```tsx
import { Tooltip } from "@/components/retroui/Tooltip"

<Tooltip.Provider>
  <Tooltip>
    <Tooltip.Trigger asChild>
      <Button>Hover me</Button>
    </Tooltip.Trigger>
    <Tooltip.Content variant="primary">
      This is a tooltip
    </Tooltip.Content>
  </Tooltip>
</Tooltip.Provider>
```

---

### Overlay компоненты

#### Dialog
Модальные окна.

**Размеры:** `auto`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `screen`
**Overlay варианты:** `default`, `none`

```tsx
import { Dialog } from "@/components/retroui/Dialog"

<Dialog>
  <Dialog.Trigger asChild>
    <Button>Open Dialog</Button>
  </Dialog.Trigger>
  <Dialog.Content size="md">
    <Dialog.Header>
      <Dialog.Title>Confirm Action</Dialog.Title>
    </Dialog.Header>
    <Dialog.Description>
      Are you sure you want to proceed?
    </Dialog.Description>
    <Dialog.Footer>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog>
```

---

#### Popover
Всплывающие панели.

```tsx
import { Popover } from "@/components/retroui/Popover"

<Popover>
  <Popover.Trigger asChild>
    <Button>Open Popover</Button>
  </Popover.Trigger>
  <Popover.Content align="center" sideOffset={4}>
    <p>Popover content here</p>
  </Popover.Content>
</Popover>

// С тенью
<Popover>
  <Popover.Trigger>Settings</Popover.Trigger>
  <Popover.Content className="shadow-md">
    <form>...</form>
  </Popover.Content>
</Popover>
```

---

### Навигация и отображение

#### Carousel
Слайдер изображений и контента.

**Ориентация:** `horizontal`, `vertical`

```tsx
import { Carousel } from "@/components/retroui/Carousel"

<Carousel className="w-full max-w-xs">
  <Carousel.Content>
    {images.map((src, index) => (
      <Carousel.Item key={index}>
        <img src={src} alt={`Slide ${index + 1}`} />
      </Carousel.Item>
    ))}
  </Carousel.Content>
  <Carousel.Previous />
  <Carousel.Next />
</Carousel>

// Вертикальный
<Carousel orientation="vertical">
  <Carousel.Content>
    {items.map((item) => (
      <Carousel.Item key={item.id}>{item.content}</Carousel.Item>
    ))}
  </Carousel.Content>
</Carousel>
```

---

#### Calendar
Выбор даты.

```tsx
import { Calendar } from "@/components/retroui/Calendar"

const [date, setDate] = useState<Date | undefined>(new Date())

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  numberOfMonths={1}
  showOutsideDays
/>

// Два месяца
<Calendar
  mode="single"
  numberOfMonths={2}
  selected={date}
  onSelect={setDate}
/>
```

---

## Стилизация

### Характерные CSS-классы NeoBrutalism

```css
/* Типичные стили RetroUI */
.neobrutalism-element {
  border: 2px solid;
  border-color: var(--foreground);
  box-shadow: 4px 4px 0 0 var(--foreground);
  transition: all 0.2s;
}

.neobrutalism-element:hover {
  box-shadow: 2px 2px 0 0 var(--foreground);
}

.neobrutalism-element:active {
  transform: translateX(2px) translateY(2px);
  box-shadow: 0 0 0 0 var(--foreground);
}
```

### Темизация

RetroUI поддерживает светлую и темную темы через CSS переменные:

```tsx
// ThemeProvider уже включен в библиотеку
import { ThemeProvider } from "@/components/ThemeProvider"

<ThemeProvider defaultTheme="system" storageKey="retroui-theme">
  <App />
</ThemeProvider>
```

---

## Сравнение с аналогами

| Критерий | RetroUI | shadcn/ui | Radix Themes |
|----------|---------|-----------|--------------|
| Стиль | NeoBrutalism | Minimal | Modern |
| Подход | Copy-paste | Copy-paste | Install |
| Radix UI | Да | Да | Да |
| TailwindCSS | Да | Да | Нет |
| TypeScript | Да | Да | Да |
| Темизация | Light/Dark | Extensive | Full theming |
| Уникальность | Высокая | Средняя | Средняя |

---

## Преимущества

1. **Уникальный стиль** — выделяется среди типовых UI-библиотек
2. **Совместимость с shadcn/ui** — использует тот же подход и CLI
3. **Radix UI основа** — надежная доступность из коробки
4. **TailwindCSS** — легкая кастомизация через классы
5. **TypeScript** — полная типизация компонентов
6. **Copy-paste подход** — полный контроль над кодом
7. **Активное сообщество** — регулярные обновления

## Недостатки

1. **Ограниченный набор компонентов** — меньше чем у крупных библиотек
2. **Специфический стиль** — не подходит для всех проектов
3. **Молодой проект** — меньше документации и примеров
4. **Некоторые страницы документации недоступны** (404)

---

## Дополнительные ресурсы

- **Pro версия** — 100+ готовых блоков и шаблонов
- **Figma Kit** — дизайн-система для дизайнеров
- **Agency Template** — готовый шаблон агентства (https://agency-demo.retroui.dev/)
- **Discord** — 100+ участников сообщества
- **YouTube** — обучающие видео

---

## Ссылки

- [Официальный сайт](https://retroui.dev/)
- [GitHub репозиторий](https://github.com/Logging-Studio/RetroUI)
- [Документация](https://retroui.dev/docs)
- [Блог о NeoBrutalism](https://www.retroui.dev/blogs/why-neobrutalism-is-perfect-for-modern-websites)
- [Agency Demo Template](https://agency-demo.retroui.dev/)

---

*Дата исследования: 28 декабря 2025*
