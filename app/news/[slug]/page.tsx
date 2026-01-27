import { getNewsArticleBySlug, getAllNewsSlugs } from "@/lib/news"
import { notFound } from "next/navigation"
import NewsArticleClient from "@/components/news-article-client"

export async function generateStaticParams() {
  const slugs = getAllNewsSlugs()
  return slugs.map((slug) => ({ slug }))
}

interface NewsArticlePageProps {
  params: Promise<{ slug: string }>
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params
  const article = getNewsArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  return <NewsArticleClient article={article} />
}
