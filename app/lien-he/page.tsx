import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Facebook,
  Instagram,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SITE_CONTACT } from "@/lib/site-config"
import { cn } from "@/lib/utils"
import ContactForm from "@/components/storefront/contact-form"
import PageHeader from "@/components/storefront/page-header"
import StorefrontContainer from "@/components/storefront/storefront-container"
import SupportNav from "@/components/storefront/support-nav"
import SupportStatus from "@/components/storefront/support-status"

export const metadata: Metadata = {
  title: "Liên hệ SIPVY | Hotline 0362 023 048",
  description:
    "Liên hệ SIPVY: hotline 0362 023 048, email sipvy@sipvy.com. Hỗ trợ tư vấn sản phẩm, đơn hàng, hợp tác doanh nghiệp và quà tặng số lượng lớn.",
  alternates: { canonical: "/lien-he" },
  openGraph: {
    title: "Liên hệ SIPVY",
    description: "Hotline 0362 023 048 — hỗ trợ tư vấn, đặt hàng, hợp tác",
    url: "/lien-he",
  },
}

const FAQ = [
  {
    q: "SIPVY có giao hàng toàn quốc không?",
    a: "Có, chúng tôi giao hàng đến tất cả tỉnh thành Việt Nam. Phí vận chuyển được tính và hiển thị tại bước thanh toán. Thời gian giao dự kiến 2–5 ngày làm việc, chi tiết xem tại Chính sách vận chuyển.",
  },
  {
    q: "Làm sao biết trà của SIPVY là thật, không pha trộn?",
    a: "Mọi sản phẩm SIPVY đều có tem chống giả, mã QR truy xuất nguồn gốc. Trà được tuyển trực tiếp từ vùng đặc sản (Hà Giang, Mộc Châu, Bảo Lộc...) và sao thủ công theo phương pháp truyền thống.",
  },
  {
    q: "Tôi có thể đặt quà tặng doanh nghiệp với số lượng lớn không?",
    a: "Có. Chúng tôi nhận đơn từ 50 hộp trở lên, hỗ trợ thiết kế hộp in logo, thiệp cá nhân hoá, giao hàng đến nhiều địa chỉ. Liên hệ hotline để được báo giá riêng trong 24h.",
  },
  {
    q: "Chính sách đổi trả như thế nào?",
    a: "Đổi trả miễn phí trong 7 ngày nếu sản phẩm có lỗi do nhà sản xuất (móp hộp, hỏng tem, sai sản phẩm). Sản phẩm phải còn nguyên seal, chưa qua sử dụng.",
  },
  {
    q: "SIPVY có cửa hàng trực tiếp không?",
    a: "Hiện tại chúng tôi chỉ bán online và đang xây dựng cửa hàng trải nghiệm đầu tiên tại Hà Nội. Bạn có thể đặt hẹn tham quan kho/xưởng tại Bắc Ninh qua hotline.",
  },
  {
    q: "Có chương trình thành viên hoặc tích điểm không?",
    a: "Có. Khi đăng ký tài khoản, bạn tự động trở thành thành viên SIPVY. Mỗi đơn hàng tích 1% giá trị về ví, có thể dùng cho lần mua sau. Sinh nhật được tặng voucher 10%.",
  },
]

const CONTACT_CHANNELS = [
  {
    icon: MessageCircle,
    title: "Messenger / Zalo",
    description: "Hỏi nhanh về sản phẩm, tồn kho, mã giảm giá.",
    cta: "Nhắn tin ngay",
    href: "https://m.me/sipvy",
    badge: "Nhanh nhất",
  },
  {
    icon: Phone,
    title: `Hotline ${SITE_CONTACT.hotline}`,
    description: "Đơn đang giao, cần đổi địa chỉ hoặc xử lý gấp.",
    cta: `Gọi ${SITE_CONTACT.supportHours}`,
    href: SITE_CONTACT.hotlineHref,
  },
  {
    icon: Mail,
    title: SITE_CONTACT.email,
    description: "Báo giá doanh nghiệp, hợp tác, gửi hồ sơ. Phản hồi trong 24h.",
    cta: "Gửi email",
    href: `mailto:${SITE_CONTACT.email}`,
  },
]

