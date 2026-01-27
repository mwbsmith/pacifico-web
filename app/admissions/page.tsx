"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Leaf, Heart, Hand, Globe, Menu, GraduationCap, Users, Sun, Trees as Tree, ChevronDown } from "lucide-react"
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
    workWithUs: "Work With Us!",

    // Hero
    heroTitle: "A Different Kind of School",
    heroSubtitle: "in Guanacaste, Costa Rica",
    heroDescription: "Where children learn through imagination, nature, and hands-on experiences",
    scheduleVisit: "Schedule a Visit",
    callUs: "Call Us",

    // Why Choose Us
    whyChooseTitle: "Why Choose Pacífico Internacional?",
    bilingualTitle: "Bilingual Education",
    bilingualDesc: "Full immersion in English and Spanish, preparing your child for a global future",
    naturalTitle: "Nature-Based Learning",
    naturalDesc: "Our campus is surrounded by the Costa Rican jungle, offering outdoor classrooms and connection to nature",
    holisticTitle: "Holistic Development",
    holisticDesc: "We nurture the whole child - head, heart, and hands - through Waldorf-inspired pedagogy",
    communityTitle: "Small Community",
    communityDesc: "With small class sizes, every child is seen, known, and supported in their unique journey",

    // Programs
    programsTitle: "Our Programs",
    earlyChildhood: "Early Childhood",
    earlyChildhoodAge: "Ages 3-6",
    earlyChildhoodDesc: "A gentle introduction to learning through play, nature, and creative activities",
    primarySchool: "Primary School",
    primarySchoolAge: "Grades 1-5",
    primarySchoolDesc: "Building academic foundations while fostering creativity and social skills",
    middleSchool: "Middle School",
    middleSchoolAge: "Grades 6-7",
    middleSchoolDesc: "Preparing students for high school with critical thinking and independence",

    // Form
    formTitle: "Get Started Today",
    formSubtitle: "Fill out this form and we'll contact you within 24 hours",
    parentGuardianSection: "Parent / Guardian",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    phone: "Phone Number",
    studentSection: "Student",
    studentFirstName: "Student's First Name",
    studentAge: "Student's Current Age or Date of Birth",
    gradeApplying: "Grade Applying For",
    enrollmentSection: "Enrollment Timing",
    whenEnroll: "When are you hoping to enroll?",
    asap: "As soon as possible",
    nextYear: "Next school year",
    exploring: "Just exploring",
    howHeard: "How Did You Hear About Us?",
    googleSearch: "Google Search",
    socialMedia: "Facebook / Instagram",
    referral: "Friend / Referral",
    otherSource: "Other",
    messageSection: "Message",
    formMessage: "Anything you'd like us to know?",
    submit: "Get Started",
    sending: "Sending...",

    // CTA
    ctaTitle: "Ready to Learn More?",
    ctaDescription: "Schedule a visit to see our campus, meet our teachers, and discover if Pacífico Internacional is the right fit for your family.",
    ctaPhone: "+506 8762 6927",
    ctaLocation: "Cañafistula, Guanacaste",

    // Footer
    copyright: "Pacífico Internacional",
  },
  es: {
    // Navigation
    about: "Nosotros",
    admissions: "Admisiones",
    calendar: "Calendario",
    contact: "Contacto",
    workWithUs: "¡Trabaja con nosotros!",

    // Hero
    heroTitle: "Una Escuela Diferente",
    heroSubtitle: "en Guanacaste, Costa Rica",
    heroDescription: "Donde los niños aprenden a través de la imaginación, la naturaleza y experiencias prácticas",
    scheduleVisit: "Agenda una Visita",
    callUs: "Llámanos",

    // Why Choose Us
    whyChooseTitle: "¿Por qué elegir Pacífico Internacional?",
    bilingualTitle: "Educación Bilingüe",
    bilingualDesc: "Inmersión completa en inglés y español, preparando a su hijo para un futuro global",
    naturalTitle: "Aprendizaje en la Naturaleza",
    naturalDesc: "Nuestro campus está rodeado por la selva costarricense, ofreciendo aulas al aire libre y conexión con la naturaleza",
    holisticTitle: "Desarrollo Integral",
    holisticDesc: "Nutrimos al niño completo - cabeza, corazón y manos - a través de la pedagogía inspirada en Waldorf",
    communityTitle: "Comunidad Pequeña",
    communityDesc: "Con clases pequeñas, cada niño es visto, conocido y apoyado en su camino único",

    // Programs
    programsTitle: "Nuestros Programas",
    earlyChildhood: "Primera Infancia",
    earlyChildhoodAge: "3-6 años",
    earlyChildhoodDesc: "Una introducción gentil al aprendizaje a través del juego, la naturaleza y actividades creativas",
    primarySchool: "Primaria",
    primarySchoolAge: "Grados 1-5",
    primarySchoolDesc: "Construyendo bases académicas mientras fomentamos la creatividad y habilidades sociales",
    middleSchool: "Secundaria",
    middleSchoolAge: "Grados 6-7",
    middleSchoolDesc: "Preparando estudiantes para la preparatoria con pensamiento crítico e independencia",

    // Form
    formTitle: "Comienza Hoy",
    formSubtitle: "Completa este formulario y te contactaremos en 24 horas",
    parentGuardianSection: "Padre / Tutor",
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Correo Electrónico",
    phone: "Número de Teléfono",
    studentSection: "Estudiante",
    studentFirstName: "Nombre del Estudiante",
    studentAge: "Edad Actual o Fecha de Nacimiento del Estudiante",
    gradeApplying: "Grado al que Aplica",
    enrollmentSection: "Fecha de Inscripción",
    whenEnroll: "¿Cuándo espera inscribirse?",
    asap: "Lo antes posible",
    nextYear: "Próximo año escolar",
    exploring: "Solo explorando",
    howHeard: "¿Cómo se enteró de nosotros?",
    googleSearch: "Búsqueda en Google",
    socialMedia: "Facebook / Instagram",
    referral: "Amigo / Referido",
    otherSource: "Otro",
    messageSection: "Mensaje",
    formMessage: "¿Hay algo que le gustaría que supiéramos?",
    submit: "Comenzar",
    sending: "Enviando...",

    // CTA
    ctaTitle: "¿Listo para Saber Más?",
    ctaDescription: "Agenda una visita para ver nuestro campus, conocer a nuestros maestros y descubrir si Pacífico Internacional es la opción correcta para tu familia.",
    ctaPhone: "+506 8762 6927",
    ctaLocation: "Cañafistula, Guanacaste",

    // Footer
    copyright: "Pacífico Internacional",
  },
}

