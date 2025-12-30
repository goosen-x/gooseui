# shadcn/ui Registry Directory - Research

> Исследование 80+ registry из официального каталога https://ui.shadcn.com/docs/directory
> Дата: 2024-12-29

## Ключевые GitHub репозитории

| Библиотека | GitHub | Stars |
|------------|--------|-------|
| shadcn/ui (официальный) | [shadcn-ui/ui](https://github.com/shadcn-ui/ui) | 80k+ |
| Magic UI | [magicuidesign/magicui](https://github.com/magicuidesign/magicui) | 19k+ |
| Motion Primitives | [ibelick/motion-primitives](https://github.com/ibelick/motion-primitives) | 4.4k |
| Animate UI | [imskyleen/animate-ui](https://github.com/imskyleen/animate-ui) | 2.6k |
| Cult UI | [nolly-studio/cult-ui](https://github.com/nolly-studio/cult-ui) | — |
| 8bitcn/ui | [TheOrcDev/8bitcn-ui](https://github.com/TheOrcDev/8bitcn-ui) | — |
| Plate Editor | [udecode/plate](https://github.com/udecode/plate) | — |
| ProseKit | [prosekit/prosekit](https://github.com/prosekit/prosekit) | — |
| SVGL | [pheralb/svgl](https://github.com/pheralb/svgl) | 5k+ |
| React Aria | [adobe/react-spectrum](https://github.com/adobe/react-spectrum) | 12k+ |
| Assistant UI | [Yonom/assistant-ui](https://github.com/Yonom/assistant-ui) | — |

> См. также: [Анализ автоматизации компонентов](./competitor-component-automation.md)

## Содержание

1. [Animation & Motion Libraries](#animation--motion-libraries)
2. [AI Components](#ai-components)
3. [Unique Style Libraries](#unique-style-libraries)
4. [Rich Text Editors](#rich-text-editors)
5. [Backend Integrations](#backend-integrations)
6. [Blocks & Templates](#blocks--templates)
7. [Specialized Components](#specialized-components)
8. [Icons & Assets](#icons--assets)
9. [Key Insights](#key-insights)

---

## Animation & Motion Libraries

### @animate-ui

**URL:** https://animate-ui.com
**GitHub:** https://github.com/imskyleen/animate-ui

Open-source библиотека анимированных компонентов.

- **Stack:** React, TypeScript, Tailwind CSS, Framer Motion
- **Установка:** через shadcn CLI
- **Twitter:** @animate_ui
- **Stars:** 2.6k+

### @motion-primitives

**URL:** https://www.motion-primitives.com
**GitHub:** https://github.com/ibelick/motion-primitives

UI kit для создания красивых анимированных интерфейсов.

- **Stars:** 4.4k+

**Ключевые компоненты:**

- Text Effect — эффекты для текста
- Morphing Dialog — диалоги с морфинг-эффектами
- Text Scramble — перемешивание текста
- Infinite Slider — бесконечная прокрутка
- Animated Background — анимированные фоны
- Border Trail — эффекты границ
- Custom Cursor — кастомные курсоры
- Text Loop / Text Shimmer — циклические текстовые эффекты

### @magicui

**URL:** https://magicui.design
**GitHub:** https://github.com/magicuidesign/magicui

150+ бесплатных open-source анимированных компонентов для Design Engineers.

- **Stars:** 19k+

### @smoothui

**URL:** https://smoothui.dev

Библиотека от Eduardo Calvo, совместимая с shadcn/ui.

**Особенности:**

- Tailwind CSS v4 + Motion
- Готовые блоки: Hero, Pricing, Testimonials, FAQ, Footer, Team
- Компоненты: Animated Tags, Social Selector, Power Off Slide, Scrollable Card Stack

### @eldoraui

**URL:** https://eldoraui.site

Современная библиотека на TypeScript, Tailwind CSS и Framer Motion.

### @aceternity

**URL:** https://ui.aceternity.com

Компоненты с готовыми анимациями для Next.js.

**Популярные компоненты:**

- CardStack — автоматическое перелистывание карточек
- Glare Card — эффект блеска при наведении
- Spotlight — эффект прожектора
- Flashlight эффект

**Pro версия:** 70+ премиум компонентов

---

## AI Components

### @assistant-ui

**URL:** https://www.assistant-ui.com
**GitHub:** https://github.com/Yonom/assistant-ui
**Поддержка:** Y Combinator

React-набор для создания AI-чатов в стиле ChatGPT.

**Функции:**

- Готовый UI с темизацией
- Управление состоянием для потоков данных
- Оптимизированный рендеринг для стриминга
- Интеграция с Vercel AI SDK, LangChain

**Установка:** `npx assistant-ui init`

### @prompt-kit

**URL:** https://www.prompt-kit.com

Core building blocks для AI приложений.

**Компоненты:**

- **Ввод:** Prompt Input, Textarea, File Upload
- **Отображение:** Chat Container, Message, Markdown, Code Block
- **Функциональные:** Prompt Suggestion, Feedback Bar, Thinking Bar, Text Shimmer
- **Расширенные:** Chain of Thought, Reasoning, Steps, Tool, Source

### @ai-elements (Vercel)

**URL:** https://ai-sdk.dev/elements

Официальные компоненты от Vercel для AI приложений.

**Ключевые компоненты:**

- Conversation — контейнер чата с автопрокруткой
- Message — сообщения с ветвлением
- Prompt Input — поле ввода с файлами
- Chain of Thought — этапы рассуждения AI
- Reasoning — блок логики модели
- Plan — визуализация плана с анимацией
- Sources / Inline Citation — цитаты и источники
- Model Selector — командная палитра выбора модели

**Stack:** React 19, Tailwind CSS 4

### @livekit / @agents-ui

**URL:** https://livekit.io/ui

Платформа для голосовых, видео и AI агентов.

**Компоненты:**

- Agents Framework (8.6K GitHub stars)
- LiveKit Media Server (16.2K stars)

**Статус Agents UI:** Coming soon

---

## Unique Style Libraries

### @8bitcn

**URL:** https://www.8bitcn.com
**GitHub:** https://github.com/TheOrcDev/8bitcn-ui

Компоненты в стиле 8-битных видеоигр.

**Компоненты:**

- Button, Dropdown Menu, Label, Badge, Alert, Card
- Slider, Switch, Select, Checkbox, Tabs
- DatePicker, Menubar, Command

**Особенности:**

- Пиксельные границы и текстуры
- Эффект нажатия (translate-y)
- Light/Dark режимы

### @glass-ui

**URL:** https://glass-ui.crenspire.com

40+ компонентов с glassmorphism эффектами.

**Варианты эффектов:**

- Glass (стандартный)
- Frosted (матовый)
- Fluted (рифленый)
- Crystal (кристаллический)

**Особенности:**

- Blur фона, полупрозрачность
- На основе Radix UI
- Полная кастомизация

### @cult-ui

**URL:** https://www.cult-ui.com
**GitHub:** https://github.com/nolly-studio/cult-ui

"Components for Design Engineers" — редкие, курируемые компоненты.

**Особенности:**

- 8+ готовых блоков
- Next.js шаблоны
- AI SDK интеграции
- "Configured for vibe coding"

### @kokonutui

**URL:** https://kokonutui.com

100+ компонентов на Tailwind CSS, shadcn/ui и Motion.

**Особенности:**

- Glass Effect Filter
- Интеграция с V0 для кастомизации через промпты
- Pro версия: 70+ компонентов, 8 шаблонов

### @retroui

**URL:** https://retroui.dev

Neobrutalism стиль для React + TailwindCSS.

---

## Rich Text Editors

### @plate

**URL:** https://platejs.org
**GitHub:** https://github.com/udecode/plate

AI-powered редактор на Slate и React.

**Функции:**

- Rich formatting: bold, italic, underline, strikethrough, code
- Блоки: headings, blockquotes, lists, tables, code blocks
- Медиа: images, videos, audio, embeds + drag-and-drop
- Collaborative editing через Yjs

**AI возможности:**

- AI SDK интеграция
- Copilot mode — ghost text suggestions
- Горячие клавиши: ⌘+J или Space
- Автодополнение, резюмирование

**Преимущество:** Многие премиум-функции бесплатны (в отличие от Tiptap)

### @prosekit

**URL:** https://prosekit.dev
**GitHub:** https://github.com/prosekit/prosekit

Headless extensible framework на ProseMirror (используется NYT, Atlassian).

**Фреймворки:** React, Vue, Preact, Svelte, Solid

**Особенности:**

- Copy-paste TailwindCSS компоненты
- Yjs и Loro для коллаборации
- Встроенный поиск

### @shadcn-editor

**URL:** https://shadcn-editor.vercel.app

Редактор на Lexical и Shadcn/UI.

**Функции:**

- Базовое форматирование + fonts + colors
- Import/Export, Undo/Redo
- Tables с resizing
- Images, Links, Embeds (Twitter, YouTube)
- Speech-to-text
- Emoji picker, Mentions, Hashtags
- Column-based layouts
- Markdown support

---

## Backend Integrations

### @supabase

**URL:** https://supabase.com/ui

React компоненты для интеграции с Supabase backend.

**Блоки:**

- **Auth:** Password-Based, Social Auth
- **Realtime:** Cursor, Avatar Stack, Chat
- **Data:** Dropzone, Current User Avatar, Infinite Query Hook

**Фреймворки:** Next.js, React Router, TanStack, Vue, Nuxt

### @clerk

**URL:** https://clerk.com/docs/guides/development/shadcn-cli

Аутентификация и user management.

**Компоненты:**

- ClerkProvider — контекст сессии
- Sign In / Sign Up страницы
- Waitlist компонент
- Middleware для защиты маршрутов
- Header с auth кнопками

**Установка:** `npx shadcn@latest add @clerk/nextjs-quickstart`

### @better-upload

**URL:** https://better-upload.com

Загрузка файлов напрямую в S3.

**Компоненты:**

- UploadDropzone — drag-and-drop
- Конфигурация: multipleFiles, maxFiles, fileTypes, maxFileSize

### @nuqs

**URL:** https://nuqs.dev/registry

URL state management для React.

**Адаптеры:**

- Inertia.js (Laravel, Phoenix, Django, Rails)
- One.js
- React Router v5
- Waku
- Expo Router (coming soon)

**Утилиты:** Typed Links для Next.js

### @elements

**URL:** https://www.tryelements.dev

Full-stack компоненты от Crafter Station.

**Активные:**

- Brand Logos (48 шт)
- Polar — спонсорство для open source
- Theme Switcher (6 вариантов)
- Tinte — AI-генератор тем
- UploadThing — загрузка файлов

**Скоро:** Vercel AI, Trigger.dev, Upstash, Supabase, Better Auth, Resend, Stripe

---

## Blocks & Templates

### @shadcnblocks

**URL:** https://shadcnblocks.com

**1110 блоков** и **1148 компонентов** в 80+ категориях.

**Категории:**

- Marketing: Hero (175), Features (272), CTA (26), Testimonials (28)
- E-commerce: Product Card, Shopping Cart, Checkout
- Navigation: Navbar (18), Footer (25)
- Content: Blog (22), Gallery (48), Timeline (15)
- Forms: Contact (17), Login (8), Signup (10)
- Other: Pricing (35), FAQ (16), Team (14), Background Pattern (40)

**Дополнительно:** 11 премиум-шаблонов, Figma Kit, Admin Dashboard Kit

### @tailark

**URL:** https://tailark.com

Блоки для marketing сайтов на Shadcn UI.

**Категории:**

- Hero, Features, Pricing, Testimonials
- Footer, Contact, Logo clouds, CTA
- Team, FAQ, Stats, Sign in
- Integrations, Content sections

**Наборы:**

- Tailark Pro — корпоративный
- Tailark Dusk — темные дизайны
- Tailark Mist — Notion-стиль

### @blocks

**URL:** https://blocks.so

60+ компонентов в 11 категориях.

**Категории:**
| Категория | Кол-во |
|-----------|--------|
| AI Components | 4 |
| Command Menu | 3 |
| Dialogs | 12 |
| File Upload | 6 |
| Form Layout | 5 |
| Grid List | 3 |
| Login & Signup | 9 |
| Onboarding | 1 |
| Sidebar | 6 |
| Stats | 15 |
| Tables | 5 |

### @hextaui

**URL:** https://hextaui.com

Расширенные компоненты и блоки для shadcn/ui.

**Темы:** Default, Retro Blue, Purple, Night Wind, Orbiter, Soft Orange

**GitHub:** 500+ stars

---

## Specialized Components

### @formcn

**URL:** https://formcn.dev

Production-ready формы на shadcn.

**Функции:**

- Многошаговые формы
- Zod валидация (клиент + сервер через next-safe-action)
- ARIA доступность
- AI Scaffold для генерации полей
- Stepper, Tag input компоненты

### @tour

**URL:** https://onboarding-tour.vercel.app

Компонент для onboarding туров.

**Возможности:**

- Многошаговые туры
- Мультистраничные туры
- Множественные элементы в одном шаге
- Кастомизация всплывающих окон
- Несколько независимых туров

### @kibo-ui

**URL:** https://www.kibo-ui.com

Composable компоненты для shadcn/ui.

**Категории:**

- **Управление проектами:** Gantt, Kanban, Calendar, Tables
- **Формы:** Dropzone, Choicebox, Combobox, Tags
- **Медиа:** Image Crop/Zoom, Video Player, Reel, Stories
- **Специальные:** Color Picker, QR Code, Code Block, Editor
- **GitHub-стиль:** Contribution Graph
- **Коллаборация:** Avatar Stack, Cursor

### @diceui

**URL:** https://www.diceui.com

Accessible компоненты с фокусом на WAI-ARIA.

**Stack:** React, TypeScript, Tailwind CSS

### @react-aria

**URL:** https://react-aria.adobe.com
**GitHub:** https://github.com/adobe/react-spectrum

50+ компонентов от Adobe с высоким приоритетом доступности.

**Особенности:**

- Стиль-свободный подход
- 30+ языков, 13 календарных систем
- Адаптация для клавиатуры и screen readers
- Drag-and-drop, многовыборка, валидация форм

---

## Icons & Assets

### @svgl

**URL:** https://svgl.app
**GitHub:** https://github.com/pheralb/svgl

**573+ SVG логотипов** по категориям.

**Категории:**

- AI (48), Framework (49), Library (76)
- Software (201), Database (21), Design (29)

**Функции:**

- Поиск и сортировка
- shadcn/ui интеграция
- Open API
- GitHub: 5000+ stars

### @lucide-animated

**URL:** https://lucide-animated.com

**361+ анимированных иконок** на Motion (Framer Motion).

**Особенности:**

- MIT лицензия
- SVG компоненты на TypeScript
- Copy-paste готовые

**Установка:** `npx shadcn@latest add @lucide-animated/{icon-name}.json`

---

## Key Insights

### Тренды экосистемы shadcn/ui

1. **AI-first компоненты** — растущая категория с assistant-ui, prompt-kit, ai-elements
2. **Animation библиотеки** — Motion/Framer Motion как стандарт
3. **Уникальные стили** — neobrutalism, 8-bit, glassmorphism
4. **Full-stack интеграции** — Supabase, Clerk, UploadThing
5. **Массивные каталоги блоков** — shadcnblocks с 1100+ блоков

### Рекомендации для GooseUI

| Категория | Рекомендуемые библиотеки                        |
| --------- | ----------------------------------------------- |
| Анимации  | motion-primitives, animate-ui                   |
| AI чаты   | assistant-ui, prompt-kit                        |
| Стиль     | 8bitcn (если ретро), glass-ui (если минимализм) |
| Редакторы | plate (с AI), prosekit (легковесный)            |
| Auth      | clerk                                           |
| Forms     | formcn                                          |
| Blocks    | shadcnblocks, tailark                           |
| Icons     | svgl, lucide-animated                           |

### Интересные находки

- **@plate** — бесплатные альтернативы премиум-функциям Tiptap
- **@assistant-ui** — backed by Y Combinator
- **@shadcnblocks** — самый большой каталог (1100+ блоков)
- **@8bitcn** — уникальный 8-bit стиль, framework-agnostic
- **@nuqs** — URL state management с типобезопасностью
- **@tour** — готовое решение для onboarding
