import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import {
  ChevronRight,
  Gift,
  Phone,
  ArrowRight,
  Sparkles,
  Truck,
  PenLine,
  ShieldCheck,
  Mail,
} from "lucide-react"

import { Button } from "@/components/ui/button"
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
  title: "Quà Tết 2026 - Hộp quà trà gọn đẹp, kèm thiệp | SIPVY",
  description:
    "Quà Tết SIPVY 2026: hộp quà trà cổ thụ, oolong, sen Tây Hồ, kèm thiệp cá nhân hoá, hỗ trợ in logo doanh nghiệp. Đặt sớm để kịp giao trước Tết.",
  alternates: { canonical: "/qua-tet" },
  openGraph: {
    title: "Quà Tết SIPVY 2026 — Trà Việt đón Tết",
    description: "Hộp quà trà Tết gọn đẹp, dành cho gia đình, bạn bè và doanh nghiệp",
    url: "/qua-tet",
    images: [{ url: "/og.png", width: 1200, height: 676, alt: "Quà Tết trà SIPVY" }],
  },
}

const SERVICES = [
  {
    icon: Gift,
    title: "Đóng gói chỉn chu",
    desc: "Hộp quà gọn đẹp, có thể kèm ruy băng và thiệp — nhận về là tặng được ngay.",
  },
  {
    icon: PenLine,
    title: "Thiệp cá nhân hoá",
    desc: "Thiệp viết tay hoặc khắc laser theo tên người nhận. Doanh nghiệp có thể đặt thiệp riêng theo brand.",
  },
  {
    icon: Truck,
    title: "Giao hàng dịp Tết",
    desc: "Thời gian giao dự kiến 2–5 ngày làm việc; đặt sớm để kịp dịp Tết. Hỗ trợ giao đến nhiều địa chỉ trong cùng đơn.",
  },
  {
    icon: ShieldCheck,
    title: "Bảo đảm chất lượng",
    desc: "Trà tuyển từ vùng đặc sản; đổi trả miễn phí nếu lỗi đóng gói hoặc lỗi từ nhà sản xuất.",
  },
]

const TIMELINE = [
  { date: "Đến 15/12 (Âm)", label: "Đặt sớm", desc: "Nhiều thời gian nhất để chọn hộp, viết thiệp và giao" },
  { date: "16/12 - 20/12 (Âm)", label: "Giai đoạn chính", desc: "Vẫn nhận đơn, đặt sớm để kịp giao" },
  { date: "21/12 - 26/12 (Âm)", label: "Hạn cuối doanh nghiệp", desc: "Đặt đơn doanh nghiệp số lượng lớn" },
  { date: "27/12 (Âm)", label: "Ngừng nhận đơn mới", desc: "Tập trung giao các đơn đã đặt" },
]

