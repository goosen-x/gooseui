import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import {
  PromoBannerDemo,
  PromoBannerGradients,
  PromoBannerPositions,
} from "./promo-banner-demo"

export const metadata = {
  title: "Promo Banner",
  description:
    "Floating promotional banner with marquee animation, discount badges, and localStorage persistence",
}

const toc = [
  { id: "preview", title: "Preview", level: 2 },
  { id: "installation", title: "Installation", level: 2 },
  { id: "usage", title: "Usage", level: 2 },
  { id: "examples", title: "Examples", level: 2 },
  { id: "props", title: "Props", level: 2 },
]

export default function PromoBannerPage() {
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Promo Banner" />
        <p className="text-muted-foreground">
          Floating promotional banner with marquee animation, discount badges,
          and localStorage persistence. Perfect for campaigns, sales, and
          special offers.
        </p>

        <div className="space-y-4">
          <h2
            id="preview"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Preview
          </h2>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg min-h-[200px]">
            <PromoBannerDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Installation
          </h2>
          <InstallCommand packageName="@gooseui/promo-banner" />
          <p className="text-sm text-muted-foreground">
            Add the marquee animation to your globals.css:
          </p>
          <CodeBlock>{`@layer utilities {
  .animate-marquee {
    animation: marquee var(--duration, 20s) linear infinite;
  }
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(calc(-100% - 1rem)); }
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Usage
          </h2>
          <CodeBlock>{`import { PromoBanner } from "@/components/ui/promo-banner"

export default function Page() {
  return (
    <PromoBanner
      title="Winter Campaign"
      headline="START 2025 WITH A BANG!"
      price={229}
      originalPrice={1444}
      ctaText="Get Bundle"
      ctaHref="/docs"
      marqueeText="3 DAYS LEFT • FIRST 100 ONLY"
      storageKey="promo-winter-2025"
    />
  )
}`}</CodeBlock>
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
              <h3 className="text-lg font-medium">Positions</h3>
              <p className="text-sm text-muted-foreground">
                Choose where the banner appears on screen
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg min-h-[9.375rem]">
                <PromoBannerPositions />
              </div>
              <CodeBlock>{`<PromoBanner position="top-left" />
<PromoBanner position="top-right" />
<PromoBanner position="bottom-left" />
<PromoBanner position="bottom-right" /> // default`}</CodeBlock>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">Custom Gradients</h3>
              <p className="text-sm text-muted-foreground">
                Customize the gradient colors to match your brand
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg min-h-[9.375rem]">
                <PromoBannerGradients />
              </div>
              <CodeBlock>{`<PromoBanner
  gradientFrom="from-blue-600"
  gradientTo="to-cyan-500"
/>`}</CodeBlock>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">With localStorage</h3>
              <p className="text-sm text-muted-foreground">
                Remember when user closes the banner
              </p>
              <CodeBlock>{`<PromoBanner
  storageKey="promo-winter-2025"
  delay={3000} // show after 3 seconds
/>`}</CodeBlock>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">Using Provider</h3>
              <p className="text-sm text-muted-foreground">
                Global banner management with context
              </p>
              <CodeBlock>{`import { PromoBannerProvider, usePromoBanner } from "@/components/ui/promo-banner"

// In layout or app
<PromoBannerProvider>
  <App />
</PromoBannerProvider>

// Anywhere in your app
function Component() {
  const { show, hide } = usePromoBanner()

  return (
    <button onClick={() => show({
      headline: "Flash Sale!",
      price: 99,
      originalPrice: 199,
    })}>
      Show Promo
    </button>
  )
}`}</CodeBlock>
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
                  <td className="p-3 font-mono text-xs">headline</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">required</td>
                  <td className="p-3">Main headline text</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">price</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">required</td>
                  <td className="p-3">Current price</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">title</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">"Special Offer"</td>
                  <td className="p-3">Small title above headline</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">originalPrice</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">Original price (crossed out)</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">currency</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">"$"</td>
                  <td className="p-3">Currency symbol</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">ctaText</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">"Get Now"</td>
                  <td className="p-3">CTA button text</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">ctaHref</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">"#"</td>
                  <td className="p-3">CTA button link</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">marqueeText</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">Scrolling text at bottom</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">position</td>
                  <td className="p-3 font-mono text-xs">
                    "bottom-right" | "bottom-left" | "top-right" | "top-left"
                  </td>
                  <td className="p-3 font-mono text-xs">"bottom-right"</td>
                  <td className="p-3">Banner position</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">gradientFrom</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">"from-violet-600"</td>
                  <td className="p-3">Gradient start color class</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">gradientTo</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">"to-pink-600"</td>
                  <td className="p-3">Gradient end color class</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">storageKey</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">localStorage key for persistence</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">delay</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">0</td>
                  <td className="p-3">Delay before showing (ms)</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">images</td>
                  <td className="p-3 font-mono text-xs">string[]</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">Product image URLs</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">onClose</td>
                  <td className="p-3 font-mono text-xs">() =&gt; void</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">Close callback</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DocsPage>
  )
}
