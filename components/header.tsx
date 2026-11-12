"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Search, ShoppingCart, X, Phone, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useCart } from "@/contexts/cart-context"
const ANNOUNCEMENT_KEY = "sipvy-page-announcement-dismissed"

const NAV_ITEMS = [
  { href: "/", label: "Trang chủ" },
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/tra-cho-genz", label: "Trà cho người trẻ" },
  { href: "/qua-tang", label: "Quà tặng" },
  { href: "/qua-tet", label: "Quà Tết" },
  { href: "/hieu-ve-tra", label: "Hiểu về trà" },
  { href: "/lien-he", label: "Liên hệ" },
]

const MOBILE_NAV_GROUPS = [
  {
    label: "Mua trà",
    items: [
      { href: "/san-pham", label: "Tất cả sản phẩm" },
      { href: "/qua-tang", label: "Quà tặng" },
      { href: "/qua-tet", label: "Quà Tết" },
    ],
  },
  {
    label: "Khám phá",
    items: [
      { href: "/", label: "Trang chủ" },
      { href: "/tra-cho-genz", label: "Trà cho người trẻ" },
      { href: "/hieu-ve-tra", label: "Hiểu về trà" },
        ],
  },
  {
    label: "Hỗ trợ",
    items: [{ href: "/lien-he", label: "Liên hệ" }],
  },
]

/** Scroll distance (px) that must be travelled before the compact bar reacts, to stop flicker. */
const SCROLL_HYSTERESIS = 8
const FALLBACK_FULL_HEADER_HEIGHT = 128

function isActivePath(pathname: string | null, href: string) {
  if (!pathname) return false
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)
}

type MobileNavSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  pathname: string | null
  onCloseAutoFocus: (event: Event) => void
}

