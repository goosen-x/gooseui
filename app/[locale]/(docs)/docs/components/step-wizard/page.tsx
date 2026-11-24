import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  StepWizardAsyncDemo,
  StepWizardCustomControlsDemo,
  StepWizardDemo,
} from "./step-wizard-demo"
import { StepWizardNativeDemo } from "./step-wizard-native-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  auditFeature0Description: "Groups expandable sections",
  auditFeature1Description: "Styles elements based on their contents",
  auditFeature2Description: "Colors focus rings and step buttons",
  title: "Step Wizard",
  description:
    "One question per screen on native details, works without JavaScript",
  intro:
    "A frame for questionnaires and sign-up flows that show one question at a time. Every step is a <details> with a shared name, so the browser keeps exactly one step open. The summary of the open step is its title, and the summaries of its neighbours become the Back and Next buttons. While a step has an invalid field, :has(:invalid) swaps Next for a disabled button. Progress, the counter and the transitions are CSS. The base component is a Server Component with no JavaScript; the optional client version from step-wizard-client adds async validate, onComplete, onStepChange and the useStepWizard hook.",
  browserSupport: "Browser Support",
  supportDescription0: "Keeps one wizard step open at a time.",
  supportDescription1: "Styles the wizard based on its current step.",
  browserSupportText:
    "Switching steps relies on the name attribute of <details>: where it is missing, the previous step does not close by itself. Locking Next needs :has(). Everything else is plain HTML and CSS animations.",
  preview: "Preview",
  previewHint:
    "This wizard is a Server Component inside a form, with no JavaScript. Next stays locked until the step is valid.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  clientTitle: "Client version",
  clientText:
    "StepWizard and StepWizardStep from step-wizard-client render the same markup and add validate, onComplete and onStepChange. Switch transitions above the card and try pressing Next on the first step without picking anything.",
  customTitle: "Custom controls",
  customText:
    "Turn off the built-in buttons with showControls={false} and drive the wizard with useStepWizard(). Here a click on an option moves forward at once.",
  asyncTitle: "Async validation",
  asyncText:
    "validate may return a promise. While it runs the Next button is locked. Return a string to block the step and show it as an error.",
  transitionsTitle: "Transitions",
  transitionsText:
    "fade-rise, slide, scale-blur, wipe and stagger. The open step plays a CSS animation; the closing one disappears at once. With reduced motion every transition becomes a short fade.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
    returns: "Value",
  },
  wizardProps: {
    children: "StepWizardStep elements, one per step",
    transition: "Animation between steps",
    defaultStep: "Zero-based step shown on mount",
    onStepChange: "Client version only: called with the new step index",
    onComplete:
      "Client version only: called after the last step passes validation, may be async. A thrown error or rejected promise is shown as the step error. Without it Finish submits the surrounding form",
    showProgress: "Show the progress bar and the 01 / 04 counter",
    showControls: "Render the built-in Back, Next and Finish buttons",
    labels: "Texts of the buttons, the progress label and the fallback error",
    name: "Shared name of the step <details>. Generated when omitted",
    error: "Error under the step, for example from a server action",
    pending: "Busy state: a spinner replaces the Next arrow",
    className: "Additional CSS classes",
  },
  components: "Components",
  stepProps: {
    title:
      "Step heading. It is the summary of the step, so focus stays on it after Next",
    description: "Text under the heading",
    validate:
      "Client version only: check before moving on, false or a string blocks the step",
    headingAs: "Heading element of the title",
    className: "Additional CSS classes",
  },
  hook: "useStepWizard",
  hookText:
    "Comes from step-wizard-client. Returns the wizard state and actions and works in any component inside the client StepWizard.",
  hookFields: {
    step: "Zero-based index of the current step",
    total: "Number of steps",
    isFirst: "The current step is the first one",
    isLast: "The current step is the last one",
    progress: "Progress from 0 to 100",
    pending: "Validation or onComplete is running",
    error: "Message returned by validate",
    next: "Validate the step and move forward, or complete on the last step",
    back: "Go one step back",
    goTo: "Jump to a step without validation",
    setError: "Show or clear an error message",
  },
}

