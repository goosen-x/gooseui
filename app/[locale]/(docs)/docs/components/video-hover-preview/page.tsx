import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  VideoHoverPreviewClickOnlyDemo,
  VideoHoverPreviewDemo,
  VideoHoverPreviewLandscapeDemo,
  VideoHoverPreviewLanguagesDemo,
} from "./video-hover-preview-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  description:
    "Video card: muted preview with captions on hover, sound on click",
  intro:
    "A video card with a poster, made for video testimonials. On hover or keyboard focus the clip plays muted and the captions run over the picture, so the viewer gets the point without sound. A click turns the sound on, a second click pauses. Only one video plays on the page at a time: a shared module-level registry pauses the previous one. It is a client component with no dependencies. Captions are plain .vtt files, the cues are drawn by the component itself, so they are never clipped by the rounded card and look the same in every browser.",
  browserSupport: "Browser Support",
  captionsSupport:
    "Reads the cues of a .vtt file through TextTrack and its cuechange event.",
  preview: "Preview",
  previewHint:
    "Hover a card: the clip plays muted with captions. Click it to turn the sound on, click again to pause. The CC button switches the caption language. Start another card and the first one stops.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  landscapeTitle: "Landscape previews without captions",
  landscapeText:
    "The default 16/9 card with a custom overlay in children. Without captions there is no CC button, and the native controls appear after the click.",
  languagesTitle: "Several caption languages",
  languagesText:
    'Pass one entry per language. The CC button cycles through the languages and then switches captions off; the track with default starts selected. controls="custom" replaces the native bar with play, sound, captions and a seek line.',
  clickTitle: "Click only",
  clickText:
    "hoverPreview={false} turns off the muted preview: the poster stays until the click.",
  captionsTitle: "Captions files",
  captionsText:
    "A regular WebVTT file. Cue text may contain line breaks; tags such as <b> are stripped.",
  featureList: [
    [
      "One at a time",
      "starting any card pauses the one that was playing, including through native controls",
    ],
    [
      "Touch screens",
      "hover is ignored for touch, a tap starts playback with sound",
    ],
    [
      "Keyboard",
      "focus with Tab starts the muted preview, Enter plays with sound, then Space pauses, arrows seek, M mutes, C switches captions",
    ],
    [
      "Pauses off screen",
      "an IntersectionObserver stops the video when the card scrolls away",
    ],
    [
      "Reduced motion",
      "no muted preview on hover or focus, the video starts only on click",
    ],
  ],
  features: "Features",
  p: {
    src: "Video URL",
    poster: "Poster shown before playback",
    children: "Overlay over the poster: caption, duration, badge",
    hoverPreview: "Play muted on mouse hover and keyboard focus",
    labels:
      "Accessible names: play, pause, mute, unmute, captions, captionsOff, seek",
    videoClassName: "Classes for the video element",
    onModeChange:
      "Called when the card switches between idle, preview and playing",
    captions:
      "WebVTT tracks: src, srclang, label and optional default. Cues are drawn over the video, muted or not",
    aspect: "Card ratio. Any other ratio goes through className",
    name: "Person name at the top of the card",
    role: "Role or company under the name",
    quote: "Short quote at the bottom of the card until playback starts",
    controls:
      "Controls after the click: the browser bar or ours (play, sound, captions, seek)",
    hasAudio:
      "Whether the video has sound. Detected by default and the sound button stays hidden until known or when there is none; set it to skip the detection",
    className: "Card classes",
  },
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Карточка видео: превью без звука с субтитрами при наведении, звук по клику",
    intro:
      "Карточка видео с постером, сделанная для видеоотзывов. При наведении или фокусе с клавиатуры ролик играет без звука, а поверх картинки идут субтитры: смысл понятен и без звука. Клик включает звук, повторный клик ставит на паузу. Одновременно на странице играет только одно видео: общий реестр на уровне модуля ставит предыдущее на паузу. Это клиентский компонент без зависимостей. Субтитры лежат в обычных .vtt-файлах, реплики рисует сам компонент, поэтому их не обрезает скруглённая карточка и они выглядят одинаково во всех браузерах.",
    browserSupport: "Поддержка браузеров",
    captionsSupport:
      "Читает реплики .vtt-файла через TextTrack и его событие cuechange.",
    preview: "Превью",
    previewHint:
      "Наведите на карточку: ролик играет без звука, идут субтитры. Клик включает звук, ещё один клик ставит на паузу. Кнопка CC переключает язык субтитров. Запустите другую карточку, и первая остановится.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    landscapeTitle: "Горизонтальные превью без субтитров",
    landscapeText:
      "Карточка 16/9 по умолчанию со своим слоем в children. Без captions кнопки CC нет, а после клика появляются стандартные контролы.",
    languagesTitle: "Несколько языков субтитров",
    languagesText:
      'Передайте по записи на язык. Кнопка CC перебирает языки, затем выключает субтитры; дорожка с default выбрана сразу. controls="custom" заменяет стандартную панель на свою: пауза, звук, субтитры и полоса перемотки.',
    clickTitle: "Только по клику",
    clickText:
      "hoverPreview={false} отключает превью без звука: постер висит до клика.",
    captionsTitle: "Файлы субтитров",
    captionsText:
      "Обычный WebVTT. Текст реплики может содержать переносы строк; теги вроде <b> вырезаются.",
    featureList: [
      [
        "Одно видео за раз",
        "запуск любой карточки ставит на паузу ту, что играла, даже если её включили через контролы",
      ],
      [
        "Сенсорные экраны",
        "наведение для касаний не учитывается, тап сразу включает видео со звуком",
      ],
      [
        "Клавиатура",
        "фокус по Tab запускает превью без звука, Enter включает со звуком, дальше пробел ставит на паузу, стрелки перематывают, M выключает звук, C переключает субтитры",
      ],
      [
        "Пауза вне экрана",
        "IntersectionObserver останавливает видео, когда карточка уходит из вида",
      ],
      [
        "Reduced motion",
        "превью при наведении и фокусе не запускается, видео играет только по клику",
      ],
    ],
    features: "Возможности",
    p: {
      src: "Адрес видео",
      poster: "Постер до начала воспроизведения",
      children: "Слой поверх постера: подпись, длительность, бейдж",
      hoverPreview: "Играть без звука при наведении мыши и фокусе с клавиатуры",
      labels:
        "Доступные имена: play, pause, mute, unmute, captions, captionsOff, seek",
      videoClassName: "Классы для элемента video",
      onModeChange: "Вызывается при переходе между idle, preview и playing",
      captions:
        "Дорожки WebVTT: src, srclang, label и необязательный default. Реплики рисуются поверх видео, со звуком и без",
      aspect: "Пропорции карточки. Любые другие задаются через className",
      name: "Имя человека вверху карточки",
      role: "Должность или компания под именем",
      quote: "Короткая цитата внизу карточки, пока видео не запущено",
      controls:
        "Контролы после клика: стандартная панель браузера или своя (пауза, звук, субтитры, перемотка)",
      hasAudio:
        "Есть ли у видео звук. По умолчанию определяется само, кнопка звука скрыта, пока ответ неизвестен или звука нет; задайте, чтобы не определять",
      className: "Классы карточки",
    },
  },
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Video Hover Preview", description: t.description }
}

