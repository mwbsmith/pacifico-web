import { getAllNewsPosts } from "@/lib/mdx"
import NewsPageClient from "@/components/news-page-client"

export default function NewsPage() {
  const posts = getAllNewsPosts()
  
  return <NewsPageClient posts={posts} />
}
