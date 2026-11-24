import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  CarouselAutoPlay,
  CarouselDemo,
  CarouselMultiple,
  CarouselThumbnailsBottom,
  CarouselThumbnailsLeft,
  CarouselVertical,
  CarouselWithLines,
  CarouselWithNumbers,
  CarouselWithProgress,
} from "./carousel-demo"

const en = {
  auditFeature0Description: "Aligns items while scrolling",
  auditFeature1Description: "Tracks the current scroll target",
  auditFeature2Description: "Creates scroll controls",
  auditFeature3Description: "Adapts controls to JavaScript availability",
  auditFeature4Description: "Colors the CSS scroll buttons",
  auditFeature5Description: "Hides the scrollbar",
  auditFeature6Description: "Contains scroll gestures",
  description:
    "Carousel on CSS scroll-snap with dot and thumbnail links that work without JavaScript",
  intro:
    "A server-rendered carousel on native CSS scroll-snap. Slides swipe and snap by themselves, the dots and image thumbnails are links to the slides, and the focused track scrolls with the arrow keys, all without JavaScript. A client script of about 1 kB enables the arrow buttons, marks the active dot, updates the counter and progress bar and runs auto-play.",
  browserSupport: "Browser Support",
  supportDescription0: "Snaps scrolling to each slide.",
  supportDescription1: "Highlights the current slide dot.",
  supportDescription2: "Provides native scroll arrows.",
  supportDescription3: "Hides controls when JavaScript is disabled.",
  browserSupportText:
    "Swiping and snapping need only scroll-snap. Where scroll-target-group is supported, the browser highlights the dot of the visible slide even without JavaScript. Without JavaScript the arrow buttons stay disabled and the counter and progress bar hide (scripting media query); browsers with ::scroll-button draw native arrows in their place.",
  preview: "Preview",
  previewHint:
    "Swipe, click the dots, or focus the slides and use the arrow keys.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  withProgressBar: "With Progress Bar",
  numberIndicators: "Number Indicators",
  lineIndicators: "Line Indicators",
  multipleItems: "Multiple Items",
  autoPlayWithLoop: "Auto-Play with Loop",
  autoPlayText:
    "Auto-play pauses on hover and on keyboard focus and does not start when the user prefers reduced motion.",
  vertical: "Vertical",
  thumbnails: "Thumbnails",
  thumbnailsIntro:
    "CarouselThumbnails adds a strip of image links under, left or right of the slides, the way product galleries do. Each thumbnail is a link to its slide, so it works without JavaScript. The client script marks the active thumbnail and keeps it in view as the strip scrolls. With a single slide the strip is not rendered.",
  thumbnailsBottom: "Product gallery",
  thumbnailsLeft: "Vertical strip on the left",
  thumbnailsLeftText:
    "The strip takes the height of the slides and scrolls on its own when there are more thumbnails than fit.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  p: {
    orientation: "Scroll direction",
    loop: "Arrows jump from the last slide to the first and back",
    autoPlay: "Auto-play interval in ms, 0 turns it off",
    pauseOnHover: "Pause auto-play while the pointer is over the carousel",
    draggable: "Kept for compatibility, has no effect",
    size: "Item width",
    iconSize: "Size of the default chevron icon",
    children: "Custom button content instead of the chevron",
    variant: "Indicator style",
    slideLabel: "Accessible name of each dot or thumbnail link",
    images:
      "One entry per slide: src, alt and an optional smaller thumbnail image",
    position: "Where the strip sits, left and right make it vertical",
  },
  features: "Features",
  featureList: [
    [
      "Server component",
      "markup and dots are rendered on the server, only the controller is client code",
    ],
    ["CSS Scroll Snap", "native swipe and snapping, no scroll math in JS"],
    ["Dot links", "every dot is an anchor to its slide and works without JS"],
    ["Keyboard", "the track is focusable, arrow keys scroll it"],
    ["Indicators", "dots, lines, numbers, progress bar and counter"],
    [
      "Thumbnails",
      "image strip below or beside the slides, replaces a separate gallery component",
    ],
    [
      "Reduced motion",
      "smooth scrolling and auto-play are off when the user asks for less motion",
    ],
  ],
  migration: "Migration",
  migrationList: [
    "useCarousel is removed: Carousel is a server component now and has no React context",
    "Dots are links with aria-current instead of tab buttons",
    "Dots, progress and counter must sit inside Carousel or inside plain elements in it",
    "draggable no longer does anything (it was a no-op before as well)",
    "Thumbnail Gallery is merged into Carousel: use CarouselThumbnails with images and position instead of ThumbnailGallery",
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    auditFeature0Description: "Выравнивает элементы при прокрутке",
    auditFeature1Description: "Определяет текущий элемент прокрутки",
    auditFeature2Description: "Создаёт кнопки прокрутки",
    auditFeature3Description: "Меняет управление в зависимости от JavaScript",
    auditFeature4Description: "Окрашивает CSS-кнопки прокрутки",
    auditFeature5Description: "Скрывает полосу прокрутки",
    auditFeature6Description: "Ограничивает передачу прокрутки",
    description:
      "Карусель на CSS scroll-snap, точки и миниатюры-ссылки работают без JavaScript",
    intro:
      "Карусель рендерится на сервере и держится на нативном CSS scroll-snap. Слайды листаются свайпом и сами встают на место, точки и миниатюры это ссылки на слайды, а ленту в фокусе можно листать стрелками на клавиатуре, и всё это без JavaScript. Клиентский скрипт размером около 1 кБ включает кнопки-стрелки, отмечает активную точку, обновляет счётчик и прогресс-бар и запускает автопрокрутку.",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Привязывает прокрутку к слайдам.",
    supportDescription1: "Подсвечивает точку текущего слайда.",
    supportDescription2: "Добавляет нативные стрелки прокрутки.",
    supportDescription3: "Скрывает элементы управления без JavaScript.",
    browserSupportText:
      "Свайпу и привязке нужен только scroll-snap. Там, где есть scroll-target-group, браузер сам подсвечивает точку видимого слайда, даже без JavaScript. Без JavaScript кнопки-стрелки остаются неактивными, а счётчик и прогресс-бар скрываются (медиазапрос scripting); браузеры с ::scroll-button рисуют вместо них нативные стрелки.",
    preview: "Превью",
    previewHint:
      "Листайте свайпом, нажимайте на точки или поставьте фокус на слайды и листайте стрелками.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    withProgressBar: "С прогресс-баром",
    numberIndicators: "Индикаторы-цифры",
    lineIndicators: "Индикаторы-линии",
    multipleItems: "Несколько элементов",
    autoPlayWithLoop: "Автопрокрутка с зацикливанием",
    autoPlayText:
      "Автопрокрутка встаёт на паузу при наведении и при фокусе с клавиатуры и не запускается, если пользователь просит меньше движения.",
    vertical: "Вертикальная",
    thumbnails: "Миниатюры",
    thumbnailsIntro:
      "CarouselThumbnails добавляет ленту картинок-ссылок под слайдами, слева или справа, как в галереях товаров. Каждая миниатюра это ссылка на свой слайд, поэтому она работает без JavaScript. Клиентский скрипт отмечает активную миниатюру и подкручивает ленту так, чтобы она оставалась в поле зрения. Если слайд один, лента не рисуется.",
    thumbnailsBottom: "Галерея товара",
    thumbnailsLeft: "Вертикальная лента слева",
    thumbnailsLeftText:
      "Лента берёт высоту слайдов и прокручивается сама, если миниатюр больше, чем помещается.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    p: {
      orientation: "Направление прокрутки",
      loop: "Стрелки переходят с последнего слайда на первый и обратно",
      autoPlay: "Интервал автопрокрутки в мс, 0 выключает её",
      pauseOnHover: "Пауза автопрокрутки, пока курсор над каруселью",
      draggable: "Оставлен для совместимости, ни на что не влияет",
      size: "Ширина элемента",
      iconSize: "Размер стандартной иконки-шеврона",
      children: "Своё содержимое кнопки вместо шеврона",
      variant: "Стиль индикатора",
      slideLabel: "Доступное имя каждой точки или миниатюры",
      images:
        "По записи на каждый слайд: src, alt и необязательная уменьшенная картинка thumbnail",
      position: "Где стоит лента, left и right делают её вертикальной",
    },
    features: "Возможности",
    featureList: [
      [
        "Серверный компонент",
        "разметка и точки рендерятся на сервере, на клиенте только контроллер",
      ],
      [
        "CSS Scroll Snap",
        "нативный свайп и привязка, никакой математики прокрутки в JS",
      ],
      ["Точки-ссылки", "каждая точка ведёт на свой слайд и работает без JS"],
      ["Клавиатура", "лента получает фокус, стрелки её листают"],
      ["Индикаторы", "точки, линии, цифры, прогресс-бар и счётчик"],
      [
        "Миниатюры",
        "лента картинок под слайдами или сбоку, заменяет отдельный компонент галереи",
      ],
      [
        "Меньше движения",
        "плавная прокрутка и автопрокрутка выключаются, если пользователь просит меньше движения",
      ],
    ],
    migration: "Переход со старой версии",
    migrationList: [
      "useCarousel удалён: Carousel теперь серверный компонент и не держит React-контекст",
      "Точки стали ссылками с aria-current вместо кнопок-вкладок",
      "Точки, прогресс и счётчик должны лежать внутри Carousel или внутри обычных элементов в нём",
      "draggable больше ни на что не влияет (раньше тоже не влиял)",
      "Thumbnail Gallery влит в Carousel: вместо ThumbnailGallery используйте CarouselThumbnails с images и position",
    ],
  },
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return {
    title: "Carousel",
    description: t.description,
  }
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
const preview = "rounded-lg bg-muted/30 px-4 py-8"

