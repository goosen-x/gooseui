import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  HighlightText,
  splitHighlight,
} from "@/registry/gooseui/effects/highlight-text"
import { ScrollContainer } from "@/registry/gooseui/ui/scroll-container"
import { HighlightTextDemo } from "./highlight-text-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  description: "Search match highlighting with an optional marker animation",
  intro:
    "Wraps the matches of a search query in <mark>. The query is split into words, RegExp special characters are escaped, case is ignored, and optionally diacritics too, so cafe finds café. It is a server component with no client JavaScript. With animate the marker paints itself left to right as each match scrolls into view, driven by a CSS view() timeline.",
  browserSupport: "Browser Support",
  supportDescription0:
    "With animate, the marker paints itself as a match scrolls into view.",
  browserSupportText:
    "The animated marker uses scroll-driven animations. Where they are missing, or the user prefers reduced motion, matches are highlighted right away. Matching itself happens on the server.",
  preview: "Preview",
  previewHint: "Type a query. Several words are highlighted independently.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  animatedTitle: "Animated marker",
  animatedText:
    "The background fills in from the left as each match scrolls up from the bottom edge of the window. The progress follows the scroll, so scrolling back erases it.",
  animatedHint: "Scroll down ↓",
  animatedParagraphs: [
    "A clear text starts before the first word is typed. Decide who will read it, what they already know and what you want them to do after the last line. If you cannot name the goal in a single line, the reader will not find it either.",
    "Put the main point at the top. People skim, and most of them stop after a few lines, so the conclusion belongs where the eye lands first. Details, background and caveats can follow for those who want to dig deeper.",
    "Prefer short sentences. One sentence carries one idea, and when a line runs past two commas it usually hides two thoughts that want to be separated. Short sentences are easier to read on a phone and easier to translate.",
    'Choose the active voice. Compare "the report was approved by the team" with "the team approved the report": the second version names the actor and saves three words. The passive voice has its place, but it should be a decision, not a habit.',
    "Cut filler. Words such as very, really, basically and in order to rarely add meaning. Read each sentence again without them, and if nothing is lost, leave them out. Replace abstract nouns with verbs: say decide, not make a decision.",
    "Use the words your readers use. Jargon is fine inside a team and tiring outside of it. When a term is unavoidable, explain it once, in plain language, the first time it appears, and keep the same word for the same thing afterwards.",
    "Finally, edit with fresh eyes. Leave the draft for an hour, then read it as a stranger would. Mark every place where you stumbled, fix it, and once more check that the active voice and short sentences survived the edit.",
  ],
  animatedQuery: "short sentences active voice",
  serverTitle: "Server rendering",
  serverText:
    "The component has no client code, so it can render search results straight from a server component.",
  fnTitle: "Chunks without React",
  fnText:
    "splitHighlight returns plain chunks, handy for custom markup, a canvas or tests.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  propText: "Source text",
  propQuery: "Search query, split into words by whitespace",
  propIgnoreDiacritics: "Match accented letters by their base letter, é as e",
  propAnimate: "Paint the marker as each match scrolls into view",
  propMarkClassName: "Classes for every <mark>",
  propClassName: "Classes for the wrapping span",
  fn: "splitHighlight",
  fnSignature: "Returns an array of { text, match } chunks.",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description: "Подсветка совпадений поиска с анимацией маркера по желанию",
    intro:
      "Оборачивает совпадения с поисковым запросом в <mark>. Запрос делится на слова, спецсимволы RegExp экранируются, регистр не важен, а по желанию и диакритика: тогда «елка» находит «Ёлка». Это серверный компонент без клиентского JavaScript. С animate маркер закрашивается слева направо, пока совпадение въезжает в экран: этим управляет CSS-шкала view().",
    browserSupport: "Поддержка браузеров",
    supportDescription0:
      "С пропом animate маркер закрашивается, когда совпадение въезжает в экран.",
    browserSupportText:
      "Анимированному маркеру нужны анимации по скроллу. Где их нет или пользователь просит меньше движения, совпадения подсвечены сразу. Сам поиск совпадений идёт на сервере.",
    preview: "Превью",
    previewHint: "Введите запрос. Каждое слово подсвечивается отдельно.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    animatedTitle: "Анимированный маркер",
    animatedText:
      "Фон заливается слева, пока совпадение поднимается от нижнего края окна. Заливка идёт вместе со скроллом, и при прокрутке назад она стирается.",
    animatedHint: "Прокрутите вниз ↓",
    animatedParagraphs: [
      "Понятный текст начинается ещё до первой написанной строки. Определите, кто его будет читать, что этот человек уже знает и что он должен сделать после последней строки. Если цель не укладывается в одну строку, читатель её тоже не найдёт.",
      "Главную мысль ставьте в начало. Люди бегло просматривают текст, и большинство останавливается через несколько строк, поэтому вывод должен лежать там, куда глаз попадает первым. Детали, предысторию и оговорки можно дать дальше, для тех, кто хочет разобраться глубже.",
      "Пишите короткие фразы. В одной фразе одна мысль, а если предложение тянется дальше двух запятых, в нём обычно прячутся две мысли, которые просятся врозь. Такие фразы легче читать с телефона и проще переводить.",
      "Берите конкретные примеры. Вместо «процесс стал эффективнее» напишите «заявка проходит за два дня вместо недели». Цифра и факт убеждают лучше прилагательного, а читатель сразу видит, о чём речь.",
      "Убирайте лишнее. Слова вроде «очень», «в целом» и «данный» редко добавляют смысл. Перечитайте предложение без них, и если ничего не потерялось, оставьте как есть. Заменяйте отглагольные существительные глаголами: пишите «решить», а не «принять решение».",
      "Говорите словами читателя. Жаргон уместен внутри команды и утомляет снаружи. Если без термина не обойтись, объясните его один раз простыми словами и дальше называйте эту вещь одинаково.",
      "В конце проверьте текст свежим взглядом. Отложите черновик на час, потом прочитайте вслух, как будто видите его впервые. Отметьте места, где споткнулись, исправьте их и ещё раз убедитесь, что примеры и короткие фразы остались на месте.",
    ],
    animatedQuery: "короткие фразы примеры вслух",
    serverTitle: "Рендер на сервере",
    serverText:
      "У компонента нет клиентского кода, поэтому результаты поиска можно рендерить прямо в серверном компоненте.",
    fnTitle: "Фрагменты без React",
    fnText:
      "splitHighlight возвращает простые фрагменты. Пригодится для своей разметки, canvas или тестов.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    propText: "Исходный текст",
    propQuery: "Поисковый запрос, делится на слова по пробелам",
    propIgnoreDiacritics: "Считать é за e, а ё за е",
    propAnimate: "Закрашивать маркер, пока совпадение въезжает в экран",
    propMarkClassName: "Классы для каждого <mark>",
    propClassName: "Классы для обёртки span",
    fn: "splitHighlight",
    fnSignature: "Возвращает массив фрагментов { text, match }.",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Highlight Text", description: t.description }
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export default async function HighlightTextPage({ params }: Props) {
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
  ]

  const rows: [string, string, string, string][] = [
    ["text", "string", "-", t.propText],
    ["query", "string", "-", t.propQuery],
    ["ignoreDiacritics", "boolean", "false", t.propIgnoreDiacritics],
    ["animate", "boolean", "false", t.propAnimate],
    ["markClassName", "string", "-", t.propMarkClassName],
    ["className", "string", "-", t.propClassName],
  ]

  const serverSample =
    locale === "ru"
      ? "Ёжик нашёл в лесу ёлку и зелёный мох"
      : "A naïve café owner served crème brûlée"
  const serverQuery = locale === "ru" ? "ежик елку" : "naive cafe creme"
  const chunks = splitHighlight(serverSample, serverQuery, {
    ignoreDiacritics: true,
  })

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Highlight Text" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "scroll-driven-animations",
              description: t.supportDescription0,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <HighlightTextDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/highlight-text" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { HighlightText } from "@/components/ui/highlight-text"

