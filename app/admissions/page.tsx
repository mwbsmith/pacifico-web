"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Mail,
  MapPin,
  Phone,
  Globe,
  ChevronDown,
  Menu,
  Clock,
  MessageCircle,
  X,
  CheckCircle,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

type Language = "en" | "es"

const translations = {
  en: {
    // Navigation
    about: "About",
    admissions: "Admissions",
    calendar: "Calendar",
    contact: "Contact",
    
    // Page content
    pageTitle: "Enroll Your Child",
    pageSubtitle: "Join our Waldorf-inspired school community in Costa Rica",
    
    // Form sections
    parentGuardianSection: "Parent / Guardian",
    studentSection: "Student",
    enrollmentTimingSection: "Enrollment Timing",
    additionalInfoSection: "Additional Information",
    
    // Parent fields
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    phone: "Phone Number",
    
    // Student fields
    studentFirstName: "Student's First Name",
    studentAge: "Student's Current Age or Date of Birth",
    gradeApplying: "Grade Applying For (Optional)",
    selectGrade: "Select a grade",
    
    // Enrollment timing
    whenEnroll: "When are you hoping to enroll?",
    asap: "As soon as possible",
    nextYear: "Next school year",
    exploring: "Just exploring",
    
    // How did you hear
    howDidYouHear: "How Did You Hear About Us? (Optional)",
    selectOption: "Select an option",
    googleSearch: "Google Search",
    socialMedia: "Facebook / Instagram",
    referral: "Friend / Referral",
    other: "Other",
    
    // Message
    anythingElse: "Anything you'd like us to know? (Optional)",
    messagePlaceholder: "Tell us about your child, your interests, or any questions you have...",
    
    // Submit
    submitButton: "Submit Inquiry",
    submitting: "Submitting...",
    
    // Success/Error
    successTitle: "Thank You!",
    successMessage: "We've received your inquiry and will be in touch within 24-48 hours.",
    errorMessage: "There was an error submitting your form. Please try again or contact us directly.",
    
    // Footer
    footerDescription: "Nurturing young minds through nature-based, holistic education that honors each child's unique journey.",
    quickLinks: "Quick Links",
    aboutUs: "About Us",
    schoolCalendar: "School Calendar",
    familyHandbook: "Family Handbook 2025-2026",
    connectWithUs: "Connect With Us",
    
    // WhatsApp
    whatsappChat: "WhatsApp Chat",
    chatHours: "Chat hours: 8:30 AM - 2:00 PM",
    chatNow: "Chat now",
    chatOffline: "Outside chat hours",
    
    // Required
    required: "Required",
    optional: "Optional",
    
    // Grades
    gradePreK: "Pre-Kindergarten (Ages 3-4)",
    gradeKindergarten: "Kindergarten (Ages 5-6)",
    grade1: "Grade 1",
    grade2: "Grade 2",
    grade3: "Grade 3",
    grade4: "Grade 4",
    grade5: "Grade 5",
    grade6: "Grade 6",
    grade7: "Grade 7",
    grade8: "Grade 8",
  },
  es: {
    // Navigation
    about: "Acerca de",
    admissions: "Admisiones",
    calendar: "Calendario",
    contact: "Contacto",
    
    // Page content
    pageTitle: "Inscribe a tu Hijo",
    pageSubtitle: "Únete a nuestra comunidad escolar inspirada en Waldorf en Costa Rica",
    
    // Form sections
    parentGuardianSection: "Padre / Tutor",
    studentSection: "Estudiante",
    enrollmentTimingSection: "Tiempo de Inscripción",
    additionalInfoSection: "Información Adicional",
    
    // Parent fields
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Correo Electrónico",
    phone: "Número de Teléfono",
    
    // Student fields
    studentFirstName: "Nombre del Estudiante",
    studentAge: "Edad Actual o Fecha de Nacimiento del Estudiante",
    gradeApplying: "Grado al que Aplica (Opcional)",
    selectGrade: "Selecciona un grado",
    
    // Enrollment timing
    whenEnroll: "¿Cuándo esperas inscribirte?",
    asap: "Lo antes posible",
    nextYear: "Próximo año escolar",
    exploring: "Solo explorando",
    
    // How did you hear
    howDidYouHear: "¿Cómo Supiste de Nosotros? (Opcional)",
    selectOption: "Selecciona una opción",
    googleSearch: "Búsqueda en Google",
    socialMedia: "Facebook / Instagram",
    referral: "Amigo / Referencia",
    other: "Otro",
    
    // Message
    anythingElse: "¿Algo que te gustaría que supiéramos? (Opcional)",
    messagePlaceholder: "Cuéntanos sobre tu hijo, tus intereses o cualquier pregunta que tengas...",
    
    // Submit
    submitButton: "Enviar Consulta",
    submitting: "Enviando...",
    
    // Success/Error
    successTitle: "¡Gracias!",
    successMessage: "Hemos recibido tu consulta y nos pondremos en contacto dentro de 24-48 horas.",
    errorMessage: "Hubo un error al enviar tu formulario. Por favor intenta de nuevo o contáctanos directamente.",
    
    // Footer
    footerDescription: "Nutriendo mentes jóvenes a través de educación holística basada en la naturaleza que honra el viaje único de cada niño.",
    quickLinks: "Enlaces Rápidos",
    aboutUs: "Acerca de Nosotros",
    schoolCalendar: "Calendario Escolar",
    familyHandbook: "Manual Familiar 2025-2026",
    connectWithUs: "Conéctate con Nosotros",
    
    // WhatsApp
    whatsappChat: "Chat de WhatsApp",
    chatHours: "Horario de chat: 8:30 AM - 2:00 PM",
    chatNow: "Chatear ahora",
    chatOffline: "Fuera de horario",
    
    // Required
    required: "Requerido",
    optional: "Opcional",
    
    // Grades
    gradePreK: "Pre-Kindergarten (Edades 3-4)",
    gradeKindergarten: "Kindergarten (Edades 5-6)",
    grade1: "Grado 1",
    grade2: "Grado 2",
    grade3: "Grado 3",
    grade4: "Grado 4",
    grade5: "Grado 5",
    grade6: "Grado 6",
    grade7: "Grado 7",
    grade8: "Grado 8",
  },
}

