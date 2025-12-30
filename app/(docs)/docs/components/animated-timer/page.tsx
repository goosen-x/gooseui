import { AnimatedTimer } from "@/registry/new-york/ui/animated-timer"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"

export const metadata = {
  title: "Animated Timer",
  description:
    "Beautiful animated clock with smoothly sliding digits and gradient border",
}

export default function AnimatedTimerPage() {
  return (
    <div className="space-y-8">
      <DocsPageNav title="Animated Timer" prevHref="/docs/components/input" />
      <p className="text-muted-foreground">
        Beautiful animated clock with smoothly sliding digits and gradient border
      </p>

      <div className="space-y-4">
        <h2 id="demo" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Demo</h2>
        <div className="flex justify-center py-12 bg-zinc-950 rounded-lg">
          <AnimatedTimer />
        </div>
      </div>

      <div className="space-y-4">
        <h2 id="installation" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Installation</h2>
        <InstallCommand packageName="https://gooseui.pro/r/animated-timer.json" />
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Usage</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { AnimatedTimer } from "@/components/ui/animated-timer"

export default function Page() {
  return <AnimatedTimer />
}`}</code>
        </pre>
      </div>

      <div className="space-y-4">
        <h2 id="examples" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Examples</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Without seconds</h3>
            <div className="flex justify-center py-8 bg-zinc-950 rounded-lg">
              <AnimatedTimer showSeconds={false} />
            </div>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto mt-2">
              <code>{`<AnimatedTimer showSeconds={false} />`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">24-hour format</h3>
            <div className="flex justify-center py-8 bg-zinc-950 rounded-lg">
              <AnimatedTimer use24Hour />
            </div>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto mt-2">
              <code>{`<AnimatedTimer use24Hour />`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 id="props" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Props</h2>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
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
                <td className="p-3 font-mono text-xs">false</td>
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
  )
}
