import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPreview } from "@/components/docs/docs-preview"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { DocsSection } from "@/components/docs/docs-section"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { ScrollContainerDemo } from "./demo"

const en = {
  auditFeature0Description: "Colors the scrollbar",
  auditFeature1Description: "Controls scrollbar width",
  auditFeature2Description: "Reserves space for the scrollbar",
  auditFeature3Description: "Colors the scrollbar thumb and track",
  description: "Scroll area with a themed scrollbar, no JavaScript",
  intro:
    "A scroll area with a scrollbar in your theme colors. It is a server component with no JavaScript: one shared stylesheet, the variant and modes live in data attributes.",
  browserSupport: "Browser Support",
  supportDescription0: "Sets the scrollbar colors.",
  supportDescription1: "Sets a thin scrollbar.",
  supportDescription2: "Reserves space for the scrollbar.",
  browserSupportText:
    "Colors come from scrollbar-color and the thin width from scrollbar-width (Chrome, Firefox, Safari 26+). ::-webkit-scrollbar is only a fallback for older Safari, because Chrome 121+ ignores it once the standard properties are set. forceVisible reserves space with scrollbar-gutter. In a browser without any of these you get the regular system scrollbar.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  props: "Props",
  previewHint:
    "Three variants. The switch turns auto-hide on for all of them. On macOS overlay scrollbars the track is not drawn.",
  autoHideScrollbar: "Auto-hide scrollbar",
  variants: "Variants",
  containerHeight: "Container height, number in px or any CSS length",
  showScrollbarOnlyOnHover:
    "Show the scrollbar only on hover or focus, with a fade. Touch screens always show it",
  variantText:
    "default: thumb muted-foreground/50 on a muted track. minimal: thin translucent thumb without a track (4px in the Safari fallback). primary: thumb in the primary color",
  forceVisibleText:
    "Reserve space for the scrollbar with scrollbar-gutter: stable. Does not make overlay scrollbars permanent",
  refText: "Ref to the scrolling div",
  additionalCssClasses: "Additional CSS classes",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    auditFeature0Description: "Задаёт цвет полосы прокрутки",
    auditFeature1Description: "Управляет шириной полосы прокрутки",
    auditFeature2Description: "Оставляет место для полосы прокрутки",
    auditFeature3Description: "Окрашивает ползунок и дорожку прокрутки",
    description:
      "Область прокрутки со скроллбаром в цветах темы, без JavaScript",
    intro:
      "Область прокрутки со скроллбаром в цветах вашей темы. Это серверный компонент без JavaScript: одна общая таблица стилей, вариант и режимы задаются data-атрибутами.",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Задаёт цвета полосы прокрутки.",
    supportDescription1: "Делает полосу прокрутки тонкой.",
    supportDescription2: "Резервирует место для полосы прокрутки.",
    browserSupportText:
      "Цвета задаёт scrollbar-color, тонкую ширину scrollbar-width (Chrome, Firefox, Safari 26+). ::-webkit-scrollbar нужен только как фолбэк для старого Safari: Chrome 121+ игнорирует его, как только заданы стандартные свойства. forceVisible резервирует место через scrollbar-gutter. В браузере без всего этого будет обычный системный скроллбар.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    props: "Пропсы",
    previewHint:
      "Три варианта. Переключатель включает автоскрытие у всех. В оверлейных полосах macOS дорожка не рисуется.",
    autoHideScrollbar: "Скроллбар с автоскрытием",
    variants: "Варианты",
    containerHeight: "Высота контейнера: число в px или любая длина CSS",
    showScrollbarOnlyOnHover:
      "Показывать скроллбар только при наведении или фокусе, с плавным появлением. На сенсорных экранах он виден всегда",
    variantText:
      "default: ползунок muted-foreground/50 на дорожке muted. minimal: тонкий полупрозрачный ползунок без дорожки (4px в фолбэке для Safari). primary: ползунок цвета primary",
    forceVisibleText:
      "Зарезервировать место под скроллбар через scrollbar-gutter: stable. Оверлейные полосы постоянными не делает",
    refText: "Ref на прокручиваемый div",
    additionalCssClasses: "Дополнительные CSS-классы",
  },
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return {
    title: "Scroll Container",
    description: t.description,
  }
}

export default async function ScrollContainerPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
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
        <DocsPageNav title="Scroll Container" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "scrollbar-color",
              description: t.auditFeature0Description,
            },
            {
              featureId: "scrollbar-width",
              description: t.auditFeature1Description,
            },
            {
              featureId: "scrollbar-gutter",
              description: t.auditFeature2Description,
            },
            {
              featureId: "color-mix",
              description: t.auditFeature3Description,
            },
          ]}
        />

        <DocsPreview description={t.previewHint}>
          <ScrollContainerDemo />
        </DocsPreview>

        <DocsSection id="installation" title={t.installation}>
          <InstallCommand packageName="@gooseui/scroll-container" />
        </DocsSection>

        <DocsSection id="usage" title={t.usage}>
          <CodeBlock>{`import { ScrollContainer } from "@/components/ui/scroll-container"

<ScrollContainer height="20rem">
  <div className="p-4 space-y-4">
    {/* Your scrollable content */}
  </div>
</ScrollContainer>`}</CodeBlock>
        </DocsSection>

        <DocsSection id="examples" title={t.examples}>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">
                {t.autoHideScrollbar}
              </h3>
              <CodeBlock>{`<ScrollContainer height="16rem" autoHide>
  {/* Scrollbar appears on hover and focus, hidden otherwise */}
</ScrollContainer>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.variants}</h3>
              <CodeBlock>{`<ScrollContainer variant="default" />
<ScrollContainer variant="minimal" />
<ScrollContainer variant="primary" />`}</CodeBlock>
            </div>
          </div>
        </DocsSection>

        <DocsPropsTable
          props={[
            {
              name: "height",
              type: "string | number",
              default: '"100%"',
              description: t.containerHeight,
            },
            {
              name: "autoHide",
              type: "boolean",
              default: "false",
              description: t.showScrollbarOnlyOnHover,
            },
            {
              name: "variant",
              type: '"default" | "minimal" | "primary"',
              default: '"default"',
              description: t.variantText,
            },
            {
              name: "forceVisible",
              type: "boolean",
              default: "false",
              description: t.forceVisibleText,
            },
            {
              name: "ref",
              type: "Ref<HTMLDivElement>",
              description: t.refText,
            },
            {
              name: "className",
              type: "string",
              description: t.additionalCssClasses,
            },
          ]}
        />
      </div>
    </DocsPage>
  )
}
