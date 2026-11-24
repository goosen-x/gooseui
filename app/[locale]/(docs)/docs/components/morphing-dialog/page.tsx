import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  MorphingDialogCardDemo,
  MorphingDialogDemo,
} from "./morphing-dialog-demo"

const en = {
  auditFeature0Description: "Displays the modal dialog",
  auditFeature1Description: "Animates the change between views",
  auditFeature2Description: "Controls the dialog with buttons",
  auditFeature3Description: "Animates the initial appearance",
  auditFeature4Description: "Controls how the dialog closes",
  auditFeature5Description: "Locks page scrolling while open",
  auditFeature6Description: "Styles the dialog backdrop",
  auditFeature7Description: "Animates the dialog closing",
  description:
    "Dialog with morphing animation using native View Transitions API",
  browserSupport: "Browser Support",
  supportDescription0: "Displays the modal dialog.",
  supportDescription1: "Animates the transition into the dialog.",
  supportDescription2: "Opens the dialog without JavaScript.",
  supportDescription3: "Animates the dialog entrance.",
  supportDescription4: "Closes the dialog on backdrop click.",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  components: "Components",
  features: "Features",
  aDialogComponentWith: (
    <>
      A dialog that morphs out of its card through the native{" "}
      <strong>View Transitions API</strong>. The dialog itself is a native{" "}
      <code>&lt;dialog&gt;</code> opened by an invoker button, so it opens and
      closes even before hydration or without JavaScript. The script (about 1.7
      kB, no libraries) only adds the morph. Closes with Escape, a click outside
      or the close button.
    </>
  ),
  viewTransitionsApiIs:
    "The morph needs the View Transitions API. Without it, or with prefers-reduced-motion, the dialog fades in through @starting-style. Invoker commands are only needed with JavaScript turned off: otherwise the script opens the dialog with showModal(). A click on the backdrop closes the dialog natively with <dialog closedby> and through the script elsewhere.",
  clickOnTheCardTo:
    "Click on the card to open the dialog with a morphing animation.",
  profileCard: "Profile Card",
  useWithProfileCardsFor:
    "Use with profile cards for a smooth expansion effect",
  component: "Component",
  description2: "Description",
  rootComponentManages: "Root component, manages state",
  clickableAreaThatOpens:
    'Button that opens the dialog (commandfor + command="show-modal")',
  portalContainerWith: "Native <dialog> with a backdrop",
  dialogContentWrapper: "Dialog content wrapper",
  imageWithViewTransition: "Image (<img> with object-cover)",
  titleWithViewTransition: "Title (h2)",
  subtitleWithView: "Subtitle",
  descriptionContent: "Description content",
  closeButtonXIcon: "Close button (X icon)",
  nativeViewTransitionsApi: "Native View Transitions API",
  noExternalAnimation: " — no external animation libraries",
  clickOutsideToClose: "Click-outside to close",
  clickBackdropToDismiss: " — click backdrop to dismiss",
  escapeKeySupport: "Escape key support",
  keyboardAccessible: " — keyboard accessible",
  focusStaysWithinDialog: " — native modal, the page behind is inert",
  bodyScrollLock: "Body scroll lock",
  preventsBackground: " — prevents background scrolling",
  progressiveEnhancement: "Progressive enhancement",
  worksWithoutAnimationsIn:
    " — opens without JavaScript, without the morph in older browsers",
  reducedMotionSupport: "Reduced motion support",
  focusTrap: "Focus trap",
  respects: " — respects",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    auditFeature0Description: "Показывает модальное окно",
    auditFeature1Description: "Анимирует переход между состояниями",
    auditFeature2Description: "Управляет диалогом через кнопки",
    auditFeature3Description: "Анимирует появление",
    auditFeature4Description: "Определяет способы закрытия диалога",
    auditFeature5Description: "Блокирует прокрутку страницы при открытии",
    auditFeature6Description: "Оформляет подложку диалога",
    auditFeature7Description: "Анимирует закрытие диалога",
    description: "Диалог с морфинг-анимацией на нативном View Transitions API",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Показывает модальное окно.",
    supportDescription1: "Анимирует переход к окну.",
    supportDescription2: "Открывает окно без JavaScript.",
    supportDescription3: "Анимирует появление окна.",
    supportDescription4: "Закрывает окно по нажатию на фон.",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    components: "Компоненты",
    features: "Возможности",
    aDialogComponentWith: (
      <>
        Диалог, который вырастает из карточки через нативный{" "}
        <strong>View Transitions API</strong>. Само окно сделано на нативном{" "}
        <code>&lt;dialog&gt;</code> с кнопкой-инвокером, поэтому открывается и
        закрывается ещё до гидрации и без JavaScript. Скрипт (около 1,7 кБ, без
        библиотек) добавляет только морфинг. Закрывается клавишей Escape, кликом
        вне окна или кнопкой.
      </>
    ),
    viewTransitionsApiIs:
      "Для морфинга нужен View Transitions API. Без него или при prefers-reduced-motion окно просто проявляется через @starting-style. Invoker commands нужны только при выключенном JavaScript, в остальных случаях окно открывает скрипт через showModal(). Клик по фону закрывает окно нативно через <dialog closedby>, а где его нет, через скрипт.",
    clickOnTheCardTo:
      "Нажмите на карточку, чтобы открыть диалог с морфинг-анимацией.",
    profileCard: "Карточка профиля",
    useWithProfileCardsFor:
      "Подходит для карточек профиля: плавно раскрывается в диалог",
    component: "Компонент",
    description2: "Описание",
    rootComponentManages: "Корневой компонент, управляет состоянием",
    clickableAreaThatOpens:
      'Кнопка, которая открывает диалог (commandfor + command="show-modal")',
    portalContainerWith: "Нативный <dialog> с подложкой",
    dialogContentWrapper: "Обёртка содержимого диалога",
    imageWithViewTransition: "Изображение (<img> с object-cover)",
    titleWithViewTransition: "Заголовок (h2)",
    subtitleWithView: "Подзаголовок",
    descriptionContent: "Текст описания",
    closeButtonXIcon: "Кнопка закрытия (иконка X)",
    nativeViewTransitionsApi: "Нативный View Transitions API",
    noExternalAnimation: ": без сторонних библиотек анимации",
    clickOutsideToClose: "Закрытие кликом вне окна",
    clickBackdropToDismiss: ": клик по подложке закрывает диалог",
    escapeKeySupport: "Закрытие по Escape",
    keyboardAccessible: ": доступно с клавиатуры",
    focusStaysWithinDialog: ": нативная модалка, страница под ней неактивна",
    bodyScrollLock: "Блокировка прокрутки",
    preventsBackground: ": страница под диалогом не прокручивается",
    progressiveEnhancement: "Прогрессивное улучшение",
    worksWithoutAnimationsIn:
      ": открывается без JavaScript, в старых браузерах без морфинга",
    reducedMotionSupport: "Поддержка reduced motion (меньше анимации)",
    focusTrap: "Ловушка фокуса",
    respects: ": учитывает",
  },
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return {
    title: "Morphing Dialog",
    description: t.description,
  }
}

