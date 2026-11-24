import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { BaselineStatus } from "@/registry/gooseui/ui/baseline-status"
import {
  CornerBadgeCornersDemo,
  CornerBadgeDemo,
  CornerBadgeInitialsDemo,
  CornerBadgeLinkDemo,
  CornerBadgePhotoDemo,
  CornerBadgeTextDemo,
} from "./corner-badge-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  description: "Badge in a card corner with concave notches on both sides",
  intro:
    "A badge that sits in a card corner and looks cut into it: concave notches run along both edges next to it. The badge and the notches share one background, so a gradient flows through them without a joint.",
  browserSupport: "Browser support",
  browserText:
    "The photo variant uses CSS masks (mask-image, mask-composite) and the sqrt() and pow() math functions. The badge variant needs neither.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  usageText:
    "The card needs position: relative. The outer corner of the badge inherits the card's border-radius, so it fits any rounding.",
  examples: "Examples",
  cornersTitle: "Any corner",
  cornersText: "corner takes tl, tr, bl or br.",
  textTitle: "Short text and colors",
  textText:
    "color picks a theme token. notch and radius control the size of the notches and the inner corner.",
  linkTitle: "Interactive content",
  linkText:
    "Put a link or a button inside. Give it rounded-[inherit] so the focus ring follows the badge shape.",
  gradientTitle: "Gradient through CSS variables",
  gradientText:
    "--corner-badge-bg accepts any CSS background, --corner-badge-fg sets the content color. You can set them on the badge or on the card.",
  photoTitle: "Photo in the corner",
  photoText:
    'variant="photo" cuts the corner out of the card with a CSS mask and puts an image in the cut. The cut is concentric with the photo, so the gap is even along the arc, and it works on any page background and any card color. Give the card a fill (bg-muted) and no border or shadow: the mask removes the border in the cut, so the line would break, and a shadow would show as a grey rim around the photo. Tune the geometry with --corner-photo-size, --corner-photo-gap, --corner-photo-radius and --corner-photo-fillet (plain numbers in px). Use children instead of src for initials. The mask also hides anything the card puts outside the cut, so keep other content out of the corner.',
  props: "Props",
  features: "Features",
  propsHeaders: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  p: {
    variant:
      "badge fills the shape, photo cuts the corner and sets an image or children into it",
    src: "Image URL for the photo variant, rendered as a lazy img",
    alt: "Alt text of the image, empty string for decorative",
    shape: "Shape of the inset photo",
    gap: "Even gap around the photo in px",
    corner: "Card corner the badge sits in",
    size: "Badge side in px",
    notch:
      "Radius of the concave notches in px. For photo: fillet to the card edges",
    radius: "Radius of the inner corner in px. For a rounded photo: its radius",
    color: "Theme token used for the fill",
    children: "Icon or short text",
    className: "Additional CSS classes",
    rest: "Any other div attributes",
  },
  cssVars: "CSS variables",
  cssVarSize: "Photo side, a number in px",
  cssVarGap: "Even gap between the photo and the cut edge, px",
  cssVarRadius: "Radius of a rounded photo, px (the circle ignores it)",
  cssVarFillet: "Radius of the rounded transitions to the card edges, px",
  cssVarBg: "Fill of the badge and notches, gradients included",
  cssVarFg: "Content color",
  featureList: [
    ["No joint", "the badge and both notches share one background canvas"],
    ["Any radius", "the outer corner inherits the card's border-radius"],
    ["Four corners", "tl, tr, bl and br"],
    [
      "Photo variant",
      "a real mask cut concentric with the photo, on any background",
    ],
    ["Server-friendly", "no client JavaScript"],
  ],
  photo: {
    teacher: {
      name: "Anna Petrova",
      role: "Lead instructor, strategy",
      text: "Helps teams turn a vague idea into a clear plan. Runs the practice sessions and reviews final projects.",
      stats: "12 years · 4.9",
      cta: "Enroll",
    },
    author: {
      name: "Alex Morgan",
      tag: "Product design",
      title: "How to write a brief in one evening",
      excerpt:
        "Five questions that save a week of revisions, and a template you can copy.",
      meta: "Alex Morgan · 6 min read · Nov 12",
    },
    product: {
      name: "Canvas backpack",
      text: "Waxed canvas, a padded laptop sleeve and a water-resistant base.",
      price: "$89",
      oldPrice: "$109",
      discount: "-18%",
      cta: "Add to cart",
    },
    course: {
      name: "Product management",
      badge: "Online",
      text: "From a first interview to a launched product, with a final project.",
      duration: "6 months",
      lessons: "48 lessons",
      priceLabel: "Installments",
      price: "from $99/mo",
    },
  },
  initials: {
    name: "Anna Petrova",
    role: "Instructor, no photo yet",
    initials: "AP",
  },
  initialsTitle: "Initials instead of a photo",
  initialsText:
    "Pass children instead of src. The cut and the gap stay the same.",
  demo: {
    cardTitle: "Starter kit",
    cardText: "Everything you need to launch a small project.",
    newLabel: "New",
  },
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description: "Бейдж в углу карточки с вогнутыми скруглениями по бокам",
    intro:
      "Бейдж в углу карточки, который выглядит вырезанным в ней: по обе стороны от него идут вогнутые скругления. У бейджа и вырезов общий фон, поэтому градиент проходит через них без шва.",
    browserSupport: "Поддержка браузеров",
    browserText:
      "Вариант photo использует CSS-маски (mask-image, mask-composite) и математические функции sqrt() и pow(). Вариант badge обходится без них.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    usageText:
      "Карточке нужен position: relative. Внешний угол бейджа наследует border-radius карточки, так что бейдж садится на любое скругление.",
    examples: "Примеры",
    cornersTitle: "Любой угол",
    cornersText: "corner принимает tl, tr, bl или br.",
    textTitle: "Короткий текст и цвета",
    textText:
      "color выбирает токен темы. notch и radius задают размер вырезов и внутреннего скругления.",
    linkTitle: "Интерактивное содержимое",
    linkText:
      "Внутрь можно положить ссылку или кнопку. Добавьте ей rounded-[inherit], чтобы рамка фокуса повторяла форму бейджа.",
    gradientTitle: "Градиент через CSS-переменные",
    gradientText:
      "--corner-badge-bg принимает любой CSS-фон, --corner-badge-fg задаёт цвет содержимого. Переменные можно поставить на бейдж или на карточку.",
    photoTitle: "Фото в углу",
    photoText:
      'variant="photo" вырезает угол карточки CSS-маской и вставляет в вырез изображение. Вырез концентричен фото, поэтому зазор одинаковый по всей дуге, а работает он на любом фоне страницы и при любом цвете карточки. Дайте карточке заливку (bg-muted) без бордера и тени: маска убирает бордер в вырезе, и линия оборвалась бы, а тень проступила бы серой каймой вокруг фото. Геометрию задают --corner-photo-size, --corner-photo-gap, --corner-photo-radius и --corner-photo-fillet (числа в px). Для аватара с инициалами передайте children вместо src. Маска скрывает всё, что карточка выводит за пределами выреза, поэтому другой контент в угол не ставьте.',
    props: "Пропсы",
    features: "Возможности",
    propsHeaders: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    p: {
      variant:
        "badge заливает фигуру, photo вырезает угол и вставляет изображение или children",
      src: "URL изображения для photo, выводится как lazy img",
      alt: "Alt изображения, пустая строка для декоративного",
      shape: "Форма вписанного фото",
      gap: "Одинаковый зазор вокруг фото в px",
      corner: "Угол карточки, в котором стоит бейдж",
      size: "Сторона бейджа в px",
      notch:
        "Радиус вогнутых вырезов в px. Для photo: скругление у краёв карточки",
      radius: "Радиус внутреннего угла в px. Для скруглённого фото: его радиус",
      color: "Токен темы для заливки",
      children: "Иконка или короткий текст",
      className: "Дополнительные CSS-классы",
      rest: "Любые другие атрибуты div",
    },
    cssVars: "CSS-переменные",
    cssVarSize: "Сторона фото, число в px",
    cssVarGap: "Одинаковый зазор между фото и краем выреза, px",
    cssVarRadius: "Радиус скруглённого фото, px (круг его игнорирует)",
    cssVarFillet: "Радиус скруглённых переходов к краям карточки, px",
    cssVarBg: "Заливка бейджа и вырезов, градиенты тоже подходят",
    cssVarFg: "Цвет содержимого",
    featureList: [
      ["Без шва", "у бейджа и обоих вырезов общий фон"],
      ["Любой радиус", "внешний угол наследует border-radius карточки"],
      ["Четыре угла", "tl, tr, bl и br"],
      [
        "Вариант photo",
        "настоящий вырез маской, концентричный фото, на любом фоне",
      ],
      ["Работает на сервере", "клиентский JavaScript не нужен"],
    ],
    photo: {
      teacher: {
        name: "Анна Петрова",
        role: "Ведущий преподаватель, стратегия",
        text: "Помогает командам превратить смутную идею в понятный план. Ведёт практические занятия и разбирает итоговые проекты.",
        stats: "12 лет · 4.9",
        cta: "Записаться",
      },
      author: {
        name: "Алекс Морган",
        tag: "Продуктовый дизайн",
        title: "Как написать бриф за один вечер",
        excerpt:
          "Пять вопросов, которые сэкономят неделю правок, и шаблон, который можно скопировать.",
        meta: "Алекс Морган · 6 мин чтения · 12 ноября",
      },
      product: {
        name: "Холщовый рюкзак",
        text: "Вощёный холст, мягкий карман для ноутбука и влагостойкое дно.",
        price: "8 900 ₽",
        oldPrice: "10 900 ₽",
        discount: "-18%",
        cta: "В корзину",
      },
      course: {
        name: "Управление продуктом",
        badge: "Онлайн",
        text: "От первого интервью до запущенного продукта, с итоговым проектом.",
        duration: "6 месяцев",
        lessons: "48 уроков",
        priceLabel: "Рассрочка",
        price: "от 9 900 ₽/мес",
      },
    },
    initials: {
      name: "Анна Петрова",
      role: "Преподаватель, фото пока нет",
      initials: "АП",
    },
    initialsTitle: "Инициалы вместо фото",
    initialsText:
      "Передайте children вместо src. Вырез и зазор остаются прежними.",
    demo: {
      cardTitle: "Стартовый набор",
      cardText: "Всё, что нужно для запуска небольшого проекта.",
      newLabel: "New",
    },
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Corner Badge", description: t.description }
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

