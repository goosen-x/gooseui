import { CodeBlock } from "@/components/docs/code-block"
import { DocsBrowserSupport } from "@/components/docs/docs-browser-support"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { MorphingHeaderDemo } from "./demo"

export const metadata = {
  title: "Morphing Header",
  description:
    "Header that morphs between full and compact states on scroll using View Transitions API",
}

export default function MorphingHeaderPage() {
  return (
    <div className="space-y-8">
      {/* 1. Navigation */}
      <DocsPageNav title="Morphing Header" />

      {/* 2. Description */}
      <p className="text-muted-foreground">
        Header that morphs between full and compact states on scroll using View
        Transitions API.
      </p>

      {/* 3. Browser Support */}
      <DocsBrowserSupport
        features={{
          featureId: "view-transitions",
          browserCheck: "view-transitions",
        }}
      >
        Uses{" "}
        <code className="bg-muted px-1.5 py-0.5 rounded">
          document.startViewTransition()
        </code>{" "}
        for smooth state transitions with{" "}
        <code className="bg-muted px-1.5 py-0.5 rounded">
          view-transition-name
        </code>
        .
      </DocsBrowserSupport>

      {/* 4. Preview */}
      <div className="space-y-4">
        <h2
          id="preview"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Preview
        </h2>
        <MorphingHeaderDemo />
        <p className="text-sm text-muted-foreground">
          Scroll inside the container to see the header morph. Uses View Transitions API for smooth animation.
        </p>
      </div>

      {/* 5. Installation */}
      <div className="space-y-4">
        <h2
          id="installation"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Installation
        </h2>
        <InstallCommand packageName="https://gooseui.pro/r/morphing-header.json" />
      </div>

      {/* 6. Usage */}
      <div className="space-y-4">
        <h2
          id="usage"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Usage
        </h2>
        <CodeBlock>{`import { MorphingHeader, MorphingLogo, MorphingNav } from "@/components/effects/morphing-header"

<MorphingHeader compactThreshold={100}>
  {(isCompact) => (
    <div className="flex items-center justify-between">
      <MorphingLogo src="/logo.svg" isCompact={isCompact} />
      <MorphingNav isCompact={isCompact}>
        <a href="/">Home</a>
        <a href="/about">About</a>
      </MorphingNav>
    </div>
  )}
</MorphingHeader>`}</CodeBlock>
      </div>

      {/* 7. CSS Feature */}
      <div className="space-y-4">
        <h2
          id="css-feature"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          CSS Feature
        </h2>
        <CodeBlock>{`.morphing-logo {
  view-transition-name: header-logo;
}

.morphing-nav {
  view-transition-name: header-nav;
}

::view-transition-old(header-logo),
::view-transition-new(header-logo) {
  animation-duration: 0.25s;
}`}</CodeBlock>
      </div>

      {/* 8. Props */}
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
                <td className="p-3 font-mono text-xs">compactThreshold</td>
                <td className="p-3 font-mono text-xs">number</td>
                <td className="p-3 font-mono text-xs">100</td>
                <td className="p-3">Scroll position to trigger compact mode</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">children</td>
                <td className="p-3 font-mono text-xs">
                  (isCompact: boolean) =&gt; ReactNode
                </td>
                <td className="p-3 font-mono text-xs">-</td>
                <td className="p-3">Render function with compact state</td>
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
    </div>
  )
}
