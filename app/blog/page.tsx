import { prisma } from '@repo/database'
import { headers } from 'next/headers'
import Link from 'next/link'
import { format } from 'date-fns'
import {
  getDomainConfigFromList,
  calculateTagMatchScoreFromDB,
} from '@repo/shared'

// Force dynamic rendering to avoid build-time database queries
export const dynamic = 'force-dynamic'

async function getAllPosts() {
  try {
    // 获取当前访问的域名
    const headersList = await headers()
    const hostname = headersList.get('host')?.split(':')[0] || ''

    // 直接使用请求头中的 hostname 查找网站（优先于环境变量）
    const searchDomain = hostname || (process.env.NEXT_PUBLIC_SITE_URL || '').replace('http://', '').replace('https://', '')

    // 查询网站及其所有活跃的域名别名
    const website = await prisma.website.findFirst({
      where: {
        domain: {
          contains: searchDomain,
        },
      },
      include: {
        domainAliases: {
          where: {
            status: 'ACTIVE',
          },
        },
      },
    })

    if (!website) return []

    // 获取所有已发布的文章
    const allPosts = await prisma.post.findMany({
      where: {
        websiteId: website.id,
        status: 'PUBLISHED',
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // 如果没有配置域名别名，直接返回所有文章
    if (website.domainAliases.length === 0) {
      return allPosts
    }

    // 获取当前域名的配置
    const domainConfig = getDomainConfigFromList(hostname, website.domainAliases)

    // 如果找不到域名配置（访问的是localhost或主域名），返回所有文章
    if (!domainConfig) {
      return allPosts
    }

    // 找到当前域名的详细配置
    const currentDomain = website.domainAliases.find(
      (d) => d.domain === domainConfig.domain
    )

    if (!currentDomain) {
      return allPosts
    }

    // 为每篇文章计算与当前域名标签的匹配分数
    const postsWithScores = allPosts.map((post) => ({
      post,
      score: calculateTagMatchScoreFromDB(post.metaKeywords, currentDomain),
    }))

    // 按匹配分数排序（分数高的在前）
    postsWithScores.sort((a, b) => b.score - a.score)

    // 返回排序后的文章列表
    return postsWithScores.map((item) => item.post)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>

      {posts.length > 0 ? (
        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                  {post.title}
                </Link>
              </h2>
              <div className="text-sm text-gray-500 mb-4">
                {format(new Date(post.createdAt), 'MMMM d, yyyy')}
              </div>
              <p className="text-gray-700 mb-4">
                {post.metaDescription || post.content.substring(0, 200)}...
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-block text-blue-600 hover:text-blue-700 font-medium"
              >
                Read Full Article →
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500 text-lg">No blog posts available yet.</p>
        </div>
      )}
    </div>
  )
}
