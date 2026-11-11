"use client"

import { useState } from "react"
import Link from "next/link"
import { Send, CheckCircle2, Info, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { submitForm } from "@/lib/submit-form"

interface Subject {
  value: string
  label: string
  hint: string
  link?: { href: string; label: string }
  /** Show the optional order-code field. */
  withOrder?: boolean
}

const SUBJECTS: Subject[] = [
  {
    value: "tu-van-san-pham",
    label: "Tư vấn sản phẩm",
    hint: "Cho chúng tôi biết khẩu vị (đậm, thanh hay hương hoa) và dịp dùng — SIPVY sẽ gợi ý loại trà phù hợp.",
    link: { href: "/hieu-ve-tra", label: "Xem hướng dẫn pha trà" },
  },
  {
    value: "dat-hang",
    label: "Đặt hàng / Đơn hàng",
    hint: "Ghi mã đơn và số điện thoại đặt hàng để chúng tôi tra cứu nhanh hơn.",
    link: { href: "/chinh-sach-van-chuyen", label: "Chính sách vận chuyển" },
    withOrder: true,
  },
  {
    value: "qua-doanh-nghiep",
    label: "Quà tặng doanh nghiệp",
    hint: "Nhận đơn từ 50 hộp, hỗ trợ in logo, thiệp cá nhân hoá, giao nhiều địa chỉ. Báo giá riêng trong 24h.",
  },
  {
    value: "hop-tac",
    label: "Hợp tác / Đại lý",
    hint: "Giới thiệu ngắn về đơn vị và khu vực kinh doanh; bộ phận hợp tác sẽ liên hệ lại với bạn.",
  },
  {
    value: "khieu-nai",
    label: "Khiếu nại / Phản hồi",
    hint: "Mô tả rõ vấn đề. Nếu sản phẩm lỗi, SIPVY sẽ hướng dẫn gửi ảnh/video và đổi trả.",
    link: { href: "/chinh-sach-doi-tra", label: "Chính sách đổi trả" },
    withOrder: true,
  },
  {
    value: "khac",
    label: "Khác",
    hint: "Viết bất cứ điều gì bạn cần — chúng tôi phản hồi trong 24h (ngày làm việc).",
  },
]

const fieldClassName = "h-12 rounded-xl border-stone-300 bg-white text-[15px]"

export default function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [subject, setSubject] = useState(SUBJECTS[0].value)
  const { toast } = useToast()

  const current = SUBJECTS.find((s) => s.value === subject) ?? SUBJECTS[0]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const data = new FormData(e.currentTarget)
    const message = String(data.get("message") || "").trim()
    // The API has no order field: the code travels at the top of the message.
    const orderCode = current.withOrder ? String(data.get("orderCode") || "").trim() : ""
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      subject,
      message: orderCode && message ? `Mã đơn hàng: ${orderCode}\n\n${message}` : message,
      website: String(data.get("website") || "").trim(),
    }

    if (!payload.name || !payload.email || !message) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng điền họ tên, email và nội dung",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    try {
      await submitForm("contact", payload)

      setSuccess(true)
      toast({
        title: "Đã nhận tin nhắn!",
        description: "Chúng tôi sẽ phản hồi bạn trong 24h.",
      })
    } catch (err) {
      toast({
        title: "Lỗi gửi tin nhắn",
        description: err instanceof Error ? err.message : "Vui lòng thử lại sau",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center py-10 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-stone-950">Cảm ơn bạn đã liên hệ!</h3>
        <p className="mb-5 max-w-md text-stone-600">
          Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi trong vòng 24 giờ (ngày làm việc).
        </p>
        <Button
          variant="outline"
          onClick={() => setSuccess(false)}
          className="h-11 rounded-xl border-green-200 text-green-800"
        >
          Gửi tin nhắn khác
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <Input
          id="contact-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <fieldset>
        <legend className="mb-2.5 text-sm font-semibold text-stone-800">Bạn cần hỗ trợ về</legend>
        <div className="flex flex-wrap gap-2">
          {SUBJECTS.map((s) => (
            <label key={s.value} className="relative cursor-pointer">
              <input
                type="radio"
                name="subject"
                value={s.value}
                checked={subject === s.value}
                onChange={() => setSubject(s.value)}
                className="peer sr-only"
              />
              <span className="flex h-11 items-center rounded-full border border-stone-300 bg-white px-4 text-sm font-medium text-stone-700 transition-colors hover:border-stone-400 peer-checked:border-green-950 peer-checked:bg-green-950 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-green-700 peer-focus-visible:ring-offset-2">
                {s.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-3.5 flex items-start gap-3 rounded-2xl bg-green-50 px-4 py-3.5 text-sm leading-6 text-green-900" aria-live="polite">
        <Info className="mt-0.5 h-[18px] w-[18px] shrink-0" aria-hidden="true" />
        <p>
          {current.hint}
          {current.link && (
            <>
              {" "}
              <Link href={current.link.href} className="font-semibold text-green-800 hover:underline">
                {current.link.label} →
              </Link>
            </>
          )}
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">
            Họ và tên <span className="text-red-600">*</span>
          </Label>
          <Input id="name" name="name" required placeholder="Nguyễn Văn A" className={fieldClassName} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input id="phone" name="phone" type="tel" placeholder="0987 654 321" className={fieldClassName} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">
            Email <span className="text-red-600">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="email@example.com"
            className={fieldClassName}
          />
        </div>
        {current.withOrder && (
          <div className="space-y-1.5">
            <Label htmlFor="orderCode">
              Mã đơn hàng <span className="font-normal text-stone-500">(nếu có)</span>
            </Label>
            <Input id="orderCode" name="orderCode" maxLength={40} placeholder="VD: SV2610…" className={fieldClassName} />
          </div>
        )}
      </div>

      <div className="mt-4 space-y-1.5">
        <Label htmlFor="message">
          Nội dung <span className="text-red-600">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={1900}
          placeholder="Mô tả chi tiết yêu cầu của bạn..."
          className="resize-y rounded-xl border-stone-300 bg-white text-[15px] leading-relaxed"
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-[46ch] text-[13px] leading-5 text-stone-500">
          SIPVY dùng thông tin bạn gửi để phản hồi yêu cầu này, theo{" "}
          <Link href="/chinh-sach-bao-mat" className="font-medium text-green-800 hover:underline">Chính sách bảo mật</Link>.
        </p>
        <Button
          type="submit"
          disabled={loading}
          className="h-12 rounded-xl bg-green-800 px-6 text-[15px] font-semibold text-white hover:bg-green-900"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              Đang gửi...
            </>
          ) : (
            <>
              Gửi lời nhắn
              <Send className="ml-2 h-4 w-4" aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
