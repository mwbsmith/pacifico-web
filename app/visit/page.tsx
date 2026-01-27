"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Calendar, Menu, Globe, ChevronDown, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function VisitPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState<"en" | "es">("en")

  const translations = {
    en: {
      nav: {
        about: "About",
        admissions: "Admissions",
        calendar: "Calendar",
        contact: "Contact",
      },
      hero: {
        title: "Schedule a Visit",
        subtitle: "We'd love to welcome you to our campus and show you our Waldorf-inspired learning environment.",
      },
      footer: {
        description:
          "Nurturing young minds through nature-based, holistic education that honors each child's unique journey.",
        quickLinks: "Quick Links",
        aboutUs: "About Us",
        schoolCalendar: "School Calendar",
        familyHandbook: "Family Handbook 2025-2026",
        connectWithUs: "Connect With Us",
        copyright: "All rights reserved. | Nurturing minds, hearts, and hands.",
      },
    },
    es: {
      nav: {
        about: "Acerca de",
        admissions: "Admisiones",
        calendar: "Calendario",
        contact: "Contacto",
      },
      hero: {
        title: "Programar una Visita",
        subtitle:
          "Nos encantaría darte la bienvenida a nuestro campus y mostrarte nuestro ambiente de aprendizaje inspirado en Waldorf.",
      },
      footer: {
        description:
          "Nutriendo mentes jóvenes a través de educación holística basada en la naturaleza que honra el viaje único de cada niño.",
        quickLinks: "Enlaces Rápidos",
        aboutUs: "Acerca de Nosotros",
        schoolCalendar: "Calendario Escolar",
        familyHandbook: "Manual Familiar 2025-2026",
        connectWithUs: "Conéctate con Nosotros",
        copyright: "Todos los derechos reservados. | Nutriendo mentes, corazones y manos.",
      },
    },
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-emerald-50 to-amber-50">
      {/* Header - same style as homepage: translucent + blur, centered logo, links on right */}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-black/20 backdrop-blur-sm transition-all duration-300">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex items-center justify-between">
            {/* Left spacer keeps layout symmetrical */}
            <div className="w-8"></div>

            {/* Center logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Image
                src="/images/pacifico-logo.png"
                alt="Pacífico Internacional - Educación Inspirada en Waldorf"
                width={100}
                height={100}
                className="drop-shadow-lg w-[60px] h-[60px] md:w-[100px] md:h-[100px]"
                priority
              />
            </div>

            {/* Desktop nav links + language selector */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/#about" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                {t.nav.about}
              </Link>
              <Link href="/#admissions" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                {t.nav.admissions}
              </Link>
              <Link href="/#calendar" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                {t.nav.calendar}
              </Link>
              <Link href="/#contact" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                {t.nav.contact}
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-yellow-200 hover:bg-white/10 flex items-center gap-2 drop-shadow-md"
                  >
                    <Globe className="h-4 w-4" />
                    <span>{language === "en" ? "EN" : "ES"}</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white border border-gray-200">
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-50" onClick={() => setLanguage("en")}>
                    <span>EN</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-50" onClick={() => setLanguage("es")}>
                    <span>ES</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile menu */}
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
                      <Link
                        href="/#about"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                      >
                        {t.nav.about}
                      </Link>
                      <Link
                        href="/#admissions"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                      >
                        {t.nav.admissions}
                      </Link>
                      <Link
                        href="/#calendar"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                      >
                        {t.nav.calendar}
                      </Link>
                      <Link
                        href="/#contact"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                      >
                        {t.nav.contact}
                      </Link>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 text-sm">Idioma / Language</span>
                        <div className="flex gap-2">
                          <Button
                            variant={language === "en" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setLanguage("en")}
                            className="text-xs"
                          >
                            EN
                          </Button>
                          <Button
                            variant={language === "es" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setLanguage("es")}
                            className="text-xs"
                          >
                            ES
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-width hero image */}
      <section className="relative h-[46vh] md:h-[58vh] lg:h-[64vh]">
        <Image
          src="/images/mayo.jpeg"
          alt="Students celebrating with colorful ribbons during a school event"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* dark gradient for text/nav contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
          <div className="flex items-center gap-3 text-white drop-shadow-xl">
            <Calendar className="h-7 w-7" />
            <h1 className="text-3xl md:text-4xl font-bold">{t.hero.title}</h1>
          </div>
          <p className="mt-2 text-white/90 max-w-2xl">{t.hero.subtitle}</p>
        </div>
      </section>

      {/* Page content */}
      <main className="container mx-auto px-4 py-10">
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-teal-200 shadow-lg">
          <CardContent className="p-0">
            <div className="w-full flex justify-center">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLScmuyLAYi6Zdy5v2iXk7Eqiyjd5HV0kjc2raGA-j9QHegNYDQ/viewform?embedded=true"
                width="640"
                height="1512"
                frameBorder={0}
                marginHeight={0}
                marginWidth={0}
                className="border-0 rounded-lg max-w-full"
                title="Schedule a Visit Form"
              >
                Loading…
              </iframe>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
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
                  <h3 className="text-xl font-bold">Pacífico Internacional</h3>
                  <p className="text-sm text-gray-300">Educación Inspirada en Waldorf</p>
                </div>
              </div>
              <p className="text-gray-300">{t.footer.description}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t.footer.quickLinks}</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/#about" className="hover:text-teal-300 transition-colors">
                    {t.footer.aboutUs}
                  </Link>
                </li>
                <li>
                  <Link href="/#admissions" className="hover:text-teal-300 transition-colors">
                    {t.nav.admissions}
                  </Link>
                </li>
                <li>
                  <Link href="/#calendar" className="hover:text-teal-300 transition-colors">
                    {t.footer.schoolCalendar}
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="hover:text-teal-300 transition-colors">
                    {t.nav.contact}
                  </Link>
                </li>
                <li>
                  <a
                    href="/documents/family-handbook-2025-2026.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-teal-300 transition-colors"
                  >
                    {t.footer.familyHandbook}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t.footer.connectWithUs}</h4>
              <div className="space-y-3 text-gray-300">
                <p className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" /> info@waldorf.cr
                </p>
                <p className="flex items-center">
                  <Phone className="mr-2 h-4 w-4" /> +506 8762 6927
                </p>
                <p className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" /> Costa Rica, Guanacaste
                </p>

                {/* Social Media Icons */}
                <div className="flex space-x-4 pt-2">
                  <a href="#" className="hover:opacity-80 transition-opacity" aria-label="WhatsApp">
                    <Image src="/icons/whatsapp.png" alt="WhatsApp" width={32} height={32} className="w-8 h-8" />
                  </a>
                  <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Instagram">
                    <Image src="/icons/instagram.png" alt="Instagram" width={32} height={32} className="w-8 h-8" />
                  </a>
                  <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Facebook">
                    <Image src="/icons/facebook.png" alt="Facebook" width={32} height={32} className="w-8 h-8" />
                  </a>
                  <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Google Maps Location">
                    <Image src="/icons/google-maps.png" alt="Google Maps" width={32} height={32} className="w-8 h-8" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Pacífico Internacional. {t.footer.copyright}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
