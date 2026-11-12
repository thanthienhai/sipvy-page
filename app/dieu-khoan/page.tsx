import type { Metadata } from "next"
import Link from "next/link"
import { FileText, Leaf, User } from "lucide-react"

import PolicyPage, { PolicyListCard } from "@/components/storefront/policy-page"
import { SITE_CONTACT } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Điều khoản sử dụng",
  description: "Điều khoản sử dụng website, đặt hàng và thanh toán tại SIPVY.",
  alternates: { canonical: "/dieu-khoan" },
  openGraph: { title: "Điều khoản sử dụng | SIPVY", description: "Các điều khoản khi sử dụng website và dịch vụ SIPVY.", url: "/dieu-khoan" },
}

const linkClass = "font-medium text-green-800 underline-offset-2 hover:underline"

export default function TermsPage() {
  return <PolicyPage
    href="/dieu-khoan"
    icon={FileText}
    title="Điều khoản sử dụng"
    pathLabel="Điều khoản"
    readingTime="Đọc khoảng 3 phút"
    description="Khi truy cập website hoặc đặt hàng, bạn xác nhận đã đọc và đồng ý với các điều khoản dưới đây."
    summary={[
      { value: "Đơn có xác nhận", label: "Đơn hợp lệ khi SIPVY gửi xác nhận cho bạn", featured: true },
      { value: "Giá tại lúc đặt", label: "Giá, tồn kho, biến thể hiển thị khi đặt hàng" },
      { value: "Thanh toán khi giao hoặc chuyển khoản", label: "Không thanh toán online trên website" },
      { value: "Nội dung của SIPVY", label: "Chỉ dùng cho mục đích cá nhân" },
    ]}
    highlight={
      <section aria-labelledby="commitments">
        <h2 id="commitments" className="mb-4 text-[22px] font-semibold tracking-tight text-stone-950">Hai bên cùng cam kết</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <PolicyListCard
            tone="neutral"
            icon={User}
            title="Bạn"
            items={[
                            "Cung cấp thông tin chính xác, cập nhật",
              "Không giả mạo, lừa đảo hay phát tán mã độc",
              "Dùng nội dung SIPVY cho mục đích cá nhân",
            ]}
          />
          <PolicyListCard
            tone="positive"
            icon={Leaf}
            title="SIPVY"
            items={[
              "Hiển thị giá, tồn kho và biến thể tại thời điểm đặt",
              "Gửi xác nhận đơn; liên hệ trước khi huỷ đơn",
              "Chỉ xác nhận thanh toán sau khi nhận được tiền",
              "Đăng điều khoản mới kèm ngày hiệu lực",
            ]}
          />
        </div>
      </section>
    }
    sections={[
      {
        title: "Thông tin khách hàng",
        paragraphs: ["Website không có tài khoản đăng nhập. Bạn chịu trách nhiệm cung cấp thông tin chính xác, cập nhật (họ tên, số điện thoại, địa chỉ) khi đặt hàng hoặc liên hệ. Không được giả mạo, lừa đảo, phát tán mã độc hoặc gửi biểu mẫu hàng loạt. SIPVY có quyền từ chối xử lý yêu cầu có dấu hiệu vi phạm."]
      },
      {
        title: "Sản phẩm, giá và khuyến mại",
        paragraphs: ["Thông tin sản phẩm, biến thể, tồn kho, giá bán và giá so sánh được hiển thị tại thời điểm đặt hàng. Hình ảnh có thể khác biệt nhẹ do màn hình và lô đóng gói. Các chương trình khuyến mại (nếu có) áp dụng theo điều kiện công bố tại thời điểm đó."]
      },
      {
        title: "Đặt hàng và thanh toán",
        bullets: [
          "Biểu mẫu đặt hàng chỉ là yêu cầu đặt hàng. Đơn chỉ được tính là chính thức khi SIPVY liên hệ xác nhận với bạn qua số điện thoại đã cung cấp.",
          "SIPVY có thể liên hệ xác minh hoặc hủy đơn nếu sản phẩm hết hàng, thông tin không thể xác minh, giá hiển thị sai do lỗi kỹ thuật hoặc có dấu hiệu gian lận.",
          "Website không xử lý thanh toán online. Bạn thanh toán khi nhận hàng (COD) hoặc chuyển khoản theo thông tin SIPVY gửi khi xác nhận đơn.",
          <>Mọi phí vận chuyển, hoàn tiền và thời gian xử lý tuân theo <Link href="/chinh-sach-van-chuyen" className={linkClass}>chính sách vận chuyển</Link> và <Link href="/chinh-sach-doi-tra" className={linkClass}>chính sách đổi trả</Link>.</>
        ]
      },
      {
        title: "Sở hữu trí tuệ và nội dung",
        paragraphs: ["Tên thương hiệu, logo, hình ảnh, bài viết và thiết kế SIPVY thuộc SIPVY hoặc bên cấp phép. Bạn chỉ được sử dụng nội dung cho mục đích cá nhân, không sao chép, khai thác thương mại hoặc sửa đổi khi chưa có chấp thuận bằng văn bản."]
      },
      {
        title: "Thay đổi và liên hệ",
        paragraphs: [<>SIPVY có thể cập nhật điều khoản để phù hợp với hoạt động và quy định áp dụng; phiên bản mới sẽ được đăng trên trang này cùng ngày hiệu lực. Nếu có câu hỏi, liên hệ <a href={`mailto:${SITE_CONTACT.email}`} className={linkClass}>{SITE_CONTACT.email}</a> hoặc <a href={SITE_CONTACT.hotlineHref} className={linkClass}>{SITE_CONTACT.hotline}</a> trước khi đặt hàng.</>]
      }
    ]}
    help={{
      title: "Còn điều khoản nào chưa rõ?",
      description: "Hỏi SIPVY trước khi đặt hàng — chúng tôi giải thích cụ thể cho trường hợp của bạn.",
      primary: { href: "/lien-he", label: "Liên hệ SIPVY" },
      secondary: { href: SITE_CONTACT.hotlineHref, label: `Gọi ${SITE_CONTACT.hotline}` },
    }}
  />
}
