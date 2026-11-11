"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle2, Loader2, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { formatVnd } from "@/lib/format"
import { FREE_SHIPPING_THRESHOLD } from "@/lib/shipping"
import { SITE_CONTACT } from "@/lib/site-config"
import { submitForm } from "@/lib/submit-form"

const PHONE_PATTERN = /^(0|\+84)\d{9,10}$/
const fieldClass = "h-11 rounded-xl border-stone-300 bg-white text-[15px]"

const PAYMENTS = [
  { value: "cod", label: "Thanh toán khi nhận hàng (COD)" },
  { value: "bank", label: "Chuyển khoản — SIPVY gửi thông tin tài khoản khi xác nhận đơn" },
] as const

/** Thông báo sau khi gửi đơn. Nằm ngoài OrderForm vì giỏ hàng trống sẽ gỡ form khỏi trang. */
export function OrderSuccess({ reference }: { reference: string }) {
  return (
    <Card className="border-green-200 bg-green-50/60">
      <CardContent className="flex flex-col items-center p-8 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </div>
        <h2 className="mb-2 text-xl font-semibold text-stone-950" role="status">
          Đã gửi yêu cầu đặt hàng
        </h2>
        <p className="mb-1 text-sm text-stone-700">
          Mã tham chiếu: <strong>{reference}</strong>
        </p>
        <p className="mb-5 max-w-md text-sm text-stone-600">
          SIPVY sẽ liên hệ qua số điện thoại bạn đã cung cấp để xác nhận đơn, phí giao hàng và hình thức thanh toán.
          Đơn chỉ được tính là chính thức sau khi được xác nhận. Cần gấp, gọi{" "}
          <a href={SITE_CONTACT.hotlineHref} className="font-medium text-green-800 underline">
            {SITE_CONTACT.hotline}
          </a>
          .
        </p>
        <Button asChild variant="outline" className="border-green-200 text-green-800">
          <Link href="/san-pham">Tiếp tục xem sản phẩm</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

/**
 * Tóm tắt giỏ hàng + form đặt hàng. Đơn được gửi tới Google Apps Script (ghi vào Google Sheet);
 * SIPVY gọi/nhắn xác nhận lại với khách rồi mới tính là đơn chính thức. Không thanh toán online.
 */
export default function OrderForm({ onDone }: { onDone: (reference: string) => void }) {
  const { cart, clearCart } = useCart()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [payment, setPayment] = useState<(typeof PAYMENTS)[number]["value"]>("cod")
  const [consent, setConsent] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (loading) return
    const data = new FormData(e.currentTarget)
    const get = (key: string) => String(data.get(key) || "").trim()
    const phone = get("phone").replace(/[\s.]/g, "")

    if (!get("name") || !get("address")) {
      toast({ title: "Thiếu thông tin", description: "Vui lòng điền họ tên và địa chỉ nhận hàng.", variant: "destructive" })
      return
    }
    if (!PHONE_PATTERN.test(phone)) {
      toast({ title: "Số điện thoại chưa đúng", description: "Ví dụ: 0362023048.", variant: "destructive" })
      return
    }
    if (!consent) {
      toast({
        title: "Chưa đồng ý xử lý dữ liệu",
        description: "Vui lòng tích ô đồng ý để SIPVY xử lý đơn hàng.",
        variant: "destructive",
      })
      return
    }

    const reference = `SV${Date.now().toString(36).toUpperCase()}`
    setLoading(true)
    try {
      await submitForm("order", {
        reference,
        website: get("website"), // honeypot
        customer: { name: get("name"), phone, email: get("email"), address: get("address"), note: get("note") },
        payment,
        consent: true,
        items: cart.items.map((item) => ({
          name: item.name,
          sku: item.sku || "",
          weight: item.weight,
          boxType: item.boxType || "",
          quantity: item.quantity,
          unitPrice: item.price,
          lineTotal: item.price * item.quantity,
        })),
        totals: { subtotal: cart.subtotal, shipping: cart.shipping, total: cart.total },
      })
      clearCart()
      onDone(reference)
    } catch (err) {
      toast({
        title: "Chưa gửi được đơn hàng",
        description: err instanceof Error ? err.message : "Vui lòng thử lại hoặc liên hệ hotline.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const remainingForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - cart.subtotal)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-900">Đặt hàng</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="mb-5 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-stone-600">Tạm tính</dt>
            <dd className="font-medium text-stone-900">{formatVnd(cart.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-stone-600">Phí giao hàng (dự kiến)</dt>
            <dd className="font-medium text-stone-900">{cart.shipping === 0 ? "Miễn phí" : formatVnd(cart.shipping)}</dd>
          </div>
          <div className="flex justify-between border-t border-stone-200 pt-2 text-base">
            <dt className="font-semibold text-stone-900">Tổng dự kiến</dt>
            <dd className="font-bold text-green-800">{formatVnd(cart.total)}</dd>
          </div>
          {remainingForFreeShip > 0 && (
            <p className="text-xs text-stone-600">
              Mua thêm {formatVnd(remainingForFreeShip)} để được miễn phí giao hàng.
            </p>
          )}
        </dl>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="order-website">Website</label>
            <Input id="order-website" name="website" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="order-name">Họ và tên *</Label>
            <Input id="order-name" name="name" autoComplete="name" required className={fieldClass} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="order-phone">Số điện thoại *</Label>
            <Input id="order-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={fieldClass} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="order-email">Email (không bắt buộc)</Label>
            <Input id="order-email" name="email" type="email" autoComplete="email" className={fieldClass} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="order-address">Địa chỉ nhận hàng *</Label>
            <Textarea
              id="order-address"
              name="address"
              rows={2}
              autoComplete="street-address"
              placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
              required
              className="rounded-xl border-stone-300 bg-white text-[15px]"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="order-note">Ghi chú</Label>
            <Textarea id="order-note" name="note" rows={2} className="rounded-xl border-stone-300 bg-white text-[15px]" />
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-medium text-stone-800">Hình thức thanh toán</legend>
            <div className="space-y-2">
              {PAYMENTS.map((p) => (
                <label key={p.value} className="flex cursor-pointer items-start gap-2 text-sm text-stone-700">
                  <input
                    type="radio"
                    name="payment"
                    value={p.value}
                    checked={payment === p.value}
                    onChange={() => setPayment(p.value)}
                    className="mt-1 accent-green-700"
                  />
                  {p.label}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="flex cursor-pointer items-start gap-2 text-sm text-stone-700">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 accent-green-700"
            />
            <span>
              Tôi đồng ý để SIPVY thu thập và sử dụng họ tên, số điện thoại, địa chỉ để xử lý đơn hàng này, theo{" "}
              <Link href="/chinh-sach-bao-mat" className="text-green-800 underline">
                Chính sách bảo mật
              </Link>
              .
            </span>
          </label>

          <Button type="submit" disabled={loading} className="h-12 w-full rounded-xl bg-green-800 text-white hover:bg-green-900">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> Đang gửi...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" aria-hidden="true" /> Gửi yêu cầu đặt hàng
              </>
            )}
          </Button>
          <p className="text-xs leading-5 text-stone-600">
            Đây là yêu cầu đặt hàng, chưa phải thanh toán. SIPVY sẽ liên hệ xác nhận trước khi giao hàng.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
