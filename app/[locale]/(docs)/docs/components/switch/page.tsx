import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { DocsSection } from "@/components/docs/docs-section"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Switch } from "@/registry/gooseui/ui/switch"
import {
  FormDemo,
  LabelDemo,
  PreviewDemo,
  SettingsDemo,
  SizesDemo,
} from "./switch-demo"

const en = {
  description:
    'Switch is a native on/off control. The knob moves on a spring curve and stretches while pressed, like on iOS. It is a checkbox with role="switch", so it works in forms without JavaScript and submits its value by name.',
  browser: "Browser Support",
  appearance:
    "Customizes the native checkbox appearance while retaining its browser behavior.",
  easing:
    "Spring easing for the knob. Browsers without it fall back to cubic-bezier.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  props: "Props",
  sizes: "Sizes",
  withLabel: "With a label",
  label: "Airplane mode",
  disabled: "Disabled",
  disabledOn: "Disabled and on",
  form: "In a form",
  toast: "Toast on change",
  settings: "Settings list",
  size: "Control size.",
  checked: "Controlled or initial state.",
  disabledProp: "Disables the switch.",
  name: "Field name in the form.",
  value: 'Value submitted when on. Defaults to "on".',
  other:
    "Other native input attributes, including onChange and aria attributes.",
  className: "Classes for the wrapper element.",
}
const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      'Switch — нативный переключатель вкл/выкл. Шарик едет по пружинной кривой и растягивается при нажатии, как в iOS. Это чекбокс с role="switch", поэтому он работает в форме без JavaScript и отправляет значение по name.',
    browser: "Поддержка браузеров",
    appearance:
      "Меняет внешний вид нативного чекбокса, сохраняя его поведение в браузере.",
    easing:
      "Пружинная кривая для шарика. Без неё браузер использует cubic-bezier.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    props: "Пропсы",
    sizes: "Размеры",
    withLabel: "С подписью",
    label: "Режим полёта",
    disabled: "Отключённый",
    disabledOn: "Отключённый и включённый",
    form: "В форме",
    toast: "Тост при переключении",
    settings: "Список настроек",
    size: "Размер переключателя.",
    checked: "Управляемое или начальное состояние.",
    disabledProp: "Отключает переключатель.",
    name: "Имя поля в форме.",
    value: "Значение, отправляемое во включённом состоянии. По умолчанию «on».",
    other: "Другие атрибуты input, включая onChange и aria.",
    className: "Классы для внешнего элемента.",
  },
}
type Props = { params: Promise<{ locale: string }> }
export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  return { title: "Switch", description: content[locale as Locale].description }
}
export default async function SwitchPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
  const toc = [
    ["browser-support", t.browser],
    ["preview", t.preview],
    ["installation", t.installation],
    ["usage", t.usage],
    ["examples", t.examples],
    ["props", t.props],
  ].map(([id, title]) => ({ id, title, level: 2 }))
  const box = "flex justify-center rounded-lg bg-muted/30 px-4 py-8"
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Switch" />
        <p className="text-lg text-muted-foreground">{t.description}</p>
        <BrowserSupport
          title={t.browser}
          features={[
            {
              featureId: "appearance",
              description: t.appearance,
            },
            {
              featureId: "linear-easing",
              description: t.easing,
            },
            {
              featureId: "has",
              description:
                locale === "ru"
                  ? "Кольцо фокуса вокруг переключателя."
                  : "Focus ring around the switch.",
            },
          ]}
        />
        <DocsSection id="preview" title={t.preview}>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <PreviewDemo />
          </div>
        </DocsSection>
        <DocsSection id="installation" title={t.installation}>
          <InstallCommand packageName="@gooseui/switch" />
        </DocsSection>
        <DocsSection id="usage" title={t.usage}>
          <CodeBlock>{`import { Switch } from "@/components/ui/switch"\nimport { Label } from "@/components/ui/label"\n\n<Switch id="airplane" name="airplane" defaultChecked />\n<Label htmlFor="airplane">Airplane mode</Label>`}</CodeBlock>
        </DocsSection>
        <DocsSection id="examples" title={t.examples}>
          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.sizes}</h3>
              <div className={`${box} items-center gap-6`}>
                <SizesDemo />
              </div>
              <CodeBlock>{`<Switch size="sm" />\n<Switch />\n<Switch size="lg" />`}</CodeBlock>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.withLabel}</h3>
              <div className={`${box} items-center gap-3`}>
                <LabelDemo />
              </div>
              <CodeBlock>{`<Switch id="airplane" />\n<Label htmlFor="airplane">Airplane mode</Label>`}</CodeBlock>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.disabled}</h3>
              <div className={`${box} items-center gap-6`}>
                <Switch aria-label={t.disabled} disabled />
                <Switch aria-label={t.disabledOn} disabled defaultChecked />
              </div>
              <CodeBlock>{`<Switch disabled />\n<Switch disabled defaultChecked />`}</CodeBlock>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.toast}</h3>
              <CodeBlock>
                {
                  '<Switch\n  aria-label="Notifications"\n  onChange={(e) =>\n    customToast.success(\n      `Notifications: ${e.currentTarget.checked ? "on" : "off"}`,\n    )\n  }\n/>'
                }
              </CodeBlock>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.form}</h3>
              <div className={box}>
                <FormDemo />
              </div>
              <CodeBlock>{`<form>\n  <Switch name="notifications" value="yes" defaultChecked />\n  <Switch name="sound" />\n  <Button type="submit">Save</Button>\n</form>\n// FormData: { notifications: "yes" }`}</CodeBlock>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.settings}</h3>
              <div className={box}>
                <SettingsDemo />
              </div>
              <CodeBlock>{`<li className="flex items-center justify-between">\n  <Label htmlFor="sound">Sound</Label>\n  <Switch id="sound" defaultChecked />\n</li>`}</CodeBlock>
            </div>
          </div>
        </DocsSection>
        <DocsPropsTable
          props={[
            {
              name: "size",
              type: '"sm" | "default" | "lg"',
              default: '"default"',
              description: t.size,
            },
            {
              name: "checked / defaultChecked",
              type: "boolean",
              description: t.checked,
            },
            { name: "disabled", type: "boolean", description: t.disabledProp },
            { name: "name", type: "string", description: t.name },
            { name: "value", type: "string", description: t.value },
            { name: "className", type: "string", description: t.className },
            {
              name: "...props",
              type: "InputHTMLAttributes<HTMLInputElement>",
              description: t.other,
            },
          ]}
        />
      </div>
    </DocsPage>
  )
}
