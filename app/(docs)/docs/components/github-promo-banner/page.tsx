import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"

export const metadata = {
  title: "GitHub Promo Banner",
  description:
    "Floating banner to promote GitHub repository stars with animated counter, marquee, and diagonal pattern.",
}

export default function GitHubPromoBannerPage() {
  return (
    <div className="space-y-8">
      <DocsPageNav
        title="GitHub Promo Banner"
        prevHref="/docs/components/digital-clock"
        nextHref="/docs/components/input"
      />
      <p className="text-muted-foreground">
        A floating promotional banner specifically designed to encourage GitHub
        stars. Features animated star counter, marquee text, and diagonal
        pattern background.
      </p>

      <div className="space-y-4">
        <h2
          id="preview"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Preview
        </h2>
        <div className="relative min-h-[20rem] rounded-lg border bg-muted/30 flex items-center justify-center">
          <p className="text-muted-foreground text-sm">
            The banner appears in the bottom-right corner after 3 seconds delay.
            <br />
            <span className="text-xs">
              (Clear localStorage key &quot;github-star-promo&quot; to see it
              again)
            </span>
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2
          id="installation"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Installation
        </h2>
        <InstallCommand packageName="https://gooseui.pro/r/github-promo-banner.json" />
      </div>

      <div className="space-y-4">
        <h2
          id="usage"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Usage
        </h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { GitHubPromoBanner } from "@/components/github-promo-banner"

export default function Layout({ children }) {
  return (
    <>
      {children}
      <GitHubPromoBanner
        owner="your-username"
        repo="your-repo"
      />
    </>
  )
}`}</code>
        </pre>
      </div>

      <div className="space-y-4">
        <h2
          id="features"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Features
        </h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            <strong>Animated star counter</strong> — numbers animate up from 0
          </li>
          <li>
            <strong>GitHub API integration</strong> — fetches real star count
          </li>
          <li>
            <strong>Marquee text</strong> — scrolling &quot;MIT LICENSE&quot;
            and &quot;OPEN SOURCE&quot;
          </li>
          <li>
            <strong>Diagonal pattern</strong> — subtle background decoration
          </li>
          <li>
            <strong>Smooth entrance</strong> — slides up with fade and scale
          </li>
          <li>
            <strong>LocalStorage persistence</strong> — respects user dismissal
          </li>
          <li>
            <strong>Configurable delay</strong> — appears after specified time
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2
          id="props"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Props
        </h2>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
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
                <td className="p-3 font-mono text-xs">owner</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3 font-mono text-xs">-</td>
                <td className="p-3">GitHub repository owner (required)</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">repo</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3 font-mono text-xs">-</td>
                <td className="p-3">GitHub repository name (required)</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">delay</td>
                <td className="p-3 font-mono text-xs">number</td>
                <td className="p-3 font-mono text-xs">3000</td>
                <td className="p-3">Delay in ms before showing the banner</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">storageKey</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3 font-mono text-xs">
                  &quot;github-star-promo&quot;
                </td>
                <td className="p-3">
                  LocalStorage key for dismissal persistence
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2
          id="examples"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Examples
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Custom delay</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`<GitHubPromoBanner
  owner="facebook"
  repo="react"
  delay={5000} // 5 seconds
/>`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Custom storage key</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`<GitHubPromoBanner
  owner="vercel"
  repo="next.js"
  storageKey="my-project-github-promo"
/>`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2
          id="based-on"
          className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
        >
          Based On
        </h2>
        <p className="text-muted-foreground">
          This component extends the{" "}
          <a
            href="/docs/components/promo-banner"
            className="text-primary underline"
          >
            Promo Banner
          </a>{" "}
          component with GitHub-specific features. See Promo Banner for more
          customization options.
        </p>
      </div>
    </div>
  )
}
