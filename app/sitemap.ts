import type { MetadataRoute } from "next"
import { getAllNewsPosts } from "@/lib/mdx"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://waldorf.cr"
  
  // Get all news posts
  const posts = getAllNewsPosts()
  const newsUrls = posts.map((post) => ({
    url: `${baseUrl}/news/${post.slug}`,
    lastModified: post.updated ? new Date(post.updated) : new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/admissions`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/visit`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/calendar`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/newsletters`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about/team`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/international-families`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ]

  return [...staticPages, ...newsUrls]
}
