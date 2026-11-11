"use client"

import { useRef, useState, type KeyboardEvent, type TouchEvent } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ProductImage } from "@/lib/types"

interface ProductImageGalleryProps {
  images: ProductImage[]
}

const SWIPE_THRESHOLD = 40

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  // Refs, not state: a touch gesture must not re-render the gallery on every start/cancel.
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  const selectedImage = images[selectedImageIndex] || images[0]

  if (!selectedImage) {
    return (
      <div className="relative aspect-square overflow-hidden rounded-lg bg-stone-100">
        <Image src="/placeholder.svg" alt="Chưa có ảnh sản phẩm" fill className="object-contain p-10" />
      </div>
    )
  }

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleMainImageKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      prevImage()
    }
    if (event.key === "ArrowRight") {
      event.preventDefault()
      nextImage()
    }
  }

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0]
    // Multi-touch (pinch) is never a swipe.
    touchStart.current = touch && event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null
  }

  const handleTouchCancel = () => {
    touchStart.current = null
  }

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current
    touchStart.current = null
    const touch = event.changedTouches[0]
    if (!start || !touch) return
    const deltaX = touch.clientX - start.x
    const deltaY = touch.clientY - start.y
    // Vertical scrolls (|dy| >= |dx|) and short drags are not swipes.
    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) <= Math.abs(deltaY)) return
    if (deltaX < 0) nextImage()
    else prevImage()
  }

  return (
    <div className="space-y-4">
      <div
        className="relative aspect-square touch-pan-y overflow-hidden rounded-lg bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
        tabIndex={images.length > 1 ? 0 : undefined}
        role={images.length > 1 ? "group" : undefined}
        aria-label={images.length > 1 ? "Thư viện ảnh sản phẩm. Dùng phím mũi tên hoặc vuốt để đổi ảnh." : undefined}
        onKeyDown={handleMainImageKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
      >
        <Image
          src={selectedImage.url}
          alt={selectedImage.alt || `Ảnh sản phẩm ${selectedImageIndex + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
        />

        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 h-10 w-10 -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={prevImage}
              aria-label="Ảnh trước"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={nextImage}
              aria-label="Ảnh sau"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </>
        )}

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-2 h-10 w-10 bg-white/80 hover:bg-white"
              aria-label="Phóng to ảnh sản phẩm"
            >
              <ZoomIn className="h-4 w-4" aria-hidden="true" />
            </Button>
          </DialogTrigger>
          <DialogContent
            className="max-w-4xl"
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") {
                event.preventDefault()
                prevImage()
              }
              if (event.key === "ArrowRight") {
                event.preventDefault()
                nextImage()
              }
            }}
          >
            <DialogTitle className="sr-only">Ảnh sản phẩm {selectedImageIndex + 1}</DialogTitle>
            <DialogDescription className="sr-only">
              Dùng phím mũi tên trái/phải để chuyển ảnh. Nhấn Escape để đóng.
            </DialogDescription>
            <div className="relative aspect-square">
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt || `Ảnh sản phẩm ${selectedImageIndex + 1}`}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-contain"
              />
              {images.length > 1 && (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white"
                    onClick={prevImage}
                    aria-label="Ảnh trước"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white"
                    onClick={nextImage}
                    aria-label="Ảnh sau"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </Button>
                  <div className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 text-sm text-white" aria-hidden="true">
                    {selectedImageIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {images.length > 1 && (
          <div className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-sm text-white" aria-live="polite">
            {selectedImageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2" role="group" aria-label="Chọn ảnh sản phẩm">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              className={`relative aspect-square overflow-hidden rounded-md border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 ${
                index === selectedImageIndex ? "border-green-500" : "border-gray-200 hover:border-green-300"
              }`}
              onClick={() => setSelectedImageIndex(index)}
              aria-label={`Xem ảnh ${index + 1}`}
              aria-current={index === selectedImageIndex ? "true" : undefined}
            >
              <Image
                src={image.url}
                alt={image.alt || `Ảnh sản phẩm ${index + 1}`}
                fill
                sizes="100px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {images.length > 1 && (
        // Decorative duplicate of the thumbnail buttons above: hidden from assistive tech and the tab order.
        <div className="flex justify-center gap-2 md:hidden" aria-hidden="true">
          {images.map((image, index) => (
            <button
              key={image.id || index}
              type="button"
              tabIndex={-1}
              className="flex h-11 w-11 items-center justify-center rounded-full transition-colors"
              onClick={() => setSelectedImageIndex(index)}
            >
              <span
                className={`h-2.5 w-2.5 rounded-full ${index === selectedImageIndex ? "bg-green-600" : "bg-gray-300"}`}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
