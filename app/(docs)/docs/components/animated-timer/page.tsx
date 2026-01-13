import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { AnimatedTimer } from "@/registry/new-york/ui/animated-timer"

export const metadata = {
  title: "Animated Timer",
  description:
    "Beautiful animated clock with smoothly sliding digits and gradient border",
}

const toc = [
  { id: "preview", title: "Preview", level: 2 },
  { id: "installation", title: "Installation", level: 2 },
  { id: "usage", title: "Usage", level: 2 },
  { id: "examples", title: "Examples", level: 2 },
  { id: "props", title: "Props", level: 2 },
]

export default function AnimatedTimerPage() {
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Animated Timer" />
        <p className="text-muted-foreground">
          Beautiful animated clock with smoothly sliding digits and gradient
          border
        </p>

        <div className="space-y-4">
          <h2
            id="preview"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Preview
          </h2>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <AnimatedTimer />
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Installation
          </h2>
          <InstallCommand packageName="@gooseui/animated-timer" />
        </div>

        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Usage
          </h2>
          <CodeBlock>{`import { AnimatedTimer } from "@/components/ui/animated-timer"

export default function Page() {
  return <AnimatedTimer />
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="examples"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Examples
          </h2>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Without seconds</h3>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <AnimatedTimer showSeconds={false} />
              </div>
              <CodeBlock>{`<AnimatedTimer showSeconds={false} />`}</CodeBlock>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">12-hour format</h3>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <AnimatedTimer use24Hour={false} />
              </div>
              <CodeBlock>{`<AnimatedTimer use24Hour={false} />`}</CodeBlock>
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
                  <td className="p-3 font-mono text-xs">showSeconds</td>
                  <td className="p-3 font-mono text-xs">boolean</td>
                  <td className="p-3 font-mono text-xs">true</td>
                  <td className="p-3">Show seconds</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">use24Hour</td>
                  <td className="p-3 font-mono text-xs">boolean</td>
                  <td className="p-3 font-mono text-xs">true</td>
                  <td className="p-3">24-hour format</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">className</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">Additional classes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DocsPage>
  )
}
