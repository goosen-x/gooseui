import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  PhoneInputCountriesDemo,
  PhoneInputDemo,
  PhoneInputFormDemo,
  PhoneInputPasteDemo,
  PhoneInputValueDemo,
} from "./phone-input-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  auditFeature0Description: "Highlights errors in nested fields",
  auditFeature1Description: "Highlights focused nested fields",
  browserSupport: "Browser Support",
  title: "Phone Input",
  description:
    "Phone field with a searchable country list and a live mask, returns E.164, no dependencies",
  intro:
    "A phone field with a country select and a mask that is applied as you type. The caret stays in place when you insert or delete in the middle, pasted numbers are cleaned up and extra digits are dropped. Outside you get an E.164 string and a validity flag. No phone library inside: every country of the world is built in. The list is generated from libphonenumber data and a monthly job refreshes it, so you never maintain it by hand. Country names come from Intl.DisplayNames, the data itself is about 3 kB gzipped. JavaScript is unavoidable here: it formats the number and keeps the caret in place. The country list is a native popover with search and keyboard control, flags are emoji, icons are inline SVG.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  pasteTitle: "Paste and autofill",
  pasteText:
    "A number with a plus or 00 picks the country by its calling code. For +7 a leading 8 is treated as the domestic prefix, so 8 900… becomes +7 900…. Digits beyond the longest valid number of the country are dropped, never more than 15 in total as E.164 requires.",
  countriesTitle: "Limited list of countries",
  countriesText:
    "By default the list holds every country, with RU, KZ, BY and UZ on top as a separate group. Pass countries to narrow it: filter PHONE_COUNTRIES or write your own entries (mask uses # for each digit, minLength and maxLength set the valid lengths). preferredCountries changes the top group, codes missing from the list are skipped. Search works on the whole list by name and by calling code: +49 or 49.",
  valueTitle: "Value sent to the form",
  valueText:
    "The first argument of onValueChange is the number in E.164: a plus, the country code and digits with no spaces. The empty field gives an empty string. isValid says whether the number is complete.",
  formTitle: "Validation in a form",
  formText:
    "An unfinished number turns into an error once focus leaves the field: the border goes red and the text appears under it. The browser also blocks the submit with the same message. With name set the E.164 value goes into a hidden input.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  propDescriptions: {
    value: "Controlled value in E.164",
    defaultValue: "Initial value in E.164",
    onValueChange: "Called with the E.164 value and { isValid, country }",
    defaultCountry: "ISO code of the country on mount",
    onCountryChange: "Called when the country changes",
    countries:
      "Countries to offer instead of the full built-in list, for example a filtered PHONE_COUNTRIES",
    preferredCountries:
      "ISO codes shown on top as a separate group, in the given order",
    countryLabel: "Accessible label of the country button",
    labels:
      "Texts: country, search, empty, incomplete (error for an unfinished number), required (error for an empty required field)",
    error:
      "External error, string or node. Replaces the built-in one and paints the field red",
    validate:
      "Built-in check: the error under the field after focus leaves an unfinished number. false turns it off",
    locale: "BCP 47 tag, country names are translated with Intl.DisplayNames",
    name: "Name of the hidden input with the E.164 value",
    inputClassName: "Classes for the inner text input",
    className: "Classes for the outer frame",
  },
  countryType: "PhoneCountry",
  countryFields: {
    code: "ISO 3166-1 alpha-2 code",
    name: "Fallback name, the list takes names from Intl.DisplayNames",
    dialCode: "Calling code without the plus",
    mask: "Mask of the national number, # is a digit",
    minLength: "Fewest digits for a valid number, defaults to the mask length",
    maxLength: "Most digits for a valid number, defaults to the mask length",
    prefixes: "National prefixes that tell apart countries sharing a code",
    trunkPrefix: "Domestic prefix dropped on paste",
    flag: "Emoji flag, built from code when omitted",
  },
  features: "Features",
  featureList: [
    [
      "Stable caret",
      "the position is counted in digits, so the mask never throws it to the end",
    ],
    [
      "Mask-aware delete",
      "Backspace on a bracket or dash removes the digit before it",
    ],
    [
      "Country list",
      "native popover with search, arrows, Enter and Esc, roles listbox and option",
    ],
    ["Mobile keyboard", 'inputMode="tel" and autoComplete="tel"'],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    auditFeature0Description: "Подсвечивает ошибки вложенных полей",
    auditFeature1Description: "Подсвечивает фокус вложенных полей",
    browserSupport: "Поддержка браузеров",
    title: "Phone Input",
    description:
      "Поле телефона с поиском по странам и маской, отдаёт E.164, без зависимостей",
    intro:
      "Поле телефона с выбором страны и маской, которая применяется прямо при наборе. Каретка не прыгает при вставке и удалении в середине, вставленный номер приводится в порядок, лишние цифры отбрасываются. Наружу уходит строка E.164 и признак валидности. Библиотек для телефонов внутри нет: встроены все страны мира. Список генерируется из данных libphonenumber, а ежемесячная задача его обновляет, так что вручную поддерживать ничего не нужно. Названия стран берутся из Intl.DisplayNames, сами данные занимают около 3 кБ в gzip. Без JavaScript тут не обойтись: он форматирует номер и держит каретку на месте. Список стран — нативный popover с поиском и управлением с клавиатуры, флаги — эмодзи, иконки встроены как SVG.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    pasteTitle: "Вставка и автозаполнение",
    pasteText:
      "Номер с плюсом или 00 сам выбирает страну по коду. Для +7 первая 8 считается внутренним префиксом, поэтому 8 900… превращается в +7 900…. Цифры сверх самой длинной допустимой длины страны отбрасываются, всего не больше 15, как требует E.164.",
    countriesTitle: "Ограниченный список стран",
    countriesText:
      "По умолчанию в списке все страны, а РФ, КЗ, БЛ и УЗ стоят сверху отдельной группой. Передайте countries, чтобы сузить список: отфильтруйте PHONE_COUNTRIES или напишите свои записи (в маске # означает цифру, minLength и maxLength задают допустимые длины). preferredCountries меняет верхнюю группу, кодов, которых нет в списке, она не показывает. Поиск работает по всему списку: по названию и по коду страны, +49 или 49.",
    valueTitle: "Что уходит в форму",
    valueText:
      "Первый аргумент onValueChange — номер в формате E.164: плюс, код страны и цифры без пробелов. Пустое поле даёт пустую строку. isValid показывает, полный ли номер.",
    formTitle: "Проверка в форме",
    formText:
      "Неполный номер становится ошибкой, когда фокус уходит из поля: рамка краснеет, под ней появляется текст. Браузер тоже не даст отправить форму и покажет то же сообщение. Если задать name, значение E.164 попадёт в скрытый input.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    propDescriptions: {
      value: "Значение в E.164 для управляемого режима",
      defaultValue: "Начальное значение в E.164",
      onValueChange: "Вызывается со значением E.164 и { isValid, country }",
      defaultCountry: "ISO-код страны при монтировании",
      onCountryChange: "Вызывается при смене страны",
      countries:
        "Страны вместо полного встроенного списка, например отфильтрованный PHONE_COUNTRIES",
      preferredCountries:
        "ISO-коды стран, которые идут сверху отдельной группой, в заданном порядке",
      countryLabel: "Подпись кнопки выбора страны для скринридеров",
      labels:
        "Тексты: country, search, empty, incomplete (ошибка неполного номера), required (ошибка пустого обязательного поля)",
      error:
        "Внешняя ошибка, строка или узел. Заменяет встроенную и красит поле",
      validate:
        "Встроенная проверка: ошибка под полем после ухода из неполного номера. false отключает её",
      locale: "Тег BCP 47, названия стран переводятся через Intl.DisplayNames",
      name: "Имя скрытого input со значением E.164",
      inputClassName: "Классы для внутреннего текстового поля",
      className: "Классы для внешней рамки",
    },
    countryType: "PhoneCountry",
    countryFields: {
      code: "Код ISO 3166-1 alpha-2",
      name: "Запасное название, список берёт названия из Intl.DisplayNames",
      dialCode: "Код страны без плюса",
      mask: "Маска национального номера, # обозначает цифру",
      minLength: "Минимум цифр для валидного номера, по умолчанию длина маски",
      maxLength: "Максимум цифр для валидного номера, по умолчанию длина маски",
      prefixes: "Префиксы номера, по которым различаются страны с общим кодом",
      trunkPrefix: "Внутренний префикс, который убирается при вставке",
      flag: "Флаг-эмодзи, если не задан, строится из code",
    },
    features: "Возможности",
    featureList: [
      [
        "Каретка на месте",
        "позиция считается в цифрах, и маска не уносит её в конец",
      ],
      [
        "Удаление сквозь маску",
        "Backspace на скобке или дефисе стирает цифру перед ней",
      ],
      [
        "Список стран",
        "нативный popover с поиском, стрелками, Enter и Esc, роли listbox и option",
      ],
      ["Мобильная клавиатура", 'inputMode="tel" и autoComplete="tel"'],
    ],
  },
}

