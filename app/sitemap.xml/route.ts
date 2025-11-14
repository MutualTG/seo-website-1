import { prisma } from '@repo/database'
import { generateSitemap } from '@repo/seo-tools'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  // 从请求头获取当前访问的域名
  const host = request.headers.get('host') || 'localhost:3001'
  const domain = host.split(':')[0]
  const protocol = host.includes('localhost') ? 'http' : 'https'
  const siteUrl = `${protocol}://${host}`

  console.log(`[Sitemap] 生成 sitemap for domain: ${domain}`)

  // 查询域名配置
  const domainConfig = await prisma.domainAlias.findFirst({
    where: {
      domain: {
        equals: domain,
        mode: 'insensitive'
      }
    },
    include: {
      website: true
    }
  })

  // 如果没找到域名配置，尝试兜底查询
  let website = domainConfig?.website ?? null

  if (!website) {
    console.log(`[Sitemap] ⚠️  未找到域名配置，使用环境变量兜底`)
    const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Demo Website 1'
    website = await prisma.website.findFirst({
      where: {
        OR: [
          { name: { contains: siteName } },
          { domain: { contains: domain } }
        ]
      }
    })
  }

  if (!website) {
    console.error(`[Sitemap] ❌ 未找到网站配置 for ${domain}`)
    return new Response('Website not found', { status: 404 })
  }

  console.log(`[Sitemap] ✅ 找到网站: ${website.name}`)

  // 查询文章 - 如果有域名配置，根据 primaryTags 过滤
  let posts

  if (domainConfig && domainConfig.primaryTags.length > 0) {
    console.log(`[Sitemap] 根据 primaryTags 过滤: ${domainConfig.primaryTags.join(', ')}`)

    // 查询包含任意 primaryTag 的文章
    posts = await prisma.post.findMany({
      where: {
        websiteId: website.id,
        status: 'PUBLISHED',
        metaKeywords: {
          hasSome: domainConfig.primaryTags
        }
      },
      select: {
        slug: true,
        updatedAt: true,
        metaKeywords: true,
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    console.log(`[Sitemap] 找到 ${posts.length} 篇匹配的文章`)
  } else {
    // 没有域名配置，返回所有文章
    posts = await prisma.post.findMany({
      where: {
        websiteId: website.id,
        status: 'PUBLISHED',
      },
      select: {
        slug: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    console.log(`[Sitemap] 找到 ${posts.length} 篇文章（未过滤）`)
  }

  const urls = [
    {
      url: '/',
      changefreq: 'daily' as const,
      priority: 1.0,
    },
    {
      url: '/blog',
      changefreq: 'daily' as const,
      priority: 0.9,
    },
    ...posts.map((post) => ({
      url: `/blog/${post.slug}`,
      changefreq: 'weekly' as const,
      priority: 0.8,
      lastmod: post.updatedAt.toISOString(),
    })),
  ]

  const sitemap = await generateSitemap({ hostname: siteUrl }, urls)

  console.log(`[Sitemap] ✅ 成功生成 sitemap，包含 ${urls.length} 个 URL`)

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
