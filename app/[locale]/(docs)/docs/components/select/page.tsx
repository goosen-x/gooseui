import { Building2, Rocket, Sparkles, Users } from "lucide-react"
import { setRequestLocale } from "next-intl/server"
import type * as React from "react"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { Label } from "@/registry/gooseui/ui/label"
import { Select, SelectGroup, SelectOption } from "@/registry/gooseui/ui/select"
import { SelectControlledDemo, SelectFormDemo } from "./select-demo"

type Props = { params: Promise<{ locale: string }> }

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

const en = {
  description:
    "Native select with a fully styled picker: icons, descriptions and a check mark",
  intro:
    "A plain <select> rendered on the server. In browsers with customizable select (appearance: base-select) the picker becomes a styled popover with icons, a second line of text and a check mark, and the closed field shows the icon of the chosen option. Other browsers keep their own native picker, with the field styled like Input. The value, form submission, required, reset and keyboard all come from the browser.",
  browserSupport: "Browser Support",
  supportCustomizable:
    "Styles the picker, option icons and descriptions. They are added after hydration, because browsers with the old HTML parser strip tags inside <select>. Without support the browser shows its native picker with plain option text.",
  supportHas:
    "Dims the placeholder while nothing is picked. Without it the placeholder uses the normal text color.",
  supportStarting:
    "Fades the picker in when it opens. Without it the picker appears at once.",
  supportTransition:
    "Fades the picker out when it closes. Without it the picker disappears at once.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  groupsTitle: "Groups, placeholder and sizes",
  groupsText:
    "SelectGroup renders <optgroup>. placeholder adds a hidden empty option, so the form will not submit a required field until something is chosen. Sizes are sm, md and lg.",
  controlledTitle: "Controlled value",
  controlledText:
    "value and onValueChange from a client component. onValueChange receives the string value; the regular onChange still works.",
  formTitle: "Inside a form",
  formText:
    "name, required, disabled options, defaultValue and reset are all native. The disabled region cannot be picked.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  pValue: "Selected value (controlled)",
  pDefaultValue: "Initial value when uncontrolled",
  pOnValueChange:
    "Called with the new value. Only from a client component, like any function prop",
  pPlaceholder: "Text while nothing is selected. Adds a hidden empty option",
  pSize: "Field height and padding",
  pWrapperClassName: "Classes for the wrapper: width, margins",
  pRest: "Any <select> attribute: name, required, disabled, aria-invalid…",
  pOptionValue: "Option value",
  pOptionIcon: "Leading icon. Only in browsers with customizable select",
  pOptionDescription:
    "Second line in the open picker. Only in browsers with customizable select",
  pGroupLabel: "Group heading",
  components: "Components",
  componentHeader: "Component",
  cSelect: "The <select> field with a chevron and a hidden placeholder option",
  cOption:
    "<option> with an optional icon and description; any option attribute such as disabled",
  cGroup: "<optgroup> with a heading",
  features: "Features",
  featureList: [
    [
      "Server first",
      "the field and plain options render on the server and work without JavaScript; a tiny client part only adds the rich markup",
    ],
    [
      "Native forms",
      "FormData, required, reset and autofill need no extra code",
    ],
    [
      "Keyboard and screen readers",
      "the browser handles arrows, type-ahead, Escape and announcements",
    ],
    ["Mobile", "phones keep their system picker wheel or sheet"],
    ["Reduced motion", "the picker opens without the fade and slide"],
  ],
  plan: "Plan",
  plans: [
    ["hobby", "Hobby — free", "1 project, community support"],
    ["pro", "Pro — $20/mo", "Unlimited projects, 1 TB bandwidth"],
    ["team", "Team — $60/mo", "SSO, roles, audit log"],
    ["enterprise", "Enterprise", "Talk to sales for a quote"],
  ],
  country: "Country",
  countryPlaceholder: "Choose a country",
  groups: [
    [
      "Europe",
      [
        ["de", "🇩🇪", "Germany"],
        ["fr", "🇫🇷", "France"],
        ["pl", "🇵🇱", "Poland"],
        ["pt", "🇵🇹", "Portugal"],
      ],
    ],
    [
      "Americas",
      [
        ["us", "🇺🇸", "United States"],
        ["ca", "🇨🇦", "Canada"],
        ["br", "🇧🇷", "Brazil"],
      ],
    ],
    [
      "Asia-Pacific",
      [
        ["jp", "🇯🇵", "Japan"],
        ["sg", "🇸🇬", "Singapore"],
        ["au", "🇦🇺", "Australia"],
      ],
    ],
  ] as [string, [string, string, string][]][],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Нативный select с полностью стилизованным списком: иконки, описания и галочка",
    intro:
      "Обычный <select>, который рендерится на сервере. В браузерах с настраиваемым select (appearance: base-select) список превращается в оформленный поповер с иконками, второй строкой текста и галочкой, а в закрытом поле видна иконка выбранного пункта. Остальные браузеры показывают свой системный список, а само поле выглядит как Input. Значение, отправка формы, required, сброс и клавиатура достаются от браузера.",
    browserSupport: "Поддержка браузеров",
    supportCustomizable:
      "Оформляет список, иконки и описания пунктов. Они добавляются после гидратации, потому что браузеры со старым HTML-парсером выбрасывают теги внутри <select>. Без поддержки браузер показывает системный список с обычным текстом.",
    supportHas:
      "Приглушает плейсхолдер, пока ничего не выбрано. Без него плейсхолдер обычного цвета.",
    supportStarting:
      "Плавно показывает список при открытии. Без него список появляется сразу.",
    supportTransition:
      "Плавно прячет список при закрытии. Без него список исчезает сразу.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    groupsTitle: "Группы, плейсхолдер и размеры",
    groupsText:
      "SelectGroup рендерит <optgroup>. placeholder добавляет скрытый пустой пункт, и форма с required не отправится, пока что-нибудь не выбрано. Размеры: sm, md и lg.",
    controlledTitle: "Управляемое значение",
    controlledText:
      "value и onValueChange из клиентского компонента. onValueChange получает строку со значением, обычный onChange тоже работает.",
    formTitle: "В форме",
    formText:
      "name, required, недоступные пункты, defaultValue и сброс работают нативно. Недоступный регион выбрать нельзя.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    pValue: "Выбранное значение (управляемый режим)",
    pDefaultValue: "Начальное значение в неуправляемом режиме",
    pOnValueChange:
      "Вызывается с новым значением. Как и любую функцию, передавайте из клиентского компонента",
    pPlaceholder:
      "Текст, пока ничего не выбрано. Добавляет скрытый пустой пункт",
    pSize: "Высота поля и отступы",
    pWrapperClassName: "Классы обёртки: ширина, отступы",
    pRest: "Любые атрибуты <select>: name, required, disabled, aria-invalid…",
    pOptionValue: "Значение пункта",
    pOptionIcon: "Иконка слева. Только в браузерах с настраиваемым select",
    pOptionDescription:
      "Вторая строка в открытом списке. Только в браузерах с настраиваемым select",
    pGroupLabel: "Заголовок группы",
    components: "Компоненты",
    componentHeader: "Компонент",
    cSelect: "Поле <select> со стрелкой и скрытым пунктом-плейсхолдером",
    cOption:
      "<option> с необязательными иконкой и описанием; принимает любые атрибуты option, например disabled",
    cGroup: "<optgroup> с заголовком",
    features: "Возможности",
    featureList: [
      [
        "Сначала сервер",
        "поле и обычные пункты рендерятся на сервере и работают без JavaScript; крошечная клиентская часть только добавляет богатую разметку",
      ],
      [
        "Нативные формы",
        "FormData, required, сброс и автозаполнение без лишнего кода",
      ],
      [
        "Клавиатура и скринридеры",
        "стрелки, поиск по первым буквам, Escape и озвучку берёт на себя браузер",
      ],
      ["Телефоны", "на мобильных остаётся системный барабан или шторка"],
      ["Меньше движения", "список открывается без затухания и сдвига"],
    ],
    plan: "Тариф",
    plans: [
      ["hobby", "Hobby — бесплатно", "1 проект, поддержка сообщества"],
      ["pro", "Pro — $20/мес", "Проекты без ограничений, 1 ТБ трафика"],
      ["team", "Team — $60/мес", "SSO, роли, журнал действий"],
      ["enterprise", "Enterprise", "Цену обсудим с отделом продаж"],
    ],
    country: "Страна",
    countryPlaceholder: "Выберите страну",
    groups: [
      [
        "Европа",
        [
          ["de", "🇩🇪", "Германия"],
          ["fr", "🇫🇷", "Франция"],
          ["pl", "🇵🇱", "Польша"],
          ["pt", "🇵🇹", "Португалия"],
        ],
      ],
      [
        "Америка",
        [
          ["us", "🇺🇸", "США"],
          ["ca", "🇨🇦", "Канада"],
          ["br", "🇧🇷", "Бразилия"],
        ],
      ],
      [
        "Азия и Океания",
        [
          ["jp", "🇯🇵", "Япония"],
          ["sg", "🇸🇬", "Сингапур"],
          ["au", "🇦🇺", "Австралия"],
        ],
      ],
    ],
  },
}

