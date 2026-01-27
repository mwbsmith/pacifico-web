"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Globe,
  ChevronDown,
  Menu,
  GraduationCap,
  ArrowLeft,
  FileText,
  Users,
  Baby,
  School,
  Home,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"

export default function ApplicationPage() {
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [tuitionOpen, setTuitionOpen] = useState(false)
  const tuitionRef = useRef<HTMLDivElement>(null)

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

  return (
    <div id="top" className="min-h-screen bg-gradient-to-br from-sky-100 via-emerald-50 to-amber-50">
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
              {/* Left spacer */}
              <div className="w-8"></div>

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
                <Link href="/#about" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                  About
                </Link>
                <Link href="/#admissions" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                  Admissions
                </Link>
                <Link href="/#calendar" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                  Calendar
                </Link>
                <Link href="/#contact" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                  Contact
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
                      <span>EN</span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white border border-gray-200">
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-gray-50">
                      <span className="text-lg">🇺🇸</span>
                      <span>English</span>
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
                          className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          About
                        </Link>
                        <Link
                          href="/#admissions"
                          className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Admissions
                        </Link>
                        <Link
                          href="/#calendar"
                          className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Calendar
                        </Link>
                        <Link
                          href="/#contact"
                          className="block w-full text-left text-lg text-gray-800 hover:text-teal-600 transition-colors py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Contact
                        </Link>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-sm font-semibold text-gray-700 mb-3">Language / Idioma</p>
                        <div className="space-y-2">
                          <button className="flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-gray-100 transition-colors">
                            <span className="text-xl">🇺🇸</span>
                            <span className="text-gray-800">English</span>
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
                Apply to
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-green-300">
                  {" "}
                  Pacífico Internacional
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

              <p className="text-xl md:text-2xl text-gray-100 leading-relaxed">
                Begin your child's journey with our Waldorf-inspired education in the heart of Costa Rica.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-gray-900 bg-transparent backdrop-blur-sm"
                >
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back to Home
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
        <div className="absolute bottom-10 right-4 md:right-10 text-orange-400/70 opacity-60 z-10">
          <div className="text-4xl md:text-5xl animate-pulse">🐵</div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-100 to-teal-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <FileText className="h-8 w-8 text-green-600" />
              <h2 className="text-4xl font-bold text-gray-800">Application Form</h2>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Please complete this application form to begin the admissions process for your child at Pacífico
              Internacional.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-teal-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-teal-700 flex items-center gap-2">
                  <School className="h-6 w-6" />
                  Student Application
                </CardTitle>
                <CardDescription>
                  All fields marked with * are required. Please fill out this form completely and accurately.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-8">
                  {/* Student Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
                      <Baby className="h-5 w-5 text-blue-600" />
                      Student Information
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="student-first-name">Student's First Name *</Label>
                        <Input id="student-first-name" placeholder="Enter first name" required />
                      </div>
                      <div>
                        <Label htmlFor="student-last-name">Student's Last Name *</Label>
                        <Input id="student-last-name" placeholder="Enter last name" required />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="birth-date">Date of Birth *</Label>
                        <Input id="birth-date" type="date" required />
                      </div>
                      <div>
                        <Label htmlFor="gender">Gender *</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="nationality">Nationality *</Label>
                        <Input id="nationality" placeholder="Enter nationality" required />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="grade-applying">Grade Applying For *</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kindergarten-3-day">Kindergarten (3 days/week)</SelectItem>
                            <SelectItem value="kindergarten-5-day">Kindergarten (5 days/week)</SelectItem>
                            <SelectItem value="grade-1">Grade 1</SelectItem>
                            <SelectItem value="grade-2">Grade 2</SelectItem>
                            <SelectItem value="grade-3">Grade 3</SelectItem>
                            <SelectItem value="grade-4">Grade 4</SelectItem>
                            <SelectItem value="grade-5">Grade 5</SelectItem>
                            <SelectItem value="grade-6">Grade 6</SelectItem>
                            <SelectItem value="grade-7">Grade 7</SelectItem>
                            <SelectItem value="grade-8">Grade 8</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="start-date">Desired Start Date *</Label>
                        <Input id="start-date" type="date" required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="previous-school">Previous School (if applicable)</Label>
                      <Input id="previous-school" placeholder="Name of previous school" />
                    </div>

                    <div>
                      <Label htmlFor="special-needs">Special Needs or Learning Differences</Label>
                      <Textarea
                        id="special-needs"
                        placeholder="Please describe any special needs, learning differences, or accommodations your child may require..."
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>

                  {/* Parent/Guardian Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
                      <Users className="h-5 w-5 text-green-600" />
                      Parent/Guardian Information
                    </h3>

                    {/* Primary Parent/Guardian */}
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                      <h4 className="text-lg font-medium text-blue-700 mb-4">Primary Parent/Guardian</h4>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label htmlFor="parent1-first-name">First Name *</Label>
                          <Input id="parent1-first-name" placeholder="Enter first name" required />
                        </div>
                        <div>
                          <Label htmlFor="parent1-last-name">Last Name *</Label>
                          <Input id="parent1-last-name" placeholder="Enter last name" required />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label htmlFor="parent1-email">Email Address *</Label>
                          <Input id="parent1-email" type="email" placeholder="Enter email address" required />
                        </div>
                        <div>
                          <Label htmlFor="parent1-phone">Phone Number *</Label>
                          <Input id="parent1-phone" type="tel" placeholder="Enter phone number" required />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="parent1-relationship">Relationship to Student *</Label>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select relationship" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mother">Mother</SelectItem>
                              <SelectItem value="father">Father</SelectItem>
                              <SelectItem value="guardian">Guardian</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="parent1-occupation">Occupation</Label>
                          <Input id="parent1-occupation" placeholder="Enter occupation" />
                        </div>
                      </div>
                    </div>

                    {/* Secondary Parent/Guardian */}
                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                      <h4 className="text-lg font-medium text-green-700 mb-4">Secondary Parent/Guardian (Optional)</h4>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label htmlFor="parent2-first-name">First Name</Label>
                          <Input id="parent2-first-name" placeholder="Enter first name" />
                        </div>
                        <div>
                          <Label htmlFor="parent2-last-name">Last Name</Label>
                          <Input id="parent2-last-name" placeholder="Enter last name" />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label htmlFor="parent2-email">Email Address</Label>
                          <Input id="parent2-email" type="email" placeholder="Enter email address" />
                        </div>
                        <div>
                          <Label htmlFor="parent2-phone">Phone Number</Label>
                          <Input id="parent2-phone" type="tel" placeholder="Enter phone number" />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="parent2-relationship">Relationship to Student</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select relationship" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mother">Mother</SelectItem>
                              <SelectItem value="father">Father</SelectItem>
                              <SelectItem value="guardian">Guardian</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="parent2-occupation">Occupation</Label>
                          <Input id="parent2-occupation" placeholder="Enter occupation" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
                      <Home className="h-5 w-5 text-purple-600" />
                      Address Information
                    </h3>

                    <div>
                      <Label htmlFor="address">Street Address *</Label>
                      <Input id="address" placeholder="Enter street address" required />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input id="city" placeholder="Enter city" required />
                      </div>
                      <div>
                        <Label htmlFor="province">Province/State *</Label>
                        <Input id="province" placeholder="Enter province/state" required />
                      </div>
                      <div>
                        <Label htmlFor="postal-code">Postal Code</Label>
                        <Input id="postal-code" placeholder="Enter postal code" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Input id="country" placeholder="Enter country" required />
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
                      <Phone className="h-5 w-5 text-red-600" />
                      Emergency Contact
                    </h3>

                    <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                      <p className="text-sm text-red-700 mb-4">
                        Please provide an emergency contact who is not a parent/guardian listed above.
                      </p>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label htmlFor="emergency-name">Full Name *</Label>
                          <Input id="emergency-name" placeholder="Enter full name" required />
                        </div>
                        <div>
                          <Label htmlFor="emergency-relationship">Relationship to Student *</Label>
                          <Input id="emergency-relationship" placeholder="Enter relationship" required />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="emergency-phone">Phone Number *</Label>
                          <Input id="emergency-phone" type="tel" placeholder="Enter phone number" required />
                        </div>
                        <div>
                          <Label htmlFor="emergency-email">Email Address</Label>
                          <Input id="emergency-email" type="email" placeholder="Enter email address" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-orange-600" />
                      Additional Information
                    </h3>

                    <div>
                      <Label htmlFor="why-waldorf">Why are you interested in Waldorf education? *</Label>
                      <Textarea
                        id="why-waldorf"
                        placeholder="Please share what draws you to Waldorf education and our school..."
                        className="min-h-[120px]"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="child-interests">Tell us about your child's interests and personality</Label>
                      <Textarea
                        id="child-interests"
                        placeholder="Please describe your child's interests, hobbies, personality traits, and anything else you'd like us to know..."
                        className="min-h-[120px]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="family-languages">Languages spoken at home *</Label>
                      <Input id="family-languages" placeholder="e.g., English, Spanish, French" required />
                    </div>

                    <div>
                      <Label>How did you hear about our school? *</Label>
                      <RadioGroup className="mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="website" id="website" />
                          <Label htmlFor="website">Website</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="social-media" id="social-media" />
                          <Label htmlFor="social-media">Social Media</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="friend-referral" id="friend-referral" />
                          <Label htmlFor="friend-referral">Friend/Family Referral</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="google-search" id="google-search" />
                          <Label htmlFor="google-search">Google Search</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other">Other</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="additional-comments">Additional Comments or Questions</Label>
                      <Textarea
                        id="additional-comments"
                        placeholder="Please share any additional information, questions, or concerns..."
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>

                  {/* Program Selection and Tuition */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-indigo-600" />
                      Program Selection
                    </h3>

                    <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
                      <Label>Preferred Schedule (for Kindergarten students) *</Label>
                      <RadioGroup className="mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="3-day-full" id="3-day-full" />
                          <Label htmlFor="3-day-full">3 days/week - Full Day (8:00 AM - 2:15 PM) - $5,200/year</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="5-day-full" id="5-day-full" />
                          <Label htmlFor="5-day-full">5 days/week - Full Day (8:00 AM - 2:15 PM) - $6,950/year</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="3-day-half" id="3-day-half" />
                          <Label htmlFor="3-day-half">3 days/week - Half Day (8:00 AM - 1:00 PM) - $4,050/year</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="5-day-half" id="5-day-half" />
                          <Label htmlFor="5-day-half">5 days/week - Half Day (8:00 AM - 1:00 PM) - $5,800/year</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="grades" id="grades" />
                          <Label htmlFor="grades">Grades 1-8 - Full Day (8:00 AM - 2:15 PM) - $6,950/year</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="extended-care" />
                      <Label htmlFor="extended-care">
                        Interested in Extended Care for Kindergarten (until 2:15 PM)
                      </Label>
                    </div>
                  </div>

                  {/* Agreements and Consent */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                      Agreements and Consent
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <Checkbox id="accuracy" required />
                        <Label htmlFor="accuracy" className="text-sm">
                          I certify that all information provided in this application is true and accurate to the best
                          of my knowledge. *
                        </Label>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox id="tour-agreement" required />
                        <Label htmlFor="tour-agreement" className="text-sm">
                          I understand that a campus tour and family interview are required as part of the admissions
                          process. *
                        </Label>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox id="financial-commitment" required />
                        <Label htmlFor="financial-commitment" className="text-sm">
                          I understand the financial commitment and fee structure outlined on the school website. *
                        </Label>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox id="communication-consent" />
                        <Label htmlFor="communication-consent" className="text-sm">
                          I consent to receive communications from Pacífico Internacional regarding my child's
                          application and school updates.
                        </Label>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox id="photo-consent" />
                        <Label htmlFor="photo-consent" className="text-sm">
                          I give permission for my child to be photographed for school promotional materials and social
                          media (optional).
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6 border-t border-gray-200">
                    <div className="text-center space-y-4">
                      <Button
                        type="submit"
                        size="lg"
                        className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-8 py-3"
                      >
                        <FileText className="mr-2 h-5 w-5" />
                        Submit Application
                      </Button>
                      <p className="text-sm text-gray-600">
                        After submitting, you will receive a confirmation email with next steps.
                      </p>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-teal-100 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <Mail className="h-8 w-8 text-teal-600" />
              <h2 className="text-4xl font-bold text-gray-800">Questions?</h2>
            </div>
            <p className="text-xl text-gray-600">We're here to help with your application process</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-teal-200">
              <CardHeader>
                <CardTitle className="text-2xl text-teal-700">Contact Admissions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="h-6 w-6 text-teal-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Phone</p>
                    <p className="text-gray-600">+506 8762 6927</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-6 w-6 text-teal-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <p className="text-gray-600">info@waldorf.cr</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-6 w-6 text-teal-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Office Hours</p>
                    <p className="text-gray-600">Monday - Friday: 7:30 AM - 2:30 PM</p>
                  </div>
                </div>
                <div className="pt-4">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
                  >
                    <a href="https://wa.me/50687626927" target="_blank" rel="noopener noreferrer">
                      <Phone className="mr-2 h-5 w-5" />
                      Contact via WhatsApp
                    </a>
                  </Button>
                </div>
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
              <p className="text-gray-300">
                Nurturing young minds through nature-based, holistic education that honors each child's unique journey.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/#about" className="hover:text-teal-300 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/#admissions" className="hover:text-teal-300 transition-colors">
                    Admissions
                  </Link>
                </li>
                <li>
                  <Link href="/#calendar" className="hover:text-teal-300 transition-colors">
                    School Calendar
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="hover:text-teal-300 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
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
              &copy; {new Date().getFullYear()} Pacífico Internacional. All rights reserved. | Nurturing minds, hearts,
              and hands.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