export default function AdmissionsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState<Language>("en")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false)
  const [showWhatsAppTooltip, setShowWhatsAppTooltip] = useState(false)
  const [isWithinChatHours, setIsWithinChatHours] = useState(false)
  
  const [formData, setFormData] = useState({
    parentFirstName: "",
    parentLastName: "",
    email: "",
    phone: "",
    studentFirstName: "",
    studentAge: "",
    gradeApplying: "",
    enrollmentTiming: "",
    howDidYouHear: "",
    message: "",
  })

  const t = (key: keyof typeof translations.en) => translations[language][key]

  useEffect(() => {
    const checkChatHours = () => {
      const now = new Date()
      const costaRicaTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Costa_Rica" }))
      const hours = costaRicaTime.getHours()
      const minutes = costaRicaTime.getMinutes()
      const currentTime = hours + minutes / 60
      setIsWithinChatHours(currentTime >= 8.5 && currentTime <= 14.0)
    }

    checkChatHours()
    const interval = setInterval(checkChatHours, 60000)
    return () => clearInterval(interval)
  }, [])

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

  const handleWhatsAppClick = () => {
    const phoneNumber = "50687626927"
    const message =
      language === "es"
        ? "Hola, me gustaría obtener más información sobre Pacífico Internacional Waldorf School."
        : "Hello, I would like to get more information about Pacífico Internacional Waldorf School."

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
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
          const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          recaptchaToken = await (window as any).grecaptcha.enterprise.execute(siteKey, { action: "admissions_form" })
        } catch (error) {
          console.error("[v0] reCAPTCHA error:", error)
        }
      }

      const response = await fetch("/proxy/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: `${formData.parentFirstName} ${formData.parentLastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          message: `
ADMISSIONS INQUIRY (Google Ads Landing Page)

Parent/Guardian: ${formData.parentFirstName} ${formData.parentLastName}
Email: ${formData.email}
Phone: ${formData.phone}

Student Name: ${formData.studentFirstName}
Student Age/DOB: ${formData.studentAge}
Grade Applying For: ${formData.gradeApplying || "Not specified"}

Enrollment Timing: ${formData.enrollmentTiming}
How They Heard About Us: ${formData.howDidYouHear || "Not specified"}

Additional Message:
${formData.message || "None"}
          `.trim(),
          recaptcha_token: recaptchaToken,
          source: "google_ads_landing",
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({
          parentFirstName: "",
          parentLastName: "",
          email: "",
          phone: "",
          studentFirstName: "",
          studentAge: "",
          gradeApplying: "",
          enrollmentTiming: "",
          howDidYouHear: "",
          message: "",
        })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      setSubmitStatus("error")
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    window.location.href = "/" + href
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-emerald-50 to-amber-50">
      {/* Hero Section with Background */}
      <section className="relative py-16 md:py-24 overflow-hidden min-h-[60vh] flex items-start">
        {/* Background Image */}
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
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-3">
                <Image
                  src="/images/pacifico-logo.png"
                  alt="Pacífico Internacional"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/#about" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                  {t("about")}
                </Link>
                <Link href="/#admissions" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                  {t("admissions")}
                </Link>
                <Link href="/#calendar" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                  {t("calendar")}
                </Link>
                <Link href="/#contact" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                  {t("contact")}
                </Link>

                {/* Language Selector */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-white hover:text-yellow-200 hover:bg-white/10">
                      <Globe className="h-4 w-4 mr-2" />
                      {language.toUpperCase()}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage("es")}>Español</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Mobile Menu */}
              <div className="md:hidden">
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] bg-white">
                    <div className="flex flex-col space-y-4 mt-8">
                      <div className="space-y-2">
                        <button
                          onClick={() => handleNavClick("#about")}
                          className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                        >
                          {t("about")}
                        </button>
                        <button
                          onClick={() => handleNavClick("#admissions")}
                          className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                        >
                          {t("admissions")}
                        </button>
                        <button
                          onClick={() => handleNavClick("#calendar")}
                          className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                        >
                          {t("calendar")}
                        </button>
                        <button
                          onClick={() => handleNavClick("#contact")}
                          className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                        >
                          {t("contact")}
                        </button>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-sm font-semibold text-gray-700 mb-3">
                          {language === "en" ? "Language / Idioma" : "Idioma / Language"}
                        </p>
                        <div className="space-y-2">
                          <button
                            onClick={() => setLanguage("en")}
                            className={`flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-gray-100 transition-colors ${language === "en" ? "bg-gray-100" : ""}`}
                          >
                            <span className="text-gray-800 font-medium">EN</span>
                          </button>
                          <button
                            onClick={() => setLanguage("es")}
                            className={`flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-gray-100 transition-colors ${language === "es" ? "bg-gray-100" : ""}`}
                          >
                            <span className="text-gray-800 font-medium">ES</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10 pt-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight drop-shadow-2xl mb-6 font-serif">
              {t("pageTitle")}
            </h1>
            <p className="text-xl md:text-2xl text-white leading-relaxed drop-shadow-lg">
              {t("pageSubtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">

            {/* Success State */}
            {submitStatus === "success" ? (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-8 pb-8 text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{t("successTitle")}</h2>
                  <p className="text-gray-600 mb-6">{t("successMessage")}</p>
                  <Button
                    onClick={() => setSubmitStatus("idle")}
                    className="bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    {language === "en" ? "Submit Another Inquiry" : "Enviar Otra Consulta"}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              /* Form Card */
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-t-lg">
                  <CardTitle className="text-2xl">{language === "en" ? "Enrollment Inquiry" : "Consulta de Inscripción"}</CardTitle>
                  <CardDescription className="text-teal-100">
                    {language === "en" 
                      ? "Fill out the form below and we'll get back to you within 24-48 hours."
                      : "Completa el formulario y nos pondremos en contacto en 24-48 horas."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Parent/Guardian Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                        {t("parentGuardianSection")}
                        <span className="text-sm font-normal text-red-500 ml-2">*{t("required")}</span>
                      </h3>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="parentFirstName">{t("firstName")} *</Label>
                          <Input
                            id="parentFirstName"
                            value={formData.parentFirstName}
                            onChange={(e) => handleInputChange("parentFirstName", e.target.value)}
                            required
                            className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="parentLastName">{t("lastName")} *</Label>
                          <Input
                            id="parentLastName"
                            value={formData.parentLastName}
                            onChange={(e) => handleInputChange("parentLastName", e.target.value)}
                            required
                            className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">{t("email")} *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            required
                            className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">{t("phone")} *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            required
                            className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Student Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                        {t("studentSection")}
                        <span className="text-sm font-normal text-red-500 ml-2">*{t("required")}</span>
                      </h3>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="studentFirstName">{t("studentFirstName")} *</Label>
                          <Input
                            id="studentFirstName"
                            value={formData.studentFirstName}
                            onChange={(e) => handleInputChange("studentFirstName", e.target.value)}
                            required
                            className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="studentAge">{t("studentAge")} *</Label>
                          <Input
                            id="studentAge"
                            value={formData.studentAge}
                            onChange={(e) => handleInputChange("studentAge", e.target.value)}
                            required
                            placeholder={language === "en" ? "e.g., 7 years old or 01/15/2018" : "ej., 7 años o 15/01/2018"}
                            className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="gradeApplying">{t("gradeApplying")}</Label>
                        <Select
                          value={formData.gradeApplying}
                          onValueChange={(value) => handleInputChange("gradeApplying", value)}
                        >
                          <SelectTrigger className="border-gray-300 focus:border-teal-500 focus:ring-teal-500">
                            <SelectValue placeholder={t("selectGrade")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pre-k">{t("gradePreK")}</SelectItem>
                            <SelectItem value="kindergarten">{t("gradeKindergarten")}</SelectItem>
                            <SelectItem value="grade-1">{t("grade1")}</SelectItem>
                            <SelectItem value="grade-2">{t("grade2")}</SelectItem>
                            <SelectItem value="grade-3">{t("grade3")}</SelectItem>
                            <SelectItem value="grade-4">{t("grade4")}</SelectItem>
                            <SelectItem value="grade-5">{t("grade5")}</SelectItem>
                            <SelectItem value="grade-6">{t("grade6")}</SelectItem>
                            <SelectItem value="grade-7">{t("grade7")}</SelectItem>
                            <SelectItem value="grade-8">{t("grade8")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Enrollment Timing Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                        {t("enrollmentTimingSection")}
                        <span className="text-sm font-normal text-red-500 ml-2">*{t("required")}</span>
                      </h3>
                      
                      <div className="space-y-2">
                        <Label>{t("whenEnroll")} *</Label>
                        <RadioGroup
                          value={formData.enrollmentTiming}
                          onValueChange={(value) => handleInputChange("enrollmentTiming", value)}
                          required
                          className="space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="asap" id="asap" />
                            <Label htmlFor="asap" className="font-normal cursor-pointer">{t("asap")}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="next-year" id="next-year" />
                            <Label htmlFor="next-year" className="font-normal cursor-pointer">{t("nextYear")}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="exploring" id="exploring" />
                            <Label htmlFor="exploring" className="font-normal cursor-pointer">{t("exploring")}</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    {/* Additional Information Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                        {t("additionalInfoSection")}
                        <span className="text-sm font-normal text-gray-500 ml-2">({t("optional")})</span>
                      </h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="howDidYouHear">{t("howDidYouHear")}</Label>
                        <Select
                          value={formData.howDidYouHear}
                          onValueChange={(value) => handleInputChange("howDidYouHear", value)}
                        >
                          <SelectTrigger className="border-gray-300 focus:border-teal-500 focus:ring-teal-500">
                            <SelectValue placeholder={t("selectOption")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="google">{t("googleSearch")}</SelectItem>
                            <SelectItem value="social">{t("socialMedia")}</SelectItem>
                            <SelectItem value="referral">{t("referral")}</SelectItem>
                            <SelectItem value="other">{t("other")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">{t("anythingElse")}</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          placeholder={t("messagePlaceholder")}
                          rows={4}
                          className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                        />
                      </div>
                    </div>

                    {/* Error Message */}
                    {submitStatus === "error" && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        {t("errorMessage")}
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting || !formData.enrollmentTiming}
                      className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white py-6 text-lg"
                    >
                      {isSubmitting ? t("submitting") : t("submitButton")}
                    </Button>

                    {/* reCAPTCHA Notice */}
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
            )}
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {showWhatsAppTooltip && (
            <div className="absolute bottom-16 right-0 bg-gray-800 text-white p-3 rounded-lg shadow-lg w-64 text-sm">
              <button
                onClick={() => setShowWhatsAppTooltip(false)}
                className="absolute top-1 right-1 text-gray-400 hover:text-white"
              >
                <X className="h-3 w-3" />
              </button>
              <div className="space-y-2">
                <p className="font-semibold">{t("whatsappChat")}</p>
                <div className="flex items-center space-x-1 text-xs">
                  <Clock className="h-3 w-3" />
                  <span>{t("chatHours")}</span>
                </div>
                <div className={`text-xs ${isWithinChatHours ? "text-green-400" : "text-yellow-400"}`}>
                  {isWithinChatHours ? "🟢 " + t("chatNow") : "🟡 " + t("chatOffline")}
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleWhatsAppClick}
            onMouseEnter={() => setShowWhatsAppTooltip(true)}
            onMouseLeave={() => setShowWhatsAppTooltip(false)}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
            aria-label={t("whatsappChat")}
          >
            <MessageCircle className="h-6 w-6" />
            {isWithinChatHours && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-3 w-3 animate-pulse"></div>
            )}
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-teal-800 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/images/pacifico-logo.png"
                  alt="Pacífico Internacional"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <h3 className="text-xl font-bold text-white">Pacífico Internacional</h3>
                  <p className="text-sm text-gray-300">Educación Inspirada en Waldorf</p>
                </div>
              </div>
              <p className="text-gray-300">{t("footerDescription")}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">{t("quickLinks")}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/#about" className="text-gray-300 hover:text-teal-300 transition-colors">
                    {t("aboutUs")}
                  </Link>
                </li>
                <li>
                  <Link href="/#admissions" className="text-gray-300 hover:text-teal-300 transition-colors">
                    {t("admissions")}
                  </Link>
                </li>
                <li>
                  <Link href="/#calendar" className="text-gray-300 hover:text-teal-300 transition-colors">
                    {t("schoolCalendar")}
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="text-gray-300 hover:text-teal-300 transition-colors">
                    {t("contact")}
                  </Link>
                </li>
                <li>
                  <a
                    href="/documents/family-handbook-2025-2026.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-teal-300 transition-colors"
                  >
                    {t("familyHandbook")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">{t("connectWithUs")}</h4>
              <div className="space-y-3">
                <p className="flex items-center text-gray-300">
                  <Mail className="mr-2 h-4 w-4" /> info@waldorf.cr
                </p>
                <p className="flex items-center text-gray-300">
                  <Phone className="mr-2 h-4 w-4" /> +506 8762 6927
                </p>
                <p className="flex items-center text-gray-300">
                  <MapPin className="mr-2 h-4 w-4" /> Costa Rica, Guanacaste
                </p>

                {/* Social Media Icons */}
                <div className="flex space-x-4 pt-2">
                  <a
                    href="https://wa.me/50687626927"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                    aria-label="WhatsApp"
                  >
                    <Image src="/icons/whatsapp.png" alt="WhatsApp" width={32} height={32} className="w-8 h-8" />
                  </a>
                  <a
                    href="https://www.instagram.com/pacificointernacional/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                    aria-label="Instagram"
                  >
                    <Image src="/icons/instagram.png" alt="Instagram" width={32} height={32} className="w-8 h-8" />
                  </a>
                  <a
                    href="https://www.facebook.com/pacificointernacionalcr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                    aria-label="Facebook"
                  >
                    <Image src="/icons/facebook.png" alt="Facebook" width={32} height={32} className="w-8 h-8" />
                  </a>
                  <a
                    href="https://maps.app.goo.gl/xR9v39Shy4PEcjgo6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                    aria-label="Google Maps Location"
                  >
                    <Image src="/icons/google-maps.png" alt="Google Maps" width={32} height={32} className="w-8 h-8" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Pacífico Internacional. All rights reserved. | Nurturing minds, hearts,
              and hands.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
