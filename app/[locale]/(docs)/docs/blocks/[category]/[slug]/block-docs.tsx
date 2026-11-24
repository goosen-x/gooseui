import type { ReactNode } from "react"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"

type Row = [name: string, type: string, def: string, description: string]
type Pair = [name: string, text: string]

const rows = (value: Row[]) => value
const pairs = (value: Pair[]) => value

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

const labels = {
  en: {
    installation: "Installation",
    usage: "Usage",
    examples: "Examples",
    props: "Props",
    features: "Features",
    prop: "Prop",
    type: "Type",
    def: "Default",
    description: "Description",
  },
  ru: {
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    props: "Пропсы",
    features: "Возможности",
    prop: "Проп",
    type: "Тип",
    def: "По умолчанию",
    description: "Описание",
  },
} satisfies Dict<Record<string, string>>

function PropsTable({
  title,
  rows,
  locale,
}: {
  title: string
  rows: Row[]
  locale: Locale
}) {
  const l = labels[locale]
  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[500px] text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left font-medium">{l.prop}</th>
              <th className="p-3 text-left font-medium">{l.type}</th>
              <th className="p-3 text-left font-medium">{l.def}</th>
              <th className="p-3 text-left font-medium">{l.description}</th>
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
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* header-mega-menu                                                           */
/* -------------------------------------------------------------------------- */

const megaEn = {
  intro:
    "A header with a logo, a mega menu across the full width of the page, plain links and two buttons. The menu is the MegaMenu component: categories on the left, links of the selected one on the right. The open state lives in a native <details>, so click, Enter and tap work without JavaScript. With a mouse the panel also opens on hover, the delays come from CSS transition-delay. Categories are radio buttons, arrow keys switch them. Below 768px the menu turns into an accordion on <details name> and the plain links move to a second row. A 0.5 kB client script only adds closing on Escape, on an outside click and after a link is chosen.",
  browserSupport: "Browser Support",
  s0: "Keeps only one menu section open.",
  s1: "Styles the menu when a section is open.",
  s2: "Positions the menu near its trigger.",
  hint: "Hover the trigger or focus it and press Enter. Tab moves into the categories, arrow keys switch them, the next Tab goes to the links. Escape closes the menu.",
  customTitle: "Your own data",
  customText:
    "Categories, links, brand and texts come through props. Default texts are in English.",
  routerTitle: "Router links",
  routerText:
    "renderLink swaps the anchor for your router's link, for the header and for the links inside the menu. Pass the received props through. The menu closes after a click on any link inside it.",
  blockProps: "HeaderMegaMenu",
  menuProps: "MegaMenu",
  menuPropsText:
    "categories, labels, renderLink and the rest of the menu props belong to the MegaMenu component the block is built on:",
  rows: rows([
    ["brand", "string", '"Brand"', "Brand name next to the logo mark"],
    [
      "categories",
      "MegaMenuCategory[]",
      "demo data",
      "Categories: id, label, icon, description, links and footer",
    ],
    [
      "links",
      "{ label: string; href: string }[]",
      "Pricing, Company",
      "Plain links next to the menu trigger",
    ],
    [
      "labels",
      "{ home, menu, signIn, cta }",
      "English texts",
      "Texts of the logo link, menu trigger and buttons",
    ],
    ["signInHref", "string", '"#sign-in"', "Where the ghost button leads"],
    ["ctaHref", "string", '"#get-started"', "Where the main button leads"],
    ["className", "string", "-", "Classes for the header"],
    [
      "renderLink",
      "({ href, className, children }) => ReactNode",
      "<a>",
      "Render links with your own component",
    ],
  ]),
  menuRows: rows([
    [
      "layout",
      '"auto" | "columns" | "accordion"',
      '"auto"',
      "auto switches to the accordion below breakpoint",
    ],
    ["breakpoint", "number", "768", "Width in px where the accordion starts"],
    ["openDelay", "number", "120", "Hover delay before opening, ms"],
    [
      "closeDelay",
      "number",
      "280",
      "Delay before closing after the pointer leaves, ms",
    ],
    [
      "aimDelay",
      "number",
      "100",
      "Delay before a hovered category replaces the current one, ms",
    ],
    [
      "align",
      '"start" | "end"',
      '"start"',
      "Which edge of the trigger the panel lines up with",
    ],
    ["panelClassName", "string", "-", "Classes for the panel wrapper"],
  ]),
  features: pairs([
    [
      "Hover intent",
      "open, close and category-switch delays on CSS transition-delay, the panel does not flicker",
    ],
    [
      "Keyboard",
      "Enter opens, arrows switch categories, Escape closes and returns focus to the trigger",
    ],
    [
      "No JS",
      "opening, categories and the accordion work with JavaScript disabled, links are always in the HTML",
    ],
  ]),
}

const megaRu: typeof megaEn = {
  intro:
    "Хедер с логотипом, мега-меню на всю ширину страницы, обычными ссылками и двумя кнопками. Меню собрано из компонента MegaMenu: слева категории, справа ссылки выбранной. Открытость хранит нативный <details>, поэтому клик, Enter и касание работают без JavaScript. С мышью панель открывается ещё и по наведению, задержки задаёт CSS transition-delay. Категории сделаны на радиокнопках и переключаются стрелками. Ниже 768px меню становится аккордеоном на <details name>, а обычные ссылки уходят во вторую строку. Клиентский скрипт на 0,5 кБ только закрывает меню по Esc, по клику снаружи и после выбора ссылки.",
  browserSupport: "Поддержка браузеров",
  s0: "Оставляет открытым один раздел меню.",
  s1: "Меняет вид меню при открытии раздела.",
  s2: "Размещает меню рядом с кнопкой.",
  hint: "Наведите курсор на кнопку или сфокусируйте её и нажмите Enter. Tab переводит к категориям, стрелки их переключают, следующий Tab ведёт к ссылкам. Esc закрывает меню.",
  customTitle: "Свои данные",
  customText:
    "Категории, ссылки, название бренда и тексты приходят через пропсы. Тексты по умолчанию английские.",
  routerTitle: "Ссылки роутера",
  routerText:
    "Через renderLink можно заменить обычную ссылку на компонент вашего роутера: и в самом хедере, и внутри меню. Полученные пропсы передайте дальше. После клика по любой ссылке внутри меню оно закрывается.",
  blockProps: "HeaderMegaMenu",
  menuProps: "MegaMenu",
  menuPropsText:
    "Категории, тексты, renderLink и остальные пропсы меню относятся к компоненту MegaMenu, на котором собран блок:",
  rows: rows([
    ["brand", "string", '"Brand"', "Название бренда рядом со значком"],
    [
      "categories",
      "MegaMenuCategory[]",
      "демо-данные",
      "Категории: id, label, icon, description, links и footer",
    ],
    [
      "links",
      "{ label: string; href: string }[]",
      "Pricing, Company",
      "Обычные ссылки рядом с кнопкой меню",
    ],
    [
      "labels",
      "{ home, menu, signIn, cta }",
      "английские тексты",
      "Тексты ссылки на главную, кнопки меню и кнопок справа",
    ],
    ["signInHref", "string", '"#sign-in"', "Куда ведёт прозрачная кнопка"],
    ["ctaHref", "string", '"#get-started"', "Куда ведёт главная кнопка"],
    ["className", "string", "-", "Классы хедера"],
    [
      "renderLink",
      "({ href, className, children }) => ReactNode",
      "<a>",
      "Рендер ссылок своим компонентом",
    ],
  ]),
  menuRows: rows([
    [
      "layout",
      '"auto" | "columns" | "accordion"',
      '"auto"',
      "auto переключает на аккордеон ниже breakpoint",
    ],
    [
      "breakpoint",
      "number",
      "768",
      "Ширина в px, с которой начинается аккордеон",
    ],
    ["openDelay", "number", "120", "Задержка перед открытием по наведению, мс"],
    [
      "closeDelay",
      "number",
      "280",
      "Задержка перед закрытием, когда курсор ушёл, мс",
    ],
    [
      "aimDelay",
      "number",
      "100",
      "Задержка, после которой категория под курсором сменяет текущую, мс",
    ],
    [
      "align",
      '"start" | "end"',
      '"start"',
      "К какому краю кнопки выравнивается панель",
    ],
    ["panelClassName", "string", "-", "Классы обёртки панели"],
  ]),
  features: pairs([
    [
      "Наведение с задержкой",
      "задержки на открытие, закрытие и смену категории сделаны на CSS transition-delay, панель не мигает",
    ],
    [
      "Клавиатура",
      "Enter открывает, стрелки переключают категории, Esc закрывает и возвращает фокус на кнопку",
    ],
    [
      "Без JS",
      "открытие, категории и аккордеон работают с отключённым JavaScript, ссылки всегда есть в HTML",
    ],
  ]),
}

const mega: Dict<typeof megaEn> = { en: megaEn, ru: megaRu }

function MegaMenuDocs({ locale }: { locale: Locale }) {
  const t = mega[locale]
  const l = labels[locale]
  return (
    <>
      <p className="text-muted-foreground">{t.intro}</p>

      <BrowserSupport
        title={t.browserSupport}
        features={[
          { featureId: "details-name", description: t.s0 },
          { featureId: "has", description: t.s1 },
          { featureId: "anchor-positioning", description: t.s2 },
        ]}
      />
      <p className="text-sm text-muted-foreground">{t.hint}</p>

      <div className="space-y-4">
        <h2 id="installation" className={h2}>
          {l.installation}
        </h2>
        <InstallCommand packageName="@gooseui/header-mega-menu" />
      </div>

      <div className="space-y-4">
        <h2 id="usage" className={h2}>
          {l.usage}
        </h2>
        <CodeBlock>{`import { HeaderMegaMenu } from "@/components/blocks/headers/header-mega-menu"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderMegaMenu />
      <main>{children}</main>
    </>
  )
}`}</CodeBlock>
      </div>

      <div className="space-y-4">
        <h2 id="examples" className={h2}>
          {l.examples}
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="mb-3 text-lg font-medium">{t.customTitle}</h3>
            <p className="mb-4 text-sm text-muted-foreground">{t.customText}</p>
            <CodeBlock>{`<HeaderMegaMenu
  brand="Acme"
  labels={{ menu: "Catalog", signIn: "Log in", cta: "Try free" }}
  links={[{ label: "Pricing", href: "/pricing" }]}
  categories={[
    {
      id: "product",
      label: "Product",
      links: [
        { label: "Analytics", href: "/analytics", description: "Dashboards and reports" },
        { label: "API", href: "/api", description: "REST and webhooks" },
      ],
    },
    {
      id: "learn",
      label: "Learn",
      links: [{ label: "Guides", href: "/guides" }],
    },
  ]}
/>`}</CodeBlock>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-medium">{t.routerTitle}</h3>
            <p className="mb-4 text-sm text-muted-foreground">{t.routerText}</p>
            <CodeBlock>{`import Link from "next/link"

<HeaderMegaMenu renderLink={(props) => <Link {...props} />} />`}</CodeBlock>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 id="props" className={h2}>
          {l.props}
        </h2>
        <div className="space-y-6">
          <PropsTable title={t.blockProps} rows={t.rows} locale={locale} />
          <div>
            <p className="mb-3 text-sm text-muted-foreground">
              {t.menuPropsText}
            </p>
            <PropsTable title={t.menuProps} rows={t.menuRows} locale={locale} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 id="features" className={h2}>
          {l.features}
        </h2>
        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
          {t.features.map(([name, text]) => (
            <li key={name}>
              <strong className="text-foreground">{name}</strong>: {text}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/* header-morphing                                                            */
/* -------------------------------------------------------------------------- */

const morphEn = {
  intro:
    "A sticky header that shrinks while you scroll: padding, logo height and nav spacing follow the scroll position. It is a server component with no JavaScript, the animation is tied to the nearest scroller with animation-timeline: scroll(). Built from three components: MorphingHeader, MorphingLogo and MorphingNav.",
  browserSupport: "Browser Support",
  s0: "Shrinks the header while scrolling.",
  supportText:
    "The shrinking needs scroll-driven animations. Without them, or with reduced motion turned on, the header stays full size and works as a regular sticky header.",
  hint: "Scroll inside the preview: the header shrinks over the first 80 px.",
  thresholdTitle: "Custom threshold",
  thresholdText:
    "compactThreshold sets how many pixels of scroll it takes to reach the compact state:",
  customTitle: "Your own compact styles",
  customText:
    "Any element inside can follow the same scroll range. Reuse the --mh-threshold variable set on the header:",
  forcedTitle: "Forced compact state",
  forcedText:
    "isCompact on MorphingLogo or MorphingNav turns off their animation and keeps the compact size:",
  blockProps: "HeaderMorphing",
  rows: rows([
    ["brand", "string", '"Brand"', "Brand name next to the logo"],
    ["logoSrc", "string", "inline “B” mark", "Logo image URL"],
    [
      "links",
      "{ label: string; href: string }[]",
      "Features, Pricing, About",
      "Navigation links, hidden on screens narrower than 640px",
    ],
    ["ctaLabel", "string", '"Get started"', "Text of the main button"],
    ["ctaHref", "string", '"#get-started"', "Where the main button leads"],
    [
      "compactThreshold",
      "number",
      "80",
      "Scroll distance in px over which the header becomes compact",
    ],
    ["as", '"header" | "div"', '"header"', "Root element"],
    ["className", "string", "-", "Classes for the header"],
    [
      "renderLink",
      "({ href, className, children }) => ReactNode",
      "<a>",
      "Render links with your own component",
    ],
  ]),
  headerRows: rows([
    [
      "compactThreshold",
      "number",
      "100",
      "Scroll distance in px over which the header becomes compact",
    ],
    ["as", '"header" | "div"', '"header"', "Root element"],
    ["children", "ReactNode", "-", "Header content"],
    ["className", "string", "-", "Additional CSS classes"],
  ]),
  logoRows: rows([
    ["src", "string", "required", "Logo image source URL"],
    ["alt", "string", '""', "Alt text for the logo image"],
    ["fullSize", "number", "48", "Logo height (px) in full mode"],
    ["compactSize", "number", "32", "Logo height (px) in compact mode"],
    [
      "isCompact",
      "boolean",
      "false",
      "Always compact, without the scroll animation",
    ],
    ["className", "string", "-", "Additional CSS classes"],
  ]),
  navRows: rows([
    [
      "isCompact",
      "boolean",
      "false",
      "Always compact, without the scroll animation",
    ],
    ["children", "ReactNode", "-", "Navigation links or items"],
    ["className", "string", "-", "Additional CSS classes"],
  ]),
  parts: "Components",
  partsText:
    "The block is assembled from the morphing-header component. Use it directly to build your own layout:",
  headerDesc:
    "Sticky header. Its padding shrinks from 1rem to 0.5rem over the first compactThreshold pixels of scroll.",
  logoDesc:
    "Logo image whose height shrinks from fullSize to compactSize together with the header.",
  navDesc:
    "Navigation wrapper whose gap and font size shrink together with the header.",
}

const morphRu: typeof morphEn = {
  intro:
    "Липкий хедер, который сжимается при прокрутке: отступы, высота логотипа и промежутки в навигации следуют за позицией скролла. Это серверный компонент без JavaScript, анимация привязана к ближайшему прокручиваемому контейнеру через animation-timeline: scroll(). Собран из трёх компонентов: MorphingHeader, MorphingLogo и MorphingNav.",
  browserSupport: "Поддержка браузеров",
  s0: "Уменьшает шапку при прокрутке.",
  supportText:
    "Для сжатия нужны scroll-driven анимации. Без них или при включённом «уменьшении движения» шапка остаётся полного размера и работает как обычная липкая шапка.",
  hint: "Прокрутите превью: хедер сжимается за первые 80 px.",
  thresholdTitle: "Свой порог",
  thresholdText:
    "compactThreshold задаёт, за сколько пикселей прокрутки хедер станет компактным:",
  customTitle: "Свои стили компактного вида",
  customText:
    "Любой элемент внутри может идти по тому же отрезку прокрутки. Используйте переменную --mh-threshold, которую задаёт хедер:",
  forcedTitle: "Всегда компактный вид",
  forcedText:
    "isCompact у MorphingLogo или MorphingNav выключает их анимацию и оставляет компактный размер:",
  blockProps: "HeaderMorphing",
  rows: rows([
    ["brand", "string", '"Brand"', "Название бренда рядом с логотипом"],
    ["logoSrc", "string", "встроенный значок «B»", "URL изображения логотипа"],
    [
      "links",
      "{ label: string; href: string }[]",
      "Features, Pricing, About",
      "Ссылки навигации, скрыты ниже 640px",
    ],
    ["ctaLabel", "string", '"Get started"', "Текст главной кнопки"],
    ["ctaHref", "string", '"#get-started"', "Куда ведёт главная кнопка"],
    [
      "compactThreshold",
      "number",
      "80",
      "Сколько пикселей прокрутки нужно, чтобы хедер стал компактным",
    ],
    ["as", '"header" | "div"', '"header"', "Корневой элемент"],
    ["className", "string", "-", "Классы хедера"],
    [
      "renderLink",
      "({ href, className, children }) => ReactNode",
      "<a>",
      "Рендер ссылок своим компонентом",
    ],
  ]),
  headerRows: rows([
    [
      "compactThreshold",
      "number",
      "100",
      "Сколько пикселей прокрутки нужно, чтобы шапка стала компактной",
    ],
    ["as", '"header" | "div"', '"header"', "Корневой элемент"],
    ["children", "ReactNode", "-", "Содержимое шапки"],
    ["className", "string", "-", "Дополнительные CSS-классы"],
  ]),
  logoRows: rows([
    ["src", "string", "обязательный", "URL изображения логотипа"],
    ["alt", "string", '""', "Alt-текст логотипа"],
    ["fullSize", "number", "48", "Высота логотипа (px) в полном режиме"],
    ["compactSize", "number", "32", "Высота логотипа (px) в компактном режиме"],
    [
      "isCompact",
      "boolean",
      "false",
      "Всегда компактный вид, без анимации по скроллу",
    ],
    ["className", "string", "-", "Дополнительные CSS-классы"],
  ]),
  navRows: rows([
    [
      "isCompact",
      "boolean",
      "false",
      "Всегда компактный вид, без анимации по скроллу",
    ],
    ["children", "ReactNode", "-", "Ссылки или элементы навигации"],
    ["className", "string", "-", "Дополнительные CSS-классы"],
  ]),
  parts: "Компоненты",
  partsText:
    "Блок собран из компонента morphing-header. Используйте его напрямую, если нужна своя вёрстка:",
  headerDesc:
    "Липкая шапка. Её вертикальный отступ уменьшается с 1rem до 0.5rem за первые compactThreshold пикселей прокрутки.",
  logoDesc:
    "Картинка логотипа, высота которой уменьшается с fullSize до compactSize вместе со шапкой.",
  navDesc:
    "Обёртка навигации: промежутки и размер шрифта уменьшаются вместе со шапкой.",
}

const morph: Dict<typeof morphEn> = { en: morphEn, ru: morphRu }

function MorphingDocs({ locale }: { locale: Locale }) {
  const t = morph[locale]
  const l = labels[locale]
  return (
    <>
      <p className="text-muted-foreground">{t.intro}</p>

      <BrowserSupport
        title={t.browserSupport}
        features={[
          { featureId: "scroll-driven-animations", description: t.s0 },
        ]}
      />
      <p className="text-sm text-muted-foreground">
        {t.supportText} {t.hint}
      </p>

      <div className="space-y-4">
        <h2 id="installation" className={h2}>
          {l.installation}
        </h2>
        <InstallCommand packageName="@gooseui/header-morphing" />
      </div>

      <div className="space-y-4">
        <h2 id="usage" className={h2}>
          {l.usage}
        </h2>
        <CodeBlock>{`import { HeaderMorphing } from "@/components/blocks/headers/header-morphing"

<HeaderMorphing
  brand="Acme"
  links={[
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
  ]}
  ctaLabel="Sign up"
  ctaHref="/signup"
/>`}</CodeBlock>
      </div>

      <div className="space-y-4">
        <h2 id="examples" className={h2}>
          {l.examples}
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-lg font-semibold">{t.thresholdTitle}</h3>
            <p className="mb-3 text-sm text-muted-foreground">
              {t.thresholdText}
            </p>
            <CodeBlock>{`<HeaderMorphing compactThreshold={200} />`}</CodeBlock>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold">{t.forcedTitle}</h3>
            <p className="mb-3 text-sm text-muted-foreground">{t.forcedText}</p>
            <CodeBlock>{`<MorphingHeader>
  <div className="flex items-center justify-between">
    <MorphingLogo src="/logo.svg" alt="Logo" isCompact />
    <MorphingNav isCompact>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </MorphingNav>
  </div>
</MorphingHeader>`}</CodeBlock>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold">{t.customTitle}</h3>
            <p className="mb-3 text-sm text-muted-foreground">{t.customText}</p>
            <CodeBlock>{`/* In your global CSS */
@keyframes brand-compact {
  to { font-size: 0.875rem; }
}

@supports (animation-timeline: scroll()) {
  .brand {
    animation: brand-compact linear both;
    animation-timeline: scroll(nearest);
    animation-range: 0px var(--mh-threshold);
  }
}`}</CodeBlock>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 id="props" className={h2}>
          {l.props}
        </h2>
        <PropsTable title={t.blockProps} rows={t.rows} locale={locale} />
      </div>

      <div className="space-y-4">
        <h2 id="components" className={h2}>
          {t.parts}
        </h2>
        <p className="text-sm text-muted-foreground">{t.partsText}</p>
        <div className="space-y-6">
          <div>
            <p className="mb-3 text-sm text-muted-foreground">{t.headerDesc}</p>
            <PropsTable
              title="MorphingHeader"
              rows={t.headerRows}
              locale={locale}
            />
          </div>
          <div>
            <p className="mb-3 text-sm text-muted-foreground">{t.logoDesc}</p>
            <PropsTable
              title="MorphingLogo"
              rows={t.logoRows}
              locale={locale}
            />
          </div>
          <div>
            <p className="mb-3 text-sm text-muted-foreground">{t.navDesc}</p>
            <PropsTable title="MorphingNav" rows={t.navRows} locale={locale} />
          </div>
        </div>
      </div>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/* tap-coin                                                                   */
/* -------------------------------------------------------------------------- */

const tapEn = {
  intro:
    "A finished tap-to-earn screen: a balance counter, a 3D coin and an energy bar with a refill button. The coin tilts toward the point you press, has a reeded edge and a shine on top, and every tap releases a floating +N from that point. Several fingers at once work too. The tilt is a CSS transform driven by two custom properties; JavaScript only reads the tap point. Each tap spends one unit of energy, and when it runs out the coin turns off. The file also exports TapCoin, the coin on its own.",
  browserSupport: "Browser Support",
  s0: "Creates coin gradients and shades.",
  hint: "Tap the coin, try several fingers on a touch screen, or focus it and press Enter or Space.",
  textsTitle: "Your own texts and numbers",
  textsText:
    "Labels, energy capacity, points per tap and the coin face come through props. Default texts are in English.",
  coinTitle: "The coin on its own",
  coinText:
    "TapCoin is the same coin without the screen around it. The face color comes from --tap-coin-face, the text color from --tap-coin-fg, the edge and the shine are derived from the face color. formatValue changes what floats up.",
  blockProps: "TapToEarn",
  coinProps: "TapCoin",
  cssVars: "CSS variables",
  rows: rows([
    ["initialScore", "number", "0", "Starting balance"],
    ["value", "number", "1", "Points added per tap"],
    ["maxEnergy", "number", "20", "Energy capacity, a tap spends one unit"],
    ["coinSize", "number", "200", "Coin diameter in px"],
    ["children", "ReactNode", "star icon", "Coin face content"],
    [
      "labels",
      "{ balance, tap, energy, refill }",
      "English texts",
      "Texts of the balance, the coin button, the energy bar and the refill button",
    ],
    [
      "onScoreChange",
      "(score: number) => void",
      "-",
      "Called after every tap with the new balance",
    ],
    ["className", "string", "-", "Classes for the screen"],
  ]),
  coinRows: rows([
    [
      "onTap",
      "(value: number) => void",
      "-",
      "Called on every tap with the added amount",
    ],
    ["value", "number", "1", "Amount per tap, shown as +N"],
    ["children", "ReactNode", "-", "Coin face content"],
    ["size", "number", "200", "Coin diameter in px"],
    ["maxTilt", "number", "16", "Max tilt in degrees"],
    [
      "formatValue",
      "(value: number) => string",
      '"+" + value',
      "Formats the floating number",
    ],
    ["disabled", "boolean", "false", "Turns the coin off"],
    ["aria-label", "string", '"Tap"', "Accessible name of the button"],
    [
      "className / style",
      "string / CSSProperties",
      "-",
      "Classes and styles for the wrapper",
    ],
    ["...props", 'ComponentProps<"button">', "-", "Other button attributes"],
  ]),
  varRows: rows([
    ["--tap-coin-face", "CSS color", "var(--primary)", "Face color"],
    [
      "--tap-coin-fg",
      "CSS color",
      "var(--primary-foreground)",
      "Face content color",
    ],
  ]),
  features: pairs([
    ["3D tilt", "the coin leans toward the pressed point"],
    ["Multi-touch", "each finger releases its own number"],
    ["Keyboard", "it is a real button: focus ring, Enter and Space"],
    [
      "Reduced motion",
      "with prefers-reduced-motion there is no tilt and numbers just fade in and out",
    ],
  ]),
}

const tapRu: typeof tapEn = {
  intro:
    "Законченный экран tap-to-earn: счётчик баланса, 3D-монета и шкала энергии с кнопкой пополнения. Монета наклоняется к точке нажатия, у неё ребристый край и блик сверху, а из места каждого тапа всплывает +N. Можно нажимать несколькими пальцами сразу. Наклон делает CSS-трансформация через две переменные, а JavaScript только считывает точку нажатия. Каждый тап тратит единицу энергии, когда она кончается, монета выключается. Из файла также экспортируется TapCoin, сама монета отдельно.",
  browserSupport: "Поддержка браузеров",
  s0: "Создаёт градиенты и оттенки монеты.",
  hint: "Нажмите на монету, на сенсорном экране попробуйте несколько пальцев, или переведите на неё фокус и жмите Enter или пробел.",
  textsTitle: "Свои тексты и числа",
  textsText:
    "Подписи, запас энергии, очки за тап и лицо монеты задаются пропсами. Тексты по умолчанию английские.",
  coinTitle: "Монета отдельно",
  coinText:
    "TapCoin это та же монета без экрана вокруг. Цвет лицевой стороны берётся из --tap-coin-face, цвет текста из --tap-coin-fg, край и блик подстраиваются под цвет лица. formatValue меняет то, что всплывает.",
  blockProps: "TapToEarn",
  coinProps: "TapCoin",
  cssVars: "CSS-переменные",
  rows: rows([
    ["initialScore", "number", "0", "Начальный баланс"],
    ["value", "number", "1", "Сколько очков даёт тап"],
    ["maxEnergy", "number", "20", "Запас энергии, тап тратит единицу"],
    ["coinSize", "number", "200", "Диаметр монеты в px"],
    ["children", "ReactNode", "иконка звезды", "Содержимое лицевой стороны"],
    [
      "labels",
      "{ balance, tap, energy, refill }",
      "английские тексты",
      "Тексты баланса, кнопки-монеты, шкалы энергии и кнопки пополнения",
    ],
    [
      "onScoreChange",
      "(score: number) => void",
      "-",
      "Вызывается после каждого тапа, получает новый баланс",
    ],
    ["className", "string", "-", "Классы экрана"],
  ]),
  coinRows: rows([
    [
      "onTap",
      "(value: number) => void",
      "-",
      "Вызывается при каждом тапе, получает прибавку",
    ],
    ["value", "number", "1", "Сколько прибавляет тап, показывается как +N"],
    ["children", "ReactNode", "-", "Содержимое лицевой стороны"],
    ["size", "number", "200", "Диаметр монеты в px"],
    ["maxTilt", "number", "16", "Максимальный наклон в градусах"],
    [
      "formatValue",
      "(value: number) => string",
      '"+" + value',
      "Форматирует всплывающее число",
    ],
    ["disabled", "boolean", "false", "Выключает монету"],
    ["aria-label", "string", '"Tap"', "Доступное имя кнопки"],
    [
      "className / style",
      "string / CSSProperties",
      "-",
      "Классы и стили обёртки",
    ],
    ["...props", 'ComponentProps<"button">', "-", "Остальные атрибуты кнопки"],
  ]),
  varRows: rows([
    ["--tap-coin-face", "CSS color", "var(--primary)", "Цвет лицевой стороны"],
    [
      "--tap-coin-fg",
      "CSS color",
      "var(--primary-foreground)",
      "Цвет содержимого на монете",
    ],
  ]),
  features: pairs([
    ["Наклон в 3D", "монета клонится к точке нажатия"],
    ["Мультитач", "каждый палец выпускает своё число"],
    ["Клавиатура", "это настоящая кнопка: фокус, Enter и пробел"],
    [
      "Без анимации",
      "при prefers-reduced-motion наклона нет, числа просто появляются и гаснут",
    ],
  ]),
}

const tap: Dict<typeof tapEn> = { en: tapEn, ru: tapRu }

function TapCoinDocs({ locale }: { locale: Locale }) {
  const t = tap[locale]
  const l = labels[locale]
  return (
    <>
      <p className="text-muted-foreground">{t.intro}</p>

      <BrowserSupport
        title={t.browserSupport}
        features={[{ featureId: "color-mix", description: t.s0 }]}
      />
      <p className="text-sm text-muted-foreground">{t.hint}</p>

      <div className="space-y-4">
        <h2 id="installation" className={h2}>
          {l.installation}
        </h2>
        <InstallCommand packageName="@gooseui/tap-coin" />
      </div>

      <div className="space-y-4">
        <h2 id="usage" className={h2}>
          {l.usage}
        </h2>
        <CodeBlock>{`import { TapToEarn } from "@/components/blocks/web3/tap-coin"

export default function Page() {
  return <TapToEarn onScoreChange={(score) => console.log(score)} />
}`}</CodeBlock>
      </div>

      <div className="space-y-4">
        <h2 id="examples" className={h2}>
          {l.examples}
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="mb-3 text-lg font-medium">{t.textsTitle}</h3>
            <p className="mb-4 text-sm text-muted-foreground">{t.textsText}</p>
            <CodeBlock>{`<TapToEarn
  value={5}
  maxEnergy={50}
  labels={{ balance: "Points", energy: "Stamina", refill: "Rest" }}
>
  <span>XP</span>
</TapToEarn>`}</CodeBlock>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-medium">{t.coinTitle}</h3>
            <p className="mb-4 text-sm text-muted-foreground">{t.coinText}</p>
            <CodeBlock>{`import { TapCoin } from "@/components/blocks/web3/tap-coin"

<TapCoin
  size={96}
  value={10}
  formatValue={(v) => \`+\${v} XP\`}
  style={{
    "--tap-coin-face": "var(--chart-1)",
    "--tap-coin-fg": "var(--background)",
  } as React.CSSProperties}
>
  XP
</TapCoin>`}</CodeBlock>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 id="props" className={h2}>
          {l.props}
        </h2>
        <div className="space-y-6">
          <PropsTable title={t.blockProps} rows={t.rows} locale={locale} />
          <PropsTable title={t.coinProps} rows={t.coinRows} locale={locale} />
          <PropsTable title={t.cssVars} rows={t.varRows} locale={locale} />
        </div>
      </div>

      <div className="space-y-4">
        <h2 id="features" className={h2}>
          {l.features}
        </h2>
        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
          {t.features.map(([name, text]) => (
            <li key={name}>
              <strong className="text-foreground">{name}</strong>: {text}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

/* -------------------------------------------------------------------------- */

const DOCS: Record<string, (props: { locale: Locale }) => ReactNode> = {
  "header-mega-menu": MegaMenuDocs,
  "header-morphing": MorphingDocs,
  "tap-coin": TapCoinDocs,
}

/** Описание блока: установка, использование, примеры и пропсы. Null, если для блока его нет. */
export function BlockDocs({ slug, locale }: { slug: string; locale: Locale }) {
  const Docs = DOCS[slug]
  if (!Docs) return null
  return <Docs locale={locale} />
}
