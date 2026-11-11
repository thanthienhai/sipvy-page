import { getProducts, getCategories } from "@/lib/data/products"
import { findPriceRange, priceInRange, type ProductListQuery } from "@/lib/product-query"

export interface ProductListItem {
  id: string
  slug: string
  name: string
  featured: boolean
  image: string | null
  categoryName: string | null
  /** Giá thấp nhất trong các biến thể. */
  price: number
  maxPrice: number
  originalPrice: number | null
  inStock: boolean
}

/** Bỏ dấu + hạ chữ thường để tìm "tra xanh" ra "Trà Xanh". */
const fold = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()

/** Lọc + sắp xếp danh sách sản phẩm hoàn toàn trên trình duyệt (không có máy chủ). */
export function listAllProducts(query: ProductListQuery): ProductListItem[] {
  const term = query.search ? fold(query.search) : ""
  const range = findPriceRange(query.price)

  const rows = getProducts()
    .map((p, index) => ({
      index,
      item: {
        id: p.id,
        slug: p.slug,
        name: p.name,
        featured: p.featured,
        image: p.images[0]?.url ?? null,
        categoryName: p.category.name,
        price: p.price,
        maxPrice: p.weight.reduce((max, v) => Math.max(max, v.price), p.price),
        originalPrice: p.originalPrice ?? null,
        inStock: p.inStock,
      } satisfies ProductListItem,
      haystack: fold(`${p.name} ${p.shortDescription} ${p.description}`),
      category: p.category.slug,
    }))
    .filter((row) => (!term || row.haystack.includes(term)) && (!query.category || row.category === query.category))
    .filter((row) => !range || priceInRange(row.item.price, range))

  const byName = (a: ProductListItem, b: ProductListItem) => a.name.localeCompare(b.name, "vi")
  rows.sort((a, b) => {
    switch (query.sort) {
      case "price-asc":
        return a.item.price - b.item.price || byName(a.item, b.item)
      case "price-desc":
        return b.item.price - a.item.price || byName(a.item, b.item)
      case "name-asc":
        return byName(a.item, b.item)
      default:
        // "Mới nhất": dữ liệu không có ngày tạo riêng, giữ thứ tự trong danh mục.
        return a.index - b.index
    }
  })
  return rows.map((row) => row.item)
}

/** Số sản phẩm mỗi danh mục (toàn cửa hàng, không phụ thuộc bộ lọc). */
export function categoryCounts() {
  const products = getProducts()
  return getCategories().map((c) => ({
    ...c,
    count: products.filter((p) => p.category.slug === c.slug).length,
  }))
}
