"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Calendar, Menu, Globe, ChevronDown, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import SharedFooter from "@/components/shared-footer" // Import SharedFooter
import SharedHeader from "@/components/shared-header" // Import SharedHeader

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
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-black/20 backdrop-blur-sm transition-all duration-300">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex items-center justify-between">
            <SharedHeader language={language} setLanguage={setLanguage} />
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
      <SharedFooter language={language} />
    </div>
  )
}
