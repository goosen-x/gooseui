# GooseUI - shadcn/ui Registry

Custom component library based on shadcn/ui with additional UI components and effects.

## CRITICAL: Adding New Components

**ALWAYS use the skill when adding components:**

```
@.claude/skills/add-component.md
```

### Mandatory Checklist (DO NOT SKIP!)

1. Create the file in `registry/gooseui/{ui|effects|hooks|lib}/`
2. Add the item to `registry.json`
3. Add it to `lib/config/registry.ts` (`REGISTRY_ITEMS`)
4. Create the docs page in `app/[locale]/(docs)/docs/{components|effects|hooks}/{slug}/page.tsx`, in two languages (en + ru), with TOC IDs on all h2 elements
5. **Add it to navigation: `lib/config/docs-navigation.ts`** ← OFTEN FORGOTTEN! Set `category` to a group id
6. Add `card-preview.tsx` next to the page (default export, no props) and run `node scripts/generate-card-previews.mjs`
7. Run `pnpm registry:build`

### Navigation and groups

`lib/config/docs-navigation.ts` is the single source for the sidebar, catalogs, breadcrumbs and search.
The catalogs and the sidebar group items by `category`:

- components: `COMPONENT_GROUPS` — Inputs, Display, Data, Media, Feedback, Navigation, Overlay, Layout, Marketing, Utilities
- effects: `EFFECT_GROUPS` — Text, Scroll, Decor, Interaction
- hooks: `"Hooks"` (no groups, no card preview)

```typescript
{
  slug: "new-component",
  title: "New Component",
  href: "/docs/components/new-component",
  description: { en: "…", ru: "…" },
  category: "Inputs",
  icon: Square,
  isNew: true,
  keywords: ["…"],
}
```

### Registry rules

- No `next/*` or `next-intl` imports in `registry/**`, default texts in English and overridable via props
- Colors only through shadcn tokens, keyframes inside the component (`<style href precedence>`), no new npm dependencies without a reason
- Items that depend on other GooseUI items list them as `@gooseui/{slug}` in `registryDependencies`


## Documentation Structure

**IMPORTANT:** All documentation MUST follow the structure defined in:
- `app/[locale]/(docs)/docs/STRUCTURE.md` — full documentation standards
- `app/[locale]/(docs)/docs/components/_TEMPLATE.tsx` — template for new components
- `app/[locale]/(docs)/docs/hooks/use-now/page.tsx` — reference page for a hook (Parameters / Returns instead of Props)

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
- Use `<InstallCommand packageName="@gooseui/{name}" />`
- Use `<DocsPageNav title="..." prevHref="..." nextHref="..." />`
- Interactive demos should use `customToast` from `@/lib/toast`

## Registry

GooseUI is an official shadcn registry. Install components with:
```bash
npx shadcn@latest add @gooseui/{name}
```
