import { CodeBlock } from "@/components/docs/code-block"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { DigitalClock } from "@/registry/new-york/ui/digital-clock"

export const metadata = {
  title: "Digital Clock",
  description: "A retro 7-segment LED digital clock with customizable colors.",
}

export default function DigitalClockPage() {
  return (
    <div className="space-y-8">
      <DocsPageNav
        title="Digital Clock"
        prevHref="/docs/components/carousel"
        nextHref="/docs/components/baseline-status"
      />
      <p className="text-muted-foreground">
        A retro 7-segment LED digital clock built with CSS gradients. Features
        customizable colors and optional seconds display.
      </p>

      {/* Preview */}
      <div className="space-y-4">
        <h2
          id="preview"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Preview
        </h2>
        <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
          <DigitalClock />
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
        <div className="grid gap-8">
          <div>
            <h3 className="text-lg font-medium mb-3">Without seconds</h3>
            <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
              <DigitalClock showSeconds={false} />
            </div>
            <CodeBlock>{`<DigitalClock showSeconds={false} />`}</CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Custom colors</h3>
            <div className="flex justify-center py-8 bg-muted/30 rounded-lg gap-8 flex-wrap">
              <DigitalClock showSeconds={false} color="#00BFFF" />
              <DigitalClock showSeconds={false} color="#FF6B6B" />
              <DigitalClock showSeconds={false} color="#FFD93D" />
            </div>
            <CodeBlock>{`<DigitalClock color="#00BFFF" />
<DigitalClock color="#FF6B6B" />
<DigitalClock color="#FFD93D" />`}</CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">12-hour format</h3>
            <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
              <DigitalClock use24Hour={false} />
            </div>
            <CodeBlock>{`<DigitalClock use24Hour={false} />`}</CodeBlock>
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
          <table className="w-full text-sm">
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
  )
}
