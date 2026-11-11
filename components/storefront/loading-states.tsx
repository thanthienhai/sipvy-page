import type { ReactNode } from "react"

import StorefrontContainer from "@/components/storefront/storefront-container"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface StatePanelProps {
  title: string
  description: ReactNode
  icon?: ReactNode
  action?: ReactNode
  className?: string
  role?: "status" | "alert"
  headingLevel?: "h1" | "h2" | "h3"
}

/** Shared empty/error state that explains the situation, next step and CTA. */
export function StatePanel({ title, description, icon, action, className, role = "status", headingLevel = "h2" }: StatePanelProps) {
  const Heading = headingLevel
  return <div role={role} className={cn("rounded-2xl border border-stone-200 bg-stone-50 px-6 py-12 text-center", className)}><div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-green-700 shadow-sm">{icon}</div><Heading className="text-lg font-semibold text-stone-900">{title}</Heading><p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-stone-600">{description}</p>{action && <div className="mt-6 flex flex-wrap justify-center gap-3">{action}</div>}</div>
}

export function PageSkeleton() {
  return <div aria-busy="true" aria-live="polite" aria-label="Đang tải nội dung trang"><StorefrontContainer className="py-8 md:py-12"><Skeleton className="h-4 w-32" /><Skeleton className="mt-4 h-10 w-72 max-w-full" /><Skeleton className="mt-3 h-5 w-full max-w-2xl" /><div className="mt-10 grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(220px,1fr)]"><div className="space-y-4"><Skeleton className="h-48 w-full rounded-2xl" /><Skeleton className="h-7 w-3/4" /><Skeleton className="h-5 w-full" /><Skeleton className="h-5 w-5/6" /></div><div className="space-y-4"><Skeleton className="h-24 w-full rounded-xl" /><Skeleton className="h-24 w-full rounded-xl" /><Skeleton className="h-24 w-full rounded-xl" /></div></div></StorefrontContainer></div>
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return <div aria-busy="true" aria-live="polite" aria-label="Đang tải danh sách sản phẩm" className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-5 lg:grid-cols-3">{Array.from({ length: count }).map((_, index) => <div key={index} className="overflow-hidden rounded-xl border border-stone-200 bg-white"><Skeleton className="aspect-square w-full rounded-none" /><div className="space-y-3 p-4"><Skeleton className="h-3 w-20" /><Skeleton className="h-5 w-full" /><Skeleton className="h-5 w-28" /></div></div>)}</div>
}

export function FormSkeleton() {
  return <div aria-busy="true" aria-live="polite" aria-label="Đang tải biểu mẫu" className="space-y-5 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm md:p-8"><Skeleton className="h-7 w-48" />{Array.from({ length: 4 }).map((_, index) => <div key={index} className="space-y-2"><Skeleton className="h-4 w-32" /><Skeleton className="h-11 w-full" /></div>)}<Skeleton className="h-11 w-32" /></div>
}
