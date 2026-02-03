"use client"

import type React from "react"
import SharedFooter from "@/components/shared-footer" // Import SharedFooter component
import SharedHeader from "@/components/shared-header" // Import SharedHeader component

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Globe,
  ChevronDown,
  Menu,
  Heart,
  Leaf,
  Users,
  BookOpen,
  Sun,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type Language = "en" | "es"

const translations = {
  en: {
    // Navigation
    about: "About",
    admissions: "Admissions",
    calendar: "Calendar",
    contact: "Contact",

    // Hero
    heroTitle: "Begin Your Child's",
    heroHighlight: " Waldorf Journey",
    heroSubtitle: "Join our nurturing community in the heart of Costa Rica where children learn through creativity, nature, and hands-on discovery.",

    // Form
    formTitle: "Request Admissions Information",
    formSubtitle: "Give us a few details and we'll be in touch right away!",
    parentGuardian: "Parent / Guardian",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    phone: "Phone Number",
    student: "Student",
    studentFirstName: "Student's First Name",
    studentAge: "Student's Current Age or Date of Birth",
    gradeApplying: "Grade Applying For (Optional)",
    enrollmentTiming: "When are you hoping to enroll?",
    asap: "As soon as possible",
    nextYear: "Next school year",
    exploring: "Just exploring",
    howDidYouHear: "How Did You Hear About Us? (Optional)",
    googleSearch: "Google Search",
    socialMedia: "Facebook / Instagram",
    referral: "Friend / Referral",
    other: "Other",
    message: "Anything you'd like us to know? (Optional)",
    messagePlaceholder: "Share any questions or additional information...",
    submit: "Submit Application",
    submitting: "Submitting...",
    required: "Required",
    optional: "Optional",

    // Success
    successTitle: "Application Received!",
    successMessage: "Thank you for your interest in Pacífico Internacional. We'll be in touch within 24 hours to discuss next steps.",
    backToHome: "Back to Homepage",

    // Why Join Section
    whyJoinTitle: "Why Families Choose Us",
    reason1Title: "Waldorf-Inspired Education",
    reason1Desc: "Our curriculum nurtures head, heart, and hands through developmentally appropriate learning that honors each child's natural rhythm.",
    reason2Title: "Bilingual Immersion",
    reason2Desc: "Students become fluent in both English and Spanish through daily immersion with native-speaking teachers.",
    reason3Title: "Nature-Based Learning",
    reason3Desc: "Our jungle campus provides endless opportunities for outdoor exploration, gardening, and connection with the natural world.",
    reason4Title: "Small Class Sizes",
    reason4Desc: "With intimate class sizes, every child receives individual attention and builds meaningful relationships with teachers and peers.",
    reason5Title: "Community Focus",
    reason5Desc: "Join a warm, welcoming community of families who value creativity, collaboration, and conscious parenting.",
    reason6Title: "Costa Rica Lifestyle",
    reason6Desc: "Experience the pura vida lifestyle while giving your children an exceptional international education.",

    // Footer
    footerDescription: "Nurturing young minds through nature-based, holistic education that honors each child's unique journey.",
    quickLinks: "Quick Links",
    aboutUs: "About Us",
    schoolCalendar: "School Calendar",
    familyHandbook: "Family Handbook 2025-2026",
    connectWithUs: "Connect With Us",
  },
  es: {
    // Navigation
    about: "Acerca de",
    admissions: "Admisiones",
    calendar: "Calendario",
    contact: "Contacto",

    // Hero
    heroTitle: "Comienza el Viaje",
    heroHighlight: " Waldorf de tu Hijo",
    heroSubtitle: "Únete a nuestra comunidad nutritiva en el corazón de Costa Rica donde los niños aprenden a través de la creatividad, la naturaleza y el descubrimiento práctico.",

    // Form
    formTitle: "Solicita Información de Admisiones",
    formSubtitle: "Danos algunos detalles y nos pondremos en contacto de inmediato!",
    parentGuardian: "Padre / Tutor",
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Correo Electrónico",
    phone: "Número de Teléfono",
    student: "Estudiante",
    studentFirstName: "Nombre del Estudiante",
    studentAge: "Edad Actual o Fecha de Nacimiento del Estudiante",
    gradeApplying: "Grado al que Aplica (Opcional)",
    enrollmentTiming: "¿Cuándo esperas inscribirte?",
    asap: "Lo antes posible",
    nextYear: "Próximo año escolar",
    exploring: "Solo explorando",
    howDidYouHear: "¿Cómo Supiste de Nosotros? (Opcional)",
    googleSearch: "Búsqueda en Google",
    socialMedia: "Facebook / Instagram",
    referral: "Amigo / Referido",
    other: "Otro",
    message: "¿Algo que te gustaría que sepamos? (Opcional)",
    messagePlaceholder: "Comparte cualquier pregunta o información adicional...",
    submit: "Enviar Solicitud",
    submitting: "Enviando...",
    required: "Requerido",
    optional: "Opcional",

    // Success
    successTitle: "¡Solicitud Recibida!",
    successMessage: "Gracias por tu interés en Pacífico Internacional. Nos pondremos en contacto dentro de 24 horas para discutir los próximos pasos.",
    backToHome: "Volver al Inicio",

    // Why Join Section
    whyJoinTitle: "Por Qué las Familias Nos Eligen",
    reason1Title: "Educación Inspirada en Waldorf",
    reason1Desc: "Nuestro currículo nutre cabeza, corazón y manos a través de un aprendizaje apropiado para el desarrollo que honra el ritmo natural de cada niño.",
    reason2Title: "Inmersión Bilingüe",
    reason2Desc: "Los estudiantes se vuelven fluidos en inglés y español a través de la inmersión diaria con maestros nativos.",
    reason3Title: "Aprendizaje Basado en la Naturaleza",
    reason3Desc: "Nuestro campus en la selva ofrece infinitas oportunidades para la exploración al aire libre, jardinería y conexión con el mundo natural.",
    reason4Title: "Clases Pequeñas",
    reason4Desc: "Con tamaños de clase íntimos, cada niño recibe atención individual y construye relaciones significativas con maestros y compañeros.",
    reason5Title: "Enfoque Comunitario",
    reason5Desc: "Únete a una comunidad cálida y acogedora de familias que valoran la creatividad, colaboración y crianza consciente.",
    reason6Title: "Estilo de Vida en Costa Rica",
    reason6Desc: "Experimenta el estilo de vida pura vida mientras das a tus hijos una educación internacional excepcional.",

    // Footer
    footerDescription: "Nutriendo mentes jóvenes a través de educación holística basada en la naturaleza que honra el viaje único de cada niño.",
    quickLinks: "Enlaces Rápidos",
    aboutUs: "Acerca de Nosotros",
    schoolCalendar: "Calendario Escolar",
    familyHandbook: "Manual Familiar 2025-2026",
    connectWithUs: "Conéctate con Nosotros",
  },
}

