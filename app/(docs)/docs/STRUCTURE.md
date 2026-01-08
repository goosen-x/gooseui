# Documentation Structure

This document defines the standard structure for all component documentation pages in GooseUI.

## File Location

All component documentation should be placed in:
```
app/(docs)/docs/components/{component-name}/page.tsx
```

## Template

Use `_TEMPLATE.tsx` as a starting point for new component documentation:
```
app/(docs)/docs/components/_TEMPLATE.tsx
```

---

## Section Order (STRICT)

Every component documentation page MUST follow this structure:

### Required Sections

| # | Section | ID | Description |
|---|---------|-----|-------------|
| 1 | **DocsPageNav** | - | Title only (prev/next auto-generated from `docs-navigation.ts`) |
| 2 | **Description** | - | Short component description |
| 3 | **Browser Support** | `browser-support` | BaselineStatus (if uses modern APIs) |
| 4 | **Preview** | `preview` | Interactive component demo |
| 5 | **Installation** | `installation` | InstallCommand with registry URL |
| 6 | **Usage** | `usage` | Basic code example |
| 7 | **Examples** | `examples` | Different use cases with code |
| 8 | **Props** | `props` | Properties table |

### Optional Sections (after Props)

| # | Section | ID | When to use |
|---|---------|-----|-------------|
| 9 | **Components** | `components` | For compound components |
| 10 | **Features** | `features` | Notable features list |
| 11 | **Hook** | `hook` | If component exposes a hook |
| 12 | **References** | `references` | External documentation links |

---

## Standards

### Container
```tsx
<div className="space-y-8">
```

### Section Heading
```tsx
<h2
  id="section-id"
  className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
>
  Section Title
</h2>
```

### Preview Background
```tsx
<div className="flex justify-center py-12 bg-muted/30 rounded-lg">
  {/* Component preview */}
</div>
```

### Example Item
```tsx
<div>
  <h3 className="text-lg font-medium mb-3">Example Title</h3>
  <p className="text-sm text-muted-foreground mb-4">
    Description of the example.
  </p>
  <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
    {/* Demo component */}
  </div>
  <CodeBlock className="mt-4">{`<Component prop="value" />`}</CodeBlock>
</div>
```

### Props Table (4 columns)
```tsx
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
        <td className="p-3 font-mono text-xs">propName</td>
        <td className="p-3 font-mono text-xs">string</td>
        <td className="p-3 font-mono text-xs">-</td>
        <td className="p-3">Description text</td>
      </tr>
    </tbody>
  </table>
</div>
```

### Components Table (for compound components)
```tsx
<div className="border rounded-lg overflow-hidden">
  <table className="w-full text-sm">
    <thead className="bg-muted">
      <tr>
        <th className="text-left p-3 font-medium">Component</th>
        <th className="text-left p-3 font-medium">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-t">
        <td className="p-3 font-mono text-xs">ComponentName</td>
        <td className="p-3">Description</td>
      </tr>
    </tbody>
  </table>
</div>
```

### Features List
```tsx
<ul className="list-disc list-inside space-y-2 text-muted-foreground">
  <li>
    <strong className="text-foreground">Feature Name</strong> — description
  </li>
</ul>
```

### Browser Support Section
```tsx
<div className="space-y-4">
  <h2
    id="browser-support"
    className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
  >
    Browser Support
  </h2>
  <BaselineStatus
    featureId="feature-id"
    browserCheck="feature-check"
  />
  <p className="text-sm text-muted-foreground">
    Description of browser support and graceful degradation.
  </p>
</div>
```

---

## Checklist for New Component Documentation

- [ ] Create folder: `components/{name}/page.tsx`
- [ ] Copy from `_TEMPLATE.tsx`
- [ ] Add `DocsPageNav` with title only (prev/next auto-generated!)
- [ ] **Add to `lib/config/docs-navigation.ts`** (required for auto-navigation!)
- [ ] Add Browser Support section (if uses modern APIs)
- [ ] Create demo component: `{name}-demo.tsx` (if needed)
- [ ] All h2 elements have `id` attributes
- [ ] Props table has 4 columns
- [ ] Preview uses `bg-muted/30 rounded-lg`

### Navigation (IMPORTANT!)

**Do NOT add manual `prevHref`/`nextHref` props to DocsPageNav!**

Navigation links are automatically generated from `lib/config/docs-navigation.ts`.

```tsx
// ✅ CORRECT - auto-navigation
<DocsPageNav title="Component Name" />

// ❌ WRONG - manual links (don't do this!)
<DocsPageNav
  title="Component Name"
  prevHref="/docs/components/prev"
  nextHref="/docs/components/next"
/>
```

When adding a new component:
1. Add entry to `lib/config/docs-navigation.ts` in the correct section
2. The order in the navigation config determines prev/next links

---

## Reference Example

See `morphing-dialog/page.tsx` as the reference implementation for documentation structure.
