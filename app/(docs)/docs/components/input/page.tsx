import { Input } from "@/registry/new-york/ui/input"
import { Label } from "@/registry/new-york/ui/label"

export const metadata = {
  title: "Input",
  description: "Отображает поле ввода текста",
}

export default function InputPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Input
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Отображает поле ввода текста
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Превью
        </h2>
        <div className="flex flex-col gap-4 rounded-lg border p-6 max-w-sm">
          <Input placeholder="Email" type="email" />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Установка
        </h2>
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          npx shadcn@latest add @gooseui/input
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Использование
        </h2>
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
{`import { Input } from "@/components/ui/input"

export function MyInput() {
  return <Input type="email" placeholder="Email" />
}`}
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Примеры
        </h2>

        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
          Default
        </h3>
        <div className="flex items-center gap-4 rounded-lg border p-4 max-w-sm">
          <Input placeholder="Введите текст..." />
        </div>

        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
          Disabled
        </h3>
        <div className="flex items-center gap-4 rounded-lg border p-4 max-w-sm">
          <Input disabled placeholder="Заблокировано" />
        </div>

        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
          С Label
        </h3>
        <div className="flex flex-col gap-2 rounded-lg border p-4 max-w-sm">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="email@example.com" />
        </div>
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
{`<div className="grid gap-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="email@example.com" />
</div>`}
        </pre>

        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
          File Input
        </h3>
        <div className="flex items-center gap-4 rounded-lg border p-4 max-w-sm">
          <Input type="file" />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Props
        </h2>
        <p className="text-muted-foreground">
          Input принимает все стандартные HTML атрибуты для{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {"<input>"}
          </code>
        </p>
      </div>
    </div>
  )
}
