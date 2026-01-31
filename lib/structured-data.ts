import type { NewsPostMeta, NewsPost } from "./mdx"

const BASE_URL = "https://waldorf.cr"
const ORG_NAME = "Pacífico Internacional"
const ORG_LOGO = `${BASE_URL}/images/pacifico-logo.png`

export function generateArticleStructuredData(post: NewsPost | NewsPostMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.description,
    image: post.image ? `${BASE_URL}${post.image}` : `${BASE_URL}/images/waldorf-classroom.jpg`,
    datePublished: new Date(post.date + "T12:00:00-06:00").toISOString(),
    dateModified: post.updated 
      ? new Date(post.updated + "T12:00:00-06:00").toISOString() 
      : new Date(post.date + "T12:00:00-06:00").toISOString(),
    author: {
      "@type": "Organization",
      name: ORG_NAME,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: ORG_NAME,
      logo: {
        "@type": "ImageObject",
        url: ORG_LOGO,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/news/${post.slug}`,
    },
    keywords: post.tags?.join(", ") || "",
  }
}

export function generateBreadcrumbStructuredData(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: ORG_NAME,
    url: BASE_URL,
    logo: ORG_LOGO,
    description: "Authentic Waldorf education in the heart of Costa Rica, nurturing children through nature-based, holistic learning.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Guanacaste",
      addressCountry: "CR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+506-8762-6927",
      contactType: "admissions",
      email: "info@waldorf.cr",
    },
    sameAs: [
      "https://www.facebook.com/pacificointernacional",
      "https://www.instagram.com/pacificointernacional",
    ],
  }
}

export function generateNewsListStructuredData(posts: NewsPostMeta[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "News - Pacífico Internacional",
    description: "Latest news, events, and announcements from Pacífico Internacional Waldorf School.",
    url: `${BASE_URL}/news`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${BASE_URL}/news/${post.slug}`,
        name: post.title,
      })),
    },
  }
}
