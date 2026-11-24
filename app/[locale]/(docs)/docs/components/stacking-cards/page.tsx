import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPreview } from "@/components/docs/docs-preview"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { StackingCardsDemo } from "./demo"

const en = {
  browserSupport: "Browser Support",
  browserFeature0Description: "Animates cards as they stack on scroll.",
  cardsThatStackOn:
    "Cards that stack on top of each other as user scrolls using CSS position: sticky",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  cssFeature: "How it works",
  props: "Props",
  cardsThatStackOn2:
    "Cards that stack on top of each other as user scrolls, using CSS position: sticky and scroll-driven animations.",
  combines: "Combines",
  withScrollDrivenAnimations:
    "with scroll-driven animations to create stacking effect. The card look is up to you.",
  scrollInsideTheContainer: "Scroll inside the container to see cards stack.",
  prop: "Prop",
  type: "Type",
  default: "Default",
  description: "Description",
  cardIndexForStacking:
    "Card index for stacking offset (auto-assigned). Props index, stickyTop and stackOffset go on StackingCard; the container sets them for you",
  baseStickyTopPosition: "Base sticky top position in pixels",
  offsetBetweenStackedCards: "Offset between stacked cards in pixels",
  endSpaceDesc:
    "Empty space after the last card (px or CSS length), inside the sticky range. The scroll ends when the last card is in place: scrollport height - stickyTop - stackOffset * (cards - 1) - card height - gap above it. Container padding does not work: sticky cards are bounded by the content box",
  additionalCssClasses: "Additional CSS classes",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    browserSupport: "Поддержка браузеров",
    browserFeature0Description: "Анимируют наложение карточек при прокрутке.",
    cardsThatStackOn:
      "Карточки, которые накладываются друг на друга при скролле, на CSS position: sticky",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    cssFeature: "Как это работает",
    props: "Пропсы",
    cardsThatStackOn2:
      "Карточки накладываются друг на друга при скролле. Работает на CSS position: sticky и scroll-driven анимациях.",
    combines: "Сочетание",
    withScrollDrivenAnimations:
      "и scroll-driven анимаций создаёт эффект стопки. Вид карточки задаёте вы.",
    scrollInsideTheContainer:
      "Прокрутите контейнер, чтобы увидеть, как карточки складываются.",
    prop: "Проп",
    type: "Тип",
    default: "По умолчанию",
    description: "Описание",
    cardIndexForStacking:
      "Индекс карточки для смещения в стопке (назначается автоматически). Пропсы index, stickyTop и stackOffset есть у StackingCard, контейнер выставляет их сам",
    baseStickyTopPosition: "Базовый sticky-отступ сверху в пикселях",
    offsetBetweenStackedCards: "Смещение между карточками в стопке в пикселях",
    endSpaceDesc:
      "Пустое место после последней карточки (px или CSS-длина) внутри sticky-диапазона. Прокрутка кончается, когда последняя карточка встала: высота окна - stickyTop - stackOffset * (карточек - 1) - высота карточки - зазор над ней. Padding контейнера не работает: sticky-карточки ограничены content box",
    additionalCssClasses: "Дополнительные CSS-классы",
  },
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Stacking Cards", description: t.cardsThatStackOn }
}

export default async function StackingCardsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
  const toc = [
    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "css-feature", title: t.cssFeature, level: 2 },
    { id: "props", title: t.props, level: 2 },
  ]
  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        {/* 1. Navigation */}
        <DocsPageNav title="Stacking Cards" />

        {/* 2. Description */}
        <p className="text-muted-foreground">{t.cardsThatStackOn2}</p>

        {/* 3. Browser Support */}
        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "scroll-driven-animations",
              description: t.browserFeature0Description,
            },
          ]}
        />

        {/* 4. Preview */}
        <DocsPreview description={t.scrollInsideTheContainer}>
          <StackingCardsDemo />
        </DocsPreview>

        {/* 5. Installation */}
        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/stacking-cards" />
        </div>

        {/* 6. Usage */}
        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.usage}
          </h2>
          <CodeBlock>{`import { StackingCardsContainer, StackingCard } from "@/components/effects/stacking-cards"

// The card only sticks and stacks, its look is up to you
<StackingCardsContainer stickyTop={24} stackOffset={14} endSpace={26}>
  <StackingCard>
    <div className="grid gap-6 p-8 md:grid-cols-2">
      <div>
        <span className="text-6xl font-semibold text-muted-foreground/40">01</span>
        <h3 className="text-2xl font-semibold">Idea</h3>
        <p className="text-muted-foreground">Describe the problem in one sentence.</p>
      </div>
      <Illustration />
    </div>
  </StackingCard>
  <StackingCard>{/* ... */}</StackingCard>
</StackingCardsContainer>

// With scroll-driven animation
import { StackingCardsAnimated, StackingCardsStyles } from "@/components/effects/stacking-cards"

<StackingCardsStyles />
<StackingCardsAnimated>
  <div className="p-6 rounded-xl border bg-card">Card 1</div>
  <div className="p-6 rounded-xl border bg-card">Card 2</div>
</StackingCardsAnimated>`}</CodeBlock>
        </div>

        {/* 7. CSS Feature */}
        <div className="space-y-4">
          <h2
            id="css-feature"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.cssFeature}
          </h2>
          <CodeBlock>{`.stacking-card {
  position: sticky;
  top: calc(var(--sticky-top) + var(--index) * var(--stack-offset));
  z-index: calc(var(--index) + 1);
}

/* With scroll animation */
.stacking-card-wrapper {
  animation: stack-scale linear;
  animation-timeline: view();
  animation-range: exit -100px exit 100px;
}

@keyframes stack-scale {
  to {
    transform: scale(0.95);
  }
}`}</CodeBlock>
        </div>

        {/* 8. Props */}
        <div className="space-y-4">
          <h2
            id="props"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.props}
          </h2>
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">{t.prop}</th>
                  <th className="text-left p-3 font-medium">{t.type}</th>
                  <th className="text-left p-3 font-medium">{t.default}</th>
                  <th className="text-left p-3 font-medium">{t.description}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">index</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">auto</td>
                  <td className="p-3">{t.cardIndexForStacking}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">stickyTop</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">100</td>
                  <td className="p-3">{t.baseStickyTopPosition}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">stackOffset</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">20</td>
                  <td className="p-3">{t.offsetBetweenStackedCards}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">endSpace</td>
                  <td className="p-3 font-mono text-xs">number | string</td>
                  <td className="p-3 font-mono text-xs">&quot;50vh&quot;</td>
                  <td className="p-3">{t.endSpaceDesc}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">className</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">{t.additionalCssClasses}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DocsPage>
  )
}
