"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Globe, ChevronDown, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import SharedFooter from "@/components/shared-footer" // Import SharedFooter
import SharedHeader from "@/components/shared-header" // Import SharedHeader

export default function CareersPage() {
  const [language, setLanguage] = useState("en")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const headerLogoOpacity = Math.min(scrollY / 300, 1)

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    if (href.startsWith("#")) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        about: "About",
        admissions: "Admissions",
        calendar: "Calendar",
        contact: "Contact",
        workWithUs: "Work With Us!",
        heroTitle: "Join Our Team",
        heroSubtitle: "Be part of a nurturing community dedicated to Waldorf-inspired education",
        title: "Career Opportunities",
        subtitle: "We are growing and searching for Lead Teachers in",
        earlyChildhood: "Early Childhood",
        lowerGrades: "Lower Grades",
        middleSchool: "Middle School",
        whyJoin: "Why Join Pacífico Internacional?",
        reason1Title: "Waldorf-Inspired Education",
        reason1Desc: "Be part of a school that honors the whole child through head, heart, and hands learning.",
        reason2Title: "Beautiful Natural Setting",
        reason2Desc: "Work in a stunning jungle campus in Guanacaste, Costa Rica.",
        reason3Title: "Supportive Community",
        reason3Desc: "Join a close-knit team of dedicated educators and families.",
        reason4Title: "Professional Growth",
        reason4Desc: "Opportunities for ongoing training and development in Waldorf pedagogy.",
        applyTitle: "How to Apply",
        applyDesc: "If you are passionate about Waldorf education and want to make a difference in children's lives, we would love to hear from you.",
        sendResume: "Please send your resume and cover letter to:",
        footerDescription: "Nurturing the whole child through Waldorf-inspired education in the heart of Guanacaste.",
        quickLinks: "Quick Links",
        aboutUs: "About Us",
        schoolCalendar: "School Calendar",
        familyHandbook: "Family Handbook",
        connectWithUs: "Connect With Us",
        footerCopyright: "Pacífico Internacional. All rights reserved.",
      },
      es: {
        about: "Acerca de",
        admissions: "Admisiones",
        calendar: "Calendario",
        contact: "Contacto",
        workWithUs: "¡Trabaja con nosotros!",
        heroTitle: "Únete a Nuestro Equipo",
        heroSubtitle: "Sé parte de una comunidad dedicada a la educación inspirada en Waldorf",
        title: "Oportunidades de Empleo",
        subtitle: "Estamos creciendo y buscando Maestros Líderes en",
        earlyChildhood: "Educación Temprana",
        lowerGrades: "Grados Inferiores",
        middleSchool: "Escuela Secundaria",
        whyJoin: "¿Por qué unirse a Pacífico Internacional?",
        reason1Title: "Educación Inspirada en Waldorf",
        reason1Desc: "Sé parte de una escuela que honra al niño integral a través del aprendizaje de cabeza, corazón y manos.",
        reason2Title: "Hermoso Entorno Natural",
        reason2Desc: "Trabaja en un impresionante campus en la selva de Guanacaste, Costa Rica.",
        reason3Title: "Comunidad de Apoyo",
        reason3Desc: "Únete a un equipo cercano de educadores y familias dedicadas.",
        reason4Title: "Crecimiento Profesional",
        reason4Desc: "Oportunidades de capacitación continua y desarrollo en pedagogía Waldorf.",
        applyTitle: "Cómo Aplicar",
        applyDesc: "Si te apasiona la educación Waldorf y quieres hacer una diferencia en la vida de los niños, nos encantaría saber de ti.",
        sendResume: "Por favor envía tu currículum y carta de presentación a:",
        footerDescription: "Nutriendo al niño integral a través de la educación inspirada en Waldorf en el corazón de Guanacaste.",
        quickLinks: "Enlaces Rápidos",
        aboutUs: "Acerca de Nosotros",
        schoolCalendar: "Calendario Escolar",
        familyHandbook: "Manual Familiar",
        connectWithUs: "Conéctate con Nosotros",
        footerCopyright: "Pacífico Internacional. Todos los derechos reservados.",
      },
    }
    return translations[language]?.[key] || key
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-black/20 backdrop-blur-sm transition-all duration-300">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex items-center justify-between">
            <SharedHeader language={language} setLanguage={setLanguage} headerLogoOpacity={headerLogoOpacity} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[500px] overflow-hidden">
          <Image
            src="/images/faculty-group-photo.jpeg"
            alt="Pacífico Internacional Faculty"
            fill
            className="object-cover object-[center_25%]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {t("heroTitle")}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl drop-shadow-md">
              {t("heroSubtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Intro and Apply Now */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{t("title")}</h2>
              
              <p className="text-gray-600 mb-6">
                {language === "en" 
                  ? "If for any reason you cannot apply through the form, please send us your CV directly to "
                  : "Si por alguna razón no puedes aplicar a través del formulario, envíanos tu CV directamente a "}
                <a href="mailto:info@waldorf.cr" className="text-teal-600 hover:text-teal-700 underline">
                  info@waldorf.cr
                </a>
              </p>
              
              {/* Apply Now Button - Top */}
              <a
                href="https://forms.gle/YPSwqP1vm66PmfhH9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-teal-600 text-white px-8 py-4 rounded-lg hover:bg-teal-700 transition-colors font-semibold text-lg mb-8"
              >
                {language === "en" ? "Apply Now" : "Aplicar Ahora"}
              </a>

              {/* About the School */}
              <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 mb-12 text-left">
                <p className="text-gray-700 leading-relaxed">
                  {language === "en"
                    ? "Pacifico Internacional is a Waldorf Inspired School located outside of Tamarindo on the Pacific northwest coast of Costa Rica. It's an area rich in beauty, located a short distance to beaches with amazing waves and sunsets. We are also located close to Liberia Airport and national parks."
                    : "Pacífico Internacional es una escuela de inspiración Waldorf ubicada en las afueras de Tamarindo, en la costa noroeste del Pacífico de Costa Rica. Es un área rica en belleza, ubicada a poca distancia de playas con olas increíbles y atardeceres espectaculares. También estamos cerca del Aeropuerto de Liberia y parques nacionales."}
                </p>
              </div>
            </div>

            {/* Job Descriptions */}
            <div className="space-y-12">
              {/* Job 1: Lead Teacher - Lower Grades */}
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-teal-700 mb-4">
                  {language === "en" ? "1) Lead Teacher - Lower Grades" : "1) Maestro Líder - Grados Inferiores"}
                </h3>
                <p className="text-gray-700 mb-6">
                  {language === "en"
                    ? "We are looking for a trained and experienced Waldorf Teacher to join our talented faculty as a Lead Teacher in the Lower Grades."
                    : "Buscamos un maestro Waldorf capacitado y experimentado para unirse a nuestro talentoso equipo docente como Maestro Líder en los Grados Inferiores."}
                </p>
                
                <h4 className="font-semibold text-gray-800 mb-3">
                  {language === "en" ? "Main responsibilities include (but are not limited to):" : "Las responsabilidades principales incluyen (pero no se limitan a):"}
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                  <li>{language === "en" ? "Plan and teach Main Lesson blocks for the relevant grade(s)." : "Planificar y enseñar bloques de Lección Principal para los grados correspondientes."}</li>
                  <li>{language === "en" ? "Teach every subject in accordance with the Waldorf Pedagogy and with an artistic approach." : "Enseñar todas las materias de acuerdo con la Pedagogía Waldorf y con un enfoque artístico."}</li>
                  <li>{language === "en" ? "Support the academic and artistic development of the students." : "Apoyar el desarrollo académico y artístico de los estudiantes."}</li>
                  <li>{language === "en" ? "Create and care for the classroom." : "Crear y cuidar el aula."}</li>
                  <li>{language === "en" ? "Administrative aspects of being the lead teacher including organizing pedagogical meetings with parents, writing of end of year reports, organizing field trips, supporting the admission of students." : "Aspectos administrativos de ser el maestro líder, incluyendo organizar reuniones pedagógicas con padres, redactar informes de fin de año, organizar excursiones y apoyar la admisión de estudiantes."}</li>
                  <li>{language === "en" ? "Help in planning festivals and events at the school." : "Ayudar en la planificación de festivales y eventos en la escuela."}</li>
                </ul>

                <h4 className="font-semibold text-gray-800 mb-3">
                  {language === "en" ? "Minimum Qualifications" : "Requisitos Mínimos"}
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                  <li>{language === "en" ? "Completion of, or current enrollment in, a Waldorf Teacher Training program" : "Finalización o inscripción actual en un programa de Formación de Maestros Waldorf"}</li>
                  <li>{language === "en" ? "Bachelor's degree from an accredited university" : "Título de licenciatura de una universidad acreditada"}</li>
                  <li>{language === "en" ? "Previous Waldorf experience" : "Experiencia previa en Waldorf"}</li>
                  <li>{language === "en" ? "Fluency in either English or Spanish and competency in the other" : "Fluidez en inglés o español y competencia en el otro idioma"}</li>
                  <li>{language === "en" ? "A special interest and talent in musical would be an added benefit" : "Un interés especial y talento en música sería un beneficio adicional"}</li>
                </ul>

                <a
                  href="https://forms.gle/YPSwqP1vm66PmfhH9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors font-semibold"
                >
                  {language === "en" ? "Apply Now" : "Aplicar Ahora"}
                </a>
              </div>

              {/* Job 2: Lead Teacher - Middle School */}
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-teal-700 mb-4">
                  {language === "en" ? "2) Lead Teacher - Middle School" : "2) Maestro Líder - Escuela Secundaria"}
                </h3>
                <p className="text-gray-700 mb-6">
                  {language === "en"
                    ? "We are looking for a trained and experienced Waldorf Teacher to join our talented faculty as a Lead Teacher in our growing Middle School."
                    : "Buscamos un maestro Waldorf capacitado y experimentado para unirse a nuestro talentoso equipo docente como Maestro Líder en nuestra creciente Escuela Secundaria."}
                </p>
                
                <h4 className="font-semibold text-gray-800 mb-3">
                  {language === "en" ? "Main responsibilities include (but are not limited to):" : "Las responsabilidades principales incluyen (pero no se limitan a):"}
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                  <li>{language === "en" ? "Plan and teach Main Lesson blocks for the relevant grade(s)." : "Planificar y enseñar bloques de Lección Principal para los grados correspondientes."}</li>
                  <li>{language === "en" ? "Teach every subject in accordance with the Waldorf Pedagogy and with an artistic approach." : "Enseñar todas las materias de acuerdo con la Pedagogía Waldorf y con un enfoque artístico."}</li>
                  <li>{language === "en" ? "Support the academic and artistic development of the students." : "Apoyar el desarrollo académico y artístico de los estudiantes."}</li>
                  <li>{language === "en" ? "Create and care for the classroom." : "Crear y cuidar el aula."}</li>
                  <li>{language === "en" ? "Administrative aspects of being the lead teacher including organizing pedagogical meetings with parents, writing of end of year reports, organizing field trips, supporting the admission of students." : "Aspectos administrativos de ser el maestro líder, incluyendo organizar reuniones pedagógicas con padres, redactar informes de fin de año, organizar excursiones y apoyar la admisión de estudiantes."}</li>
                  <li>{language === "en" ? "Help in planning festivals and events at the school." : "Ayudar en la planificación de festivales y eventos en la escuela."}</li>
                </ul>

                <h4 className="font-semibold text-gray-800 mb-3">
                  {language === "en" ? "Minimum Qualifications" : "Requisitos Mínimos"}
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                  <li>{language === "en" ? "Completion of, or current enrollment in, a Waldorf Teacher Training program" : "Finalización o inscripción actual en un programa de Formación de Maestros Waldorf"}</li>
                  <li>{language === "en" ? "Bachelor's degree from an accredited university" : "Título de licenciatura de una universidad acreditada"}</li>
                  <li>{language === "en" ? "Previous Waldorf experience" : "Experiencia previa en Waldorf"}</li>
                  <li>{language === "en" ? "Fluency in either English or Spanish and competency in the other" : "Fluidez en inglés o español y competencia en el otro idioma"}</li>
                  <li>{language === "en" ? "A special interest and talent in musical would be an added benefit" : "Un interés especial y talento en música sería un beneficio adicional"}</li>
                </ul>

                <a
                  href="https://forms.gle/YPSwqP1vm66PmfhH9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors font-semibold"
                >
                  {language === "en" ? "Apply Now" : "Aplicar Ahora"}
                </a>
              </div>

              {/* Job 3: Lead Teacher - Early Childhood */}
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-teal-700 mb-4">
                  {language === "en" ? "3) Lead Teacher - Early Childhood" : "3) Maestro Líder - Educación Temprana"}
                </h3>
                <p className="text-gray-700 mb-6">
                  {language === "en"
                    ? "As we are expanding our Early Childhood program, we are looking for a trained and experienced Waldorf Teacher to join our talented faculty as a Lead teacher for an Early Childhood class."
                    : "A medida que expandimos nuestro programa de Educación Temprana, buscamos un maestro Waldorf capacitado y experimentado para unirse a nuestro talentoso equipo docente como Maestro Líder para una clase de Educación Temprana."}
                </p>
                
                <h4 className="font-semibold text-gray-800 mb-3">
                  {language === "en" ? "Main responsibilities include (but are not limited to):" : "Las responsabilidades principales incluyen (pero no se limitan a):"}
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                  <li>{language === "en" ? "Plan rhythm in collaboration with other Early Childhood Teachers, Early Childhood Chair and Head of School, ensuring that Waldorf movement, music and activities are incorporated into the rhythm" : "Planificar el ritmo en colaboración con otros maestros de Educación Temprana, el Coordinador de Educación Temprana y el Director, asegurando que el movimiento, la música y las actividades Waldorf se incorporen al ritmo"}</li>
                  <li>{language === "en" ? "Create and care for the classroom." : "Crear y cuidar el aula."}</li>
                  <li>{language === "en" ? "Administrative aspects of being the lead teacher, including organizing pedagogical meetings with parents, writing of end of year reports, organizing field trips, supporting the admission of students." : "Aspectos administrativos de ser el maestro líder, incluyendo organizar reuniones pedagógicas con padres, redactar informes de fin de año, organizar excursiones y apoyar la admisión de estudiantes."}</li>
                  <li>{language === "en" ? "Help in planning festivals and events at the school." : "Ayudar en la planificación de festivales y eventos en la escuela."}</li>
                </ul>

                <h4 className="font-semibold text-gray-800 mb-3">
                  {language === "en" ? "Minimum Qualifications" : "Requisitos Mínimos"}
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
                  <li>{language === "en" ? "Completion of, or current enrollment in, a Waldorf Teacher Training program" : "Finalización o inscripción actual en un programa de Formación de Maestros Waldorf"}</li>
                  <li>{language === "en" ? "Bachelor's degree from an accredited university" : "Título de licenciatura de una universidad acreditada"}</li>
                  <li>{language === "en" ? "Previous Waldorf experience, preferably in the Early Childhood program" : "Experiencia previa en Waldorf, preferiblemente en el programa de Educación Temprana"}</li>
                  <li>{language === "en" ? "Fluency in either English or Spanish and competency in the other" : "Fluidez en inglés o español y competencia en el otro idioma"}</li>
                  <li>{language === "en" ? "A special interest and talent in musical would be an added benefit" : "Un interés especial y talento en música sería un beneficio adicional"}</li>
                </ul>

                <a
                  href="https://forms.gle/YPSwqP1vm66PmfhH9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors font-semibold"
                >
                  {language === "en" ? "Apply Now" : "Aplicar Ahora"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SharedFooter language={language} />
    </div>
  )
}
