import { CodeBlock } from "@/components/docs/code-block"
import { DocsBrowserSupport } from "@/components/docs/docs-browser-support"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { MorphingHeaderDemo } from "./demo"

export const metadata = {
  title: "Morphing Header",
  description:
    "Header that morphs between full and compact states on scroll using View Transitions API",
}

const toc = [
  { id: "preview", title: "Preview", level: 2 },
  { id: "installation", title: "Installation", level: 2 },
  { id: "usage", title: "Usage", level: 2 },
  { id: "examples", title: "Examples", level: 2 },
  { id: "components", title: "Components", level: 2 },
  { id: "props", title: "Props", level: 2 },
]

export default function MorphingHeaderPage() {
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        {/* 1. Navigation */}
        <DocsPageNav title="Morphing Header" />

        {/* 2. Description */}
        <p className="text-muted-foreground">
          Header that smoothly morphs between full and compact states on scroll
          using the View Transitions API. Includes three components:
          MorphingHeader, MorphingLogo, and MorphingNav.
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
          for smooth morphing animations with graceful fallback for older
          browsers.
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
            Scroll inside the container to see the header morph. Uses View
            Transitions API for smooth animation.
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
          <InstallCommand packageName="@gooseui/morphing-header" />
        </div>

        {/* 6. Usage */}
        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Usage
          </h2>
          <CodeBlock>{`import {
  MorphingHeader,
  MorphingLogo,
  MorphingNav
} from "@/components/ui/morphing-header"

<MorphingHeader compactThreshold={100}>
  {(isCompact) => (
    <div className="flex items-center justify-between">
      <MorphingLogo
        src="/logo.svg"
        isCompact={isCompact}
        fullSize={48}
        compactSize={32}
      />
      <MorphingNav isCompact={isCompact}>
        <a href="/">Home</a>
        <a href="/about">About</a>
      </MorphingNav>
    </div>
  )}
</MorphingHeader>`}</CodeBlock>
        </div>

        {/* 7. Examples */}
        <div className="space-y-4">
          <h2
            id="examples"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Examples
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Static Children</h3>
              <p className="text-sm text-muted-foreground mb-3">
                You can use static children without the render function:
              </p>
              <CodeBlock>{`<MorphingHeader>
  <div className="flex items-center justify-between">
    <img src="/logo.svg" alt="Logo" className="h-12" />
    <nav className="flex gap-4">
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  </div>
</MorphingHeader>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Custom Threshold</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Trigger compact mode at different scroll positions:
              </p>
              <CodeBlock>{`<MorphingHeader compactThreshold={200}>
  {(isCompact) => (
    <div className="flex items-center justify-between">
      <span className={isCompact ? "text-sm" : "text-lg"}>
        Brand
      </span>
    </div>
  )}
</MorphingHeader>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                With Custom Animations
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Customize view transition animations with CSS:
              </p>
              <CodeBlock>{`/* In your global CSS */
::view-transition-old(morphing-header),
::view-transition-new(morphing-header) {
  animation-duration: 0.4s;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

::view-transition-old(morphing-logo),
::view-transition-new(morphing-logo) {
  animation-duration: 0.3s;
}`}</CodeBlock>
            </div>
          </div>
        </div>

        {/* 8. Components */}
        <div className="space-y-4">
          <h2
            id="components"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Components
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">MorphingHeader</h3>
              <p className="text-sm text-muted-foreground">
                Main header component that detects scroll and triggers compact
                mode. Accepts children as render function or static content.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">MorphingLogo</h3>
              <p className="text-sm text-muted-foreground">
                Logo component that smoothly transitions between full and
                compact sizes. Uses inline view-transition-name for animation.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">MorphingNav</h3>
              <p className="text-sm text-muted-foreground">
                Navigation wrapper that adjusts spacing and font size based on
                header state.
              </p>
            </div>
          </div>
        </div>

        {/* 9. Props */}
        <div className="space-y-4">
          <h2
            id="props"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Props
          </h2>

          <div className="space-y-6">
            {/* MorphingHeader Props */}
            <div>
              <h3 className="text-lg font-semibold mb-3">MorphingHeader</h3>
              <div className="border rounded-lg overflow-x-auto">
                <table className="w-full text-sm min-w-[500px]">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-3 font-medium">Prop</th>
                      <th className="text-left p-3 font-medium">Type</th>
                      <th className="text-left p-3 font-medium">Default</th>
                      <th className="text-left p-3 font-medium">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-3 font-mono text-xs">
                        compactThreshold
                      </td>
                      <td className="p-3 font-mono text-xs">number</td>
                      <td className="p-3 font-mono text-xs">100</td>
                      <td className="p-3">
                        Scroll position (px) to trigger compact mode
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 font-mono text-xs">children</td>
                      <td className="p-3 font-mono text-xs">
                        ReactNode | (isCompact: boolean) =&gt; ReactNode
                      </td>
                      <td className="p-3 font-mono text-xs">-</td>
                      <td className="p-3">
                        Static content or render function with compact state
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

            {/* MorphingLogo Props */}
            <div>
              <h3 className="text-lg font-semibold mb-3">MorphingLogo</h3>
              <div className="border rounded-lg overflow-x-auto">
                <table className="w-full text-sm min-w-[500px]">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-3 font-medium">Prop</th>
                      <th className="text-left p-3 font-medium">Type</th>
                      <th className="text-left p-3 font-medium">Default</th>
                      <th className="text-left p-3 font-medium">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-3 font-mono text-xs">src</td>
                      <td className="p-3 font-mono text-xs">string</td>
                      <td className="p-3 font-mono text-xs">required</td>
                      <td className="p-3">Logo image source URL</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 font-mono text-xs">alt</td>
                      <td className="p-3 font-mono text-xs">string</td>
                      <td className="p-3 font-mono text-xs">""</td>
                      <td className="p-3">Alt text for logo image</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 font-mono text-xs">fullSize</td>
                      <td className="p-3 font-mono text-xs">number</td>
                      <td className="p-3 font-mono text-xs">48</td>
                      <td className="p-3">Logo height (px) in full mode</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 font-mono text-xs">compactSize</td>
                      <td className="p-3 font-mono text-xs">number</td>
                      <td className="p-3 font-mono text-xs">32</td>
                      <td className="p-3">Logo height (px) in compact mode</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 font-mono text-xs">isCompact</td>
                      <td className="p-3 font-mono text-xs">boolean</td>
                      <td className="p-3 font-mono text-xs">false</td>
                      <td className="p-3">
                        Whether header is in compact mode
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

            {/* MorphingNav Props */}
            <div>
              <h3 className="text-lg font-semibold mb-3">MorphingNav</h3>
              <div className="border rounded-lg overflow-x-auto">
                <table className="w-full text-sm min-w-[500px]">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-3 font-medium">Prop</th>
                      <th className="text-left p-3 font-medium">Type</th>
                      <th className="text-left p-3 font-medium">Default</th>
                      <th className="text-left p-3 font-medium">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-3 font-mono text-xs">isCompact</td>
                      <td className="p-3 font-mono text-xs">boolean</td>
                      <td className="p-3 font-mono text-xs">false</td>
                      <td className="p-3">
                        Whether header is in compact mode
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 font-mono text-xs">children</td>
                      <td className="p-3 font-mono text-xs">ReactNode</td>
                      <td className="p-3 font-mono text-xs">-</td>
                      <td className="p-3">Navigation links or items</td>
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
        </div>
      </div>
    </DocsPage>
  )
}
