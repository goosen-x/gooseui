export const metadata = {
  title: "CLI",
  description: "Использование shadcn CLI для установки компонентов",
}

export default function CLIPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          CLI
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Используйте shadcn CLI для управления компонентами
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Добавление компонента
        </h2>
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          npx shadcn@latest add @gooseui/button
        </pre>
        <p className="leading-7">
          Эта команда скачает компонент и все его зависимости в ваш проект.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Добавление нескольких компонентов
        </h2>
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          npx shadcn@latest add @gooseui/button @gooseui/card @gooseui/input
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Доступные компоненты
        </h2>
        <div className="grid gap-2">
          <div className="flex items-center justify-between rounded-lg border p-3">
            <span className="font-mono text-sm">border-beam</span>
            <code className="rounded bg-muted px-2 py-1 text-xs">@gooseui/border-beam</code>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <span className="font-mono text-sm">button</span>
            <code className="rounded bg-muted px-2 py-1 text-xs">@gooseui/button</code>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <span className="font-mono text-sm">card</span>
            <code className="rounded bg-muted px-2 py-1 text-xs">@gooseui/card</code>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <span className="font-mono text-sm">input</span>
            <code className="rounded bg-muted px-2 py-1 text-xs">@gooseui/input</code>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <span className="font-mono text-sm">label</span>
            <code className="rounded bg-muted px-2 py-1 text-xs">@gooseui/label</code>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <span className="font-mono text-sm">textarea</span>
            <code className="rounded bg-muted px-2 py-1 text-xs">@gooseui/textarea</code>
          </div>
        </div>
      </div>
    </div>
  )
}
