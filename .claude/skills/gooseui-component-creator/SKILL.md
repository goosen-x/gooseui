---
name: gooseui-component-creator
description: Creates new components for GooseUI library with proper registry, documentation, and styling. Use when adding new UI components, effects, or blocks to the library.
allowed-tools: Read, Write, Edit, Grep, Glob, Bash
---

# GooseUI Component Creator

Expert skill for adding new components to the GooseUI shadcn-based component library.

## When to Use

- Adding a new UI component (button, input, card, etc.)
- Adding a new visual effect (border-beam, shimmer, etc.)
- Adding a new block/example (forms, cards, etc.)
- Creating documentation pages for components

## Project Structure

```
registry/
└── new-york/
    ├── ui/              # Base UI components (button, input, card)
    ├── effects/         # Visual effects (border-beam)
    ├── blocks/          # Ready-to-use examples
    │   └── {name}/
    │       └── {name}.tsx
    └── lib/             # Utilities (toast.ts)

app/(docs)/docs/
├── components/          # Component documentation
│   └── {name}/
│       └── page.tsx
└── effects/             # Effects documentation
    └── {name}/
        └── page.tsx
```

## Step 1: Create Component File

### Location by Type

| Type | Path | Example |
|------|------|---------|
| UI Component | `registry/new-york/ui/{name}.tsx` | `button.tsx` |
| Effect | `registry/new-york/effects/{name}.tsx` | `border-beam.tsx` |
| Block | `registry/new-york/blocks/{name}/{name}.tsx` | `example-form/example-form.tsx` |
| Utility | `registry/new-york/lib/{name}.ts` | `toast.ts` |

### Component Template

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
    VariantProps<typeof componentVariants> {
  // Additional props
}

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

## Step 2: Register in registry.json

Add entry to `/registry.json`:

```json
{
  "name": "component-name",
  "type": "registry:ui",
  "title": "Component Name",
  "description": "Short description of the component.",
  "dependencies": ["@radix-ui/react-slot"],
  "devDependencies": ["class-variance-authority"],
  "registryDependencies": ["button"],
  "files": [
    {
      "path": "registry/new-york/ui/component-name.tsx",
      "type": "registry:ui"
    }
  ]
}
```

### Registry Types

| Type | Use For |
|------|---------|
| `registry:ui` | Base UI components |
| `registry:component` | Blocks/examples |
| `registry:lib` | Utilities |
| `registry:hook` | Custom hooks |
| `registry:page` | Full pages |

## Step 3: Create Documentation Page

Create `app/(docs)/docs/components/{name}/page.tsx`:

```tsx
import { ComponentName } from "@/registry/new-york/ui/component-name"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"

export const metadata = {
  title: "Component Name",
  description: "Short description for SEO",
}

export default function ComponentNamePage() {
  return (
    <div className="space-y-6">
      {/* Navigation */}
      <DocsPageNav
        title="Component Name"
        prevHref="/docs/components/previous"
        nextHref="/docs/components/next"
      />

      {/* Description */}
      <p className="text-lg text-muted-foreground">
        Component description here
      </p>

      {/* Preview Section */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Preview
        </h2>
        <div className="flex items-center justify-center rounded-lg border p-6">
          <ComponentName />
        </div>
      </div>

      {/* Installation Section */}
      <div className="space-y-4">
        <h2 id="installation" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Installation
        </h2>
        <InstallCommand packageName="https://gooseui.pro/r/component-name.json" />
      </div>

      {/* Usage Section */}
      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Usage
        </h2>
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          {`import { ComponentName } from "@/components/ui/component-name"

export function MyComponent() {
  return <ComponentName>Content</ComponentName>
}`}
        </pre>
      </div>

      {/* Examples Section */}
      <div className="space-y-4">
        <h2 id="examples" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Examples
        </h2>

        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
          Default
        </h3>
        <div className="flex items-center gap-4 rounded-lg border p-4">
          <ComponentName />
        </div>
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          {`<ComponentName />`}
        </pre>
      </div>

      {/* Props Section */}
      <div className="space-y-4">
        <h2 id="props" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Props
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Prop</th>
                <th className="text-left py-3 px-4 font-semibold">Type</th>
                <th className="text-left py-3 px-4 font-semibold">Default</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">variant</td>
                <td className="py-3 px-4 font-mono text-muted-foreground">
                  "default" | "secondary"
                </td>
                <td className="py-3 px-4 font-mono">"default"</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
```

## CRITICAL: Table of Contents IDs

Every `h2` element MUST have an `id` attribute for the Table of Contents to work:

```tsx
// CORRECT - TOC will show this section
<h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
  Preview
</h2>

// WRONG - TOC will NOT show this section
<h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
  Preview
</h2>
```

### Standard Section IDs

| Section | ID |
|---------|-----|
| Preview | `id="preview"` |
| Demo | `id="demo"` |
| Installation | `id="installation"` |
| Usage | `id="usage"` |
| Examples | `id="examples"` |
| Variants | `id="variants"` |
| Props | `id="props"` |
| Components | `id="components"` |

## Step 4: Update Components Index

Add to `app/(docs)/docs/components/page.tsx`:

```tsx
const components = [
  // ... existing components
  {
    name: "Component Name",
    slug: "component-name",
    description: "Short description here.",
    category: "Inputs", // or "Layout", "Display", etc.
    preview: (
      <div className="flex items-center gap-2">
        <ComponentName />
      </div>
    ),
  },
]
```

## Step 5: Update Navigation Links

Update `prevHref` and `nextHref` in adjacent component pages to maintain navigation chain.

## Styling Guidelines

### Preview Containers

