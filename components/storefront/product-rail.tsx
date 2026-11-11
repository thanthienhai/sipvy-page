import type { HTMLAttributes, ReactNode } from "react"

import SectionHeading from "@/components/storefront/section-heading"
import StorefrontContainer from "@/components/storefront/storefront-container"
import { cn } from "@/lib/utils"

interface ProductRailProps extends Omit<HTMLAttributes<HTMLElement>, "title" | "children"> {
  title: ReactNode
  description?: ReactNode
  eyebrow?: ReactNode
  action?: ReactNode
  children: ReactNode
  className?: string
  contentClassName?: string
}

/** Shared product/combo rail spacing and heading treatment for campaign pages. */
export default function ProductRail({ title, description, eyebrow, action, children, className, contentClassName, ...props }: ProductRailProps) {
  return (
    <section className={cn("storefront-section", className)} {...props}>
      <StorefrontContainer className={contentClassName}>
        <SectionHeading title={title} description={description} eyebrow={eyebrow} action={action} />
        {children}
      </StorefrontContainer>
    </section>
  )
}
