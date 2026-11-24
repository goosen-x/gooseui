import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { DocsSection } from "@/components/docs/docs-section"
import { InstallCommand } from "@/components/docs/install-command"
import { Button } from "@/registry/gooseui/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/gooseui/ui/collapsible"
import { CollapsibleControlledDemo } from "./collapsible-controlled-demo"

type Props = { params: Promise<{ locale: string }> }
export default async function Page({ params }: Props) {
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
  const text = ru ? "Скрытое содержимое" : "Hidden content"
  const toggle = ru ? "Показать" : "Toggle"
  return (
    <DocsPage toc={sections.map(([id, title]) => ({ id, title, level: 2 }))}>
      <div className="space-y-8">
        <DocsPageNav title="Collapsible" />
        <p className="text-lg text-muted-foreground">
          {ru
            ? 'Collapsible скрывает и показывает блок содержимого по клику на триггер. Состояние можно держать внутри через defaultOpen или управлять снаружи через open и onOpenChange. Высота плавно анимируется через interpolate-size, а закрытая панель получает hidden="until-found", поэтому поиск по странице раскрывает её сам. Триггер принимает asChild и подставляет атрибуты aria-expanded и aria-controls.'
            : 'Collapsible shows and hides a block of content when its trigger is clicked. Keep the state inside with defaultOpen or control it from outside with open and onOpenChange. Height animates through interpolate-size, and the closed panel gets hidden="until-found", so in-page search opens it on its own. The trigger accepts asChild and sets aria-expanded and aria-controls for you.'}
        </p>
        <BrowserSupport
          title={sections[0][1]}
          features={[
            {
              featureId: "interpolate-size",
              description: ru
                ? "Позволяет анимировать высоту от нуля до auto."
                : "Lets height animate between zero and auto.",
            },
            {
              featureId: "hidden-until-found",
              description: ru
                ? "Закрытая панель находится поиском по странице и раскрывается сама."
                : "The closed panel is found by in-page search and opens itself.",
            },
          ]}
        />
        <DocsSection id="preview" title={sections[1][1]}>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <Collapsible className="w-72 space-y-2">
              <CollapsibleTrigger asChild>
                <Button variant="outline">{toggle}</Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p className="rounded-md border p-3 text-sm">{text}</p>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </DocsSection>
        <DocsSection id="installation" title={sections[2][1]}>
          <InstallCommand packageName="@gooseui/collapsible" />
        </DocsSection>
        <DocsSection id="usage" title={sections[3][1]}>
          <CodeBlock>{`import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

<Collapsible>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>Hidden content</CollapsibleContent>
</Collapsible>`}</CodeBlock>
        </DocsSection>
        <DocsSection id="examples" title={sections[4][1]}>
          <div className="space-y-6">
            <h3 className="font-medium">{ru ? "Базовый" : "Basic"}</h3>
            <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
              <Collapsible className="w-72 space-y-2">
                <CollapsibleTrigger asChild>
                  <Button variant="outline">{toggle}</Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <p className="rounded-md border p-3 text-sm">{text}</p>
                </CollapsibleContent>
              </Collapsible>
            </div>
            <CodeBlock>{`<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="outline">Toggle</Button>
  </CollapsibleTrigger>
  <CollapsibleContent>Hidden content</CollapsibleContent>
</Collapsible>`}</CodeBlock>
            <h3 className="font-medium">
              {ru ? "Открыт по умолчанию" : "Open by default"}
            </h3>
            <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
              <Collapsible defaultOpen className="w-72 space-y-2">
                <CollapsibleTrigger asChild>
                  <Button variant="outline">{toggle}</Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <p className="rounded-md border p-3 text-sm">{text}</p>
                </CollapsibleContent>
              </Collapsible>
            </div>
            <CodeBlock>{`<Collapsible defaultOpen>
  <CollapsibleTrigger asChild>
    <Button variant="outline">Toggle</Button>
  </CollapsibleTrigger>
  <CollapsibleContent>Hidden content</CollapsibleContent>
</Collapsible>`}</CodeBlock>
            <h3 className="font-medium">
              {ru ? "Контролируемый" : "Controlled"}
            </h3>
            <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
              <CollapsibleControlledDemo
                label={toggle}
                text={text}
                state={ru ? ["Открыто", "Закрыто"] : ["Open", "Closed"]}
              />
            </div>
            <CodeBlock>{`const [open, setOpen] = React.useState(false)

<Collapsible open={open} onOpenChange={setOpen}>
  <CollapsibleTrigger asChild>
    <Button variant="outline">Toggle</Button>
  </CollapsibleTrigger>
  <CollapsibleContent>Hidden content</CollapsibleContent>
</Collapsible>`}</CodeBlock>
          </div>
        </DocsSection>
        <DocsPropsTable
          props={[
            {
              name: "open",
              type: "boolean",
              description: ru
                ? "Управляемое состояние. Вместе с onOpenChange переводит компонент в контролируемый режим."
                : "Controlled state. Together with onOpenChange it makes the component controlled.",
            },
            {
              name: "defaultOpen",
              type: "boolean",
              default: "false",
              description: ru
                ? "Начальное состояние в неконтролируемом режиме."
                : "Initial state in uncontrolled mode.",
            },
            {
              name: "onOpenChange",
              type: "(open: boolean) => void",
              description: ru
                ? "Вызывается при смене состояния."
                : "Called when the state changes.",
            },
            {
              name: "asChild",
              type: "boolean",
              default: "false",
              description: ru
                ? "Collapsible и CollapsibleTrigger: передать свои атрибуты единственному дочернему элементу вместо обёртки."
                : "Collapsible and CollapsibleTrigger: pass the props to the single child element instead of rendering a wrapper.",
            },
            {
              name: "className",
              type: "string",
              description: ru
                ? "Дополнительные CSS-классы для Collapsible, CollapsibleTrigger и CollapsibleContent."
                : "Additional CSS classes for Collapsible, CollapsibleTrigger and CollapsibleContent.",
            },
          ]}
        />
      </div>
    </DocsPage>
  )
}
