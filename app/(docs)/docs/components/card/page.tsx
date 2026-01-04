import { CodeBlock } from "@/components/docs/code-block"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { Button } from "@/registry/new-york/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"

export const metadata = {
  title: "Card",
  description: "Displays a card with header, content and footer",
}

export default function CardPage() {
  return (
    <div className="space-y-6">
      <DocsPageNav
        title="Card"
        prevHref="/docs/components/button"
        nextHref="/docs/components/input"
      />
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
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Create Project</CardTitle>
              <CardDescription>
                Deploy a new project in one click
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your new project will be created with a configured environment
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Create</Button>
            </CardFooter>
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
        <InstallCommand packageName="https://gooseui.pro/r/card.json" />
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
          id="components"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Components
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Component</th>
                <th className="text-left py-3 px-4 font-semibold">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">Card</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Card container
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">CardHeader</td>
                <td className="py-3 px-4 text-muted-foreground">Card header</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">CardTitle</td>
                <td className="py-3 px-4 text-muted-foreground">Card title</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">CardDescription</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Card description
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">CardContent</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Main content
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">CardFooter</td>
                <td className="py-3 px-4 text-muted-foreground">Card footer</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
