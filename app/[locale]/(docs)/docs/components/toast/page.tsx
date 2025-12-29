import { getTranslations } from "next-intl/server"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { ToastDemo } from "./toast-demo"

export async function generateMetadata() {
  const t = await getTranslations("components.toast")
  return {
    title: t("title"),
    description: t("description"),
  }
}

export default async function ToastPage() {
  const t = await getTranslations("components.toast")
  const tCommon = await getTranslations("common")

  return (
    <div className="space-y-8">
      <DocsPageNav
        title={t("title")}
        prevHref="/docs/components/animated-timer"
      />
      <p className="text-muted-foreground">{t("description")}</p>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{t("demo")}</h2>
        <div className="p-6 bg-muted/30 rounded-lg">
          <ToastDemo
            labels={{
              showSuccess: t("showSuccess"),
              showError: t("showError"),
              showWarning: t("showWarning"),
              showInfo: t("showInfo"),
              successMessage: t("successMessage"),
              errorMessage: t("errorMessage"),
              warningMessage: t("warningMessage"),
              infoMessage: t("infoMessage"),
            }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{tCommon("installation")}</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">{t("sonner")}</h3>
            <p className="text-sm text-muted-foreground mb-3">
              {t("sonnerDesc")}
            </p>
            <InstallCommand packageName="https://gooseui.pro/r/sonner.json" />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">{t("customToast")}</h3>
            <p className="text-sm text-muted-foreground mb-3">
              {t("customToastDesc")}
            </p>
            <InstallCommand packageName="https://gooseui.pro/r/custom-toast.json" />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">{t("toastUtility")}</h3>
            <p className="text-sm text-muted-foreground mb-3">
              {t("toastUtilityDesc")}
            </p>
            <InstallCommand packageName="https://gooseui.pro/r/toast.json" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{t("setupTitle")}</h2>
        <p className="text-muted-foreground">{t("setupDesc")}</p>
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
        <h2 className="text-xl font-semibold">{tCommon("usage")}</h2>
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
        <h2 className="text-xl font-semibold">{t("variants")}</h2>
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
        <h2 className="text-xl font-semibold">{tCommon("props")}</h2>
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
                <td className="p-3 font-mono text-xs">{t("message")}</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3 font-mono text-xs">-</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">{t("description")}</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3 font-mono text-xs">undefined</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-xs">{t("duration")}</td>
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
