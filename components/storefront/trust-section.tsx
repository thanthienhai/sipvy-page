import type { HTMLAttributes, ReactNode } from "react"

import StorefrontContainer from "@/components/storefront/storefront-container"
import { cn } from "@/lib/utils"

interface TrustSectionProps extends Omit<HTMLAttributes<HTMLElement>, "title" | "children"> {
  title?: ReactNode
  description?: ReactNode
  children: ReactNode
  contained?: boolean
}

/** Shared proof/quality section shell for certifications, values and service promises. */
export default function TrustSection({ title, description, children, contained = true, className, ...props }: TrustSectionProps) {
  const content = <>{(title || description) && <header className="mb-8 text-center"><h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-tight tracking-tight text-stone-950">{title}</h2>{description && <p className="mx-auto mt-3 max-w-[70ch] text-base leading-7 text-stone-600">{description}</p>}</header>}{children}</>
  return <section className={cn("storefront-section", className)} {...props}>{contained ? <StorefrontContainer>{content}</StorefrontContainer> : content}</section>
}
