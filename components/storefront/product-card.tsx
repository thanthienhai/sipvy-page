import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { Star } from "lucide-react"

import { ProductListLink } from "@/components/product/product-list-navigation"
import PriceDisplay from "@/components/storefront/price-display"
import StatusBadge, { stockStatus } from "@/components/storefront/status-badge"
import { discountPercent } from "@/lib/format"
import { cn } from "@/lib/utils"

/** Minimal shape shared by storefront products, Prisma rows and combos. */
export interface ProductCardData {
  name: string
  slug: string
  /** Image URL; a placeholder is used when missing. */
  image?: string | null
  price: number
  originalPrice?: number | null
  categoryName?: string | null
  description?: string | null
  inStock?: boolean
  /** Remaining units (products) or sets (combos); enables the "low stock" state. */
  stockQuantity?: number | null
  featured?: boolean
  /** True when variants have different prices, so the card shows "Từ <price>". */
  priceFrom?: boolean
}

interface ProductCardProps {
  item: ProductCardData
  /** "product" links to /san-pham/<slug>, "combo" to /combo/<slug>. */
  variant?: "product" | "combo"
  tone?: "green" | "amber"
  /** `sizes` hint matching the grid the card is placed in. */
  sizes?: string
  priority?: boolean
  showStock?: boolean
  /** Overrides the default detail URL (e.g. to append a `returnTo` query). */
  href?: string
  /** Saves the catalog scroll position before navigating (client link; the card itself stays a server component). */
  trackListNavigation?: boolean
  /** Optional footer slot (e.g. a price note). Must not contain links or buttons: the card is one link. */
  footer?: ReactNode
  className?: string
}

const PRODUCT_SIZES = "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
const COMBO_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"

/**
 * Server component: one product/combo card used by home, campaign landings and
 * the combo grid. The whole card is a single link (no nested interactive content).
 */
export default function ProductCard({
  item,
  variant = "product",
  tone = "green",
  sizes,
  priority = false,
  showStock = true,
  footer,
  href: hrefOverride,
  trackListNavigation = false,
  className,
}: ProductCardProps) {
  const isCombo = variant === "combo"
  const href = hrefOverride ?? (isCombo ? `/combo/${item.slug}` : `/san-pham/${item.slug}`)
  const percent = discountPercent(item.originalPrice, item.price)
  const stockKey = stockStatus(item.inStock ?? true, item.stockQuantity)
  const stockLabel =
    isCombo && stockKey !== "OUT_OF_STOCK" && typeof item.stockQuantity === "number"
      ? `Còn hàng (${item.stockQuantity} bộ)`
      : undefined
  const amber = tone === "amber"

  const linkProps = {
    href,
    className: cn(
      "group block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2",
      className,
    ),
  }
  const card = (
      <article
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md",
          amber ? "hover:border-amber-700" : "hover:border-green-700",
        )}
      >
        <div className={cn("relative w-full overflow-hidden bg-stone-100", isCombo ? "aspect-[4/3]" : "aspect-square")}>
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            fill
            sizes={sizes ?? (isCombo ? COMBO_SIZES : PRODUCT_SIZES)}
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          {percent > 0 ? (
            <span aria-hidden="true" className="absolute left-3 top-3 rounded-md bg-red-700 px-2 py-0.5 text-xs font-semibold text-white">
              -{percent}%
            </span>
          ) : (
            item.featured && (
              <span className="absolute left-3 top-3 inline-flex items-center gap-0.5 rounded-md bg-amber-700 px-2 py-0.5 text-xs font-semibold text-white">
                <Star className="h-3 w-3 fill-white" aria-hidden="true" /> Nổi bật
              </span>
            )
          )}
        </div>
        <div className="flex flex-1 flex-col p-3 md:p-4">
          {item.categoryName && (
            <p className={cn("mb-1 line-clamp-1 text-xs font-semibold uppercase tracking-wide", amber ? "text-amber-800" : "text-green-800")}>
              {item.categoryName}
            </p>
          )}
          <h3
            className={cn(
              "mb-1 line-clamp-2 text-sm font-semibold text-stone-900 transition-colors md:text-base",
              amber ? "group-hover:text-amber-800" : "group-hover:text-green-800",
            )}
          >
            {item.name}
          </h3>
          {item.description && <p className="mb-2 line-clamp-2 text-sm text-stone-600">{item.description}</p>}
          <div className="mt-auto space-y-2 pt-2">
            <PriceDisplay price={item.price} originalPrice={item.originalPrice} from={item.priceFrom} tone={tone} />
            {showStock && <StatusBadge kind="stock" status={stockKey} label={stockLabel} />}
          </div>
          {footer && <div className="mt-3">{footer}</div>}
        </div>
      </article>
  )

  return trackListNavigation ? <ProductListLink {...linkProps}>{card}</ProductListLink> : <Link {...linkProps}>{card}</Link>
}
