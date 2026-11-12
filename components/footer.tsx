import Image from "next/image"
import Link from "next/link"
import {
  Facebook,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  ChevronDown,
} from "lucide-react"

const SHOP_LINKS = [
  { href: "/san-pham", label: "Tất cả sản phẩm" },
  { href: "/san-pham?category=tra-co-thu", label: "Trà cổ thụ" },
  { href: "/san-pham?category=tra-oolong", label: "Trà oolong" },
  { href: "/san-pham?category=tra-huong-hoa", label: "Trà hương hoa" },
  { href: "/qua-tang", label: "Quà tặng" },
  { href: "/qua-tet", label: "Quà Tết" },
]

const SUPPORT_LINKS = [
  { href: "/lien-he", label: "Liên hệ" },
  { href: "/hieu-ve-tra", label: "Hướng dẫn pha trà" },
  { href: "/chinh-sach-van-chuyen", label: "Chính sách vận chuyển" },
  { href: "/chinh-sach-doi-tra", label: "Chính sách đổi trả" },
  { href: "/chinh-sach-bao-mat", label: "Chính sách bảo mật" },
  { href: "/dieu-khoan", label: "Điều khoản sử dụng" },
]

const ABOUT_LINKS = [
  { href: "/gioi-thieu", label: "Về SIPVY" },
  { href: "/hieu-ve-tra", label: "Văn hoá trà" },
]

const SOCIAL_LINKS = [
  { href: "https://facebook.com/sipvy", icon: Facebook, label: "Facebook" },
  { href: "https://instagram.com/sipvy", icon: Instagram, label: "Instagram" },
  { href: "https://youtube.com/@sipvy", icon: Youtube, label: "YouTube" },
]

export default function Footer() {
  return (
    <footer className="on-dark bg-green-900 text-green-50">
      <h2 className="sr-only">Thông tin và liên kết SIPVY</h2>
      {/* ============ MAIN COLUMNS ============ */}
      <div className="container mx-auto px-4 py-10 md:px-6 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-6 lg:gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <Image
                src="/logo.png"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 rounded-full bg-white p-1.5"
              />
              <span className="text-2xl font-bold tracking-tight text-white">SIPVY</span>
            </Link>

            <p className="text-sm text-green-100/90 leading-relaxed mb-5 max-w-sm">
              Trà Việt cho người trẻ — dễ pha, dễ uống,
              hợp nhịp sống mỗi ngày.
            </p>

            {/* Social */}
            <div className="flex gap-2 mb-6">
              {SOCIAL_LINKS.map((s) => {
                const Icon = s.icon
                return (
                  <Link
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-green-800/60 text-green-100 hover:bg-green-700 hover:text-white transition-colors"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">{s.label} (mở tab mới)</span>
                  </Link>
                )
              })}
            </div>

            {/* Business cert */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-green-700/60 text-xs text-green-200">
              <Shield className="h-3.5 w-3.5" />
              Đã đăng ký với Bộ Công Thương
            </div>
          </div>

          {/* Mua sắm */}
          <div className="hidden md:block md:col-span-2">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Mua sắm
            </h3>
            <ul className="space-y-2.5">
              {SHOP_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-green-100/80 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div className="hidden md:block md:col-span-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Hỗ trợ
            </h3>
            <ul className="space-y-2.5">
              {SUPPORT_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-green-100/80 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Liên hệ */}
          <div className="col-span-2 md:col-span-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Liên hệ
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 shrink-0 mt-0.5 text-green-300" />
                <div>
                  <a
                    href="tel:0362023048"
                    className="text-white font-medium hover:text-green-200 transition-colors block"
                  >
                    0362 023 048
                  </a>
                  <p className="text-xs text-green-200/70">Hotline 8:00 - 22:00</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 shrink-0 mt-0.5 text-green-300" />
                <a
                  href="mailto:sipvy@sipvy.com"
                  className="text-green-100/90 hover:text-white transition-colors"
                >
                  sipvy@sipvy.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-green-300" />
                <span className="text-green-100/90">
                  Phường Việt Yên, Bắc Ninh, Việt Nam
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 shrink-0 mt-0.5 text-green-300" />
                <div className="text-green-100/90">
                  <p>T2 - T7: 8:00 - 22:00</p>
                  <p>Chủ nhật: 9:00 - 18:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile navigation groups use native disclosure semantics and keep contact details visible above. */}
        <div className="mt-8 border-y border-green-800/50 md:hidden">
          {[
            { title: "Mua sắm", links: SHOP_LINKS },
            { title: "Hỗ trợ", links: SUPPORT_LINKS },
            { title: "Về SIPVY", links: ABOUT_LINKS },
          ].map((group) => (
            <details key={group.title} className="group border-b border-green-800/50 last:border-b-0">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 text-sm font-semibold uppercase tracking-wider text-white outline-none focus-visible:ring-2 focus-visible:ring-green-300 [&::-webkit-details-marker]:hidden">
                {group.title}
                <ChevronDown className="h-4 w-4 shrink-0 text-green-200 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <ul className="space-y-2.5 pb-4 pr-6">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-green-100/80 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>

        {/* About links secondary */}
        <div className="mt-8 hidden flex-wrap gap-x-6 gap-y-2 border-t border-green-800/50 pt-6 text-sm md:flex">
          <span className="text-green-200/80 font-medium">Khám phá:</span>
          {ABOUT_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-green-100/80 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ============ BOTTOM BAR ============ */}
      <div className="border-t border-green-800/60 bg-green-950/40">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <p className="text-green-200/70">
              © {new Date().getFullYear()} <span className="font-semibold text-white">SIPVY</span>.
              Tất cả các quyền được bảo lưu.
            </p>
            <div className="flex items-center gap-4 text-green-200/70">
              <span>Phương thức thanh toán:</span>
              <div className="flex items-center gap-1.5">
                {["COD", "VISA", "MOMO", "VNPay"].map((m) => (
                  <span
                    key={m}
                    className="px-2 py-1 rounded bg-white/10 text-white/90 text-[10px] font-semibold tracking-wider"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
