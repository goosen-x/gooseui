import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  CompareSliderCheckerboardDemo,
  CompareSliderControlledDemo,
  CompareSliderDemo,
  CompareSliderVerticalDemo,
} from "./compare-slider-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  auditFeature0Description: "Animates registered CSS properties",
  auditFeature1Description: "Displays a vertical range control",
  auditFeature2Description: "Styles elements based on their contents",
  auditFeature3Description: "Colors the handle focus ring",
  description: "Before/after comparison with a draggable divider",
  intro:
    'Two layers stacked on top of each other: the top one is clipped with clip-path by the --compare-slider-pos variable. An invisible native <input type="range"> covers the whole frame, so dragging from any point, touch and the keyboard work out of the box. The markup is rendered on the server; the only client part is a small island that writes the range value into the variable. A registered custom property lets the divider glide after the pointer with a CSS transition. Without JavaScript the frame shows the comparison at defaultPosition. Both slots accept any ReactNode: images, SVG, video or regular markup.',
  browserSupport: "Browser Support",
  supportDescription0: "Animates the divider position.",
  supportDescription1: "Turns the slider vertically.",
  supportDescription2: "Draws a focus ring on the handle.",
  browserSupportText:
    "@property makes the position a real percentage, so it can transition; without it the divider just jumps. The vertical variant turns the range with writing-mode, which needs vertical form controls. :has() draws the focus ring on the handle.",
  preview: "Preview",
  previewHint:
    "Drag anywhere in the frame or press Tab and use the arrow keys.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  checkerboardTitle: "Transparent images",
  checkerboardText:
    "checkerboard draws a checker pattern under both layers, so transparent areas of a cutout are visible.",
  verticalTitle: "Vertical, with markup",
  verticalText:
    'orientation="vertical" moves the divider up and down. Here both layers are plain components instead of images.',
  controlledTitle: "Controlled position",
  controlledText:
    "Pass position and onPositionChange to drive the divider from outside.",
  props: "Props",
  propsHeaders: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  propDesc: {
    before: "Layer on the start side of the divider (left or top)",
    after: "Layer on the end side of the divider (right or bottom)",
    defaultPosition: "Initial divider position in percent",
    position: "Divider position in percent for controlled mode",
    onPositionChange: "Called with the new position while dragging or on keys",
    orientation: "Direction of the divider",
    checkerboard: "Checker pattern under the layers for transparent images",
    beforeLabel: "Badge over the before layer",
    afterLabel: "Badge over the after layer",
    step: "Arrow key step in percent",
    sliderLabel: "Accessible name of the range input",
    instant: "Follow the pointer without the smoothing transition",
    name: "Form field name: the position is submitted with the form",
    className: "Additional CSS classes; set the aspect ratio here",
  },
  features: "Features",
  featureList: [
    [
      "Native range",
      "a click anywhere in the frame jumps there, the drag goes on outside the frame",
    ],
    [
      "Smooth handle",
      "a 160 ms CSS transition on @property; reduced motion and instant turn it off",
    ],
    [
      "Keyboard",
      "arrows move by step, Page Up/Down by two steps, Home/End jump to the edges",
    ],
    ["Forms", "with name the position goes to FormData"],
    ["Touch friendly", "the page still scrolls across the drag axis on phones"],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    auditFeature0Description: "Анимирует зарегистрированные CSS-свойства",
    auditFeature1Description: "Отображает вертикальный ползунок",
    auditFeature2Description: "Меняет стиль по содержимому",
    auditFeature3Description: "Окрашивает кольцо фокуса ползунка",
    description: "Сравнение «до/после» с перетаскиваемым разделителем",
    intro:
      'Два слоя лежат друг на друге: верхний обрезается через clip-path по переменной --compare-slider-pos. Поверх всего кадра лежит невидимый нативный <input type="range">, поэтому тянуть можно из любой точки, а касания и клавиатура работают сами. Разметка рендерится на сервере, а клиентская часть это маленький островок, который пишет значение ползунка в переменную. Зарегистрированное свойство даёт разделителю плавно догонять курсор через CSS-переход. Без JavaScript кадр показывает сравнение в позиции defaultPosition. Оба слота принимают любой ReactNode: картинку, SVG, видео или обычную вёрстку.',
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Анимирует положение разделителя.",
    supportDescription1: "Размещает ползунок вертикально.",
    supportDescription2: "Показывает обводку фокуса на ползунке.",
    browserSupportText:
      "@property делает позицию настоящими процентами, и её можно плавно менять; без него разделитель просто прыгает. Вертикальный вариант поворачивает ползунок через writing-mode, для этого нужны вертикальные элементы форм. :has() рисует рамку фокуса на ручке.",
    preview: "Превью",
    previewHint:
      "Тяните в любом месте кадра или нажмите Tab и двигайте стрелками.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    checkerboardTitle: "Прозрачные картинки",
    checkerboardText:
      "checkerboard рисует шахматку под обоими слоями, и прозрачные места вырезанного объекта становятся видны.",
    verticalTitle: "Вертикально и с вёрсткой",
    verticalText:
      'С orientation="vertical" разделитель ходит вверх и вниз. Здесь в слоях обычные компоненты, а не картинки.',
    controlledTitle: "Управляемая позиция",
    controlledText:
      "Передайте position и onPositionChange, чтобы двигать разделитель снаружи.",
    props: "Пропсы",
    propsHeaders: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    propDesc: {
      before: "Слой с начальной стороны разделителя (слева или сверху)",
      after: "Слой с конечной стороны разделителя (справа или снизу)",
      defaultPosition: "Начальная позиция разделителя в процентах",
      position: "Позиция разделителя в процентах для управляемого режима",
      onPositionChange:
        "Вызывается с новой позицией при перетаскивании и с клавиатуры",
      orientation: "Направление разделителя",
      checkerboard: "Шахматка под слоями для картинок с прозрачностью",
      beforeLabel: "Подпись поверх слоя before",
      afterLabel: "Подпись поверх слоя after",
      step: "Шаг стрелок в процентах",
      sliderLabel: "Доступное имя ползунка для скринридеров",
      instant: "Двигать разделитель без сглаживающего перехода",
      name: "Имя поля: позиция уходит вместе с формой",
      className: "Дополнительные CSS-классы; здесь же задаются пропорции",
    },
    features: "Возможности",
    featureList: [
      [
        "Нативный ползунок",
        "клик в любом месте кадра переносит туда разделитель, перетаскивание не обрывается за краем кадра",
      ],
      [
        "Плавная ручка",
        "CSS-переход 160 мс по @property; reduced motion и instant его выключают",
      ],
      ["Формы", "с name позиция попадает в FormData"],
      [
        "Клавиатура",
        "стрелки двигают на шаг, Page Up/Down на два шага, Home/End в края",
      ],
      [
        "Сенсорные экраны",
        "поперёк оси перетаскивания страница на телефоне продолжает прокручиваться",
      ],
    ],
  },
}

