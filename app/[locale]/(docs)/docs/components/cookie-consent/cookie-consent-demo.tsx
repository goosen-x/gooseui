import type { Locale } from "@/i18n/routing"
import { CookieConsent } from "@/registry/gooseui/ui/cookie-consent"
import { content } from "./cookie-consent-content"
import { Frame } from "./cookie-consent-frame"

export { CookieConsentHookDemo } from "./cookie-consent-frame"

type DemoProps = { locale: Locale }

export function CookieConsentDemo({ locale }: DemoProps) {
  const t = content[locale]
  return (
    <Frame storageKey="gooseui-demo-cookie-bar">
      <CookieConsent
        storageKey="gooseui-demo-cookie-bar"
        position="absolute"
        labels={t.labels}
      />
    </Frame>
  )
}

export function CookieConsentCardDemo({ locale }: DemoProps) {
  const t = content[locale]
  return (
    <Frame storageKey="gooseui-demo-cookie-card">
      <CookieConsent
        storageKey="gooseui-demo-cookie-card"
        variant="card"
        side="left"
        position="absolute"
        labels={t.labels}
      />
    </Frame>
  )
}

export function CookieConsentCategoriesDemo({ locale }: DemoProps) {
  const t = content[locale]
  return (
    <Frame
      storageKey="gooseui-demo-cookie-categories"
      withCategories
      height="h-[460px]"
    >
      <CookieConsent
        storageKey="gooseui-demo-cookie-categories"
        variant="card"
        position="absolute"
        labels={t.labels}
        categories={t.categories}
      />
    </Frame>
  )
}
