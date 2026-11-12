import { safeJsonLd } from "@/lib/json-ld"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import {
  ChevronRight,
  Truck,
  ShieldCheck,
  RefreshCw,
  Headphones,
  Star,
  Gift,
  ArrowRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getFeaturedProducts, getCategories, toProductCardData } from "@/lib/data/products"
import { SITE_URL } from "@/lib/config"
import HeroSearch from "@/components/storefront/hero-search"
import { SITE_CONTACT, TESTIMONIALS, publishable } from "@/lib/site-config"
import EditorialHero from "@/components/storefront/editorial-hero"
import NewsletterSection from "@/components/storefront/newsletter-section"
import ProductCard from "@/components/storefront/product-card"
import SectionHeading from "@/components/storefront/section-heading"
import StorefrontContainer from "@/components/storefront/storefront-container"
import TrustSection from "@/components/storefront/trust-section"
import { MarketingButtonLink } from "@/components/storefront/marketing-link"

export const metadata: Metadata = {
  title: "SIPVY - Trà Việt cho người trẻ | Cổ Thụ, Oolong, Sen Tây Hồ",
  description:
    "SIPVY là trà Việt cho người trẻ: dễ pha, dễ uống, hợp nhịp sống mỗi ngày. Trà cổ thụ, oolong, sen Tây Hồ, trà lài. Giao hàng toàn quốc 2–5 ngày làm việc. Đổi trả 7 ngày.",
  keywords: [
    "trà việt nam",
    "trà cổ thụ",
    "trà oolong",
    "trà sen tây hồ",
    "trà lài",
    "mua trà online",
    "trà cho người trẻ",
    "cold brew",
    "quà tặng trà",
    "sipvy",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SIPVY - Trà Việt cho người trẻ",
    description:
      "Trà Việt dễ pha, dễ uống, hợp nhịp sống mỗi ngày: trà cổ thụ, oolong, sen Tây Hồ. Giao hàng toàn quốc.",
    url: "/",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 676,
        alt: "SIPVY - Trà Việt cho người trẻ",
      },
    ],
  },
}



const FALLBACK_CATEGORY_IMG: Record<string, string> = {
  "tra-shan-tuyet": "/san-pham-noi-bat/co-thu.jpg",
  "tra-o-long": "/san-pham-noi-bat/o-long.jpg",
  "tra-sen": "/san-pham-noi-bat/sen-tay-ho.jpeg",
  "tra-xanh": "/san-pham-noi-bat/tra-lai.jpg",
}

const trustBadges = [
  { icon: Truck, title: "Giao hàng toàn quốc", desc: "Dự kiến 2–5 ngày làm việc" },
  { icon: ShieldCheck, title: "Trà Việt từ vùng trà đặc sản", desc: "Thông tin nguồn gốc ghi trên từng sản phẩm" },
  { icon: RefreshCw, title: "Đổi trả 7 ngày", desc: "Khi sản phẩm lỗi do nhà sản xuất" },
  { icon: Headphones, title: `Hỗ trợ ${SITE_CONTACT.supportHours}`, desc: `Hotline ${SITE_CONTACT.hotline}` },
]

const knowledgeSteps = [
  { n: "01", t: "Chọn trà hợp gu", d: "Trà cổ thụ, trà xanh, oolong, trà ướp hương" },
  { n: "02", t: "Pha dễ, không cần rành", d: "Nhiệt độ nước, tỉ lệ trà, thời gian hãm cho từng loại" },
  { n: "03", t: "Thưởng trà mỗi ngày", d: "Cold brew, trà đá, trà nóng cho bàn làm việc" },
]

