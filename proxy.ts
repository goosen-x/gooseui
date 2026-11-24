import createMiddleware from "next-intl/middleware"
import { NextResponse, type NextRequest } from "next/server"
import decisions from "./review/decisions.json"
import { routing } from "./i18n/routing"

const intl = createMiddleware(routing)

export default function proxy(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    const match = request.nextUrl.pathname.match(/^\/(?:ru\/|en\/)?docs\/(?:components|effects|hooks)\/([^/]+)\/?$/)
    if (match && (decisions.items as Record<string, { status: string }>)[match[1]]?.status !== "accepted") {
      const url = request.nextUrl.clone()
      url.pathname = `${request.nextUrl.pathname.startsWith("/ru/") ? "/ru" : "/en"}/__unpublished__`
      return NextResponse.rewrite(url)
    }
  }
  return intl(request)
}

export const config = {
  // Не трогаем API, служебные файлы Next, JSON реестра shadcn (/r/*), превью блоков в iframe и файлы с расширением
  matcher: ["/((?!api|_next|_vercel|r/|review(?:/|$)|blocks/preview|.*\\..*).*)"],
}
