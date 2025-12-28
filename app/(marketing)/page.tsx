import Link from "next/link"
import { Button } from "@/registry/new-york/ui/button"

export default function HomePage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Компоненты для{" "}
            <span className="text-primary">современных</span> приложений
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Коллекция переиспользуемых компонентов, построенных на Radix UI и
            Tailwind CSS. Открытый исходный код. Копируй и используй.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg">
              <Link href="/docs">Начать</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/docs/components/button">Компоненты</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container space-y-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Особенности
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Все что нужно для создания современного веб-приложения
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12"
              >
                <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Tailwind CSS</h3>
                <p className="text-sm text-muted-foreground">
                  Стилизация через utility-классы для быстрой разработки
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Radix UI</h3>
                <p className="text-sm text-muted-foreground">
                  Доступные и настраиваемые примитивы
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">TypeScript</h3>
                <p className="text-sm text-muted-foreground">
                  Полная типизация для надежного кода
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Простая установка
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Используй shadcn CLI для добавления компонентов в свой проект
          </p>
          <div className="mt-4 rounded-lg border bg-muted px-4 py-3 font-mono text-sm">
            npx shadcn@latest add @gooselabs/button
          </div>
        </div>
      </section>
    </>
  )
}
