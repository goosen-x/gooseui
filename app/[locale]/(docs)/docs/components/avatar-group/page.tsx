import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  Avatar,
  AvatarGroup,
  type AvatarSize,
} from "@/registry/gooseui/ui/avatar-group"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/gooseui/ui/card"
import { AvatarGroupClickDemo, type DemoPerson } from "./avatar-group-demo"

type Props = { params: Promise<{ locale: string }> }

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

const en = {
  description:
    "Overlapping avatars with initials, status dots and a +N bubble, no JavaScript",
  intro:
    "Avatars with an initials fallback and a presence dot, stacked into an overlapping group. Avatars past max collapse into a +N bubble whose tooltip and accessible name list who is hidden. On hover or keyboard focus the group fans out with a small stagger. Both components are server components: sizes come from CSS variables instead of React context, and a broken image URL falls back to initials without onError.",
  browserSupport: "Browser Support",
  supportColorMix:
    "Tints the background and the initials from the theme colors, so they follow light and dark mode.",
  supportFocusWithin:
    "Fans the group out when a link or button inside it gets keyboard focus.",
  supportSibling:
    "Computes the stacking order and the stagger from the position. Elsewhere the same rules read --i and --n, set inline on every item.",
  preview: "Preview",
  previewHint: "Hover the group or tab into it to fan it out.",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  clickTitle: "Clickable avatars",
  clickText:
    "onAvatarClick turns every avatar into a button, onOverflowClick does the same for +N. Callbacks are functions, so this only works inside a client component.",
  linkTitle: "+N as a link",
  linkText:
    "overflowHref makes the bubble a plain link, for example to the members page. Works in a server component and without JavaScript.",
  sizesTitle: "Sizes and spacing",
  sizesText:
    "size is sm, md or lg; spacing tight, normal or loose sets how much the avatars overlap at rest.",
  statusTitle: "Statuses and fallbacks",
  statusText:
    "The second-to-last avatar has a broken image URL and shows initials. Without a name the avatar shows a generic person icon. The colors come from the name, so a person always gets the same one.",
  cardTitle: "Inside a card",
  cardText:
    "The ring around each avatar follows --avatar-ring. On a card, set it to the card color.",
  meeting: "Q1 roadmap review",
  meetingTime: "Thursday, 14:00 · Room Fjord",
  attending: "6 attending",
  attendees: "Attendees",
  team: "Team",
  more: (n: number, names: string[]) => `${n} more: ${names.join(", ")}`,
  allMembers: "Show all members",
  status: { online: "online", away: "away", busy: "busy" },
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  groupProps: "AvatarGroup",
  avatarProps: "Avatar",
  pMax: "Avatars shown before the +N bubble. All when omitted",
  pSize: "Size of every avatar in the group",
  pSpacing: "How much the avatars overlap at rest",
  pFanOut: "Spread the avatars apart on hover and keyboard focus",
  pOverflowHref: "Turns +N into a link",
  pOverflowLabel: "Tooltip and accessible name of +N",
  pOnAvatarClick: "Makes each avatar a button. Client components only",
  pOnOverflowClick: "Makes +N a button. Client components only",
  pName: "Full name: initials, color and accessible label",
  pSrc: "Image URL. Initials stay visible while it loads and when it fails",
  pAlt: "Accessible label. Defaults to name",
  pAvatarSize: "Defaults to the group size, otherwise md",
  pStatus: "Presence dot in the bottom corner",
  pStatusLabels: "Words for the status in the accessible label",
  pClassName: "Additional CSS classes",
  components: "Components",
  componentHeader: "Component",
  cGroup: "Overlapping list (role=list) with the +N bubble",
  cAvatar: "One round avatar (role=img). Works on its own as well",
  features: "Features",
  featureList: [
    [
      "No JavaScript",
      "both components render on the server, the fan-out and the stacking are pure CSS",
    ],
    [
      "Image fallback without onError",
      "the photo is a background layer over the initials: a URL that fails to load paints nothing, so the initials stay",
    ],
    [
      "Accessible",
      "the group is a list, every avatar has a label with its status, +N names the hidden people",
    ],
    [
      "Theme aware",
      "the name colors are mixed with --background and --foreground, so they work in light and dark mode",
    ],
    ["Reduced motion", "the fan-out happens without a transition"],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Аватары внахлёст с инициалами, статусом и счётчиком +N, без JavaScript",
    intro:
      "Аватары с инициалами вместо фото и точкой статуса, собранные в группу внахлёст. Всё, что не влезло в max, сворачивается в кружок +N: в подсказке и в имени для скринридера перечислены скрытые люди. При наведении или фокусе с клавиатуры группа разъезжается веером с небольшой задержкой между аватарами. Оба компонента серверные: размер передаётся через CSS-переменные, а не через React-контекст, а если картинка не загрузилась, видны инициалы, и onError для этого не нужен.",
    browserSupport: "Поддержка браузеров",
    supportColorMix:
      "Подкрашивает фон и инициалы цветами темы, поэтому они подстраиваются под светлую и тёмную тему.",
    supportFocusWithin:
      "Раскрывает группу, когда фокус с клавиатуры попадает на ссылку или кнопку внутри.",
    supportSibling:
      "Считает порядок наложения и задержку по позиции элемента. В остальных браузерах те же правила берут --i и --n, которые проставлены у каждого элемента.",
    preview: "Превью",
    previewHint:
      "Наведите курсор на группу или перейдите в неё клавишей Tab, и она раскроется.",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    clickTitle: "Кликабельные аватары",
    clickText:
      "onAvatarClick превращает каждый аватар в кнопку, onOverflowClick делает то же с +N. Колбэки это функции, поэтому так можно только внутри клиентского компонента.",
    linkTitle: "+N как ссылка",
    linkText:
      "overflowHref делает кружок обычной ссылкой, например на страницу участников. Работает в серверном компоненте и без JavaScript.",
    sizesTitle: "Размеры и плотность",
    sizesText:
      "size бывает sm, md или lg; spacing (tight, normal или loose) задаёт, насколько аватары заходят друг на друга в покое.",
    statusTitle: "Статусы и запасные варианты",
    statusText:
      "У предпоследнего аватара битая ссылка на картинку, поэтому видны инициалы. Без имени показывается значок человека. Цвет считается по имени, так что у одного человека он всегда один и тот же.",
    cardTitle: "Внутри карточки",
    cardText:
      "Обводка вокруг аватаров берёт цвет из --avatar-ring. На карточке задайте ей цвет карточки.",
    meeting: "Обсуждение роадмапа на I квартал",
    meetingTime: "Четверг, 14:00 · переговорка «Фьорд»",
    attending: "Придут 6 человек",
    attendees: "Участники встречи",
    team: "Команда",
    more: (n: number, names: string[]) => `Ещё ${n}: ${names.join(", ")}`,
    allMembers: "Показать всех участников",
    status: { online: "в сети", away: "отошёл", busy: "занят" },
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    groupProps: "AvatarGroup",
    avatarProps: "Avatar",
    pMax: "Сколько аватаров показать до кружка +N. Если не задан, показываются все",
    pSize: "Размер всех аватаров группы",
    pSpacing: "Насколько аватары заходят друг на друга в покое",
    pFanOut: "Раздвигать аватары при наведении и фокусе с клавиатуры",
    pOverflowHref: "Делает +N ссылкой",
    pOverflowLabel: "Подсказка и имя для скринридера у +N",
    pOnAvatarClick:
      "Делает каждый аватар кнопкой. Только в клиентских компонентах",
    pOnOverflowClick: "Делает +N кнопкой. Только в клиентских компонентах",
    pName: "Полное имя: из него берутся инициалы, цвет и подпись",
    pSrc: "Адрес картинки. Пока она грузится или если не загрузилась, видны инициалы",
    pAlt: "Подпись для скринридера. По умолчанию name",
    pAvatarSize: "По умолчанию размер группы, а без группы md",
    pStatus: "Точка статуса в нижнем углу",
    pStatusLabels: "Слова для статуса в подписи",
    pClassName: "Дополнительные CSS-классы",
    components: "Компоненты",
    componentHeader: "Компонент",
    cGroup: "Список внахлёст (role=list) с кружком +N",
    cAvatar: "Один круглый аватар (role=img). Работает и сам по себе",
    features: "Возможности",
    featureList: [
      [
        "Без JavaScript",
        "оба компонента рендерятся на сервере, веер и порядок наложения сделаны на CSS",
      ],
      [
        "Запасной вариант без onError",
        "фото лежит фоном поверх инициалов: если адрес не загрузился, фон просто не рисуется, и инициалы остаются на месте",
      ],
      [
        "Доступность",
        "группа размечена как список, у каждого аватара есть подпись со статусом, +N перечисляет скрытых людей",
      ],
      [
        "Светлая и тёмная тема",
        "цвета по имени смешиваются с --background и --foreground, поэтому подходят обеим темам",
      ],
      ["Меньше движения", "веер раскрывается без анимации"],
    ],
  },
}

