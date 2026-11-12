import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import {
  ChevronRight,
  Gift,
  Heart,
  Sparkles,
  Phone,
  ArrowRight,
  Truck,
  MessageSquare,
  GraduationCap,
  Cake,
  Moon,
  Home,
  Users,
  Briefcase,
  PackageCheck,
  MessageCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getPublishedCombos } from "@/lib/data/combos"
import { getLandingProductCards } from "@/lib/data/products"
import { SITE_CONTACT } from "@/lib/site-config"
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
  title: "Quà tặng trà cho người thân, bạn bè | SIPVY",
  description:
    "Tìm quà biếu, quà tặng gọn đẹp: hộp trà dễ pha cho bạn bè, người yêu, bố mẹ, đồng nghiệp. Kèm thiệp lời nhắn, giao đến tận tay người nhận.",
  alternates: { canonical: "/qua-tang" },
  openGraph: {
    title: "Quà tặng trà SIPVY",
    description: "Hộp quà trà gọn đẹp để tặng bạn bè, người yêu, bố mẹ, đồng nghiệp",
    url: "/qua-tang",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Quà tặng trà SIPVY" }],
  },
}

const OCCASIONS = [
  { icon: Sparkles, label: "Quà Tết", href: "/qua-tet" },
  { icon: Cake, label: "Sinh nhật" },
  { icon: Home, label: "Tân gia" },
  { icon: GraduationCap, label: "Tốt nghiệp" },
  { icon: Heart, label: "Kỷ niệm" },
  { icon: MessageCircle, label: "Cảm ơn" },
  { icon: Users, label: "Biếu bố mẹ" },
  { icon: Moon, label: "Trung Thu" },
]

const RECIPIENTS = [
  { icon: Users, title: "Tặng bạn bè", desc: "Hộp nhỏ, dễ pha, uống ngay không cần dụng cụ cầu kỳ. Hợp quà sinh nhật, tân gia, tốt nghiệp." },
  { icon: Heart, title: "Tặng người yêu", desc: "Một hộp trà gọn đẹp kèm vài dòng của riêng bạn. Nhẹ nhàng, không cần dịp đặc biệt." },
  { icon: Home, title: "Biếu bố mẹ, ông bà", desc: "Chọn các dòng trà quen vị như Shan Tuyết, sen, ô long. Hộp chắc chắn, dễ cất, dễ dùng." },
  { icon: Briefcase, title: "Đồng nghiệp, sếp", desc: "Quà tinh tế, vừa phải, không quá cầu kỳ. Hợp cảm ơn, chia tay dự án hay đầu năm." },
]

const SERVICES = [
  {
    icon: PackageCheck,
    title: "Đóng gói sẵn để tặng",
    desc: "Hộp quà gọn đẹp, có thể kèm ruy băng. Nhận về là tặng được ngay.",
  },
  {
    icon: MessageSquare,
    title: "Thiệp kèm lời nhắn",
    desc: "Bạn viết lời nhắn trong ghi chú đơn, SIPVY ghi vào thiệp theo tên người nhận.",
  },
  {
    icon: Truck,
    title: "Giao đến người nhận",
    desc: "Điền địa chỉ người nhận ngay trong đơn. Thời gian giao dự kiến 2–5 ngày làm việc, nên đặt sớm hơn dịp tặng vài ngày.",
  },
]

