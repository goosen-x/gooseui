# Adding New Components to GooseUI

> **IMPORTANT:** Always use this skill when adding new components! Do not create components manually without following this checklist.

## Quick Checklist

When adding a new component, follow these steps:

### 1. Add to Registry Config

Edit `lib/config/registry.ts` and add your component:

```typescript
export const REGISTRY_ITEMS: RegistryItem[] = [
  // ... existing items
  { slug: "my-component", name: "My Component", type: "component" },
]
```

**Fields:**
- `slug`: URL path segment (e.g., "my-component" for `/docs/components/my-component`)
- `name`: Display name
- `type`: "component" | "effect" | "hook" | "lib"
- `registryFile`: Optional custom filename if different from `{slug}.json`

### 2. Create Component Files

```
registry/new-york/ui/my-component.tsx    # Component code
app/(docs)/docs/components/my-component/
  page.tsx                                # Docs page
  my-component-demo.tsx                   # Interactive demos (if needed)
```

### 3. Create Registry JSON

Create `public/r/my-component.json` with shadcn registry format:

```json
{
  "name": "my-component",
  "type": "registry:ui",
  "files": [
    {
      "path": "ui/my-component.tsx",
      "type": "registry:ui"
    }
  ],
  "dependencies": ["@radix-ui/react-slot"],
  "devDependencies": [],
  "tailwind": {}
}
```

### 4. Create Docs Page

```tsx
// app/(docs)/docs/components/my-component/page.tsx
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { MyComponent } from "@/registry/new-york/ui/my-component"

export const metadata = {
  title: "My Component",
  description: "Description of my component",
}

export default function MyComponentPage() {
  return (
    <div className="space-y-6">
      {/* DocsPageNav auto-derives registryUrl from pathname */}
      <DocsPageNav
        title="My Component"
        prevHref="/docs/components/previous"
        nextHref="/docs/components/next"
      />

      {/* Install command uses same URL pattern */}
      <InstallCommand packageName="https://gooseui.pro/r/my-component.json" />

      {/* Component preview and examples */}
    </div>
  )
}
```

### 5. Update Navigation Config (Single Source of Truth)

Edit **`lib/config/docs-navigation.ts`** — the unified navigation config:

```typescript
// lib/config/docs-navigation.ts
export const docsNavigation: NavSection[] = [
  // ...
  {
    title: "Components",
    slug: "components",
    href: "/docs/components",
    items: [
      // ... existing items
      {
        slug: "my-component",
        title: "My Component",
        href: "/docs/components/my-component",
        isNew: true,
      },
    ],
  },
]
```

**Required fields:**
- `slug`: URL path segment (used for breadcrumbs and search)
- `title`: Display name
- `href`: Full URL path

This config is the **single source of truth** for:
- Sidebar navigation (`components/docs-sidebar.tsx`)
- Breadcrumbs (`components/docs-header-nav.tsx`)
- Site search (`components/site/site-search.tsx`)

#### Draft Components

Use `isDraft: true` to hide components in production while keeping them visible in development:

```typescript
{
  slug: "my-component",
  title: "My Component",
  href: "/docs/components/my-component",
  isNew: true,
  isDraft: true,
},
```

- **Development:** Shows with orange "DRAFT" badge
- **Production:** Hidden from sidebar and search completely

When ready for release, simply remove `isDraft: true`.

#### Validate Navigation

After adding a component, run the validation script:

```bash
pnpm validate:nav
```

This checks:
- All navigation items have corresponding pages
- No duplicate slugs or hrefs
- All hrefs are valid paths

### 6. Baseline Features (if needed)

Add only if the component uses **modern CSS/JS features** worth documenting:

| Tailwind class | Feature ID | Status |
|----------------|------------|--------|
| `snap-x`, `snap-mandatory` | scroll-snap | Widely 2022 |
| `@container` | container-queries | Widely 2023 |
| `anchor-*` | anchor-positioning | Limited |
| `popover` | popover | Newly 2024 |
| `view-transition-*` | view-transitions | Limited |

**If the component uses such features:**

1. Add to `lib/config/baseline-features.ts`:
```typescript
export const COMPONENT_BASELINE_FEATURES: Record<string, string[]> = {
  // ...existing
  "my-component": ["scroll-snap"],
}
```

2. Add `<ComponentBaseline slug="my-component" />` to the docs page:
```tsx
import { ComponentBaseline } from "@/components/docs/component-baseline"

export default function MyComponentPage() {
  return (
    <div className="space-y-8">
      {/* ... other sections ... */}
      <ComponentBaseline slug="my-component" />
    </div>
  )
}
```

**If component only uses flexbox/transitions** — skip this step (98%+ support).

---

## Auto-Generated Features

When you add a component to `lib/config/registry.ts`:

1. **"Open in v0"** button automatically works
2. **"Open in Claude/ChatGPT/T3 Chat"** buttons copy context
3. **Registry URL** is auto-derived from pathname

## Registry URL Pattern

All registry URLs follow this pattern:
```
https://gooseui.pro/r/{slug}.json
```

For custom filenames (e.g., toast uses sonner.json):
```typescript
{ slug: "toast", name: "Toast", type: "component", registryFile: "sonner.json" }
```

## Testing

1. Run `pnpm validate:nav` to check navigation consistency
2. Run `pnpm build` to verify no errors
3. Check that "Open in v0" opens with correct registry URL
4. Verify component appears in:
   - Sidebar navigation
   - Breadcrumbs (correct title case)
   - Site search (Cmd+K)
