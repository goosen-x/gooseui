import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  ImageViewerBareDemo,
  ImageViewerDemo,
  ImageViewerDialogDemo,
  ImageViewerLimitsDemo,
} from "./image-viewer-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  auditFeature0Description: "Displays the modal dialog",
  auditFeature1Description: "Animates the initial appearance",
  auditFeature2Description: "Locks page scrolling while open",
  auditFeature3Description: "Styles the viewer backdrop",
  description: "Zoom, pan and rotate an image inline or in a fullscreen dialog",
  intro:
    "Image viewer with zoom from 50% to 400%, panning, 90° rotation, reset and fit. Zoom follows the cursor: the point under the pointer stays in place. Works with the mouse wheel, trackpad and two-finger pinch, and has an inline mode and a fullscreen dialog. Zoom and panning need JavaScript: the component ships about 4 kB of its own code and no libraries. The fullscreen mode is a native <dialog>, so the browser handles focus, Esc and the inert page behind it.",
  browserSupport: "Browser Support",
  supportDescription0: "Opens the image in a fullscreen dialog.",
  supportDescription1: "Fades in the dialog.",
  browserSupportText:
    "The fullscreen mode relies on the native <dialog> element and its showModal() method, supported in every modern browser. The fade-in uses @starting-style; where it is missing the dialog simply appears without animation.",
  preview: "Preview",
  previewHint:
    "Scroll or pinch to zoom, drag to pan, double-click to zoom in or back. Focus the image and try +, -, 0, R and the arrow keys.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  dialogTitle: "Fullscreen dialog",
  dialogText:
    "ImageViewerDialog opens the viewer in a native modal <dialog>. Pass a single element as children: its click opens the dialog. Escape closes it, focus moves to the image on open and returns to the trigger on close.",
  limitsTitle: "Zoom limits",
  limitsText:
    "minZoom and maxZoom are relative to the fitted size. Here the image cannot be smaller than the frame and the buttons step by 50%.",
  bareTitle: "Without toolbar",
  bareText:
    "showControls={false} hides the toolbar. Gestures and keyboard shortcuts keep working.",
  labelsTitle: "Translated labels",
  labelsText:
    "Every button label and the screen reader hint come from the labels prop.",
  props: "Props",
  dialogProps: "ImageViewerDialog",
  dialogPropsText:
    "Accepts all ImageViewer props except className and toolbarEnd, plus:",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  p: {
    src: "Image URL",
    alt: "Alternative text, also part of the viewer label",
    minZoom: "Smallest zoom relative to the fitted size",
    maxZoom: "Largest zoom relative to the fitted size",
    zoomStep: "Zoom change for the buttons and + / - keys",
    showControls: "Show the toolbar",
    toolbarEnd: "Extra content at the end of the toolbar",
    imageClassName: "Classes for the <img> element",
    labels: "Button labels, hint and error text",
    className: "Classes for the root. Default height is h-96",
    open: "Controlled open state",
    defaultOpen: "Initial open state",
    onOpenChange: "Called when the dialog opens or closes",
    children:
      "Trigger element. A single element gets an onClick that opens the dialog",
    title: "Dialog title, alt by default",
    dialogClassName: "Classes for the dialog content",
  },
  features: "Features",
  featureList: [
    [
      "Zoom to the cursor",
      "wheel, pinch and double-click keep the point under the pointer still",
    ],
    ["Pan limits", "the image cannot be dragged out of the frame"],
    ["Rotation", "90° steps, the image is refitted for the new orientation"],
    [
      "Keyboard",
      "+ and - zoom, 0 fits, R rotates (Shift+R back), arrows pan, Shift speeds them up",
    ],
    [
      "Accessibility",
      "the viewport is a labelled region with a hidden hint, every button has a label",
    ],
    ["Reduced motion", "button and key transitions are turned off"],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    auditFeature0Description: "Показывает модальное окно",
    auditFeature1Description: "Анимирует появление",
    auditFeature2Description: "Блокирует прокрутку страницы при открытии",
    auditFeature3Description: "Оформляет подложку просмотра",
    description:
      "Масштаб, перетаскивание и поворот картинки в блоке или на весь экран",
    intro:
      "Просмотр изображения: масштаб от 50% до 400%, перетаскивание, поворот на 90°, сброс и «вписать». Масштаб меняется относительно курсора, точка под указателем остаётся на месте. Работает с колесом мыши, тачпадом и щипком двумя пальцами. Есть встроенный режим и полноэкранное окно. Масштаб и перетаскивание требуют JavaScript: у компонента около 4 кБ своего кода и никаких библиотек. Полноэкранный режим сделан на нативном <dialog>, поэтому фокус, Esc и блокировку страницы под окном берёт на себя браузер.",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Открывает изображение на весь экран.",
    supportDescription1: "Плавно показывает окно.",
    browserSupportText:
      "Полноэкранный режим держится на нативном <dialog> и методе showModal(), они есть во всех современных браузерах. Плавное появление сделано через @starting-style, без него окно просто появляется сразу.",
    preview: "Превью",
    previewHint:
      "Колесо или щипок меняют масштаб, перетаскивание двигает картинку, двойной клик приближает и возвращает обратно. Наведите фокус на картинку и попробуйте +, -, 0, R и стрелки.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    dialogTitle: "Полноэкранное окно",
    dialogText:
      "ImageViewerDialog открывает просмотрщик в нативном модальном <dialog>. Передайте в children один элемент: клик по нему открывает окно. Escape закрывает его, при открытии фокус переходит на картинку, после закрытия возвращается на кнопку.",
    limitsTitle: "Пределы масштаба",
    limitsText:
      "minZoom и maxZoom считаются от вписанного размера. Здесь картинку нельзя сделать меньше рамки, а кнопки меняют масштаб шагом 50%.",
    bareTitle: "Без панели",
    bareText:
      "showControls={false} прячет панель управления. Жесты и клавиши продолжают работать.",
    labelsTitle: "Свои подписи",
    labelsText:
      "Подписи кнопок и подсказка для скринридера задаются через проп labels.",
    props: "Пропсы",
    dialogProps: "ImageViewerDialog",
    dialogPropsText:
      "Принимает все пропсы ImageViewer, кроме className и toolbarEnd, и ещё эти:",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    p: {
      src: "Адрес изображения",
      alt: "Альтернативный текст, он же входит в подпись области",
      minZoom: "Наименьший масштаб относительно вписанного размера",
      maxZoom: "Наибольший масштаб относительно вписанного размера",
      zoomStep: "Шаг масштаба для кнопок и клавиш + / -",
      showControls: "Показывать панель управления",
      toolbarEnd: "Дополнительное содержимое в конце панели",
      imageClassName: "Классы для элемента <img>",
      labels: "Подписи кнопок, подсказка и текст ошибки",
      className: "Классы корневого блока. Высота по умолчанию h-96",
      open: "Управляемое состояние окна",
      defaultOpen: "Начальное состояние окна",
      onOpenChange: "Вызывается при открытии и закрытии",
      children:
        "Кнопка открытия. Один элемент, к нему добавляется onClick, который открывает окно",
      title: "Заголовок окна, по умолчанию alt",
      dialogClassName: "Классы содержимого окна",
    },
    features: "Возможности",
    featureList: [
      [
        "Масштаб к курсору",
        "колесо, щипок и двойной клик не сдвигают точку под указателем",
      ],
      ["Границы перетаскивания", "картинку нельзя утащить за пределы рамки"],
      ["Поворот", "шагом 90°, картинка заново вписывается в новую ориентацию"],
      [
        "Клавиатура",
        "+ и - меняют масштаб, 0 вписывает, R поворачивает (Shift+R обратно), стрелки двигают, с Shift быстрее",
      ],
      [
        "Доступность",
        "область просмотра подписана и снабжена скрытой подсказкой, у каждой кнопки есть подпись",
      ],
      ["Reduced motion", "анимация кнопок и клавиш отключается"],
    ],
  },
}

