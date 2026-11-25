---
name: add-component
description: Use when adding anything to the GooseUI registry. Triggers - "добавь компонент", "новый компонент", "новый эффект", "новый хук", "черновой компонент", "add a component / effect / hook", "draft component". Covers the registry item, docs page (en + ru), navigation, card preview, browser-support checks, draft review and final verification.
allowed-tools: Read, Write, Edit, Grep, Glob, Bash
---

# Adding a component, effect or hook to GooseUI

Everything below is checked against the code. Do the steps in order and do not skip any: each one has been forgotten before. New items start as **drafts** (hidden in production) and go live only after the owner accepts them.

Item kinds:

| Kind | Source | Docs folder | Nav section / category | registry type | REGISTRY_ITEMS type |
|---|---|---|---|---|---|
| component | `registry/gooseui/ui/{slug}.tsx` | `components/` | `components`, one of `COMPONENT_GROUPS` | `registry:ui` | `component` |
| effect | `registry/gooseui/effects/{slug}.tsx` | `effects/` | `effects`, one of `EFFECT_GROUPS` | `registry:ui` | `effect` |
| hook | `registry/gooseui/hooks/{slug}.ts` | `hooks/` | `hooks`, category `"Hooks"` | `registry:hook` | `hook` |

`lib` helpers live in `registry/gooseui/lib/` (`registry:lib`). There is no `experimental/` folder and no `isExperimental` flag.

## Rules for code in `registry/**`

- No `next/*` or `next-intl` imports. Default texts are English and overridable via props.
- Colors only through shadcn tokens (`bg-background`, `text-muted-foreground`, ...). No hard-coded colors.
- Minimum client JS. Write a server component while that is possible (CSS, `:has()`, popover, anchor positioning, `<details>`, native elements). If JS is unavoidable, put it in a small `{slug}.client.tsx` ("use client") island that the server file imports; see `select.tsx` + `select.client.tsx`. Never mark the whole component client without a reason.
- Keyframes and component CSS go inside the component: `<style href="gooseui-{slug}" precedence="default">{STYLES}</style>`. No dependency on `use-global-styles`.
- Every animation has an `@media (prefers-reduced-motion: reduce)` branch.
- Keyboard and ARIA: real roles/labels, visible focus, full keyboard operation, no focus traps without Escape.
- `cursor: pointer` on every clickable element (buttons, links, cards, interactive blocks).
- Every horizontally scrollable area (tables, carousels, rows of cards, "narrow container" demos) must be easy to scroll with a mouse on desktop: round arrow buttons (`Button` from the registry) on the edges of the scroll area, vertically centred, shown only when there is more content in that direction; a gradient fade over the edge that hides content (`pointer-events: none`, the arrow sits on top); a visible thin scrollbar (`scrollbar-width: thin`, `scrollbar-color` from tokens, `::-webkit-scrollbar` with a height so macOS does not hide it). Do not hijack the vertical wheel for horizontal scrolling (no `useHorizontalWheel` there): Shift+wheel and trackpads already work natively. Check it with a mouse at desktop width.
- No new npm dependencies without a clear reason; list real ones in `dependencies`.
- Items that use other GooseUI items import them via `@/registry/gooseui/...` and list them in `registryDependencies` as `@gooseui/{slug}`.
- No Cyrillic in registry source, no `alert/confirm/prompt` (use `customToast` from `@/lib/toast` in demos). `scripts/check-components.mjs` flags both.

## Rules for demos and docs

- Demos, card previews and docs use only components from `registry/gooseui/ui` (Button, Input, Checkbox, ...). No hand-made buttons, checkboxes, inputs.
- No synthesized media (no `say` audio, generated pictures or code-drawn fonts). Use live stock photos/videos.
- All visible texts exist in en and ru. The English page must contain no Cyrillic.
- Clickable elements in demos also get `cursor: pointer`.

## Checklist

1. **Component file** in `registry/gooseui/{ui|effects|hooks|lib}/`. Follow the rules above.
2. **Registry item** in `registry.drafts.json` (not `registry.json`):
   ```json
   {
     "name": "slug",
     "type": "registry:ui",
     "title": "Title",
     "description": "One sentence, English.",
     "dependencies": [],
     "registryDependencies": [],
     "files": [{ "path": "registry/gooseui/ui/slug.tsx", "type": "registry:ui" }]
   }
   ```
   List every file, including `slug.client.tsx`. Hooks use `registry:hook` for item and file.
