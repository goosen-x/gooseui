import { setRequestLocale } from "next-intl/server"
import { BrowserSupport } from "@/components/docs/browser-support"
import { CodeBlock } from "@/components/docs/code-block"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPreview } from "@/components/docs/docs-preview"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { DocsSection } from "@/components/docs/docs-section"
import { InstallCommand } from "@/components/docs/install-command"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  GitHubStarDialogDemo,
  GitHubStarDialogGoalReachedDemo,
  GitHubStarDialogLiveDemo,
} from "./github-star-dialog-demo"

const en = {
  auditFeature0Description: "Displays the modal dialog",
  auditFeature1Description: "Animates the initial appearance",
  auditFeature2Description: "Animates closing",
  auditFeature3Description: "Locks page scrolling while open",
  auditFeature4Description: "Styles the dialog backdrop",
  auditFeature5Description: "Shapes the dialog animation",
  auditFeature6Description: "Improves prompt text wrapping",
  browserSupport: "Browser Support",
  supportDescription0: "Displays the star prompt.",
  supportDescription1: "Fades in the dialog.",
  supportDescription2: "Fades out the dialog.",
  browserSupportText:
    "<dialog> is Baseline widely available, @starting-style and transition-behavior are Baseline newly. Where they are missing, the dialog still opens and closes, just without the fade.",
  description:
    "Modal asking to star the repository: night-sky header and a progress bar toward the star goal",
  preview: "Preview",
  installation: "Installation",
  usage: "Usage",
  examples: "Examples",
  props: "Props",
  features: "Features",
  modalAskingToStarYour:
    "Modal asking to star your open source project. Shows the current star count from the GitHub API and a progress bar toward the goal. It is a native <dialog>: the browser handles the focus trap, Escape and the top layer, and the entry and exit animations run on @starting-style. JavaScript only fetches the star count, opens the dialog on a trigger or a timer and remembers dismissal in localStorage.",
  clickTheButtonToOpen: "Click the button to open the dialog.",
  autoOpen: "Auto-open",
  theDialogOpensOnce20:
    "The dialog opens once, 20 seconds after the page loads. If the user dismisses it or clicks the GitHub button, it will not open on its own again.",
  goalReached: "Goal reached",
  whenTheCounterPassesThe:
    'When the counter passes the goal, the bar fills up and the counter shows "Goal reached!".',
  liveStarCount: "Live star count",
  withoutInitialstarsThe:
    "Without initialStars the count is fetched from the GitHub API. Unauthenticated requests are limited to 60 per hour per IP, so in production pass a cached value from the server.",
  controlledMode: "Controlled mode",
  repositoryOwnerOnGithub: "Repository owner on GitHub",
  repositoryNameOnGithub: "Repository name on GitHub",
  starGoalForTheTitle: "Star goal for the title and progress bar",
  starCountToUseInstead: "Star count to use instead of a GitHub request",
  dialogTitle: "Dialog title",
  textBelowTheTitle: "Text below the title",
  badgeInTheHeaderPass: "Badge in the header. Pass null to hide it",
  secondaryButtonText: "Secondary button text",
  primaryButtonText: "Primary button text",
  elementThatOpensThe:
    "Element that opens the dialog. It receives an onClick handler",
  controlledOpenState: "Controlled open state",
  openStateChangeHandler: "Open state change handler",
  openAutomaticallyOnMount: "Open automatically on mount",
  delayBeforeAutoOpenMs: "Delay before auto-open, ms",
  localstorageKeyAfter:
    "localStorage key. After dismissal or a star, auto-open stops",
  calledWhenTheGithub: "Called when the GitHub button is clicked",
  additionalClassesForThe: "Additional classes for the dialog content",
  liveStarCountFromThe:
    "Live star count from the GitHub API with a loading skeleton",
  animatedProgressBarWithA:
    "Animated progress bar with a star at the current value",
  headerWithATwinkling: "Header with a twinkling night sky and constellations",
  autoOpenWithADelay:
    "Auto-open with a delay and dismissal remembered via localStorage",
  builtOnRadixDialogFocus:
    "Native <dialog>: focus trap, close on Escape and backdrop click",
  respectsPrefersReduced: "Respects prefers-reduced-motion",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    auditFeature0Description: "Показывает модальное окно",
    auditFeature1Description: "Анимирует появление",
    auditFeature2Description: "Анимирует закрытие",
    auditFeature3Description: "Блокирует прокрутку страницы при открытии",
    auditFeature4Description: "Оформляет подложку диалога",
    auditFeature5Description: "Задаёт кривую анимации диалога",
    auditFeature6Description: "Улучшает перенос текста приглашения",
    browserSupport: "Поддержка браузеров",
    supportDescription0: "Показывает окно с предложением поставить звезду.",
    supportDescription1: "Плавно показывает окно.",
    supportDescription2: "Плавно скрывает окно.",
    browserSupportText:
      "<dialog> в статусе Baseline widely, @starting-style и transition-behavior в статусе Baseline newly. Где их нет, окно всё так же открывается и закрывается, только без плавного появления.",
    description:
      "Модальное окно с просьбой поставить звезду репозиторию: шапка с ночным небом и прогресс-бар до цели по звёздам",
    preview: "Превью",
    installation: "Установка",
    usage: "Использование",
    examples: "Примеры",
    props: "Пропсы",
    features: "Возможности",
    modalAskingToStarYour:
      "Модальное окно с просьбой поставить звезду вашему проекту с открытым кодом. Показывает актуальное число звёзд из GitHub API и прогресс-бар до цели. Это нативный <dialog>: ловушку фокуса, Escape и верхний слой даёт браузер, а появление и исчезновение анимирует @starting-style. JavaScript только загружает число звёзд, открывает окно по триггеру или таймеру и запоминает закрытие в localStorage.",
    clickTheButtonToOpen: "Нажмите на кнопку, чтобы открыть диалог.",
    autoOpen: "Автооткрытие",
    theDialogOpensOnce20:
      "Диалог открывается один раз, через 20 секунд после загрузки страницы. Если пользователь закрыл его или нажал кнопку GitHub, сам он больше не откроется.",
    goalReached: "Цель достигнута",
    whenTheCounterPassesThe:
      "Когда счётчик проходит цель, прогресс-бар заполняется, а счётчик показывает «Goal reached!».",
    liveStarCount: "Актуальное число звёзд",
    withoutInitialstarsThe:
      "Без initialStars число берётся из GitHub API. Запросы без авторизации ограничены 60 в час на IP, поэтому в продакшене передавайте кешированное значение с сервера.",
    controlledMode: "Управляемый режим",
    repositoryOwnerOnGithub: "Владелец репозитория на GitHub",
    repositoryNameOnGithub: "Название репозитория на GitHub",
    starGoalForTheTitle: "Цель по звёздам для заголовка и прогресс-бара",
    starCountToUseInstead: "Число звёзд вместо запроса к GitHub",
    dialogTitle: "Заголовок диалога",
    textBelowTheTitle: "Текст под заголовком",
    badgeInTheHeaderPass: "Плашка в шапке. Передайте null, чтобы скрыть",
    secondaryButtonText: "Текст второстепенной кнопки",
    primaryButtonText: "Текст основной кнопки",
    elementThatOpensThe:
      "Элемент, который открывает диалог. Ему добавляется обработчик onClick",
    controlledOpenState: "Управляемое состояние открытия",
    openStateChangeHandler: "Обработчик изменения состояния открытия",
    openAutomaticallyOnMount: "Открыть автоматически при монтировании",
    delayBeforeAutoOpenMs: "Задержка перед автооткрытием, мс",
    localstorageKeyAfter:
      "Ключ localStorage. После закрытия или звезды автооткрытие прекращается",
    calledWhenTheGithub: "Вызывается при клике на кнопку GitHub",
    additionalClassesForThe: "Дополнительные классы для содержимого диалога",
    liveStarCountFromThe:
      "Актуальное число звёзд из GitHub API со скелетоном загрузки",
    animatedProgressBarWithA:
      "Анимированный прогресс-бар со звездой на текущем значении",
    headerWithATwinkling: "Шапка с мерцающим ночным небом и созвездиями",
    autoOpenWithADelay:
      "Автооткрытие с задержкой и запоминанием закрытия через localStorage",
    builtOnRadixDialogFocus:
      "Нативный <dialog>: ловушка фокуса, закрытие по Escape и клику по фону",
    respectsPrefersReduced: "Учитывает prefers-reduced-motion",
  },
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = content[locale as Locale]
  return {
    title: "GitHub Star Dialog",
    description: t.description,
  }
}

