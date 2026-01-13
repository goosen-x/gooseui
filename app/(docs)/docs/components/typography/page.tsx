import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import {
  TypographyAffectsDemo,
  TypographyAsDemo,
  TypographyBlockquoteDemo,
  TypographyCodeDemo,
  TypographyDemo,
  TypographyGradientDemo,
  TypographyHighlightDemo,
} from "./typography-demo"

export const metadata = {
  title: "Typography",
  description:
    "Consistent text styling with semantic variants and gradient effects",
}

const toc = [
  { id: "preview", title: "Preview", level: 2 },
  { id: "installation", title: "Installation", level: 2 },
  { id: "usage", title: "Usage", level: 2 },
  { id: "examples", title: "Examples", level: 2 },
  { id: "variants", title: "Variants", level: 2 },
  { id: "props", title: "Props", level: 2 },
]

export default function TypographyPage() {
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Typography" />
        <p className="text-muted-foreground">
          Consistent text styling with semantic variants, gradient effects, and
          highlights.
        </p>

        {/* Preview Section */}
        <div className="space-y-4">
          <h2
            id="preview"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Preview
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
            Installation
          </h2>
          <InstallCommand packageName="@gooseui/typography" />
        </div>

        {/* Usage Section */}
        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Usage
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
            Examples
          </h2>

          {/* Gradient */}
          <div className="space-y-4">
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Gradient Text
            </h3>
            <div className="p-6 bg-muted/30 rounded-lg">
              <TypographyGradientDemo />
            </div>
            <CodeBlock>{`<Typography variant="h1">
  Build with <Typography variant="gradient" as="span">GooseUI</Typography>
</Typography>`}</CodeBlock>
          </div>

          {/* Highlight */}
          <div className="space-y-4">
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Highlighted Text
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
              Inline Code
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
              Blockquote
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
              Custom Element (as prop)
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
              Paragraph Margins (affects prop)
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
            Variants
          </h2>
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">Variant</th>
                  <th className="text-left p-3 font-medium">Element</th>
                  <th className="text-left p-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">h1</td>
                  <td className="p-3 font-mono text-xs">&lt;h1&gt;</td>
                  <td className="p-3">Main heading, largest size</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">h2</td>
                  <td className="p-3 font-mono text-xs">&lt;h2&gt;</td>
                  <td className="p-3">Section heading</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">h3</td>
                  <td className="p-3 font-mono text-xs">&lt;h3&gt;</td>
                  <td className="p-3">Subsection heading</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">h4</td>
                  <td className="p-3 font-mono text-xs">&lt;h4&gt;</td>
                  <td className="p-3">Small heading</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">p</td>
                  <td className="p-3 font-mono text-xs">&lt;p&gt;</td>
                  <td className="p-3">Default paragraph</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">lead</td>
                  <td className="p-3 font-mono text-xs">&lt;p&gt;</td>
                  <td className="p-3">Larger intro text</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">large</td>
                  <td className="p-3 font-mono text-xs">&lt;p&gt;</td>
                  <td className="p-3">Large semibold text</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">small</td>
                  <td className="p-3 font-mono text-xs">&lt;p&gt;</td>
                  <td className="p-3">Small text</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">muted</td>
                  <td className="p-3 font-mono text-xs">&lt;p&gt;</td>
                  <td className="p-3">Secondary/muted text</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">blockquote</td>
                  <td className="p-3 font-mono text-xs">&lt;blockquote&gt;</td>
                  <td className="p-3">Quote with left border</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">code</td>
                  <td className="p-3 font-mono text-xs">&lt;code&gt;</td>
                  <td className="p-3">Inline code snippet</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">gradient</td>
                  <td className="p-3 font-mono text-xs">&lt;span&gt;</td>
                  <td className="p-3">Gradient colored text</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">highlight</td>
                  <td className="p-3 font-mono text-xs">&lt;span&gt;</td>
                  <td className="p-3">Highlighted text with background</td>
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
            Props
          </h2>
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
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
                  <td className="p-3 font-mono text-xs">variant</td>
                  <td className="p-3 font-mono text-xs">
                    <code>
                      {`"h1" | "h2" | "h3" | "h4" | "p" | "lead" | "large" | "small" | "muted" | "blockquote" | "code" | "gradient" | "highlight"`}
                    </code>
                  </td>
                  <td className="p-3 font-mono text-xs">
                    <code>{`"p"`}</code>
                  </td>
                  <td className="p-3">Typography style variant</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">as</td>
                  <td className="p-3 font-mono text-xs">
                    <code>
                      {`"h1" | "h2" | "h3" | "h4" | "p" | "span" | "blockquote" | "code"`}
                    </code>
                  </td>
                  <td className="p-3 font-mono text-xs">auto</td>
                  <td className="p-3">Override rendered HTML element</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">affects</td>
                  <td className="p-3 font-mono text-xs">
                    <code>{`"default" | "removePMargin" | "withPMargin"`}</code>
                  </td>
                  <td className="p-3 font-mono text-xs">
                    <code>{`"default"`}</code>
                  </td>
                  <td className="p-3">Margin behavior for paragraphs</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">className</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">Additional CSS classes</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">children</td>
                  <td className="p-3 font-mono text-xs">React.ReactNode</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">Content to render</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DocsPage>
  )
}
