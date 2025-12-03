import { generateRobotsTxt } from '@repo/seo-tools'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  // 从请求头动态获取当前域名
  const host = request.headers.get('host') || 'localhost:3001'
  const protocol = host.includes('localhost') ? 'http' : 'https'
  const siteUrl = `${protocol}://${host}`

  const robotsTxt = generateRobotsTxt({
    sitemapUrl: `${siteUrl}/sitemap.xml`,
    disallowPaths: ['/api/*', '/admin/*', '/_next/*'],
    host: siteUrl,
  })

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
