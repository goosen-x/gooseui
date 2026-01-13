import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { BaselineStatus } from "@/registry/new-york/ui/baseline-status"
import {
  CornerShapeDemo,
  CornerShapeIconsDemo,
  CornerShapeImageDemo,
} from "./corner-shape-demo"

export const metadata = {
  title: "Squircle (Corner Shape)",
  description: "iOS-style squircle shapes using CSS corner-shape property",
}

const toc = [
  { id: "browser-support", title: "Browser Support", level: 2 },
  { id: "preview", title: "Preview", level: 2 },
  { id: "installation", title: "Installation", level: 2 },
  { id: "usage", title: "Usage", level: 2 },
  { id: "examples", title: "Examples", level: 2 },
  { id: "props", title: "Props", level: 2 },
  { id: "references", title: "References", level: 2 },
]

export default function CornerShapePage() {
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Squircle" />
        <p className="text-muted-foreground">
          iOS-style rounded rectangles with smooth continuous curves using CSS{" "}
          <code className="text-xs bg-muted px-1 py-0.5 rounded">
            corner-shape: squircle
          </code>
          . Creates shapes that look more natural than regular{" "}
          <code className="text-xs bg-muted px-1 py-0.5 rounded">
            border-radius
          </code>
          .
        </p>

        <div className="space-y-4">
          <h2
            id="browser-support"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Browser Support
          </h2>
          <BaselineStatus
            featureId="corner-shape"
            browserCheck="corner-shape"
          />
          <p className="text-sm text-muted-foreground">
            CSS{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              corner-shape
            </code>{" "}
            is experimental and currently only supported in Chrome 139+.
          </p>
        </div>

        <div className="space-y-4">
          <h2
            id="preview"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Preview
          </h2>
          <p className="text-sm text-muted-foreground">
            Apple-style squircle with border-radius 22%.
          </p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <CornerShapeDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Installation
          </h2>
          <InstallCommand packageName="@gooseui/corner-shape" />
        </div>

        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Usage
          </h2>
          <CodeBlock>{`// Native CSS (Chrome 139+)
<div
  style={{
    borderRadius: "22%",
    cornerShape: "squircle",
  }}
  className="w-32 h-32 bg-purple-500"
>
  Content
</div>

// With the Squircle component (includes SVG fallback)
import { Squircle, SquircleImage } from "@/components/ui/corner-shape"

<Squircle radius="22%" className="w-32 h-32 bg-purple-500">
  Content
</Squircle>

// For images
<SquircleImage
  src="/avatar.jpg"
  alt="User"
  radius="22%"
  containerClassName="w-24 h-24"
/>`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="examples"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Examples
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">With images</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Perfect for app icons, avatars, and thumbnails.
              </p>
              <div className="py-8 bg-muted/30 rounded-lg">
                <CornerShapeImageDemo />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">App icons</h3>
              <p className="text-sm text-muted-foreground mb-4">
                iOS-style app icons with 22.37% border-radius.
              </p>
              <div className="py-8 bg-muted/30 rounded-lg">
                <CornerShapeIconsDemo />
              </div>
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

          <h3 className="text-lg font-medium mt-6 mb-3">Squircle</h3>
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
                  <td className="p-3 font-mono text-xs">radius</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">&quot;20%&quot;</td>
                  <td className="p-3">
                    Border radius value (e.g. &quot;22%&quot;, &quot;24px&quot;)
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">className</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">CSS classes (set width/height here)</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">children</td>
                  <td className="p-3 font-mono text-xs">ReactNode</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">Content inside the squircle</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-medium mt-6 mb-3">SquircleImage</h3>
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
                  <td className="p-3 font-mono text-xs">radius</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">&quot;20%&quot;</td>
                  <td className="p-3">Border radius value</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">containerClassName</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">
                    Classes for the container (set size here)
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">src, alt, etc.</td>
                  <td className="p-3 font-mono text-xs">ImgHTMLAttributes</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">Standard img attributes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="references"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            References
          </h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/CSS/corner-shape"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 hover:text-primary cursor-pointer"
              >
                MDN: corner-shape
              </a>
            </li>
            <li>
              <a
                href="https://en.wikipedia.org/wiki/Superellipse"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 hover:text-primary cursor-pointer"
              >
                Wikipedia: Superellipse
              </a>
            </li>
          </ul>
        </div>
      </div>
    </DocsPage>
  )
}
