import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: ReactNode
  description?: ReactNode
  eyebrow?: ReactNode
  action?: ReactNode
  align?: "left" | "center"
  /** Heading level; keep sections in order (no skipped levels). Defaults to h2. */
  level?: 2 | 3
  /** "inverse" is for dark backgrounds. */
  tone?: "default" | "inverse"
  className?: string
}

/** Shared H2 treatment for storefront sections and product rails. */
export default function SectionHeading({
  title,
  description,
  eyebrow,
  action,
  align = "left",
  level = 2,
  tone = "default",
  className,
}: SectionHeadingProps) {
  const centered = align === "center"
  const inverse = tone === "inverse"
  const Heading = level === 3 ? "h3" : "h2"

  return (
    <div
      className={cn(
        "mb-8 flex flex-wrap items-end justify-between gap-4",
        centered && "justify-center text-center",
        className,
      )}
    >
      <div className={cn("min-w-0", centered && "mx-auto max-w-3xl")}>
        {eyebrow && <div className={cn("mb-2 text-xs font-semibold uppercase tracking-[0.18em]", inverse ? "text-amber-300" : "text-green-700")}>{eyebrow}</div>}
        <Heading className={cn("text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-tight tracking-tight", inverse ? "text-white" : "text-stone-950")}>
          {title}
        </Heading>
        {description && <p className={cn("mt-3 max-w-[70ch] text-base leading-7", inverse ? "text-stone-300" : "text-stone-600")}>{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
