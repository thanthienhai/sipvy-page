import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import PriceDisplay from '@/components/storefront/price-display'
import RelatedProductAction from '@/components/product/related-product-action'
import { discountPercent } from '@/lib/format'
import { computeProductAggregates } from '@/lib/data/product-aggregates'
import { Product } from '@/lib/types'

interface RelatedProductsProps {
  products: Product[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null

  const getAverageRating = (product: Product) => {
    if (product.reviews.length === 0) return 0
    return product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
  }

  /** The default variant exists only when exactly one variant is ACTIVE and in stock. */
  const getDefaultVariant = (product: Product) => {
    const sellable = (product.variants || product.weight).filter(
      (variant) => variant.status === 'ACTIVE' && variant.inStock && variant.stockQuantity > 0,
    )
    if (sellable.length !== 1) return null
    const [variant] = sellable
    return {
      id: variant.id,
      sku: variant.sku,
      boxType: variant.boxType,
      weight: variant.weight,
      price: variant.price,
      stockQuantity: variant.stockQuantity,
    }
  }

  return (
    <section>
      <h2 className="text-2xl font-sans text-green-900 font-medium tracking-tight mb-6">
        Sản phẩm liên quan
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => {
          const averageRating = getAverageRating(product)
          const hasPriceRange = computeProductAggregates(product.variants || product.weight, product).maxPrice > product.price
          
          return (
            <Card
              key={product.id}
              className="overflow-hidden border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-md group"
            >
              <Link href={`/san-pham/${product.slug}`}>
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={product.images[0]?.url || '/placeholder.svg'}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {discountPercent(product.originalPrice, product.price) > 0 && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                        -{discountPercent(product.originalPrice, product.price)}%
                      </span>
                    </div>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-white text-gray-900 px-3 py-1 rounded text-sm font-medium">
                        Hết hàng
                      </span>
                    </div>
                  )}
                </div>
              </Link>
              
              <CardContent className="p-4">
                <Link href={`/san-pham/${product.slug}`}>
                  <h3 className="font-medium text-green-900 mb-1 hover:text-green-700 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>
                
                <p className="text-sm text-gray-500 mb-2 line-clamp-1">
                  {product.shortDescription}
                </p>
                
                {/* Rating */}
                {product.reviews.length > 0 && (
                  <div className="flex items-center gap-1 mb-2">
                      <div
                        className="flex"
                        role="img"
                        aria-label={`Đánh giá ${averageRating.toFixed(1)} trên 5 sao`}
                      >
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            aria-hidden="true"
                            className={`h-3 w-3 ${
                            i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      ({product.reviews.length})
                    </span>
                  </div>
                )}
                
                {/* Price */}
                <PriceDisplay
                  className="mb-3"
                  price={product.price}
                  originalPrice={product.originalPrice}
                  from={hasPriceRange}
                  showPercent={false}
                />
                
                {/* Action Buttons */}
                <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="text-green-800 border-green-200 hover:bg-green-100 hover:text-green-900 w-full xs:w-auto"
                  >
                    <Link href={`/san-pham/${product.slug}`}>Chi tiết</Link>
                  </Button>
                  <RelatedProductAction
                    productId={product.id}
                    slug={product.slug}
                    name={product.name}
                    image={product.images[0]?.url || '/placeholder.svg'}
                    inStock={product.inStock}
                    defaultVariant={getDefaultVariant(product)}
                  />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
      
      {/* View All Products Link */}
      <div className="flex justify-center mt-8">
        <Button asChild variant="outline" className="text-green-700 border-green-200 hover:bg-green-50">
          <Link href="/san-pham">Xem tất cả sản phẩm</Link>
        </Button>
      </div>
    </section>
  )
}