function PropsTable({
  title,
  rows,
  t,
}: {
  title: string
  rows: [string, string, string, string][]
  t: (typeof content)[Locale]
}) {
  return (
    <>
      <h3 className="mt-6 text-lg font-medium">{title}</h3>
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[500px] text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left font-medium">{t.headers.prop}</th>
              <th className="p-3 text-left font-medium">{t.headers.type}</th>
              <th className="p-3 text-left font-medium">{t.headers.default}</th>
              <th className="p-3 text-left font-medium">
                {t.headers.description}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([name, type, def, description]) => (
              <tr key={name} className="border-t">
                <td className="p-3 font-mono text-xs">{name}</td>
                <td className="p-3 font-mono text-xs">{type}</td>
                <td className="p-3 font-mono text-xs">{def}</td>
                <td className="p-3">{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default async function CarouselPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
  const toc = [
    { id: "browser-support", title: t.browserSupport, level: 2 },

    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "examples", title: t.examples, level: 2 },
    { id: "thumbnails", title: t.thumbnails, level: 2 },
    { id: "props", title: t.props, level: 2 },
    { id: "features", title: t.features, level: 2 },
    { id: "migration", title: t.migration, level: 2 },
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Carousel" />
        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "scroll-snap",
              description: t.auditFeature0Description,
            },
            {
              featureId: "scroll-target-group",
              description: t.auditFeature1Description,
            },
            {
              featureId: "scroll-buttons",
              description: t.auditFeature2Description,
            },
            {
              featureId: "scripting",
              description: t.auditFeature3Description,
            },
            {
              featureId: "color-mix",
              description: t.auditFeature4Description,
            },
            {
              featureId: "scrollbar-width",
              description: t.auditFeature5Description,
            },
            {
              featureId: "overscroll-behavior",
              description: t.auditFeature6Description,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className={preview}>
            <CarouselDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/carousel" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import {
  Carousel,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "@/components/ui/carousel"

export default function Example() {
  return (
    <Carousel>
      <CarouselItem>Slide 1</CarouselItem>
      <CarouselItem>Slide 2</CarouselItem>
      <CarouselItem>Slide 3</CarouselItem>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-lg font-medium">{t.withProgressBar}</h3>
              <div className={preview}>
                <CarouselWithProgress />
              </div>
              <CodeBlock className="mt-4">{`<Carousel>
  {items.map((item) => (
    <CarouselItem key={item.id}>{item.content}</CarouselItem>
  ))}
  <CarouselPrevious />
  <CarouselNext />
  <div className="mt-4 space-y-2">
    <CarouselProgress />
    <CarouselCounter />
  </div>
</Carousel>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.numberIndicators}</h3>
              <div className={preview}>
                <CarouselWithNumbers />
              </div>
              <CodeBlock className="mt-4">{`<CarouselDots variant="numbers" />`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.lineIndicators}</h3>
              <div className={preview}>
                <CarouselWithLines />
              </div>
              <CodeBlock className="mt-4">{`<CarouselDots variant="line" />`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.multipleItems}</h3>
              <div className={preview}>
                <CarouselMultiple />
              </div>
              <CodeBlock className="mt-4">{`<CarouselItem size="1/3">
  {/* Shows 3 items at once */}
</CarouselItem>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.autoPlayWithLoop}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.autoPlayText}
              </p>
              <div className={preview}>
                <CarouselAutoPlay />
              </div>
              <CodeBlock className="mt-4">{`<Carousel autoPlay={3000} loop>
  {/* Auto-advances every 3 seconds */}
</Carousel>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.vertical}</h3>
              <div className={preview}>
                <CarouselVertical />
              </div>
              <CodeBlock className="mt-4">{`<Carousel orientation="vertical" className="h-[400px]">
  {/* Vertical scrolling */}
</Carousel>`}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="thumbnails" className={h2}>
            {t.thumbnails}
          </h2>
          <p className="text-sm text-muted-foreground">{t.thumbnailsIntro}</p>

          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-lg font-medium">{t.thumbnailsBottom}</h3>
              <div className={preview}>
                <CarouselThumbnailsBottom />
              </div>
              <CodeBlock className="mt-4">{`const images = [
  { src: "/photos/1.webp", thumbnail: "/photos/1-thumb.webp", alt: "Front view" },
  { src: "/photos/2.webp", thumbnail: "/photos/2-thumb.webp", alt: "Side view" },
  { src: "/photos/3.webp", thumbnail: "/photos/3-thumb.webp", alt: "Back view" },
]

<Carousel>
  {images.map((image) => (
    <CarouselItem key={image.src}>
      <img src={image.src} alt={image.alt} className="aspect-[4/3] w-full rounded-xl object-cover" />
    </CarouselItem>
  ))}
  <CarouselPrevious />
  <CarouselNext />
  <CarouselThumbnails images={images} />
</Carousel>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.thumbnailsLeft}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.thumbnailsLeftText}
              </p>
              <div className={preview}>
                <CarouselThumbnailsLeft />
              </div>
              <CodeBlock className="mt-4">{`<Carousel>
  {/* slides */}
  <CarouselThumbnails images={images} position="left" />
</Carousel>`}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="props" className={h2}>
            {t.props}
          </h2>
          <PropsTable
            title="Carousel"
            t={t}
            rows={[
              [
                "orientation",
                '"horizontal" | "vertical"',
                '"horizontal"',
                t.p.orientation,
              ],
              ["loop", "boolean", "false", t.p.loop],
              ["autoPlay", "number", "0", t.p.autoPlay],
              ["pauseOnHover", "boolean", "true", t.p.pauseOnHover],
              ["draggable", "boolean", "-", t.p.draggable],
            ]}
          />
          <PropsTable
            title="CarouselItem"
            t={t}
            rows={[
              [
                "size",
                '"full" | "1/2" | "1/3" | "1/4" | "auto"',
                '"full"',
                t.p.size,
              ],
            ]}
          />
          <PropsTable
            title="CarouselPrevious / CarouselNext"
            t={t}
            rows={[
              ["iconSize", "number", "16", t.p.iconSize],
              ["children", "ReactNode", "-", t.p.children],
            ]}
          />
          <PropsTable
            title="CarouselThumbnails"
            t={t}
            rows={[
              [
                "images",
                "{ src: string; alt?: string; thumbnail?: string }[]",
                "-",
                t.p.images,
              ],
              [
                "position",
                '"bottom" | "left" | "right"',
                '"bottom"',
                t.p.position,
              ],
              [
                "slideLabel",
                "(index: number) => string",
                "Go to slide N",
                t.p.slideLabel,
              ],
            ]}
          />
          <PropsTable
            title="CarouselDots"
            t={t}
            rows={[
              ["variant", '"dots" | "line" | "numbers"', '"dots"', t.p.variant],
              [
                "slideLabel",
                "(index: number) => string",
                "Go to slide N",
                t.p.slideLabel,
              ],
            ]}
          />
        </div>

        <div className="space-y-4">
          <h2 id="features" className={h2}>
            {t.features}
          </h2>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            {t.featureList.map(([title, text]) => (
              <li key={title}>
                <strong className="text-foreground">{title}</strong>: {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h2 id="migration" className={h2}>
            {t.migration}
          </h2>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            {t.migrationList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </DocsPage>
  )
}
