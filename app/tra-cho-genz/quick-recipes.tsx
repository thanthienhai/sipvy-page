"use client"

import { useState } from "react"
import Image from "next/image"

interface Recipe {
  tag: string
  title: string
  desc: string
  time: string
  img: string
  thumb: string
  steps: string[]
}

const RECIPES: Recipe[] = [
  {
    tag: "Giải nhiệt & Sảng khoái",
    title: "Cold Brew Oolong Táo & Bạc Hà",
    desc: "Thức uống sảng khoái đánh bay uể oải buổi chiều. Ủ lạnh giúp chiết xuất trọn vẹn vị ngọt axit amin tự nhiên mà không tiết ra vị đắng chát của tanin.",
    time: "Ủ 6-8 tiếng qua đêm",
    img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80",
    thumb: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=80&auto=format&fit=crop&q=80",
    steps: [
      "Thả 1 túi lọc Oolong Lạc Dương vào bình thuỷ tinh 400ml.",
      "Rót nước lọc nguội hoặc nước suối đầy bình, đậy nắp kín.",
      "Để ngăn mát tủ lạnh qua đêm (6-8 tiếng). Sáng hôm sau lấy ra thêm vài lát táo và thưởng thức!",
    ],
  },
  {
    tag: "Tập trung & Tỉnh táo",
    title: "Matcha Oat Milk Latte Đá 60s",
    desc: "Năng lượng bền bỉ không gây crash năng lượng. Bột matcha nghiền mịn hoà quyện cùng sữa yến mạch béo ngậy thơm ngon tuyệt hảo.",
    time: "60 giây chuẩn bị",
    img: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&auto=format&fit=crop&q=80",
    thumb: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=80&auto=format&fit=crop&q=80",
    steps: [
      "Lấy 1 thìa (khoảng 2g) bột Matcha Shan Tuyết hoà cùng 40ml nước ấm 70°C.",
      "Dùng cây đánh bọt cầm tay khuấy đều trong 20 giây đến khi sủi bọt mịn.",
      "Chuẩn bị cốc đá, rót 150ml sữa yến mạch (Oat milk) rồi đổ lớp matcha lên trên. Uống ngay!",
    ],
  },
  {
    tag: "Gu Healthy 0g Hoá Chất",
    title: "Trà Sữa Cổ Thụ Mật Mía Mộc",
    desc: "Thoả mãn cơn thèm trà sữa mà vẫn giữ vóc dáng thon gọn. Vị đậm đà từ lá trà cổ thụ hàng trăm năm tuổi quyện cùng sữa tươi thanh trùng.",
    time: "5 phút hãm nóng",
    img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80",
    thumb: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80",
    steps: [
      "Hãm 1 túi Hồng Trà Cổ Thụ với 100ml nước sôi 95°C trong 5 phút để lấy cốt trà đậm đà.",
      "Thêm 1 thìa mật mía hoặc đường hoa dừa tự nhiên khuấy tan.",
      "Thêm 100ml sữa tươi không đường và đá viên mát lạnh. Thơm đậm vị trà không quán nào sánh bằng!",
    ],
  },
]

export default function QuickRecipes() {
  const [activeIdx, setActiveIdx] = useState(0)
  const current = RECIPES[activeIdx]

  return (
    <section id="recipe" className="py-16 md:py-24 bg-white border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.2em] font-extrabold text-emerald-600 block mb-2">
            Trở thành Barista tại bàn làm việc
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            3 công thức pha trong 3 phút
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Không cần máy móc hay quy trình rườm rà. Chọn công thức bạn thích để xem ngay cách làm:
          </p>
        </div>

        {/* Recipe Tabs with Visual Image Avatars */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-8 flex-wrap">
          {RECIPES.map((recipe, idx) => {
            const isActive = idx === activeIdx
            return (
              <button
                key={recipe.title}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="relative w-5 h-5 rounded-md overflow-hidden shrink-0">
                  <Image
                    src={recipe.thumb}
                    alt={recipe.title}
                    fill
                    sizes="24px"
                    className="object-cover"
                  />
                </div>
                <span>
                  {idx + 1}. {recipe.title.split(" ")[0]} {recipe.title.split(" ")[1]}
                </span>
              </button>
            )
          })}
        </div>

        {/* Display Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Recipe Picture */}
            <div className="md:col-span-5 relative rounded-2xl overflow-hidden h-64 sm:h-80 bg-slate-100">
              <Image
                src={current.img}
                alt={current.title}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-slate-900/70 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-white">
                Thời gian: <span>{current.time}</span>
              </div>
            </div>

            {/* Recipe Details */}
            <div className="md:col-span-7 space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                {current.tag}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {current.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {current.desc}
              </p>
              
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-bold uppercase text-slate-900 tracking-wider">
                  Các bước thực hiện:
                </div>
                <ol className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {current.steps.map((st, i) => (
                    <li key={st} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                        {i + 1}
                      </span>
                      <span>{st}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
