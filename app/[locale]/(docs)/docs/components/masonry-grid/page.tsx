import { MapPin, Pin } from "lucide-react"
import { setRequestLocale } from "next-intl/server"
import type { CSSProperties } from "react"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { MasonryGrid, MasonryItem } from "@/registry/gooseui/ui/masonry-grid"

type Props = { params: Promise<{ locale: string }> }

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

const en = {
  description: "Masonry layout on CSS Grid Lanes with a multi-column fallback",
  intro:
    "A Pinterest-style layout for cards of different heights. Where the browser supports CSS Grid Lanes (display: grid-lanes), items go left to right into the shortest lane. Everywhere else the same markup falls back to multi-column layout. The browser picks the mode through @supports, so the component is a server component with no JavaScript at all.",
  browserSupport: "Browser Support",
  supportGridLanes:
    "Places items left to right into the shortest lane. Without it, the grid falls back to multi-column layout.",
  supportMulticol:
    "The fallback: items fill each column from top to bottom, so the reading order goes down the columns.",
  preview: "Preview",
  previewHint:
    "Numbers show the source order. With grid-lanes they run left to right, in the fallback they run down each column.",
  modeLabel: "Active mode in your browser:",
  modeLanes: "grid-lanes",
  modeColumns: "columns fallback",
  photosLabel: "Travel photos",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  notesTitle: "Notes wall",
  notesText:
    "Text cards of very different lengths: the classic case for masonry. gap accepts any CSS length.",
  columnsTitle: "Always columns",
  columnsText:
    'layout="columns" keeps the multi-column layout even where Grid Lanes is available, for example when the top-to-bottom order matters more than an even bottom edge.',
  narrowTitle: "Narrow columns, wide gap",
  narrowText:
    "minColumnWidth sets the narrowest column. The number of columns follows the container width.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  pMin: "Narrowest a column may get, in px. Columns stretch to fill the row",
  pGap: "Space between items: number in px or any CSS length",
  pLayout:
    "auto picks Grid Lanes where supported, columns always uses multi-column layout",
  pAs: 'Rendered element, for example ul together with MasonryItem as="li"',
  pClassName: "Additional CSS classes",
  components: "Components",
  componentHeader: "Component",
  cGrid: "The container. Every direct child becomes a masonry item",
  cItem:
    "Optional wrapper for one item: data-slot, block display and as (div, li, article, figure)",
  features: "Features",
  featureList: [
    [
      "No JavaScript",
      "the layout is chosen in CSS through @supports, so it is ready on the first paint and never shifts after hydration",
    ],
    [
      "Semantic lists",
      'as="ul" with MasonryItem as="li" keeps list semantics for screen readers',
    ],
    [
      "Tolerance",
      "set --masonry-tolerance to tune how eagerly Grid Lanes keeps the source order (1em by default)",
    ],
    [
      "Overridable",
      "the styles sit in @layer components, so Tailwind classes on the grid win",
    ],
  ],
  photos: [
    ["Fog over Lake Bled", "Slovenia"],
    ["Tram 28 at dusk", "Lisbon"],
    ["Basalt columns", "Reynisfjara, Iceland"],
    ["Tea terraces", "Munnar, India"],
    ["Night market", "Taipei"],
    ["Dune ridge", "Sossusvlei, Namibia"],
    ["Glacier cave", "Vatnajökull, Iceland"],
    ["Lavender rows", "Valensole, France"],
    ["Harbor cranes", "Rotterdam"],
    ["Rice paddies", "Bali"],
    ["Old town roofs", "Dubrovnik"],
    ["Aurora", "Tromsø, Norway"],
  ],
  notes: [
    [
      "Priya",
      "Retro action: move standup to 9:45 so the Berlin folks can join without skipping breakfast.",
    ],
    ["Marco", "Ship the CSV export behind a flag first."],
    [
      "Lena",
      "Customer interview takeaways: onboarding checklist is loved, but nobody finds the team invite link. Three out of five people asked where to add colleagues. Put it on the empty state of the members page and in the welcome email.",
    ],
    ["Tom", "Who owns the staging certificate renewal? It expires Dec 3."],
    [
      "Aiko",
      "Design QA pass done for settings. Remaining: dark mode contrast on disabled inputs, focus ring on the avatar picker.",
    ],
    ["Sam", "Pizza Friday is back. Vote for toppings in #office by Thursday."],
    [
      "Jonas",
      "Postmortem draft for Tuesday's queue backlog is in the wiki. Root cause: retry storm after the DNS blip. Proposed fix: jittered backoff plus a circuit breaker on the webhook worker.",
    ],
    ["Priya", "Q1 OKR doc needs comments by Friday."],
    [
      "Marco",
      "Bundle size dropped 38 KB after removing the date library. Thanks Lena for the Temporal polyfill idea.",
    ],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Masonry-раскладка на CSS Grid Lanes с запасным вариантом на колонках",
    intro:
      "Раскладка в стиле Pinterest для карточек разной высоты. Если браузер знает CSS Grid Lanes (display: grid-lanes), элементы идут слева направо и каждый встаёт в самую короткую дорожку. В остальных браузерах та же разметка превращается в многоколоночную вёрстку. Режим браузер выбирает сам через @supports, поэтому это серверный компонент совсем без JavaScript.",
    browserSupport: "Поддержка браузеров",
    supportGridLanes:
      "Раскладывает элементы слева направо в самую короткую дорожку. Без неё сетка переходит на колонки.",
    supportMulticol:
      "Запасной вариант: элементы заполняют колонку сверху вниз, поэтому порядок чтения идёт по колонкам.",
    preview: "Превью",
    previewHint:
      "Цифры показывают порядок в разметке. С grid-lanes они идут слева направо, в запасном варианте сверху вниз по колонкам.",
    modeLabel: "Режим в вашем браузере:",
    modeLanes: "grid-lanes",
    modeColumns: "колонки (запасной)",
    photosLabel: "Фотографии из поездок",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    notesTitle: "Стена заметок",
    notesText:
      "Текстовые карточки очень разной длины: классический случай для masonry. gap принимает любую CSS-длину.",
    columnsTitle: "Всегда колонки",
    columnsText:
      'layout="columns" оставляет многоколоночную вёрстку даже там, где Grid Lanes есть. Пригодится, когда порядок сверху вниз важнее ровного нижнего края.',
    narrowTitle: "Узкие колонки, широкий отступ",
    narrowText:
      "minColumnWidth задаёт минимальную ширину колонки. Сколько колонок поместится, зависит от ширины контейнера.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    pMin: "Минимальная ширина колонки в px. Колонки растягиваются на всю строку",
    pGap: "Отступ между элементами: число в px или любая CSS-длина",
    pLayout:
      "auto включает Grid Lanes, где они есть; columns всегда использует колонки",
    pAs: 'Какой элемент рендерить, например ul вместе с MasonryItem as="li"',
    pClassName: "Дополнительные CSS-классы",
    components: "Компоненты",
    componentHeader: "Компонент",
    cGrid: "Контейнер. Каждый прямой потомок становится элементом сетки",
    cItem:
      "Необязательная обёртка для одного элемента: data-slot, блочное отображение и as (div, li, article, figure)",
    features: "Возможности",
    featureList: [
      [
        "Без JavaScript",
        "раскладка выбирается в CSS через @supports, поэтому готова к первой отрисовке и не прыгает после гидратации",
      ],
      [
        "Семантичные списки",
        'as="ul" с MasonryItem as="li" сохраняет для скринридеров семантику списка',
      ],
      [
        "Допуск",
        "переменная --masonry-tolerance задаёт, насколько Grid Lanes держится за исходный порядок (по умолчанию 1em)",
      ],
      [
        "Легко переопределить",
        "стили лежат в @layer components, поэтому Tailwind-классы на сетке важнее",
      ],
    ],
    photos: [
      ["Туман над озером Блед", "Словения"],
      ["Трамвай 28 в сумерках", "Лиссабон"],
      ["Базальтовые столбы", "Рейнисфьяра, Исландия"],
      ["Чайные террасы", "Муннар, Индия"],
      ["Ночной рынок", "Тайбэй"],
      ["Гребень дюны", "Соссусвлей, Намибия"],
      ["Ледниковая пещера", "Ватнайёкюдль, Исландия"],
      ["Лавандовые поля", "Валансоль, Франция"],
      ["Портовые краны", "Роттердам"],
      ["Рисовые террасы", "Бали"],
      ["Крыши старого города", "Дубровник"],
      ["Северное сияние", "Тромсё, Норвегия"],
    ],
    notes: [
      [
        "Прия",
        "По итогам ретро: переносим стендап на 9:45, чтобы берлинцы успевали позавтракать.",
      ],
      ["Марко", "Экспорт в CSV сначала выкатываем за флагом."],
      [
        "Лена",
        "Что узнали на интервью с клиентами: чек-лист онбординга всем нравится, но ссылку для приглашения в команду никто не находит. Трое из пяти спросили, где добавить коллег. Давайте покажем её в пустом состоянии страницы участников и в приветственном письме.",
      ],
      [
        "Том",
        "Кто продлевает сертификат на стейджинге? Он истекает 3 декабря.",
      ],
      [
        "Айко",
        "Дизайн-ревью настроек готово. Осталось: контраст неактивных полей в тёмной теме и фокус на выборе аватара.",
      ],
      [
        "Сэм",
        "Пицца-пятница возвращается. Голосуйте за начинку в #office до четверга.",
      ],
      [
        "Йонас",
        "Черновик разбора вторничной очереди лежит в вики. Причина: лавина повторных запросов после сбоя DNS. Предлагаю случайную задержку между повторами и предохранитель на воркере вебхуков.",
      ],
      [
        "Прия",
        "Документ с OKR на первый квартал ждёт комментариев до пятницы.",
      ],
      [
        "Марко",
        "Бандл похудел на 38 КБ, когда мы убрали библиотеку дат. Спасибо Лене за идею с полифилом Temporal.",
      ],
    ],
  },
}

