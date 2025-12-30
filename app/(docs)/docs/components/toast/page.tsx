import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { ToastDemo } from "./toast-demo"

export const metadata = {
  title: "Toast",
  description: "Beautiful toast notifications with progress bar and colored variants",
}

export default function ToastPage() {
  return (
    <div className="space-y-8">
      <DocsPageNav
        title="Toast"
        prevHref="/docs/components/animated-timer"
        nextHref="/docs/components/typography"
      />
      <p className="text-muted-foreground">
        Beautiful toast notifications with progress bar and colored variants
      </p>

      <div className="space-y-4">
        <h2 id="demo" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Demo</h2>
        <div className="p-6 bg-muted/30 rounded-lg">
          <ToastDemo
            labels={{
              showSuccess: "Show Success",
              showError: "Show Error",
              showWarning: "Show Warning",
              showInfo: "Show Info",
              successMessage: "Operation completed successfully!",
              errorMessage: "Something went wrong!",
              warningMessage: "Please check your input",
              infoMessage: "New update available",
            }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 id="installation" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Installation</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Sonner</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Base Toaster component with theming support
            </p>
            <InstallCommand packageName="https://gooseui.pro/r/sonner.json" />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Custom Toast</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Toast with animated progress bar and colored border
            </p>
            <InstallCommand packageName="https://gooseui.pro/r/custom-toast.json" />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Toast Utility</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Helper functions for easy toast calls
            </p>
            <InstallCommand packageName="https://gooseui.pro/r/toast.json" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 id="setup" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Setup</h2>
        <p className="text-muted-foreground">
          Add Toaster component to your root layout
        </p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`// app/layout.tsx
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}`}</code>
        </pre>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Usage</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { customToast } from "@/lib/toast"

// Success toast
customToast.success("Success!", {
  description: "Your changes have been saved"
})

// Error toast
customToast.error("Error!", {
  description: "Something went wrong"
})

// Warning toast
customToast.warning("Warning!", {
  description: "Please check your input"
})

// Info toast
customToast.info("Info", {
  description: "New update available"
})`}</code>
        </pre>
      </div>

      <div className="space-y-4">
        <h2 id="variants" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Variants</h2>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 font-medium">Variant</th>
                <th className="text-left p-3 font-medium">Color</th>
                <th className="text-left p-3 font-medium">Icon</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">success</td>
                <td className="p-3">
                  <span className="text-green-500">Green</span>
                </td>
                <td className="p-3">CircleCheckIcon</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">error</td>
                <td className="p-3">
                  <span className="text-red-500">Red</span>
                </td>
                <td className="p-3">OctagonXIcon</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">warning</td>
                <td className="p-3">
                  <span className="text-amber-500">Amber</span>
                </td>
                <td className="p-3">TriangleAlertIcon</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">info</td>
                <td className="p-3">
                  <span className="text-blue-500">Blue</span>
                </td>
                <td className="p-3">InfoIcon</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2 id="props" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Props</h2>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 font-medium">Prop</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-left p-3 font-medium">Default</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">message</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3 font-mono text-xs">-</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">description</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3 font-mono text-xs">undefined</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">duration</td>
                <td className="p-3 font-mono text-xs">number</td>
                <td className="p-3 font-mono text-xs">4000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
