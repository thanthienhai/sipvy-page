import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import {
  ChevronRight,
  Gift,
  Crown,
  Building2,
  Heart,
  Sparkles,
  Phone,
  ArrowRight,
  Palette,
  Truck,
  MessageSquare,
  GraduationCap,
  Handshake,
  Cake,
  Moon,
  Store,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getPublishedCombos } from "@/lib/data/combos"
import type { StorefrontCombo } from "@/lib/data/combos"
import { getLandingProductCards } from "@/lib/data/products"
import { PROOF_STATS, SITE_CONTACT, publishable } from "@/lib/site-config"
import { ComboGrid } from "@/components/combo/combo-grid"
import Breadcrumb from "@/components/storefront/breadcrumb"
import EditorialHero from "@/components/storefront/editorial-hero"
import ProductCard from "@/components/storefront/product-card"
import ProductRail from "@/components/storefront/product-rail"
import SectionHeading from "@/components/storefront/section-heading"
import StorefrontContainer from "@/components/storefront/storefront-container"
import TrustSection from "@/components/storefront/trust-section"
import { MarketingButtonLink } from "@/components/storefront/marketing-link"

export const metadata: Metadata = {
  title: "Quà tặng trà | Quà tặng doanh nghiệp & cá nhân",
  description:
    "Hộp quà trà SIPVY cho bạn bè, đồng nghiệp, đối tác và sự kiện. Hỗ trợ thiết kế hộp riêng theo thương hiệu, kèm thiệp cá nhân hoá. Báo giá nhanh trong 24h.",
  alternates: { canonical: "/qua-tang" },
  openGraph: {
    title: "Quà tặng trà SIPVY",
    description: "Hộp quà trà gọn đẹp cho bạn bè, đồng nghiệp và doanh nghiệp",
    url: "/qua-tang",
    images: [{ url: "/og.png", width: 1200, height: 676, alt: "Quà tặng trà SIPVY" }],
  },
}

const OCCASIONS = [
  { icon: Sparkles, label: "Quà Tết", href: "/qua-tet" },
  { icon: Heart, label: "Quà cưới" },
  { icon: GraduationCap, label: "Tốt nghiệp" },
  { icon: Handshake, label: "Tri ân khách" },
  { icon: Crown, label: "Mừng thọ" },
  { icon: Cake, label: "Sinh nhật" },
  { icon: Moon, label: "Trung Thu" },
  { icon: Store, label: "Khai trương" },
]

const SERVICES = [
  {
    icon: Palette,
    title: "Thiết kế riêng",
    desc: "SIPVY hỗ trợ thiết kế hộp, nhãn in logo, lời nhắn theo nhận diện thương hiệu của bạn",
  },
  {
    icon: MessageSquare,
    title: "Thiệp cá nhân hoá",
    desc: "Thiệp viết tay hoặc khắc laser, tuỳ chỉnh từng tên người nhận khác nhau",
  },
  {
    icon: Truck,
    title: "Giao đa địa điểm",
    desc: "Giao đến nhiều địa chỉ trong cùng một đơn hàng, thời gian giao dự kiến 2–5 ngày làm việc",
  },
]

