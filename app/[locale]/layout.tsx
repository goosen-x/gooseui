import type { Metadata } from "next"
import { Geist_Mono, Jost, Outfit } from "next/font/google"
import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { SiteToaster } from "@/components/site-toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { YandexMetrika } from "@/components/yandex-metrika"
import { pick } from "@/i18n/dict"
import { routing } from "@/i18n/routing"
import {
  GOOGLE_VERIFICATION,
  YANDEX_VERIFICATION,
} from "@/lib/config/analytics"
import { siteConfig } from "@/lib/config/navigation"

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

// В Outfit нет кириллицы, Jost — близкий геометрический гротеск. Подгружается только cyrillic-сабсет
const jost = Jost({
  subsets: ["cyrillic"],
  variable: "--font-jost",
  display: "swap",
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const description = pick(siteConfig.description, locale)
  return {
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    metadataBase: new URL(siteConfig.url),
    icons: {
      icon: [
        { url: "/favicon/favicon-color.svg", type: "image/svg+xml" },
        { url: "/favicon/favicon-32.png", sizes: "32x32", type: "image/png" },
        {
          url: "/favicon/favicon-96x96.png",
          sizes: "96x96",
          type: "image/png",
        },
      ],
      apple: "/favicon/apple-touch-icon.png",
    },
    manifest: "/favicon/site.webmanifest",
    verification: {
      yandex: YANDEX_VERIFICATION,
      google: GOOGLE_VERIFICATION || undefined,
    },
    openGraph: {
      type: "website",
      locale: locale === "ru" ? "ru_RU" : "en_US",
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: siteConfig.name,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description,
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  return (
    <html lang={locale} suppressHydrationWarning className="overflow-x-clip">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var color = localStorage.getItem('theme-color') || 'green';
                  document.documentElement.setAttribute('data-theme-color', color);
                } catch (e) {
                  document.documentElement.setAttribute('data-theme-color', 'green');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${outfit.variable} ${jost.variable} ${geistMono.variable} min-h-screen overflow-x-clip bg-background font-sans antialiased`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <SiteToaster />
          </ThemeProvider>
        </NextIntlClientProvider>
        <YandexMetrika />
      </body>
    </html>
  )
}