const content: Dict<typeof en> = {
  en,
  ru: {
    auditFeature0Description: "Объединяет раскрывающиеся секции",
    auditFeature1Description: "Меняет стиль по содержимому",
    auditFeature2Description: "Окрашивает фокус и кнопки шагов",
    title: "Step Wizard",
    description:
      "Один вопрос на экран на нативном details, работает без JavaScript",
    intro:
      "Каркас для анкет и регистраций, где на экране один вопрос. Каждый шаг это <details> с общим name, и браузер сам держит открытым ровно один шаг. Summary открытого шага служит его заголовком, а summary соседних шагов превращаются в кнопки «Назад» и «Далее». Пока в шаге есть неверное поле, :has(:invalid) подменяет «Далее» неактивной кнопкой. Прогресс, счётчик и переходы сделаны на CSS. Базовый компонент серверный и обходится без JavaScript, а необязательная клиентская версия из step-wizard-client добавляет асинхронный validate, onComplete, onStepChange и хук useStepWizard.",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Оставляет открытым один шаг мастера.",
    supportDescription1: "Меняет вид мастера в зависимости от текущего шага.",
    browserSupportText:
      "Смена шагов держится на атрибуте name у <details>: без его поддержки предыдущий шаг сам не закроется. Блокировке «Далее» нужен :has(). Всё остальное обычный HTML и CSS-анимации.",
    preview: "Превью",
    previewHint:
      "Это серверный компонент внутри формы, без JavaScript. «Далее» не нажимается, пока шаг не заполнен как надо.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    clientTitle: "Клиентская версия",
    clientText:
      "StepWizard и StepWizardStep из step-wizard-client рисуют ту же разметку и добавляют validate, onComplete и onStepChange. Переключайте переходы над карточкой и попробуйте нажать «Далее» на первом шаге, ничего не выбрав.",
    customTitle: "Свои кнопки",
    customText:
      "showControls={false} убирает встроенные кнопки, а useStepWizard() даёт управлять шагами самостоятельно. Здесь клик по варианту сразу ведёт дальше.",
    asyncTitle: "Асинхронная проверка",
    asyncText:
      "validate может вернуть промис. Пока он выполняется, кнопка «Далее» заблокирована. Если вернуть строку, шаг не пройдёт, а строка появится как ошибка.",
    transitionsTitle: "Переходы",
    transitionsText:
      "fade-rise, slide, scale-blur, wipe и stagger. Открытый шаг проигрывает CSS-анимацию, закрытый исчезает сразу. При reduced motion любой переход становится коротким появлением.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
      returns: "Значение",
    },
    wizardProps: {
      children: "Элементы StepWizardStep, по одному на шаг",
      transition: "Анимация смены шагов",
      defaultStep: "Номер шага при монтировании, с нуля",
      onStepChange:
        "Только клиентская версия: вызывается с номером нового шага",
      onComplete:
        "Только клиентская версия: вызывается, когда последний шаг прошёл проверку, может быть асинхронным. Если он бросит ошибку или вернёт отклонённый промис, текст ошибки появится под шагом. Без него «Готово» отправляет форму вокруг мастера",
      showProgress: "Показывать полосу прогресса и счётчик 01 / 04",
      showControls: "Показывать встроенные кнопки «Назад», «Далее» и «Готово»",
      labels: "Тексты кнопок, подписи прогресса и запасной ошибки",
      name: "Общий name у <details> шагов. Если не задан, создаётся сам",
      error: "Ошибка под шагом, например из server action",
      pending:
        "Состояние загрузки: вместо стрелки у «Далее» крутится индикатор",
      className: "Дополнительные CSS-классы",
    },
    components: "Компоненты",
    stepProps: {
      title:
        "Заголовок шага. Это summary шага, поэтому после «Далее» фокус остаётся на нём",
      description: "Текст под заголовком",
      validate:
        "Только клиентская версия: проверка перед переходом, false или строка не пускают дальше",
      headingAs: "Тег заголовка",
      className: "Дополнительные CSS-классы",
    },
    hook: "useStepWizard",
    hookText:
      "Берётся из step-wizard-client. Возвращает состояние и действия мастера и работает в любом компоненте внутри клиентского StepWizard.",
    hookFields: {
      step: "Номер текущего шага, с нуля",
      total: "Количество шагов",
      isFirst: "Текущий шаг первый",
      isLast: "Текущий шаг последний",
      progress: "Прогресс от 0 до 100",
      pending: "Идёт проверка или onComplete",
      error: "Сообщение, которое вернул validate",
      next: "Проверить шаг и перейти дальше, на последнем шаге завершить",
      back: "Вернуться на шаг назад",
      goTo: "Перейти к шагу без проверки",
      setError: "Показать или убрать сообщение об ошибке",
    },
  },
}

const wizardRows: [keyof typeof en.wizardProps, string, string][] = [
  ["children", "ReactNode", "-"],
  [
    "transition",
    '"fade-rise" | "slide" | "scale-blur" | "wipe" | "stagger"',
    '"fade-rise"',
  ],
  ["defaultStep", "number", "0"],
  ["onStepChange", "(step: number) => void", "-"],
  ["onComplete", "() => void | Promise<void>", "-"],
  ["showProgress", "boolean", "true"],
  ["showControls", "boolean", "true"],
  ["labels", "Partial<StepWizardLabels>", "-"],
  ["name", "string", "useId()"],
  ["error", "string | null", "-"],
  ["pending", "boolean", "false"],
  ["className", "string", "-"],
]

const stepRows: [keyof typeof en.stepProps, string, string][] = [
  ["title", "ReactNode", "-"],
  ["description", "ReactNode", "-"],
  ["validate", "() => boolean | string | undefined | Promise<…>", "-"],
  ["headingAs", '"h2" | "h3" | "h4"', '"h2"'],
  ["className", "string", "-"],
]

