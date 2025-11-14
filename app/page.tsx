import { prisma } from '@repo/database'
import Link from 'next/link'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Footer from '@/components/Footer'
import { getWebsiteByDomain } from '@/lib/get-website-by-domain'

// Force dynamic rendering to avoid build-time database queries
export const dynamic = 'force-dynamic'

async function getRecentPosts() {
  try {
    // 根据访问的域名获取对应的Website
    const result = await getWebsiteByDomain()

    if (!result) {
      console.error('[page.tsx] 未找到网站配置')
      return []
    }

    const { website, domainConfig } = result

    console.log(`[page.tsx] 当前网站: ${website.name}`)
    if (domainConfig) {
      console.log(`[page.tsx] 域名配置: ${domainConfig.siteName}`)
    }

    const posts = await prisma.post.findMany({
      where: {
        websiteId: website.id,
        status: 'PUBLISHED',
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 6,
    })

    return posts
  } catch (error) {
    console.error('Database error:', error)
    return []
  }
}

export default async function Home() {
  const posts = await getRecentPosts()
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />

      {/* Latest News Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">Telegram最新消息</h2>
          </div>

          {/* Blog Preview Cards */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
                >
                  <div className="h-40 overflow-hidden bg-gray-100">
                    {/* Placeholder for blog images */}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2 text-gray-800 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {post.metaDescription || post.content.substring(0, 100)}
                    </p>
                    <span className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString('zh-CN')}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg max-w-7xl mx-auto">
              <p className="text-gray-500 text-lg">暂无博客文章</p>
            </div>
          )}
        </div>
      </section>

      <Services />
      <Footer />
    </main>
  )
}
