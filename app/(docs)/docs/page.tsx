import Link from "next/link"

export const metadata = {
  title: "Документация",
  description: "Руководство по использованию GooseLabs UI",
}

export default function DocsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Введение
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          GooseLabs UI — это коллекция переиспользуемых компонентов для React,
          построенных на базе Radix UI и Tailwind CSS.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Что такое GooseLabs UI?
        </h2>
        <p className="leading-7">
          Это не npm-библиотека, а коллекция компонентов, которые вы копируете в
          свой проект. Вы получаете полный контроль над кодом и можете
          настраивать компоненты под свои нужды.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Особенности
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>Доступные компоненты на базе Radix UI</li>
          <li>Стилизация через Tailwind CSS</li>
          <li>Тёмная тема из коробки</li>
          <li>Полная типизация TypeScript</li>
          <li>Copy-paste установка через CLI</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Быстрый старт
        </h2>
        <p className="leading-7">
          Добавьте компонент в свой проект с помощью shadcn CLI:
        </p>
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          npx shadcn@latest add https://ui.gooselabs.ru/r/button.json
        </pre>
        <p className="leading-7">
          Или используя namespace (после настройки):
        </p>
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          npx shadcn@latest add @gooselabs/button
        </pre>
      </div>

      <div className="flex gap-4 pt-4">
        <Link
          href="/docs/installation"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Установка
        </Link>
        <Link
          href="/docs/components/button"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          Компоненты
        </Link>
      </div>
    </div>
  )
}
