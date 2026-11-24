import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  FloatingLabelInputDemo,
  FloatingLabelSlotsDemo,
  FloatingLabelValidationDemo,
  FloatingLabelVariantsDemo,
} from "./floating-label-input-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  auditFeature0Description: "Tracks whether the field is empty",
  auditFeature1Description: "Styles elements based on their contents",
  auditFeature2Description: "Highlights the focused field frame",
  description: "Input and textarea with a label that floats up on focus",
  intro:
    "An input and a textarea whose label rests inside the field and moves up into the frame on focus or once there is a value. The state comes from CSS alone (:placeholder-shown and peer), so it also works with browser autofill and without client JavaScript.",
  browserSupport: "Browser Support",
  browserSupportPlaceholderName: ":placeholder-shown",
  browserSupportPlaceholderDescription:
    "Keeps the label inside the field while it is empty.",
  browserSupportHasName: ":has()",
  browserSupportHasDescription:
    "Dims the whole field when the input is disabled.",
  preview: "Preview",
  previewHint:
    "Focus a field or start typing. The email field shows its error after you leave it.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  variantsTitle: "Two variants",
  variantsText:
    "outline puts the floated label on the border, inset keeps it at the top inside the frame.",
  slotsTitle: "Prefix and suffix",
  slotsText:
    "Slots take icons, currency signs, units or a button. A password visibility toggle is a regular button in the suffix.",
  validationTitle: "Hint and error",
  validationText:
    "hint and error render under the field and are linked to it through aria-describedby. An error replaces the hint and sets aria-invalid. Clear the field to see the hint again.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  propLabel: "Label text. Also the accessible name of the field",
  propHint: "Helper text under the field",
  propError: "Error text. Marks the field invalid and replaces the hint",
  propPrefix: "Content before the value",
  propSuffix: "Content after the value",
  propVariant: "Where the floated label goes",
  propPlaceholder:
    "Shown only on focus. A single space keeps :placeholder-shown working when there is none",
  propClassName: "Classes for the outer wrapper",
  propFrameClassName: "Classes for the bordered frame",
  propRest: "Any input or textarea attribute, including ref",
  components: "Components",
  componentInput: "Single-line field",
  componentTextarea: "Multiline field with the same props, rows defaults to 4",
  componentHeader: "Component",
  features: "Features",
  featureList: [
    [
      "CSS only",
      "no focus or value state in JavaScript; works in Server Components",
    ],
    [
      "Autofill",
      "the :autofill selector floats the label when the browser fills the field",
    ],
    [
      "Accessibility",
      "a real label element, aria-describedby for hint and error, aria-invalid on error",
    ],
    ["Reduced motion", "the label moves without a transition"],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    auditFeature0Description: "Определяет, пусто ли поле",
    auditFeature1Description: "Меняет стиль по содержимому",
    auditFeature2Description: "Подсвечивает рамку поля при фокусе",
    description: "Поле и textarea с подписью, которая поднимается при фокусе",
    intro:
      "Поле и textarea, у которых подпись лежит внутри и поднимается в рамку при фокусе или когда есть значение. Состояние задаёт только CSS (:placeholder-shown и peer), поэтому всё работает и с автозаполнением браузера, и без клиентского JavaScript.",
    browserSupport: "Поддержка браузеров",
    browserSupportPlaceholderName: ":placeholder-shown",
    browserSupportPlaceholderDescription:
      "Держит подпись внутри поля, пока оно пустое.",
    browserSupportHasName: ":has()",
    browserSupportHasDescription: "Приглушает всё поле, когда ввод отключён.",
    preview: "Превью",
    previewHint:
      "Поставьте курсор в поле или начните печатать. Ошибка в почте появится, когда вы уйдёте из поля.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    variantsTitle: "Два варианта",
    variantsText:
      "outline кладёт поднятую подпись на рамку, inset оставляет её сверху внутри поля.",
    slotsTitle: "Prefix и suffix",
    slotsText:
      "В слоты можно положить иконку, знак валюты, единицы измерения или кнопку. Кнопка показа пароля здесь обычная кнопка в suffix.",
    validationTitle: "Подсказка и ошибка",
    validationText:
      "hint и error выводятся под полем и связаны с ним через aria-describedby. Ошибка заменяет подсказку и ставит aria-invalid. Сотрите текст, чтобы снова увидеть подсказку.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    propLabel: "Текст подписи. Он же доступное имя поля",
    propHint: "Подсказка под полем",
    propError: "Текст ошибки. Помечает поле невалидным и заменяет подсказку",
    propPrefix: "Содержимое перед значением",
    propSuffix: "Содержимое после значения",
    propVariant: "Куда поднимается подпись",
    propPlaceholder:
      "Виден только при фокусе. Если его нет, пробел по умолчанию нужен для :placeholder-shown",
    propClassName: "Классы внешней обёртки",
    propFrameClassName: "Классы рамки",
    propRest: "Любые атрибуты input или textarea, включая ref",
    components: "Компоненты",
    componentInput: "Однострочное поле",
    componentTextarea:
      "Многострочное поле с теми же пропсами, по умолчанию rows равен 4",
    componentHeader: "Компонент",
    features: "Возможности",
    featureList: [
      [
        "Только CSS",
        "фокус и наличие значения не хранятся в JavaScript, компонент работает в Server Components",
      ],
      [
        "Автозаполнение",
        "селектор :autofill поднимает подпись, когда браузер сам заполнил поле",
      ],
      [
        "Доступность",
        "настоящий label, aria-describedby для подсказки и ошибки, aria-invalid при ошибке",
      ],
      [
        "Меньше движения",
        "при prefers-reduced-motion подпись переезжает без анимации",
      ],
    ],
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Floating Label Input", description: t.description }
}

