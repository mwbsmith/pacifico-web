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
        name: "Diana Cubillos Salazar",
        image: "/images/faculty/diana.jpg",
        position: { en: "Kindergarten Teacher", es: "Maestra de Kindergarten" },
        bio: {
          en: "Diana grew up in San Jose, and has been working in early childhood education since 2012. She started her Waldorf Journey as a Kindergarten assistant at the Guanacaste Waldorf School, and became the main teacher for Pre-K at Pacific Waldorf School in 2021. In 2022, she completed both parts of the Foundations in Anthroposophy program from Rudolf Steiner College Canada, and is currently continuing her education through the LifeWays Ontario Professional Development Program. Diana is an active, outdoorsy person who loves water skiing, paddleboarding, and hiking. She is deeply passionate about education, individuality, temperaments, and karma.",
          es: "Diana creció en San José y ha trabajado en educación inicial desde 2012. Comenzó su camino Waldorf como asistente de Kindergarten en la Guanacaste Waldorf School, y en 2021 se convirtió en maestra principal de Pre-K en Pacific Waldorf School. En 2022 completó ambas partes del programa Foundations in Anthroposophy del Rudolf Steiner College Canada, y actualmente continúa su formación a través del programa de Desarrollo Profesional de LifeWays Ontario. Diana es una persona activa y amante de la vida al aire libre; disfruta del esquí acuático, el paddleboard y las caminatas. Siente una profunda pasión por la educación, la individualidad, los temperamentos y el karma.",
        },
      },
      {
        name: "Robyn Mundrick",
        image: "/images/faculty/robyn.jpg",
        position: { en: "Kindergarten Teacher", es: "Maestra de Kindergarten" },
        bio: {
          en: "Ms. Robyn grew up in the rolling hills of Pennsylvania on the East coast of the US. After high school she traveled all around the United States settling on the West coast in Eugene, Oregon. There she raised her son and was introduced to Waldorf Education. She attended the Waldorf Teacher Education Eugene, igniting a love of Anthroposophy and was introduced to surfing on the Oregon coast. After graduating in 2007 she began working in the Early Childhood Program at the Eugene Waldorf School. Over the years at EWS she was an assistant, co-teacher, lead kindergarten and preschool teacher. She helped redesign the aftercare program, reopen the preschool, lead a summer program, facilitate faculty meetings, and was a member of the College of teachers, among other activities. She began hearing a call to Costa Rica and in 2021 she followed her heart and began her adventure at PWS. This will be her 5th year teaching in the Guanacaste Kindergarten. In her free time she enjoys surfing, crafting, yoga, her kitties and relaxing in the hammock.",
          es: "Ms. Robyn creció en las colinas ondulantes de Pennsylvania, en la costa este de los Estados Unidos. Después de terminar la secundaria, viajó por todo el país y finalmente se estableció en la costa oeste, en Eugene, Oregón. Allí crió a su hijo y fue donde conoció la Educación Waldorf. Asistió a la formación para maestros Waldorf en Eugene, lo cual encendió en ella un amor por la Antroposofía y fue también donde se inició en el surf en la costa de Oregón. Después de graduarse en 2007, comenzó a trabajar en el programa de Educación Inicial en la Eugene Waldorf School. A lo largo de los años en EWS fue asistente, co-maestra, maestra principal de kindergarten y preescolar. Ayudó a rediseñar el programa de aftercare, reabrir el preescolar, lideró un programa de verano, facilitó reuniones de maestros y fue miembro del College of Teachers, entre otras actividades. En 2021, sintió un llamado hacia Costa Rica, siguió su corazón y comenzó su aventura en PWS. Este será su quinto año enseñando en el Kindergarten de Guanacaste. En su tiempo libre, disfruta surfear, hacer manualidades, practicar yoga, pasar tiempo con sus gatitos y relajarse en la hamaca.",
        },
      },
      {
        name: "Arielle Thomas",
        image: "/images/faculty/arielle.jpg",
        position: { en: "Kindergarten Assistant", es: "Asistente de Kindergarten" },
        bio: {
          en: "Ms. Arielle joined our community for the 2024/2025 school year when she was the Grade 1 and 2 assistant and English teacher. Arielle embarked on her Waldorf education journey from a young age attending a Waldorf inspired school. She is currently enrolled in Waldorf Teacher training in Colombia. She has served as an assistant across various grades in Waldorf Schools and taught Spanish and music. Arielle is passionate about music, storytelling, and the English language, and finds immense joy in connecting with students and fostering classroom community.",
          es: "Arielle comenzó su viaje con la educación Waldorf en sus primeros años, atesorando recuerdos de explorar la naturaleza y participar en actividades prácticas. Ha sido ayudante en varios grados y ha enseñado español y música. Apasionada por la música, la narración y la lengua inglesa, Arielle encuentra una inmensa alegría en conectar con los estudiantes y construir una comunidad dentro del aula. Estamos entusiasmados de darle la bienvenida a nuestra comunidad y escuela. Sus conocimientos y habilidades nos ayudarán a enriquecer la experiencia educativa de nuestros alumnos.",
        },
      },
      {
        name: "Larissa",
        image: "/images/faculty/larissa.jpg",
        position: { en: "Kindergarten Assistant", es: "Asistente de Kindergarten" },
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
        position: { en: "Grade Teacher", es: "Maestra de Grado" },
        bio: {
          en: "Ms. Karol is from the Caribbean coast of Costa Rica, but has lived in Guanacaste for close to 20 years. She obtained her Waldorf Teacher training from Centro de Desarrollo Antroposófico in Cuernavaca, Mexico. She worked as a lead teacher at the Guanecaste Waldorf School for 7 years, where she also was the Director for one year. She was the co-founder and co-Director of the Pacific Waldorf School in 2021, where she also has been a Lead teacher for 4 years. In 2025 she received her Diploma in Curative Pedagogy and Social Therapy from the GITA Anthroposophical Centre in Cuernavaca, Mexico. Karol is the mother of two amazing girls, Olivia and Afrika. In her spare time she enjoys reading, painting, listening to music and spending time in the forest or at the beach. Ms. Karol also loves rescuing and helping animals in need.",
          es: "Ms. Karol es originaria de la costa Caribe de Costa Rica, pero ha vivido en Guanacaste por casi 20 años. Obtuvo su formación como maestra Waldorf en el Centro de Desarrollo Antroposófico en Cuernavaca, México. Trabajó como maestra principal en la Escuela Waldorf de Guanacaste durante 7 años, donde también fue directora durante un año. Fue cofundadora y codirectora de Pacific Waldorf School en 2021, donde también ha sido maestra principal durante 4 años. En 2025 obtuvo su diploma en Pedagogía Curativa y Terapia Social del Centro Antroposófico GITA en Cuernavaca, México. Karol es madre de dos niñas maravillosas, Olivia y Afrika. En su tiempo libre disfruta leer, pintar, escuchar música y pasar tiempo en el bosque o en la playa. A Karol también le encanta rescatar y ayudar a animales necesitados.",
        },
      },
      {
        name: "Dennis Drennan",
        image: "/images/faculty/dennis.jpg",
        position: {
          en: "Main Teacher Grades 1/2 and English Teacher Grades 3/4",
          es: "Maestro Principal de 1ero y 2do grado y Maestro de Inglés de 3ero y 4to grado",
        },
        bio: {
          en: "Dennis recently joined the school from Seacoast Waldorf School in Maine, where he graduated his 8th grade class in June 2025. Dennis earned his Waldorf teaching degree from Antioch University in 2005. Along with being a Waldorf teacher for the past 18 years, he has also had experience teaching environmental education and special education in both public and private settings. He has a passion for teaching history and the arts and seeks to give kids hands-on experiences both in the classroom and out in the community. When Dennis is not teaching, he enjoys traveling, kayaking, skiing, and spending time with his wife Wendy and their two children, Alphea and Peder, who also attend the school. Along with teaching, he has spent much of his free time fixing up an old house where they live and building a cabin near Acadia National Park in Maine.",
          es: "Dennis se unió recientemente a la escuela desde Seacoast Waldorf School en Maine, donde graduó a su clase de 8.º grado en junio de 2025. Obtuvo su título en enseñanza Waldorf en la Universidad de Antioch en 2005. Además de ser maestro Waldorf durante los últimos 18 años, también ha tenido experiencia enseñando educación ambiental y educación especial en entornos públicos y privados. Tiene una gran pasión por la enseñanza de la historia y las artes, y busca ofrecer a los estudiantes experiencias prácticas tanto en el aula como en la comunidad. Cuando no está enseñando, a Dennis le gusta viajar, hacer kayak, esquiar y pasar tiempo con su esposa Wendy y sus dos hijos, Alphea y Peder, quienes también asisten a la escuela. Además de enseñar, dedica gran parte de su tiempo libre a remodelar una casa antigua donde vive y a construir una cabaña cerca del Parque Nacional Acadia en Maine.",
        },
      },
      {
        name: "César Bravo Frutos",
        image: "/images/faculty/cesar.jpg",
        position: {
          en: "Main Teacher Grade 5, Spanish teacher Grades 5/6/7",
          es: "Maestro Principal de 5to Grado, Maestro de Español de 5to/6to/7mo grado",
        },
        bio: {
          en: "César is originally from Argentina and has lived in Costa Rica for the past 12 years. His Waldorf journey began thanks to his eldest daughter, Olivia, which led him to volunteer at Guanacaste Waldorf School, first supporting maintenance and later teaching Movement and Physical Education. After the school's closure in 2020, César and a group of colleagues founded Pacific Waldorf School in 2021. Since then, he has had the privilege of accompanying the same group of students, and this year he continues to guide them as their Fifth Grade teacher. He is currently completing his Waldorf teacher training in Mexico. His purpose as an educator is to support children in becoming creative, thoughtful, and responsible individuals who can make a positive contribution to society. César feels honored and grateful to continue walking alongside his students and to witness their growth as unique and valuable human beings.",
          es: "César es originario de Argentina y ha vivido en Costa Rica durante los últimos 12 años. Su camino en la educación Waldorf comenzó gracias a su hija mayor, Olivia, lo que lo llevó a ofrecerse como voluntario en la Guanacaste Waldorf School, primero en mantenimiento y luego como maestro de Movimiento y Educación Física. Tras el cierre de la escuela en 2020, César y un grupo de colegas fundaron la Pacific Waldorf School en 2021. Desde entonces, ha tenido el privilegio de acompañar al mismo grupo de estudiantes, y este año continúa guiándolos como su maestro de Quinto Grado. Actualmente está finalizando su formación como maestro Waldorf en México. Su propósito como educador es ayudar a los niños a crecer como seres creativos, reflexivos y responsables, capaces de aportar positivamente a la sociedad. César se siente honrado y agradecido de caminar junto a sus estudiantes y ser testigo de su desarrollo como seres humanos únicos y valiosos.",
        },
      },
      {
        name: "Todd Crowe",
        image: "/images/faculty/todd.jpg",
        position: {
          en: "Main Teacher Grade 6/7, English Teacher Grades 5/6/7, Movement and Woodworking",
          es: "Maestro Principal de 6to y 7mo grado, Maestro de Inglés de 5to, 6to y 7mo grado, Movimiento y Carpintería",
        },
        bio: {
          en: "Todd recently joined the school from Asheville, North Carolina where he has been a founding faculty member of the Asheville Waldorf School the past 13 years. Todd recently took a year off from teaching and has been building and remodeling houses. Todd enjoys spending time with his wife Heidi and daughters, Aziza (9) and Nehara (5). In his spare time, Todd likes to play ukulele, sing, mountain bike, box, play board games and surf when he can. Todd looks forward to sharing his love and understanding of Waldorf education with his students and the surrounding community.",
          es: "Todd se unió recientemente a la escuela desde Asheville, Carolina del Norte, donde fue miembro fundador de la Asheville Waldorf School durante los últimos 13 años. Recientemente tomó un año sabático de la enseñanza y se ha dedicado a construir y remodelar casas. Todd disfruta pasar tiempo con su esposa Heidi y sus hijas Aziza (9) y Nehara (5). En su tiempo libre, le gusta tocar el ukelele, cantar, practicar ciclismo de montaña, boxeo, jugar juegos de mesa y surfear cuando puede. Todd espera compartir su amor y comprensión de la educación Waldorf con sus estudiantes y la comunidad.",
        },
      },
      {
        name: "Angelique Metta (Ani)",
        image: "/images/faculty/ani.jpg",
        position: {
          en: "Main lesson and Math Teacher for Grades 5,6 and 7",
          es: "Maestra de Lección Principal y Maestra de Matemáticas de 5to, 6to y 7mo grado",
        },
        bio: {
          en: "Ani grew up in Ohio and began her professional journey studying marketing before serving as a Peace Corps volunteer in Paraguay. She went on to spend 7 years working in community economic development across Latin America. After returning to the United States, Ani earned her Waldorf Teaching Certificate and MEd in Waldorf Education from Antioch University. She then spent five years as a grades teacher at the Honolulu Waldorf School, guiding students through a rich and imaginative curriculum. Ani enjoys reading, writing, hiking, camping, crafting, and long days at the beach. She shares her life with her beloved dog Luka and two cats, and cherishes time spent in good company with friends. Ani brings a deep love for storytelling, culture, and the natural world into her classroom and is excited to be part of this learning community.",
          es: "Ani creció en Ohio y comenzó su carrera profesionalStudying marketing before serving as a Peace Corps volunteer in Paraguay. She went on to spend 7 years working in community economic development across Latin America. After returning to the United States, Ani earned her Waldorf Teaching Certificate and MEd in Waldorf Education from Antioch University. She then spent five years as a grades teacher at the Honolulu Waldorf School, guiding students through a rich and imaginative curriculum. Ani enjoys reading, writing, hiking, camping, crafting, and long days at the beach. She shares her life with her beloved dog Luka and two cats, and cherishes time spent in good company with friends. Ani brings a deep love for storytelling, culture, and the natural world into her classroom and is excited to be part of this learning community.",
        },
      },
      {
        name: "Elvira Espinosa Gil",
        image: "/images/faculty/elvira.jpeg",
        position: { en: "Grades assistant", es: "Asistente de Grados" },
        bio: {
          en: "Elvira is from Burgos in Spain. She has a Bachelors degree in Early Childhood Education from Spain and has spent the last two years working at the MichäelSchool Steiner School Turnhout in Belgium. In her free time Elvira enjoys exploring new places, food and people. She loves to read and would like to take up her childhood hobby of horseback riding.",
          es: "Elvira es originaria de Burgos, España. Tiene una licenciatura en Educación Infantil en España y pasó los últimos dos años trabajando en la MichäelSchool Steiner School en Turnhout, Bélgica. En su tiempo libre disfruta explorar nuevos lugares, comidas y conocer personas. Ama la lectura y le gustaría retomar su afición de la infancia: la equitación.",
        },
      },
    ],
    specialty: [
      {
        name: "Ashley De Regil",
        image: "/images/faculty/ashley.jpg",
        position: { en: "Specialty Teacher", es: "Maestra Especializada" },
        bio: {
          en: "Ashley has a degree in Psychology and Social Work. She has done training in Waldorf Early Childhood Education and trained in Simplicity Parenting, helping families to bring Waldorf inspired rhythms and methods into the home and family life. Ashley is passionate about working with children, sustainability, and community, which is why Waldorf is close to her heart. She has run Waldorf inspired educational projects in different countries and holds regular Simplicity Parenting groups. Ashley has lived in Mexico, Canada, Costa Rica and Israel, but has chosen to raise her family here in Costa Rica, where she also grew up as a child. She is mother to 3 children who all attend our school.",
          es: "Ashley es licenciada en Psicología y Trabajo Social. Ha recibido formación en Educación Infantil Waldorf y en Simplicity Parenting, ayudando a las familias a incorporar los ritmos y métodos inspirados en Waldorf en el hogar y la vida familiar. A Ashley le apasiona trabajar con niños, la sostenibilidad y la comunidad, por lo que Waldorf le toca el corazón. Ha dirigido proyectos educativos inspirados en Waldorf en diferentes países y organiza grupos de Simplicity Parenting. Ashley ha vivido en México, Canadá, Costa Rica e Israel, pero ha decidido criar a su familia aquí en Costa Rica, donde también creció de niña. Es madre de tres hijos que asisten a nuestra escuela.",
        },
      },
      {
        name: "Oscar Vega Castillo",
        image: "/images/faculty/oscar.jpg",
        position: { en: "Music teacher Grades 1-7", es: "Maestro de Música de 1ero a 7mo grado" },
        bio: {
          en: "Oscar Ricardo Vega Castillo graduated with a degree in Music Education from the National University of Costa Rica (UNA). Currently, his bachelor's degree project is active: a songbook of original music for elementary school anniversaries. He has 20 years of experience in music education from preschool to high school in public and private institutions. He specializes in singing and instrumental performance, as well as the formation and direction of musical ensembles. He has participated as a musician and director on folk music tours in Europe and Latin America. He has participated in the recording of several albums as an arranger, composer, singer, and saxophonist. He currently teaches specialized classes for instrumentalists and singing.",
          es: "Oscar Ricardo Vega Castillo se graduó en Educación Musical en la Universidad Nacional de Costa Rica (UNA). Actualmente, su proyecto de licenciatura sigue activo: un cancionero de música original para aniversarios escolares de primaria. Cuenta con 20 años de experiencia en educación musical, desde preescolar hasta secundaria, en instituciones públicas y privadas. Se especializa en canto y ejecución instrumental, así como en la formación y dirección de ensambles musicales. Ha participado como músico y director en giras de música folclórica por Europa y América Latina. Además, ha colaborado en la grabación de varios álbumes como arreglista, compositor, cantante y saxofonista. Actualmente imparte clases especializadas para instrumentistas y canto.",
        },
      },
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
            <div
              id="elvira"
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <Image
                  src="/images/faculty/elvira.jpeg"
                  alt="Elvira Espinosa Gil"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Elvira Espinosa Gil</h3>
                <p className="text-blue-600 font-medium mb-4">
                  {language === "en" ? "Grades assistant" : "Asistente de Grados"}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {language === "en"
                    ? "Elvira is from Burgos in Spain. She has a Bachelors degree in Early Childhood Education from Spain and has spent the last two years working at the MichäelSchool Steiner School Turnhout in Belgium. In her free time Elvira enjoys exploring new places, food and people. She loves to read and would like to take up her childhood hobby of horseback riding."
                    : "Elvira es originaria de Burgos, España. Tiene una licenciatura en Educación Infantil en España y pasó los últimos dos años trabajando en la MichäelSchool Steiner School en Turnhout, Bélgica. En su tiempo libre disfruta explorar nuevos lugares, comidas y conocer personas. Ama la lectura y le gustaría retomar su afición de la infancia: la equitación."}
                </p>
              </div>
            </div>
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
                    className={`w-full h-full object-cover hover:scale-105 transition-transform duration-300 ${["Carrie Lawson", "Oscar Vega Castillo"].includes(member.name) ? "object-top" : ""}`}
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
