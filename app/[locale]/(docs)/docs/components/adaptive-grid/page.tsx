import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { DocsSection } from "@/components/docs/docs-section"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { AdaptiveCard, AdaptiveGrid } from "@/registry/gooseui/ui/adaptive-grid"

const en = {
  browserSupport: "Browser Support",
  browserFeature0Description: "Adapt cards to the container width.",
  browserFeature1Description: "Changes card layout when an image is present.",
  description:
    "Grid that adapts layout based on container size and content using Container Queries and :has()",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  cssFeature: "How it works",
  props: "Props",
  gridThatAdaptsLayout:
    "Grid that adapts layout based on container size and content using Container Queries and :has() selector.",
  combinesContainerQueries: (
    <>
      Combines{" "}
      <code className="bg-muted px-1.5 py-0.5 rounded">@container</code> queries
      for responsive sizing with{" "}
      <code className="bg-muted px-1.5 py-0.5 rounded">:has(img)</code> to
      change layout based on content.
    </>
  ),
  cardsAdaptLayoutBasedOn:
    "Cards adapt layout based on container width and content.",
  wideContainer: "Wide container",
  cardWithImage: "Card with Image",
  thisCardHasAnImage:
    "This card has an image, so it expands on wider containers.",
  textOnlyCard: "Text Only Card",
  thisCardHasNoImage: "This card has no image, so the layout is compact.",
  narrowContainer: "Narrow container",
  withImage: "With Image",
  imageAdaptsToNarrowSpace: "Image adapts to narrow space.",
  thisCardHasAnImage2:
    "This card has an image, so it expands to show the image alongside the content on wider containers.",
  thisCardHasNoImage2:
    "This card has no image, so the layout is compact and vertical.",
  anotherTextCard: "Another Text Card",
  contentAdjusts:
    "Content adjusts automatically based on what's inside the card.",
  anotherImageCard: "Another Image Card",
  theGridRespondsToBoth:
    "The grid responds to both container size and card content.",
  narrowCard: "Narrow Card",
  inANarrowContainerCards: "In a narrow container, cards stack vertically.",
  imageCardsAlsoAdaptTo: "Image cards also adapt to narrow space.",
  theComponentUsesTailwind:
    "The component uses Tailwind's Container Queries plugin with the",
  selector: "selector:",
  optionalImageUrl: "Optional image URL",
  cardTitle: "Card title",
  minimumCardWidth: "Minimum card width (AdaptiveGrid)",
  additionalCssClasses: "Additional CSS classes",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    browserSupport: "Поддержка браузеров",
    browserFeature0Description: "Подстраивают карточки под ширину контейнера.",
    browserFeature1Description: "Меняет раскладку карточки с изображением.",
    description:
      "Сетка, которая подстраивает раскладку под размер контейнера и содержимое через Container Queries и :has()",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    cssFeature: "Как это работает",
    props: "Пропсы",
    gridThatAdaptsLayout:
      "Сетка, которая подстраивает раскладку под размер контейнера и содержимое через Container Queries и селектор :has().",
    combinesContainerQueries: (
      <>
        Сочетает{" "}
        <code className="bg-muted px-1.5 py-0.5 rounded">@container</code> для
        адаптивных размеров и{" "}
        <code className="bg-muted px-1.5 py-0.5 rounded">:has(img)</code>, чтобы
        менять раскладку в зависимости от содержимого.
      </>
    ),
    cardsAdaptLayoutBasedOn:
      "Карточки меняют раскладку в зависимости от ширины контейнера и содержимого.",
    wideContainer: "Широкий контейнер",
    cardWithImage: "Карточка с изображением",
    thisCardHasAnImage:
      "В карточке есть изображение, поэтому в широком контейнере она расширяется.",
    textOnlyCard: "Карточка только с текстом",
    thisCardHasNoImage:
      "В карточке нет изображения, поэтому раскладка компактная.",
    narrowContainer: "Узкий контейнер",
    withImage: "С изображением",
    imageAdaptsToNarrowSpace:
      "Изображение подстраивается под узкое пространство.",
    thisCardHasAnImage2:
      "В карточке есть изображение, поэтому в широком контейнере она показывает его рядом с содержимым.",
    thisCardHasNoImage2:
      "В карточке нет изображения, поэтому раскладка компактная и вертикальная.",
    anotherTextCard: "Ещё одна текстовая карточка",
    contentAdjusts:
      "Содержимое подстраивается автоматически под то, что лежит внутри карточки.",
    anotherImageCard: "Ещё одна карточка с изображением",
    theGridRespondsToBoth:
      "Сетка реагирует и на размер контейнера, и на содержимое карточек.",
    narrowCard: "Узкая карточка",
    inANarrowContainerCards:
      "В узком контейнере карточки выстраиваются в столбец.",
    imageCardsAlsoAdaptTo:
      "Карточки с изображением тоже подстраиваются под узкое пространство.",
    theComponentUsesTailwind:
      "Компонент использует плагин Container Queries из Tailwind вместе с",
    selector: "селектором:",
    optionalImageUrl: "URL изображения (необязательный)",
    cardTitle: "Заголовок карточки",
    minimumCardWidth: "Минимальная ширина карточки (AdaptiveGrid)",
    additionalCssClasses: "Дополнительные CSS-классы",
  },
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return {
    title: "Adaptive Grid",
    description: t.description,
  }
}

