# GooseLabs UI - Исследование и документация

Аудит и исследование для создания UI-библиотеки компонентов на базе ShadCN.

## Структура документации

| Файл                                       | Описание                                    |
| ------------------------------------------ | ------------------------------------------- |
| [01-references.md](./01-references.md)     | 10 референсов UI-библиотек на базе ShadCN   |
| [02-articles.md](./02-articles.md)         | 10 статей о создании компонентных библиотек |
| [03-architecture.md](./03-architecture.md) | Архитектура ShadCN и Registry System        |
| [04-mcp-servers.md](./04-mcp-servers.md)   | MCP-серверы для UI-библиотек                |
| [05-templates.md](./05-templates.md)       | Шаблоны и стартеры для создания библиотек   |

## Ключевые выводы

### Что такое ShadCN?

ShadCN UI — это **система дистрибуции кода**, а не традиционная npm-библиотека. Основной принцип: код копируется напрямую в проект, давая полный контроль над кастомизацией.

### Registry System

Registry — система распространения компонентов через JSON-файлы:

- Компоненты устанавливаются через CLI: `npx shadcn add button`
- Поддержка namespace: `npx shadcn add @magicui/animated-button`
- Framework-agnostic архитектура

### MCP (Model Context Protocol)

Протокол от Anthropic для интеграции AI с UI-библиотеками:

- Точная генерация кода без галлюцинаций
- Доступ к актуальной документации
- Автоматическая установка компонентов

### Экосистема

- **100+ сообщественных registry** (Magic UI, Aceternity, Origin UI...)
- **Официальный MCP-сервер** для Claude, Cursor, VS Code
- **Готовые шаблоны** для создания своего registry

## Быстрый старт

```bash
# Клонировать официальный шаблон
git clone https://github.com/shadcn-ui/registry-template.git gooselabs-ui
cd gooselabs-ui
pnpm install

# Определить компоненты в registry.json
# Собрать registry
pnpm build
```

## Источники

- [ShadCN UI Documentation](https://ui.shadcn.com/docs)
- [Registry Directory](https://ui.shadcn.com/docs/directory)
- [MCP Documentation](https://ui.shadcn.com/docs/mcp)
- [Registry Template](https://github.com/shadcn-ui/registry-template)
