import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  PromoBannerDemo,
  PromoBannerGradients,
  PromoBannerPositions,
} from "./promo-banner-demo"

const en = {
  description:
    "Floating promotional banner with marquee animation, discount badges, and localStorage persistence",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  props: "Props",
  floatingPromotional:
    'Floating promotional banner for campaigns and sales. It is a non-modal <dialog> rendered on the server: the close button is a <form method="dialog">, so it works without JavaScript. The marquee and the entry animation are pure CSS. A small client script runs only when you pass storageKey, onClose or onCtaClick: it remembers the dismissal and calls the callbacks.',
  browserSupport: "Browser Support",
  supportDescription0: "Displays the promotional banner.",
  supportDescription1: "Animates the banner entrance.",
  supportDescription2: "Animates the banner exit.",
  browserSupportText:
    "The banner needs only <dialog>. Without @starting-style and transition-behavior it appears and closes without animation.",
  marqueeNote:
    "The marquee keyframes ship inside the component, nothing to add to globals.css. The marquee pauses on hover and stops for reduced motion.",
  positions: "Positions",
  chooseWhereTheBanner: "Choose where the banner appears on screen",
  customGradients: "Custom Gradients",
  customizeTheGradient:
    "The gradient takes colors from theme tokens, so it follows the active theme. Pass any Tailwind classes to change it",
  withLocalstorage: "With localStorage",
  rememberWhenUserCloses:
    "Remember when the user closes the banner. An inline script hides a dismissed banner before the first paint, so it does not flash.",
  usingProvider: "Using Provider",
  globalBannerManagement:
    "Global banner management with context. The provider and the hook are client code.",
  prop: "Prop",
  type: "Type",
  default: "Default",
  description2: "Description",
  mainHeadlineText: "Main headline text",
  currentPrice: "Current price",
  smallTitleAboveHeadline: "Small title above headline",
  originalPriceCrossedOut: "Original price (crossed out)",
  currencySymbol: "Currency symbol",
  ctaButtonText: "CTA button text",
  ctaButtonLink: "CTA button link",
  scrollingTextAtBottom: "Scrolling text at bottom",
  bannerPosition: "Banner position",
  gradientStartColorClass: "Gradient start color class",
  gradientEndColorClass: "Gradient end color class",
  localstorageKeyFor: "localStorage key for persistence",
  delayBeforeShowingMs: "Delay before showing (ms)",
  productImageUrls: "Product image URLs",
  closeCallback: "Close callback, client components only",
  ctaCallback: "CTA click callback, client components only",
  defaultOpenText: "Render the banner open",
  patternText: "Diagonal lines on the background",
  labelsText: "Accessible names of the banner and the close button",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Плавающий промо-баннер с бегущей строкой, бейджами скидок и сохранением состояния в localStorage",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    props: "Пропсы",
    floatingPromotional:
      'Плавающий промо-баннер для акций и распродаж. Это немодальный <dialog>, который рисуется на сервере: кнопка закрытия сделана через <form method="dialog"> и работает без JavaScript. Бегущая строка и появление на чистом CSS. Небольшой клиентский скрипт подключается, только если передать storageKey, onClose или onCtaClick: он запоминает закрытие и вызывает колбэки.',
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Показывает промобаннер.",
    supportDescription1: "Анимирует появление баннера.",
    supportDescription2: "Анимирует исчезновение баннера.",
    browserSupportText:
      "Баннеру нужен только <dialog>. Без @starting-style и transition-behavior он появляется и закрывается без анимации.",
    marqueeNote:
      "Keyframes бегущей строки лежат внутри компонента, в globals.css ничего добавлять не нужно. Строка встаёт на паузу при наведении и не двигается при reduced motion.",
    positions: "Позиции",
    chooseWhereTheBanner: "Выберите, в каком углу экрана появится баннер",
    customGradients: "Свои градиенты",
    customizeTheGradient:
      "Градиент берёт цвета из токенов темы и следует за активной темой. Передайте свои классы Tailwind, чтобы изменить его",
    withLocalstorage: "С localStorage",
    rememberWhenUserCloses:
      "Запоминает, что пользователь закрыл баннер. Встроенный скрипт прячет закрытый баннер до первой отрисовки, поэтому он не мигает.",
    usingProvider: "Через Provider",
    globalBannerManagement:
      "Глобальное управление баннером через контекст. Провайдер и хук работают на клиенте.",
    prop: "Проп",
    type: "Тип",
    default: "По умолчанию",
    description2: "Описание",
    mainHeadlineText: "Главный заголовок",
    currentPrice: "Текущая цена",
    smallTitleAboveHeadline: "Небольшой заголовок над основным",
    originalPriceCrossedOut: "Старая цена (зачёркнута)",
    currencySymbol: "Символ валюты",
    ctaButtonText: "Текст кнопки CTA",
    ctaButtonLink: "Ссылка кнопки CTA",
    scrollingTextAtBottom: "Бегущая строка внизу",
    bannerPosition: "Позиция баннера",
    gradientStartColorClass: "Класс начального цвета градиента",
    gradientEndColorClass: "Класс конечного цвета градиента",
    localstorageKeyFor: "Ключ localStorage для сохранения состояния",
    delayBeforeShowingMs: "Задержка перед показом (мс)",
    productImageUrls: "URL изображений товара",
    closeCallback: "Колбэк закрытия, только из клиентского компонента",
    ctaCallback: "Колбэк клика по CTA, только из клиентского компонента",
    defaultOpenText: "Отрисовать баннер открытым",
    patternText: "Диагональные линии на фоне",
    labelsText: "Доступные имена баннера и кнопки закрытия",
  },
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return {
    title: "Promo Banner",
    description: t.description,
  }
}

