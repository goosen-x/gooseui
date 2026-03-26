# Remove Auth, Supabase & Paddle — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Strip all auth, database, and payment infrastructure from GooseUI, leaving a pure docs + blocks + registry site.

**Architecture:** Delete all auth/payment routes, API endpoints, Supabase/Paddle libs, PostHog analytics, and generate/constructor features. Modify root layout, navigation, sidebars, and docs components to remove dead references. Clean up dependencies.

**Tech Stack:** Next.js, pnpm

**Spec:** `docs/superpowers/specs/2026-03-26-remove-auth-supabase-paddle-design.md`

---

### Task 1: Delete auth and protected route directories

**Files:**
- Delete: `app/(auth)/` (login, signup)
- Delete: `app/(app)/` (layout + generate)
- Delete: `app/account/page.tsx`
- Delete: `app/dashboard/page.tsx`
- Delete: `app/auth/` (callback)
- Delete: `app/(marketing)/pricing/`

- [ ] **Step 1: Delete directories**

```bash
rm -rf app/\(auth\) app/\(app\) app/account app/dashboard app/auth app/\(marketing\)/pricing
```

- [ ] **Step 2: Verify deletions**

```bash
ls app/\(auth\) 2>&1  # Should say "No such file or directory"
ls app/\(app\) 2>&1   # Should say "No such file or directory"
```

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "chore: delete auth, generate, account, dashboard, pricing routes"
```

---

### Task 2: Delete all API routes

**Files:**
- Delete: `app/api/` (checkout, customer-portal, projects, webhooks)

- [ ] **Step 1: Delete API directory**

```bash
rm -rf app/api
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "chore: delete all API routes (checkout, projects, webhooks)"
```

---

### Task 3: Delete generate and constructor components

**Files:**
- Delete: `components/generate/` (10 files)
- Delete: `components/constructor/` (6 files)
- Delete: `components/app-sidebar.tsx`

- [ ] **Step 1: Delete directories and file**

```bash
rm -rf components/generate components/constructor
rm components/app-sidebar.tsx
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "chore: delete generate, constructor components and app-sidebar"
```

---

### Task 4: Delete PostHog infrastructure

**Files:**
- Delete: `components/posthog-provider.tsx`
- Delete: `components/posthog-pageview.tsx`
- Delete: `instrumentation-client.ts`

- [ ] **Step 1: Delete PostHog files**

```bash
rm components/posthog-provider.tsx components/posthog-pageview.tsx instrumentation-client.ts
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "chore: delete PostHog provider, pageview, and instrumentation"
```

---

### Task 5: Delete Supabase, payments, generate/constructor libs

**Files:**
- Delete: `lib/supabase/` (client.ts, server.ts, types.ts, schema.sql)
- Delete: `lib/payments/` (paddle.ts, plans.ts)
- Delete: `lib/generate/` (store, design-store, export/, registry, templates, types, .env.example)
- Delete: `lib/constructor/` (index, sections-registry, types, use-constructor)

- [ ] **Step 1: Delete lib directories**

```bash
rm -rf lib/supabase lib/payments lib/generate lib/constructor
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "chore: delete supabase, payments, generate, constructor libs"
```

---

### Task 6: Delete hooks and scripts

**Files:**
- Delete: `hooks/use-subscription.ts`
- Delete: `hooks/use-feature-access.ts`
- Delete: `hooks/use-editor-shortcuts.ts`
- Delete: `scripts/check-db.mjs`
- Delete: `goosetap/` (empty directory)

- [ ] **Step 1: Delete hooks and scripts**

```bash
rm -f hooks/use-subscription.ts hooks/use-feature-access.ts hooks/use-editor-shortcuts.ts scripts/check-db.mjs
rm -rf goosetap
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "chore: delete auth/payment hooks, check-db script, goosetap"
```

---

### Task 7: Delete generate/payment docs

**Files:**
- Delete: `docs/payment-investigation-report.md` (if exists)
- Delete: `docs/paddle-payout-guide.md` (if exists)
- Delete: `docs/generate/` (if exists)

- [ ] **Step 1: Delete docs**

```bash
rm -rf docs/generate docs/payment-investigation-report.md docs/paddle-payout-guide.md
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "chore: delete generate and payment documentation"
```

---

### Task 8: Modify root layout — remove PostHog

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Remove PostHog imports (lines 4-5)**

Remove these imports:
```typescript
import { PostHogPageView } from "@/components/posthog-pageview"
import { PostHogProvider } from "@/components/posthog-provider"
```

- [ ] **Step 2: Remove PostHog wrapper (lines ~76-87)**

Replace the PostHogProvider + PostHogPageView wrapper:
```tsx
<PostHogProvider>
  <ThemeProvider ...>
    <PostHogPageView />
    {children}
    <Toaster />
  </ThemeProvider>
</PostHogProvider>
```

With just ThemeProvider (no PostHog wrapping):
```tsx
<ThemeProvider ...>
  {children}
  <Toaster />
</ThemeProvider>
```

- [ ] **Step 3: Verify no other auth/supabase/paddle imports remain in layout**

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx && git commit -m "fix: remove PostHog from root layout"
```

---

### Task 9: Remove pricing links from sidebars

**Files:**
- Modify: `components/docs-sidebar.tsx` (lines 267-276)
- Modify: `components/blocks/blocks-sidebar.tsx` (lines 103-112)

