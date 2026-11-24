import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import { OtpExample, OtpInputDemo } from "./otp-input-demo"

const translations = {
  en: {
    intro:
      'An accessible one-time code input uses a single visually hidden field to power its visible slots. Users can type or paste the entire code, and autocomplete="one-time-code" enables SMS code suggestions on supported devices. Compose slots into groups and add a separator wherever needed.',
    support: "Browser Support",
    has: "Styles the group and input container based on their contents.",
    preview: "Preview",
    statusNote:
      'Set status="pending" while the code is checked, then "success" or "error" to confirm (green) or shake (red) the group. Override the green with the --gooseui-otp-success CSS variable.',
    hint: "Enter 123456 to see success or any other code to see the error state.",
    installation: "Installation",
    usage: "Usage",
    examples: "Examples",
    props: "Props",
    titles: [
      "Six slots",
      "Groups with separator",
      "Digits only",
      "Error",
      "Disabled",
    ],
    headers: ["Prop", "Type", "Default", "Description"],
    descriptions: [
      "Number of characters.",
      "Controlled code and change handler.",
      "Called when all slots are filled.",
      "Regular expression used to filter input.",
      "Enables SMS code suggestions.",
      "Disables input.",
      "Check state: pending locks input, success confirms, error shakes the group.",
      "Marks the input or slot as invalid.",
      "Index of a slot, starting at zero.",
      "Additional CSS classes.",
    ],
  },
  ru: {
    intro:
      'Доступное поле одноразового кода использует одно визуально скрытое поле для всех видимых ячеек. Код можно ввести или вставить целиком, а autocomplete="one-time-code" включает подсказку с кодом из SMS на поддерживаемых устройствах. Ячейки можно объединять в группы и добавлять между ними разделитель.',
    support: "Поддержка браузеров",
    has: "Стилизует группу и контейнер в зависимости от их содержимого.",
    preview: "Превью",
    statusNote:
      'Ставьте status="pending" на время проверки кода, затем "success" или "error": группа позеленеет или встряхнётся красным. Зелёный переопределяется CSS-переменной --gooseui-otp-success.',
    hint: "Введите 123456 для успеха или другой код, чтобы увидеть ошибку.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    props: "Пропсы",
    titles: [
      "Шесть ячеек",
      "Группы с разделителем",
      "Только цифры",
      "Ошибка",
      "Отключённое поле",
    ],
    headers: ["Проп", "Тип", "По умолчанию", "Описание"],
    descriptions: [
      "Количество символов.",
      "Управляемое значение и обработчик изменения.",
      "Вызывается, когда все ячейки заполнены.",
      "Регулярное выражение для фильтрации ввода.",
      "Включает подсказки кода из SMS.",
      "Отключает ввод.",
      "Состояние проверки: pending блокирует ввод, success подтверждает, error трясёт группу.",
      "Отмечает поле или ячейку как ошибочную.",
      "Индекс ячейки, начиная с нуля.",
      "Дополнительные CSS-классы.",
    ],
  },
}

const examples = [
  {
    variant: "basic",
    code: `<InputOTP maxLength={6} aria-label="One-time code">\n  <InputOTPGroup>\n    {Array.from({ length: 6 }, (_, i) => <InputOTPSlot key={i} index={i} />)}\n  </InputOTPGroup>\n</InputOTP>`,
  },
  {
    variant: "grouped",
    code: `<InputOTP maxLength={6} aria-label="One-time code">\n  <InputOTPGroup>\n    {[0, 1, 2].map(i => <InputOTPSlot key={i} index={i} />)}\n  </InputOTPGroup>\n  <InputOTPSeparator />\n  <InputOTPGroup>\n    {[3, 4, 5].map(i => <InputOTPSlot key={i} index={i} />)}\n  </InputOTPGroup>\n</InputOTP>`,
  },
  {
    variant: "digits",
    code: `<InputOTP maxLength={6} pattern="^[0-9]+$" aria-label="One-time code">\n  <InputOTPGroup>{/* six slots */}</InputOTPGroup>\n</InputOTP>`,
  },
  {
    variant: "error",
    code: `<InputOTP maxLength={6} aria-invalid aria-label="One-time code">\n  <InputOTPGroup>\n    {[0, 1, 2, 3, 4, 5].map(i => <InputOTPSlot key={i} index={i} aria-invalid />)}\n  </InputOTPGroup>\n</InputOTP>`,
  },
  {
    variant: "disabled",
    code: `<InputOTP maxLength={6} disabled aria-label="One-time code">\n  <InputOTPGroup>{/* six slots */}</InputOTPGroup>\n</InputOTP>`,
  },
] as const

export default async function OtpInputPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = locale === "ru" ? translations.ru : translations.en
  const toc = ["preview", "installation", "usage", "examples", "props"].map(
    (id, i) => ({
      id,
      title: [t.preview, t.installation, t.usage, t.examples, t.props][i],
      level: 2,
    }),
  )
  const rows = [
    ["InputOTP: maxLength", "number", "—"],
    ["InputOTP: value / onChange", "string / (value: string) => void", "—"],
    ["InputOTP: onComplete", "(value: string) => void", "—"],
    ["InputOTP: pattern", "string", "—"],
    ["InputOTP: autoComplete", "string", '"one-time-code"'],
    ["InputOTP: disabled", "boolean", "false"],
    ["InputOTP: status", '"idle" | "pending" | "success" | "error"', '"idle"'],
    ["aria-invalid", "boolean", "—"],
    ["InputOTPSlot: index", "number", "—"],
    ["className / containerClassName", "string", "—"],
  ]
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="OTP Input" />
        <p className="text-muted-foreground">{t.intro}</p>
        <BrowserSupport
          title={t.support}
          features={[
            {
              featureId: "has",
              description: t.has,
            },
          ]}
        />
        <section className="space-y-4">
          <h2
            id="preview"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.hint}</p>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <OtpInputDemo />
          </div>
        </section>
        <section className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/otp-input" />
        </section>
        <section className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.usage}
          </h2>
          <CodeBlock>{`import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/otp-input"\n\n${examples[0].code}`}</CodeBlock>
        </section>
        <section className="space-y-4">
          <h2
            id="examples"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.examples}
          </h2>
          <p className="text-sm text-muted-foreground">{t.statusNote}</p>
          <div className="space-y-8">
            {examples.map((example, i) => (
              <div key={example.variant}>
                <h3 className="mb-3 text-lg font-medium">{t.titles[i]}</h3>
                <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                  <OtpExample variant={example.variant} />
                </div>
                <CodeBlock className="mt-4">{example.code}</CodeBlock>
              </div>
            ))}
          </div>
        </section>
        <section className="space-y-4">
          <h2
            id="props"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.props}
          </h2>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[31.25rem] text-sm">
              <thead className="bg-muted">
                <tr>
                  {t.headers.map((header) => (
                    <th key={header} className="p-3 text-left font-medium">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row[0]} className="border-t">
                    {row.map((cell) => (
                      <td key={cell} className="p-3 font-mono text-xs">
                        {cell}
                      </td>
                    ))}
                    <td className="p-3">{t.descriptions[i]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DocsPage>
  )
}
