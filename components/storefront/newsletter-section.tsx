import type { ReactNode } from "react"
import Link from "next/link"

import NewsletterForm from "@/components/storefront/newsletter-form"
import StorefrontContainer from "@/components/storefront/storefront-container"
import { cn } from "@/lib/utils"

interface NewsletterSectionProps {
  className?: string
  title?: ReactNode
  description?: ReactNode
  /** Passed to the API so signups can be attributed (e.g. "home", "gioi-thieu"). */
  source: string
  /** Optional decorative element rendered above the title. */
  icon?: ReactNode
  /** Show the privacy-policy consent line under the form. */
  showConsent?: boolean
}

/** Shared newsletter conversion section for marketing/editorial routes. */
export default function NewsletterSection({
  className,
  title = "Nhận cảm hứng trà mỗi tuần",
  description = "Cẩm nang pha trà, câu chuyện vùng trà và ưu đãi chọn lọc từ SIPVY.",
  source,
  icon,
  showConsent = true,
}: NewsletterSectionProps) {
  return (
    <section className={cn("storefront-section bg-stone-50", className)}>
      <StorefrontContainer>
        <div className="mx-auto max-w-2xl text-center">
          {icon && <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-800 text-white shadow-md">{icon}</div>}
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-tight tracking-tight text-stone-950">{title}</h2>
          <p className="mt-3 text-base leading-7 text-stone-600">{description}</p>
          <div className="mx-auto mt-6 max-w-xl">
            <NewsletterForm source={source} />
          </div>
          {showConsent && (
            <p className="mt-4 text-xs text-stone-600">
              Email chỉ dùng để gửi ưu đãi khi bạn chọn đồng ý. Đọc{" "}
              <Link href="/chinh-sach-bao-mat" className="text-green-800 underline-offset-2 hover:underline">
                Chính sách bảo mật
              </Link>{" "}
              của SIPVY.
            </p>
          )}
        </div>
      </StorefrontContainer>
    </section>
  )
}
