"use client"

import { Button } from "@/components/ui/button"
import {
  Globe,
  ChevronDown,
  Menu,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import SharedFooter from "@/components/shared-footer" // Import SharedFooter
import SharedHeader from "@/components/shared-header" // Import SharedHeader

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

type Language = "en" | "es"

const translations = {
  en: {
    // Navigation
    about: "About",
    admissions: "Admissions",
    calendar: "Calendar",
    contact: "Contact",

    // Thank You Content
    thankYouTitle: "Thank You!",
    thankYouSubtitle: "Your Request Has Been Received",
    thankYouMessage: "We're excited to connect with you! A member of our admissions team will be in touch within 24 hours to discuss next steps and answer any questions you may have.",
    whatHappensNext: "What Happens Next?",
    step1Title: "Email Confirmation",
    step1Desc: "You'll receive a confirmation email shortly with details about your inquiry.",
    step2Title: "Personal Outreach",
    step2Desc: "Our admissions team will contact you within 24 hours to schedule a call or visit.",
    step3Title: "Campus Visit",
    step3Desc: "We'll invite you to tour our beautiful jungle campus and meet our teachers.",
    exploreMore: "While You Wait",
    learnMore: "Learn more about our school",
    visitHomepage: "Visit Homepage",
    scheduleCall: "Schedule a Call Now",

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

    // Thank You Content
    thankYouTitle: "¡Gracias!",
    thankYouSubtitle: "Tu Solicitud Ha Sido Recibida",
    thankYouMessage: "¡Estamos emocionados de conectar contigo! Un miembro de nuestro equipo de admisiones se pondrá en contacto dentro de 24 horas para discutir los próximos pasos y responder cualquier pregunta que puedas tener.",
    whatHappensNext: "¿Qué Sigue?",
    step1Title: "Confirmación por Email",
    step1Desc: "Recibirás un correo de confirmación en breve con detalles sobre tu consulta.",
    step2Title: "Contacto Personal",
    step2Desc: "Nuestro equipo de admisiones te contactará dentro de 24 horas para programar una llamada o visita.",
    step3Title: "Visita al Campus",
    step3Desc: "Te invitaremos a recorrer nuestro hermoso campus en la selva y conocer a nuestros maestros.",
    exploreMore: "Mientras Esperas",
    learnMore: "Conoce más sobre nuestra escuela",
    visitHomepage: "Visitar Página Principal",
    scheduleCall: "Programar una Llamada Ahora",

    // Footer
    footerDescription: "Nutriendo mentes jóvenes a través de educación holística basada en la naturaleza que honra el viaje único de cada niño.",
    quickLinks: "Enlaces Rápidos",
    aboutUs: "Acerca de Nosotros",
    schoolCalendar: "Calendario Escolar",
    familyHandbook: "Manual Familiar 2025-2026",
    connectWithUs: "Conéctate con Nosotros",
  },
}

export default function AdmissionsThankYouPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: keyof typeof translations.en) => translations[language][key]

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    window.location.href = "/" + href
  }

  // Fire Google Ads conversion event on page load
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag && process.env.NEXT_PUBLIC_GOOGLE_ADS_ID && process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL) {
      window.gtag("event", "conversion", {
        send_to: `${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}/${process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL}`,
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-emerald-50 to-amber-50">
      {/* Hero Section with Background */}
      <section className="relative min-h-[60vh] flex flex-col">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/mayo.jpeg"
            alt="Students celebrating with colorful ribbons during a school event"
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
        <div className="container mx-auto px-4 relative z-10 pt-32 pb-16 flex-1 flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <CheckCircle className="h-20 w-20 text-green-400 mx-auto drop-shadow-lg" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight drop-shadow-2xl mb-4 font-serif">
              {t("thankYouTitle")}
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 drop-shadow-lg mb-6">
              {t("thankYouSubtitle")}
            </p>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed drop-shadow-md max-w-2xl mx-auto">
              {t("thankYouMessage")}
            </p>
          </div>
        </div>
      </section>

      {/* What Happens Next Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 font-serif">
            {t("whatHappensNext")}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-teal-100 text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{t("step1Title")}</h3>
              <p className="text-gray-600">{t("step1Desc")}</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-teal-100 text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{t("step2Title")}</h3>
              <p className="text-gray-600">{t("step2Desc")}</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-teal-100 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{t("step3Title")}</h3>
              <p className="text-gray-600">{t("step3Desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore More Section */}
      <section className="py-16 bg-gradient-to-r from-teal-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 font-serif">
            {t("exploreMore")}
          </h2>
          <p className="text-center text-gray-600 mb-8 text-lg">
            {t("learnMore")}
          </p>
          
          <div className="flex justify-center">
            <Link href="/">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 text-lg rounded-xl">
                {t("visitHomepage")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SharedFooter language={language} />
    </div>
  )
}
