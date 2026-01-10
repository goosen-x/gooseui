import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { Input } from "@/registry/new-york/ui/input"
import { Label } from "@/registry/new-york/ui/label"

export const metadata = {
  title: "Input",
  description: "Displays a text input field",
}

const toc = [
  { id: "preview", title: "Preview", level: 2 },
  { id: "installation", title: "Installation", level: 2 },
  { id: "usage", title: "Usage", level: 2 },
  { id: "examples", title: "Examples", level: 2 },
  { id: "props", title: "Props", level: 2 },
]

export default function InputPage() {
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Input" />
        <p className="text-lg text-muted-foreground">
          Displays a text input field
        </p>

        <div className="space-y-4">
          <h2
            id="preview"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Preview
          </h2>
          <div className="flex flex-col gap-4 rounded-lg border p-6 max-w-sm">
            <Input placeholder="Email" type="email" />
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Installation
          </h2>
          <InstallCommand packageName="https://gooseui.pro/r/input.json" />
        </div>

        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Usage
          </h2>
          <CodeBlock>{`import { Input } from "@/components/ui/input"

export function MyInput() {
  return <Input type="email" placeholder="Email" />
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="examples"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Examples
          </h2>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            Default
          </h3>
          <div className="flex items-center gap-4 rounded-lg border p-4 max-w-sm">
            <Input placeholder="Enter text..." />
          </div>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            Disabled
          </h3>
          <div className="flex items-center gap-4 rounded-lg border p-4 max-w-sm">
            <Input disabled placeholder="Blocked" />
          </div>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            With Label
          </h3>
          <div className="flex flex-col gap-2 rounded-lg border p-4 max-w-sm">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="email@example.com" />
          </div>
          <CodeBlock>{`<div className="grid gap-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="email@example.com" />
</div>`}</CodeBlock>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            File Input
          </h3>
          <div className="flex items-center gap-4 rounded-lg border p-4 max-w-sm">
            <Input type="file" />
          </div>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            With Validation Error
          </h3>
          <div className="flex flex-col gap-2 rounded-lg border p-4 max-w-sm">
            <Label htmlFor="email-error">Email</Label>
            <Input
              id="email-error"
              type="email"
              placeholder="email@example.com"
              defaultValue="invalid-email"
              aria-invalid="true"
            />
            <p className="text-sm text-destructive">
              Please enter a valid email address
            </p>
          </div>
          <CodeBlock>{`<div className="grid gap-2">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    placeholder="email@example.com"
    aria-invalid="true"
  />
  <p className="text-sm text-destructive">
    Please enter a valid email address
  </p>
</div>`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="props"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Props
          </h2>
          <p className="text-muted-foreground">
            Input accepts all standard HTML attributes for &lt;input&gt;
          </p>
        </div>
      </div>
    </DocsPage>
  )
}
