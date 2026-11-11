"use client"

import { useId, useState } from "react"
import { Mail, CheckCircle2, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { submitForm } from "@/lib/submit-form"
import { cn } from "@/lib/utils"

interface NewsletterFormProps {
  /** Where the signup happened (e.g. "home", "gioi-thieu", "footer"); stored with the subscriber. */
  source?: string
  className?: string
}

const SOURCE_PATTERN = /^[a-z0-9_-]{1,50}$/

export default function NewsletterForm({ source = "website", className }: NewsletterFormProps) {
  const id = useId()
  const emailId = `${id}-email`
  const honeypotId = `${id}-website`
  const statusId = `${id}-status`
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [consent, setConsent] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email.trim() || loading) return
    if (!consent) {
      setError("Vui lòng chọn ô đồng ý nhận email trước khi đăng ký.")
      return
    }
    setLoading(true)
    setError(null)
    try {
      const formData = new FormData(e.currentTarget)
      await submitForm("newsletter", {
        email: email.trim(),
        source: SOURCE_PATTERN.test(source) ? source : "website",
        website: String(formData.get("website") || ""),
        consent,
      })
      setDone(true)
      toast({ title: "Đăng ký thành công", description: "Mã giảm giá sẽ được gửi qua email của bạn." })
    } catch (err) {
      const message = err instanceof Error ? err.message : "Lỗi đăng ký, vui lòng thử lại"
      setError(message)
      toast({ title: "Chưa đăng ký được", description: message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div
        role="status"
        className={cn("flex items-center justify-center gap-2 rounded-full border-2 border-green-200 bg-green-100 px-6 py-3 font-medium text-green-900", className)}
      >
        <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
        Cảm ơn bạn đã đăng ký! Mã giảm giá sẽ được gửi qua email.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={className} aria-describedby={error ? statusId : undefined}>
      <div className="relative">
        <label htmlFor={honeypotId} className="sr-only">Để trống trường này</label>
        <input
          id={honeypotId}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="absolute -left-[9999px] h-px w-px opacity-0"
          aria-hidden="true"
        />
        <label htmlFor={emailId} className="sr-only">Email nhận tin và mã giảm giá</label>
        <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-600" aria-hidden="true" />
        <input
          id={emailId}
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@cuaban.com"
          aria-invalid={error ? true : undefined}
          className="h-14 w-full rounded-full border-2 border-green-200 bg-white pl-12 pr-32 text-base text-stone-900 shadow-sm outline-none transition-all placeholder:text-stone-500 focus:border-green-600 focus:ring-2 focus:ring-green-100 sm:pr-40"
        />
        <Button
          type="submit"
          disabled={loading}
          className="absolute right-1.5 top-1/2 h-11 -translate-y-1/2 rounded-full bg-green-700 px-5 font-medium text-white hover:bg-green-800 sm:px-7"
        >
          {loading ? "Đang gửi..." : "Nhận mã"}
        </Button>
      </div>
      <label className="mt-3 flex items-start justify-center gap-2 text-left text-xs text-stone-600">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-green-700"
        />
        <span>Tôi đồng ý nhận email ưu đãi và cẩm nang từ SIPVY. Có thể hủy bất cứ lúc nào.</span>
      </label>
      {error && (
        <p id={statusId} role="alert" className="mt-3 flex items-center justify-center gap-1.5 text-sm font-medium text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </form>
  )
}
