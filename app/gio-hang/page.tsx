"use client"

import { useState } from 'react'
import Link from 'next/link'
import { formatVnd } from "@/lib/format"
import { ShoppingBag, ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCart } from '@/contexts/cart-context'
import CartItem from '@/components/cart/cart-item'
import OrderForm, { OrderSuccess } from '@/components/cart/order-form'
import EmptyCart from '@/components/cart/empty-cart'
import PageHeader from '@/components/storefront/page-header'
import StorefrontContainer from '@/components/storefront/storefront-container'

export default function CartPage() {
  const { cart } = useCart()
  const [orderRef, setOrderRef] = useState<string | null>(null)

  return (
    // The mobile checkout bar below is sticky (not fixed): it rests above the footer at the end of
    // the page instead of covering the footer, so no extra bottom padding is needed for it.
    <div className="relative">
      <PageHeader
        breadcrumbs={[{ href: "/", label: "Trang chủ" }, { label: "Giỏ hàng" }]}
        icon={<ShoppingBag className="h-8 w-8" aria-hidden="true" />}
        title="Giỏ hàng & đặt hàng"
        actions={
          !orderRef && cart.items.length > 0 ? (
            <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
              {cart.items.length} sản phẩm
            </span>
          ) : undefined
        }
      />

      <StorefrontContainer className="pb-8 pt-8">
        {orderRef ? (
          <div className="mx-auto max-w-xl">
            <OrderSuccess reference={orderRef} />
          </div>
        ) : cart.items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle id="cart-items-heading" tabIndex={-1} className="text-green-900 focus:outline-none">Sản phẩm trong giỏ hàng</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-200">
                    {cart.items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Continue Shopping */}
              <div className="flex justify-start">
                <Button asChild variant="outline" className="text-green-700 border-green-200 hover:bg-green-50">
                  <Link href="/san-pham">
                    <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                    Tiếp tục mua sắm
                  </Link>
                </Button>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-[calc(var(--storefront-compact-header-height)+1rem)]">
                <OrderForm onDone={setOrderRef} />
              </div>
            </div>
          </div>
        )}
      </StorefrontContainer>
      {!orderRef && cart.items.length > 0 && <MobileCheckoutBar total={cart.total} />}
    </div>
  )
}

function MobileCheckoutBar({ total }: { total: number }) {
  return (
    <div className="storefront-bottom-bar storefront-bottom-bar--cart sticky inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 px-4 py-3 shadow-[0_-4px_16px_rgba(28,25,23,0.12)] backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-2xl items-center gap-3 pb-[env(safe-area-inset-bottom)]">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-stone-600">Tổng dự kiến</p>
          <p className="text-lg font-bold text-green-800">{formatVnd(total)}</p>
        </div>
        <Button asChild className="h-11 shrink-0 bg-green-800 px-4 text-white hover:bg-green-900">
          <a href="#order-name" aria-label="Điền thông tin đặt hàng">
            Đặt hàng
          </a>
        </Button>
      </div>
    </div>
  )
}
