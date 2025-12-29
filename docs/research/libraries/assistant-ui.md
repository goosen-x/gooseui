# Assistant UI - Исследование библиотеки

> Дата исследования: 28 декабря 2025
> Источник: https://www.assistant-ui.com/

## Обзор

**Assistant UI** - это открытая React/TypeScript библиотека для создания production-ready AI чат-интерфейсов. Проект поддержан Y Combinator и предоставляет готовые компоненты в стиле ChatGPT.

### Ключевые характеристики

| Параметр      | Значение                        |
| ------------- | ------------------------------- |
| GitHub Stars  | 7.8k+                           |
| Forks         | 840+                            |
| NPM Downloads | 400k+/месяц                     |
| Contributors  | 107                             |
| Лицензия      | MIT                             |
| Язык          | TypeScript (71.6%), MDX (21.2%) |

### Девиз

> "The UX of ChatGPT in your own app"

---

## Основные возможности

### 1. Production-Ready компоненты

- Готовые UI-компоненты с темизацией и разумными настройками по умолчанию
- Стилизация в духе shadcn/ui - полный контроль над кодом компонентов
- Поддержка Markdown с подсветкой синтаксиса
- Обработка вложений (изображения, документы)

### 2. Управление состоянием

- Потоковая передача (streaming) из коробки
- Прерывание генерации (cancel/stop)
- Повторные попытки (retry/reload)
- Многоходовые диалоги с ветвлением (branching)
- Редактирование предыдущих сообщений

### 3. Высокая производительность

- Оптимизированный рендеринг
- Минимальный размер бандла
- Автоскролл к новым сообщениям

### 4. Универсальная совместимость

Поддержка множества AI-провайдеров:

- OpenAI
- Anthropic
- Azure
- AWS Bedrock
- Google Gemini
- Groq
- Fireworks
- Cohere
- Mistral
- Perplexity
- Hugging Face
- Replicate
- Ollama
- Chrome AI

---

## Архитектура

### Три уровня системы

1. **Frontend Components** - React компоненты на базе shadcn/ui с встроенным управлением состоянием
2. **Runtime Layer** - обработка данных между UI и LLM/бэкендами
3. **Assistant Cloud** (опционально) - хостинг для персистентности чатов и истории

### Иерархия контекстов

```
AssistantContext (глобальное состояние, AI-инструменты)
  └── ThreadContext (отдельная беседа)
        ├── ComposerContext (ввод пользователя)
        └── MessageContext (отдельное сообщение)
              ├── MessagePartContext (часть сообщения)
              └── AttachmentContext (вложения)
```

### Паттерны развертывания

1. **Прямое подключение к LLM** - для простых случаев
2. **Кастомный API бэкенд** - для сложной бизнес-логики
3. **С Assistant Cloud** - для персистентности и аналитики

---

## Установка

### Новый проект

```bash
npx assistant-ui@latest create
```

Доступные шаблоны:

- Cloud persistence
- LangGraph интеграция
- MCP поддержка

### Существующий проект

```bash
npx assistant-ui@latest init
```

### Добавление компонентов

```bash
npx assistant-ui@latest add [component]
```

### Ручная установка

```bash
npm install @assistant-ui/react
```

Дополнительные пакеты:

- `@assistant-ui/react-ui` - стилизованные компоненты
- `@assistant-ui/react-ai-sdk` - интеграция с Vercel AI SDK
- `@assistant-ui/react-langgraph` - интеграция с LangGraph
- `@assistant-ui/react-markdown` - рендеринг Markdown
- `@assistant-ui/react-devtools` - инструменты разработчика

---

## Компоненты (Primitives)

Библиотека следует философии shadcn/ui - вместо монолитного чат-компонента предоставляются примитивы для полной кастомизации.

### ThreadPrimitive

Контейнер для всей беседы.

```tsx
import { ThreadPrimitive } from "@assistant-ui/react"

;<ThreadPrimitive.Root>
  <ThreadPrimitive.Viewport>
    <ThreadPrimitive.Messages />
  </ThreadPrimitive.Viewport>
  <ThreadPrimitive.ScrollToBottom />
  <ThreadPrimitive.Suggestion prompt="..." />
</ThreadPrimitive.Root>
```

**Компоненты:**

- `Root` - контейнер (рендерит `<div>`)
- `Viewport` - скроллируемая область с сообщениями
- `Messages` - список сообщений
- `ScrollToBottom` - кнопка прокрутки вниз
- `Suggestion` - предложения для пользователя

### ComposerPrimitive

Область ввода сообщений.

```tsx
import { ComposerPrimitive } from "@assistant-ui/react"

;<ComposerPrimitive.Root>
  <ComposerPrimitive.Attachments />
  <ComposerPrimitive.AddAttachment />
  <ComposerPrimitive.Input />
  <ComposerPrimitive.Send />
  <ComposerPrimitive.Cancel />
</ComposerPrimitive.Root>
```