export default async function FloatingLabelInputPage({ params }: Props) {
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
    { id: "components", title: t.components, level: 2 },
    { id: "features", title: t.features, level: 2 },
  ]

  const rows: [string, string, string, string][] = [
    ["label", "ReactNode", "-", t.propLabel],
    ["hint", "ReactNode", "-", t.propHint],
    ["error", "ReactNode", "-", t.propError],
    ["prefix", "ReactNode", "-", t.propPrefix],
    ["suffix", "ReactNode", "-", t.propSuffix],
    ["variant", '"outline" | "inset"', '"outline"', t.propVariant],
    ["placeholder", "string", '" "', t.propPlaceholder],
    ["className", "string", "-", t.propClassName],
    ["frameClassName", "string", "-", t.propFrameClassName],
    ["...props", 'ComponentProps<"input" | "textarea">', "-", t.propRest],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Floating Label Input" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "placeholder-shown",
              description: t.auditFeature0Description,
            },
            {
              featureId: "has",
              description: t.auditFeature1Description,
            },
            {
              featureId: "focus-within",
              description: t.auditFeature2Description,
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
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center rounded-lg bg-muted/30 py-12">
            <FloatingLabelInputDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/floating-label-input" />
        </div>

        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.usage}
          </h2>
          <CodeBlock>{`import {
  FloatingLabelInput,
  FloatingLabelTextarea,
} from "@/components/ui/floating-label-input"

export default function Example() {
  return (
    <form className="grid gap-4">
      <FloatingLabelInput label="Email" type="email" name="email" />
      <FloatingLabelTextarea label="Message" name="message" />
    </form>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="examples"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.examples}
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-lg font-medium">{t.variantsTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.variantsText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 py-8">
                <FloatingLabelVariantsDemo />
              </div>
              <CodeBlock className="mt-4">{`<FloatingLabelInput label="City" />
<FloatingLabelInput label="City" variant="inset" />`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.slotsTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.slotsText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 py-8">
                <FloatingLabelSlotsDemo />
              </div>
              <CodeBlock className="mt-4">{`import { Button } from "@/components/ui/button"

<FloatingLabelInput label="Search the docs" prefix={<Search />} />
<FloatingLabelInput label="Budget" prefix="$" suffix="USD" inputMode="decimal" />
<FloatingLabelInput
  label="Password"
  type={visible ? "text" : "password"}
  suffix={
    <Button type="button" onClick={() => setVisible(!visible)} aria-label="Show password">
      {visible ? <EyeOff /> : <Eye />}
    </Button>
  }
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.validationTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.validationText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 py-8">
                <FloatingLabelValidationDemo />
              </div>
              <CodeBlock className="mt-4">{`<FloatingLabelInput
  variant="inset"
  label="Username"
  prefix={<AtSign />}
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  hint="Letters, digits and dots"
  error={taken ? "This username is taken" : undefined}
/>`}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="props"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.props}
          </h2>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[500px] text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left font-medium">
                    {t.headers.prop}
                  </th>
                  <th className="p-3 text-left font-medium">
                    {t.headers.type}
                  </th>
                  <th className="p-3 text-left font-medium">
                    {t.headers.default}
                  </th>
                  <th className="p-3 text-left font-medium">
                    {t.headers.description}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([prop, type, def, description]) => (
                  <tr key={prop} className="border-t">
                    <td className="p-3 font-mono text-xs">{prop}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3 font-mono text-xs">{def}</td>
                    <td className="p-3">{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="components"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.components}
          </h2>
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left font-medium">
                    {t.componentHeader}
                  </th>
                  <th className="p-3 text-left font-medium">
                    {t.headers.description}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">FloatingLabelInput</td>
                  <td className="p-3">{t.componentInput}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">
                    FloatingLabelTextarea
                  </td>
                  <td className="p-3">{t.componentTextarea}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="features"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.features}
          </h2>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            {t.featureList.map(([name, text]) => (
              <li key={name}>
                <strong className="text-foreground">{name}</strong>: {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DocsPage>
  )
}
