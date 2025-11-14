import { prisma } from '@repo/database'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import type { Metadata } from 'next'

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

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex items-center text-gray-600">
          <time dateTime={post.createdAt.toISOString()}>
            {format(new Date(post.createdAt), 'MMMM d, yyyy')}
          </time>
        </div>
      </header>

      <div className="prose prose-lg max-w-none">
        {post.content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-4 text-gray-700 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

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
    </article>
  )
}