export default function AdmissionsLandingPage() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState<Language>("en")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "error">("idle")
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false)

  const [formData, setFormData] = useState({
    parent_first_name: "",
    parent_last_name: "",
    parent_email: "",
    parent_phone: "",
    student_first_name: "",
    student_age_or_dob: "",
    grade_applying_for: "",
    enroll_timing: "",
    heard_about: "",
    notes: "",
  })

  useEffect(() => {
    const checkRecaptchaReady = () => {
      if (
        typeof window !== "undefined" &&
        (window as any).grecaptcha?.enterprise &&
        (window as any).grecaptcha.enterprise.ready
      ) {
        ;(window as any).grecaptcha.enterprise.ready(() => {
          setIsRecaptchaReady(true)
        })
      }
    }

    checkRecaptchaReady()
    const timeout = setTimeout(checkRecaptchaReady, 1000)

    return () => clearTimeout(timeout)
  }, [])

  const t = (key: keyof typeof translations.en) => translations[language][key]

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    window.location.href = "/" + href
  }

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      let recaptchaToken = ""
      if (isRecaptchaReady && typeof window !== "undefined" && (window as any).grecaptcha?.enterprise) {
        try {
          const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
          if (siteKey) {
            recaptchaToken = await (window as any).grecaptcha.enterprise.execute(siteKey, { action: "admissions_form" })
          }
        } catch (error) {
          console.error("reCAPTCHA error:", error)
        }
      }

      // Get UTM parameters from URL
      const urlParams = new URLSearchParams(window.location.search)
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admissions-inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formData,
          source: "google_ads",
          landing_path: window.location.pathname,
          utm_source: urlParams.get("utm_source") || "",
          utm_medium: urlParams.get("utm_medium") || "",
          utm_campaign: urlParams.get("utm_campaign") || "",
          utm_term: urlParams.get("utm_term") || "",
          utm_content: urlParams.get("utm_content") || "",
          recaptcha_token: recaptchaToken,
        }),
      })

      const result = await response.json()

      if (result?.ok === true) {
        // Redirect to thank-you page on success
        router.push("/admissions/thank-you")
      } else {
        throw new Error(result?.message || "Failed to submit")
      }
    } catch (error) {
      setSubmitStatus("error")
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-emerald-50 to-amber-50">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden min-h-[70vh] flex items-center">
        {/* Background Image - Waldorf Classroom */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/waldorf-classroom.jpg"
            alt="Waldorf classroom with students learning"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
        </div>

        {/* Navigation Overlay */}
        <nav className="fixed top-0 left-0 right-0 z-30 bg-black/20 backdrop-blur-sm transition-all duration-300">
          <div className="container mx-auto px-4 py-6 md:py-8">
            <div className="flex items-center justify-between">
              <SharedHeader language={language} setLanguage={setLanguage} />
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10 pt-16">
          <div className="flex items-center justify-center text-center">
            <div className="space-y-6 max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
                {t("heroTitle")}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-green-300 drop-shadow-lg">
                  {t("heroHighlight")}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white leading-relaxed drop-shadow-lg max-w-3xl mx-auto">
                {t("heroSubtitle")}
              </p>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="fixed top-20 left-4 md:left-10 text-yellow-400/70 opacity-60 z-50">
          <div className="text-3xl md:text-4xl animate-bounce">🐒</div>
        </div>
        <div className="fixed top-32 right-4 md:right-10 text-green-400/70 opacity-60 z-50">
          <div className="text-2xl md:text-3xl animate-pulse">🌿</div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-100 to-teal-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-xl">
              <CardHeader className="text-center bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-t-lg">
                <CardTitle className="text-3xl">{t("formTitle")}</CardTitle>
                <CardDescription className="text-teal-100 text-lg">
                  {t("formSubtitle")}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Parent/Guardian Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                      <Users className="h-5 w-5 text-teal-600" />
                      <h3 className="text-lg font-semibold text-gray-800">{t("parentGuardian")}</h3>
                      <span className="text-sm text-red-500">*{t("required")}</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="parent_first_name">{t("firstName")} *</Label>
                        <Input
                          id="parent_first_name"
                          value={formData.parent_first_name}
                          onChange={(e) => handleInputChange("parent_first_name", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="parent_last_name">{t("lastName")} *</Label>
                        <Input
                          id="parent_last_name"
                          value={formData.parent_last_name}
                          onChange={(e) => handleInputChange("parent_last_name", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="parent_email">{t("email")} *</Label>
                        <Input
                          id="parent_email"
                          type="email"
                          value={formData.parent_email}
                          onChange={(e) => handleInputChange("parent_email", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="parent_phone">{t("phone")} *</Label>
                        <Input
                          id="parent_phone"
                          type="tel"
                          value={formData.parent_phone}
                          onChange={(e) => handleInputChange("parent_phone", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Student Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                      <BookOpen className="h-5 w-5 text-teal-600" />
                      <h3 className="text-lg font-semibold text-gray-800">{t("student")}</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="student_first_name">{t("studentFirstName")} *</Label>
                        <Input
                          id="student_first_name"
                          value={formData.student_first_name}
                          onChange={(e) => handleInputChange("student_first_name", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="student_age_or_dob">{t("studentAge")} *</Label>
                        <Input
                          id="student_age_or_dob"
                          value={formData.student_age_or_dob}
                          onChange={(e) => handleInputChange("student_age_or_dob", e.target.value)}
                          required
                          placeholder="e.g., 6 years old or 01/15/2018"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="grade_applying_for">{t("gradeApplying")}</Label>
                      <Input
                        id="grade_applying_for"
                        value={formData.grade_applying_for}
                        onChange={(e) => handleInputChange("grade_applying_for", e.target.value)}
                        placeholder="e.g., Kindergarten, Grade 1, etc."
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Enrollment Timing */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                      <Sun className="h-5 w-5 text-teal-600" />
                      <h3 className="text-lg font-semibold text-gray-800">{t("enrollmentTiming")} *</h3>
                    </div>
                    <RadioGroup
                      value={formData.enroll_timing}
                      onValueChange={(value) => handleInputChange("enroll_timing", value)}
                      required
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="asap" id="asap" />
                        <Label htmlFor="asap" className="cursor-pointer">{t("asap")}</Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="next_school_year" id="next_school_year" />
                        <Label htmlFor="next_school_year" className="cursor-pointer">{t("nextYear")}</Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="exploring" id="exploring" />
                        <Label htmlFor="exploring" className="cursor-pointer">{t("exploring")}</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* How Did You Hear About Us */}
                  <div className="space-y-4">
                    <Label htmlFor="heard_about">{t("howDidYouHear")}</Label>
                    <select
                      id="heard_about"
                      value={formData.heard_about}
                      onChange={(e) => handleInputChange("heard_about", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">-- Select --</option>
                      <option value="google">{t("googleSearch")}</option>
                      <option value="social">{t("socialMedia")}</option>
                      <option value="referral">{t("referral")}</option>
                      <option value="other">{t("other")}</option>
                    </select>
                  </div>

                  {/* Notes */}
                  <div className="space-y-4">
                    <Label htmlFor="notes">{t("message")}</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      placeholder={t("messagePlaceholder")}
                      rows={4}
                      className="mt-1"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.enroll_timing}
                    className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white py-6 text-lg"
                  >
                    {isSubmitting ? t("submitting") : t("submit")}
                  </Button>

                  <p className="text-sm text-gray-500 text-center">
                    {language === "en"
                      ? "If you have trouble submitting this form, email us directly at "
                      : "Si tienes problemas para enviar este formulario, escríbenos directamente a "}
                    <a href="mailto:info@waldorf.cr" className="text-teal-600 hover:text-teal-700 underline">
                      info@waldorf.cr
                    </a>
                  </p>

                  {submitStatus === "error" && (
                    <p className="text-red-600 text-center">
                      {language === "en"
                        ? "There was an error submitting your application. Please try again."
                        : "Hubo un error al enviar tu solicitud. Por favor intenta de nuevo."}
                    </p>
                  )}

                  {/* reCAPTCHA notice */}
                  <p className="text-xs text-gray-500 text-center">
                    {language === "en" ? (
                      <>
                        This site is protected by reCAPTCHA and the Google{" "}
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">
                          Privacy Policy
                        </a>{" "}
                        and{" "}
                        <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline">
                          Terms of Service
                        </a>{" "}
                        apply.
                      </>
                    ) : (
                      <>
                        Este sitio está protegido por reCAPTCHA y se aplican la{" "}
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">
                          Política de Privacidad
                        </a>{" "}
                        y los{" "}
                        <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline">
                          Términos de Servicio
                        </a>{" "}
                        de Google.
                      </>
                    )}
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">{t("whyJoinTitle")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto bg-blue-500 text-white p-3 rounded-full w-fit mb-4">
                  <BookOpen className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl text-blue-700">{t("reason1Title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">{t("reason1Desc")}</CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto bg-green-500 text-white p-3 rounded-full w-fit mb-4">
                  <Globe className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl text-green-700">{t("reason2Title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">{t("reason2Desc")}</CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto bg-yellow-500 text-white p-3 rounded-full w-fit mb-4">
                  <Leaf className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl text-yellow-700">{t("reason3Title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">{t("reason3Desc")}</CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto bg-purple-500 text-white p-3 rounded-full w-fit mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl text-purple-700">{t("reason4Title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">{t("reason4Desc")}</CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto bg-red-500 text-white p-3 rounded-full w-fit mb-4">
                  <Heart className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl text-red-700">{t("reason5Title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">{t("reason5Desc")}</CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto bg-teal-500 text-white p-3 rounded-full w-fit mb-4">
                  <Sun className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl text-teal-700">{t("reason6Title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">{t("reason6Desc")}</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SharedFooter language={language} />
    </div>
  )
}
