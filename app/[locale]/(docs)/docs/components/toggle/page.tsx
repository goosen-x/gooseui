import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { DocsSection } from "@/components/docs/docs-section"
import { InstallCommand } from "@/components/docs/install-command"
import { ToggleDemo, ToggleIconDemo, ToggleIconTextDemo } from "./toggle-demo"

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
        <DocsPageNav title="Toggle" />
        <p className="text-lg text-muted-foreground">
          {ru
            ? "Toggle — кнопка с двумя состояниями. Она сообщает состояние через aria-pressed. Используйте её для включения и выключения параметров. Поддерживаются управляемый и неуправляемый режимы."
            : "Toggle is a two-state button. It exposes its state through aria-pressed. Use it for settings that can be switched on and off. It supports controlled and uncontrolled state."}
        </p>
        <DocsSection id="preview" title={sections[0][1]}>
          <ToggleDemo />
        </DocsSection>
        <DocsSection id="installation" title={sections[1][1]}>
          <InstallCommand packageName="@gooseui/toggle" />
        </DocsSection>
        <DocsSection id="usage" title={sections[2][1]}>
          <CodeBlock>{`import { Toggle } from "@/components/ui/toggle"

<Toggle>Bold</Toggle>`}</CodeBlock>
        </DocsSection>
        <DocsSection id="examples" title={sections[3][1]}>
          <ToggleDemo all />
          <CodeBlock>{`<Toggle
  onPressedChange={(on) =>
    customToast.info(\`Bold: \${on ? "on" : "off"}\`)
  }
>
  Bold
</Toggle>`}</CodeBlock>
          <h3 className="mt-8 mb-3 text-lg font-semibold">
            {ru ? "Только иконка" : "Icon only"}
          </h3>
          <ToggleIconDemo />
          <CodeBlock>{`<Toggle
  size="icon"
  aria-label="Bold"
  onPressedChange={(on) =>
    customToast.info(\`Bold: \${on ? "on" : "off"}\`)
  }
>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />
  </svg>
</Toggle>

{/* Star fills when pressed */}
<Toggle size="icon" variant="outline" aria-label="Favorite" className="data-[state=on]:[&_svg]:fill-current">
  <StarIcon />
</Toggle>`}</CodeBlock>
          <h3 className="mt-8 mb-3 text-lg font-semibold">
            {ru ? "Иконка и текст" : "Icon and text"}
          </h3>
          <ToggleIconTextDemo />
          <CodeBlock>{`<Toggle variant="outline" className="px-3">
  <BoldIcon />
  Bold
</Toggle>`}</CodeBlock>
        </DocsSection>
        <DocsPropsTable
          props={[
            {
              name: "onPressedChange",
              type: "(pressed: boolean) => void",
              description: ru
                ? "Вызывается при нажатии с новым состоянием."
                : "Called on press with the new state.",
            },
            {
              name: "size",
              type: '"default" | "sm" | "lg" | "icon"',
              default: '"default"',
              description: ru
                ? "Размер. Вариант icon даёт квадратную кнопку 36×36 для одной иконки; обязательно задайте aria-label."
                : "Size. The icon option gives a 36×36 square button for a single icon; always set aria-label.",
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
