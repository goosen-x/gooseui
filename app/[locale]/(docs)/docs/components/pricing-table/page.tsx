import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  type PricingPlan,
  PricingTable,
} from "@/registry/gooseui/ui/pricing-table"
import { PricingTableFormDemo } from "./pricing-table-demo"

type Props = { params: Promise<{ locale: string }> }

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

const en = {
  description:
    "Plan cards with a monthly/yearly switch on radio inputs, no JavaScript",
  intro:
    "Plan cards for a pricing page. The monthly/yearly switch is a pair of radio inputs, and CSS reads the checked one through :has() to show the matching prices, totals and links, so the table is a Server Component and ships no JavaScript. The price cross-fades in place without changing width. In a wide container every card spans the rows of a shared subgrid, so names, prices, buttons and feature lists line up across cards; in a narrow one the cards stack.",
  browserSupport: "Browser Support",
  supportHas:
    "Reads the checked period and swaps prices. Without it the switch is hidden and the default period is shown.",
  supportSubgrid:
    "Lines up card rows across columns. Without it cards are flex columns of their own.",
  supportContainer:
    "Stacks cards in a narrow container. Without it a 48rem media query is used.",
  supportColorMix:
    "Tints the highlighted card, the badge and the savings pill.",
  supportContrast:
    "Picks a readable text color on a custom accent. Without it accentForeground is used.",
  preview: "Preview",
  previewHint:
    "Switch to Yearly: prices, totals and the savings change with no script on the page.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  compareTitle: "Feature comparison",
  compareText:
    "Pass features as objects to mark missing ones and add a hint under a line. locale formats the prices, here in euros for Germany.",
  linksTitle: "Checkout link per period and a custom accent",
  linksText:
    "href accepts { monthly, yearly }: both links are rendered and CSS shows the one of the selected period. accentColor takes any CSS color; contrast-color() picks the text color where supported, accentForeground covers the rest.",
  formTitle: "Inside a form",
  formText:
    'Without href the plan button is a submit button with name="plan". Give the switch a name and a surrounding form receives both the plan and the period: send it to a Server Action or read it in onSubmit as here.',
  fixedTitle: "Fixed period",
  fixedText:
    "billing renders one period without a switch, for example when it comes from the URL.",
  narrowTitle: "Narrow container",
  narrowText:
    "The layout follows the container, not the viewport: in a sidebar the cards stack.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  pPlans: "Plans in display order",
  pDefaultBilling: "Period checked on first render",
  pBilling: "Fixed period: no switch, only these prices",
  pName: "Name of the radio group, for forms",
  pDiscount: "Pill next to Yearly, e.g. “Save 20%”",
  pAccent: "Color of the highlighted plan, any CSS color",
  pAccentFg: "Text on the accent where contrast-color() is missing",
  pLocale: "Locale for Intl.NumberFormat",
  pLabels: "Texts of the switch, price lines and screen reader hints",
  pClassName: "Classes for the wrapper",
  planTitle: "PricingPlan",
  planHeader: "Field",
  fId: "Unique id, also the value of the submit button",
  fName: "Plan name, an h3 inside an article",
  fPrice: "Price of one month and the total for a year",
  fCurrency: "ISO 4217 code",
  fFeatures: "Strings, or objects with included and hint",
  fCta: "Button text and a link: one, one per period, or none for a submit button",
  fHighlighted: "Accent border, tint and filled button",
  fBadge: "Label above the card",
  features: "Features",
  featureList: [
    [
      "No JavaScript",
      "a Server Component; the switch is native radio inputs read by :has()",
    ],
    [
      "Keyboard",
      "Tab reaches the switch, the arrow keys change the period, focus ring on the pill",
    ],
    [
      "Screen readers",
      "a fieldset with a legend, only the visible price is announced, features read as included or not included",
    ],
    ["Forms", "the period and the plan arrive as regular form fields"],
    [
      "Stable layout",
      "both prices share one grid cell, so the card does not jump when the period changes",
    ],
    ["Reduced motion", "the price changes without a transition"],
  ],
  saas: {
    currency: "USD",
    locale: "en-US",
    discount: "Save 20%",
    popular: "Most popular",
    trial: "Start free trial",
    sales: "Talk to sales",
    plans: [
      {
        name: "Starter",
        description: "For freelancers sending their first invoices.",
        monthly: 12,
        yearly: 115,
        features: [
          "1 user",
          "50 invoices a month",
          "Stripe and PayPal payouts",
          "Email support",
        ],
      },
      {
        name: "Growth",
        description:
          "For small teams that bill every week and want reminders on autopilot.",
        monthly: 30,
        yearly: 288,
        features: [
          "5 users",
          "Unlimited invoices",
          "Automatic payment reminders",
          "38 currencies",
          "QuickBooks and Xero sync",
          "Priority chat support",
        ],
      },
      {
        name: "Scale",
        description: "For finance teams with approvals and audits.",
        monthly: 79,
        yearly: 758,
        features: [
          "Unlimited users",
          "Approval workflows",
          "SAML single sign-on",
          "Audit log kept for 7 years",
          "Dedicated success manager",
        ],
      },
    ],
  },
  compare: {
    discount: "2 months free",
    hobbyName: "Hobby",
    hobbyText: "Personal projects and experiments.",
    hobbyCta: "Sign up free",
    proName: "Pro",
    proText: "Everything you need to ship client work.",
    proCta: "Upgrade to Pro",
    rows: [
      ["3 projects", "Unlimited projects"],
      ["1 GB storage", "100 GB storage"],
      ["Community support", "Email support, reply within 24 h"],
      ["Custom domains", "Custom domains"],
      ["Preview deployments", "Preview deployments"],
      ["Team roles", "Team roles"],
    ],
    storageHint: "€0.02 per extra GB",
    rolesHint: "Owner, editor, viewer",
  },
  studio: {
    discount: "Save 20%",
    best: "Best value",
    plans: [
      {
        name: "Solo",
        description: "One designer, unlimited files.",
        features: [
          "Unlimited files",
          "30 days of version history",
          "Export to SVG, PNG, PDF",
        ],
      },
      {
        name: "Studio",
        description: "Shared libraries for a design team.",
        features: [
          "Everything in Solo",
          "Shared component libraries",
          "Unlimited version history",
          "Developer handoff",
        ],
      },
      {
        name: "Agency",
        description: "Client workspaces and branded reviews.",
        features: [
          "Everything in Studio",
          "Client workspaces",
          "Branded review links",
          "Invoices per client",
        ],
      },
    ],
    choose: "Choose {name}",
  },
  labels: {
    billingPeriod: "Billing period",
    monthly: "Monthly",
    yearly: "Yearly",
    perMonth: "/ month",
    billedMonthly: "Billed monthly",
    billedYearly: "{total} billed yearly",
    free: "Free forever",
    included: "Included:",
    notIncluded: "Not included:",
    was: "was",
  },
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Карточки тарифов с переключателем «месяц/год» на радиокнопках, без JavaScript",
    intro:
      "Карточки тарифов для страницы с ценами. Переключатель «месяц/год» сделан из двух радиокнопок, а CSS через :has() видит, какая выбрана, и показывает нужные цены, суммы и ссылки. Поэтому таблица остаётся серверным компонентом и не отправляет в браузер ни строчки JavaScript. Цена сменяется плавно и на том же месте, ширина не прыгает. В широком контейнере каждая карточка занимает строки общей subgrid-сетки, и названия, цены, кнопки и списки возможностей выстраиваются в линию; в узком карточки встают друг под другом.",
    browserSupport: "Поддержка браузеров",
    supportHas:
      "Узнаёт выбранный период и меняет цены. Без него переключатель скрыт, показан период по умолчанию.",
    supportSubgrid:
      "Выравнивает строки карточек между колонками. Без него каждая карточка просто flex-колонка.",
    supportContainer:
      "Ставит карточки в столбик в узком контейнере. Без них работает медиазапрос на 48rem.",
    supportColorMix: "Подкрашивает выделенную карточку, бейдж и плашку скидки.",
    supportContrast:
      "Подбирает читаемый цвет текста на своём акценте. Без него берётся accentForeground.",
    preview: "Превью",
    previewHint:
      "Переключите на «Год»: цены, суммы и скидка меняются, а скриптов на странице нет.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    compareTitle: "Сравнение возможностей",
    compareText:
      "Передайте возможности объектами, чтобы отметить недоступные и добавить подсказку под строкой. locale задаёт формат цен, здесь евро для Германии.",
    linksTitle: "Своя ссылка на оплату для каждого периода и свой акцент",
    linksText:
      "href принимает { monthly, yearly }: на странице обе ссылки, CSS показывает ту, что подходит к выбранному периоду. accentColor принимает любой CSS-цвет; цвет текста подбирает contrast-color(), а где его нет, берётся accentForeground.",
    formTitle: "Внутри формы",
    formText:
      'Без href кнопка тарифа становится кнопкой отправки с name="plan". Дайте переключателю name, и форма вокруг получит и тариф, и период: отправьте её в Server Action или прочитайте в onSubmit, как здесь.',
    fixedTitle: "Один период",
    fixedText:
      "billing показывает один период без переключателя, например когда он приходит из URL.",
    narrowTitle: "Узкий контейнер",
    narrowText:
      "Раскладка зависит от контейнера, а не от окна: в боковой колонке карточки встают в столбик.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    pPlans: "Тарифы в порядке показа",
    pDefaultBilling: "Какой период выбран при первой отрисовке",
    pBilling: "Фиксированный период: без переключателя, только эти цены",
    pName: "name группы радиокнопок, нужен для форм",
    pDiscount: "Плашка рядом с «Год», например «−20%»",
    pAccent: "Цвет выделенного тарифа, любой CSS-цвет",
    pAccentFg: "Цвет текста на акценте, если нет contrast-color()",
    pLocale: "Локаль для Intl.NumberFormat",
    pLabels: "Тексты переключателя, строк с ценой и подсказок для скринридера",
    pClassName: "Классы обёртки",
    planTitle: "PricingPlan",
    planHeader: "Поле",
    fId: "Уникальный id, он же value кнопки отправки",
    fName: "Название тарифа, h3 внутри article",
    fPrice: "Цена за месяц и сумма за год",
    fCurrency: "Код валюты по ISO 4217",
    fFeatures: "Строки или объекты с included и hint",
    fCta: "Текст кнопки и ссылка: одна, своя на каждый период или никакой, тогда это кнопка отправки",
    fHighlighted: "Акцентная рамка, подкраска и залитая кнопка",
    fBadge: "Ярлык над карточкой",
    features: "Возможности",
    featureList: [
      [
        "Без JavaScript",
        "серверный компонент; переключатель — нативные радиокнопки, которые читает :has()",
      ],
      [
        "Клавиатура",
        "Tab доводит до переключателя, стрелки меняют период, у выбранной плашки кольцо фокуса",
      ],
      [
        "Скринридеры",
        "fieldset с legend, зачитывается только видимая цена, у возможностей слышно «входит» или «не входит»",
      ],
      ["Формы", "период и тариф уходят обычными полями формы"],
      [
        "Ничего не прыгает",
        "обе цены лежат в одной ячейке сетки, карточка не дёргается при смене периода",
      ],
      ["Меньше движения", "цена меняется без перехода"],
    ],
    saas: {
      currency: "RUB",
      locale: "ru-RU",
      discount: "−20%",
      popular: "Чаще всего берут",
      trial: "Попробовать бесплатно",
      sales: "Связаться с отделом продаж",
      plans: [
        {
          name: "Старт",
          description: "Для фрилансеров, которые выставляют первые счета.",
          monthly: 990,
          yearly: 9500,
          features: [
            "1 пользователь",
            "50 счетов в месяц",
            "Оплата картой и по СБП",
            "Поддержка по почте",
          ],
        },
        {
          name: "Рост",
          description:
            "Для небольших команд, которые выставляют счета каждую неделю и не хотят напоминать о них вручную.",
          monthly: 2490,
          yearly: 23900,
          features: [
            "5 пользователей",
            "Без лимита на счета",
            "Автоматические напоминания об оплате",
            "38 валют",
            "Синхронизация с 1С и МоёДело",
            "Приоритетная поддержка в чате",
          ],
        },
        {
          name: "Масштаб",
          description: "Для финансовых отделов с согласованиями и аудитом.",
          monthly: 6490,
          yearly: 62300,
          features: [
            "Сколько угодно пользователей",
            "Цепочки согласования",
            "Вход через SAML SSO",
            "Журнал действий хранится 7 лет",
            "Персональный менеджер",
          ],
        },
      ],
    },
    compare: {
      discount: "2 месяца в подарок",
      hobbyName: "Хобби",
      hobbyText: "Личные проекты и эксперименты.",
      hobbyCta: "Зарегистрироваться",
      proName: "Про",
      proText: "Всё, чтобы сдавать проекты клиентам.",
      proCta: "Перейти на Про",
      rows: [
        ["3 проекта", "Сколько угодно проектов"],
        ["1 ГБ хранилища", "100 ГБ хранилища"],
        ["Помощь сообщества", "Поддержка по почте, ответ за 24 часа"],
        ["Свои домены", "Свои домены"],
        ["Превью-деплои", "Превью-деплои"],
        ["Роли в команде", "Роли в команде"],
      ],
      storageHint: "0,02 € за каждый дополнительный ГБ",
      rolesHint: "Владелец, редактор, наблюдатель",
    },
    studio: {
      discount: "−20%",
      best: "Самый выгодный",
      plans: [
        {
          name: "Соло",
          description: "Один дизайнер, сколько угодно файлов.",
          features: [
            "Сколько угодно файлов",
            "История версий за 30 дней",
            "Экспорт в SVG, PNG, PDF",
          ],
        },
        {
          name: "Студия",
          description: "Общие библиотеки для команды дизайнеров.",
          features: [
            "Всё из тарифа «Соло»",
            "Общие библиотеки компонентов",
            "Вся история версий",
            "Передача макетов разработчикам",
          ],
        },
        {
          name: "Агентство",
          description: "Пространства для клиентов и брендированные ревью.",
          features: [
            "Всё из тарифа «Студия»",
            "Отдельные пространства для клиентов",
            "Ссылки на ревью с вашим логотипом",
            "Счета по каждому клиенту",
          ],
        },
      ],
      choose: "Выбрать «{name}»",
    },
    labels: {
      billingPeriod: "Период оплаты",
      monthly: "Месяц",
      yearly: "Год",
      perMonth: "/ мес.",
      billedMonthly: "Оплата раз в месяц",
      billedYearly: "{total} при оплате за год",
      free: "Бесплатно навсегда",
      included: "Входит:",
      notIncluded: "Не входит:",
      was: "было",
    },
  },
}

