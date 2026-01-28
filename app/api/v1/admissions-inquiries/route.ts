import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      parentFirstName,
      parentLastName,
      email,
      phone,
      studentFirstName,
      studentAge,
      gradeApplying,
      enrollmentTiming,
      howDidYouHear,
      message,
      recaptcha_token,
    } = body

    // Validate required fields
    if (!parentFirstName || !parentLastName || !email || !phone || !studentFirstName || !studentAge || !enrollmentTiming) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Format the message content for the contact form backend
    const messageContent = `
ADMISSIONS INQUIRY - Google Ads Landing Page

PARENT/GUARDIAN:
Name: ${parentFirstName} ${parentLastName}
Email: ${email}
Phone: ${phone}

STUDENT:
Name: ${studentFirstName}
Age/DOB: ${studentAge}
Grade Applying For: ${gradeApplying || "Not specified"}

ENROLLMENT:
Timing: ${enrollmentTiming}
How they heard about us: ${howDidYouHear || "Not specified"}

MESSAGE:
${message || "No additional message"}
    `.trim()

    // Forward to the existing contact proxy
    const response = await fetch(new URL("/proxy/contact", request.url).toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: `${parentFirstName} ${parentLastName}`.trim(),
        email: email,
        phone: phone,
        message: messageContent,
        recaptcha_token: recaptcha_token,
      }),
    })

    if (response.ok) {
      return NextResponse.json(true)
    } else {
      const errorText = await response.text()
      console.error("Contact proxy error:", errorText)
      return NextResponse.json({ success: false, error: "Failed to submit" }, { status: 500 })
    }
  } catch (error) {
    console.error("Admissions inquiry error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
