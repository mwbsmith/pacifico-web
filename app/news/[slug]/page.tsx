import type { Metadata } from "next"
import { getNewsPostBySlug, getAllNewsSlugs, getAllNewsPosts } from "@/lib/mdx"
import { generateArticleStructuredData, generateBreadcrumbStructuredData } from "@/lib/structured-data"
import NewsArticleClient from "@/components/news-article-client"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ slug: string }>
}

const BASE_URL = "https://waldorf.cr"

export async function generateStaticParams() {
  const slugs = getAllNewsSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getNewsPostBySlug(slug)
  
  if (!post) {
    return {
      title: "Article Not Found - Pacífico Internacional",
    }
  }

  const ogImage = post.image || "/images/waldorf-classroom.jpg"
  
  return {
    title: `${post.title} - Pacífico Internacional News`,
    description: post.description,
    keywords: post.tags?.join(", "),
    authors: [{ name: "Pacífico Internacional" }],
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${BASE_URL}/news/${post.slug}`,
      siteName: "Pacífico Internacional",
      images: [
        {
          url: `${BASE_URL}${ogImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: new Date(post.date + "T12:00:00-06:00").toISOString(),
      modifiedTime: post.updated 
        ? new Date(post.updated + "T12:00:00-06:00").toISOString() 
        : undefined,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`${BASE_URL}${ogImage}`],
    },
    alternates: {
      canonical: post.canonical || `${BASE_URL}/news/${post.slug}`,
    },
  }
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params
  const post = getNewsPostBySlug(slug)
  
  if (!post) {
    notFound()
  }

  // Get all posts for prev/next navigation
  const allPosts = getAllNewsPosts()
  const currentIndex = allPosts.findIndex(p => p.slug === slug)
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  // Generate structured data
  const articleSchema = generateArticleStructuredData(post)
  const breadcrumbSchema = generateBreadcrumbStructuredData([
    { name: "Home", url: BASE_URL },
    { name: "News", url: `${BASE_URL}/news` },
    { name: post.title, url: `${BASE_URL}/news/${post.slug}` },
  ])
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <NewsArticleClient 
        post={post} 
        prevPost={prevPost}
        nextPost={nextPost}
      />
    </>
  )
}
