---
name: add-component
description: Creates new components for GooseUI library with proper registry, documentation, and styling. Use when adding new UI components, effects, or blocks.
allowed-tools: Read, Write, Edit, Grep, Glob, Bash
---

# Adding New Components to GooseUI

> **IMPORTANT:** Always use this skill when adding new components!

## Quick Checklist

1. [ ] `registry/new-york/{type}/{slug}.tsx` — component
2. [ ] `public/r/{slug}.json` — registry JSON
3. [ ] `lib/config/registry.ts` — add to REGISTRY_ITEMS
4. [ ] `lib/config/docs-navigation.ts` — add to navigation
5. [ ] `app/(docs)/docs/{type}/{slug}/page.tsx` — docs page
6. [ ] `app/(docs)/docs/{type}/page.tsx` — add to catalog (if applicable)
7. [ ] `pnpm validate:nav` — validate navigation

**Component types:** `ui`, `effects`, `blocks`

---

## Documentation Components

Use these pre-built components for consistent documentation:

```tsx
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { DocsBrowserSupport } from "@/components/docs/docs-browser-support"
import { DocsPreview } from "@/components/docs/docs-preview"
import { DocsSection } from "@/components/docs/docs-section"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
```

---

## Complete Docs Page Template

> **Reference:** See `morphing-dialog/page.tsx` as the canonical example

```tsx
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { DocsBrowserSupport } from "@/components/docs/docs-browser-support"
import { DocsPreview } from "@/components/docs/docs-preview"
import { DocsSection } from "@/components/docs/docs-section"
import { DocsPropsTable } from "@/components/docs/docs-props-table"

export const metadata = {
  title: "Component Name",
  description: "Short description for SEO",
}

export default function ComponentNamePage() {
  return (
    <div className="space-y-8">
      {/* 1. Navigation - prev/next auto-generated from docs-navigation.ts */}
      <DocsPageNav title="Component Name" />

      {/* 2. Description */}
      <p className="text-muted-foreground">
        Component description here.
      </p>

      {/* 3. Browser Support (if uses modern APIs) */}
      <DocsBrowserSupport features={{ featureId: "feature-id", browserCheck: "feature-id" }}>
        Description of browser support and graceful degradation.
      </DocsBrowserSupport>

      {/* For multiple features: */}
      {/* <DocsBrowserSupport features={[
        { featureId: "feature-1", browserCheck: "feature-1" },
        { featureId: "feature-2", browserCheck: "feature-2" },
      ]}> */}

      {/* 4. Preview */}
      <DocsPreview description="Description of the demo.">
        <ComponentDemo />
      </DocsPreview>

      {/* 5. Installation */}
      <DocsSection id="installation" title="Installation">
        <InstallCommand packageName="https://gooseui.pro/r/component-name.json" />
      </DocsSection>

      {/* 6. Usage */}
      <DocsSection id="usage" title="Usage">
        <CodeBlock>{`import { ComponentName } from "@/components/ui/component-name"

export default function Page() {
  return <ComponentName />
}`}</CodeBlock>
      </DocsSection>

      {/* 7. Examples (optional) */}
      <DocsSection id="examples" title="Examples">
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-3">Example Title</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Description of this example.
            </p>
            <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
              {/* Demo component */}
            </div>
            <CodeBlock className="mt-4">{`<ComponentName variant="example" />`}</CodeBlock>
          </div>
        </div>
      </DocsSection>

      {/* 8. Props */}
      <DocsPropsTable
        props={[
          {
            name: "variant",
            type: "string",
            default: '"default"',
            description: "Style variant",
          },
          {
            name: "className",
            type: "string",
            description: "Additional CSS classes",
          },
        ]}
      />

      {/* 9. Features (optional) */}
      <DocsSection id="features" title="Features">
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">Feature Name</strong> — description
          </li>
        </ul>
      </DocsSection>
    </div>
  )
}
```

---

## Component Structure

