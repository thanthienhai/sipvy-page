/**
 * Product-level price / stock / availability derived from variants (ProductWeight).
 *
 * The legacy `products.price`, `products.stockQuantity` and `products.inStock` columns can be stale
 * (they are only a denormalised cache). Storefront readers must call these helpers instead of
 * trusting the columns directly. Writers should also persist `computeProductAggregates()` back to
 * the product row so list filters/sorts that still use the columns stay consistent.
 */

export interface AggregateVariantInput {
  price: number
  originalPrice?: number | null
  stockQuantity?: number | null
  inStock?: boolean | null
  status?: string | null
}

export interface ProductAggregateFallback {
  price: number
  originalPrice?: number | null
  stockQuantity?: number | null
  inStock?: boolean | null
}

export interface ProductAggregates {
  /** Lowest price among sellable variants (falls back to ACTIVE, then any, then product column). */
  price: number
  maxPrice: number
  /** Compare-at price of the variant that defines `price`; undefined unless it is above `price`. */
  originalPrice: number | undefined
  /** Sum of stock across ACTIVE variants. */
  stockQuantity: number
  inStock: boolean
  variantCount: number
}

export function isActiveVariant(variant: AggregateVariantInput): boolean {
  return (variant.status ?? (variant.inStock === false ? "INACTIVE" : "ACTIVE")) === "ACTIVE"
}

export function isSellableVariant(variant: AggregateVariantInput): boolean {
  return isActiveVariant(variant) && Math.max(0, variant.stockQuantity ?? 0) > 0
}

export function computeProductAggregates(
  variants: AggregateVariantInput[] | null | undefined,
  fallback: ProductAggregateFallback,
): ProductAggregates {
  const list = variants ?? []
  if (list.length === 0) {
    // Invariant says this should not happen; degrade to the product columns instead of crashing.
    return {
      price: fallback.price,
      maxPrice: fallback.price,
      originalPrice:
        fallback.originalPrice && fallback.originalPrice > fallback.price ? fallback.originalPrice : undefined,
      stockQuantity: Math.max(0, fallback.stockQuantity ?? 0),
      inStock: Boolean(fallback.inStock),
      variantCount: 0,
    }
  }

  const sellable = list.filter(isSellableVariant)
  const active = list.filter(isActiveVariant)
  const pool = sellable.length > 0 ? sellable : active.length > 0 ? active : list
  const cheapest = pool.reduce((best, variant) => (variant.price < best.price ? variant : best), pool[0])
  const maxPrice = pool.reduce((max, variant) => Math.max(max, variant.price), pool[0].price)

  return {
    price: cheapest.price,
    maxPrice,
    originalPrice:
      cheapest.originalPrice && cheapest.originalPrice > cheapest.price ? cheapest.originalPrice : undefined,
    stockQuantity: active.reduce((sum, variant) => sum + Math.max(0, variant.stockQuantity ?? 0), 0),
    inStock: sellable.length > 0,
    variantCount: list.length,
  }
}

/**
 * Overlay derived aggregates onto a Prisma product row that was loaded with `weights`.
 * Works for the raw JSON shapes returned by public API routes as well.
 */
export function withProductAggregates<
  T extends { price: number; originalPrice?: number | null; stockQuantity?: number | null; inStock?: boolean | null; weights?: AggregateVariantInput[] | null },
>(product: T): T & { price: number; originalPrice: number | null; stockQuantity: number; inStock: boolean } {
  const aggregates = computeProductAggregates(product.weights, product)
  return {
    ...product,
    price: aggregates.price,
    originalPrice: aggregates.originalPrice ?? null,
    stockQuantity: aggregates.stockQuantity,
    inStock: aggregates.inStock,
  }
}