type T = typeof en

function saasPlans(t: T): PricingPlan[] {
  return t.saas.plans.map((plan, index) => ({
    id: ["starter", "growth", "scale"][index],
    name: plan.name,
    description: plan.description,
    price: { monthly: plan.monthly, yearly: plan.yearly },
    currency: t.saas.currency,
    features: plan.features,
    highlighted: index === 1,
    badge: index === 1 ? t.saas.popular : undefined,
    cta: {
      label: index === 2 ? t.saas.sales : t.saas.trial,
      href: `#plan-${index}`,
    },
  }))
}

function comparePlans(t: T): PricingPlan[] {
  const c = t.compare
  return [
    {
      id: "hobby",
      name: c.hobbyName,
      description: c.hobbyText,
      price: { monthly: 0, yearly: 0 },
      currency: "EUR",
      features: c.rows.map(([label], index) => ({
        label,
        included: index < 3,
      })),
      cta: { label: c.hobbyCta, href: "#hobby" },
    },
    {
      id: "pro",
      name: c.proName,
      description: c.proText,
      price: { monthly: 19, yearly: 182.4 },
      currency: "EUR",
      highlighted: true,
      features: c.rows.map(([, label], index) => ({
        label,
        included: true,
        hint:
          index === 1 ? c.storageHint : index === 5 ? c.rolesHint : undefined,
      })),
      cta: { label: c.proCta, href: "#pro" },
    },
  ]
}

