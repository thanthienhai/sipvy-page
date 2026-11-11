"use client"

import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import { Filter, LoaderCircle, RotateCcw, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { serializeListQuery } from "@/lib/product-query"
import { listAllProducts } from "@/lib/data/product-list"

const COUNT_DEBOUNCE_MS = 250

type CountState = { key: string; status: "loading" | "ready" | "error"; count?: number }

export type MobileFilterOption = {
  id: string
  label: string
  count?: number
}

type FilterValues = {
  search?: string
  category?: string
  price?: string
}

interface MobileFilterProps {
  categories: MobileFilterOption[]
  priceRanges: MobileFilterOption[]
  values: FilterValues
  activeFilterCount: number
  resultCount: number
  onApply: (values: FilterValues) => void
}

/** Mobile filters keep a local draft until the user confirms. */
export default function MobileFilter({
  categories,
  priceRanges,
  values,
  activeFilterCount,
  resultCount,
  onApply,
}: MobileFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [draft, setDraft] = useState<FilterValues>(values)

  const updateDraft = (next: Partial<FilterValues>) => setDraft((current) => ({ ...current, ...next }))
  const resetCategory = () => updateDraft({ category: undefined })
  const resetPrice = () => updateDraft({ price: undefined })
  const resetAll = () => setDraft({})

  // Accurate "Xem N sản phẩm": count the DRAFT filters (not the applied ones) via a lightweight API.
  const draftKey = serializeListQuery({
    search: draft.search?.trim() || undefined,
    category: draft.category,
    price: draft.price,
  })
  const sameAsApplied = draftKey === serializeListQuery(values)
  // Trang tĩnh: đếm ngay trên trình duyệt, không cần gọi API.
  const draftCount = listAllProducts({
    search: draft.search?.trim() || undefined,
    category: draft.category,
    price: draft.price,
    sort: "newest",
    page: 1,
  }).length
  const countState: CountState = sameAsApplied
    ? { key: draftKey, status: "ready", count: resultCount }
    : { key: draftKey, status: "ready", count: draftCount }
  const apply = () => {
    onApply({
      search: draft.search?.trim() || undefined,
      category: draft.category,
      price: draft.price,
    })
    setIsOpen(false)
  }

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(nextOpen) => {
        if (nextOpen) setDraft(values)
        setIsOpen(nextOpen)
      }}
    >
      <SheetTrigger asChild>
        <Button variant="outline" className="h-10 gap-2 border-stone-300 bg-white px-3 text-stone-800">
          <Filter className="h-4 w-4" aria-hidden="true" />
          <span>Bộ lọc</span>
          {activeFilterCount > 0 && (
            <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-green-700 px-1.5 text-xs font-semibold text-white">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent
        side="bottom"
        className="max-h-[88vh] rounded-t-2xl border-stone-200 bg-white p-0"
        aria-describedby="mobile-filter-description"
      >
        <div className="flex max-h-[88vh] flex-col">
          <SheetHeader className="border-b border-stone-200 px-5 pb-4 pt-5 text-left">
            <SheetTitle className="text-lg text-stone-950">Bộ lọc sản phẩm</SheetTitle>
            <SheetDescription id="mobile-filter-description" className="text-sm text-stone-600">
              Chọn bộ lọc rồi xem kết quả khi bạn sẵn sàng.
            </SheetDescription>
          </SheetHeader>

          <div className="overflow-y-auto px-5 py-5">
            <div className="space-y-2">
              <label htmlFor="mobile-product-search" className="text-sm font-semibold text-stone-900">
                Tìm kiếm
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                <Input
                  id="mobile-product-search"
                  value={draft.search || ""}
                  onChange={(event) => updateDraft({ search: event.target.value })}
                  placeholder="Tên trà, vùng trồng..."
                  className="h-10 pl-9"
                />
              </div>
            </div>

            <Separator className="my-5" />

            <FilterGroup id="category" title="Danh mục" onReset={resetCategory} resetLabel="Đặt lại danh mục">
              <FilterChoices
                options={categories}
                value={draft.category}
                onChange={(category) => updateDraft({ category })}
                label="Danh mục sản phẩm"
              />
            </FilterGroup>

            <Separator className="my-5" />

            <FilterGroup id="price" title="Khoảng giá" onReset={resetPrice} resetLabel="Đặt lại khoảng giá">
              <FilterChoices
                options={priceRanges}
                value={draft.price}
                onChange={(price) => updateDraft({ price })}
                label="Khoảng giá"
              />
            </FilterGroup>
          </div>

          <div className="flex items-center gap-3 border-t border-stone-200 bg-white px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <Button type="button" variant="ghost" className="gap-2 text-stone-700" onClick={resetAll}>
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Đặt lại
            </Button>
            <Button
              type="button"
              className="flex-1 bg-green-700 text-white hover:bg-green-800"
              onClick={apply}
              disabled={countState.status === "loading"}
              aria-busy={countState.status === "loading"}
            >
              <span aria-live="polite" className="inline-flex items-center gap-2">
                {countState.status === "loading" ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Đang đếm…
                  </>
                ) : countState.status === "ready" ? (
                  `Xem ${(countState.count ?? 0).toLocaleString("vi-VN")} sản phẩm`
                ) : (
                  "Áp dụng"
                )}
              </span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function FilterGroup({
  id,
  title,
  resetLabel,
  onReset,
  children,
}: {
  id: string
  title: string
  resetLabel: string
  onReset: () => void
  children: React.ReactNode
}) {
  return (
    <section aria-labelledby={`mobile-filter-${id}`}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 id={`mobile-filter-${id}`} className="text-sm font-semibold text-stone-950">
          {title}
        </h3>
        <button type="button" onClick={onReset} className="min-h-11 rounded-md px-2 text-xs text-green-800 underline-offset-2 hover:underline">
          {resetLabel}
        </button>
      </div>
      {children}
    </section>
  )
}

function FilterChoices({
  options,
  value,
  onChange,
  label,
}: {
  options: MobileFilterOption[]
  value?: string
  onChange: (value?: string) => void
  label: string
}) {
  const refs = useRef<Array<HTMLButtonElement | null>>([])
  const selectedIndex = options.findIndex((option) => option.id === value)
  // Roving tabindex: the selected option (or the first one) is the single tab stop of the group.
  const tabStop = selectedIndex === -1 ? 0 : selectedIndex

  const moveTo = (index: number) => {
    const next = (index + options.length) % options.length
    refs.current[next]?.focus()
    onChange(options[next].id)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault()
        moveTo(index + 1)
        break
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault()
        moveTo(index - 1)
        break
      case "Home":
        event.preventDefault()
        moveTo(0)
        break
      case "End":
        event.preventDefault()
        moveTo(options.length - 1)
        break
    }
  }

  return (
    <div className="grid gap-2" role="radiogroup" aria-label={label}>
      {options.map((option, index) => {
        const selected = value === option.id
        return (
          <button
            key={option.id}
            ref={(node) => {
              refs.current[index] = node
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={index === tabStop ? 0 : -1}
            onClick={() => onChange(selected ? undefined : option.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={cn(
              "flex min-h-11 items-center justify-between rounded-lg border px-3 text-left text-sm transition-colors",
              selected
                ? "border-green-700 bg-green-50 text-green-900"
                : "border-stone-200 bg-white text-stone-700 hover:border-green-300 hover:bg-stone-50",
            )}
          >
            <span>{option.label}</span>
            <span className={cn("text-xs", selected ? "text-green-800" : "text-stone-500")}>
              {option.count !== undefined ? option.count.toLocaleString("vi-VN") : ""}
            </span>
          </button>
        )
      })}
    </div>
  )
}
