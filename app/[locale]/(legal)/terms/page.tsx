import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import type { ReactNode } from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"

type Props = { params: Promise<{ locale: string }> }

interface LegalContent {
  title: string
  description: string
  heading: string
  updated: string
  body: ReactNode
}

const content: Dict<LegalContent> = {
  en: {
    title: "Terms of Service",
    description: "Terms of Service for GooseUI",
    heading: "Terms of Service",
    updated: "Last updated: January 2025",
    body: (
      <>
        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using GooseUI (&quot;Service&quot;), you accept and
            agree to be bound by these Terms of Service. If you do not agree to
            these terms, please do not use our Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            2. Description of Service
          </h2>
          <p>
            GooseUI provides a landing page builder and UI component library.
            The Service allows users to create, customize, and export landing
            pages using pre-built components.
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Free tier: Limited projects and exports with watermark</li>
            <li>Pro tier: Unlimited projects, exports, and premium features</li>
            <li>Team tier: Team collaboration features</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">3. User Accounts</h2>
          <p>
            To access certain features, you may need to create an account. You
            are responsible for:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized use</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">4. Payment Terms</h2>
          <p>
            Paid subscriptions are billed in advance on a monthly or annual
            basis. Payments are processed securely through Paddle, our merchant
            of record.
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Prices are in USD and may be subject to local taxes</li>
            <li>Subscriptions automatically renew unless cancelled</li>
            <li>You can cancel your subscription at any time</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">5. Refund Policy</h2>
          <p>
            We offer a 30-day money-back guarantee for all paid subscriptions.
            If you are not satisfied with the Service, contact us within 30 days
            of purchase for a full refund.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            6. Intellectual Property
          </h2>
          <p>
            The Service and its original content, features, and functionality
            are owned by GooseUI and are protected by international copyright,
            trademark, and other intellectual property laws.
          </p>
          <p className="mt-2">
            Content you create using the Service belongs to you. You grant us a
            license to host and display your content as necessary to provide the
            Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            7. Prohibited Uses
          </h2>
          <p>You agree not to use the Service to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on intellectual property rights of others</li>
            <li>Distribute malware or harmful code</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Resell or redistribute the Service without permission</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            8. Limitation of Liability
          </h2>
          <p>
            The Service is provided &quot;as is&quot; without warranties of any
            kind. We shall not be liable for any indirect, incidental, special,
            or consequential damages resulting from your use of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            9. Changes to Terms
          </h2>
          <p>
            We reserve the right to modify these terms at any time. We will
            notify users of significant changes via email or through the
            Service. Continued use after changes constitutes acceptance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">10. Contact</h2>
          <p>
            If you have questions about these Terms, please contact us at:{" "}
            <a
              href="mailto:support@gooseui.pro"
              className="text-primary hover:underline"
            >
              support@gooseui.pro
            </a>
          </p>
        </section>
      </>
    ),
  },
  ru: {
    title: "Условия использования",
    description: "Условия использования GooseUI",
    heading: "Условия использования",
    updated: "Последнее обновление: январь 2025",
    body: (
      <>
        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            1. Принятие условий
          </h2>
          <p>
            Заходя на GooseUI («Сервис») и пользуясь им, вы принимаете настоящие
            Условия использования и соглашаетесь их соблюдать. Если вы не
            согласны с условиями, пожалуйста, не пользуйтесь Сервисом.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            2. Описание Сервиса
          </h2>
          <p>
            GooseUI предоставляет конструктор лендингов и библиотеку
            UI-компонентов. Сервис позволяет создавать, настраивать и
            экспортировать лендинги из готовых компонентов.
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              Бесплатный тариф: ограниченное число проектов и экспортов с
              водяным знаком
            </li>
            <li>
              Тариф Pro: неограниченные проекты, экспорты и премиум-функции
            </li>
            <li>Тариф Team: функции для командной работы</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">3. Учётные записи</h2>
          <p>
            Для доступа к некоторым функциям может понадобиться аккаунт. Вы
            несёте ответственность за:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>сохранность учётных данных вашего аккаунта</li>
            <li>все действия, совершённые под вашим аккаунтом</li>
            <li>
              немедленное уведомление нас о любом несанкционированном
              использовании
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">4. Условия оплаты</h2>
          <p>
            Платные подписки оплачиваются заранее, ежемесячно или ежегодно.
            Платежи безопасно обрабатываются через Paddle, нашего продавца
            записи (merchant of record).
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Цены указаны в долларах США и могут включать местные налоги</li>
            <li>Подписки продлеваются автоматически, пока вы их не отмените</li>
            <li>Подписку можно отменить в любое время</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            5. Политика возврата
          </h2>
          <p>
            Мы гарантируем возврат денег в течение 30 дней для всех платных
            подписок. Если Сервис вас не устроил, свяжитесь с нами в течение 30
            дней после покупки, и мы вернём полную стоимость.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            6. Интеллектуальная собственность
          </h2>
          <p>
            Сервис, а также его оригинальный контент, возможности и
            функциональность принадлежат GooseUI и защищены международным
            законодательством об авторском праве, товарных знаках и другой
            интеллектуальной собственности.
          </p>
          <p className="mt-2">
            Контент, который вы создаёте с помощью Сервиса, принадлежит вам. Вы
            предоставляете нам лицензию на хранение и показ вашего контента в
            объёме, необходимом для работы Сервиса.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            7. Запрещённое использование
          </h2>
          <p>Вы соглашаетесь не использовать Сервис, чтобы:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>нарушать применимое законодательство и нормативные акты</li>
            <li>нарушать права других лиц на интеллектуальную собственность</li>
            <li>распространять вредоносное ПО и опасный код</li>
            <li>
              пытаться получить несанкционированный доступ к нашим системам
            </li>
            <li>перепродавать или распространять Сервис без разрешения</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            8. Ограничение ответственности
          </h2>
          <p>
            Сервис предоставляется «как есть», без каких-либо гарантий. Мы не
            несём ответственности за косвенные, побочные, особые или последующие
            убытки, возникшие в результате использования Сервиса.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            9. Изменение условий
          </h2>
          <p>
            Мы оставляем за собой право в любое время изменять настоящие
            условия. О существенных изменениях мы сообщим пользователям по
            электронной почте или через Сервис. Продолжая пользоваться Сервисом
            после изменений, вы принимаете их.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">10. Контакты</h2>
          <p>
            Если у вас есть вопросы по настоящим Условиям, напишите нам:{" "}
            <a
              href="mailto:support@gooseui.pro"
              className="text-primary hover:underline"
            >
              support@gooseui.pro
            </a>
          </p>
        </section>
      </>
    ),
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = content[locale as Locale]
  return { title: t.title, description: t.description }
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = content[locale as Locale]

  return (
    <div className="container max-w-3xl py-16">
      <h1 className="text-3xl font-bold mb-8">{t.heading}</h1>
      <p className="text-muted-foreground mb-8">{t.updated}</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
        {t.body}
      </div>
    </div>
  )
}
