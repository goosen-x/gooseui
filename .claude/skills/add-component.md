---
name: add-component
description: Creates new components for GooseUI library with proper registry, documentation, and styling. Use when adding new UI components, effects, or blocks.
allowed-tools: Read, Write, Edit, Grep, Glob, Bash
---

# Adding New Components to GooseUI

> **IMPORTANT:** Always use this skill when adding new components!

## Quick Checklist

1. [ ] `registry/new-york/ui/{slug}.tsx` — компонент
2. [ ] `public/r/{slug}.json` — registry JSON
3. [ ] `lib/config/registry.ts` — добавить в REGISTRY_ITEMS
4. [ ] `lib/config/docs-navigation.ts` — добавить в навигацию
5. [ ] `app/(docs)/docs/components/{slug}/page.tsx` — docs page
6. [ ] `app/(docs)/docs/components/page.tsx` — добавить в каталог
7. [ ] `pnpm validate:nav` — проверить навигацию

---

## Project Structure

```
registry/new-york/
├── ui/              # UI components (button, input, card)
├── effects/         # Visual effects (border-beam)
├── blocks/          # Ready-to-use examples
└── lib/             # Utilities (toast.ts)

app/(docs)/docs/
├── components/      # Component documentation
│   └── {slug}/
│       ├── page.tsx
│       └── {slug}-demo.tsx  # Client demos (if needed)
└── effects/         # Effects documentation
```

---

## Step 1: Create Component

Location: `registry/new-york/ui/{slug}.tsx`

```tsx
"use client"  // Only if using hooks/state

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const componentVariants = cva(
  "base-classes-here",
  {
    variants: {
      variant: {
        default: "variant-classes",
      },
      size: {
        default: "size-classes",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ComponentNameProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof componentVariants> {}

export function ComponentName({
  className,
  variant,
  size,
  ...props
}: ComponentNameProps) {
  return (
    <div
      className={cn(componentVariants({ variant, size, className }))}
      {...props}
    />
  )
}
```

---

## Step 2: Create Registry JSON

Location: `public/r/{slug}.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "component-name",
  "type": "registry:ui",
  "title": "Component Name",
  "description": "Short description of the component.",
  "dependencies": ["lucide-react"],
  "devDependencies": ["class-variance-authority"],
  "files": [
    {
      "path": "registry/new-york/ui/component-name.tsx",
      "type": "registry:ui"
    }
  ]
}
```

---

## Step 3: Add to Registry Config

Edit `lib/config/registry.ts`:

```typescript
export const REGISTRY_ITEMS: RegistryItem[] = [
  // ... existing items
  { slug: "component-name", name: "Component Name", type: "component" },
]
```

**Fields:**
- `slug`: URL path segment (e.g., "my-component")
- `name`: Display name
- `type`: "component" | "effect" | "hook" | "lib"
- `registryFile`: Optional custom filename if different from `{slug}.json`

---

## Step 4: Add to Navigation

Edit `lib/config/docs-navigation.ts`:

```typescript
{
  title: "Components",
  slug: "components",
  href: "/docs/components",
  items: [
    // ... existing items (alphabetically sorted)
    {
      slug: "component-name",
      title: "Component Name",
      href: "/docs/components/component-name",
      isNew: true,
    },
  ],
}
```

**Options:**
- `isNew: true` — shows "NEW" badge
- `isDraft: true` — hidden in production, visible in development

---

## Step 5: Create Docs Page

Location: `app/(docs)/docs/components/{slug}/page.tsx`

```tsx
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { ComponentName } from "@/registry/new-york/ui/component-name"

export const metadata = {
  title: "Component Name",
  description: "Short description for SEO",
}

export default function ComponentNamePage() {
  return (
    <div className="space-y-8">
      <DocsPageNav title="Component Name" />
      <p className="text-muted-foreground">
        Component description here.
      </p>

      {/* Demo */}
      <div className="space-y-4">
        <h2
          id="demo"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Demo
        </h2>
        <div className="flex items-center justify-center rounded-lg border p-6">
          <ComponentName />
        </div>
      </div>

      {/* Installation */}
      <div className="space-y-4">
        <h2
          id="installation"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Installation
        </h2>
        <InstallCommand packageName="https://gooseui.pro/r/component-name.json" />
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2
          id="usage"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Usage
        </h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { ComponentName } from "@/components/ui/component-name"

export default function Page() {
  return <ComponentName />
}`}</code>
        </pre>
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2
          id="props"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Props
        </h2>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 font-medium">Prop</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-left p-3 font-medium">Default</th>
                <th className="text-left p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">variant</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3 font-mono text-xs">"default"</td>
                <td className="p-3">Style variant</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
```

### CRITICAL: h2 IDs for Table of Contents

Every `h2` MUST have an `id` attribute:

```tsx
// CORRECT
<h2 id="demo">Demo</h2>

// WRONG - won't appear in TOC
<h2>Demo</h2>
```

**Standard IDs:** `demo`, `installation`, `usage`, `examples`, `props`, `features`

---

## Step 6: Add to Components Index

Edit `app/(docs)/docs/components/page.tsx`:

```tsx
const components = [
  // ... existing (alphabetically sorted)
  {
    name: "Component Name",
    slug: "component-name",
    description: "Short description.",
    category: "Display", // Display, Inputs, Layout, Feedback, Theme, Typography
    isNew: true,
    preview: (
      <ComponentName />
    ),
  },
]
```

---

## Interactive Demos (Client Components)

For components with onClick handlers, create a separate client file:

```tsx
// app/(docs)/docs/components/{slug}/{slug}-demo.tsx
"use client"

import { customToast } from "@/lib/toast"
import { ComponentName } from "@/registry/new-york/ui/component-name"

export function ComponentNameDemo() {
  return (
    <ComponentName onClick={() => customToast.success("Clicked!")}>
      Click me
    </ComponentName>
  )
}
```

Then import in page.tsx:
```tsx
import { ComponentNameDemo } from "./{slug}-demo"
```

---

## Baseline Features (Optional)

Add only if component uses modern CSS features worth documenting.

1. Add to `lib/config/baseline-features.ts`:
```typescript
export const COMPONENT_BASELINE_FEATURES: Record<string, string[]> = {
  "component-name": ["scroll-snap"],
}
```

2. Add to docs page:
```tsx
import { ComponentBaseline } from "@/components/docs/component-baseline"

<ComponentBaseline slug="component-name" />
```

---

## Validation & Testing

```bash
# Validate navigation
pnpm validate:nav

# Build to check for errors
pnpm build

# Check component appears in:
# - Sidebar navigation
# - Site search (Cmd+K)
# - /docs/components page
```

---

## Registry URL Pattern

All URLs follow: `https://gooseui.pro/r/{slug}.json`

For custom filenames:
```typescript
{ slug: "toast", name: "Toast", type: "component", registryFile: "sonner.json" }
```
