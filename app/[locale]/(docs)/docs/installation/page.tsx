import { getTranslations } from "next-intl/server"
import { InstallCommand } from "@/components/docs/install-command"

export async function generateMetadata() {
  const t = await getTranslations("docs.installation")
  return {
    title: t("title"),
    description: t("description"),
  }
}

export default async function InstallationPage() {
  const t = await getTranslations("docs.installation")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-lg text-muted-foreground mt-2">{t("description")}</p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          {t("requirements")}
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>{t("requirement1")}</li>
          <li>{t("requirement2")}</li>
          <li>{t("requirement3")}</li>
          <li>{t("requirement4")}</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          {t("method1")}
        </h2>
        <p className="leading-7">{t("method1Text")}</p>
        <InstallCommand packageName="https://gooseui.pro/r/button.json" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          {t("method2")}
        </h2>
        <p className="leading-7">{t("method2Text")}</p>
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          {`{
  "registries": {
    "@gooseui": "https://gooseui.pro/r/{name}.json"
  }
}`}
        </pre>
        <p className="leading-7">{t("method2Text2")}</p>
        <InstallCommand packageName="@gooseui/button" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          {t("structure")}
        </h2>
        <p className="leading-7">{t("structureText")}</p>
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
