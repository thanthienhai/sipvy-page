import type { Metadata } from "next"
import { Info, Truck } from "lucide-react"

import PolicyPage, { PolicyNote, PolicyPanel, PolicySteps } from "@/components/storefront/policy-page"
import { SITE_CONTACT } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Chính sách vận chuyển",
  description: "Phạm vi, thời gian và phí giao hàng đối với đơn trà SIPVY.",
  alternates: { canonical: "/chinh-sach-van-chuyen" },
  openGraph: { title: "Chính sách vận chuyển | SIPVY", description: "Thông tin giao hàng toàn quốc của SIPVY.", url: "/chinh-sach-van-chuyen" },
}

const ORDER_STEPS = [
  { title: "Đặt & xác nhận đơn", description: "Phí vận chuyển hiện ở giỏ hàng và bước thanh toán trước khi bạn xác nhận." },
  { title: "Xử lý & đóng gói", description: "Trong 1 ngày làm việc. SIPVY có thể gọi xác nhận địa chỉ trước khi gửi." },
  { title: "Vận chuyển", description: "2–5 ngày làm việc, không tính thứ Bảy, Chủ nhật và ngày lễ." },
  { title: "Nhận & kiểm tra", description: "Kiểm tra số kiện, hộp và tem niêm phong. Có vấn đề? Chụp ảnh, báo SIPVY trong 24 giờ." },
]

export default function ShippingPolicyPage() {
  return <PolicyPage
    href="/chinh-sach-van-chuyen"
    icon={Truck}
    title="Chính sách vận chuyển"
    pathLabel="Vận chuyển"
    readingTime="Đọc khoảng 3 phút"
    description="Thông tin minh bạch về khu vực giao hàng, thời gian dự kiến và phí vận chuyển — luôn hiển thị trước khi bạn đặt đơn."
    summary={[
      { value: "Toàn quốc", label: "Giao tới các tỉnh, thành tại Việt Nam" },
      { value: "2–5 ngày làm việc", label: "Thời gian giao dự kiến, sau 1 ngày xử lý" },
      { value: "Miễn phí từ 500.000₫", label: "Dưới mức này: đồng giá 30.000₫", featured: true },
      { value: "Báo lỗi trong 24 giờ", label: "Hộp móp, ướt, rách seal hoặc sai sản phẩm" },
    ]}
    highlight={
      <PolicyPanel title="Hành trình một đơn hàng" titleId="order-journey">
        <PolicySteps steps={ORDER_STEPS} />
        <PolicyNote icon={Info}>
          Huyện đảo, vùng xa, giai đoạn cao điểm, mưa bão hoặc địa chỉ chưa đầy đủ có thể làm thời gian giao lâu hơn. SIPVY sẽ báo bạn khi có thay đổi đáng kể.
        </PolicyNote>
      </PolicyPanel>
    }
    sections={[
      {
        title: "Khu vực và thời gian giao hàng",
        tocLabel: "Khu vực và thời gian giao",
        paragraphs: ["SIPVY nhận giao hàng tới các tỉnh, thành tại Việt Nam thông qua đối tác vận chuyển phù hợp. Đơn được xử lý trong 1 ngày làm việc sau khi xác nhận; thời gian giao dự kiến là 2–5 ngày làm việc (không tính thứ Bảy, Chủ nhật và ngày lễ), có thể lâu hơn với huyện đảo, vùng xa hoặc giai đoạn cao điểm.", "Thời gian trên là dự kiến, không phải cam kết tuyệt đối. Mưa bão, ngày lễ, địa chỉ không đầy đủ hoặc sự kiện bất khả kháng có thể làm chậm giao hàng. SIPVY sẽ cập nhật khi phát sinh thay đổi đáng kể."]
      },
      {
        title: "Phí vận chuyển",
        lead: (
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-green-200 bg-green-50 px-5 py-4">
              <p className="text-[13px] text-green-800">Đơn từ 500.000₫</p>
              <p className="mt-1 text-2xl font-bold text-green-950">Miễn phí</p>
              <p className="mt-0.5 text-[13px] text-green-800">Tính sau khi trừ mã giảm giá</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white px-5 py-4">
              <p className="text-[13px] text-stone-600">Đơn dưới 500.000₫</p>
              <p className="mt-1 text-2xl font-bold text-stone-900">30.000₫</p>
              <p className="mt-0.5 text-[13px] text-stone-600">Đồng giá toàn quốc</p>
            </div>
          </div>
        ),
        bullets: [
          "Miễn phí vận chuyển cho đơn hàng từ 500.000₫ sau khi đã trừ mã giảm giá.",
          "Đơn dưới ngưỡng miễn phí áp dụng phí vận chuyển đồng giá 30.000₫ trên toàn quốc; phí được hiển thị tại giỏ hàng và bước thanh toán trước khi bạn xác nhận đơn.",
          "Giao lại hoặc đổi địa chỉ do thông tin khách hàng cung cấp chưa chính xác (nếu phát sinh) sẽ được thông báo và xác nhận với bạn trước khi thu phí."
        ]
      },
      {
        title: "Kiểm tra khi nhận hàng",
        paragraphs: ["Bạn nên kiểm tra số kiện, tên sản phẩm, tình trạng hộp và tem niêm phong khi nhận. Nếu hộp bị móp, ướt, rách seal hoặc sai sản phẩm, hãy ghi nhận với đơn vị giao hàng, chụp ảnh và liên hệ SIPVY trong vòng 24 giờ để được hỗ trợ."]
      },
      {
        title: "Địa chỉ và giao không thành công",
        paragraphs: ["Khách hàng chịu trách nhiệm cung cấp họ tên, số điện thoại và địa chỉ chính xác. SIPVY có thể liên hệ xác nhận trước khi gửi; đơn giao không thành công nhiều lần có thể bị hoàn về và phát sinh phí giao lại. Mọi khoản phí cuối cùng được xác nhận với khách hàng trước khi xử lý."]
      },
      {
        title: "Liên hệ hỗ trợ",
        paragraphs: [<>Liên hệ <a href={SITE_CONTACT.hotlineHref} className="font-medium text-green-800 underline-offset-2 hover:underline">{SITE_CONTACT.hotline}</a> hoặc <a href={`mailto:${SITE_CONTACT.email}`} className="font-medium text-green-800 underline-offset-2 hover:underline">{SITE_CONTACT.email}</a>, cung cấp mã đơn và số điện thoại đặt hàng để chúng tôi tra cứu nhanh.</>]
      }
    ]}
    help={{
      title: "Đơn hàng có vấn đề?",
      description: `Chuẩn bị mã đơn và số điện thoại đặt hàng — SIPVY hỗ trợ ${SITE_CONTACT.supportHours} (Chủ nhật ${SITE_CONTACT.sundayHours}).`,
      primary: { href: SITE_CONTACT.hotlineHref, label: `Gọi ${SITE_CONTACT.hotline}` },
      secondary: { href: "/lien-he", label: "Gửi yêu cầu" },
    }}
  />
}
