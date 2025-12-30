import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import {
  ButtonGroupIconsDemo,
  ButtonGroupNestedDemo,
  ButtonGroupOrientationDemo,
  ButtonGroupPreview,
  ButtonGroupRaisedDemo,
  ButtonGroupWithSeparatorDemo,
  ButtonGroupWithTextDemo,
} from "./button-group-demo"

export const metadata = {
  title: "Button Group",
  description: "Group buttons together with shared styling and layout",
}

export default function ButtonGroupPage() {
  return (
    <div className="space-y-6">
      <DocsPageNav
        title="Button Group"
        prevHref="/docs/components/button"
        nextHref="/docs/components/card"
      />
      <p className="text-lg text-muted-foreground">
        Group buttons together with shared styling and layout. Supports
        horizontal and vertical orientations.
      </p>

      <div className="space-y-4">
        <h2
          id="preview"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Preview
        </h2>
        <ButtonGroupPreview />
      </div>

      <div className="space-y-4">
        <h2
          id="installation"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Installation
        </h2>
        <InstallCommand packageName="https://gooseui.pro/r/button-group.json" />
      </div>

      <div className="space-y-4">
        <h2
          id="usage"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Usage
        </h2>
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          {`import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export function MyComponent() {
  return (
    <ButtonGroup>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
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
          id="raised"
          className="scroll-m-20 text-xl font-semibold tracking-tight mt-6"
        >
          Raised (3D Effect)
        </h3>
        <p className="text-muted-foreground">
          A 3D raised button effect with shadows and press animation.
        </p>
        <ButtonGroupRaisedDemo />
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          {`<ButtonGroup variant="raised">
  <Button>Left</Button>
  <Button>Middle</Button>
  <Button>Right</Button>
</ButtonGroup>`}
        </pre>

        <h3
          id="orientation"
          className="scroll-m-20 text-xl font-semibold tracking-tight mt-6"
        >
          Orientation
        </h3>
        <p className="text-muted-foreground">
          ButtonGroup supports horizontal (default) and vertical orientations.
        </p>
        <ButtonGroupOrientationDemo />
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          {`<ButtonGroup orientation="horizontal">...</ButtonGroup>
<ButtonGroup orientation="vertical">...</ButtonGroup>`}
        </pre>

        <h3
          id="separator"
          className="scroll-m-20 text-xl font-semibold tracking-tight mt-6"
        >
          With Separator
        </h3>
        <ButtonGroupWithSeparatorDemo />
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          {`<ButtonGroup>
  <Button variant="outline">Archive</Button>
  <ButtonGroupSeparator />
  <Button variant="outline">Delete</Button>
</ButtonGroup>`}
        </pre>

        <h3
          id="text"
          className="scroll-m-20 text-xl font-semibold tracking-tight mt-6"
        >
          With Text Label
        </h3>
        <ButtonGroupWithTextDemo />
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          {`<ButtonGroup>
  <ButtonGroupText>Actions</ButtonGroupText>
  <Button variant="outline">Archive</Button>
  <Button variant="outline">Delete</Button>
</ButtonGroup>`}
        </pre>

        <h3
          id="nested"
          className="scroll-m-20 text-xl font-semibold tracking-tight mt-6"
        >
          Nested Groups
        </h3>
        <ButtonGroupNestedDemo />
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          {`<ButtonGroup>
  <ButtonGroup>
    <Button variant="outline">Archive</Button>
    <Button variant="outline">Report</Button>
  </ButtonGroup>
  <ButtonGroup>
    <Button variant="outline">Snooze</Button>
    <Button variant="outline" size="icon">...</Button>
  </ButtonGroup>
</ButtonGroup>`}
        </pre>

        <h3
          id="icons"
          className="scroll-m-20 text-xl font-semibold tracking-tight mt-6"
        >
          Icon Buttons
        </h3>
        <ButtonGroupIconsDemo />
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          {`<ButtonGroup>
  <Button variant="outline" size="icon"><ArchiveIcon /></Button>
  <Button variant="outline" size="icon"><Trash2Icon /></Button>
  <Button variant="outline" size="icon"><MoreHorizontalIcon /></Button>
</ButtonGroup>`}
        </pre>
      </div>

      <div className="space-y-4">
        <h2
          id="props"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Props
        </h2>
        <h3 className="text-lg font-semibold">ButtonGroup</h3>
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
                <td className="py-3 px-4 font-mono">orientation</td>
                <td className="py-3 px-4 font-mono text-muted-foreground">
                  &quot;horizontal&quot; | &quot;vertical&quot;
                </td>
                <td className="py-3 px-4 font-mono">&quot;horizontal&quot;</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">variant</td>
                <td className="py-3 px-4 font-mono text-muted-foreground">
                  &quot;default&quot; | &quot;raised&quot;
                </td>
                <td className="py-3 px-4 font-mono">&quot;default&quot;</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
