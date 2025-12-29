import { getTranslations } from "next-intl/server"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"
import { Button } from "@/registry/new-york/ui/button"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"

export async function generateMetadata() {
  const t = await getTranslations("components.card")
  return {
    title: t("title"),
    description: t("description"),
  }
}

export default async function CardPage() {
  const t = await getTranslations("components.card")
  const tCommon = await getTranslations("common")

  return (
    <div className="space-y-6">
      <DocsPageNav
        title={t("title")}
        prevHref="/docs/components/button"
        nextHref="/docs/components/input"
      />
      <p className="text-lg text-muted-foreground">
        {t("description")}
      </p>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          {tCommon("preview")}
        </h2>
        <div className="flex items-center justify-center rounded-lg border p-6">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>{t("createProject")}</CardTitle>
              <CardDescription>
                {t("createProjectDesc")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t("createProjectText")}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">{tCommon("cancel")}</Button>
              <Button>{tCommon("create")}</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          {tCommon("installation")}
        </h2>
        <InstallCommand packageName="https://gooseui.pro/r/card.json" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          {tCommon("usage")}
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
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content</p>
      </CardContent>
      <CardFooter>
        <p>Footer</p>
      </CardFooter>
    </Card>
  )
}`}
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          {t("components")}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Component</th>
                <th className="text-left py-3 px-4 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">Card</td>
                <td className="py-3 px-4 text-muted-foreground">
                  {t("cardContainer")}
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">CardHeader</td>
                <td className="py-3 px-4 text-muted-foreground">
                  {t("cardHeader")}
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">CardTitle</td>
                <td className="py-3 px-4 text-muted-foreground">
                  {t("cardTitle")}
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">CardDescription</td>
                <td className="py-3 px-4 text-muted-foreground">
                  {t("cardDescription")}
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">CardContent</td>
                <td className="py-3 px-4 text-muted-foreground">
                  {t("cardContent")}
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">CardFooter</td>
                <td className="py-3 px-4 text-muted-foreground">
                  {t("cardFooter")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