const SOCIALS = [
  { icon: Facebook, label: "Facebook", href: "https://facebook.com/sipvy" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/sipvy" },
]

const DIRECTIONS_URL = "https://www.google.com/maps/search/?api=1&query=Vi%E1%BB%87t+Y%C3%AAn%2C+B%E1%BA%AFc+Ninh"

const eyebrowClass = "text-xs font-semibold uppercase tracking-[0.16em] text-green-700"

export default function ContactPage() {
  return (
    <div className="bg-stone-50/70">
      <PageHeader
        variant="warm"
        breadcrumbs={[{ href: "/", label: "Trang chủ" }, { label: "Liên hệ" }]}
        eyebrow="Trung tâm hỗ trợ"
        title="Liên hệ với SIPVY"
        description="Hỏi về sản phẩm, theo dõi đơn hàng hay đặt quà tặng doanh nghiệp — chọn kênh tiện nhất, SIPVY phản hồi bạn sớm nhất có thể."
        actions={
          <aside aria-label="Tình trạng hỗ trợ" className="w-full rounded-3xl border border-stone-200 bg-white p-6 lg:w-[360px]">
            <SupportStatus />
            <p className="mt-4 text-[13px] text-stone-500">Hotline</p>
            <p className="mt-0.5 text-3xl font-bold tracking-tight text-stone-950">{SITE_CONTACT.hotline}</p>
            <a
              href={SITE_CONTACT.hotlineHref}
              className="mt-4 flex h-12 items-center justify-center gap-2 rounded-xl bg-green-800 font-semibold text-white transition-colors hover:bg-green-900"
            >
              <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
              Gọi ngay
            </a>
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
              <dt className="text-stone-500">Thứ 2 – Thứ 7</dt>
              <dd className="text-right font-medium text-stone-900">{SITE_CONTACT.supportHours}</dd>
              <dt className="text-stone-500">Chủ nhật</dt>
              <dd className="text-right font-medium text-stone-900">{SITE_CONTACT.sundayHours}</dd>
            </dl>
          </aside>
        }
      />
      <SupportNav current="/lien-he" />

      {/* ============ CONTACT CHANNELS ============ */}
      <StorefrontContainer className="pt-12 md:pt-14">
        <section aria-labelledby="channels-heading">
          <h2 id="channels-heading" className="mb-5 text-[22px] font-semibold tracking-tight text-stone-950">
            Chọn kênh phù hợp với bạn
          </h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {CONTACT_CHANNELS.map((c, index) => {
              const Icon = c.icon
              const featured = index === 0
              const external = c.href.startsWith("http")
              return (
                <li key={c.href}>
                  <a
                    href={c.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className={cn(
                      "group flex h-full flex-col gap-3.5 rounded-[18px] p-6 transition-shadow hover:shadow-md",
                      featured ? "bg-green-950 text-white" : "border border-stone-200 bg-white text-stone-900 hover:border-green-700",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "flex h-11 w-11 items-center justify-center rounded-xl",
                          featured ? "bg-white/10 text-amber-300" : index === 1 ? "bg-green-50 text-green-800" : "bg-amber-50 text-amber-700",
                        )}
                      >
                        <Icon className="h-[22px] w-[22px]" aria-hidden="true" />
                      </span>
                      {c.badge && (
                        <span className="rounded-full bg-amber-300 px-2.5 py-1 text-xs font-semibold text-amber-950">{c.badge}</span>
                      )}
                    </div>
                    <div>
                      <p className="break-words text-lg font-semibold">{c.title}</p>
                      <p className={cn("mt-1 text-sm leading-relaxed", featured ? "text-green-100" : "text-stone-600")}>{c.description}</p>
                    </div>
                    <span
                      className={cn(
                        "mt-auto inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5",
                        featured ? "text-amber-300" : index === 1 ? "text-green-800" : "text-amber-700",
                      )}
                    >
                      {c.cta}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      {external && <span className="sr-only">(mở trong tab mới)</span>}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </section>
      </StorefrontContainer>

      {/* ============ FORM + INFO ============ */}
      <StorefrontContainer className="grid items-start gap-6 pt-12 md:pt-14 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <section aria-labelledby="form-heading" className="rounded-3xl border border-stone-200 bg-white p-5 sm:p-7 md:p-9">
          <p className={eyebrowClass}>Gửi yêu cầu</p>
          <h2 id="form-heading" className="mt-2 text-[28px] font-semibold tracking-tight text-stone-950">Để lại lời nhắn cho SIPVY</h2>
          <p className="mb-7 mt-2 text-[15px] text-stone-600">Phản hồi trong vòng 24h (ngày làm việc).</p>
          <ContactForm />
        </section>

        <div className="space-y-4">
          <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white">
            <div className="relative aspect-[16/10] bg-stone-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.4!2d106.1!3d21.27!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sViet+Yen%2C+Bac+Giang!5e0!3m2!1svi!2s!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ SIPVY"
                className="absolute inset-0"
              />
            </div>
            <div className="p-5 md:p-6">
              <h3 className="font-semibold text-stone-950">Văn phòng &amp; Kho</h3>
              <p className="mt-1.5 text-sm leading-6 text-stone-600">Phường Việt Yên, Bắc Ninh, Việt Nam</p>
              <p className="mt-2.5 text-[13px] leading-5 text-stone-500">
                Hiện SIPVY chỉ bán online. Muốn tham quan kho/xưởng? Đặt hẹn qua hotline.
              </p>
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3.5 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-green-800 hover:text-green-950"
              >
                Mở chỉ đường
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">(mở trong tab mới)</span>
              </a>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-3xl border border-stone-200 bg-white p-5 md:px-6">
            <div>
              <h3 className="font-semibold text-stone-950">Theo dõi SIPVY</h3>
              <p className="mt-1 text-[13px] text-stone-500">Công thức trà mới mỗi tuần</p>
            </div>
            <div className="flex gap-2">
              {SOCIALS.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (mở trong tab mới)`}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-stone-100 text-stone-700 transition-colors hover:bg-green-100 hover:text-green-800"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </StorefrontContainer>

      {/* ============ FAQ ============ */}
      <StorefrontContainer className="grid gap-8 pb-16 pt-16 md:pb-20 md:pt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-14">
        <div>
          <p className={eyebrowClass}>Câu hỏi thường gặp</p>
          <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-stone-950">Có thể câu trả lời đã ở đây</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-stone-600">
            Vẫn còn thắc mắc? Gọi{" "}
            <a href={SITE_CONTACT.hotlineHref} className="font-semibold text-green-800 hover:underline">{SITE_CONTACT.hotline}</a>{" "}
            hoặc dùng form phía trên.
          </p>
          <ul className="mt-5 space-y-1 text-sm font-medium">
            <li><Link href="/chinh-sach-van-chuyen" className="inline-flex min-h-11 items-center text-green-800 hover:underline">Chính sách vận chuyển →</Link></li>
            <li><Link href="/chinh-sach-doi-tra" className="inline-flex min-h-11 items-center text-green-800 hover:underline">Chính sách đổi trả →</Link></li>
          </ul>
        </div>

        <Accordion type="single" collapsible defaultValue="q-0" className="border-t border-stone-200">
          {FAQ.map((item, i) => (
            <AccordionItem key={item.q} value={`q-${i}`} className="border-stone-200">
              <AccordionTrigger className="gap-4 py-4 text-left text-base font-semibold text-stone-900 hover:text-green-800 hover:no-underline [&>svg]:h-8 [&>svg]:w-8 [&>svg]:rounded-full [&>svg]:bg-stone-100 [&>svg]:p-2 [&>svg]:text-stone-700 [&[data-state=open]>svg]:bg-green-950 [&[data-state=open]>svg]:text-white">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pr-12 text-[15px] leading-7 text-stone-600">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </StorefrontContainer>
    </div>
  )
}
