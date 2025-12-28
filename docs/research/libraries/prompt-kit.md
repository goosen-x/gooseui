# Prompt Kit

> Исследование библиотеки компонентов для AI-интерфейсов

**URL:** https://www.prompt-kit.com/
**GitHub:** https://github.com/ibelick/prompt-kit
**Лицензия:** MIT
**Статистика:** 2.4k stars, 133 forks

## Описание

Prompt Kit - это набор кастомизируемых, высококачественных компонентов для создания AI-приложений. Библиотека упрощает разработку чат-интерфейсов, AI-агентов, автономных ассистентов и других AI-решений.

**Слоган:** "Core building blocks for AI apps. High-quality, accessible, and customizable components for AI interfaces."

## Технологический стек

- **React** 19+
- **TypeScript** (80.5% кодовой базы)
- **Tailwind CSS**
- **shadcn/ui** (базовая UI-библиотека)
- **Next.js** (для демо и документации)

## Установка

### Требования

- Node.js 18+
- React 19+
- Настроенный shadcn/ui в проекте

### Установка компонентов

Компоненты устанавливаются через CLI shadcn:

```bash
npx shadcn@latest add "https://prompt-kit.com/c/[COMPONENT].json"
```

Например:

```bash
npx shadcn@latest add "https://prompt-kit.com/c/prompt-input.json"
npx shadcn@latest add "https://prompt-kit.com/c/message.json"
npx shadcn@latest add "https://prompt-kit.com/c/chat-container.json"
```

### Использование

После установки компоненты импортируются из локальной директории:

```tsx
import { PromptInput } from "@/components/ui/prompt-input";
import { Message, MessageContent, MessageAvatar } from "@/components/ui/message";
```

## Компоненты

### Основные компоненты чата

#### Message

Отображает сообщения в чат-интерфейсе с поддержкой аватаров, Markdown и действий.

**Подкомпоненты:**
- `Message` - контейнер сообщения
- `MessageAvatar` - аватар с fallback
- `MessageContent` - содержимое с опциональным Markdown
- `MessageActions` - контейнер действий
- `MessageAction` - действие с тултипом

```tsx
<Message>
  <MessageAvatar src="/avatar.png" alt="User" fallback="U" />
  <MessageContent markdown>
    {messageText}
  </MessageContent>
  <MessageActions>
    <MessageAction tooltip="Copy">
      <CopyIcon />
    </MessageAction>
  </MessageActions>
</Message>
```

#### Prompt Input

Поле ввода для отправки промптов AI-модели.

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `isLoading` | boolean | false | Состояние загрузки |
| `value` | string | - | Контролируемое значение |
| `onValueChange` | (value: string) => void | - | Callback изменения |
| `maxHeight` | number \| string | 240 | Максимальная высота textarea |
| `onSubmit` | () => void | - | Callback отправки (Enter) |

```bash
npx shadcn add "https://prompt-kit.com/c/prompt-input.json"
```

#### Chat Container

Контейнер чата с умным авто-скроллом (использует `use-stick-to-bottom`).

**Подкомпоненты:**
- `ChatContainerRoot` - главный контейнер с авто-скроллом
- `ChatContainerContent` - обертка для сообщений
- `ChatContainerScrollAnchor` - якорь скролла

**Возможности:**
- Плавная анимация скролла на основе velocity-based spring
- Автоматическое обнаружение изменений контента через ResizeObserver
- Сохранение позиции при скролле вверх
- Поддержка тач-устройств

```bash
npx shadcn add "https://prompt-kit.com/c/chat-container.json"
```

### Компоненты для AI-рассуждений

#### Reasoning

Сворачиваемый компонент для отображения AI-рассуждений с поддержкой Markdown.

| Prop | Тип | Описание |
|------|-----|----------|
| `open` | boolean | Контролируемое состояние |
| `onOpenChange` | (open: boolean) => void | Callback изменения состояния |
| `isStreaming` | boolean | При false автоматически сворачивается |

```bash
npx shadcn add "https://prompt-kit.com/c/reasoning.json"
```

