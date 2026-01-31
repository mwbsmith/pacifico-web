"use client"

import type React from "react"
import SharedFooter from "@/components/shared-footer" // Import SharedFooter component

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, Globe, ChevronDown, Mail, Phone, MapPin, Download, FileText } from "lucide-react"

interface DriveFile {
  id: string
  name: string
  description?: string
  mimeType: string
  sizeBytes: string
  modifiedTime: string
  webContentLink: string
  webViewLink: string
}

interface ApiResponse {
  files: DriveFile[]
  nextPageToken?: string
}

export default function NewslettersPage() {
  const [language, setLanguage] = useState<"en" | "es">("en")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [headerLogoOpacity, setHeaderLogoOpacity] = useState(0)
  const [pdfFiles, setPdfFiles] = useState<DriveFile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [newsletterForm, setNewsletterForm] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    mailingList: false,
  })
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false)
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "success" | "error">("idle")
  const [newsletterMessage, setNewsletterMessage] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const opacity = Math.min(scrollY / 200, 1)
      setHeaderLogoOpacity(opacity)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const fetchPdfFiles = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          "https://waldorf.cr/api/v1/drive/folder/1x_0adsQwDJHeBeZ2AG7xJHGxqck0cKOZ?only=pdf&page_size=50",
        )

        if (!response.ok) {
          throw new Error("Failed to fetch PDF files")
        }

        const data: ApiResponse = await response.json()
        setPdfFiles(data.files || [])
      } catch (err) {
        console.error("Error fetching PDF files:", err)
        setError(err instanceof Error ? err.message : "Failed to load newsletters")
      } finally {
        setLoading(false)
      }
    }

    fetchPdfFiles()
  }, [])

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    // Navigate to main page with hash
    window.location.href = `/${href}`
  }

  const handleDownload = (file: DriveFile) => {
    // Open the direct download link in a new tab
    window.open(file.webContentLink, "_blank")
  }

  const formatFileSize = (sizeInBytes: string) => {
    if (!sizeInBytes || sizeInBytes === "null" || sizeInBytes === "undefined") {
      return language === "en" ? "Size unavailable" : "Tamaño no disponible"
    }

    const bytes = Number.parseInt(sizeInBytes)

    if (isNaN(bytes) || bytes < 0) {
      return language === "en" ? "Size unavailable" : "Tamaño no disponible"
    }

    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === "en" ? "en-US" : "es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const text = {
    en: {
      title: "Newsletters",
      subtitle: "Stay updated with our monthly newsletters featuring school news, events, and community highlights.",
      backToHome: "Back to Home",
      downloadPdf: "Download PDF",
      readMore: "Read More",
      readLess: "Read Less",
      about: "About",
      admissions: "Admissions",
      calendar: "Calendar",
      contact: "Contact",
      aboutUs: "About Us",
      schoolCalendar: "School Calendar",
      quickLinks: "Quick Links",
      connectWithUs: "Connect With Us",
      familyHandbook: "Family Handbook",
      footerDescription:
        "A Waldorf-inspired education in the heart of Costa Rica, nurturing creativity, critical thinking, and character development.",
      footerCopyright: "Pacífico Internacional. All rights reserved.",
      availableNewsletters: "Available Newsletters",
      loadingNewsletters: "Loading newsletters...",
      errorLoadingNewsletters: "Error loading newsletters. Please try again later.",
      noNewslettersFound: "No newsletters found.",
      clickToDownload: "Click to download",
      fileName: "File Name",
      newsletter1: {
        title: "Newsletter #1 - September 2025",
        date: "September 2025",
        excerpt:
          "Welcome to a new year at Pacífico Internacional and to our first monthly newsletter. It has been wonderful to see the happy faces on campus during these first weeks.",
      },
    },
    es: {
      title: "Boletines",
      subtitle:
        "Mantente actualizado con nuestros boletines mensuales que incluyen noticias escolares, eventos y destacados de la comunidad.",
      backToHome: "Volver al Inicio",
      downloadPdf: "Descargar PDF",
      readMore: "Leer Más",
      readLess: "Leer Menos",
      about: "Acerca de",
      admissions: "Admisiones",
      calendar: "Calendario",
      contact: "Contacto",
      aboutUs: "Acerca de Nosotros",
      schoolCalendar: "Calendario Escolar",
      quickLinks: "Enlaces Rápidos",
      connectWithUs: "Conéctate con Nosotros",
      familyHandbook: "Manual Familiar",
      footerDescription:
        "Una educación inspirada en Waldorf en el corazón de Costa Rica, fomentando la creatividad, el pensamiento crítico y el desarrollo del carácter.",
      footerCopyright: "Pacífico Internacional. Todos los derechos reservados.",
      availableNewsletters: "Boletines Disponibles",
      loadingNewsletters: "Cargando boletines...",
      errorLoadingNewsletters: "Error al cargar boletines. Por favor intenta de nuevo más tarde.",
      noNewslettersFound: "No se encontraron boletines.",
      clickToDownload: "Haz clic para descargar",
      fileName: "Nombre del Archivo",
      newsletter1: {
        title: "Boletín Informativo #1 - Septiembre 2025",
        date: "Septiembre 2025",
        excerpt:
          "Bienvenidos a un nuevo año en Pacífico Internacional y a nuestro primer boletín informativo mensual. Ha sido maravilloso ver las caras felices en el campus durante estas primeras semanas.",
      },
    },
  }

  const [expandedNewsletter, setExpandedNewsletter] = useState<string | null>(null)

  const toggleNewsletter = (id: string) => {
    setExpandedNewsletter(expandedNewsletter === id ? null : id)
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsNewsletterSubmitting(true)
    setNewsletterStatus("idle")

    try {
      const response = await fetch("https://waldorf.cr/api/v1/newsletter-subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          full_name: newsletterForm.fullName,
          email: newsletterForm.email,
          whatsapp: newsletterForm.whatsapp,
          mailing_list: newsletterForm.mailingList,
        }),
      })

      if (response.ok) {
        setNewsletterStatus("success")
        setNewsletterMessage(
          language === "en"
            ? "Thank you! You've been successfully subscribed to our newsletter."
            : "¡Gracias! Te has suscrito exitosamente a nuestro boletín.",
        )
        // Reset form
        setNewsletterForm({
          fullName: "",
          email: "",
          whatsapp: "",
          mailingList: false,
        })
      } else {
        throw new Error("Failed to subscribe")
      }
    } catch (error) {
      setNewsletterStatus("error")
      setNewsletterMessage(
        language === "en"
          ? "Sorry, there was an error with your subscription. Please try again."
          : "Lo sentimos, hubo un error con tu suscripción. Por favor intenta de nuevo.",
      )
      console.error("Newsletter subscription error:", error)
    } finally {
      setIsNewsletterSubmitting(false)
    }
  }

  const handleNewsletterInputChange = (field: keyof typeof newsletterForm, value: string | boolean) => {
    setNewsletterForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ... existing navigation code ... */}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-black/20 backdrop-blur-sm transition-all duration-300">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex items-center justify-between">
            {/* Left spacer */}
            <div className="w-8"></div>

            {/* Header Logo - appears when scrolled */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 transition-opacity duration-300"
              style={{ opacity: headerLogoOpacity }}
            >
              <Image
                src="/images/pacifico-logo.png"
                alt="Pacífico Internacional - Educación Inspirada en Waldorf"
                width={100}
                height={100}
                className="drop-shadow-lg w-[60px] h-[60px] md:w-[100px] md:h-[100px]"
              />
            </div>

            {/* Desktop Navigation and Language Selector */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/#about" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                {text[language].about}
              </Link>
              <Link href="/#admissions" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                {text[language].admissions}
              </Link>
              <Link href="/#calendar" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                {text[language].calendar}
              </Link>
              <Link href="/#contact" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                {text[language].contact}
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-yellow-200 hover:bg-white/10 flex items-center gap-2 drop-shadow-md"
                  >
                    <Globe className="h-4 w-4" />
                    <span>{language.toUpperCase()}</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white border border-gray-200">
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50"
                    onClick={() => setLanguage("en")}
                  >
                    <span>EN</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50"
                    onClick={() => setLanguage("es")}
                  >
                    <span>ES</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:text-yellow-200 hover:bg-white/10">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-white/95 backdrop-blur-sm">
                  <div className="flex flex-col space-y-6 mt-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <Image
                        src="/images/pacifico-logo.png"
                        alt="Pacífico Internacional"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-bold text-gray-800">Pacífico Internacional</h3>
                        <p className="text-sm text-gray-600">Educación Inspirada en Waldorf</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <button
                        onClick={() => handleNavClick("#about")}
                        className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                      >
                        {text[language].about}
                      </button>
                      <button
                        onClick={() => handleNavClick("#admissions")}
                        className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                      >
                        {text[language].admissions}
                      </button>
                      <button
                        onClick={() => handleNavClick("#calendar")}
                        className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                      >
                        {text[language].calendar}
                      </button>
                      <button
                        onClick={() => handleNavClick("#contact")}
                        className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                      >
                        {text[language].contact}
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

      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/ani-in-jungle.jpeg"
            alt="Teacher with students in natural outdoor classroom"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {text[language].backToHome}
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white text-balance drop-shadow-lg">
              {text[language].title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 text-pretty max-w-3xl mx-auto drop-shadow-md">
              {text[language].subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Newsletters List */}
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Newsletter Subscription Section */}
            <section className="py-12 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100 rounded-lg mb-12">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto text-center">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    {language === "en" ? "Subscribe to our newsletter" : "Suscríbete a nuestro boletín"}
                  </h2>
                  <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder={language === "en" ? "Full name" : "Nombre completo"}
                        value={newsletterForm.fullName}
                        onChange={(e) => handleNewsletterInputChange("fullName", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="email"
                          placeholder={language === "en" ? "Enter your email" : "Ingresa tu correo"}
                          value={newsletterForm.email}
                          onChange={(e) => handleNewsletterInputChange("email", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          placeholder={language === "en" ? "WhatsApp number" : "Número de WhatsApp"}
                          value={newsletterForm.whatsapp}
                          onChange={(e) => handleNewsletterInputChange("whatsapp", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <input
                        type="checkbox"
                        id="mailingList"
                        checked={newsletterForm.mailingList}
                        onChange={(e) => handleNewsletterInputChange("mailingList", e.target.checked)}
                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <label htmlFor="mailingList" className="text-gray-700">
                        {language === "en"
                          ? "Add me to your mailing list also"
                          : "Agrégame también a tu lista de correo"}
                      </label>
                    </div>
                    {newsletterStatus !== "idle" && (
                      <div
                        className={`p-3 rounded-lg ${newsletterStatus === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                      >
                        {newsletterMessage}
                      </div>
                    )}
                    <Button
                      type="submit"
                      disabled={isNewsletterSubmitting}
                      className="bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white px-8 py-3 rounded-lg transition-colors"
                    >
                      {isNewsletterSubmitting
                        ? language === "en"
                          ? "Subscribing..."
                          : "Suscribiendo..."
                        : language === "en"
                          ? "Subscribe"
                          : "Suscribirse"}
                    </Button>
                  </form>
                </div>
              </div>
            </section>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                {text[language].availableNewsletters}
              </h2>

              {loading && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center gap-2 text-gray-600">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-teal-600"></div>
                    {text[language].loadingNewsletters}
                  </div>
                </div>
              )}

              {error && (
                <div className="text-center py-8">
                  <p className="text-red-600">{text[language].errorLoadingNewsletters}</p>
                </div>
              )}

              {!loading && !error && pdfFiles.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">{text[language].noNewslettersFound}</p>
                </div>
              )}

              {!loading && !error && pdfFiles.length > 0 && (
                <div className="grid gap-4">
                  {pdfFiles.map((file) => (
                    <div
                      key={file.id}
                      className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-start md:items-center gap-4 flex-1 min-w-0">
                          <div className="flex-shrink-0">
                            <FileText className="h-8 w-8 text-red-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <button onClick={() => handleDownload(file)} className="text-left w-full group">
                              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-teal-600 transition-colors break-words">
                                {file.description || file.name.replace(".pdf", "")}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1 break-words">
                                <span className="font-medium">{text[language].fileName}:</span> {file.name}
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                {formatDate(file.modifiedTime)} • {formatFileSize(file.sizeBytes)}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">{text[language].clickToDownload}</p>
                            </button>
                          </div>
                        </div>
                        <div className="flex-shrink-0 self-start md:self-center">
                          <Button
                            onClick={() => handleDownload(file)}
                            variant="outline"
                            size="sm"
                            className="text-teal-600 border-teal-600 hover:bg-teal-50 bg-transparent w-full md:w-auto"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            {text[language].downloadPdf}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <SharedFooter language={language} />
    </div>
  )
}
