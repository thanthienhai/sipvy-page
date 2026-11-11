import { Suspense } from "react"
import type { Metadata } from "next"

import ProductCatalog from "@/components/storefront/product-catalog"
import { ProductGridSkeleton } from "@/components/storefront/loading-states"
import StorefrontContainer from "@/components/storefront/storefront-container"

export const metadata: Metadata = {
  title: "Sản phẩm trà | Trà cổ thụ, Oolong, Sen Tây Hồ",
  description:
    "Khám phá toàn bộ sản phẩm trà thượng hạng SIPVY: trà cổ thụ Hà Giang, oolong hương lan, sen Tây Hồ, trà lài. Đa dạng kích cỡ, giao hàng toàn quốc.",
  alternates: { canonical: "/san-pham/" },
  openGraph: {
    title: "Sản phẩm trà SIPVY",
    description: "Toàn bộ sản phẩm trà thượng hạng SIPVY",
    url: "/san-pham/",
  },
}

// Bộ lọc/tìm kiếm đọc từ URL (?category=...&search=...) và chạy trên trình duyệt,
// nên cần Suspense cho useSearchParams khi xuất tĩnh.
export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <StorefrontContainer className="py-8">
          <ProductGridSkeleton />
        </StorefrontContainer>
      }
    >
      <ProductCatalog />
    </Suspense>
  )
}
