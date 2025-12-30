# GooseUI Premium Blocks Marketplace

#p1 #feature #monetization

## Описание

Маркетплейс премиум-блоков по образцу Creative Tim с монетизацией.

**Референс:** https://www.creative-tim.com/ui/blocks

## Архитектурные решения

| Вопрос | Решение | Причина |
|--------|---------|---------|
| Где размещать? | В том же приложении | Shared registry, UI, единый домен |
| Платёжная система | Lemon Squeezy | MoR, автоналоги, license keys |
| Авторизация | Clerk | Готовые UI, App Router интеграция |
| База данных | Neon + Drizzle | Serverless, Edge-compatible |

## Структура директорий

```
app/
├── (blocks)/                  # Route group для блоков
│   ├── layout.tsx
│   └── blocks/
│       ├── page.tsx           # /blocks - каталог
│       ├── [category]/
│       │   ├── page.tsx       # /blocks/web3
│       │   └── [slug]/
│       │       └── page.tsx   # /blocks/web3/wallet-connect
├── (auth)/                    # Clerk страницы
│   ├── sign-in/[[...sign-in]]/page.tsx
│   └── sign-up/[[...sign-up]]/page.tsx
├── (dashboard)/               # Личный кабинет
│   └── dashboard/
│       ├── page.tsx
│       ├── downloads/page.tsx
│       └── license/page.tsx
└── api/
    ├── webhooks/lemonsqueezy/route.ts
    └── registry/[slug]/route.ts
```

## Категории блоков

| Slug | Название | Иконка | Приоритет |
|------|----------|--------|-----------|
| web3 | Web3 | Wallet | 🔥 High |
| dashboard | Dashboard | LayoutDashboard | 🔥 High |
| marketing | Marketing | Megaphone | 🔥 High |
| e-commerce | E-commerce | ShoppingCart | 🔥 High |
| forms | Forms | FormInput | Medium |
| ai | AI | Bot | Medium |

## Модель монетизации

```
FREE TIER
├── Базовые компоненты (button, input, card)
├── Документация
└── Community support

PRO TIER - $49 Lifetime
├── Все free features
├── Premium blocks (50+)
├── Premium effects
├── Figma kit
├── Priority support
└── Lifetime updates

TEAM TIER - $99 Lifetime
├── Все Pro features
├── До 5 членов команды
└── Team license
```

## UI: BlockPreview

### Тулбар

```
┌────────────────────────────────────────────────────────────────────┐
│ [>_ npx @gooseui/...] [Use Block in AI ▼]                          │
│                                                                    │
│ [🖥️][📱][📱][⊞][↻] │ [Preview][Code] │ [Select ▼]                │
│   viewport icons   │    tabs         │  Open in v0/Copy/AI        │
└────────────────────────────────────────────────────────────────────┘
```

### Viewport размеры

```typescript
const VIEWPORT_SIZES = {
  desktop: { width: "100%" },
  tablet: { width: "768px" },
  mobile: { width: "375px" },
  fit: { width: "100%" },
}
```

## Фазы реализации

### Фаза 1: UI блоков (без платежей)

- [ ] Создать `app/(blocks)/` route group
- [ ] Создать `lib/config/blocks-categories.ts`
- [ ] Создать `lib/config/blocks-registry.ts`
- [ ] Создать компоненты: BlockCard, BlocksSidebar, BlockPreview, BlockPreviewToolbar
- [ ] Создать страницы: /blocks, /blocks/[category], /blocks/[category]/[slug]
- [ ] Добавить ToggleGroup из shadcn

### Фаза 2: Авторизация

- [ ] Установить @clerk/nextjs
- [ ] Настроить ClerkProvider
- [ ] Создать middleware.ts
- [ ] Добавить UserButton в header
- [ ] Создать страницы sign-in/sign-up

### Фаза 3: База данных

- [ ] Создать Neon database
- [ ] Настроить Drizzle ORM
- [ ] Создать схему (users, subscriptions, licenses)
- [ ] Настроить миграции

### Фаза 4: Платежи

- [ ] Настроить Lemon Squeezy
- [ ] Создать webhook handler
- [ ] Создать pricing page
- [ ] Реализовать checkout flow
- [ ] Защитить premium registry endpoints

### Фаза 5: Dashboard

- [ ] Создать /dashboard layout
- [ ] Страница лицензий
- [ ] История скачиваний
- [ ] Управление подпиской

## Зависимости

```bash
# Фаза 1 - UI
pnpm dlx shadcn@latest add toggle-group

# Фаза 2 - Auth
pnpm add @clerk/nextjs

# Фаза 3 - Database
pnpm add drizzle-orm @neondatabase/serverless
pnpm add -D drizzle-kit

# Фаза 4 - Payments
pnpm add @lemonsqueezy/lemonsqueezy.js
```

## ENV переменные

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Lemon Squeezy
LEMONSQUEEZY_API_KEY=
LEMONSQUEEZY_STORE_ID=
LEMONSQUEEZY_WEBHOOK_SECRET=
LEMONSQUEEZY_PRO_VARIANT_ID=
LEMONSQUEEZY_TEAM_VARIANT_ID=

# Database
DATABASE_URL=
```

---

Создано: 2024-12-30
Статус: in-progress (Фаза 1)
