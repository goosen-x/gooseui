import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { ThemeCustomizerDemo } from "./theme-customizer-demo"

export const metadata = {
  title: "Theme Customizer",
  description: "Floating theme and color picker with 5 different variants",
}

export default function ThemeCustomizerPage() {
  return (
    <div className="space-y-6">
      <DocsPageNav
        title="Theme Customizer"
        prevHref="/docs/components/typography"
      />
      <p className="text-lg text-muted-foreground">
        Floating theme and color picker with 5 different variants
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
        <InstallCommand packageName="https://gooseui.pro/r/theme-customizer.json" />
      </div>

      <div className="space-y-4">
        <h2
          id="usage"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Usage
        </h2>
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          {`import { ThemeCustomizer } from "@/components/ui/theme-customizer"

export default function Page() {
  return (
    <div>
      <h1>My Page</h1>
      <ThemeCustomizer />
    </div>
  )
}`}
        </pre>
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
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          {`import { ThemeCustomizerPill } from "@/components/ui/theme-customizer"

<ThemeCustomizerPill />`}
        </pre>

        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
          2. Bar
        </h3>
        <p className="text-muted-foreground">
          Horizontal bar with all options visible: light/dark/system buttons and
          color palette.
        </p>
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          {`import { ThemeCustomizerBar } from "@/components/ui/theme-customizer"

<ThemeCustomizerBar />`}
        </pre>

        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
          3. Sidebar
        </h3>
        <p className="text-muted-foreground">
          Vertical sidebar fixed to the right edge of the screen.
        </p>
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          {`import { ThemeCustomizerSidebar } from "@/components/ui/theme-customizer"

<ThemeCustomizerSidebar />`}
        </pre>

        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
          4. Dock
        </h3>
        <p className="text-muted-foreground">
          macOS-style dock at the bottom with hover lift effect.
        </p>
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          {`import { ThemeCustomizerDock } from "@/components/ui/theme-customizer"

<ThemeCustomizerDock />`}
        </pre>

        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
          5. Corner
        </h3>
        <p className="text-muted-foreground">
          Minimal expandable button in the bottom-right corner.
        </p>
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          {`import { ThemeCustomizerCorner } from "@/components/ui/theme-customizer"

<ThemeCustomizerCorner />`}
        </pre>
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
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          {`// app/layout.tsx
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
</html>`}
        </pre>

        <p className="text-muted-foreground mt-4">
          Add color CSS variables to your globals.css:
        </p>
        <pre className="rounded-lg border bg-muted px-4 py-3 font-mono text-sm overflow-x-auto">
          {`/* Color themes */
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
/* Add more colors: red, orange, green, violet, pink */`}
        </pre>
      </div>

      <div className="space-y-4">
        <h2
          id="props"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Props
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Prop</th>
                <th className="text-left py-3 px-4 font-semibold">Type</th>
                <th className="text-left py-3 px-4 font-semibold">Default</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">className</td>
                <td className="py-3 px-4 font-mono text-muted-foreground">
                  string
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