export default function AdmissionsLandingPage() {
  const [language, setLanguage] = useState<Language>("en")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    // Parent/Guardian
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    // Student
    studentFirstName: "",
    studentAge: "",
    gradeApplying: "",
    // Enrollment
    whenEnroll: "",
    howHeard: "",
    // Message
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
          message: `[Admissions Landing Page]

PARENT/GUARDIAN:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}

STUDENT:
Student Name: ${formData.studentFirstName}
Age/DOB: ${formData.studentAge}
Grade Applying For: ${formData.gradeApplying || "Not specified"}

ENROLLMENT:
When hoping to enroll: ${formData.whenEnroll}
How they heard about us: ${formData.howHeard || "Not specified"}

MESSAGE:
${formData.message || "No additional message"}`,
          source: "admissions",
        }),
      })

      if (response.ok) {
        router.push("/admissions/thank-you")
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
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-emerald-50 to-amber-50 font-sans">
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
      <section className="relative min-h-[70vh] overflow-hidden flex items-center">
        <Image
          src="/images/faculty-group-photo.jpeg"
          alt="Pacífico Internacional Campus"
          fill
          className="object-cover object-[center_30%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
        <div className="relative z-10 w-full pt-32 md:pt-40 pb-16 md:pb-24">
          <div className="container mx-auto px-4">
            <div className="text-center text-white max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg font-serif">
                {t("heroTitle")}
              </h1>
              <p className="text-2xl md:text-3xl mb-4 text-yellow-200 drop-shadow-md font-serif">
                {t("heroSubtitle")}
              </p>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md leading-relaxed">
                {t("heroDescription")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/visit">
                  <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-6 text-lg">
                    {t("scheduleVisit")}
                  </Button>
                </Link>
                <a href="tel:+50687626927">
                  <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/20 font-semibold px-8 py-6 text-lg">
                    <Phone className="w-5 h-5 mr-2" />
                    {t("callUs")}
                  </Button>
                </a>
              </div>
            </div>
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
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Parent/Guardian Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-teal-700 border-b border-teal-100 pb-2 font-serif">
                      {t("parentGuardianSection")}
                    </h3>
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("phone")} *
                      </label>
                      <Input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Student Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-teal-700 border-b border-teal-100 pb-2 font-serif">
                      {t("studentSection")}
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("studentFirstName")} *
                      </label>
                      <Input
                        required
                        value={formData.studentFirstName}
                        onChange={(e) => setFormData({ ...formData, studentFirstName: e.target.value })}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("studentAge")} *
                      </label>
                      <Input
                        required
                        value={formData.studentAge}
                        onChange={(e) => setFormData({ ...formData, studentAge: e.target.value })}
                        placeholder={language === "en" ? "e.g., 7 years old or 01/15/2017" : "ej., 7 años o 15/01/2017"}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("gradeApplying")}
                      </label>
                      <Input
                        value={formData.gradeApplying}
                        onChange={(e) => setFormData({ ...formData, gradeApplying: e.target.value })}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Enrollment Timing Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-teal-700 border-b border-teal-100 pb-2 font-serif">
                      {t("enrollmentSection")}
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("whenEnroll")} *
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                          <input
                            type="radio"
                            name="whenEnroll"
                            value="asap"
                            checked={formData.whenEnroll === "asap"}
                            onChange={(e) => setFormData({ ...formData, whenEnroll: e.target.value })}
                            required
                            className="w-4 h-4 text-teal-600"
                          />
                          <span className="text-gray-700">{t("asap")}</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                          <input
                            type="radio"
                            name="whenEnroll"
                            value="nextYear"
                            checked={formData.whenEnroll === "nextYear"}
                            onChange={(e) => setFormData({ ...formData, whenEnroll: e.target.value })}
                            className="w-4 h-4 text-teal-600"
                          />
                          <span className="text-gray-700">{t("nextYear")}</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                          <input
                            type="radio"
                            name="whenEnroll"
                            value="exploring"
                            checked={formData.whenEnroll === "exploring"}
                            onChange={(e) => setFormData({ ...formData, whenEnroll: e.target.value })}
                            className="w-4 h-4 text-teal-600"
                          />
                          <span className="text-gray-700">{t("exploring")}</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("howHeard")}
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                          <input
                            type="radio"
                            name="howHeard"
                            value="google"
                            checked={formData.howHeard === "google"}
                            onChange={(e) => setFormData({ ...formData, howHeard: e.target.value })}
                            className="w-4 h-4 text-teal-600"
                          />
                          <span className="text-gray-700">{t("googleSearch")}</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                          <input
                            type="radio"
                            name="howHeard"
                            value="social"
                            checked={formData.howHeard === "social"}
                            onChange={(e) => setFormData({ ...formData, howHeard: e.target.value })}
                            className="w-4 h-4 text-teal-600"
                          />
                          <span className="text-gray-700">{t("socialMedia")}</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                          <input
                            type="radio"
                            name="howHeard"
                            value="referral"
                            checked={formData.howHeard === "referral"}
                            onChange={(e) => setFormData({ ...formData, howHeard: e.target.value })}
                            className="w-4 h-4 text-teal-600"
                          />
                          <span className="text-gray-700">{t("referral")}</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                          <input
                            type="radio"
                            name="howHeard"
                            value="other"
                            checked={formData.howHeard === "other"}
                            onChange={(e) => setFormData({ ...formData, howHeard: e.target.value })}
                            className="w-4 h-4 text-teal-600"
                          />
                          <span className="text-gray-700">{t("otherSource")}</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Message Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-teal-700 border-b border-teal-100 pb-2 font-serif">
                      {t("messageSection")}
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("formMessage")}
                      </label>
                      <Textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full"
                      />
                    </div>
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

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 font-serif">
            {t("whyChooseTitle")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 font-serif">{t("bilingualTitle")}</h3>
                <p className="text-gray-600">{t("bilingualDesc")}</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Tree className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 font-serif">{t("naturalTitle")}</h3>
                <p className="text-gray-600">{t("naturalDesc")}</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 font-serif">{t("holisticTitle")}</h3>
                <p className="text-gray-600">{t("holisticDesc")}</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 font-serif">{t("communityTitle")}</h3>
                <p className="text-gray-600">{t("communityDesc")}</p>
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
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="h-3 bg-gradient-to-r from-pink-400 to-pink-500" />
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sun className="w-8 h-8 text-pink-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1 font-serif">{t("earlyChildhood")}</h3>
                <p className="text-sm text-teal-600 font-medium mb-3">{t("earlyChildhoodAge")}</p>
                <p className="text-gray-600">{t("earlyChildhoodDesc")}</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="h-3 bg-gradient-to-r from-teal-400 to-teal-500" />
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-8 h-8 text-teal-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1 font-serif">{t("primarySchool")}</h3>
                <p className="text-sm text-teal-600 font-medium mb-3">{t("primarySchoolAge")}</p>
                <p className="text-gray-600">{t("primarySchoolDesc")}</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="h-3 bg-gradient-to-r from-amber-400 to-amber-500" />
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1 font-serif">{t("middleSchool")}</h3>
                <p className="text-sm text-teal-600 font-medium mb-3">{t("middleSchoolAge")}</p>
                <p className="text-gray-600">{t("middleSchoolDesc")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
            {t("ctaTitle")}
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            {t("ctaDescription")}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <Link href="/visit">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-6 text-lg">
                {t("scheduleVisit")}
              </Button>
            </Link>
            <a href="tel:+50687626927" className="flex items-center gap-2 text-lg hover:text-yellow-200 transition-colors">
              <Phone className="w-5 h-5" />
              {t("ctaPhone")}
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 text-white/80">
            <MapPin className="w-5 h-5" />
            <span>{t("ctaLocation")}</span>
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
