import Link from "next/link"

import StorefrontContainer from "@/components/storefront/storefront-container"
import { cn } from "@/lib/utils"

export const SUPPORT_PAGES = [
  { href: "/lien-he", label: "Liên hệ" },
  { href: "/hieu-ve-tra", label: "Hướng dẫn pha trà" },
  { href: "/chinh-sach-van-chuyen", label: "Vận chuyển" },
  { href: "/chinh-sach-doi-tra", label: "Đổi trả" },
  { href: "/chinh-sach-bao-mat", label: "Bảo mật" },
  { href: "/dieu-khoan", label: "Điều khoản" },
] as const

export type SupportPageHref = (typeof SUPPORT_PAGES)[number]["href"]

/** Pill tabs linking the support pages (footer "Hỗ trợ" group); scrolls sideways on phones. */
export default function SupportNav({ current }: { current: SupportPageHref }) {
  return (
    <div className="border-b border-stone-200 bg-white">
      <StorefrontContainer>
        <nav aria-label="Trang hỗ trợ" className="-mx-1 flex gap-1.5 overflow-x-auto px-1 py-2.5">
          {SUPPORT_PAGES.map((page) => {
            const active = page.href === current
            return (
              <Link
                key={page.href}
                href={page.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-11 shrink-0 items-center rounded-full px-4 text-sm transition-colors",
                  active ? "bg-green-950 font-semibold text-white" : "font-medium text-stone-700 hover:bg-stone-100 hover:text-stone-950",
                )}
              >
                {page.label}
              </Link>
            )
          })}
        </nav>
      </StorefrontContainer>
    </div>
  )
}
