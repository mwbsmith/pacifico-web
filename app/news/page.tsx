import type { Metadata } from "next"
import { getAllNewsPosts } from "@/lib/mdx"
import { generateNewsListStructuredData, generateBreadcrumbStructuredData, generateOrganizationStructuredData } from "@/lib/structured-data"
import { baseMetadata } from "@/lib/base-metadata"
import NewsPageClient from "@/components/news-page-client"

const BASE_URL = baseMetadata.contact.website
const ORG_NAME = baseMetadata.school.name
const DESCRIPTION = `Education, news, and insights from ${ORG_NAME} Waldorf School in ${baseMetadata.location.addressLocality}, ${baseMetadata.location.addressCountry}.`

export const metadata: Metadata = {
  title: `News - ${ORG_NAME}`,
  description: DESCRIPTION,
  openGraph: {
    title: `News - ${ORG_NAME}`,
    description: DESCRIPTION,
    url: `${BASE_URL}/news`,
    siteName: ORG_NAME,
    images: [
      {
        url: `${BASE_URL}/images/hero-rope-swing.jpg`,
        width: 1200,
        height: 630,
        alt: `${ORG_NAME} School News`,
      },
    ],
    locale: baseMetadata.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `News - ${ORG_NAME}`,
    description: DESCRIPTION,
    images: [`${BASE_URL}/images/hero-rope-swing.jpg`],
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
  const orgSchema = generateOrganizationStructuredData()
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
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
