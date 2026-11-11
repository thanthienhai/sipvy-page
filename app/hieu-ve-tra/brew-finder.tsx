"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Clock, Droplet, Repeat, Thermometer } from "lucide-react"

import { cn } from "@/lib/utils"

interface Tea {
  id: string
  name: string
  swatch: string
  minTemp: number
  maxTemp: number
  temp: string
  time: string
  timeNote: string
  ratio: string
  description: string
  shopLabel: string
  shopHref: string
}

const TEAS: Tea[] = [
  {
    id: "xanh",
    name: "Trà xanh",
    swatch: "bg-green-700",
    minTemp: 75,
    maxTemp: 85,
    temp: "75–85°C",
    time: "1–2 phút",
    timeNote: "Hãm quá lâu dễ chát",
    ratio: "3g / 150ml",
    description: "Không lên men, giữ nguyên hương vị tươi mát. Giàu chất chống oxy hoá EGCG.",
    shopLabel: "trà xanh",
    shopHref: "/san-pham?category=tra-xanh",
  },
  {
    id: "oolong-nhe",
    name: "Oolong nhẹ",
    swatch: "bg-amber-600",
    minTemp: 85,
    maxTemp: 90,
    temp: "85–90°C",
    time: "2–3 phút",
    timeNote: "Lần pha đầu",
    ratio: "5g / 150ml",
    description: "Bán lên men (15–70%), hương vị phức tạp giữa trà xanh và trà đen.",
    shopLabel: "trà oolong",
    shopHref: "/san-pham?category=tra-oolong",
  },
  {
    id: "oolong-dam",
    name: "Oolong đậm",
    swatch: "bg-amber-700",
    minTemp: 90,
    maxTemp: 95,
    temp: "90–95°C",
    time: "2–3 phút",
    timeNote: "Lần pha đầu",
    ratio: "5g / 150ml",
    description: "Bán lên men (15–70%), hương vị phức tạp giữa trà xanh và trà đen.",
    shopLabel: "trà oolong",
    shopHref: "/san-pham?category=tra-oolong",
  },
  {
    id: "den",
    name: "Trà đen",
    swatch: "bg-stone-700",
    minTemp: 95,
    maxTemp: 100,
    temp: "95–100°C",
    time: "3–5 phút",
    timeNote: "Hợp pha trà sữa",
    ratio: "3g / 200ml",
    description: "Lên men hoàn toàn, vị đậm đà, hậu ngọt. Hợp với sữa và đường nâu (trà sữa).",
    shopLabel: "sản phẩm",
    shopHref: "/san-pham",
  },
  {
    id: "co-thu",
    name: "Trà cổ thụ",
    swatch: "bg-lime-800",
    minTemp: 94,
    maxTemp: 96,
    temp: "95°C",
    time: "20–30 giây",
    timeNote: "Pha kiểu công phu",
    ratio: "8g / 100ml",
    description: "Pha kiểu công phu: nhiều trà, ít nước, hãm thật ngắn để giữ vị ngọt hậu.",
    shopLabel: "trà cổ thụ",
    shopHref: "/san-pham?category=tra-co-thu",
  },
  {
    id: "hoa",
    name: "Trà hương hoa",
    swatch: "bg-orange-700",
    minTemp: 80,
    maxTemp: 90,
    temp: "80–90°C",
    time: "2–3 phút",
    timeNote: "Giữ hương hoa",
    ratio: "3g / 150ml",
    description: "Ướp hương sen, lài, hoa cúc. Phổ biến nhất là sen Tây Hồ truyền thống.",
    shopLabel: "trà hương hoa",
    shopHref: "/san-pham?category=tra-huong-hoa",
  },
]

// The temperature bar spans 60–100°C.
const SCALE_MIN = 60
const SCALE_RANGE = 40

