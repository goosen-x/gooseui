import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { ThemeCustomizerDemo } from "./theme-customizer-demo"

const en = {
  auditFeature0Description: "Animates the initial appearance",
  auditFeature1Description: "Shapes the panel spring animation",
  browserSupport: "Browser Support",
  supportDescription0: "Fades in the popups.",
  browserSupportText:
    "The popups fade in with @starting-style, Baseline newly available. Without it they simply appear.",
  floatingThemeAndColor:
    "Floating theme and color picker with 6 different variants",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  variants: "Variants",
  colorSetup: "Color Setup",
  props: "Props",
  floatingThemeAndColor2:
    "Floating theme and color picker with 6 different variants: Pill, Bar, Sidebar, Dock, Corner, and Toolbar. The active color and the sun or moon icon are picked by CSS from data-theme-color and the .dark class on <html>, so they are right on the first paint. JavaScript only switches the theme through next-themes, saves the color and opens the popups. Animations are plain CSS transitions.",
  t1PillDefault: "1. Pill (Default)",
  compactFloatingPillWith:
    "Compact floating pill with theme toggle and popup color picker.",
  horizontalBarWithAll:
    "Horizontal bar with all options visible: light/dark/system buttons and color palette.",
  verticalSidebarFixedTo:
    "Vertical sidebar fixed to the right edge of the screen.",
  macosStyleDockAt: "macOS-style dock at the bottom with hover lift effect.",
  minimalExpandableButtonIn:
    "Minimal expandable button in the bottom-right corner.",
  animatedExpandingToolbarWith:
    "Expanding toolbar with a CSS width transition. Compact by default, expands to show color picker on click.",
  addThisScriptTo:
    "Add this script to your layout.tsx to persist color selection:",
  addColorCssVariables: "Add color CSS variables to your globals.css:",
  prop: "Prop",
  type: "Type",
  default: "Default",
  description: "Description",
  additionalCssClasses: "Additional CSS classes",
  inlineProp:
    "Render in place instead of fixed to the viewport. All variants except Bar",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    auditFeature0Description: "Анимирует появление",
    auditFeature1Description: "Задаёт пружинную анимацию панели",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Плавно показывает всплывающие окна.",
    browserSupportText:
      "Всплывающие панели плавно появляются через @starting-style, это Baseline newly. Без него они просто появляются сразу.",
    floatingThemeAndColor:
      "Плавающий переключатель темы и выбор цвета в 6 вариантах",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    variants: "Варианты",
    colorSetup: "Настройка цветов",
    props: "Пропсы",
    floatingThemeAndColor2:
      "Плавающий переключатель темы и выбор цвета в 6 вариантах: Pill, Bar, Sidebar, Dock, Corner и Toolbar. Активный цвет и иконку солнца или луны выбирает CSS по data-theme-color и классу .dark на <html>, поэтому они верные уже при первой отрисовке. JavaScript только переключает тему через next-themes, сохраняет цвет и открывает всплывающие панели. Анимации сделаны обычными CSS-переходами.",
    t1PillDefault: "1. Pill (по умолчанию)",
    compactFloatingPillWith:
      "Компактная плавающая «таблетка» с переключателем темы и всплывающим выбором цвета.",
    horizontalBarWithAll:
      "Горизонтальная панель, где видны все опции: кнопки светлой, тёмной и системной темы и палитра цветов.",
    verticalSidebarFixedTo:
      "Вертикальная панель, закреплённая у правого края экрана.",
    macosStyleDockAt:
      "Док в стиле macOS внизу экрана, иконки приподнимаются при наведении.",
    minimalExpandableButtonIn:
      "Минималистичная раскрывающаяся кнопка в правом нижнем углу.",
    animatedExpandingToolbarWith:
      "Тулбар, который раскрывается CSS-переходом ширины. По умолчанию компактный, по клику раскрывается и показывает выбор цвета.",
    addThisScriptTo:
      "Добавьте этот скрипт в layout.tsx, чтобы выбранный цвет сохранялся:",
    addColorCssVariables: "Добавьте CSS-переменные цветов в globals.css:",
    prop: "Проп",
    type: "Тип",
    default: "По умолчанию",
    description: "Описание",
    additionalCssClasses: "Дополнительные CSS-классы",
    inlineProp:
      "Показывать на месте, а не закреплять у края окна. Во всех вариантах, кроме Bar",
  },
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Theme Customizer", description: t.floatingThemeAndColor }
}

