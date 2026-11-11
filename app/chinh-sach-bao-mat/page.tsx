import type { Metadata } from "next"
import { ShieldCheck } from "lucide-react"

import PolicyPage, { PolicyPanel } from "@/components/storefront/policy-page"
import { SITE_CONTACT } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Chính sách bảo mật",
  description: "Cách SIPVY thu thập, sử dụng, lưu giữ và bảo vệ thông tin khách hàng.",
  alternates: { canonical: "/chinh-sach-bao-mat" },
  openGraph: { title: "Chính sách bảo mật | SIPVY", description: "Thông tin về việc bảo vệ dữ liệu khách hàng tại SIPVY.", url: "/chinh-sach-bao-mat" },
}

const COLLECTED = ["Họ tên", "Email", "Số điện thoại", "Địa chỉ giao hàng", "Thông tin đơn hàng", "Nội dung liên hệ", "IP, thiết bị, nhật ký truy cập"]
const PURPOSES = [
  "Tài khoản, xác nhận đơn, giao hàng, thanh toán, đổi trả",
  "Trả lời yêu cầu hỗ trợ, thông báo giao dịch",
  "Cải thiện trải nghiệm, chống gian lận, bảo vệ hệ thống",
  "Tiếp thị — chỉ khi bạn đồng ý",
]
const SHARED_WITH = ["Đơn vị vận chuyển", "Cổng thanh toán", "Nhà cung cấp hạ tầng", "Cơ quan có thẩm quyền khi luật yêu cầu"]
const RIGHTS = ["Xem", "Cập nhật", "Hạn chế", "Xoá"]

const linkClass = "font-medium text-green-800 underline-offset-2 hover:underline"

