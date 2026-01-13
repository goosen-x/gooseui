import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { ThemeCustomizerDemo } from "./theme-customizer-demo"

export const metadata = {
  title: "Theme Customizer",
  description: "Floating theme and color picker with 6 different variants",
}

const toc = [
  { id: "preview", title: "Preview", level: 2 },
  { id: "installation", title: "Installation", level: 2 },
  { id: "usage", title: "Usage", level: 2 },
  { id: "variants", title: "Variants", level: 2 },
  { id: "color-setup", title: "Color Setup", level: 2 },
  { id: "props", title: "Props", level: 2 },
]

export default function ThemeCustomizerPage() {
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Theme Customizer" />
        <p className="text-muted-foreground">
          Floating theme and color picker with 6 different variants: Pill, Bar,
          Sidebar, Dock, Corner, and Toolbar.
        </p>

        <div className="space-y-4">
          <h2
            id="preview"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Preview
          </h2>
          <ThemeCustomizerDemo />
        </div>

        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Installation
          </h2>
          <InstallCommand packageName="@gooseui/theme-customizer" />
        </div>

        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Usage
          </h2>
          <CodeBlock>{`import { ThemeCustomizer } from "@/components/ui/theme-customizer"

export default function Page() {
  return (
    <div>
      <h1>My Page</h1>
      <ThemeCustomizer />
    </div>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="variants"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Variants
          </h2>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            1. Pill (Default)
          </h3>
          <p className="text-muted-foreground">
            Compact floating pill with theme toggle and popup color picker.
          </p>
          <CodeBlock>{`import { ThemeCustomizerPill } from "@/components/ui/theme-customizer"

<ThemeCustomizerPill />`}</CodeBlock>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            2. Bar
          </h3>
          <p className="text-muted-foreground">
            Horizontal bar with all options visible: light/dark/system buttons
            and color palette.
          </p>
          <CodeBlock>{`import { ThemeCustomizerBar } from "@/components/ui/theme-customizer"

<ThemeCustomizerBar />`}</CodeBlock>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            3. Sidebar
          </h3>
          <p className="text-muted-foreground">
            Vertical sidebar fixed to the right edge of the screen.
          </p>
          <CodeBlock>{`import { ThemeCustomizerSidebar } from "@/components/ui/theme-customizer"

<ThemeCustomizerSidebar />`}</CodeBlock>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            4. Dock
          </h3>
          <p className="text-muted-foreground">
            macOS-style dock at the bottom with hover lift effect.
          </p>
          <CodeBlock>{`import { ThemeCustomizerDock } from "@/components/ui/theme-customizer"

<ThemeCustomizerDock />`}</CodeBlock>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            5. Corner
          </h3>
          <p className="text-muted-foreground">
            Minimal expandable button in the bottom-right corner.
          </p>
          <CodeBlock>{`import { ThemeCustomizerCorner } from "@/components/ui/theme-customizer"

<ThemeCustomizerCorner />`}</CodeBlock>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            6. Toolbar
          </h3>
          <p className="text-muted-foreground">
            Animated expanding toolbar with smooth transitions. Compact by
            default, expands to show color picker on click.
          </p>
          <CodeBlock>{`import { ThemeCustomizerToolbar } from "@/components/ui/theme-customizer"

<ThemeCustomizerToolbar />`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="color-setup"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Color Setup
          </h2>
          <p className="text-muted-foreground">
            Add this script to your layout.tsx to persist color selection:
          </p>
          <CodeBlock>{`// app/layout.tsx
<html>
  <head>
    <script
      dangerouslySetInnerHTML={{
        __html: \`
          (function() {
            try {
              var color = localStorage.getItem('theme-color');
              if (color) {
                document.documentElement.setAttribute('data-theme-color', color);
              }
            } catch (e) {}
          })();
        \`,
      }}
    />
  </head>
  ...
</html>`}</CodeBlock>

          <p className="text-muted-foreground mt-4">
            Add color CSS variables to your globals.css:
          </p>
          <CodeBlock>{`/* Color themes */
[data-theme-color="blue"] {
  --primary: oklch(0.546 0.245 262.881);
  --primary-foreground: oklch(0.985 0 0);
  --ring: oklch(0.546 0.245 262.881);
}
[data-theme-color="blue"].dark,
.dark[data-theme-color="blue"] {
  --primary: oklch(0.623 0.214 259.815);
  --primary-foreground: oklch(0.145 0 0);
  --ring: oklch(0.623 0.214 259.815);
}
/* Add more colors: red, orange, green, violet, pink */`}</CodeBlock>
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
                  <td className="p-3 font-mono text-xs">className</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">Additional CSS classes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DocsPage>
  )
}
