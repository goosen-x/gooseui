# Анализ SearchBar от 8StarLabs UI

> Источник: [github.com/8starlabs/ui](https://github.com/8starlabs/ui)
> Дата анализа: 30 декабря 2024

## Обзор

8StarLabs UI использует **Command Menu** — современный паттерн поиска, популяризированный Linear, Vercel и другими продуктами. Компонент построен на базе библиотеки [cmdk](https://cmdk.paco.me/) от Paсo.

## Ключевые особенности

| Функция | Описание |
|---------|----------|
| **Keyboard-first** | ⌘/Ctrl+K для открытия, "/" как альтернатива |
| **Copy to clipboard** | ⌘/Ctrl+C копирует npm команду для выбранного компонента |
| **Fuzzy search** | Кастомный фильтр с поддержкой keywords |
| **Группировка** | Pages и Components разделены |
| **Dynamic footer** | Показывает контекстные действия |
| **Dark mode** | Полная поддержка темной темы |

---

## Архитектура компонентов

```
components/
└── command-menu.tsx          # Главный компонент

registry/8starlabs-ui/ui/
├── command.tsx               # Базовый Command (cmdk wrapper)
├── kbd.tsx                   # Keyboard key component
├── dialog.tsx                # Dialog wrapper
├── button.tsx                # Trigger button
└── separator.tsx             # Разделитель

hooks/
├── use-mutation-observer.ts  # Отслеживание выделения
├── use-is-mac.ts             # Определение ОС
└── use-config.ts             # Конфигурация (package manager)
```

---

## Полный код компонентов

### 1. CommandMenu (главный компонент)

```tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CornerDownLeftIcon, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@/registry/8starlabs-ui/ui/command";
import { useIsMac } from "@/hooks/use-is-mac";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import { source } from "@/lib/source";
import { IconArrowRight } from "@tabler/icons-react";
import { useMutationObserver } from "@/hooks/use-mutation-observer";
import { useConfig } from "@/hooks/use-config";
import { copyToClipboardWithMeta } from "@/components/copy-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/registry/8starlabs-ui/ui/dialog";
import { Button } from "@/registry/8starlabs-ui/ui/button";
import { Separator } from "@/registry/8starlabs-ui/ui/separator";
import { Kbd, KbdGroup } from "@/registry/8starlabs-ui/ui/kbd";

const CommandMenu = ({ tree, ...props }: { tree: typeof source.pageTree }) => {
  const router = useRouter();
  const isMac = useIsMac();
  const [config] = useConfig();
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<"page" | "component" | null>(null);
  const [copyPayload, setCopyPayload] = useState("");
  const packageManager = config.packageManager || "npm";

  // Определяем, что показывать в footer при выделении элемента
  const handlePageHighlight = useCallback(
    (isComponent: boolean, item: { url: string; name?: React.ReactNode }) => {
      if (isComponent) {
        const componentName = item.url.split("/").pop();
        setSelectedType("component");
        setCopyPayload(`npx shadcn@latest add @8starlabs-ui/${componentName}`);
      } else {
        setSelectedType("page");
        setCopyPayload("");
      }
    },
    [packageManager]
  );

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  // Глобальные keyboard shortcuts
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // ⌘/Ctrl+K или "/" открывает меню
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }
        e.preventDefault();
        setOpen((open) => !open);
      }

      // ⌘/Ctrl+C копирует npm команду
      if (e.key === "c" && (e.metaKey || e.ctrlKey)) {
        runCommand(() => {
          copyToClipboardWithMeta(copyPayload, {
            name: "copy_npm_command",
            properties: { command: copyPayload, pm: packageManager }
          });
        });
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [copyPayload, runCommand, packageManager]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className={cn(
            "bg-surface text-surface-foreground/60 dark:bg-card",
            "relative h-8 w-full justify-start pl-2.5 font-normal shadow-none",
            "sm:pr-12 md:w-40 lg:w-56 xl:w-64"
          )}
          onClick={() => setOpen(true)}
          {...props}
        >
          <span className="hidden lg:inline-flex">Search documentation...</span>
          <span className="inline-flex lg:hidden">Search...</span>
          <div className="absolute top-1.5 right-1.5 hidden gap-1 sm:flex">
            <KbdGroup>
              <Kbd className="border">{isMac ? "⌘" : "Ctrl"}</Kbd>
              <Kbd className="border">K</Kbd>
            </KbdGroup>
          </div>
        </Button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent
        showCloseButton={false}
        className={cn(
          "rounded-xl border-none bg-clip-padding p-2 pb-11 shadow-2xl",
          "ring-4 ring-neutral-200/80",
          "dark:bg-neutral-900 dark:ring-neutral-800"
        )}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Search documentation...</DialogTitle>
          <DialogDescription>Search for a command to run...</DialogDescription>
        </DialogHeader>

        <Command
          className={cn(
            "rounded-none bg-transparent",
            "**:data-[slot=command-input-wrapper]:bg-input/50",
            "**:data-[slot=command-input-wrapper]:border-input",
            "**:data-[slot=command-input]:!h-9",
            "**:data-[slot=command-input]:py-0",
            "**:data-[slot=command-input-wrapper]:mb-0",
            "**:data-[slot=command-input-wrapper]:!h-9",
            "**:data-[slot=command-input-wrapper]:rounded-md",
            "**:data-[slot=command-input-wrapper]:border"
          )}
          filter={(value, search, keywords) => {
            const extendValue = value + " " + (keywords?.join(" ") || "");
            if (extendValue.toLowerCase().includes(search.toLowerCase())) {
              return 1;
            }
            return 0;
          }}
        >
          <CommandInput placeholder="Type a command or search..." />

          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            {/* Navigation Pages */}
            <CommandGroup
              heading="Pages"
              className="!p-0 [&_[cmdk-group-heading]]:!p-3 [&_[cmdk-group-heading]]:!pb-1"
            >
              {siteConfig.navLinks.map((navItem) => (
                <CommandMenuItem
                  key={navItem.href}
                  value={navItem.label}
                  keywords={["nav", "navigation", navItem.label.toLowerCase()]}
                  onHighlight={() => {
                    setSelectedType("page");
                    setCopyPayload("");
                  }}
                  onSelect={() => {
                    if (navItem.external) {
                      window.open(navItem.href, "_blank", "noopener,noreferrer");
                    } else {
                      runCommand(() => router.push(navItem.href));
                    }
                  }}
                >
                  {navItem.external ? (
                    <ExternalLink className="mr-2 h-4 w-4" />
                  ) : (
                    <IconArrowRight />
                  )}
                  {navItem.label}
                </CommandMenuItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            {/* Documentation Tree */}
            {tree.children.map((group) => (
              <span key={group.$id}>
                {group.$id !== "(root)" && (
                  <CommandGroup
                    key={group.$id}
                    heading={group.name}
                    className="!p-0 [&_[cmdk-group-heading]]:!p-3 [&_[cmdk-group-heading]]:!pb-1"
                  >
                    {group.type === "folder" &&
                      group.children.map((item) => {
                        if (item.type === "page") {
                          const isComponent = item.url.includes("/components/");
                          return (
                            <CommandMenuItem
                              key={item.url}
                              value={`${group.name} ${item.name}`}
                              keywords={isComponent ? ["component"] : undefined}
                              onHighlight={() => handlePageHighlight(isComponent, item)}
                              onSelect={() => runCommand(() => router.push(item.url))}
                            >
                              {isComponent ? (
                                <div className="border-muted-foreground aspect-square size-4 rounded-full border border-dashed" />
                              ) : (
                                <IconArrowRight />
                              )}
                              {item.name}
                            </CommandMenuItem>
                          );
                        }
                        return null;
                      })}
                  </CommandGroup>
                )}
              </span>
            ))}
          </CommandList>
        </Command>

        {/* Dynamic Footer */}
        <div className={cn(
          "absolute inset-x-0 bottom-0 z-20",
          "flex h-10 items-center gap-2 px-4",
          "rounded-b-xl border-t",
          "border-t-neutral-100 bg-neutral-50",
          "dark:border-t-neutral-700 dark:bg-neutral-800",
          "text-muted-foreground text-xs font-medium"
        )}>
          <div className="flex items-center gap-2">
            <Kbd className="border">
              <CornerDownLeftIcon />
            </Kbd>
            {selectedType ? "Go to Page" : null}
          </div>

          {copyPayload && (
            <>
              <Separator orientation="vertical" className="!h-4" />
              <div className="flex items-center gap-1">
                <KbdGroup>
                  <Kbd className="border">{isMac ? "⌘" : "Ctrl"}</Kbd>
                  <Kbd className="border">C</Kbd>
                </KbdGroup>
                {copyPayload}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommandMenu;
```

---

### 2. CommandMenuItem (с отслеживанием выделения)

```tsx
function CommandMenuItem({
  children,
  className,
  onHighlight,
  ...props
}: React.ComponentProps<typeof CommandItem> & {
  onHighlight?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Используем MutationObserver для отслеживания aria-selected
  useMutationObserver(ref, (mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "aria-selected" &&
        ref.current?.getAttribute("aria-selected") === "true"
      ) {
        onHighlight?.();
      }
    });
  });

  return (
    <CommandItem
      ref={ref}
      className={cn(
        "h-9 rounded-md border border-transparent !px-3 font-medium",
        "data-[selected=true]:border-input",
        "data-[selected=true]:bg-input/50",
        className
      )}
      {...props}
    >
      {children}
    </CommandItem>
  );
}
```

---

### 3. useMutationObserver Hook

```typescript
import * as React from "react";

export const useMutationObserver = (
  ref: React.RefObject<HTMLElement | null>,
  callback: MutationCallback,
  options: MutationObserverInit = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true
  }
) => {
  React.useEffect(() => {
    if (ref.current) {
      const observer = new MutationObserver(callback);
      observer.observe(ref.current, options);
      return () => observer.disconnect();
    }
  }, [ref, callback, options]);
};
```

---

### 4. Kbd Component

```tsx
import { cn } from "@/lib/utils";

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "bg-muted text-muted-foreground",
        "pointer-events-none inline-flex h-5 w-fit min-w-5",
        "items-center justify-center gap-1",
        "rounded-sm px-1 font-sans text-xs font-medium select-none",
        "[&_svg:not([class*='size-'])]:size-3",
        // Стили внутри tooltip
        "[[data-slot=tooltip-content]_&]:bg-background/20",
        "[[data-slot=tooltip-content]_&]:text-background",
        "dark:[[data-slot=tooltip-content]_&]:bg-background/10",
        className
      )}
      {...props}
    />
  );
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  );
}

export { Kbd, KbdGroup };
```

---

### 5. Command (base component - cmdk wrapper)

```tsx
"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function Command({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "bg-popover text-popover-foreground",
        "flex h-full w-full flex-col overflow-hidden rounded-md",
        className
      )}
      {...props}
    />
  );
}

function CommandInput({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input-wrapper" className="flex h-9 items-center gap-2 border-b px-3">
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "placeholder:text-muted-foreground",
          "flex h-10 w-full rounded-md bg-transparent py-3 text-sm",
          "outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  );
}

function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn("max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto", className)}
      {...props}
    />
  );
}

function CommandEmpty(props: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty data-slot="command-empty" className="py-6 text-center text-sm" {...props} />
  );
}

function CommandGroup({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "text-foreground overflow-hidden p-1",
        "[&_[cmdk-group-heading]]:text-muted-foreground",
        "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5",
        "[&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        className
      )}
      {...props}
    />
  );
}

function CommandSeparator({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("bg-border -mx-1 h-px", className)}
      {...props}
    />
  );
}

function CommandItem({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "relative flex cursor-default items-center gap-2",
        "rounded-sm px-2 py-1.5 text-sm outline-hidden select-none",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0",
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

function CommandShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn("text-muted-foreground ml-auto text-xs tracking-widest", className)}
      {...props}
    />
  );
}

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator
};
```

---

## Уникальные паттерны

### 1. Dynamic Footer с контекстными действиями

Footer меняется в зависимости от выделенного элемента:
- **Страница** → показывает "Go to Page"
- **Компонент** → показывает npm команду для копирования

### 2. MutationObserver для onHighlight

Вместо стандартного `onSelect`, используется `useMutationObserver` для отслеживания `aria-selected`. Это позволяет реагировать на **выделение** (hover/keyboard navigation), а не только на выбор.

### 3. Кастомный фильтр с keywords

```tsx
filter={(value, search, keywords) => {
  const extendValue = value + " " + (keywords?.join(" ") || "");
  if (extendValue.toLowerCase().includes(search.toLowerCase())) {
    return 1;
  }
  return 0;
}}
```

Позволяет добавлять дополнительные ключевые слова для поиска (например, "nav", "component").

### 4. Slot-based styling

Использование `data-slot` атрибутов для таргетирования стилей:
```css
**:data-[slot=command-input-wrapper]:bg-input/50
```

---

## Зависимости

```json
{
  "dependencies": {
    "cmdk": "^1.0.0",
    "lucide-react": "^0.x",
    "@tabler/icons-react": "^3.x"
  }
}
```

---

## Как адаптировать для GooseUI

### Минимальная реализация:

1. Установить `cmdk`:
   ```bash
   pnpm add cmdk
   ```

2. Создать базовый Command компонент (уже есть в shadcn/ui)

3. Создать `Kbd` и `KbdGroup` компоненты

4. Создать `useMutationObserver` хук

5. Адаптировать `CommandMenu` под структуру GooseUI

### Что можно улучшить:

- [ ] Добавить поиск по содержимому компонентов (не только по названию)
- [ ] Добавить "Recent searches"
- [ ] Добавить категории с иконками
- [ ] Интегрировать с Algolia/Meilisearch для full-text search

---

## Источники

- [8StarLabs UI GitHub](https://github.com/8starlabs/ui)
- [cmdk Library](https://cmdk.paco.me/)
- [shadcn/ui Command](https://ui.shadcn.com/docs/components/command)
