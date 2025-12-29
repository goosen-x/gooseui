import { getTranslations } from "next-intl/server"
import { Input } from "@/registry/new-york/ui/input"
import { Label } from "@/registry/new-york/ui/label"

export async function generateMetadata() {
  const t = await getTranslations("components.input")
  return {
    title: t("title"),
    description: t("description"),
  }
}

export default async function InputPage() {
  const t = await getTranslations("components.input")
  const tCommon = await getTranslations("common")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          {t("description")}
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          {tCommon("preview")}
        </h2>
        <div className="flex flex-col gap-4 rounded-lg border p-6 max-w-sm">
          <Input placeholder="Email" type="email" />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          {tCommon("installation")}
        </h2>
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          npx shadcn@latest add @gooseui/input
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          {tCommon("usage")}
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
          {tCommon("examples")}
        </h2>

        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
          {t("default")}
        </h3>
        <div className="flex items-center gap-4 rounded-lg border p-4 max-w-sm">
          <Input placeholder={t("enterText")} />
        </div>

        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
          {t("disabled")}
        </h3>
        <div className="flex items-center gap-4 rounded-lg border p-4 max-w-sm">
          <Input disabled placeholder={t("blocked")} />
        </div>

        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
          {t("withLabel")}
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
          {t("fileInput")}
        </h3>
        <div className="flex items-center gap-4 rounded-lg border p-4 max-w-sm">
          <Input type="file" />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          {tCommon("props")}
        </h2>
        <p className="text-muted-foreground">
          {t("propsNote")}
        </p>
      </div>
    </div>
  )
}
