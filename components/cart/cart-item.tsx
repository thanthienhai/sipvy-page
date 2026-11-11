"use client"

import { useRef, useState } from 'react'
import { formatVnd } from "@/lib/format"
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCart } from '@/contexts/cart-context'
import { CartItem as CartItemType } from '@/lib/types'
import { clampQuantity, maxQuantityFor } from '@/lib/cart-reducer'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'

interface CartItemProps {
  item: CartItemType
}

export const CART_ITEMS_HEADING_ID = 'cart-items-heading'
export const CART_EMPTY_HEADING_ID = 'cart-empty-heading'

/** After a line disappears keyboard/screen-reader focus must land somewhere useful, not on <body>. */
function focusAfterRemoval(sibling: HTMLElement | null) {
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      const target =
        (sibling?.isConnected ? sibling.querySelector<HTMLElement>('[data-cart-focus]') : null) ||
        document.getElementById(CART_ITEMS_HEADING_ID) ||
        document.getElementById(CART_EMPTY_HEADING_ID)
      target?.focus()
    }),
  )
}

export default function CartItem({ item }: CartItemProps) {
  const { cart, updateQuantity, removeFromCart, restoreItem, isSyncing } = useCart()
  const { toast } = useToast()
  const rootRef = useRef<HTMLDivElement>(null)
  // While typing the field may be empty / partial; the value is committed on blur or Enter.
  const [draft, setDraft] = useState<string | null>(null)
  const [notice, setNotice] = useState('')

  const maxQuantity = maxQuantityFor(item)

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > maxQuantity) return
    setNotice('')
    updateQuantity(item.id, newQuantity)
  }

  const commitDraft = () => {
    if (draft === null) return
    const parsed = parseInt(draft, 10)
    setDraft(null)
    if (Number.isNaN(parsed)) {
      setNotice('') // empty/invalid: keep the previous quantity
      return
    }
    const next = clampQuantity(parsed, maxQuantity)
    setNotice(parsed > maxQuantity ? `Chỉ còn tối đa ${maxQuantity} sản phẩm.` : '')
    if (next !== item.quantity) updateQuantity(item.id, next)
  }

  const handleRemove = () => {
    const index = cart.items.findIndex((line) => line.id === item.id)
    const root = rootRef.current
    const sibling = (root?.nextElementSibling || root?.previousElementSibling || null) as HTMLElement | null
    removeFromCart(item.id)
    focusAfterRemoval(sibling)
    // Each deletion gets its own toast (and its own 5s radix timer); the toast outlives this component.
    toast({
      title: `Đã xoá "${item.name}" khỏi giỏ`,
      description: 'Bạn có thể hoàn tác trong 5 giây.',
      duration: 5000,
      action: (
        <ToastAction altText={`Hoàn tác xoá ${item.name}`} onClick={() => restoreItem(item, index >= 0 ? index : undefined)}>
          Hoàn tác
        </ToastAction>
      ),
    })
  }

  const itemTotal = item.price * item.quantity
  const productHref = item.comboSlug ? `/combo/${item.comboSlug}` : item.slug ? `/san-pham/${item.slug}` : '/san-pham'
  const quantityInputId = `cart-qty-${item.id}`

  return (
    <div ref={rootRef} data-cart-item className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <Link href={productHref} tabIndex={-1} aria-hidden="true">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={item.image}
                alt=""
                fill
                sizes="96px"
                className="object-cover hover:scale-105 transition-transform duration-200"
              />
            </div>
          </Link>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <Link href={productHref} data-cart-focus className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700">
                <h3 className="font-medium text-green-900 hover:text-green-700 transition-colors line-clamp-2">
                  {item.name}
                </h3>
              </Link>
              <p className="text-sm text-gray-500 mt-1">
                {item.comboId ? 'Combo quà tặng' : `Khối lượng: ${item.weight}${item.boxType ? ` · ${item.boxType}` : ''}`}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-semibold text-green-800">
                  {formatVnd(item.price)}
                </span>
                <span className="text-sm text-gray-500">/ {item.weight}</span>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex flex-col sm:items-end gap-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-11 w-11"
                  aria-label={`Giảm số lượng ${item.name}`}
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <Input
                  id={quantityInputId}
                  type="number"
                  inputMode="numeric"
                  min="1"
                  max={maxQuantity}
                  value={draft ?? String(item.quantity)}
                  aria-label={`Số lượng ${item.name}`}
                  onChange={(e) => setDraft(e.target.value)}
                  onBlur={commitDraft}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      commitDraft()
                    }
                  }}
                  className="h-11 w-16 text-center"
                />

                <Button
                  variant="outline"
                  size="icon"
                  className="h-11 w-11"
                  aria-label={`Tăng số lượng ${item.name}`}
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  disabled={item.quantity >= maxQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p role="status" className={notice ? 'text-xs text-amber-700 sm:text-right' : 'sr-only'}>{notice}</p>

              {/* Item Total */}
              <div className="text-right">
                <div className="font-semibold text-green-800">
                  {formatVnd(itemTotal)}
                </div>
                {item.quantity > 1 && (
                  <div className="text-xs text-gray-500">
                    {item.quantity} × {formatVnd(item.price)}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-red-600 p-0 h-auto min-h-11"
              aria-label={`Xóa ${item.name} khỏi giỏ hàng`}
              onClick={handleRemove}
            >
              <Trash2 className="h-4 w-4 mr-1" aria-hidden="true" />
              Xóa
            </Button>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isSyncing && <span className="sr-only" role="status">Đang đồng bộ giỏ hàng</span>}
    </div>
  )
}
