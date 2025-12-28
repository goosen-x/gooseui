# Supabase UI Library

> Исследование библиотеки Supabase UI
> Дата: 2025-12-28

## Обзор

**Supabase UI Library** — это гибкая, open-source библиотека React-компонентов, построенная на базе [shadcn/ui](https://ui.shadcn.com/). Библиотека предназначена для упрощения разработки проектов на Supabase, предоставляя готовые решения для аутентификации, хранения файлов и функций реального времени.

### Ключевые характеристики

- **100% совместимость с shadcn/ui** — использует систему реестра компонентов
- **Tailwind CSS** — все компоненты стилизованы с помощью Tailwind
- **Полная кастомизация** — код копируется в проект, не устанавливается как зависимость
- **Поддержка SSR** — работает с серверным рендерингом

### Официальные ресурсы

| Ресурс | URL |
|--------|-----|
| Главная страница | https://supabase.com/ui |
| Документация | https://supabase.com/ui/docs/getting-started/introduction |
| Quick Start | https://supabase.com/ui/docs/getting-started/quickstart |
| GitHub (монорепо) | https://github.com/supabase/supabase |
| Блог-пост о запуске | https://supabase.com/blog/supabase-ui-library |

---

## Поддерживаемые фреймворки

| Фреймворк | Статус |
|-----------|--------|
| Next.js (App Router) | Полная поддержка |
| React Router | Полная поддержка |
| TanStack Start | Beta |
| React SPA | Полная поддержка |
| Vue | Не поддерживается (планируется) |
| Nuxt.js | Не поддерживается (планируется) |
| Svelte | Не поддерживается (планируется) |

---

## Установка

### Предварительные требования

1. Установленный shadcn/ui в проекте
2. Tailwind CSS v3+
3. React-проект

### Быстрый старт для Next.js

```bash
# Создание нового проекта с Supabase
npx create-next-app -e with-supabase

# Или добавление в существующий проект с shadcn/ui
npx shadcn@latest add [component-url]
```

### Установка компонентов

Компоненты устанавливаются через CLI shadcn:

```bash
npx shadcn@latest add https://supabase.com/ui/r/password-based-auth.json
```

Команда:
- Загружает определение компонента
- Копирует исходные файлы в директорию проекта
- Устанавливает необходимые зависимости
- **Не перезаписывает существующие файлы** (запрашивает подтверждение при конфликтах)

---

## Компоненты (Blocks)

### 1. Supabase Client

Настройка клиента Supabase для работы с фреймворками.

**Файловая структура:**
```
lib/supabase/
  ├── client.ts      # Browser client
  ├── server.ts      # Server client
  └── middleware.ts  # Middleware для auth
```

**Переменные окружения (.env.local):**
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=your-anon-key
```

**Browser Client:**
```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!
  )
}
```

---

### 2. Password-Based Auth

Полный цикл аутентификации на основе пароля.

**Включенные компоненты:**
- `login-form.tsx` — форма входа
- `sign-up-form.tsx` — форма регистрации
- `forgot-password-form.tsx` — восстановление пароля
- `update-password-form.tsx` — обновление пароля

**Функциональность:**
- Валидация email
- Состояния загрузки ("Sending...")
- Обработка ошибок с обратной связью
- Интеграция с `supabase.auth.resetPasswordForEmail()`

**Настройка:**
1. Установить Site URL в Supabase Dashboard
2. Добавить Redirect URLs
3. Обновить пути редиректа в компонентах

---

### 3. Social Auth (NEW)

Социальная аутентификация через OAuth провайдеров.

**Поддерживаемые провайдеры:**
- GitHub (по умолчанию)
- Google
- Apple
- Facebook
- Twitter
- Discord
- И многие другие

**Файловая структура:**
```
app/
  ├── auth/
  │   ├── login/page.tsx
  │   └── oauth/route.ts
  └── protected/page.tsx
components/
  ├── login-form.tsx
  └── logout-button.tsx
