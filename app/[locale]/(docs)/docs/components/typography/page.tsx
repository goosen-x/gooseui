import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  TypographyAffectsDemo,
  TypographyAsDemo,
  TypographyBlockquoteDemo,
  TypographyCodeDemo,
  TypographyDemo,
  TypographyHighlightDemo,
} from "./typography-demo"

const en = {
  consistentTextStylingWith: "Consistent text styling with semantic variants",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  variants: "Variants",
  props: "Props",
  consistentTextStylingWith2:
    "Consistent text styling with semantic variants and highlights.",
  highlightedText: "Highlighted Text",
  inlineCode: "Inline Code",
  blockquote: "Blockquote",
  customElementAsProp: "Custom Element (as prop)",
  paragraphMarginsAffectsProp: "Paragraph Margins (affects prop)",
  variant: "Variant",
  element: "Element",
  description: "Description",
  mainHeadingLargestSize: "Main heading, largest size",
  sectionHeading: "Section heading",
  subsectionHeading: "Subsection heading",
  smallHeading: "Small heading",
  defaultParagraph: "Default paragraph",
  largerIntroText: "Larger intro text",
  largeSemiboldText: "Large semibold text",
  smallText: "Small text",
  secondaryMutedText: "Secondary/muted text",
  quoteWithLeftBorder: "Quote with left border",
  inlineCodeSnippet: "Inline code snippet",
  highlightedTextWithBackground: "Highlighted text with background",
  prop: "Prop",
  type: "Type",
  default: "Default",
  typographyStyleVariant: "Typography style variant",
  overrideRenderedHtmlElement: "Override rendered HTML element",
  marginBehaviorForParagraphs: "Margin behavior for paragraphs",
  additionalCssClasses: "Additional CSS classes",
  contentToRender: "Content to render",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    consistentTextStylingWith:
      "Единообразная стилизация текста: семантические варианты",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    variants: "Варианты",
    props: "Пропсы",
    consistentTextStylingWith2:
      "Единообразная стилизация текста: семантические варианты и выделение.",
    highlightedText: "Выделенный текст",
    inlineCode: "Строчный код",
    blockquote: "Цитата",
    customElementAsProp: "Свой элемент (проп as)",
    paragraphMarginsAffectsProp: "Отступы абзацев (проп affects)",
    variant: "Вариант",
    element: "Элемент",
    description: "Описание",
    mainHeadingLargestSize: "Главный заголовок, самый крупный",
    sectionHeading: "Заголовок раздела",
    subsectionHeading: "Заголовок подраздела",
    smallHeading: "Малый заголовок",
    defaultParagraph: "Обычный абзац",
    largerIntroText: "Крупный вводный текст",
    largeSemiboldText: "Крупный полужирный текст",
    smallText: "Мелкий текст",
    secondaryMutedText: "Второстепенный приглушённый текст",
    quoteWithLeftBorder: "Цитата с границей слева",
    inlineCodeSnippet: "Строчный фрагмент кода",
    highlightedTextWithBackground: "Текст с фоновой подсветкой",
    prop: "Проп",
    type: "Тип",
    default: "По умолчанию",
    typographyStyleVariant: "Вариант стиля текста",
    overrideRenderedHtmlElement:
      "Переопределяет HTML-элемент, в который рендерится текст",
    marginBehaviorForParagraphs: "Поведение отступов у абзацев",
    additionalCssClasses: "Дополнительные CSS-классы",
    contentToRender: "Содержимое",
  },
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Typography", description: t.consistentTextStylingWith }
}

