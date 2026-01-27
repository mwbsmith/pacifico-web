"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, Globe, Menu, ChevronDown } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"

type Language = "en" | "es"

const translations = {
  en: {
    title: "Thank You!",
    subtitle: "We've received your information",
    description: "A member of our admissions team will contact you within 24 hours to discuss how Pacífico Internacional can be the perfect school for your child.",
    whatNext: "What happens next?",
    step1: "Our admissions team will review your inquiry",
    step2: "We'll reach out to schedule a campus visit",
    step3: "Meet our teachers and see our programs in action",
    backHome: "Back to Homepage",
    learnMore: "Learn More About Us",
  },
  es: {
    title: "¡Gracias!",
    subtitle: "Hemos recibido tu información",
    description: "Un miembro de nuestro equipo de admisiones te contactará dentro de 24 horas para discutir cómo Pacífico Internacional puede ser la escuela perfecta para tu hijo.",
    whatNext: "¿Qué sigue?",
    step1: "Nuestro equipo de admisiones revisará tu consulta",
    step2: "Te contactaremos para programar una visita al campus",
    step3: "Conoce a nuestros maestros y ve nuestros programas en acción",
    backHome: "Volver al Inicio",
    learnMore: "Conoce Más Sobre Nosotros",
  },
}

export default function AdmissionsThankYouPage() {
  const [language, setLanguage] = useState<Language>("en")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const t = (key: keyof (typeof translations)["en"]) => translations[language][key]

  // Fire Google Ads conversion event on page load
  useEffect(() => {
    // Google Ads conversion tracking
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
      const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_ADMISSIONS_CONVERSION_LABEL
      
      if (googleAdsId && conversionLabel) {
        (window as any).gtag("event", "conversion", {
          send_to: `${googleAdsId}/${conversionLabel}`,
        })
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm transition-all duration-300">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex items-center justify-between">
            {/* Left - Work With Us Link */}
            <div className="hidden md:flex items-center">
              <Link href="/careers" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md flex items-center gap-1">
                {language === "en" ? "Work With Us!" : "¡Trabaja con nosotros!"}
                <span className="bg-yellow-400 text-teal-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase animate-pulse">
                  {language === "en" ? "New" : "Nuevo"}
                </span>
              </Link>
            </div>
            <div className="md:hidden w-8"></div>

            {/* Header Logo - centered */}
            <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
              <Image
                src="/images/pacifico-logo.png"
                alt="Pacífico Internacional - Educación Inspirada en Waldorf"
                width={100}
                height={100}
                className="drop-shadow-lg w-[60px] h-[60px] md:w-[100px] md:h-[100px]"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/#about" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                {language === "en" ? "About" : "Nosotros"}
              </Link>
              <Link href="/#admissions" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                {language === "en" ? "Admissions" : "Admisiones"}
              </Link>
              <Link href="/#calendar" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                {language === "en" ? "Calendar" : "Calendario"}
              </Link>
              <Link href="/#contact" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                {language === "en" ? "Contact" : "Contacto"}
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
                      <Link
                        href="/#about"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                      >
                        {language === "en" ? "About" : "Nosotros"}
                      </Link>
                      <Link
                        href="/#admissions"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                      >
                        {language === "en" ? "Admissions" : "Admisiones"}
                      </Link>
                      <Link
                        href="/#calendar"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                      >
                        {language === "en" ? "Calendar" : "Calendario"}
                      </Link>
                      <Link
                        href="/#contact"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                      >
                        {language === "en" ? "Contact" : "Contacto"}
                      </Link>
                      <Link
                        href="/careers"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block w-full text-left text-lg text-teal-600 font-semibold transition-colors py-2 flex items-center gap-2"
                      >
                        {language === "en" ? "Work With Us!" : "¡Trabaja con nosotros!"}
                        <span className="bg-yellow-400 text-teal-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase">
                          {language === "en" ? "New" : "Nuevo"}
                        </span>
                      </Link>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
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

      {/* Main Content */}
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-serif">
              {t("title")}
            </h1>
            <p className="text-xl text-teal-600 font-medium mb-6">
              {t("subtitle")}
            </p>
            <p className="text-lg text-gray-600 mb-12">
              {t("description")}
            </p>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{t("whatNext")}</h2>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-600 font-bold">1</span>
                  </div>
                  <p className="text-gray-600 pt-1">{t("step1")}</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-600 font-bold">2</span>
                  </div>
                  <p className="text-gray-600 pt-1">{t("step2")}</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-600 font-bold">3</span>
                  </div>
                  <p className="text-gray-600 pt-1">{t("step3")}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8">
                  {t("backHome")}
                </Button>
              </Link>
              <Link href="/#about">
                <Button size="lg" variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50 font-semibold px-8 bg-transparent">
                  {t("learnMore")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <Image
            src="/images/pacifico-logo.png"
            alt="Pacífico Internacional Logo"
            width={60}
            height={60}
            className="rounded-full mx-auto mb-4"
          />
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Pacífico Internacional
          </p>
        </div>
      </footer>
    </div>
  )
}
