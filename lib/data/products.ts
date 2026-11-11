import raw from "@/data/products.json"
import type { Product, ProductCategory } from "@/lib/types"
import type { ProductCardData } from "@/components/storefront/product-card"

const data = raw as unknown as { categories: ProductCategory[]; products: Product[] }

export const getProducts = (): Product[] => data.products
export const getCategories = (): ProductCategory[] => data.categories
export const getProductBySlug = (slug: string): Product | null => data.products.find((p) => p.slug === slug) ?? null
export const getFeaturedProducts = (limit = 4): Product[] => data.products.filter((p) => p.featured).slice(0, limit)

export function getRelatedProducts(slug: string, limit = 4): Product[] {
  const current = getProductBySlug(slug)
  if (!current) return []
  return data.products
    .filter((p) => p.slug !== slug && p.category.slug === current.category.slug)
    .slice(0, limit)
}

/** Dữ liệu thẻ sản phẩm (trang chủ, các trang chiến dịch). */
export function toProductCardData(product: Product): ProductCardData {
  const maxVariantPrice = product.weight.reduce((max, v) => Math.max(max, v.price), product.price)
  return {
    name: product.name,
    slug: product.slug,
    image: product.images?.[0]?.url,
    price: product.price,
    originalPrice: product.originalPrice,
    categoryName: product.category?.name,
    inStock: product.inStock,
    stockQuantity: product.stockQuantity,
    featured: product.featured,
    priceFrom: maxVariantPrice > product.price,
  }
}

/** Sản phẩm cho trang chiến dịch: lọc theo `match`, thiếu thì lấy nổi bật. */
export function getLandingProductCards(match: (p: Product) => boolean, take = 8, fallbackTake = 6): ProductCardData[] {
  let rows = data.products.filter(match).slice(0, take)
  if (rows.length === 0) rows = data.products.filter((p) => p.featured).slice(0, fallbackTake)
  return rows.map(toProductCardData)
}
