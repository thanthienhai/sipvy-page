/**
 * Deterministic display formatters shared by server and client components.
 *
 * Nothing here reads the process locale or timezone: money is grouped by hand
 * and dates are always rendered for vi-VN in Asia/Ho_Chi_Minh, so the same
 * input yields identical output on the server and in the browser (React
 * hydration safe).
 */

const VN_TIME_ZONE = "Asia/Ho_Chi_Minh"
const NBSP = String.fromCharCode(160)

/** 1234567 -> "1.234.567 ₫" (non-breaking space before the symbol). */
export function formatVnd(amount: number): string {
  if (!Number.isFinite(amount)) return ""
  const rounded = Math.round(amount)
  const sign = rounded < 0 ? "-" : ""
  const grouped = String(Math.abs(rounded)).replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  return `${sign}${grouped}${NBSP}₫`
}

/** 12.4 -> "12%"; non-finite values yield an empty string. */
export function formatPercent(value: number): string {
  if (!Number.isFinite(value)) return ""
  return `${Math.round(value)}%`
}

/** Whole-number discount percentage, 0 when there is no real discount. */
export function discountPercent(originalPrice: number | null | undefined, price: number): number {
  if (!originalPrice || !Number.isFinite(originalPrice) || originalPrice <= price) return 0
  return Math.round(((originalPrice - price) / originalPrice) * 100)
}

type DateStyle = "long" | "short"

const dateFormatters: Record<DateStyle, Intl.DateTimeFormat> = {
  long: new Intl.DateTimeFormat("vi-VN", { timeZone: VN_TIME_ZONE, day: "2-digit", month: "long", year: "numeric" }),
  short: new Intl.DateTimeFormat("vi-VN", { timeZone: VN_TIME_ZONE, day: "2-digit", month: "2-digit", year: "numeric" }),
}

/** Explicit vi-VN / Asia/Ho_Chi_Minh date. Invalid input yields an empty string. */
export function formatDate(value: string | number | Date, style: DateStyle = "long"): string {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return ""
  return dateFormatters[style].format(date)
}

const dateTimeFormatter = new Intl.DateTimeFormat("vi-VN", {
  timeZone: VN_TIME_ZONE,
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
})

/** Short date plus 24h time ("07:05 07/10/2026" in vi-VN). Invalid input yields an empty string. */
export function formatDateTime(value: string | number | Date): string {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return ""
  return dateTimeFormatter.format(date)
}
