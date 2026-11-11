"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    })
  }

  useEffect(() => {
    const updateVisibility = () => {
      // Keep the control out of the first viewport; 1.5 viewport heights adapts to mobile screens.
      setIsVisible(window.scrollY > window.innerHeight * 1.5)
    }

    updateVisibility()
    window.addEventListener("scroll", updateVisibility, { passive: true })
    window.addEventListener("resize", updateVisibility)
    return () => {
      window.removeEventListener("scroll", updateVisibility)
      window.removeEventListener("resize", updateVisibility)
    }
  }, [])

  return (
    <div
      className={`floating-action fixed transition-opacity duration-300 ${isVisible ? "opacity-100" : "pointer-events-none opacity-0"}`}
      aria-hidden={!isVisible}
      // Hidden state must also leave the tab order, not just the visual layer.
      inert={!isVisible ? true : undefined}
    >
      <Button
        tabIndex={isVisible ? 0 : -1}
        onClick={scrollToTop}
        size="icon"
        className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5"
        aria-label="Lên đầu trang"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  )
}

