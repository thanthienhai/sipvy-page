import Link from "next/link"
import type { Metadata } from "next"
import { Dancing_Script } from "next/font/google"
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
import { getLandingProductCards } from "@/lib/data/products"
import { PROOF_STATS, SITE_CONTACT, publishable } from "@/lib/site-config"
import { ComboGrid } from "@/components/combo/combo-grid"
import Breadcrumb from "@/components/storefront/breadcrumb"
import EditorialHero from "@/components/storefront/editorial-hero"
import ProductCard from "@/components/storefront/product-card"
import ProductRail from "@/components/storefront/product-rail"
import SectionHeading from "@/components/storefront/section-heading"
import StorefrontContainer from "@/components/storefront/storefront-container"
import { MarketingButtonLink } from "@/components/storefront/marketing-link"
import { Coin, Couplet, DaoBranch, LATTICE_BG, Lantern, MaiBranch, PatternStrip, RedEnvelope } from "@/components/tet/ornaments"

const script = Dancing_Script({ subsets: ["vietnamese", "latin"], weight: ["600", "700"], display: "swap" })

export const metadata: Metadata = {
  title: "Quà Tết 2027 - Hộp quà trà xuân Đinh Mùi, kèm thiệp | SIPVY",
  description:
    "Quà Tết SIPVY 2027 (xuân Đinh Mùi): hộp quà trà cổ thụ, oolong, sen Tây Hồ, kèm thiệp cá nhân hoá, hỗ trợ in logo doanh nghiệp. Đặt sớm để kịp giao trước Tết.",
  alternates: { canonical: "/qua-tet" },
  openGraph: {
    title: "Quà Tết SIPVY 2027 — Chén trà đầu xuân",
    description: "Hộp quà trà Tết gọn đẹp, dành cho gia đình, bạn bè và doanh nghiệp",
    url: "/qua-tet",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Quà Tết trà SIPVY" }],
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

const WISHES = ["Phúc", "Lộc", "Thọ", "An khang", "Thịnh vượng"]

export default function TetGiftsPage() {
  // Chưa gắn thẻ "quà Tết" trong dữ liệu: trang tự lấy các sản phẩm nổi bật.
  const display = getLandingProductCards((p) => p.tags.some((t) => ["qua-tet", "tet", "gift-tet"].includes(t)), 8)
  const combos = getPublishedCombos(6)
  const businessProof = publishable([PROOF_STATS.businessClients])[0]
  const hasCombos = combos.length > 0

  return (
    <>
      {/* ============ HERO ============ */}
      <EditorialHero contained={false} className="bg-[#7a0c15] text-[#fff7e6]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#a30f1b] via-[#8a0d17] to-[#5a080f]" />
        <div className="absolute inset-0" style={{ backgroundImage: LATTICE_BG }} aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 h-1.5 bg-[#f2c14e]" />

        {/* Cành mai, cành đào, lồng đèn */}
        <MaiBranch className="pointer-events-none absolute -right-6 -top-4 w-[62%] max-w-[520px] opacity-95 md:w-[44%]" />
        <DaoBranch className="pointer-events-none absolute -bottom-6 right-0 hidden w-[28%] max-w-[300px] -scale-y-100 opacity-90 lg:block" />
        <Lantern className="tet-sway pointer-events-none absolute right-[30%] top-1 hidden w-12 md:block lg:w-14" />
        <Lantern className="tet-sway tet-sway-slow pointer-events-none absolute right-[24%] top-1 hidden w-9 md:block" />

        <StorefrontContainer className="relative py-16 md:py-24 lg:py-28">
          <Breadcrumb tone="dark" items={[{ href: "/", label: "Trang chủ" }, { href: "/qua-tang", label: "Quà tặng" }, { label: "Quà Tết" }]} />

          <p className={`${script.className} mb-1 text-3xl text-[#f2c14e] md:text-4xl`}>Chúc mừng năm mới</p>

          <h1 className="mb-5 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            Quà Tết 2027
            <span className="mt-1 block text-[#f2c14e]">Chén trà đầu xuân</span>
          </h1>

          <p className="mb-8 max-w-xl text-base leading-relaxed text-[#fbe3a1]/90 md:text-lg">
            Hộp quà trà SIPVY gọn đẹp, kèm thiệp ghi đúng tên người nhận, để gửi lời chúc đến gia đình, bạn bè và đồng nghiệp dịp xuân Đinh Mùi.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <MarketingButtonLink
              href="#tiers"
              label="Xem hộp quà"
              location="tet_hero"
              size="lg"
              variant="ghost"
              className="h-12 rounded-full bg-[#f2c14e] px-7 font-semibold text-[#5a080f] hover:bg-[#fbe3a1] hover:text-[#5a080f]"
            >
              Xem hộp quà
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </MarketingButtonLink>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-[#f2c14e]/60 bg-transparent px-7 text-[#fbe3a1] hover:bg-white/10 hover:text-white">
              <a href={SITE_CONTACT.hotlineHref}>
                <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                Tư vấn ngay
              </a>
            </Button>
          </div>

          <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-[#f2c14e]/50 bg-[#5a080f]/50 px-5 py-3 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-[#f2c14e]" aria-hidden="true" />
            <p className="text-sm text-[#fff7e6]">
              <span className="font-bold text-[#f2c14e]">Đặt sớm:</span> chốt đơn trước 15/12 Âm lịch để kịp giao và kịp viết thiệp
            </p>
          </div>
        </StorefrontContainer>
        <PatternStrip className="absolute inset-x-0 bottom-0 opacity-80" />
      </EditorialHero>

      {/* ============ LỜI CHÚC ============ */}
      <div className="bg-[#f2c14e] py-2.5 text-[#5a080f]" aria-hidden="true">
        <ul className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-5 gap-y-1 px-4 text-sm font-bold uppercase tracking-[0.2em]">
          {WISHES.map((w, i) => (
            <li key={w} className="flex items-center gap-5">
              {w}
              {i < WISHES.length - 1 && <Coin size={16} className="hidden sm:block" />}
            </li>
          ))}
        </ul>
      </div>

      {/* ============ INTRO + CÂU ĐỐI ============ */}
      <section className="storefront-section bg-[#fff7e6]">
        <StorefrontContainer>
          <div className="mx-auto grid max-w-5xl items-center gap-6 md:grid-cols-[auto_1fr_auto] md:gap-10">
            <Couplet text="Chén trà đầu năm thơm lời chúc" className="order-2 md:order-none md:justify-self-end" />
            <div className="order-1 text-center md:order-none">
              <RedEnvelope className="mx-auto mb-4 w-16 -rotate-6 drop-shadow-md" />
              <SectionHeading
                align="center"
                eyebrow="Một hộp quà SIPVY"
                title="Một món quà — Một lời chúc"
                description="Tết là dịp để nói lời cảm ơn. Một hộp trà gọn đẹp, một tấm thiệp ghi đúng tên người nhận, thế là đủ để món quà có chút riêng tư. Chọn trà, chọn lời chúc, SIPVY lo phần còn lại."
                className="mb-0"
              />
            </div>
            <Couplet text="Hộp quà gửi trọn nghĩa xuân sang" className="order-3 md:order-none md:justify-self-start" />
          </div>
        </StorefrontContainer>
      </section>
      <PatternStrip className="bg-[#fff7e6]" tone="red" />

      {/* ============ COMBOS (chỉ hiện khi đã có combo) ============ */}
      {hasCombos && (
        <ProductRail
          id="tiers"
          className="bg-white"
          eyebrow="Hộp quà Tết"
          title="Combo quà Tết"
          description="Giá và tình trạng còn hàng được cập nhật theo từng sản phẩm trong combo."
        >
          <ComboGrid combos={combos} />
        </ProductRail>
      )}

      {display.length > 0 && (
        <ProductRail
          id={hasCombos ? undefined : "tiers"}
          className="bg-[#fff7e6]"
          eyebrow="Chọn trà làm quà"
          title="Trà hợp dịp Tết"
          description={
            hasCombos
              ? undefined
              : "Combo quà Tết đang được chuẩn bị. Bạn có thể chọn từng hộp trà bên dưới, hoặc liên hệ để SIPVY ghép hộp riêng."
          }
          action={
            <Button asChild variant="outline" className="rounded-full border-[#a30f1b]/40 text-[#a30f1b] hover:bg-[#a30f1b]/5">
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
      <section className="storefront-section relative overflow-hidden bg-[#8a0d17] text-[#fff7e6]">
        <div className="absolute inset-0" style={{ backgroundImage: LATTICE_BG }} aria-hidden="true" />
        <StorefrontContainer className="relative">
          <header className="mb-8 text-center">
            <p className={`${script.className} text-3xl text-[#f2c14e]`}>Trọn vẹn từ đặt đến giao</p>
            <h2 className="mt-1 text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-tight tracking-tight text-white">Cam kết của chúng tôi</h2>
          </header>
          <ul className="grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {SERVICES.map((s) => {
              const Icon = s.icon
              return (
                <li key={s.title} className="rounded-xl border border-[#f2c14e]/50 bg-[#5a080f]/60 p-6 backdrop-blur-sm transition-colors hover:border-[#f2c14e]">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#f2c14e] text-[#5a080f]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-[#fbe3a1]">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-[#fff7e6]/85">{s.desc}</p>
                </li>
              )
            })}
          </ul>
        </StorefrontContainer>
      </section>

      {/* ============ TIMELINE ============ */}
      <section className="storefront-section bg-[#fff7e6]">
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
                  className={`flex items-center gap-4 rounded-xl border-2 p-5 md:gap-6 ${
                    i === 0 ? "border-[#a30f1b] bg-[#a30f1b]/5" : "border-[#f2c14e]/60 bg-white"
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#f2c14e] font-bold ${
                      i === 0 ? "bg-[#a30f1b] text-[#fbe3a1]" : "bg-[#fff7e6] text-[#a30f1b]"
                    }`}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="mb-0.5 font-mono text-xs uppercase text-stone-600">{t.date}</p>
                    <h3 className={`font-bold ${i === 0 ? "text-[#a30f1b]" : "text-stone-900"}`}>{t.label}</h3>
                    <p className="mt-0.5 text-sm text-stone-600">{t.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </StorefrontContainer>
      </section>

      {/* ============ CTA ============ */}
      <section className="storefront-section relative overflow-hidden bg-[#5a080f] text-[#fff7e6]">
        <div className="absolute inset-0" style={{ backgroundImage: LATTICE_BG }} aria-hidden="true" />
        <MaiBranch className="pointer-events-none absolute -left-10 -top-6 hidden w-[24%] max-w-[300px] -scale-x-100 opacity-90 md:block" />
        <MaiBranch className="pointer-events-none absolute -right-10 -bottom-6 hidden w-[24%] max-w-[300px] -scale-y-100 opacity-80 md:block" />
        <PatternStrip className="absolute inset-x-0 top-0 opacity-80" />
        <StorefrontContainer className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <RedEnvelope className="mx-auto mb-5 w-14 rotate-3" />
            <SectionHeading
              tone="inverse"
              align="center"
              title="Sẵn sàng đặt quà Tết của bạn?"
              description="Liên hệ để được tư vấn hộp phù hợp, ghi thiệp theo tên người nhận, và sắp lịch giao đến tay người nhận."
              className="mb-8"
            />
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" variant="ghost" className="h-12 rounded-full bg-[#f2c14e] px-7 font-semibold text-[#5a080f] hover:bg-[#fbe3a1] hover:text-[#5a080f]">
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
                className="h-12 rounded-full border-[#f2c14e]/60 bg-transparent px-7 text-[#fbe3a1] hover:bg-white/10 hover:text-white"
              >
                <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                Gửi yêu cầu
              </MarketingButtonLink>
            </div>
            {businessProof && (
              <p className="mt-8 text-xs text-[#fbe3a1]/80">
                <strong className="text-[#fbe3a1]">{businessProof.value}</strong> {businessProof.label.toLowerCase()} dịp Tết những năm qua
              </p>
            )}
          </div>
        </StorefrontContainer>
      </section>
    </>
  )
}
