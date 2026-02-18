export interface NewsPostMeta {
  slug: string
  title: string
  description: string
  date: string
  updated?: string
  tags?: string[]
  image?: string
  canonical?: string
  primaryKeyword?: string
  secondaryKeywords?: string[]
  featuredImage?: string
  featuredImageAlt?: string
  readingTime?: string
  lastModified?: string
  faq?: Array<{ question: string; answer: string }>
}

// Normalize date values — gray-matter may parse date strings into Date objects
function normalizeDate(value: unknown): string {
  if (!value) return new Date().toISOString().split("T")[0]
  if (value instanceof Date) return value.toISOString().split("T")[0]
  return String(value)
}

export interface NewsPost extends NewsPostMeta {
  content: string
}

// Fallback sample data for preview environments without filesystem access
const SAMPLE_POSTS: NewsPost[] = [
  {
    slug: "welcome-2025-2026",
    title: "Welcome to the 2025-2026 School Year",
    description: "We are excited to welcome all families to another wonderful year of Waldorf-inspired education.",
    date: "2025-08-18",
    tags: ["announcement", "school-year"],
    image: "/images/news/welcome-2025-2026.jpg",
    canonical: "https://waldorf.cr/news/welcome-2025-2026",
    content: `We are thrilled to welcome all our families—both returning and new—to the 2025-2026 school year at Pacífico Internacional!

## A Year of Growth and Discovery

This year promises to be filled with creativity, learning, and community connection as we continue our mission of providing authentic Waldorf education in the heart of Costa Rica.

### What to Expect

- **New Programs**: Expanded offerings in arts and movement
- **Community Events**: Monthly festivals celebrating seasons and cultures
- **Enhanced Curriculum**: Deeper integration of nature-based learning

We look forward to walking this journey together with your family.`,
  },
  {
    slug: "morning-garden-enrolling",
    title: "Morning Garden Program Now Enrolling",
    description: "Our Morning Garden program for young children is now accepting enrollments for 2025-2026.",
    date: "2025-01-15",
    tags: ["enrollment", "early-childhood"],
    image: "/images/news/morning-garden-enrolling.jpg",
    canonical: "https://waldorf.cr/news/morning-garden-enrolling",
    content: `Our Morning Garden program is now accepting enrollments for children ages 3-5!

## A Gentle Introduction to Learning

The Morning Garden provides a warm, nurturing environment where young children can explore, play, and grow at their own pace.

### Program Highlights

- **Nature-Based Play**: Daily outdoor exploration in our beautiful gardens
- **Creative Arts**: Watercolor painting, beeswax modeling, and handwork
- **Rhythm and Song**: Circle time with movement, songs, and storytelling
- **Practical Life**: Baking, gardening, and caring for our classroom

Contact us today to schedule a visit and learn more about this special program.`,
  },
  {
    slug: "meet-our-faculty",
    title: "Meet Our Growing Faculty Team",
    description: "Introducing new members to our dedicated team of Waldorf-trained educators.",
    date: "2025-01-10",
    tags: ["faculty", "team"],
    image: "/images/news/meet-our-faculty.jpg",
    canonical: "https://waldorf.cr/news/meet-our-faculty",
    content: `We are delighted to introduce the newest members of our faculty team!

## Dedicated Waldorf Educators

Our teachers bring years of experience and deep commitment to Waldorf education. Each brings unique gifts to our community.

### Our Teaching Philosophy

At Pacífico Internacional, we believe in:

- **Whole Child Education**: Nurturing head, heart, and hands
- **Developmentally Appropriate Learning**: Meeting each child where they are
- **Arts Integration**: Weaving creativity through all subjects
- **Connection to Nature**: Learning in and from the natural world

Visit our Team page to learn more about each of our wonderful educators.`,
  },
]

// Helper to get sample posts metadata
function getSamplePostsMeta(): NewsPostMeta[] {
  return SAMPLE_POSTS.map(({ content, ...meta }) => meta)
}

