/**
 * Single source of truth for shipping fees. Used by the order API (authoritative),
 * the cart/checkout display and the shipping policy copy so they can never disagree.
 *
 * Policy: flat 30.000₫ nationwide; free when the order value AFTER discounts
 * reaches 500.000₫ (matches /chinh-sach-van-chuyen).
 */
export const SHIPPING_FLAT_FEE = 30_000
export const FREE_SHIPPING_THRESHOLD = 500_000
export const SHIPPING_METHODS = ["standard"] as const
export type ShippingMethod = (typeof SHIPPING_METHODS)[number]

export function calculateShippingFee(
  amountAfterDiscount: number,
  options: { method?: ShippingMethod; hasItems?: boolean } = {},
): number {
  if (options.hasItems === false) return 0
  if (amountAfterDiscount >= FREE_SHIPPING_THRESHOLD) return 0
  return SHIPPING_FLAT_FEE
}

export function remainingForFreeShipping(amountAfterDiscount: number): number {
  return Math.max(0, FREE_SHIPPING_THRESHOLD - amountAfterDiscount)
}