const propRows: [keyof typeof en.propDescriptions, string, string][] = [
  ["value", "string", "-"],
  ["defaultValue", "string", "-"],
  ["onValueChange", "(value: string, meta: PhoneValueMeta) => void", "-"],
  ["defaultCountry", "string", '"US"'],
  ["onCountryChange", "(country: PhoneCountry) => void", "-"],
  ["countries", "PhoneCountry[]", "all countries"],
  ["preferredCountries", "string[]", '["RU", "KZ", "BY", "UZ"]'],
  ["countryLabel", "string", '"Country"'],
  ["labels", "Partial<{ country, search, empty, incomplete, required }>", "-"],
  ["error", "ReactNode", "-"],
  ["validate", "boolean", "true"],
  ["locale", "string", "-"],
  ["name", "string", "-"],
  ["inputClassName", "string", "-"],
  ["className", "string", "-"],
]

const countryRows: [keyof typeof en.countryFields, string][] = [
  ["code", "string"],
  ["name", "string"],
  ["dialCode", "string"],
  ["mask", "string"],
  ["minLength", "number"],
  ["maxLength", "number"],
  ["prefixes", "string[]"],
  ["trunkPrefix", "string"],
  ["flag", "string"],
]

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: t.title, description: t.description }
}

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
const th = "p-3 text-left font-medium"

