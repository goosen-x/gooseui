import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  VideoDialogDemo,
  VideoDialogEventsDemo,
  VideoDialogHeroDemo,
} from "./video-dialog-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  auditFeature0Description: "Displays the modal dialog",
  auditFeature1Description: "Controls the dialog with buttons",
  auditFeature2Description: "Animates the initial appearance",
  auditFeature3Description: "Animates closing",
  auditFeature4Description: "Controls how the dialog closes",
  auditFeature5Description: "Locks page scrolling while open",
  auditFeature6Description: "Styles the video dialog backdrop",
  description: "Video preview that expands into a modal player",
  intro:
    'A poster with a play button that opens a modal player. The modal is a native <dialog>: the button opens it through invoker commands (commandfor and command="show-modal"), so it works without JavaScript, and the browser handles focus, Esc and the inert page. A client island of about 0.5 kB starts the video right inside the click, so Safari allows sound, and pauses it on close. Without JavaScript the player opens with controls and the viewer presses play.',
  browserSupport: "Browser Support",
  supportDescription0: "Displays the video in a modal.",
  supportDescription1: "Opens the dialog without JavaScript.",
  supportDescription2: "Animates the dialog entrance.",
  supportDescription3: "Animates the dialog exit.",
  supportDescription4: "Closes the dialog on backdrop click.",
  browserSupportText:
    "Invoker commands are Newly available. In older browsers the island opens the dialog with showModal(), so only the no-JavaScript case needs them. The fade and scale use @starting-style and transition-behavior. A click on the backdrop closes the dialog through <dialog closedby> where it is supported, and through the island elsewhere. With prefers-reduced-motion the animation is off.",
  preview: "Preview",
  previewHint:
    "Click the poster or focus it with Tab and press Enter. Close with Esc, the backdrop or the button.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  heroTitle: "Hero block",
  heroText:
    "className styles the preview: aspect ratio, radius, shadow. The player keeps its own 16:9 frame.",
  eventsTitle: "Open state events",
  eventsText:
    "onOpenChange reports opening and closing. It works when VideoDialog is rendered from a client component. restartOnOpen plays from the start every time.",
  props: "Props",
  propsHeaders: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  propDesc: {
    src: "Video URL for the player",
    poster: "Poster for the preview and the player",
    title: "Dialog title for screen readers, visually hidden",
    labels: "Accessible names of the preview and close buttons",
    restartOnOpen: "Play from the beginning on every open",
    onOpenChange:
      "Called when the dialog opens or closes (client components only)",
    dialogClassName: "Classes for the player frame in the dialog",
    className: "Classes for the preview button",
  },
  features: "Features",
  featureList: [
    [
      "Opens without JavaScript",
      'native <dialog> with invoker commands, the close button is a <form method="dialog">',
    ],
    [
      "Sound on Safari",
      "the video is already in the page, so play() runs inside the click",
    ],
    [
      "Muted fallback",
      "if the browser still blocks sound, the video plays muted and controls stay available",
    ],
    [
      "No preloading",
      'preload="none": the video does not download until the dialog is opened',
    ],
    [
      "Accessible modal",
      "native focus trap, Esc, the page behind is inert, focus returns to the preview",
    ],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    auditFeature0Description: "Показывает модальное окно",
    auditFeature1Description: "Управляет диалогом через кнопки",
    auditFeature2Description: "Анимирует появление",
    auditFeature3Description: "Анимирует закрытие",
    auditFeature4Description: "Определяет способы закрытия диалога",
    auditFeature5Description: "Блокирует прокрутку страницы при открытии",
    auditFeature6Description: "Оформляет подложку диалога с видео",
    description: "Превью видео раскрывается в модальный плеер",
    intro:
      'Постер с кнопкой play открывает модальный плеер. Окно сделано на нативном <dialog>: кнопка открывает его через invoker commands (commandfor и command="show-modal"), поэтому всё работает без JavaScript, а фокус, Esc и блокировку страницы берёт на себя браузер. Клиентский островок размером около 0,5 кБ запускает видео прямо в клике, чтобы Safari разрешил звук, и ставит его на паузу при закрытии. Без JavaScript плеер открывается с контролами, и play нажимают сами.',
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Показывает видео в модальном окне.",
    supportDescription1: "Открывает окно без JavaScript.",
    supportDescription2: "Анимирует появление окна.",
    supportDescription3: "Анимирует исчезновение окна.",
    supportDescription4: "Закрывает окно по нажатию на фон.",
    browserSupportText:
      "Invoker commands получили статус Newly available. В старых браузерах окно открывает островок через showModal(), так что без них не обойтись только при выключенном JavaScript. Проявление и лёгкое увеличение сделаны на @starting-style и transition-behavior. Клик по фону закрывает окно через <dialog closedby>, где он есть, а в остальных браузерах через островок. При prefers-reduced-motion анимация выключена.",
    preview: "Превью",
    previewHint:
      "Нажмите на постер или дойдите до него клавишей Tab и нажмите Enter. Закрыть можно по Esc, клику на фон или кнопкой.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    heroTitle: "Блок на первом экране",
    heroText:
      "className оформляет превью: пропорции, скругление, тень. У плеера остаётся своя рамка 16:9.",
    eventsTitle: "События открытия",
    eventsText:
      "onOpenChange сообщает об открытии и закрытии. Он работает, когда VideoDialog вызван из клиентского компонента. С restartOnOpen видео каждый раз начинается сначала.",
    props: "Пропсы",
    propsHeaders: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    propDesc: {
      src: "Адрес видео для плеера",
      poster: "Постер для превью и плеера",
      title: "Заголовок окна для скринридеров, на экране скрыт",
      labels: "Доступные имена кнопок превью и закрытия",
      restartOnOpen: "Начинать видео сначала при каждом открытии",
      onOpenChange:
        "Вызывается при открытии и закрытии окна (только в клиентских компонентах)",
      dialogClassName: "Классы рамки плеера в окне",
      className: "Классы кнопки-превью",
    },
    features: "Возможности",
    featureList: [
      [
        "Открывается без JavaScript",
        'нативный <dialog> и invoker commands, кнопка закрытия сделана через <form method="dialog">',
      ],
      [
        "Звук в Safari",
        "видео уже есть на странице, поэтому play() срабатывает внутри клика",
      ],
      [
        "Запасной вариант без звука",
        "если браузер всё равно блокирует звук, видео играет без него, а контролы остаются",
      ],
      [
        "Без предзагрузки",
        'preload="none": видео не скачивается, пока окно не открыли',
      ],
      [
        "Доступная модалка",
        "нативная ловушка фокуса, Esc, страница под окном неактивна, фокус возвращается на превью",
      ],
    ],
  },
}

