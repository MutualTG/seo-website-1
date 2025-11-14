import { generateRobotsTxt } from '@repo/seo-tools'

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'

  const robotsTxt = generateRobotsTxt({
    sitemapUrl: `${siteUrl}/sitemap.xml`,
    disallowPaths: ['/api/*', '/admin/*'],
  })

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
