import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { BaselineStatus } from "@/registry/gooseui/ui/baseline-status"

const en = {
  description:
    "Display browser support status for web features based on the W3C WebDX Baseline specification",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  props: "Props",
  commonFeatureIds: "Common Feature IDs",
  browserCheck: "Browser check",
  references: "References",
  displayBrowserSupport:
    "Display browser support status for web features based on the W3C WebDX Baseline specification.",
  useThe: "Use the",
  propToShowRealTime:
    "prop to show real-time browser support detection alongside the Baseline status.",
  sizeVariants: "Size variants",
  iconOnly: "Icon only",
  withoutYear: "Without year",
  withFeatureIdApi: "With Feature ID (API)",
  prop: "Prop",
  type: "Type",
  default: "Default",
  description2: "Description",
  featureIdFromWebFeatures:
    'Feature ID from web-features (e.g., "scroll-snap")',
  directStatusOverride: "Direct status override (static data)",
  yearWhenFeatureBecame: "Year when feature became Baseline Newly available",
  sizeVariant: "Size variant",
  showYearInTheLabel: "Show year in the label",
  showOnlyTheIconWithout: "Show only the icon without text",
  browserFeatureToDetect:
    "Check the visitor's browser: a known feature id, true (take the check by featureId) or { css, selector, test, label } for a custom one. No row is shown when the feature has no check.",
  featureIdsCanBeFound: "Feature IDs can be found at",
  webFeaturesRepository: "web-features repository",
  feature: "Feature",
  baselineOfficial: "Baseline Official Documentation",
  webFeaturesGithub: "web-features GitHub Repository",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Статус поддержки веб-возможностей в браузерах на основе спецификации W3C WebDX Baseline",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    props: "Пропсы",
    commonFeatureIds: "Частые ID возможностей",
    browserCheck: "Проверка браузера",
    references: "Ссылки",
    displayBrowserSupport:
      "Статус поддержки веб-возможностей в браузерах на основе спецификации W3C WebDX Baseline.",
    useThe: "Проп",
    propToShowRealTime:
      "показывает определение поддержки в браузере в реальном времени рядом со статусом Baseline.",
    sizeVariants: "Размеры",
    iconOnly: "Только иконка",
    withoutYear: "Без года",
    withFeatureIdApi: "С Feature ID (API)",
    prop: "Проп",
    type: "Тип",
    default: "По умолчанию",
    description2: "Описание",
    featureIdFromWebFeatures:
      'Feature ID из web-features (например, "scroll-snap")',
    directStatusOverride: "Явное указание статуса (статические данные)",
    yearWhenFeatureBecame:
      "Год, когда возможность стала Baseline Newly available",
    sizeVariant: "Размер",
    showYearInTheLabel: "Показывать год в подписи",
    showOnlyTheIconWithout: "Показывать только иконку без текста",
    browserFeatureToDetect:
      "Проверка браузера посетителя: известный id возможности, true (проверка берётся по featureId) или { css, selector, test, label } для своей. Если проверки нет, строка не показывается.",
    featureIdsCanBeFound: "Feature ID можно найти в",
    webFeaturesRepository: "репозитории web-features",
    feature: "Возможность",
    baselineOfficial: "Официальная документация Baseline",
    webFeaturesGithub: "Репозиторий web-features на GitHub",
  },
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return {
    title: "Baseline Status",
    description: t.description,
  }
}

