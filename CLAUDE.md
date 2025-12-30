# GooseUI - shadcn/ui Registry

Custom component library based on shadcn/ui with additional UI components and effects.

## CRITICAL: Adding New Components

**ALWAYS use the skill when adding components:**

```
@.claude/skills/gooseui-component-creator/SKILL.md
```

### Mandatory Checklist (DO NOT SKIP!)

1. Create component in `registry/new-york/{type}/`
2. Add entry to `registry.json` or `public/r/{name}.json`
3. Add to `lib/config/registry.ts`
4. Create docs page with TOC IDs on all h2 elements
5. **Add to sidebar: `components/docs-sidebar.tsx`** ← OFTEN FORGOTTEN!
6. Update components index page
7. Run `pnpm registry:build`

### Sidebar Location

```typescript
// components/docs-sidebar.tsx - NOT lib/config/navigation.ts!
const docsNavConfig: NavSection[] = [
  {
    title: "Components",
    items: [
      { title: "New Component", href: "/docs/components/new", isNew: true },
    ],
  },
]
```

## Project Structure

```
registry/new-york/    # Components source
  ui/                 # Base UI components
  effects/            # Visual effects
  blocks/             # Ready examples
  lib/                # Utilities

app/(docs)/docs/      # Documentation
  components/         # Component docs
  effects/            # Effects docs

components/
  docs-sidebar.tsx    # ← SIDEBAR NAVIGATION CONFIG HERE!
```

## Commands

```bash
pnpm dev              # Development server
pnpm build            # Production build
pnpm registry:build   # Build shadcn registry
```

## Important Notes

- All h2 elements in docs MUST have `id` attributes for Table of Contents
- Use `<InstallCommand packageName="https://gooseui.pro/r/{name}.json" />`
- Use `<DocsPageNav title="..." prevHref="..." nextHref="..." />`
- Standard sections: Preview, Installation, Usage, Examples, Props
- Interactive demos should use `customToast` from `@/lib/toast`

## Registry URL

Components are served from: `https://gooseui.pro/r/{name}.json`
