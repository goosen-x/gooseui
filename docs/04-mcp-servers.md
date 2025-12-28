# MCP-серверы для UI-библиотек

## Что такое Model Context Protocol (MCP)

**Model Context Protocol (MCP)** — открытый протокол от Anthropic (ноябрь 2024). Стандартизирует интеграцию AI-систем (Claude, Cursor, GitHub Copilot) с внешними инструментами и сервисами.

### Ключевые концепции

| Концепция | Описание |
|-----------|----------|
| **MCP Server** | Предоставляет tools, resources, prompts для AI |
| **MCP Client** | AI-клиент (Claude Code, Cursor, VS Code Copilot) |
| **Transport** | Способ коммуникации (stdio, HTTP/SSE) |

### Почему MCP важен для UI-библиотек

MCP решает проблему **галлюцинаций AI** при генерации UI-кода:
- Точная генерация кода с правильными props
- Актуальные примеры из официальной документации
- Экономия токенов (100-500k → эффективные запросы)

---

## ShadCN MCP Server

[shadcn/ui](https://ui.shadcn.com/docs/mcp) предоставляет официальный MCP-сервер.

### Конфигурация для Claude Code

`.mcp.json`:
```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

### Конфигурация для Cursor

`.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

### Конфигурация для VS Code

`.vscode/mcp.json`:
```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

### Поддержка множественных реестров

```json
{
  "registries": {
    "@acme": "https://acme.com/r/{name}.json",
    "@internal": {
      "url": "https://internal.company.com/{name}.json",
      "headers": {
        "Authorization": "Bearer ${REGISTRY_TOKEN}"
      }
    }
  }
}
```

### Возможности

- **Просмотр**: "Show all available components"
- **Поиск**: "Find a login form"
- **Установка**: "Add the button, dialog, and card"
- **Namespace**: "Install @internal/auth-form"

---

## Другие UI-библиотеки с MCP

### Chakra UI (Официальный)

**URL:** https://chakra-ui.com/docs/get-started/ai/mcp-server

**Установка:**
```bash
claude mcp add chakra-ui -- npx -y @chakra-ui/react-mcp
```

**Инструменты:**

| Инструмент | Описание |
|------------|----------|
| `list_components` | Список всех компонентов |
| `get_component_props` | Детальные props и типы |
| `get_component_example` | Примеры использования |
| `get_theme` | Дизайн-токены |
| `v2_to_v3_code_review` | Миграция v2 → v3 |

### Material UI (MUI)

**URL:** https://mui.com/material-ui/getting-started/mcp/

```bash
claude mcp add mui-mcp -- npx -y @mui/mcp@latest
```

### Ant Design (Community)

**URL:** https://playbooks.com/mcp/hannesj/mcp-antd-components

```json
{
  "mcpServers": {
    "antd_components": {
      "command": "npx",
      "args": ["-y", "mcp-antd-components"]
    }
  }
}
```

### Nuxt UI

**URL:** https://ui.nuxt.com/docs/getting-started/ai/mcp

### Magic UI

**URL:** https://magicui.design/docs/mcp

### React Design Systems MCP (Multi-library)

**URL:** https://github.com/agentience/react-design-systems-mcp

Единый сервер с поддержкой:
- AWS Cloudscape (уже)
- Material UI (в разработке)
- Chakra UI (в разработке)
- Ant Design (в разработке)

---

## Создание своего MCP-сервера

### Архитектура

```
┌─────────────────────────────────────────────────────┐
│                    AI Client                         │
│          (Claude Code, Cursor, Copilot)             │
└─────────────────────┬───────────────────────────────┘
                      │ MCP Protocol (stdio/HTTP)
┌─────────────────────▼───────────────────────────────┐
│                  MCP Server                          │
├─────────────────────────────────────────────────────┤
│  Server Layer     │ Handles MCP protocol            │
│  Config Layer     │ Project settings                │
│  API Layer        │ Fetches registry data           │
│  Validation Layer │ Zod schemas                     │
│  Transform Layer  │ Formats data for AI             │
└─────────────────────────────────────────────────────┘
```

### Шаг 1: Инициализация

```bash
mkdir my-ui-mcp-server
cd my-ui-mcp-server
npm init -y
```

**package.json:**
```json
{
  "name": "my-ui-library-mcp",
  "version": "1.0.0",
  "type": "module",
  "bin": {
    "my-ui-mcp": "./dist/server.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.13.1",
    "zod": "^3.25.67"
  },
  "devDependencies": {
    "@modelcontextprotocol/inspector": "^0.14.2",
    "tsup": "^8.5.0",
    "tsx": "^4.20.3",
    "typescript": "^5.8.3"
  },
  "scripts": {
    "build": "tsup src/server.ts --format esm --dts",
    "dev": "tsx src/server.ts",
    "inspect": "npx @modelcontextprotocol/inspector tsx src/server.ts"
  }
}
```

### Шаг 2: Конфигурация

**src/lib/config.ts:**
```typescript
export const mcpConfig = {
  projectName: "my-ui-library",
  baseUrl: "https://my-ui-library.com",
  registryUrl: "https://my-ui-library.com/r",
  registryFileUrl: "https://my-ui-library.com/registry.json",
};
```

### Шаг 3: Валидация (Zod)

**src/utils/schemas.ts:**
```typescript
import { z } from "zod";

export const ComponentSchema = z.object({
  name: z.string(),
  type: z.string(),
  description: z.string().optional(),
});

export const ComponentDetailSchema = z.object({
  name: z.string(),
  type: z.string(),
  files: z.array(
    z.object({
      path: z.string(),
      content: z.string(),
    })
  ),
  dependencies: z.array(z.string()).optional(),
});
```

### Шаг 4: API

**src/utils/api.ts:**
```typescript
import { mcpConfig } from "../lib/config.js";
import { ComponentSchema, ComponentDetailSchema } from "./schemas.js";

export async function fetchUIComponents() {
  const response = await fetch(mcpConfig.registryFileUrl);
  const data = await response.json();
  return data.registry
    .filter((item: any) => item.type === "registry:component")
    .map((item: any) => ComponentSchema.parse(item));
}

export async function fetchComponentDetails(name: string) {
  const response = await fetch(`${mcpConfig.registryUrl}/${name}.json`);
  const data = await response.json();
  return ComponentDetailSchema.parse(data);
}
```

### Шаг 5: Основной сервер

**src/server.ts:**
```typescript
#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { fetchUIComponents, fetchComponentDetails } from "./utils/api.js";

const server = new McpServer({
  name: "my-ui-library-mcp",
  version: "1.0.0",
});

// Tool 1: Список компонентов
server.tool(
  "list_components",
  "Get all available UI components",
  {},
  async () => {
    const components = await fetchUIComponents();
    return {
      content: [{ type: "text", text: JSON.stringify(components, null, 2) }],
    };
  }
);

// Tool 2: Детали компонента
server.tool(
  "get_component",
  "Get component details",
  { name: z.string().describe("Component name") },
  async ({ name }) => {
    const details = await fetchComponentDetails(name);
    return {
      content: [{ type: "text", text: JSON.stringify(details, null, 2) }],
    };
  }
);

// Tool 3: Поиск
server.tool(
  "search_components",
  "Search components",
  { query: z.string().describe("Search query") },
  async ({ query }) => {
    const components = await fetchUIComponents();
    const filtered = components.filter((c: any) =>
      c.name.toLowerCase().includes(query.toLowerCase())
    );
    return {
      content: [{ type: "text", text: JSON.stringify(filtered, null, 2) }],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
```

### Шаг 6: Сборка и тестирование

```bash
npm run build
npm run inspect  # MCP Inspector
```

### Шаг 7: Публикация

```bash
npm publish
```

После публикации:
```json
{
  "mcpServers": {
    "my-ui-library": {
      "command": "npx",
      "args": ["-y", "my-ui-library-mcp"]
    }
  }
}
```

---

## Преимущества MCP

### Для разработчиков

| Преимущество | Описание |
|--------------|----------|
| **Точность** | AI генерирует код на основе актуальной документации |
| **Время** | Нет переключения между IDE и документацией |
| **Токены** | Эффективные запросы вместо 100-500k токенов |
| **Примеры** | Реальные demo из официальных источников |
| **Установка** | AI сам добавляет компоненты |

### Для авторов библиотек

| Преимущество | Описание |
|--------------|----------|
| **DX** | Лучший опыт работы с библиотекой |
| **Поддержка** | AI отвечает на вопросы по документации |
| **Использование** | Разработчики используют компоненты правильно |
| **Миграция** | Инструменты типа `v2_to_v3_code_review` |
| **Монетизация** | Интеграция Pro-функций |

### Индустриальное принятие

MCP принят:
- **OpenAI** — поддержка в SDK
- **Google DeepMind** — интеграция
- **Block, Apollo** — production
- **Zed, Replit, Codeium, Sourcegraph** — инструменты разработки

---

## Источники

### Официальная документация
- [shadcn/ui MCP Server](https://ui.shadcn.com/docs/mcp)
- [Chakra UI MCP](https://chakra-ui.com/docs/get-started/ai/mcp-server)
- [Material UI MCP](https://mui.com/material-ui/getting-started/mcp/)
- [Model Context Protocol](https://modelcontextprotocol.io/specification/2025-11-25)

### GitHub
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [MCP Starter Template](https://github.com/mnove/mcp-server-starter)

### Туториалы
- [How to build MCP for UI libraries](https://dev.to/mnove/how-to-build-a-mcp-model-context-protocol-server-for-ui-libraries-repo-5ea2)
- [Build MCP Server with TypeScript](https://www.freecodecamp.org/news/how-to-build-a-custom-mcp-server-with-typescript-a-handbook-for-developers/)
- [Introducing MCP (Anthropic)](https://www.anthropic.com/news/model-context-protocol)
