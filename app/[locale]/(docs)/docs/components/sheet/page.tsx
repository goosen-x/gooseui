import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { DocsSection } from "@/components/docs/docs-section"
import { InstallCommand } from "@/components/docs/install-command"
import { Demo } from "./demo"

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const ru = locale === "ru"
  const sections = [
    ["browser-support", ru ? "Поддержка браузеров" : "Browser support"],
    ["preview", ru ? "Превью" : "Preview"],
    ["installation", ru ? "Установка" : "Installation"],
    ["usage", ru ? "Использование" : "Usage"],
    ["examples", ru ? "Примеры" : "Examples"],
    ["props", ru ? "Пропсы" : "Props"],
  ]
  return (
    <DocsPage toc={sections.map(([id, title]) => ({ id, title, level: 2 }))}>
      <div className="space-y-8">
        <DocsPageNav title="Sheet" />
        <p className="text-lg text-muted-foreground">
          {ru
            ? "Sheet открывает содержимое в модальном окне поверх страницы. Нативный элемент dialog управляет фокусом и клавишей Escape. Компонент поддерживает управляемое и неуправляемое состояние. Анимация учитывает настройки уменьшения движения."
            : "Sheet presents content in a modal layer above the page. The native dialog element manages focus and the Escape key. Its state can be controlled or uncontrolled. Animations respect reduced motion preferences."}
        </p>
        <BrowserSupport
          title={sections[0][1]}
          features={[
            {
              featureId: "dialog",
              description: ru
                ? "Нативное модальное окно."
                : "Native modal window.",
            },
            {
              featureId: "starting-style",
              description: ru ? "Анимация появления." : "Entry animation.",
            },
            {
              featureId: "transition-behavior",
              description: ru ? "Анимация закрытия." : "Exit animation.",
            },
          ]}
        />
        <DocsSection id="preview" title={sections[1][1]}>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <Demo locale={locale} />
          </div>
        </DocsSection>
        <DocsSection id="installation" title={sections[2][1]}>
          <InstallCommand packageName="@gooseui/sheet" />
        </DocsSection>
        <DocsSection id="usage" title={sections[3][1]}>
          <CodeBlock>{`import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

<Sheet>
  <SheetTrigger asChild><Button>Open</Button></SheetTrigger>
  <SheetContent side="right">
    <SheetHeader><SheetTitle>Profile settings</SheetTitle><SheetDescription>Update your settings.</SheetDescription></SheetHeader>
    <SheetFooter><SheetClose asChild><Button>Close</Button></SheetClose></SheetFooter>
  </SheetContent>
</Sheet>`}</CodeBlock>
        </DocsSection>
        <DocsSection id="examples" title={sections[4][1]}>
          <div className="space-y-8">
            <div>
              <h3 className="mb-3 font-medium">{ru ? "Базовый" : "Basic"}</h3>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
                <Demo locale={locale} />
              </div>
              <CodeBlock>{`import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

<Sheet>
  <SheetTrigger asChild><Button>Open</Button></SheetTrigger>
  <SheetContent side="right">
    <SheetHeader><SheetTitle>Profile settings</SheetTitle><SheetDescription>Update your settings.</SheetDescription></SheetHeader>
    <SheetFooter><SheetClose asChild><Button>Close</Button></SheetClose></SheetFooter>
  </SheetContent>
</Sheet>`}</CodeBlock>
            </div>
            <div>
              <h3 className="mb-3 font-medium">
                {ru ? "С формой" : "With a form"}
              </h3>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
                <Demo locale={locale} form />
              </div>
              <CodeBlock>{`<Sheet>
  <SheetTrigger asChild><Button>Edit profile</Button></SheetTrigger>
  <SheetContent>
    <SheetHeader><SheetTitle>Edit profile</SheetTitle><SheetDescription>Update your name.</SheetDescription></SheetHeader>
    <form onSubmit={handleSubmit}><label>Name <Input name="name" /></label><Button type="submit">Save</Button></form>
  </SheetContent>
</Sheet>`}</CodeBlock>
            </div>
            <div>
              <h3 className="mb-3 font-medium">
                {ru ? "Управляемый" : "Controlled"}
              </h3>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
                <Demo locale={locale} controlled />
              </div>
              <CodeBlock>{`const [open, setOpen] = React.useState(false)

<Sheet open={open} onOpenChange={setOpen}>
  <SheetTrigger asChild><Button>Open</Button></SheetTrigger>
  <SheetContent><SheetTitle>Settings</SheetTitle><SheetDescription>Manage your settings.</SheetDescription></SheetContent>
</Sheet>`}</CodeBlock>
            </div>
            <div className="grid gap-8">
              {(["top", "right", "bottom", "left"] as const).map((side) => (
                <div key={side}>
                  <h3 className="mb-3 font-medium">{side}</h3>
                  <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
                    <Demo locale={locale} side={side} />
                  </div>
                  <CodeBlock>{`<SheetContent side="${side}">...</SheetContent>`}</CodeBlock>
                </div>
              ))}
            </div>
          </div>
        </DocsSection>
        <DocsPropsTable
          props={[
            {
              name: "open",
              type: "boolean",
              description: ru
                ? "Управляемое состояние."
                : "Controlled open state.",
            },
            {
              name: "defaultOpen",
              type: "boolean",
              default: "false",
              description: ru ? "Начальное состояние." : "Initial open state.",
            },
            {
              name: "onOpenChange",
              type: "(open: boolean) => void",
              description: ru
                ? "Вызывается при изменении состояния."
                : "Called when open state changes.",
            },
            {
              name: "asChild",
              type: "boolean",
              default: "false",
              description: ru
                ? "Передаёт действие дочернему элементу Trigger или Close."
                : "Composes Trigger or Close with its child.",
            },
            {
              name: "showCloseButton",
              type: "boolean",
              default: "true",
              description: ru
                ? "Показывает кнопку закрытия."
                : "Shows the close button.",
            },
            {
              name: "side",
              type: '"top" | "right" | "bottom" | "left"',
              default: '"right"',
              description: ru
                ? "Край экрана для панели."
                : "Screen edge for the panel.",
            },
            {
              name: "className",
              type: "string",
              description: ru
                ? "Дополнительные CSS-классы."
                : "Additional CSS classes.",
            },
          ]}
        />
      </div>
    </DocsPage>
  )
}
