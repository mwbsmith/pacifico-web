import { getAllNewsPosts } from "@/lib/mdx"

export async function GET() {
  const posts = getAllNewsPosts()
  const baseUrl = "https://waldorf.cr"
  
  const rssItems = posts.map((post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/news/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/news/${post.slug}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.date + "T12:00:00-06:00").toUTCString()}</pubDate>
      ${post.image ? `<enclosure url="${baseUrl}${post.image}" type="image/jpeg" />` : ""}
      ${post.tags?.map((tag) => `<category>${tag}</category>`).join("\n      ") || ""}
    </item>
  `).join("")

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Pacífico Internacional News</title>
    <link>${baseUrl}/news</link>
    <description>Latest news, events, and announcements from Pacífico Internacional Waldorf School in Costa Rica.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/news/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/images/pacifico-logo.png</url>
      <title>Pacífico Internacional</title>
      <link>${baseUrl}</link>
    </image>
    ${rssItems}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
