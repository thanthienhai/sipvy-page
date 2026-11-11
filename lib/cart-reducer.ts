import type { Cart, CartItem } from "@/lib/types"
import { calculateShippingFee } from "@/lib/shipping"

/**
 * Pure cart state logic (no React, no network) so it can be unit-tested with tsx.
 *
 * The reducer state wraps the Cart with a `version` counter. Every USER mutation bumps the
 * version; state coming from the server (APPLY_SERVER_CART / LOAD_CART) and derived promo
 * discounts do not. A server response is only applied when the version it was requested at
 * is still current, so a slow response can never overwrite a newer local edit (e.g. bring
 * back a line the shopper just deleted).
 */

export const TAX_RATE = 0
/** Used when a line has no (positive) stock figure. */
export const DEFAULT_MAX_QUANTITY = 99

export interface CartState {
  cart: Cart
  version: number
  /**
   * Line ids in their original order, including lines that were removed and can still be undone.
   * It lets "undo" put a line back in the right place whatever order several undos are clicked in.
   */
  order?: string[]
}

export type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "id"> }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "RESTORE_ITEM"; payload: { item: CartItem; index?: number } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "APPLY_PROMO"; payload: { code: string; discount: number } }
  | { type: "REMOVE_PROMO" }
  | { type: "LOAD_CART"; payload: Cart }
  | { type: "REVALIDATE_PROMO"; payload: number }
  | { type: "APPLY_SERVER_CART"; payload: { items: CartItem[]; baseVersion: number } }

export const emptyCart: Cart = { items: [], subtotal: 0, shipping: 0, tax: 0, total: 0 }
export const initialCartState: CartState = { cart: emptyCart, version: 0 }

export function calcTotals(items: CartItem[], discount = 0) {
  const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0)
  const discounted = Math.max(0, subtotal - discount)
  // Same shared rule the order API uses (free shipping is judged AFTER discounts).
  const shipping = items.length === 0 ? 0 : calculateShippingFee(discounted)
  const tax = discounted * TAX_RATE
  const total = Math.max(0, discounted + shipping + tax)
  return { subtotal, shipping, tax, total }
}

export function getCartLineKey(
  item: Pick<CartItem, "productId" | "variantId" | "productWeightId" | "weight" | "comboId">,
) {
  return item.comboId ? `combo:${item.comboId}` : `${item.productId}:${item.variantId || item.productWeightId || item.weight}`
}

/** Highest quantity a line may have: live stock when known, otherwise a sane default. */
export function maxQuantityFor(item: Pick<CartItem, "stockQuantity">): number {
  return item.stockQuantity && item.stockQuantity > 0 ? item.stockQuantity : DEFAULT_MAX_QUANTITY
}

/** Clamp to [1, max]; non-finite input becomes 1. */
export function clampQuantity(quantity: number, max: number): number {
  if (!Number.isFinite(quantity)) return 1
  return Math.min(Math.max(1, Math.floor(quantity)), Math.max(1, max))
}

let lineSeq = 0
/** Unique even for two lines created in the same millisecond (ids double as React keys and undo identity). */
function nextLineId(key: string) {
  lineSeq = (lineSeq + 1) % Number.MAX_SAFE_INTEGER
  return `${key}-${Date.now()}-${lineSeq}`
}

function withItems(cart: Cart, items: CartItem[]): Cart {
  // Keep the existing promo + discount; the provider revalidates it after item changes.
  return { ...cart, items, ...calcTotals(items, cart.discount || 0) }
}

function mutate(state: CartState, cart: Cart): CartState {
  return { ...state, cart, version: state.version + 1 }
}