export default async function AdaptiveGridPage({ params }: Props) {
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
        <DocsPageNav title="Adaptive Grid" />

        <p className="text-muted-foreground">{t.gridThatAdaptsLayout}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "container-queries",

              description: t.browserFeature0Description,
            },
            {
              featureId: "has",

              description: t.browserFeature1Description,
            },
          ]}
        />

        {/* Preview section - custom layout for responsive demo */}
        <div className="space-y-4">
          <h2
            id="preview"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t.cardsAdaptLayoutBasedOn}
          </p>

          {/* Mobile: Static examples */}
          <div className="space-y-6 md:hidden">
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="mb-3 text-xs font-medium text-muted-foreground">
                {t.wideContainer}
              </p>
              <AdaptiveGrid className="w-full">
                <AdaptiveCard
                  title={t.cardWithImage}
                  image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
                >
                  {t.thisCardHasAnImage}
                </AdaptiveCard>
                <AdaptiveCard title={t.textOnlyCard}>
                  {t.thisCardHasNoImage}
                </AdaptiveCard>
              </AdaptiveGrid>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="mb-3 text-xs font-medium text-muted-foreground">
                {t.narrowContainer}
              </p>
              <div className="max-w-[12rem]">
                <AdaptiveCard
                  title={t.withImage}
                  image="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=300&fit=crop"
                >
                  {t.imageAdaptsToNarrowSpace}
                </AdaptiveCard>
              </div>
            </div>
          </div>

          {/* Desktop: the left pane resizes with native CSS (resize: horizontal) */}
          <div className="hidden md:block">
            <div className="flex min-h-[30rem] w-full overflow-hidden rounded-lg border bg-muted/30">
              <div className="w-3/4 min-w-[30%] max-w-[85%] flex-none resize-x overflow-auto border-r p-4">
                <div className="h-full">
                  <AdaptiveGrid className="w-full">
                    <AdaptiveCard
                      title={t.cardWithImage}
                      image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
                    >
                      {t.thisCardHasAnImage2}
                    </AdaptiveCard>
                    <AdaptiveCard title={t.textOnlyCard}>
                      {t.thisCardHasNoImage2}
                    </AdaptiveCard>
                    <AdaptiveCard title={t.anotherTextCard}>
                      {t.contentAdjusts}
                    </AdaptiveCard>
                    <AdaptiveCard
                      title={t.anotherImageCard}
                      image="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop"
                    >
                      {t.theGridRespondsToBoth}
                    </AdaptiveCard>
                  </AdaptiveGrid>
                </div>
              </div>
              <div className="min-w-0 flex-1 overflow-auto p-4">
                <div className="h-full">
                  <div className="flex flex-col gap-4">
                    <AdaptiveCard title={t.narrowCard}>
                      {t.inANarrowContainerCards}
                    </AdaptiveCard>
                    <AdaptiveCard
                      title={t.withImage}
                      image="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=300&fit=crop"
                    >
                      {t.imageCardsAlsoAdaptTo}
                    </AdaptiveCard>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DocsSection id="installation" title={t.installation}>
          <InstallCommand packageName="@gooseui/adaptive-grid" />
        </DocsSection>

        <DocsSection id="usage" title={t.usage}>
          <CodeBlock>{`import { AdaptiveGrid, AdaptiveCard } from "@/components/ui/adaptive-grid"

<AdaptiveGrid>
  <AdaptiveCard title="Card with image" image="/image.jpg">
    Description text
  </AdaptiveCard>
  <AdaptiveCard title="Card without image">
    This card has no image, so layout adjusts automatically.
  </AdaptiveCard>
</AdaptiveGrid>`}</CodeBlock>
        </DocsSection>

        <DocsSection id="css-feature" title={t.cssFeature}>
          <p className="text-muted-foreground mb-4">
            {t.theComponentUsesTailwind}{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded">:has()</code>{" "}
            {t.selector}
          </p>
          <CodeBlock>{`// AdaptiveCard uses :has() to detect if it contains an image
className={cn(
  "@container group/card",
  // Layout changes based on content with :has()
  "has-[img]:grid has-[img]:@sm:grid-cols-[140px_1fr]",
  "[&:not(:has(img))]:flex [&:not(:has(img))]:flex-col",
)}

// AdaptiveGrid uses container queries for responsive columns
className={cn(
  "@container",
  "grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4",
)}`}</CodeBlock>
        </DocsSection>

        <DocsPropsTable
          props={[
            {
              name: "image",
              type: "string",
              description: t.optionalImageUrl,
            },
            {
              name: "title",
              type: "string",
              description: t.cardTitle,
            },
            {
              name: "minCardWidth",
              type: "number",
              default: "280",
              description: t.minimumCardWidth,
            },
            {
              name: "className",
              type: "string",
              description: t.additionalCssClasses,
            },
          ]}
        />
      </div>
    </DocsPage>
  )
}
