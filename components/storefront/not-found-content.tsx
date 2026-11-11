import Link from "next/link"
import { SearchX } from "lucide-react"

import StorefrontContainer from "@/components/storefront/storefront-container"
import { StatePanel } from "@/components/storefront/loading-states"
import { Button } from "@/components/ui/button"

export default function NotFoundContent() {
  return <StorefrontContainer className="py-12 md:py-20"><StatePanel headingLevel="h1" title="Không tìm thấy trang" description="Đường dẫn này có thể đã thay đổi hoặc không còn tồn tại. Hãy tìm sản phẩm hoặc chọn một lối đi khác trên SIPVY." icon={<SearchX className="h-6 w-6" aria-hidden="true" />} action={<div className="w-full max-w-xl"><form action="/san-pham" className="flex flex-col gap-2 sm:flex-row"><label htmlFor="not-found-search" className="sr-only">Tìm sản phẩm</label><input id="not-found-search" name="search" type="search" placeholder="Tìm trà, quà tặng…" className="h-11 min-w-0 flex-1 rounded-lg border border-stone-300 bg-white px-3 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-stone-200" /><Button type="submit" className="h-11 bg-green-800 hover:bg-green-900">Tìm kiếm</Button></form><div className="mt-3 flex flex-wrap justify-center gap-3"><Button asChild variant="outline"><Link href="/">Về trang chủ</Link></Button><Button asChild variant="outline"><Link href="/san-pham">Xem sản phẩm</Link></Button></div></div>} /></StorefrontContainer>
}