const studioPrices = [
  [15, 144],
  [45, 432],
  [120, 1152],
] as const

function studioPlans(t: T): PricingPlan[] {
  return t.studio.plans.map((plan, index) => {
    const id = ["solo", "studio", "agency"][index]
    return {
      id,
      name: plan.name,
      description: plan.description,
      price: {
        monthly: studioPrices[index][0],
        yearly: studioPrices[index][1],
      },
      currency: "USD",
      features: plan.features,
      highlighted: index === 1,
      badge: index === 1 ? t.studio.best : undefined,
      cta: {
        label: t.studio.choose.replace("{name}", plan.name),
        href: {
          monthly: `#checkout-${id}-monthly`,
          yearly: `#checkout-${id}-yearly`,
        },
      },
    }
  })
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Pricing Table", description: t.description }
}

export default async function PricingTablePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
  const numberLocale = t.saas.locale

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
    ["plans", "PricingPlan[]", "-", t.pPlans],
    ["defaultBilling", '"monthly" | "yearly"', '"monthly"', t.pDefaultBilling],
    ["billing", '"monthly" | "yearly"', "-", t.pBilling],
    ["name", "string", "useId()", t.pName],
    ["yearlyDiscountLabel", "ReactNode", "-", t.pDiscount],
    ["accentColor", "string", "var(--primary)", t.pAccent],
    ["accentForeground", "string", "-", t.pAccentFg],
    ["locale", "string", '"en-US"', t.pLocale],
    ["labels", "Partial<PricingTableLabels>", "English", t.pLabels],
    ["className", "string", "-", t.pClassName],
  ]

  const planRows: [string, string, string][] = [
    ["id", "string", t.fId],
    ["name", "ReactNode", t.fName],
    ["price", "{ monthly: number; yearly: number }", t.fPrice],
    ["currency", "string", t.fCurrency],
    ["features", "(string | PricingFeatureObject)[]", t.fFeatures],
    ["cta", "{ label; href?: string | { monthly; yearly } }", t.fCta],
    ["highlighted", "boolean", t.fHighlighted],
    ["badge", "ReactNode", t.fBadge],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Pricing Table" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            { featureId: "has", description: t.supportHas },
            { featureId: "subgrid", description: t.supportSubgrid },
            {
              featureId: "container-queries",
              description: t.supportContainer,
            },
            { featureId: "color-mix", description: t.supportColorMix },
            { featureId: "contrast-color", description: t.supportContrast },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="rounded-lg bg-muted/30 px-4 py-12">
            <PricingTable
              plans={saasPlans(t)}
              yearlyDiscountLabel={t.saas.discount}
              locale={numberLocale}
              labels={t.labels}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/pricing-table" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { PricingTable, type PricingPlan } from "@/components/ui/pricing-table"

const plans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: { monthly: 12, yearly: 115 },
    currency: "USD",
    features: ["1 user", "50 invoices a month"],
    cta: { label: "Start free trial", href: "/signup?plan=starter" },
  },
  {
    id: "growth",
    name: "Growth",
    price: { monthly: 30, yearly: 288 },
    currency: "USD",
    highlighted: true,
    badge: "Most popular",
    features: ["5 users", "Unlimited invoices"],
    cta: { label: "Start free trial", href: "/signup?plan=growth" },
  },
]