const viewerRows: [string, string, string, keyof typeof en.p][] = [
  ["src", "string", "-", "src"],
  ["alt", "string", "-", "alt"],
  ["minZoom", "number", "0.5", "minZoom"],
  ["maxZoom", "number", "4", "maxZoom"],
  ["zoomStep", "number", "0.25", "zoomStep"],
  ["showControls", "boolean", "true", "showControls"],
  ["toolbarEnd", "ReactNode", "-", "toolbarEnd"],
  ["imageClassName", "string", "-", "imageClassName"],
  ["labels", "Partial<ImageViewerLabels>", "English", "labels"],
  ["className", "string", "-", "className"],
]

const dialogRows: [string, string, string, keyof typeof en.p][] = [
  ["open", "boolean", "-", "open"],
  ["defaultOpen", "boolean", "false", "defaultOpen"],
  ["onOpenChange", "(open: boolean) => void", "-", "onOpenChange"],
  ["children", "ReactNode", "-", "children"],
  ["title", "string", "alt", "title"],
  ["className", "string", "-", "dialogClassName"],
]

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Image Viewer", description: t.description }
}

function PropsTable({
  rows,
  t,
}: {
  rows: [string, string, string, keyof typeof en.p][]
  t: typeof en
}) {
  return (
    <div className="border rounded-lg overflow-x-auto">
      <table className="w-full text-sm min-w-[500px]">
        <thead className="bg-muted">
          <tr>
            <th className="text-left p-3 font-medium">{t.headers.prop}</th>
            <th className="text-left p-3 font-medium">{t.headers.type}</th>
            <th className="text-left p-3 font-medium">{t.headers.default}</th>
            <th className="text-left p-3 font-medium">
              {t.headers.description}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, type, def, key]) => (
            <tr key={name} className="border-t">
              <td className="p-3 font-mono text-xs">{name}</td>
              <td className="p-3 font-mono text-xs">{type}</td>
              <td className="p-3 font-mono text-xs">{def}</td>
              <td className="p-3">{t.p[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export default async function ImageViewerPage({ params }: Props) {
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
        <DocsPageNav title="Image Viewer" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "dialog",
              description: t.auditFeature0Description,
            },
            {
              featureId: "starting-style",
              description: t.auditFeature1Description,
            },
            {
              featureId: "has",
              description: t.auditFeature2Description,
            },
            {
              featureId: "backdrop",
              description: t.auditFeature3Description,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center p-4 sm:p-8 bg-muted/30 rounded-lg">
            <ImageViewerDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/image-viewer" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { ImageViewer } from "@/components/ui/image-viewer"

export default function Example() {
  return (
    <ImageViewer
      src="/images/floor-plan.png"
      alt="Floor plan of the second floor"
      className="h-[480px]"
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
              <h3 className="text-lg font-medium mb-3">{t.dialogTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.dialogText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <ImageViewerDialogDemo />
              </div>
              <CodeBlock className="mt-4">{`import { Button } from "@/components/ui/button"

import { ImageViewerDialog } from "@/components/ui/image-viewer"

<ImageViewerDialog src="/images/poster.png" alt="Concert poster">
  <Button type="button">
    <img src="/images/poster-small.png" alt="Concert poster" />
  </Button>
</ImageViewerDialog>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.limitsTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.limitsText}
              </p>
              <div className="flex justify-center p-4 sm:p-8 bg-muted/30 rounded-lg">
                <ImageViewerLimitsDemo />
              </div>
              <CodeBlock className="mt-4">{`<ImageViewer
  src="/images/map.png"
  alt="City map"
  minZoom={1}
  maxZoom={3}
  zoomStep={0.5}
  className="h-72"
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.bareTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.bareText}</p>
              <div className="flex justify-center p-4 sm:p-8 bg-muted/30 rounded-lg">
                <ImageViewerBareDemo />
              </div>
              <CodeBlock className="mt-4">{`<ImageViewer src="/images/poster.png" alt="Poster" showControls={false} />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.labelsTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.labelsText}
              </p>
              <CodeBlock>{`<ImageViewer
  src="/images/plan.png"
  alt="Plan"
  labels={{
    viewer: "Visor de imágenes",
    zoomIn: "Acercar",
    zoomOut: "Alejar",
    rotate: "Girar",
    fit: "Ajustar",
    reset: "Restablecer",
  }}
/>`}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="props" className={h2}>
            {t.props}
          </h2>
          <PropsTable rows={viewerRows} t={t} />
          <h3 className="text-lg font-medium pt-4">{t.dialogProps}</h3>
          <p className="text-sm text-muted-foreground">{t.dialogPropsText}</p>
          <PropsTable rows={dialogRows} t={t} />
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
