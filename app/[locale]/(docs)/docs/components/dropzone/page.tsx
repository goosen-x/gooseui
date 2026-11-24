import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import {
  DropzoneDemo,
  DropzoneDocumentsDemo,
  DropzoneSlotDemo,
} from "./dropzone-demo"

type Props = { params: Promise<{ locale: string }> }

const en = {
  auditFeature0Description: "Highlights the focused file input area",
  browserSupport: "Browser Support",
  description: "File upload area with previews, validation and paste support",
  intro:
    "A file upload area built on the useFileDrop hook. Files come in by drag and drop, from the file picker or from the clipboard, and all three go through the same checks for type, size and count. Images get previews that are released when a file is removed. The area is a <label> around a native file input: clicking, the keyboard and form submission work even before JavaScript loads, while drop, paste, checks and previews need it.",
  preview: "Preview",
  previewHint:
    "Drop images, click the area, or focus it and press Ctrl+V with an image in the clipboard. No image at hand? Use the sample button.",
  installation: "Installation",
  installationText: "The command also installs the",
  installationHook: "hook",
  usage: "Usage",
  examples: "Examples",
  slotTitle: "Image slots",
  slotText:
    'variant="slot" is a square for one image. Clicking a filled slot replaces the image, the cross removes it.',
  docsTitle: "One document",
  docsText:
    "maxFiles={1} keeps the list to one file. Try dropping an image here to see the type error.",
  labelsTitle: "Your own texts",
  labelsText:
    "Every text, including error messages, comes from labels. Messages are functions, so they can include the file name and the limit.",
  props: "Props",
  headers: {
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  propVariant: "Large area with a list, or a square slot for one image",
  propValue: "Controlled list of files",
  propDefaultValue: "Initial files for uncontrolled use",
  propOnValueChange: "Called with the new list after adding or removing",
  propOnReject: "Called with rejected files and reasons: type, size or count",
  propAccept: "Allowed types, same format as the accept attribute",
  propMaxSize: "Max size of one file, bytes",
  propMaxFiles: "Max number of files. The slot always holds one",
  propDisabled: "Turns off clicks, drops and paste",
  propName: "Name of the file input, so the files go with the form",
  propLabels: "Texts and error messages",
  propAriaLabel: "Accessible name of the area",
  propClassName: "Classes for the wrapper",
  features: "Features",
  featureList: [
    [
      "Three sources",
      "drag and drop, the file picker and paste from the clipboard",
    ],
    [
      "Validation",
      "type, size and count checks with readable messages; duplicates are skipped",
    ],
    [
      "Previews",
      "object URLs for images are revoked on removal and on unmount",
    ],
    [
      "Animation",
      "file, preview and feedback transitions respect reduced motion preferences",
    ],
    [
      "Keyboard",
      "the native file input inside the area takes focus, Enter or Space opens the picker, remove buttons are real buttons",
    ],
  ],
}

const content: Dict<typeof en> = {
  en,
  ru: {
    auditFeature0Description: "Подсвечивает область при фокусе на поле файла",
    browserSupport: "Поддержка браузеров",
    description:
      "Зона загрузки файлов с превью, проверками и вставкой из буфера",
    intro:
      "Зона загрузки на хуке useFileDrop. Файлы попадают сюда перетаскиванием, через диалог выбора или из буфера обмена, и все три пути проходят одни и те же проверки типа, размера и количества. У картинок есть превью, а память под них освобождается, когда файл удаляют. Зона сделана как <label> вокруг нативного поля выбора файла: клик, клавиатура и отправка формы работают ещё до загрузки JavaScript, а перетаскиванию, вставке, проверкам и превью он нужен.",
    preview: "Превью",
    previewHint:
      "Перетащите картинки, кликните по зоне или выделите её и нажмите Ctrl+V с картинкой в буфере. Если картинки нет под рукой, нажмите кнопку с примером.",
    installation: "Установка",
    installationText: "Команда заодно поставит хук",
    installationHook: "",
    usage: "Использование",
    examples: "Примеры",
    slotTitle: "Слоты для картинок",
    slotText:
      'variant="slot" это квадрат под одну картинку. Клик по заполненному слоту заменяет картинку, крестик удаляет.',
    docsTitle: "Один документ",
    docsText:
      "maxFiles={1} оставляет в списке один файл. Бросьте сюда картинку, чтобы увидеть ошибку типа.",
    labelsTitle: "Свои тексты",
    labelsText:
      "Все тексты, включая ошибки, задаются через labels. Сообщения об ошибках это функции, в них можно подставить имя файла и лимит.",
    props: "Пропсы",
    headers: {
      prop: "Проп",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    propVariant:
      "Большая зона со списком или квадратный слот под одну картинку",
    propValue: "Управляемый список файлов",
    propDefaultValue: "Начальные файлы для неуправляемого режима",
    propOnValueChange:
      "Вызывается с новым списком после добавления или удаления",
    propOnReject:
      "Вызывается с отклонёнными файлами и причинами: type, size или count",
    propAccept: "Допустимые типы в формате атрибута accept",
    propMaxSize: "Максимальный размер одного файла в байтах",
    propMaxFiles: "Максимум файлов. В слоте всегда один",
    propDisabled: "Отключает клик, перетаскивание и вставку",
    propName: "Имя поля файла, чтобы файлы ушли с формой",
    propLabels: "Тексты и сообщения об ошибках",
    propAriaLabel: "Доступное имя зоны",
    propClassName: "Классы обёртки",
    features: "Возможности",
    featureList: [
      [
        "Три источника",
        "перетаскивание, диалог выбора файла и вставка из буфера обмена",
      ],
      [
        "Проверки",
        "тип, размер и количество с понятными сообщениями; дубликаты пропускаются",
      ],
      [
        "Превью",
        "object URL для картинок отзываются при удалении файла и размонтировании",
      ],
      [
        "Анимация",
        "переходы файлов, превью и сообщений учитывают настройку уменьшения движения",
      ],
      [
        "Клавиатура",
        "фокус получает нативное поле файла внутри зоны, Enter или пробел открывают выбор, кнопки удаления настоящие",
      ],
    ],
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "Dropzone", description: t.description }
}

export default async function DropzonePage({ params }: Props) {
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

  const rows: [string, string, string, string][] = [
    ["variant", '"zone" | "slot"', '"zone"', t.propVariant],
    ["value", "File[]", "-", t.propValue],
    ["defaultValue", "File[]", "[]", t.propDefaultValue],
    ["onValueChange", "(files: File[]) => void", "-", t.propOnValueChange],
    [
      "onReject",
      "(rejections: { file, reason }[]) => void",
      "-",
      t.propOnReject,
    ],
    ["accept", "string", "-", t.propAccept],
    ["maxSize", "number", "-", t.propMaxSize],
    ["maxFiles", "number", "-", t.propMaxFiles],
    ["disabled", "boolean", "false", t.propDisabled],
    ["name", "string", "-", t.propName],
    ["labels", "Partial<DropzoneLabels>", "-", t.propLabels],
    ["aria-label", "string", "-", t.propAriaLabel],
    ["className", "string", "-", t.propClassName],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Dropzone" />

        <p className="text-muted-foreground">{t.intro}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "has",
              description: t.auditFeature0Description,
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
          <p className="text-sm text-muted-foreground">{t.previewHint}</p>
          <div className="flex justify-center rounded-lg bg-muted/30 py-12">
            <DropzoneDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/dropzone" />
          <p className="text-sm text-muted-foreground">
            {t.installationText}{" "}
            <Link
              href="/docs/hooks/use-file-drop"
              className="font-medium text-foreground underline underline-offset-4"
            >
              useFileDrop
            </Link>
            {t.installationHook ? ` ${t.installationHook}` : ""}.
          </p>
        </div>

        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.usage}
          </h2>
          <CodeBlock>{`import { Dropzone } from "@/components/ui/dropzone"

export default function Example() {
  const [files, setFiles] = useState<File[]>([])

  return (
    <Dropzone
      accept="image/*"
      maxSize={2 * 1024 * 1024}
      maxFiles={4}
      value={files}
      onValueChange={setFiles}
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
            <div>
              <h3 className="mb-3 text-lg font-medium">{t.slotTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{t.slotText}</p>
              <div className="flex justify-center rounded-lg bg-muted/30 py-8">
                <DropzoneSlotDemo />
              </div>
              <CodeBlock className="mt-4">{`<Dropzone
  variant="slot"
  accept="image/png,image/jpeg,image/webp"
  maxSize={5 * 1024 * 1024}
  aria-label="Front side"
  onValueChange={([file]) => setFront(file ?? null)}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.docsTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{t.docsText}</p>
              <div className="flex justify-center rounded-lg bg-muted/30 py-8">
                <DropzoneDocumentsDemo />
              </div>
              <CodeBlock className="mt-4">{`<Dropzone
  accept=".pdf,.doc,.docx,application/pdf"
  maxSize={10 * 1024 * 1024}
  maxFiles={1}
  labels={{ hint: "PDF or Word, up to 10 MB" }}
/>`}</CodeBlock>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">{t.labelsTitle}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.labelsText}
              </p>
              <CodeBlock>{`<Dropzone
  accept="image/*"
  maxSize={2 * 1024 * 1024}
  labels={{
    title: "Drop photos or click to choose",
    dragging: "Release to add",
    remove: "Delete",
    typeError: (file) => \`\${file.name} is not a photo\`,
    sizeError: (file, max) => \`\${file.name} is over \${max / 1024 / 1024} MB\`,
    countError: (max) => \`Up to \${max} photos\`,
  }}
  onReject={(rejections) => console.log(rejections)}
/>`}</CodeBlock>
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
          <h2
            id="features"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
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