const propRows: [keyof typeof en.propDesc, string, string][] = [
  ["src", "string", "-"],
  ["poster", "string", "-"],
  ["title", "string", '"Video"'],
  ["labels", "{ play?: string; close?: string }", "-"],
  ["restartOnOpen", "boolean", "false"],
  ["onOpenChange", "(open: boolean) => void", "-"],
  ["dialogClassName", "string", "-"],
  ["className", "string", "-"],
]

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Video Dialog", description: t.description }
}

export default async function VideoDialogPage({ params }: Props) {
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
        <DocsPageNav title="Video Dialog" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "dialog",
              description: t.auditFeature0Description,
            },
            {
              featureId: "invoker-commands",
              description: t.auditFeature1Description,
            },
            {
              featureId: "starting-style",
              description: t.auditFeature2Description,
            },
            {
              featureId: "transition-behavior",
              description: t.auditFeature3Description,
            },
            {
              featureId: "dialog-closedby",
              description: t.auditFeature4Description,
            },
            {
              featureId: "has",
              description: t.auditFeature5Description,
            },
            {
              featureId: "backdrop",
              description: t.auditFeature6Description,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <VideoDialogDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/video-dialog" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { VideoDialog } from "@/components/ui/video-dialog"

export default function Example() {
  return (
    <VideoDialog
      src="/videos/walkthrough.mp4"
      poster="/videos/walkthrough-poster.jpg"
      title="Product walkthrough"
      className="max-w-xl"
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
              <h3 className="text-lg font-medium mb-3">{t.heroTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.heroText}</p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <VideoDialogHeroDemo />
              </div>
              <CodeBlock className="mt-4">{`<div className="grid items-center gap-6 sm:grid-cols-2">
  <div>
    <h3 className="text-2xl font-semibold">See it in two minutes</h3>
    <p className="text-muted-foreground">A short tour of the editor.</p>
  </div>
  <VideoDialog
    src="/videos/walkthrough.mp4"
    poster="/videos/walkthrough-poster.jpg"
    labels={{ play: "Play the walkthrough", close: "Close video" }}
    className="aspect-[4/3] rounded-2xl shadow-lg"
  />
</div>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.eventsTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.eventsText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <VideoDialogEventsDemo />
              </div>
              <CodeBlock className="mt-4">{`<VideoDialog
  src="/videos/walkthrough.mp4"
  poster="/videos/walkthrough-poster.jpg"
  restartOnOpen
  onOpenChange={(open) => console.log(open ? "opened" : "closed")}
/>`}</CodeBlock>
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
