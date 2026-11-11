"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronRight, ChevronLeft, Search, X, Package } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { categoryCounts, listAllProducts, type ProductListItem } from "@/lib/data/product-list"
import {
  PAGE_SIZE,
  PRICE_RANGES,
  SORT_OPTIONS,
  buildListUrl,
  clampPage,
  getTotalPages,
  parseProductListQuery,
  type ProductListQuery,
} from "@/lib/product-query"
import PageHeader from "@/components/storefront/page-header"
import StorefrontContainer from "@/components/storefront/storefront-container"
import { StatePanel } from "@/components/storefront/loading-states"
import ProductListControls from "@/components/storefront/product-list-controls"
import ProductCard from "@/components/storefront/product-card"
import { ProductListRestoration } from "@/components/product/product-list-navigation"

type PaginationItem = number | "ellipsis"

function getPaginationItems(current: number, total: number): PaginationItem[] {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1)

  const pages = new Set([1, total, current, current - 1, current + 1])
  const sorted = Array.from(pages)
    .filter((page) => page >= 1 && page <= total)
    .sort((a, b) => a - b)
  const items: PaginationItem[] = []

  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1] > 1) items.push("ellipsis")
    items.push(page)
  })
  return items
}

export default function ProductCatalog() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = parseProductListQuery(searchParams)
  const { search, category, sort, price: priceRange } = query
  const [searchDraft, setSearchDraft] = useState(search ?? "")

  const categories = categoryCounts()
  const all = listAllProducts(query)
  const total = all.length

  const totalPages = getTotalPages(total, PAGE_SIZE)
  const page = clampPage(query.page, total, PAGE_SIZE)
  const pageItems = all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const hasFilters = !!(search || category || priceRange)
  const activeFilterCount = [search, category, priceRange].filter(Boolean).length
  const categoryName = category ? categories.find((c) => c.slug === category)?.name : undefined
  const pageTitle = search ? `Kết quả cho "${search}"` : categoryName || "Sản phẩm trà SIPVY"
  const firstResult = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
  const lastResult = Math.min(page * PAGE_SIZE, total)
  // Category counts are GLOBAL (whole catalogue), independent of the active search/price filters.
  const catalogTotal = categories.reduce((sum, item) => sum + item.count, 0)
  const mobileCategories = categories.map((item) => ({
    id: item.slug,
    label: item.name,
    count: item.count,
  }))
  const mobilePriceRanges = PRICE_RANGES.map((item) => ({ id: item.id, label: item.label }))
  const listUrl = buildListUrl({ ...query, page })
  const href = (changes: Partial<ProductListQuery>) => buildListUrl({ ...query, ...changes, page: 1 })

  return (
    <>
      <ProductListRestoration />
      <PageHeader
        breadcrumbs={[
          { href: "/", label: "Trang chủ" },
          { href: "/san-pham", label: "Sản phẩm" },
          ...(categoryName ? [{ label: categoryName }] : []),
        ]}
        title={pageTitle}
        description={`${total} sản phẩm — trà thượng hạng từ vùng đặc sản, giao hàng toàn quốc`}
      />

      {/* ============ MAIN ============ */}
      <StorefrontContainer className="py-8">
        <div className="grid lg:grid-cols-[260px_1fr] gap-6 lg:gap-8">
          {/* ============ SIDEBAR FILTERS ============ */}
          <aside className="hidden space-y-6 lg:sticky lg:top-[calc(var(--storefront-compact-header-height)+1rem)] lg:block lg:h-fit">
            {/* Search */}
            <form
              role="search"
              aria-label="Tìm sản phẩm"
              className="relative"
              onSubmit={(e) => {
                e.preventDefault()
                router.push(buildListUrl({ ...query, search: searchDraft.trim() || undefined, page: 1 }))
              }}
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden="true" />
              <input
                type="search"
                name="search"
                value={searchDraft}
                onChange={(e) => setSearchDraft(e.target.value)}
                placeholder="Tìm sản phẩm..."
                aria-label="Tìm sản phẩm"
                className="w-full h-10 pl-9 pr-3 rounded-lg border border-stone-300 bg-white text-sm focus:border-green-700 focus:ring-2 focus:ring-stone-200 outline-none"
              />
            </form>

            {/* Active filters */}
            {hasFilters && (
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                    Bộ lọc đang dùng
                  </span>
                  <Link href="/san-pham" className="text-xs text-red-700 hover:underline">
                    Xoá tất cả
                  </Link>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {search && (
                    <Link href={href({ search: undefined })} aria-label={`Bỏ bộ lọc từ khóa ${search}`}>
                      <Badge variant="secondary" className="text-xs gap-1">
                        &quot;{search}&quot; <X className="h-3 w-3" aria-hidden="true" />
                      </Badge>
                    </Link>
                  )}
                  {category && (
                    <Link href={href({ category: undefined })} aria-label={`Bỏ bộ lọc danh mục ${categoryName ?? category}`}>
                      <Badge variant="secondary" className="text-xs gap-1">
                        {categoryName ?? category} <X className="h-3 w-3" aria-hidden="true" />
                      </Badge>
                    </Link>
                  )}
                  {priceRange && (
                    <Link href={href({ price: undefined })} aria-label="Bỏ bộ lọc khoảng giá">
                      <Badge variant="secondary" className="text-xs gap-1">
                        {PRICE_RANGES.find((r) => r.id === priceRange)?.label} <X className="h-3 w-3" aria-hidden="true" />
                      </Badge>
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Categories */}
            <div>
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Danh mục</h3>
              <p className="mb-3 mt-0.5 text-[11px] text-stone-500">Số lượng tính trên toàn bộ cửa hàng</p>
              <ul className="space-y-1">
                <li>
                  <Link
                    href={href({ category: undefined })}
                    aria-current={!category ? "true" : undefined}
                    className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                      !category ? "bg-green-100 text-stone-900 font-medium" : "text-gray-700 hover:bg-green-50"
                    }`}
                  >
                    Tất cả <span className="text-xs text-stone-500">{catalogTotal}</span>
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={href({ category: c.slug })}
                      aria-current={category === c.slug ? "true" : undefined}
                      className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                        category === c.slug
                          ? "bg-green-100 text-stone-900 font-medium"
                          : "text-gray-700 hover:bg-green-50"
                      }`}
                    >
                      {c.name} <span className="text-xs text-stone-500">{c.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price filter */}
            <div>
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">Khoảng giá</h3>
              <ul className="space-y-1">
                {PRICE_RANGES.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={href({ price: priceRange === r.id ? undefined : r.id })}
                      aria-current={priceRange === r.id ? "true" : undefined}
                      className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                        priceRange === r.id
                          ? "bg-green-100 text-stone-900 font-medium"
                          : "text-gray-700 hover:bg-green-50"
                      }`}
                    >
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* ============ PRODUCT GRID ============ */}
          <div className="min-w-0">
            <ProductListControls
              search={search}
              category={category}
              price={priceRange}
              sort={sort}
              sortOptions={SORT_OPTIONS}
              categories={mobileCategories}
              priceRanges={mobilePriceRanges}
              total={total}
              firstResult={firstResult}
              lastResult={lastResult}
              activeFilterCount={activeFilterCount}
            >
              <ProductResults products={pageItems} query={{ ...query, page }} totalPages={totalPages} />
            </ProductListControls>
          </div>
        </div>
      </StorefrontContainer>
    </>
  )
}

function ProductResults({
  products,
  query,
  totalPages,
}: {
  products: ProductListItem[]
  query: ProductListQuery
  totalPages: number
}) {
  const page = query.page
  const pageHref = (target: number) => buildListUrl({ ...query, page: target })

  if (products.length === 0) {
    return (
      <StatePanel
        title="Không tìm thấy sản phẩm phù hợp"
        description="Bộ lọc hoặc từ khóa hiện tại chưa có kết quả. Hãy đặt lại bộ lọc để xem toàn bộ danh mục trà."
        icon={<Package className="h-6 w-6" aria-hidden="true" />}
        action={
          <Button asChild variant="outline" className="border-stone-300 text-stone-800">
            <Link href="/san-pham">Xem tất cả sản phẩm</Link>
          </Button>
        }
      />
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            trackListNavigation
            sizes="(max-width: 479px) 100vw, (max-width: 1023px) 50vw, 33vw"
            item={{
              name: p.name,
              slug: p.slug,
              image: p.image,
              price: p.price,
              originalPrice: p.originalPrice,
              categoryName: p.categoryName,
              inStock: p.inStock,
              featured: p.featured,
              priceFrom: p.maxPrice > p.price,
            }}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-10 flex flex-wrap items-center justify-center gap-1.5" aria-label="Phân trang">
          {page > 1 && (
            <Button asChild variant="outline" size="icon" className="border-green-200">
              <Link href={pageHref(page - 1)} aria-label="Trang trước" rel="prev">
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          )}
          {getPaginationItems(page, totalPages).map((item, index) =>
            item === "ellipsis" ? (
              <span key={`ellipsis-${index}`} className="px-1 text-stone-500" aria-hidden="true">
                …
              </span>
            ) : (
              <Button
                asChild
                key={item}
                variant={item === page ? "default" : "outline"}
                size="icon"
                className={
                  item === page ? "bg-green-700 text-white hover:bg-green-800" : "border-stone-300 text-stone-800"
                }
              >
                <Link
                  href={pageHref(item)}
                  aria-current={item === page ? "page" : undefined}
                  aria-label={`Trang ${item}`}
                >
                  {item}
                </Link>
              </Button>
            ),
          )}
          {page < totalPages && (
            <Button asChild variant="outline" size="icon" className="border-green-200">
              <Link href={pageHref(page + 1)} aria-label="Trang sau" rel="next">
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          )}
        </nav>
      )}
    </>
  )
}
