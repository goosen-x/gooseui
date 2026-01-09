# Landing Page Generator - Implementation Plan

## Чёткий пошаговый план реализации

---

## Phase 1: Core Infrastructure

### 1.1 Types & Interfaces
```bash
# Создать файл типов
lib/generate/types.ts
```

**Содержимое:**
- `PageSchema` - схема страницы
- `SectionSchema` - схема секции
- `ComponentDefinition` - определение компонента
- `VariantDefinition` - определение варианта
- `EditorState` - состояние редактора
- `HistoryState` - состояние истории

### 1.2 Component Registry
```bash
# Реестр компонентов
lib/generate/registry.ts
```

**Задачи:**
- Импорт всех существующих блоков из `registry/new-york/blocks/`
- Создание `componentRegistry` с метаданными
- Функции: `getComponent()`, `getVariants()`, `getDefaultProps()`

### 1.3 Zustand Store
```bash
# Установить зависимости
pnpm add zustand immer zundo

# Создать store
lib/generate/store.ts
```

**State:**
```typescript
interface EditorStore {
  // Data
  page: PageSchema
  selectedId: string | null
  viewport: 'desktop' | 'tablet' | 'mobile'

  // Actions
  setSection: (id: string, data: Partial<SectionSchema>) => void
  addSection: (type: string, variant: string) => void
  removeSection: (id: string) => void
  reorderSections: (fromIndex: number, toIndex: number) => void
  selectSection: (id: string | null) => void
  setViewport: (viewport: ViewportSize) => void

  // Serialization
  toJSON: () => string
  fromJSON: (json: string) => void
}
```

### 1.4 History (Undo/Redo)
```bash
# Интеграция zundo для temporal state
lib/generate/history.ts
```

**Реализация:**
- `temporal` middleware для Zustand
- Ограничение истории (50 состояний)
- Keyboard shortcuts: Ctrl+Z, Ctrl+Shift+Z

---

## Phase 2: Editor UI

### 2.1 Editor Layout
```bash
components/generate/editor-layout.tsx
```

**Структура:**
```
┌────────────────────────────────────────────────────────┐
│  Toolbar (viewport, undo/redo, save, export)          │
├────────────────────────────────┬───────────────────────┤
│                                │                       │
│     Canvas (preview)           │   Sidebar (sections)  │
│                                │                       │
│                                ├───────────────────────┤
│                                │   Property Panel      │
│                                │   (when selected)     │
│                                │                       │
└────────────────────────────────┴───────────────────────┘
```

### 2.2 Editor Canvas
```bash
# Установить dnd-kit
pnpm add @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

# Создать canvas
components/generate/editor-canvas.tsx
```

**Функционал:**
- Рендеринг секций из store
- Drop zones между секциями
- Selection overlay при hover/click
- Viewport sizing (desktop/tablet/mobile)

### 2.3 Section Slider (Variant Switcher)
```bash
components/generate/section-slider.tsx
```

**UI:**
- CSS transform animation (`translateX`)
- Circular buttons на hover
- Dots indicator
- Touch/swipe support

### 2.4 Editor Sidebar
```bash
components/generate/editor-sidebar.tsx
```

**Функционал:**
- Список текущих секций
- Drag to reorder (sortable)
- Add section dropdown
- Delete section button

### 2.5 Property Panel
```bash
components/generate/property-panel.tsx
```

**Поля по типам:**
- `text` → Input
- `textarea` → Textarea
- `select` → Select
- `color` → Color picker
- `image` → Image upload
- `boolean` → Switch
- `number` → Number input

---

## Phase 3: Drag & Drop

### 3.1 DnD Context Setup
```typescript
// components/generate/dnd-provider.tsx
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
```

### 3.2 Sortable Sections
```typescript
// components/generate/sortable-section.tsx
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
```

### 3.3 Add New Section (Drag from palette)
```typescript
// components/generate/section-palette.tsx
// Draggable items для добавления новых секций
```

---

## Phase 4: Export System

### 4.1 Export to HTML
```bash
lib/generate/export/html.ts
```

**Процесс:**
1. Рендер компонентов в HTML string
2. Извлечение CSS (Tailwind)
3. Сборка полного HTML документа
4. Добавление watermark (free tier)

### 4.2 Export to React
```bash
lib/generate/export/react.ts
```

**Процесс:**
1. Генерация React component code
2. Import statements для зависимостей
3. Props extraction
4. Tailwind classes preservation

### 4.3 Export to shadcn Registry
```bash
lib/generate/export/registry.ts
```

**Формат:**
```json
{
  "name": "my-landing",
  "type": "registry:block",
  "files": [
    {
      "path": "blocks/my-landing.tsx",
      "content": "..."
    }
  ],
  "dependencies": ["lucide-react"],
  "registryDependencies": ["button", "card"]
}
```

### 4.4 Export API Route
```bash
app/api/projects/[id]/export/route.ts
```

**Feature gating:**
- Free: HTML only, with watermark
- Pro: HTML, React, no watermark
- Enterprise: + shadcn registry, source files

---

## Phase 5: Persistence

### 5.1 Database Schema (Supabase)
```sql
-- Projects table
create table projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  name text not null,
  data jsonb not null,
  thumbnail text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table projects enable row level security;

-- Policies
create policy "Users can CRUD own projects"
  on projects for all
  using (auth.uid() = user_id);
```

