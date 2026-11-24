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
import { Button } from "@/registry/gooseui/ui/button"
import { Label } from "@/registry/gooseui/ui/label"
import { Radio } from "@/registry/gooseui/ui/radio"

const en = {
  description:
    "Radio is a native input for choosing one option from a group. It works in forms without JavaScript and submits the selected value. Give radios the same name to make a group. Use the arrow keys to move between options.",
  browser: "Browser Support",
  support:
    "Customizes the native radio appearance while retaining its browser behavior.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  props: "Props",
  group: "Choose a plan",
  basic: "Basic",
  pro: "Pro",
  disabled: "Disabled",
  unavailable: "Unavailable",
  details: "With a description",
  delivery: "Standard delivery",
  deliveryText: "Arrives in three to five days.",
  error: "Invalid state",
  required: "Choose an option to continue.",
  form: "In a form",
  submit: "Submit",
  name: "Shared name for the group and form field.",
  value: "Value submitted when selected.",
  checked: "Controlled or initial selection.",
  disabledProp: "Disables the input.",
  requiredProp: "Requires a selection in the group.",
  invalid: "Marks the input as invalid.",
  other:
    "Other native input attributes, including onChange and aria attributes.",
}
const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Radio — нативная радиокнопка для выбора одного варианта из группы. Она работает в форме без JavaScript и отправляет выбранное значение. Чтобы объединить кнопки в группу, задайте им одинаковый name. Переключаться между вариантами можно клавишами со стрелками.",
    browser: "Поддержка браузеров",
    support:
      "Меняет внешний вид нативной радиокнопки, сохраняя её поведение в браузере.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    props: "Пропсы",
    group: "Выберите тариф",
    basic: "Базовый",
    pro: "Про",
    disabled: "Недоступный вариант",
    unavailable: "Недоступно",
    details: "С описанием",
    delivery: "Стандартная доставка",
    deliveryText: "Доставка за три–пять дней.",
    error: "Состояние ошибки",
    required: "Выберите вариант, чтобы продолжить.",
    form: "В форме",
    submit: "Отправить",
    name: "Общее имя группы и поля формы.",
    value: "Значение, отправляемое при выборе.",
    checked: "Управляемое или начальное состояние.",
    disabledProp: "Отключает поле.",
    requiredProp: "Требует выбрать вариант в группе.",
    invalid: "Отмечает поле как ошибочное.",
    other: "Другие атрибуты input, включая onChange и aria.",
  },
}
type Props = { params: Promise<{ locale: string }> }
export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  return { title: "Radio", description: content[locale as Locale].description }
}
export default async function RadioPage({ params }: Props) {
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
  const groupCode = `<fieldset>
  <legend>Choose a plan</legend>
  <div><Radio id="basic" name="plan" value="basic" defaultChecked /><Label htmlFor="basic">Basic</Label></div>
  <div><Radio id="pro" name="plan" value="pro" /><Label htmlFor="pro">Pro</Label></div>
</fieldset>`
  const examples = [
    {
      title: t.disabled,
      demo: (
        <div className="flex items-center gap-2">
          <Radio id="disabled-radio" disabled />
          <Label
            htmlFor="disabled-radio"
            className="cursor-not-allowed opacity-50"
          >
            {t.unavailable}
          </Label>
        </div>
      ),
      code: `<Radio id="disabled" disabled />\n<Label htmlFor="disabled">Unavailable</Label>`,
    },
    {
      title: t.details,
      demo: (
        <div className="flex items-start gap-2">
          <Radio
            id="delivery-radio"
            name="delivery-example"
            defaultChecked
            aria-describedby="delivery-description"
          />
          <div className="grid gap-1">
            <Label htmlFor="delivery-radio" className="cursor-pointer">
              {t.delivery}
            </Label>
            <p
              id="delivery-description"
              className="text-sm text-muted-foreground"
            >
              {t.deliveryText}
            </p>
          </div>
        </div>
      ),
      code: `<Radio id="delivery" name="delivery" aria-describedby="delivery-description" defaultChecked />\n<Label htmlFor="delivery">Standard delivery</Label>\n<p id="delivery-description">Arrives in three to five days.</p>`,
    },
    {
      title: t.error,
      demo: (
        <div className="grid gap-1">
          <div className="flex items-center gap-2">
            <Radio
              id="invalid-radio"
              aria-invalid="true"
              aria-describedby="radio-error"
            />
            <Label htmlFor="invalid-radio" className="cursor-pointer">
              {t.basic}
            </Label>
          </div>
          <p id="radio-error" className="text-sm text-destructive">
            {t.required}
          </p>
        </div>
      ),
      code: `<Radio id="choice" aria-invalid="true" aria-describedby="error" />\n<Label htmlFor="choice">Choose an option</Label>\n<p id="error">Choose an option to continue.</p>`,
    },
  ]
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Radio" />
        <p className="text-lg text-muted-foreground">{t.description}</p>
        <BrowserSupport
          title={t.browser}
          features={[
            {
              featureId: "appearance",
              description: t.support,
            },
          ]}
        />
        <DocsSection id="preview" title={t.preview}>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <fieldset className="grid gap-3">
              <legend className="mb-3 text-sm font-medium">{t.group}</legend>
              <div className="flex items-center gap-2">
                <Radio
                  id="preview-basic"
                  name="preview-plan"
                  value="basic"
                  defaultChecked
                />
                <Label htmlFor="preview-basic" className="cursor-pointer">
                  {t.basic}
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio id="preview-pro" name="preview-plan" value="pro" />
                <Label htmlFor="preview-pro" className="cursor-pointer">
                  {t.pro}
                </Label>
              </div>
            </fieldset>
          </div>
        </DocsSection>
        <DocsSection id="installation" title={t.installation}>
          <InstallCommand packageName="@gooseui/radio" />
        </DocsSection>
        <DocsSection id="usage" title={t.usage}>
          <CodeBlock>{`import { Radio } from "@/components/ui/radio"\nimport { Label } from "@/components/ui/label"\n\n${groupCode}`}</CodeBlock>
        </DocsSection>
        <DocsSection id="examples" title={t.examples}>
          <div className="space-y-8">
            {examples.map((example) => (
              <div key={example.title} className="space-y-3">
                <h3 className="text-lg font-medium">{example.title}</h3>
                <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                  {example.demo}
                </div>
                <CodeBlock>{example.code}</CodeBlock>
              </div>
            ))}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.form}</h3>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <form className="grid gap-4">
                  <fieldset className="grid gap-3">
                    <legend className="mb-3 text-sm font-medium">
                      {t.group}
                    </legend>
                    <div className="flex items-center gap-2">
                      <Radio
                        id="form-basic"
                        name="plan"
                        value="basic"
                        required
                        defaultChecked
                      />
                      <Label htmlFor="form-basic" className="cursor-pointer">
                        {t.basic}
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Radio id="form-pro" name="plan" value="pro" />
                      <Label htmlFor="form-pro" className="cursor-pointer">
                        {t.pro}
                      </Label>
                    </div>
                  </fieldset>
                  <Button type="submit">{t.submit}</Button>
                </form>
              </div>
              <CodeBlock>{`<form>\n  ${groupCode}\n  <Button type="submit">Submit</Button>\n</form>`}</CodeBlock>
            </div>
          </div>
        </DocsSection>
        <DocsPropsTable
          props={[
            { name: "name", type: "string", description: t.name },
            { name: "value", type: "string", description: t.value },
            {
              name: "checked / defaultChecked",
              type: "boolean",
              description: t.checked,
            },
            { name: "disabled", type: "boolean", description: t.disabledProp },
            { name: "required", type: "boolean", description: t.requiredProp },
            {
              name: "aria-invalid",
              type: "boolean | string",
              description: t.invalid,
            },
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
