import type { ReactNode } from "react"
import Breadcrumb, { type BreadcrumbItem } from "@/components/storefront/breadcrumb"
import StorefrontContainer from "@/components/storefront/storefront-container"
import { cn } from "@/lib/utils"

export type PageHeaderBreadcrumb = BreadcrumbItem

interface PageHeaderProps {
  title: ReactNode
  description?: ReactNode
  eyebrow?: ReactNode
  icon?: ReactNode
  breadcrumbs?: PageHeaderBreadcrumb[]
  actions?: ReactNode
  /** Extra row under the description, e.g. version / effective-date chips. */
  meta?: ReactNode
  variant?: "default" | "subtle" | "plain" | "warm"
  className?: string
  contentClassName?: string
}

const variantClasses = {
  default: "border-b border-stone-200 bg-gradient-to-br from-stone-50 via-white to-stone-50",
  subtle: "border-b border-stone-200 bg-stone-50",
  plain: "border-b border-stone-200 bg-white",
  warm: "border-b border-stone-200 bg-[#f3f1ea]",
}

/** Consistent breadcrumb, H1, supporting text and optional actions. */
export default function PageHeader({
  title,
  description,
  eyebrow,
  icon,
  breadcrumbs = [],
  actions,
  meta,
  variant = "default",
  className,
  contentClassName,
}: PageHeaderProps) {
  return (
    <header className={cn(variantClasses[variant], className)}>
      <StorefrontContainer className={cn("py-8 md:py-10", contentClassName)}>
        <Breadcrumb items={breadcrumbs} />

        <div className={cn("flex flex-wrap items-end justify-between gap-5", actions && "lg:gap-8")}>
          <div className="min-w-0 max-w-3xl">
            {eyebrow && <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-green-700">{eyebrow}</div>}
            <h1 className="flex items-start gap-2 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-stone-950">
              {icon && <span className="mt-1 shrink-0 text-green-800">{icon}</span>}
              <span>{title}</span>
            </h1>
            {description && <p className="mt-3 max-w-[70ch] text-base leading-7 text-stone-600">{description}</p>}
            {meta && <div className="mt-5">{meta}</div>}
          </div>
          {actions && <div className="w-full shrink-0 lg:w-auto">{actions}</div>}
        </div>
      </StorefrontContainer>
    </header>
  )
}
