import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  SilhouetteRevealAchievementsDemo,
  SilhouetteRevealDemo,
  SilhouetteRevealPrizeDemo,
  SilhouetteRevealTeaserDemo,
} from "./silhouette-reveal-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  description: "Image shown as a silhouette that smoothly reveals itself",
  intro:
    "Shows an image as a solid silhouette and smoothly reveals it on click, on hover or from your state. The silhouette is a CSS mask cut from the image itself and filled with the text color, so it stays visible in both light and dark themes. It is a server component with no JavaScript: a click checks a hidden checkbox, hover is :hover and :focus-visible, and :has() switches the layers.",
  browserSupport: "Browser Support",
  supportDescription0: "Reveals the image through a silhouette.",
  supportDescription1: "Changes the reveal on interaction.",
  browserSupportText:
    "Uses CSS mask-image and :has(). The image must have a transparent background, and an image from another domain needs CORS headers, otherwise the browser will not use it as a mask.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  gameTitle: "Guess who",
  gameText:
    'A quiz round: the silhouette stays hidden until the right answer. trigger="manual" with your own state, so a wrong answer can shake the card and a right one sets revealed.',
  prizeTitle: "Hidden prize",
  prizeText:
    "A gift card with a hidden product. The button flips revealed, and the promo code appears together with the image.",
  teaserTitle: "Collection teaser",
  teaserText:
    'Three "Soon" cards. trigger="hover" needs no state at all, and the product name unblurs with :has() on the same hover.',
  achievementsTitle: "Achievements",
  achievementsText:
    "Locked achievements stay a muted silhouette, the unlocked one is revealed. The silhouette color comes from silhouetteClassName.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  p: {
    src: "Image URL, ideally with a transparent background",
    alt: "Alt text shown after the reveal",
    revealed: "Reveal from outside; with manual it is the only switch",
    defaultRevealed: "Start revealed in click mode",
    name: "Name of the click checkbox, so the state reaches FormData",
    trigger: "What reveals the image",
    duration: "Transition duration in ms",
    silhouetteClassName:
      "Classes for the silhouette, set its color with text-*",
    imageClassName: "Classes for the <img> element",
    labels: "Trigger label and alt text while hidden",
    className: "Classes for the root. Give it a size, for example size-48",
  },
  features: "Features",
  featureList: [
    [
      "Theme-safe silhouette",
      "a mask filled with currentColor instead of brightness(0), so it never disappears on a dark background",
    ],
    [
      "No spoilers",
      "while hidden, the image alt is replaced with a neutral text",
    ],
    ["Three triggers", "click, hover with focus, or manual control"],
    [
      "No JavaScript",
      "the reveal works before hydration and with scripts turned off. To react to it, listen to the change event that bubbles from the checkbox",
    ],
    [
      "Accessible",
      "click mode is a labelled checkbox, Space reveals it, hover mode reacts to keyboard focus",
    ],
    ["Reduced motion", "the reveal happens without the transition"],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description: "Картинка в виде силуэта, который плавно раскрывается",
    intro:
      "Показывает картинку сплошным силуэтом и плавно раскрывает её по клику, при наведении или по вашему состоянию. Силуэт вырезается CSS-маской из самой картинки и заливается цветом текста, поэтому его видно и в светлой, и в тёмной теме. Это серверный компонент без JavaScript: клик отмечает скрытый чекбокс, наведение ловят :hover и :focus-visible, а слои переключает :has().",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Показывает изображение через силуэт.",
    supportDescription1: "Меняет раскрытие при взаимодействии.",
    browserSupportText:
      "Используются CSS mask-image и :has(). Картинке нужен прозрачный фон, а картинке с другого домена нужны CORS-заголовки, иначе браузер не возьмёт её в маску.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    gameTitle: "Угадай, кто это",
    gameText:
      'Раунд викторины: силуэт скрыт до верного ответа. trigger="manual" и своё состояние: неверный ответ трясёт карточку, верный включает revealed.',
    prizeTitle: "Скрытый приз",
    prizeText:
      "Карточка подарка со скрытым товаром. Кнопка переключает revealed, а вместе с картинкой появляется промокод.",
    teaserTitle: "Тизер коллекции",
    teaserText:
      'Три карточки «Скоро». trigger="hover" обходится без состояния, а название товара проявляется через :has() от того же наведения.',
    achievementsTitle: "Достижения",
    achievementsText:
      "Закрытые достижения остаются приглушённым силуэтом, полученное раскрыто. Цвет силуэта задаёт silhouetteClassName.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    p: {
      src: "Адрес картинки, лучше с прозрачным фоном",
      alt: "Альтернативный текст после раскрытия",
      revealed: "Раскрыть снаружи; в режиме manual это единственный способ",
      defaultRevealed: "Сразу раскрыта в режиме click",
      name: "Имя чекбокса в режиме click, чтобы состояние попало в FormData",
      trigger: "Что раскрывает картинку",
      duration: "Длительность перехода в мс",
      silhouetteClassName: "Классы силуэта, цвет задаётся через text-*",
      imageClassName: "Классы для элемента <img>",
      labels: "Подпись кнопки и alt, пока картинка скрыта",
      className: "Классы корневого блока. Задайте размер, например size-48",
    },
    features: "Возможности",
    featureList: [
      [
        "Силуэт в любой теме",
        "маска с заливкой currentColor вместо brightness(0), поэтому силуэт не теряется на тёмном фоне",
      ],
      [
        "Без подсказок",
        "пока картинка скрыта, её alt заменяется нейтральным текстом",
      ],
      ["Три режима", "клик, наведение с фокусом или ручное управление"],
      [
        "Без JavaScript",
        "раскрытие работает до гидратации и с отключёнными скриптами. Чтобы отреагировать на него, слушайте событие change, которое всплывает от чекбокса",
      ],
      [
        "Доступность",
        "в режиме клика это подписанный чекбокс, его раскрывает пробел, режим наведения реагирует на фокус клавиатуры",
      ],
      ["Reduced motion", "картинка раскрывается без анимации"],
    ],
  },
}

