"use client"

import { usePathname, useSearchParams } from "next/navigation"
import Script from "next/script"
import { Suspense, useEffect } from "react"
import { YANDEX_METRIKA_ID } from "@/lib/config/analytics"

type Ym = (id: number, method: string, ...args: unknown[]) => void

// Счётчик сам считает только первую загрузку, переходы внутри приложения
// отправляем вручную.
function PageHit() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const ym = (window as unknown as { ym?: Ym }).ym
    const query = searchParams.toString()
    ym?.(YANDEX_METRIKA_ID, "hit", query ? `${pathname}?${query}` : pathname)
  }, [pathname, searchParams])

  return null
}

export function YandexMetrika() {
  if (process.env.NODE_ENV !== "production" || !YANDEX_METRIKA_ID) return null

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}', 'ym');

          ym(${YANDEX_METRIKA_ID}, 'init', {ssr:true, webvisor:true, clickmap:true, referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
        `}
      </Script>
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
      <Suspense fallback={null}>
        <PageHit />
      </Suspense>
    </>
  )
}
