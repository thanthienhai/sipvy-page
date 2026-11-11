import type { Metadata } from "next"
import { AlertTriangle, Check, RotateCcw, X } from "lucide-react"

import PolicyPage, { PolicyListCard, PolicyNote, PolicyPanel, PolicySteps } from "@/components/storefront/policy-page"
import { SITE_CONTACT } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Chính sách đổi trả",
  description: "Điều kiện và quy trình đổi trả sản phẩm trà, combo và quà tặng SIPVY.",
  alternates: { canonical: "/chinh-sach-doi-tra" },
  openGraph: { title: "Chính sách đổi trả | SIPVY", description: "Điều kiện đổi trả và hoàn tiền sản phẩm SIPVY.", url: "/chinh-sach-doi-tra" },
}

const RETURN_STEPS = [
  { title: "Gửi yêu cầu", description: "Mã đơn, mô tả lỗi và ảnh/video tình trạng nhận hàng — qua hotline hoặc email." },
  { title: "SIPVY xác minh", description: "Tối đa 2 ngày làm việc, kèm hướng dẫn đóng gói và địa chỉ tiếp nhận." },
  { title: "Đổi hàng hoặc hoàn tiền", description: "Theo kết quả xác minh. Tiền hoàn về phương thức thanh toán ban đầu." },
]

export default function ReturnPolicyPage() {
  return <PolicyPage
    href="/chinh-sach-doi-tra"
    icon={RotateCcw}
    title="Chính sách đổi trả"
    pathLabel="Đổi trả"
    readingTime="Đọc khoảng 3 phút"
    description="SIPVY hỗ trợ đổi hoặc hoàn tiền minh bạch khi sản phẩm có lỗi, hư hỏng do vận chuyển hoặc giao sai."
    summary={[
      { value: "7 ngày", label: "Để gửi yêu cầu, kể từ khi giao thành công", featured: true },
      { value: "≤ 2 ngày làm việc", label: "SIPVY xác minh và hướng dẫn đóng gói" },
      { value: "0₫ phí gửi lại", label: "Khi lỗi thuộc về SIPVY hoặc đối tác" },
      { value: "3–7 ngày làm việc", label: "Ngân hàng ghi có tiền hoàn về" },
    ]}
    highlight={
      <>
        <PolicyPanel title="Đổi trả trong 3 bước" titleId="return-steps">
          <PolicySteps steps={RETURN_STEPS} />
          <PolicyNote icon={AlertTriangle} tone="orange">
            <strong>Đừng tự gửi hàng về</strong> khi chưa nhận được xác nhận địa chỉ tiếp nhận từ SIPVY.
          </PolicyNote>
        </PolicyPanel>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <PolicyListCard
            tone="positive"
            icon={Check}
            title="Được hỗ trợ"
            items={[
              "Giao sai loại, sai trọng lượng/loại hộp hoặc thiếu thành phần",
              "Hộp, seal hoặc sản phẩm hư hỏng do vận chuyển (có bằng chứng)",
              "Lỗi từ nhà sản xuất được SIPVY xác minh",
              "Combo/quà tặng sai hoặc thiếu thành phần",
            ]}
          />
          <PolicyListCard
            tone="neutral"
            icon={X}
            title="Thường không áp dụng"
            items={[
              "Sản phẩm đã mở hộp hoặc dùng thử",
              "Bảo quản không đúng hướng dẫn",
              "Quà tặng cá nhân hoá",
              "Trừ khi lỗi thuộc về SIPVY",
            ]}
          />
        </div>
      </>
    }
    sections={[
      {
        title: "Thời hạn yêu cầu",
        paragraphs: ["Vui lòng liên hệ SIPVY trong vòng 7 ngày kể từ thời điểm hệ thống vận chuyển ghi nhận giao thành công. Trường hợp sản phẩm có lỗi tiềm ẩn liên quan đến chất lượng hoặc an toàn, hãy ngừng sử dụng và liên hệ ngay để được hướng dẫn riêng."]
      },
      {
        title: "Trường hợp được hỗ trợ",
        bullets: [
          "Sản phẩm giao sai loại, sai trọng lượng/loại hộp hoặc thiếu thành phần so với đơn.",
          "Hộp, seal hoặc sản phẩm bị hư hỏng do vận chuyển và có bằng chứng phù hợp.",
          "Sản phẩm có lỗi từ nhà sản xuất được SIPVY xác minh.",
          "Combo/quà tặng có thành phần sai hoặc thiếu; cần giữ lại toàn bộ hộp và phụ kiện."
        ]
      },
      {
        title: "Điều kiện đổi trả",
        paragraphs: ["Sản phẩm trà phải còn nguyên seal, chưa mở và chưa qua sử dụng, trừ trường hợp lỗi chất lượng được SIPVY yêu cầu gửi mẫu kiểm tra. Sản phẩm đổi trả cần có mã đơn, ảnh/video tình trạng nhận hàng và thông tin liên hệ trùng với đơn. Sản phẩm đã mở hộp, dùng thử, bảo quản không đúng hướng dẫn hoặc quà tặng cá nhân hóa thường không thuộc diện đổi trả, trừ lỗi của SIPVY."]
      },
      {
        title: "Quy trình và chi phí",
        bullets: [
          "Bước 1: Gửi mã đơn, mô tả lỗi và ảnh/video qua hotline hoặc email.",
          "Bước 2: SIPVY xác minh trong tối đa 2 ngày làm việc và hướng dẫn đóng gói.",
          "Bước 3: Đổi sản phẩm hoặc hoàn tiền theo kết quả xác minh; SIPVY chịu phí vận chuyển khi lỗi thuộc về SIPVY/đối tác.",
          "Khoản hoàn tiền được xử lý về phương thức thanh toán ban đầu; thời gian ngân hàng/cổng thanh toán ghi có thường 3–7 ngày làm việc."
        ]
      },
      {
        title: "Liên hệ",
        paragraphs: [<>Gửi yêu cầu tới <a href={`mailto:${SITE_CONTACT.email}`} className="font-medium text-green-800 underline-offset-2 hover:underline">{SITE_CONTACT.email}</a> hoặc <a href={SITE_CONTACT.hotlineHref} className="font-medium text-green-800 underline-offset-2 hover:underline">{SITE_CONTACT.hotline}</a>. Vui lòng không tự gửi hàng về khi chưa có xác nhận địa chỉ tiếp nhận từ SIPVY.</>]
      }
    ]}
    help={{
      title: "Cần đổi hoặc trả sản phẩm?",
      description: "Gửi mã đơn kèm ảnh/video — SIPVY xác minh trong tối đa 2 ngày làm việc.",
      primary: { href: "/lien-he", label: "Gửi yêu cầu đổi trả" },
      secondary: { href: SITE_CONTACT.hotlineHref, label: `Gọi ${SITE_CONTACT.hotline}` },
    }}
  />
}
