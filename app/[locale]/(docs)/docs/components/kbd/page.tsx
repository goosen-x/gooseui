import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { DocsSection } from "@/components/docs/docs-section"
import { InstallCommand } from "@/components/docs/install-command"
import {
  Kbd,
  KbdArrowDownIcon,
  KbdArrowUpIcon,
  KbdEnterIcon,
  KbdGroup,
} from "@/registry/gooseui/ui/kbd"

type Props = { params: Promise<{ locale: string }> }
export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const ru = locale === "ru"
  const sections = [
    ["preview", ru ? "Превью" : "Preview"],
    ["installation", ru ? "Установка" : "Installation"],
    ["usage", ru ? "Использование" : "Usage"],
    ["examples", ru ? "Примеры" : "Examples"],
    ["props", ru ? "Пропсы" : "Props"],
  ]
  return (
    <DocsPage toc={sections.map(([id, title]) => ({ id, title, level: 2 }))}>
      <div className="space-y-8">
        <DocsPageNav title="Kbd" />
        <p className="text-lg text-muted-foreground">
          {ru
            ? "Kbd показывает клавишу или сочетание клавиш. Компонент использует семантический элемент kbd. Объединяйте клавиши в группы для отображения сочетаний. Компонент работает без JavaScript."
            : "Kbd displays a keyboard key or shortcut. It uses the native kbd element for semantic markup. Combine keys in a group to show shortcuts. It works without JavaScript."}
        </p>
        <DocsSection id="preview" title={sections[0][1]}>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </div>
        </DocsSection>
        <DocsSection id="installation" title={sections[1][1]}>
          <InstallCommand packageName="@gooseui/kbd" />
        </DocsSection>
        <DocsSection id="usage" title={sections[2][1]}>
          <CodeBlock>{`import { Kbd, KbdGroup } from "@/components/ui/kbd"

<KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>`}</CodeBlock>
        </DocsSection>
        <DocsSection id="examples" title={sections[3][1]}>
          <div className="space-y-6">
            {[
              [
                ru ? "Одиночная клавиша" : "Single key",
                <Kbd key="a">Esc</Kbd>,
                "<Kbd>Esc</Kbd>",
              ],
              [
                ru ? "Сочетание" : "Combination",
                <KbdGroup key="a">
                  <Kbd>⌘</Kbd>
                  <Kbd>K</Kbd>
                </KbdGroup>,
                "<KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>",
              ],
              [
                ru ? "Клавиши с иконками" : "Keys with icons",
                <KbdGroup key="a">
                  <Kbd>
                    <KbdArrowUpIcon />
                  </Kbd>
                  <Kbd>
                    <KbdArrowDownIcon />
                  </Kbd>
                  <Kbd>
                    <KbdEnterIcon />
                  </Kbd>
                </KbdGroup>,
                `<Kbd><KbdEnterIcon /></Kbd>
<Kbd><KbdArrowUpIcon /></Kbd>
<Kbd><KbdArrowDownIcon /></Kbd>`,
              ],
              [
                ru ? "Внутри кнопки" : "Inside a button",
                <button
                  key="a"
                  type="button"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm hover:bg-accent"
                >
                  {ru ? "Поиск" : "Search"}
                  <KbdGroup>
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                  </KbdGroup>
                </button>,
                `<button>
  Search
  <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>
</button>`,
              ],
              [
                ru ? "В тексте" : "Inline in text",
                <p key="a" className="text-sm">
                  {ru ? "Нажмите " : "Press "}
                  <Kbd>Esc</Kbd>
                  {ru ? ", чтобы закрыть окно." : " to close the dialog."}
                </p>,
                "<p>Press <Kbd>Esc</Kbd> to close the dialog.</p>",
              ],
            ].map(([title, demo, code]) => (
              <div key={title as string} className="space-y-3">
                <h3 className="text-sm font-medium">{title}</h3>
                <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                  {demo}
                </div>
                <CodeBlock>{code as string}</CodeBlock>
              </div>
            ))}
          </div>
        </DocsSection>
        <DocsPropsTable
          props={[
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
