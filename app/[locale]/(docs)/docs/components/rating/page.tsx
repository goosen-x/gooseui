import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  RatingFormDemo,
  RatingPreviewDemo,
  RatingReadOnlyDemo,
  RatingShapesDemo,
} from "./rating-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  auditFeature0Description: "Styles elements based on their contents",
  auditFeature1Description: "Styles validation after interaction",
  auditFeature2Description: "Colors unselected stars",
  description: "Star rating on native radio inputs, no JavaScript",
  intro:
    "Rating works in two modes. Interactive mode is a group of native radio inputs: hover previews a score, a click or the arrow keys pick it, and the stars light up one after another with a ring around the chosen one. The fill, the preview and the flash are CSS through :has() and sibling selectors, so the component is a Server Component and ships no JavaScript. Read-only mode shows fractional values like 4.7 and gives screen readers a plain text summary.",
  browserSupport: "Browser Support",
  supportDescription0: "Highlights the selected rating.",
  supportDescription1: "Flashes the selected rating after interaction.",
  browserSupportText:
    "The fill and the hover preview rely on :has(). The flash starts on :user-valid, so a score set through defaultValue does not flash on page load. Both are Baseline widely available.",
  preview: "Preview",
  previewText:
    "Hover, click or tab into the stars and use the arrow keys. Works with JavaScript turned off.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  readOnlyTitle: "Read-only with fractions",
  readOnlyText:
    "With readOnly the top layer of each star is cropped to its share of the value, so 4.7 shows four full stars and most of the fifth.",
  shapesTitle: "Shapes, sizes and scale",
  shapesText:
    "shape switches between a five-pointed star and an eight-pointed sparkle. max changes the scale, and the color follows the text color, so a text-* class recolors it.",
  formTitle: "In a form",
  formText:
    'name becomes the name of the radio group, so the score is sent with the form, even before hydration. allowClear adds a hidden "no rating" radio and lays its label over the selected star, so a second click clears the score without JavaScript.',
  props: "Props",
  propsHeaders: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  pValue: "Selected score in controlled mode, null when empty",
  pDefaultValue: "Initial score in uncontrolled mode",
  pOnValueChange:
    "Called with the new score or null after clearing. Only inside client components",
  pMax: "Number of stars",
  pSize: "Star size",
  pShape: "star is five-pointed, sparkle is eight-pointed",
  pReadOnly: "Display mode with fractional fill",
  pDisabled: "Turns off interaction",
  pName: "Name of the radio group for form submission",
  pRequired: "The form is not sent until a score is picked",
  pAllowClear: "A second click on the selected star clears the score",
  pLabels:
    "Accessible texts: group name, per-star name, read-only summary, no rating option",
  pClassName: "Additional CSS classes. A text-* class sets the star color",
  features: "Features",
  featureList: [
    [
      "No JavaScript",
      "native radio inputs and CSS, works in Server Components and before hydration",
    ],
    [
      "Keyboard",
      "native radio group: Tab enters it once, the arrow keys move the score",
    ],
    [
      "Touch friendly",
      "the hover preview sits behind @media (hover: hover), so stars do not get stuck",
    ],
    [
      "Reduced motion",
      "the ring and the flash are turned off when the system asks for less motion",
    ],
    [
      "No dependencies",
      "shapes are inline SVG, keyframes live in the component",
    ],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    auditFeature0Description: "Меняет стиль по содержимому",
    auditFeature1Description: "Оформляет проверку после ввода",
    auditFeature2Description: "Окрашивает невыбранные звёзды",
    description: "Оценка звёздами на нативных радиокнопках, без JavaScript",
    intro:
      "У Rating два режима. Интерактивный собран из нативных радиокнопок: наведение показывает оценку заранее, клик или стрелки её выбирают, а звёзды по очереди вспыхивают, и вокруг выбранной расходится кольцо. Заливка, предпросмотр и вспышка сделаны на CSS через :has() и соседние селекторы, поэтому компонент серверный и не грузит JavaScript. Режим только для чтения показывает дробные значения вроде 4,7 и даёт скринридеру обычный текст.",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Подсвечивает выбранную оценку.",
    supportDescription1: "Показывает вспышку после выбора оценки.",
    browserSupportText:
      "Заливка и предпросмотр держатся на :has(). Вспышка запускается по :user-valid, поэтому оценка из defaultValue не мигает при загрузке страницы. Обе технологии в Baseline widely available.",
    preview: "Превью",
    previewText:
      "Наведите курсор, кликните или перейдите к звёздам по Tab и нажимайте стрелки. Работает и с выключенным JavaScript.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    readOnlyTitle: "Только чтение и дробные значения",
    readOnlyText:
      "С readOnly верхний слой каждой звезды обрезается по её доле в значении: при 4,7 видно четыре полные звезды и большую часть пятой.",
    shapesTitle: "Форма, размер и шкала",
    shapesText:
      "shape переключает пятиконечную звезду на восьмиконечную. max меняет длину шкалы. Цвет берётся из цвета текста, поэтому его задаёт класс text-*.",
    formTitle: "В форме",
    formText:
      "name становится именем группы радиокнопок, и оценка уходит вместе с формой даже до гидратации. allowClear добавляет скрытую радиокнопку «без оценки» и кладёт её подпись поверх выбранной звезды, поэтому повторный клик снимает оценку без JavaScript.",
    props: "Пропсы",
    propsHeaders: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    pValue: "Выбранная оценка в контролируемом режиме, null если пусто",
    pDefaultValue: "Начальная оценка в неконтролируемом режиме",
    pOnValueChange:
      "Вызывается с новой оценкой или с null после сброса. Работает только в клиентских компонентах",
    pMax: "Количество звёзд",
    pSize: "Размер звезды",
    pShape: "star пятиконечная, sparkle восьмиконечная",
    pReadOnly: "Режим показа с дробным заполнением",
    pDisabled: "Отключает взаимодействие",
    pName: "Имя группы радиокнопок для отправки формы",
    pRequired: "Форма не отправится, пока не выбрана оценка",
    pAllowClear: "Повторный клик по выбранной звезде снимает оценку",
    pLabels:
      "Тексты для скринридера: имя группы, подпись звезды, итог в режиме чтения, вариант «без оценки»",
    pClassName: "Дополнительные CSS-классы. Класс text-* задаёт цвет звёзд",
    features: "Возможности",
    featureList: [
      [
        "Без JavaScript",
        "нативные радиокнопки и CSS, работает в Server Components и до гидратации",
      ],
      [
        "Клавиатура",
        "нативная группа радиокнопок: Tab попадает в неё один раз, стрелки меняют оценку",
      ],
      [
        "Сенсорные экраны",
        "предпросмотр спрятан за @media (hover: hover), и звёзды не залипают",
      ],
      [
        "Меньше движения",
        "кольцо и вспышка отключаются, если система просит убрать анимацию",
      ],
      [
        "Без зависимостей",
        "формы нарисованы инлайн-SVG, keyframes лежат внутри компонента",
      ],
    ],
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Rating", description: t.description }
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export default async function RatingPage({ params }: Props) {
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
    { id: "features", title: t.features, level: 2 },
  ]

  const props: [string, string, string, string][] = [
    ["value", "number | null", "-", t.pValue],
    ["defaultValue", "number | null", "null", t.pDefaultValue],
    ["onValueChange", "(value: number | null) => void", "-", t.pOnValueChange],
    ["max", "number", "5", t.pMax],
    ["size", '"sm" | "md" | "lg"', '"md"', t.pSize],
    ["shape", '"star" | "sparkle"', '"star"', t.pShape],
    ["readOnly", "boolean", "false", t.pReadOnly],
    ["disabled", "boolean", "false", t.pDisabled],
    ["name", "string", "-", t.pName],
    ["required", "boolean", "false", t.pRequired],
    ["allowClear", "boolean", "false", t.pAllowClear],
    ["labels", "Partial<RatingLabels>", "-", t.pLabels],
    ["className", "string", "-", t.pClassName],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Rating" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "has",
              description: t.auditFeature0Description,
            },
            {
              featureId: "user-pseudos",
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
          <p className="text-sm text-muted-foreground">{t.previewText}</p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <RatingPreviewDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/rating" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { Rating } from "@/components/ui/rating"

// A Server Component: the score lives in the radio inputs
export default function Example() {
  return <Rating name="score" defaultValue={4} />
}

// Inside a client component you can still listen to changes
<Rating value={value} onValueChange={setValue} />`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.readOnlyTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.readOnlyText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <RatingReadOnlyDemo />
              </div>
              <CodeBlock className="mt-4">{`<Rating readOnly value={4.7} />
<Rating readOnly value={3.4} />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.shapesTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.shapesText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <RatingShapesDemo />
              </div>
              <CodeBlock className="mt-4">{`<Rating shape="sparkle" defaultValue={3} size="lg" />
<Rating shape="sparkle" max={10} defaultValue={7} size="sm" className="text-foreground" />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.formTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.formText}</p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <RatingFormDemo />
              </div>
              <CodeBlock className="mt-4">{`import { Button } from "@/components/ui/button"

<form action={submit}>
  <Rating name="quality" allowClear />
  <Button type="submit">Send</Button>
</form>`}</CodeBlock>
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
                    {t.propsHeaders.prop}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.propsHeaders.type}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.propsHeaders.default}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.propsHeaders.description}
                  </th>
                </tr>
              </thead>
              <tbody>
                {props.map(([name, type, def, desc]) => (
                  <tr key={name} className="border-t">
                    <td className="p-3 font-mono text-xs">{name}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3 font-mono text-xs">{def}</td>
                    <td className="p-3">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="features" className={h2}>
            {t.features}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            {t.featureList.map(([title, text]) => (
              <li key={title}>
                <strong className="text-foreground">{title}</strong>: {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DocsPage>
  )
}
