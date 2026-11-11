"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"

interface MoodData {
  key: string
  label: string
  sub: string
  badge: string
  title: string
  desc: string
  productName: string
  slug: string
  price: number
  priceFormatted: string
  prepTime: string
  tip: string
  img: string
  avatar: string
}

const MOODS: MoodData[] = [
  {
    key: "deadline",
    label: "Cày Deadline",
    sub: "Tỉnh táo êm đềm 6 tiếng, không run tay",
    badge: "Chế độ: Deadline Slayer",
    title: "Matcha Shan Tuyết & Cold Brew Đậm Vị",
    desc: "Lượng caffeine tự nhiên từ búp chè cổ thụ kết hợp L-Theanine giải phóng năng lượng từ từ, giúp bạn ngồi lì 5-6 tiếng tập trung cao độ mà không hề bị run tay hay mệt lả sau đó.",
    productName: "Bột Matcha Shan Tuyết Cổ Thụ (50g)",
    slug: "tra-tra-shan-tuyet-1",
    price: 185000,
    priceFormatted: "185.000đ",
    prepTime: "60 giây đánh bọt",
    tip: "Mẹo nhỏ: Pha cùng sữa yến mạch (Oat milk) thêm chút đá viên để có ly latte chuẩn quán.",
    img: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&auto=format&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=160&auto=format&fit=crop&q=80",
  },
  {
    key: "chill",
    label: "Xả Stress, Relax",
    sub: "Thư giãn đầu óc, an thần ngủ sâu",
    badge: "Chế độ: Anti-Stress Calm",
    title: "Trà Hoa Cúc Tiến Vua & Kỷ Tử Đỏ",
    desc: "0% caffeine, hương thơm hoa cúc dịu nhẹ làm giãn các cơ bắp căng thẳng sau 8 tiếng dán mắt vào màn hình máy tính. Giúp an thần và đi vào giấc ngủ sâu êm ái.",
    productName: "Trà Thảo Mộc Hoa Cúc & Táo Đỏ",
    slug: "tra-tra-thao-moc-35",
    price: 139000,
    priceFormatted: "139.000đ",
    prepTime: "3 phút hãm nóng",
    tip: "Mẹo nhỏ: Thưởng thức lúc 21:00 tối kết hợp nghe playlist Lofi chill.",
    img: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=800&auto=format&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=160&auto=format&fit=crop&q=80",
  },
  {
    key: "glow",
    label: "Skincare & Đẹp Da",
    sub: "Vị thanh nhẹ, hậu ngọt dịu",
    badge: "Chế độ: Inner Glow",
    title: "Bạch Trà Shan Tuyết Đỉnh Tây Côn Lĩnh",
    desc: "Hương vị thanh nhẹ, hậu ngọt dịu từ búp mầm Shan Tuyết Tây Côn Lĩnh. Hợp để thưởng thức nhẹ nhàng trong ngày.",
    productName: "Bạch Trà Shan Tuyết Búp Mầm (15 túi)",
    slug: "tra-tra-shan-tuyet-1",
    price: 165000,
    priceFormatted: "165.000đ",
    prepTime: "Ủ lạnh 4 tiếng",
    tip: "Mẹo nhỏ: Thả thêm 2 lát dưa chuột hoặc chanh vàng vào bình nước để thêm hương thơm mát.",
    img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=160&auto=format&fit=crop&q=80",
  },
  {
    key: "milktea",
    label: "Thèm Trà Sữa",
    sub: "Đậm vị béo mộc, 0g béo hoá học",
    badge: "Chế độ: Gu Trà Sữa Healthy 0g Hoá Chất",
    title: "Hồng Trà Cổ Thụ Tà Xùa Đậm Vị",
    desc: "Thoả mãn cơn thèm trà sữa mà không lo tăng cân! Cốt trà hái từ búp chè lên men tự nhiên cực kỳ dậy mùi thơm mật ong và hoa quả chín, quyện cùng sữa tươi là đỉnh nóc kịch trần.",
    productName: "Set Tự Pha Trà Sữa Cổ Thụ (15 túi)",
    slug: "tra-tra-o-long-21",
    price: 119000,
    priceFormatted: "119.000đ",
    prepTime: "5 phút tại bàn làm việc",
    tip: "Mẹo nhỏ: Dùng sữa tươi thanh trùng + 1 thìa mật ong nguyên chất, ngon ngậy mà cực lành mạnh.",
    img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=160&auto=format&fit=crop&q=80",
  },
]

export default function MoodMatcher() {
  const [selectedKey, setSelectedKey] = useState("deadline")
  const { addToCart } = useCart()

  const current = MOODS.find((m) => m.key === selectedKey) || MOODS[0]

  const handleQuickAdd = () => {
    addToCart({
      productId: current.slug,
      variantId: `${current.slug}-default`,
      name: current.productName,
      slug: current.slug,
      price: current.price,
      weight: "Tiêu chuẩn",
      image: current.img,
      quantity: 1,
    })
    toast({
      title: "Đã thêm vào giỏ hàng!",
      description: `${current.productName} (${current.priceFormatted})`,
    })
  }

  return (
    <section id="mood-matcher" className="py-16 md:py-24 bg-white border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.2em] font-extrabold text-emerald-600 block mb-1">
            Cá Nhân Hoá Theo Cảm Xúc
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hôm nay tâm trạng bạn thế nào?
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Chọn trạng thái hiện tại, SIPVY sẽ gợi ý thức uống hoàn hảo nhất cùng công thức thưởng thức:
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
                    src={mood.avatar}
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