**Компоненты:**

- `Root` - контейнер (рендерит `<form>`)
- `Input` - textarea с горячими клавишами (Enter - отправить, Escape - отменить)
- `Send` - кнопка отправки
- `Cancel` - кнопка отмены (выход из режима редактирования или остановка генерации)
- `Attachments` - отображение вложений
- `AddAttachment` - кнопка добавления файлов

**Особенность:** Composer внутри Thread создает новые сообщения, внутри Message - редактирует существующее.

### MessagePrimitive

Отдельное сообщение в беседе.

```tsx
import { MessagePrimitive } from "@assistant-ui/react"

;<MessagePrimitive.Root>
  <MessagePrimitive.Content />
  <MessagePrimitive.Attachments />
  <MessagePrimitive.If user>...</MessagePrimitive.If>
  <MessagePrimitive.If assistant>...</MessagePrimitive.If>
</MessagePrimitive.Root>
```

**Компоненты:**

- `Root` - контейнер (рендерит `<div>`)
- `Content` - содержимое сообщения
- `Parts` - отдельные части (текст, изображения, tool calls)
- `Attachments` - вложения сообщения
- `If` - условный рендеринг (user/assistant/hasBranches)
- `Error` - отображение ошибок

**Content Parts Components:**

- Text
- Image
- Sources
- Files
- Audio (unstable)
- Tool calls (с группировкой)

### ActionBarPrimitive

Панель действий для сообщений.

```tsx
import { ActionBarPrimitive } from "@assistant-ui/react"

;<ActionBarPrimitive.Root hideWhenRunning autohide>
  <ActionBarPrimitive.Copy />
  <ActionBarPrimitive.Edit />
  <ActionBarPrimitive.Reload />
  <ActionBarPrimitive.Speak />
  <ActionBarPrimitive.StopSpeaking />
  <ActionBarPrimitive.FeedbackPositive />
  <ActionBarPrimitive.FeedbackNegative />
  <ActionBarPrimitive.ExportMarkdown />
</ActionBarPrimitive.Root>
```

**Компоненты:**

- `Root` - контейнер с опциями `hideWhenRunning`, `autohide`, `autohideFloat`
- `Copy` - копирование в буфер обмена (data-copied атрибут)
- `Edit` - режим редактирования
- `Reload` - регенерация ответа
- `Speak` / `StopSpeaking` - озвучивание текста
- `FeedbackPositive` / `FeedbackNegative` - обратная связь
- `ExportMarkdown` - экспорт в файл

### Принцип Composition

Все примитивы поддерживают `asChild` prop для композиции с кастомными компонентами:

```tsx
<ComposerPrimitive.Send asChild>
  <MyCustomButton>Send</MyCustomButton>
</ComposerPrimitive.Send>
```

---

## React Hooks API

### Основные хуки

```tsx
import {
  useThread,
  useMessage,
  useComposer,
  useAssistantRuntime,
  useAttachment,
  useMessagePart,
} from "@assistant-ui/react"
```

### useThread

```tsx
const thread = useThread()
const isRunning = useThread((t) => t.isRunning)
const isLoading = useThread((t) => t.isLoading)
const messages = useThread((t) => t.messages)
```

**Доступные свойства:**

- `id` - ID потока
- `isDisabled` - отключенный поток не может получать новые сообщения
- `isLoading` - загрузка истории
- `isRunning` - активное соединение с бэкендом
- `capabilities` - возможности (редактирование, ветвление и т.д.)
- `messages` - сообщения в текущей ветке
- `suggestions` - предложения для пользователя

### useMessage

```tsx
const { message } = useMessage()
const msg = useMessage((m) => m.message)
const branches = useMessage((m) => m.branches)
const isLast = useMessage((m) => m.isLast)
```

### useComposer

```tsx
const composerText = useComposer((c) => c.text)
const composerRuntime = useComposerRuntime()
composerRuntime.send()
```

### Унифицированный API (v0.12+)

```tsx
import { useAssistantState, useAssistantApi } from "@assistant-ui/react"

// Чтение состояния
const messages = useAssistantState(({ thread }) => thread.messages)
const isRunning = useAssistantState(({ thread }) => thread.isRunning)
const composerText = useAssistantState(({ composer }) => composer.text)

// API для действий (стабильный объект, не вызывает ре-рендеры)
const api = useAssistantApi()
api.composer().send()
api.thread().cancelRun()
```

---

## Runtime интеграции

### Vercel AI SDK

```tsx
import { useVercelAI } from "@assistant-ui/react-ai-sdk"
```

Первоклассная интеграция с AI SDK от Vercel.

### LangGraph

```tsx
import { useLangGraph } from "@assistant-ui/react-langgraph"
```

Поддержка LangGraph и LangGraph Cloud.

### Local Runtime

Для полного контроля и кастомных бэкендов.

### External Store Runtime

