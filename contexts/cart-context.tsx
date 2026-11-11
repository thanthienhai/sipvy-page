"use client"

import { createContext, useCallback, useContext, useEffect, useReducer, useRef, ReactNode } from "react"
import { Cart, CartItem } from "@/lib/types"
import { calcTotals, cartReducer, initialCartState } from "@/lib/cart-reducer"

/**
 * Giỏ hàng trên trình duyệt (localStorage). Không có máy chủ: đơn hàng được gửi đi
 * qua form (Google Apps Script), nên không đồng bộ tài khoản hay kiểm mã khuyến mãi.
 */
interface CartContextType {
  cart: Cart
  /** Giữ để tương thích với các component cũ; luôn false trên bản tĩnh. */
  isSyncing: boolean
  addToCart: (item: Omit<CartItem, "id">) => void
  removeFromCart: (itemId: string) => void
  restoreItem: (item: CartItem, index?: number) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)
const STORAGE_KEY = "sipvy-page-cart"

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState)
  const cart = state.cart
  const loaded = useRef(false)

  // Nạp giỏ hàng đã lưu khi mở trang.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const items: CartItem[] = JSON.parse(saved).items || []
        dispatch({ type: "LOAD_CART", payload: { items, ...calcTotals(items, 0) } })
      }
    } catch {
      // localStorage không dùng được (chế độ riêng tư...): giữ giỏ trong bộ nhớ.
    }
    loaded.current = true
  }, [])

  // Lưu mỗi khi giỏ đổi (sau khi đã nạp xong, tránh ghi đè giỏ cũ bằng giỏ rỗng).
  useEffect(() => {
    if (!loaded.current) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    } catch {
      // bỏ qua
    }
  }, [cart])

  const addToCart = useCallback((item: Omit<CartItem, "id">) => dispatch({ type: "ADD_ITEM", payload: item }), [])
  const removeFromCart = useCallback((id: string) => dispatch({ type: "REMOVE_ITEM", payload: id }), [])
  const restoreItem = useCallback(
    (item: CartItem, index?: number) => dispatch({ type: "RESTORE_ITEM", payload: { item, index } }),
    [],
  )
  const updateQuantity = useCallback(
    (id: string, quantity: number) => dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } }),
    [],
  )
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), [])

  return (
    <CartContext.Provider
      value={{ cart, isSyncing: false, addToCart, removeFromCart, restoreItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within a CartProvider")
  return ctx
}