// Small illustrated portraits as data URIs, so the demo works offline
function portrait(skin: string, hair: string, shirt: string, bg: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="${bg}"/><path d="M10 64c2-14 11-20 22-20s20 6 22 20z" fill="${shirt}"/><circle cx="32" cy="28" r="12" fill="${skin}"/><path d="M19 27c0-9 6-14 13-14s13 5 13 14c-3-5-8-7-13-7s-10 2-13 7z" fill="${hair}"/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

const BROKEN = "/avatars/diego-missing.jpg"

const team: DemoPerson[] = [
  {
    name: "Amara Okafor",
    status: "online",
    src: portrait("#8d5524", "#1b1b1b", "#2563eb", "#dbeafe"),
  },
  {
    name: "Lukas Brenner",
    status: "away",
    src: portrait("#f1c27d", "#a0522d", "#16a34a", "#dcfce7"),
  },
  {
    name: "Mei Tanaka",
    status: "busy",
    src: portrait("#ffdbac", "#111827", "#db2777", "#fce7f3"),
  },
  { name: "Diego Ramírez", src: BROKEN },
  {
    name: "Sofia Lindqvist",
    status: "online",
    src: portrait("#ffe0bd", "#e8c07d", "#7c3aed", "#ede9fe"),
  },
  { name: "Noah Fischer" },
  {
    name: "Aisha Rahman",
    status: "online",
    src: portrait("#c68642", "#2d1b0e", "#ea580c", "#ffedd5"),
  },
  { name: "Jonas Weber" },
  { name: "Chloé Martin" },
  { name: "Ravi Iyer", status: "away" },
  { name: "Hana Novak" },
  { name: "Ethan Cole" },
]

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Avatar Group", description: t.description }
}

