import Link from "next/link"
import { Gift } from "lucide-react"

import { Button } from "@/components/ui/button"
import ProductCard from "@/components/storefront/product-card"
import type { StorefrontCombo } from "@/lib/data/combos"

export function ComboGrid({ combos }: { combos: StorefrontCombo[] }) {
  if (combos.length === 0) {
    return (
      <div
        data-testid="combo-empty-state"
        className="mx-auto max-w-xl rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-12 text-center"
      >
        <Gift className="mx-auto mb-4 h-10 w-10 text-stone-500" aria-hidden="true" />
        <h3 className="mb-2 text-lg font-semibold text-stone-900">Combo quà đang được cập nhật</h3>
        <p className="mb-6 text-sm text-stone-600">
          Hiện chưa có combo quà nào đang mở bán. Bạn có thể xem các sản phẩm trà lẻ hoặc liên hệ để được tư vấn bộ quà riêng.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild className="rounded-full bg-green-800 text-white hover:bg-green-900">
            <Link href="/san-pham">Xem tất cả sản phẩm</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/lien-he">Liên hệ tư vấn</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div data-testid="combo-grid" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {combos.map((combo) => (
        <ProductCard
          key={combo.id}
          variant="combo"
          tone="amber"
          item={{
            name: combo.name,
            slug: combo.slug,
            image: combo.image,
            price: combo.price,
            originalPrice: combo.originalPrice,
            description: combo.description,
            inStock: combo.inStock,
            stockQuantity: combo.availableQuantity,
          }}
        />
      ))}
    </div>
  )
}
