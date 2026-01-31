"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Globe,
  ChevronDown,
  Menu,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ArrowRight,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import type { NewsPostMeta } from "@/lib/mdx"

type Language = "en" | "es"

const translations = {
  en: {
    // Navigation
    about: "About",
    admissions: "Admissions",
    calendar: "Calendar",
    contact: "Contact",

    // Hero Section
    heroTitle: "School ",
    heroHighlight: "News",
    heroDescription: "Stay updated with the latest news, events, and announcements from Pacífico Internacional.",

    // News Section
    newsTitle: "Latest Updates",
    noNews: "No news articles available at this time. Check back soon!",
    readMore: "Read More",
    
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

    // Hero Section
    heroTitle: "Noticias de la ",
    heroHighlight: "Escuela",
    heroDescription: "Mantente actualizado con las últimas noticias, eventos y anuncios de Pacífico Internacional.",

    // News Section
    newsTitle: "Últimas Actualizaciones",
    noNews: "No hay artículos de noticias disponibles en este momento. ¡Vuelve pronto!",
    readMore: "Leer Más",

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

interface NewsPageClientProps {
  posts: NewsPostMeta[]
}

export default function NewsPageClient({ posts }: NewsPageClientProps) {
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: keyof typeof translations.en) => translations[language][key]

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
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-emerald-50 to-amber-50">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden min-h-[60vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/faculty-group-photo.jpeg"
            alt="Pacífico Internacional Faculty"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
        </div>

        {/* Navigation Overlay */}
        <nav className="fixed top-0 left-0 right-0 z-30 bg-black/20 backdrop-blur-sm transition-all duration-300">
          <div className="container mx-auto px-4 py-6 md:py-8">
            <div className="flex items-center justify-between">
              {/* Left side - Work With Us link (hidden on mobile) */}
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/careers" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md flex items-center gap-1">
                  {language === "en" ? "Work With Us!" : "¡Trabaja con nosotros!"}
                  <span className="bg-yellow-400 text-teal-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase">
                    {language === "en" ? "New" : "Nuevo"}
                  </span>
                </Link>
              </div>

              {/* Center Logo - with scroll animation on desktop */}
              <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
                <Image
                  src="/images/pacifico-logo.png"
                  alt="Pacífico Internacional"
                  width={100}
                  height={100}
                  className="drop-shadow-lg w-[60px] h-[60px] md:w-[100px] md:h-[100px]"
                  style={{
                    transform: `scale(${logoScale}) translateY(${logoY}px)`,
                    opacity: logoOpacity,
                    transition: "transform 0.1s ease-out, opacity 0.3s ease-out",
                  }}
                />
              </Link>

              {/* Header Logo - appears when scrolled */}
              <div
                className="absolute left-1/2 transform -translate-x-1/2"
                style={{
                  opacity: headerLogoOpacity,
                  transition: "opacity 0.3s ease-out",
                }}
              >
                <Link href="/">
                  <Image
                    src="/images/pacifico-logo.png"
                    alt="Pacífico Internacional"
                    width={100}
                    height={100}
                    className="drop-shadow-lg w-[60px] h-[60px] md:w-[100px] md:h-[100px]"
                  />
                </Link>
              </div>

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
                    <Button variant="ghost" size="sm" className="text-white hover:text-yellow-200 hover:bg-white/10 bg-transparent">
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
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 bg-transparent">
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
                        <Link
                          href="/careers"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2 flex items-center gap-2"
                        >
                          {language === "en" ? "Work With Us!" : "¡Trabaja con nosotros!"}
                          <span className="bg-yellow-400 text-teal-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase">
                            {language === "en" ? "New" : "Nuevo"}
                          </span>
                        </Link>
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
        <div className="container mx-auto px-4 relative z-10 pt-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight drop-shadow-2xl mb-6 font-serif">
              {t("heroTitle")}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                {t("heroHighlight")}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white leading-relaxed drop-shadow-lg">
              {t("heroDescription")}
            </p>
          </div>
        </div>
      </section>

      {/* News Grid Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-serif">
              {t("newsTitle")}
            </h2>
          </div>

          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post.slug} className="bg-white border-2 border-teal-100 hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.image || "/images/waldorf-classroom.jpg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <CardTitle className="text-xl text-teal-700">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 mb-4">
                      {post.description}
                    </CardDescription>
                    <Link href={`/news/${post.slug}`}>
                      <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50 bg-transparent">
                        {t("readMore")}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">{t("noNews")}</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-teal-800 via-teal-700 to-cyan-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <Image
                src="/images/pacifico-logo.png"
                alt="Pacífico Internacional"
                width={80}
                height={80}
                className="mb-4"
              />
              <p className="text-teal-100 leading-relaxed">{t("footerDescription")}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t("quickLinks")}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/#about" className="text-teal-100 hover:text-yellow-200 transition-colors">
                    {t("aboutUs")}
                  </Link>
                </li>
                <li>
                  <Link href="/calendar" className="text-teal-100 hover:text-yellow-200 transition-colors">
                    {t("schoolCalendar")}
                  </Link>
                </li>
                <li>
                  <a
                    href="/documents/family-handbook-2025-2026.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-100 hover:text-yellow-200 transition-colors"
                  >
                    {t("familyHandbook")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t("connectWithUs")}</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-teal-100">
                  <Mail className="h-5 w-5" />
                  <a href="mailto:info@waldorf.cr" className="hover:text-yellow-200 transition-colors">
                    info@waldorf.cr
                  </a>
                </div>
                <div className="flex items-center gap-3 text-teal-100">
                  <Phone className="h-5 w-5" />
                  <a href="tel:+50687626927" className="hover:text-yellow-200 transition-colors">
                    +506 8762-6927
                  </a>
                </div>
                <div className="flex items-center gap-3 text-teal-100">
                  <MapPin className="h-5 w-5" />
                  <span>Tamarindo, Guanacaste, Costa Rica</span>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <a
                  href="https://wa.me/50687626927"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image src="/icons/whatsapp.png" alt="WhatsApp" width={32} height={32} />
                </a>
                <a
                  href="https://www.instagram.com/pacifico.internacional/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image src="/icons/instagram.png" alt="Instagram" width={32} height={32} />
                </a>
                <a
                  href="https://www.facebook.com/waldorf.tamarindo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image src="/icons/facebook.png" alt="Facebook" width={32} height={32} />
                </a>
                <a
                  href="https://maps.app.goo.gl/dCLfCKwtjKFLrrSz8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image src="/icons/google-maps.png" alt="Google Maps" width={32} height={32} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-teal-600 mt-12 pt-8 text-center text-teal-200">
            <p>&copy; {new Date().getFullYear()} Pacífico Internacional. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
