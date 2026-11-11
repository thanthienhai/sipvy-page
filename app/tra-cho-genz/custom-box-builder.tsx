"use client"

import { useState } from "react"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"

interface FlavorItem {
  id: string
  name: string
  desc: string
  pricePerPortion: number
  portions: number // each portion = 5 bags
  img: string
}

interface PackagingOption {
  id: string
  name: string
  desc: string
  extraPrice: number
  img: string
}

const PACKAGING_OPTIONS: PackagingOption[] = [
  {
    id: "kraft",
    name: "Hộp Kraft Tối Giản",
    desc: "Giấy tái chế eco mộc",
    extraPrice: 0,
    img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "giftbox",
    name: "Hộp Quà Sang Trọng",
    desc: "Kèm quai xách & thiệp tay",
    extraPrice: 25000,
    img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "tin",
    name: "Lon Thiếc Khí Nén",
    desc: "Giữ hương thơm lâu dài",
    extraPrice: 35000,
    img: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=300&auto=format&fit=crop&q=80",
  },
]

const INITIAL_FLAVORS: FlavorItem[] = [
  {
    id: "oolong",
    name: "Trà Ô Long Lạc Dương Cold Brew",
    desc: "Hương đào chín, ngọt thanh mát lạnh",
    pricePerPortion: 42000,
    portions: 1,
    img: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "black",
    name: "Hồng Trà Cổ Thụ Tà Xùa (Pha Sữa)",
    desc: "Hương mật ong rừng, đậm đà ngậy béo khi pha sữa",
    pricePerPortion: 39000,
    portions: 1,
    img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "chamo",
    name: "Trà Hoa Cúc Tiến Vua & Kỷ Tử (Ngủ Sâu)",
    desc: "0% caffeine, sáng mắt, xoa dịu stress cuối ngày",
    pricePerPortion: 45000,
    portions: 1,
    img: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "white",
    name: "Bạch Trà Shan Tuyết Búp Mầm",
    desc: "Vị thanh nhẹ, hậu ngọt dịu",
    pricePerPortion: 48000,
    portions: 0,
    img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=120&auto=format&fit=crop&q=80",
  },
]

