import { CodeBlock } from "@/components/docs/code-block"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { DocsBrowserSupport } from "@/components/docs/docs-browser-support"

export const metadata = {
  title: "Balanced Text",
  description: "Typography components using text-wrap: balance and text-wrap: pretty",
}

export default function BalancedTextPage() {
  return (
    <div className="space-y-8">
      {/* 1. Navigation */}
      <DocsPageNav
        title="Balanced Text"
        prevHref="/docs/effects/reveal-on-scroll"
        nextHref="/docs/effects/stacking-cards"
      />

      {/* 2. Description */}
      <p className="text-muted-foreground">
        Typography components using text-wrap: balance and text-wrap: pretty
        for better text distribution and orphan prevention.
      </p>

      {/* 3. Browser Support */}
      <DocsBrowserSupport
        features={[
          { featureId: "text-wrap-balance", browserCheck: "text-wrap-balance" },
          { featureId: "text-wrap-pretty", browserCheck: "text-wrap-pretty" },
        ]}
      >
        Uses <code className="bg-muted px-1.5 py-0.5 rounded">text-wrap: balance</code> for headings
        and <code className="bg-muted px-1.5 py-0.5 rounded">text-wrap: pretty</code> for paragraphs.
      </DocsBrowserSupport>

      {/* 4. Preview */}
      <div className="space-y-4">
        <h2
          id="preview"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Preview
        </h2>
        <div className="rounded-lg border bg-muted/30 p-8 space-y-4">
          <h3 className="text-xl font-bold [text-wrap:balance]">
            This is a balanced heading that distributes text evenly across multiple lines
          </h3>
          <p className="text-muted-foreground [text-wrap:pretty]">
            This paragraph uses text-wrap: pretty to prevent orphans at the end of the text block.
            The last line won&apos;t have just one lonely word.
          </p>
        </div>
      </div>

      {/* 5. Installation */}
      <div className="space-y-4">
        <h2
          id="installation"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Installation
        </h2>
        <InstallCommand packageName="https://gooseui.pro/r/balanced-text.json" />
      </div>

      {/* 6. Usage */}
      <div className="space-y-4">
        <h2
          id="usage"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Usage
        </h2>
        <CodeBlock>{`import { BalancedHeading, PrettyParagraph, BalancedText } from "@/components/effects/balanced-text"

// Balanced headings
<BalancedHeading as="h1">
  This heading will have balanced line lengths
</BalancedHeading>

// Pretty paragraphs (no orphans)
<PrettyParagraph>
  Long paragraph text that won't end with a single word on the last line.
</PrettyParagraph>

// Generic wrapper
<BalancedText mode="balance">Any text</BalancedText>`}</CodeBlock>
      </div>

      {/* 7. CSS Feature */}
      <div className="space-y-4">
        <h2
          id="css-feature"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          CSS Feature
        </h2>
        <div className="space-y-4">
          <div>
            <p className="font-medium">text-wrap: balance</p>
            <p className="text-sm text-muted-foreground mb-2">
              Balances text across lines for headings. Limited to ~6 lines for performance.
            </p>
          </div>
          <div>
            <p className="font-medium">text-wrap: pretty</p>
            <p className="text-sm text-muted-foreground mb-2">
              Prevents orphans in paragraphs. Works on any length of text.
            </p>
          </div>
        </div>
        <CodeBlock>{`.balanced-heading {
  text-wrap: balance;
}

.pretty-paragraph {
  text-wrap: pretty;
}`}</CodeBlock>
      </div>

      {/* 8. Props */}
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
                <td className="p-3 font-mono text-xs">as</td>
                <td className="p-3 font-mono text-xs">&quot;h1&quot; | &quot;h2&quot; | ... | &quot;h6&quot;</td>
                <td className="p-3 font-mono text-xs">&quot;h2&quot;</td>
                <td className="p-3">Heading level (BalancedHeading)</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">mode</td>
                <td className="p-3 font-mono text-xs">&quot;balance&quot; | &quot;pretty&quot; | &quot;stable&quot;</td>
                <td className="p-3 font-mono text-xs">&quot;balance&quot;</td>
                <td className="p-3">Text wrap mode (BalancedText)</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">className</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3 font-mono text-xs">-</td>
                <td className="p-3">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
