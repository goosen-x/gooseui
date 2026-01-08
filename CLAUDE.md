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

## Documentation Structure

**IMPORTANT:** All documentation MUST follow the structure defined in:
- `app/(docs)/docs/STRUCTURE.md` — full documentation standards
- `app/(docs)/docs/components/_TEMPLATE.tsx` — template for new components

### Section Order (STRICT)

1. **DocsPageNav** — title and navigation
2. **Description** — short component description
3. **Browser Support** — BaselineStatus (if uses modern APIs) ← AT THE TOP!
4. **Preview** — interactive demo (id="preview")
5. **Installation** — InstallCommand (id="installation")
6. **Usage** — basic code example (id="usage")
7. **Examples** — use cases with code (id="examples")
8. **Props** — properties table with 4 columns (id="props")
9. **[Components]** — for compound components (optional)
10. **[Features]** — feature list (optional)
11. **[Hook]** — hook documentation (optional)
12. **[References]** — external links (optional)

### Reference Example

See `morphing-dialog/page.tsx` as the reference implementation.

### Style Standards

- Container: `space-y-8`
- Preview background: `bg-muted/30 rounded-lg`
- Props table: 4 columns (Prop, Type, Default, Description)
- Table header: `bg-muted`, `p-3`, `font-medium`

## Important Notes

- All h2 elements in docs MUST have `id` attributes for Table of Contents
- Use `<InstallCommand packageName="https://gooseui.pro/r/{name}.json" />`
- Use `<DocsPageNav title="..." prevHref="..." nextHref="..." />`
- Interactive demos should use `customToast` from `@/lib/toast`

## Registry URL

Components are served from: `https://gooseui.pro/r/{name}.json`