### 5.2 API Routes
```bash
app/api/projects/route.ts          # GET (list), POST (create)
app/api/projects/[id]/route.ts     # GET, PUT, DELETE
```

### 5.3 Auto-save
```typescript
// Debounced auto-save в store
useEffect(() => {
  const save = debounce(async () => {
    await saveProject(store.page)
  }, 2000)

  return store.subscribe(save)
}, [])
```

---

## Phase 6: Payments

### 6.1 Stripe Setup
```bash
# Env variables
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
```

### 6.2 Pricing Plans
```typescript
// lib/payments/plans.ts
export const plans = {
  free: {
    name: 'Free',
    price: 0,
    limits: { projects: 3, exports: 5 },
    features: ['watermark', 'html_export']
  },
  pro: {
    name: 'Pro',
    price: 2900, // cents
    priceId: 'price_xxx',
    limits: { projects: -1, exports: -1 },
    features: ['no_watermark', 'html_export', 'react_export', 'custom_domain']
  },
  team: {
    name: 'Team',
    price: 7900,
    priceId: 'price_yyy',
    limits: { projects: -1, exports: -1, members: 5 },
    features: ['...all pro', 'team_sharing', 'analytics', 'version_history']
  }
}
```

### 6.3 Checkout Flow
```typescript
// app/api/checkout/route.ts
export async function POST(req: Request) {
  const { priceId } = await req.json()
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/generate?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/pricing`,
  })
  return Response.json({ url: session.url })
}
```

### 6.4 Webhook Handler
```typescript
// app/api/webhooks/stripe/route.ts
// Handle: customer.subscription.created/updated/deleted
// Update user subscription in database
```

### 6.5 Feature Gating Hook
```typescript
// hooks/use-feature-access.ts
export function useFeatureAccess() {
  const { subscription } = useUser()

  const canExportReact = subscription?.plan === 'pro' || subscription?.plan === 'team'
  const canRemoveWatermark = canExportReact
  const projectLimit = subscription?.plan === 'free' ? 3 : -1

  return { canExportReact, canRemoveWatermark, projectLimit }
}
```

---

## Phase 7: Polish

### 7.1 Keyboard Shortcuts
```typescript
// hooks/use-editor-shortcuts.ts
useHotkeys('mod+z', () => store.undo())
useHotkeys('mod+shift+z', () => store.redo())
useHotkeys('mod+s', () => saveProject())
useHotkeys('delete', () => store.removeSection(selectedId))
useHotkeys('escape', () => store.selectSection(null))
```

### 7.2 Templates Gallery
```typescript
// Предустановленные шаблоны
const templates = [
  { name: 'SaaS Landing', sections: [...] },
  { name: 'Portfolio', sections: [...] },
  { name: 'Agency', sections: [...] },
]
```

### 7.3 Responsive Editor
- Collapsible sidebar на mobile
- Touch-friendly controls
- Swipe для variant switching

---

## Checklist

### Infrastructure
- [ ] `lib/generate/types.ts`
- [ ] `lib/generate/registry.ts`
- [ ] `lib/generate/store.ts`
- [ ] `lib/generate/history.ts`

### UI Components
- [ ] `components/generate/editor-layout.tsx`
- [ ] `components/generate/editor-canvas.tsx`
- [ ] `components/generate/editor-sidebar.tsx`
- [ ] `components/generate/editor-toolbar.tsx`
- [ ] `components/generate/section-slider.tsx`
- [ ] `components/generate/property-panel.tsx`
- [ ] `components/generate/upgrade-modal.tsx`

### DnD
- [ ] `components/generate/dnd-provider.tsx`
- [ ] `components/generate/sortable-section.tsx`
- [ ] `components/generate/section-palette.tsx`

### Export
- [ ] `lib/generate/export/html.ts`
- [ ] `lib/generate/export/react.ts`
- [ ] `lib/generate/export/registry.ts`
- [ ] `app/api/projects/[id]/export/route.ts`

### Persistence
- [ ] Supabase tables
- [ ] `app/api/projects/route.ts`
- [ ] `app/api/projects/[id]/route.ts`
- [ ] Auto-save integration

### Payments
- [ ] `lib/payments/stripe.ts`
- [ ] `lib/payments/plans.ts`
- [ ] `app/api/checkout/route.ts`
- [ ] `app/api/webhooks/stripe/route.ts`
- [ ] `hooks/use-feature-access.ts`
- [ ] `app/(marketing)/pricing/page.tsx`

### Polish
- [ ] Keyboard shortcuts
- [ ] Templates gallery
- [ ] Mobile responsive
- [ ] Onboarding

---

## Estimated Timeline

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| 1. Core Infrastructure | 3-4 дня | - |
| 2. Editor UI | 4-5 дней | Phase 1 |
| 3. Drag & Drop | 2-3 дня | Phase 2 |
| 4. Export System | 3-4 дня | Phase 1 |
| 5. Persistence | 2-3 дня | Supabase setup |
| 6. Payments | 3-4 дня | Stripe setup |
| 7. Polish | 3-4 дней | All phases |

**Total: ~3-4 недели** при full-time работе

---

## Начало работы

```bash
# 1. Установить зависимости
pnpm add zustand immer zundo @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

# 2. Начать с types.ts
# 3. Затем registry.ts с существующими блоками
# 4. Потом store.ts
# 5. И наконец UI компоненты
```

**Первый deliverable:** Рабочий редактор с variant switching (без persistence и payments) - ~1 неделя.
