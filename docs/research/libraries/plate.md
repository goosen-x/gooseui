# Plate - Rich Text Editor Framework

## Обзор

**Plate** — это open-source React-фреймворк для создания rich-text редакторов, построенный на базе [Slate](https://slatejs.org/) и React. Предоставляет современный инструментарий для создания кастомизируемых текстовых редакторов с обширной поддержкой плагинов.

- **Репозиторий**: [github.com/udecode/plate](https://github.com/udecode/plate)
- **Документация**: [platejs.org/docs](https://platejs.org/docs)
- **Лицензия**: MIT
- **GitHub Stars**: 15.7k+
- **Forks**: 941
- **Contributors**: 235+
- **Язык**: TypeScript (91.4%)

## Ключевые особенности

### Архитектурные принципы

1. **Openness (Открытость)** — полностью открытый исходный код
2. **Composition (Композиция)** — модульная система компонентов
3. **Headless (Безголовая архитектура)** — полный контроль над UI

### Основные возможности

- **AI-powered editing** — интегрированный SDK для генерации контента и улучшения текста
- **Collaborative editing** — совместное редактирование через Yjs (CRDT)
- **Плагинная система** — расширяемость через плагины
- **Rich content** — таблицы, медиа, блоки кода, уравнения LaTeX
- **Сериализация** — Markdown, HTML, DOCX, CSV
- **Real-time suggestions** — комментарии и предложения

## Установка

### Рекомендуемый способ (с shadcn/ui)

```bash
npx shadcn@latest add editor-ai
```

### Варианты установки

1. **Plate UI + Next.js** — для SSR приложений
2. **Plate UI + React** — для клиентских приложений (Vite, React Router)
3. **Manual Installation** — для проектов без shadcn/ui или Tailwind CSS
4. **RSC** — для React Server Components
5. **Node.js** — для серверных задач

### Шаблоны

1. **Notion-like template** — полный редактор с AI и backend
2. **Playground template** — редактор с плагинами и AI
3. **Minimal template** — базовая настройка

## Система плагинов

### Базовая структура плагина

```typescript
const MyPlugin = createPlatePlugin({
  key: "minimal",
})
```

### Типы плагинов

- **Elements** (`isElement: true`) — блочные или inline элементы
- **Void elements** (`isVoid: true`) — нередактируемый контент
- **Leaf nodes** (`isLeaf: true`) — форматирование текста

### Конфигурация

- **Rules** — поведение при нажатии Enter, Backspace и т.д.
- **Event Handlers** — onChange, onKeyDown и другие события
- **Inject Props** — CSS-свойства для узлов
- **Plugin Store** — состояние плагина через getOption/setOption
- **Dependencies** — зависимости между плагинами
- **Priority** — порядок выполнения

## Полный список плагинов

### AI и автоматизация

| Плагин           | Описание                                   |
| ---------------- | ------------------------------------------ |
| **AIPlugin**     | AI text marking и batch undo               |
| **AIChatPlugin** | Floating menu, chat state, transformations |
| **Copilot**      | Предложения AI во время ввода              |

### Блоки и элементы

| Плагин                | Описание                               |
| --------------------- | -------------------------------------- |
| **Blockquote**        | Цитаты                                 |
| **Heading**           | Заголовки (H1-H6)                      |
| **Horizontal Rule**   | Горизонтальная линия                   |
| **Callout**           | Выделенные блоки с иконками            |
| **Code Block**        | Блоки кода с подсветкой синтаксиса     |
| **Column**            | Многоколоночная верстка                |
| **Date**              | Даты с календарем                      |
| **Equation**          | LaTeX-уравнения                        |
| **Link**              | Ссылки                                 |
| **List Classic**      | Списки (упорядоченные/неупорядоченные) |
| **Media**             | Изображения, видео, аудио              |
| **Mention**           | Упоминания пользователей               |
| **Table**             | Таблицы                                |
| **Table of Contents** | Оглавление                             |
| **Toggle**            | Складываемые блоки                     |

### Текстовое форматирование (Marks)

| Плагин             | Описание               |
| ------------------ | ---------------------- |
| **Bold**           | Жирный текст           |
| **Italic**         | Курсив                 |
| **Underline**      | Подчеркивание          |
| **Code**           | Inline код             |
| **Highlight**      | Выделение цветом       |
| **Keyboard Input** | Клавиатурные сочетания |
| **Strikethrough**  | Зачеркивание           |
| **Subscript**      | Подстрочный текст      |
| **Superscript**    | Надстрочный текст      |

### Функциональность

| Плагин              | Описание                               |
| ------------------- | -------------------------------------- |
| **Autoformat**      | Автоформатирование (Markdown-подобное) |
| **Block Menu**      | Контекстное меню блоков                |
| **Block Selection** | Выделение нескольких блоков            |
| **Drag & Drop**     | Перетаскивание блоков                  |
| **Toolbar**         | Панели инструментов                    |
| **Yjs**             | Совместное редактирование              |
| **Multi Select**    | Многовыборочный редактор               |
| **Comments**        | Комментарии к тексту                   |
| **Suggestion**      | Предложения редактирования             |

### Сериализация

| Плагин       | Описание              |
| ------------ | --------------------- |
| **CSV**      | Импорт/экспорт CSV    |
| **DOCX**     | Импорт/экспорт Word   |
| **HTML**     | HTML сериализация     |
| **Markdown** | Markdown сериализация |

## UI Компоненты

### Панели инструментов

- **Fixed Toolbar** — фиксированная панель сверху
- **Floating Toolbar** — контекстная панель над выделенным текстом
- **Toolbar** — настраиваемая панель с группами кнопок

### Кнопки и меню

- **Block Context Menu** — меню операций с блоками
- **AI Menu** — меню AI-функций
- **Insert Toolbar Button** — вставка блоков
- **Link Floating Toolbar** — редактирование ссылок

### Компоненты узлов

- **Heading Element** — заголовки
- **Paragraph Element** — параграфы
- **Code Leaf** — inline код
- **Image/Video/Audio Element** — медиа с lazy loading
- **Table Element** — таблицы
- **List Nodes** — списки
- **Toggle Element** — складываемые блоки
- **Callout Node** — выделенная информация
- **Code Block Nodes** — блоки кода
- **Equation Element** — уравнения
- **Date Element** — даты

## AI интеграция

### Возможности

- **Context-aware command menu** — адаптируется к курсору, выделению, блокам
- **Streaming Markdown/MDX** — потоковая вставка с поддержкой таблиц и кода
- **Insert и Chat modes** — режимы вставки и чата

### Режимы работы

1. **Generate** — создание нового контента
2. **Edit** — diff-based редактирование
3. **Comment** — комментарии к выделенному тексту

### Интеграция

- Работает с **@ai-sdk/react** и Vercel AI SDK
- Требует API route для обработки запросов к AI провайдеру

## Совместное редактирование (Yjs)

### Как работает

YjsPlugin управляет shared document state через Y.Doc. Поддерживает несколько провайдеров одновременно:

- **Hocuspocus** — server-based
- **WebRTC** — peer-to-peer

### Настройка

```typescript
// Конфигурация
cursors: {
  data: {
    ;(name, color)
  }
}
providers: [{ type, options }]

// Инициализация
editor.getApi(YjsPlugin).yjs.init({ id, value })

// Очистка
destroy()
```

### Возможности

- Multi-provider support
- Awareness protocol для курсоров
- Кастомизируемое отображение курсоров
- Manual lifecycle management

## API

### Plate Core

- `createPlateEditor` — создание редактора
- `useEditorRef`, `useEditorState` — управление состоянием
- `createHistoryPlugin` — история изменений
- `createHtmlPlugin` — HTML обработка

### Slate API

- **Editor API** — методы управления редактором
- **Transforms** — преобразования текста
- **Node, Element, Text** — структуры данных
- **Path, Point, Range** — навигация

## Примеры использования

### Функциональность

- Экспорт документов
- Серверный рендеринг
- История версий
- Потоковая передача Markdown
- Работа с сотнями блоков

### Текстовое форматирование

- Выравнивание текста
- Автоформатирование
- Базовые элементы и маркеры
- Цвета шрифтов
- Высота строк

### Блоки и элементы

- Код с подсветкой синтаксиса
- Таблицы
- Списки
- Колонки
- Выноски
- Даты и уравнения
- Медиа
- Ссылки и упоминания

### Расширенные возможности

- AI-демо с командами
- Совместное редактирование
- Комментарии
- Поиск и замена
- Drag & Drop
- Emoji-вставка

## Сравнение с альтернативами

Plate отличается тем, что предлагает многие premium-функции бесплатно:

| Функция         | Plate     | Tiptap |
| --------------- | --------- | ------ |
| AI capabilities | Бесплатно | Платно |
| Comments        | Бесплатно | Платно |
| Suggestions     | Бесплатно | Платно |
| Emoji picker    | Бесплатно | Платно |
| Drag handles    | Бесплатно | Платно |

## Ресурсы

- **Документация**: [platejs.org/docs](https://platejs.org/docs)
- **GitHub**: [github.com/udecode/plate](https://github.com/udecode/plate)
- **Discord**: [discord.gg/mAZRuBzGM3](https://discord.gg/mAZRuBzGM3)
- **Playground**: [platejs.org/blocks/playground](https://platejs.org/blocks/playground)

## Дата исследования

28 декабря 2025 г.
