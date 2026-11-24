import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  OptionPickerDemo,
  OptionPickerFormDemo,
  OptionPickerIconsDemo,
  OptionPickerScaleDemo,
} from "./option-picker-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  auditFeature0Description: "Styles elements based on their contents",
  auditFeature1Description: "Colors indicators and selection bar",
  title: "Option Picker",
  description:
    "Pick one value from a list: segments, rows, tiles, a stepped slider or bars",
  intro:
    "A single choice from a short list, drawn in one of five ways. Every variant is a group of native radio inputs: one tab stop, the arrow keys move the selection, and the value goes into FormData on its own. The selected look and the moving highlight of the segment variant are CSS through :has(:checked), so the component is a Server Component with no JavaScript.",
  browserSupport: "Browser Support",
  supportDescription0: "Highlights the selected option.",
  browserSupportText:
    "All selected states, the floating highlight and the slider fill rely on :has(), which is Baseline widely available. Without it the radio inputs still work, only the highlight stays put.",
  preview: "Preview",
  previewHint: "Switch the variant, the value stays the same.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  iconsTitle: "Icons and descriptions",
  iconsText:
    "Each option takes an icon and a short description. tiles shows them stacked, rows puts the description on the right.",
  scaleTitle: "Scales",
  scaleText:
    "slider and bars suit ordered values where further means more. The slider stops are radio inputs too: click a stop or its caption, or use the arrow keys. Before the first pick it shows emptyLabel.",
  formTitle: "Native forms",
  formText:
    "name is the name of the radio group, so the value goes into FormData without any script. The form below works with JavaScript turned off.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  propDescriptions: {
    options: "List of options",
    value: "Selected value in controlled mode",
    defaultValue: "Initial value in uncontrolled mode",
    onValueChange: "Called with the new value. Only inside client components",
    variant: "How the choice is drawn",
    name: "Name of the radio group for forms",
    disabled: "Disable the whole group",
    required: "The form is not sent until something is picked",
    emptyLabel: "Text of the slider before anything is picked",
    className: "Additional CSS classes",
  },
  optionFields: {
    value: "Unique value",
    label: "Visible text, also used as the accessible name",
    description: "Secondary text",
    icon: "Icon before the label",
    disabled: "Option cannot be picked",
  },
}

const content: Dict<typeof en> = {
  en,
  ru: {
    auditFeature0Description: "Меняет стиль по содержимому",
    auditFeature1Description: "Окрашивает индикаторы и полосу выбора",
    title: "Option Picker",
    description:
      "Выбор одного значения: сегменты, строки, плитки, ползунок или столбики",
    intro:
      "Один вариант из короткого списка в одном из пяти видов. Каждый вид собран из нативных радиокнопок: один таб-стоп, стрелки двигают выбор, значение само попадает в FormData. Вид выбранного пункта и плавающая подсветка в сегментах сделаны на CSS через :has(:checked), поэтому компонент серверный и обходится без JavaScript.",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Выделяет выбранный вариант.",
    browserSupportText:
      "Выбранные состояния, плавающая подсветка и заливка ползунка держатся на :has(), он в Baseline widely available. Без него радиокнопки всё равно работают, просто подсветка не двигается.",
    preview: "Превью",
    previewHint: "Переключайте вид, значение при этом сохраняется.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    iconsTitle: "Иконки и описания",
    iconsText:
      "У каждого варианта может быть иконка и короткое описание. В tiles они стоят друг под другом, в rows описание уходит вправо.",
    scaleTitle: "Шкалы",
    scaleText:
      "slider и bars подходят для упорядоченных значений, где дальше значит больше. Отметки ползунка тоже радиокнопки: кликните по отметке или подписи либо нажимайте стрелки. До первого выбора он показывает emptyLabel.",
    formTitle: "Обычные формы",
    formText:
      "name задаёт имя группы радиокнопок, и значение попадает в FormData без всяких скриптов. Форма ниже работает и с выключенным JavaScript.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    propDescriptions: {
      options: "Список вариантов",
      value: "Выбранное значение в управляемом режиме",
      defaultValue: "Начальное значение в неуправляемом режиме",
      onValueChange:
        "Вызывается с новым значением. Работает только в клиентских компонентах",
      variant: "Как нарисован выбор",
      name: "Имя группы радиокнопок для форм",
      disabled: "Отключить всю группу",
      required: "Форма не отправится, пока ничего не выбрано",
      emptyLabel: "Текст ползунка, пока ничего не выбрано",
      className: "Дополнительные CSS-классы",
    },
    optionFields: {
      value: "Уникальное значение",
      label: "Видимый текст, он же доступное имя",
      description: "Второстепенный текст",
      icon: "Иконка перед подписью",
      disabled: "Вариант нельзя выбрать",
    },
  },
}

