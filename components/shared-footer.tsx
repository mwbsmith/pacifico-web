"use client"

import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

type Language = "en" | "es"

interface SharedFooterProps {
  language: Language
}

const translations = {
  en: {
    footerDescription: "Nurturing the whole child through Waldorf-inspired education in the heart of Costa Rica.",
    quickLinks: "Quick Links",
    aboutUs: "About Us",
    schoolNews: "School News",
    admissions: "Admissions",
    schoolCalendar: "School Calendar",
    contact: "Contact",
    familyHandbook: "Family Handbook 2025-2026",
    connectWithUs: "Connect With Us",
  },
  es: {
    footerDescription: "Nutriendo al niño completo a través de la educación inspirada en Waldorf en el corazón de Costa Rica.",
    quickLinks: "Enlaces Rápidos",
    aboutUs: "Acerca de Nosotros",
    schoolNews: "Noticias de la Escuela",
    admissions: "Admisiones",
    schoolCalendar: "Calendario Escolar",
    contact: "Contacto",
    familyHandbook: "Manual Familiar 2025-2026",
    connectWithUs: "Conéctate con Nosotros",
  },
}

export default function SharedFooter({ language }: SharedFooterProps) {
  const t = (key: keyof typeof translations.en) => translations[language][key]

  return (
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
                <Link href="/news" className="text-gray-300 hover:text-teal-300 transition-colors">
                  {t("schoolNews")}
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
  )
}