export default async function PromoBannerPage({ params }: Props) {
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

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Promo Banner" />
        <p className="text-muted-foreground">{t.floatingPromotional}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "dialog",
              description: t.supportDescription0,
            },
            {
              featureId: "starting-style",
              description: t.supportDescription1,
            },
            {
              featureId: "transition-behavior",
              description: t.supportDescription2,
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
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg min-h-[200px]">
            <PromoBannerDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/promo-banner" />
          <p className="text-sm text-muted-foreground">{t.marqueeNote}</p>
        </div>

        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.usage}
          </h2>
          <CodeBlock>{`import { PromoBanner } from "@/components/ui/promo-banner"

export default function Page() {
  return (
    <PromoBanner
      title="Winter Campaign"
      headline="START THE NEW YEAR WITH A BANG!"
      price={229}
      originalPrice={1444}
      ctaText="Get Bundle"
      ctaHref="/docs"
      marqueeText="3 DAYS LEFT • FIRST 100 ONLY"
      storageKey="promo-winter"
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
            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.positions}</h3>
              <p className="text-sm text-muted-foreground">
                {t.chooseWhereTheBanner}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg min-h-[9.375rem]">
                <PromoBannerPositions />
              </div>
              <CodeBlock>{`<PromoBanner position="top-left" />
<PromoBanner position="top-right" />
<PromoBanner position="bottom-left" />
<PromoBanner position="bottom-right" /> // default`}</CodeBlock>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.customGradients}</h3>
              <p className="text-sm text-muted-foreground">
                {t.customizeTheGradient}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg min-h-[9.375rem]">
                <PromoBannerGradients />
              </div>
              <CodeBlock>{`<PromoBanner
  gradientFrom="from-foreground"
  gradientTo="to-[color-mix(in_oklab,var(--foreground)_40%,var(--primary))]"
/>`}</CodeBlock>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.withLocalstorage}</h3>
              <p className="text-sm text-muted-foreground">
                {t.rememberWhenUserCloses}
              </p>
              <CodeBlock>{`<PromoBanner
  storageKey="promo-winter"
  delay={3000} // show after 3 seconds
/>`}</CodeBlock>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.usingProvider}</h3>
              <p className="text-sm text-muted-foreground">
                {t.globalBannerManagement}
              </p>
              <CodeBlock>{`import { Button } from "@/components/ui/button"

import { PromoBannerProvider, usePromoBanner } from "@/components/ui/promo-banner"

// In layout or app
<PromoBannerProvider>
  <App />
</PromoBannerProvider>

// Anywhere in your app
function Component() {
  const { show, hide } = usePromoBanner()

  return (
    <Button onClick={() => show({
      headline: "Flash Sale!",
      price: 99,
      originalPrice: 199,
    })}>
      Show Promo
    </Button>
  )
}`}</CodeBlock>
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
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">{t.prop}</th>
                  <th className="text-left p-3 font-medium">{t.type}</th>
                  <th className="text-left p-3 font-medium">{t.default}</th>
                  <th className="text-left p-3 font-medium">
                    {t.description2}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">headline</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">required</td>
                  <td className="p-3">{t.mainHeadlineText}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">price</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">{t.currentPrice}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">title</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">"Special Offer"</td>
                  <td className="p-3">{t.smallTitleAboveHeadline}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">originalPrice</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">{t.originalPriceCrossedOut}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">currency</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">"$"</td>
                  <td className="p-3">{t.currencySymbol}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">ctaText</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">"Get Now"</td>
                  <td className="p-3">{t.ctaButtonText}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">ctaHref</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">"#"</td>
                  <td className="p-3">{t.ctaButtonLink}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">marqueeText</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">{t.scrollingTextAtBottom}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">position</td>
                  <td className="p-3 font-mono text-xs">
                    "bottom-right" | "bottom-left" | "top-right" | "top-left"
                  </td>
                  <td className="p-3 font-mono text-xs">"bottom-right"</td>
                  <td className="p-3">{t.bannerPosition}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">gradientFrom</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">"from-foreground"</td>
                  <td className="p-3">{t.gradientStartColorClass}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">gradientTo</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">{`"to-[color-mix(in_oklab,var(--foreground)_55%,var(--primary))]"`}</td>
                  <td className="p-3">{t.gradientEndColorClass}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">storageKey</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">{t.localstorageKeyFor}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">delay</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">0</td>
                  <td className="p-3">{t.delayBeforeShowingMs}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">images</td>
                  <td className="p-3 font-mono text-xs">string[]</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">{t.productImageUrls}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">defaultOpen</td>
                  <td className="p-3 font-mono text-xs">boolean</td>
                  <td className="p-3 font-mono text-xs">true</td>
                  <td className="p-3">{t.defaultOpenText}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">showPattern</td>
                  <td className="p-3 font-mono text-xs">boolean</td>
                  <td className="p-3 font-mono text-xs">false</td>
                  <td className="p-3">{t.patternText}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">labels</td>
                  <td className="p-3 font-mono text-xs">
                    {"{ banner?: string; close?: string }"}
                  </td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">{t.labelsText}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">onClose</td>
                  <td className="p-3 font-mono text-xs">() =&gt; void</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">{t.closeCallback}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">onCtaClick</td>
                  <td className="p-3 font-mono text-xs">() =&gt; void</td>
                  <td className="p-3 font-mono text-xs">-</td>
                  <td className="p-3">{t.ctaCallback}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DocsPage>
  )
}
