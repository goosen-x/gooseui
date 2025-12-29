import { getTranslations } from "next-intl/server"
import { AnimatedTimer } from "@/registry/new-york/ui/animated-timer"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"

export async function generateMetadata() {
  const t = await getTranslations("components.animatedTimer")
  return {
    title: t("title"),
    description: t("description"),
  }
}

export default async function AnimatedTimerPage() {
  const t = await getTranslations("components.animatedTimer")
  const tCommon = await getTranslations("common")

  return (
    <div className="space-y-8">
      <DocsPageNav
        title={t("title")}
        prevHref="/docs/components/input"
      />
      <p className="text-muted-foreground">
        {t("description")}
      </p>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{t("demo")}</h2>
        <div className="flex justify-center py-12 bg-zinc-950 rounded-lg">
          <AnimatedTimer />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{tCommon("installation")}</h2>
        <InstallCommand packageName="https://gooseui.pro/r/animated-timer.json" />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{tCommon("usage")}</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { AnimatedTimer } from "@/components/ui/animated-timer"

export default function Page() {
  return <AnimatedTimer />
}`}</code>
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{tCommon("examples")}</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">{t("noSeconds")}</h3>
            <div className="flex justify-center py-8 bg-zinc-950 rounded-lg">
              <AnimatedTimer showSeconds={false} />
            </div>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto mt-2">
              <code>{`<AnimatedTimer showSeconds={false} />`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">{t("format24")}</h3>
            <div className="flex justify-center py-8 bg-zinc-950 rounded-lg">
              <AnimatedTimer use24Hour />
            </div>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto mt-2">
              <code>{`<AnimatedTimer use24Hour />`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{tCommon("props")}</h2>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 font-medium">Prop</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-left p-3 font-medium">Default</th>
                <th className="text-left p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">showSeconds</td>
                <td className="p-3 font-mono text-xs">boolean</td>
                <td className="p-3 font-mono text-xs">true</td>
                <td className="p-3">{t("showSeconds")}</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">use24Hour</td>
                <td className="p-3 font-mono text-xs">boolean</td>
                <td className="p-3 font-mono text-xs">false</td>
                <td className="p-3">{t("use24Hour")}</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">className</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3 font-mono text-xs">-</td>
                <td className="p-3">{t("additionalClasses")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
