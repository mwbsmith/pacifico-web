"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Globe, ChevronDown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

type Language = "en" | "es"

const translations = {
  en: {
    about: "About",
    admissions: "Admissions",
    calendar: "Calendar",
    contact: "Contact",
    explore: "Explore",
    insights: "Insights",
    news: "News",
    language: "Language / Idioma",
  },
  es: {
    about: "Acerca de",
    admissions: "Admisiones",
    calendar: "Calendario",
    contact: "Contacto",
    explore: "Explorar",
    insights: "Perspectivas",
    news: "Noticias",
    language: "Idioma / Language",
  },
}

interface SharedHeaderProps {
  language: Language
  setLanguage: (lang: Language) => void
  isHomepage?: boolean
  headerLogoOpacity?: number
  onNavClick?: (href: string) => void
}

export default function SharedHeader({
  language,
  setLanguage,
  isHomepage = false,
  headerLogoOpacity = 1,
  onNavClick,
}: SharedHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [exploreOpen, setExploreOpen] = useState(false)
  const [mobileExploreOpen, setMobileExploreOpen] = useState(false)

  const t = (key: keyof typeof translations.en) => translations[language][key]

  // Helper to get the correct link prefix
  const getLink = (anchor: string) => (isHomepage ? anchor : `/${anchor}`)

  const handleNavClick = (href: string) => {
    if (onNavClick) {
      onNavClick(href)
    }
    setMobileMenuOpen(false)
  }

  // Close explore dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setExploreOpen(false)
    if (exploreOpen) {
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [exploreOpen])

  return (
    <>
      {/* Left side spacer to keep logo centered */}
      <div className="hidden md:flex items-center space-x-6 w-8"></div>
      <div className="md:hidden w-8"></div>

      {/* Header Logo - appears when scrolled (or always on non-homepage) */}
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

      {/* Desktop Navigation and Language Selector */}
      <div className="hidden md:flex items-center space-x-6">
        <Link
          href={getLink("#about")}
          className="text-white hover:text-yellow-200 transition-colors drop-shadow-md"
        >
          {t("about")}
        </Link>
        <Link
          href={getLink("#admissions")}
          className="text-white hover:text-yellow-200 transition-colors drop-shadow-md"
        >
          {t("admissions")}
        </Link>
        <Link
          href={getLink("#calendar")}
          className="text-white hover:text-yellow-200 transition-colors drop-shadow-md"
        >
          {t("calendar")}
        </Link>
        <Link
          href={getLink("#contact")}
          className="text-white hover:text-yellow-200 transition-colors drop-shadow-md"
        >
          {t("contact")}
        </Link>

        {/* Explore Dropdown */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setExploreOpen(!exploreOpen)
            }}
            className="text-white hover:text-yellow-200 transition-colors drop-shadow-md flex items-center gap-1"
          >
            {t("explore")}
            <ChevronDown className={`h-4 w-4 transition-transform ${exploreOpen ? "rotate-180" : ""}`} />
          </button>
          {exploreOpen && (
            <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg py-2 min-w-[160px] z-50">
              <Link
                href="/news"
                className="block px-4 py-2 text-gray-800 hover:bg-teal-50 hover:text-teal-600 transition-colors"
                onClick={() => setExploreOpen(false)}
              >
                {t("insights")}
              </Link>
            </div>
          )}
        </div>

        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-yellow-200 hover:bg-white/10 bg-transparent"
            >
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
                {isHomepage ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <Link
                      href="/#about"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                    >
                      {t("about")}
                    </Link>
                    <Link
                      href="/#admissions"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                    >
                      {t("admissions")}
                    </Link>
                    <Link
                      href="/#calendar"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                    >
                      {t("calendar")}
                    </Link>
                    <Link
                      href="/#contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                    >
                      {t("contact")}
                    </Link>
                  </>
                )}

                {/* Mobile Explore Section */}
                <div className="border-t border-gray-100 pt-2 mt-2">
                  <button
                    onClick={() => setMobileExploreOpen(!mobileExploreOpen)}
                    className="flex items-center justify-between w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                  >
                    {t("explore")}
                    <ChevronDown className={`h-5 w-5 transition-transform ${mobileExploreOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileExploreOpen && (
                    <div className="pl-4 space-y-1">
                      <Link
                        href="/news"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-gray-600 hover:text-teal-600 transition-colors py-2"
                      >
                        {t("insights")}
                      </Link>
                    </div>
                  )}
                </div>

              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm font-semibold text-gray-700 mb-3">{t("language")}</p>
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
    </>
  )
}
