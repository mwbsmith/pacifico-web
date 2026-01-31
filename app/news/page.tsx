import type { Metadata } from "next"
import { getAllNewsPosts } from "@/lib/mdx"
import { generateNewsListStructuredData, generateBreadcrumbStructuredData } from "@/lib/structured-data"
import NewsPageClient from "@/components/news-page-client"

const BASE_URL = "https://waldorf.cr"

export const metadata: Metadata = {
  title: "News - Pacífico Internacional",
  description: "Latest news, events, and announcements from Pacífico Internacional Waldorf School in Costa Rica.",
  openGraph: {
    title: "News - Pacífico Internacional",
    description: "Latest news, events, and announcements from Pacífico Internacional Waldorf School in Costa Rica.",
    url: `${BASE_URL}/news`,
    siteName: "Pacífico Internacional",
    images: [
      {
        url: `${BASE_URL}/images/waldorf-classroom.jpg`,
        width: 1200,
        height: 630,
        alt: "Pacífico Internacional School News",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "News - Pacífico Internacional",
    description: "Latest news, events, and announcements from Pacífico Internacional Waldorf School in Costa Rica.",
    images: [`${BASE_URL}/images/waldorf-classroom.jpg`],
  },
  alternates: {
    canonical: `${BASE_URL}/news`,
    types: {
      "application/rss+xml": `${BASE_URL}/news/feed.xml`,
    },
  },
}

export default function NewsPage() {
  const posts = getAllNewsPosts()
  
  // Generate structured data
  const listSchema = generateNewsListStructuredData(posts)
  const breadcrumbSchema = generateBreadcrumbStructuredData([
    { name: "Home", url: BASE_URL },
    { name: "News", url: `${BASE_URL}/news` },
  ])
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <NewsPageClient posts={posts} />
    </>
  )
}
