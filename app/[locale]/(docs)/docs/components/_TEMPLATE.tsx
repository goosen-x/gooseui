/**
 * COMPONENT DOCUMENTATION TEMPLATE (two languages: en / ru)
 *
 * Copy this file when creating documentation for a new component.
 * Rename to: {component-name}/page.tsx
 *
 * TWO LANGUAGES:
 * - All visible texts live in `content: Dict<typeof en>` below.
 *   English is the source of truth, Russian must have the same shape.
 * - Call setRequestLocale(locale) in every page, export generateMetadata.
 * - Internal links use `Link` from "@/i18n/navigation", not "next/link".
 * - Code examples inside <CodeBlock> are NOT translated.
 *
 * STRUCTURE ORDER (follow strictly):
 * 1. DocsPageNav - title and navigation
 * 2. Description - short description
 * 3. Browser Support - BrowserSupport (if component uses modern APIs)
 * 4. Preview - interactive demo
 * 5. Installation - InstallCommand
 * 6. Usage - basic code example
 * 7. Examples - different use cases
 * 8. Props - properties table (4 columns: Prop, Type, Default, Description)
 * 9. [Components] - for compound components (optional)
 * 10. [Features] - feature list (optional)
 * 11. [Hook] - hook documentation (optional)
 * 12. [References] - external links (optional)
 */

import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"

// import { ComponentName } from "@/registry/gooseui/ui/component-name"
// import { ComponentDemo } from "./component-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  title: "Component Name",
  description: "Short description of the component",
  intro: "Short description of the component and its purpose.",
  browserSupport: "Browser Support",
  browserFeatureDescription: "What this feature does in the component.",
  preview: "Preview",
  previewPlaceholder: "Component preview here",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  exampleTitle: "Example Title",
  exampleText: "Description of this example.",
  examplePreview: "Example preview",
  anotherExampleTitle: "Another Example",
  anotherExamplePreview: "Another example preview",
  props: "Props",
  propsHeaders: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  propVariant: "Visual style variant",
  propSize: "Size of the component",
  propClassName: "Additional CSS classes",
  // Optional sections: uncomment together with the JSX at the bottom
  // components: "Components",
  // features: "Features",
  // hook: "useComponentName Hook",
  // hookText: "Access component state and controls programmatically:",
  // references: "References",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    title: "Название компонента",
    description: "Краткое описание компонента",
    intro: "Краткое описание компонента и его назначения.",
    browserSupport: "Поддержка браузеров",
    browserFeatureDescription: "Что эта возможность делает в компоненте.",
    preview: "Превью",
    previewPlaceholder: "Здесь будет превью компонента",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    exampleTitle: "Название примера",
    exampleText: "Описание этого примера.",
    examplePreview: "Превью примера",
    anotherExampleTitle: "Ещё один пример",
    anotherExamplePreview: "Превью ещё одного примера",
    props: "Пропсы",
    propsHeaders: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    propVariant: "Визуальный вариант оформления",
    propSize: "Размер компонента",
    propClassName: "Дополнительные CSS-классы",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: t.title, description: t.description }
}

export default async function ComponentNamePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]

  // Table of contents: ids must match the h2 ids below
  const toc = [
    { id: "browser-support", title: t.browserSupport, level: 2 },
    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "examples", title: t.examples, level: 2 },
    { id: "props", title: t.props, level: 2 },
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        {/* 1. Navigation - prev/next links are auto-generated from docs-navigation.ts */}
        <DocsPageNav title={t.title} />

        {/* 2. Description */}
        <p className="text-muted-foreground">{t.intro}</p>

        {/* 3. Browser Support (if uses modern APIs) */}
        {/* Remove this section if component doesn't use modern browser APIs */}
        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "feature-id",
              // Do not translate the feature name: it is taken from webstatus.dev.
              // `name` is only an English override, the same in en and ru.
              description: t.browserFeatureDescription,
              // The "Your browser supports …" line appears automatically for
              // every featureId from registry/gooseui/lib/baseline-checks.ts.
              // Add a new id there if the feature is missing; `browserCheck: false` hides it.
            },
          ]}
        />

        {/* 4. Preview */}
        <div className="space-y-4">
          <h2
            id="preview"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.preview}
          </h2>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            {/* <ComponentDemo /> */}
            <p className="text-muted-foreground">{t.previewPlaceholder}</p>
          </div>
        </div>

        {/* 5. Installation */}
        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/component-name" />
        </div>

        {/* 6. Usage (code is not translated) */}
        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.usage}
          </h2>
          <CodeBlock>{`import { ComponentName } from "@/components/ui/component-name"

export default function Example() {
  return <ComponentName />
}`}</CodeBlock>
        </div>

        {/* 7. Examples */}
        <div className="space-y-4">
          <h2
            id="examples"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.examples}
          </h2>

          <div className="space-y-8">
            {/* Example 1 */}
            <div>
              <h3 className="text-lg font-medium mb-3">{t.exampleTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.exampleText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                {/* <ExampleDemo /> */}
                <p className="text-muted-foreground">{t.examplePreview}</p>
              </div>
              <CodeBlock className="mt-4">{`<ComponentName variant="example" />`}</CodeBlock>
            </div>

            {/* Example 2 */}
            <div>
              <h3 className="text-lg font-medium mb-3">
                {t.anotherExampleTitle}
              </h3>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                {/* <AnotherExampleDemo /> */}
                <p className="text-muted-foreground">
                  {t.anotherExamplePreview}
                </p>
              </div>
              <CodeBlock className="mt-4">{`<ComponentName size="lg" />`}</CodeBlock>
            </div>
          </div>
        </div>

        {/* 8. Props (or use <DocsPropsTable props={[...]} /> from "@/components/docs") */}
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
                  <th className="text-left p-3 font-medium">
                    {t.propsHeaders.prop}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.propsHeaders.type}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.propsHeaders.default}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.propsHeaders.description}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">variant</td>
                  <td className="p-3 font-mono text-xs">
                    &quot;default&quot; | &quot;secondary&quot;
                  </td>
                  <td className="p-3 font-mono text-xs">&quot;default&quot;</td>
                  <td className="p-3">{t.propVariant}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">size</td>
                  <td className="p-3 font-mono text-xs">
                    &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;
                  </td>
                  <td className="p-3 font-mono text-xs">&quot;md&quot;</td>
                  <td className="p-3">{t.propSize}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">className</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">{t.propClassName}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 9. Components (for compound components) - OPTIONAL */}
        {/* Add `components` to the dictionary and the toc, then use the same table markup as Props */}

        {/* 10. Features - OPTIONAL */}
        {/* Add `features` to the dictionary and the toc. Render items from an array in the dictionary */}

        {/* 11. Hook - OPTIONAL */}
        {/* Add `hook` / `hookText` to the dictionary; the CodeBlock with the hook example stays untranslated */}

        {/* Baseline component for automatic feature detection - OPTIONAL */}

        {/* 12. References - OPTIONAL */}
        {/* Add `references` to the dictionary; external links use <a target="_blank" rel="noopener noreferrer"> */}
      </div>
    </DocsPage>
  )
}