export default async function ThemeCustomizerPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
  const toc = [
    { id: "browser-support", title: t.browserSupport, level: 2 },

    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "variants", title: t.variants, level: 2 },
    { id: "color-setup", title: t.colorSetup, level: 2 },
    { id: "props", title: t.props, level: 2 },
  ]
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Theme Customizer" />
        <p className="text-muted-foreground">{t.floatingThemeAndColor2}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "starting-style",
              description: t.auditFeature0Description,
            },
            {
              featureId: "linear-easing",
              description: t.auditFeature1Description,
            },
          ]}
        />

        <div className="space-y-4">
          <h2
            id="preview"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.preview}
          </h2>
          <ThemeCustomizerDemo />
        </div>

        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/theme-customizer" />
        </div>

        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.usage}
          </h2>
          <CodeBlock>{`import { ThemeCustomizer } from "@/components/ui/theme-customizer"

export default function Page() {
  return (
    <div>
      <h1>My Page</h1>
      <ThemeCustomizer />
    </div>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="variants"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.variants}
          </h2>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            {t.t1PillDefault}
          </h3>
          <p className="text-muted-foreground">{t.compactFloatingPillWith}</p>
          <CodeBlock>{`import { ThemeCustomizerPill } from "@/components/ui/theme-customizer"

<ThemeCustomizerPill />`}</CodeBlock>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            2. Bar
          </h3>
          <p className="text-muted-foreground">{t.horizontalBarWithAll}</p>
          <CodeBlock>{`import { ThemeCustomizerBar } from "@/components/ui/theme-customizer"

<ThemeCustomizerBar />`}</CodeBlock>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            3. Sidebar
          </h3>
          <p className="text-muted-foreground">{t.verticalSidebarFixedTo}</p>
          <CodeBlock>{`import { ThemeCustomizerSidebar } from "@/components/ui/theme-customizer"

<ThemeCustomizerSidebar />`}</CodeBlock>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            4. Dock
          </h3>
          <p className="text-muted-foreground">{t.macosStyleDockAt}</p>
          <CodeBlock>{`import { ThemeCustomizerDock } from "@/components/ui/theme-customizer"

<ThemeCustomizerDock />`}</CodeBlock>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            5. Corner
          </h3>
          <p className="text-muted-foreground">{t.minimalExpandableButtonIn}</p>
          <CodeBlock>{`import { ThemeCustomizerCorner } from "@/components/ui/theme-customizer"

<ThemeCustomizerCorner />`}</CodeBlock>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            6. Toolbar
          </h3>
          <p className="text-muted-foreground">
            {t.animatedExpandingToolbarWith}
          </p>
          <CodeBlock>{`import { ThemeCustomizerToolbar } from "@/components/ui/theme-customizer"

<ThemeCustomizerToolbar />`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="color-setup"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.colorSetup}
          </h2>
          <p className="text-muted-foreground">{t.addThisScriptTo}</p>
          <CodeBlock>{`// app/layout.tsx
<html>
  <head>
    <script
      dangerouslySetInnerHTML={{
        __html: \`
          (function() {
            try {
              var color = localStorage.getItem('theme-color');
              if (color) {
                document.documentElement.setAttribute('data-theme-color', color);
              }
            } catch (e) {}
          })();
        \`,
      }}
    />
  </head>
  ...
</html>`}</CodeBlock>

          <p className="text-muted-foreground mt-4">{t.addColorCssVariables}</p>
          <CodeBlock>{`/* Color themes */
[data-theme-color="blue"] {
  --primary: oklch(0.546 0.245 262.881);
  --primary-foreground: oklch(0.985 0 0);
  --ring: oklch(0.546 0.245 262.881);
}
[data-theme-color="blue"].dark,
.dark[data-theme-color="blue"] {
  --primary: oklch(0.623 0.214 259.815);
  --primary-foreground: oklch(0.145 0 0);
  --ring: oklch(0.623 0.214 259.815);
}
/* Add more colors: red, orange, green, violet, pink */`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="props"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.props}
          </h2>
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">{t.prop}</th>
                  <th className="text-left p-3 font-medium">{t.type}</th>
                  <th className="text-left p-3 font-medium">{t.default}</th>
                  <th className="text-left p-3 font-medium">{t.description}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">className</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">{t.additionalCssClasses}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">inline</td>
                  <td className="p-3 font-mono text-xs">boolean</td>
                  <td className="p-3 font-mono text-xs">false</td>
                  <td className="p-3">{t.inlineProp}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DocsPage>
  )
}
