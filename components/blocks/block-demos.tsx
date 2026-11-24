import { HeaderMorphing } from "@/registry/gooseui/blocks/headers/header-morphing"

/**
 * Демо для блоков, которым нужно окружение: у морфящегося хедера анимация
 * идёт от прокрутки ближайшего скроллера, поэтому кладём его в контейнер с контентом.
 */
export function HeaderMorphingDemo() {
  return (
    <div className="h-[26rem] overflow-y-auto">
      <HeaderMorphing as="div" compactThreshold={80} className="z-10" />
      <div className="space-y-4 p-4">
        <p className="py-6 text-center text-sm text-muted-foreground">
          ↓ Scroll to see the header shrink ↓
        </p>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="rounded-lg border bg-background p-4">
            <div className="mb-2 h-4 w-3/4 rounded bg-muted" />
            <div className="h-3 w-1/2 rounded bg-muted/60" />
          </div>
        ))}
      </div>
    </div>
  )
}
