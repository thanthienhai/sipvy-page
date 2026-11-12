"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { getProductBySlug } from "@/lib/data/products"
import { formatVnd } from "@/lib/format"

interface MoodData {
  key: string
  label: string
  sub: string
  badge: string
  title: string
  desc: string
  slug: string
  prepTime: string
  tip: string
}

const MOODS: MoodData[] = [
  {
    key: "deadline",
    label: "Cày Deadline",
    sub: "Trà đậm vị cho buổi làm việc dài",
    badge: "Chế độ: Deadline Slayer",
    title: "Shan Tuyết đậm vị cho buổi làm việc dài",
    desc: "Trà Shan Tuyết cổ thụ hậu vị đậm, ngọt dịu. Hợp để pha một bình lớn đặt cạnh bàn làm việc.",
    slug: "tra-tra-shan-tuyet-1",
    prepTime: "60 giây đánh bọt",
    tip: "Mẹo nhỏ: Pha cùng sữa yến mạch (Oat milk) thêm chút đá viên để có ly latte chuẩn quán.",
  },
  {
    key: "chill",
    label: "Chill Buổi Tối",
    sub: "Trà thảo mộc dịu nhẹ buổi tối",
    badge: "Chế độ: Chill Tối",
    title: "Trà thảo mộc dịu nhẹ buổi tối",
    desc: "Trà thảo mộc hương thơm nhẹ, không chứa lá trà nên hợp cho buổi tối. Hãm nóng và thưởng thức chậm sau một ngày dài.",
    slug: "tra-tra-thao-moc-35",
    prepTime: "3 phút hãm nóng",
    tip: "Mẹo nhỏ: Thưởng thức lúc 21:00 tối kết hợp nghe playlist Lofi chill.",
  },
  {
    key: "glow",
    label: "Nhẹ Nhàng Thanh Vị",
    sub: "Vị thanh, hậu ngọt dịu",
    badge: "Chế độ: Thanh Vị",
    title: "Shan Tuyết thanh nhẹ, hậu ngọt",
    desc: "Hương vị thanh nhẹ, hậu ngọt dịu từ búp mầm Shan Tuyết Tây Côn Lĩnh. Hợp để thưởng thức nhẹ nhàng trong ngày.",
    slug: "tra-tra-shan-tuyet-1",
    prepTime: "Ủ lạnh 4 tiếng",
    tip: "Mẹo nhỏ: Thả thêm 2 lát dưa chuột hoặc chanh vàng vào bình nước để thêm hương thơm mát.",
  },
  {
    key: "milktea",
    label: "Thèm Trà Sữa",
    sub: "Thơm dịu, hợp pha cùng sữa",
    badge: "Chế độ: Trà Sữa Mộc",
    title: "Ô Long thơm dịu, hợp pha cùng sữa",
    desc: "Ô Long thơm dịu, hậu ngọt. Pha đậm rồi thêm sữa và đá để có ly trà sữa mộc tại bàn làm việc.",
    slug: "tra-tra-o-long-21",
    prepTime: "5 phút tại bàn làm việc",
    tip: "Mẹo nhỏ: Dùng sữa tươi thanh trùng + 1 thìa mật ong, béo ngậy và dễ uống.",
  },
]

/** Lấy tên, giá, ảnh từ danh mục thật (không viết cứng giá ở đây). */
function resolveProduct(slug: string) {
  const product = getProductBySlug(slug)
  if (!product) return null
  const variant = product.weight[0]
  return {
    product,
    variant,
    name: `${product.name}${variant ? ` (${variant.weight})` : ""}`,
    price: variant?.price ?? product.price,
    image: product.images?.[0]?.url ?? "/art/cat-xanh.svg",
  }
}

export default function MoodMatcher() {
  const [selectedKey, setSelectedKey] = useState("deadline")
  const { addToCart } = useCart()

  const mood = MOODS.find((m) => m.key === selectedKey) || MOODS[0]
  const resolved = resolveProduct(mood.slug)
  if (!resolved) return null
  const current = { ...mood, productName: resolved.name, priceFormatted: formatVnd(resolved.price), img: resolved.image }

  const handleQuickAdd = () => {
    const { product, variant } = resolved
    addToCart({
      productId: product.id,
      variantId: variant?.id ?? `${product.id}:0`,
      name: product.name,
      slug: product.slug,
      sku: variant?.sku,
      price: resolved.price,
      weight: variant?.weight ?? "Tiêu chuẩn",
      boxType: variant?.boxType,
      image: resolved.image,
      quantity: 1,
    })
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${current.productName} (${current.priceFormatted})`,
    })
  }

  return (
    <section id="mood-matcher" className="py-16 md:py-24 bg-white border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.2em] font-extrabold text-emerald-600 block mb-1">
            Chọn Theo Tâm Trạng
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hôm nay tâm trạng bạn thế nào?
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Chọn trạng thái hiện tại, SIPVY gợi ý một loại trà cùng cách thưởng thức:
          </p>
        </div>

        {/* Mood Selector Photo Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-8">
          {MOODS.map((mood) => {
            const isActive = mood.key === selectedKey
            return (
              <button
                key={mood.key}
                type="button"
                onClick={() => setSelectedKey(mood.key)}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex items-center gap-3.5 group cursor-pointer ${
                  isActive
                    ? "border-emerald-600 bg-emerald-50/70 shadow-md"
                    : "border-slate-200 bg-white hover:border-emerald-400 hover:shadow-sm"
                }`}
              >
                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                  <Image
                    src={resolveProduct(mood.slug)?.image ?? "/art/cat-xanh.svg"}
                    alt={mood.label}
                    fill
                    sizes="60px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">{mood.label}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-2">
                    {mood.sub}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Dynamic Recommendation Box */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-emerald-900/60">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Real Product Image */}
            <div className="md:col-span-4 relative rounded-2xl overflow-hidden h-52 sm:h-56 border border-slate-700/80 bg-slate-900">
              <Image
                src={current.img}
                alt={current.productName}
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover"
              />
            </div>

            {/* Content Details */}
            <div className="md:col-span-5 space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                {current.badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {current.desc}
              </p>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-emerald-300">
                <span>{current.tip}</span>
              </div>
            </div>

            {/* Pricing & CTA Card */}
            <div className="md:col-span-3 bg-slate-800/90 p-4 rounded-2xl border border-slate-700 text-center space-y-2.5">
              <div className="text-[11px] text-slate-400 font-bold uppercase">Gợi ý chuẩn gu</div>
              <div className="font-bold text-sm text-white line-clamp-1">{current.productName}</div>
              <div className="text-2xl font-black text-emerald-400">{current.priceFormatted}</div>
              <div className="text-[11px] text-slate-400">Thời gian: {current.prepTime}</div>
              
              <Button
                type="button"
                onClick={handleQuickAdd}
                className="w-full h-10 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs tracking-wider uppercase transition-all shadow-md"
              >
                Chọn vị này ngay
              </Button>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
