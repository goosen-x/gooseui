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
| `app/(app)/generate/` | Code generator (requires auth + projects) |
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
| `lib/generate/` | Code generation logic |
| `lib/constructor/` | Constructor logic |
| `goosetap/` | Payment-related module |
| `scripts/check-db.mjs` | DB inspection utility |

### Components

| Path | Reason |
|------|--------|
| `components/generate/` | Generator UI |
| `components/constructor/` | Constructor interface |
| Pricing section in landing | No plans to sell |

### Hooks

| Hook | Reason |
|------|--------|
| `use-subscription.ts` | Subscription/plan checking |
| `use-user.ts` | Auth state management |
| Any other auth-dependent hooks | No auth system |

### Dependencies (package.json)

- `@supabase/ssr`
- `@supabase/supabase-js`
- `@paddle/paddle-js`
- `@paddle/paddle-node-sdk`
- `posthog-js` (analytics — optional, confirm with user)

### Environment Variables

- All `SUPABASE_*` variables
- All `PADDLE_*` variables
- `POSTHOG_*` if removing analytics

## What Gets Modified (not deleted)

### Root Layout (`app/layout.tsx`)
- Remove Supabase/Paddle/PostHog providers and initializers

### Landing Page (`app/(marketing)/page.tsx`)
- Remove pricing section
- Remove "Sign up" / "Get started" CTAs that link to auth
- Replace auth CTAs with docs/blocks links

### Navigation (`lib/config/navigation.ts`, `components/site/`)
- Remove links to: login, signup, pricing, account, generate, dashboard

### Components importing auth
- Find all imports from `lib/supabase/`, `hooks/use-user`, `hooks/use-subscription`
- Remove or refactor those components

### Middleware (`next.config.ts` or `middleware.ts`)
- Remove reference to `proxy.ts` if configured as middleware

## Out of Scope

- Refactoring existing component docs
- Changing the registry build process
- Modifying block components themselves
- Redesigning the landing page beyond removing auth/pricing references