Интеграция с внешними хранилищами данных.

---

## Продвинутые возможности

### makeAssistantVisible

Обертка для React-компонентов, делающая их видимыми и интерактивными для AI.

```tsx
const VisibleComponent = makeAssistantVisible(MyComponent)
```

### makeAssistantTool

Создание инструментов, которые AI может вызывать:

```tsx
import { z } from "zod"

const myTool = makeAssistantTool({
  name: "get_weather",
  parameters: z.object({
    location: z.string(),
  }),
  execute: async ({ location }) => {
    // логика
  },
})
```

### makeAssistantToolUI

Регистрация кастомного UI для отображения выполнения инструментов.

### Model Context Registry

Динамическое управление инструментами и системными инструкциями.

### DevTools

Инспектор для отладки runtime state, контекстов и событий:

```tsx
import { AssistantDevTools } from "@assistant-ui/react-devtools"
```

---

## Примеры использования

### Официальные примеры

1. **Modal** - плавающая кнопка, открывающая чат-бокс
2. **Form Filling Co-Pilot** - помощник для автозаполнения форм
3. **ChatGPT Clone** - воссоздание интерфейса ChatGPT
4. **Claude Clone** - интерфейс в стиле Claude
5. **Grok Clone** - реализация дизайна Grok
6. **Perplexity Clone** - оформление под Perplexity
7. **AI SDK** - демонстрация сохранения чатов
8. **Mem0 - ChatGPT with Memory** - персонализированный чат с памятью
9. **LangGraph Stockbroker** - торговый ассистент с человеком в цикле
10. **Artifacts** - Open Source Claude Artifacts (генерация сайтов)

### Примеры от сообщества

- **Open Canvas** - OSS реализация Canvas от OpenAI
- **FastAPI + LangGraph** - интеграция с Python бэкендом

---

## Showcase: Кто использует

### Developer Tools

- **Chat LangChain** (OSS) - чат с документацией LangChain
- **Helicone** (OSS) - платформа мониторинга LLM
- **LangGraph Stockbroker** (OSS) - финансовый исследовательский инструмент
- **Inconvo** - AI-аналитика для продуктов
- **Komodo** - платформа развертывания моделей

### AI Assistants

- **Closing.wtf** - анализ ипотеки для покупателей жилья
- **Open Canvas** (OSS) - OSS версия Canvas от OpenAI
- **CoreViz** - визуальная разведка для фото/видео

### Browser Extensions

- **Portal** - AI исполнительный помощник

---

## Лицензирование и цены

### assistant-ui (Библиотека)

**Бесплатно навсегда** - MIT лицензия

- Все UI компоненты
- Bring your own backend
- Community поддержка

### assistant-cloud (Управляемый бэкенд)

| План       | Цена    | Включено                                     |
| ---------- | ------- | -------------------------------------------- |
| Free       | $0      | 200 MAU, история чатов                       |
| Pro        | $50/мес | 500 MAU + $0.10 за доп. пользователя         |
| Enterprise | Custom  | SLA 99.99%, on-premises, security compliance |

---

## Совместимость

- **React 18+** - полная поддержка
- **React 17/16** - возможна с zustand полифилами и обновлением forwardRef

---

## Полезные ссылки

- **Официальный сайт**: https://www.assistant-ui.com/
- **Документация**: https://www.assistant-ui.com/docs
- **GitHub**: https://github.com/assistant-ui/assistant-ui
- **NPM**: https://www.npmjs.com/package/@assistant-ui/react
- **Discord**: https://discord.gg/S9dwgCNEFs
- **Cloud Dashboard**: https://cloud.assistant-ui.com/
- **Примеры**: https://www.assistant-ui.com/examples
- **Showcase**: https://www.assistant-ui.com/showcase

---

## Выводы

### Преимущества

1. **Production-ready** - готовая к продакшену библиотека с поддержкой Y Combinator
2. **Философия shadcn/ui** - полный контроль над кодом компонентов
3. **Широкая совместимость** - поддержка всех основных AI-провайдеров
4. **Активное сообщество** - 7.8k+ звезд, 107 контрибьюторов, 400k+ загрузок
5. **MIT лицензия** - бесплатное коммерческое использование
6. **Composable примитивы** - гибкая кастомизация любого аспекта UI
7. **Встроенные best practices** - streaming, branching, editing, attachments

### Недостатки

1. **Сложность** - требует понимания архитектуры примитивов
2. **Документация** - некоторые разделы еще в разработке
3. **Зависимость от экосистемы** - лучше работает с shadcn/ui и Tailwind

### Рекомендации к использованию

Идеально подходит для:

- AI-чат приложений корпоративного уровня
- Продуктов, требующих глубокой кастомизации чат-интерфейса
- Интеграции с различными LLM-провайдерами
- Проектов на React/Next.js с shadcn/ui

---

_Исследование проведено на основе официальной документации, GitHub репозитория и npm пакетов._
