"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Globe, Menu, GraduationCap, Users, Plane, Home, BookOpen, Heart, ChevronDown } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

type Language = "en" | "es"

const translations = {
  en: {
    // Navigation
    about: "About",
    admissions: "Admissions",
    calendar: "Calendar",
    contact: "Contact",

    // Hero
    heroTitle: "A World-Class Education",
    heroSubtitle: "in Paradise",
    heroDescription: "Relocating to Costa Rica? Give your children an exceptional bilingual education at Pacífico Internacional",
    
    // Why International Families
    whyTitle: "Why International Families Choose Us",
    relocatingTitle: "Easy Relocation",
    relocatingDesc: "We support families relocating from around the world with a smooth transition into our school community",
    bilingualTitle: "True Bilingual Education",
    bilingualDesc: "Full immersion in English and Spanish - perfect for families from any background",
    communityTitle: "International Community",
    communityDesc: "Join a diverse community of families from around the world who call Guanacaste home",
    lifestyleTitle: "Costa Rica Lifestyle",
    lifestyleDesc: "Experience the Pura Vida lifestyle while your children receive a top-quality education",

    // Programs
    programsTitle: "Programs for All Ages",
    earlyChildhood: "Early Childhood",
    earlyChildhoodAge: "Ages 3-6",
    primarySchool: "Primary School",
    primarySchoolAge: "Grades 1-5",
    middleSchool: "Middle School",
    middleSchoolAge: "Grades 6-7",

    // Form
    formTitle: "Start Your Journey",
    formSubtitle: "Fill out this form and we'll contact you within 24 hours",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    currentCountry: "Current Country",
    message: "Tell us about your family and children",
    submit: "Get Started",
    sending: "Sending...",

    // Footer
    copyright: "Pacífico Internacional",
  },
  es: {
    // Navigation
    about: "Nosotros",
    admissions: "Admisiones",
    calendar: "Calendario",
    contact: "Contacto",

    // Hero
    heroTitle: "Una Educación de Clase Mundial",
    heroSubtitle: "en el Paraíso",
    heroDescription: "¿Te mudas a Costa Rica? Ofrece a tus hijos una educación bilingüe excepcional en Pacífico Internacional",
    
    // Why International Families
    whyTitle: "Por Qué las Familias Internacionales Nos Eligen",
    relocatingTitle: "Fácil Reubicación",
    relocatingDesc: "Apoyamos a familias que se mudan de todo el mundo con una transición fluida a nuestra comunidad escolar",
    bilingualTitle: "Educación Verdaderamente Bilingüe",
    bilingualDesc: "Inmersión completa en inglés y español - perfecto para familias de cualquier origen",
    communityTitle: "Comunidad Internacional",
    communityDesc: "Únete a una comunidad diversa de familias de todo el mundo que llaman a Guanacaste su hogar",
    lifestyleTitle: "Estilo de Vida Costarricense",
    lifestyleDesc: "Experimenta el estilo de vida Pura Vida mientras tus hijos reciben una educación de alta calidad",

    // Programs
    programsTitle: "Programas para Todas las Edades",
    earlyChildhood: "Primera Infancia",
    earlyChildhoodAge: "3-6 años",
    primarySchool: "Primaria",
    primarySchoolAge: "Grados 1-5",
    middleSchool: "Secundaria",
    middleSchoolAge: "Grados 6-7",

    // Form
    formTitle: "Comienza Tu Viaje",
    formSubtitle: "Completa este formulario y te contactaremos en 24 horas",
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Correo Electrónico",
    phone: "Teléfono",
    currentCountry: "País Actual",
    message: "Cuéntanos sobre tu familia e hijos",
    submit: "Comenzar",
    sending: "Enviando...",

    // Footer
    copyright: "Pacífico Internacional",
  },
}

export default function InternationalFamiliesPage() {
  const [language, setLanguage] = useState<Language>("en")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    currentCountry: "",
    message: "",
  })
  const router = useRouter()

  const t = (key: keyof (typeof translations)["en"]) => translations[language][key]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/proxy/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          message: `[International Families Landing Page]\nCountry: ${formData.currentCountry}\n\n${formData.message}`,
          source: "international-families",
        }),
      })

      if (response.ok) {
        router.push("/international-families/thank-you")
      } else {
        alert(language === "en" ? "Something went wrong. Please try again." : "Algo salió mal. Por favor intenta de nuevo.")
      }
    } catch (error) {
      alert(language === "en" ? "Something went wrong. Please try again." : "Algo salió mal. Por favor intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

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

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src="/images/faculty-group-photo.jpeg"
          alt="Pacífico Internacional Campus"
          fill
          className="object-cover object-[center_25%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-2 drop-shadow-lg font-serif">
              {t("heroTitle")}
            </h1>
            <p className="text-2xl md:text-3xl mb-4 text-yellow-200 drop-shadow-md">
              {t("heroSubtitle")}
            </p>
            <p className="text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
              {t("heroDescription")}
            </p>
          </div>
        </div>
      </section>

      {/* Why International Families Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 font-serif">
            {t("whyTitle")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plane className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t("relocatingTitle")}</h3>
                <p className="text-gray-600">{t("relocatingDesc")}</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t("bilingualTitle")}</h3>
                <p className="text-gray-600">{t("bilingualDesc")}</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t("communityTitle")}</h3>
                <p className="text-gray-600">{t("communityDesc")}</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t("lifestyleTitle")}</h3>
                <p className="text-gray-600">{t("lifestyleDesc")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 bg-gradient-to-r from-teal-600 to-teal-700">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center text-white mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
                {t("formTitle")}
              </h2>
              <p className="text-lg opacity-90">
                {t("formSubtitle")}
              </p>
            </div>
            <Card className="border-none shadow-2xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("firstName")} *
                      </label>
                      <Input
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("lastName")} *
                      </label>
                      <Input
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("email")} *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("phone")}
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("currentCountry")} *
                      </label>
                      <Input
                        required
                        value={formData.currentCountry}
                        onChange={(e) => setFormData({ ...formData, currentCountry: e.target.value })}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("message")}
                    </label>
                    <Textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-6 text-lg"
                  >
                    {isSubmitting ? t("sending") : t("submit")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 font-serif">
            {t("programsTitle")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="border-none shadow-lg text-center">
              <CardContent className="p-6">
                <GraduationCap className="w-12 h-12 text-pink-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800">{t("earlyChildhood")}</h3>
                <p className="text-teal-600 font-medium">{t("earlyChildhoodAge")}</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg text-center">
              <CardContent className="p-6">
                <GraduationCap className="w-12 h-12 text-teal-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800">{t("primarySchool")}</h3>
                <p className="text-teal-600 font-medium">{t("primarySchoolAge")}</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg text-center">
              <CardContent className="p-6">
                <GraduationCap className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800">{t("middleSchool")}</h3>
                <p className="text-teal-600 font-medium">{t("middleSchoolAge")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <Image
            src="/images/pacifico-logo.png"
            alt="Pacífico Internacional Logo"
            width={60}
            height={60}
            className="rounded-full mx-auto mb-4"
          />
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} {t("copyright")}
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <a
              href="https://www.instagram.com/pacifico.internacional/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Image src="/icons/instagram.png" alt="Instagram" width={24} height={24} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100089090498498"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Image src="/icons/facebook.png" alt="Facebook" width={24} height={24} />
            </a>
            <a
              href="https://wa.me/50687626927"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Image src="/icons/whatsapp.png" alt="WhatsApp" width={24} height={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