3. **Review manifest** `review/manifests/{slug}.json`: `slug`, `verdict` (e.g. `css-only`, `css-first`), `client` (bool), `jsBefore`/`jsAfter` (null for new items), `dependencies`, `registryDependencies`, `files`, `features` (web-features ids used), `breaking` (list), `how: { en, ru }` (one line each). Copy `review/manifests/select.json` or `avatar-group.json`.
4. **Docs page** `app/[locale]/(docs)/docs/{components|effects|hooks}/{slug}/page.tsx`. Start from `components/_TEMPLATE.tsx` (see below). Reference pages: `components/morphing-dialog/page.tsx`; for hooks `hooks/use-now/page.tsx` (Parameters / Returns instead of Props, no card preview).
   Put demos in `{slug}-demo.tsx` next to the page ("use client" if they need state).
5. **Navigation** `lib/config/docs-navigation.ts`, in the right section (`components`, `effects`, `hooks`):
   ```ts
   {
     slug: "new-component",
     title: "New Component",            // plain string for components
     href: "/docs/components/new-component",
     description: { en: "…", ru: "…" },
     category: "Inputs",                // a group id; "Hooks" for hooks
     icon: Square,                      // lucide-react, import it at the top
     isNew: true,
     keywords: ["…"],                   // search terms, include synonyms
   }
   ```
   Order in the array drives prev/next links (`DocsPageNav` generates them; never pass `prevHref`/`nextHref`). Do not set `isDraft` by hand: it is computed from `review/decisions.json` (anything not `accepted` is a draft). If a "coming soon" placeholder exists for the slug, replace it.
6. **Card preview**: `card-preview.tsx` next to the page (default export, no props, static markup sized for a small card, no hooks, no network). Then run `node scripts/generate-card-previews.mjs` (rewrites `components/docs/card-previews.generated.tsx` and `card-previews.tsx`). Not for hooks.
7. **Browser support**: see the section below.
8. **Verify**: run the final checks at the bottom.

### Draft, acceptance, publication

- A new slug has no entry in `review/decisions.json`, so in production `proxy.ts` rewrites its docs page to `__unpublished__` (404), and it is hidden from sidebar, catalogs, search and sitemap. In `pnpm dev` it is visible with a "Draft" badge, and `/review` (dev only) shows the review panel.
- Drafts are built separately: `pnpm registry:build:drafts` writes to `public/r-drafts` (gitignored). `pnpm registry:build` and CI never include them.
- Do not add a draft to `lib/config/registry.ts` (`REGISTRY_ITEMS`): its `/r/{slug}.json` does not exist yet.
- Do not mark an item accepted yourself and do not push to production. Only the owner accepts, in `/review` (it writes `status: "accepted"` to `review/decisions.json`). Hand the draft over for review and stop.
- After acceptance (only when asked):
  1. Move the item from `registry.drafts.json` to `registry.json`.
  2. Add `{ slug, name, type }` to `REGISTRY_ITEMS` in `lib/config/registry.ts`.
  3. `pnpm registry:build` (updates tracked `public/r/*.json`), commit those files.
  4. Confirm `decisions.json` has `"status": "accepted"` for the slug.

## Docs page template

Taken from `_TEMPLATE.tsx`; copy the file and replace names. Strict section order: DocsPageNav, description, Browser Support (only if the component uses modern APIs), Preview, Installation, Usage, Examples, Props, then optional Components / Features / Hook / References.

- Texts live in `const content: Dict<typeof en> = { en, ru }` (English is the source, `Dict` forces the same shape in ru). `Dict` is from `@/i18n/dict`, `Locale` from `@/i18n/routing`.
- `type Props = { params: Promise<{ locale: string }> }`; call `setRequestLocale(locale)` in the page; export `generateMetadata` returning `{ title, description }`.
- Build `toc` inside the page from the dictionary; every h2 has an `id` matching the toc (`browser-support`, `preview`, `installation`, `usage`, `examples`, `props`). Same ids in both languages.
- Container `space-y-8`; h2 class `scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight`; preview box `flex justify-center py-12 bg-muted/30 rounded-lg` (examples use `py-8`).
- `<DocsPageNav title={t.title} />` with title only.
- `<InstallCommand packageName="@gooseui/{slug}" />`. Code in `CodeBlock` is not translated.
- Props table: 4 columns (Prop, Type, Default, Description), header `bg-muted`, cells `p-3`, header `font-medium`; or `DocsPropsTable` from `@/components/docs`, which translates its own headings.
- Internal links use `Link` from `@/i18n/navigation`, never `next/link`.
- Do not use `DocsBrowserSupport`: it does not exist. `DocsSection` and `DocsPreview` exist in `components/docs/` but the template writes the markup directly; follow the template.