export default async function BaselineStatusPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
  const toc = [
    { id: "preview", title: t.preview, level: 2 },
    { id: "browser-check", title: t.browserCheck, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "examples", title: t.examples, level: 2 },
    { id: "props", title: t.props, level: 2 },
    { id: "feature-ids", title: t.commonFeatureIds, level: 2 },
    { id: "references", title: t.references, level: 2 },
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Baseline Status" />
        <p className="text-muted-foreground">{t.displayBrowserSupport}</p>

        <div className="space-y-4">
          <h2
            id="preview"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.preview}
          </h2>
          <div className="flex flex-col gap-3 py-8 px-6 bg-muted/30 rounded-lg items-start">
            <BaselineStatus status="widely" year={2022} />
            <BaselineStatus status="newly" year={2026} />
            <BaselineStatus status="limited" />
            <BaselineStatus status="no_data" />
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="browser-check"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.browserCheck}
          </h2>
          <p className="text-muted-foreground">
            {t.useThe}{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              browserCheck
            </code>{" "}
            {t.propToShowRealTime}
          </p>
          <div className="flex flex-col gap-4 py-8 px-6 bg-muted/30 rounded-lg">
            <BaselineStatus
              featureId="view-transitions"
              browserCheck="view-transitions"
            />
            <BaselineStatus featureId="popover" browserCheck="popover" />
            <BaselineStatus
              featureId="anchor-positioning"
              browserCheck="anchor-positioning"
            />
          </div>
          <CodeBlock>{`// Combined Baseline status + real-time browser check
<BaselineStatus
  featureId="view-transitions"
  browserCheck="view-transitions"
/>

// true takes the check by featureId (see baseline-checks.ts)
<BaselineStatus featureId="popover" browserCheck />

// Custom checks
<BaselineStatus
  featureId="scroll-snap"
  browserCheck={{ css: ["scroll-snap-type", "x mandatory"] }}
/>
<BaselineStatus
  browserCheck={{ selector: ":has(*)", label: ":has()" }}
/>
<BaselineStatus
  browserCheck={{ test: () => "share" in navigator, label: "Web Share" }}
/>`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/baseline-status" />
        </div>

        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.usage}
          </h2>
          <CodeBlock>{`import { BaselineStatus } from "@/components/ui/baseline-status"

// With static data
<BaselineStatus status="widely" year={2022} />

// With feature ID (fetches from API)
<BaselineStatus featureId="scroll-snap" />`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="examples"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.examples}
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.sizeVariants}</h3>
              <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 items-center py-6 px-6 bg-muted/30 rounded-lg">
                <span className="text-sm text-muted-foreground">sm:</span>
                <BaselineStatus status="widely" year={2022} size="sm" />
                <span className="text-sm text-muted-foreground">md:</span>
                <BaselineStatus status="widely" year={2022} size="md" />
                <span className="text-sm text-muted-foreground">lg:</span>
                <BaselineStatus status="widely" year={2022} size="lg" />
              </div>
              <CodeBlock>{`<BaselineStatus status="widely" year={2022} size="sm" />
<BaselineStatus status="widely" year={2022} size="md" />
<BaselineStatus status="widely" year={2022} size="lg" />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.iconOnly}</h3>
              <div className="flex gap-4 py-6 px-6 bg-muted/30 rounded-lg">
                <BaselineStatus status="widely" iconOnly />
                <BaselineStatus status="newly" iconOnly />
                <BaselineStatus status="limited" iconOnly />
                <BaselineStatus status="no_data" iconOnly />
              </div>
              <CodeBlock>{`<BaselineStatus status="widely" iconOnly />
<BaselineStatus status="newly" iconOnly />
<BaselineStatus status="limited" iconOnly />
<BaselineStatus status="no_data" iconOnly />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.withoutYear}</h3>
              <div className="flex gap-4 py-6 px-6 bg-muted/30 rounded-lg">
                <BaselineStatus status="widely" showYear={false} />
              </div>
              <CodeBlock>{`<BaselineStatus status="widely" showYear={false} />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.withFeatureIdApi}</h3>
              <div className="flex gap-4 py-6 px-6 bg-muted/30 rounded-lg">
                <BaselineStatus featureId="scroll-snap" />
              </div>
              <CodeBlock>{`// Fetches data from webstatus.dev API
<BaselineStatus featureId="scroll-snap" />`}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="props"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.props}
          </h2>
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">{t.prop}</th>
                  <th className="text-left p-3 font-medium">{t.type}</th>
                  <th className="text-left p-3 font-medium">{t.default}</th>
                  <th className="text-left p-3 font-medium">
                    {t.description2}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">featureId</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">{t.featureIdFromWebFeatures}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">status</td>
                  <td className="p-3 font-mono text-xs">
                    &quot;widely&quot; | &quot;newly&quot; | &quot;limited&quot;
                    | &quot;no_data&quot;
                  </td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">{t.directStatusOverride}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">year</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">{t.yearWhenFeatureBecame}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">size</td>
                  <td className="p-3 font-mono text-xs">
                    &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;
                  </td>
                  <td className="p-3 font-mono text-xs">&quot;md&quot;</td>
                  <td className="p-3">{t.sizeVariant}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">showYear</td>
                  <td className="p-3 font-mono text-xs">boolean</td>
                  <td className="p-3 font-mono text-xs">true</td>
                  <td className="p-3">{t.showYearInTheLabel}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">iconOnly</td>
                  <td className="p-3 font-mono text-xs">boolean</td>
                  <td className="p-3 font-mono text-xs">false</td>
                  <td className="p-3">{t.showOnlyTheIconWithout}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">browserCheck</td>
                  <td className="p-3 font-mono text-xs">
                    BrowserFeature | true |{" "}
                    {"{ css?, selector?, test?, label? }"}
                  </td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">{t.browserFeatureToDetect}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="feature-ids"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.commonFeatureIds}
          </h2>
          <p className="text-muted-foreground">
            {t.featureIdsCanBeFound}{" "}
            <a
              href="https://github.com/web-platform-dx/web-features/tree/main/features"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              {t.webFeaturesRepository}
            </a>
            .
          </p>
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">{t.feature}</th>
                  <th className="text-left p-3 font-medium">ID</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3">CSS Scroll Snap</td>
                  <td className="p-3 font-mono text-xs">scroll-snap</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">Container Queries</td>
                  <td className="p-3 font-mono text-xs">container-queries</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">CSS Grid</td>
                  <td className="p-3 font-mono text-xs">css-grid</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">Anchor Positioning</td>
                  <td className="p-3 font-mono text-xs">anchor-positioning</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">View Transitions</td>
                  <td className="p-3 font-mono text-xs">view-transitions</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">Popover API</td>
                  <td className="p-3 font-mono text-xs">popover</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="references"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.references}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <a
                href="https://web.dev/baseline"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                {t.baselineOfficial}
              </a>
            </li>
            <li>
              <a
                href="https://github.com/web-platform-dx/web-features"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                {t.webFeaturesGithub}
              </a>
            </li>
            <li>
              <a
                href="https://api.webstatus.dev/v1/features/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                WebStatus API
              </a>
            </li>
          </ul>
        </div>
      </div>
    </DocsPage>
  )
}
