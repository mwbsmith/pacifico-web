import fs from "fs"
import path from "path"
import matter from "gray-matter"

const newsDirectory = path.join(process.cwd(), "content/news")

export interface NewsArticle {
  slug: string
  titleEn: string
  titleEs: string
  descriptionEn: string
  descriptionEs: string
  date: string
  image: string
  content: string
}

export function getNewsArticles(): NewsArticle[] {
  // Check if directory exists
  if (!fs.existsSync(newsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(newsDirectory)
  const mdxFiles = fileNames.filter((name) => name.endsWith(".mdx"))

  const articles = mdxFiles.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "")
    const fullPath = path.join(newsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      titleEn: data.titleEn || data.title || "",
      titleEs: data.titleEs || data.title || "",
      descriptionEn: data.descriptionEn || data.description || "",
      descriptionEs: data.descriptionEs || data.description || "",
      date: data.date || "",
      image: data.image || "/images/waldorf-classroom.jpg",
      content,
    }
  })

  // Sort by date, newest first
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getNewsArticleBySlug(slug: string): NewsArticle | null {
  const fullPath = path.join(newsDirectory, `${slug}.mdx`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    slug,
    titleEn: data.titleEn || data.title || "",
    titleEs: data.titleEs || data.title || "",
    descriptionEn: data.descriptionEn || data.description || "",
    descriptionEs: data.descriptionEs || data.description || "",
    date: data.date || "",
    image: data.image || "/images/waldorf-classroom.jpg",
    content,
  }
}

export function getAllNewsSlugs(): string[] {
  if (!fs.existsSync(newsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(newsDirectory)
  return fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx$/, ""))
}
