import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { ThemeTransitionDemo } from "./theme-transition-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  description: "Animated theme switch with the View Transitions API",
  intro:
    "Switches the next-themes theme inside a View Transition. Four variants are built in: fade, scale, slide, and circle, where the new theme grows out of the click point. The transition styles are injected only for the duration of the animation and removed afterwards. Where the API is missing or reduced motion is on, the theme changes instantly.",
  browserSupport: "Browser Support",
  supportDescription0: "Animates the theme change.",
  browserSupportText:
    "Without document.startViewTransition the theme switches immediately, with no animation and no errors.",
  preview: "Preview",
  previewHint:
    "The buttons switch the real site theme. Each one uses its own variant.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  hookTitle: "Hook with your own button",
  hookText:
    "useThemeTransition returns everything useTheme does, plus setTheme with an origin point and toggleTheme.",
  variantTitle: "Choosing a variant",
  variantText:
    "Pass variant, duration and easing to the hook or the toggle. Without an origin the circle grows from the viewport center.",
  menuTitle: "Theme menu",
  menuText:
    "setTheme accepts any theme name, including system. getTransitionOrigin turns a click into a point and uses the element center for keyboard presses.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  propVariant: "Transition style",
  propDuration: "Duration, in ms",
  propEasing: "CSS easing function",
  propLabels: "Accessible labels of the toggle",
  propClassName: "Additional CSS classes of the toggle",
  hook: "useThemeTransition",
  hookReturns:
    "Accepts { variant, duration, easing } and returns the useTheme result with setTheme(theme, origin?) and toggleTheme(origin?).",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description: "Анимированная смена темы через View Transitions API",
    intro:
      "Меняет тему next-themes внутри View Transition. Есть четыре варианта: fade, scale, slide и circle, где новая тема раскрывается кругом из точки клика. Стили перехода добавляются только на время анимации и потом удаляются. Если API нет или включён reduced motion, тема меняется сразу.",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Анимирует смену темы.",
    browserSupportText:
      "Без document.startViewTransition тема переключается мгновенно, без анимации и без ошибок.",
    preview: "Превью",
    previewHint:
      "Кнопки переключают настоящую тему сайта. У каждой свой вариант перехода.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    hookTitle: "Хук и своя кнопка",
    hookText:
      "useThemeTransition возвращает всё то же, что useTheme, плюс setTheme с точкой начала и toggleTheme.",
    variantTitle: "Выбор варианта",
    variantText:
      "Передайте variant, duration и easing в хук или в кнопку. Если точку не передать, круг раскрывается из центра окна.",
    menuTitle: "Меню тем",
    menuText:
      "setTheme принимает любое имя темы, в том числе system. getTransitionOrigin превращает клик в точку, а при нажатии с клавиатуры берёт центр элемента.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    propVariant: "Вид перехода",
    propDuration: "Длительность, в мс",
    propEasing: "CSS-функция плавности",
    propLabels: "Подписи кнопки для скринридера",
    propClassName: "Дополнительные CSS-классы кнопки",
    hook: "useThemeTransition",
    hookReturns:
      "Принимает { variant, duration, easing } и возвращает результат useTheme с setTheme(theme, origin?) и toggleTheme(origin?).",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Theme Transition", description: t.description }
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export default async function ThemeTransitionPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]

  const toc = [
    { id: "browser-support", title: t.browserSupport, level: 2 },
    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "examples", title: t.examples, level: 2 },
    { id: "props", title: t.props, level: 2 },
  ]

  const rows: [string, string, string, string][] = [
    [
      "variant",
      '"fade" | "scale" | "slide" | "circle"',
      '"circle"',
      t.propVariant,
    ],
    ["duration", "number", "500", t.propDuration],
    ["easing", "string", '"ease-in-out"', t.propEasing],
    ["labels", "{ toLight?: string; toDark?: string }", "-", t.propLabels],
    ["className", "string", "-", t.propClassName],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Theme Transition" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "view-transitions",
              description: t.supportDescription0,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <ThemeTransitionDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/theme-transition" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { ThemeTransitionToggle } from "@/components/ui/theme-transition"

// Inside a next-themes <ThemeProvider attribute="class">
export function Header() {
  return (
    <header className="flex justify-end p-4">
      <ThemeTransitionToggle />
    </header>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.hookTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.hookText}</p>
              <CodeBlock>{`import { Button } from "@/components/ui/button"

"use client"

import {
  getTransitionOrigin,
  useThemeTransition,
} from "@/components/ui/theme-transition"

export function ThemeSwitch() {
  const { resolvedTheme, toggleTheme } = useThemeTransition()

  return (
    <Button onClick={(event) => toggleTheme(getTransitionOrigin(event))}>
      {resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
    </Button>
  )
}`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.variantTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.variantText}
              </p>
              <CodeBlock>{`<ThemeTransitionToggle variant="slide" duration={700} easing="cubic-bezier(.7,0,.3,1)" />

const { toggleTheme } = useThemeTransition({ variant: "fade", duration: 300 })`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.menuTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.menuText}</p>
              <CodeBlock>{`import { Button } from "@/components/ui/button"

const { setTheme } = useThemeTransition({ variant: "circle" })

{["light", "dark", "system"].map((name) => (
  <Button key={name} onClick={(event) => setTheme(name, getTransitionOrigin(event))}>
    {name}
  </Button>
))}`}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="props" className={h2}>
            {t.props}
          </h2>
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">
                    {t.headers.prop}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.headers.type}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.headers.default}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.headers.description}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([prop, type, def, desc]) => (
                  <tr key={prop} className="border-t">
                    <td className="p-3 font-mono text-xs">{prop}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3 font-mono text-xs">{def}</td>
                    <td className="p-3">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground">
            <code className="font-mono text-xs text-foreground">{t.hook}</code>{" "}
            {t.hookReturns}
          </p>
        </div>
      </div>
    </DocsPage>
  )
}
