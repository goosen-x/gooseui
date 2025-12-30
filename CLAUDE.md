# GooseUI - shadcn/ui Registry

Custom component library based on shadcn/ui with additional UI components and effects.

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
```

## Commands

```bash
pnpm dev              # Development server
pnpm build            # Production build
pnpm registry:build   # Build shadcn registry
```

## Adding Components

Use the `gooseui-component-creator` skill for adding new components:

```
@.claude/skills/gooseui-component-creator/SKILL.md
```

Key steps:
1. Create component in `registry/new-york/{type}/`
2. Add entry to `registry.json`
3. Create docs page with TOC IDs on all h2 elements
4. Update components index
5. Run `pnpm registry:build`

## Important Notes

- All h2 elements in docs MUST have `id` attributes for Table of Contents
- Use `<InstallCommand packageName="https://gooseui.pro/r/{name}.json" />`
- Use `<DocsPageNav title="..." prevHref="..." nextHref="..." />`
- Standard sections: Preview, Installation, Usage, Examples, Props

## Registry URL

Components are served from: `https://gooseui.pro/r/{name}.json`
