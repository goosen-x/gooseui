import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import {
  SliderAnimatedValueDemo,
  SliderCustomFormatDemo,
  SliderDemo,
  SliderDisabledDemo,
  SliderGradientDemo,
  SliderSizesDemo,
  SliderStepDemo,
  SliderValueDisplayDemo,
} from "./demo"

export const metadata = {
  title: "Slider",
  description: "Range slider input component with customizable styling",
}

const toc = [
  { id: "preview", title: "Preview", level: 2 },
  { id: "installation", title: "Installation", level: 2 },
  { id: "usage", title: "Usage", level: 2 },
  { id: "examples", title: "Examples", level: 2 },
  { id: "props", title: "Props", level: 2 },
  { id: "features", title: "Features", level: 2 },
]

export default function SliderPage() {
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Slider" />

        <p className="text-muted-foreground">
          Range slider input component with customizable styling. Pure CSS
          implementation without external dependencies, supporting all modern
          browsers via vendor prefixes.
        </p>

        <div className="space-y-4">
          <h2
            id="preview"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Preview
          </h2>
          <p className="text-sm text-muted-foreground">
            Drag the slider to change the value.
          </p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <SliderDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Installation
          </h2>
          <InstallCommand packageName="https://gooseui.pro/r/slider.json" />
        </div>

        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Usage
          </h2>
          <CodeBlock>{`import { Slider } from "@/components/ui/slider"

export default function Example() {
  const [value, setValue] = useState(50)

  return (
    <Slider
      value={value}
      onValueChange={setValue}
      min={0}
      max={100}
    />
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
              <h3 className="text-lg font-medium mb-3">With Value Display</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Show the current value next to the slider with custom
                formatting.
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <SliderValueDisplayDemo />
              </div>
              <CodeBlock className="mt-4">{`<Slider
  value={value}
  onValueChange={setValue}
  showValue
  formatValue={(v) => \`\${v}%\`}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">
                Animated Sliding Value
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Use animateValue for smooth digit transitions powered by{" "}
                <a
                  href="/docs/components/sliding-number"
                  className="text-primary underline underline-offset-4"
                >
                  SlidingNumber
                </a>
                .
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <SliderAnimatedValueDemo />
              </div>
              <CodeBlock className="mt-4">{`<Slider
  value={value}
  onValueChange={setValue}
  showValue
  animateValue
  formatValue={(v) => \`\${v}%\`}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Size Variants</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Three size variants: small, medium (default), and large.
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <SliderSizesDemo />
              </div>
              <CodeBlock className="mt-4">{`<Slider size="sm" defaultValue={30} />
<Slider size="md" defaultValue={50} />
<Slider size="lg" defaultValue={70} />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Step Increments</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Control the step size for discrete value selection.
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <SliderStepDemo />
              </div>
              <CodeBlock className="mt-4">{`<Slider
  min={0}
  max={100}
  step={10}
  showValue
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Custom Formatting</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Use formatValue to display units like temperature or currency.
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <SliderCustomFormatDemo />
              </div>
              <CodeBlock className="mt-4">{`<Slider
  min={16}
  max={30}
  showValue
  formatValue={(v) => \`\${v}°C\`}
/>

<Slider
  min={0}
  max={500}
  step={10}
  showValue
  formatValue={(v) => \`$\${v}\`}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">
                Custom Gradient Track
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Override track styling with CSS for custom gradients.
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <SliderGradientDemo />
              </div>
              <CodeBlock className="mt-4">{`/* Custom gradient via CSS */
.gradient-slider::-webkit-slider-runnable-track {
  background: linear-gradient(
    to right,
    hsl(var(--chart-1)) 0%,
    hsl(var(--chart-2)) 25%,
    hsl(var(--chart-3)) 50%,
    hsl(var(--chart-4)) 75%,
    hsl(var(--chart-5)) 100%
  ) !important;
}

.gradient-slider::-moz-range-track {
  background: /* same gradient */ !important;
}

<Slider className="gradient-slider" />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Disabled State</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Disabled slider with reduced opacity and non-interactive state.
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <SliderDisabledDemo />
              </div>
              <CodeBlock className="mt-4">{`<Slider defaultValue={40} disabled />`}</CodeBlock>
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
                  <td className="p-3">Controlled value</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">defaultValue</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">50</td>
                  <td className="p-3">Default value for uncontrolled mode</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">min</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">0</td>
                  <td className="p-3">Minimum value</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">max</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">100</td>
                  <td className="p-3">Maximum value</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">step</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">1</td>
                  <td className="p-3">Step increment</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">onValueChange</td>
                  <td className="p-3 font-mono text-xs">
                    (value: number) =&gt; void
                  </td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">Callback when value changes</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">showValue</td>
                  <td className="p-3 font-mono text-xs">boolean</td>
                  <td className="p-3 font-mono text-xs">false</td>
                  <td className="p-3">Show value label next to slider</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">animateValue</td>
                  <td className="p-3 font-mono text-xs">boolean</td>
                  <td className="p-3 font-mono text-xs">false</td>
                  <td className="p-3">
                    Animate value with sliding digits (requires showValue)
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">formatValue</td>
                  <td className="p-3 font-mono text-xs">
                    (value: number) =&gt; string
                  </td>
                  <td className="p-3 font-mono text-xs">String(v)</td>
                  <td className="p-3">Custom value formatter</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">size</td>
                  <td className="p-3 font-mono text-xs">
                    &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;
                  </td>
                  <td className="p-3 font-mono text-xs">&quot;md&quot;</td>
                  <td className="p-3">Slider size</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">disabled</td>
                  <td className="p-3 font-mono text-xs">boolean</td>
                  <td className="p-3 font-mono text-xs">false</td>
                  <td className="p-3">Disabled state</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">label</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">
                    Accessible label for screen readers (aria-label)
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
              <strong className="text-foreground">Pure CSS</strong> — no
              external animation or UI libraries required
            </li>
            <li>
              <strong className="text-foreground">Cross-browser</strong> — works
              in Chrome, Firefox, Safari, Edge via vendor prefixes
            </li>
            <li>
              <strong className="text-foreground">Progress fill</strong> —
              native Firefox support, gradient fallback for WebKit
            </li>
            <li>
              <strong className="text-foreground">Keyboard accessible</strong> —
              full arrow key and focus support
            </li>
            <li>
              <strong className="text-foreground">ARIA attributes</strong> —
              aria-valuemin, aria-valuemax, aria-valuenow, aria-valuetext
            </li>
            <li>
              <strong className="text-foreground">Customizable</strong> — size
              variants, custom formatting, gradient tracks
            </li>
            <li>
              <strong className="text-foreground">Animated values</strong> —
              optional SlidingNumber integration for smooth digit transitions
            </li>
            <li>
              <strong className="text-foreground">
                Controlled & uncontrolled
              </strong>{" "}
              — works with value/onValueChange or defaultValue
            </li>
          </ul>
        </div>
      </div>
    </DocsPage>
  )
}
