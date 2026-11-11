/**
 * Minimal, privacy-safe client analytics.
 *
 * - Browser-only and event-handler-only (never call during render).
 * - Dispatches a `sipvy:<event>` CustomEvent so any tag manager / listener can
 *   subscribe without inline scripts.
 * - Pushes to `window.dataLayer` only when the page already defines it.
 * - Callers must pass non-personal data only (labels, paths, placements).
 */

export type TrackValue = string | number | boolean | null | undefined
export type TrackData = Record<string, TrackValue>

type DataLayerWindow = Window & { dataLayer?: Array<Record<string, unknown>> }

export function track(event: string, data: TrackData = {}): void {
  if (typeof window === "undefined") return
  try {
    window.dispatchEvent(new CustomEvent(`sipvy:${event}`, { detail: data }))
    const dataLayer = (window as DataLayerWindow).dataLayer
    if (Array.isArray(dataLayer)) dataLayer.push({ event, ...data })
  } catch {
    // Analytics must never break navigation.
  }
}
