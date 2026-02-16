"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Calendar,
  Mail,
  MapPin,
  Phone,
  Waves,
  Leaf,
  Heart,
  User,
  Hand,
  Download,
  Clock,
  Globe,
  ChevronDown,
  Menu,
  ChevronUp,
  GraduationCap,
  MessageCircle,
  X,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"

interface CalendarEvent {
  id: string
  title: string
  description?: string
  startDate: string
  endDate?: string
  startTime?: string
  endTime?: string
  isAllDay: boolean
  category?: string
  location?: string
}

type Language = "en" | "es"

const translations = {
  en: {
    // Navigation
    about: "About",
    admissions: "Admissions",
    calendar: "Calendar",
    contact: "Contact",
    explore: "Explore",
    insights: "Insights",

    // Hero Section
    heroTitle: "Discover Waldorf in",
    heroLocation: " Costa Rica",
    heroDescription:
      "At our Waldorf inspired school in Costa Rica, we cultivate imagination, creativity, and love for learning in a natural and nurturing environment.",
    scheduleVisit: "Schedule a Visit or Call",

    // Morning Garden Section
    morningGardenAlert: "The next session of Morning Garden is about to start! Enroll before January 30, 2026.",

    // About Section
    aboutTitle: "About Our School",
    aboutDescription:
      "We are a Waldorf inspired school, located in the village of Cañafistula outside of Tamarindo in Guanacaste, Costa Rica. With roots in Rudolf Steiner's Waldorf Pedagogy, we provide children in preschool, primary and middle school a bilingual education that builds purpose, confidence and connection while fostering a love for learning.",
    headTitle: "Head",
    headDescription:
      "Developing cognitive abilities through age-appropriate academics, critical thinking, and intellectual curiosity. Our curriculum honors natural learning rhythms and developmental stages.",
    heartTitle: "Heart",
    heartDescription:
      "Nurturing emotional intelligence, artistic expression, and social connection. We cultivate empathy, creativity, and a deep appreciation for beauty and human relationships.",
    handsTitle: "Hands",
    handsDescription:
      "Engaging in practical life skills, crafts, and hands-on learning experiences. Students develop dexterity, confidence, and connection to the physical world through meaningful work.",

    // Admissions Section
    admissionsTitle: "Admissions",
    visitSchoolTitle: "Visit Our School",
    scheduleYourVisit: "Schedule Your Visit",
    visitDescription:
      "Come see our beautiful campus nestled in the Costa Rican jungle and meet our dedicated teachers. We offer personalized tours for prospective families.",
    callPhone: "Call +506 8762 6927",
    tuitionFees: "2026/27 Tuition & Fees",
    whatToExpect: "What to Expect During Your Visit:",
    meetTeachers: "Meet Our Teachers",
    meetTeachersDesc: "Connect with our experienced Waldorf-trained educators",
    exploreCampus: "Explore Our Campus",
    exploreCampusDesc: "Tour our natural outdoor classrooms and learning spaces",
    learnPhilosophy: "Learn Our Philosophy",
    learnPhilosophyDesc: "Understand our approach to nurturing head, heart, and hands",
    applicationProcess: "Application Process",
    applicationStep1: "1. Submit application form",
    applicationStep2: "2. Schedule a tour of our campus or schedule a call if you are not currently in Costa Rica",
    applicationStep3: "3. Family interview",
    applicationStep4: "4. Enrollment confirmation and payment of fees",

    // Tuition Table
    tuitionTitle: "2026/27 Tuition & Fees",
    tuitionDescription: "Complete pricing information for the 2026/27 school year",
    program: "Program",
    schedule: "Schedule",
    annualTuition: "Annual Tuition",
    monthly: "Monthly",
    nursery3Days: "Nursery 3 days",
    nursery5Days: "Nursery 5 days",
    kindergarten5Days: "Kindergarten 5 days",
    grades15: "Grades 1-5",
    grades68: "Grades 6-8",
    nursery3Schedule: "3 days (8:00 AM - 12:00 PM)",
    nursery5Schedule: "5 days (8:00 AM - 12:00 PM)",
    kindergartenSchedule: "5 days (8:00 AM - 2:15 PM)",
    gradesSchedule: "8:00 AM - 2:15 PM",
    oneTimeAnnualFees: "One-time and Annual Fees",
    newStudentRegistration: "New Student Registration Fee",
    yearlyEnrollmentFee: "Yearly Enrollment Fee (once yearly)",
    earlyBirdReenrollment: "Early Bird Re-enrollment Fee (paid before 20 March 2026)",
    materialsFeeKindergarten: "Materials Fee - Kindergarten",
    materialsFeegrades: "Materials Fee - Grades",
    insurance: "Student Insurance Fee",
    paymentOptions: "Payment Options",
    fullTuitionDiscount: "100% Tuition by August 1st",
    discountLabel: "5% Discount",
    discountDescription: "Pay full tuition by August 1st and save 5%",
    monthlyPayments: "10 Monthly Payments",
    monthlyDescription: "Due 1st of each month, first payment August 1st",
    financialAid: "Financial Aid Available",
    financialAidDescription: "Contact us for need-based assistance",
    tuitionQuestions: "Questions about tuition and fees?",
    emailAdmissions: "Email info@waldorf.cr",

    // Calendar Section
    calendarTitle: "School Calendar",
    viewFullCalendar: "View Full Calendar",
    downloadCalendar: "Download Printable Calendar",
    loadingEvents: "Loading upcoming events...",
    allDayEvent: "All Day Event",

    // Contact Section
    contactTitle: "Get in Touch",
    contactDescription: "We'd love to welcome your family to our learning community",
    visitCampusTitle: "Visit Our Campus",
    address: "Address",
    phone: "Phone",
    email: "Email",
    schoolHoursTitle: "School Hours",
    gradesHours: "Grades (Monday - Friday): 8:00 AM - 2:15 PM",
    kindergartenHours: "Kindergarten (Monday - Friday): 8:00 AM - 1:00 PM",
    extendedCare: "Extended Care (Kindergarten): Until 2:15 PM",
    officeHours: "Office (Monday - Friday): 7:30 AM - 2:30 PM",
    sendMessage: "Send Us a Message",
    messageDescription: "We'll get back to you within 24 hours",
    firstName: "First Name",
    lastName: "Last Name",
    childAge: "Child's Age",
    message: "Message",
    firstNamePlaceholder: "Your first name",
    lastNamePlaceholder: "Your last name",
    emailPlaceholder: "your.email@example.com",
    childAgePlaceholder: "Age of your child",
    messagePlaceholder: "Tell us about your interest in our school...",
    sending: "Sending...",
    sendMessageButton: "Send Message",

    // Footer
    footerDescription:
      "Nurturing young minds through nature-based, holistic education that honors each child's unique journey.",
    quickLinks: "Quick Links",
    aboutUs: "About Us",
    schoolNews: "School News",
    schoolCalendar: "School Calendar",
    familyHandbook: "Family Handbook 2025-2026",
    connectWithUs: "Connect With Us",
    footerCopyright: "Pacífico Internacional. All rights reserved. | Nurturing minds, hearts, and hands.",

    // WhatsApp translations
    whatsappChat: "WhatsApp Chat",
    chatHours: "Chat hours: 8:30 AM - 2:00 PM",
    chatNow: "Chat now",
    chatOffline: "Outside chat hours",
  },
  es: {
    // Navigation
    about: "Acerca de",
    admissions: "Admisiones",
    calendar: "Calendario",
    contact: "Contacto",
    explore: "Explorar",
    insights: "Perspectivas",

    // Hero Section
    heroTitle: "Descubre Waldorf en",
    heroLocation: " Costa Rica",
    heroDescription:
      "En nuestra escuela inspirada en Waldorf en Costa Rica, cultivamos la imaginación, creatividad y amor por el aprendizaje en un ambiente natural y nutritivo.",
    scheduleVisit: "Programar una Visita o Llamar",

    // Morning Garden Section
    morningGardenAlert:
      "¡La próxima sesión de Morning Garden está por comenzar! Inscríbete antes del 30 de enero de 2026.",

    // About Section
    aboutTitle: "Acerca de Nuestra Escuela",
    aboutDescription:
      "Somos una escuela inspirada en Waldorf, ubicada en el pueblo de Cañafistula cerca de Tamarindo en Guanacaste, Costa Rica. Con raíces en la Pedagogía Waldorf de Rudolf Steiner, brindamos a los niños de preescolar, primaria y secundaria una educación bilingüe que construye propósito, confianza y conexión mientras fomenta el amor por el aprendizaje.",
    headTitle: "Cabeza",
    headDescription:
      "Desarrollando habilidades cognitivas a través de académicos apropiados para la edad, pensamiento crítico y curiosidad intelectual. Nuestro currículo honra los ritmos naturales de aprendizaje y las etapas de desarrollo.",
    heartTitle: "Corazón",
    heartDescription:
      "Nutriendo la inteligencia emocional, expresión artística y conexión social. Cultivamos empatía, creatividad y una profunda apreciación por la belleza y las relaciones humanas.",
    handsTitle: "Manos",
    handsDescription:
      "Participando en habilidades de vida práctica, artesanías y experiencias de aprendizaje práctico. Los estudiantes desarrollan destreza, confianza y conexión con el mundo físico a través del trabajo significativo.",

    // Admissions Section
    admissionsTitle: "Admisiones",
    visitSchoolTitle: "Visita Nuestra Escuela",
    scheduleYourVisit: "Programa tu Visita",
    visitDescription:
      "Ven a ver nuestro hermoso campus ubicado en la selva costarricense y conoce a nuestros maestros dedicados. Ofrecemos tours personalizados para familias prospectivas.",
    callPhone: "Llamar +506 8762 6927",
    tuitionFees: "Matrícula y Cuotas 2026/27",
    whatToExpect: "Qué Esperar Durante tu Visita:",
    meetTeachers: "Conoce a Nuestros Maestros",
    meetTeachersDesc: "Conéctate con nuestros educadores experimentados entrenados en Waldorf",
    exploreCampus: "Explora Nuestro Campus",
    exploreCampusDesc: "Recorre nuestras aulas naturales al aire libre y espacios de aprendizaje",
    learnPhilosophy: "Aprende Nuestra Filosofía",
    learnPhilosophyDesc: "Entiende nuestro enfoque para nutrir cabeza, corazón y manos",
    applicationProcess: "Proceso de Solicitud",
    applicationStep1: "1. Enviar formulario de solicitud",
    applicationStep2: "2. Programar un tour de nuestro campus o una llamada si no estás actualmente en Costa Rica",
    applicationStep3: "3. Entrevista familiar",
    applicationStep4: "4. Confirmación de inscripción y pago de cuotas",

    // Tuition Table
    tuitionTitle: "Matrícula y Cuotas 2026/27",
    tuitionDescription: "Información completa de precios para el año escolar 2026/27",
    program: "Programa",
    schedule: "Horario",
    annualTuition: "Matrícula Anual",
    monthly: "Mensual",
    nursery3Days: "Nursery 3 días",
    nursery5Days: "Nursery 5 días",
    kindergarten5Days: "Kindergarten 5 días",
    grades15: "Grados 1-5",
    grades68: "Grados 6-8",
    nursery3Schedule: "3 días (8:00 AM - 12:00 PM)",
    nursery5Schedule: "5 días (8:00 AM - 12:00 PM)",
    kindergartenSchedule: "5 días (8:00 AM - 2:15 PM)",
    gradesSchedule: "8:00 AM - 2:15 PM",
    oneTimeAnnualFees: "Cuotas Únicas y Anuales",
    newStudentRegistration: "Cuota de Registro de Estudiante Nuevo",
    yearlyEnrollmentFee: "Cuota de Inscripción Anual (una vez al año)",
    earlyBirdReenrollment: "Cuota de Reinscripción Anticipada (antes del 20 de marzo 2026)",
    materialsFeeKindergarten: "Cuota de Materiales - Kindergarten",
    materialsFeegrades: "Cuota de Materiales - Grados",
    insurance: "Cuota de Seguro Estudiantil",
    paymentOptions: "Opciones de Pago",
    fullTuitionDiscount: "100% Matrícula antes del 1 de Agosto",
    discountLabel: "5% Descuento",
    discountDescription: "Paga la matrícula completa antes del 1 de agosto y ahorra 5%",
    monthlyPayments: "10 Pagos Mensuales",
    monthlyDescription: "Vence el 1 de cada mes, primer pago 1 de agosto",
    financialAid: "Ayuda Financiera Disponible",
    financialAidDescription: "Contáctanos para asistencia basada en necesidad",
    tuitionQuestions: "¿Preguntas sobre matrícula y cuotas?",
    emailAdmissions: "Email info@waldorf.cr",

    // Calendar Section
    calendarTitle: "Calendario Escolar",
    viewFullCalendar: "Ver Calendario Completo",
    downloadCalendar: "Descargar Calendario Imprimible",
    loadingEvents: "Cargando próximos eventos...",
    allDayEvent: "Evento de Todo el Día",

    // Contact Section
    contactTitle: "Ponte en Contacto",
    contactDescription: "Nos encantaría dar la bienvenida a tu familia a nuestra comunidad de aprendizaje",
    visitCampusTitle: "Visita Nuestro Campus",
    address: "Dirección",
    phone: "Teléfono",
    email: "Correo Electrónico",
    schoolHoursTitle: "Horarios Escolares",
    gradesHours: "Grados (Lunes - Viernes): 8:00 AM - 2:15 PM",
    kindergartenHours: "Kindergarten (Lunes - Viernes): 8:00 AM - 1:00 PM",
    extendedCare: "Cuidado Extendido (Kindergarten): Hasta 2:15 PM",
    officeHours: "Oficina (Lunes - Viernes): 7:30 AM - 2:30 PM",
    sendMessage: "Envíanos un Mensaje",
    messageDescription: "Te responderemos dentro de 24 horas",
    firstName: "Nombre",
    lastName: "Apellido",
    childAge: "Edad del Niño",
    message: "Mensaje",
    firstNamePlaceholder: "Tu nombre",
    lastNamePlaceholder: "Tu apellido",
    emailPlaceholder: "tu.correo@ejemplo.com",
    childAgePlaceholder: "Edad de tu hijo",
    messagePlaceholder: "Cuéntanos sobre tu interés en nuestra escuela...",
    sending: "Enviando...",
    sendMessageButton: "Enviar Mensaje",

    // Footer
    footerDescription:
      "Nutriendo mentes jóvenes a través de educación holística basada en la naturaleza que honra el viaje único de cada niño.",
    quickLinks: "Enlaces Rápidos",
    aboutUs: "Acerca de Nosotros",
    schoolNews: "Noticias de la Escuela",
    schoolCalendar: "Calendario Escolar",
    familyHandbook: "Manual Familiar 2025-2026",
    connectWithUs: "Conéctate con Nosotros",
    footerCopyright: "Pacífico Internacional. Todos los derechos reservados. | Nutriendo mentes, corazones y manos.",

    // WhatsApp translations
    whatsappChat: "Chat de WhatsApp",
    chatHours: "Horario de chat: 8:30 AM - 2:00 PM",
    chatNow: "Chatear ahora",
    chatOffline: "Fuera de horario",
  },
}

