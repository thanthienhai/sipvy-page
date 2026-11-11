import type { HTMLAttributes, ReactNode } from "react"

import StorefrontContainer from "@/components/storefront/storefront-container"
import { cn } from "@/lib/utils"

interface StorySectionProps extends Omit<HTMLAttributes<HTMLElement>, "title" | "children"> {
  title?: ReactNode
  description?: ReactNode
  children: ReactNode
  contained?: boolean
}

/** Shared editorial section shell for long-form brand and education stories. */
export default function StorySection({ title, description, children, contained = true, className, ...props }: StorySectionProps) {
  const content = <>{(title || description) && <header className="mb-8 max-w-3xl"><h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-tight tracking-tight text-stone-950">{title}</h2>{description && <p className="mt-3 text-base leading-7 text-stone-600">{description}</p>}</header>}{children}</>
  return <section className={cn("storefront-section", className)} {...props}>{contained ? <StorefrontContainer>{content}</StorefrontContainer> : content}</section>
}
