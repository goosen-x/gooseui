import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { BaselineStatus } from "@/registry/new-york/ui/baseline-status"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"
import { CardDemo } from "./card-demo"

export const metadata = {
  title: "Card",
  description: "Displays a card with header, content and footer",
}

const toc = [
  { id: "preview", title: "Preview", level: 2 },
  { id: "installation", title: "Installation", level: 2 },
  { id: "usage", title: "Usage", level: 2 },
  { id: "squircle", title: "Squircle", level: 2 },
  { id: "components", title: "Components", level: 2 },
  { id: "props", title: "Props", level: 2 },
]

export default function CardPage() {
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Card" />
        <p className="text-lg text-muted-foreground">
          Displays a card with header, content and footer
        </p>

        <div className="space-y-4">
          <h2
            id="preview"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Preview
          </h2>
          <div className="flex items-center justify-center rounded-lg border p-6">
            <CardDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Installation
          </h2>
          <InstallCommand packageName="@gooseui/card" />
        </div>

        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Usage
          </h2>
          <CodeBlock>{`import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function MyCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content</p>
      </CardContent>
      <CardFooter>
        <p>Footer</p>
      </CardFooter>
    </Card>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="squircle"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Squircle
          </h2>
          <p className="text-sm text-muted-foreground">
            iOS-style squircle corners using CSS{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              corner-shape: squircle
            </code>
            .
          </p>
          <BaselineStatus
            featureId="corner-shape"
            browserCheck="corner-shape"
          />
          <div className="flex flex-wrap items-start justify-center gap-6 rounded-lg border p-6">
            <div className="flex flex-col items-center gap-2">
              <Card className="w-[200px]">
                <CardHeader>
                  <CardTitle className="text-base">Regular</CardTitle>
                  <CardDescription className="text-xs">
                    border-radius
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Card squircle className="w-[200px]">
                <CardHeader>
                  <CardTitle className="text-base">Squircle</CardTitle>
                  <CardDescription className="text-xs">
                    corner-shape
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
          <CodeBlock>{`<Card squircle>
  <CardHeader>
    <CardTitle>Squircle Card</CardTitle>
  </CardHeader>
</Card>`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="components"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Components
          </h2>
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">Component</th>
                  <th className="text-left p-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">Card</td>
                  <td className="p-3">Card container</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">CardHeader</td>
                  <td className="p-3">Card header section</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">CardTitle</td>
                  <td className="p-3">Card title text</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">CardDescription</td>
                  <td className="p-3">Card description text</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">CardContent</td>
                  <td className="p-3">Main content area</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">CardFooter</td>
                  <td className="p-3">Card footer section</td>
                </tr>
              </tbody>
            </table>
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
                  <td className="p-3 font-mono text-xs">squircle</td>
                  <td className="p-3 font-mono text-xs">boolean</td>
                  <td className="p-3 font-mono text-xs">false</td>
                  <td className="p-3">
                    Apply iOS-style squircle corners (Chrome 139+)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DocsPage>
  )
}