function PropsTable({
  rows,
  headers,
}: {
  rows: [string, string, string, string][]
  headers: typeof en.headers
}) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[500px] text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="p-3 text-left font-medium">{headers.prop}</th>
            <th className="p-3 text-left font-medium">{headers.type}</th>
            <th className="p-3 text-left font-medium">{headers.default}</th>
            <th className="p-3 text-left font-medium">{headers.description}</th>
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
  )
}

export default async function AvatarGroupPage({ params }: Props) {
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
    { id: "components", title: t.components, level: 2 },
    { id: "features", title: t.features, level: 2 },
  ]

  const groupRows: [string, string, string, string][] = [
    ["max", "number", "-", t.pMax],
    ["size", '"sm" | "md" | "lg"', '"md"', t.pSize],
    ["spacing", '"tight" | "normal" | "loose"', '"normal"', t.pSpacing],
    ["fanOut", "boolean", "true", t.pFanOut],
    ["overflowHref", "string", "-", t.pOverflowHref],
    [
      "overflowLabel",
      "(count, names) => string",
      '"N more: …"',
      t.pOverflowLabel,
    ],
    ["onAvatarClick", "({ index, name }) => void", "-", t.pOnAvatarClick],
    ["onOverflowClick", "() => void", "-", t.pOnOverflowClick],
    ["className", "string", "-", t.pClassName],
  ]
  const avatarRows: [string, string, string, string][] = [
    ["name", "string", "-", t.pName],
    ["src", "string", "-", t.pSrc],
    ["alt", "string", "name", t.pAlt],
    ["size", '"sm" | "md" | "lg"', "-", t.pAvatarSize],
    ["status", '"online" | "away" | "busy"', "-", t.pStatus],
    [
      "statusLabels",
      "Partial<Record<AvatarStatus, string>>",
      "-",
      t.pStatusLabels,
    ],
    ["className", "string", "-", t.pClassName],
  ]

  const avatars = (people: DemoPerson[], withStatus = true) =>
    people.map((person) => (
      <Avatar
        key={person.name}
        name={person.name}
        src={person.src}
        status={withStatus ? person.status : undefined}
        statusLabels={t.status}
      />
    ))

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Avatar Group" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            { featureId: "color-mix", description: t.supportColorMix },
            { featureId: "focus-within", description: t.supportFocusWithin },
            { featureId: "sibling-count", description: t.supportSibling },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <AvatarGroup
              max={5}
              size="lg"
              aria-label={t.team}
              overflowLabel={t.more}
              overflowHref="#examples"
            >
              {avatars(team)}
            </AvatarGroup>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/avatar-group" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { Avatar, AvatarGroup } from "@/components/ui/avatar-group"

