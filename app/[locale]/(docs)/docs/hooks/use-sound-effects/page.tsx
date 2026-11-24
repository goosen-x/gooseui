import { setRequestLocale } from "next-intl/server"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { UseSoundEffectsDemo } from "./use-sound-effects-demo"

type Props = { params: Promise<{ locale: string }> }

const h2 = "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"

const en = {
  description: "Interface sounds synthesized with Web Audio, no audio files",
  intro:
    "useSoundEffects plays short interface sounds that are synthesized with Web Audio on the fly: nothing to download, nothing to host. It ships click, success, error and complete, takes your own presets and remembers the on/off switch in localStorage.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  parameters: "Parameters",
  returns: "Returns",
  features: "Features",
  browserSupport: "Browser Support",
  headers: {
    name: "Name",
    type: "Type",
    default: "Default",
    description: "Description",
  },
  ex0Title: "Your own presets",
  ex0Text:
    "A preset is a list of notes: pitch, length, delay, waveform and an optional glide. Custom names are typed, play() suggests them.",
  ex1Title: "Sound toggle",
  ex1Text:
    "enabled lives in localStorage and is shared by every component with the same storageKey. Start muted with defaultEnabled.",
  ex2Title: "Volume",
  ex2Text:
    "Volume is a plain option from 0 to 1, so you can drive it from state or settings.",
  param0: "Extra presets, merged over the built-in ones",
  param1: "Master volume from 0 to 1",
  param2: "localStorage key for the on/off switch",
  param3: "Used until the user flips the switch",
  return0: "Plays a preset by name. Does nothing while sound is off",
  return1: "Current switch state",
  return2: "Turn sound on or off and save it",
  return3: "Flip the switch",
  return4: "Separate export with the built-in presets",
  feature0: "Autoplay policy",
  feature0Text:
    "The AudioContext is created on the first pointer or key press and reused by every call",
  feature1: "No files",
  feature1Text:
    "Every sound is a few oscillators with a short envelope, so there is no click at the start or end",
  feature2: "Cleans up nodes",
  feature2Text:
    "Oscillators and gain nodes are disconnected as soon as a note ends",
  feature3: "Survives blocked storage",
  feature3Text:
    "If localStorage is unavailable, the switch is kept in memory for the page",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    description:
      "Звуки интерфейса, синтезированные через Web Audio, без аудиофайлов",
    intro:
      "useSoundEffects проигрывает короткие звуки интерфейса, которые синтезируются через Web Audio на лету: ничего не нужно скачивать и хранить. В комплекте click, success, error и complete, можно добавить свои пресеты, а переключатель звука запоминается в localStorage.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    parameters: "Параметры",
    returns: "Возвращает",
    features: "Возможности",
    browserSupport: "Поддержка браузеров",
    headers: {
      name: "Имя",
      type: "Тип",
      default: "По умолчанию",
      description: "Описание",
    },
    ex0Title: "Свои пресеты",
    ex0Text:
      "Пресет состоит из нот: высота, длина, задержка, форма волны и, если нужно, скольжение высоты. Свои имена типизированы, play() их подсказывает.",
    ex1Title: "Переключатель звука",
    ex1Text:
      "enabled хранится в localStorage и общий для всех компонентов с одним storageKey. Чтобы звук был выключен с самого начала, передайте defaultEnabled: false.",
    ex2Title: "Громкость",
    ex2Text:
      "Громкость передаётся опцией от 0 до 1, её можно брать из состояния или настроек.",
    param0: "Дополнительные пресеты поверх встроенных",
    param1: "Общая громкость от 0 до 1",
    param2: "Ключ localStorage для переключателя",
    param3: "Действует, пока пользователь не переключил звук",
    return0:
      "Проигрывает пресет по имени. При выключенном звуке ничего не делает",
    return1: "Включён ли звук",
    return2: "Включить или выключить звук с сохранением",
    return3: "Переключить",
    return4: "Отдельный экспорт со встроенными пресетами",
    feature0: "Политика автозапуска",
    feature0Text:
      "AudioContext создаётся при первом касании или нажатии клавиши и переиспользуется всеми вызовами",
    feature1: "Без файлов",
    feature1Text:
      "Каждый звук собран из пары осцилляторов с короткой огибающей, без щелчков в начале и в конце",
    feature2: "Убирает узлы",
    feature2Text:
      "Осцилляторы и узлы громкости отключаются, как только нота доиграла",
    feature3: "Работает без хранилища",
    feature3Text:
      "Если localStorage недоступен, переключатель живёт в памяти до перезагрузки",
  },
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: "useSoundEffects", description: t.description }
}