export default async function MorphingDialogPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]
  const toc = [
    { id: "browser-support", title: t.browserSupport, level: 2 },

    { id: "preview", title: t.preview, level: 2 },
    { id: "installation", title: t.installation, level: 2 },
    { id: "usage", title: t.usage, level: 2 },
    { id: "examples", title: t.examples, level: 2 },
    { id: "components", title: t.components, level: 2 },
    { id: "features", title: t.features, level: 2 },
  ]

  return (
    <DocsPage toc={toc}>
      <div className="space-y-8">
        <DocsPageNav title="Morphing Dialog" />
        <p className="text-muted-foreground">{t.aDialogComponentWith}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "dialog",
              description: t.auditFeature0Description,
            },
            {
              featureId: "view-transitions",
              description: t.auditFeature1Description,
            },
            {
              featureId: "invoker-commands",
              description: t.auditFeature2Description,
            },
            {
              featureId: "starting-style",
              description: t.auditFeature3Description,
            },
            {
              featureId: "dialog-closedby",
              description: t.auditFeature4Description,
            },
            {
              featureId: "has",
              description: t.auditFeature5Description,
            },
            {
              featureId: "backdrop",
              description: t.auditFeature6Description,
            },
            {
              featureId: "transition-behavior",
              description: t.auditFeature7Description,
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
          <p className="text-sm text-muted-foreground">{t.clickOnTheCardTo}</p>
          <div className="flex justify-center py-12 bg-muted/30 rounded-lg">
            <MorphingDialogDemo />
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="installation"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.installation}
          </h2>
          <InstallCommand packageName="@gooseui/morphing-dialog" />
        </div>

        <div className="space-y-4">
          <h2
            id="usage"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.usage}
          </h2>
          <CodeBlock>{`import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogImage,
  MorphingDialogTitle,
  MorphingDialogSubtitle,
  MorphingDialogDescription,
  MorphingDialogClose,
} from "@/components/ui/morphing-dialog"

export default function Example() {
  return (
    <MorphingDialog>
      <MorphingDialogTrigger>
        <MorphingDialogImage src="/image.jpg" alt="..." />
        <MorphingDialogTitle>Title</MorphingDialogTitle>
        <MorphingDialogSubtitle>Subtitle</MorphingDialogSubtitle>
      </MorphingDialogTrigger>

      <MorphingDialogContainer>
        <MorphingDialogContent>
          <MorphingDialogClose />
          <MorphingDialogImage src="/image.jpg" alt="..." />
          <MorphingDialogTitle>Title</MorphingDialogTitle>
          <MorphingDialogSubtitle>Subtitle</MorphingDialogSubtitle>
          <MorphingDialogDescription>
            Full description here...
          </MorphingDialogDescription>
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
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
              <h3 className="text-lg font-medium mb-3">{t.profileCard}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.useWithProfileCardsFor}
              </p>
              <div className="flex justify-center py-8 bg-muted/30 rounded-lg">
                <MorphingDialogCardDemo />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2
            id="components"
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {t.components}
          </h2>
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">{t.component}</th>
                  <th className="text-left p-3 font-medium">
                    {t.description2}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">MorphingDialog</td>
                  <td className="p-3">{t.rootComponentManages}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">
                    MorphingDialogTrigger
                  </td>
                  <td className="p-3">{t.clickableAreaThatOpens}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">
                    MorphingDialogContainer
                  </td>
                  <td className="p-3">{t.portalContainerWith}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">
                    MorphingDialogContent
                  </td>
                  <td className="p-3">{t.dialogContentWrapper}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">MorphingDialogImage</td>
                  <td className="p-3">{t.imageWithViewTransition}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">MorphingDialogTitle</td>
                  <td className="p-3">{t.titleWithViewTransition}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">
                    MorphingDialogSubtitle
                  </td>
                  <td className="p-3">{t.subtitleWithView}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">
                    MorphingDialogDescription
                  </td>
                  <td className="p-3">{t.descriptionContent}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-mono text-xs">MorphingDialogClose</td>
                  <td className="p-3">{t.closeButtonXIcon}</td>
                </tr>
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
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <strong>{t.nativeViewTransitionsApi}</strong>
              {t.noExternalAnimation}
            </li>
            <li>
              <strong>{t.clickOutsideToClose}</strong>
              {t.clickBackdropToDismiss}
            </li>
            <li>
              <strong>{t.escapeKeySupport}</strong>
              {t.keyboardAccessible}
            </li>
            <li>
              <strong>{t.focusTrap}</strong>
              {t.focusStaysWithinDialog}
            </li>
            <li>
              <strong>{t.bodyScrollLock}</strong>
              {t.preventsBackground}
            </li>
            <li>
              <strong>{t.progressiveEnhancement}</strong>
              {t.worksWithoutAnimationsIn}
            </li>
            <li>
              <strong>{t.reducedMotionSupport}</strong>
              {t.respects}{" "}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">
                prefers-reduced-motion
              </code>
            </li>
          </ul>
        </div>
      </div>
    </DocsPage>
  )
}