```tsx
import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"

type Props = { params: Promise<{ locale: string }> }

const en = { title: "…", description: "…", intro: "…", browserSupport: "Browser Support",
  browserFeatureDescription: "…", preview: "Preview", installation: "Installation",
  usage: "Usage", examples: "Examples", props: "Props" /* …all other texts */ }

const content: Dict<typeof en> = { en, ru: { /* same keys in Russian */ } as typeof en }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: t.title, description: t.description }
}

export default async function SlugPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
  const toc = [/* { id: "preview", title: t.preview, level: 2 }, … */]
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title={t.title} />
        <p className="text-muted-foreground">{t.intro}</p>
        <BrowserSupport title={t.browserSupport} features={[{ featureId: "…", description: t.browserFeatureDescription }]} />
        {/* Preview / Installation / Usage / Examples / Props blocks exactly as in _TEMPLATE.tsx */}
      </div>
    </DocsPage>
  )
}
```

Open `_TEMPLATE.tsx` for the full blocks; do not retype them from memory.

## Browser support

- Add a `BrowserSupport` section (top of the page, before Preview) when the component uses a modern or not-yet-Baseline API. `featureId` is a web-features id (webstatus.dev). Do not translate or invent the feature name: it comes from webstatus.dev; `name` is only an English override, identical in both languages. `description` is component-specific and goes in both dictionaries; mention any fallback there.
- The section renders collapsed: a one-line summary (worst Baseline status, feature count, "Your browser supports everything" / "does not support: X, Y") with a "Details" toggle that opens the full table. Props are unchanged; the summary is built automatically from `features`, so keep descriptions short enough for the table, not the summary.
- The "Your browser" column shows the visitor's real support. It works only if `registry/gooseui/lib/baseline-checks.ts` (`BASELINE_CHECKS`) has an entry for the `featureId`; otherwise the cell shows a dash. For every `featureId` you list, add a check there: `css: [property, value]`, `selector: ":has(*)"`, or `test: () => boolean`, plus a `label`. It must be a real detection (`CSS.supports`, prototype/API probe, parsed rule), never a user-agent guess; verify against MDN.
- If a feature genuinely cannot be detected honestly, set `browserCheck: false` on that feature entry (hides the line) and say why in the PR/report.
- Put the same ids in `features` of the review manifest.
- `pnpm check:browser` (`scripts/check-browser-checks.mjs`, runs in CI) verifies that every `featureId` used in docs has a check. It is mandatory.

## Final verification (run all, fix, rerun)

```bash
pnpm typecheck
pnpm lint                                   # biome check; pnpm lint:fix to auto-fix
pnpm check:browser                          # featureId coverage in baseline-checks.ts
pnpm validate:nav                           # navigation matches existing pages, no duplicate slugs/hrefs
node scripts/generate-card-previews.mjs     # then git status: generated files updated
pnpm registry:build:drafts                  # draft items build into public/r-drafts
pnpm registry:build                         # must still pass (CI runs it)
node scripts/measure-js.mjs                 # client JS size; compare with the manifest (accepted items only: it reads registry.json)
```

Then in `pnpm dev` open the page and check:

- `/docs/{section}/{slug}` and `/ru/docs/{section}/{slug}`: no console errors, no hydration warnings, no Cyrillic on the English page, the Russian page fully translated.
- Light and dark theme (all colors via tokens, nothing unreadable).
- Mobile width (about 375 px): no horizontal scroll, tables scroll inside their container, the browser-support summary stays tidy (wraps to two lines) and its opened table renders as cards.
- Keyboard only: Tab order, focus ring, Enter/Space/Escape/arrows as appropriate.
- `prefers-reduced-motion: reduce` disables motion.
- The component appears in the catalog (`/docs/components`, `/docs/effects`) with its card preview, in the sidebar group, in search, and prev/next links work.
- The "Your browser" column shows a result, not a dash.

`scripts/check-components.mjs` (`pnpm test:components`) audits accepted items in `registry.json` with Playwright (imports, dialogs, overflow, axe, screenshots); it needs a server on localhost:3003 and skips drafts, so for drafts rely on the manual checks above.

Report to the owner: files created, registry item and manifest, the `featureId`s and their checks, and the commands you ran with results. Do not commit or push unless asked.
