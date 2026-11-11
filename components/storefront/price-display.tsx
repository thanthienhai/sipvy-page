import { discountPercent, formatPercent, formatVnd } from "@/lib/format"
import { cn } from "@/lib/utils"

interface PriceDisplayProps {
  price: number
  originalPrice?: number | null
  /** Prefix "Từ" for ranges / products with variants. */
  from?: boolean
  /** Show the "-20%" chip next to the strikethrough price. */
  showPercent?: boolean
  size?: "sm" | "md" | "lg"
  tone?: "green" | "amber"
  className?: string
}

const sizeClasses = {
  sm: { current: "text-sm md:text-base", original: "text-xs" },
  md: { current: "text-base md:text-lg", original: "text-xs md:text-sm" },
  lg: { current: "text-2xl md:text-3xl", original: "text-base md:text-lg" },
}

const toneClasses = { green: "text-green-800", amber: "text-amber-800" }

/**
 * Current price, optional original price and discount percentage.
 * Screen readers get explicit "Giá gốc" / "Giảm" labels instead of just a
 * struck-through number and a colour-coded chip.
 */
export default function PriceDisplay({ price, originalPrice, from = false, showPercent = true, size = "md", tone = "green", className }: PriceDisplayProps) {
  const percent = discountPercent(originalPrice, price)
  const sizes = sizeClasses[size]

  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-0.5", className)}>
      {from && <span className="text-xs text-stone-600">Từ</span>}
      <span className={cn("font-bold", sizes.current, toneClasses[tone])}>{formatVnd(price)}</span>
      {percent > 0 && typeof originalPrice === "number" && (
        <>
          <del className={cn("text-stone-600", sizes.original)}>
            <span className="sr-only">Giá gốc </span>
            {formatVnd(originalPrice)}
          </del>
          {showPercent && (
            <span className={cn("font-semibold text-red-700", sizes.original)}>
              <span className="sr-only">Giảm </span>
              <span aria-hidden="true">-</span>
              {formatPercent(percent)}
            </span>
          )}
        </>
      )}
    </div>
  )
}
