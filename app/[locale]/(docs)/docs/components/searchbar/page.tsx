import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  SearchbarDemo,
  SearchbarRenderItemDemo,
  SearchbarStatesDemo,
} from "./searchbar-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  auditFeature0Description: "Animates the results list height",
  browserSupport: "Browser Support",
  description: "Input with async suggestions, debounce and request cancelling",
  intro:
    "A text field that loads suggestions from any source while the user types. Requests are debounced, a stale request is aborted as soon as the query changes, and the list follows the ARIA combobox pattern. JavaScript is needed for the network requests. A native <datalist> is not used as the base: it cannot render custom items, show loading and error states or hand back the picked object, and browsers filter its options again on their own.",
  preview: "Preview",
  previewHint:
    "Type two letters of a European city. Use the arrow keys and Enter, or click an option.",
  installation: "Installation",
  usage: "Usage",
  usageText:
    "Pass a fetcher that takes the query and an AbortSignal. Hand the signal to fetch, and a request that is no longer needed gets cancelled.",
  examples: "Examples",
  renderItemTitle: "Custom option layout",
  renderItemText:
    "renderItem gets the item and the current query, so you can highlight the match or show extra details.",
  statesTitle: "Loading, empty and error states",
  statesText:
    "Here requests start from three letters and fail while the checkbox is on. Turn it off and type again to see results or the empty state.",
  controlledTitle: "Controlled value",
  controlledText:
    "Control the text with value and onValueChange. After a pick the list stays closed until the text is edited.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  propFetcher:
    "Loads suggestions for the trimmed query. Reject or abort when the signal fires",
  propValue: "Controlled text value",
  propDefaultValue: "Initial text for uncontrolled use",
  propOnValueChange: "Called on every text change, including a pick",
  propOnSelect: "Called with the picked item",
  propGetItemLabel: "Text for an item. It goes into the field after a pick",
  propGetItemKey: "Stable key for an item",
  propRenderItem: "Custom content of an option",
  propDebounce: "Delay before a request, ms",
  propMinLength: "Minimum query length that triggers a request",
  propLabels: "Texts for the loading, empty and error states",
  propClassName: "Classes for the wrapper",
  propInputClassName: "Classes for the input",
  propListClassName: "Classes for the popup",
  propRest: "Other input attributes: placeholder, name, disabled, aria-label",
  features: "Features",
  featureList: [
    ["Animation", "transitions respect reduced motion preferences"],
    ["Debounce", "a request goes out only after the user pauses typing"],
    [
      "Cancelling",
      "the previous request is aborted through AbortController, so an old answer never replaces a new one",
    ],
    [
      "Keyboard",
      "arrow keys move through options, Enter picks, Esc closes, aria-activedescendant points at the active option",
    ],
    [
      "Closing",
      "the list closes when the field loses focus; after a pick it does not reopen until the text changes",
    ],
    [
      "States",
      "loading, nothing found and error are announced through a live region",
    ],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    auditFeature0Description: "Анимирует высоту списка результатов",
    browserSupport: "Поддержка браузеров",
    description:
      "Поле с асинхронными подсказками, задержкой и отменой запросов",
    intro:
      "Текстовое поле, которое подгружает подсказки из любого источника, пока человек печатает. Запросы уходят с задержкой, устаревший запрос отменяется, как только меняется текст, а список работает по шаблону ARIA combobox. JavaScript нужен для запросов в сеть. Нативный <datalist> за основу не взят: он не умеет рисовать свои пункты, показывать загрузку и ошибку, отдавать выбранный объект, а ещё браузеры сами фильтруют его варианты.",
    preview: "Превью",
    previewHint:
      "Введите две буквы европейского города. Стрелки и Enter работают, кликом тоже можно.",
    installation: "Установка",
    usage: "Использование",
    usageText:
      "Передайте fetcher, который принимает запрос и AbortSignal. Отдайте signal в fetch, и ненужный запрос отменится сам.",
    examples: "Примеры",
    renderItemTitle: "Своя разметка подсказки",
    renderItemText:
      "renderItem получает элемент и текущий запрос: можно подсветить совпадение или показать подробности.",
    statesTitle: "Загрузка, пустой результат и ошибка",
    statesText:
      "Здесь запрос уходит с трёх букв и падает, пока стоит галочка. Снимите её и введите текст ещё раз, чтобы увидеть результаты или пустое состояние.",
    controlledTitle: "Управляемое значение",
    controlledText:
      "Текстом можно управлять через value и onValueChange. После выбора список не открывается, пока текст не изменят.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    propFetcher:
      "Загружает подсказки по запросу без пробелов по краям. При сигнале отмены прерывает запрос",
    propValue: "Управляемое значение текста",
    propDefaultValue: "Начальный текст для неуправляемого режима",
    propOnValueChange:
      "Вызывается при каждом изменении текста, в том числе при выборе",
    propOnSelect: "Вызывается с выбранным элементом",
    propGetItemLabel: "Текст элемента. Он попадает в поле после выбора",
    propGetItemKey: "Стабильный ключ элемента",
    propRenderItem: "Своё содержимое подсказки",
    propDebounce: "Задержка перед запросом, мс",
    propMinLength: "Минимальная длина запроса",
    propLabels: "Тексты для загрузки, пустого результата и ошибки",
    propClassName: "Классы обёртки",
    propInputClassName: "Классы поля",
    propListClassName: "Классы выпадающего списка",
    propRest:
      "Остальные атрибуты input: placeholder, name, disabled, aria-label",
    features: "Возможности",
    featureList: [
      ["Анимация", "переходы учитывают настройку уменьшения движения"],
      ["Задержка", "запрос уходит, только когда человек перестал печатать"],
      [
        "Отмена",
        "предыдущий запрос прерывается через AbortController, поэтому старый ответ не перезапишет новый",
      ],
      [
        "Клавиатура",
        "стрелки двигают выделение, Enter выбирает, Esc закрывает, aria-activedescendant указывает на активную подсказку",
      ],
      [
        "Закрытие",
        "список закрывается, когда поле теряет фокус; после выбора он не появится, пока текст не изменят",
      ],
      [
        "Состояния",
        "загрузка, пустой результат и ошибка озвучиваются через live-регион",
      ],
    ],
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Searchbar", description: t.description }
}

