import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  CheckboxFormDemo,
  CheckboxPreview,
  CheckboxSizes,
  CheckboxVariants,
  CheckboxWithoutLabel,
} from "./checkbox-demo"

const en = {
  intro:
    "Checkbox wraps a native checkbox in a label and animates its SVG check mark with CSS. It accepts input attributes including name, required, checked and disabled, with three colors and three sizes. Use it for independent choices; Radio is intended for choosing one option from a group.",
  description: "Native checkbox with an animated check mark, no JavaScript",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  variants: "Variants",
  sizes: "Sizes",
  withoutLabel: "Without Label",
  props: "Props",
  aCheckboxWithSmoothSvg:
    "A native checkbox whose box folds into a tick through an SVG stroke animation. The state lives in the input itself and the animation runs on :checked, so the component is a Server Component with no JavaScript and no dependencies.",
  browserSupport: "Browser Support",
  supportDescription0: "Animates the checked state.",
  browserSupportText:
    "The animation is driven by :has(:checked) on the label, Baseline widely available. The input stays a real checkbox: keyboard, forms and screen readers work as usual.",
  form: "In a form",
  formText:
    "Pass any input attribute: name, value, required, defaultChecked or onChange in a client component. The form below works with JavaScript turned off.",
  inputProps: "Any other attribute goes to the native input",
  prop: "Prop",
  type: "Type",
  default: "Default",
  description2: "Description",
  visualStyleVariant: "Visual style variant",
  sizeOfTheCheckbox: "Size of the checkbox",
  labelTextDisplayedNextTo: "Label text displayed next to checkbox",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    intro:
      "Checkbox содержит нативный флажок внутри подписи и рисует галочку с помощью SVG и CSS. Он принимает атрибуты input, включая name, required, checked и disabled, и поддерживает три цвета и три размера. Компонент подходит для независимых выборов; Radio — для выбора одного варианта из группы.",
    description: "Нативный чекбокс с анимированной галочкой, без JavaScript",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    variants: "Варианты",
    sizes: "Размеры",
    withoutLabel: "Без подписи",
    props: "Пропсы",
    aCheckboxWithSmoothSvg:
      "Нативный чекбокс, рамка которого складывается в галочку через анимацию SVG-обводки. Состояние хранит сам input, анимация срабатывает по :checked, поэтому компонент серверный, без JavaScript и без зависимостей.",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Анимирует выбранное состояние.",
    browserSupportText:
      "Анимацией управляет :has(:checked) на подписи, это Baseline widely available. Внутри остаётся настоящий чекбокс: клавиатура, формы и скринридеры работают как обычно.",
    form: "В форме",
    formText:
      "Передавайте любые атрибуты input: name, value, required, defaultChecked или onChange в клиентском компоненте. Форма ниже работает и с выключенным JavaScript.",
    inputProps: "Остальные атрибуты уходят в нативный input",
    prop: "Проп",
    type: "Тип",
    default: "По умолчанию",
    description2: "Описание",
    visualStyleVariant: "Визуальный вариант",
    sizeOfTheCheckbox: "Размер чекбокса",
    labelTextDisplayedNextTo: "Текст подписи рядом с чекбоксом",
  },
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return {
    title: "Checkbox",
    description: t.description,
  }
}

export default async function CheckboxPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
  const toc = [
    { id: "browser-support", title: t.browserSupport, level: 2 },
    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "variants", title: t.variants, level: 2 },
    { id: "sizes", title: t.sizes, level: 2 },
    { id: "without-label", title: t.withoutLabel, level: 2 },
    { id: "form", title: t.form, level: 2 },
    { id: "props", title: t.props, level: 2 },
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Checkbox" />
        <p className="text-lg text-muted-foreground">{t.description}</p>
        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "has",
              description: t.supportDescription0,
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
          <CheckboxPreview />
        </div>

        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/checkbox" />
        </div>

        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.usage}
          </h2>
          <CodeBlock>{`import { Checkbox } from "@/components/ui/checkbox"

export function MyComponent() {
  return <Checkbox label="Accept terms" />
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="variants"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.variants}
          </h2>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
            <CheckboxVariants />
          </div>
          <CodeBlock>{`<Checkbox variant="default" label="Default" />
<Checkbox variant="destructive" label="Destructive" />
<Checkbox variant="success" label="Success" />`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="sizes"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.sizes}
          </h2>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
            <CheckboxSizes />
          </div>
          <CodeBlock>{`<Checkbox size="sm" label="Small" />
<Checkbox size="default" label="Default" />
<Checkbox size="lg" label="Large" />`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="without-label"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.withoutLabel}
          </h2>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
            <CheckboxWithoutLabel />
          </div>
          <CodeBlock>{`<Checkbox size="sm" />
<Checkbox size="default" />
<Checkbox size="lg" />`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="form"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.form}
          </h2>
          <p className="text-sm text-muted-foreground">{t.formText}</p>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
            <CheckboxFormDemo />
          </div>
          <CodeBlock>{`import { Button } from "@/components/ui/button"

<form action={subscribe}>
  <Checkbox name="news" value="yes" label="Send me the newsletter" defaultChecked />
  <Checkbox name="terms" value="yes" label="I accept the terms" required />
  <Button type="submit">Submit</Button>
</form>`}</CodeBlock>
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
                  <th className="text-left p-3 font-medium">
                    {t.description2}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">variant</td>
                  <td className="p-3 font-mono text-xs">
                    &quot;default&quot; | &quot;destructive&quot; |
                    &quot;success&quot;
                  </td>
                  <td className="p-3 font-mono text-xs">&quot;default&quot;</td>
                  <td className="p-3">{t.visualStyleVariant}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">size</td>
                  <td className="p-3 font-mono text-xs">
                    &quot;sm&quot; | &quot;default&quot; | &quot;lg&quot;
                  </td>
                  <td className="p-3 font-mono text-xs">&quot;default&quot;</td>
                  <td className="p-3">{t.sizeOfTheCheckbox}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">label</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">undefined</td>
                  <td className="p-3">{t.labelTextDisplayedNextTo}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">...props</td>
                  <td className="p-3 font-mono text-xs">InputHTMLAttributes</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">{t.inputProps}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DocsPage>
  )
}