/** Keep `order` consistent with the live lines: unseen ids are slotted in after their predecessor. */
function mergeOrder(order: string[] | undefined, liveIds: string[]): string[] {
  const result = [...(order ?? [])]
  let prev = -1
  for (const id of liveIds) {
    const at = result.indexOf(id)
    if (at >= 0) {
      prev = at
    } else {
      prev += 1
      result.splice(prev, 0, id)
    }
  }
  return result
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  const { cart } = state
  switch (action.type) {
    case "ADD_ITEM": {
      const key = getCartLineKey(action.payload)
      const idx = cart.items.findIndex((it) => getCartLineKey(it) === key)
      const newItems =
        idx >= 0
          ? cart.items.map((it, i) =>
              i === idx
                ? {
                    ...it,
                    quantity: clampQuantity(
                      it.quantity + action.payload.quantity,
                      maxQuantityFor({ stockQuantity: it.stockQuantity ?? action.payload.stockQuantity }),
                    ),
                  }
                : it,
            )
          : [
              ...cart.items,
              {
                ...action.payload,
                quantity: clampQuantity(action.payload.quantity, maxQuantityFor(action.payload)),
                id: nextLineId(key),
              } as CartItem,
            ]
      return mutate(state, withItems(cart, newItems))
    }

    case "REMOVE_ITEM": {
      if (!cart.items.some((it) => it.id === action.payload)) return state
      const order = mergeOrder(state.order, cart.items.map((it) => it.id))
      return mutate({ ...state, order }, withItems(cart, cart.items.filter((it) => it.id !== action.payload)))
    }

    case "RESTORE_ITEM": {
      const { item, index } = action.payload
      // Idempotent: a second "undo" of the very same line does nothing.
      if (cart.items.some((it) => it.id === item.id)) return state
      const key = getCartLineKey(item)
      const existingIdx = cart.items.findIndex((it) => getCartLineKey(it) === key)
      if (existingIdx >= 0) {
        // The shopper re-added the same SKU meanwhile: merge into that line, don't duplicate.
        const newItems = cart.items.map((it, i) =>
          i === existingIdx
            ? {
                ...it,
                quantity: clampQuantity(
                  it.quantity + item.quantity,
                  maxQuantityFor({ stockQuantity: it.stockQuantity ?? item.stockQuantity }),
                ),
              }
            : it,
        )
        return mutate(state, withItems(cart, newItems))
      }
      let at = typeof index === "number" ? Math.min(Math.max(0, index), cart.items.length) : cart.items.length
      const order = state.order ?? []
      const own = order.indexOf(item.id)
      if (own >= 0) {
        // Put it back before the first line that originally came after it (works for any undo order).
        const live = new Set(cart.items.map((it) => it.id))
        const nextLiveId = order.slice(own + 1).find((id) => live.has(id))
        at = nextLiveId ? cart.items.findIndex((it) => it.id === nextLiveId) : cart.items.length
      }
      const newItems = [...cart.items.slice(0, at), item, ...cart.items.slice(at)]
      return mutate(state, withItems(cart, newItems))
    }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return cartReducer(state, { type: "REMOVE_ITEM", payload: action.payload.id })
      }
      if (!cart.items.some((it) => it.id === action.payload.id)) return state
      const newItems = cart.items.map((it) =>
        it.id === action.payload.id ? { ...it, quantity: clampQuantity(action.payload.quantity, maxQuantityFor(it)) } : it,
      )
      return mutate(state, withItems(cart, newItems))
    }

    case "APPLY_PROMO":
      return mutate(state, {
        ...cart,
        promoCode: action.payload.code,
        discount: action.payload.discount,
        ...calcTotals(cart.items, action.payload.discount),
      })

    case "REMOVE_PROMO":
      return mutate(state, {
        ...cart,
        promoCode: undefined,
        discount: undefined,
        ...calcTotals(cart.items, 0),
      })

    case "REVALIDATE_PROMO":
      // Derived from the items; not a shopper edit, so it must not bump the version.
      return { ...state, cart: { ...cart, discount: action.payload, ...calcTotals(cart.items, action.payload) } }

    case "CLEAR_CART":
      return mutate({ ...state, order: undefined }, { ...emptyCart })

    case "LOAD_CART":
      return { ...state, cart: action.payload, order: undefined }

    case "APPLY_SERVER_CART": {
      // A newer local mutation exists: this response is stale and must be dropped.
      if (action.payload.baseVersion !== state.version) return state
      return { ...state, cart: withItems(cart, action.payload.items) }
    }

    default:
      return state
  }
}

/** Merge two carts. Server is source of truth; add any local items not in server. */
export function mergeCarts(local: CartItem[], server: CartItem[]): CartItem[] {
  const merged = [...server]
  for (const localItem of local) {
    const exists = merged.some((it) => getCartLineKey(it) === getCartLineKey(localItem))
    if (!exists) merged.push(localItem)
  }
  return merged
}

export interface CartAdjustment {
  id: string
  name?: string
  /** "removed": line dropped (unavailable/unknown); "reduced": quantity clamped to available stock. */
  kind: "removed" | "reduced"
  requested: number
  applied: number
}

/** One human-readable sentence per adjusted line, naming the product the shopper knows. */
export function describeAdjustments(sent: Pick<CartItem, "id" | "name">[], adjustments: CartAdjustment[]): string[] {
  const names = new Map(sent.map((item) => [item.id, item.name]))
  return adjustments.map((adj) => {
    const name = adj.name || names.get(adj.id) || "Sản phẩm"
    return adj.kind === "removed"
      ? `${name}: đã hết hàng, đã bỏ khỏi giỏ`
      : `${name}: chỉ còn ${adj.applied}, đã giảm từ ${adj.requested}`
  })
}
