"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Globe, ChevronDown, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import SharedFooter from "@/components/shared-footer" // Import SharedFooter component
import SharedHeader from "@/components/shared-header" // Import SharedHeader component

export default function TeamPage() {
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
        visit: "Visit",
        ourTeam: "Our Team",
        footerDescription: "Nurturing the whole child through Waldorf-inspired education in the heart of Guanacaste.",
        quickLinks: "Quick Links",
        aboutUs: "About Us",
        schoolCalendar: "School Calendar",
        familyHandbook: "Family Handbook",
        connectWithUs: "Connect With Us",
        footerCopyright: "Pacífico Internacional. All rights reserved.",
        title: "Our Faculty & Staff",
        subtitle: "Meet the dedicated educators who make Pacífico Internacional a special place to learn and grow",
        kindergarten: "Kindergarten",
        grades: "Grade Teachers",
        specialty: "Specialty Teachers",
        administration: "Administration",
        facilities: "Facilities and Maintenance",
      },
      es: {
        about: "Acerca de",
        admissions: "Admisiones",
        calendar: "Calendario",
        contact: "Contacto",
        visit: "Visitar",
        ourTeam: "Nuestro Equipo",
        footerDescription:
          "Nutriendo al niño integral a través de la educación inspirada en Waldorf en el corazón de Guanacaste.",
        quickLinks: "Enlaces Rápidos",
        aboutUs: "Acerca de Nosotros",
        schoolCalendar: "Calendario Escolar",
        familyHandbook: "Manual Familiar",
        connectWithUs: "Conéctate con Nosotros",
        footerCopyright: "Pacífico Internacional. Todos los derechos reservados.",
        title: "Nuestro Equipo Docente",
        subtitle:
          "Conoce a los educadores dedicados que hacen de Pacífico Internacional un lugar especial para aprender y crecer",
        kindergarten: "Kindergarten",
        grades: "Maestros de Grado",
        specialty: "Maestros Especializados",
        administration: "Administración",
        facilities: "Instalaciones y Mantenimiento",
      },
    }
    return translations[language]?.[key] || key
  }

  const facultyData = {
    administration: [
      {
        name: "Helene Lafferty Smith",
        image: "/images/faculty/helene.jpg",
        position: { en: "Head of School", es: "Directora de la Escuela" },
        bio: {
          en: "Helene was born and raised in Oslo, Norway. She has two children in grades 5 and 7 who have attended Waldorf Schools since the age of 2. Before moving to Costa Rica, Helene led the Waldorf School of Garden City in New York, and prior to this, she was the business manager at the Asheville Waldorf School in North Carolina. In her early career, Helene was based in Kenya, working in the humanitarian sector for the United Nations and the Norwegian Refugee Council. Helene has a Masters of Business and Economics and a Master of Science in Sustainable Development. She is an avid horse enthusiast and horseback riding instructor and has a growing stable next door to the school.",
          es: "Helene nació y creció en Oslo, Noruega. Tiene dos hijos en 5.º y 7.º grado que han asistido a escuelas Waldorf desde los 2 años. Antes de mudarse a Costa Rica, Helene dirigió la Waldorf School of Garden City en Nueva York, y,ábban, fue gerente administrativa en la Asheville Waldorf School en Carolina del Norte. En su carrera inicial, Helene trabajó en Kenia en el sector humanitario para las Naciones Unidas y el Consejo Noruego para los Refugiados. Posee una Maestría en Negocios y Economía y una Maestría en Ciencias en Desarrollo Sostenible. Es una entusiasta de los caballos, instructora de equitación y tiene un establo en crecimiento al lado de la escuela.",
        },
      },
      {
        name: "Andrea Rojo",
        image: "/images/faculty/andrea.jpg",
        position: { en: "Office coordinator", es: "Coordinadora de oficina" },
        bio: {
          en: "Andrea is Venezuelan, lived in Argentina for many years, and decided to come to Costa Rica to connect with nature. She holds a degree in Occupational Therapy and is passionate about supporting individuals in developing the skills they need to fully engage in their daily lives. Her career has led her to work in educational and community settings, always seeking to create meaningful experiences. Since the end of the 2023–2024 school year, she has been part of the Waldorf team. She also has experience in school management, event coordination, and digital communication, combining her organizational skills with her creative nature. In her free time, Andrea enjoys painting, reading, learning to surf, traveling, and spending quality time with family and friends.",
          es: "Andrea es Venezolana, vivió en Argentina por muchos años y decidió venir a Costa Rica a conectar con la naturaleza, es Licenciada en Terapia Ocupacional, apasionada por acompañar a las personas en el desarrollo de habilidades que les permitan integrarse plenamente en su vida cotidiana. Su trayectoria la ha llevado a trabajar en entornos educativos y comunitarios, siempre buscando crear experiencias significativas.Desde finales del ciclo escolar 2023-2024 forma parte del equipo de la escuela Waldorf. Además, cuenta con experiencia en gestión escolar, coordinación de eventos y comunicación digital, combinando su lado organizativo con su naturaleza creativa. En su tiempo libre disfruta pintar, leer, aprender a surfear, viajar y compartir momentos de calidad con su familia y amigos.",
        },
      },
    ],
    kindergarten: [
      {
        name: "Robyn Mundrick",
        image: "/images/faculty/robyn.jpg",
        position: {
          en: "Kindergarten Main Teacher and Early Childhood Pedagogical Chair",
          es: "Maestra Principal de Kindergarten y Coordinadora Pedagógica de Primera Infancia",
        },
        bio: {
          en: "Ms. Robyn grew up in the rolling hills of Pennsylvania on the East coast of the US. After high school she traveled all around the United States settling on the West coast in Eugene, Oregon. There she raised her son and was introduced to Waldorf Education. She attended the Waldorf Teacher Education Eugene, igniting a love of Anthroposophy and was introduced to surfing on the Oregon coast. After graduating in 2007 she began working in the Early Childhood Program at the Eugene Waldorf School. Over the years at EWS she was an assistant, co-teacher, lead kindergarten and preschool teacher. She helped redesign the aftercare program, reopen the preschool, lead a summer program, facilitate faculty meetings, and was a member of the College of teachers, among other activities. She began hearing a call to Costa Rica and in 2021 she followed her heart and began her adventure at PWS. This will be her 5th year teaching in the Guanacaste Kindergarten. In her free time she enjoys surfing, crafting, yoga, her kitties and relaxing in the hammock.",
          es: "Ms. Robyn creció en las colinas ondulantes de Pennsylvania, en la costa este de los Estados Unidos. Después de terminar la secundaria, viajó por todo el país y finalmente se estableció en la costa oeste, en Eugene, Oregón. Allí crió a su hijo y fue donde conoció la Educación Waldorf. Asistió a la formación para maestros Waldorf en Eugene, lo cual encendió en ella un amor por la Antroposofía y fue también donde se inició en el surf en la costa de Oregón. Después de graduarse en 2007, comenzó a trabajar en el programa de Educación Inicial en la Eugene Waldorf School. A lo largo de los años en EWS fue asistente, co-maestra, maestra principal de kindergarten y preescolar. Ayudó a rediseñar el programa de aftercare, reabrir el preescolar, lideró un programa de verano, facilitó reuniones de maestros y fue miembro del College of Teachers, entre otras actividades. En 2021, sintió un llamado hacia Costa Rica, siguió su corazón y comenzó su aventura en PWS. Este será su quinto año enseñando en el Kindergarten de Guanacaste. En su tiempo libre, disfruta surfear, hacer manualidades, practicar yoga, pasar tiempo con sus gatitos y relajarse en la hamaca.",
        },
      },
      {
        name: "Larissa Paola Grande",
        image: "/images/faculty/larissa.jpg",
        position: { en: "Kindergarten Assistant Teacher", es: "Maestra Asistente de Kindergarten" },
        bio: {
          en: "Larissa is originally from San José, Costa Rica, and has been living in Guanacaste for the past ten years. She has a background in dramatic arts and has also developed as a musician. Since 2017, she has been cultivating experience in the field of education, always from an approach grounded in respect, trust, and the capacity for self-regulation in children.",
          es: "Larissa es originaria de San José, Costa Rica, y desde hace diez años reside en Guanacaste. Cuenta con formación en artes dramáticas y también se ha desarrollado como música. Desde 2017, ha venido cultivando experiencia en el ámbito educativo, siempre desde un enfoque basado en el respeto, la confianza y la capacidad de autorregulación en los niños.",
        },
      },
    ],
    grades: [
      {
        name: "Karol Abarca Martínez",
        image: "/images/faculty/karol.jpg",
        position: {
          en: "Main Teacher Grade 4/5 and Spanish Teacher Grade 2/3",
          es: "Maestra Principal de 4to/5to Grado y Maestra de Español de 2do/3er Grado",
        },
        bio: {
          en: "Ms. Karol is from the Caribbean coast of Costa Rica, but has lived in Guanacaste for close to 20 years. She obtained her Waldorf Teacher training from Centro de Desarrollo Antroposófico in Cuernavaca, Mexico. She worked as a lead teacher at the Guanecaste Waldorf School for 7 years, where she also was the Director for one year. She was the co-founder and co-Director of the Pacific Waldorf School in 2021, where she also has been a Lead teacher for 4 years. In 2025 she received her Diploma in Curative Pedagogy and Social Therapy from the GITA Anthroposophical Centre in Cuernavaca, Mexico. Karol is the mother of two amazing girls, Olivia and Afrika. In her spare time she enjoys reading, painting, listening to music and spending time in the forest or at the beach. Ms. Karol also loves rescuing and helping animals in need.",
          es: "Ms. Karol es originaria de la costa Caribe de Costa Rica, pero ha vivido en Guanacaste por casi 20 años. Obtuvo su formación como maestra Waldorf en el Centro de Desarrollo Antroposófico en Cuernavaca, México. Trabajó como maestra principal en la Escuela Waldorf de Guanacaste durante 7 años, donde también fue directora durante un año. Fue cofundadora y codirectora de Pacific Waldorf School en 2021, donde también ha sido maestra principal durante 4 años. En 2025 obtuvo su diploma en Pedagogía Curativa y Terapia Social del Centro Antroposófico GITA en Cuernavaca, México. Karol es madre de dos niñas maravillosas, Olivia y Afrika. En su tiempo libre disfruta leer, pintar, escuchar música y pasar tiempo en el bosque o en la playa. A Karol también le encanta rescatar y ayudar a animales necesitados.",
        },
      },
      {
        name: "César Bravo Frutos",
        image: "/images/faculty/cesar.jpg",
        position: {
          en: "Main Teacher Grade 6, Spanish Teacher Middle School",
          es: "Maestro Principal de 6to Grado, Maestro de Español de Secundaria",
        },
        bio: {
          en: "César is originally from Argentina and has lived in Costa Rica for the past 12 years. His Waldorf journey began thanks to his eldest daughter, Olivia, which led him to volunteer at Guanacaste Waldorf School, first supporting maintenance and later teaching Movement and Physical Education. After the school's closure in 2020, César and a group of colleagues founded Pacific Waldorf School in 2021. Since then, he has had the privilege of accompanying the same group of students, and this year he continues to guide them as their Fifth Grade teacher. He is currently completing his Waldorf teacher training in Mexico. His purpose as an educator is to support children in becoming creative, thoughtful, and responsible individuals who can make a positive contribution to society. César feels honored and grateful to continue walking alongside his students and to witness their growth as unique and valuable human beings.",
          es: "César es originario de Argentina y ha vivido en Costa Rica durante los últimos 12 años. Su camino en la educación Waldorf comenzó gracias a su hija mayor, Olivia, lo que lo llevó a ofrecerse como voluntario en la Guanacaste Waldorf School, primero en mantenimiento y luego como maestro de Movimiento y Educación Física. Tras el cierre de la escuela en 2020, César y un grupo de colegas fundaron la Pacific Waldorf School en 2021. Desde entonces, ha tenido el privilegio de acompañar al mismo grupo de estudiantes, y este año continúa guiándolos como su maestro de Quinto Grado. Actualmente está finalizando su formación como maestro Waldorf en México. Su propósito como educador es ayudar a los niños a crecer como seres creativos, reflexivos y responsables, capaces de aportar positivamente a la sociedad. César se siente honrado y agradecido de caminar junto a sus estudiantes y ser testigo de su desarrollo como seres humanos únicos y valiosos.",
        },
      },
      {
        name: "Angelique Metta (Ani)",
        image: "/images/faculty/ani.jpg",
        position: {
          en: "Main Teacher Grade 7/8, Math Teacher Middle School, English Teacher Grade 4/5",
          es: "Maestra Principal de 7mo/8vo Grado, Maestra de Matemáticas de Secundaria, Maestra de Inglés de 4to/5to Grado",
        },
        bio: {
          en: "Ani grew up in Ohio and began her professional journey studying marketing before serving as a Peace Corps volunteer in Paraguay. She went on to spend 7 years working in community economic development across Latin America. After returning to the United States, Ani earned her Waldorf Teaching Certificate and MEd in Waldorf Education from Antioch University. She then spent five years as a grades teacher at the Honolulu Waldorf School, guiding students through a rich and imaginative curriculum. Ani enjoys reading, writing, hiking, camping, crafting, and long days at the beach. She shares her life with her beloved dog Luka and two cats, and cherishes time spent in good company with friends. Ani brings a deep love for storytelling, culture, and the natural world into her classroom and is excited to be part of this learning community.",
          es: "Ani creció en Ohio y comenzó su carrera profesionalStudying marketing before serving as a Peace Corps volunteer in Paraguay. She went on to spend 7 years working in community economic development across Latin America. After returning to the United States, Ani earned her Waldorf Teaching Certificate and MEd in Waldorf Education from Antioch University. She then spent five years as a grades teacher at the Honolulu Waldorf School, guiding students through a rich and imaginative curriculum. Ani enjoys reading, writing, hiking, camping, crafting, and long days at the beach. She shares her life with her beloved dog Luka and two cats, and cherishes time spent in good company with friends. Ani brings a deep love for storytelling, culture, and the natural world into her classroom and is excited to be part of this learning community.",
        },
      },
      {
        name: "Elvira Espinosa Gil",
        image: "/images/faculty/elvira.jpeg",
        position: { en: "Main Teacher Grade 1", es: "Maestra Principal de 1er Grado" },
        bio: {
          en: "Elvira is from Burgos in Spain. She holds a Bachelors degree in Early Childhood Education from Spain and worked at the MichäelSchool Steiner School Turnhout in Belgium for two years before moving to Costa Rica. Elvira joined the Pacifico Internacional faculty in August 2025, initially as a Grades Assistant before she took over as the Main Teacher for the combined Grade 1 and 2 class during the second semester. She has also completed a summer intensive Waldorf course through the Sunbridge Institute in New York.\n\nIn her free time Elvira enjoys exploring new places, food and people. She loves to read, surf and spend time with horses.",
          es: "Elvira es originaria de Burgos, España. Tiene una licenciatura en Educación Infantil de España y trabajó en la MichäelSchool Steiner School Turnhout en Bélgica durante dos años antes de mudarse a Costa Rica. Elvira se unió al equipo docente de Pacífico Internacional en agosto de 2025, inicialmente como Asistente de Grados antes de asumir como Maestra Principal de la clase combinada de 1er y 2do grado durante el segundo semestre. También completó un curso intensivo de verano de Waldorf a través del Sunbridge Institute en Nueva York.\n\nEn su tiempo libre, Elvira disfruta explorar nuevos lugares, comidas y conocer personas. Le encanta leer, surfear y pasar tiempo con caballos.",
        },
      },
    ],
    specialty: [
      {
        name: "Carrie Lawson",
        image: "/images/faculty/carrie.jpeg",
        position: { en: "Handwork teacher Grades 1-7", es: "Maestra de Manualidades de 1ero a 7mo grado" },
        bio: {
          en: "Carrie started teaching Waldorf handwork in 2018 at the Guanacaste Waldorf School and has a certification from Waldorf Handwork Educators. Through working with children, she has come to an understanding of the vital role that handwork plays in the brain development of each child. She has seen in her students and in her own children how beneficial handwork techniques are in developing mathematical, handwriting and problem solving skills. In her spare time she enjoys traveling and learning about textiles from around the world and creating handmade gifts and clothing.",
          es: "Carrie comenzó a enseñar manualidades Waldorf en 2018 en la Escuela Waldorf de Guanacaste y cuenta con una certificación de Waldorf Handwork Educators. A través del trabajo con niños, ha comprendido el papel fundamental que las manualidades juegan en el desarrollo cerebral de cada niño. Ha podido observar, tanto en sus estudiantes como en sus propios hijos, cuán beneficiosas son estas técnicas para el desarrollo de habilidades matemáticas, escritura y resolución de problemas. En su tiempo libre disfruta viajar, aprender sobre textiles de todo el mundo y crear regalos y prendas hechas a mano.",
        },
      },

    ],
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/images/faculty-group-photo.jpeg"
          alt="Faculty and staff group photo at Pacífico Internacional"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />

        {/* Hero Content */}
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg text-balance">{t("title")}</h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-md text-pretty max-w-3xl mx-auto">{t("subtitle")}</p>
        </div>
      </div>

      <nav className="fixed top-0 left-0 right-0 z-30 bg-black/20 backdrop-blur-sm transition-all duration-300">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex items-center justify-between">
            <SharedHeader language={language} setLanguage={setLanguage} headerLogoOpacity={headerLogoOpacity} />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Administration Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{t("administration")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facultyData.administration.map((member, index) => (
              <div
                key={index}
                id={member.name.toLowerCase().split(" ")[0]}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={400}
                    height={400}
                    className={`w-full h-full hover:scale-105 transition-transform duration-300 ${member.name === "Andrea Rojo" ? "object-cover object-top" : "object-cover"}`}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{member.position[language]}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio[language]}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Kindergarten Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{t("kindergarten")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facultyData.kindergarten.map((member, index) => (
              <div
                key={index}
                id={member.name.toLowerCase().split(" ")[0]}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={400}
                    height={400}
                    className={`w-full h-full object-cover hover:scale-105 transition-transform duration-300 ${member.name === "Robyn Mundrick" ? "object-top" : ""}`}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{member.position[language]}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio[language]}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Grade Teachers Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{t("grades")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facultyData.grades.map((member, index) => (
              <div
                key={index}
                id={member.name.toLowerCase().split(" ")[0]}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{member.position[language]}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio[language]}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Specialty Teachers Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{t("specialty")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facultyData.specialty.map((member, index) => (
              <div
                key={index}
                id={member.name.toLowerCase().split(" ")[0]}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={400}
                    height={400}
                    className={`w-full h-full object-cover hover:scale-105 transition-transform duration-300 ${["Carrie Lawson"].includes(member.name) ? "object-top" : ""}`}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{member.position[language]}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio[language]}</p>
                </div>
              </div>
            ))}


          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{t("facilities")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Joselyn Adriana Peña profile card */}
            <div
              id="joselyn"
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <Image
                  src="/images/faculty/joselyn.jpeg"
                  alt="Joselyn Adriana Peña"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover object-[center_25%] hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Joselyn Adriana Peña</h3>
                <p className="text-blue-600 font-medium mb-4">{language === "en" ? "Custodian" : "Mantenimiento"}</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {language === "en"
                    ? "Joselyn was born in San Carlos, Alajuela, and has been living in San Pedro for the past 16 years. She loves dancing, traveling, and listening to music, and especially enjoys accompanying her daughter in her folkloric dance performances. Currently, she is part of several community groups in her town, as she is motivated to see an active and constantly growing community. She supports the folkloric dance group not only because of her daughter, but also because she believes it is essential for children to be engaged in positive activities that help preserve their roots, customs, and traditions. For Joselyn, this work is a way of giving love and contributing to the community she belongs to."
                    : "Joselyn nació en San Carlos, Alajuela, y desde hace 16 años vive en San Pedro. Le apasiona bailar, pasear y escuchar música, y disfruta especialmente acompañar a su hija en sus presentaciones de folklore. Actualmente participa en varios grupos comunitarios de su pueblo, ya que le motiva ver una comunidad activa y en constante crecimiento. Le gusta apoyar al grupo de bailarines de folklore no solo por su hija, sino también porque considera fundamental que los niños estén ocupados en actividades positivas que rescaten sus raíces, costumbres y tradiciones. Para Joselyn, esta labor es una manera de dar amor y contribuir al pueblo al que pertenece."}
                </p>
              </div>
            </div>

            {/* Jenner Juarez profile card */}
            <div
              id="jenner"
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <Image
                  src="/images/faculty/jenner.jpeg"
                  alt="Jenner Juarez"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover object-[center_20%] hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Jenner Juarez</h3>
                <p className="text-blue-600 font-medium mb-4">
                  {language === "en" ? "Maintenance and Gardening" : "Mantenimiento y Jardinería"}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {language === "en"
                    ? "Jenner is born and raised in Guanacaste and currently lives in the small town of Delicias, close to 27 de Abril. He is a voluntary fire fighter in the area, and also has infinite knowledge on local vegetation and animals. When he is not working or fighting fires he loves to sing and spend time with his daughter."
                    : "Jenner nació y creció en Guanacaste y actualmente vive en el pequeño pueblo de Delicias, cerca de 27 de Abril. Es bombero voluntario en la zona y también tiene un conocimiento infinito sobre la vegetación y los animales locales. Cuando no está trabajando o apagando incendios, le encanta cantar y pasar tiempo con su hija."}
                </p>
              </div>
            </div>

            {/* Mauricio José Calero Alemán profile card */}
            <div
              id="mauricio"
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <Image
                  src="/images/faculty/mauricio.jpeg"
                  alt="Mauricio José Calero Alemán"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover object-[center_30%] hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Mauricio José Calero Alemán</h3>
                <p className="text-blue-600 font-medium mb-4">
                  {language === "en" ? "Maintenance and Gardening" : "Mantenimiento y Jardinería"}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {language === "en"
                    ? "Mauricio is born and raised in Guanacaste, and currently lives in 27 de Abril with his two year old daughter. In his free time he is a bull rider and likes to play soccer."
                    : "Mauricio nació y creció en Guanacaste y actualmente vive en 27 de Abril con su hija de dos años. En su tiempo libre le gusta montar toros y jugar fútbol."}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SharedFooter language={language} />
    </div>
  )
}