export default function PacificoHomepage() {
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [tuitionOpen, setTuitionOpen] = useState(false)
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([])
  const [eventsLoading, setEventsLoading] = useState(true)
  const [language, setLanguage] = useState<Language>("en")
  const tuitionRef = useRef<HTMLDivElement>(null)

  // Add these new state variables after the existing ones
  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    childAge: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")

  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false)

  const [newsletterForm, setNewsletterForm] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    mailingList: false,
  })
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false)
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "success" | "error">("idle")
  const [newsletterMessage, setNewsletterMessage] = useState("")

  const [showSubscriptionOptions, setShowSubscriptionOptions] = useState(false)
  const [showWhatsAppTooltip, setShowWhatsAppTooltip] = useState(false)
  const [isWithinChatHours, setIsWithinChatHours] = useState(false)

  useEffect(() => {
    const checkChatHours = () => {
      const now = new Date()
      const costaRicaTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Costa_Rica" }))
      const hours = costaRicaTime.getHours()
      const minutes = costaRicaTime.getMinutes()
      const currentTime = hours + minutes / 60

      // 8:30 AM = 8.5, 2:00 PM = 14.0
      setIsWithinChatHours(currentTime >= 8.5 && currentTime <= 14.0)
    }

    checkChatHours()
    const interval = setInterval(checkChatHours, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const checkRecaptchaReady = () => {
      if (
        typeof window !== "undefined" &&
        (window as any).grecaptcha?.enterprise &&
        (window as any).grecaptcha.enterprise.ready
      ) {
        ;(window as any).grecaptcha.enterprise.ready(() => {
          console.log("[v0] reCAPTCHA Enterprise is ready")
          setIsRecaptchaReady(true)
        })
        return true
      }
      return false
    }

    // Check immediately
    if (!checkRecaptchaReady()) {
      // Poll every 500ms until ready, up to 10 seconds
      const interval = setInterval(() => {
        if (checkRecaptchaReady()) {
          clearInterval(interval)
        }
      }, 500)

      const timeout = setTimeout(() => {
        clearInterval(interval)
        console.log("[v0] reCAPTCHA Enterprise failed to load within 10s")
      }, 10000)

      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }
  }, [])

  const handleWhatsAppClick = () => {
    const phoneNumber = "50687626927" // Remove + and spaces for WhatsApp URL
    const message =
      language === "es"
        ? "Hola, me gustaría obtener más información sobre Pacífico Internacional Waldorf School."
        : "Hello, I would like to get more information about Pacífico Internacional Waldorf School."

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const t = (key: keyof typeof translations.en) => translations[language][key]

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

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Get reCAPTCHA token
      let recaptchaToken = ""
      console.log("[v0] reCAPTCHA state:", {
        isRecaptchaReady,
        hasGrecaptcha: typeof window !== "undefined" && !!(window as any).grecaptcha?.enterprise,
        siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? "set" : "missing",
      })
      if (isRecaptchaReady && typeof window !== "undefined" && (window as any).grecaptcha?.enterprise) {
        try {
          const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
          if (siteKey) {
            recaptchaToken = await (window as any).grecaptcha.enterprise.execute(siteKey, { action: "contact_form" })
            console.log("[v0] reCAPTCHA token obtained:", recaptchaToken ? `${recaptchaToken.substring(0, 20)}...` : "empty")
          } else {
            console.log("[v0] reCAPTCHA site key is missing from env")
          }
        } catch (error) {
          console.error("[v0] reCAPTCHA execute error:", error)
          // Continue without token if reCAPTCHA fails
        }
      } else {
        console.log("[v0] reCAPTCHA skipped - not ready or not loaded")
      }

      const response = await fetch("/proxy/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: `${contactForm.firstName} ${contactForm.lastName}`.trim(),
          email: contactForm.email,
          phone: contactForm.childAge, // Using childAge field as phone for now
          message: contactForm.message,
          recaptcha_token: recaptchaToken, // Added reCAPTCHA token to request
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setSubmitMessage(
          language === "en"
            ? "Thank you! Your message has been sent successfully. We'll get back to you within 24 hours."
            : "¡Gracias! Tu mensaje ha sido enviado exitosamente. Te responderemos dentro de 24 horas.",
        )
        // Reset form
        setContactForm({
          firstName: "",
          lastName: "",
          email: "",
          childAge: "",
          message: "",
        })
      } else {
        const errorData = await response.json().catch(() => null)
        console.log("[v0] API error response:", { status: response.status, body: errorData })
        throw new Error("Failed to send message")
      }
    } catch (error) {
      setSubmitStatus("error")
      setSubmitMessage(
        language === "en"
          ? "Sorry, there was an error sending your message. Please try again or contact us directly."
          : "Lo sentimos, hubo un error enviando tu mensaje. Por favor intenta de nuevo o contáctanos directamente.",
      )
      console.error("Contact form error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof typeof contactForm, value: string) => {
    setContactForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Static fallback events
  const fallbackEvents: CalendarEvent[] = [
    {
      id: "1",
      title: "Grades 1&2 Meet your Teacher",
      description: "Parent(s) please come with your 1st and 2nd graders to meet your teacher.",
      startDate: "2024-08-18",
      endDate: "2024-08-18",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      isAllDay: false,
      category: "Grades 1 & 2",
    },
    {
      id: "2",
      title: "All Parent Meeting",
      description: "At least one parent from each family must attend the first informational meeting.",
      startDate: "2024-08-18",
      endDate: "2024-08-18",
      startTime: "3:00 PM",
      endTime: "4:30 PM",
      isAllDay: false,
      category: "All Parents",
    },
    {
      id: "3",
      title: "First Day Grades!",
      description: "First day of school.",
      startDate: "2024-08-19",
      endDate: "2024-08-19",
      isAllDay: true,
      category: "Grades 1 & 2",
    },
    {
      id: "4",
      title: "Kindergarten Meet your Teacher",
      description: "Parent(s) please come with your kindergartener to meet your teacher.",
      startDate: "2024-08-19",
      endDate: "2024-08-19",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      isAllDay: false,
      category: "Kindergarten",
    },
    {
      id: "5",
      title: "First Day Kindergarten!",
      description: "First day of school.",
      startDate: "2024-08-20",
      endDate: "2024-08-20",
      isAllDay: true,
      category: "Kindergarten",
    },
    {
      id: "6",
      title: "Costa Rica Independence Day",
      description: "No school - National Holiday.",
      startDate: "2024-09-15",
      endDate: "2024-09-15",
      isAllDay: true,
      category: "All Students",
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const fetchCalendarEvents = async (retryCount = 0) => {
      try {
        setEventsLoading(true)
        console.log(`Attempt ${retryCount + 1}: Fetching calendar events from API...`)

        // Add timeout and better error handling
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

        const response = await fetch("https://waldorf.cr/api/v1/calendar/events", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          mode: "cors",
          cache: "no-cache", // Force fresh request
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        console.log("✅ API Response status:", response.status)
        console.log("✅ API Response headers:", Object.fromEntries(response.headers.entries()))

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`)
        }

        const data = await response.json()
        console.log("✅ Raw API data received:", data)

        // Add these new detailed logs:
        console.log("✅ Type of data:", typeof data)
        console.log("✅ Is data an array?", Array.isArray(data))
        console.log("✅ Data keys:", Object.keys(data))

        if (Array.isArray(data) && data.length > 0) {
          console.log("✅ First event keys:", Object.keys(data[0]))
          console.log("✅ First event full object:", data[0])
        } else if (data.events && Array.isArray(data.events) && data.events.length > 0) {
          console.log("✅ First event keys:", Object.keys(data.events[0]))
          console.log("✅ First event full object:", data.events[0])
        }

        // Handle different possible API response formats
        let events = []

        if (Array.isArray(data)) {
          events = data
        } else if (data.events && Array.isArray(data.events)) {
          events = data.events
        } else if (data.data && Array.isArray(data.data)) {
          events = data.data
        } else if (data.results && Array.isArray(data.results)) {
          events = data.results
        } else if (data.items && Array.isArray(data.items)) {
          events = data.items
        } else {
          console.warn("API returned unexpected format:", data)
          // Try to extract any array from the response
          const possibleArrays = Object.values(data).filter(Array.isArray)
          if (possibleArrays.length > 0) {
            events = possibleArrays[0]
            console.log("Found array in response:", events)
          } else {
            throw new Error("No array found in API response")
          }
        }

        console.log("✅ Extracted events array:", events)

        // Transform API data to match our expected format and take first 6
        const transformedEvents = events.slice(0, 6).map((event, index) => {
          // Determine if it's an all-day event - use the isAllDay field directly
          const isAllDay = event.isAllDay === true || event.all_day === true || event.allDay === true

          const transformedEvent: CalendarEvent = {
            id: event.id || event._id || event.uuid || `api-event-${index}`,
            title: event.title || event.name || event.summary || event.event_name || event.subject || "Event",
            description: event.description || event.details || event.summary || event.notes || event.body,
            startDate:
              event.start_date ||
              event.startDate ||
              event.date ||
              event.event_date ||
              event.start ||
              new Date().toISOString().split("T")[0],
            endDate:
              event.end_date ||
              event.endDate ||
              event.date ||
              event.event_date ||
              event.end ||
              event.start_date ||
              event.startDate,
            startTime: !isAllDay ? event.start_time || event.startTime || event.time_start : undefined,
            endTime: !isAllDay ? event.end_time || event.endTime || event.time_end : undefined,
            isAllDay: isAllDay,
            category: event.category || event.type || event.group || event.tags || "School Event",
            location: event.location || event.venue || event.place || event.address,
          }
          console.log(`Transformed event ${index + 1}:`, transformedEvent)
          return transformedEvent
        })

        console.log("✅ Final transformed events:", transformedEvents)

        if (transformedEvents.length > 0) {
          setCalendarEvents(transformedEvents)
          console.log(`🎉 SUCCESS! Loaded ${transformedEvents.length} events from API`)
        } else {
          throw new Error("No events found after transformation")
        }
      } catch (error) {
        console.error(`❌ API fetch failed (attempt ${retryCount + 1}):`, error)

        // Retry logic - try up to 2 more times
        if (retryCount < 2) {
          console.log(`🔄 Retrying in 2 seconds... (attempt ${retryCount + 2})`)
          setTimeout(() => fetchCalendarEvents(retryCount + 1), 2000)
          return
        }

        // More specific error handling
        if (error.name === "AbortError") {
          console.error("❌ Request timed out after 15 seconds")
        } else if (error.message === "Failed to fetch") {
          console.error("❌ Network error - check if API is accessible")
        } else {
          console.error("❌ Error details:", error.message)
        }

        console.log("🔄 Using fallback events after all retries failed")
        // Use fallback events when API fails
        setCalendarEvents(fallbackEvents)
      } finally {
        setEventsLoading(false)
      }
    }

    fetchCalendarEvents()
  }, [])

  // Calculate logo animation based on scroll
  const maxScroll = 400
  const progress = Math.min(scrollY / maxScroll, 1)

  // Logo starts in hero center and moves to header - responsive sizing
  const logoScale = 1 - progress * 0.7 // From 1 to 0.3 (150px to 100px on mobile, 250px to 100px on desktop)
  const logoY = -(progress * 60) // Move up 60vh
  const logoOpacity = scrollY > maxScroll ? 0 : 1

  // Header logo appears when main logo is hidden
  const headerLogoOpacity = scrollY > maxScroll ? 1 : 0

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    // Smooth scroll to section
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleTuitionClick = () => {
    setTuitionOpen(!tuitionOpen)
    if (!tuitionOpen) {
      // Small delay to allow the content to expand before scrolling
      setTimeout(() => {
        tuitionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }, 100)
    }
  }

  const formatEventDate = (dateString: string) => {
    // For all-day events, we need to ensure the date is interpreted in Costa Rica timezone
    // to prevent the "one day behind" issue
    const date = new Date(dateString + "T12:00:00-06:00") // Force Costa Rica timezone (UTC-6)
    const day = date.getDate()
    const month = date
      .toLocaleDateString(language === "en" ? "en-US" : "es-ES", {
        month: "short",
        timeZone: "America/Costa_Rica", // Ensure consistent timezone
      })
      .toUpperCase()
    return { day, month }
  }

  const formatFullDate = (dateString: string) => {
    const date = new Date(dateString + "T12:00:00-06:00") // Force Costa Rica timezone
    return date.toLocaleDateString(language === "en" ? "en-US" : "es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "America/Costa_Rica", // Ensure consistent timezone
    })
  }

  const getEventColor = (index: number) => {
    const colors = ["pink", "blue", "green", "yellow", "purple", "orange"]
    return colors[index % colors.length]
  }

  const formatEventDateTime = (event: CalendarEvent) => {
    if (event.isAllDay) {
      return t("allDayEvent")
    } else {
      const startDateFormatted = formatFullDate(event.startDate)
      const endDateFormatted = event.endDate ? formatFullDate(event.endDate) : null

      if (event.startDate === event.endDate || !event.endDate) {
        // Same day event
        return language === "en"
          ? `${startDateFormatted} from ${event.startTime || "TBD"} to ${event.endTime || "TBD"}`
          : `${startDateFormatted} de ${event.startTime || "Por definir"} a ${event.endTime || "Por definir"}`
      } else {
        // Multi-day event with times
        return language === "en"
          ? `${startDateFormatted} at ${event.startTime || "TBD"} to ${endDateFormatted} at ${event.endTime || "TBD"}`
          : `${startDateFormatted} a las ${event.startTime || "Por definir"} hasta ${endDateFormatted} a las ${event.endTime || "Por definir"}`
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-emerald-50 to-amber-50">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden min-h-[80vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/waldorf-classroom.jpg"
            alt="Waldorf classroom with students learning"
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
                <Link href="/careers" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md flex items-center gap-1">
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
                <Link href="#about" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                  {t("about")}
                </Link>
                <Link href="#admissions" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                  {t("admissions")}
                </Link>
                <Link href="#calendar" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                  {t("calendar")}
                </Link>
                <Link href="#contact" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                  {t("contact")}
                </Link>

                {/* Explore Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-white hover:text-yellow-200 transition-colors drop-shadow-md flex items-center gap-1">
                      {t("explore")}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link href="/news">{t("insights")}</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

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
                        
                        {/* Explore Section */}
                        <div className="border-t border-gray-100 pt-2 mt-2">
                          <p className="text-lg text-gray-800 py-2 font-medium">{t("explore")}</p>
                          <Link
                            href="/news"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block pl-4 text-gray-600 hover:text-teal-600 transition-colors py-2"
                          >
                            {t("insights")}
                          </Link>
                        </div>

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

        <div className="container mx-auto px-4 relative z-10 pt-[25px]">
          <div className="flex items-center justify-center text-center">
            <div className="space-y-8 max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
                {t("heroTitle")}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-green-300 drop-shadow-lg">
                  {t("heroLocation")}
                </span>
              </h2>

              {/* Animated Logo */}
              <div className="flex justify-center mb-6 relative">
                <div
                  className="transition-all duration-300 ease-out"
                  style={{
                    transform: `translateY(${logoY}vh) scale(${logoScale})`,
                    opacity: logoOpacity,
                  }}
                >
                  <Image
                    src="/images/pacifico-logo.png"
                    alt="Pacífico Internacional - Educación Inspirada en Waldorf"
                    width={250}
                    height={250}
                    className="drop-shadow-2xl w-[150px] h-[150px] md:w-[250px] md:h-[250px]"
                  />
                </div>
              </div>

              <p className="text-xl md:text-2xl text-white leading-relaxed drop-shadow-lg">{t("heroDescription")}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-yellow-400 text-white hover:bg-yellow-400 hover:text-gray-900 bg-black/30 backdrop-blur-sm drop-shadow-lg"
                >
                  <Link href="/visit">
                    <Calendar className="mr-2 h-5 w-5" />
                    {t("scheduleVisit")}
                  </Link>
                </Button>
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

      {/* Morning Garden Section */}
      <section className="py-12 bg-gradient-to-r from-amber-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <p className="text-xl md:text-2xl font-semibold text-amber-800">{t("morningGardenAlert")}</p>
          </div>
          <div className="flex justify-center">
            <Image
              src={language === "en" ? "/images/morning-garden-en.jpg" : "/images/morning-garden-es.jpg"}
              alt="Morning Garden at Pacífico Internacional"
              width={600}
              height={776}
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gradient-to-r from-emerald-100 to-teal-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-green-600" />
              <h2 className="text-4xl font-bold text-gray-800">{t("aboutTitle")}</h2>
              <Waves className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("aboutDescription")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto bg-blue-500 text-white p-3 rounded-full w-fit mb-4">
                  <User className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl text-blue-700">{t("headTitle")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">{t("headDescription")}</CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto bg-green-500 text-white p-3 rounded-full w-fit mb-4">
                  <Heart className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl text-green-700">{t("heartTitle")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">{t("heartDescription")}</CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto bg-yellow-500 text-white p-3 rounded-full w-fit mb-4">
                  <Hand className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl text-yellow-700">{t("handsTitle")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">{t("handsDescription")}</CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Faculty and Staff</h3>
              <p className="text-lg text-gray-600">
                {language === "es"
                  ? "Conoce a nuestros educadores dedicados que aportan pasión y experiencia a cada aula"
                  : "Meet our dedicated educators who bring passion and expertise to every classroom"}
              </p>
            </div>

            <div className="space-y-8">
              {/* First Row: Diana, Arielle, Robyn, Larissa */}
              <div className="flex justify-center gap-6 flex-wrap">
                {[
                  { name: "Diana", image: "/images/faculty/diana.jpg" },
                  { name: "Arielle", image: "/images/faculty/arielle.jpg" },
                  { name: "Robyn", image: "/images/faculty/robyn.jpg" },
                  { name: "Larissa", image: "/images/faculty/larissa.jpg" },
                ].map((faculty, index) => (
                  <Link
                    key={index}
                    href={`/about/team#${faculty.name.toLowerCase()}`}
                    className="flex-shrink-0 text-center hover:transform hover:scale-105 transition-transform duration-200 cursor-pointer"
                  >
                    <div className="w-32 h-32 mx-auto mb-3 rounded-full overflow-hidden shadow-lg border-4 border-white">
                      <img
                        src={faculty.image || "/placeholder.svg"}
                        alt={faculty.name}
                        className={`w-full h-full object-cover ${faculty.name === "Robyn" ? "object-top" : ""}`}
                      />
                    </div>
                    <p className="text-lg font-semibold text-gray-800">{faculty.name}</p>
                  </Link>
                ))}
              </div>

              {/* Second Row: Elvira, Karol, Ani, Dennis, Cesar, Todd */}
              <div className="flex justify-center gap-6 flex-wrap">
                {[
                  { name: "Elvira", image: "/images/faculty/elvira.jpeg" },
                  { name: "Karol", image: "/images/faculty/karol.jpg" },
                  { name: "Ani", image: "/images/faculty/ani.jpg", anchor: "angelique" },
                  { name: "Dennis", image: "/images/faculty/dennis.jpg" },
                  { name: "César", image: "/images/faculty/cesar.jpg" },
                  { name: "Todd", image: "/images/faculty/todd.jpg" },
                ].map((faculty, index) => (
                  <Link
                    key={index}
                    href={`/about/team#${faculty.anchor || faculty.name.toLowerCase().replace("é", "e")}`}
                    className="flex-shrink-0 text-center hover:transform hover:scale-105 transition-transform duration-200 cursor-pointer"
                  >
                    <div className="w-32 h-32 mx-auto mb-3 rounded-full overflow-hidden shadow-lg border-4 border-white">
                      <img
                        src={faculty.image || "/placeholder.svg"}
                        alt={faculty.name}
                        className={`w-full h-full object-cover ${faculty.name === "Elvira" ? "object-top" : ""}`}
                      />
                    </div>
                    <p className="text-lg font-semibold text-gray-800">{faculty.name}</p>
                  </Link>
                ))}
              </div>

              {/* Third Row: Ashley, Carrie, Oscar */}
              <div className="flex justify-center gap-6 flex-wrap">
                {[
                  { name: "Ashley", image: "/images/faculty/ashley.jpg" },
                  { name: "Carrie", image: "/images/faculty/carrie.jpeg" },
                  { name: "Oscar", image: "/images/faculty/oscar.jpg" },
                ].map((faculty, index) => (
                  <Link
                    key={index}
                    href={`/about/team#${faculty.name.toLowerCase()}`}
                    className="flex-shrink-0 text-center hover:transform hover:scale-105 transition-transform duration-200 cursor-pointer"
                  >
                    <div className="w-32 h-32 mx-auto mb-3 rounded-full overflow-hidden shadow-lg border-4 border-white">
                      <img
                        src={faculty.image || "/placeholder.svg"}
                        alt={faculty.name}
                        className={`w-full h-full ${faculty.name === "Carrie" || faculty.name === "Oscar" ? "object-cover object-top" : "object-cover"}`}
                      />
                    </div>
                    <p className="text-lg font-semibold text-gray-800">{faculty.name}</p>
                  </Link>
                ))}
              </div>

              {/* New fourth row with Joselyn, Jenner and Mauricio */}
              <div className="flex justify-center gap-6 flex-wrap">
                {[
                  { name: "Joselyn", image: "/images/faculty/joselyn.jpeg", anchor: "joselyn" },
                  { name: "Jenner", image: "/images/faculty/jenner.jpeg", anchor: "jenner" },
                  { name: "Mauricio", image: "/images/faculty/mauricio.jpeg", anchor: "mauricio" },
                ].map((faculty, index) => (
                  <Link
                    key={index}
                    href={`/about/team#${faculty.anchor || faculty.name.toLowerCase()}`}
                    className="flex-shrink-0 text-center hover:transform hover:scale-105 transition-transform duration-200 cursor-pointer"
                  >
                    <div className="w-32 h-32 mx-auto mb-3 rounded-full overflow-hidden shadow-lg border-4 border-white">
                      <img
                        src={faculty.image || "/placeholder.svg"}
                        alt={faculty.name}
                        className="w-full h-full object-cover object-[center_20%]"
                      />
                    </div>
                    <p className="text-lg font-semibold text-gray-800">{faculty.name}</p>
                  </Link>
                ))}
              </div>

              {/* Fifth row: Helene, Andrea */}
              <div className="flex justify-center gap-6 flex-wrap">
                {[
                  { name: "Helene", image: "/images/faculty/helene.jpg" },
                  { name: "Andrea", image: "/images/faculty/andrea.jpg" },
                ].map((faculty, index) => (
                  <Link
                    key={index}
                    href={`/about/team#${faculty.anchor || faculty.name.toLowerCase()}`}
                    className="flex-shrink-0 text-center hover:transform hover:scale-105 transition-transform duration-200 cursor-pointer"
                  >
                    <div className="w-32 h-32 mx-auto mb-3 rounded-full overflow-hidden shadow-lg border-4 border-white">
                      <img
                        src={faculty.image || "/placeholder.svg"}
                        alt={faculty.name}
                        className={`w-full h-full ${faculty.name === "Andrea" ? "object-cover object-top" : "object-cover"}`}
                      />
                    </div>
                    <p className="text-lg font-semibold text-gray-800">{faculty.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admissions Section */}
      <section id="admissions" className="py-16 bg-gradient-to-r from-amber-100 to-orange-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <User className="h-8 w-8 text-amber-600" />
              <h2 className="text-4xl font-bold text-gray-800">{t("admissionsTitle")}</h2>
              <Heart className="h-8 w-8 text-orange-600" />
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-orange-200 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl text-orange-700 mb-2">{t("visitSchoolTitle")}</CardTitle>
                <div className="mt-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg"
                  >
                    <Link href="/visit">
                      <Calendar className="mr-2 h-5 w-5" />
                      {t("scheduleVisit")}
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border border-yellow-200">
                    <h4 className="text-xl font-semibold text-orange-700 mb-3">{t("scheduleYourVisit")}</h4>
                    <p className="text-gray-600 mb-4">{t("visitDescription")}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        asChild
                        size="lg"
                        className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg w-full sm:w-auto text-sm sm:text-base px-3 sm:px-6"
                      >
                        <a href="https://wa.me/50687626927" target="_blank" rel="noopener noreferrer">
                          <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                          <span className="truncate">{t("callPhone")}</span>
                        </a>
                      </Button>
                      <Collapsible open={tuitionOpen} onOpenChange={setTuitionOpen}>
                        <CollapsibleTrigger asChild>
                          <Button
                            size="lg"
                            variant="outline"
                            className="border-2 border-orange-500 text-orange-700 hover:bg-orange-50 bg-transparent w-full sm:w-auto text-sm sm:text-base px-3 sm:px-6"
                            onClick={handleTuitionClick}
                          >
                            <GraduationCap className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                            <span className="truncate">{t("tuitionFees")}</span>
                            {tuitionOpen ? (
                              <ChevronUp className="ml-2 h-4 w-4 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                      </Collapsible>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800">{t("whatToExpect")}</h4>
                    <div className="grid gap-3">
                      <div className="flex items-start space-x-3 text-left">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{t("meetTeachers")}</p>
                          <p className="text-sm text-gray-600">{t("meetTeachersDesc")}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 text-left">
                        <div className="bg-green-100 p-2 rounded-full">
                          <Leaf className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{t("exploreCampus")}</p>
                          <p className="text-sm text-gray-600">{t("exploreCampusDesc")}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 text-left">
                        <div className="bg-purple-100 p-2 rounded-full">
                          <Heart className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{t("learnPhilosophy")}</p>
                          <p className="text-sm text-gray-600">{t("learnPhilosophyDesc")}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-4 rounded-lg border border-teal-200">
                    <h4 className="font-semibold text-teal-700 mb-2">{t("applicationProcess")}</h4>
                    <ol className="text-sm text-gray-600 space-y-1 text-left">
                      <li>{t("applicationStep1")}</li>
                      <li>{t("applicationStep2")}</li>
                      <li>{t("applicationStep3")}</li>
                      <li>{t("applicationStep4")}</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Collapsible Tuition Table */}
            <Collapsible open={tuitionOpen} onOpenChange={setTuitionOpen}>
              <CollapsibleContent className="space-y-0" ref={tuitionRef}>
                <Card className="bg-white/95 backdrop-blur-sm border-2 border-green-200 shadow-lg">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-green-700 flex items-center justify-center gap-2">
                      <GraduationCap className="h-6 w-6" />
                      {t("tuitionTitle")}
                    </CardTitle>
                    <CardDescription>{t("tuitionDescription")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gradient-to-r from-green-50 to-emerald-50">
                            <th className="border border-green-200 p-3 text-left font-semibold text-green-800">
                              {t("program")}
                            </th>
                            <th className="border border-green-200 p-3 text-left font-semibold text-green-800">
                              {t("schedule")}
                            </th>
                            <th className="border border-green-200 p-3 text-right font-semibold text-green-800">
                              {t("annualTuition")}
                            </th>
                            <th className="border border-green-200 p-3 text-right font-semibold text-green-800">
                              {t("monthly")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="hover:bg-orange-50 transition-colors">
                            <td className="border border-gray-200 p-3 font-medium text-orange-700">
                              {t("nursery3Days")}
                            </td>
                            <td className="border border-gray-200 p-3 text-gray-600">{t("nursery3Schedule")}</td>
                            <td className="border border-gray-200 p-3 text-right font-bold text-orange-700">$4,050</td>
                            <td className="border border-gray-200 p-3 text-right text-gray-600">$405</td>
                          </tr>
                          <tr className="hover:bg-amber-50 transition-colors">
                            <td className="border border-gray-200 p-3 font-medium text-amber-700">
                              {t("nursery5Days")}
                            </td>
                            <td className="border border-gray-200 p-3 text-gray-600">{t("nursery5Schedule")}</td>
                            <td className="border border-gray-200 p-3 text-right font-bold text-amber-700">$5,800</td>
                            <td className="border border-gray-200 p-3 text-right text-gray-600">$580</td>
                          </tr>
                          <tr className="hover:bg-green-50 transition-colors">
                            <td className="border border-gray-200 p-3 font-medium text-green-700">
                              {t("kindergarten5Days")}
                            </td>
                            <td className="border border-gray-200 p-3 text-gray-600">{t("kindergartenSchedule")}</td>
                            <td className="border border-gray-200 p-3 text-right font-bold text-green-700">$6,950</td>
                            <td className="border border-gray-200 p-3 text-right text-gray-600">$695</td>
                          </tr>
                          <tr className="hover:bg-blue-50 transition-colors">
                            <td className="border border-gray-200 p-3 font-medium text-blue-700">{t("grades15")}</td>
                            <td className="border border-gray-200 p-3 text-gray-600">{t("gradesSchedule")}</td>
                            <td className="border border-gray-200 p-3 text-right font-bold text-blue-700">$7,250</td>
                            <td className="border border-gray-200 p-3 text-right text-gray-600">$725</td>
                          </tr>
                          <tr className="hover:bg-purple-50 transition-colors">
                            <td className="border border-gray-200 p-3 font-medium text-purple-700">{t("grades68")}</td>
                            <td className="border border-gray-200 p-3 text-gray-600">{t("gradesSchedule")}</td>
                            <td className="border border-gray-200 p-3 text-right font-bold text-purple-700">$7,800</td>
                            <td className="border border-gray-200 p-3 text-right text-gray-600">$780</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-6 grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-800">{t("oneTimeAnnualFees")}</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                            <span className="text-gray-700">{t("newStudentRegistration")}</span>
                            <span className="font-bold text-orange-700">$800</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                            <span className="text-gray-700">{t("yearlyEnrollmentFee")}</span>
                            <span className="font-bold text-red-700">$800</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                            <span className="text-gray-700">{t("earlyBirdReenrollment")}</span>
                            <span className="font-bold text-amber-700">$550</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg border border-teal-200">
                            <span className="text-gray-700">{t("materialsFeeKindergarten")}</span>
                            <span className="font-bold text-teal-700">$350</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                            <span className="text-gray-700">{t("materialsFeegrades")}</span>
                            <span className="font-bold text-indigo-700">$450</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg border border-pink-200">
                            <span className="text-gray-700">{t("insurance")}</span>
                            <span className="font-bold text-pink-700">$20</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-800">{t("paymentOptions")}</h4>
                        <div className="space-y-2">
                          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-green-700">{t("fullTuitionDiscount")}</span>
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                {t("discountLabel")}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{t("discountDescription")}</p>
                          </div>
                          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <span className="font-medium text-blue-700">{t("monthlyPayments")}</span>
                            <p className="text-sm text-gray-600">{t("monthlyDescription")}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg border border-teal-200 text-center">
                      <p className="text-teal-700 font-medium mb-2">{t("tuitionQuestions")}</p>
                      <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <Button
                          asChild
                          size="sm"
                          className="bg-teal-600 hover:bg-teal-700 text-white w-full sm:w-auto text-xs sm:text-sm px-2 sm:px-4"
                        >
                          <a href="https://wa.me/50687626927" target="_blank" rel="noopener noreferrer">
                            <span className="truncate">{t("callPhone")}</span>
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-teal-600 text-teal-700 hover:bg-teal-50 bg-transparent w-full sm:w-auto text-xs sm:text-sm px-2 sm:px-4"
                        >
                          <span className="truncate">{t("emailAdmissions")}</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section id="calendar" className="py-16 bg-gradient-to-r from-blue-100 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <Calendar className="h-8 w-8 text-purple-600" />
              <h2 className="text-4xl font-bold text-gray-800">{t("calendarTitle")}</h2>
            </div>
            <a
              href="/calendar"
              className="text-purple-600 hover:text-purple-800 underline text-sm font-medium transition-colors block mb-2"
            >
              {language === "es" ? "Ver calendario completo" : "View full calendar"}
            </a>
            <button
              onClick={() => setShowSubscriptionOptions(!showSubscriptionOptions)}
              className="text-purple-600 hover:text-purple-800 underline text-sm font-medium transition-colors cursor-pointer"
            >
              {language === "es" ? "¡Haz clic aquí para suscribirte!" : "Click here to subscribe!"}
            </button>
          </div>

          {showSubscriptionOptions && (
            <div className="mb-12 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg border-2 border-purple-200">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white shadow-lg mb-3"
                  >
                    <a href="/calendar" target="_blank" rel="noopener noreferrer">
                      <Calendar className="mr-2 h-5 w-5" />
                      {t("viewFullCalendar")}
                    </a>
                  </Button>
                  <p className="text-sm text-gray-600">
                    {language === "es"
                      ? "Esto te da una vista completa del mes del calendario en vivo de Google para la escuela. Puedes navegar por todos los meses."
                      : "This gives you a full month view of the live Google calendar for the school. You can browse all months."}
                  </p>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg border-2 border-purple-200">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-2 border-purple-500 text-purple-700 hover:bg-purple-50 bg-transparent mb-3"
                  >
                    <a
                      href="/documents/pacifico-internacional-2025-2026-calendar.pdf"
                      download="Pacífico_Internacional_2025-2026_School_Calendar.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      {t("downloadCalendar")}
                    </a>
                  </Button>
                  <p className="text-sm text-gray-600">
                    {language === "es"
                      ? "Este es un PDF fácil de leer e imprimir. Presenta los eventos principales que son firmes y poco probables de cambiar."
                      : "This is an easy to read printable pdf. It features the main events that are firm and unlikely to change."}
                  </p>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg border-2 border-green-200">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-2 border-green-500 text-green-700 hover:bg-green-50 bg-transparent mb-3"
                  >
                    <a
                      href="https://calendar.google.com/calendar/render?cid=93e6bc2fe2660ddcc925e876ff13dd04394372fc3d48130f6617c431e92dbbd6@group.calendar.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      {language === "es" ? "Agregar a Google Calendar" : "Add to Google Calendar"}
                    </a>
                  </Button>
                  <p className="text-sm text-gray-600">
                    {language === "es"
                      ? "Si ya usas Google Calendar, esta opción es una forma fácil de agregar el calendario completo del año de Google. Se integra bien con todos los dispositivos si ya tienes una cuenta de Google."
                      : "If you already use Google calendar, this option is an easy way to add the full years Google calendar. It integrates well with all devices if you have a Google account already."}
                  </p>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg border-2 border-blue-200">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-2 border-blue-500 text-blue-700 hover:bg-blue-50 bg-transparent mb-3"
                  >
                    <a
                      href="webcal://calendar.google.com/calendar/ical/93e6bc2fe2660ddcc925e876ff13dd04394372fc3d48130f6617c431e92dbbd6%40group.calendar.google.com/public/basic.ics"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      {language === "es" ? "Suscribirse sin Google" : "Subscribe to iCalendar"}
                    </a>
                  </Button>
                  <p className="text-sm text-gray-600">
                    {language === "es"
                      ? "Esto funciona bien para usuarios de iOS y Outlook que no tienen una cuenta de Google."
                      : "This works well for IOS and Outlook users that don't have a Google account."}
                  </p>
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-lg border-2 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {language === "es" ? "Recomendaciones de Suscripción" : "Subscription Recommendations"}
                </h3>

                <div className="space-y-4 text-sm text-gray-700">
                  <p>
                    {language === "es"
                      ? "Recomendamos que te suscribas al calendario usando la opción de Google o iCalendar. La idea es que esto te mantenga actualizado con todas las actividades incluyendo asambleas."
                      : "We recommend that you subscribe to the calendar using either Google or the iCalendar option. The idea is that this will keep you up to date with all activities including assemblies."}
                  </p>

                  <p>
                    {language === "es"
                      ? "Si tienes una cuenta de Google, recomendamos que te suscribas usando el enlace 'Agregar a Google Calendar' porque puedes configurar recordatorios/alertas específicos del calendario para todos los eventos. Es solo una sugerencia, pero encontramos útil configurar 3 recordatorios para todo el calendario: una semana antes, un día antes y una hora antes del evento."
                      : "If you have a Google account, we recommend that you subscribe using the add the Google calendar link because you can set reminders/alerts that are specific to the calendar for all events. It is only a suggestion, but we find it helpful to set 3 calendar wide reminders: one week before, on day before and one hour before the event."}
                  </p>

                  <p>
                    {language === "es"
                      ? "La segunda mejor opción es suscribirse al iCalendar, aunque con esta opción necesitarás configurar recordatorios por evento. Si tienes problemas con cualquier opción, por favor háznoslo saber, o pasa por la oficina y trabajaremos contigo para configurarlo."
                      : "Second best, is to subscribe to the iCalendar though with this option, you will need to set reminders by event. If you have problems with any option please let us know, or stop in the office and we will work with you to set it up."}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6 max-w-4xl mx-auto">
            {eventsLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                <p className="text-gray-600 mt-4">{t("loadingEvents")}</p>
              </div>
            ) : (
              calendarEvents.map((event, index) => {
                const { day, month } = formatEventDate(event.startDate)
                const endDateInfo = event.endDate ? formatEventDate(event.endDate) : null
                const isMultiDay = endDateInfo && (endDateInfo.day !== day || endDateInfo.month !== month)
                const colorClass = getEventColor(index)

                return (
                  <Card
                    key={event.id}
                    className={`bg-white/90 backdrop-blur-sm border-2 border-${colorClass}-200 shadow-lg`}
                  >
                    <CardContent className="p-4 md:p-6">
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        <div
                          className={`flex flex-row sm:flex-col items-center sm:items-center text-${colorClass}-600 min-w-[80px]`}
                        >
                          <div className="text-3xl sm:text-4xl font-bold mr-2 sm:mr-0">
                            {isMultiDay ? (
                              endDateInfo.month === month ? (
                                <>{day}-{endDateInfo.day}</>
                              ) : (
                                <>{day}</>
                              )
                            ) : (
                              day
                            )}
                          </div>
                          <div className="text-sm font-semibold">
                            {isMultiDay && endDateInfo.month !== month ? (
                              <>{month} - {endDateInfo.day} {endDateInfo.month}</>
                            ) : (
                              month
                            )}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-lg sm:text-xl font-bold text-${colorClass}-700 mb-3 break-words`}>
                            {event.title}
                          </h3>

                          <div className="mb-3">
                            <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                              {event.startTime ? (
                                <span className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {event.startTime}
                                  {event.endTime && ` - ${event.endTime}`}
                                </span>
                              ) : (
                                <span className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {language === "en" ? "All Day Event" : "Evento de Todo el Día"}
                                </span>
                              )}
                              {event.location && (
                                <span className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {event.location}
                                </span>
                              )}
                            </div>
                          </div>

                          {event.description && (
                            <p className="text-gray-700 text-sm sm:text-base break-words leading-relaxed">
                              {event.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
          <div className="text-center mt-8">
            <a
              href="/calendar"
              className="text-purple-600 hover:text-purple-800 underline text-base font-medium transition-colors"
            >
              {language === "es" ? "Ver calendario completo" : "View full calendar"}
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gradient-to-r from-teal-100 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <Mail className="h-8 w-8 text-teal-600" />
              <h2 className="text-4xl font-bold text-gray-800">{t("contactTitle")}</h2>
            </div>
            <p className="text-xl text-gray-600">{t("contactDescription")}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-teal-200">
                <CardHeader>
                  <CardTitle className="text-2xl text-teal-700">{t("visitCampusTitle")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-6 w-6 text-teal-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">{t("address")}</p>
                      <p className="text-gray-600">
                        300m oeste y 50 m norte Eco lodge El Sabanero
                        <br />
                        Canafistula, Villareal
                        <br />
                        Santa Cruz, Guanacaste
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="h-6 w-6 text-teal-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">{t("phone")}</p>
                      <p className="text-gray-600">+506 8762 6927</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="h-6 w-6 text-teal-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">{t("email")}</p>
                      <p className="text-gray-600">info@waldorf.cr</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-teal-50 border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-700">{t("schoolHoursTitle")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-gray-600">
                    <p>
                      <span className="font-semibold">{t("gradesHours")}</span>
                    </p>
                    <p>
                      <span className="font-semibold">{t("kindergartenHours")}</span>
                    </p>
                    <p>
                      <span className="font-semibold">{t("extendedCare")}</span>
                    </p>
                    <p>
                      <span className="font-semibold">{t("officeHours")}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-700">{t("sendMessage")}</CardTitle>
                <CardDescription>{t("messageDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t("firstName")}</label>
                      <Input
                        placeholder={t("firstNamePlaceholder")}
                        className="border-2 border-gray-200 focus:border-teal-500"
                        value={contactForm.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t("lastName")}</label>
                      <Input
                        placeholder={t("lastNamePlaceholder")}
                        className="border-2 border-gray-200 focus:border-teal-500"
                        value={contactForm.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t("email")}</label>
                    <Input
                      type="email"
                      placeholder={t("emailPlaceholder")}
                      className="border-2 border-gray-200 focus:border-teal-500"
                      value={contactForm.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t("childAge")}</label>
                    <Input
                      placeholder={t("childAgePlaceholder")}
                      className="border-2 border-gray-200 focus:border-teal-500"
                      value={contactForm.childAge}
                      onChange={(e) => handleInputChange("childAge", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t("message")}</label>
                    <Textarea
                      placeholder={t("messagePlaceholder")}
                      className="border-2 border-gray-200 focus:border-teal-500 min-h-[120px]"
                      value={contactForm.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                    />
                  </div>

                  {/* Status Messages */}
                  {submitStatus === "success" && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-700 text-sm">{submitMessage}</p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700 text-sm">{submitMessage}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {t("sending")}
                      </>
                    ) : (
                      t("sendMessage")
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    {language === "en" ? (
                      <>
                        This site is protected by reCAPTCHA and the Google{" "}
                        <a
                          href="https://policies.google.com/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          Privacy Policy
                        </a>{" "}
                        and{" "}
                        <a
                          href="https://policies.google.com/terms"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          Terms of Service
                        </a>{" "}
                        apply.
                      </>
                    ) : (
                      <>
                        Este sitio está protegido por reCAPTCHA y se aplican la{" "}
                        <a
                          href="https://policies.google.com/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          Política de Privacidad
                        </a>{" "}
                        y los{" "}
                        <a
                          href="https://policies.google.com/terms"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          Términos de Servicio
                        </a>{" "}
                        de Google.
                      </>
                    )}
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription Section */}
      <section className="py-12 bg-gradient-to-r from-teal-50 to-emerald-50 border-b border-teal-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              {language === "en" ? "Subscribe to our newsletter" : "Suscríbete a nuestro boletín"}
            </h2>
            <div className="mb-6">
              <Link
                href="/newsletters"
                className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium transition-colors"
              >
                {language === "en" ? "View Past Newsletters" : "Ver Boletines Anteriores"}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
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
                  {language === "en" ? "Add me to your mailing list also" : "Agrégame también a tu lista de correo"}
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

      {/* Work With Us Section */}
      <section id="careers" className="py-16 bg-gradient-to-r from-amber-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              {language === "en" ? "Work With Us!" : "¡Trabaja con nosotros!"}
            </h2>
            <p className="text-xl text-gray-700 mb-4">
              {language === "en"
                ? "We are growing and searching for Lead Teachers in"
                : "Estamos creciendo y buscando Maestros Líderes en"}
            </p>
            <ul className="text-lg text-gray-600 space-y-2">
              <li className="flex items-center justify-center gap-2">
                <span className="text-amber-600">•</span>
                {language === "en" ? "Early Childhood" : "Educación Temprana"}
              </li>
              <li className="flex items-center justify-center gap-2">
                <span className="text-amber-600">•</span>
                {language === "en" ? "Lower Grades" : "Grados Inferiores"}
              </li>
              <li className="flex items-center justify-center gap-2">
                <span className="text-amber-600">•</span>
                {language === "en" ? "Middle School" : "Escuela Secundaria"}
              </li>
            </ul>
            <p className="mt-6 text-gray-600">
              {language === "en" ? "Interested? " : "¿Interesado? "}
              <Link href="/careers" className="text-teal-600 hover:text-teal-700 font-medium underline">
                {language === "en" ? "Learn more." : "Más información."}
              </Link>
            </p>
          </div>
        </div>
      </section>

      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Tooltip */}
          {showWhatsAppTooltip && (
            <div className="absolute bottom-16 right-0 bg-gray-800 text-white p-3 rounded-lg shadow-lg w-64 text-sm">
              <button
                onClick={() => setShowWhatsAppTooltip(false)}
                className="absolute top-1 right-1 text-gray-400 hover:text-white"
              >
                <X className="h-3 w-3" />
              </button>
              <div className="space-y-2">
                <p className="font-semibold">{t("whatsappChat")}</p>
                <div className="flex items-center space-x-1 text-xs">
                  <Clock className="h-3 w-3" />
                  <span>{t("chatHours")}</span>
                </div>
                <div className={`text-xs ${isWithinChatHours ? "text-green-400" : "text-yellow-400"}`}>
                  {isWithinChatHours ? "🟢 " + t("chatNow") : "🟡 " + t("chatOffline")}
                </div>
              </div>
            </div>
          )}

          {/* WhatsApp Button */}
          <button
            onClick={handleWhatsAppClick}
            onMouseEnter={() => setShowWhatsAppTooltip(true)}
            onMouseLeave={() => setShowWhatsAppTooltip(false)}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
            aria-label={t("whatsappChat")}
          >
            <MessageCircle className="h-6 w-6" />
            {isWithinChatHours && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-3 w-3 animate-pulse"></div>
            )}
          </button>
        </div>
      </div>

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
                  <Link href="#about" className="text-gray-300 hover:text-teal-300 transition-colors">
                    {t("aboutUs")}
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="text-gray-300 hover:text-teal-300 transition-colors">
                    {t("schoolNews")}
                  </Link>
                </li>
                <li>
                  <Link href="#admissions" className="text-gray-300 hover:text-teal-300 transition-colors">
                    {t("admissions")}
                  </Link>
                </li>
                <li>
                  <Link href="#calendar" className="text-gray-300 hover:text-teal-300 transition-colors">
                    {t("schoolCalendar")}
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-gray-300 hover:text-teal-300 transition-colors">
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
    </div>
  )
}