export default async function SearchbarPage({ params }: Props) {
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

  const rows: [string, string, string, string][] = [
    [
      "fetcher",
      "(query: string, signal: AbortSignal) => Promise<T[]>",
      "-",
      t.propFetcher,
    ],
    ["value", "string", "-", t.propValue],
    ["defaultValue", "string", '""', t.propDefaultValue],
    ["onValueChange", "(value: string) => void", "-", t.propOnValueChange],
    ["onSelect", "(item: T) => void", "-", t.propOnSelect],
    ["getItemLabel", "(item: T) => string", "String(item)", t.propGetItemLabel],
    ["getItemKey", "(item: T, index: number) => string", "-", t.propGetItemKey],
    [
      "renderItem",
      "(item: T, state: { active, query }) => ReactNode",
      "-",
      t.propRenderItem,
    ],
    ["debounce", "number", "250", t.propDebounce],
    ["minLength", "number", "2", t.propMinLength],
    ["labels", "{ loading?, empty?, error? }", "-", t.propLabels],
    ["className", "string", "-", t.propClassName],
    ["inputClassName", "string", "-", t.propInputClassName],
    ["listClassName", "string", "-", t.propListClassName],
    ["...props", 'ComponentProps<"input">', "-", t.propRest],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Searchbar" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "interpolate-size",
              description: t.auditFeature0Description,
            },
          ]}
        />

        <div className="space-y-4">
          <h2
            id="preview"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex min-h-80 items-start justify-center rounded-lg bg-muted/30 py-12">
            <SearchbarDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/searchbar" />
        </div>

        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.usage}
          </h2>
          <p className="text-sm text-muted-foreground">{t.usageText}</p>
          <CodeBlock>{`import { Searchbar } from "@/components/ui/searchbar"

type City = { id: string; name: string }

async function searchCities(query: string, signal: AbortSignal) {
  const res = await fetch(\`/api/cities?q=\${encodeURIComponent(query)}\`, { signal })
  if (!res.ok) throw new Error("Request failed")
  return (await res.json()) as City[]
}

export default function Example() {
  return (
    <Searchbar<City>
      aria-label="City"
      placeholder="Search a city…"
      fetcher={searchCities}
      getItemLabel={(city) => city.name}
      getItemKey={(city) => city.id}
      onSelect={(city) => console.log(city.id)}
    />
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2
            id="examples"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.examples}
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-lg font-medium">{t.renderItemTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.renderItemText}
              </p>
              <div className="flex min-h-96 items-start justify-center rounded-lg bg-muted/30 py-8">
                <SearchbarRenderItemDemo />
              </div>
              <CodeBlock className="mt-4">{`<Searchbar<City>
  fetcher={searchCities}
  getItemLabel={(city) => city.name}
  renderItem={(city, { query }) => (
    <div className="flex items-center gap-3">
      <MapPin className="size-4 text-muted-foreground" />
      <div className="flex-1">
        <Highlight text={city.name} query={query} />
        <div className="text-xs text-muted-foreground">{city.country}</div>
      </div>
    </div>
  )}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.statesTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.statesText}
              </p>
              <div className="flex min-h-64 items-start justify-center rounded-lg bg-muted/30 py-8">
                <SearchbarStatesDemo />
              </div>
              <CodeBlock className="mt-4">{`<Searchbar
  fetcher={searchCities}
  minLength={3}
  debounce={400}
  labels={{
    loading: "Searching…",
    empty: "No cities match",
    error: "Server did not respond",
  }}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.controlledTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.controlledText}
              </p>
              <CodeBlock>{`const [query, setQuery] = useState("")
const [city, setCity] = useState<City | null>(null)

<Searchbar<City>
  value={query}
  onValueChange={(next) => {
    setQuery(next)
    setCity(null)
  }}
  onSelect={setCity}
  fetcher={searchCities}
  getItemLabel={(item) => item.name}
/>`}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="props"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
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
          <h2
            id="features"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
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