export default function TetGiftsPage() {
  // Chưa gắn thẻ "quà Tết" trong dữ liệu: trang tự lấy các sản phẩm nổi bật.
  const display = getLandingProductCards((p) => p.tags.some((t) => ["qua-tet", "tet", "gift-tet"].includes(t)), 8)
  const combos = getPublishedCombos(6)
  const businessProof = publishable([PROOF_STATS.businessClients])[0]

  return (
    <>
      {/* ============ HERO ============ */}
      <EditorialHero contained={false} className="bg-stone-900 text-stone-100">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/banner/banner_tra-1600.webp"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/85 to-stone-900/40" />

        {/* Subtle decorative lines */}
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

        <StorefrontContainer className="relative py-16 md:py-24 lg:py-28">
          <Breadcrumb tone="dark" items={[{ href: "/", label: "Trang chủ" }, { href: "/qua-tang", label: "Quà tặng" }, { label: "Quà Tết" }]} />

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Bộ sưu tập đặc biệt</p>

          <h1 className="mb-5 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            Quà Tết 2026
            <span className="mt-1 block text-amber-300">Trà Việt đón Tết</span>
          </h1>

          <p className="mb-8 max-w-2xl text-base leading-relaxed text-stone-300 md:text-lg">
            Hộp quà trà SIPVY gọn đẹp, kèm thiệp cá nhân hoá,
            để gửi lời chúc đến bạn bè, người thân và đối tác dịp năm mới.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <MarketingButtonLink
              href="#tiers"
              label="Xem bộ sưu tập"
              location="tet_hero"
              size="lg"
              className="h-12 rounded-full bg-amber-300 px-7 font-semibold text-stone-900 hover:bg-amber-200"
            >
              Xem bộ sưu tập
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </MarketingButtonLink>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-stone-400/40 bg-transparent px-7 text-white hover:bg-white/10 hover:text-white">
              <a href={SITE_CONTACT.hotlineHref}>
                <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                Tư vấn ngay
              </a>
            </Button>
          </div>

          {/* Early bird banner */}
          <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-amber-400/30 bg-amber-300/10 px-5 py-3 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-amber-300" aria-hidden="true" />
            <p className="text-sm text-stone-200">
              <span className="font-bold text-amber-300">Đặt sớm:</span> chốt đơn trước 15/12 Âm lịch để kịp giao và kịp viết thiệp
            </p>
          </div>
        </StorefrontContainer>
      </EditorialHero>

      {/* ============ INTRO ============ */}
      <section className="storefront-section bg-stone-50">
        <StorefrontContainer>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              align="center"
              eyebrow="Một hộp quà SIPVY"
              title="Một món quà — Một lời chúc"
              description="Tết là dịp để nói lời cảm ơn. Một hộp trà gọn đẹp, một tấm thiệp ghi đúng tên người nhận, thế là đủ để món quà có chút riêng tư. Chọn combo, chọn lời chúc, SIPVY lo phần còn lại."
              className="mb-0"
            />
          </div>
        </StorefrontContainer>
      </section>

      {/* ============ COMBOS ============ */}
      <ProductRail
        id="tiers"
        className="bg-white"
        eyebrow="Đặt online"
        title="Combo quà Tết"
        description="Giá và tình trạng còn hàng được cập nhật theo tồn kho thực tế của từng sản phẩm trong combo."
      >
        <ComboGrid combos={combos} />
      </ProductRail>

      {display.length > 0 && (
        <ProductRail
          className="bg-stone-50"
          eyebrow="Sản phẩm gợi ý"
          title="Trà phù hợp dịp Tết"
          action={
            <Button asChild variant="outline" className="rounded-full border-stone-300 text-stone-800">
              <Link href="/san-pham">
                Xem toàn bộ <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
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
      <TrustSection title="Trọn vẹn từ đặt đến giao" description="Cam kết của chúng tôi" className="bg-white">
        <ul className="grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {SERVICES.map((s) => {
            const Icon = s.icon
            return (
              <li key={s.title} className="rounded-xl border border-stone-200 bg-stone-50 p-6 transition-colors hover:border-amber-200 hover:bg-amber-50/30">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-stone-200 bg-white text-amber-800">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-stone-900">{s.title}</h3>
                <p className="text-sm leading-relaxed text-stone-600">{s.desc}</p>
              </li>
            )
          })}
        </ul>
      </TrustSection>

      {/* ============ TIMELINE ============ */}
      <section className="storefront-section bg-stone-50">
        <StorefrontContainer>
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              align="center"
              eyebrow="Lịch đặt quà Tết"
              title="Đặt sớm — nhận quà sớm"
              description="Đơn càng sớm, bạn càng rộng thời gian chọn hộp và nhận hàng"
            />
            <ol className="space-y-3">
              {TIMELINE.map((t, i) => (
                <li
                  key={t.label}
                  className={`flex items-center gap-4 rounded-xl border p-5 md:gap-6 ${
                    i === 0 ? "border-amber-300 bg-amber-50" : "border-stone-200 bg-white"
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-bold ${
                      i === 0 ? "bg-amber-700 text-white" : "bg-stone-100 text-stone-700"
                    }`}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="mb-0.5 font-mono text-xs uppercase text-stone-600">{t.date}</p>
                    <h3 className={`font-bold ${i === 0 ? "text-amber-900" : "text-stone-900"}`}>{t.label}</h3>
                    <p className="mt-0.5 text-sm text-stone-600">{t.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </StorefrontContainer>
      </section>

      {/* ============ CTA ============ */}
      <section className="storefront-section relative overflow-hidden bg-stone-900 text-stone-100">
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
        <StorefrontContainer>
          <div className="mx-auto max-w-3xl text-center">
            <Gift className="mx-auto mb-5 h-12 w-12 text-amber-300" aria-hidden="true" />
            <SectionHeading
              tone="inverse"
              align="center"
              title="Sẵn sàng đặt quà Tết của bạn?"
              description="Liên hệ ngay để được tư vấn gói phù hợp, thiết kế hộp riêng theo thương hiệu, và đặt lịch giao hàng đến tận tay người nhận."
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
                label="Gửi yêu cầu"
                location="tet_cta"
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-stone-400/40 bg-transparent px-7 text-white hover:bg-white/10 hover:text-white"
              >
                <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                Gửi yêu cầu
              </MarketingButtonLink>
            </div>
            {businessProof && (
              <p className="mt-8 text-xs text-stone-300">
                <strong className="text-stone-100">{businessProof.value}</strong> {businessProof.label.toLowerCase()} dịp Tết những năm qua
              </p>
            )}
          </div>
        </StorefrontContainer>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
      </section>
    </>
  )
}
