import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { BaselineStatus } from "@/registry/new-york/ui/baseline-status"

export const metadata = {
  title: "Baseline Status",
  description:
    "Display browser support status for web features based on the W3C WebDX Baseline specification",
}

const toc = [
  { id: "preview", title: "Preview", level: 2 },
  { id: "browser-check", title: "Browser Check", level: 2 },
  { id: "installation", title: "Installation", level: 2 },
  { id: "usage", title: "Usage", level: 2 },
  { id: "examples", title: "Examples", level: 2 },
  { id: "props", title: "Props", level: 2 },
  { id: "feature-ids", title: "Common Feature IDs", level: 2 },
  { id: "references", title: "References", level: 2 },
]

export default function BaselineStatusPage() {
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Baseline Status" />
        <p className="text-muted-foreground">
          Display browser support status for web features based on the W3C WebDX
          Baseline specification.
        </p>

        <div className="space-y-4">
          <h2
            id="preview"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Preview
          </h2>
          <div className="flex flex-col gap-3 py-8 px-6 bg-muted/30 rounded-lg items-start">
            <BaselineStatus status="widely" year={2022} />
            <BaselineStatus status="newly" year={2024} />
            <BaselineStatus status="limited" />
            <BaselineStatus status="no_data" />
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="browser-check"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Browser Check
          </h2>
          <p className="text-muted-foreground">
            Use the{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              browserCheck
            </code>{" "}
            prop to show real-time browser support detection alongside the
            Baseline status.
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

// Available browser checks:
// "view-transitions" - View Transitions API
// "popover" - Popover API
// "anchor-positioning" - CSS Anchor Positioning`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Installation
          </h2>
          <InstallCommand packageName="https://gooseui.pro/r/baseline-status.json" />
        </div>

        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Usage
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
            Examples
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Size variants</h3>
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
              <h3 className="text-lg font-medium mb-3">Icon only</h3>
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
              <h3 className="text-lg font-medium mb-3">Without year</h3>
              <div className="flex gap-4 py-6 px-6 bg-muted/30 rounded-lg">
                <BaselineStatus status="widely" showYear={false} />
              </div>
              <CodeBlock>{`<BaselineStatus status="widely" showYear={false} />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">
                With Feature ID (API)
              </h3>
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
                  <td className="p-3 font-mono text-xs">featureId</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">
                    Feature ID from web-features (e.g., &quot;scroll-snap&quot;)
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">status</td>
                  <td className="p-3 font-mono text-xs">
                    &quot;widely&quot; | &quot;newly&quot; | &quot;limited&quot;
                    | &quot;no_data&quot;
                  </td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">Direct status override (static data)</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">year</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">Year when feature became available</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">size</td>
                  <td className="p-3 font-mono text-xs">
                    &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;
                  </td>
                  <td className="p-3 font-mono text-xs">&quot;md&quot;</td>
                  <td className="p-3">Size variant</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">showYear</td>
                  <td className="p-3 font-mono text-xs">boolean</td>
                  <td className="p-3 font-mono text-xs">true</td>
                  <td className="p-3">Show year in the label</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">iconOnly</td>
                  <td className="p-3 font-mono text-xs">boolean</td>
                  <td className="p-3 font-mono text-xs">false</td>
                  <td className="p-3">Show only the icon without text</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">browserCheck</td>
                  <td className="p-3 font-mono text-xs">
                    &quot;view-transitions&quot; | &quot;popover&quot; |
                    &quot;anchor-positioning&quot;
                  </td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">
                    Browser feature to detect support for. Shows real-time
                    support status alongside Baseline.
                  </td>
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
            Common Feature IDs
          </h2>
          <p className="text-muted-foreground">
            Feature IDs can be found at{" "}
            <a
              href="https://github.com/web-platform-dx/web-features/tree/main/features"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              web-features repository
            </a>
            .
          </p>
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">Feature</th>
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
            References
          </h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <a
                href="https://web.dev/baseline"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Baseline Official Documentation
              </a>
            </li>
            <li>
              <a
                href="https://github.com/web-platform-dx/web-features"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                web-features GitHub Repository
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