/** Rendered once; the trigger buttons live in both the full and the compact header. */
function MobileNavSheet({ open, onOpenChange, pathname, onCloseAutoFocus }: MobileNavSheetProps) {
  const close = () => onOpenChange(false)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-[min(90vw,360px)] overflow-y-auto bg-white"
        onCloseAutoFocus={onCloseAutoFocus}
      >
        <SheetHeader className="pr-8 text-left">
          <SheetTitle className="flex items-center gap-2 text-green-900">
            <Image src="/logo.png" alt="" width={28} height={28} className="rounded-full" />
            SIPVY
          </SheetTitle>
          <SheetDescription className="sr-only">Điều hướng cửa hàng SIPVY</SheetDescription>
        </SheetHeader>

        <div className="mt-5 space-y-6">
          <nav aria-label="Điều hướng di động" className="space-y-6">
            {MOBILE_NAV_GROUPS.map((group, groupIndex) => {
              const headingId = `mobile-nav-group-${groupIndex}`
              return (
                <section key={group.label} aria-labelledby={headingId}>
                  <h2
                    id={headingId}
                    className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-stone-500"
                  >
                    {group.label}
                  </h2>
                  <ul className="space-y-1">
                    {group.items.map((item) => {
                      const isActive = isActivePath(pathname, item.href)
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={close}
                            aria-current={isActive ? "page" : undefined}
                            className={cn(
                              "flex min-h-11 items-center rounded-lg px-3 text-base font-medium transition-colors hover:bg-green-50 hover:text-green-800",
                              isActive ? "bg-green-50 text-green-800" : "text-stone-800",
                            )}
                          >
                            {item.label}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </section>
              )
            })}
          </nav>

          <a
            href="tel:0362023048"
            onClick={close}
            className="flex min-h-11 items-center gap-2 rounded-lg border border-stone-200 px-3 text-sm font-medium text-stone-700 hover:bg-stone-50"
          >
            <Phone className="h-4 w-4 text-green-700" aria-hidden="true" />
            Hotline 0362 023 048
          </a>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [compactVisible, setCompactVisible] = useState(false)
  const [showCompact, setShowCompact] = useState(false)
  // Initial value comes from a cookie read on the server (see storefront layout),
  // so a dismissed bar is never rendered and then removed (no layout shift).
  const [announcementVisible, setAnnouncementVisible] = useState(true)
  const fullHeaderRef = useRef<HTMLElement>(null)
  const fullHeaderHeightRef = useRef(FALLBACK_FULL_HEADER_HEIGHT)
  const openerRef = useRef<HTMLElement | null>(null)
  // Thanh thông báo: nhớ lựa chọn đóng bằng localStorage (trang tĩnh không có cookie phía máy chủ).
  useEffect(() => {
    try {
      if (localStorage.getItem(ANNOUNCEMENT_KEY) === "1") setAnnouncementVisible(false)
    } catch {
      // bỏ qua
    }
  }, [])
  const { cart } = useCart()
  const router = useRouter()
  const pathname = usePathname()
  const cartCount = cart.items.reduce((total, item) => total + item.quantity, 0)

  // Track the full header height with a ResizeObserver so the scroll handler never reads layout.
  useEffect(() => {
    const node = fullHeaderRef.current
    if (!node || typeof ResizeObserver === "undefined") return
    const observer = new ResizeObserver((entries) => {
      const height = entries[0]?.borderBoxSize?.[0]?.blockSize ?? entries[0]?.contentRect.height
      if (height) fullHeaderHeightRef.current = height
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let lastY = window.scrollY
    let pastHeader = false
    let initialized = false
    let frame = 0

    const update = () => {
      frame = 0
      const y = window.scrollY
      const threshold = fullHeaderHeightRef.current
      // Hysteresis: the threshold must be crossed by 8px to flip, so the bar can't flicker at the edge.
      pastHeader = pastHeader ? y > threshold - SCROLL_HYSTERESIS : y > threshold + SCROLL_HYSTERESIS

      if (!pastHeader) {
        setShowCompact(false)
        setCompactVisible(false)
        lastY = y
        initialized = true
        return
      }

      setShowCompact(true)
      if (!initialized) {
        setCompactVisible(true)
        lastY = y
        initialized = true
        return
      }

      const delta = y - lastY
      if (Math.abs(delta) >= SCROLL_HYSTERESIS) {
        setCompactVisible(delta < 0)
        lastY = y
      }
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  const dismissAnnouncement = () => {
    try {
      localStorage.setItem(ANNOUNCEMENT_KEY, "1")
    } catch {
      // Ignore storage failures; dismissing for the current render still works.
    }
    setAnnouncementVisible(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    router.push(`/san-pham?search=${encodeURIComponent(searchQuery.trim())}`)
    setSearchOpen(false)
  }

  const openSheet = (setter: (open: boolean) => void) => (event: React.MouseEvent<HTMLElement>) => {
    openerRef.current = event.currentTarget
    setter(true)
  }

  // Radix would return focus to a trigger that may have scrolled away (the full header)
  // and make the page jump. Return it to the exact button that opened the sheet instead.
  const restoreFocus = useCallback((event: Event) => {
    event.preventDefault()
    const opener = openerRef.current
    if (opener && opener.isConnected) opener.focus({ preventScroll: true })
  }, [])

  const cartLabel = `Giỏ hàng${cartCount > 0 ? ` (${cartCount} sản phẩm)` : " (trống)"}`
  const cartAction = () => (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className="relative h-10 w-10 rounded-full text-stone-700 hover:bg-stone-100"
    >
      <Link href="/gio-hang" aria-label={cartLabel}>
        <ShoppingCart className="h-5 w-5" aria-hidden="true" />
        {cartCount > 0 && (
          <span
            aria-hidden="true"
            className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-0.5 text-[10px] font-bold text-white"
          >
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </Link>
    </Button>
  )

  const menuButton = (
    <Button
      variant="ghost"
      size="icon"
      className="h-10 w-10 rounded-full text-stone-700 hover:bg-stone-100 md:hidden"
      onClick={openSheet(setMobileNavOpen)}
      aria-label="Mở menu điều hướng"
      aria-haspopup="dialog"
      aria-expanded={mobileNavOpen}
    >
      <Menu className="h-5 w-5" aria-hidden="true" />
    </Button>
  )

  const mobileSearchButton = (
    <Button
      variant="ghost"
      size="icon"
      className="h-10 w-10 rounded-full text-stone-700 hover:bg-stone-100 md:hidden"
      onClick={openSheet(setSearchOpen)}
      aria-label="Mở tìm kiếm"
      aria-haspopup="dialog"
      aria-expanded={searchOpen}
    >
      <Search className="h-5 w-5" aria-hidden="true" />
    </Button>
  )

  return (
    <>
      <header
        ref={fullHeaderRef}
        className="relative z-40 w-full border-b border-stone-200 bg-white shadow-sm"
        // While the compact bar is on screen the full header is scrolled away: keep it out of tab order.
        inert={showCompact && compactVisible ? true : undefined}
      >
        {announcementVisible && (
          <div className="on-dark hidden bg-green-800 text-xs text-white md:block">
            <div className="container mx-auto flex h-8 items-center justify-between gap-4 px-4 md:px-6">
              <span className="hidden items-center gap-1.5 sm:flex">
                <Phone className="h-3 w-3" aria-hidden="true" />
                Hotline: <strong>0362 023 048</strong>
              </span>
              <span className="hidden md:inline">🚚 Giao hàng toàn quốc 2–5 ngày làm việc</span>
              <Link href="/qua-tet" className="font-medium text-amber-300 hover:text-amber-200">
                🎁 Quà Tết 2027: đặt sớm để kịp giao
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={dismissAnnouncement}
                className="-my-1.5 h-11 w-11 shrink-0 rounded-full text-white hover:bg-green-700 hover:text-white"
                aria-label="Đóng thông báo khuyến mãi"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </Button>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 md:px-6">
          <div className="flex h-16 items-center justify-between gap-3 md:gap-6">
            <Link href="/" aria-label="SIPVY - Trang chủ" className="group flex shrink-0 items-center gap-2">
              <Image
                src="/logo.png"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 rounded-full shadow-sm transition-shadow group-hover:shadow-md"
              />
              <span className="text-xl font-bold tracking-tight text-green-800 transition-colors group-hover:text-green-900 md:text-2xl">
                SIPVY
              </span>
            </Link>

            <form onSubmit={handleSearch} role="search" className="relative hidden max-w-xl flex-1 md:flex">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <Input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm trà cổ thụ, oolong, sen..."
                aria-label="Tìm kiếm sản phẩm"
                className="h-10 rounded-full border-green-200 bg-green-50/30 pl-11 pr-4 focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100"
              />
            </form>

            <div className="flex items-center gap-1">
              {menuButton}
              {mobileSearchButton}
              {cartAction()}
            </div>
          </div>
        </div>

        <nav className="hidden border-t border-stone-200 bg-white/80 md:block" aria-label="Điều hướng chính">
          <div className="container mx-auto px-4 md:px-6">
            <ul className="flex items-center gap-1 overflow-x-auto px-2 no-scrollbar">
              {NAV_ITEMS.map((item) => {
                const isActive = isActivePath(pathname, item.href)
                return (
                  <li key={item.href} className="shrink-0">
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "relative block whitespace-nowrap px-3 py-3 text-sm font-medium transition-colors md:px-4",
                        isActive ? "text-green-800" : "text-gray-600 hover:text-green-800",
                      )}
                    >
                      {item.label}
                      {isActive && <span aria-hidden="true" className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-green-700 md:left-4 md:right-4" />}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>
      </header>

      {showCompact && (
        <div
          className={cn(
            "fixed inset-x-0 top-0 z-40 border-b border-stone-200 bg-white/95 shadow-sm backdrop-blur-md transition-transform duration-200 motion-reduce:transition-none",
            compactVisible ? "translate-y-0" : "-translate-y-full",
          )}
          aria-hidden={!compactVisible}
          inert={!compactVisible ? true : undefined}
        >
          <div className="container mx-auto flex h-14 items-center gap-2 px-4 md:gap-4 md:px-6">
            <Link href="/" aria-label="SIPVY - Trang chủ" className="group flex shrink-0 items-center gap-2">
              <Image src="/logo.png" alt="" width={32} height={32} className="h-8 w-8 rounded-full" />
              <span className="hidden text-lg font-bold tracking-tight text-green-800 sm:inline">SIPVY</span>
            </Link>

            <form onSubmit={handleSearch} role="search" className="relative hidden max-w-xl flex-1 sm:flex">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <Input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm sản phẩm..."
                aria-label="Tìm kiếm sản phẩm"
                className="h-9 rounded-full border-green-200 bg-green-50/30 pl-9 pr-4 focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100"
              />
            </form>

            <div className="ml-auto flex items-center gap-1">
              {menuButton}
              {mobileSearchButton}
              {cartAction()}
            </div>
          </div>
        </div>
      )}

      {/* Single shared sheets: one instance each, opened from whichever header bar is on screen. */}
      <MobileNavSheet
        open={mobileNavOpen}
        onOpenChange={setMobileNavOpen}
        pathname={pathname}
        onCloseAutoFocus={restoreFocus}
      />
      <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
        <SheetContent side="top" className="h-auto bg-white pb-6 pt-12" onCloseAutoFocus={restoreFocus}>
          <SheetHeader>
            <SheetTitle className="text-left text-green-900">Tìm kiếm sản phẩm</SheetTitle>
            <SheetDescription className="sr-only">Tìm sản phẩm trà SIPVY</SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSearch} role="search" className="relative mt-4">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <Input
              autoFocus
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Bạn đang tìm loại trà nào?"
              className="h-12 rounded-full border-green-200 pl-11 pr-24"
              aria-label="Tìm kiếm sản phẩm"
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-1 top-1/2 h-10 -translate-y-1/2 rounded-full bg-green-700 px-4 hover:bg-green-800"
            >
              Tìm
            </Button>
          </form>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="self-center text-xs text-gray-500">Phổ biến:</span>
            {["Trà cổ thụ", "Oolong", "Sen Tây Hồ", "Quà tặng"].map((tag) => (
              <Link
                key={tag}
                href={`/san-pham?search=${encodeURIComponent(tag)}`}
                onClick={() => setSearchOpen(false)}
                className="rounded-full bg-green-50 px-3 py-1 text-xs text-green-700 hover:bg-green-100"
              >
                {tag}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