export default function GiftPage() {
  const display = getLandingProductCards(
    (p) => p.category.slug === "qua-tang" || p.tags.some((t) => ["gift", "qua-tang", "hop-qua"].includes(t)),
    8,
  )
  const combos = getPublishedCombos(6)
  const businessProof = publishable([PROOF_STATS.businessClients])[0]

  return (
    <>
      {/* ============ HERO ============ */}
      <EditorialHero contained={false} className="border-b border-stone-200 bg-stone-50">
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-25">
          <Image
            src="/art/hero.svg"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-50 via-stone-50/70 to-transparent" />
        </div>

        <StorefrontContainer className="relative py-12 md:py-20">
          <Breadcrumb items={[{ href: "/", label: "Trang chủ" }, { label: "Quà tặng" }]} />

          <Badge className="mb-4 rounded-full border border-amber-200 bg-amber-50 text-amber-900 hover:bg-amber-50">
            <Sparkles className="mr-1.5 h-3 w-3" aria-hidden="true" />
            Bộ sưu tập quà tặng
          </Badge>

          <h1 className="mb-5 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-stone-900 md:text-5xl lg:text-6xl">
            Tặng trà — Tặng một
            <span className="block text-green-800">khoảng nghỉ cho người thương</span>
          </h1>

          <p className="mb-7 max-w-2xl text-base leading-relaxed text-stone-700 md:text-lg">
            Hộp quà trà SIPVY: gọn đẹp, dễ tặng, kèm thiệp cá nhân hoá.
            Hợp nhiều dịp — từ quà sinh nhật cho bạn bè đến quà tri ân khách hàng.
          </p>

          <div className="flex flex-wrap gap-3">
            <MarketingButtonLink
              href="#packages"
              label="Xem các gói quà"
              location="gift_hero"
              size="lg"
              className="h-12 rounded-full bg-green-800 px-7 text-white shadow-md hover:bg-green-900"
            >
              <Gift className="mr-2 h-4 w-4" aria-hidden="true" />
              Xem các gói quà
            </MarketingButtonLink>
            <MarketingButtonLink
              href="#quote"
              label="Báo giá doanh nghiệp"
              location="gift_hero"
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-stone-300 px-7 text-stone-700 hover:bg-stone-100"
            >
              <Building2 className="mr-2 h-4 w-4" aria-hidden="true" />
              Báo giá doanh nghiệp
            </MarketingButtonLink>
          </div>
        </StorefrontContainer>
      </EditorialHero>

      {/* ============ OCCASIONS ============ */}
      <section className="storefront-section border-b border-stone-100 bg-white">
        <StorefrontContainer>
          <SectionHeading align="center" eyebrow="Mọi dịp" title="Gợi ý cho những dịp bạn cần một món quà" />
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-8 md:gap-3">
            {OCCASIONS.map((o) => {
              const Icon = o.icon
              const inner = (
                <div
                  className={`group flex h-full flex-col items-center rounded-lg border border-stone-200 bg-stone-50/50 p-4 text-center transition-all ${
                    o.href ? "hover:border-amber-200 hover:bg-amber-50" : ""
                  }`}
                >
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 transition-colors group-hover:text-amber-800">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <p className="text-xs font-medium leading-tight text-stone-700 md:text-sm">{o.label}</p>
                </div>
              )
              return (
                <li key={o.label}>
                  {o.href ? (
                    <Link href={o.href} className="block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700">
                      {inner}
                    </Link>
                  ) : (
                    inner
                  )}
                </li>
              )
            })}
          </ul>
        </StorefrontContainer>
      </section>

      {/* ============ COMBOS ============ */}
      <ProductRail
        id="packages"
        className="bg-stone-50"
        eyebrow="Combo quà tặng có sẵn"
        title="Chọn combo phù hợp với mục đích"
        description="Giá và tình trạng còn hàng được cập nhật theo tồn kho thực tế của từng sản phẩm trong combo."
      >
        <ComboGrid combos={combos} />
      </ProductRail>

      {display.length > 0 && (
        <ProductRail
          className="bg-white"
          title="Sản phẩm quà tặng"
          description="Lựa chọn riêng lẻ cho bộ quà của bạn"
          action={
            <Button asChild variant="outline" className="rounded-full border-stone-300 text-stone-800">
              <Link href="/san-pham">
                Xem tất cả <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          }
        >
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {display.map((item) => (
              <li key={item.slug}>
                <ProductCard item={item} tone="amber" />
              </li>
            ))}
          </ul>
        </ProductRail>
      )}

      {/* ============ SERVICES ============ */}
      <TrustSection title="Dịch vụ kèm theo" description="Mọi thứ bạn cần để hộp quà thật chỉn chu" className="bg-stone-50">
        <ul className="grid gap-5 md:grid-cols-3 md:gap-6">
          {SERVICES.map((s) => {
            const Icon = s.icon
            return (
              <li key={s.title} className="rounded-xl border border-stone-200 bg-white p-6 md:p-7">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-800">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-stone-900">{s.title}</h3>
                <p className="text-sm leading-relaxed text-stone-600">{s.desc}</p>
              </li>
            )
          })}
        </ul>
      </TrustSection>

      {/* ============ QUOTE CTA ============ */}
      <section id="quote" className="storefront-section bg-green-900 text-stone-100">
        <StorefrontContainer>
          <div className="mx-auto max-w-3xl text-center">
            <Building2 className="mx-auto mb-4 h-12 w-12 text-amber-300" aria-hidden="true" />
            <SectionHeading
              tone="inverse"
              align="center"
              title="Báo giá quà doanh nghiệp trong 24h"
              description="Liên hệ ngay để được tư vấn thiết kế riêng. Hỗ trợ in logo, đóng gói theo nhận diện thương hiệu, giao hàng đến nhiều địa chỉ."
              className="mb-8"
            />
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="h-12 rounded-full bg-amber-300 px-7 font-semibold text-stone-900 hover:bg-amber-200">
                <a href={SITE_CONTACT.hotlineHref}>
                  <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                  Gọi {SITE_CONTACT.hotline}
                </a>
              </Button>
              <MarketingButtonLink
                href="/lien-he"
                label="Gửi yêu cầu báo giá"
                location="gift_quote"
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-stone-400/40 bg-transparent px-7 text-white hover:bg-white/10 hover:text-white"
              >
                Gửi yêu cầu báo giá
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </MarketingButtonLink>
            </div>
            {businessProof && (
              <p className="mt-6 text-xs text-stone-300">
                <strong className="text-stone-100">{businessProof.value}</strong> {businessProof.label.toLowerCase()} trên toàn quốc
              </p>
            )}
          </div>
        </StorefrontContainer>
      </section>
    </>
  )
}