#### Chain of Thought

Пошаговое отображение рассуждений AI.

**Подкомпоненты:**
- `ChainOfThought` - контейнер
- `ChainOfThoughtStep` - шаг (расширяемый)
- `ChainOfThoughtTrigger` - триггер раскрытия
- `ChainOfThoughtContent` - содержимое шага
- `ChainOfThoughtItem` - элемент содержимого

```bash
npx shadcn add "https://prompt-kit.com/c/chain-of-thought.json"
```

#### Steps

Последовательность операций в сворачиваемом макете.

```bash
npx shadcn add "https://prompt-kit.com/c/steps.json"
```

### Компоненты отображения контента

#### Code Block

Блок кода с подсветкой синтаксиса (Shiki).

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `code` | string | - | Код для отображения |
| `language` | string | "tsx" | Язык программирования |
| `theme` | string | "github-light" | Тема Shiki |

**Поддерживаемые темы:** github-light, github-dark, dracula, nord и др.

```bash
npx shadcn add "https://prompt-kit.com/c/code-block.json"
```

#### Markdown

Рендеринг Markdown с GitHub Flavored Markdown и мемоизацией.

| Prop | Тип | Описание |
|------|-----|----------|
| `children` | string | Markdown-контент |
| `components` | Partial\<Components\> | Кастомные компоненты |
| `id` | string | ID для мемоизации (важно для стриминга) |

**Возможности:**
- Таблицы, strikethrough, tasklists, footnotes
- Мемоизация для предотвращения ре-рендера при стриминге
- Встроенная подсветка кода через CodeBlock

```bash
npx shadcn add "https://prompt-kit.com/c/markdown.json"
```

### Компоненты загрузки

#### Loader

Множество вариантов индикаторов загрузки.

| Вариант | Описание |
|---------|----------|
| `circular` | Вращающаяся граница |
| `classic` | 12 палочек с fade-эффектом |
| `pulse` | Пульсирующее кольцо |
| `pulse-dot` | Пульсирующая точка |
| `dots` | Три прыгающие точки |
| `typing` | Три анимированные точки печати |
| `wave` | Пять полосок волной |
| `bars` | Три вертикальные полоски |
| `terminal` | Анимация курсора терминала |
| `text-blink` | Мигающий текст |
| `text-shimmer` | Shimmer-градиент текста |
| `loading-dots` | Текст с анимированными точками |

```bash
npx shadcn add "https://prompt-kit.com/c/loader.json"
```

#### Text Shimmer

Анимированный shimmer-эффект для текста.

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `as` | string | "span" | HTML-элемент |
| `duration` | number | 4 | Длительность анимации (сек) |
| `spread` | number | 20 | Ширина shimmer (5-45) |

```bash
npx shadcn add "https://prompt-kit.com/c/text-shimmer.json"
```

### Компоненты взаимодействия

#### File Upload

Drag-and-drop загрузка файлов.

| Prop | Тип | Описание |
|------|-----|----------|
| `onFilesAdded` | (files: File[]) => void | Callback добавления файлов |
| `multiple` | boolean | Множественный выбор |
| `accept` | string | Фильтр типов файлов |
| `disabled` | boolean | Отключение |

```bash
npx shadcn add "https://prompt-kit.com/c/file-upload.json"
```

#### Prompt Suggestion

Интерактивные подсказки для промптов.

**Режимы:**
- **Normal Mode** - кликабельные pill-кнопки
- **Highlight Mode** - подсветка текста в подсказках (prop `highlight`)

```bash
npx shadcn add "https://prompt-kit.com/c/prompt-suggestion.json"
```

#### Feedback Bar

Сбор обратной связи о ответах AI.

| Prop | Тип | Описание |
|------|-----|----------|
| `title` | string | Заголовок/вопрос |
| `icon` | React.ReactNode | Иконка |
| `onHelpful` | () => void | Callback "полезно" |
| `onNotHelpful` | () => void | Callback "не полезно" |
| `onClose` | () => void | Callback закрытия |