- [ ] **Step 1: Remove pricing link from docs-sidebar.tsx**

Remove this block:
```tsx
{/* Pricing link */}
<SidebarMenuItem>
  <SidebarMenuButton
    className="font-medium"
    asChild
    isActive={pathname === "/pricing"}
  >
    <Link href="/pricing">Pricing</Link>
  </SidebarMenuButton>
</SidebarMenuItem>
```

- [ ] **Step 2: Remove pricing link from blocks-sidebar.tsx**

Remove the identical block from `components/blocks/blocks-sidebar.tsx`.

- [ ] **Step 3: Commit**

```bash
git add components/docs-sidebar.tsx components/blocks/blocks-sidebar.tsx && git commit -m "fix: remove pricing links from sidebars"
```

---

### Task 10: Remove PostHog from docs components

**Files:**
- Modify: `components/docs/docs-page-nav.tsx`
- Modify: `components/docs/install-command.tsx`

- [ ] **Step 1: Clean docs-page-nav.tsx**

1. Remove import: `import { usePostHog } from "posthog-js/react"`
2. Remove hook: `const posthog = usePostHog()`
3. Remove all `posthog.capture(...)` calls (in handleCopyPage, handleViewMarkdown, handleOpenInV0, handleOpenInChatGPT, handleOpenInClaude, handleOpenInT3Chat)

- [ ] **Step 2: Clean install-command.tsx**

1. Remove import: `import { usePostHog } from "posthog-js/react"`
2. Remove hook: `const posthog = usePostHog()`
3. Remove `posthog.capture("install_command_copied", ...)` call in handleCopy

- [ ] **Step 3: Commit**

```bash
git add components/docs/docs-page-nav.tsx components/docs/install-command.tsx && git commit -m "fix: remove PostHog tracking from docs components"
```

---

### Task 11: Fix pricing reference in promo-banner docs

**Files:**
- Modify: `app/(docs)/docs/components/promo-banner/page.tsx` (line 88)

- [ ] **Step 1: Update ctaHref**

Change `ctaHref="/pricing"` to `ctaHref="/docs"` in the usage example.

- [ ] **Step 2: Commit**

```bash
git add app/\(docs\)/docs/components/promo-banner/page.tsx && git commit -m "fix: update promo-banner example href from pricing to docs"
```

---

### Task 12: Remove pricing from sitemap

**Files:**
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Remove pricing entry (lines 28-31)**

Remove:
```typescript
{
  url: `${BASE_URL}/pricing`,
  lastModified: currentDate,
  changeFrequency: "monthly",
  priority: 0.8,
},
```

- [ ] **Step 2: Commit**

```bash
git add app/sitemap.ts && git commit -m "fix: remove pricing from sitemap"
```

---

### Task 13: Remove dependencies from package.json

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Remove packages**

```bash
pnpm remove @supabase/ssr @supabase/supabase-js @paddle/paddle-js @paddle/paddle-node-sdk posthog-js @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities immer zundo zustand
```

- [ ] **Step 2: Verify zustand is not used elsewhere**

```bash
grep -r "from ['\"]zustand" --include="*.ts" --include="*.tsx" . | grep -v node_modules | grep -v docs/
```

Expected: no results (all usages were in deleted lib/generate/).

- [ ] **Step 3: Clean install**

```bash
pnpm install
```

- [ ] **Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml && git commit -m "chore: remove unused dependencies (supabase, paddle, posthog, dnd-kit, zustand)"
```

---

### Task 14: Clean environment variables

**Files:**
- Modify: `.env.local`

- [ ] **Step 1: Remove Supabase/Paddle/PostHog variables**

Remove all lines containing:
- `SUPABASE_`
- `NEXT_PUBLIC_SUPABASE_`
- `PADDLE_`
- `NEXT_PUBLIC_PADDLE_`
- `POSTHOG_`
- `NEXT_PUBLIC_POSTHOG_`

- [ ] **Step 2: Do NOT commit .env.local** (should be in .gitignore)

---

### Task 15: Build verification

- [ ] **Step 1: Run type check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 2: Run full build**

```bash
pnpm build
```

Expected: successful build with no broken imports or missing modules.

- [ ] **Step 3: Fix any remaining broken imports**

If build fails, grep for imports referencing deleted paths:
```bash
grep -r "from ['\"]@/lib/supabase" --include="*.ts" --include="*.tsx" .
grep -r "from ['\"]@/lib/payments" --include="*.ts" --include="*.tsx" .
grep -r "from ['\"]@/lib/generate" --include="*.ts" --include="*.tsx" .
grep -r "from ['\"]@/hooks/use-subscription" --include="*.ts" --include="*.tsx" .
grep -r "from ['\"]@/hooks/use-feature-access" --include="*.ts" --include="*.tsx" .
grep -r "from ['\"]@/components/generate" --include="*.ts" --include="*.tsx" .
grep -r "posthog" --include="*.ts" --include="*.tsx" . | grep -v node_modules
```

- [ ] **Step 4: Commit any remaining fixes**

```bash
git add -A && git commit -m "fix: resolve remaining broken imports after cleanup"
```

- [ ] **Step 5: Final build confirmation**

```bash
pnpm build
```

Expected: clean build, zero errors.
