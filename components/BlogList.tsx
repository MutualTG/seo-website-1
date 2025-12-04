import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@repo/database'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  author: string
  readTime: string
  image: string
}

async function getPosts() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'TG中文纸飞机'

  const website = await prisma.website.findFirst({
    where: {
      OR: [
        { name: { contains: siteName } },
        { domain: { contains: 'localhost:3003' } }
      ]
    },
  })

  if (!website) return []

  const dbPosts = await prisma.post.findMany({
    where: {
      websiteId: website.id,
      status: 'PUBLISHED',
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return dbPosts
}

export default async function BlogList() {
  const dbPosts = await getPosts()

  // 如果数据库有文章，使用数据库数据；否则使用默认数据
  const posts: BlogPost[] = dbPosts.length > 0
    ? dbPosts.map((post, index) => ({
        id: post.id,
        title: post.title,
        excerpt: post.metaDescription || post.content.substring(0, 100) + '…',
        date: new Date(post.createdAt).toLocaleDateString('zh-CN'),
        category: '使用教程',
        author: 'TG资讯',
        readTime: '3 分钟',
        image: `/images/blog/blog${(index % 5) + 1}.jpg`,
      }))
    : [
    {
      id: '1',
      title: '什么是 电报（Telegram） 中文版？',
      excerpt: 'Telegram中文版是指支持中文界面和功能的Telegram应用版本，允许用户…',
      date: '2025-08-07',
      category: '使用教程',
      author: 'Telegram官网',
      readTime: '3 分钟',
      image: '/images/blog/blog1.jpg',
    },
    {
      id: '2',
      title: '电报（Telegram）怎么设置免打扰？',
      excerpt: '在Telegram中设置免打扰，打开目标聊天或群组，点击右上角联系人/群组名称，…',
      date: '2025-08-06',
      category: '使用教程',
      author: 'Telegram官网',
      readTime: '3 分钟',
      image: '/images/blog/blog2.jpg',
    },
    {
      id: '3',
      title: 'Telegram移动端如何开启画中画模式？',
      excerpt: '在Telegram移动端，您可以通过播放视频→点击画中画图标或在系统设置中为Te…',
      date: '2025-08-05',
      category: '使用教程',
      author: 'Telegram官网',
      readTime: '3 分钟',
      image: '/images/blog/blog3.jpg',
    },
    {
      id: '4',
      title: '电报（Telegram）如何使用收藏夹？',
      excerpt: '在Telegram中使用收藏夹功能：长按任意消息，选择"添加到收藏夹"，即可保存…',
      date: '2025-08-04',
      category: '使用教程',
      author: 'Telegram官网',
      readTime: '3 分钟',
      image: '/images/blog/blog4.jpg',
    },
    {
      id: '5',
      title: '电报（Telegram）怎么使用主题？',
      excerpt: '在Telegram中，您可通过设置→外观（Settings→Chat Setti…',
      date: '2025-08-03',
      category: '使用教程',
      author: 'Telegram官网',
      readTime: '3 分钟',
      image: '/images/blog/blog5.jpg',
    },
    {
      id: '6',
      title: 'Telegram手机号不用了如何登陆？',
      excerpt: '当您的原手机号已停用时，可通过输入两步验证密码或向邮箱接收的验证码来跳过短信验证…',
      date: '2025-08-02',
      category: '使用教程',
      author: 'Telegram官网',
      readTime: '4 分钟',
      image: '/images/blog/blog1.jpg',
    },
    {
      id: '7',
      title: 'Telegram如何创建频道？',
      excerpt: '创建Telegram频道非常简单，点击菜单→新建频道，输入频道名称和简介即可…',
      date: '2025-08-01',
      category: '使用教程',
      author: 'Telegram官网',
      readTime: '4 分钟',
      image: '/images/blog/blog2.jpg',
    },
    {
      id: '8',
      title: 'Telegram的秘密聊天功能如何使用？',
      excerpt: '秘密聊天是Telegram的端到端加密功能，提供最高级别的隐私保护…',
      date: '2025-07-31',
      category: '隐私安全',
      author: 'Telegram官网',
      readTime: '4 分钟',
      image: '/images/blog/blog3.jpg',
    },
    {
      id: '9',
      title: 'Telegram机器人（Bot）使用指南',
      excerpt: 'Telegram Bot可以自动化许多任务，了解如何添加和使用机器人…',
      date: '2025-07-30',
      category: '高级功能',
      author: 'Telegram官网',
      readTime: '5 分钟',
      image: '/images/blog/blog4.jpg',
    },
  ]

  const categories = Array.from(new Set(posts.map(post => post.category)))

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Categories Filter */}
        <div className="mb-12 flex flex-wrap gap-3 justify-center">
          <button className="px-6 py-2 bg-telegram-blue text-white rounded-full font-semibold hover:bg-telegram-dark transition">
            全部
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
            >
              {/* Blog Image */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-telegram-blue">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>

                <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center gap-2">
          <button className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed">
            上一页
          </button>
          <button className="px-4 py-2 bg-telegram-blue text-white rounded-lg font-semibold">
            1
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
            2
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
            3
          </button>
          <button className="px-4 py-2 bg-telegram-blue text-white rounded-lg hover:bg-telegram-dark transition">
            下一页
          </button>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 max-w-2xl mx-auto bg-gradient-to-r from-telegram-blue to-telegram-light text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">订阅我们的博客</h3>
          <p className="mb-6 opacity-90">
            获取最新的 Telegram 营销资讯和技巧，直接发送到您的邮箱
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="输入您的邮箱"
              className="flex-1 px-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-telegram-blue px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
              订阅
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
