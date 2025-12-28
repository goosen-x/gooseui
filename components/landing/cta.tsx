import Link from "next/link"
import { Button } from "@/registry/new-york/ui/button"
import { BorderBeam } from "@/registry/new-york/effects/border-beam"

export function CTA() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl border bg-card p-8 md:p-12 text-center">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Готовы начать?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              Добавьте первый компонент в свой проект прямо сейчас
            </p>
            <div className="mt-6 rounded-lg border bg-muted/50 px-4 py-3 font-mono text-sm max-w-md mx-auto">
              npx shadcn@latest add @gooseui/button
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/docs">Документация</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="https://github.com/goose-labs/gooseui" target="_blank">
                  GitHub
                </Link>
              </Button>
            </div>
          </div>
          <BorderBeam duration={10} colorFrom="#10b981" colorTo="#3b82f6" />
        </div>
      </div>
    </section>
  )
}
