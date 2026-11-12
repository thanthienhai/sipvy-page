import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import {
  ArrowRight,
  Heart,
  Leaf,
  Moon,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { getRecentArticles } from "@/lib/data/articles"
import Breadcrumb from "@/components/storefront/breadcrumb"
import StorefrontContainer from "@/components/storefront/storefront-container"
import SupportNav from "@/components/storefront/support-nav"
import { MarketingButtonLink } from "@/components/storefront/marketing-link"
import BrewFinder from "./brew-finder"

export const metadata: Metadata = {
  title: "Hiểu về trà - Cách pha trà dễ, đúng vị",
  description:
    "Hướng dẫn pha trà dễ hiểu cho người mới: phân loại trà (xanh, oolong, đen, hương hoa), nhiệt độ nước, thời gian hãm, tỉ lệ trà và cách thưởng thức hằng ngày.",
  alternates: { canonical: "/hieu-ve-tra" },
  openGraph: {
    title: "Hiểu về trà — Pha trà dễ, đúng vị",
    description: "Phân loại trà, cách pha và thói quen thưởng trà mỗi ngày",
    url: "/hieu-ve-tra",
  },
}

const TEA_TYPES = [
  {
    name: "Trà Xanh",
    desc: "Không lên men, giữ hương vị tươi mát, vị thanh. Hợp pha nóng hoặc ủ lạnh.",
    temp: "75–85°C",
    time: "1–2 phút",
    swatch: "bg-green-700",
  },
  {
    name: "Trà Oolong",
    desc: "Bán lên men (15–70%), hương vị phức tạp giữa trà xanh và trà đen.",
    temp: "85–95°C",
    time: "2–3 phút",
    swatch: "bg-amber-700",
  },
  {
    name: "Trà Đen",
    desc: "Lên men hoàn toàn, vị đậm, hậu ngọt. Hợp pha cùng sữa để làm trà sữa tại nhà.",
    temp: "95–100°C",
    time: "3–5 phút",
    swatch: "bg-stone-700",
  },
  {
    name: "Trà Hương Hoa",
    desc: "Ướp hương sen, lài, hoa cúc. Thơm nhẹ, dễ uống, hợp cho người mới.",
    temp: "80–90°C",
    time: "2–3 phút",
    swatch: "bg-orange-700",
  },
]

const BREWING_GUIDE = [
  {
    title: "Tráng ấm và trà",
    desc: "Tráng ấm bằng nước sôi để làm sạch và làm nóng. Rót nước sôi vào trà rồi đổ đi ngay (trà cũ tráng 5 giây, trà mới có thể bỏ qua).",
  },
  {
    title: "Hãm trà lần 1",
    desc: "Rót nước ở nhiệt độ phù hợp theo loại trà. Hãm đúng thời gian khuyến nghị — hãm quá lâu trà sẽ bị chát.",
  },
  {
    title: "Rót và thưởng thức",
    desc: "Rót đều vào các chén nhỏ, xoay vòng để vị đều giữa các chén. Cảm nhận hương trước, rồi nhấp từng ngụm nhỏ.",
  },
  {
    title: "Pha lại nhiều lần",
    desc: "Nhiều loại trà có thể pha 5–7 lần. Mỗi lần tăng thời gian hãm thêm 10–20 giây; vị trà sẽ đổi qua từng lần pha.",
  },
]

const BENEFITS = [
  { icon: Zap, title: "Có caffeine", desc: "Trà xanh, oolong, trà đen đều có caffeine; lượng khác nhau tuỳ loại và cách pha." },
  { icon: Heart, title: "Uống cùng bạn bè", desc: "Một ấm trà nhỏ là cớ hay để ngồi lại với nhau." },
  { icon: Leaf, title: "Tự chọn độ ngọt", desc: "Pha tại nhà nên bạn tự quyết định thêm đường, mật hay để nguyên vị trà." },
  { icon: Sparkles, title: "Một lá trà, nhiều vị", desc: "Cùng một loài cây, cách chế biến khác nhau cho vị rất khác nhau." },
  { icon: ShieldCheck, title: "Pha lạnh cũng được", desc: "Cold brew: ủ trà trong nước lạnh vài giờ cho vị êm, ít chát." },
  { icon: Moon, title: "Buổi tối nhẹ nhàng", desc: "Trà thảo mộc hoặc trà hương dịu là lựa chọn quen thuộc cho buổi tối." },
]

const TEMPERATURE_TABLE = [
  ["Trà xanh", "75–85°C", "1–2 phút", "3g / 150ml"],
  ["Trà oolong nhẹ", "85–90°C", "2–3 phút", "5g / 150ml"],
  ["Trà oolong đậm", "90–95°C", "2–3 phút", "5g / 150ml"],
  ["Trà đen", "95–100°C", "3–5 phút", "3g / 200ml"],
  ["Trà cổ thụ", "95°C", "20–30 giây (công phu)", "8g / 100ml"],
  ["Trà hương hoa", "80–90°C", "2–3 phút", "3g / 150ml"],
]

const QUICK_NAV = [
  { href: "#tra-cach-pha", label: "Tra cách pha" },
  { href: "#cach-pha", label: "4 bước cơ bản" },
  { href: "#bang-tra", label: "Bảng tra nhanh" },
  { href: "#phan-loai", label: "Phân loại trà" },
  { href: "#suc-khoe", label: "Trà mỗi ngày" },
]

const eyebrowClass = "text-xs font-semibold uppercase tracking-[0.16em] text-green-700"
const headingClass = "mt-2 text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-tight tracking-tight text-stone-950"

export default function TeaKnowledgePage() {
  const articles = getRecentArticles(3)
  return (
    <div className="bg-stone-50/70">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-green-950 text-stone-100">
        <Image src="/banner/hieu-ve-tra.jpg" alt="" fill sizes="100vw" className="object-cover opacity-30" priority />
        <div className="absolute inset-0 bg-green-950/55" aria-hidden="true" />

        <StorefrontContainer className="relative pb-14 pt-8 md:pb-20">
          <Breadcrumb tone="dark" className="mb-10 md:mb-12" items={[{ href: "/", label: "Trang chủ" }, { label: "Hiểu về trà" }]} />

          <Badge className="border-0 bg-amber-300 text-amber-950 hover:bg-amber-300">
            <Leaf className="mr-1 h-3.5 w-3.5" aria-hidden="true" /> Pha trà cho người mới
          </Badge>

          <h1 className="mt-4 max-w-[18ch] text-[clamp(2.25rem,5.4vw,4rem)] font-semibold leading-[1.05] tracking-tight text-white">
            Pha một ấm trà <span className="whitespace-nowrap text-amber-300">đúng vị</span>
          </h1>

          <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-stone-200">
            Nhiệt độ, thời gian hãm và tỉ lệ trà là ba điều quyết định một tách trà ngon. Chọn loại trà bạn có, SIPVY chỉ bạn cách pha.
          </p>

          <nav aria-label="Mục trong trang" className="mt-8 flex flex-wrap gap-2">
            {QUICK_NAV.map((a, i) => (
              <a
                key={a.href}
                href={a.href}
                className={
                  i === 0
                    ? "flex h-11 items-center rounded-full bg-white px-[18px] text-sm font-semibold text-green-950 transition-colors hover:bg-stone-100"
                    : "flex h-11 items-center rounded-full bg-white/10 px-[18px] text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                }
              >
                {a.label}
              </a>
            ))}
          </nav>
        </StorefrontContainer>
      </section>
      <SupportNav current="/hieu-ve-tra" />

      {/* ============ BREW FINDER ============ */}
      <StorefrontContainer className="pt-14 md:pt-16">
        <section id="tra-cach-pha" aria-labelledby="brew-finder-heading" className="scroll-mt-24">
          <p className={eyebrowClass}>Tra cách pha</p>
          <h2 id="brew-finder-heading" className={headingClass}>Bạn đang có loại trà nào?</h2>
          <p className="mt-2.5 max-w-[62ch] text-base leading-relaxed text-stone-600">
            Chọn một loại để xem nhiệt độ nước, thời gian hãm và lượng trà khuyến nghị.
          </p>
          <BrewFinder />
        </section>
      </StorefrontContainer>

      {/* ============ 4 STEPS ============ */}
      <StorefrontContainer className="pt-16 md:pt-20">
        <section id="cach-pha" aria-labelledby="steps-heading" className="scroll-mt-24">
          <p className={eyebrowClass}>4 bước cơ bản</p>
          <h2 id="steps-heading" className={headingClass}>Cách pha trà chuẩn</h2>
          <p className="mt-2.5 max-w-[62ch] text-base leading-relaxed text-stone-600">
            Mỗi loại trà có cách pha riêng, nhưng đều theo 4 bước này. Làm đúng, tách trà sẽ đúng vị hơn.
          </p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BREWING_GUIDE.map((s, i) => {
              const last = i === BREWING_GUIDE.length - 1
              return (
                <li
                  key={s.title}
                  className={last ? "flex flex-col gap-3 rounded-[20px] bg-green-950 p-6 text-white" : "flex flex-col gap-3 rounded-[20px] border border-stone-200 bg-white p-6"}
                >
                  <span aria-hidden="true" className={last ? "text-[44px] font-bold leading-none tracking-tighter text-amber-300" : "text-[44px] font-bold leading-none tracking-tighter text-green-800"}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className={last ? "text-sm leading-relaxed text-green-100" : "text-sm leading-relaxed text-stone-600"}>{s.desc}</p>
                </li>
              )
            })}
          </ol>
        </section>
      </StorefrontContainer>

      {/* ============ QUICK TABLE ============ */}
      <StorefrontContainer className="pt-16 md:pt-20">
        <section id="bang-tra" aria-labelledby="table-heading" className="grid scroll-mt-24 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-14">
          <div>
            <p className={eyebrowClass}>Bảng tra nhanh</p>
            <h2 id="table-heading" className={headingClass}>Nhiệt độ &amp; thời gian hãm</h2>
            <p className="mt-2.5 text-[15px] leading-relaxed text-stone-600">Lưu lại hoặc chụp màn hình để dùng mỗi khi pha.</p>
          </div>
          <div className="overflow-x-auto rounded-[20px] border border-stone-200 bg-white">
            <table className="w-full min-w-[520px] text-[15px]">
              <caption className="sr-only">Nhiệt độ nước, thời gian hãm và tỉ lệ trà theo từng loại trà</caption>
              <thead>
                <tr className="border-b border-stone-200 text-left text-[13px] text-stone-500">
                  <th scope="col" className="px-5 py-4 font-semibold">Loại trà</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Nhiệt độ</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Thời gian</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Tỉ lệ trà/nước</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {TEMPERATURE_TABLE.map((row) => (
                  <tr key={row[0]} className="transition-colors hover:bg-stone-50">
                    <th scope="row" className="px-5 py-3.5 text-left font-semibold text-stone-900">{row[0]}</th>
                    <td className="px-5 py-3.5 text-stone-700">{row[1]}</td>
                    <td className="px-5 py-3.5 text-stone-700">{row[2]}</td>
                    <td className="px-5 py-3.5 text-stone-700">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </StorefrontContainer>

      {/* ============ TEA TYPES ============ */}
      <StorefrontContainer className="pt-16 md:pt-20">
        <section id="phan-loai" aria-labelledby="types-heading" className="scroll-mt-24">
          <p className={eyebrowClass}>4 dòng trà chính</p>
          <h2 id="types-heading" className={headingClass}>Phân loại trà Việt</h2>
          <p className="mt-2.5 max-w-[64ch] text-base leading-relaxed text-stone-600">
            Tất cả trà đều từ một loài cây <em>Camellia sinensis</em>, nhưng cách chế biến tạo ra hương vị hoàn toàn khác.
          </p>
          <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TEA_TYPES.map((t) => (
              <li key={t.name} className="flex flex-col gap-2.5 rounded-[20px] border border-stone-200 bg-white p-6">
                <span className={`h-10 w-10 rounded-xl ${t.swatch}`} aria-hidden="true" />
                <h3 className="mt-1.5 text-[19px] font-semibold text-stone-950">{t.name}</h3>
                <p className="flex-1 text-sm leading-relaxed text-stone-600">{t.desc}</p>
                <p className="flex gap-3.5 border-t border-stone-100 pt-3 text-[13px] font-medium text-stone-700">
                  <span>{t.temp}</span>
                  <span>{t.time}</span>
                </p>
              </li>
            ))}
          </ul>
        </section>
      </StorefrontContainer>

      {/* ============ HEALTH ============ */}
      <StorefrontContainer className="pt-16 md:pt-20">
        <section id="suc-khoe" aria-labelledby="health-heading" className="scroll-mt-24 rounded-[28px] bg-[#f3f1ea] p-6 md:p-12">
          <p className={eyebrowClass}>Trà mỗi ngày</p>
          <h2 id="health-heading" className={headingClass}>6 điều thú vị về trà</h2>
          <p className="mt-2.5 text-sm leading-relaxed text-stone-600">
            Thông tin tham khảo về thói quen thưởng trà, không phải lời khuyên y tế hay công dụng của sản phẩm.
          </p>
          <ul className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => {
              const Icon = b.icon
              return (
                <li key={b.title} className="flex gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-green-800">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-stone-950">{b.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-stone-600">{b.desc}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      </StorefrontContainer>

      {/* ============ ARTICLES ============ */}
      <StorefrontContainer className="pt-16 md:pt-20">
        {articles.length > 0 && (
        <section aria-labelledby="articles-heading">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className={eyebrowClass}>Bài viết chuyên sâu</p>
              <h2 id="articles-heading" className={headingClass}>Khám phá thêm</h2>
            </div>
            <Link
              href="/tin-tuc"
              className="flex h-11 items-center rounded-full border border-stone-300 px-[18px] text-sm font-semibold text-stone-800 transition-colors hover:border-stone-400 hover:bg-white"
            >
              Xem tất cả bài viết
            </Link>
          </div>

          <ul className="mt-7 grid gap-5 md:grid-cols-3">
              {articles.map((a) => (
                <li key={a.slug}>
                  <Link href={`/tin-tuc/${a.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-stone-200 bg-white transition-all hover:border-green-700 hover:shadow-md">
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                      <Image
                        src={a.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-xs text-stone-500">{a.category} · {a.readTime}</p>
                      <h3 className="mt-2 line-clamp-2 text-[17px] font-semibold text-stone-950 transition-colors group-hover:text-green-800">{a.title}</h3>
                      <p className="mt-2 line-clamp-2 flex-1 text-sm text-stone-600">{a.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-green-800 transition-all group-hover:gap-2">
                        Đọc tiếp <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
        )}
      </StorefrontContainer>

      {/* ============ CTA ============ */}
      <StorefrontContainer className="pb-16 pt-16 md:pb-20 md:pt-20">
        <section aria-labelledby="cta-heading" className="flex flex-wrap items-center justify-between gap-6 rounded-[28px] bg-green-950 p-7 text-white md:p-14">
          <div className="max-w-xl">
            <h2 id="cta-heading" className="text-[clamp(1.6rem,3vw,2.1rem)] font-semibold leading-tight tracking-tight">Sẵn sàng thưởng thức?</h2>
            <p className="mt-2.5 text-base leading-relaxed text-green-100">
              Chọn một gói trà SIPVY và pha thử ngay hôm nay.
            </p>
          </div>
          <MarketingButtonLink
            href="/san-pham"
            label="Mua trà ngay"
            location="tea_knowledge_footer"
            size="lg"
            className="h-[52px] rounded-full bg-amber-300 px-7 font-semibold text-stone-900 hover:bg-amber-200"
          >
            Mua trà ngay
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </MarketingButtonLink>
        </section>
      </StorefrontContainer>
    </div>
  )
}
