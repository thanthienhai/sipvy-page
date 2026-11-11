"use client"

import { useOptimistic, useTransition, type ReactNode } from "react"
import { ArrowDownUp, LoaderCircle } from "lucide-react"
import { useRouter } from "next/navigation"

import MobileFilter, { type MobileFilterOption } from "@/components/mobile-filter"
import { buildListUrl, parseProductListQuery, type ProductSort } from "@/lib/product-query"
import { cn } from "@/lib/utils"

type SortOption = { value: string; label: string }

interface ProductListControlsProps {
  search?: string
  category?: string
  price?: string
  sort: string
  sortOptions: ReadonlyArray<SortOption>
  categories: MobileFilterOption[]
  priceRanges: MobileFilterOption[]
  total: number
  firstResult: number
  lastResult: number
  activeFilterCount: number
  /** Server-rendered results (grid + pagination); dimmed and aria-busy while a navigation is pending. */
  children?: ReactNode
}

export default function ProductListControls({
  search,
  category,
  price,
  sort,
  sortOptions,
  categories,
  priceRanges,
  total,
  firstResult,
  lastResult,
  activeFilterCount,
  children,
}: ProductListControlsProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  // Keeps the <select> on the chosen value while the new page is loading instead of snapping back.
  const [optimisticSort, setOptimisticSort] = useOptimistic(sort)

  const updateQuery = (changes: { search?: string; category?: string; price?: string; sort?: string }) => {
    const current = parseProductListQuery(new URLSearchParams(window.location.search))
    const next = { ...current, ...changes } as typeof current
    // A changed filter/sort must always start at the first result page.
    const href = buildListUrl({ ...next, sort: (next.sort || "newest") as ProductSort, page: 1 })
    startTransition(() => {
      if (changes.sort) setOptimisticSort(changes.sort)
      router.push(href)
    })
  }

  const spinner = isPending && (
    <span role="status" className="inline-flex items-center gap-1.5 text-xs text-stone-600">
      <LoaderCircle className="h-4 w-4 animate-spin text-green-700" aria-hidden="true" />
      <span className="sr-only lg:not-sr-only">Đang tải…</span>
    </span>
  )

  return (
    <>
      <div className="mb-5 border-b border-stone-200 pb-4">
        <div className="sticky top-[var(--storefront-compact-header-height)] z-20 -mx-4 flex items-center justify-between gap-3 bg-white/95 px-4 py-3 shadow-sm backdrop-blur lg:hidden">
          <MobileFilter
            categories={categories}
            priceRanges={priceRanges}
            values={{ search, category, price }}
            activeFilterCount={activeFilterCount}
            resultCount={total}
            onApply={(values) => updateQuery(values)}
          />
          <div className="flex min-w-0 flex-1 items-center justify-end gap-2 text-sm text-stone-600">
            {spinner}
            <label className="flex min-w-0 items-center gap-2">
              <ArrowDownUp className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="sr-only">Sắp xếp sản phẩm</span>
              <select
                value={optimisticSort}
                onChange={(event) => updateQuery({ sort: event.target.value })}
                className="h-11 min-w-0 rounded-md border border-stone-300 bg-white px-2 text-sm text-stone-900 outline-none focus:border-green-700 focus:ring-2 focus:ring-stone-200"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="hidden items-center justify-between gap-3 lg:flex">
          <p className="text-sm text-stone-600">
            Hiển thị <strong className="text-stone-900">{firstResult}–{lastResult}</strong> trong tổng{" "}
            <strong className="text-stone-900">{total}</strong> sản phẩm
          </p>
          <div className="flex items-center gap-3 text-sm text-stone-600">
            {spinner}
            <label className="flex items-center gap-2">
              <span>Sắp xếp:</span>
              <select
                value={optimisticSort}
                onChange={(event) => updateQuery({ sort: event.target.value })}
                className="h-10 rounded-md border border-stone-300 bg-white px-3 text-sm text-stone-900 outline-none focus:border-green-700 focus:ring-2 focus:ring-stone-200"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      <div
        aria-busy={isPending}
        className={cn("transition-opacity duration-200", isPending && "pointer-events-none opacity-50")}
      >
        {children}
      </div>
    </>
  )
}
