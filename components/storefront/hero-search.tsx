"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"

/** Ô tìm kiếm ở hero: chuyển sang /san-pham?search=... (trang danh sách lọc ngay trên trình duyệt). */
export default function HeroSearch() {
  const router = useRouter()
  const [value, setValue] = useState("")

  return (
    <form
      role="search"
      className="relative mx-auto w-full max-w-2xl"
      onSubmit={(e) => {
        e.preventDefault()
        const q = value.trim()
        router.push(q ? `/san-pham?search=${encodeURIComponent(q)}` : "/san-pham")
      }}
    >
      <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-600" aria-hidden="true" />
      <input
        name="search"
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Tìm trà cổ thụ, oolong, sen Tây Hồ..."
        aria-label="Tìm kiếm sản phẩm"
        className="h-16 w-full rounded-full border-2 border-stone-200 bg-white pl-14 pr-32 text-base text-stone-900 shadow-lg outline-none transition-all placeholder:text-stone-500 focus:border-green-700 focus:ring-4 focus:ring-stone-200"
      />
      <Button
        type="submit"
        className="absolute right-2 top-1/2 h-12 -translate-y-1/2 rounded-full bg-green-800 px-7 font-medium text-white shadow-md hover:bg-green-900"
      >
        Tìm kiếm
      </Button>
    </form>
  )
}
