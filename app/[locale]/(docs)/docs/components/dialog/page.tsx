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
        <DocsPageNav title="Dialog" />
        <p className="text-lg text-muted-foreground">
          {ru
            ? "Dialog открывает содержимое в модальном окне поверх страницы. Нативный элемент dialog управляет фокусом и клавишей Escape. Компонент поддерживает управляемое и неуправляемое состояние. Анимация учитывает настройки уменьшения движения."
            : "Dialog presents content in a modal layer above the page. The native dialog element manages focus and the Escape key. Its state can be controlled or uncontrolled. Animations respect reduced motion preferences."}
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
          <InstallCommand packageName="@gooseui/dialog" />
        </DocsSection>
        <DocsSection id="usage" title={sections[3][1]}>
          <CodeBlock>{`import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

<Dialog>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader><DialogTitle>Profile settings</DialogTitle><DialogDescription>Update your settings.</DialogDescription></DialogHeader>
    <DialogFooter><DialogClose asChild><Button>Close</Button></DialogClose></DialogFooter>
  </DialogContent>
</Dialog>`}</CodeBlock>
        </DocsSection>
        <DocsSection id="examples" title={sections[4][1]}>
          <div className="space-y-8">
            <div>
              <h3 className="mb-3 font-medium">{ru ? "Базовый" : "Basic"}</h3>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
                <Demo locale={locale} />
              </div>
              <CodeBlock>{`import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

<Dialog>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader><DialogTitle>Profile settings</DialogTitle><DialogDescription>Update your settings.</DialogDescription></DialogHeader>
    <DialogFooter><DialogClose asChild><Button>Close</Button></DialogClose></DialogFooter>
  </DialogContent>
</Dialog>`}</CodeBlock>
            </div>
            <div>
              <h3 className="mb-3 font-medium">
                {ru ? "С формой" : "With a form"}
              </h3>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
                <Demo locale={locale} form />
              </div>
              <CodeBlock>{`<Dialog>
  <DialogTrigger asChild><Button>Edit profile</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader><DialogTitle>Edit profile</DialogTitle><DialogDescription>Update your name.</DialogDescription></DialogHeader>
    <form onSubmit={handleSubmit}><label>Name <Input name="name" /></label><Button type="submit">Save</Button></form>
  </DialogContent>
</Dialog>`}</CodeBlock>
            </div>
            <div>
              <h3 className="mb-3 font-medium">
                {ru ? "Управляемый" : "Controlled"}
              </h3>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
                <Demo locale={locale} controlled />
              </div>
              <CodeBlock>{`const [open, setOpen] = React.useState(false)

<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent><DialogTitle>Settings</DialogTitle><DialogDescription>Manage your settings.</DialogDescription></DialogContent>
</Dialog>`}</CodeBlock>
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