const hookRows: [keyof typeof en.hookFields, string][] = [
  ["step", "number"],
  ["total", "number"],
  ["isFirst", "boolean"],
  ["isLast", "boolean"],
  ["progress", "number"],
  ["pending", "boolean"],
  ["error", "string | null"],
  ["next", "() => Promise<void>"],
  ["back", "() => void"],
  ["goTo", "(step: number) => void"],
  ["setError", "(error: string | null) => void"],
]

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: t.title, description: t.description }
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export default async function StepWizardPage({ params }: Props) {
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
    { id: "hook", title: t.hook, level: 2 },
  ]

  const th = "p-3 text-left font-medium"

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title={t.title} />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "details-name",
              description: t.auditFeature0Description,
            },
            {
              featureId: "has",
              description: t.auditFeature1Description,
            },
            {
              featureId: "color-mix",
              description: t.auditFeature2Description,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <StepWizardNativeDemo locale={locale as Locale} />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/step-wizard" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

import { StepWizard, StepWizardStep } from "@/components/ui/step-wizard"

// Server Component, no JavaScript: Finish submits the form
export default function Survey() {
  return (
    <form action={saveSurvey}>
      <StepWizard transition="slide">
        <StepWizardStep title="How should we call you?">
          <Input name="name" required minLength={2} />
        </StepWizardStep>
        <StepWizardStep title="Anything else?" description="Optional">
          <Textarea name="note" />
        </StepWizardStep>
      </StepWizard>
    </form>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-lg font-medium">{t.clientTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.clientText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <StepWizardDemo />
              </div>
              <CodeBlock className="mt-4">{`import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

"use client"

import { StepWizard, StepWizardStep } from "@/components/ui/step-wizard-client"

export default function Survey() {
  const [name, setName] = useState("")

  return (
    <StepWizard transition="slide" onComplete={() => console.log("done")}>
      <StepWizardStep
        title="How should we call you?"
        validate={() => (name.trim() ? true : "Type your name")}
      >
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </StepWizardStep>
      <StepWizardStep title="Anything else?" description="Optional">
        <Textarea />
      </StepWizardStep>
    </StepWizard>
  )
}`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.customTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.customText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <StepWizardCustomControlsDemo />
              </div>
              <CodeBlock className="mt-4">{`import { Button } from "@/components/ui/button"

import { useStepWizard } from "@/components/ui/step-wizard-client"

function Choices({ options, onPick }) {
  const { next, back, isFirst } = useStepWizard()
  return (
    <>
      {options.map((option) => (
        <Button key={option} onClick={() => { onPick(option); next() }}>
          {option}
        </Button>
      ))}
      {!isFirst && <Button onClick={back}>Back</Button>}
    </>
  )
}

<StepWizard showControls={false}>
  <StepWizardStep title="Pick a color">
    <Choices options={["Sand", "Moss", "Slate"]} onPick={setColor} />
  </StepWizardStep>
  <StepWizardStep title="Pick a size">
    <Choices options={["S", "M", "L", "XL"]} onPick={setSize} />
  </StepWizardStep>
</StepWizard>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.asyncTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.asyncText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <StepWizardAsyncDemo />
              </div>
              <CodeBlock className="mt-4">{`<StepWizardStep
  title="Your email"
  validate={async () => {
    const res = await fetch(\`/api/email-free?email=\${email}\`)
    const { free } = await res.json()
    return free ? true : "This email is already registered"
  }}
>
  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
</StepWizardStep>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.transitionsTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.transitionsText}
              </p>
              <CodeBlock>{`<StepWizard transition="wipe">…</StepWizard>
<StepWizard transition="stagger">…</StepWizard>`}</CodeBlock>
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
                {wizardRows.map(([prop, type, def]) => (
                  <tr key={prop} className="border-t">
                    <td className="p-3 font-mono text-xs">{prop}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3 font-mono text-xs">{def}</td>
                    <td className="p-3">{t.wizardProps[prop]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="components" className={h2}>
            {t.components}
          </h2>
          <h3 className="font-mono text-lg font-medium">StepWizardStep</h3>
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
                {stepRows.map(([prop, type, def]) => (
                  <tr key={prop} className="border-t">
                    <td className="p-3 font-mono text-xs">{prop}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3 font-mono text-xs">{def}</td>
                    <td className="p-3">{t.stepProps[prop]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="hook" className={h2}>
            {t.hook}
          </h2>
          <p className="text-muted-foreground">{t.hookText}</p>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[500px] text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className={th}>{t.headers.returns}</th>
                  <th className={th}>{t.headers.type}</th>
                  <th className={th}>{t.headers.description}</th>
                </tr>
              </thead>
              <tbody>
                {hookRows.map(([field, type]) => (
                  <tr key={field} className="border-t">
                    <td className="p-3 font-mono text-xs">{field}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3">{t.hookFields[field]}</td>
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
