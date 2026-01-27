"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
  Globe,
  ChevronDown,
  Menu,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ArrowLeft,
  User,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams, notFound } from "next/navigation"
import newsData from "@/data/news.json"

type Language = "en" | "es"

const translations = {
  en: {
    // Navigation
    about: "About",
    admissions: "Admissions",
    calendar: "Calendar",
    contact: "Contact",

    // Article
    backToNews: "Back to News",
    writtenBy: "Written by",
    
    // Footer
    footerDescription:
      "Nurturing young minds through nature-based, holistic education that honors each child's unique journey.",
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

    // Article
    backToNews: "Volver a Noticias",
    writtenBy: "Escrito por",

    // Footer
    footerDescription:
      "Nutriendo mentes jóvenes a través de educación holística basada en la naturaleza que honra el viaje único de cada niño.",
    quickLinks: "Enlaces Rápidos",
    aboutUs: "Acerca de Nosotros",
    schoolCalendar: "Calendario Escolar",
    familyHandbook: "Manual Familiar 2025-2026",
    connectWithUs: "Conéctate con Nosotros",
  },
}

export default function NewsArticlePage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: keyof typeof translations.en) => translations[language][key]

  // Find the article by slug
  const article = newsData.find((a) => a.slug === slug)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate logo animation based on scroll
  const maxScroll = 400
  const progress = Math.min(scrollY / maxScroll, 1)

  // Logo starts in hero center and moves to header - responsive sizing
  const logoScale = 1 - progress * 0.7
  const logoY = -(progress * 60)
  const logoOpacity = scrollY > maxScroll ? 0 : 1

  // Header logo appears when main logo is hidden
  const headerLogoOpacity = scrollY > maxScroll ? 1 : 0

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    if (href.startsWith("#")) {
      window.location.href = "/" + href
    } else {
      window.location.href = href
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + "T12:00:00-06:00")
    return date.toLocaleDateString(language === "en" ? "en-US" : "es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "America/Costa_Rica",
    })
  }

  // Simple markdown renderer for basic formatting
  const renderContent = (content: string) => {
    const lines = content.split("\n")
    const elements: React.ReactNode[] = []
    let currentParagraph: string[] = []
    
    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={elements.length} className="text-gray-700 leading-relaxed mb-4">
            {currentParagraph.join(" ")}
          </p>
        )
        currentParagraph = []
      }
    }

    lines.forEach((line, index) => {
      const trimmedLine = line.trim()
      
      if (trimmedLine.startsWith("## ")) {
        flushParagraph()
        elements.push(
          <h2 key={`h2-${index}`} className="text-2xl font-bold text-teal-700 mt-8 mb-4">
            {trimmedLine.replace("## ", "")}
          </h2>
        )
      } else if (trimmedLine.startsWith("# ")) {
        flushParagraph()
        elements.push(
          <h1 key={`h1-${index}`} className="text-3xl font-bold text-teal-800 mt-8 mb-4">
            {trimmedLine.replace("# ", "")}
          </h1>
        )
      } else if (trimmedLine.startsWith("- ")) {
        flushParagraph()
        elements.push(
          <li key={`li-${index}`} className="text-gray-700 ml-6 mb-2 list-disc">
            {trimmedLine.replace("- ", "")}
          </li>
        )
      } else if (trimmedLine === "") {
        flushParagraph()
      } else {
        currentParagraph.push(trimmedLine)
      }
    })
    
    flushParagraph()
    return elements
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-emerald-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Article Not Found</h1>
          <Link href="/news">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to News
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-emerald-50 to-amber-50">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden min-h-[50vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={article.image || "/images/faculty-group-photo.jpeg"}
            alt={language === "en" ? article.titleEn : article.titleEs}
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
              {/* Left - Work With Us Link */}
              <div className="hidden md:flex items-center">
                <Link href="/#careers" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md flex items-center gap-1">
                  {language === "en" ? "Work With Us!" : "¡Trabaja con nosotros!"}
                  <span className="bg-yellow-400 text-teal-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase animate-pulse">
                    {language === "en" ? "New" : "Nuevo"}
                  </span>
                </Link>
              </div>
              <div className="md:hidden w-8"></div>

              {/* Header Logo - appears when scrolled */}
              <div
                className="absolute left-1/2 transform -translate-x-1/2 transition-opacity duration-300"
                style={{ opacity: headerLogoOpacity }}
              >
                <Link href="/">
                  <Image
                    src="/images/pacifico-logo.png"
                    alt="Pacífico Internacional - Educación Inspirada en Waldorf"
                    width={100}
                    height={100}
                    className="drop-shadow-lg w-[60px] h-[60px] md:w-[100px] md:h-[100px]"
                  />
                </Link>
              </div>

              {/* Desktop Navigation and Language Selector */}
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
                          onClick={() => handleNavClick("/#about")}
                          className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                        >
                          {t("about")}
                        </button>
                        <button
                          onClick={() => handleNavClick("/#admissions")}
                          className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                        >
                          {t("admissions")}
                        </button>
                        <button
                          onClick={() => handleNavClick("/#calendar")}
                          className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                        >
                          {t("calendar")}
                        </button>
                        <button
                          onClick={() => handleNavClick("/#contact")}
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

        <div className="container mx-auto px-4 relative z-10 pt-[25px]">
          <div className="flex items-center justify-center text-center">
            <div className="space-y-8 max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
                {language === "en" ? article.titleEn : article.titleEs}
              </h1>

              {/* Animated Logo */}
              <div className="flex justify-center mb-6 relative">
                <div
                  className="transition-all duration-300 ease-out"
                  style={{
                    transform: `translateY(${logoY}vh) scale(${logoScale})`,
                    opacity: logoOpacity,
                  }}
                >
                  <Link href="/">
                    <Image
                      src="/images/pacifico-logo.png"
                      alt="Pacífico Internacional - Educación Inspirada en Waldorf"
                      width={200}
                      height={200}
                      className="drop-shadow-2xl w-[120px] h-[120px] md:w-[200px] md:h-[200px]"
                    />
                  </Link>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{formatDate(article.date)}</span>
                </div>
                {article.author && (
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span>{article.author}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements - Fixed positioning */}
        <div className="fixed top-20 left-4 md:left-10 text-yellow-400/70 opacity-60 z-50">
          <div className="text-3xl md:text-4xl animate-bounce">🐒</div>
        </div>
        <div className="fixed top-32 right-4 md:right-10 text-green-400/70 opacity-60 z-50">
          <div className="text-2xl md:text-3xl animate-pulse">🌿</div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-gradient-to-r from-emerald-100 to-teal-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Back to News Link */}
            <Link href="/news" className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("backToNews")}
            </Link>

            {/* Article Content */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <article className="prose prose-lg max-w-none">
                {renderContent(language === "en" ? article.contentEn : article.contentEs)}
              </article>
            </div>
          </div>
        </div>
      </section>

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
                <a
                  href="mailto:info@pacificointernacional.com"
                  className="flex items-center space-x-2 text-gray-300 hover:text-teal-300 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span>info@pacificointernacional.com</span>
                </a>
                <a
                  href="tel:+50626530067"
                  className="flex items-center space-x-2 text-gray-300 hover:text-teal-300 transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  <span>+506 2653-0067</span>
                </a>
                <a
                  href="https://www.google.com/maps?q=10.299444,-85.840833"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-300 hover:text-teal-300 transition-colors"
                >
                  <MapPin className="h-5 w-5" />
                  <span>Tamarindo, Guanacaste, Costa Rica</span>
                </a>
                <div className="flex space-x-4 pt-4">
                  <a
                    href="https://www.instagram.com/pacificointernacional/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                    aria-label="Follow us on Instagram"
                  >
                    <Image src="/icons/instagram.png" alt="Instagram" width={30} height={30} />
                  </a>
                  <a
                    href="https://www.facebook.com/pacificointernacional/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                    aria-label="Follow us on Facebook"
                  >
                    <Image src="/icons/facebook.png" alt="Facebook" width={30} height={30} />
                  </a>
                  <a
                    href="https://api.whatsapp.com/send?phone=50683860067"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                    aria-label="Contact us on WhatsApp"
                  >
                    <Image src="/icons/whatsapp.png" alt="WhatsApp" width={30} height={30} />
                  </a>
                  <a
                    href="https://www.google.com/maps?q=10.299444,-85.840833"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                    aria-label="Find us on Google Maps"
                  >
                    <Image src="/icons/google-maps.png" alt="Google Maps" width={30} height={30} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Pacífico Internacional. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
