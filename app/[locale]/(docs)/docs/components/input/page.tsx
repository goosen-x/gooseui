import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Input } from "@/registry/gooseui/ui/input"
import { Label } from "@/registry/gooseui/ui/label"

const en = {
  description: "Displays a text input field",
  intro:
    'A single-line field built on the native <input>, so it takes every standard attribute: type, placeholder, required, autocomplete, disabled. Set aria-invalid and the border and focus ring turn red, and screen readers announce the field as invalid. With type="file" the browser\'s file button is styled to match the field. Use it in forms, search and filters; for a label that sits inside the field, see Floating Label Input.',
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  props: "Props",
  default: "Default",
  enterText: "Enter text...",
  disabled: "Disabled",
  blocked: "Blocked",
  withLabel: "With Label",
  fileInput: "File Input",
  withValidationError: "With Validation Error",
  pleaseEnterAValidEmail: "Please enter a valid email address",
  inputAcceptsAllStandard:
    "Input accepts all standard HTML attributes for <input>",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description: "Текстовое поле ввода",
    intro:
      'Однострочное поле на нативном <input>, поэтому принимает все стандартные атрибуты: type, placeholder, required, autocomplete, disabled. С aria-invalid рамка и кольцо фокуса краснеют, а экранная читалка сообщает, что поле заполнено с ошибкой. При type="file" кнопка выбора файла оформлена под само поле. Подходит для форм, поиска и фильтров; если подпись должна лежать внутри поля, возьмите Floating Label Input.',
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    props: "Пропсы",
    default: "По умолчанию",
    enterText: "Введите текст...",
    disabled: "Отключённое",
    blocked: "Заблокировано",
    withLabel: "С подписью",
    fileInput: "Выбор файла",
    withValidationError: "С ошибкой валидации",
    pleaseEnterAValidEmail: "Введите корректный email",
    inputAcceptsAllStandard:
      "Input принимает все стандартные HTML-атрибуты для <input>",
  },
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return {
    title: "Input",
    description: t.description,
  }
}

export default async function InputPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
  const toc = [
    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "examples", title: t.examples, level: 2 },
    { id: "props", title: t.props, level: 2 },
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Input" />
        <p className="text-lg text-muted-foreground">{t.description}</p>
        <p className="text-muted-foreground">{t.intro}</p>

        <div className="space-y-4">
          <h2
            id="preview"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.preview}
          </h2>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <Input placeholder="Email" type="email" className="max-w-sm" />
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/input" />
        </div>

        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.usage}
          </h2>
          <CodeBlock>{`import { Input } from "@/components/ui/input"

export function MyInput() {
  return <Input type="email" placeholder="Email" />
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="examples"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.examples}
          </h2>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            {t.default}
          </h3>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
            <Input className="max-w-sm" placeholder={t.enterText} />
          </div>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            {t.disabled}
          </h3>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
            <Input className="max-w-sm" disabled placeholder={t.blocked} />
          </div>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            {t.withLabel}
          </h3>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
            <div className="grid w-full max-w-sm gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="email@example.com" />
            </div>
          </div>
          <CodeBlock>{`<div className="grid gap-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="email@example.com" />
</div>`}</CodeBlock>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            {t.fileInput}
          </h3>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
            <Input className="max-w-sm" type="file" />
          </div>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            {t.withValidationError}
          </h3>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
            <div className="grid w-full max-w-sm gap-2">
              <Label htmlFor="email-error">Email</Label>
              <Input
                id="email-error"
                type="email"
                placeholder="email@example.com"
                defaultValue="invalid-email"
                aria-invalid="true"
              />
              <p className="text-sm text-destructive">
                {t.pleaseEnterAValidEmail}
              </p>
            </div>
          </div>
          <CodeBlock>{`<div className="grid gap-2">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    placeholder="email@example.com"
    aria-invalid="true"
  />
  <p className="text-sm text-destructive">
    Please enter a valid email address
  </p>
</div>`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="props"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.props}
          </h2>
          <p className="text-muted-foreground">{t.inputAcceptsAllStandard}</p>
        </div>
      </div>
    </DocsPage>
  )
}