export default function PrivacyPolicyPage() {
  return <PolicyPage
    href="/chinh-sach-bao-mat"
    icon={ShieldCheck}
    title="Chính sách bảo mật"
    pathLabel="Bảo mật"
    readingTime="Đọc khoảng 4 phút"
    description="SIPVY tôn trọng quyền riêng tư và chỉ sử dụng thông tin cần thiết để cung cấp sản phẩm, giao hàng và hỗ trợ khách hàng."
    summary={[
      { value: "Không bán dữ liệu", label: "Chỉ chia sẻ ở mức cần thiết để phục vụ đơn", featured: true },
      { value: "Mã hoá khi truyền", label: "Cùng kiểm soát truy cập và nhật ký hoạt động" },
      { value: "Tiếp thị khi bạn đồng ý", label: "Huỷ đăng ký bất cứ lúc nào" },
      { value: "Bạn nắm quyền", label: "Xem, cập nhật, hạn chế hoặc xoá dữ liệu" },
    ]}
    highlight={
      <PolicyPanel title="Dữ liệu của bạn, nhìn một lần là rõ" titleId="data-overview">
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl bg-stone-50 p-5">
            <h3 className="text-[15px] font-semibold text-stone-950">Chúng tôi có thể thu thập</h3>
            <ul className="mt-3.5 flex flex-wrap gap-1.5 text-[13px] text-stone-700">
              {COLLECTED.map((item) => <li key={item} className="rounded-lg border border-stone-200 bg-white px-2.5 py-1.5">{item}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl bg-green-50 p-5">
            <h3 className="text-[15px] font-semibold text-green-950">Để làm gì</h3>
            <ul className="mt-3.5 list-disc space-y-1.5 pl-[18px] text-sm leading-6 text-green-900">
              {PURPOSES.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl bg-amber-50 p-5">
            <h3 className="text-[15px] font-semibold text-amber-950">Chỉ chia sẻ với</h3>
            <ul className="mt-3.5 flex flex-wrap gap-1.5 text-[13px] text-amber-900">
              {SHARED_WITH.map((item) => <li key={item} className="rounded-lg border border-amber-200 bg-white px-2.5 py-1.5">{item}</li>)}
            </ul>
            <p className="mt-3 text-[13px] leading-5 text-amber-800">Các bên này phải bảo mật và chỉ dùng dữ liệu cho mục đích đã thoả thuận.</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-green-950 p-5 text-white">
          <div>
            <h3 className="text-base font-semibold">Quyền của bạn với dữ liệu</h3>
            <ul className="mt-3 flex flex-wrap gap-2 text-sm font-medium">
              {RIGHTS.map((right) => <li key={right} className="rounded-full bg-white/10 px-3.5 py-1.5">{right}</li>)}
            </ul>
          </div>
          <a href={`mailto:${SITE_CONTACT.email}`} className="flex h-12 items-center rounded-xl bg-amber-300 px-5 text-[15px] font-semibold text-stone-900 transition-colors hover:bg-amber-200">
            Gửi yêu cầu về dữ liệu
          </a>
        </div>
      </PolicyPanel>
    }
    sections={[
      {
        title: "Phạm vi và thông tin được thu thập",
        tocLabel: "Phạm vi và thông tin thu thập",
        paragraphs: ["Chính sách này áp dụng cho website SIPVY, tài khoản khách hàng và các kênh đặt hàng do SIPVY vận hành. Tùy giao dịch, chúng tôi có thể thu thập họ tên, email, số điện thoại, địa chỉ giao hàng, thông tin đơn hàng, nội dung liên hệ và thông tin kỹ thuật tối thiểu như địa chỉ IP, loại thiết bị và nhật ký truy cập.", "Chính sách này được xây dựng theo Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15 (hiệu lực từ 01/01/2026). Cập nhật lần cuối: 03/11/2026."]
      },
      {
        title: "Mục đích sử dụng",
        bullets: [
          "Tạo và bảo vệ tài khoản, xác nhận đơn, giao hàng, thanh toán và xử lý đổi trả.",
          "Trả lời yêu cầu hỗ trợ, gửi thông báo giao dịch và thông tin dịch vụ cần thiết.",
          "Cải thiện trải nghiệm, phát hiện gian lận, bảo vệ hệ thống và tuân thủ nghĩa vụ pháp lý.",
          "Chỉ gửi thông tin tiếp thị khi bạn đồng ý; bạn có thể hủy đăng ký bất cứ lúc nào."
        ]
      },
      {
        title: "Chia sẻ và bảo vệ dữ liệu",
        paragraphs: ["SIPVY không bán dữ liệu cá nhân. Dữ liệu chỉ được chia sẻ ở mức cần thiết với đơn vị vận chuyển, cổng thanh toán, nhà cung cấp hạ tầng hoặc cơ quan có thẩm quyền khi pháp luật yêu cầu. Các bên xử lý dữ liệu phải bảo mật và chỉ dùng dữ liệu cho mục đích đã thỏa thuận.", "Chúng tôi áp dụng kiểm soát truy cập, mã hóa khi truyền, nhật ký hoạt động và các biện pháp kỹ thuật phù hợp. Không phương thức truyền hoặc lưu trữ nào an toàn tuyệt đối, vì vậy bạn nên bảo vệ mật khẩu và thông báo ngay khi nghi ngờ tài khoản bị truy cập trái phép."]
      },
      {
        title: "Thời hạn lưu giữ và quyền của bạn",
        tocLabel: "Lưu giữ và quyền của bạn",
        paragraphs: ["Dữ liệu được lưu trong thời gian cần thiết cho giao dịch, chăm sóc khách hàng, giải quyết tranh chấp và nghĩa vụ kế toán/pháp lý; sau đó được xóa hoặc ẩn danh theo quy trình nội bộ. Bạn có thể yêu cầu xem, cập nhật, hạn chế hoặc xóa dữ liệu trong phạm vi pháp luật cho phép bằng cách liên hệ SIPVY. Bạn cũng có quyền rút lại sự đồng ý, phản đối hoặc yêu cầu hạn chế xử lý, và quyền khiếu nại theo quy định pháp luật. SIPVY xác nhận đã nhận yêu cầu và phản hồi trong thời hạn do pháp luật quy định."]
      },
      {
        title: "Cookie và liên hệ",
        paragraphs: [<>Website có thể dùng cookie cần thiết để duy trì phiên đăng nhập, giỏ hàng và bảo mật. Hiện SIPVY không dùng cookie phân tích hoặc tiếp thị của bên thứ ba. Nếu sau này có, chúng tôi sẽ xin sự đồng ý của bạn trước khi kích hoạt. Mọi yêu cầu về dữ liệu gửi tới <a href={`mailto:${SITE_CONTACT.email}`} className={linkClass}>{SITE_CONTACT.email}</a> hoặc hotline <a href={SITE_CONTACT.hotlineHref} className={linkClass}>{SITE_CONTACT.hotline}</a> sẽ được tiếp nhận và phản hồi trong thời gian hợp lý.</>, "Trang Liên hệ có bản đồ Google Maps. Khi bạn mở bản đồ, Google có thể nhận địa chỉ IP và thông tin trình duyệt theo chính sách riêng của Google."]
      }
    ]}
    help={{
      title: "Nghi ngờ tài khoản bị truy cập trái phép?",
      description: "Đổi mật khẩu và báo ngay cho SIPVY để được hỗ trợ khoá tài khoản.",
      primary: { href: SITE_CONTACT.hotlineHref, label: `Gọi ${SITE_CONTACT.hotline}` },
      secondary: { href: `mailto:${SITE_CONTACT.email}`, label: SITE_CONTACT.email },
    }}
  />
}
