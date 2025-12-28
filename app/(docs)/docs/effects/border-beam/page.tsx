import { BorderBeam } from "@/registry/new-york/effects/border-beam"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/new-york/ui/card"

export const metadata = {
  title: "Border Beam",
  description: "Анимированный луч света, путешествующий вдоль границы контейнера",
}

export default function BorderBeamPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Border Beam
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Анимированный луч света, путешествующий вдоль границы контейнера
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Превью
        </h2>
        <div className="flex items-center justify-center rounded-lg border p-10 bg-background">
          <Card className="relative w-[350px] overflow-hidden">
            <CardHeader>
              <CardTitle>Border Beam</CardTitle>
              <CardDescription>
                Эффект анимированной границы
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Луч света плавно движется по периметру карточки, создавая эффектную анимацию.
              </p>
            </CardContent>
            <BorderBeam />
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Установка
        </h2>
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          npx shadcn@latest add https://gooseui.pro/r/border-beam.json
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Использование
        </h2>
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
{`import { BorderBeam } from "@/components/ui/border-beam"

export function MyCard() {
  return (
    <div className="relative overflow-hidden rounded-lg border p-4">
      <p>Контент карточки</p>
      <BorderBeam />
    </div>
  )
}`}
        </pre>
        <p className="text-sm text-muted-foreground">
          <strong>Важно:</strong> Контейнер должен иметь классы{" "}
          <code className="rounded bg-muted px-1">relative</code> и{" "}
          <code className="rounded bg-muted px-1">overflow-hidden</code>
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Примеры
        </h2>

        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
          Разные цвета
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-lg border p-6 text-center">
            <p className="text-sm font-medium">Orange → Purple</p>
            <BorderBeam colorFrom="#ffaa40" colorTo="#9c40ff" />
          </div>
          <div className="relative overflow-hidden rounded-lg border p-6 text-center">
            <p className="text-sm font-medium">Cyan → Blue</p>
            <BorderBeam colorFrom="#00ffff" colorTo="#0066ff" />
          </div>
          <div className="relative overflow-hidden rounded-lg border p-6 text-center">
            <p className="text-sm font-medium">Green → Yellow</p>
            <BorderBeam colorFrom="#00ff88" colorTo="#ffff00" />
          </div>
          <div className="relative overflow-hidden rounded-lg border p-6 text-center">
            <p className="text-sm font-medium">Pink → Red</p>
            <BorderBeam colorFrom="#ff69b4" colorTo="#ff0000" />
          </div>
        </div>
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
{`<BorderBeam colorFrom="#00ffff" colorTo="#0066ff" />`}
        </pre>

        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
          Разная скорость
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border p-6 text-center">
            <p className="text-sm font-medium">Быстро (6s)</p>
            <BorderBeam duration={6} />
          </div>
          <div className="relative overflow-hidden rounded-lg border p-6 text-center">
            <p className="text-sm font-medium">Нормально (12s)</p>
            <BorderBeam duration={12} />
          </div>
          <div className="relative overflow-hidden rounded-lg border p-6 text-center">
            <p className="text-sm font-medium">Медленно (20s)</p>
            <BorderBeam duration={20} />
          </div>
        </div>
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
{`<BorderBeam duration={6} />  {/* быстро */}
<BorderBeam duration={20} /> {/* медленно */}`}
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Props
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Prop</th>
                <th className="text-left py-3 px-4 font-semibold">Type</th>
                <th className="text-left py-3 px-4 font-semibold">Default</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">size</td>
                <td className="py-3 px-4 font-mono text-muted-foreground">number</td>
                <td className="py-3 px-4 font-mono">200</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">duration</td>
                <td className="py-3 px-4 font-mono text-muted-foreground">number</td>
                <td className="py-3 px-4 font-mono">12</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">delay</td>
                <td className="py-3 px-4 font-mono text-muted-foreground">number</td>
                <td className="py-3 px-4 font-mono">0</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">colorFrom</td>
                <td className="py-3 px-4 font-mono text-muted-foreground">string</td>
                <td className="py-3 px-4 font-mono">#ffaa40</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">colorTo</td>
                <td className="py-3 px-4 font-mono text-muted-foreground">string</td>
                <td className="py-3 px-4 font-mono">#9c40ff</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">borderWidth</td>
                <td className="py-3 px-4 font-mono text-muted-foreground">number</td>
                <td className="py-3 px-4 font-mono">1.5</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
