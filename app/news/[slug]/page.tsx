import { getNewsPostBySlug, getAllNewsSlugs } from "@/lib/mdx"
import NewsArticleClient from "@/components/news-article-client"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllNewsSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params
  const post = getNewsPostBySlug(slug)
  
  if (!post) {
    notFound()
  }
  
  return <NewsArticleClient post={post} />
}