export default async function GitHubStarDialogPage({ params }: Props) {
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
        <DocsPageNav title="GitHub Star Dialog" />
        <p className="text-muted-foreground">{t.modalAskingToStarYour}</p>

        <BrowserSupport
          title={t.browserSupport}
          features={[
            {
              featureId: "dialog",
              description: t.auditFeature0Description,
            },
            {
              featureId: "starting-style",
              description: t.auditFeature1Description,
            },
            {
              featureId: "transition-behavior",
              description: t.auditFeature2Description,
            },
            {
              featureId: "has",
              description: t.auditFeature3Description,
            },
            {
              featureId: "backdrop",
              description: t.auditFeature4Description,
            },
            {
              featureId: "linear-easing",
              description: t.auditFeature5Description,
            },
            {
              featureId: "text-wrap-pretty",
              description: t.auditFeature6Description,
            },
          ]}
        />

        <DocsPreview description={t.clickTheButtonToOpen}>
          <GitHubStarDialogDemo />
        </DocsPreview>

        <DocsSection id="installation" title={t.installation}>
          <InstallCommand packageName="@gooseui/github-star-dialog" />
        </DocsSection>

        <DocsSection id="usage" title={t.usage}>
          <CodeBlock>{`import { Button } from "@/components/ui/button"

import { GitHubStarDialog } from "@/components/ui/github-star-dialog"

export default function Page() {
  return (
    <GitHubStarDialog
      owner="goosen-x"
      repo="gooseui"
      goal={1000}
      trigger={<Button>Support us</Button>}
    />
  )
}`}</CodeBlock>
        </DocsSection>

        <DocsSection id="examples" title={t.examples}>
          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.autoOpen}</h3>
              <p className="text-sm text-muted-foreground">
                {t.theDialogOpensOnce20}
              </p>
              <CodeBlock>{`<GitHubStarDialog
  owner="goosen-x"
  repo="gooseui"
  defaultOpen
  delay={20000}
  storageKey="gooseui-star-dialog"
/>`}</CodeBlock>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.goalReached}</h3>
              <p className="text-sm text-muted-foreground">
                {t.whenTheCounterPassesThe}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 py-8">
                <GitHubStarDialogGoalReachedDemo />
              </div>
              <CodeBlock>{`<GitHubStarDialog
  owner="goosen-x"
  repo="gooseui"
  goal={500}
  title="We hit 500 stars!"
  description="Thank you. Every star helps more developers discover the library."
  badge="Thank you ✦"
/>`}</CodeBlock>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.liveStarCount}</h3>
              <p className="text-sm text-muted-foreground">
                {t.withoutInitialstarsThe}
              </p>
              <div className="flex justify-center rounded-lg bg-muted/30 py-8">
                <GitHubStarDialogLiveDemo />
              </div>
              <CodeBlock>{`// Server component
const res = await fetch("https://api.github.com/repos/goosen-x/gooseui", {
  next: { revalidate: 3600 },
})
const { stargazers_count } = await res.json()

<GitHubStarDialog owner="goosen-x" repo="gooseui" initialStars={stargazers_count} />`}</CodeBlock>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t.controlledMode}</h3>
              <CodeBlock>{`const [open, setOpen] = React.useState(false)

<GitHubStarDialog
  owner="goosen-x"
  repo="gooseui"
  open={open}
  onOpenChange={setOpen}
  onStar={() => track("star_click")}
/>`}</CodeBlock>
            </div>
          </div>
        </DocsSection>

        <DocsSection id="props" title={t.props}>
          <DocsPropsTable
            props={[
              {
                name: "owner",
                type: "string",
                description: t.repositoryOwnerOnGithub,
              },
              {
                name: "repo",
                type: "string",
                description: t.repositoryNameOnGithub,
              },
              {
                name: "goal",
                type: "number",
                default: "1000",
                description: t.starGoalForTheTitle,
              },
              {
                name: "initialStars",
                type: "number",
                description: t.starCountToUseInstead,
              },
              {
                name: "title",
                type: "ReactNode",
                default: '"Help us reach {goal} stars"',
                description: t.dialogTitle,
              },
              {
                name: "description",
                type: "ReactNode",
                description: t.textBelowTheTitle,
              },
              {
                name: "badge",
                type: "ReactNode",
                default: '"Open source · Free forever"',
                description: t.badgeInTheHeaderPass,
              },
              {
                name: "dismissText",
                type: "ReactNode",
                default: '"Maybe later"',
                description: t.secondaryButtonText,
              },
              {
                name: "ctaText",
                type: "ReactNode",
                default: '"Star on GitHub"',
                description: t.primaryButtonText,
              },
              {
                name: "trigger",
                type: "ReactElement",
                description: t.elementThatOpensThe,
              },
              {
                name: "open",
                type: "boolean",
                description: t.controlledOpenState,
              },
              {
                name: "onOpenChange",
                type: "(open: boolean) => void",
                description: t.openStateChangeHandler,
              },
              {
                name: "defaultOpen",
                type: "boolean",
                default: "false",
                description: t.openAutomaticallyOnMount,
              },
              {
                name: "delay",
                type: "number",
                default: "0",
                description: t.delayBeforeAutoOpenMs,
              },
              {
                name: "storageKey",
                type: "string",
                description: t.localstorageKeyAfter,
              },
              {
                name: "onStar",
                type: "() => void",
                description: t.calledWhenTheGithub,
              },
              {
                name: "className",
                type: "string",
                description: t.additionalClassesForThe,
              },
            ]}
          />
        </DocsSection>

        <DocsSection id="features" title={t.features}>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            <li>{t.liveStarCountFromThe}</li>
            <li>{t.animatedProgressBarWithA}</li>
            <li>{t.headerWithATwinkling}</li>
            <li>{t.autoOpenWithADelay}</li>
            <li>{t.builtOnRadixDialogFocus}</li>
            <li>{t.respectsPrefersReduced}</li>
          </ul>
        </DocsSection>
      </div>
    </DocsPage>
  )
}
