import { Link } from "@/i18n/routing"
import { getTranslations } from "next-intl/server"
import { InstallCommand } from "@/components/docs/install-command"

export async function generateMetadata() {
  const t = await getTranslations("docs.introduction")
  return {
    title: t("title"),
    description: t("description"),
  }
}

export default async function DocsPage() {
  const t = await getTranslations("docs.introduction")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          {t("heading")}
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          {t("description")}
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          {t("whatIs")}
        </h2>
        <p className="leading-7">
          {t("whatIsText")}
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          {t("features")}
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>{t("feature1")}</li>
          <li>{t("feature2")}</li>
          <li>{t("feature3")}</li>
          <li>{t("feature4")}</li>
          <li>{t("feature5")}</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          {t("quickStart")}
        </h2>
        <p className="leading-7">
          {t("quickStartText")}
        </p>
        <InstallCommand packageName="https://gooseui.pro/r/button.json" />
      </div>

      <div className="flex gap-4 pt-4">
        <Link
          href="/docs/installation"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          {t("installation")}
        </Link>
        <Link
          href="/docs/components/button"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          {t("components")}
        </Link>
      </div>
    </div>
  )
}
