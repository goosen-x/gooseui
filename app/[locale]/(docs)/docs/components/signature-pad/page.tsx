import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  SignaturePadEventsDemo,
  SignaturePadPenDemo,
  SignaturePadPreviewDemo,
} from "./signature-pad-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  description:
    "Canvas signature field with smooth strokes, undo and PNG export",
  intro:
    "A field to sign with a mouse, a finger or a stylus. Strokes are smoothed with quadratic curves, the canvas is sharp on high-density screens and repaints itself after a resize. By default the ink takes the current text color, so it reads well in light and dark themes. Methods on ref clear the pad, undo the last stroke and export an image, optionally trimmed to the signature.",
  preview: "Preview",
  previewText:
    "Sign in the box, then save it: the export is trimmed and drawn with dark ink.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  penTitle: "Pen color and width",
  penText:
    "Without penColor the ink follows the text color, so a text-* class is enough. penColor sets a fixed color, penWidth the line width in CSS pixels.",
  eventsTitle: "Callbacks",
  eventsText:
    "onBegin and onEnd fire when a stroke starts and ends. onChange reports whether the pad is empty and how many strokes it holds, which is handy for enabling a submit button.",
  props: "Props",
  propsHeaders: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  pRef: "Gives access to the methods below",
  pPenColor: "Ink color. Follows the text color when omitted",
  pPenWidth: "Line width in CSS pixels",
  pDisabled: "Turns off drawing",
  pShowGuide: "Show the guide line and the placeholder",
  pOnChange: "Called after a stroke, undo or clear",
  pOnBegin: "Called when a stroke starts",
  pOnEnd: "Called when a stroke ends",
  pLabels: "Texts: canvas name for screen readers and the placeholder",
  pClassName: "Additional CSS classes. Height is h-48 by default",
  methods: "Ref methods",
  methodsHeaders: {
    method: "Method",
    returns: "Returns",
    description: "Description",
  },
  mClear: "Removes all strokes",
  mUndo: "Removes the last stroke",
  mIsEmpty: "Whether there is nothing drawn",
  mToDataURL: "Image as a data URL",
  mToBlob: "Image as a Blob, null if the browser could not encode it",
  mGetStrokes: "A copy of the recorded strokes in CSS pixels",
  exportOptions: "Export options",
  exportText:
    "toDataURL and toBlob take the same options: trim crops empty space around the signature (padding keeps a margin), color repaints the ink, background fills the image, type and quality choose the format, scale sets pixel density.",
  features: "Features",
  featureList: [
    [
      "Pointer Events",
      "one handler for mouse, touch and stylus, page scroll is blocked only over the canvas",
    ],
    [
      "Sharp on any screen",
      "the canvas buffer follows devicePixelRatio and the element size",
    ],
    [
      "Vector history",
      "strokes are stored as points, so resize, theme switch and export redraw them cleanly",
    ],
    [
      "Exact trim",
      "the crop box is computed from the points, not by scanning pixels",
    ],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Поле для подписи на canvas: сглаженные штрихи, отмена и экспорт в PNG",
    intro:
      "Поле, в котором расписываются мышью, пальцем или стилусом. Штрихи сглаживаются квадратичными кривыми, холст остаётся чётким на экранах с высокой плотностью и перерисовывается после изменения размера. По умолчанию чернила берут текущий цвет текста, поэтому подпись видна и в светлой, и в тёмной теме. Через ref доступны методы: очистить поле, отменить последний штрих и выгрузить картинку, при желании обрезанную по подписи.",
    preview: "Превью",
    previewText:
      "Распишитесь в поле и сохраните: картинка обрезается по краям подписи и рисуется тёмными чернилами.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    penTitle: "Цвет и толщина пера",
    penText:
      "Без penColor чернила повторяют цвет текста, так что достаточно класса text-*. penColor задаёт фиксированный цвет, penWidth толщину линии в CSS-пикселях.",
    eventsTitle: "Колбэки",
    eventsText:
      "onBegin и onEnd срабатывают в начале и в конце штриха. onChange сообщает, пустое ли поле и сколько в нём штрихов. Удобно, чтобы включать кнопку отправки.",
    props: "Пропсы",
    propsHeaders: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    pRef: "Даёт доступ к методам ниже",
    pPenColor: "Цвет чернил. Если не задан, берётся цвет текста",
    pPenWidth: "Толщина линии в CSS-пикселях",
    pDisabled: "Запрещает рисовать",
    pShowGuide: "Показывать линию-ориентир и подсказку",
    pOnChange: "Вызывается после штриха, отмены или очистки",
    pOnBegin: "Вызывается в начале штриха",
    pOnEnd: "Вызывается в конце штриха",
    pLabels: "Тексты: имя холста для скринридера и подсказка",
    pClassName: "Дополнительные CSS-классы. Высота по умолчанию h-48",
    methods: "Методы ref",
    methodsHeaders: {
      method: "Метод",
      returns: "Возвращает",
      description: "Описание",
    },
    mClear: "Удаляет все штрихи",
    mUndo: "Удаляет последний штрих",
    mIsEmpty: "Пустое ли поле",
    mToDataURL: "Картинка в виде data URL",
    mToBlob:
      "Картинка в виде Blob или null, если браузер не смог её закодировать",
    mGetStrokes: "Копия записанных штрихов в CSS-пикселях",
    exportOptions: "Параметры экспорта",
    exportText:
      "toDataURL и toBlob принимают одни и те же параметры: trim обрезает пустое место вокруг подписи (padding оставляет поле), color перекрашивает чернила, background заливает фон, type и quality выбирают формат, scale задаёт плотность пикселей.",
    features: "Возможности",
    featureList: [
      [
        "Pointer Events",
        "один обработчик на мышь, касание и стилус; прокрутка страницы блокируется только над холстом",
      ],
      [
        "Чёткость на любом экране",
        "буфер холста подстраивается под devicePixelRatio и размер элемента",
      ],
      [
        "Векторная история",
        "штрихи хранятся как точки, поэтому после ресайза, смены темы и при экспорте они перерисовываются без потерь",
      ],
      ["Точная обрезка", "рамка считается по точкам, без перебора пикселей"],
    ],
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Signature Pad", description: t.description }
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export default async function SignaturePadPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]

  const toc = [
    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "examples", title: t.examples, level: 2 },
    { id: "props", title: t.props, level: 2 },
    { id: "methods", title: t.methods, level: 2 },
    { id: "features", title: t.features, level: 2 },
  ]

  const props: [string, string, string, string][] = [
    ["ref", "Ref<SignaturePadHandle>", "-", t.pRef],
    ["penColor", "string", "currentColor", t.pPenColor],
    ["penWidth", "number", "2.5", t.pPenWidth],
    ["disabled", "boolean", "false", t.pDisabled],
    ["showGuide", "boolean", "true", t.pShowGuide],
    ["onChange", "({ isEmpty, strokeCount }) => void", "-", t.pOnChange],
    ["onBegin", "() => void", "-", t.pOnBegin],
    ["onEnd", "() => void", "-", t.pOnEnd],
    ["labels", "{ canvas?: string; placeholder?: string }", "-", t.pLabels],
    ["className", "string", "-", t.pClassName],
  ]

  const methods: [string, string, string][] = [
    ["clear()", "void", t.mClear],
    ["undo()", "void", t.mUndo],
    ["isEmpty()", "boolean", t.mIsEmpty],
    ["toDataURL(options?)", "string", t.mToDataURL],
    ["toBlob(options?)", "Promise<Blob | null>", t.mToBlob],
    ["getStrokes()", "SignatureStroke[]", t.mGetStrokes],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Signature Pad" />

        <p className="text-muted-foreground">{t.intro}</p>

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewText}</p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <SignaturePadPreviewDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/signature-pad" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { Button } from "@/components/ui/button"

