# Landing Page Generator - Architecture

## Исследование и выводы

### 1. Анализ рынка

**Основные игроки:**
- Webflow - JSON → HTML/CSS, AWS + Fastly CDN
- Framer - React-based, компилируется в современный React
- Wix - Multi-cloud, JSON representation
- Squarespace - Микросервисы, Oracle Coherence

**Ключевые находки:**
- Все используют **JSON-сериализацию** состояния страницы
- **Component Registry** - централизованный реестр компонентов
- **CDN + Edge caching** для производительности

### 2. Open Source решения

| Библиотека | Лицензия | Особенности |
|------------|----------|-------------|
| **Puck** | MIT | Next.js native, CSS Grid DnD, Slots API |
| **Craft.js** | MIT | Максимальная гибкость, Node-based state |
| **GrapesJS** | BSD-3 | Framework-agnostic, HTML/CSS output |
| **Builder.io** | Proprietary | SaaS с open SDK |

**Рекомендация:** Puck для Next.js или собственная реализация на dnd-kit

### 3. Технические решения

**Drag & Drop:**
- **dnd-kit** - 60 FPS даже на 1000+ элементов, 12KB gzip
- Виртуализация через react-window для больших списков

**State Management:**
- **Zustand** - <1KB, быстрый setup
- Immer patches для undo/redo (не снэпшоты!)

**Code Generation:**
- TeleportHQ UIDL → React/Vue/HTML
- @babel/generator для AST-based генерации
- shadcn registry JSON формат для экспорта

### 4. Монетизация

**Модель:**
- Free: 3 лендинга, watermark, базовые шаблоны
- Pro ($29/мес): безлимит, экспорт кода, без брендинга
- Team ($79/мес): команды, аналитика, version history

**Feature Gating:**
- Export HTML - free
- Export React/Vue code - pro
- Remove watermark - pro
- API access - enterprise

---

## Архитектура системы

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Editor    │  │   Preview   │  │   Property Panel    │ │
│  │  (dnd-kit)  │  │  (Realtime) │  │   (Form fields)     │ │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘ │
│         │                │                     │            │
│         └────────────────┼─────────────────────┘            │
│                          │                                  │
│                   ┌──────▼──────┐                           │
│                   │   Zustand   │                           │
│                   │   Store     │                           │
│                   │  + Immer    │                           │
│                   └──────┬──────┘                           │
│                          │                                  │
│         ┌────────────────┼────────────────┐                │
│         │                │                │                │
│  ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐       │
│  │  Component  │  │   History   │  │  Serialize  │       │
│  │  Registry   │  │  (Patches)  │  │   (JSON)    │       │
│  └─────────────┘  └─────────────┘  └─────────────┘       │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                        BACKEND                               │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │  Supabase   │  │   Stripe    │  │   Code Generator    │ │
│  │  Auth + DB  │  │  Payments   │  │   (AST/Template)    │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## JSON Schema (UIDL)

```typescript
interface PageSchema {
  id: string
  name: string
  sections: SectionSchema[]
  settings: PageSettings
}

interface SectionSchema {
  id: string
  type: 'header' | 'hero' | 'features' | 'pricing' | 'footer' | string
  variant: string // 'header-01', 'hero-classic', etc.
  props: Record<string, unknown>
  children?: SectionSchema[]
}

interface PageSettings {
  title: string
  description: string
  favicon?: string
  fonts?: string[]
  colors?: ThemeColors
}
```

---

## Component Registry

```typescript
interface ComponentDefinition {
  type: string
  name: string
  category: 'header' | 'hero' | 'content' | 'footer'
  variants: VariantDefinition[]
  defaultProps: Record<string, unknown>
  propsSchema: PropsSchema
}

interface VariantDefinition {
  id: string
  name: string
  description: string
  thumbnail: string
  component: React.ComponentType
}

interface PropsSchema {
  [key: string]: {
    type: 'text' | 'number' | 'select' | 'image' | 'color' | 'boolean'
    label: string
    defaultValue?: unknown
    options?: { value: string; label: string }[]
  }
}
```

---

## Файловая структура