const photoShapes = [
  { ratio: "3 / 4", hue: 220 },
  { ratio: "4 / 3", hue: 35 },
  { ratio: "2 / 3", hue: 260 },
  { ratio: "1 / 1", hue: 140 },
  { ratio: "3 / 5", hue: 330 },
  { ratio: "16 / 9", hue: 45 },
  { ratio: "4 / 5", hue: 200 },
  { ratio: "3 / 2", hue: 290 },
  { ratio: "9 / 16", hue: 15 },
  { ratio: "5 / 4", hue: 110 },
  { ratio: "2 / 3", hue: 25 },
  { ratio: "1 / 1", hue: 165 },
]
const noteHues = [85, 200, 330, 140, 260, 45, 15, 85, 200]
const heights = [120, 200, 90, 160, 240, 110, 180, 130, 210, 100, 150, 190]

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Masonry Grid", description: t.description }
}

export default async function MasonryGridPage({ params }: Props) {
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
    { id: "features", title: t.features, level: 2 },
  ]

  const rows: [string, string, string, string][] = [
    ["minColumnWidth", "number", "240", t.pMin],
    ["gap", "number | string", "16", t.pGap],
    ["layout", '"auto" | "columns"', '"auto"', t.pLayout],
    ["as", '"div" | "ul" | "ol" | "section"', '"div"', t.pAs],
    ["className", "string", "-", t.pClassName],
  ]

  const notesGrid = (
    <MasonryGrid minColumnWidth={200} gap="1.25rem" className="w-full">
      {t.notes.map(([author, text], index) => (
        <MasonryItem key={text}>
          <article
            className="relative rounded-lg border bg-[oklch(0.97_0.04_var(--note-hue))] p-4 pt-5 text-sm shadow-sm dark:bg-[oklch(0.27_0.04_var(--note-hue))]"
            style={{ "--note-hue": noteHues[index] } as CSSProperties}
          >
            <Pin
              aria-hidden="true"
              className="absolute top-2 right-2 size-3.5 rotate-45 text-muted-foreground"
            />
            <p className="leading-relaxed">{text}</p>
            <p className="mt-3 text-xs font-medium text-muted-foreground">
              {author}
            </p>
          </article>
        </MasonryItem>
      ))}
    </MasonryGrid>
  )

  const blocks = (layout: "auto" | "columns") => (
    <MasonryGrid
      minColumnWidth={140}
      gap={24}
      layout={layout}
      className="w-full"
    >
      {heights.map((height, index) => (
        <MasonryItem key={`${height}-${index}`}>
          <div
            className="flex items-end justify-between rounded-md bg-muted p-2 font-mono text-xs text-muted-foreground"
            style={{ height }}
          >
            <span>{index + 1}</span>
            <span>{height}px</span>
          </div>
        </MasonryItem>
      ))}
    </MasonryGrid>
  )

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Masonry Grid" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            { featureId: "grid-lanes", description: t.supportGridLanes },
            { featureId: "multi-column", description: t.supportMulticol },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          {/* CSS-only mode indicator: the same @supports test the grid uses */}
          <p className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">{t.modeLabel}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-xs supports-[display:grid-lanes]:hidden">
              <span className="size-1.5 rounded-full bg-muted-foreground" />
              {t.modeColumns}
            </span>
            <span className="hidden items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-xs supports-[display:grid-lanes]:inline-flex">
              <span className="size-1.5 rounded-full bg-success" />
              {t.modeLanes}
            </span>
          </p>
          <div className="rounded-lg bg-muted/30 p-4 sm:p-6">
            <MasonryGrid
              as="ul"
              minColumnWidth={200}
              gap={12}
              aria-label={t.photosLabel}
            >
              {t.photos.map(([title, place], index) => {
                const shape = photoShapes[index]
                return (
                  <MasonryItem as="li" key={title}>
                    <figure className="group relative overflow-hidden rounded-xl border">
                      <div
                        role="img"
                        aria-label={title}
                        className="w-full transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                        style={{
                          aspectRatio: shape.ratio,
                          background: `linear-gradient(160deg, oklch(0.78 0.12 ${shape.hue}), oklch(0.45 0.14 ${shape.hue + 40}))`,
                        }}
                      />
                      <span className="absolute top-2 left-2 rounded-md bg-black/45 px-1.5 py-0.5 font-mono text-xs text-white tabular-nums">
                        {index + 1}
                      </span>
                      <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-3 pt-8 text-white">
                        <p className="text-sm font-medium">{title}</p>
                        <p className="flex items-center gap-1 text-xs text-white/80">
                          <MapPin aria-hidden="true" className="size-3" />
                          {place}
                        </p>
                      </figcaption>
                    </figure>
                  </MasonryItem>
                )
              })}
            </MasonryGrid>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/masonry-grid" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { MasonryGrid, MasonryItem } from "@/components/ui/masonry-grid"