export default async function PhoneInputPage({ params }: Props) {
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
        <DocsPageNav title={t.title} />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "has",
              description: t.auditFeature0Description,
            },
            {
              featureId: "focus-within",
              description: t.auditFeature1Description,
            },
          ]}
        />

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-12">
            <PhoneInputDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/phone-input" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { PhoneInput } from "@/components/ui/phone-input"

export default function Example() {
  const [phone, setPhone] = useState("")
  const [valid, setValid] = useState(false)

  return (
    <PhoneInput
      defaultCountry="GB"
      value={phone}
      onValueChange={(value, { isValid }) => {
        setPhone(value) // "+442079460958"
        setValid(isValid)
      }}
    />
  )
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-lg font-medium">{t.pasteTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.pasteText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <PhoneInputPasteDemo />
              </div>
              <CodeBlock className="mt-4">{`<PhoneInput defaultCountry="RU" onValueChange={setPhone} />
// paste "8 (900) 123-45-67"   → "+79001234567"
// paste "+7 701 234 5678"     → "+77012345678", country KZ
// paste "0049 30 1234 5678"   → "+493012345678", country DE`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.countriesTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.countriesText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <PhoneInputCountriesDemo />
              </div>
              <CodeBlock className="mt-4">{`import { PHONE_COUNTRIES } from "@/lib/phone-countries"

const europe = PHONE_COUNTRIES.filter((c) =>
  ["NL", "DE", "FR", "PL", "ES", "IT"].includes(c.code),
)

<PhoneInput
  countries={europe}
  preferredCountries={["NL", "DE"]}
  defaultValue="+31612345678"
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.valueTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.valueText}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <PhoneInputValueDemo />
              </div>
              <CodeBlock className="mt-4">{`<PhoneInput
  onValueChange={(value, { isValid }) => {
    // value: "+79161234567", isValid: true
  }}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.formTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{t.formText}</p>
              <div className="flex justify-center rounded-lg bg-muted/30 px-4 py-8">
                <PhoneInputFormDemo />
              </div>
              <CodeBlock className="mt-4">{`<form action={save}>
  <PhoneInput
    name="phone"
    required
    labels={{ incomplete: "Enter the full phone number" }}
  />
</form>

// External error instead of the built-in one
<PhoneInput error={serverError} />`}</CodeBlock>
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
                  <th className={th}>{t.headers.prop}</th>
                  <th className={th}>{t.headers.type}</th>
                  <th className={th}>{t.headers.default}</th>
                  <th className={th}>{t.headers.description}</th>
                </tr>
              </thead>
              <tbody>
                {propRows.map(([prop, type, def]) => (
                  <tr key={prop} className="border-t">
                    <td className="p-3 font-mono text-xs">{prop}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3 font-mono text-xs">{def}</td>
                    <td className="p-3">{t.propDescriptions[prop]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="pt-2 font-mono text-lg font-medium">
            {t.countryType}
          </h3>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[500px] text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className={th}>{t.headers.prop}</th>
                  <th className={th}>{t.headers.type}</th>
                  <th className={th}>{t.headers.default}</th>
                  <th className={th}>{t.headers.description}</th>
                </tr>
              </thead>
              <tbody>
                {countryRows.map(([field, type]) => (
                  <tr key={field} className="border-t">
                    <td className="p-3 font-mono text-xs">{field}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3 font-mono text-xs">-</td>
                    <td className="p-3">{t.countryFields[field]}</td>
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
