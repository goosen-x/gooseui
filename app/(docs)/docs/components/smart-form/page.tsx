import { CodeBlock } from "@/components/docs/code-block"
import { DocsBrowserSupport } from "@/components/docs/docs-browser-support"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"

export const metadata = {
  title: "Smart Form",
  description:
    "CSS-only form validation with visual feedback using the :has() selector",
}

const toc = [
  { id: "preview", title: "Preview", level: 2 },
  { id: "installation", title: "Installation", level: 2 },
  { id: "usage", title: "Usage", level: 2 },
  { id: "css-feature", title: "CSS Feature", level: 2 },
  { id: "props", title: "Props", level: 2 },
]

export default function SmartFormPage() {
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        {/* 1. Navigation */}
        <DocsPageNav title="Smart Form" />

        {/* 2. Description */}
        <p className="text-muted-foreground">
          CSS-only form validation with visual feedback using the :has()
          selector. No JavaScript validation logic needed.
        </p>

        {/* 3. Browser Support */}
        <DocsBrowserSupport
          features={{ featureId: "has", browserCheck: "has" }}
        >
          Uses <code className="bg-muted px-1.5 py-0.5 rounded">:has()</code> to
          style parent elements based on child input states like{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded">:valid</code> and{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded">:invalid</code>.
        </DocsBrowserSupport>

        {/* 4. Preview */}
        <div className="space-y-4">
          <h2
            id="preview"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Preview
          </h2>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">
              Form fields show validation states automatically based on HTML5
              validation.
            </p>
          </div>
        </div>

        {/* 5. Installation */}
        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Installation
          </h2>
          <InstallCommand packageName="https://gooseui.pro/r/smart-form.json" />
        </div>

        {/* 6. Usage */}
        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            Usage
          </h2>
          <CodeBlock>{`import { SmartForm, SmartFormField } from "@/components/effects/smart-form"

<SmartForm>
  <SmartFormField errorMessage="Please enter a valid email">
    <label>Email</label>
    <input type="email" required placeholder="you@example.com" />
  </SmartFormField>

  <SmartFormField errorMessage="Password must be at least 8 characters">
    <label>Password</label>
    <input type="password" required minLength={8} placeholder="••••••••" />
  </SmartFormField>

  <button type="submit">Submit</button>
</SmartForm>`}</CodeBlock>
        </div>

        {/* 7. CSS Feature */}
        <div className="space-y-4">
          <h2
            id="css-feature"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            CSS Feature
          </h2>
          <CodeBlock>{`.field:has(input:invalid:not(:placeholder-shown)) {
  --field-color: var(--destructive);
}

.field:has(input:valid:not(:placeholder-shown)) {
  --field-color: var(--success);
}

.field:has(input:invalid:not(:placeholder-shown)) .error-message {
  display: block;
}

.field:has(input:valid:not(:placeholder-shown)) .success-message {
  display: block;
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
                  <td className="p-3 font-mono text-xs">errorMessage</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">
                    &quot;This field is invalid&quot;
                  </td>
                  <td className="p-3">Message shown when invalid</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">successMessage</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">
                    &quot;Looks good!&quot;
                  </td>
                  <td className="p-3">Message shown when valid</td>
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
    </DocsPage>
  )
}
