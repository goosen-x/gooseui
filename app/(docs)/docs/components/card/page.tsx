import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"
import { Button } from "@/registry/new-york/ui/button"

export const metadata = {
  title: "Card",
  description: "Отображает карточку с заголовком, контентом и подвалом",
}

export default function CardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Card
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Отображает карточку с заголовком, контентом и подвалом
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Превью
        </h2>
        <div className="flex items-center justify-center rounded-lg border p-6">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Создать проект</CardTitle>
              <CardDescription>
                Разверните новый проект за один клик
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Ваш новый проект будет создан с настроенным окружением
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Отмена</Button>
              <Button>Создать</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Установка
        </h2>
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          npx shadcn@latest add @gooselabs/card
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Использование
        </h2>
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
{`import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function MyCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Заголовок</CardTitle>
        <CardDescription>Описание</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Контент карточки</p>
      </CardContent>
      <CardFooter>
        <p>Подвал</p>
      </CardFooter>
    </Card>
  )
}`}
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Компоненты
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Компонент</th>
                <th className="text-left py-3 px-4 font-semibold">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">Card</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Контейнер карточки
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">CardHeader</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Заголовок карточки
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">CardTitle</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Название карточки
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">CardDescription</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Описание карточки
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">CardContent</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Основной контент
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">CardFooter</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Подвал карточки
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
