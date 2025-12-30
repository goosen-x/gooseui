import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import {
  AnimatedToggleGroupPreview,
  AnimatedToggleGroupSizesDemo,
  AnimatedToggleGroupMultipleDemo,
  AnimatedToggleGroupTabsDemo,
} from "./animated-toggle-group-demo"

export const metadata = {
  title: "Animated Toggle Group",
  description:
    "A toggle group with selection animation and particle effects",
}

export default function AnimatedToggleGroupPage() {
  return (
    <div className="space-y-6">
      <DocsPageNav
        title="Animated Toggle Group"
        prevHref="/docs/components/animated-timer"
        nextHref="/docs/components/baseline-status"
      />
      <p className="text-lg text-muted-foreground">
        A toggle group with smooth selection animation and particle effects.
        Perfect for tab-like navigation or option selection.
      </p>

      <div className="space-y-4">
        <h2
          id="preview"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Preview
        </h2>
        <AnimatedToggleGroupPreview />
      </div>

      <div className="space-y-4">
        <h2
          id="installation"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Installation
        </h2>
        <InstallCommand packageName="https://gooseui.pro/r/animated-toggle-group.json" />
      </div>

      <div className="space-y-4">
        <h2
          id="usage"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Usage
        </h2>
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          {`import {
  AnimatedToggleGroup,
  AnimatedToggleGroupItem,
} from "@/components/ui/animated-toggle-group"

export function MyComponent() {
  return (
    <AnimatedToggleGroup type="single" defaultValue="first">
      <AnimatedToggleGroupItem value="first">First</AnimatedToggleGroupItem>
      <AnimatedToggleGroupItem value="second">Second</AnimatedToggleGroupItem>
      <AnimatedToggleGroupItem value="third">Third</AnimatedToggleGroupItem>
    </AnimatedToggleGroup>
  )
}`}
        </pre>
      </div>

      <div className="space-y-4">
        <h2
          id="examples"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Examples
        </h2>

        <h3
          id="sizes"
          className="scroll-m-20 text-xl font-semibold tracking-tight mt-6"
        >
          Sizes
        </h3>
        <p className="text-muted-foreground">
          Three sizes available: sm, default, and lg.
        </p>
        <AnimatedToggleGroupSizesDemo />
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          {`<AnimatedToggleGroup type="single" size="sm">...</AnimatedToggleGroup>
<AnimatedToggleGroup type="single" size="default">...</AnimatedToggleGroup>
<AnimatedToggleGroup type="single" size="lg">...</AnimatedToggleGroup>`}
        </pre>

        <h3
          id="multiple"
          className="scroll-m-20 text-xl font-semibold tracking-tight mt-6"
        >
          Multiple Selection
        </h3>
        <p className="text-muted-foreground">
          Allow multiple items to be selected at once.
        </p>
        <AnimatedToggleGroupMultipleDemo />
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          {`<AnimatedToggleGroup type="multiple">
  <AnimatedToggleGroupItem value="bold">Bold</AnimatedToggleGroupItem>
  <AnimatedToggleGroupItem value="italic">Italic</AnimatedToggleGroupItem>
  <AnimatedToggleGroupItem value="underline">Underline</AnimatedToggleGroupItem>
</AnimatedToggleGroup>`}
        </pre>

        <h3
          id="tabs"
          className="scroll-m-20 text-xl font-semibold tracking-tight mt-6"
        >
          As Tabs
        </h3>
        <p className="text-muted-foreground">
          Use as a tab-like navigation component.
        </p>
        <AnimatedToggleGroupTabsDemo />
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          {`const [tab, setTab] = useState("overview")

<AnimatedToggleGroup
  type="single"
  value={tab}
  onValueChange={(v) => v && setTab(v)}
>
  <AnimatedToggleGroupItem value="overview">Overview</AnimatedToggleGroupItem>
  <AnimatedToggleGroupItem value="analytics">Analytics</AnimatedToggleGroupItem>
  <AnimatedToggleGroupItem value="reports">Reports</AnimatedToggleGroupItem>
</AnimatedToggleGroup>`}
        </pre>
      </div>

      <div className="space-y-4">
        <h2
          id="props"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Props
        </h2>
        <h3 className="text-lg font-semibold">AnimatedToggleGroup</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Name</th>
                <th className="text-left py-3 px-4 font-semibold">Type</th>
                <th className="text-left py-3 px-4 font-semibold">Default</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">type</td>
                <td className="py-3 px-4 font-mono text-muted-foreground">
                  &quot;single&quot; | &quot;multiple&quot;
                </td>
                <td className="py-3 px-4 font-mono">required</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">size</td>
                <td className="py-3 px-4 font-mono text-muted-foreground">
                  &quot;sm&quot; | &quot;default&quot; | &quot;lg&quot;
                </td>
                <td className="py-3 px-4 font-mono">&quot;default&quot;</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">value</td>
                <td className="py-3 px-4 font-mono text-muted-foreground">
                  string | string[]
                </td>
                <td className="py-3 px-4 font-mono">-</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">defaultValue</td>
                <td className="py-3 px-4 font-mono text-muted-foreground">
                  string | string[]
                </td>
                <td className="py-3 px-4 font-mono">-</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">onValueChange</td>
                <td className="py-3 px-4 font-mono text-muted-foreground">
                  (value: string | string[]) =&gt; void
                </td>
                <td className="py-3 px-4 font-mono">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