export function Gallery({ photos }) {
  return (
    <MasonryGrid as="ul" minColumnWidth={220} gap={12} aria-label="Photos">
      {photos.map((photo) => (
        <MasonryItem as="li" key={photo.id}>
          <img src={photo.src} alt={photo.alt} className="w-full rounded-xl" />
        </MasonryItem>
      ))}
    </MasonryGrid>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-lg font-medium">{t.notesTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.notesText}
              </p>
              <div className="rounded-lg bg-muted/30 p-4 sm:p-6">
                {notesGrid}
              </div>
              <CodeBlock className="mt-4">{`<MasonryGrid minColumnWidth={200} gap="1.25rem">
  {notes.map((note) => (
    <MasonryItem key={note.id}>
      <article className="rounded-lg border p-4 text-sm">
        <p>{note.text}</p>
        <p className="mt-3 text-xs text-muted-foreground">{note.author}</p>
      </article>
    </MasonryItem>
  ))}
</MasonryGrid>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.narrowTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.narrowText}
              </p>
              <div className="rounded-lg bg-muted/30 p-4 sm:p-6">
                {blocks("auto")}
              </div>
              <CodeBlock className="mt-4">{`<MasonryGrid minColumnWidth={140} gap={24}>
  {items.map((item) => (
    <MasonryItem key={item.id}>…</MasonryItem>
  ))}
</MasonryGrid>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.columnsTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.columnsText}
              </p>
              <div className="rounded-lg bg-muted/30 p-4 sm:p-6">
                {blocks("columns")}
              </div>
              <CodeBlock className="mt-4">{`<MasonryGrid layout="columns" minColumnWidth={140} gap={24}>
  …
</MasonryGrid>`}</CodeBlock>
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
                  <th className="p-3 text-left font-medium">
                    {t.headers.prop}
                  </th>
                  <th className="p-3 text-left font-medium">
                    {t.headers.type}
                  </th>
                  <th className="p-3 text-left font-medium">
                    {t.headers.default}
                  </th>
                  <th className="p-3 text-left font-medium">
                    {t.headers.description}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([prop, type, def, description]) => (
                  <tr key={prop} className="border-t">
                    <td className="p-3 font-mono text-xs">{prop}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3 font-mono text-xs">{def}</td>
                    <td className="p-3">{description}</td>
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
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left font-medium">
                    {t.componentHeader}
                  </th>
                  <th className="p-3 text-left font-medium">
                    {t.headers.description}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">MasonryGrid</td>
                  <td className="p-3">{t.cGrid}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">MasonryItem</td>
                  <td className="p-3">{t.cItem}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="features" className={h2}>
            {t.features}
          </h2>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            {t.featureList.map(([name, text]) => (
              <li key={name}>
                <strong className="text-foreground">{name}</strong>: {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DocsPage>
  )
}
