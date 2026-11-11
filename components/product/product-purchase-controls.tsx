"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { formatVnd } from "@/lib/format"
import { Share2, ShoppingCart } from "lucide-react"

import { useCart } from "@/contexts/cart-context"
import { Product } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface ProductPurchaseControlsProps {
  product: Product
}

export default function ProductPurchaseControls({ product }: ProductPurchaseControlsProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const variants = product.variants || product.weight
  const firstAvailableWeight = variants.find((variant) => variant.inStock && variant.stockQuantity > 0) || variants[0]
  const [selectedWeightId, setSelectedWeightId] = useState(firstAvailableWeight?.id || "")
  const [quantityInput, setQuantityInput] = useState("1")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isSharePending, setIsSharePending] = useState(false)
  const [hasSeenPurchaseCta, setHasSeenPurchaseCta] = useState(false)
  const [showMobilePurchaseBar, setShowMobilePurchaseBar] = useState(false)
  const purchaseButtonRef = useRef<HTMLButtonElement>(null)

  const selectedWeight = useMemo(
    () => variants.find((variant) => variant.id === selectedWeightId),
    [variants, selectedWeightId]
  )
  const stockQuantity = Math.max(0, selectedWeight?.stockQuantity ?? 0)
  const isInStock = Boolean(selectedWeight && selectedWeight.status === "ACTIVE" && selectedWeight.inStock && stockQuantity > 0)
  const price = selectedWeight?.price ?? product.price
  const originalPrice =
    selectedWeight?.originalPrice && selectedWeight.originalPrice > selectedWeight.price ? selectedWeight.originalPrice : undefined
  const discountPercent = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0
  const image = product.images.find((item) => item.isPrimary)?.url || product.images[0]?.url || "/placeholder.svg"

  useEffect(() => {
    const target = purchaseButtonRef.current
    if (!target || typeof IntersectionObserver === "undefined") return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasSeenPurchaseCta(true)
          setShowMobilePurchaseBar(false)
        } else if (hasSeenPurchaseCta) {
          setShowMobilePurchaseBar(true)
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [hasSeenPurchaseCta])

  const handleAddToCart = () => {
    setError(null)
    setSuccess(false)

    const quantity = Number(quantityInput)
    if (!Number.isInteger(quantity) || quantity < 1) {
      setError("Số lượng phải là số nguyên lớn hơn 0.")
      return
    }
    if (!isInStock) {
      setError("Biến thể này hiện đã hết hàng.")
      return
    }
    if (!selectedWeight) {
      setError("Vui lòng chọn biến thể sản phẩm.")
      return
    }
    if (quantity > stockQuantity) {
      setError(`Sản phẩm chỉ còn ${stockQuantity} sản phẩm.`)
      return
    }

    addToCart({
      productId: product.id,
      variantId: selectedWeight.id,
      sku: selectedWeight.sku,
      boxType: selectedWeight.boxType,
      slug: product.slug,
      name: product.name,
      image,
      price,
      weight: selectedWeight.weight,
      stockQuantity,
      quantity,
    })
    setSuccess(true)
  }

  // Auto-clear the inline mobile-bar feedback so it does not linger over the page.
  useEffect(() => {
    if (!success) return
    const timer = window.setTimeout(() => setSuccess(false), 4000)
    return () => window.clearTimeout(timer)
  }, [success])

  const handleShare = async () => {
    if (isSharePending) return
    setIsSharePending(true)
    // Canonical product URL: never leak ?returnTo=... or other transient query params.
    const base = (process.env.NEXT_PUBLIC_APP_URL || window.location.origin).replace(/\/$/, "")
    const url = `${base}/san-pham/${product.slug}`
    const shareData = {
      title: product.name,
      text: product.shortDescription || `Khám phá ${product.name} tại SIPVY`,
      url,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        toast({ title: "Đã chia sẻ sản phẩm" })
      } else {
        await navigator.clipboard.writeText(url)
        toast({ title: "Đã sao chép liên kết", description: "Bạn có thể dán liên kết để chia sẻ sản phẩm." })
      }
    } catch (shareError) {
      if (shareError instanceof DOMException && shareError.name === "AbortError") return

      try {
        await navigator.clipboard.writeText(url)
        toast({ title: "Đã sao chép liên kết", description: "Trình duyệt không hỗ trợ chia sẻ trực tiếp." })
      } catch {
        toast({ title: "Không thể chia sẻ", description: "Hãy sao chép đường dẫn trên thanh địa chỉ.", variant: "destructive" })
      }
    } finally {
      setIsSharePending(false)
    }
  }

  const message = error ? (
    <p className="text-red-600">{error}</p>
  ) : success ? (
    <div className="flex items-center gap-2 text-green-700">
      <Badge variant="secondary" className="bg-green-100 text-green-800">Đã thêm</Badge>
      Sản phẩm đã được thêm vào giỏ hàng.
    </div>
  ) : null

  return (
    <>
      {/* Price follows the selected variant (shared state with the purchase controls). */}
      <div className="space-y-2" data-testid="product-price">
        <div className="flex flex-wrap items-center gap-x-3">
          <span className="text-3xl font-bold text-green-800">{formatVnd(price)}</span>
          {originalPrice && (
            <span className="text-lg text-gray-500 line-through">{formatVnd(originalPrice)}</span>
          )}
        </div>
        {originalPrice && discountPercent > 0 && <Badge variant="destructive">Tiết kiệm {discountPercent}%</Badge>}
      </div>

      {variants.length > 0 && (
        <div className="space-y-2">
          <label htmlFor="product-weight" className="text-sm font-medium text-green-900">Khối lượng:</label>
          <Select value={selectedWeightId} onValueChange={(value) => {
            setSelectedWeightId(value)
            setError(null)
            setSuccess(false)
          }}>
            <SelectTrigger id="product-weight" className="w-full" aria-label="Chọn biến thể">
              <SelectValue placeholder="Chọn biến thể" />
            </SelectTrigger>
            <SelectContent>
              {variants.map((weight) => (
                <SelectItem key={weight.id} value={weight.id} disabled={weight.status !== "ACTIVE" || !weight.inStock || weight.stockQuantity < 1}>
                  {weight.weight} · {weight.boxType} - {formatVnd(weight.price)}{!weight.inStock ? " (Hết hàng)" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="product-quantity" className="text-sm font-medium text-green-900">Số lượng:</label>
        <Input
          id="product-quantity"
          type="number"
          min={1}
          max={Math.max(1, stockQuantity)}
          value={quantityInput}
          onChange={(event) => {
            setQuantityInput(event.target.value)
            setError(null)
            setSuccess(false)
          }}
          className="w-28"
          disabled={!isInStock}
          aria-describedby="product-purchase-message"
        />
      </div>

      <div className="flex items-center gap-2">
        <div aria-hidden="true" className={`w-3 h-3 rounded-full ${isInStock ? "bg-green-500" : "bg-red-500"}`} />
        <span className={`text-sm ${isInStock ? "text-green-700" : "text-red-700"}`}>
          {isInStock ? `Còn hàng (${stockQuantity} sản phẩm)` : "Hết hàng"}
        </span>
      </div>

      <div className="space-y-3">
        <Button
          ref={purchaseButtonRef}
          type="button"
          className="w-full bg-green-800 hover:bg-green-900 text-white h-12"
          disabled={!isInStock}
          onClick={handleAddToCart}
          aria-label={isInStock ? "Thêm sản phẩm vào giỏ hàng" : "Sản phẩm hết hàng"}
        >
          <ShoppingCart className="mr-2 h-5 w-5" aria-hidden="true" />
          {isInStock ? "Thêm vào giỏ hàng" : "Hết hàng"}
        </Button>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={handleShare}
            disabled={isSharePending}
            aria-label="Chia sẻ sản phẩm"
          >
            <Share2 className="mr-2 h-4 w-4" aria-hidden="true" />
            Chia sẻ
          </Button>
        </div>
      </div>

      {/* While the sticky mobile bar is showing, its own live region announces the result instead. */}
      <div
        id="product-purchase-message"
        aria-live={showMobilePurchaseBar ? "off" : "polite"}
        className="min-h-5 text-sm"
      >
        {message}
      </div>

      {showMobilePurchaseBar && (
        <div className="storefront-bottom-bar storefront-bottom-bar--purchase fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 px-4 py-3 shadow-[0_-4px_16px_rgba(28,25,23,0.12)] backdrop-blur md:hidden">
          <div
            role="status"
            aria-live="polite"
            className="mx-auto mb-2 max-w-2xl text-sm empty:hidden"
            data-testid="purchase-bar-message"
          >
            {message}
          </div>
          <div className="mx-auto flex max-w-2xl items-center gap-3 pb-[env(safe-area-inset-bottom)]">
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs text-stone-600">
                {selectedWeight ? `${selectedWeight.weight} · ${selectedWeight.boxType}` : "Sản phẩm"}
              </p>
              <p className="text-base font-semibold text-green-800">{formatVnd(price)}</p>
            </div>
            <Button
              type="button"
              className="h-11 shrink-0 bg-green-800 px-4 text-white hover:bg-green-900"
              disabled={!isInStock}
              onClick={handleAddToCart}
              aria-label={isInStock ? "Thêm sản phẩm vào giỏ hàng" : "Sản phẩm hết hàng"}
            >
              <ShoppingCart className="mr-2 h-4 w-4" aria-hidden="true" />
              {isInStock ? "Thêm vào giỏ" : "Hết hàng"}
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
