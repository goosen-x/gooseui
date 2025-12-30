"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { docsNav } from "@/lib/config/navigation"
import { cn } from "@/lib/utils"

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
      <div className="h-full overflow-y-auto py-6 pr-6 lg:py-8">
        <nav className="w-full">
          {docsNav.map((section) => (
            <div key={section.title} className="pb-4">
              <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                {section.title}
              </h4>
              {section.items?.length && (
                <div className="grid grid-flow-row auto-rows-max text-sm">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
                        pathname === item.href
                          ? "font-medium text-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  )
}
