import { createNavigation } from "next-intl/navigation"
import { routing } from "./routing"

// Ссылки и хуки навигации с учётом языка: /docs на русской версии ведёт на /ru/docs
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