export default async function TypographyPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
  const toc = [
    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "examples", title: t.examples, level: 2 },
    { id: "variants", title: t.variants, level: 2 },
    { id: "props", title: t.props, level: 2 },
  ]
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Typography" />
        <p className="text-muted-foreground">{t.consistentTextStylingWith2}</p>

        {/* Preview Section */}
        <div className="space-y-4">
          <h2
            id="preview"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.preview}
          </h2>
          <div className="p-6 bg-muted/30 rounded-lg">
            <TypographyDemo />
          </div>
        </div>

        {/* Installation Section */}
        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/typography" />
        </div>

        {/* Usage Section */}
        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.usage}
          </h2>
          <CodeBlock>{`import { Typography } from "@/components/ui/typography"

export function MyComponent() {
  return (
    <div>
      <Typography variant="h1">Heading</Typography>
      <Typography variant="p">Paragraph text</Typography>
      <Typography variant="muted">Secondary text</Typography>
    </div>
  )
}`}</CodeBlock>
        </div>

        {/* Examples Section */}
        <div className="space-y-4">
          <h2
            id="examples"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.examples}
          </h2>

          {/* Highlight */}
          <div className="space-y-4">
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {t.highlightedText}
            </h3>
            <div className="p-6 bg-muted/30 rounded-lg">
              <TypographyHighlightDemo />
            </div>
            <CodeBlock>{`<Typography variant="p">
  This text has a <Typography variant="highlight" as="span">highlighted</Typography> word.
</Typography>`}</CodeBlock>
          </div>

          {/* Code */}
          <div className="space-y-4">
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {t.inlineCode}
            </h3>
            <div className="p-6 bg-muted/30 rounded-lg">
              <TypographyCodeDemo />
            </div>
            <CodeBlock>{`<Typography variant="p">
  Use <Typography variant="code" as="code">npm install gooseui</Typography> to install.
</Typography>`}</CodeBlock>
          </div>

          {/* Blockquote */}
          <div className="space-y-4">
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {t.blockquote}
            </h3>
            <div className="p-6 bg-muted/30 rounded-lg">
              <TypographyBlockquoteDemo />
            </div>
            <CodeBlock>{`<Typography variant="blockquote">
  "Design is not just what it looks like..."
</Typography>`}</CodeBlock>
          </div>

          {/* Custom Element */}
          <div className="space-y-4">
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {t.customElementAsProp}
            </h3>
            <div className="p-6 bg-muted/30 rounded-lg">
              <TypographyAsDemo />
            </div>
            <CodeBlock>{`// Renders as <p> but looks like <h1>
<Typography variant="h1" as="p">
  This looks like H1 but renders as a paragraph
</Typography>`}</CodeBlock>
          </div>

          {/* Affects (margins) */}
          <div className="space-y-4">
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {t.paragraphMarginsAffectsProp}
            </h3>
            <div className="p-6 bg-muted/30 rounded-lg">
              <TypographyAffectsDemo />
            </div>
            <CodeBlock>{`<Typography variant="p" affects="withPMargin">With margin</Typography>
<Typography variant="p" affects="removePMargin">Without margin</Typography>`}</CodeBlock>
          </div>
        </div>

        {/* Variants Section */}
        <div className="space-y-4">
          <h2
            id="variants"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.variants}
          </h2>
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">{t.variant}</th>
                  <th className="text-left p-3 font-medium">{t.element}</th>
                  <th className="text-left p-3 font-medium">{t.description}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">h1</td>
                  <td className="p-3 font-mono text-xs">&lt;h1&gt;</td>
                  <td className="p-3">{t.mainHeadingLargestSize}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">h2</td>
                  <td className="p-3 font-mono text-xs">&lt;h2&gt;</td>
                  <td className="p-3">{t.sectionHeading}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">h3</td>
                  <td className="p-3 font-mono text-xs">&lt;h3&gt;</td>
                  <td className="p-3">{t.subsectionHeading}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">h4</td>
                  <td className="p-3 font-mono text-xs">&lt;h4&gt;</td>
                  <td className="p-3">{t.smallHeading}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">p</td>
                  <td className="p-3 font-mono text-xs">&lt;p&gt;</td>
                  <td className="p-3">{t.defaultParagraph}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">lead</td>
                  <td className="p-3 font-mono text-xs">&lt;p&gt;</td>
                  <td className="p-3">{t.largerIntroText}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">large</td>
                  <td className="p-3 font-mono text-xs">&lt;p&gt;</td>
                  <td className="p-3">{t.largeSemiboldText}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">small</td>
                  <td className="p-3 font-mono text-xs">&lt;p&gt;</td>
                  <td className="p-3">{t.smallText}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">muted</td>
                  <td className="p-3 font-mono text-xs">&lt;p&gt;</td>
                  <td className="p-3">{t.secondaryMutedText}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">blockquote</td>
                  <td className="p-3 font-mono text-xs">&lt;blockquote&gt;</td>
                  <td className="p-3">{t.quoteWithLeftBorder}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">code</td>
                  <td className="p-3 font-mono text-xs">&lt;code&gt;</td>
                  <td className="p-3">{t.inlineCodeSnippet}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">highlight</td>
                  <td className="p-3 font-mono text-xs">&lt;span&gt;</td>
                  <td className="p-3">{t.highlightedTextWithBackground}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Props Section */}
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
                  <th className="text-left p-3 font-medium">{t.description}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">variant</td>
                  <td className="p-3 font-mono text-xs">
                    <code>
                      {`"h1" | "h2" | "h3" | "h4" | "p" | "lead" | "large" | "small" | "muted" | "blockquote" | "code" | "highlight"`}
                    </code>
                  </td>
                  <td className="p-3 font-mono text-xs">
                    <code>{`"p"`}</code>
                  </td>
                  <td className="p-3">{t.typographyStyleVariant}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">as</td>
                  <td className="p-3 font-mono text-xs">
                    <code>
                      {`"h1" | "h2" | "h3" | "h4" | "p" | "span" | "blockquote" | "code"`}
                    </code>
                  </td>
                  <td className="p-3 font-mono text-xs">auto</td>
                  <td className="p-3">{t.overrideRenderedHtmlElement}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">affects</td>
                  <td className="p-3 font-mono text-xs">
                    <code>{`"default" | "removePMargin" | "withPMargin"`}</code>
                  </td>
                  <td className="p-3 font-mono text-xs">
                    <code>{`"default"`}</code>
                  </td>
                  <td className="p-3">{t.marginBehaviorForParagraphs}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">className</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">{t.additionalCssClasses}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">children</td>
                  <td className="p-3 font-mono text-xs">React.ReactNode</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">{t.contentToRender}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DocsPage>
  )
}
