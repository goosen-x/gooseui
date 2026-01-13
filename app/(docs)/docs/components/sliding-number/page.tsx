import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import {
  SlidingNumberCounterDemo,
  SlidingNumberDemo,
  SlidingNumberPriceDemo,
  SlidingNumberStatsDemo,
  SlidingNumberTimerDemo,
} from "./demo"

export const metadata = {
  title: "Sliding Number",
  description: "Animated number display with sliding digit transitions",
}

const toc = [
  { id: "preview", title: "Preview", level: 2 },
  { id: "installation", title: "Installation", level: 2 },
  { id: "usage", title: "Usage", level: 2 },
  { id: "examples", title: "Examples", level: 2 },
  { id: "props", title: "Props", level: 2 },
  { id: "features", title: "Features", level: 2 },
]

export default function SlidingNumberPage() {
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Sliding Number" />

        <p className="text-muted-foreground">
          Animated number display with smooth sliding transitions for each
          digit. Perfect for counters, stats, prices, and any numeric values
          that change over time.
        </p>

        <div className="space-y-4">
          <h2
            id="preview"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Preview
          </h2>
          <p className="text-sm text-muted-foreground">
            Click the buttons to see the sliding animation.
          </p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <SlidingNumberDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Installation
          </h2>
          <InstallCommand packageName="@gooseui/sliding-number" />
        </div>

        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Usage
          </h2>
          <CodeBlock>{`import { SlidingNumber } from "@/components/ui/sliding-number"

export default function Example() {
  const [count, setCount] = useState(0)

  return (
    <div className="text-4xl font-bold">
      <SlidingNumber value={count} />
    </div>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="examples"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Examples
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">Counter with Padding</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Use padStart to maintain consistent width with leading zeros.
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <SlidingNumberCounterDemo />
              </div>
              <CodeBlock className="mt-4">{`<SlidingNumber value={count} padStart={3} />
// 0 → "000", 5 → "005", 42 → "042", 100 → "100"`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Timer</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Combine multiple SlidingNumber components for MM:SS format.
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <SlidingNumberTimerDemo />
              </div>
              <CodeBlock className="mt-4">{`const minutes = Math.floor(seconds / 60)
const secs = seconds % 60

<div className="flex items-center font-mono">
  <SlidingNumber value={minutes} padStart={2} />
  <span>:</span>
  <SlidingNumber value={secs} padStart={2} />
</div>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Price Display</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Wrap with currency symbol and suffix for pricing.
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <SlidingNumberPriceDemo />
              </div>
              <CodeBlock className="mt-4">{`<div className="text-3xl font-bold">
  $<SlidingNumber value={price} />
  <span className="text-lg text-muted-foreground">/mo</span>
</div>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Stats Dashboard</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Display multiple animated statistics.
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <SlidingNumberStatsDemo />
              </div>
              <CodeBlock className="mt-4">{`<div className="grid grid-cols-3 gap-8">
  <div>
    <SlidingNumber value={users} />
    <span>Users</span>
  </div>
  <div>
    <SlidingNumber value={downloads} />
    <span>Downloads</span>
  </div>
</div>`}</CodeBlock>
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
                  <td className="p-3 font-mono text-xs">value</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">The number to display</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">padStart</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">0</td>
                  <td className="p-3">Pad with leading zeros to this length</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">decimalSeparator</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">&quot;.&quot;</td>
                  <td className="p-3">Character used as decimal separator</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">transition</td>
                  <td className="p-3 font-mono text-xs">Transition</td>
                  <td className="p-3 font-mono text-xs">spring</td>
                  <td className="p-3">
                    Custom motion transition (stiffness: 500, damping: 35)
                  </td>
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

        <div className="space-y-4">
          <h2
            id="features"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Features
          </h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <strong className="text-foreground">Smooth animations</strong> —
              spring-based transitions powered by motion/react
            </li>
            <li>
              <strong className="text-foreground">Per-digit animation</strong> —
              each digit animates independently for natural effect
            </li>
            <li>
              <strong className="text-foreground">Leading zeros</strong> —
              padStart for consistent width display
            </li>
            <li>
              <strong className="text-foreground">Separator support</strong> —
              handles decimal points and thousands separators
            </li>
            <li>
              <strong className="text-foreground">Custom transitions</strong> —
              override spring config for different animation feels
            </li>
            <li>
              <strong className="text-foreground">Tabular nums</strong> — uses
              tabular-nums for aligned digit widths
            </li>
          </ul>
        </div>
      </div>
    </DocsPage>
  )
}
