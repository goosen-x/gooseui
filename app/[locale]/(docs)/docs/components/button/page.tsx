import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { BaselineStatus } from "@/registry/gooseui/ui/baseline-status"
import {
  ButtonPreview,
  ButtonSizesDemo,
  ButtonSquircleDemo,
  ButtonVariantDemo,
} from "./button-demo"

const en = {
  intro:
    "Button renders a native button and accepts attributes such as type, disabled and aria-invalid. It offers six visual variants and four sizes, including an icon size. Use asChild to apply the same styles to a link; use Badge for a short status label.",
  auditFeature0Description: "Adjusts button padding around SVG icons",
  browserSupport: "Browser Support",
  description: "A button with various variants and sizes",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  variants: "Variants",
  sizes: "Sizes",
  props: "Props",
  iosStyleSquircleCorners: "iOS-style squircle corners using CSS",
  prop: "Prop",
  type: "Type",
  default: "Default",
  description2: "Description",
  visualStyleVariant: "Visual style variant",
  sizeOfTheButton: "Size of the button",
  renderAsChildElement: "Render as child element",
  applyIosStyleSquircle: "Apply iOS-style squircle corners (Chrome 139+)",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    intro:
      "Button создаёт обычный элемент button и принимает атрибуты type, disabled и aria-invalid. Доступны шесть вариантов оформления и четыре размера, в том числе для иконки. Через asChild те же стили можно применить к ссылке; для короткой метки статуса подойдёт Badge.",
    auditFeature0Description: "Меняет отступы кнопки с SVG",
    browserSupport: "Поддержка браузеров",
    description: "Кнопка с разными вариантами и размерами",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    variants: "Варианты",
    sizes: "Размеры",
    props: "Пропсы",
    iosStyleSquircleCorners: "Углы squircle в стиле iOS через CSS",
    prop: "Проп",
    type: "Тип",
    default: "По умолчанию",
    description2: "Описание",
    visualStyleVariant: "Визуальный вариант",
    sizeOfTheButton: "Размер кнопки",
    renderAsChildElement: "Рендерить как дочерний элемент",
    applyIosStyleSquircle: "Углы squircle в стиле iOS (Chrome 139+)",
  },
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return {
    title: "Button",
    description: t.description,
  }
}

export default async function ButtonPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
  const toc = [
    { id: "browser-support", title: t.browserSupport, level: 2 },
    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "variants", title: t.variants, level: 2 },
    { id: "sizes", title: t.sizes, level: 2 },
    { id: "squircle", title: "Squircle", level: 2 },
    { id: "props", title: t.props, level: 2 },
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Button" />
        <p className="text-lg text-muted-foreground">{t.description}</p>
        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "has",
              description: t.auditFeature0Description,
            },
          ]}
        />

        <div className="space-y-4">
          <h2
            id="preview"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.preview}
          </h2>
          <ButtonPreview />
        </div>

        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/button" />
        </div>

        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.usage}
          </h2>
          <CodeBlock>{`import { Button } from "@/components/ui/button"

export function MyComponent() {
  return <Button>Click me</Button>
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="variants"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.variants}
          </h2>

          <h3
            id="variant-default"
            className="scroll-m-20 text-xl font-semibold tracking-tight mt-6"
          >
            Default
          </h3>
          <ButtonVariantDemo label="Default" />
          <CodeBlock>{`<Button>Default</Button>`}</CodeBlock>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            Secondary
          </h3>
          <ButtonVariantDemo variant="secondary" label="Secondary" />
          <CodeBlock>{`<Button variant="secondary">Secondary</Button>`}</CodeBlock>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            Destructive
          </h3>
          <ButtonVariantDemo variant="destructive" label="Destructive" />
          <CodeBlock>{`<Button variant="destructive">Destructive</Button>`}</CodeBlock>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            Outline
          </h3>
          <ButtonVariantDemo variant="outline" label="Outline" />
          <CodeBlock>{`<Button variant="outline">Outline</Button>`}</CodeBlock>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            Ghost
          </h3>
          <ButtonVariantDemo variant="ghost" label="Ghost" />
          <CodeBlock>{`<Button variant="ghost">Ghost</Button>`}</CodeBlock>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            Link
          </h3>
          <ButtonVariantDemo variant="link" label="Link" />
          <CodeBlock>{`<Button variant="link">Link</Button>`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="sizes"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.sizes}
          </h2>
          <ButtonSizesDemo />
          <CodeBlock>{`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">...</Button>`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="squircle"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Squircle
          </h2>
          <p className="text-sm text-muted-foreground">
            {t.iosStyleSquircleCorners}{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              corner-shape: squircle
            </code>
            .
          </p>
          <BaselineStatus
            featureId="corner-shape"
            browserCheck="corner-shape"
          />
          <ButtonSquircleDemo />
          <CodeBlock>{`<Button squircle>Squircle</Button>
<Button squircle variant="secondary">Secondary</Button>
<Button squircle variant="outline">Outline</Button>`}</CodeBlock>
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
                  <td className="p-3 font-mono text-xs">variant</td>
                  <td className="p-3 font-mono text-xs">
                    &quot;default&quot; | &quot;destructive&quot; |
                    &quot;outline&quot; | &quot;secondary&quot; |
                    &quot;ghost&quot; | &quot;link&quot;
                  </td>
                  <td className="p-3 font-mono text-xs">&quot;default&quot;</td>
                  <td className="p-3">{t.visualStyleVariant}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">size</td>
                  <td className="p-3 font-mono text-xs">
                    &quot;default&quot; | &quot;sm&quot; | &quot;lg&quot; |
                    &quot;icon&quot;
                  </td>
                  <td className="p-3 font-mono text-xs">&quot;default&quot;</td>
                  <td className="p-3">{t.sizeOfTheButton}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">asChild</td>
                  <td className="p-3 font-mono text-xs">boolean</td>
                  <td className="p-3 font-mono text-xs">false</td>
                  <td className="p-3">{t.renderAsChildElement}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">squircle</td>
                  <td className="p-3 font-mono text-xs">boolean</td>
                  <td className="p-3 font-mono text-xs">false</td>
                  <td className="p-3">{t.applyIosStyleSquircle}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DocsPage>
  )
}
