"use client"

import { Button } from "@/components/ui/button"
import {
  Globe,
  ChevronDown,
  Menu,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ArrowLeft,
  Tag,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import type { NewsPost, NewsPostMeta } from "@/lib/mdx"
import ReactMarkdown from "react-markdown"
import { ChevronLeft, ChevronRight } from "lucide-react"
import SharedFooter from "@/components/shared-footer" // Import SharedFooter
import SharedHeader from "@/components/shared-header" // Import SharedHeader

type Language = "en" | "es"

const translations = {
  en: {
    // Navigation
    about: "About",
    admissions: "Admissions",
    calendar: "Calendar",
    contact: "Contact",

    // Article
    backToNews: "Back to News",
    publishedOn: "Published on",
    updatedOn: "Updated on",
    previousArticle: "Previous Article",
    nextArticle: "Next Article",
    readMore: "Read more",
    
    // Footer
    footerDescription:
      "Nurturing young minds through nature-based, holistic education that honors each child's unique journey.",
    quickLinks: "Quick Links",
    aboutUs: "About Us",
    schoolCalendar: "School Calendar",
    familyHandbook: "Family Handbook 2025-2026",
    connectWithUs: "Connect With Us",
  },
  es: {
    // Navigation
    about: "Acerca de",
    admissions: "Admisiones",
    calendar: "Calendario",
    contact: "Contacto",

    // Article
    backToNews: "Volver a Noticias",
    publishedOn: "Publicado el",
    updatedOn: "Actualizado el",
    previousArticle: "Artículo Anterior",
    nextArticle: "Artículo Siguiente",
    readMore: "Leer más",

    // Footer
    footerDescription:
      "Nutriendo mentes jóvenes a través de educación holística basada en la naturaleza que honra el viaje único de cada niño.",
    quickLinks: "Enlaces Rápidos",
    aboutUs: "Acerca de Nosotros",
    schoolCalendar: "Calendario Escolar",
    familyHandbook: "Manual Familiar 2025-2026",
    connectWithUs: "Conéctate con Nosotros",
  },
}

interface NewsArticleClientProps {
  post: NewsPost
  prevPost?: NewsPostMeta | null
  nextPost?: NewsPostMeta | null
}

export default function NewsArticleClient({ post, prevPost, nextPost }: NewsArticleClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: keyof typeof translations.en) => translations[language][key]

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    if (href.startsWith("#")) {
      window.location.href = "/" + href
    } else {
      window.location.href = href
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + "T12:00:00-06:00")
    return date.toLocaleDateString(language === "en" ? "en-US" : "es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-emerald-50 to-amber-50">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden min-h-[50vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={post.image || "/images/waldorf-classroom.jpg"}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
        </div>

        {/* Navigation Overlay */}
        <nav className="fixed top-0 left-0 right-0 z-30 bg-black/20 backdrop-blur-sm transition-all duration-300">
          <div className="container mx-auto px-4 py-6 md:py-8">
            <div className="flex items-center justify-between">
              <SharedHeader
                language={language}
                setLanguage={setLanguage}
              />
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10 pt-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-2xl mb-6 font-serif">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{formatDate(post.date)}</span>
              </div>
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full flex items-center gap-1"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link href="/news">
              <Button variant="outline" className="mb-8 border-teal-600 text-teal-600 hover:bg-teal-50 bg-transparent">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("backToNews")}
              </Button>
            </Link>

            {/* Visible publish date for SEO */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <p className="text-gray-600">
                <time dateTime={post.date}>
                  {t("publishedOn")} {formatDate(post.date)}
                </time>
                {post.updated && post.updated !== post.date && (
                  <span className="ml-4 text-gray-500">
                    ({t("updatedOn")} <time dateTime={post.updated}>{formatDate(post.updated)}</time>)
                  </span>
                )}
              </p>
            </div>

            <article className="prose prose-lg prose-teal max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 font-serif">{children}</h2>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4 font-serif">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3 font-serif">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-gray-700">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-gray-900">{children}</strong>
                  ),
                  a: ({ href, children }) => (
                    <a href={href} className="text-teal-600 hover:text-teal-700 underline">
                      {children}
                    </a>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-teal-500 pl-4 italic text-gray-600 my-4">
                      {children}
                    </blockquote>
                  ),
                  img: ({ src, alt }) => (
                    <Image
                      src={src || ""}
                      alt={alt || "Article image"}
                      width={800}
                      height={450}
                      className="rounded-lg my-6"
                    />
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </article>

            {/* Previous / Next Navigation */}
            {(prevPost || nextPost) && (
              <nav className="mt-12 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {prevPost ? (
                    <Link
                      href={`/news/${prevPost.slug}`}
                      className="group flex flex-col p-4 rounded-lg border border-gray-200 hover:border-teal-300 hover:bg-teal-50 transition-colors"
                    >
                      <span className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                        <ChevronLeft className="h-4 w-4" />
                        {t("previousArticle")}
                      </span>
                      <span className="font-medium text-gray-800 group-hover:text-teal-600 line-clamp-2">
                        {prevPost.title}
                      </span>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {nextPost ? (
                    <Link
                      href={`/news/${nextPost.slug}`}
                      className="group flex flex-col p-4 rounded-lg border border-gray-200 hover:border-teal-300 hover:bg-teal-50 transition-colors text-right md:items-end"
                    >
                      <span className="text-sm text-gray-500 flex items-center gap-1 mb-1 justify-end">
                        {t("nextArticle")}
                        <ChevronRight className="h-4 w-4" />
                      </span>
                      <span className="font-medium text-gray-800 group-hover:text-teal-600 line-clamp-2">
                        {nextPost.title}
                      </span>
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              </nav>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <SharedFooter language={language} />
    </div>
  )
}