export default function CustomBoxBuilder() {
  const [selectedPackId, setSelectedPackId] = useState("kraft")
  const [flavors, setFlavors] = useState<FlavorItem[]>(INITIAL_FLAVORS)
  const [addBottle, setAddBottle] = useState(false)
  const [addStraw, setAddStraw] = useState(false)

  const { addToCart } = useCart()

  const currentPack = PACKAGING_OPTIONS.find((p) => p.id === selectedPackId) || PACKAGING_OPTIONS[0]
  const totalPortions = flavors.reduce((sum, f) => sum + f.portions, 0)
  const totalBags = totalPortions * 5

  const handleAdjustPortion = (id: string, delta: number) => {
    if (delta > 0 && totalPortions >= 3) {
      toast({
        title: "Hộp đã đầy!",
        description: "Hộp chứa tối đa 15 túi (3 phần). Vui lòng giảm 1 vị khác trước khi tăng vị này.",
      })
      return
    }

    setFlavors((prev) =>
      prev.map((f) => {
        if (f.id !== id) return f
        const next = f.portions + delta
        return { ...f, portions: Math.max(0, next) }
      }),
    )
  }

  // Calculate pricing
  const flavorsCost = flavors.reduce((sum, f) => sum + f.portions * f.pricePerPortion, 0)
  const bottleCost = addBottle ? 69000 : 0
  const strawCost = addStraw ? 25000 : 0
  const grandTotal = currentPack.extraPrice + flavorsCost + bottleCost + strawCost

  const handleAddToCart = () => {
    if (totalPortions !== 3) {
      toast({
        variant: "destructive",
        title: "Chưa đủ 15 túi lọc",
        description: "Vui lòng chọn đủ 3 phần vị (15 túi) để đóng hộp hoàn chỉnh.",
      })
      return
    }

    const selectedSummary = flavors
      .filter((f) => f.portions > 0)
      .map((f) => `${f.portions * 5}x ${f.name}`)
      .join(", ")

    addToCart({
      productId: "combo-tu-mix-genz",
      variantId: `custom-box-${selectedPackId}`,
      name: `Hộp Trà Tự Mix (${currentPack.name})`,
      slug: "tra-cho-genz",
      price: grandTotal,
      weight: "15 túi lọc",
      boxType: currentPack.name,
      image: currentPack.img,
      quantity: 1,
    })

    toast({
      title: "Đã thêm hộp trà tự mix vào giỏ!",
      description: `${currentPack.name} • ${selectedSummary}`,
    })
  }

  return (
    <section id="mix-box" className="py-16 md:py-24 bg-gradient-to-b from-emerald-50/30 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-extrabold text-teal-600 block mb-1">
            Cá Nhân Hoá Trọn Gói
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tự mix hộp trà theo sở thích của bạn
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Chọn kiểu hộp, chọn từng vị trà bạn muốn uống và thêm phụ kiện trợ giá. Giá tự động cập nhật realtime!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Step 1: Chọn bao bì */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center">
                  1
                </span>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Chọn kiểu hộp đóng gói</h3>
                  <p className="text-xs text-slate-500">Mỗi hộp chứa đủ 15 túi lọc tam giác cao cấp</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PACKAGING_OPTIONS.map((pack) => {
                  const isSelected = pack.id === selectedPackId
                  return (
                    <button
                      key={pack.id}
                      type="button"
                      onClick={() => setSelectedPackId(pack.id)}
                      className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? "border-emerald-600 bg-emerald-50/60 shadow-sm"
                          : "border-slate-200 bg-white hover:border-emerald-400"
                      }`}
                    >
                      <div className="relative w-full h-24 rounded-xl overflow-hidden mb-2.5 bg-slate-100">
                        <Image
                          src={pack.img}
                          alt={pack.name}
                          fill
                          sizes="(max-width: 640px) 100vw, 200px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900">{pack.name}</div>
                        <div className="text-[11px] text-slate-500">{pack.desc}</div>
                        <div className="text-xs font-extrabold text-emerald-700 mt-1">
                          {pack.extraPrice === 0 ? "Mặc định (+0đ)" : `+${pack.extraPrice.toLocaleString("vi-VN")}đ`}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 2: Chọn các vị trà */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center">
                    2
                  </span>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">Chọn các vị trà mix vào hộp</h3>
                    <p className="text-xs text-slate-500">
                      Mỗi gói gồm 5 túi lọc. Hãy chọn đủ{" "}
                      <strong className="text-emerald-700 font-bold">15 túi</strong> (3 phần vị)
                    </p>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                  Đã chọn:{" "}
                  <span
                    className={`font-extrabold ${totalBags === 15 ? "text-emerald-600" : "text-amber-600"}`}
                  >
                    {totalBags}
                  </span>{" "}
                  / 15 túi
                </div>
              </div>

              <div className="space-y-3">
                {flavors.map((flavor) => (
                  <div
                    key={flavor.id}
                    className="p-3 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                        <Image
                          src={flavor.img}
                          alt={flavor.name}
                          fill
                          sizes="60px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{flavor.name}</h4>
                        <span className="text-[11px] text-slate-500">{flavor.desc}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-bold text-slate-500 hidden sm:inline">
                        {flavor.pricePerPortion.toLocaleString("vi-VN")}đ / 5 túi
                      </span>
                      <div className="flex items-center bg-white rounded-lg border border-slate-200 p-1">
                        <button
                          type="button"
                          onClick={() => handleAdjustPortion(flavor.id, -1)}
                          className="w-6 h-6 rounded flex items-center justify-center hover:bg-slate-100 text-slate-600 font-bold"
                          aria-label={`Giảm ${flavor.name}`}
                        >
                          -
                        </button>
                        <span className="w-7 text-center text-xs font-extrabold text-slate-900">
                          {flavor.portions}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleAdjustPortion(flavor.id, 1)}
                          className="w-6 h-6 rounded flex items-center justify-center hover:bg-slate-100 text-slate-600 font-bold"
                          aria-label={`Tăng ${flavor.name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: Phụ kiện mua kèm */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center">
                  3
                </span>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Phụ kiện mua kèm ưu đãi (Tuỳ chọn)</h3>
                  <p className="text-xs text-slate-500">Trợ giá đến 40% khi mua kèm hộp trà tự mix</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="p-3 rounded-2xl border border-slate-200 flex items-center gap-3 cursor-pointer hover:border-emerald-500 transition-colors bg-white">
                  <input
                    type="checkbox"
                    checked={addBottle}
                    onChange={(e) => setAddBottle(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                    <Image
                      src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=120&auto=format&fit=crop&q=80"
                      alt="Bình Borosilicate"
                      fill
                      sizes="60px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-slate-900">Bình Cold Brew 450ml</div>
                    <div className="text-[11px] text-slate-500">Lưới inox 304, nắp tre chống tràn</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 line-through">120k</span>
                    <div className="text-xs font-extrabold text-emerald-600">+69.000đ</div>
                  </div>
                </label>

                <label className="p-3 rounded-2xl border border-slate-200 flex items-center gap-3 cursor-pointer hover:border-emerald-500 transition-colors bg-white">
                  <input
                    type="checkbox"
                    checked={addStraw}
                    onChange={(e) => setAddStraw(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                    <Image
                      src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=120&auto=format&fit=crop&q=80"
                      alt="Bộ ống hút"
                      fill
                      sizes="60px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-slate-900">Bộ 2 Ống Hút Thuỷ Tinh</div>
                    <div className="text-[11px] text-slate-500">Tái sử dụng nhiều lần, kèm cọ</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 line-through">45k</span>
                    <div className="text-xs font-extrabold text-emerald-600">+25.000đ</div>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Sticky Sidebar Summary (4 cols) */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xl space-y-5">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="font-extrabold text-lg text-slate-900">Tóm tắt hộp trà của bạn</h3>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  Custom Box
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Kiểu hộp:</span>
                  <strong className="text-slate-900">{currentPack.name}</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Số lượng túi trà:</span>
                  <strong className={totalBags === 15 ? "text-slate-900" : "text-amber-600"}>
                    {totalBags} túi ({totalPortions}/3 phần)
                  </strong>
                </div>

                <div className="pt-2 text-[11px] text-slate-500 space-y-1">
                  {flavors.filter((f) => f.portions > 0).length === 0 ? (
                    <span className="text-rose-500 font-bold">Chưa chọn vị nào</span>
                  ) : (
                    flavors
                      .filter((f) => f.portions > 0)
                      .map((f) => (
                        <div key={f.id}>
                          • {f.portions * 5}x {f.name}
                        </div>
                      ))
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  {!addBottle && !addStraw ? (
                    <div className="text-slate-400 italic text-[11px]">Chưa chọn phụ kiện mua kèm</div>
                  ) : (
                    <>
                      {addBottle && <div>+ Bình Cold Brew 450ml (69.000đ)</div>}
                      {addStraw && <div>+ Bộ 2 Ống Hút Thuỷ Tinh (25.000đ)</div>}
                    </>
                  )}
                </div>
              </div>

              {/* Total Calculation */}
              <div className="pt-4 border-t border-slate-200/80">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-xs text-slate-500 font-semibold">Tổng giá combo:</span>
                  <div className="text-2xl font-black text-emerald-600">
                    {grandTotal.toLocaleString("vi-VN")}đ
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 text-right">
                  (~{Math.round(grandTotal / (totalBags || 15)).toLocaleString("vi-VN")}đ/ly trà tự pha)
                </div>
              </div>

              <Button
                type="button"
                onClick={handleAddToCart}
                className="w-full h-12 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                Thêm Combo này vào giỏ →
              </Button>

              <div className="pt-2 text-[11px] text-slate-500 space-y-1">
                <div>• Freeship cho đơn từ 299k</div>
                <div>• Tặng kèm thẻ hướng dẫn pha 3 phút</div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
