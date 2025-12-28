export const metadata = {
  title: "Установка",
  description: "Как установить и настроить GooseLabs UI в вашем проекте",
}

export default function InstallationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Установка
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Как добавить компоненты GooseLabs UI в ваш проект
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Требования
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>React 18+</li>
          <li>Tailwind CSS 3.4+ или 4.0+</li>
          <li>TypeScript (рекомендуется)</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Способ 1: Прямой URL
        </h2>
        <p className="leading-7">
          Добавьте компонент напрямую по URL:
        </p>
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          npx shadcn@latest add https://ui.gooselabs.ru/r/button.json
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Способ 2: Через namespace
        </h2>
        <p className="leading-7">
          Добавьте registry в ваш <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">components.json</code>:
        </p>
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
{`{
  "registries": {
    "@gooselabs": "https://ui.gooselabs.ru/r"
  }
}`}
        </pre>
        <p className="leading-7">
          Затем используйте namespace для установки:
        </p>
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          npx shadcn@latest add @gooselabs/button
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Структура проекта
        </h2>
        <p className="leading-7">
          После установки компоненты будут добавлены в директорию <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">components/ui</code>:
        </p>
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
{`your-project/
├── components/
│   └── ui/
│       └── button.tsx
├── lib/
│   └── utils.ts
└── ...`}
        </pre>
      </div>
    </div>
  )
}