```bash
npx shadcn add "https://prompt-kit.com/c/feedback-bar.json"
```

#### Scroll Button

Плавающая кнопка возврата к низу чата.

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `threshold` | number | 50 | Расстояние от низа (px) для показа |
| `variant` | string | "outline" | Стиль кнопки |
| `size` | string | "sm" | Размер кнопки |

**Важно:** Работает только внутри `ChatContainerRoot`.

```bash
npx shadcn add "https://prompt-kit.com/c/scroll-button.json"
```

### Компоненты для инструментов

#### Tool

Отображение вызовов инструментов AI (совместим с AI SDK v5).

| Свойство ToolPart | Тип | Описание |
|-------------------|-----|----------|
| `type` | string | Тип инструмента |
| `state` | string | Состояние: input-streaming, input-available, output-available, output-error |
| `input` | Record | Входные данные |
| `output` | Record | Выходные данные |
| `errorText` | string | Текст ошибки |

**Возможности:**
- Бейджи состояния (Processing, Ready, Completed, Error)
- Цветовые индикаторы
- Сворачиваемые детали

```bash
npx shadcn add "https://prompt-kit.com/c/tool.json"
```

#### Source

Отображение источников контента с hover-карточками.

```bash
npx shadcn add "https://prompt-kit.com/c/source.json"
```

## Полный список компонентов

1. **Chain of Thought** - пошаговые рассуждения
2. **Chat Container** - контейнер чата с авто-скроллом
3. **Code Block** - блок кода с подсветкой
4. **Feedback Bar** - сбор обратной связи
5. **File Upload** - загрузка файлов
6. **Image** - изображения
7. **Loader** - индикаторы загрузки (12 вариантов)
8. **Markdown** - рендеринг Markdown
9. **Message** - сообщения чата
10. **Prompt Input** - поле ввода промпта
11. **Prompt Suggestion** - подсказки промптов
12. **Reasoning** - AI-рассуждения
13. **Scroll Button** - кнопка скролла
14. **Source** - источники контента
15. **Steps** - последовательность шагов
16. **System Message** - системные сообщения
17. **Text Shimmer** - shimmer-эффект текста
18. **Thinking Bar** - индикатор "думает"
19. **Tool** - вызовы инструментов
20. **Primitives** - базовые примитивы

## Интеграции

### Поддерживаемые AI SDK

- **OpenAI SDK**
- **Vercel AI SDK**
- **AI SDK v5** (полная совместимость компонента Tool)

### Model Context Protocol (MCP)

Prompt Kit поддерживает MCP - открытый протокол для предоставления контекста LLM.

**Настройка для Cursor:**

Создайте `.cursor/mcp.json` в корне проекта:

```json
{
  "servers": {
    "prompt-kit": {
      "url": "https://prompt-kit.com/mcp"
    }
  }
}
```

После настройки можно:
- Просматривать компоненты в IDE
- Добавлять компоненты через команды
- Получать документацию и превью

## Преимущества

1. **Специализация для AI** - компоненты созданы специально для AI-интерфейсов
2. **shadcn/ui совместимость** - интеграция с популярной UI-библиотекой
3. **Кастомизация** - полный контроль над стилями через Tailwind
4. **Производительность** - мемоизация для стриминга, оптимизированный скролл
5. **Доступность** - accessible компоненты
6. **TypeScript** - полная типизация
7. **Открытый исходный код** - MIT лицензия

## Структура проекта

```
prompt-kit/
├── app/           # Приложение документации
├── components/    # UI-компоненты
├── hooks/         # React хуки
├── lib/           # Утилиты
├── public/        # Статические файлы
└── scripts/       # Скрипты сборки
```

## Ссылки

- **Сайт:** https://www.prompt-kit.com/
- **GitHub:** https://github.com/ibelick/prompt-kit
- **Документация:** https://www.prompt-kit.com/docs
- **Twitter автора:** https://twitter.com/ibelick

---

*Исследование проведено: 2025-12-28*
