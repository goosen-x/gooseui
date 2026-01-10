import { CodeBlock } from "@/components/docs/code-block"
import { DocsBrowserSupport } from "@/components/docs/docs-browser-support"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { AnchorTooltip } from "@/registry/new-york/ui/anchor-tooltip"

export const metadata = {
  title: "Anchor Tooltip",
  description: "CSS-only tooltips using Anchor Positioning API and Popover API",
}

const toc = [
  { id: "preview", title: "Preview", level: 2 },
  { id: "installation", title: "Installation", level: 2 },
  { id: "usage", title: "Usage", level: 2 },
  { id: "css-feature", title: "CSS Feature", level: 2 },
  { id: "props", title: "Props", level: 2 },
]

export default function AnchorTooltipPage() {
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        {/* 1. Navigation */}
        <DocsPageNav title="Anchor Tooltip" />

        {/* 2. Description */}
        <p className="text-muted-foreground">
          CSS-only tooltips using Anchor Positioning API and Popover API. No
          JavaScript positioning calculations needed.
        </p>

        {/* 3. Browser Support */}
        <DocsBrowserSupport
          features={[
            {
              featureId: "anchor-positioning",
              browserCheck: "anchor-positioning",
            },
            { featureId: "popover", browserCheck: "popover" },
          ]}
        >
          Uses{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded">anchor-name</code>{" "}
          and{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded">
            position-anchor
          </code>{" "}
          for CSS-based positioning.
        </DocsBrowserSupport>

        {/* 4. Preview */}
        <div className="space-y-4">
          <h2
            id="preview"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Preview
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8 p-8 bg-muted/30 rounded-lg">
            <AnchorTooltip content="Tooltip on top" position="top">
              <span className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-accent">
                Top
              </span>
            </AnchorTooltip>
            <AnchorTooltip content="Tooltip on bottom" position="bottom">
              <span className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-accent">
                Bottom
              </span>
            </AnchorTooltip>
            <AnchorTooltip content="Tooltip on left" position="left">
              <span className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-accent">
                Left
              </span>
            </AnchorTooltip>
            <AnchorTooltip content="Tooltip on right" position="right">
              <span className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-accent">
                Right
              </span>
            </AnchorTooltip>
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
          <InstallCommand packageName="https://gooseui.pro/r/anchor-tooltip.json" />
        </div>

        {/* 6. Usage */}
        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Usage
          </h2>
          <CodeBlock>{`import { AnchorTooltip } from "@/components/ui/anchor-tooltip"

<AnchorTooltip content="This is a tooltip">
  <span>Hover me</span>
</AnchorTooltip>

// With position
<AnchorTooltip content="Bottom tooltip" position="bottom">
  <Button>Click me</Button>
</AnchorTooltip>`}</CodeBlock>
        </div>

        {/* 7. CSS Feature */}
        <div className="space-y-4">
          <h2
            id="css-feature"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            CSS Feature
          </h2>
          <CodeBlock>{`.anchor-trigger {
  anchor-name: --tooltip-anchor;
}

.tooltip {
  position: fixed;
  position-anchor: --tooltip-anchor;
  top: anchor(bottom);
  left: anchor(center);
  translate: -50% 8px;
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
                  <td className="p-3 font-mono text-xs">content</td>
                  <td className="p-3 font-mono text-xs">ReactNode</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">Tooltip content</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">position</td>
                  <td className="p-3 font-mono text-xs">
                    &quot;top&quot; | &quot;bottom&quot; | &quot;left&quot; |
                    &quot;right&quot;
                  </td>
                  <td className="p-3 font-mono text-xs">&quot;top&quot;</td>
                  <td className="p-3">Tooltip position</td>
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
    </DocsPage>
  )
}
