import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { DigitalClock } from "@/registry/new-york/ui/digital-clock"

export const metadata = {
  title: "Digital Clock",
  description: "A retro 7-segment LED digital clock with customizable colors.",
}

const toc = [
  { id: "preview", title: "Preview", level: 2 },
  { id: "installation", title: "Installation", level: 2 },
  { id: "usage", title: "Usage", level: 2 },
  { id: "examples", title: "Examples", level: 2 },
  { id: "props", title: "Props", level: 2 },
]

export default function DigitalClockPage() {
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Digital Clock" />
        <p className="text-muted-foreground">
          A retro 7-segment LED digital clock built with CSS gradients. Features
          customizable colors, optional seconds display, and scalable size.
        </p>

        {/* Preview */}
        <div className="space-y-4">
          <h2
            id="preview"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Preview
          </h2>
          <div className="flex justify-center py-8 bg-muted/30 rounded-lg overflow-hidden">
            <DigitalClock scale={0.5} />
          </div>
        </div>

        {/* Installation */}
        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Installation
          </h2>
          <InstallCommand packageName="https://gooseui.pro/r/digital-clock.json" />
        </div>

        {/* Usage */}
        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Usage
          </h2>
          <CodeBlock>{`import { DigitalClock } from "@/components/ui/digital-clock"

export default function Example() {
  return <DigitalClock />
}`}</CodeBlock>
        </div>

        {/* Examples */}
        <div className="space-y-4">
          <h2
            id="examples"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Examples
          </h2>

          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Without seconds</h3>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg overflow-hidden">
                <DigitalClock showSeconds={false} scale={0.5} />
              </div>
              <CodeBlock>{`<DigitalClock showSeconds={false} />`}</CodeBlock>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">Custom colors</h3>
              <div className="flex flex-wrap justify-center gap-4 py-8 bg-muted/30 rounded-lg overflow-hidden">
                <DigitalClock showSeconds={false} color="#00BFFF" scale={0.35} />
                <DigitalClock showSeconds={false} color="#FF6B6B" scale={0.35} />
                <DigitalClock showSeconds={false} color="#FFD93D" scale={0.35} />
              </div>
              <CodeBlock>{`<DigitalClock color="#00BFFF" />
<DigitalClock color="#FF6B6B" />
<DigitalClock color="#FFD93D" />`}</CodeBlock>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">12-hour format</h3>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg overflow-hidden">
                <DigitalClock use24Hour={false} scale={0.5} />
              </div>
              <CodeBlock>{`<DigitalClock use24Hour={false} />`}</CodeBlock>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">Different sizes</h3>
              <div className="flex flex-wrap items-end justify-center gap-4 py-8 bg-muted/30 rounded-lg overflow-hidden">
                <DigitalClock showSeconds={false} scale={0.3} />
                <DigitalClock showSeconds={false} scale={0.5} />
                <DigitalClock showSeconds={false} scale={0.7} />
              </div>
              <CodeBlock>{`<DigitalClock scale={0.3} />
<DigitalClock scale={0.5} />
<DigitalClock scale={0.7} />`}</CodeBlock>
            </div>
          </div>
        </div>

        {/* Props */}
        <div className="space-y-4">
          <h2
            id="props"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Props
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[31.25rem]">
              <thead>
                <tr className="border-b">
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
                  <td className="p-3">Show seconds digits</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">use24Hour</td>
                  <td className="p-3 font-mono text-xs">boolean</td>
                  <td className="p-3 font-mono text-xs">true</td>
                  <td className="p-3">24-hour format</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">color</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">#82FA58</td>
                  <td className="p-3">LED segment color</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">scale</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">1</td>
                  <td className="p-3">Size scale factor</td>
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
