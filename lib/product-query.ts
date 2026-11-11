/**
 * Pure (no Prisma / no React) parsing + normalisation of the /san-pham list query.
 * Shared by the server page, the count API, client navigation, scroll restoration and unit tests so
 * that every caller agrees on what a "list URL" is.
 */

export const PAGE_SIZE = 12
export const LIST_PATH = "/san-pham"
export const MAX_PAGE = 100_000
export const MAX_SEARCH_LENGTH = 100

export const SORT_OPTIONS = [
  { value: "newest", label: "Mới nhất" },
  { value: "price-asc", label: "Giá: Thấp → Cao" },
  { value: "price-desc", label: "Giá: Cao → Thấp" },
  { value: "name-asc", label: "Tên: A → Z" },
] as const

export type ProductSort = (typeof SORT_OPTIONS)[number]["value"]
export const DEFAULT_SORT: ProductSort = "newest"

/**
 * Price ranges use half-open intervals `[min, max)` so a product priced exactly on a boundary
 * (for example 200.000₫) belongs to exactly one range. `max` is undefined for the open-ended range.
 */
export const PRICE_RANGES: ReadonlyArray<{ id: string; label: string; min: number; max?: number }> = [
  { id: "0-200000", label: "Dưới 200.000₫", min: 0, max: 200000 },
  { id: "200000-300000", label: "200.000₫ – 300.000₫", min: 200000, max: 300000 },
  { id: "300000-500000", label: "300.000₫ – 500.000₫", min: 300000, max: 500000 },
  { id: "500000-99999999", label: "Từ 500.000₫ trở lên", min: 500000 },
]

export interface ProductListQuery {
  search?: string
  category?: string
  sort: ProductSort
  price?: string
  page: number
}

export type RawQuery = Record<string, string | string[] | undefined | null> | URLSearchParams

const CATEGORY_SLUG = /^[a-z0-9][a-z0-9-]{0,79}$/i

function firstValue(raw: RawQuery, key: string): string | undefined {
  if (raw instanceof URLSearchParams) return raw.get(key) ?? undefined
  const value = raw[key]
  if (Array.isArray(value)) return value[0]
  return value ?? undefined
}

/**
 * Strict positive-integer parser: only plain digit strings are accepted ("abc", "-1", "1.5", "",
 * "1e3" and "0" all fall back). Results are clamped to `max`. Never returns NaN/Infinity.
 */
export function parsePositiveInt(value: string | null | undefined, fallback = 1, max = MAX_PAGE): number {
  if (typeof value !== "string") return fallback
  const trimmed = value.trim()
  if (!/^\d{1,9}$/.test(trimmed)) return fallback
  const parsed = Number(trimmed)
  if (!Number.isFinite(parsed) || !Number.isInteger(parsed) || parsed < 1) return fallback
  return Math.min(parsed, max)
}

export function getTotalPages(total: number, pageSize = PAGE_SIZE): number {
  if (!Number.isFinite(total) || total <= 0) return 1
  return Math.max(1, Math.ceil(total / pageSize))
}

/** Clamp a requested page into `[1, totalPages]`. */
export function clampPage(page: number, total: number, pageSize = PAGE_SIZE): number {
  const safePage = Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1
  return Math.min(safePage, getTotalPages(total, pageSize))
}

export function isProductSort(value: string | undefined): value is ProductSort {
  return SORT_OPTIONS.some((option) => option.value === value)
}

export function findPriceRange(id: string | undefined) {
  return id ? PRICE_RANGES.find((range) => range.id === id) : undefined
}

/** True when `price` falls into the half-open range `[min, max)`. */
export function priceInRange(price: number, range: { min: number; max?: number }): boolean {
  return price >= range.min && (range.max === undefined || price < range.max)
}

export function parseProductListQuery(raw: RawQuery): ProductListQuery {
  const search = firstValue(raw, "search")?.trim().slice(0, MAX_SEARCH_LENGTH) || undefined
  const categoryRaw = firstValue(raw, "category")?.trim()
  const sortRaw = firstValue(raw, "sort")
  const priceRaw = firstValue(raw, "price")

  return {
    search,
    category: categoryRaw && CATEGORY_SLUG.test(categoryRaw) ? categoryRaw : undefined,
    sort: isProductSort(sortRaw) ? sortRaw : DEFAULT_SORT,
    price: findPriceRange(priceRaw)?.id,
    page: parsePositiveInt(firstValue(raw, "page"), 1),
  }
}

/**
 * Canonical query string (without the leading "?"): keys sorted alphabetically, defaults
 * (sort=newest, page=1), empty and invalid values dropped.
 */
export function serializeListQuery(query: Partial<ProductListQuery>): string {
  const entries: Array<[string, string]> = []
  if (query.category) entries.push(["category", query.category])
  if (query.page && query.page > 1) entries.push(["page", String(Math.floor(query.page))])
  if (query.price) entries.push(["price", query.price])
  if (query.search) entries.push(["search", query.search])
  if (query.sort && query.sort !== DEFAULT_SORT) entries.push(["sort", query.sort])
  const params = new URLSearchParams()
  entries.forEach(([key, value]) => params.append(key, value))
  return params.toString()
}

/** Normalise any raw query (string with or without "?", URLSearchParams, record). */
export function normalizeListQuery(input: string | RawQuery): string {
  let raw: RawQuery
  if (typeof input === "string") {
    raw = new URLSearchParams(input.startsWith("?") ? input.slice(1) : input)
  } else {
    raw = input
  }
  return serializeListQuery(parseProductListQuery(raw))
}

export function buildListUrl(query: Partial<ProductListQuery>): string {
  const serialized = serializeListQuery(query)
  return serialized ? `${LIST_PATH}?${serialized}` : LIST_PATH
}

/** Normalise a `/san-pham?...` URL; anything that is not a catalog URL collapses to `/san-pham`. */
export function normalizeListUrl(url: string | null | undefined): string {
  if (!url) return LIST_PATH
  if (url !== LIST_PATH && !url.startsWith(`${LIST_PATH}?`)) return LIST_PATH
  const queryStart = url.indexOf("?")
  const query = queryStart === -1 ? "" : url.slice(queryStart + 1)
  const serialized = normalizeListQuery(query)
  return serialized ? `${LIST_PATH}?${serialized}` : LIST_PATH
}
