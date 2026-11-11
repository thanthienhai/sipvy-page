import type { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

export const storefrontContainerClassName =
  "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"

/** Shared content width and responsive gutter for storefront pages. */
export default function StorefrontContainer({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(storefrontContainerClassName, className)} {...props} />
}