/** Pick a tea, see water temperature, steeping time and leaf ratio. */
export default function BrewFinder() {
  const [selectedId, setSelectedId] = useState(TEAS[0].id)
  const tea = TEAS.find((t) => t.id === selectedId) ?? TEAS[0]
  const barLeft = ((tea.minTemp - SCALE_MIN) / SCALE_RANGE) * 100
  const barWidth = Math.max(3, ((tea.maxTemp - tea.minTemp) / SCALE_RANGE) * 100)

  return (
    <div className="mt-7 grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
      <div role="group" aria-label="Loại trà" className="grid grid-cols-1 gap-2 xs:grid-cols-2 lg:grid-cols-1">
        {TEAS.map((t) => {
          const active = t.id === tea.id
          return (
            <button
              key={t.id}
              type="button"
              aria-pressed={active}
              onClick={() => setSelectedId(t.id)}
              className={cn(
                "flex min-h-14 items-center justify-between gap-3 rounded-2xl border px-4 text-left text-[15px] font-semibold transition-colors",
                active ? "border-green-950 bg-green-950 text-white" : "border-stone-200 bg-white text-stone-800 hover:border-stone-300",
              )}
            >
              <span className="flex items-center gap-3">
                <span className={cn("h-3 w-3 rounded", t.swatch)} aria-hidden="true" />
                {t.name}
              </span>
              <span className={cn("text-[13px] font-medium", active ? "text-green-100" : "text-stone-500")}>{t.temp}</span>
            </button>
          )
        })}
      </div>

      <div className="flex min-w-0 flex-col gap-6 rounded-3xl border border-stone-200 bg-white p-5 sm:p-7 md:p-9" aria-live="polite">
        <div>
          <div className="flex items-center gap-2.5">
            <span className={cn("h-3.5 w-3.5 rounded-[5px]", tea.swatch)} aria-hidden="true" />
            <h3 className="text-[26px] font-semibold tracking-tight text-stone-950">{tea.name}</h3>
          </div>
          <p className="mt-2.5 max-w-[62ch] text-[15px] leading-relaxed text-stone-600">{tea.description}</p>
        </div>

        <dl className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-orange-50 p-4 md:p-5">
            <dt className="flex items-center gap-2 text-[13px] font-medium text-orange-800">
              <Thermometer className="h-4 w-4" aria-hidden="true" /> Nhiệt độ nước
            </dt>
            <dd className="mt-2 text-[28px] font-bold tracking-tight text-orange-950">{tea.temp}</dd>
          </div>
          <div className="rounded-2xl bg-green-50 p-4 md:p-5">
            <dt className="flex items-center gap-2 text-[13px] font-medium text-green-800">
              <Clock className="h-4 w-4" aria-hidden="true" /> Thời gian hãm
            </dt>
            <dd className="mt-2 text-[28px] font-bold tracking-tight text-green-950">{tea.time}</dd>
            <dd className="mt-0.5 text-[13px] text-green-800">{tea.timeNote}</dd>
          </div>
          <div className="rounded-2xl bg-stone-100 p-4 md:p-5">
            <dt className="flex items-center gap-2 text-[13px] font-medium text-stone-700">
              <Droplet className="h-4 w-4" aria-hidden="true" /> Tỉ lệ trà / nước
            </dt>
            <dd className="mt-2 text-[28px] font-bold tracking-tight text-stone-900">{tea.ratio}</dd>
          </div>
        </dl>

        <div>
          <div className="flex justify-between text-xs text-stone-500" aria-hidden="true">
            <span>60°C</span><span>70°C</span><span>80°C</span><span>90°C</span><span>100°C</span>
          </div>
          <div
            role="img"
            aria-label={`Khoảng nhiệt độ ${tea.temp} trên thang 60–100°C`}
            className="relative mt-1.5 h-3 rounded-full bg-stone-100"
          >
            <div
              className="absolute inset-y-0 rounded-full bg-orange-600 transition-all duration-300 motion-reduce:transition-none"
              style={{ left: `${barLeft}%`, width: `${barWidth}%` }}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-stone-100 pt-5">
          <p className="flex max-w-[52ch] items-start gap-2.5 text-sm leading-6 text-stone-700">
            <Repeat className="mt-0.5 h-[18px] w-[18px] shrink-0 text-amber-700" aria-hidden="true" />
            Trà chất lượng cao pha được 5–7 lần — mỗi lần thêm 10–20 giây hãm.
          </p>
          <Link
            href={tea.shopHref}
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-green-800 px-5 text-sm font-semibold text-white transition-colors hover:bg-green-900"
          >
            Xem {tea.shopLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}
