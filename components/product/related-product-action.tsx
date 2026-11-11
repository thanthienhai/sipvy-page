"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

export interface RelatedProductActionVariant {
  id: string
  sku: string
  boxType: string
  weight: string
  price: number
  stockQuantity: number
}

interface RelatedProductActionProps {
  productId: string
  slug: string
  name: string
  image: string
  inStock: boolean
  /** Set only when the product has exactly one ACTIVE in-stock variant (the unambiguous default). */
  defaultVariant: RelatedProductActionVariant | null
}

/** Real add-to-cart for the unambiguous case; otherwise a link to the product page to pick a variant. */
export default function RelatedProductAction({
  productId,
  slug,
  name,
  image,
  inStock,
  defaultVariant,
}: RelatedProductActionProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [added, setAdded] = useState(false)

  if (!inStock) {
    return (
      <Button size="sm" className="w-full xs:w-auto" disabled>
        Hết hàng
      </Button>
    )
  }

  if (!defaultVariant) {
    return (
      <Button asChild size="sm" className="bg-green-800 text-white hover:bg-green-900 w-full xs:w-auto">
        <Link href={`/san-pham/${slug}`}>Chọn biến thể</Link>
      </Button>
    )
  }

  const handleAdd = () => {
    addToCart({
      productId,
      variantId: defaultVariant.id,
      sku: defaultVariant.sku,
      boxType: defaultVariant.boxType,
      slug,
      name,
      image,
      price: defaultVariant.price,
      weight: defaultVariant.weight,
      stockQuantity: defaultVariant.stockQuantity,
      quantity: 1,
    })
    setAdded(true)
    toast({ title: "Đã thêm vào giỏ hàng", description: `${name} · ${defaultVariant.weight}` })
    window.setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Button
      type="button"
      size="sm"
      className="bg-green-800 hover:bg-green-900 text-white w-full xs:w-auto"
      onClick={handleAdd}
      aria-label={`Thêm ${name} vào giỏ hàng`}
    >
      {added ? <Check className="h-4 w-4 mr-1" aria-hidden="true" /> : <ShoppingCart className="h-4 w-4 mr-1" aria-hidden="true" />}
      {added ? "Đã thêm" : "Thêm vào giỏ"}
    </Button>
  )
}
