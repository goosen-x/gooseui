# Архитектура ShadCN и Registry System

## Обзор

ShadCN UI — это **система дистрибуции кода**, а не традиционная npm-библиотека.

> "Это не библиотека компонентов. Это то, как вы строите свою библиотеку компонентов."

Вместо установки npm-пакета, ShadCN копирует исходный код компонентов в проект, давая полный контроль над кастомизацией.

---

## Основные принципы

| Принцип                | Описание                                                 |
| ---------------------- | -------------------------------------------------------- |
| **Open Code**          | Полный контроль над кодом компонентов                    |
| **Composition**        | Композиция вместо конфигурации                           |
| **Distribution**       | Код распределяется, а не устанавливается как зависимость |
| **Beautiful Defaults** | Готовые к использованию стили по умолчанию               |
| **AI-Ready**           | Архитектура оптимизирована для AI-инструментов           |

---

## Структура проекта

```
project/
├── components/
│   └── ui/                    # UI компоненты (button, card, etc.)
├── lib/
│   └── utils.ts               # Утилита cn() для классов
├── hooks/                     # React hooks
├── app/                       # Next.js страницы
├── registry/                  # Для кастомных registry
│   └── new-york/              # Стиль компонентов
│       └── component-name/
│           └── component.tsx
├── public/
│   └── r/                     # Сгенерированные JSON файлы registry
├── components.json            # Конфигурация ShadCN
└── registry.json              # Определение кастомного registry
```

---

## Конфигурационный файл components.json

Центральный файл конфигурации ShadCN в проекте:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "styles/global.css",
    "baseColor": "gray",
    "cssVariables": true,
    "prefix": "tw-"
  },
  "rsc": true,
  "tsx": true,
  "aliases": {
    "utils": "@/lib/utils",
    "components": "@/components",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {
    "@acme": "https://registry.acme.com/{name}.json",
    "@private": {
      "url": "https://api.company.com/registry/{name}.json",
      "headers": {
        "Authorization": "Bearer ${REGISTRY_TOKEN}"
      }
    }
  }
}
```

### Ключевые поля

| Поле                    | Описание                                          |
| ----------------------- | ------------------------------------------------- |
| `style`                 | Стиль компонентов (new-york, default)             |
| `tailwind.cssVariables` | CSS переменные (true) или Tailwind классы (false) |
| `aliases`               | Пути импорта для компонентов и утилит             |
| `registries`            | Конфигурация внешних registry с namespace         |
| `rsc`                   | Поддержка React Server Components                 |

---

## CLI команды

### Инициализация

```bash
npx shadcn@latest init
```

Опции:

- `-t, --template` — шаблон (next, next-monorepo)
- `-b, --base-color` — базовый цвет
- `-y, --yes` — пропустить подтверждения
- `--css-variables` — включить CSS переменные

### Добавление компонентов

```bash
# Из официального registry
npx shadcn@latest add button

# Из namespace registry
npx shadcn@latest add @acme/custom-button

# По прямому URL
npx shadcn@latest add https://example.com/r/component.json

# Из локального файла
npx shadcn@latest add ./registry/items/component.json

# Все компоненты
npx shadcn@latest add -a
```

### Сборка registry

```bash
npx shadcn@latest build
```

Генерирует JSON файлы в `public/r/`.

---

## Registry System

### Как работает Registry

Registry — система дистрибуции исходного кода. Компоненты распространяются как JSON-файлы со встроенным исходным кодом.

**Преимущества:**

- Полный контроль над кодом
- Добавляется только нужное
- Framework-agnostic
- Поддержка любых типов файлов

### Формат registry.json

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "acme",
  "homepage": "https://acme.com",
  "items": [
    {
      "name": "hello-world",
      "type": "registry:block",
      "title": "Hello World",
      "description": "A simple hello world component",
      "dependencies": ["@radix-ui/react-slot"],
      "registryDependencies": ["button", "card"],
      "files": [
        {
          "path": "registry/new-york/hello-world/hello-world.tsx",
          "type": "registry:component",
          "target": "components/hello-world.tsx"
        }
      ]
    }
  ]
}
```

