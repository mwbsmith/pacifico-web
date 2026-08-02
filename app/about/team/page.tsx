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
        name: "Claudia Verónica Barrientos",
        image: "/images/faculty/claudia.jpeg",
        position: { en: "Kindergarten Main Teacher", es: "Maestra Principal de Kindergarten" },
        bio: {
          en: "Claudia grew up in El Salvador, where she worked for over two decades in film, photojournalism, and institutional communications. In 2014, following the birth of her son Inti, she discovered Waldorf education, a turning point that led her toward a new vocation. Driven by a desire to protect the purity of childhood in the face of a hyper-technological world, she decided to put down the camera lens and channel her storytelling skills into the art of supporting child development.\n\nIn 2018, she was a founding parent of the Casa Nuyulu Waldorf Initiative in El Salvador, the community where her children, Inti and Citlalli, grew up. Within this community, she took on multiple roles, including documenting school activities through photography and video, leading craft workshops, coordinating institutional communications, and facilitating a volunteer-based parenting group for mothers and babies. In the classroom, she served as a Nursery (Maternal) Teacher, holding the daily rhythm for the youngest children.\n\nCommitted to her own ongoing education, she completed her comprehensive Waldorf teacher training with the Centro Humanístico Micael (Colombia) and the Comunidad Turmalina (Peru), in addition to taking short courses on anthroposophical topics such as biodynamic agriculture and primary-level crafts.\n\nGuided by a commitment to her children's path and her own, she sought a school that would allow them to continue their Waldorf education—a sacred calling that brought her to Costa Rica to join Pacífico Internacional. In her free time, she enjoys volleyball, nature, the beach, hiking, and crafts; she is also dedicated to promoting a healthier, more harmonious lifestyle through organic food and reconnecting with her ancestral Indigenous roots.",
          es: "Claudia creció en El Salvador, donde trabajó durante más de dos décadas en el cine, el fotoperiodismo y las comunicaciones institucionales. En 2014, tras el nacimiento de su hijo Inti, descubrió la educación Waldorf, un punto de inflexión que la llevó hacia una nueva vocación. Impulsada por el deseo de proteger la pureza de la infancia frente a un mundo hipertecnológico, decidió dejar la lente de la cámara y canalizar sus habilidades narrativas hacia el arte de acompañar el desarrollo infantil.\n\nEn 2018, fue madre fundadora de la Iniciativa Waldorf Casa Nuyulu en El Salvador, la comunidad donde crecieron sus hijos, Inti y Citlalli. Dentro de esta comunidad, asumió múltiples roles, incluyendo documentar las actividades escolares a través de la fotografía y el video, dirigir talleres de manualidades, coordinar las comunicaciones institucionales y facilitar un grupo de crianza voluntario para madres y bebés. En el aula, se desempeñó como Maestra de Maternal, sosteniendo el ritmo diario para los más pequeños.\n\nComprometida con su propia formación continua, completó su formación integral como maestra Waldorf con el Centro Humanístico Micael (Colombia) y la Comunidad Turmalina (Perú), además de tomar cursos cortos sobre temas antroposóficos como la agricultura biodinámica y las manualidades de nivel primario.\n\nGuiada por el compromiso con el camino de sus hijos y el suyo propio, buscó una escuela que les permitiera continuar su educación Waldorf, un llamado sagrado que la trajo a Costa Rica para unirse a Pacífico Internacional. En su tiempo libre disfruta del voleibol, la naturaleza, la playa, el senderismo y las manualidades; también se dedica a promover un estilo de vida más saludable y armonioso a través de la alimentación orgánica y la reconexión con sus raíces indígenas ancestrales.",
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
      {
        name: "Hila Fux",
        image: "/images/faculty/hila.jpeg",
        position: { en: "Kindergarten Assistant Teacher", es: "Maestra Asistente de Kindergarten" },
        bio: {
          en: "Ms. Hila's journey in education has taken her across countries and cultures, always guided by a love for young children and a desire to understand their unique path of development. With more than 20 years of experience working with children in Israel and Canada, she brings warmth, curiosity, and a deep respect for childhood to her work.\n\nWhile beginning her Bachelor of Education studies, Hila discovered Anthroposophy as she searched for a deeper understanding of child development and the human being. That discovery became a lifelong path, leading her to complete her Foundation Studies in Anthroposophy in Jerusalem more than 20 years ago. After making Canada her home, she also completed her Early Childhood Education diploma, weaving together her academic studies with years of hands-on experience in early childhood education.\n\nHila joined Toronto Waldorf School in 2018 and over the next eight wonderful years, she found not only a place to teach but also a community in which to grow. As both a teacher and a parent, she experienced the richness of Waldorf education as her two children journeyed through the school alongside her.\n\nNow, Hila is looking forward to a new adventure as she joins Pacifico Internacional. She is excited to become part of the school community and to continue supporting young children as they learn, play, imagine, and grow. Hila loves spending time in nature, whether hiking forest trails or camping under the stars. She also enjoys handwork, finding peace and inspiration in creating with her hands, baking and reading.",
          es: "El camino de Ms. Hila en la educación la ha llevado a través de países y culturas, siempre guiada por el amor a los niños pequeños y el deseo de comprender su singular camino de desarrollo. Con más de 20 años de experiencia trabajando con niños en Israel y Canadá, aporta calidez, curiosidad y un profundo respeto por la infancia a su labor.\n\nMientras comenzaba sus estudios de Licenciatura en Educación, Hila descubrió la Antroposofía en su búsqueda de una comprensión más profunda del desarrollo infantil y del ser humano. Ese descubrimiento se convirtió en un camino de vida, llevándola a completar sus Estudios de Fundamento en Antroposofía en Jerusalén hace más de 20 años. Tras establecer su hogar en Canadá, también completó su diploma en Educación Inicial, entrelazando sus estudios académicos con años de experiencia práctica en la primera infancia.\n\nHila se unió a la Toronto Waldorf School en 2018 y, durante los ocho maravillosos años siguientes, encontró no solo un lugar para enseñar, sino también una comunidad en la cual crecer. Como maestra y madre, vivió la riqueza de la educación Waldorf mientras sus dos hijos recorrían la escuela junto a ella.\n\nAhora, Hila espera con ilusión una nueva aventura al unirse a Pacífico Internacional. Le entusiasma formar parte de la comunidad escolar y continuar acompañando a los niños pequeños mientras aprenden, juegan, imaginan y crecen. A Hila le encanta pasar tiempo en la naturaleza, ya sea caminando por senderos del bosque o acampando bajo las estrellas. También disfruta del trabajo manual, encontrando paz e inspiración al crear con sus manos, hornear y leer.",
        },
      },
    ],
    grades: [
      {
        name: "Elvira Espinosa Gil",
        image: "/images/faculty/elvira.jpeg",
        position: { en: "Main Teacher Grade 1", es: "Maestra Principal de 1er Grado" },
        bio: {
          en: "Elvira is from Burgos in Spain. She holds a Bachelors degree in Early Childhood Education from Spain and worked at the MichäelSchool Steiner School Turnhout in Belgium for two years before moving to Costa Rica. Elvira joined the Pacifico Internacional faculty in August 2025, initially as a Grades Assistant before she took over as the Main Teacher for the combined Grade 1 and 2 class during the second semester. She has also completed a summer intensive Waldorf course through the Sunbridge Institute in New York.\n\nIn her free time Elvira enjoys exploring new places, food and people. She loves to read, surf and spend time with horses.",
          es: "Elvira es originaria de Burgos, España. Tiene una licenciatura en Educación Infantil de España y trabajó en la MichäelSchool Steiner School Turnhout en Bélgica durante dos años antes de mudarse a Costa Rica. Elvira se unió al equipo docente de Pacífico Internacional en agosto de 2025, inicialmente como Asistente de Grados antes de asumir como Maestra Principal de la clase combinada de 1er y 2do grado durante el segundo semestre. También completó un curso intensivo de verano de Waldorf a través del Sunbridge Institute en Nueva York.\n\nEn su tiempo libre, Elvira disfruta explorar nuevos lugares, comidas y conocer personas. Le encanta leer, surfear y pasar tiempo con caballos.",
        },
      },
      {
        name: "Katy Thompson",
        image: "/images/faculty/katy.jpeg",
        position: {
          en: "Main Teacher Grades 2/3 and English Teacher Grade 1",
          es: "Maestra Principal de 2do/3er Grado y Maestra de Inglés de 1er Grado",
        },
        bio: {
          en: "Katy approaches teaching as both an art and a relationship. Katy holds a MEd in Elementary Education from the University of Fairbanks and has completed a summer intensive Waldorf course through the Sunbridge Institute in New York. With over seven years of classroom experience, she is devoted to creating a warm, rhythmic classroom environment where children feel a sense of belonging, wonder, and joy in learning. She brings a deep respect for each child's developmental journey, weaving storytelling, creativity, movement, and connection to nature into her teaching.\n\nHer experience as a 4th grade teacher in a diverse classroom, along with her work in Montessori and community education, has shaped her holistic approach—one that honors imagination, nurtures social-emotional growth, and supports each learner with care and intention. Katy values the balance of structure and flexibility, meeting students where they are while gently guiding them forward.\n\nHaving been raised between the islands of Hawai'i and the landscapes of Alaska, Katy carries a strong connection to place, culture, and the natural world. She is inspired by the spirit of global education and is grateful for the opportunity to contribute to the learning community at Pacifico Internacional, where she hopes to cultivate curiosity, creativity, and a deep sense of connection in her students.",
          es: "Katy concibe la enseñanza como un arte y una relación. Posee una Maestría en Educación Primaria de la Universidad de Fairbanks y ha completado un curso intensivo de verano de Waldorf a través del Sunbridge Institute en Nueva York. Con más de siete años de experiencia en el aula, se dedica a crear un ambiente cálido y rítmico donde los niños sienten pertenencia, asombro y alegría por aprender. Aporta un profundo respeto por el camino de desarrollo de cada niño, entretejiendo la narración, la creatividad, el movimiento y la conexión con la naturaleza en su enseñanza.\n\nSu experiencia como maestra de cuarto grado en un aula diversa, junto con su trabajo en educación Montessori y comunitaria, ha moldeado su enfoque holístico, uno que honra la imaginación, nutre el crecimiento socioemocional y apoya a cada estudiante con cuidado e intención. Katy valora el equilibrio entre estructura y flexibilidad, encontrando a los estudiantes donde están y guiándolos suavemente hacia adelante.\n\nHabiéndose criado entre las islas de Hawái y los paisajes de Alaska, Katy lleva consigo una fuerte conexión con el lugar, la cultura y el mundo natural. Se inspira en el espíritu de la educación global y está agradecida por la oportunidad de contribuir a la comunidad de aprendizaje de Pacífico Internacional, donde espera cultivar la curiosidad, la creatividad y un profundo sentido de conexión en sus estudiantes.",
        },
      },
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
          es: "Ani creció en Ohio y comenzó su trayectoria profesional estudiando mercadeo antes de servir como voluntaria del Cuerpo de Paz en Paraguay. Posteriormente pasó 7 años trabajando en desarrollo económico comunitario en toda América Latina. Tras regresar a los Estados Unidos, Ani obtuvo su Certificado de Enseñanza Waldorf y una Maestría en Educación Waldorf de la Universidad de Antioch. Luego se desempeñó durante cinco años como maestra de grado en la Honolulu Waldorf School, guiando a sus estudiantes a través de un currículo rico e imaginativo. Ani disfruta leer, escribir, hacer senderismo, acampar, hacer manualidades y pasar largos días en la playa. Comparte su vida con su querido perro Luka y dos gatos, y valora el tiempo que pasa en buena compañía con sus amistades. Ani lleva a su aula un profundo amor por la narración, la cultura y el mundo natural, y está entusiasmada de formar parte de esta comunidad de aprendizaje.",
        },
      },
      {
        name: "Amrita",
        image: "/images/faculty/amrita.jpeg",
        position: {
          en: "English Teacher Middle School, Assistant Teacher Lower Grades",
          es: "Maestra de Inglés de Secundaria, Maestra Asistente de Grados Inferiores",
        },
        bio: {
          en: "Amrita was born in the magical mountains of New Mexico but has called many places home over the years. Her family moved to Milwaukee, Wisconsin when she was young, and it was there that her Waldorf journey began. She attended Tamarack Waldorf School from kindergarten through fourth grade. When her family relocated to Boulder, Colorado, she continued her education at Shining Mountain Waldorf School, from fifth grade through high school.\n\nFrom the very start of her Waldorf education, Amrita felt a deep connection to anthroposophy, something that has stayed with her ever since. Since 2019, she has helped shape and lead Waldorf summer camps based in the Midwest US, serving as both a counselor and board member.\n\nAmrita holds a Master's degree in Community Development and Applied Economics, and she's passionate about inspiring others to think and live in ways that benefit not just humanity, but all beings of the earth.\n\nOutside of work, she loves hiking, swimming, laughing often, and spending time with her family.",
          es: "Amrita nació en las mágicas montañas de Nuevo México, pero ha tenido muchos hogares a lo largo de los años. Su familia se mudó a Milwaukee, Wisconsin, cuando era pequeña, y fue allí donde comenzó su camino Waldorf. Asistió a la Tamarack Waldorf School desde kindergarten hasta cuarto grado. Cuando su familia se trasladó a Boulder, Colorado, continuó su educación en la Shining Mountain Waldorf School, desde quinto grado hasta la secundaria.\n\nDesde el inicio de su educación Waldorf, Amrita sintió una profunda conexión con la antroposofía, algo que la ha acompañado desde entonces. Desde 2019, ha ayudado a dar forma y dirigir campamentos de verano Waldorf en el medio oeste de los Estados Unidos, desempeñándose como consejera y miembro de la junta.\n\nAmrita posee una Maestría en Desarrollo Comunitario y Economía Aplicada, y le apasiona inspirar a otros a pensar y vivir de maneras que beneficien no solo a la humanidad, sino a todos los seres de la tierra.\n\nFuera del trabajo, le encanta el senderismo, la natación, reír a menudo y pasar tiempo con su familia.",
        },
      },
    ],
    specialty: [
      {
        name: "Carrie Lawson",
        image: "/images/faculty/carrie.jpeg",
        position: {
          en: "Specialty Teacher - Handwork Grades 1-8",
          es: "Maestra Especializada - Manualidades de 1ero a 8vo grado",
        },
        bio: {
          en: "Carrie started teaching Waldorf handwork in 2018 at the Guanacaste Waldorf School and has a certification from Waldorf Handwork Educators. Through working with children, she has come to an understanding of the vital role that handwork plays in the brain development of each child. She has seen in her students and in her own children how beneficial handwork techniques are in developing mathematical, handwriting and problem solving skills. In her spare time she enjoys traveling and learning about textiles from around the world and creating handmade gifts and clothing.",
          es: "Carrie comenzó a enseñar manualidades Waldorf en 2018 en la Escuela Waldorf de Guanacaste y cuenta con una certificación de Waldorf Handwork Educators. A través del trabajo con niños, ha comprendido el papel fundamental que las manualidades juegan en el desarrollo cerebral de cada niño. Ha podido observar, tanto en sus estudiantes como en sus propios hijos, cuán beneficiosas son estas técnicas para el desarrollo de habilidades matemáticas, escritura y resolución de problemas. En su tiempo libre disfruta viajar, aprender sobre textiles de todo el mundo y crear regalos y prendas hechas a mano.",
        },
      },
      {
        name: "Jesua Moisés Esquivel Rodríguez",
        image: "/images/faculty/jesua.jpg",
        position: { en: "Specialty Teacher - Music", es: "Maestro Especializado - Música" },
        bio: {
          en: "Professor Jesua Esquivel is from Turrialba, Costa Rica, a region known for its rich indigenous, cultural, artistic, and musical heritage.\n\nHe earned an honor degree in Music Education from the University of Costa Rica and has been teaching in different musical and artistic contexts since 2020. His experience in both formal and independent education has allowed him to improve teaching methods tailored to a variety of settings, developing a comprehensive approach to music education that inspires students at all levels.\n\nJesua specializes in guitar playing and has developed social action projects focused on teaching guitar to children and teenagers in different parts of the country. He has built a solid career based on a deep passion for teaching and artistic excellence.\n\nCurrently the guitarist for the political rock band SEKA, he has represented the country at various music festivals and cultural summits around the world as both a guitarist and an educator.\n\n“La música es libertad y la enseñanza de la música transmite las herramientas para ser libres” — J. Esquivel (2026)",
          es: "El profesor Jesua Esquivel es de Turrialba, Costa Rica, una región conocida por su rica herencia indígena, cultural, artística y musical.\n\nObtuvo un título con honores en Educación Musical de la Universidad de Costa Rica y ha enseñado en diferentes contextos musicales y artísticos desde 2020. Su experiencia en la educación tanto formal como independiente le ha permitido perfeccionar métodos de enseñanza adaptados a una variedad de entornos, desarrollando un enfoque integral de la educación musical que inspira a estudiantes de todos los niveles.\n\nJesua se especializa en la ejecución de la guitarra y ha desarrollado proyectos de acción social enfocados en enseñar guitarra a niños y adolescentes en diferentes partes del país. Ha construido una carrera sólida basada en una profunda pasión por la enseñanza y la excelencia artística.\n\nActualmente guitarrista de la banda de rock político SEKA, ha representado al país en diversos festivales musicales y cumbres culturales alrededor del mundo, tanto como guitarrista como educador.\n\n“La música es libertad y la enseñanza de la música transmite las herramientas para ser libres” — J. Esquivel (2026)",
        },
      },
      {
        name: "Tyler Calvert-Thompson",
        image: "/images/faculty/tyler.jpeg",
        position: {
          en: "Specialty Teacher - Art, Woodwork and Physical Education Grades 1-8",
          es: "Maestro Especializado - Arte, Carpintería y Educación Física de 1ero a 8vo grado",
        },
        bio: {
          en: "Tyler grew up in the great Hawkeye state of Iowa, in the central United States. Athletics played a major role throughout his youth: he was involved in baseball, football, basketball, track & field, and wrestling. When high school rolled around, he began to shift his focus toward the sport of wrestling, one he continued to pursue through college and into coaching. His interest in the visual arts started with observational drawings of his Hot Wheels cars, which progressed to drawing his own hands, and eventually to more and more challenging subject matter and media.\n\nDuring his middle and high school years, his mother became the director of the local daycare, which gave him his first introduction to the world of early childhood education. That interest grew into a passion that carried through his bachelor's degree, where he combined it with his growing love of the visual arts. After four years of college, Mr. Thompson graduated with a degree in Studio Art and a K-12 teaching certification.\n\nMr. Thompson taught for one year in his home state before moving to Alaska to join his now wife. Over the past 12 years there, he has taught and coached a wide range of subjects and activities: art, yearbook, PE, wrestling, Native Youth Olympics, football, and anything else he could do to help around the schools.",
          es: "Tyler creció en el gran estado de Iowa, en el centro de los Estados Unidos. El deporte jugó un papel importante durante su juventud: practicó béisbol, fútbol americano, baloncesto, atletismo y lucha libre. Al llegar a la secundaria, comenzó a enfocarse en la lucha libre, deporte que continuó practicando durante la universidad y luego como entrenador. Su interés por las artes visuales comenzó con dibujos de observación de sus carritos Hot Wheels, que progresaron al dibujo de sus propias manos y, finalmente, a temas y medios cada vez más desafiantes.\n\nDurante sus años de secundaria, su madre se convirtió en directora de la guardería local, lo que le dio su primera introducción al mundo de la educación infantil. Ese interés se convirtió en una pasión que lo acompañó durante su licenciatura, donde lo combinó con su creciente amor por las artes visuales. Tras cuatro años de universidad, el Sr. Thompson se graduó con un título en Arte de Estudio y una certificación docente K-12.\n\nEl Sr. Thompson enseñó durante un año en su estado natal antes de mudarse a Alaska para reunirse con quien ahora es su esposa. Durante los últimos 12 años allí, ha enseñado y entrenado una amplia variedad de materias y actividades: arte, anuario, educación física, lucha libre, Native Youth Olympics, fútbol americano y todo lo que pudiera hacer para ayudar en las escuelas.",
        },
      },
      {
        name: "Oliver Ramming",
        image: "/images/faculty/ollie.png",
        position: {
          en: "Specialty Teacher - Gardening and Cooking Grades 1-8",
          es: "Maestro Especializado - Jardinería y Cocina de 1ero a 8vo grado",
        },
        bio: {
          en: "Oliver grew up on a small farm in Asheville, Western North Carolina and earned a Bachelors of Science degree from the University of Vermont's Rubenstein School of Natural Sciences. In addition to his schooling in parks recreation and tourism, he has studied and been certified in Wilderness EMT, Swiftwater rescue, and Avalanche rescue. He has worked as a bike mechanic, whitewater kayaking instructor, ski guide, farmer, and cook. He is passionate about using his experience in outdoor recreation and the farm to table food business to help create a more well rounded and engaging school experience here at Pacifico Internacional. Oliver also loves visual arts in his free time and is enchanted with all of the animals of Costa Rica, especially his dog Murphy!",
          es: "Oliver creció en una pequeña granja en Asheville, al oeste de Carolina del Norte, y obtuvo una Licenciatura en Ciencias de la Rubenstein School of Natural Sciences de la Universidad de Vermont. Además de su formación en recreación de parques y turismo, ha estudiado y obtenido certificaciones en Wilderness EMT, rescate en aguas rápidas y rescate en avalanchas. Ha trabajado como mecánico de bicicletas, instructor de kayak en aguas bravas, guía de esquí, agricultor y cocinero. Le apasiona utilizar su experiencia en recreación al aire libre y en el negocio gastronómico de la granja a la mesa para ayudar a crear una experiencia escolar más completa y atractiva aquí en Pacífico Internacional. En su tiempo libre, a Oliver también le encantan las artes visuales y está encantado con todos los animales de Costa Rica, ¡especialmente su perro Murphy!",
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
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{member.bio[language]}</p>
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
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{member.bio[language]}</p>
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
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{member.bio[language]}</p>
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
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{member.bio[language]}</p>
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