```

**Особенности:**
- Использует PKCE flow
- Легко комбинируется с Password-Based Auth
- Провайдер меняется через параметр `provider` в `supabase.auth.signInWithOAuth`

---

### 4. Dropzone (File Upload)

Компонент загрузки файлов с drag-and-drop.

**Props:**

| Параметр | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| `bucketName` | string | null | Bucket в Supabase Storage |
| `path` | string | null | Путь для загрузки |
| `allowedMimeTypes` | string[] | [] | Разрешенные MIME-типы |
| `maxFiles` | number | 1 | Максимум файлов |
| `maxFileSize` | number | 1000 | Размер в байтах |

**Функциональность:**
- Drag-and-drop
- Множественная загрузка
- Ограничения размера и количества
- Предпросмотр изображений
- Фильтрация по MIME-типу
- Обработка ошибок

**Файловая структура:**
```
components/
  └── dropzone.tsx
hooks/
  └── use-supabase-upload.ts
```

---

### 5. Realtime Cursor

Отображение курсоров других пользователей в реальном времени.

**Props:**

| Параметр | Тип | Описание |
|----------|-----|----------|
| `roomName` | string | Уникальный ID комнаты |
| `username` | string | Имя пользователя |

**Пример:**
```tsx
'use client'
import { RealtimeCursors } from '@/components/realtime-cursors'

export default function Page() {
  return (
    <div className="w-full min-h-screen">
      <RealtimeCursors
        roomName="collaboration-room"
        username="John Doe"
      />
    </div>
  )
}
```

**Файловая структура:**
```
components/
  ├── cursor.tsx
  └── realtime-cursors.tsx
hooks/
  └── use-realtime-cursors.ts
```

**Улучшение производительности:**
Рекомендуется использовать библиотеку `perfect-cursors` для интерполяции между обновлениями позиции.

---

### 6. Current User Avatar

Аватар текущего пользователя с интеграцией Supabase Auth.

**Props:** Нет (получает данные из Auth сессии)

**Функциональность:**
- Отображает `avatar_url` из метаданных пользователя
- Fallback на инициалы из `full_name`
- Показывает "?" когда пользователь не авторизован

**Пример:**
```tsx
'use client'
import { CurrentUserAvatar } from '@/components/current-user-avatar'

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <h1>My App</h1>
      <CurrentUserAvatar />
    </header>
  )
}
```

---

### 7. Realtime Avatar Stack

Стек аватаров пользователей онлайн (как в Notion/Figma).

**Props:**

| Параметр | Тип | Описание |
|----------|-----|----------|
| `roomName` | string | Имя Realtime комнаты |

**Пример:**
```tsx
import { RealtimeAvatarStack } from '@/components/realtime-avatar-stack'

export default function Page() {
  return (
    <header className="flex items-center justify-between">
      <h1>Lumon Industries</h1>
      <RealtimeAvatarStack roomName="break_room" />
    </header>
  )
}
```

**Использует:** Supabase Realtime Presence API

---

### 8. Realtime Chat

Полнофункциональный чат в реальном времени.

**Props:**

| Параметр | Тип | Описание |
|----------|-----|----------|
| `roomName` | string | Уникальный ID комнаты |
| `username` | string | Имя пользователя |
| `onMessage?` | function | Callback для персистентности |
| `messages?` | array | Начальные сообщения |

**Тип ChatMessage:**
```typescript
interface ChatMessage {
  id: string
  content: string
  user: { name: string }
  createdAt: string
}
```

**Пример:**
```tsx
import { RealtimeChat } from '@/components/realtime-chat'

