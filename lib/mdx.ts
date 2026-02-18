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
    slug: "core-principles-waldorf-education",
    title: "The Core Principles of Waldorf Education: How Children Learn Best",
    description: "Explore the fundamental aspects of Waldorf education and why its developmental approach helps children grow intellectually, socially, and creatively.",
    date: "2026-02-17",
    updated: "2026-02-17",
    tags: ["waldorf-education", "child-development", "holistic-education", "play-based-learning"],
    image: "/images/blog/math.jpg",
    canonical: "https://waldorf.cr/news/core-principles-waldorf-education",
    content: `# The Core Principles of Waldorf Education

Most education systems are organized around subjects and testing schedules. Waldorf education is organized around **human development**.

Instead of asking *"What should children know by a certain age?"* Waldorf education asks:

**"What is the child ready to understand — and how can learning feel meaningful?"**

When teaching matches developmental readiness, children engage more deeply, retain knowledge longer, and develop confidence in their own ability to learn.

![Students collaborating on math problems at a chalkboard in a Waldorf classroom](/images/blog/math.jpg)

---

## 1) Learning Follows Developmental Stages

Waldorf education recognizes that children learn differently as they grow. Each stage calls for a different teaching approach.

### Early Childhood (Birth–7)
Young children learn primarily through **imitation** and **sensory experience**.

Common priorities include:
- free, imaginative play
- movement and coordination
- practical life activities (helping, tidying, baking, gardening)
- rich spoken language through songs, stories, and conversation
- warm, predictable rhythms that help children feel secure

Formal academics are not rushed, because strong foundations in movement, language, and social development support later success in reading and math.

### Grades / Elementary (7–14)
In these years, **imagination becomes a bridge** to intellectual understanding.

Children learn through:
- story-based teaching
- artistic work that supports academic content (drawing, painting, modeling)
- hands-on projects
- nature observation and experiential science
- skill-building through practice, rhythm, and review

Rather than separating "arts" from "academics," Waldorf integrates them so learning is memorable and emotionally connected.

### Adolescence (14–18)
As analytical thinking matures, students take on more:
- independent research
- debate and discussion
- formal scientific reasoning
- complex writing and abstract mathematics

Because earlier years nurtured curiosity and resilience, academic challenge tends to feel purposeful instead of stressful.

---

## 2) Head, Heart, and Hands

A short way to describe Waldorf education is **head, heart, and hands**:

- **Head:** clear thinking and deep understanding
- **Heart:** emotional intelligence, empathy, and connection
- **Hands:** practical competence, creativity, and real-world skill

Children aren't educated only for test performance. They're educated to become capable, grounded people.

---

## 3) The Arts Are a Learning Method, Not an Extra

In Waldorf education, the arts are not "decorations." They're a core way children learn.

For example:
- drawing supports fine motor skills needed for writing
- music strengthens listening, memory, and pattern recognition
- drama builds language confidence and social awareness
- handwork (knitting, sewing, woodworking) builds focus and perseverance

These capacities support academic performance later because they train attention, sequencing, and executive function.

---

## 4) Rhythm, Repetition, and Meaning

Waldorf classrooms often use **rhythm** in daily and weekly routines.

Why? Because rhythm helps children:
- feel safe and oriented
- regulate energy and attention
- learn through repetition without boredom
- build habits of responsibility and care

This stability supports both emotional wellbeing and learning.

---

## 5) The Teacher–Student Relationship Matters

Waldorf education places strong value on the **relationship between teacher and student**.

When children feel known, supported, and respected:
- they take healthy risks in learning
- they recover from mistakes more easily
- they develop stronger motivation from within

This is one reason Waldorf education often emphasizes community, class culture, and social development alongside academics.

---

## 6) Why Waldorf Doesn't Rush Early Academics

One of the most misunderstood aspects of Waldorf education is the pace of early academics.

Early memorization can create short-term results.
Developmentally timed learning often creates **long-term mastery**.

When reading and math begin when the brain is ready for symbolic thought, children tend to learn quickly and with greater comprehension — because the foundations are already strong.

---

## What Waldorf Education Aims to Develop

Waldorf education aims to develop graduates who are:
- curious and capable learners
- creative problem-solvers
- socially responsible and empathetic
- resilient and adaptable
- able to think independently

Knowledge changes quickly. The ability to learn and grow lasts a lifetime.

---

## Final Thought

Education isn't a race to earlier achievement.

It's a process of becoming fully capable — intellectually, socially, and creatively.

When childhood is respected and curiosity is nurtured, strong learning follows naturally.`,
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