export default async function UseSoundEffectsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]

  const toc = [
    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "examples", title: t.examples, level: 2 },
    { id: "parameters", title: t.parameters, level: 2 },
    { id: "returns", title: t.returns, level: 2 },
    { id: "features", title: t.features, level: 2 },
  ]

  const parameters = [
    ["options.sounds", "Record<string, SoundPreset>", "-", t.param0],
    ["options.volume", "number", "0.5", t.param1],
    ["options.storageKey", "string", '"gooseui-sounds"', t.param2],
    ["options.defaultEnabled", "boolean", "true", t.param3],
  ]
  const returns = [
    ["play", "(name) => void", t.return0],
    ["enabled", "boolean", t.return1],
    ["setEnabled", "(value: boolean) => void", t.return2],
    ["toggle", "() => void", t.return3],
    ["defaultSounds", "Record<string, SoundPreset>", t.return4],
  ]
  const features = [
    [t.feature0, t.feature0Text],
    [t.feature1, t.feature1Text],
    [t.feature2, t.feature2Text],
    [t.feature3, t.feature3Text],
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="useSoundEffects" />

        <p className="text-muted-foreground">{t.intro}</p>

        <div className="space-y-4">
          <h2 id="preview" className={h2}>
            {t.preview}
          </h2>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <UseSoundEffectsDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="installation" className={h2}>
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/use-sound-effects" />
        </div>

        <div className="space-y-4">
          <h2 id="usage" className={h2}>
            {t.usage}
          </h2>
          <CodeBlock>{`import { Button } from "@/components/ui/button"

import { useSoundEffects } from "@/hooks/use-sound-effects"

export function SubmitButton() {
  const { play } = useSoundEffects()

  async function submit() {
    play("click")
    const ok = await save()
    play(ok ? "success" : "error")
  }

  return <Button onClick={submit}>Save</Button>
}`}</CodeBlock>
        </div>

        <div className="space-y-4">
          <h2 id="examples" className={h2}>
            {t.examples}
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-3">{t.ex0Title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.ex0Text}</p>
              <CodeBlock>{`const sounds = {
  pop: [{ frequency: 400, slideTo: 1200, duration: 0.08 }],
  coin: [
    { frequency: 988, duration: 0.08, type: "square", gain: 0.3 },
    { frequency: 1319, duration: 0.3, delay: 0.07, type: "square", gain: 0.3 },
  ],
} satisfies Record<string, SoundPreset>

const { play } = useSoundEffects({ sounds })
play("coin")`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.ex1Title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.ex1Text}</p>
              <CodeBlock>{`import { Button } from "@/components/ui/button"

const { enabled, toggle } = useSoundEffects({ defaultEnabled: false })

<Button role="switch" aria-checked={enabled} onClick={toggle}>
  {enabled ? <Volume2 /> : <VolumeX />}
</Button>`}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{t.ex2Title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.ex2Text}</p>
              <CodeBlock>{`const [volume, setVolume] = useState(0.3)
const { play } = useSoundEffects({ volume })`}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="parameters" className={h2}>
            {t.parameters}
          </h2>
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">
                    {t.headers.name}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.headers.type}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.headers.default}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.headers.description}
                  </th>
                </tr>
              </thead>
              <tbody>
                {parameters.map(([name, type, value, description]) => (
                  <tr key={name} className="border-t">
                    <td className="p-3 font-mono text-xs">{name}</td>
                    <td className="p-3 font-mono text-xs">{type}</td>
                    <td className="p-3 font-mono text-xs">{value}</td>
                    <td className="p-3">{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2 id="returns" className={h2}>
            {t.returns}
          </h2>
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">
                    {t.headers.name}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.headers.type}
                  </th>
                  <th className="text-left p-3 font-medium">
                    {t.headers.description}
                  </th>
                </tr>
              </thead>
              <tbody>
                {returns.map(([name, type, description]) => (
                  <tr key={name} className="border-t">
                    <td className="p-3 font-mono text-xs">{name}</td>
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
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            {features.map(([title, text]) => (
              <li key={title}>
                <strong className="text-foreground">{title}.</strong> {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DocsPage>
  )
}
