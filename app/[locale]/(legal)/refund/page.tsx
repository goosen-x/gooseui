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
    title: "Refund Policy",
    description: "Refund Policy for GooseUI",
    heading: "Refund Policy",
    updated: "Last updated: January 2025",
    body: (
      <>
        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            30-Day Money-Back Guarantee
          </h2>
          <p>
            We offer a <strong>30-day money-back guarantee</strong> on all paid
            subscriptions. If you&apos;re not satisfied with GooseUI for any
            reason, simply contact us within 30 days of your purchase for a full
            refund.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            How to Request a Refund
          </h2>
          <p>To request a refund:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>
              Email us at{" "}
              <a
                href="mailto:support@gooseui.pro"
                className="text-primary hover:underline"
              >
                support@gooseui.pro
              </a>
            </li>
            <li>Include your account email and reason for refund (optional)</li>
            <li>We&apos;ll process your refund within 5-7 business days</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">Refund Conditions</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Refund requests must be made within 30 days of purchase</li>
            <li>Refunds are issued to the original payment method</li>
            <li>
              Upon refund, your account will be downgraded to the free tier
            </li>
            <li>
              Exported content created during the subscription period remains
              yours
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            Subscription Cancellation
          </h2>
          <p>
            You can cancel your subscription at any time from your account
            settings. When you cancel:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>
              You retain access to paid features until the end of your billing
              period
            </li>
            <li>Your subscription will not renew</li>
            <li>
              No partial refunds for unused time (unless within 30-day guarantee
              period)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            Payment Processing
          </h2>
          <p>
            All payments are processed by <strong>Paddle</strong>, our merchant
            of record. Refunds are handled through Paddle&apos;s secure payment
            system.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">Contact</h2>
          <p>
            Questions about refunds? Contact us at:{" "}
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
    title: "Политика возврата",
    description: "Политика возврата GooseUI",
    heading: "Политика возврата",
    updated: "Последнее обновление: январь 2025",
    body: (
      <>
        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            Гарантия возврата денег в течение 30 дней
          </h2>
          <p>
            Мы предоставляем{" "}
            <strong>гарантию возврата денег в течение 30 дней</strong> для всех
            платных подписок. Если GooseUI вас по какой-либо причине не устроил,
            просто свяжитесь с нами в течение 30 дней после покупки, и мы вернём
            полную стоимость.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            Как запросить возврат
          </h2>
          <p>Чтобы запросить возврат:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>
              Напишите нам на{" "}
              <a
                href="mailto:support@gooseui.pro"
                className="text-primary hover:underline"
              >
                support@gooseui.pro
              </a>
            </li>
            <li>
              Укажите email вашего аккаунта и причину возврата (необязательно)
            </li>
            <li>Мы обработаем возврат в течение 5–7 рабочих дней</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">Условия возврата</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Запрос на возврат нужно отправить в течение 30 дней после покупки
            </li>
            <li>
              Деньги возвращаются тем же способом, которым была произведена
              оплата
            </li>
            <li>После возврата ваш аккаунт переводится на бесплатный тариф</li>
            <li>
              Экспортированный контент, созданный в период подписки, остаётся у
              вас
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">Отмена подписки</h2>
          <p>
            Вы можете отменить подписку в любое время в настройках аккаунта.
            После отмены:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>
              доступ к платным функциям сохраняется до конца оплаченного периода
            </li>
            <li>подписка не будет продлена</li>
            <li>
              частичный возврат за неиспользованное время не предусмотрен (кроме
              случаев в рамках 30-дневной гарантии)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            Обработка платежей
          </h2>
          <p>
            Все платежи обрабатывает <strong>Paddle</strong>, наш продавец
            записи (merchant of record). Возвраты проходят через защищённую
            платёжную систему Paddle.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">Контакты</h2>
          <p>
            Вопросы о возврате? Напишите нам:{" "}
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

export default async function RefundPage({ params }: Props) {
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
