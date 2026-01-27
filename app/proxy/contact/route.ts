import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const forwarded = request.headers.get("x-forwarded-for")
    const realIp = request.headers.get("x-real-ip")
    const clientIp = forwarded?.split(",")[0] || realIp || "unknown"

    // Extract origin and referer from incoming request
    const origin = request.headers.get("origin") || ""
    const referer = request.headers.get("referer") || ""

    // Get the request body
    const body = await request.json()

    // Add IP address to the payload
    const payload = {
      ...body,
      ip_address: clientIp,
    }

    console.log("[v0] Forwarding to Laravel API:", {
      payload,
      headers: {
        "x-forwarded-for": clientIp,
        "x-real-ip": clientIp,
        origin,
        referer,
      },
    })

    const response = await fetch("https://waldorf.cr/api/v1/contact/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-forwarded-for": clientIp,
        "x-real-ip": clientIp,
        origin: origin,
        referer: referer,
      },
      body: JSON.stringify(payload),
    })

    // Get the response data
    const data = await response.json()

    // Return the response with the same status code
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("Proxy error:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
