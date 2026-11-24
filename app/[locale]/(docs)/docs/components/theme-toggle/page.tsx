import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { DocsSection } from "@/components/docs/docs-section"
import { InstallCommand } from "@/components/docs/install-command"
import { ThemeToggleDemo } from "./theme-toggle-demo"

type Props = { params: Promise<{ locale: string }> }
export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const ru = locale === "ru"
  const labels = {
    light: ru ? "Светлая" : "Light",
    dark: ru ? "Тёмная" : "Dark",
  }
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
        <DocsPageNav title="Theme Toggle" />
        <p className="text-lg text-muted-foreground">
          {ru
            ? "Theme Toggle - кнопка переключения светлой и тёмной темы с анимацией солнца и луны. Компонент ничего не знает о провайдере тем: текущую тему он получает в theme, а смену отдаёт в onThemeChange. Поэтому его можно подключить к next-themes или к любому своему хранилищу. Кнопка построена на Button, размер иконки задаётся пропом size, анимация отключается при prefers-reduced-motion."
            : "Theme Toggle is a button that switches between light and dark themes with a sun and moon animation. The component knows nothing about a theme provider: it takes the current theme in theme and reports a change through onThemeChange. That lets you wire it to next-themes or any store of your own. It is built on Button, the icon size comes from the size prop, and the animation turns off under prefers-reduced-motion."}
        </p>
        <DocsSection id="preview" title={sections[0][1]}>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <ThemeToggleDemo />
          </div>
        </DocsSection>
        <DocsSection id="installation" title={sections[1][1]}>
          <InstallCommand packageName="@gooseui/theme-toggle" />
        </DocsSection>
        <DocsSection id="usage" title={sections[2][1]}>
          <CodeBlock>{`import { useTheme } from "next-themes"
import { ThemeToggle } from "@/components/ui/theme-toggle"

const { resolvedTheme, setTheme } = useTheme()

<ThemeToggle
  theme={resolvedTheme === "dark" ? "dark" : "light"}
  onThemeChange={setTheme}
/>`}</CodeBlock>
        </DocsSection>
        <DocsSection id="examples" title={sections[3][1]}>
          <div className="space-y-6">
            <h3 className="font-medium">{ru ? "Базовый" : "Basic"}</h3>
            <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
              <ThemeToggleDemo />
            </div>
            <CodeBlock>{`const { resolvedTheme, setTheme } = useTheme()
const theme = resolvedTheme === "dark" ? "dark" : "light"

<ThemeToggle theme={theme} onThemeChange={setTheme} />`}</CodeBlock>
            <h3 className="font-medium">
              {ru ? "С подписью" : "With a label"}
            </h3>
            <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
              <ThemeToggleDemo withLabel labels={labels} />
            </div>
            <CodeBlock>{`<div className="flex items-center gap-2">
  <ThemeToggle theme={theme} onThemeChange={setTheme} />
  <span className="text-sm">{theme === "dark" ? "Dark" : "Light"}</span>
</div>`}</CodeBlock>
          </div>
        </DocsSection>
        <DocsPropsTable
          props={[
            {
              name: "theme",
              type: '"light" | "dark" | undefined',
              description: ru
                ? "Текущая тема. Можно не передавать до монтирования: тогда иконка берётся из класса .dark на предке, без анимации."
                : "Current theme. You can omit it before mount: the icon then follows the .dark class on an ancestor, with no animation.",
            },
            {
              name: "onThemeChange",
              type: '(theme: "light" | "dark") => void',
              description: ru
                ? "Вызывается по клику с темой, на которую нужно переключиться. Обязательный проп."
                : "Called on click with the theme to switch to. Required.",
            },
            {
              name: "size",
              type: "number",
              default: "24",
              description: ru
                ? "Размер иконки в пикселях."
                : "Icon size in pixels.",
            },
            {
              name: "className",
              type: "string",
              description: ru
                ? "Дополнительные CSS-классы. Остальные пропсы Button передаются кнопке."
                : "Additional CSS classes. Other Button props are passed to the button.",
            },
          ]}
        />
      </div>
    </DocsPage>
  )
}