```
app/
├── (marketing)/
│   └── generate/
│       ├── page.tsx           # Main editor page
│       └── [projectId]/
│           └── page.tsx       # Edit specific project
│
├── api/
│   ├── projects/
│   │   ├── route.ts          # CRUD projects
│   │   └── [id]/
│   │       ├── route.ts      # Get/Update project
│   │       └── export/
│   │           └── route.ts  # Export project
│   │
│   └── webhooks/
│       └── stripe/
│           └── route.ts      # Stripe webhooks

lib/
├── generate/
│   ├── store.ts              # Zustand store
│   ├── types.ts              # TypeScript types
│   ├── registry.ts           # Component registry
│   ├── history.ts            # Undo/redo with Immer
│   └── export/
│       ├── html.ts           # Export to HTML
│       ├── react.ts          # Export to React
│       └── registry.ts       # Export to shadcn registry
│
├── payments/
│   ├── stripe.ts             # Stripe client
│   └── plans.ts              # Pricing plans

components/
├── generate/
│   ├── editor-canvas.tsx     # Main canvas with dnd-kit
│   ├── editor-sidebar.tsx    # Sections list
│   ├── editor-toolbar.tsx    # Viewport, undo/redo, export
│   ├── property-panel.tsx    # Edit selected section props
│   ├── section-slider.tsx    # Variant selector
│   └── upgrade-modal.tsx     # Paywall modal

registry/
└── new-york/
    └── blocks/
        ├── headers/          # Header variants
        ├── heroes/           # Hero variants
        ├── features/         # Features variants
        ├── pricing/          # Pricing variants
        ├── testimonials/     # Testimonials variants
        └── footers/          # Footer variants
```

---

## Этапы реализации

### Phase 1: Core Editor (1-2 недели)
- [ ] Zustand store с JSON schema
- [ ] Component registry с существующими блоками
- [ ] dnd-kit интеграция для drag & drop
- [ ] Variant slider (CSS transform animation)
- [ ] Realtime preview
- [ ] Undo/redo с Immer patches

### Phase 2: Property Editing (1 неделя)
- [ ] Property panel для редактирования props
- [ ] Image upload
- [ ] Color picker
- [ ] Text editing
- [ ] Link editing

### Phase 3: Export (1 неделя)
- [ ] Export to HTML/CSS
- [ ] Export to React components
- [ ] Export to shadcn registry JSON
- [ ] Watermark для free tier

### Phase 4: Persistence (1 неделя)
- [ ] Supabase integration
- [ ] Save/load projects
- [ ] User projects list
- [ ] Auto-save

### Phase 5: Payments (1 неделя)
- [ ] Stripe Checkout integration
- [ ] Subscription webhooks
- [ ] Feature gating
- [ ] Pricing page

### Phase 6: Polish (1 неделя)
- [ ] Mobile responsive editor
- [ ] Keyboard shortcuts
- [ ] Templates gallery
- [ ] Onboarding flow

---

## Технологии

| Категория | Технология |
|-----------|------------|
| Framework | Next.js 15 (App Router) |
| State | Zustand + Immer |
| DnD | dnd-kit |
| Styling | Tailwind CSS 4 |
| Components | shadcn/ui |
| Auth | Supabase Auth |
| Database | Supabase Postgres |
| Payments | Stripe |
| Hosting | Vercel |
| CDN | Vercel Edge |

---

## API Endpoints

```
GET    /api/projects              # List user projects
POST   /api/projects              # Create project
GET    /api/projects/:id          # Get project
PUT    /api/projects/:id          # Update project
DELETE /api/projects/:id          # Delete project
POST   /api/projects/:id/export   # Export project (feature-gated)

POST   /api/webhooks/stripe       # Stripe webhooks
```

---

## Ключевые решения

1. **Почему не Puck/Craft.js?**
   - Полный контроль над UX
   - Интеграция с существующим registry
   - Специфичные требования к slider UX

2. **Почему dnd-kit?**
   - Лучшая производительность (60 FPS)
   - Маленький bundle (12KB)
   - Виртуализация из коробки

3. **Почему Zustand + Immer?**
   - Простой API
   - Эффективный undo/redo через patches
   - Маленький bundle (<1KB + 5KB)

4. **Почему JSON-based, а не AST?**
   - Проще сериализация
   - Легче персистенция
   - Достаточно для landing pages

---

## Ссылки на исследования

- [Puck Documentation](https://puckeditor.com/docs)
- [Craft.js Overview](https://craft.js.org/docs/overview)
- [dnd-kit Documentation](https://docs.dndkit.com/)
- [Zustand GitHub](https://github.com/pmndrs/zustand)
- [Immer Patches](https://immerjs.github.io/immer/patches/)
- [TeleportHQ UIDL](https://docs.teleporthq.io/uidl/)
- [Stripe Next.js Integration](https://github.com/vercel/nextjs-subscription-payments)