const propRows: [keyof typeof en.propDescriptions, string, string][] = [
  ["options", "OptionPickerOption[]", "-"],
  ["value", "string", "-"],
  ["defaultValue", "string", "-"],
  ["onValueChange", "(value: string) => void", "-"],
  ["variant", '"segment" | "rows" | "tiles" | "slider" | "bars"', '"segment"'],
  ["name", "string", "-"],
  ["disabled", "boolean", "false"],
  ["required", "boolean", "-"],
  ["emptyLabel", "string", '"Not selected"'],
  ["className", "string", "-"],
]

const optionRows: [keyof typeof en.optionFields, string, string][] = [
  ["value", "string", "-"],
  ["label", "string", "-"],
  ["description", "string", "-"],
  ["icon", "ReactNode", "-"],
  ["disabled", "boolean", "false"],
]

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: t.title, description: t.description }
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
const th = "p-3 text-left font-medium"

export default async function OptionPickerPage({ params }: Props) {
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

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title={t.title} />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "has",
              description: t.auditFeature0Description,
            },
            {
              featureId: "color-mix",
              description: t.auditFeature1Description,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <OptionPickerDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/option-picker" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { OptionPicker } from "@/components/ui/option-picker"

const plans = [
  { value: "starter", label: "Starter", description: "1 seat" },
  { value: "team", label: "Team", description: "Up to 10 seats" },
  { value: "studio", label: "Studio", description: "Unlimited" },
]

// A Server Component: the value lives in the radio inputs
export default function Example() {
  return (
    <form action="/checkout">
      <OptionPicker
        aria-label="Plan"
        name="plan"
        variant="segment"
        options={plans}
        defaultValue="team"
      />
    </form>
  )
}

// Inside a client component you can control it
<OptionPicker options={plans} value={plan} onValueChange={setPlan} />`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-lg font-medium">{t.iconsTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.iconsText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <OptionPickerIconsDemo />
              </div>
              <CodeBlock className="mt-4">{`const options = [
  { value: "walk", label: "On foot", description: "Under 2 km", icon: <Footprints /> },
  { value: "bike", label: "By bike", description: "2–10 km", icon: <Bike /> },
  { value: "train", label: "By train", description: "Any distance", icon: <TrainFront /> },
  { value: "car", label: "By car", description: "Any distance", icon: <Car /> },
]

<OptionPicker variant="tiles" options={options} defaultValue="bike" />
<OptionPicker variant="rows" options={options} defaultValue="train" />`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.scaleTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.scaleText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <OptionPickerScaleDemo />
              </div>
              <CodeBlock className="mt-4">{`<OptionPicker variant="slider" options={levels} emptyLabel="Not selected" />
<OptionPicker variant="bars" options={levels} defaultValue="3" />`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.formTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{t.formText}</p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <OptionPickerFormDemo />
              </div>
              <CodeBlock className="mt-4">{`import { Button } from "@/components/ui/button"

<form action={savePlan}>
  <OptionPicker name="plan" options={plans} defaultValue="starter" />
  <Button type="submit">Submit</Button>
</form>`}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="props" className={h2}>
            {t.props}
          </h2>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[500px] text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className={th}>{t.headers.prop}</th>
                  <th className={th}>{t.headers.type}</th>
                  <th className={th}>{t.headers.default}</th>
                  <th className={th}>{t.headers.description}</th>
                </tr>
              </thead>
              <tbody>
                {propRows.map(([prop, type, def]) => (
                  <tr key={prop} className="border-t">
                    <td className="p-3 font-mono text-xs">{prop}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3 font-mono text-xs">{def}</td>
                    <td className="p-3">{t.propDescriptions[prop]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="pt-2 font-mono text-lg font-medium">
            OptionPickerOption
          </h3>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[500px] text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className={th}>{t.headers.prop}</th>
                  <th className={th}>{t.headers.type}</th>
                  <th className={th}>{t.headers.default}</th>
                  <th className={th}>{t.headers.description}</th>
                </tr>
              </thead>
              <tbody>
                {optionRows.map(([prop, type, def]) => (
                  <tr key={prop} className="border-t">
                    <td className="p-3 font-mono text-xs">{prop}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3 font-mono text-xs">{def}</td>
                    <td className="p-3">{t.optionFields[prop]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DocsPage>
  )
}
