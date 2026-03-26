# Remove Auth, Supabase & Paddle from GooseUI

**Date:** 2026-03-26
**Goal:** Simplify GooseUI to a pure component library docs site + blocks library by removing authentication, database, and payment infrastructure.

## What Stays

- **Docs** — components, effects, experimental pages
- **Blocks** — block library, categories, previews
- **Registry** — `npx shadcn@latest add @gooseui/...` installation
- **Landing** — main marketing page (without pricing section and auth CTAs)
- **Legal** — privacy, terms, refund pages

## What Gets Deleted

### Routes (full removal)

| Path | Reason |
|------|--------|
| `app/(auth)/` | Login, signup pages |
| `app/(app)/` | Entire route group (layout imports from generate) |
| `app/account/` | Account management |
| `app/dashboard/` | User dashboard |
| `app/auth/callback/` | OAuth callback handler |
| `app/api/` | All API routes (checkout, projects, webhooks, customer-portal) |
| `app/(marketing)/pricing/` | Pricing page |

### Infrastructure

| Path | Reason |
|------|--------|
| `proxy.ts` | Auth middleware / route protection |
| `lib/supabase/` | Supabase client, types, schema |
| `lib/payments/` | Paddle SDK, plan definitions |
| `lib/generate/` | Code generation logic (including export/ subdirectory) |
| `lib/constructor/` | Constructor logic |
| `goosetap/` | Payment-related module |
| `scripts/check-db.mjs` | DB inspection utility |
| `instrumentation-client.ts` | PostHog initialization |

### Components

| Path | Reason |
|------|--------|
| `components/generate/` | Generator UI |
| `components/constructor/` | Constructor interface |
| `components/app-sidebar.tsx` | Only used by dashboard (dead code) |
| `components/posthog-provider.tsx` | PostHog provider |
| `components/posthog-pageview.tsx` | PostHog pageview tracker |
| Pricing section in landing | No plans to sell |

### Hooks

| Hook | Reason |
|------|--------|
| `use-subscription.ts` | Subscription/plan checking |
| `use-user.ts` | Auth state management |
| `use-feature-access.ts` | Depends on payments/plans and subscription |
| `use-editor-shortcuts.ts` | Depends on generate store |

### Dependencies (package.json)

- `@supabase/ssr`
- `@supabase/supabase-js`
- `@paddle/paddle-js`
- `@paddle/paddle-node-sdk`
- `posthog-js`
- `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` (only used in generate)
- `immer` (only used in generate store)
- `zundo` (only used in generate store)
- `zustand` (verify no other usage before removing)

### Environment Variables

- All `SUPABASE_*` variables
- All `PADDLE_*` variables
- All `POSTHOG_*` variables

## What Gets Modified (not deleted)

### Root Layout (`app/layout.tsx`)
- Remove Supabase/Paddle/PostHog providers and initializers

### Landing Page (`app/(marketing)/page.tsx`)
- Remove pricing section
- Remove "Sign up" / "Get started" CTAs that link to auth
- Replace auth CTAs with docs/blocks links

### Navigation (`lib/config/navigation.ts`, `components/site/`)
- Remove links to: login, signup, pricing, account, generate, dashboard

### Sitemap (`app/sitemap.ts`)
- Remove `/pricing` entry

### Sidebars
- `components/docs-sidebar.tsx` — remove Pricing link
- `components/blocks/blocks-sidebar.tsx` — remove Pricing link

### Docs components with PostHog
- `components/docs/docs-page-nav.tsx` — remove `usePostHog` tracking
- `components/docs/install-command.tsx` — remove `usePostHog` tracking

### Docs pages with pricing references
- `app/(docs)/docs/components/promo-banner/page.tsx` — update `ctaHref="/pricing"` to valid href

### Environment files
- `.env.local` — remove Supabase/Paddle/PostHog variables

## Implementation Order

1. Delete route directories (`app/(auth)`, `app/(app)`, `app/account`, `app/dashboard`, `app/auth`, `app/api`, `app/(marketing)/pricing`)
2. Delete component directories (`components/generate`, `components/constructor`, `components/app-sidebar.tsx`, PostHog components)
3. Delete lib directories (`lib/supabase`, `lib/payments`, `lib/generate`, `lib/constructor`)
4. Delete hooks (`use-subscription`, `use-user`, `use-feature-access`, `use-editor-shortcuts`)
5. Delete infrastructure (`proxy.ts`, `goosetap/`, `scripts/check-db.mjs`, `instrumentation-client.ts`)
6. Modify remaining files (layout, sitemap, sidebars, navigation, docs components)
7. Remove dependencies from `package.json` and run `pnpm install`
8. Run `pnpm build` to verify no breakage

## Out of Scope

- Refactoring existing component docs
- Changing the registry build process
- Modifying block components themselves
- Redesigning the landing page beyond removing auth/pricing references