### Формат registry-item.json

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "custom-button",
  "type": "registry:ui",
  "title": "Custom Button",
  "description": "Enhanced button with animations",
  "author": "Author Name <email@example.com>",
  "categories": ["buttons", "interactive"],
  "dependencies": ["@radix-ui/react-slot", "framer-motion"],
  "registryDependencies": ["button"],
  "files": [
    {
      "path": "registry/new-york/custom-button/custom-button.tsx",
      "type": "registry:component"
    }
  ],
  "cssVars": {
    "theme": {
      "font-heading": "Inter, sans-serif"
    },
    "light": {
      "brand": "20 14.3% 4.1%"
    },
    "dark": {
      "brand": "20 80% 90%"
    }
  },
  "css": "@layer base { ... }",
  "docs": "Custom installation instructions"
}
```

### Типы элементов registry

| Тип                  | Описание                               |
| -------------------- | -------------------------------------- |
| `registry:ui`        | Базовые UI компоненты (button, input)  |
| `registry:component` | Простые компоненты                     |
| `registry:block`     | Комплексные блоки из нескольких файлов |
| `registry:lib`       | Утилиты и библиотечные функции         |
| `registry:hook`      | React hooks                            |
| `registry:page`      | Страницы/роуты                         |
| `registry:file`      | Произвольные файлы                     |
| `registry:style`     | Стили и темы                           |
| `registry:theme`     | Полные темы                            |

---

## Создание кастомного Registry

### Шаг 1: Создание registry.json

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "gooselabs",
  "homepage": "https://gooselabs.com",
  "items": []
}
```

### Шаг 2: Структура компонентов

```
registry/
└── new-york/
    └── my-component/
        ├── my-component.tsx
        └── my-component.css
```

### Шаг 3: Добавление компонента

```json
{
  "items": [
    {
      "name": "my-component",
      "type": "registry:component",
      "title": "My Component",
      "description": "Description",
      "dependencies": ["some-npm-package"],
      "registryDependencies": ["button"],
      "files": [
        {
          "path": "registry/new-york/my-component/my-component.tsx",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

### Шаг 4: Настройка сборки

```json
{
  "scripts": {
    "registry:build": "shadcn build"
  }
}
```

### Шаг 5: Сборка и тестирование

```bash
npm run registry:build
npm run dev
# Компоненты: http://localhost:3000/r/my-component.json
```

### Шаг 6: Установка

```bash
npx shadcn@latest add http://localhost:3000/r/my-component.json
```

---

## Namespaces (Пространства имён)

### Конфигурация

```json
{
  "registries": {
    "@v0": "https://v0.dev/chat/b/{name}",
    "@acme": "https://registry.acme.com/{name}.json",
    "@private": {
      "url": "https://api.company.com/registry/{name}.json",
      "headers": {
        "Authorization": "Bearer ${REGISTRY_TOKEN}"
      }
    }
  }
}
```

### Использование

```bash
npx shadcn@latest add @acme/custom-button
npx shadcn@latest add @private/internal-component
```

### Плейсхолдеры URL

- `{name}` — имя компонента (обязательный)
- `{style}` — текущий стиль (опциональный)

---

## Аутентификация Registry

### Токен-базированная

```json
{
  "registries": {
    "@private": {
      "url": "https://registry.company.com/{name}.json",
      "headers": {
        "Authorization": "Bearer ${REGISTRY_TOKEN}"
      }
    }
  }
}
```

`.env.local`:

```
REGISTRY_TOKEN=your_secret_token_here
```

### Best Practices

- Использовать HTTPS
- Rate limiting
- Регулярная ротация токенов
- Логирование для аудита

---

## Официальные компоненты

В официальном registry `@shadcn` — **438 элементов**:

### UI компоненты (registry:ui)

- `button`, `card`, `input`, `form`, `dialog`
- `table`, `tabs`, `accordion`, `alert`
- `avatar`, `badge`, `breadcrumb`, `calendar`
- `carousel`, `chart`, `checkbox`, `command`
- `dropdown-menu`, `navigation-menu`, `popover`
- `progress`, `radio-group`, `select`, `sidebar`
- `skeleton`, `slider`, `switch`, `toast`

### Зависимости

| Компонент | NPM зависимости                                                  |
| --------- | ---------------------------------------------------------------- |
| `button`  | @radix-ui/react-slot                                             |
| `form`    | @radix-ui/react-label, @hookform/resolvers, zod, react-hook-form |
| `card`    | Без внешних зависимостей                                         |

---

## Источники

- [ShadCN UI Documentation](https://ui.shadcn.com/docs)
- [Registry Getting Started](https://ui.shadcn.com/docs/registry/getting-started)
- [Registry Directory](https://ui.shadcn.com/docs/directory)
- [CLI Documentation](https://ui.shadcn.com/docs/cli)
- [Registry Template](https://github.com/shadcn-ui/registry-template)
