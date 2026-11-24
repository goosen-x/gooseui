import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { DocsSection } from "@/components/docs/docs-section"
import { InstallCommand } from "@/components/docs/install-command"
import {
  ToggleGroupDemo,
  ToggleGroupFormattingDemo,
  ToggleGroupIconsDemo,
  ToggleGroupIconTextDemo,
} from "./toggle-group-demo"

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
  return (
    <DocsPage toc={sections.map(([id, title]) => ({ id, title, level: 2 }))}>
      <div className="space-y-8">
        <DocsPageNav title="Toggle Group" />
        <p className="text-lg text-muted-foreground">
          {ru
            ? 'Toggle Group позволяет выбрать один вариант из набора или несколько. Под капотом нативные радиокнопки (type="single") или чекбоксы (type="multiple"), значения уходят в форму без JavaScript. Родитель может управлять выбранным значением. Варианты могут содержать текст или значок.'
            : 'Toggle Group lets users choose one option or several from a set. It uses native radio inputs (type="single") or checkboxes (type="multiple"), so values go into form data without JavaScript. The selected option can be controlled by the parent. Each option can contain text or an icon.'}
        </p>
        <BrowserSupport
          title={ru ? "Поддержка браузеров" : "Browser support"}
          features={[
            {
              featureId: "has",
              description: ru
                ? "Селектор используется для оформления состояний радиоэлементов."
                : "The selector styles radio input states.",
            },
          ]}
        />
        <DocsSection id="preview" title={sections[1][1]}>
          <ToggleGroupDemo />
        </DocsSection>
        <DocsSection id="installation" title={sections[2][1]}>
          <InstallCommand packageName="@gooseui/toggle-group" />
        </DocsSection>
        <DocsSection id="usage" title={sections[3][1]}>
          <CodeBlock>{`import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

<ToggleGroup type="single" defaultValue="one"><ToggleGroupItem value="one">One</ToggleGroupItem><ToggleGroupItem value="two">Two</ToggleGroupItem></ToggleGroup>`}</CodeBlock>
        </DocsSection>
        <DocsSection id="examples" title={sections[4][1]}>
          <ToggleGroupDemo />
          <CodeBlock>{`<ToggleGroup
  type="single"
  defaultValue="left"
  onValueChange={(value) => customToast.info(\`Alignment: \${value}\`)}
>
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>`}</CodeBlock>
          <h3 className="mt-8 mb-3 text-lg font-semibold">
            {ru
              ? "Форматирование текста (множественный выбор)"
              : "Text formatting (multiple)"}
          </h3>
          <p className="mb-3 text-sm text-muted-foreground">
            {ru
              ? 'С type="multiple" пункты работают как чекбоксы с общим name: в FormData уходит несколько значений.'
              : 'With type="multiple" items are checkboxes sharing one name, so FormData carries several values.'}
          </p>
          <ToggleGroupFormattingDemo />
          <CodeBlock>{`<ToggleGroup
  type="multiple"
  variant="outline"
  size="icon"
  aria-label="Text formatting"
  onValueChange={(value) => customToast.info(\`Formatting: \${value.join(", ")}\`)}
>
  <ToggleGroupItem value="bold" aria-label="Bold"><BoldIcon /></ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Italic"><ItalicIcon /></ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Underline"><UnderlineIcon /></ToggleGroupItem>
</ToggleGroup>`}</CodeBlock>
          <h3 className="mt-8 mb-3 text-lg font-semibold">
            {ru ? "Выравнивание и вид (иконки)" : "Alignment and view (icons)"}
          </h3>
          <ToggleGroupIconsDemo />
          <CodeBlock>{`<ToggleGroup type="single" variant="outline" size="icon" defaultValue="left" aria-label="Alignment">
  <ToggleGroupItem value="left" aria-label="Left"><AlignLeftIcon /></ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Center"><AlignCenterIcon /></ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Right"><AlignRightIcon /></ToggleGroupItem>
  <ToggleGroupItem value="justify" aria-label="Justify"><AlignJustifyIcon /></ToggleGroupItem>
</ToggleGroup>

<ToggleGroup type="single" variant="outline" size="icon" defaultValue="list" aria-label="View">
  <ToggleGroupItem value="list" aria-label="List"><ListIcon /></ToggleGroupItem>
  <ToggleGroupItem value="grid" aria-label="Grid"><GridIcon /></ToggleGroupItem>
</ToggleGroup>`}</CodeBlock>
          <h3 className="mt-8 mb-3 text-lg font-semibold">
            {ru ? "Иконка и подпись" : "Icon and label"}
          </h3>
          <ToggleGroupIconTextDemo />
          <CodeBlock>{`<ToggleGroup type="single" variant="outline" defaultValue="list" aria-label="View">
  <ToggleGroupItem value="list"><ListIcon />List</ToggleGroupItem>
  <ToggleGroupItem value="grid"><GridIcon />Grid</ToggleGroupItem>
</ToggleGroup>`}</CodeBlock>
        </DocsSection>
        <DocsPropsTable
          props={[
            {
              name: "type",
              type: '"single" | "multiple"',
              description: ru
                ? "single: радиокнопки, выбран один пункт. multiple: чекбоксы с общим name, выбрано несколько."
                : "single: radio inputs, one item selected. multiple: checkboxes sharing a name, several selected.",
            },
            {
              name: "value / defaultValue",
              type: "string | string[]",
              description: ru
                ? "Для single строка, для multiple массив строк. value делает группу управляемой."
                : "A string for single, an array of strings for multiple. value makes the group controlled.",
            },
            {
              name: "onValueChange",
              type: "(value: string) => void | (value: string[]) => void",
              description: ru
                ? "Вызывается при изменении: для multiple получает массив выбранных значений."
                : "Called on change; for multiple it receives the array of selected values.",
            },
            {
              name: "variant",
              type: '"default" | "outline" | "ghost"',
              default: '"default"',
              description: ru
                ? "default: общая подложка-трек, выбранный пункт заливается акцентом. outline: общая рамка и разделители. ghost: без подложки и рамки."
                : "default: a shared track, the selected item is filled with the accent. outline: one border around the group with dividers. ghost: no track and no border.",
            },
            {
              name: "size",
              type: '"default" | "sm" | "lg" | "icon"',
              default: '"default"',
              description: ru
                ? "Размер пунктов. Вариант icon даёт квадратные пункты для иконки; задайте aria-label."
                : "Item size. The icon option gives square items for an icon; set aria-label.",
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
