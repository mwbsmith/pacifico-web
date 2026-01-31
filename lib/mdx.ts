import path from "path"
import fs from "fs"
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

// Fallback sample data for preview environments without filesystem access
const SAMPLE_POSTS: NewsPost[] = [
  {
    slug: "welcome-2025-2026",
    title: "Welcome to the 2025-2026 School Year",
    date: "2025-08-18",
    description: "We are excited to welcome all families to another wonderful year of Waldorf-inspired education at Pacífico Internacional.",
    tags: ["announcement", "school-year"],
    image: "/images/waldorf-classroom.jpg",
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
    date: "2025-01-15",
    description: "Our beloved Morning Garden program for young children is accepting new enrollments. Join us for a nurturing introduction to school life.",
    tags: ["enrollment", "early-childhood"],
    image: "/images/morning-garden-en.jpg",
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
    date: "2025-01-10",
    description: "We are thrilled to introduce new members to our dedicated team of Waldorf-trained educators.",
    tags: ["faculty", "team"],
    image: "/images/faculty-group-photo.jpeg",
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

const CONTENT_DIR = path.join(process.cwd(), "content", "news")

// Always return fallback sample data - filesystem access handled separately for production
export function getAllNewsPosts(): NewsPostMeta[] {
  console.log("[v0] getAllNewsPosts called")
  
  try {
    // Try to use filesystem in Node.js environment
    console.log("[v0] CONTENT_DIR:", CONTENT_DIR)
    
    // Check if directory exists
    if (!fs.existsSync(CONTENT_DIR)) {
      console.log("[v0] Content directory does not exist, using fallback")
      return SAMPLE_POSTS.map(({ content, ...meta }) => meta)
    }

    const files = fs.readdirSync(CONTENT_DIR)
    console.log("[v0] Files found:", files)
    
    const mdxFiles = files.filter((file: string) => file.endsWith(".mdx") || file.endsWith(".md"))
    console.log("[v0] MDX files:", mdxFiles)

    if (mdxFiles.length === 0) {
      console.log("[v0] No MDX files found, using fallback")
      return SAMPLE_POSTS.map(({ content, ...meta }) => meta)
    }

    const posts = mdxFiles.map((filename: string) => {
      const slug = filename.replace(/\.mdx?$/, "")
      const filePath = path.join(CONTENT_DIR, filename)
      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data } = matter(fileContents)

      console.log("[v0] Parsed post:", slug, data.title)

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

    console.log("[v0] Total posts loaded:", posts.length)

    // Sort by date, newest first
    return posts.sort((a: NewsPostMeta, b: NewsPostMeta) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.log("[v0] Error loading posts, using fallback:", error)
    return SAMPLE_POSTS.map(({ content, ...meta }) => meta)
  }
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
