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
