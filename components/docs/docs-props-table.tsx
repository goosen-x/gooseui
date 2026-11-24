import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"

const en = {
  title: "Props",
  prop: "Prop",
  type: "Type",
  default: "Default",
  description: "Description",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    title: "Пропсы",
    prop: "Проп",
    type: "Тип",
    default: "По умолчанию",
    description: "Описание",
  },
}

interface PropItem {
  name: string
  type: string
  default?: string
  description: string
}

interface DocsPropsTableProps {
  /** Array of props to display */
  props: PropItem[]
}

/**
 * Props table for documentation pages
 *
 * Usage:
 * ```tsx
 * <DocsPropsTable
 *   props={[
 *     { name: "variant", type: "string", default: '"default"', description: "Style variant" },
 *     { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Button size" },
 *   ]}
 * />
 * ```
 */
export function DocsPropsTable({ props }: DocsPropsTableProps) {
  const t = content[useLocale() as Locale]

  return (
    <div className="space-y-4">
      <h2
        id="props"
        className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
      >
        {t.title}
      </h2>
      <div className="border rounded-lg overflow-x-auto">
        <table className="w-full text-sm min-w-[500px]">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-3 font-medium">{t.prop}</th>
              <th className="text-left p-3 font-medium">{t.type}</th>
              <th className="text-left p-3 font-medium">{t.default}</th>
              <th className="text-left p-3 font-medium">{t.description}</th>
            </tr>
          </thead>
          <tbody>
            {props.map((prop, index) => (
              <tr key={prop.name} className={index > 0 ? "border-t" : ""}>
                <td className="p-3 font-mono text-xs">{prop.name}</td>
                <td className="p-3 font-mono text-xs">{prop.type}</td>
                <td className="p-3 font-mono text-xs">{prop.default || "-"}</td>
                <td className="p-3">{prop.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
