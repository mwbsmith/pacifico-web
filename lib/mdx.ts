import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface NewsPostMeta {
  slug: string
  title: string
  date: string
  description: string
  tags?: string[]
  image?: string
  canonical?: string
}

export interface NewsPost extends NewsPostMeta {
  content: string
}

const CONTENT_DIR = path.join(process.cwd(), "content", "news")

export function getAllNewsPosts(): NewsPostMeta[] {
  // Check if directory exists
  if (!fs.existsSync(CONTENT_DIR)) {
    return []
  }

  const files = fs.readdirSync(CONTENT_DIR)
  const mdxFiles = files.filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))

  const posts = mdxFiles.map((filename) => {
    const slug = filename.replace(/\.mdx?$/, "")
    const filePath = path.join(CONTENT_DIR, filename)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data } = matter(fileContents)

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString().split("T")[0],
      description: data.description || "",
      tags: data.tags || [],
      image: data.image || "/images/waldorf-classroom.jpg",
      canonical: data.canonical,
    }
  })

  // Sort by date, newest first
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getNewsPostBySlug(slug: string): NewsPost | null {
  const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`)
  const mdPath = path.join(CONTENT_DIR, `${slug}.md`)
  
  let filePath: string | null = null
  
  if (fs.existsSync(mdxPath)) {
    filePath = mdxPath
  } else if (fs.existsSync(mdPath)) {
    filePath = mdPath
  }
  
  if (!filePath) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || "Untitled",
    date: data.date || new Date().toISOString().split("T")[0],
    description: data.description || "",
    tags: data.tags || [],
    image: data.image || "/images/waldorf-classroom.jpg",
    canonical: data.canonical,
    content,
  }
}

export function getAllNewsSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return []
  }

  const files = fs.readdirSync(CONTENT_DIR)
  return files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.mdx?$/, ""))
}