const planIcons = {
  hobby: <Sparkles />,
  pro: <Rocket />,
  team: <Users />,
  enterprise: <Building2 />,
} as Record<string, React.ReactNode>

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Select", description: t.description }
}

export default async function SelectPage({ params }: Props) {
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

  const rows: [string, string, string, string][] = [
    ["value", "string", "-", t.pValue],
    ["defaultValue", "string", "-", t.pDefaultValue],
    ["onValueChange", "(value: string) => void", "-", t.pOnValueChange],
    ["placeholder", "string", "-", t.pPlaceholder],
    ["size", '"sm" | "md" | "lg"', '"md"', t.pSize],
    ["wrapperClassName", "string", "-", t.pWrapperClassName],
    ["...props", 'ComponentProps<"select">', "-", t.pRest],
    ["SelectOption.value", "string", "-", t.pOptionValue],
    ["SelectOption.icon", "ReactNode", "-", t.pOptionIcon],
    ["SelectOption.description", "ReactNode", "-", t.pOptionDescription],
    ["SelectGroup.label", "string", "-", t.pGroupLabel],
  ]

  const countrySelect = (size: "sm" | "md" | "lg") => (
    <div key={size} className="grid gap-2">
      <Label htmlFor={`select-country-${size}`}>
        {t.country} ({size})
      </Label>
      <Select
        id={`select-country-${size}`}
        size={size}
        placeholder={t.countryPlaceholder}
      >
        {t.groups.map(([group, items]) => (
          <SelectGroup key={group} label={group}>
            {items.map(([value, flag, label]) => (
              <SelectOption
                key={value}
                value={value}
                icon={<span className="text-base leading-none">{flag}</span>}
              >
                {label}
              </SelectOption>
            ))}
          </SelectGroup>
        ))}
      </Select>
    </div>
  )

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Select" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "customizable-select",
              description: t.supportCustomizable,
            },
            { featureId: "has", description: t.supportHas },
            { featureId: "starting-style", description: t.supportStarting },
            {
              featureId: "transition-behavior",
              description: t.supportTransition,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <div className="grid w-full max-w-sm gap-2">
              <Label htmlFor="select-plan">{t.plan}</Label>
              <Select id="select-plan" defaultValue="team">
                {t.plans.map(([value, label, description]) => (
                  <SelectOption
                    key={value}
                    value={value}
                    icon={planIcons[value]}
                    description={description}
                    disabled={value === "enterprise"}
                  >
                    {label}
                  </SelectOption>
                ))}
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/select" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { Rocket, Sparkles, Users } from "lucide-react"
import { Select, SelectOption } from "@/components/ui/select"

export function PlanSelect() {
  return (
    <Select name="plan" defaultValue="team">
      <SelectOption value="hobby" icon={<Sparkles />} description="1 project">
        Hobby — free
      </SelectOption>
      <SelectOption value="pro" icon={<Rocket />} description="Unlimited projects">
        Pro — $20/mo
      </SelectOption>
      <SelectOption value="team" icon={<Users />} description="SSO, roles, audit log">
        Team — $60/mo
      </SelectOption>
    </Select>
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-lg font-medium">{t.groupsTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.groupsText}
              </p>
              <div className="rounded-lg bg-muted/30 px-4 py-8">
                <div className="grid gap-4 sm:grid-cols-3">
                  {(["sm", "md", "lg"] as const).map(countrySelect)}
                </div>
              </div>
              <CodeBlock className="mt-4">{`<Select name="country" placeholder="Choose a country" size="sm" required>
  <SelectGroup label="Europe">
    <SelectOption value="de" icon="🇩🇪">Germany</SelectOption>
    <SelectOption value="fr" icon="🇫🇷">France</SelectOption>
  </SelectGroup>
  <SelectGroup label="Americas">
    <SelectOption value="us" icon="🇺🇸">United States</SelectOption>
    <SelectOption value="ca" icon="🇨🇦">Canada</SelectOption>
  </SelectGroup>
</Select>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.controlledTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.controlledText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <SelectControlledDemo />
              </div>
              <CodeBlock className="mt-4">{`"use client"

const [workspace, setWorkspace] = React.useState("acme")

<Select value={workspace} onValueChange={setWorkspace}>
  <SelectOption value="acme" icon={<Building2 />} description="12 members">
    Acme Inc.
  </SelectOption>
  <SelectOption value="personal" icon={<Building2 />} description="Only you">
    Personal
  </SelectOption>
</Select>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.formTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{t.formText}</p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <SelectFormDemo />
              </div>
              <CodeBlock className="mt-4">{`<form action={deploy}>
  <Select name="region" placeholder="Where to deploy" required>
    <SelectOption value="fra1" icon={<Server />} description="Frankfurt, Germany">
      eu-central (fra1)
    </SelectOption>
    <SelectOption value="gru1" icon={<Server />} description="Capacity limit reached" disabled>
      sa-east (gru1)
    </SelectOption>
  </Select>
  <Select name="runtime" defaultValue="node22" size="sm">
    <SelectOption value="node22">Node.js 22</SelectOption>
    <SelectOption value="bun">Bun 1.2</SelectOption>
  </Select>
  <Button type="submit">Deploy</Button>
  <Button type="reset" variant="outline">Reset</Button>
</form>`}</CodeBlock>
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
                {(
                  [
                    ["Select", t.cSelect],
                    ["SelectOption", t.cOption],
                    ["SelectGroup", t.cGroup],
                  ] as const
                ).map(([name, text]) => (
                  <tr key={name} className="border-t">
                    <td className="p-3 font-mono text-xs">{name}</td>
                    <td className="p-3">{text}</td>
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