export default function Home() {
  const featuredProducts = getFeaturedProducts(8)
  const categories = getCategories()

  const visibleCategories = categories.slice(0, 4)
  // Only verified testimonials are shown (see lib/site-config.ts).
  const testimonials = publishable(TESTIMONIALS)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: "SIPVY",
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+84362023048",
          contactType: "customer service",
          areaServed: "VN",
          availableLanguage: "Vietnamese",
        },
        sameAs: ["https://facebook.com/sipvy", "https://instagram.com/sipvy"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "SIPVY",
        publisher: { "@id": `${SITE_URL}/#org` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/san-pham?search={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      ...featuredProducts.slice(0, 4).map((p) => ({
        "@type": "Product",
        name: p.name,
        image: p.images?.[0]?.url || "/placeholder.svg",
        description: p.shortDescription || p.description,
        sku: p.id,
        category: p.category?.name,
        offers: {
          "@type": "Offer",
          priceCurrency: "VND",
          price: p.price,
          availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          url: `${SITE_URL}/san-pham/${p.slug}`,
        },
      })),
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      {/* ============ 1. HERO (the page's only H1) ============ */}
      <EditorialHero contained={false} className="bg-gradient-to-br from-stone-50 via-white to-stone-50">
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
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />

        <StorefrontContainer className="relative flex min-h-[60svh] items-center justify-center py-12 md:min-h-[65svh] md:py-20 lg:min-h-[70svh] lg:py-24">
          <div className="relative w-full max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-green-950 md:text-5xl lg:text-6xl">
              Trà Việt cho người trẻ, nhấp một ngụm là vào nhịp
            </h1>
            <HeroSearch />
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <MarketingButtonLink
                href="/san-pham"
                label="Khám phá sản phẩm"
                location="home_hero"
                size="lg"
                className="h-12 rounded-full bg-green-800 px-7 text-white shadow-md hover:bg-green-900"
              >
                Khám phá sản phẩm
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </MarketingButtonLink>
              <MarketingButtonLink
                href="/hieu-ve-tra"
                label="Chọn trà theo nhu cầu"
                location="home_hero"
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-stone-300 bg-white/80 px-7 text-stone-800 hover:bg-white"
              >
                Chọn trà theo nhu cầu
              </MarketingButtonLink>
            </div>
          </div>
        </StorefrontContainer>
      </EditorialHero>

      {/* ============ 2. CATEGORIES ============ */}
      {visibleCategories.length > 0 && (
        <section className="storefront-section bg-gradient-to-b from-white to-stone-50">
          <StorefrontContainer>
            <SectionHeading
              align="center"
              title="Khám phá theo danh mục"
              description="Mỗi dòng trà một hương vị riêng, chọn theo gu và theo lúc bạn cần"
            />

            <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
              {visibleCategories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/san-pham?category=${cat.slug}`}
                    className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-green-100 shadow-sm transition-all duration-300 hover:shadow-xl"
                  >
                    <Image
                      src={FALLBACK_CATEGORY_IMG[cat.slug] || "/banner/banner_tra-768.webp"}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-900/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white md:p-5">
                      <h3 className="mb-1 text-lg font-semibold md:text-xl">{cat.name}</h3>
                      <span className="flex items-center gap-1 text-xs transition-all group-hover:gap-2 md:text-sm">
                        Xem ngay <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </StorefrontContainer>
        </section>
      )}

      {/* ============ 3. FEATURED PRODUCTS ============ */}
      <section className="storefront-section bg-white">
        <StorefrontContainer>
          <SectionHeading
            eyebrow={
              <span className="inline-flex items-center gap-1">
                <Star className="h-3 w-3 fill-amber-600 text-amber-600" aria-hidden="true" /> Tuyển chọn
              </span>
            }
            title="Sản phẩm nổi bật"
            description="Những dòng trà SIPVY gợi ý để bạn bắt đầu"
            action={
              <Button asChild variant="outline" className="rounded-full border-stone-300 text-stone-800">
                <Link href="/san-pham">
                  Xem tất cả sản phẩm <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            }
          />

          {featuredProducts.length === 0 ? (
            <div className="rounded-2xl border border-stone-200 bg-stone-50 py-16 text-center">
              <p className="text-stone-600">Sản phẩm đang được cập nhật...</p>
              <Link href="/san-pham" className="mt-2 inline-block text-sm text-green-800 hover:underline">
                Xem danh mục sản phẩm →
              </Link>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
              {featuredProducts.map((product, index) => (
                <li key={product.id}>
                  <ProductCard item={toProductCardData(product)} priority={index < 2} />
                </li>
              ))}
            </ul>
          )}
        </StorefrontContainer>
      </section>

      {/* ============ 4. QUALITY PROOF (single trust strip) ============ */}
      <TrustSection title="Cam kết khi mua trà tại SIPVY" className="border-y border-stone-200 bg-stone-50">
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {trustBadges.map((b) => {
            const Icon = b.icon
            return (
              <li key={b.title} className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-green-800 shadow-sm">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-snug text-stone-900">{b.title}</p>
                  <p className="mt-1 text-xs leading-5 text-stone-600">{b.desc}</p>
                </div>
              </li>
            )
          })}
        </ul>

        {testimonials.length > 0 && (
          <div className="mt-12">
            <SectionHeading level={3} align="center" title="Khách hàng nói gì về SIPVY" />
            <ul className="grid gap-5 md:grid-cols-3 md:gap-6">
              {testimonials.map((t) => (
                <li key={t.name}>
                  <Card className="h-full border-stone-200 bg-white shadow-sm">
                    <CardContent className="p-6">
                      <p className="mb-3 flex" role="img" aria-label={`${t.rating} trên 5 sao`}>
                        {Array.from({ length: t.rating }, (_, j) => (
                          <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                        ))}
                      </p>
                      <blockquote className="mb-5 leading-relaxed text-stone-700">&ldquo;{t.content}&rdquo;</blockquote>
                      <p className="border-t border-stone-200 pt-4 text-sm font-semibold text-stone-900">
                        {t.name} <span className="font-normal text-stone-600">· {t.role}</span>
                      </p>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        )}
      </TrustSection>

      {/* ============ 5. TEA KNOWLEDGE ============ */}
      <section className="storefront-section bg-white">
        <StorefrontContainer>
          <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-14">
            <div className="order-2 md:order-1">
              <SectionHeading
                eyebrow="Hiểu về trà"
                title="Pha trà dễ hơn bạn nghĩ"
                description="Không cần biết trà, vẫn pha được tách ngon. Xem nhanh các loại trà Việt và cách pha để mỗi lần nhấp đều đúng vị."
                className="mb-7"
              />
              <ol className="mb-7 space-y-5">
                {knowledgeSteps.map((step) => (
                  <li key={step.n} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-stone-200 bg-stone-100 font-bold text-green-800" aria-hidden="true">
                      {step.n}
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-stone-900">{step.t}</h3>
                      <p className="text-sm text-stone-600">{step.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <MarketingButtonLink
                href="/hieu-ve-tra"
                label="Tìm hiểu thêm"
                location="home_knowledge"
                className="h-11 rounded-full bg-green-800 px-6 text-white hover:bg-green-900"
              >
                Tìm hiểu thêm
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </MarketingButtonLink>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-md md:aspect-[3/4]">
                <Image
                  src="/banner/hieu-ve-tra.jpg"
                  alt="Đồi trà xanh"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </StorefrontContainer>
      </section>

      {/* ============ 6. SEASONAL BANNER (Quà Tết) ============ */}
      <section className="storefront-section bg-green-900 text-white">
        <StorefrontContainer>
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <SectionHeading
                tone="inverse"
                eyebrow={
                  <span className="inline-flex items-center gap-1">
                    <Gift className="h-3 w-3" aria-hidden="true" /> Bộ sưu tập đặc biệt
                  </span>
                }
                title="Quà Tết SIPVY 2027 — Chén trà đầu xuân"
                description="Hộp quà trà gọn đẹp, kèm thiệp cá nhân hóa. Đặt sớm để được hỗ trợ thiết kế và có thêm thời gian giao hàng."
                className="mb-6"
              />
              <div className="flex flex-wrap gap-3">
                <MarketingButtonLink
                  href="/qua-tet"
                  label="Khám phá Quà Tết"
                  location="home_tet_banner"
                  size="lg"
                  className="h-12 rounded-full bg-amber-300 px-7 font-semibold text-stone-900 hover:bg-amber-200"
                >
                  Khám phá Quà Tết
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </MarketingButtonLink>
                <MarketingButtonLink
                  href="/qua-tang"
                  label="Xem quà tặng"
                  location="home_tet_banner"
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-stone-400/40 bg-transparent px-7 text-white hover:bg-white/10 hover:text-white"
                >
                  Xem quà tặng
                </MarketingButtonLink>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                <Image src="/banner/hieu-ve-tra.jpg" alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 max-w-[200px] rounded-xl bg-white p-4 shadow-lg">
                <p className="text-2xl font-bold text-amber-800">Đặt sớm</p>
                <p className="text-xs text-stone-700">Để kịp giao trước Tết</p>
              </div>
            </div>
          </div>
        </StorefrontContainer>
      </section>

      {/* ============ 7. NEWSLETTER ============ */}
      <NewsletterSection
        source="home"
        className="bg-gradient-to-br from-stone-50 to-amber-50/30"
        icon={<Gift className="h-6 w-6" aria-hidden="true" />}
        title="Nhận tin từ SIPVY"
        description="Đăng ký để cập nhật trà mới, mẹo pha trà và công thức cold brew qua email."
      />
    </>
  )
}