// Helper to get sample post by slug
function getSamplePostBySlug(slug: string): NewsPost | null {
  return SAMPLE_POSTS.find(post => post.slug === slug) || null
}

// Helper to get sample slugs
function getSampleSlugs(): string[] {
  return SAMPLE_POSTS.map(post => post.slug)
}

export function getAllNewsPosts(): NewsPostMeta[] {
  // In v0 preview, always use fallback data
  // Dynamic require will fail in browser/edge environments
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require("fs")
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require("path")
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const matter = require("gray-matter")
    
    const CONTENT_DIR = path.join(process.cwd(), "content", "news")
    
    if (!fs.existsSync(CONTENT_DIR)) {
      return getSamplePostsMeta()
    }

    const files = fs.readdirSync(CONTENT_DIR)
    const mdxFiles = files.filter((file: string) => file.endsWith(".mdx") || file.endsWith(".md"))

    if (mdxFiles.length === 0) {
      return getSamplePostsMeta()
    }

    const posts = mdxFiles.map((filename: string) => {
      const slug = filename.replace(/\.mdx?$/, "")
      const filePath = path.join(CONTENT_DIR, filename)
      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data } = matter(fileContents)

      return {
        slug: data.slug || slug,
        title: data.title || "Untitled",
        description: data.description || "",
        date: normalizeDate(data.date),
        updated: data.updated ? normalizeDate(data.updated) : undefined,
        tags: data.tags || data.secondaryKeywords || [],
        image: data.image || data.featuredImage || "/images/waldorf-classroom.jpg",
        canonical: data.canonical,
        primaryKeyword: data.primaryKeyword,
        secondaryKeywords: data.secondaryKeywords,
        featuredImage: data.featuredImage,
        featuredImageAlt: data.featuredImageAlt,
        readingTime: data.readingTime,
        lastModified: data.lastModified ? normalizeDate(data.lastModified) : undefined,
        faq: data.faq,
      }
    })

    return posts.sort((a: NewsPostMeta, b: NewsPostMeta) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch {
    return getSamplePostsMeta()
  }
}

export function getNewsPostBySlug(slug: string): NewsPost | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require("fs")
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require("path")
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const matter = require("gray-matter")
    
    const CONTENT_DIR = path.join(process.cwd(), "content", "news")
    const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`)
    const mdPath = path.join(CONTENT_DIR, `${slug}.md`)
    
    let filePath: string | null = null
    
    if (fs.existsSync(mdxPath)) {
      filePath = mdxPath
    } else if (fs.existsSync(mdPath)) {
      filePath = mdPath
    }
    
    if (!filePath) {
      return getSamplePostBySlug(slug)
    }

    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug: data.slug || slug,
      title: data.title || "Untitled",
      description: data.description || "",
      date: normalizeDate(data.date),
      updated: data.updated ? normalizeDate(data.updated) : undefined,
      tags: data.tags || data.secondaryKeywords || [],
      image: data.image || data.featuredImage || "/images/waldorf-classroom.jpg",
      canonical: data.canonical,
      primaryKeyword: data.primaryKeyword,
      secondaryKeywords: data.secondaryKeywords,
      featuredImage: data.featuredImage,
      featuredImageAlt: data.featuredImageAlt,
      readingTime: data.readingTime,
      lastModified: data.lastModified ? normalizeDate(data.lastModified) : undefined,
      faq: data.faq,
      content,
    }
  } catch {
    return getSamplePostBySlug(slug)
  }
}

export function getAllNewsSlugs(): string[] {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require("fs")
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require("path")
    
    const CONTENT_DIR = path.join(process.cwd(), "content", "news")
    
    if (!fs.existsSync(CONTENT_DIR)) {
      return getSampleSlugs()
    }

    const files = fs.readdirSync(CONTENT_DIR)
    const slugs = files
      .filter((file: string) => file.endsWith(".mdx") || file.endsWith(".md"))
      .map((file: string) => file.replace(/\.mdx?$/, ""))
    
    return slugs.length > 0 ? slugs : getSampleSlugs()
  } catch {
    return getSampleSlugs()
  }
}
