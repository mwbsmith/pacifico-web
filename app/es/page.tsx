"use client"

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
  Sun,
  Leaf,
  Heart,
  User,
  Hand,
  Download,
  Clock,
  Globe,
  ChevronDown,
  Menu,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function PacificoHomepageES() {
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-emerald-50 to-amber-50">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden min-h-[80vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/waldorf-classroom.jpg"
            alt="Aula Waldorf con estudiantes aprendiendo"
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
              {/* Left spacer */}
              <div className="w-8"></div>

              {/* Header Logo - appears when scrolled */}
              <div
                className="absolute left-1/2 transform -translate-x-1/2 transition-opacity duration-300"
                style={{ opacity: headerLogoOpacity }}
              >
                <Image
                  src="/images/pacifico-logo.png"
                  alt="Pacifico Internacional - Educación Inspirada en Waldorf"
                  width={100}
                  height={100}
                  className="drop-shadow-lg w-[60px] h-[60px] md:w-[100px] md:h-[100px]"
                />
              </div>

              {/* Desktop Navigation and Language Selector */}
              <div className="hidden md:flex items-center space-x-6">
                <Link href="#about" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                  Nosotros
                </Link>
                <Link href="#calendar" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                  Calendario
                </Link>
                <Link href="#contact" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                  Contacto
                </Link>

                {/* Language Selector */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:text-yellow-200 hover:bg-white/10 flex items-center gap-2 drop-shadow-md"
                    >
                      <Globe className="h-4 w-4" />
                      <span>ES</span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white border border-gray-200">
                    <DropdownMenuItem asChild className="flex items-center gap-2 cursor-pointer hover:bg-gray-50">
                      <Link href="/">
                        <span className="text-lg">🇺🇸</span>
                        <span>English</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-gray-50">
                      <span className="text-lg">🇪🇸</span>
                      <span>Español</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Mobile Menu */}
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
                          alt="Pacifico Internacional"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <h3 className="font-bold text-gray-800">Pacifico Internacional</h3>
                          <p className="text-sm text-gray-600">Educación Inspirada en Waldorf</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <button
                          onClick={() => handleNavClick("#about")}
                          className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                        >
                          Nosotros
                        </button>
                        <button
                          onClick={() => handleNavClick("#calendar")}
                          className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                        >
                          Calendario
                        </button>
                        <button
                          onClick={() => handleNavClick("#contact")}
                          className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                        >
                          Contacto
                        </button>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-sm font-semibold text-gray-700 mb-3">Language / Idioma</p>
                        <div className="space-y-2">
                          <Link
                            href="/"
                            className="flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <span className="text-xl">🇺🇸</span>
                            <span className="text-gray-800">English</span>
                          </Link>
                          <button className="flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-gray-100 transition-colors">
                            <span className="text-xl">🇪🇸</span>
                            <span className="text-gray-800">Español</span>
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
              <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Descubre Waldorf en el
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-green-300">
                  {" "}
                  Océano y la Selva
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
                    alt="Pacifico Internacional - Educación Inspirada en Waldorf"
                    width={250}
                    height={250}
                    className="drop-shadow-2xl w-[150px] h-[150px] md:w-[250px] md:h-[250px]"
                  />
                </div>
              </div>

              <p className="text-xl md:text-2xl text-gray-100 leading-relaxed">
                En nuestra escuela inspirada en Waldorf en Costa Rica, cultivamos la imaginación, creatividad y amor por
                el aprendizaje en un ambiente natural y nutritivo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-gray-900 bg-transparent backdrop-blur-sm"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Programar una Visita o Llamar
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative elements - Fixed positioning */}
        <div className="fixed top-20 left-4 md:left-10 text-yellow-400/70 opacity-60 z-50">
          <div className="text-3xl md:text-4xl animate-bounce">🐒</div>
        </div>
        <div className="absolute bottom-10 right-4 md:right-10 text-orange-400/70 opacity-60 z-10">
          <div className="text-4xl md:text-5xl animate-pulse">🐵</div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gradient-to-r from-emerald-100 to-teal-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-green-600" />
              <h2 className="text-4xl font-bold text-gray-800">Sobre Nuestra Escuela</h2>
              <Waves className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Somos una escuela inspirada en Waldorf, ubicada en el pueblo de Cañafístula cerca de Tamarindo en
              Guanacaste, Costa Rica. Con raíces en la Pedagogía Waldorf de Rudolf Steiner, brindamos a los niños desde
              preescolar hasta séptimo grado una educación bilingüe que construye propósito, confianza y conexión
              mientras fomenta el amor por el aprendizaje.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto bg-blue-500 text-white p-3 rounded-full w-fit mb-4">
                  <User className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl text-blue-700">Cabeza</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  Desarrollando habilidades cognitivas a través de académicos apropiados para la edad, pensamiento
                  crítico y curiosidad intelectual. Nuestro currículo honra los ritmos naturales de aprendizaje y las
                  etapas de desarrollo.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto bg-green-500 text-white p-3 rounded-full w-fit mb-4">
                  <Heart className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl text-green-700">Corazón</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  Nutriendo la inteligencia emocional, expresión artística y conexión social. Cultivamos empatía,
                  creatividad y una profunda apreciación por la belleza y las relaciones humanas.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto bg-yellow-500 text-white p-3 rounded-full w-fit mb-4">
                  <Hand className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl text-yellow-700">Manos</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  Participando en habilidades de vida práctica, artesanías y experiencias de aprendizaje práctico. Los
                  estudiantes desarrollan destreza, confianza y conexión con el mundo físico a través del trabajo
                  significativo.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section id="calendar" className="py-16 bg-gradient-to-r from-blue-100 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <Calendar className="h-8 w-8 text-purple-600" />
              <h2 className="text-4xl font-bold text-gray-800">Calendario Escolar</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button
                asChild
                className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white shadow-lg"
              >
                <a
                  href="https://calendar.google.com/calendar/embed?src=93e6bc2fe2660ddcc925e876ff13dd04394372fc3d48130f6617c431e92dbbd6%40group.calendar.google.com&ctz=America%2FCosta_Rica"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Ver Calendario Completo
                </a>
              </Button>
              <Button
                variant="outline"
                className="border-2 border-purple-500 text-purple-700 hover:bg-purple-50 bg-transparent"
              >
                <Download className="mr-2 h-5 w-5" />
                Descargar Calendario Imprimible
              </Button>
            </div>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-pink-200 shadow-lg">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="flex flex-row sm:flex-col items-center sm:items-center text-pink-600 min-w-[80px]">
                    <div className="text-3xl sm:text-4xl font-bold mr-2 sm:mr-0">18</div>
                    <div className="text-sm font-semibold">AGO</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-pink-700 mb-2 break-words">
                      Grados 1 y 2 Conoce a tu Maestra
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 flex-shrink-0" />
                        <span className="break-words">10:00 AM - 12:00 PM</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4 flex-shrink-0" />
                        <span className="break-words">Grados 1 y 2</span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base break-words">
                      Padres, por favor vengan con sus estudiantes de 1° y 2° grado para conocer a su maestra.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-2 border-blue-200 shadow-lg">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="flex flex-row sm:flex-col items-center sm:items-center text-blue-600 min-w-[80px]">
                    <div className="text-3xl sm:text-4xl font-bold mr-2 sm:mr-0">18</div>
                    <div className="text-sm font-semibold">AGO</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-blue-700 mb-2 break-words">
                      Reunión de Todos los Padres
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 flex-shrink-0" />
                        <span className="break-words">3:00 PM - 4:30 PM</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4 flex-shrink-0" />
                        <span className="break-words">Todos los Padres</span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base break-words">
                      Al menos un padre de cada familia debe asistir a la primera reunión informativa.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-200 shadow-lg">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="flex flex-row sm:flex-col items-center sm:items-center text-green-600 min-w-[80px]">
                    <div className="text-3xl sm:text-4xl font-bold mr-2 sm:mr-0">19</div>
                    <div className="text-sm font-semibold">AGO</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-green-700 mb-2 break-words">
                      ¡Primer Día de Grados!
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Sun className="h-4 w-4 flex-shrink-0" />
                        <span className="break-words">Todo el Día</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4 flex-shrink-0" />
                        <span className="break-words">Grados 1 y 2</span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base break-words">Primer día de clases.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-2 border-yellow-200 shadow-lg">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="flex flex-row sm:flex-col items-center sm:items-center text-yellow-600 min-w-[80px]">
                    <div className="text-3xl sm:text-4xl font-bold mr-2 sm:mr-0">19</div>
                    <div className="text-sm font-semibold">AGO</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-yellow-700 mb-2 break-words">
                      Kínder Conoce a tu Maestra
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 flex-shrink-0" />
                        <span className="break-words">10:00 AM - 12:00 PM</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4 flex-shrink-0" />
                        <span className="break-words">Kínder</span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base break-words">
                      Padres, por favor vengan con su niño de kínder para conocer a su maestra.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-lg">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="flex flex-row sm:flex-col items-center sm:items-center text-purple-600 min-w-[80px]">
                    <div className="text-3xl sm:text-4xl font-bold mr-2 sm:mr-0">20</div>
                    <div className="text-sm font-semibold">AGO</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-purple-700 mb-2 break-words">
                      ¡Primer Día de Kínder!
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Sun className="h-4 w-4 flex-shrink-0" />
                        <span className="break-words">Todo el Día</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4 flex-shrink-0" />
                        <span className="break-words">Kínder</span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base break-words">Primer día de clases.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-2 border-orange-200 shadow-lg">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="flex flex-row sm:flex-col items-center sm:items-center text-orange-600 min-w-[80px]">
                    <div className="text-3xl sm:text-4xl font-bold mr-2 sm:mr-0">15</div>
                    <div className="text-sm font-semibold">SEP</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-orange-700 mb-2 break-words">
                      Día de la Independencia de Costa Rica
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Leaf className="h-4 w-4 flex-shrink-0" />
                        <span className="break-words">Feriado</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4 flex-shrink-0" />
                        <span className="break-words">Todos los Estudiantes</span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base break-words">No hay clases.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gradient-to-r from-teal-100 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <Mail className="h-8 w-8 text-teal-600" />
              <h2 className="text-4xl font-bold text-gray-800">Contáctanos</h2>
            </div>
            <p className="text-xl text-gray-600">
              Nos encantaría dar la bienvenida a tu familia a nuestra comunidad de aprendizaje
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-teal-200">
                <CardHeader>
                  <CardTitle className="text-2xl text-teal-700">Visita Nuestro Campus</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-6 w-6 text-teal-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">Dirección</p>
                      <p className="text-gray-600">
                        300m oeste y 50 m norte Eco lodge El Sabanero
                        <br />
                        Cañafístula, Villareal
                        <br />
                        Santa Cruz, Guanacaste
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="h-6 w-6 text-teal-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">Teléfono</p>
                      <p className="text-gray-600">+506 8762 6927</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="h-6 w-6 text-teal-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">Correo Electrónico</p>
                      <p className="text-gray-600">
                        info@waldorf.cr
                        <br />
                        admissions@waldorf.cr
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-teal-50 border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-700">Horarios Escolares</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-gray-600">
                    <p>
                      <span className="font-semibold">Grados (Lunes - Viernes):</span> 8:00 AM - 2:15 PM
                    </p>
                    <p>
                      <span className="font-semibold">Kínder (Lunes - Viernes):</span> 8:00 AM - 1:00 PM
                    </p>
                    <p>
                      <span className="font-semibold">Cuidado Extendido (Kínder):</span> Hasta las 2:15 PM
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-700">Envíanos un Mensaje</CardTitle>
                <CardDescription>Te responderemos dentro de 24 horas</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                      <Input placeholder="Tu nombre" className="border-2 border-gray-200 focus:border-teal-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
                      <Input placeholder="Tu apellido" className="border-2 border-gray-200 focus:border-teal-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                    <Input
                      type="email"
                      placeholder="tu.correo@ejemplo.com"
                      className="border-2 border-gray-200 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Edad del Niño</label>
                    <Input placeholder="Edad de tu hijo/a" className="border-2 border-gray-200 focus:border-teal-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
                    <Textarea
                      placeholder="Cuéntanos sobre tu interés en nuestra escuela..."
                      className="border-2 border-gray-200 focus:border-teal-500 min-h-[120px]"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white">
                    <Mail className="mr-2 h-5 w-5" />
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/images/pacifico-logo.png"
                  alt="Pacifico Internacional"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <h3 className="text-xl font-bold">Pacifico Internacional</h3>
                  <p className="text-sm text-gray-300">Educación Inspirada en Waldorf</p>
                </div>
              </div>
              <p className="text-gray-300">
                Nutriendo mentes jóvenes a través de educación holística basada en la naturaleza que honra el viaje
                único de cada niño.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="#about" className="hover:text-teal-300 transition-colors">
                    Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="#calendar" className="hover:text-teal-300 transition-colors">
                    Calendario Escolar
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-teal-300 transition-colors">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Conéctate con Nosotros</h4>
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
                  <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Ubicación en Google Maps">
                    <Image src="/icons/google-maps.png" alt="Google Maps" width={32} height={32} className="w-8 h-8" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Pacifico Internacional. Todos los derechos reservados. | Nutriendo
              mentes, corazones y manos.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
