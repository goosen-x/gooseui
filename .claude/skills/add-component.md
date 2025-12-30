# Adding New Components to GooseUI

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

### 5. Update Sidebar Navigation

Edit `lib/config/navigation.ts` to add the component to the sidebar.

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

1. Run `pnpm build` to verify no errors
2. Check that "Open in v0" opens with correct registry URL
3. Verify component appears in sidebar navigation