export default function GiftPage() {
  const display = getLandingProductCards(
    (p) => p.category.slug === "qua-tang" || p.tags.some((t) => ["gift", "qua-tang", "hop-qua"].includes(t)),
    8,
  )
  const combos = getPublishedCombos(6)
  const hasCombos = combos.length > 0

  return (
    <>
      {/* ============ HERO ============ */}
      <EditorialHero contained={false} className="border-b border-stone-200 bg-stone-50">
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-25">
          <Image
            src="/banner/banner_tra-1600.webp"
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
            Quà biếu, quà tặng
          </Badge>

          <h1 className="mb-5 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-stone-900 md:text-5xl lg:text-6xl">
            Quà trà dễ tặng
            <span className="block text-green-800">cho người bạn quý</span>
          </h1>

          <p className="mb-7 max-w-2xl text-base leading-relaxed text-stone-700 md:text-lg">
            Chưa biết tặng gì? Một hộp trà gọn đẹp, kèm thiệp lời nhắn của bạn là đủ.
            Hợp quà sinh nhật, tân gia, tốt nghiệp, cảm ơn, hay biếu bố mẹ.
          </p>

          <div className="flex flex-wrap gap-3">
            <MarketingButtonLink
              href="#packages"
              label="Chọn quà theo người nhận"
              location="gift_hero"
              size="lg"
              className="h-12 rounded-full bg-green-800 px-7 text-white shadow-md hover:bg-green-900"
            >
              <Gift className="mr-2 h-4 w-4" aria-hidden="true" />
              Chọn quà theo người nhận
            </MarketingButtonLink>
            <MarketingButtonLink
              href="#quote"
              label="Nhờ SIPVY gợi ý"
              location="gift_hero"
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-stone-300 px-7 text-stone-700 hover:bg-stone-100"
            >
              <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
              Nhờ SIPVY gợi ý
            </MarketingButtonLink>
          </div>
        </StorefrontContainer>
      </EditorialHero>

      {/* ============ OCCASIONS ============ */}
      <section className="storefront-section border-b border-stone-100 bg-white">
        <StorefrontContainer>
          <SectionHeading align="center" eyebrow="Dịp nào cũng có" title="Bạn đang cần quà cho dịp gì?" />
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

      {/* ============ TẶNG AI ============ */}
      <section id="packages" className="storefront-section bg-stone-50">
        <StorefrontContainer>
          <SectionHeading align="center" eyebrow="Tặng ai?" title="Chọn quà theo người nhận" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RECIPIENTS.map((r) => {
              const Icon = r.icon
              return (
                <li key={r.title} className="rounded-xl border border-stone-200 bg-white p-6">
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-amber-50 text-amber-800">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mb-1.5 font-bold text-stone-900">{r.title}</h3>
                  <p className="text-sm leading-relaxed text-stone-600">{r.desc}</p>
                </li>
              )
            })}
          </ul>
        </StorefrontContainer>
      </section>

      {/* ============ COMBOS (chỉ hiện khi đã có combo) ============ */}
      {hasCombos && (
        <ProductRail
          className="bg-white"
          eyebrow="Combo quà tặng có sẵn"
          title="Chọn combo phù hợp"
          description="Giá và tình trạng còn hàng được cập nhật theo từng sản phẩm trong combo."
        >
          <ComboGrid combos={combos} />
        </ProductRail>
      )}

      {display.length > 0 && (
        <ProductRail
          className={hasCombos ? "bg-stone-50" : "bg-white"}
          title="Trà để làm quà"
          description="Chọn từng hộp trà, hoặc nhắn SIPVY để ghép hộp riêng theo ngân sách của bạn."
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
      <TrustSection
        title="Để món quà thật chỉn chu"
        description="Bạn chọn trà, phần còn lại SIPVY lo"
        className={hasCombos ? "bg-white" : "bg-stone-50"}
      >
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

      {/* ============ CTA ============ */}
      <section id="quote" className="storefront-section bg-green-900 text-stone-100">
        <StorefrontContainer>
          <div className="mx-auto max-w-3xl text-center">
            <Gift className="mx-auto mb-4 h-12 w-12 text-amber-300" aria-hidden="true" />
            <SectionHeading
              tone="inverse"
              align="center"
              title="Chưa biết chọn gì? Nhắn SIPVY"
              description="Cho SIPVY biết bạn tặng ai, dịp gì và ngân sách khoảng bao nhiêu. SIPVY gợi ý hộp phù hợp để bạn chốt nhanh."
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
                label="Nhờ gợi ý quà"
                location="gift_quote"
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-stone-400/40 bg-transparent px-7 text-white hover:bg-white/10 hover:text-white"
              >
                Nhờ gợi ý quà
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </MarketingButtonLink>
            </div>
          </div>
        </StorefrontContainer>
      </section>
    </>
  )
}