const propRows: [keyof typeof en.propDesc, string, string][] = [
  ["before", "ReactNode", "-"],
  ["after", "ReactNode", "-"],
  ["defaultPosition", "number", "50"],
  ["position", "number", "-"],
  ["onPositionChange", "(position: number) => void", "-"],
  ["orientation", '"horizontal" | "vertical"', '"horizontal"'],
  ["checkerboard", "boolean", "false"],
  ["beforeLabel", "ReactNode", "-"],
  ["afterLabel", "ReactNode", "-"],
  ["step", "number", "5"],
  ["sliderLabel", "string", '"Comparison divider"'],
  ["instant", "boolean", "false"],
  ["name", "string", "-"],
  ["className", "string", "-"],
]

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Compare Slider", description: t.description }
}

export default async function CompareSliderPage({ params }: Props) {
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

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Compare Slider" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "registered-custom-properties",
              description: t.auditFeature0Description,
            },
            {
              featureId: "vertical-form-controls",
              description: t.auditFeature1Description,
            },
            {
              featureId: "has",
              description: t.auditFeature2Description,
            },
            {
              featureId: "color-mix",
              description: t.auditFeature3Description,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <CompareSliderDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/compare-slider" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { CompareSlider } from "@/components/ui/compare-slider"

export default function Example() {
  return (
    <CompareSlider
      before={<img src="/photo-before.jpg" alt="Before retouch" />}
      after={<img src="/photo-after.jpg" alt="After retouch" />}
      beforeLabel="Before"
      afterLabel="After"
    />
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">
                {t.checkerboardTitle}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.checkerboardText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <CompareSliderCheckerboardDemo />
              </div>
              <CodeBlock className="mt-4">{`<CompareSlider
  className="aspect-[4/3]"
  checkerboard
  defaultPosition={60}
  before={<img src="/product.jpg" alt="Original" />}
  after={<img src="/product-cutout.png" alt="Background removed" />}
  beforeLabel="Original"
  afterLabel="Cutout"
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.verticalTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.verticalText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <CompareSliderVerticalDemo />
              </div>
              <CodeBlock className="mt-4">{`<CompareSlider
  orientation="vertical"
  className="aspect-[3/4] max-w-xs"
  before={<PricingCard variant="old" />}
  after={<PricingCard variant="new" />}
  beforeLabel="Old layout"
  afterLabel="New layout"
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.controlledTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.controlledText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <CompareSliderControlledDemo />
              </div>
              <CodeBlock className="mt-4">{`const [position, setPosition] = useState(30)

<CompareSlider
  position={position}
  onPositionChange={setPosition}
  before={<img src="/before.jpg" alt="" />}
  after={<img src="/after.jpg" alt="" />}
/>
<Button onClick={() => setPosition(50)}>50%</Button>`}</CodeBlock>
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
                {propRows.map(([name, type, def]) => (
                  <tr key={name} className="border-t">
                    <td className="p-3 font-mono text-xs">{name}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3 font-mono text-xs">{def}</td>
                    <td className="p-3">{t.propDesc[name]}</td>
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