export default async function VideoHoverPreviewPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]

  const toc = [
    { id: "browser-support", title: t.browserSupport, level: 2 },
    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "examples", title: t.examples, level: 2 },
    { id: "props", title: locale === "ru" ? "Пропсы" : "Props", level: 2 },
    { id: "features", title: t.features, level: 2 },
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Video Hover Preview" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[{ featureId: "webvtt", description: t.captionsSupport }]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <VideoHoverPreviewDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/video-hover-preview" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { VideoHoverPreview } from "@/components/ui/video-hover-preview"

const reviews = [
  {
    slug: "elena-marsh",
    name: "Elena Marsh",
    role: "Head of product design",
    quote: "Three months later I lead the whole design team.",
  },
  // ...
]

export default function Example() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {reviews.map((review) => (
        <VideoHoverPreview
          key={review.slug}
          src={\`/videos/\${review.slug}.mp4\`}
          poster={\`/videos/\${review.slug}.webp\`}
          aspect="9/16"
          controls="custom"
          captions={[
            { src: \`/videos/\${review.slug}.en.vtt\`, srclang: "en", label: "English", default: true },
            { src: \`/videos/\${review.slug}.ru.vtt\`, srclang: "ru", label: "Русский" },
          ]}
          name={review.name}
          role={review.role}
          quote={review.quote}
          className="rounded-2xl"
        />
      ))}
    </div>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.landscapeTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.landscapeText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <VideoHoverPreviewLandscapeDemo />
              </div>
              <CodeBlock className="mt-4">{`<VideoHoverPreview
  src="/videos/mountains.mp4"
  poster="/videos/mountains.webp"
  labels={{ play: "Play video: Mountain ridge" }}
>
  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-10 text-sm text-white">
    Mountain ridge
  </div>
</VideoHoverPreview>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.languagesTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.languagesText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <VideoHoverPreviewLanguagesDemo />
              </div>
              <CodeBlock className="mt-4">{`<VideoHoverPreview
  src="/videos/sofia-reyes.mp4"
  poster="/videos/sofia-reyes.webp"
  aspect="9/16"
  controls="custom"
  captions={[
    { src: "/videos/sofia-reyes.en.vtt", srclang: "en", label: "English", default: true },
    { src: "/videos/sofia-reyes.ru.vtt", srclang: "ru", label: "Русский" },
  ]}
  name="Sofia Reyes"
  role="Marketing manager"
  labels={{ captions: "Captions", captionsOff: "off" }}
/>`}</CodeBlock>
              <h4 className="text-sm font-medium mt-6 mb-2">
                {t.captionsTitle}
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                {t.captionsText}
              </p>
              <CodeBlock>{`WEBVTT

1
00:00.400 --> 00:03.200
The lessons are short, so I could
study between meetings.

2
00:03.400 --> 00:07.000
I took the checklists straight
into my campaigns.`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.clickTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.clickText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <VideoHoverPreviewClickOnlyDemo />
              </div>
              <CodeBlock className="mt-4">{`<VideoHoverPreview
  src="/videos/layers.mp4"
  poster="/videos/layers.jpg"
  hoverPreview={false}
/>`}</CodeBlock>
            </div>
          </div>
        </div>

        <DocsPropsTable
          props={[
            { name: "src", type: "string", description: t.p.src },
            { name: "poster", type: "string", description: t.p.poster },
            { name: "children", type: "ReactNode", description: t.p.children },
            {
              name: "captions",
              type: "{ src: string; srclang: string; label: string; default?: boolean }[]",
              description: t.p.captions,
            },
            {
              name: "aspect",
              type: '"16/9" | "9/16" | "4/5" | "1/1"',
              default: '"16/9"',
              description: t.p.aspect,
            },
            { name: "name", type: "ReactNode", description: t.p.name },
            { name: "role", type: "ReactNode", description: t.p.role },
            { name: "quote", type: "ReactNode", description: t.p.quote },
            {
              name: "controls",
              type: '"native" | "custom"',
              default: '"native"',
              description: t.p.controls,
            },
            {
              name: "hasAudio",
              type: "boolean",
              default: "detected",
              description: t.p.hasAudio,
            },
            {
              name: "hoverPreview",
              type: "boolean",
              default: "true",
              description: t.p.hoverPreview,
            },
            {
              name: "labels",
              type: "{ play?: string; pause?: string; mute?: string; unmute?: string; captions?: string; captionsOff?: string; seek?: string }",
              default: "English texts",
              description: t.p.labels,
            },
            {
              name: "videoClassName",
              type: "string",
              description: t.p.videoClassName,
            },
            {
              name: "onModeChange",
              type: '(mode: "idle" | "preview" | "playing") => void',
              description: t.p.onModeChange,
            },
            { name: "className", type: "string", description: t.p.className },
          ]}
        />

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
