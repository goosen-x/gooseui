import { CodeBlock } from "@/components/docs/code-block"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPreview } from "@/components/docs/docs-preview"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { DocsSection } from "@/components/docs/docs-section"
import { InstallCommand } from "@/components/docs/install-command"
import { SliderDemo } from "./demo"

export const metadata = {
  title: "Slider",
  description: "Range slider input component with customizable styling",
}

export default function SliderPage() {
  return (
    <div className="space-y-8">
      <DocsPageNav title="Slider" />

      <p className="text-muted-foreground">
        Range slider input component with customizable styling. Pure CSS
        implementation without external dependencies.
      </p>

      <DocsPreview description="Drag the slider to change the value.">
        <SliderDemo />
      </DocsPreview>

      <DocsSection id="installation" title="Installation">
        <InstallCommand packageName="https://gooseui.pro/r/slider.json" />
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <CodeBlock>{`import { Slider } from "@/components/ui/slider"

export default function Page() {
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
      </DocsSection>

      <DocsSection id="examples" title="Examples">
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-3">With value display</h3>
            <CodeBlock>{`<Slider
  value={value}
  onValueChange={setValue}
  showValue
  formatValue={(v) => \`\${v}%\`}
/>`}</CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Custom range</h3>
            <CodeBlock>{`<Slider
  min={0}
  max={1}
  step={0.1}
  defaultValue={0.5}
/>`}</CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Different sizes</h3>
            <CodeBlock>{`<Slider size="sm" />
<Slider size="md" />
<Slider size="lg" />`}</CodeBlock>
          </div>
        </div>
      </DocsSection>

      <DocsPropsTable
        props={[
          {
            name: "value",
            type: "number",
            description: "Controlled value",
          },
          {
            name: "defaultValue",
            type: "number",
            default: "50",
            description: "Default value for uncontrolled mode",
          },
          {
            name: "min",
            type: "number",
            default: "0",
            description: "Minimum value",
          },
          {
            name: "max",
            type: "number",
            default: "100",
            description: "Maximum value",
          },
          {
            name: "step",
            type: "number",
            default: "1",
            description: "Step increment",
          },
          {
            name: "onValueChange",
            type: "(value: number) => void",
            description: "Callback when value changes",
          },
          {
            name: "showValue",
            type: "boolean",
            default: "false",
            description: "Show value label next to slider",
          },
          {
            name: "formatValue",
            type: "(value: number) => string",
            description: "Custom value formatter",
          },
          {
            name: "size",
            type: '"sm" | "md" | "lg"',
            default: '"md"',
            description: "Slider size",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "Disabled state",
          },
        ]}
      />
    </div>
  )
}
