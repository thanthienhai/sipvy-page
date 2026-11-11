import type { ReactNode } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

export interface BreadcrumbItem {
  label: ReactNode
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  /** "dark" is for breadcrumbs placed on dark hero images. */
  tone?: "light" | "dark"
  className?: string
}

/** The single breadcrumb landmark used by every storefront page. */
export default function Breadcrumb({ items, tone = "light", className }: BreadcrumbProps) {
  if (items.length === 0) return null
  const dark = tone === "dark"
  return (
    <nav aria-label="Breadcrumb" className={cn("mb-4 text-sm", dark ? "text-stone-300" : "text-stone-600", className)}>
      <ol className="flex min-w-0 flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${index}-${String(item.label)}`} className="flex min-w-0 items-center gap-1.5">
              {index > 0 && <ChevronRight className={cn("h-3.5 w-3.5 shrink-0", dark ? "text-stone-400" : "text-stone-500")} aria-hidden="true" />}
              {item.href && !isLast ? (
                <Link href={item.href} className={cn("truncate transition-colors", dark ? "hover:text-white" : "hover:text-green-800")}>
                  {item.label}
                </Link>
              ) : (
                <span className={cn("truncate", isLast && (dark ? "font-medium text-white" : "font-medium text-stone-950"))} aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