export function SearchResult({ title, query }: { title: string; query: string }) {
  return <HighlightText text={title} query={query} ignoreDiacritics />
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.animatedTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.animatedText}
              </p>
              <div className="rounded-lg bg-muted/30 p-4">
                <p className="mb-2 text-sm text-muted-foreground">
                  {t.animatedHint}
                </p>
                {/* Scroll happens inside the window: view() uses the nearest scrollable ancestor */}
                <ScrollContainer
                  height="18rem"
                  tabIndex={0}
                  aria-label={t.animatedTitle}
                  className="h-72 rounded-md border bg-background px-5 py-4"
                >
                  <div className="mx-auto max-w-lg space-y-6 pb-24 text-lg leading-relaxed">
                    {t.animatedParagraphs.map((paragraph) => (
                      <p key={paragraph}>
                        <HighlightText
                          text={paragraph}
                          query={t.animatedQuery}
                          animate
                        />
                      </p>
                    ))}
                  </div>
                </ScrollContainer>
              </div>
              <CodeBlock className="mt-4">{`<HighlightText
  text={text}
  query="short sentences active voice"
  animate
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.serverTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.serverText}
              </p>
              <div className="flex justify-center px-6 py-8 bg-muted/30 rounded-lg">
                <p className="text-lg">
                  <HighlightText
                    text={serverSample}
                    query={serverQuery}
                    ignoreDiacritics
                    markClassName="bg-accent underline decoration-primary decoration-2 underline-offset-4"
                  />
                </p>
              </div>
              <CodeBlock className="mt-4">{`// app/search/page.tsx (server component)
export default async function SearchPage({ searchParams }) {
  const { q = "" } = await searchParams
  const items = await getItems(q)

  return items.map((item) => (
    <HighlightText
      key={item.id}
      text={item.title}
      query={q}
      ignoreDiacritics
      markClassName="bg-accent underline decoration-primary"
    />
  ))
}`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.fnTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.fnText}</p>
              <div className="flex flex-wrap justify-center gap-2 px-6 py-8 bg-muted/30 rounded-lg font-mono text-xs">
                {chunks.map((chunk, i) => (
                  <span
                    key={i}
                    className={
                      chunk.match
                        ? "rounded border border-primary/40 bg-primary/10 px-2 py-1"
                        : "rounded border bg-background px-2 py-1 text-muted-foreground"
                    }
                  >
                    {JSON.stringify(chunk.text)}
                  </span>
                ))}
              </div>
              <CodeBlock className="mt-4">{`import { splitHighlight } from "@/components/ui/highlight-text"

splitHighlight("A naïve café owner", "naive cafe", { ignoreDiacritics: true })
// [
//   { text: "A ", match: false },
//   { text: "naïve", match: true },
//   { text: " ", match: false },
//   { text: "café", match: true },
//   { text: " owner", match: false },
// ]`}</CodeBlock>
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
                    {t.headers.prop}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.headers.type}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.headers.default}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.headers.description}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([prop, type, def, desc]) => (
                  <tr key={prop} className="border-t">
                    <td className="p-3 font-mono text-xs">{prop}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3 font-mono text-xs">{def}</td>
                    <td className="p-3">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground">
            <code className="font-mono text-xs text-foreground">
              {t.fn}(text, query, {"{ ignoreDiacritics }"})
            </code>{" "}
            {t.fnSignature}
          </p>
        </div>
      </div>
    </DocsPage>
  )
}
