import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, Instagram, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { getLandingProductCards } from "@/lib/data/products"
import Breadcrumb from "@/components/storefront/breadcrumb"
import ProductCard from "@/components/storefront/product-card"
import ProductRail from "@/components/storefront/product-rail"
import StorefrontContainer from "@/components/storefront/storefront-container"

import MoodMatcher from "./mood-matcher"
import QuickRecipes from "./quick-recipes"

export const metadata: Metadata = {
  title: "Trà cho người trẻ - Cold Brew, Matcha, Trà sữa mộc | SIPVY",
  description:
    "Trà SIPVY cho người trẻ: cold brew ủ lạnh, matcha đá, trà sữa mộc pha tại nhà. Dễ pha, tự chọn độ ngọt, hợp góc làm việc của bạn.",
  alternates: { canonical: "/tra-cho-genz" },
  openGraph: {
    title: "Trà cho người trẻ | SIPVY",
    description: "Cold brew, matcha, trà sữa mộc: pha nhanh tại bàn làm việc, tự chọn độ ngọt",
    url: "/tra-cho-genz",
    images: [{ url: "/banner/banner_tra-1200.webp", width: 1200, height: 676, alt: "Trà SIPVY cho người trẻ" }],
  },
}

export default function GenZPage() {
  const displayProducts = getLandingProductCards(
    (p) => /matcha|oolong|ô long/i.test(p.name) || p.tags.some((t) => ["genz", "matcha", "cold-brew", "tra-sua", "ice"].includes(t)),
    8,
  )

  return (
    <div className="bg-white">
      {/* ============ TOP PROMO BAR ============ */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-700 text-white text-xs py-2.5 px-4 text-center font-medium flex items-center justify-center gap-2.5">
        <span className="inline-block px-2 py-0.5 rounded-full bg-white/20 text-white font-bold text-[10px] uppercase tracking-wider">
          Trà cho người trẻ
        </span>
        <span>
          Chọn trà theo tâm trạng, thêm vào giỏ và gửi yêu cầu đặt hàng. SIPVY liên hệ xác nhận từng đơn.
        </span>
        <a href="#mood-matcher" className="underline underline-offset-4 hover:text-emerald-200 font-semibold ml-1">
          Chọn trà ngay →
        </a>
      </div>

      {/* ============ HERO SECTION ============ */}
      <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden bg-gradient-to-b from-emerald-50/50 via-white to-white border-b border-slate-100">
        <StorefrontContainer>
          <div className="mb-6">
            <Breadcrumb items={[{ href: "/", label: "Trang chủ" }, { label: "Trà cho người trẻ" }]} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-800 text-xs font-bold tracking-wide border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Trà Việt cho người trẻ — dễ pha, dễ uống</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.12] tracking-tight">
                Trà cho người trẻ.
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500">
                  Dễ pha, tự chọn độ ngọt,
                </span>
                pha gọn, không cầu kỳ.
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
                Không cần dụng cụ cầu kỳ. SIPVY gợi ý cách pha trà Việt theo phong cách <strong>Cold Brew ủ lạnh, Matcha đá và Trà sữa mộc</strong> — gọn, đẹp mắt trên bàn làm việc và hợp gu người trẻ.
              </p>

              {/* Visual Micro Chips */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                <span className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-semibold flex items-center gap-2 shadow-2xs">
                  <span className="relative w-5 h-5 rounded-md overflow-hidden shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=60&auto=format&fit=crop&q=80"
                      alt="Cold brew"
                      fill
                      sizes="20px"
                      className="object-cover"
                    />
                  </span>
                  Cold brew tủ lạnh qua đêm
                </span>
                <span className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-semibold flex items-center gap-2 shadow-2xs">
                  <span className="relative w-5 h-5 rounded-md overflow-hidden shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=60&auto=format&fit=crop&q=80"
                      alt="Matcha"
                      fill
                      sizes="20px"
                      className="object-cover"
                    />
                  </span>
                  Pha nhanh tại bàn làm việc
                </span>
                <span className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-semibold flex items-center gap-2 shadow-2xs">
                  <span className="relative w-5 h-5 rounded-md overflow-hidden shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=60&auto=format&fit=crop&q=80"
                      alt="Tea leaf"
                      fill
                      sizes="20px"
                      className="object-cover"
                    />
                  </span>
                  Túi lọc tam giác tiện pha
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Button asChild size="lg" className="h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 px-7">
                  <a href="#mood-matcher">
                    Chọn trà theo Mood hôm nay
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 rounded-xl border-slate-300 bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm px-7">
                  <a href="#products">Xem sản phẩm</a>
                </Button>
              </div>

              {/* Social Proof Bar */}
              <div className="pt-5 border-t border-slate-100 flex items-center gap-4">
                <div className="text-xs text-slate-600">
                  <p>
                    <span className="font-bold text-slate-900">Góc làm việc của bạn</span> có thể thêm một bình cold brew
                  </p>
                  <p className="text-[11px] text-slate-500">Chọn trà theo tâm trạng, chuẩn bị trong vài phút</p>
                </div>
              </div>
            </div>

            {/* Right Card Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-3xl blur-xl opacity-30" />
                
                <div className="relative bg-white p-4 sm:p-5 rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
                  <div className="relative h-[380px] sm:h-[420px] rounded-2xl overflow-hidden group">
                    <Image
                      src="https://images.unsplash.com/photo-1556881286-fc6915169721?w=800&auto=format&fit=crop&q=80"
                      alt="Ly Cold Brew Trà thảo mộc tươi mát"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 500px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-900 flex items-center gap-2 shadow-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Cold Brew Oolong
                    </div>

                    <div className="absolute top-4 right-4 bg-emerald-500 text-white px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider">
                      Gợi ý hôm nay
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-xs tracking-wider uppercase text-emerald-300 font-bold">
                        Khoảnh khắc 14:00
                      </span>
                      <h3 className="text-xl font-bold mt-0.5">Chiều làm việc, một ly trà ủ lạnh</h3>
                      <div className="mt-2 text-xs text-slate-200">
                        Chuẩn bị vài phút tối hôm trước — sáng mai có ngay
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3.5 bg-emerald-50/70 rounded-2xl flex items-center justify-between border border-emerald-200/60">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-emerald-200">
                        <Image
                          src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=80&auto=format&fit=crop&q=80"
                          alt="Cold brew step"
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Cách pha Cold Brew siêu dễ</div>
                        <div className="text-[11px] text-slate-600">Thả túi trà vào nước lạnh → bỏ ngăn mát 6-8h</div>
                      </div>
                    </div>
                    <a href="#recipe" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline">
                      Xem ngay
                    </a>
                  </div>
                </div>

                <div className="absolute -bottom-5 -left-5 bg-slate-900 text-white w-24 h-24 rounded-full p-2 flex flex-col items-center justify-center text-center shadow-xl border-4 border-white">
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-emerald-400">Trà Việt</span>
                  <span className="text-xs font-extrabold text-white">SIPVY</span>
                  <span className="text-[8px] text-slate-400">Dễ pha</span>
                </div>
              </div>
            </div>

          </div>
        </StorefrontContainer>
      </section>

      {/* ============ INTERACTIVE 1: MOOD MATCHER ============ */}
      <MoodMatcher />

      {/* ============ INTERACTIVE 3: QUICK RECIPES ============ */}
      <QuickRecipes />

      {/* ============ PRODUCTS RAIL FROM DATABASE ============ */}
      <ProductRail
        id="products"
        className="bg-slate-50 border-t border-slate-200"
        eyebrow="Gợi ý cho bạn"
        title="Trà dễ pha cho bàn làm việc"
        description="Chọn theo gu, pha nhanh tại nhà hoặc tại văn phòng"
      >
        {displayProducts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-slate-600">Sản phẩm đang được cập nhật...</p>
            <Link href="/san-pham" className="mt-2 inline-block text-emerald-700 hover:underline font-semibold text-sm">
              Xem toàn bộ sản phẩm →
            </Link>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {displayProducts.map((item) => (
              <li key={item.slug}>
                <ProductCard item={item} />
              </li>
            ))}
          </ul>
        )}
      </ProductRail>

      {/* ============ LIFESTYLE DESK GALLERY (#SipVyDeskClub) ============ */}
      <section id="desk-vibe" className="py-16 md:py-24 bg-white border-t border-slate-100">
        <StorefrontContainer>
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.2em] font-extrabold text-emerald-600 block mb-2">
              #SipVyDeskClub
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Góc làm việc có một bình cold brew</h2>
            <p className="text-slate-600 text-sm mt-2">
              Gợi ý vài cách bày trà trên bàn làm việc. Chụp góc bàn của bạn và tag <strong className="text-slate-900 font-bold">@sipvy</strong> trên Instagram & TikTok.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative group rounded-2xl overflow-hidden aspect-square bg-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&auto=format&fit=crop&q=80"
                alt="Desk setup 1"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs p-4 text-center">
                <span>Gợi ý: bình cold brew đặt cạnh laptop</span>
              </div>
            </div>

            <div className="relative group rounded-2xl overflow-hidden aspect-square bg-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1498804103079-a6351b050096?w=500&auto=format&fit=crop&q=80"
                alt="Desk setup 2"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs p-4 text-center">
                <span>Gợi ý: bộ pha trà tối giản trên bàn</span>
              </div>
            </div>

            <div className="relative group rounded-2xl overflow-hidden aspect-square bg-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&auto=format&fit=crop&q=80"
                alt="Desk setup 3"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs p-4 text-center">
                <span>Gợi ý: matcha đá cùng sữa yến mạch</span>
              </div>
            </div>

            <div className="relative group rounded-2xl overflow-hidden aspect-square bg-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=500&auto=format&fit=crop&q=80"
                alt="Desk setup 4"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs p-4 text-center">
                <span>Gợi ý: trà ủ lạnh mang đi làm</span>
              </div>
            </div>
          </div>
        </StorefrontContainer>
      </section>

      {/* ============ FAQ SECTION ============ */}
      <section id="faq" className="py-16 bg-slate-50 border-t border-slate-200">
        <StorefrontContainer className="max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Những câu hỏi thường gặp</h2>
            <p className="text-xs text-slate-500 mt-1">Vài câu hỏi hay gặp khi bắt đầu pha trà</p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            <AccordionItem value="faq-1" className="bg-white px-5 rounded-2xl border border-slate-200/80">
              <AccordionTrigger className="text-sm font-bold text-slate-900 hover:no-underline">
                Uống trà buổi tối có sao không?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-slate-600 leading-relaxed pt-1 pb-4">
                Trà làm từ lá trà (xanh, oolong, đen) có caffeine, lượng khác nhau tuỳ loại và cách pha. Nếu bạn nhạy cảm với caffeine, hãy uống sớm trong ngày hoặc chọn trà thảo mộc không chứa lá trà; kiểm tra thành phần ở trang sản phẩm hoặc hỏi SIPVY qua hotline.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-2" className="bg-white px-5 rounded-2xl border border-slate-200/80">
              <AccordionTrigger className="text-sm font-bold text-slate-900 hover:no-underline">
                Túi lọc tam giác dùng thế nào?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-slate-600 leading-relaxed pt-1 pb-4">
                Bạn pha theo hướng dẫn trên bao bì hoặc ở trang sản phẩm. Chất liệu túi lọc được ghi theo từng sản phẩm; nếu cần biết thêm, hãy hỏi SIPVY qua hotline. Sau khi dùng, vui lòng bỏ vào thùng rác theo quy định của địa phương.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-3" className="bg-white px-5 rounded-2xl border border-slate-200/80">
              <AccordionTrigger className="text-sm font-bold text-slate-900 hover:no-underline">
                Giao hàng trong bao lâu?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-slate-600 leading-relaxed pt-1 pb-4">
                Thời gian giao dự kiến 2–5 ngày làm việc trên toàn quốc, sau 1 ngày xử lý đơn. Khi nhận hàng, bạn nên kiểm tra số kiện và tình trạng hộp; nếu có vấn đề, chụp ảnh và báo SIPVY trong 24 giờ. Chi tiết xem ở Chính sách vận chuyển.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </StorefrontContainer>
      </section>

      {/* ============ COMMUNITY CTA ============ */}
      <section className="py-16 md:py-20 bg-slate-900 text-white border-t border-slate-800">
        <StorefrontContainer className="max-w-2xl text-center">
          <Sparkles className="mx-auto mb-4 h-10 w-10 text-emerald-400" aria-hidden="true" />
          <h2 className="text-3xl font-extrabold mb-3">Tag #SipVy — Khoe góc bàn của bạn</h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-8">
            Chụp tách trà của bạn tại bàn học hoặc bàn làm việc, tag <strong className="text-white">@sipvy</strong> + hashtag{" "}
            <strong className="text-emerald-400">#SipVyDeskClub</strong>. SIPVY có thể xin phép chia sẻ lại ảnh của bạn.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="h-12 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-7">
              <a href="https://instagram.com/sipvy" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 h-4 w-4" aria-hidden="true" />
                Theo dõi Instagram @sipvy
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-xl border-slate-700 bg-transparent text-white hover:bg-white/10 px-7">
              <Link href="/san-pham">Khám phá toàn bộ sản phẩm</Link>
            </Button>
          </div>
        </StorefrontContainer>
      </section>
    </div>
  )
}
