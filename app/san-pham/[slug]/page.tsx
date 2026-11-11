import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getProductBySlug, getProducts, getRelatedProducts } from "@/lib/data/products"
import { computeProductAggregates } from "@/lib/data/product-aggregates"
import { SITE_URL, withBase } from "@/lib/config"
import { safeJsonLd } from "@/lib/json-ld"
import type { Product } from "@/lib/types"
import ProductImageGallery from "@/components/product/product-image-gallery"
import ProductDetailSections from "@/components/product/product-detail-sections"
import RelatedProducts from "@/components/product/related-products"
import ProductPurchaseControls from "@/components/product/product-purchase-controls"

// Xuất tĩnh: mỗi sản phẩm một trang HTML dựng sẵn lúc build; slug lạ trả 404.
export const dynamicParams = false
export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }))
}

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

const absoluteUrl = (url: string) =>
  /^https?:\/\//i.test(url) ? url : `${SITE_URL}${withBase(url.startsWith("/") ? url : `/${url}`)}`

/** Không bao giờ rỗng: mô tả ngắn, rồi mô tả đầy đủ, rồi tên + danh mục. */
function getProductDescription(product: Product): string {
  const text = (product.shortDescription || product.description || "").replace(/\s+/g, " ").trim()
  if (text) return text.length > 160 ? `${text.slice(0, 157).trimEnd()}...` : text
  return `${product.name} - ${product.category.name} chính hãng tại SIPVY`
}

function buildProductJsonLd(product: Product) {
  const variants = product.variants || product.weight
  const aggregates = computeProductAggregates(variants, product)
  const url = `${SITE_URL}${withBase(`/san-pham/${product.slug}/`)}`
  const availability = aggregates.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
  const offers =
    aggregates.maxPrice > aggregates.price
      ? {
          "@type": "AggregateOffer",
          priceCurrency: "VND",
          lowPrice: aggregates.price,
          highPrice: aggregates.maxPrice,
          offerCount: variants.length,
          availability,
          url,
        }
      : { "@type": "Offer", priceCurrency: "VND", price: aggregates.price, availability, url }

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: getProductDescription(product),
    image: product.images.map((image) => absoluteUrl(image.url)),
    sku: variants[0]?.sku || product.id,
    category: product.category.name,
    brand: { "@type": "Brand", name: "SIPVY" },
    url,
    offers,
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: "Không tìm thấy sản phẩm" }

  const description = getProductDescription(product)
  return {
    title: product.name,
    description,
    alternates: { canonical: `/san-pham/${product.slug}/` },
    openGraph: {
      title: `${product.name} | SIPVY`,
      description,
      type: "website",
      images: product.images[0]?.url ? [{ url: product.images[0].url, alt: product.name }] : undefined,
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const relatedProducts = getRelatedProducts(product.slug)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(buildProductJsonLd(product)) }} />
      {/* Breadcrumb */}
      <div className="bg-green-50 py-4">
        <div className="container px-4 md:px-6">
          <div className="flex items-center text-sm text-green-800">
            <Link href="/" className="hover:underline">Trang chủ</Link>
            <ChevronRight className="mx-1 h-4 w-4" />
            <Link href="/san-pham" className="hover:underline">Sản phẩm</Link>
            <ChevronRight className="mx-1 h-4 w-4" />
            <span>{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <div className="container px-4 pb-24 pt-8 md:px-6 md:py-8">
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <ProductImageGallery images={product.images} />
          </div>

          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category.name}
              </Badge>
              <h1 className="mb-2 font-sans text-3xl font-medium tracking-tight text-green-900">{product.name}</h1>
              <p className="mb-4 text-gray-700">{product.shortDescription}</p>
            </div>

            <ProductPurchaseControls product={product} />

            <Card className="border-green-100 bg-green-50/50">
              <CardContent className="grid gap-3 p-4 text-sm sm:grid-cols-2">
                <div><span className="font-medium text-green-900">Nguồn gốc:</span> <span className="text-gray-700">{product.origin || "Chưa cập nhật"}</span></div>
                <div><span className="font-medium text-green-900">Hạn dùng:</span> <span className="text-gray-700">{product.shelfLife || "Chưa cập nhật"}</span></div>
                <div className="sm:col-span-2"><span className="font-medium text-green-900">Bảo quản:</span> <span className="text-gray-700">{product.storageInstructions || "Chưa cập nhật"}</span></div>
              </CardContent>
            </Card>
          </div>
        </div>

        <ProductDetailSections product={product} />

        {relatedProducts.length > 0 && <RelatedProducts products={relatedProducts} />}
      </div>
    </>
  )
}
