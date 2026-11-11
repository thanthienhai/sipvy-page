import type { HTMLAttributes, ReactNode } from "react"

import StorefrontContainer from "@/components/storefront/storefront-container"
import { cn } from "@/lib/utils"

interface EditorialHeroProps extends Omit<HTMLAttributes<HTMLElement>, "title" | "children"> {
  eyebrow?: ReactNode
  title?: ReactNode
  description?: ReactNode
  actions?: ReactNode
  children?: ReactNode
  contained?: boolean
}

/** Shared hero shell for editorial and campaign pages. Pass children for image-led custom layouts. */
export default function EditorialHero({
  eyebrow,
  title,
  description,
  actions,
  children,
  contained = true,
  className,
  ...props
}: EditorialHeroProps) {
  const content = children || (
    <div className="max-w-3xl">
      {eyebrow && <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-green-700">{eyebrow}</div>}
      {title && <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-tight tracking-tight text-stone-950">{title}</h1>}
      {description && <p className="mt-4 max-w-[70ch] text-base leading-7 text-stone-600 md:text-lg">{description}</p>}
      {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
    </div>
  )

  return (
    <section className={cn("relative overflow-hidden", className)} {...props}>
      {contained ? <StorefrontContainer className="relative py-14 md:py-20">{content}</StorefrontContainer> : content}
    </section>
  )
}