### DocsBrowserSupport

```tsx
// Single feature with browser check (RECOMMENDED - like morphing-dialog)
<DocsBrowserSupport features={{ featureId: "view-transitions", browserCheck: "view-transitions" }}>
  View Transitions API is supported in Chrome 111+, Edge 111+, Safari 18+.
</DocsBrowserSupport>

// Multiple features with browser check
<DocsBrowserSupport
  features={[
    { featureId: "container-queries", browserCheck: "container-queries" },
    { featureId: "has", browserCheck: "has" },
  ]}
>
  Combines @container queries with :has() selector.
</DocsBrowserSupport>

// Simple string (NO browser check - avoid this)
<DocsBrowserSupport features="scroll-driven-animations">
  Description text here.
</DocsBrowserSupport>
```

### DocsPreview

```tsx
<DocsPreview description="Click on the card to open the dialog.">
  <MyComponent />
</DocsPreview>
```

### DocsSection

```tsx
<DocsSection id="installation" title="Installation">
  <InstallCommand packageName="..." />
</DocsSection>
```

### DocsPropsTable

```tsx
<DocsPropsTable
  props={[
    { name: "variant", type: "string", default: '"default"', description: "Style variant" },
    { name: "size", type: '"sm" | "md"', default: '"md"', description: "Size" },
  ]}
/>
```

---

## Critical Rules

### NEVER add manual prev/next links

```tsx
// ✅ CORRECT - auto-navigation from docs-navigation.ts
<DocsPageNav title="Component Name" />

// ❌ WRONG - NEVER DO THIS!
<DocsPageNav
  title="Component Name"
  prevHref="/docs/components/prev"
  nextHref="/docs/components/next"
/>
```

Navigation is auto-generated based on the order in `lib/config/docs-navigation.ts`.

### ALWAYS use CodeBlock for code

```tsx
// CORRECT
<CodeBlock>{`const x = 1`}</CodeBlock>

// WRONG - NEVER USE THIS!
<pre><code>{`const x = 1`}</code></pre>
```

### ALWAYS use documentation components

```tsx
// CORRECT - use DocsBrowserSupport
<DocsBrowserSupport features="view-transitions">
  Description here.
</DocsBrowserSupport>

// WRONG - don't manually create sections
<div className="space-y-4">
  <h2 id="browser-support">...</h2>
  <div className="flex gap-2">
    <BaselineStatus />
  </div>
</div>
```

---

## Project Structure

```
registry/new-york/
├── ui/              # UI components (button, input, card)
├── effects/         # Visual effects (border-beam, scroll-progress)
├── blocks/          # Ready-to-use examples
└── lib/             # Utilities (toast.ts)

app/(docs)/docs/
├── components/      # UI component documentation
└── effects/         # Effects documentation

components/docs/     # Documentation components
├── code-block.tsx
├── docs-page-nav.tsx
├── install-command.tsx
├── docs-browser-support.tsx  # Browser support section
├── docs-preview.tsx          # Preview section
├── docs-section.tsx          # Generic section
├── docs-props-table.tsx      # Props table
└── index.ts
```

---

## Registry JSON

Location: `public/r/{slug}.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "component-name",
  "type": "registry:ui",
  "title": "Component Name",
  "description": "Short description of the component.",
  "dependencies": ["lucide-react"],
  "files": [
    {
      "path": "registry/new-york/ui/component-name.tsx",
      "type": "registry:ui"
    }
  ]
}
```

---

## Navigation

Edit `lib/config/docs-navigation.ts`:

```typescript
{
  slug: "component-name",
  title: "Component Name",
  href: "/docs/components/component-name",
  isNew: true,  // Shows "NEW" badge
  // isDraft: true,  // Hidden in production
}
```

---

## Validation

```bash
pnpm validate:nav   # Validate navigation
pnpm build          # Check for errors
```

---

## Registry URL

All URLs follow: `https://gooseui.pro/r/{slug}.json`