const rows: [string, string, string, keyof typeof en.p][] = [
  ["src", "string", "-", "src"],
  ["alt", "string", "-", "alt"],
  ["revealed", "boolean", "-", "revealed"],
  ["defaultRevealed", "boolean", "false", "defaultRevealed"],
  ["trigger", '"click" | "hover" | "manual"', '"click"', "trigger"],
  ["duration", "number", "700", "duration"],
  ["name", "string", "-", "name"],
  ["silhouetteClassName", "string", "-", "silhouetteClassName"],
  ["imageClassName", "string", "-", "imageClassName"],
  ["labels", "Partial<SilhouetteRevealLabels>", "English", "labels"],
  ["className", "string", "-", "className"],
]

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Silhouette Reveal", description: t.description }
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

export default async function SilhouetteRevealPage({ params }: Props) {
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
        <DocsPageNav title="Silhouette Reveal" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "masks",
              description: t.supportDescription0,
            },
            {
              featureId: "has",
              description: t.supportDescription1,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <div className="flex justify-center px-4 py-12 bg-muted/30 rounded-lg">
            <SilhouetteRevealDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/silhouette-reveal" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { SilhouetteReveal } from "@/components/ui/silhouette-reveal"

export default function Example() {
  return (
    <SilhouetteReveal
      src="/images/mascot.png"
      alt="Our mascot"
      className="size-48"
    />
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-12">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.gameTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.gameText}</p>
              <div className="flex justify-center px-4 py-8 bg-muted/30 rounded-lg">
                <SilhouetteRevealDemo />
              </div>
              <CodeBlock className="mt-4">{`const [solved, setSolved] = useState(false)

<SilhouetteReveal
  src="/images/owl.svg"
  alt="Owl"
  trigger="manual"
  revealed={solved}
  className="size-64"
/>
{options.map((option) => (
  <Button
    key={option.id}
    variant="outline"
    onClick={() => {
      if (option.id === "owl") {
        setSolved(true)
        customToast.success("Correct! It's an owl")
      } else {
        customToast.error("Not quite, try again")
      }
    }}
  >
    {option.name}
  </Button>
))}`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.prizeTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.prizeText}
              </p>
              <div className="flex justify-center px-4 py-8 bg-muted/30 rounded-lg">
                <SilhouetteRevealPrizeDemo />
              </div>
              <CodeBlock className="mt-4">{`const [open, setOpen] = useState(false)

<Card>
  <CardHeader>
    <CardTitle>Your gift is waiting</CardTitle>
    <Badge variant="beta">Gift</Badge>
  </CardHeader>
  <CardContent>
    <SilhouetteReveal
      src="/images/headphones.svg"
      alt="Wireless headphones"
      trigger="manual"
      revealed={open}
      duration={1100}
      className="size-44"
    />
    {open && <code>GOOSE-2026</code>}
  </CardContent>
  <CardFooter>
    <Button onClick={() => setOpen(true)}>Open the gift</Button>
  </CardFooter>
</Card>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.teaserTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.teaserText}
              </p>
              <div className="flex justify-center px-4 py-8 bg-muted/30 rounded-lg">
                <SilhouetteRevealTeaserDemo />
              </div>
              <CodeBlock className="mt-4">{`<Card className="group/drop">
  <CardContent>
    <SilhouetteReveal
      src="/images/sneaker.svg"
      alt="Trail sneaker"
      trigger="hover"
      duration={500}
      className="size-32"
    />
    {/* Unblurs while the image inside is hovered or focused */}
    <p className="blur-sm transition-[filter] group-has-[[data-gooseui-silhouette]:is(:hover,:focus-visible)]/drop:blur-none">
      Trail sneaker
    </p>
    <Badge variant="info" size="sm">Soon</Badge>
  </CardContent>
</Card>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">
                {t.achievementsTitle}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.achievementsText}
              </p>
              <div className="flex justify-center px-4 py-8 bg-muted/30 rounded-lg">
                <SilhouetteRevealAchievementsDemo />
              </div>
              <CodeBlock className="mt-4">{`{achievements.map((item) => (
  <div key={item.id}>
    <SilhouetteReveal
      src={item.image}
      alt={item.name}
      trigger="manual"
      revealed={item.done}
      silhouetteClassName="text-muted-foreground/35"
      className="size-24"
    />
    <p>{item.done ? item.name : "???"}</p>
    <Badge variant={item.done ? "success" : "neutral"}>
      {item.done ? "Unlocked" : item.progress}
    </Badge>
  </div>
))}`}</CodeBlock>
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
