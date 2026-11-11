"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

// Matches SITE_CONTACT.supportHours (Mon–Sat) and SITE_CONTACT.sundayHours, Vietnam time.
const WEEKDAY = { open: 8, close: 22 }
const SUNDAY = { open: 9, close: 18 }
const VN_OFFSET_MS = 7 * 60 * 60 * 1000

function getSupportStatus(now: Date) {
  const vn = new Date(now.getTime() + VN_OFFSET_MS)
  const day = vn.getUTCDay()
  const hour = vn.getUTCHours() + vn.getUTCMinutes() / 60
  const today = day === 0 ? SUNDAY : WEEKDAY
  if (hour >= today.open && hour < today.close) {
    return { open: true, text: `Đang hỗ trợ · đến ${today.close}:00` }
  }
  // Before opening: today's hours; after closing: tomorrow's (Saturday night → Sunday).
  const next = hour < today.open ? today : day === 6 ? SUNDAY : WEEKDAY
  return { open: false, text: `Ngoài giờ · mở lại lúc ${next.open}:00` }
}

/** Live "open now" badge. Rendered after mount so server and client HTML match. */
export default function SupportStatus({ className }: { className?: string }) {
  const [status, setStatus] = useState<ReturnType<typeof getSupportStatus> | null>(null)

  useEffect(() => {
    const update = () => setStatus(getSupportStatus(new Date()))
    update()
    const timer = setInterval(update, 60_000)
    return () => clearInterval(timer)
  }, [])

  const tone = status === null ? "neutral" : status.open ? "open" : "closed"
  return (
    <p
      className={cn(
        "flex items-center gap-2.5 text-sm font-semibold",
        tone === "open" && "text-green-700",
        tone === "closed" && "text-amber-700",
        tone === "neutral" && "text-stone-600",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-2.5 w-2.5 rounded-full ring-4",
          tone === "open" && "bg-green-700 ring-green-100",
          tone === "closed" && "bg-amber-700 ring-amber-100",
          tone === "neutral" && "bg-stone-400 ring-stone-100",
        )}
      />
      {status?.text ?? "Giờ hỗ trợ"}
    </p>
  )
}