function PropsTable({
  headers,
  rows,
}: {
  headers: typeof en.propsHeaders
  rows: [string, string, string, string][]
}) {
  return (
    <div className="border rounded-lg overflow-x-auto">
      <table className="w-full text-sm min-w-[500px]">
        <thead className="bg-muted">
          <tr>
            <th className="text-left p-3 font-medium">{headers.prop}</th>
            <th className="text-left p-3 font-medium">{headers.type}</th>
            <th className="text-left p-3 font-medium">{headers.default}</th>
            <th className="text-left p-3 font-medium">{headers.description}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, type, def, desc]) => (
            <tr key={name} className="border-t">
              <td className="p-3 font-mono text-xs">{name}</td>
              <td className="p-3 font-mono text-xs">{type}</td>
              <td className="p-3 font-mono text-xs">{def}</td>
              <td className="p-3">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default async function CornerBadgePage({ params }: Props) {
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
        <DocsPageNav title="Corner Badge" />

        <p className="text-muted-foreground">{t.intro}</p>

        <div className="space-y-2">
          <h2 id="browser-support" className={h2}>
            {t.browserSupport}
          </h2>
          <p className="text-sm text-muted-foreground">{t.browserText}</p>
          <div className="flex flex-wrap gap-3">
            <BaselineStatus featureId="masks" />
            <BaselineStatus featureId="exp-functions" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <CornerBadgeDemo t={t.demo} />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/corner-badge" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <p className="text-sm text-muted-foreground">{t.usageText}</p>
          <CodeBlock>{`import { Sparkles } from "lucide-react"
import { CornerBadge } from "@/components/ui/corner-badge"

export default function Example() {
  return (
    <div className="relative rounded-2xl border bg-card p-6">
      <CornerBadge aria-hidden="true">
        <Sparkles className="size-5" />
      </CornerBadge>
      <h3 className="font-semibold">Starter kit</h3>
    </div>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.cornersTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.cornersText}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <CornerBadgeCornersDemo />
              </div>
              <CodeBlock className="mt-4">{`<CornerBadge corner="tl" size={40}><Star className="size-4" /></CornerBadge>
<CornerBadge corner="tr" size={40}><Heart className="size-4" /></CornerBadge>
<CornerBadge corner="bl" size={40}><Zap className="size-4" /></CornerBadge>
<CornerBadge corner="br" size={40}><ArrowUpRight className="size-4" /></CornerBadge>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.textTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.textText}</p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <CornerBadgeTextDemo t={t.demo} />
              </div>
              <CodeBlock className="mt-4">{`<div className="relative rounded-md border bg-card p-5">
  <CornerBadge color="foreground" size={44} notch={12} radius={10}>
    <span className="text-[11px] uppercase">New</span>
  </CornerBadge>
</div>

<div className="relative rounded-[2rem] border bg-card p-5">
  <CornerBadge color="destructive" size={52}>-20%</CornerBadge>
</div>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.linkTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.linkText}</p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <CornerBadgeLinkDemo t={t.demo} />
              </div>
              <CodeBlock className="mt-4">{`<CornerBadge color="secondary" size={44}>
  <a
    href="/kits/starter"
    aria-label="Open starter kit"
    className="flex size-full items-center justify-center rounded-[inherit] focus-visible:ring-[3px] focus-visible:ring-ring/50"
  >
    <ArrowUpRight className="size-5" />
  </a>
</CornerBadge>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.photoTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.photoText}
              </p>
              <div className="flex justify-center py-8 bg-background rounded-lg">
                <CornerBadgePhotoDemo t={t.photo} />
              </div>
              <CodeBlock className="mt-4">{`// Teacher card: fill only, no border or shadow.
// Content next to the photo is pushed by size + gap - padding (112 + 6 - 24 ≈ 104)
<div className="relative flex flex-col rounded-3xl bg-muted p-6">
  <CornerBadge
    variant="photo"
    corner="tl"
    size={112}
    gap={6}
    src="/teacher.webp"
    alt="Anna Petrova"
  />
  <div className="ml-[104px] min-h-[88px]">
    <div className="text-lg font-semibold">Anna Petrova</div>
    <p className="text-sm text-muted-foreground">Lead instructor, strategy</p>
  </div>
  <p className="mt-6 text-sm text-muted-foreground">
    Helps teams turn a vague idea into a clear plan.
  </p>
  <div className="mt-auto flex items-center justify-between pt-5">
    <span className="text-sm font-medium">12 years · 4.9</span>
    <Button size="sm">Enroll</Button>
  </div>
</div>

// Another corner: corner="tr" | "bl" | "br", then move the content padding
// to the matching side (mr, pr, pb, pl)
// Another shape: shape="rounded" with radius, e.g. a product or a course
<CornerBadge
  variant="photo"
  corner="br"
  shape="rounded"
  size={120}
  radius={28}
  src="/backpack.webp"
  alt="Canvas backpack"
/>

// Geometry through CSS variables (numbers in px) on the card
<div className="relative rounded-2xl bg-muted [--corner-photo-size:88] [--corner-photo-gap:8] [--corner-photo-fillet:20]">
  <CornerBadge variant="photo" corner="tl" src="/teacher.webp" alt="" />
</div>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.initialsTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.initialsText}
              </p>
              <div className="flex justify-center py-8 bg-background rounded-lg">
                <CornerBadgeInitialsDemo t={t.initials} />
              </div>
              <CodeBlock className="mt-4">{`<CornerBadge variant="photo" corner="tl" size={80}>AP</CornerBadge>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.gradientTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.gradientText}
              </p>
              <CodeBlock>{`<CornerBadge
  size={56}
  style={{
    "--corner-badge-bg": "linear-gradient(135deg, var(--chart-1), var(--chart-4))",
    "--corner-badge-fg": "var(--background)",
  } as React.CSSProperties}
>
  <Zap className="size-6" />
</CornerBadge>

// or with Tailwind on the card
<div className="relative rounded-3xl border [--corner-badge-bg:linear-gradient(135deg,var(--chart-1),var(--chart-4))]">
  <CornerBadge><Zap /></CornerBadge>
</div>`}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="props" className={h2}>
            {t.props}
          </h2>
          <PropsTable
            headers={t.propsHeaders}
            rows={[
              ["variant", '"badge" | "photo"', '"badge"', t.p.variant],
              ["src", "string", "-", t.p.src],
              ["alt", "string", '""', t.p.alt],
              ["shape", '"circle" | "rounded"', '"circle"', t.p.shape],
              ["gap", "number", "4", t.p.gap],
              ["corner", '"tl" | "tr" | "bl" | "br"', '"tr"', t.p.corner],
              ["size", "number", "48", t.p.size],
              ["notch", "number", "size × 0.4, photo: 16", t.p.notch],
              ["radius", "number", "notch, photo: size × 0.25", t.p.radius],
              [
                "color",
                '"primary" | "secondary" | "muted" | "foreground" | "destructive" | "background"',
                '"primary"',
                t.p.color,
              ],
              ["children", "ReactNode", "-", t.p.children],
              ["className", "string", "-", t.p.className],
              ["...props", 'ComponentProps<"div">', "-", t.p.rest],
            ]}
          />
          <h3 className="text-lg font-medium pt-2">{t.cssVars}</h3>
          <PropsTable
            headers={t.propsHeaders}
            rows={[
              ["--corner-badge-bg", "CSS background", "-", t.cssVarBg],
              ["--corner-badge-fg", "CSS color", "-", t.cssVarFg],
              ["--corner-photo-size", "number", "size", t.cssVarSize],
              ["--corner-photo-gap", "number", "gap", t.cssVarGap],
              [
                "--corner-photo-radius",
                "number",
                "size × 0.25",
                t.cssVarRadius,
              ],
              ["--corner-photo-fillet", "number", "16", t.cssVarFillet],
            ]}
          />
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
