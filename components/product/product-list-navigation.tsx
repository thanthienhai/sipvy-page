"use client"

import type { ComponentProps, ReactNode } from "react"
import { useEffect } from "react"
import Link from "next/link"

import { normalizeListUrl } from "@/lib/product-query"

const KEY_PREFIX = "sipvy-product-list:"
const TTL_MS = 30 * 60 * 1000
const MAX_RESTORE_MS = 2000

type SavedPosition = { url: string; y: number; ts: number }

const storageKey = (normalizedUrl: string) => `${KEY_PREFIX}${normalizedUrl}`

function currentListUrl() {
  return normalizeListUrl(`${window.location.pathname}${window.location.search}`)
}

/** Remove every saved position older than the TTL (and malformed ones). */
function pruneExpired(now: number) {
  const stale: string[] = []
  for (let index = 0; index < window.sessionStorage.length; index += 1) {
    const key = window.sessionStorage.key(index)
    if (!key || !key.startsWith(KEY_PREFIX)) continue
    try {
      const saved = JSON.parse(window.sessionStorage.getItem(key) || "null") as Partial<SavedPosition> | null
      if (!saved || typeof saved.ts !== "number" || now - saved.ts > TTL_MS) stale.push(key)
    } catch {
      stale.push(key)
    }
  }
  stale.forEach((key) => window.sessionStorage.removeItem(key))
}

type ProductListLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string
  children: ReactNode
}

/** Saves the (normalized) list URL and scroll offset before opening a product detail page. */
export function ProductListLink({ href, children, onClick, ...props }: ProductListLinkProps) {
  return (
    <Link
      href={href}
      onClick={(event) => {
        try {
          const now = Date.now()
          pruneExpired(now)
          const url = currentListUrl()
          const entry: SavedPosition = { url, y: Math.round(window.scrollY), ts: now }
          window.sessionStorage.setItem(storageKey(url), JSON.stringify(entry))
        } catch {
          // Storage can be disabled; navigation still works normally.
        }
        onClick?.(event)
      }}
      {...props}
    >
      {children}
    </Link>
  )
}

/**
 * Restores the previous catalog position when the user comes back (breadcrumb or browser back).
 * The entry is keyed by the normalized list URL, expires after 30 minutes and is deleted once used.
 */
export function ProductListRestoration() {
  useEffect(() => {
    let cancelled = false
    let frame = 0
    let cleanup = () => {}

    try {
      const now = Date.now()
      pruneExpired(now)
      const key = storageKey(currentListUrl())
      const raw = window.sessionStorage.getItem(key)
      if (!raw) return

      const saved = JSON.parse(raw) as Partial<SavedPosition>
      if (
        typeof saved.y !== "number" || !Number.isFinite(saved.y) || saved.y < 0 ||
        typeof saved.ts !== "number" || now - saved.ts > TTL_MS
      ) {
        window.sessionStorage.removeItem(key)
        return
      }
      const targetY = saved.y
      // One-shot: the entry is deleted as soon as the restore finishes or the user takes over
      // (not on effect setup, so React Strict Mode re-running the effect still restores).
      const consume = () => {
        try {
          window.sessionStorage.removeItem(key)
        } catch {
          // ignore
        }
      }

      // The grid streams in behind a Suspense boundary and Next.js may scroll to the top after the
      // commit, so keep re-applying the offset for a short time unless the user takes over.
      const startedAt = performance.now()
      let stableFrames = 0
      const stop = () => {
        cancelled = true
        cancelAnimationFrame(frame)
        consume()
      }
      const userEvents = ["wheel", "touchstart", "keydown", "mousedown"] as const
      userEvents.forEach((name) => window.addEventListener(name, stop, { once: true, passive: true }))
      cleanup = () => userEvents.forEach((name) => window.removeEventListener(name, stop))

      const tick = () => {
        if (cancelled) return
        const maxY = document.documentElement.scrollHeight - window.innerHeight
        if (maxY >= targetY - 1) {
          if (Math.abs(window.scrollY - targetY) > 2) {
            window.scrollTo(0, targetY)
            stableFrames = 0
          } else {
            stableFrames += 1
          }
          if (stableFrames >= 5) {
            consume()
            return
          }
        }
        if (performance.now() - startedAt < MAX_RESTORE_MS) frame = requestAnimationFrame(tick)
        else consume()
      }
      frame = requestAnimationFrame(tick)
    } catch {
      // Ignore malformed or unavailable session storage.
    }

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      cleanup()
    }
  }, [])

  return null
}
