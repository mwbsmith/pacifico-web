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
