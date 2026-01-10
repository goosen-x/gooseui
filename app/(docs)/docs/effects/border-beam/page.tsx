import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { BorderBeam } from "@/registry/new-york/effects/border-beam"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"

export const metadata = {
  title: "Border Beam",
  description: "An animated beam of light traveling along the container border",
}

const toc = [
  { id: "preview", title: "Preview", level: 2 },
  { id: "installation", title: "Installation", level: 2 },
  { id: "usage", title: "Usage", level: 2 },
  { id: "examples", title: "Examples", level: 2 },
  { id: "props", title: "Props", level: 2 },
]

export default function BorderBeamPage() {
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Border Beam" />
        <p className="text-muted-foreground">
          An animated beam of light traveling along the container border
        </p>

        <div className="space-y-4">
          <h2
            id="preview"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Preview
          </h2>
          <div className="flex items-center justify-center rounded-lg border p-10 bg-muted/30">
            <Card className="relative w-[21.875rem] overflow-hidden">
              <CardHeader>
                <CardTitle>Border Beam</CardTitle>
                <CardDescription>Animated border effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  A beam of light smoothly moves around the perimeter of the card,
                  creating an impressive animation
                </p>
              </CardContent>
              <BorderBeam />
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Installation
          </h2>
          <InstallCommand packageName="https://gooseui.pro/r/border-beam.json" />
        </div>

        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Usage
          </h2>
          <CodeBlock>{`import { BorderBeam } from "@/components/effects/border-beam"

export function MyCard() {
  return (
    <div className="relative overflow-hidden rounded-lg border p-4">
      <p>Card content</p>
      <BorderBeam />
    </div>
  )
}`}</CodeBlock>
          <p className="text-sm text-muted-foreground">
            <strong>Important:</strong> Container must have{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">relative</code>{" "}
            and{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              overflow-hidden
            </code>{" "}
            classes
          </p>
        </div>

        <div className="space-y-4">
          <h2
            id="examples"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Examples
          </h2>

          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Different colors</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="relative overflow-hidden rounded-lg border p-6 text-center">
                  <p className="text-sm font-medium">Orange → Purple</p>
                  <BorderBeam colorFrom="#ffaa40" colorTo="#9c40ff" />
                </div>
                <div className="relative overflow-hidden rounded-lg border p-6 text-center">
                  <p className="text-sm font-medium">Cyan → Blue</p>
                  <BorderBeam colorFrom="#00ffff" colorTo="#0066ff" />
                </div>
                <div className="relative overflow-hidden rounded-lg border p-6 text-center">
                  <p className="text-sm font-medium">Green → Yellow</p>
                  <BorderBeam colorFrom="#00ff88" colorTo="#ffff00" />
                </div>
                <div className="relative overflow-hidden rounded-lg border p-6 text-center">
                  <p className="text-sm font-medium">Pink → Red</p>
                  <BorderBeam colorFrom="#ff69b4" colorTo="#ff0000" />
                </div>
              </div>
              <CodeBlock>{`<BorderBeam colorFrom="#00ffff" colorTo="#0066ff" />`}</CodeBlock>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">Different speeds</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="relative overflow-hidden rounded-lg border p-6 text-center">
                  <p className="text-sm font-medium">Fast (6s)</p>
                  <BorderBeam duration={6} />
                </div>
                <div className="relative overflow-hidden rounded-lg border p-6 text-center">
                  <p className="text-sm font-medium">Normal (12s)</p>
                  <BorderBeam duration={12} />
                </div>
                <div className="relative overflow-hidden rounded-lg border p-6 text-center">
                  <p className="text-sm font-medium">Slow (20s)</p>
                  <BorderBeam duration={20} />
                </div>
              </div>
              <CodeBlock>{`<BorderBeam duration={6} />  {/* fast */}
<BorderBeam duration={20} /> {/* slow */}`}</CodeBlock>
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
            <table className="w-full text-sm min-w-[31.25rem]">
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
                  <td className="p-3 font-mono text-xs">size</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">200</td>
                  <td className="p-3">Beam size in pixels</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">duration</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">12</td>
                  <td className="p-3">Animation duration in seconds</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">delay</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">0</td>
                  <td className="p-3">Animation delay in seconds</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">colorFrom</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">#ffaa40</td>
                  <td className="p-3">Gradient start color</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">colorTo</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">#9c40ff</td>
                  <td className="p-3">Gradient end color</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">borderWidth</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">1.5</td>
                  <td className="p-3">Border width in pixels</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DocsPage>
  )
}
