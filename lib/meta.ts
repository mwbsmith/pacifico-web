export function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  return match ? decodeURIComponent(match[2]) : undefined
}

export function getMetaTracking() {
  return {
    fbp: getCookie("_fbp"),
    fbc: getCookie("_fbc"),
  }
}

/**
 * Fires a Meta Pixel "Lead" event, passing eventID for deduplication with the
 * server-side Conversions API. Because the base Pixel script loads with the
 * "afterInteractive" strategy, window.fbq may not exist yet on a direct load
 * or refresh of the thank-you page. This helper polls briefly until fbq is
 * ready so the Lead is never silently dropped, and only fires once.
 *
 * Returns a cleanup function that cancels any pending retries.
 */
export function trackMetaLead(eventId?: string): () => void {
  if (typeof window === "undefined") return () => {}

  let fired = false

  const fire = (): boolean => {
    if (fired) return true
    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead", {}, eventId ? { eventID: eventId } : undefined)
      fired = true
      return true
    }
    return false
  }

  if (fire()) return () => {}

  let attempts = 0
  const maxAttempts = 50 // ~10s at 200ms intervals
  const interval = window.setInterval(() => {
    attempts += 1
    if (fire() || attempts >= maxAttempts) {
      window.clearInterval(interval)
    }
  }, 200)

  return () => window.clearInterval(interval)
}

/**
 * Detects which ad platform a visitor came from using click IDs, UTM params,
 * and Meta's _fbc cookie. Returns "facebook_ads", "google_ads", the raw
 * utm_source if present, or "direct" when nothing is detected.
 */
export function getLeadSource(): string {
  if (typeof window === "undefined") return "direct"

  const params = new URLSearchParams(window.location.search)
  const utmSource = (params.get("utm_source") || "").toLowerCase()

  // Current-URL click IDs are the strongest signal
  if (params.has("fbclid")) return "facebook_ads"
  if (params.has("gclid") || params.has("wbraid") || params.has("gbraid")) return "google_ads"

  // Then UTM source hints
  if (/facebook|fb|ig|instagram|meta/.test(utmSource)) return "facebook_ads"
  if (/google|adwords|gads/.test(utmSource)) return "google_ads"

  // Fall back to a persisted Meta click cookie (set from a prior fbclid visit)
  if (getCookie("_fbc")) return "facebook_ads"

  // Otherwise use whatever utm_source was provided, or mark as direct
  return utmSource || "direct"
}
