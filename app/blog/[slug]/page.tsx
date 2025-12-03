import { prisma } from '@repo/database'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import type { Metadata } from 'next'
import { ArticleBreadcrumb } from '@/components/Breadcrumb'
import { ArticleJsonLd } from '@/components/JsonLd'
import { headers } from 'next/headers'

// Force dynamic rendering to avoid build-time database queries
export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''

  const website = await prisma.website.findFirst({
    where: {
      domain: {
        contains: siteUrl.replace('http://', '').replace('https://', ''),
      },
    },
  })

  if (!website) return null

  const post = await prisma.post.findFirst({
    where: {
      slug,
      websiteId: website.id,
      status: 'PUBLISHED',
    },
  })

  return post
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const post = await getPost(resolvedParams.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || undefined,
    keywords: post.metaKeywords.join(', '),
  }
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params
  const post = await getPost(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  // 获取当前URL用于ArticleJsonLd
  const headersList = await headers()
  const host = headersList.get('host') || 'localhost:3001'
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  const articleUrl = `${protocol}://${host}/blog/${resolvedParams.slug}`

  return (
    <>
      {/* 文章结构化数据 */}
      <ArticleJsonLd
        title={post.title}
        description={post.metaDescription || post.content.substring(0, 160)}
        url={articleUrl}
        datePublished={post.createdAt.toISOString()}
        dateModified={post.updatedAt?.toISOString()}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 面包屑导航 - 包含多站点互链 */}
        <ArticleBreadcrumb articleTitle={post.title} />

        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex items-center text-gray-600">
            <time dateTime={post.createdAt.toISOString()}>
              {format(new Date(post.createdAt), 'MMMM d, yyyy')}
            </time>
          </div>
        </header>

        {/* 文章内容 - 支持HTML渲染 */}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.metaKeywords.length > 0 && (
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.metaKeywords.map((keyword) => (
                <span
                  key={keyword}
                  className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 相关站点推荐 */}
        <div className="mt-10 pt-8 border-t">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">相关资源</h3>
          <div className="flex flex-wrap gap-3">
            <a href="https://telegram.org" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Telegram官网</a>
            <span className="text-gray-300">|</span>
            <a href="https://telegramservice.com" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Telegram中文版</a>
            <span className="text-gray-300">|</span>
            <a href="https://telegramtoolkit.com" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Telegram工具箱</a>
            <span className="text-gray-300">|</span>
            <a href="/download" className="text-blue-600 hover:underline">立即下载</a>
          </div>
        </div>
      </article>
    </>
  )
}
