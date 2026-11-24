import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  VideoSyncedStepsControlledDemo,
  VideoSyncedStepsDemo,
  VideoSyncedStepsStackDemo,
} from "./video-synced-steps-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  description: "Looping video with a step list that follows playback",
  intro:
    "A muted looping video next to a list of steps. The current step is highlighted from the video's currentTime, a progress bar runs inside it, and a click on any step seeks the video there. Works well for short how-to clips. It is a client component with no dependencies: JavaScript reads the video time and writes the progress into one CSS variable, the rest is styling.",
  preview: "Preview",
  previewHint: "Click a step to jump to it.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  stackTitle: "Stacked layout",
  stackText:
    'layout="stack" puts the video above the list. Handy for narrow columns and wide videos.',
  controlledTitle: "Paused start and step events",
  controlledText:
    "autoPlay={false} waits for the user. onStepChange reports the active step, for example to sync other UI.",
  props: "Props",
  propsHeaders: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  propDesc: {
    src: "Video URL",
    poster: "Poster shown before the video loads",
    steps: "Steps: title, optional description and start second",
    layout: "Video next to the list or above it",
    autoPlay: "Play automatically while the block is on screen",
    videoClassName: "Classes for the video element, e.g. aspect ratio",
    labels: "Texts for the play button and the list name",
    onStepChange: "Called with the index of the new active step",
    className: "Additional CSS classes",
  },
  features: "Features",
  featureList: [
    [
      "Synced by time",
      "the active step is taken from currentTime on every frame while playing",
    ],
    [
      "Seek on click",
      "every step is a button that rewinds the video to its start",
    ],
    [
      "Pauses off screen",
      "an IntersectionObserver stops the video when it scrolls away",
    ],
    [
      "Pause button",
      "the user can stop the motion; with reduced motion the video starts paused",
    ],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description: "Зацикленное видео и шаги, которые следят за роликом",
    intro:
      "Зацикленное видео без звука и список шагов рядом. Текущий шаг подсвечивается по currentTime ролика, внутри него бежит полоса прогресса, а клик по шагу перематывает видео на его начало. Хорошо подходит для коротких роликов-инструкций. Это клиентский компонент без зависимостей: JavaScript читает время ролика и пишет прогресс в одну CSS-переменную, остальное делают стили.",
    preview: "Превью",
    previewHint: "Нажмите на шаг, чтобы перейти к нему.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    stackTitle: "Видео над списком",
    stackText:
      'layout="stack" ставит видео над списком. Удобно в узкой колонке и для горизонтальных роликов.',
    controlledTitle: "Старт на паузе и события шагов",
    controlledText:
      "С autoPlay={false} видео ждёт пользователя. onStepChange сообщает активный шаг, например чтобы синхронизировать другой интерфейс.",
    props: "Пропсы",
    propsHeaders: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    propDesc: {
      src: "Адрес видео",
      poster: "Постер, пока видео не загрузилось",
      steps: "Шаги: заголовок, описание по желанию и секунда начала",
      layout: "Видео рядом со списком или над ним",
      autoPlay: "Запускать само, пока блок виден на экране",
      videoClassName: "Классы для элемента video, например пропорции",
      labels: "Тексты кнопки воспроизведения и название списка",
      onStepChange: "Вызывается с индексом нового активного шага",
      className: "Дополнительные CSS-классы",
    },
    features: "Возможности",
    featureList: [
      [
        "Синхронизация по времени",
        "активный шаг берётся из currentTime на каждом кадре, пока видео играет",
      ],
      [
        "Перемотка по клику",
        "каждый шаг сделан кнопкой, она отматывает видео к началу шага",
      ],
      [
        "Пауза вне экрана",
        "IntersectionObserver останавливает видео, когда блок уходит из вида",
      ],
      [
        "Кнопка паузы",
        "движение можно остановить; при reduced motion видео стартует на паузе",
      ],
    ],
  },
}

const propRows: [keyof typeof en.propDesc, string, string][] = [
  ["src", "string", "-"],
  ["poster", "string", "-"],
  [
    "steps",
    "{ title: ReactNode; description?: ReactNode; start: number }[]",
    "-",
  ],
  ["layout", '"side" | "stack"', '"side"'],
  ["autoPlay", "boolean", "true"],
  ["videoClassName", "string", "-"],
  ["labels", "{ play?: string; pause?: string; steps?: string }", "-"],
  ["onStepChange", "(index: number) => void", "-"],
  ["className", "string", "-"],
]

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Video Synced Steps", description: t.description }
}

export default async function VideoSyncedStepsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]

  const toc = [
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
        <DocsPageNav title="Video Synced Steps" />

        <p className="text-muted-foreground">{t.intro}</p>

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <VideoSyncedStepsDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/video-synced-steps" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { VideoSyncedSteps } from "@/components/ui/video-synced-steps"

const steps = [
  { title: "Open the editor", description: "Pick a project.", start: 0 },
  { title: "Choose a template", start: 3.5 },
  { title: "Adjust the details", start: 7 },
  { title: "Publish", start: 10.5 },
]

export default function Example() {
  return (
    <VideoSyncedSteps
      src="/videos/how-to.mp4"
      poster="/videos/how-to-poster.jpg"
      steps={steps}
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
              <h3 className="text-lg font-medium mb-3">{t.stackTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.stackText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <VideoSyncedStepsStackDemo />
              </div>
              <CodeBlock className="mt-4">{`<VideoSyncedSteps
  src="/videos/how-to.mp4"
  steps={steps}
  layout="stack"
  className="max-w-sm"
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.controlledTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.controlledText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <VideoSyncedStepsControlledDemo />
              </div>
              <CodeBlock className="mt-4">{`const [index, setIndex] = useState(0)

<VideoSyncedSteps
  src="/videos/how-to.mp4"
  steps={steps}
  autoPlay={false}
  onStepChange={setIndex}
  labels={{ play: "Play", pause: "Pause", steps: "How it works" }}
/>
<p>Current step: {index + 1}</p>`}</CodeBlock>
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
