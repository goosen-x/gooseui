'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/routing'
import { locales } from '@/i18n/config'
import { cn } from '@/lib/utils'

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className="flex items-center gap-1 rounded-md border bg-muted/50 p-0.5">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => handleChange(l)}
          className={cn(
            "px-2 py-1 text-xs font-medium rounded transition-colors",
            locale === l
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