export function Team({ people }) {
  return (
    <AvatarGroup max={5} aria-label="Team">
      {people.map((person) => (
        <Avatar
          key={person.id}
          name={person.name}
          src={person.photo}
          status={person.online ? "online" : undefined}
        />
      ))}
    </AvatarGroup>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-lg font-medium">{t.clickTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.clickText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 py-8">
                <AvatarGroupClickDemo team={team} />
              </div>
              <CodeBlock className="mt-4">{`"use client"

const [selected, setSelected] = useState<string | null>(null)
const [showAll, setShowAll] = useState(false)

<AvatarGroup
  max={showAll ? undefined : 5}
  onAvatarClick={({ name }) => setSelected(name ?? null)}
  onOverflowClick={() => setShowAll(true)}
>
  {team.map((person) => (
    <Avatar key={person.name} {...person} />
  ))}
</AvatarGroup>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.linkTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{t.linkText}</p>
              <div className="flex justify-center rounded-lg bg-muted/30 py-8">
                <AvatarGroup
                  max={4}
                  aria-label={t.team}
                  overflowHref="#props"
                  overflowLabel={(count, names) =>
                    `${t.allMembers}. ${t.more(count, names)}`
                  }
                >
                  {avatars(team, false)}
                </AvatarGroup>
              </div>
              <CodeBlock className="mt-4">{`<AvatarGroup max={4} overflowHref="/team/members">
  {team.map((person) => (
    <Avatar key={person.name} name={person.name} src={person.src} />
  ))}
</AvatarGroup>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.sizesTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.sizesText}
              </p>
              <div className="space-y-5 rounded-lg bg-muted/30 p-6">
                {(["sm", "md", "lg"] as AvatarSize[]).map((size) => (
                  <div
                    key={size}
                    className="flex flex-wrap items-center gap-x-8 gap-y-3"
                  >
                    <span className="w-8 font-mono text-xs text-muted-foreground">
                      {size}
                    </span>
                    {(["tight", "normal", "loose"] as const).map((spacing) => (
                      <AvatarGroup
                        key={spacing}
                        size={size}
                        spacing={spacing}
                        max={4}
                        aria-label={`${spacing}, ${size}`}
                        overflowLabel={t.more}
                      >
                        {avatars(team.slice(0, 7), false)}
                      </AvatarGroup>
                    ))}
                  </div>
                ))}
              </div>
              <CodeBlock className="mt-4">{`<AvatarGroup size="sm" spacing="tight" max={4}>…</AvatarGroup>
<AvatarGroup size="md" spacing="normal" max={4}>…</AvatarGroup>
<AvatarGroup size="lg" spacing="loose" max={4}>…</AvatarGroup>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.statusTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.statusText}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 rounded-lg bg-muted/30 py-8">
                <Avatar
                  size="lg"
                  name="Amara Okafor"
                  src={team[0].src}
                  status="online"
                  statusLabels={t.status}
                />
                <Avatar
                  size="lg"
                  name="Lukas Brenner"
                  src={team[1].src}
                  status="away"
                  statusLabels={t.status}
                />
                <Avatar
                  size="lg"
                  name="Mei Tanaka"
                  src={team[2].src}
                  status="busy"
                  statusLabels={t.status}
                />
                <Avatar size="lg" name="Noah Fischer" />
                <Avatar
                  size="lg"
                  name="Hana Novak"
                  status="away"
                  statusLabels={t.status}
                />
                <Avatar
                  size="lg"
                  name="Diego Ramírez"
                  src={BROKEN}
                  status="online"
                  statusLabels={t.status}
                />
                <Avatar size="lg" />
              </div>
              <CodeBlock className="mt-4">{`<Avatar size="lg" name="Amara Okafor" src="/amara.jpg" status="online" />
<Avatar size="lg" name="Noah Fischer" />
<Avatar size="lg" name="Diego Ramírez" src="/missing.jpg" status="online" />
<Avatar size="lg" />`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.cardTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{t.cardText}</p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <Card className="w-full max-w-sm [--avatar-ring:var(--card)]">
                  <CardHeader>
                    <CardTitle>{t.meeting}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {t.meetingTime}
                    </p>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <AvatarGroup
                      size="sm"
                      max={3}
                      aria-label={t.attendees}
                      overflowLabel={t.more}
                    >
                      {avatars(team.slice(4, 10))}
                    </AvatarGroup>
                    <span className="text-xs text-muted-foreground">
                      {t.attending}
                    </span>
                  </CardContent>
                </Card>
              </div>
              <CodeBlock className="mt-4">{`<Card className="[--avatar-ring:var(--card)]">
  <CardContent>
    <AvatarGroup size="sm" max={3} aria-label="Attendees">…</AvatarGroup>
  </CardContent>
</Card>`}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="props" className={h2}>
            {t.props}
          </h2>
          <h3 className="text-lg font-medium">{t.groupProps}</h3>
          <PropsTable rows={groupRows} headers={t.headers} />
          <h3 className="text-lg font-medium">{t.avatarProps}</h3>
          <PropsTable rows={avatarRows} headers={t.headers} />
        </div>

        <div className="space-y-4">
          <h2 id="components" className={h2}>
            {t.components}
          </h2>
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left font-medium">
                    {t.componentHeader}
                  </th>
                  <th className="p-3 text-left font-medium">
                    {t.headers.description}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">AvatarGroup</td>
                  <td className="p-3">{t.cGroup}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">Avatar</td>
                  <td className="p-3">{t.cAvatar}</td>
                </tr>
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
