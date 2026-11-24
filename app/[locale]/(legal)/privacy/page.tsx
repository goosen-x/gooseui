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
    title: "Privacy Policy",
    description: "Privacy Policy for GooseUI",
    heading: "Privacy Policy",
    updated: "Last updated: January 2025",
    body: (
      <>
        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            GooseUI (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;)
            respects your privacy and is committed to protecting your personal
            data. This Privacy Policy explains how we collect, use, and
            safeguard your information when you use our Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            2. Information We Collect
          </h2>

          <h3 className="text-lg font-medium mt-4 mb-2">
            Information you provide:
          </h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Account information (email address, name)</li>
            <li>Payment information (processed by Paddle)</li>
            <li>Content you create using the Service</li>
            <li>Communications with us</li>
          </ul>

          <h3 className="text-lg font-medium mt-4 mb-2">
            Information collected automatically:
          </h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Device and browser information</li>
            <li>IP address and location data</li>
            <li>Usage data and analytics</li>
            <li>Cookies and similar technologies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            3. How We Use Your Information
          </h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Provide and maintain the Service</li>
            <li>Process payments and manage subscriptions</li>
            <li>Send important updates and notifications</li>
            <li>Improve and personalize the Service</li>
            <li>Respond to your requests and support inquiries</li>
            <li>Detect and prevent fraud or abuse</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">4. Data Sharing</h2>
          <p>We may share your information with:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              <strong>Paddle:</strong> Our payment processor and merchant of
              record
            </li>
            <li>
              <strong>Hosting providers:</strong> To deliver the Service
              (Vercel)
            </li>
            <li>
              <strong>Analytics services:</strong> To understand usage patterns
            </li>
            <li>
              <strong>Legal authorities:</strong> When required by law
            </li>
          </ul>
          <p className="mt-2">
            We do not sell your personal data to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal data, including:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Encryption of data in transit (HTTPS)</li>
            <li>Secure authentication mechanisms</li>
            <li>Regular security assessments</li>
            <li>Limited access to personal data</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">6. Data Retention</h2>
          <p>
            We retain your personal data for as long as your account is active
            or as needed to provide the Service. You can request deletion of
            your account and data at any time.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">7. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Delete your data</li>
            <li>Export your data</li>
            <li>Opt-out of marketing communications</li>
            <li>Withdraw consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">8. Cookies</h2>
          <p>
            We use cookies and similar technologies to enhance your experience.
            You can control cookie preferences through your browser settings.
            Essential cookies are required for the Service to function.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            9. International Transfers
          </h2>
          <p>
            Your data may be transferred to and processed in countries outside
            your residence. We ensure appropriate safeguards are in place for
            such transfers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            10. Children&apos;s Privacy
          </h2>
          <p>
            The Service is not intended for children under 16. We do not
            knowingly collect personal data from children. If you believe we
            have collected data from a child, please contact us.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            11. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of significant changes via email or through the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">12. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or your data,
            contact us at:{" "}
            <a
              href="mailto:privacy@gooseui.pro"
              className="text-primary hover:underline"
            >
              privacy@gooseui.pro
            </a>
          </p>
        </section>
      </>
    ),
  },
  ru: {
    title: "Политика конфиденциальности",
    description: "Политика конфиденциальности GooseUI",
    heading: "Политика конфиденциальности",
    updated: "Последнее обновление: январь 2025",
    body: (
      <>
        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">1. Введение</h2>
          <p>
            GooseUI («мы», «наш» или «нас») уважает вашу конфиденциальность и
            обязуется защищать ваши персональные данные. Эта Политика
            конфиденциальности объясняет, как мы собираем, используем и храним
            вашу информацию, когда вы пользуетесь нашим Сервисом.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            2. Какую информацию мы собираем
          </h2>

          <h3 className="text-lg font-medium mt-4 mb-2">
            Информация, которую вы предоставляете:
          </h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Данные аккаунта (адрес электронной почты, имя)</li>
            <li>Платёжные данные (обрабатываются Paddle)</li>
            <li>Контент, который вы создаёте с помощью Сервиса</li>
            <li>Ваша переписка с нами</li>
          </ul>

          <h3 className="text-lg font-medium mt-4 mb-2">
            Информация, которая собирается автоматически:
          </h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Данные об устройстве и браузере</li>
            <li>IP-адрес и данные о местоположении</li>
            <li>Данные об использовании и аналитика</li>
            <li>Файлы cookie и похожие технологии</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            3. Как мы используем вашу информацию
          </h2>
          <p>Мы используем вашу информацию, чтобы:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>предоставлять и поддерживать Сервис</li>
            <li>обрабатывать платежи и управлять подписками</li>
            <li>отправлять важные обновления и уведомления</li>
            <li>улучшать и персонализировать Сервис</li>
            <li>отвечать на ваши запросы и обращения в поддержку</li>
            <li>выявлять и предотвращать мошенничество и злоупотребления</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            4. Передача данных
          </h2>
          <p>Мы можем передавать вашу информацию:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              <strong>Paddle:</strong> наш платёжный процессор и продавец записи
              (merchant of record)
            </li>
            <li>
              <strong>Хостинг-провайдерам:</strong> для работы Сервиса (Vercel)
            </li>
            <li>
              <strong>Сервисам аналитики:</strong> чтобы понимать, как
              используется Сервис
            </li>
            <li>
              <strong>Государственным органам:</strong> когда этого требует
              закон
            </li>
          </ul>
          <p className="mt-2">
            Мы не продаём ваши персональные данные третьим лицам.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            5. Безопасность данных
          </h2>
          <p>
            Мы применяем необходимые технические и организационные меры для
            защиты ваших персональных данных, в том числе:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>шифрование данных при передаче (HTTPS)</li>
            <li>защищённые механизмы аутентификации</li>
            <li>регулярные проверки безопасности</li>
            <li>ограниченный доступ к персональным данным</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            6. Срок хранения данных
          </h2>
          <p>
            Мы храним ваши персональные данные, пока ваш аккаунт активен или
            пока это нужно для работы Сервиса. Вы можете в любое время запросить
            удаление аккаунта и данных.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">7. Ваши права</h2>
          <p>В зависимости от вашего местоположения вы можете иметь право:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>получить доступ к своим персональным данным</li>
            <li>исправить неточные данные</li>
            <li>удалить свои данные</li>
            <li>экспортировать свои данные</li>
            <li>отказаться от маркетинговых рассылок</li>
            <li>отозвать согласие</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">8. Cookie</h2>
          <p>
            Мы используем файлы cookie и похожие технологии, чтобы сделать
            работу с Сервисом удобнее. Настройки cookie можно изменить в
            браузере. Необходимые cookie нужны для работы Сервиса.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            9. Международная передача данных
          </h2>
          <p>
            Ваши данные могут передаваться и обрабатываться в странах за
            пределами вашего места проживания. Мы обеспечиваем надлежащие меры
            защиты при такой передаче.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            10. Конфиденциальность детей
          </h2>
          <p>
            Сервис не предназначен для детей младше 16 лет. Мы сознательно не
            собираем персональные данные детей. Если вы считаете, что мы собрали
            данные ребёнка, свяжитесь с нами.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            11. Изменения в Политике
          </h2>
          <p>
            Мы можем время от времени обновлять эту Политику конфиденциальности.
            О существенных изменениях мы сообщим по электронной почте или через
            Сервис.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            12. Связаться с нами
          </h2>
          <p>
            Если у вас есть вопросы об этой Политике конфиденциальности или о
            ваших данных, напишите нам:{" "}
            <a
              href="mailto:privacy@gooseui.pro"
              className="text-primary hover:underline"
            >
              privacy@gooseui.pro
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

export default async function PrivacyPage({ params }: Props) {
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