export default function ChatPage() {
  return <RealtimeChat roomName="my-chat-room" username="john_doe" />
}
```

**Особенности:**
- Использует Supabase Realtime Broadcast
- Сообщения НЕ сохраняются автоматически
- Для персистентности используйте `onMessage` callback
- Низкая задержка
- Изоляция по комнатам

---

### 9. Infinite Query Hook (NEW)

Хук для бесконечной подгрузки данных.

*Документация в процессе разработки*

---

## Принципы архитектуры

### 1. Расширяемость
Компоненты можно модифицировать и расширять — они являются отправной точкой для собственных решений.

### 2. Композиция
Модульная структура позволяет легко комбинировать компоненты.

### 3. Гибкая интеграция клиента
Поддержка как клиентского, так и серверного Supabase клиента.

### 4. Готовые решения для сложных задач
Pre-built решения для:
- Аутентификации
- Загрузки файлов
- Синхронизации в реальном времени

### 5. Универсальность
Работает как с новыми, так и с существующими проектами.

---

## Стилизация и темы

### Подход shadcn/ui

Компоненты используют:
- Tailwind CSS классы
- CSS Variables для цветов
- Стандартные shadcn/ui компоненты (Button, Input, Card и т.д.)

### Кастомизация

Поскольку код копируется в проект, вы имеете полный контроль над:
- Стилями компонентов
- Логикой поведения
- Структурой файлов

---

## FAQ

### Перезапишет ли установка мои файлы?
Нет. При конфликтах CLI запросит подтверждение.

### Можно ли добавить в существующий проект?
Да. Рекомендуется сделать коммит перед добавлением для отслеживания изменений.

### Уже использую shadcn/ui?
Просто запустите команду добавления — дополнительная настройка не нужна.

### Нужен ли quickstart фреймворка?
Нет, но новичкам рекомендуется пройти setup guide shadcn/ui.

### Почему только React?
Команда использует экспертизу в React и существующие shadcn/ui компоненты. Поддержка Vue/Svelte возможна в будущем.

### Использую AI-билдер (v0, Cursor и т.д.)?
Компоненты можно добавлять в AI-сгенерированные приложения. Используйте существующие Supabase клиенты, не создавайте дубликаты.

---

## История развития

### Устаревший @supabase/ui

**Статус:** Архивирован 19 февраля 2025

Старая библиотека `@supabase/ui` (npm-пакет) больше не поддерживается. Разработка перенесена в основной монорепозиторий Supabase.

**Старая установка (устарело):**
```bash
npm install @supabase/ui
```

### Устаревший @supabase/auth-ui

**Статус:** Не поддерживается с 7 февраля 2024

Репозиторий `supabase-community/auth-ui` больше не поддерживается командой Supabase.

### Текущий подход

Новая Supabase UI Library на базе shadcn/ui — рекомендуемый способ работы с UI компонентами Supabase.

---

## Интеграция с Supabase

### Auth
- Password-Based Auth
- Social Auth (OAuth)
- Session management
- Protected routes

### Storage
- File uploads (Dropzone)
- Bucket integration
- Access control

### Realtime
- Cursor tracking
- Presence (Avatar Stack)
- Broadcast (Chat)

### Database
- Infinite Query Hook

---

## Сравнение с альтернативами

| Критерий | Supabase UI | @supabase/auth-ui (устар.) | Clerk | Auth0 |
|----------|-------------|----------------------------|-------|-------|
| Open Source | Да | Да | Частично | Нет |
| Кастомизация | Полная (код в проекте) | Ограниченная | Средняя | Средняя |
| Supabase интеграция | Нативная | Нативная | Требует настройки | Требует настройки |
| Realtime компоненты | Да | Нет | Нет | Нет |
| Storage компоненты | Да | Нет | Нет | Нет |
| Стоимость | Бесплатно | Бесплатно | Freemium | Платно |

---

## Рекомендации по использованию

### Когда использовать

1. **Новые Supabase проекты** — ускоряет разработку
2. **Добавление auth в существующий проект** — готовые компоненты
3. **Collaborative features** — Realtime компоненты
4. **File upload** — интеграция со Storage

### Когда НЕ использовать

1. **Не-React проекты** — пока только React
2. **Сильно кастомизированный UI** — возможно проще написать с нуля
3. **Не используете Supabase** — компоненты заточены под Supabase

---

## Будущее развитие

Supabase активно приглашает сообщество предлагать новые компоненты через:
- GitHub Pull Requests
- Discord
- X (Twitter)

Возможные направления:
- Поддержка Vue/Svelte
- Новые Realtime компоненты
- Расширенные Auth провайдеры

---

## Источники

1. [Supabase UI Library](https://supabase.com/ui) — официальная страница
2. [Introduction](https://supabase.com/ui/docs/getting-started/introduction) — документация
3. [Quick Start](https://supabase.com/ui/docs/getting-started/quickstart) — быстрый старт
4. [Introducing the Supabase UI Library](https://supabase.com/blog/supabase-ui-library) — блог-пост
5. [DEV.to: Introducing the Supabase UI Library](https://dev.to/supabase/introducing-the-supabase-ui-library-11ij) — статья
6. [GitHub: supabase/supabase](https://github.com/supabase/supabase) — монорепозиторий
7. [Password-Based Auth Docs](https://supabase.com/ui/docs/react/password-based-auth) — документация auth
8. [Realtime Chat Docs](https://supabase.com/ui/docs/nextjs/realtime-chat) — документация chat
9. [Social Auth Docs](https://supabase.com/ui/docs/nextjs/social-auth) — документация social auth
