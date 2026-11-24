import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { ScrollWordRevealDemo } from "./scroll-word-reveal-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  browserSupport: "Browser Support",
  supportDescription0: "Reveals words while scrolling.",
  browserSupportText:
    "Scroll-driven animations are Baseline newly available. In browsers without them the @supports check skips the animation and the text is shown as plain text.",
  description: "Paragraph whose words fade in out of a blur as you scroll",
  intro:
    "A paragraph whose words come out of a blur one after another while the page scrolls. It is a server component with no JavaScript: every word runs the same CSS keyframes on the paragraph's view() timeline, and its own animation-range is shifted by its index. Screen readers get the whole text at once, and with reduced motion the text is simply visible.",
  preview: "Preview",
  previewHint:
    "The demo scrolls inside its own box: a view() timeline follows the nearest scroll container on its own.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  softTitle: "Softer reveal",
  softText:
    "Less blur and a higher starting opacity keep the text readable even before it is revealed.",
  strongTitle: "Heavy blur, short range",
  strongText:
    "A larger wordSpan makes neighbouring words appear together, a heavy blur makes the effect obvious.",
  containerTitle: "Inside a scrollable container",
  containerText:
    "Nothing to pass: view() tracks the nearest scrolling ancestor, so the same component works in a panel, a modal or a docs preview. The offset lines are measured in that container's height.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  propText: "Paragraph text, split into words by whitespace",
  propAs: "Element to render",
  propOffset:
    "Two lines as a share of the scroll container height from the top: the reveal starts when the top of the text crosses the first and ends when its bottom crosses the second",
  propBlur: "Blur of a hidden word, in px",
  propInitialOpacity: "Opacity of a hidden word",
  propWordSpan: "Share of the range one word needs to fully appear",
  propClassName: "Classes for the paragraph",
  propWordClassName: "Classes for each word",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Показывает слова при прокрутке.",
    browserSupportText:
      "Анимации по скроллу в статусе Baseline newly. В браузерах без них проверка @supports пропускает анимацию, и текст показывается как обычный.",
    description: "Абзац, слова которого проявляются из размытия при прокрутке",
    intro:
      "Абзац, слова которого по очереди выходят из размытия, пока страница прокручивается. Это серверный компонент без JavaScript: каждое слово играет одни и те же CSS-keyframes на view()-шкале абзаца, а его animation-range сдвинут на номер слова. Скринридер читает текст целиком сразу, а при reduced motion текст просто виден.",
    preview: "Превью",
    previewHint:
      "Демо прокручивается внутри своего блока: view()-шкала сама находит ближайший прокручиваемый контейнер.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    softTitle: "Мягкое проявление",
    softText:
      "Если уменьшить размытие и поднять начальную прозрачность, текст читается ещё до того, как проявится.",
    strongTitle: "Сильное размытие, короткий отрезок",
    strongText:
      "С большим wordSpan соседние слова проявляются вместе, а сильное размытие делает эффект заметнее.",
    containerTitle: "Внутри прокручиваемого блока",
    containerText:
      "Ничего передавать не нужно: view() следит за ближайшим прокручиваемым предком, поэтому компонент работает и в панели, и в модалке, и в превью документации. Линии offset считаются от высоты этого контейнера.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    propText: "Текст абзаца, делится на слова по пробелам",
    propAs: "Какой элемент рендерить",
    propOffset:
      "Две линии в долях высоты прокручиваемого контейнера, считая сверху: проявление начинается, когда верх текста пересекает первую, и заканчивается, когда низ текста пересекает вторую",
    propBlur: "Размытие скрытого слова, в px",
    propInitialOpacity: "Прозрачность скрытого слова",
    propWordSpan: "Какая доля отрезка нужна одному слову, чтобы проявиться",
    propClassName: "Классы для абзаца",
    propWordClassName: "Классы для каждого слова",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Scroll Word Reveal", description: t.description }
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export default async function ScrollWordRevealPage({ params }: Props) {
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
    ["as", "ElementType", '"p"', t.propAs],
    ["offset", "[number, number]", "[0.9, 0.25]", t.propOffset],
    ["blur", "number", "6", t.propBlur],
    ["initialOpacity", "number", "0.15", t.propInitialOpacity],
    ["wordSpan", "number", "0.12", t.propWordSpan],
    ["className", "string", "-", t.propClassName],
    ["wordClassName", "string", "-", t.propWordClassName],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Scroll Word Reveal" />

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
          <div className="bg-muted/30 rounded-lg">
            <ScrollWordRevealDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/scroll-word-reveal" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { ScrollWordReveal } from "@/components/ui/scroll-word-reveal"

export default function Statement() {
  return (
    <section className="py-24">
      <ScrollWordReveal
        className="text-4xl font-semibold tracking-tight"
        text="Good interfaces explain themselves. We study how people work and keep polishing after launch."
      />
    </section>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.softTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.softText}</p>
              <div className="bg-muted/30 rounded-lg">
                <ScrollWordRevealDemo blur={2} initialOpacity={0.35} />
              </div>
              <CodeBlock className="mt-4">{`<ScrollWordReveal text={text} blur={2} initialOpacity={0.35} />`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.strongTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.strongText}
              </p>
              <div className="bg-muted/30 rounded-lg">
                <ScrollWordRevealDemo
                  variant="short"
                  blur={14}
                  initialOpacity={0}
                  wordSpan={0.4}
                  className="text-4xl font-bold tracking-tight"
                />
              </div>
              <CodeBlock className="mt-4">{`<ScrollWordReveal
  text="Every word waits for its turn."
  blur={14}
  initialOpacity={0}
  wordSpan={0.4}
  className="text-4xl font-bold"
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.containerTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.containerText}
              </p>
              <CodeBlock>{`<div className="h-96 overflow-y-auto">
  <div className="h-80" />
  <ScrollWordReveal text={text} offset={[1, 0.3]} />
  <div className="h-96" />
</div>`}</CodeBlock>
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
        </div>
      </div>
    </DocsPage>
  )
}
