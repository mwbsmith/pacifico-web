import { getNewsArticles } from "@/lib/news"
import NewsPageClient from "@/components/news-page-client"

export default function NewsPage() {
  const articles = getNewsArticles()
  
  return <NewsPageClient articles={articles} />
}
