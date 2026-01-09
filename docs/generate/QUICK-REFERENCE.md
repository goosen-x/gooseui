# Quick Reference - Landing Page Generator

> Используй этот документ когда забудешь что делать

---

## Ключевые решения

| Вопрос | Решение | Почему |
|--------|---------|--------|
| State management | Zustand + Immer | Простой API, маленький bundle |
| Drag & Drop | dnd-kit | 60 FPS, виртуализация |
| Undo/Redo | Immer patches | Эффективнее снэпшотов |
| Slider animation | CSS transform | GPU-ускорение |
| Code generation | Template-based | Проще чем AST |
| Auth | Supabase | Быстрая интеграция |
| Payments | Stripe | Стандарт индустрии |

---

## Структура файлов

```
lib/generate/
├── types.ts          # Типы и интерфейсы
├── registry.ts       # Реестр компонентов
├── store.ts          # Zustand store
└── export/
    ├── html.ts       # Export HTML
    └── react.ts      # Export React

components/generate/
├── editor-layout.tsx   # Основной layout
├── editor-canvas.tsx   # Preview area
├── editor-sidebar.tsx  # Список секций
├── section-slider.tsx  # Переключатель вариантов
└── property-panel.tsx  # Редактор props
```

---

## Базовые типы

```typescript
// lib/generate/types.ts

export type SectionType = 'header' | 'hero' | 'features' | 'pricing' | 'footer'

export interface SectionSchema {
  id: string
  type: SectionType
  variant: string
  props: Record<string, unknown>
}

export interface PageSchema {
  id: string
  name: string
  sections: SectionSchema[]
}

export interface EditorState {
  page: PageSchema
  selectedId: string | null
  viewport: 'desktop' | 'tablet' | 'mobile'
}
```

---

## Zustand Store

```typescript
// lib/generate/store.ts
import { create } from 'zustand'
import { temporal } from 'zundo'
import { immer } from 'zustand/middleware/immer'

export const useEditorStore = create<EditorState>()(
  temporal(
    immer((set) => ({
      page: { id: '', name: '', sections: [] },
      selectedId: null,
      viewport: 'desktop',

      addSection: (type, variant) => set((state) => {
        state.page.sections.push({
          id: crypto.randomUUID(),
          type,
          variant,
          props: {}
        })
      }),

      updateSection: (id, updates) => set((state) => {
        const section = state.page.sections.find(s => s.id === id)
        if (section) Object.assign(section, updates)
      }),

      removeSection: (id) => set((state) => {
        state.page.sections = state.page.sections.filter(s => s.id !== id)
      }),
    }))
  )
)
```

---

## Component Registry

```typescript
// lib/generate/registry.ts
import { HeaderSimple } from '@/registry/new-york/blocks/headers/header-simple'
import { HeroClassic } from '@/registry/new-york/blocks/hero/hero-classic'
// ... остальные импорты

export const componentRegistry = {
  header: {
    name: 'Header',
    variants: [
      { id: 'header-01', name: 'Simple', component: HeaderSimple },
      { id: 'header-02', name: 'With CTA', component: HeaderWithCta },
    ]
  },
  hero: {
    name: 'Hero',
    variants: [
      { id: 'hero-01', name: 'Classic', component: HeroClassic },
      { id: 'hero-02', name: 'Split', component: HeroSplit },
    ]
  },
  // ...
}

export function getComponent(type: string, variant: string) {
  return componentRegistry[type]?.variants.find(v => v.id === variant)?.component
}
```

---

## Section Slider

```typescript
// CSS Transform подход (рекомендуемый)
<div className="overflow-hidden">
  <div
    className="flex transition-transform duration-500"
    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
  >
    {variants.map((Component, i) => (
      <div key={i} className="w-full shrink-0">
        <Component />
      </div>
    ))}
  </div>
</div>
```

---

## dnd-kit Setup

```typescript
// Sortable sections
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'

function SortableSection({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  )
}
```

---

## Export HTML

```typescript
// lib/generate/export/html.ts
import { renderToStaticMarkup } from 'react-dom/server'

export function exportToHTML(page: PageSchema) {
  const componentsHTML = page.sections.map(section => {
    const Component = getComponent(section.type, section.variant)
    return renderToStaticMarkup(<Component {...section.props} />)
  }).join('\n')

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.name}</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  ${componentsHTML}
</body>
</html>`
}
```

---

## Feature Gating

```typescript
// hooks/use-feature-access.ts
export function useFeatureAccess() {
  const { user } = useUser()
  const plan = user?.subscription?.plan || 'free'

  return {
    canExportReact: plan !== 'free',
    canRemoveWatermark: plan !== 'free',
    projectLimit: plan === 'free' ? 3 : Infinity,
  }
}

// Использование
function ExportButton() {
  const { canExportReact } = useFeatureAccess()

  if (!canExportReact) {
    return <UpgradeModal trigger={<Button>Export React</Button>} />
  }

  return <Button onClick={handleExport}>Export React</Button>
}
```

---

## Stripe Checkout

```typescript
// Server Action
'use server'
export async function createCheckout(priceId: string) {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_URL}/generate`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
  })
  redirect(session.url!)
}
```

---

## Команды

```bash
# Установить зависимости
pnpm add zustand immer zundo @dnd-kit/core @dnd-kit/sortable

# Stripe
pnpm add stripe @stripe/stripe-js

# Supabase
pnpm add @supabase/supabase-js @supabase/ssr
```

---

## Полезные ссылки

- [Zustand Docs](https://zustand.docs.pmnd.rs/)
- [dnd-kit Docs](https://docs.dndkit.com/)
- [Immer Patches](https://immerjs.github.io/immer/patches/)
- [Stripe Next.js](https://github.com/vercel/nextjs-subscription-payments)
- [Supabase Auth](https://supabase.com/docs/guides/auth)

---

## Что делать если застрял

1. Прочитай `/docs/generate/ARCHITECTURE.md`
2. Посмотри `/docs/generate/IMPLEMENTATION-PLAN.md`
3. Проверь примеры кода выше
4. Используй web-research-expert агента для поиска решений