import { useRef } from "react"
import { SignaturePad, type SignaturePadHandle } from "@/components/ui/signature-pad"

export default function Example() {
  const pad = useRef<SignaturePadHandle>(null)

  const save = async () => {
    if (!pad.current || pad.current.isEmpty()) return
    const blob = await pad.current.toBlob({ trim: true })
    // upload the blob
  }

  return (
    <>
      <SignaturePad ref={pad} />
      <Button onClick={() => pad.current?.undo()}>Undo</Button>
      <Button onClick={() => pad.current?.clear()}>Clear</Button>
      <Button onClick={save}>Save</Button>
    </>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.penTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.penText}</p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <SignaturePadPenDemo />
              </div>
              <CodeBlock className="mt-4">{`<SignaturePad penWidth={4} showGuide={false} className="h-36 text-primary" />
<SignaturePad penColor="#2563eb" penWidth={1.5} className="h-36" />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.eventsTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.eventsText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <SignaturePadEventsDemo />
              </div>
              <CodeBlock className="mt-4">{`import { Button } from "@/components/ui/button"

const [count, setCount] = useState(0)

<SignaturePad
  onBegin={() => setDrawing(true)}
  onEnd={() => setDrawing(false)}
  onChange={({ strokeCount }) => setCount(strokeCount)}
/>
<Button disabled={count === 0}>Confirm</Button>`}</CodeBlock>
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
          <h2 id="methods" className={h2}>
            {t.methods}
          </h2>
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">
                    {t.methodsHeaders.method}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.methodsHeaders.returns}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.methodsHeaders.description}
                  </th>
                </tr>
              </thead>
              <tbody>
                {methods.map(([name, returns, desc]) => (
                  <tr key={name} className="border-t">
                    <td className="p-3 font-mono text-xs">{name}</td>
                    <td className="p-3 font-mono text-xs">{returns}</td>
                    <td className="p-3">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="text-lg font-medium">{t.exportOptions}</h3>
          <p className="text-sm text-muted-foreground">{t.exportText}</p>
          <CodeBlock>{`pad.current?.toDataURL({
  trim: true,
  padding: 8,
  color: "#111827",
  background: "#ffffff",
  type: "image/jpeg",
  quality: 0.9,
  scale: 2,
})`}</CodeBlock>
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