```tsx
// Standard preview
<div className="flex items-center justify-center rounded-lg border p-6">
  <Component />
</div>

// With max-width
<div className="flex flex-col gap-4 rounded-lg border p-6 max-w-sm">
  <Component />
</div>

// Grid layout
<div className="grid gap-4 md:grid-cols-2">
  <div className="relative overflow-hidden rounded-lg border p-6">
    <Component />
  </div>
</div>

// Dark background (for effects)
<div className="flex justify-center py-12 bg-zinc-950 rounded-lg">
  <Component />
</div>
```

### Code Blocks

```tsx
<pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
  {`code here`}
</pre>
```

### Props Tables

```tsx
<div className="overflow-x-auto">
  <table className="w-full text-sm">
    <thead>
      <tr className="border-b">
        <th className="text-left py-3 px-4 font-semibold">Prop</th>
        <th className="text-left py-3 px-4 font-semibold">Type</th>
        <th className="text-left py-3 px-4 font-semibold">Default</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b">
        <td className="py-3 px-4 font-mono">propName</td>
        <td className="py-3 px-4 font-mono text-muted-foreground">type</td>
        <td className="py-3 px-4 font-mono">default</td>
      </tr>
    </tbody>
  </table>
</div>
```

## InstallCommand Usage

```tsx
// Standard - generates commands for all package managers
<InstallCommand packageName="https://gooseui.pro/r/component-name.json" />

// Custom commands
<InstallCommand
  packageName=""
  commands={{
    npm: "npx shadcn@latest add @gooseui/button @gooseui/card",
    pnpm: "pnpm dlx shadcn@latest add @gooseui/button @gooseui/card",
    yarn: "npx shadcn@latest add @gooseui/button @gooseui/card",
    bun: "bunx --bun shadcn@latest add @gooseui/button @gooseui/card",
  }}
/>
```

## Build Registry

After adding component, build the registry:

```bash
pnpm registry:build
```

## Toast Notifications for Button Interactions

When demonstrating button functionality, use toast notifications instead of console.log or alerts:

```tsx
"use client"

import { customToast } from "@/lib/toast"
import { Button } from "@/registry/new-york/ui/button"

export function ButtonDemo() {
  return (
    <Button onClick={() => customToast.success("Button clicked!")}>
      Click me
    </Button>
  )
}
```

### Toast Types

```tsx
import { customToast } from "@/lib/toast"

// Success toast
customToast.success("Action completed!")

// Error toast
customToast.error("Something went wrong")

// Warning toast
customToast.warning("Please check your input")

// Info toast
customToast.info("New feature available")

// With description
customToast.success("Saved!", { description: "Your changes have been saved." })

// With custom duration (ms)
customToast.info("Quick message", { duration: 2000 })
```

### Interactive Demo Example

For component pages with interactive examples, create a separate client component:

```tsx
// app/(docs)/docs/components/button/button-demo.tsx
"use client"

import { customToast } from "@/lib/toast"
import { Button } from "@/registry/new-york/ui/button"

export function ButtonVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button onClick={() => customToast.success("Primary clicked!")}>
        Primary
      </Button>
      <Button
        variant="secondary"
        onClick={() => customToast.info("Secondary clicked!")}
      >
        Secondary
      </Button>
      <Button
        variant="destructive"
        onClick={() => customToast.error("Destructive clicked!")}
      >
        Destructive
      </Button>
    </div>
  )
}
```

Then import in page:

```tsx
// app/(docs)/docs/components/button/page.tsx
import { ButtonVariantsDemo } from "./button-demo"

// In JSX:
<div className="rounded-lg border p-6">
  <ButtonVariantsDemo />
</div>
```

## Valid Navigation Routes

Only link to existing pages. Current valid routes:

### Documentation
- `/docs` - Documentation home
- `/docs/installation` - Installation guide
- `/docs/cli` - CLI usage

### Components
- `/docs/components` - Components index
- `/docs/components/button`
- `/docs/components/card`
- `/docs/components/input`
- `/docs/components/toast`
- `/docs/components/animated-timer`

### Effects
- `/docs/effects/border-beam`

### Navigation Chain

When adding a new component, update the navigation chain:

```
button → card → input → animated-timer → [NEW COMPONENT]
```

Update `prevHref` and `nextHref` accordingly:

```tsx
// New component page
<DocsPageNav
  title="New Component"
  prevHref="/docs/components/animated-timer"
  // nextHref - leave empty if last
/>

// Previous component (animated-timer) - add nextHref
<DocsPageNav
  title="Animated Timer"
  prevHref="/docs/components/input"
  nextHref="/docs/components/new-component"
/>
```

## Step 6: Add to Sidebar Navigation

Update `components/docs-sidebar.tsx` to add the new component:

```tsx
// components/docs-sidebar.tsx
const docsNavConfig: NavSection[] = [
  // ...
  {
    title: "Components",
    href: "/docs/components",
    items: [
      // ... existing items
      { title: "New Component", href: "/docs/components/new-component", isNew: true },
    ],
  },
  // ...
]
```

**Options:**
- `title` - Display name in sidebar
- `href` - Link to documentation page
- `isNew` - Shows "NEW" badge (optional)

## Checklist

- [ ] Component created in `registry/new-york/{type}/`
- [ ] Entry added to `registry.json`
- [ ] Documentation page created with all sections
- [ ] All h2 elements have `id` attributes for TOC
- [ ] Interactive examples use `customToast` for feedback
- [ ] Links only point to existing routes
- [ ] Component added to components index page
- [ ] **Component added to sidebar** (`components/docs-sidebar.tsx`)
- [ ] Navigation links updated (prev/next)
- [ ] Registry built with `pnpm registry:build`