export default function Pricing() {
  return <PricingTable plans={plans} yearlyDiscountLabel="Save 20%" />
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-lg font-medium">{t.compareTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.compareText}
              </p>
              <div className="rounded-lg bg-muted/30 px-4 py-8">
                <PricingTable
                  className="mx-auto max-w-3xl"
                  plans={comparePlans(t)}
                  yearlyDiscountLabel={t.compare.discount}
                  locale="de-DE"
                  labels={t.labels}
                />
              </div>
              <CodeBlock className="mt-4">{`<PricingTable
  locale="de-DE"
  yearlyDiscountLabel="2 months free"
  plans={[
    {
      id: "hobby",
      name: "Hobby",
      price: { monthly: 0, yearly: 0 },
      currency: "EUR",
      features: [
        { label: "3 projects", included: true },
        { label: "Custom domains", included: false },
      ],
      cta: { label: "Sign up free", href: "/signup" },
    },
    {
      id: "pro",
      name: "Pro",
      price: { monthly: 19, yearly: 182.4 },
      currency: "EUR",
      highlighted: true,
      features: [
        { label: "100 GB storage", included: true, hint: "€0.02 per extra GB" },
        { label: "Custom domains", included: true },
      ],
      cta: { label: "Upgrade to Pro", href: "/upgrade" },
    },
  ]}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.linksTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.linksText}
              </p>
              <div className="rounded-lg bg-muted/30 px-4 py-8">
                <PricingTable
                  plans={studioPlans(t)}
                  defaultBilling="yearly"
                  yearlyDiscountLabel={t.studio.discount}
                  accentColor="oklch(0.72 0.16 160)"
                  accentForeground="black"
                  locale={numberLocale}
                  labels={t.labels}
                />
              </div>
              <CodeBlock className="mt-4">{`<PricingTable
  defaultBilling="yearly"
  accentColor="oklch(0.72 0.16 160)"
  accentForeground="black"
  plans={[
    {
      id: "studio",
      name: "Studio",
      price: { monthly: 45, yearly: 432 },
      currency: "USD",
      highlighted: true,
      badge: "Best value",
      features: ["Shared component libraries"],
      cta: {
        label: "Choose Studio",
        href: {
          monthly: "/checkout?plan=studio&period=monthly",
          yearly: "/checkout?plan=studio&period=yearly",
        },
      },
    },
  ]}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.formTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{t.formText}</p>
              <div className="rounded-lg bg-muted/30 px-4 py-8">
                <PricingTableFormDemo />
              </div>
              <CodeBlock className="mt-4">{`// app/pricing/page.tsx: a Server Component
import { redirect } from "next/navigation"

async function subscribe(formData: FormData) {
  "use server"
  const plan = formData.get("plan") // "solo" | "studio" | "agency"
  const billing = formData.get("billing") // "monthly" | "yearly"
  redirect(\`/checkout?plan=\${plan}&billing=\${billing}\`)
}

export default function Pricing() {
  return (
    <form action={subscribe}>
      {/* no href: every CTA is <button type="submit" name="plan" value={id}> */}
      <PricingTable name="billing" plans={plans} />
    </form>
  )
}`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.fixedTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.fixedText}
              </p>
              <div className="rounded-lg bg-muted/30 px-4 py-8">
                <PricingTable
                  plans={saasPlans(t).slice(0, 2)}
                  billing="yearly"
                  className="mx-auto max-w-3xl"
                  locale={numberLocale}
                  labels={t.labels}
                />
              </div>
              <CodeBlock className="mt-4">{`// app/pricing/page.tsx
export default async function Pricing({ searchParams }) {
  const { period } = await searchParams
  return (
    <PricingTable
      plans={plans}
      billing={period === "yearly" ? "yearly" : "monthly"}
    />
  )
}`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.narrowTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.narrowText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <div className="w-full max-w-sm">
                  <PricingTable
                    plans={saasPlans(t)}
                    yearlyDiscountLabel={t.saas.discount}
                    locale={numberLocale}
                    labels={t.labels}
                  />
                </div>
              </div>
              <CodeBlock className="mt-4">{`<aside className="max-w-sm">
  <PricingTable plans={plans} />
</aside>`}</CodeBlock>
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

          <h3 className="pt-2 text-lg font-medium">{t.planTitle}</h3>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[500px] text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left font-medium">{t.planHeader}</th>
                  <th className="p-3 text-left font-medium">
                    {t.headers.type}
                  </th>
                  <th className="p-3 text-left font-medium">
                    {t.headers.description}
                  </th>
                </tr>
              </thead>
              <tbody>
                {planRows.map(([field, type, description]) => (
                  <tr key={field} className="border-t">
                    <td className="p-3 font-mono text-xs">{field}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3">{description}</td>
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
