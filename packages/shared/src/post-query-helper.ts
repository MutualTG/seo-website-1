import { getDomainConfig, calculateTagMatchScore } from './domain-config'

export interface Post {
  id: string
  title: string
  slug: string
  content: string
  metaTitle?: string | null
  metaDescription?: string | null
  metaKeywords: string[]
  createdAt: Date
  [key: string]: any
}

/**
 * 根据域名配置过滤和排序文章
 * @param posts 所有文章列表
 * @param hostname 当前访问的域名
 * @param limit 返回数量限制
 * @returns 过滤并排序后的文章列表
 */
export function filterPostsByDomain(
  posts: Post[],
  hostname: string,
  limit?: number
): Post[] {
  const config = getDomainConfig(hostname)

  // 如果没有配置，返回原始列表
  if (!config) {
    return limit ? posts.slice(0, limit) : posts
  }

  // 计算每篇文章的匹配分数
  const postsWithScores = posts.map(post => ({
    post,
    score: calculateTagMatchScore(post.metaKeywords, hostname),
  }))

  // 按分数降序排序
  postsWithScores.sort((a, b) => b.score - a.score)

  // 提取文章
  const sortedPosts = postsWithScores.map(item => item.post)

  // 应用数量限制
  return limit ? sortedPosts.slice(0, limit) : sortedPosts
}

/**
 * 检查文章是否应该在当前域名显示
 * @param post 文章对象
 * @param hostname 当前域名
 * @param minScore 最低匹配分数（默认1，即至少匹配一个标签）
 * @returns 是否应该显示
 */
export function shouldShowPost(
  post: Post,
  hostname: string,
  minScore: number = 0
): boolean {
  const score = calculateTagMatchScore(post.metaKeywords, hostname)
  return score >= minScore
}

/**
 * 获取域名的网站标识
 * @param hostname 域名
 * @returns website1 | website2 | websiteTg
 */
export function getWebsiteIdByDomain(hostname: string): string {
  const config = getDomainConfig(hostname)
  if (!config) {
    // 默认根据端口判断
    if (hostname.includes('3001')) return 'website1'
    if (hostname.includes('3002')) return 'website2'
    if (hostname.includes('3003')) return 'websiteTg'
    return 'website1'
  }
  return config.websiteId
}

/**
 * 获取域名的SEO配置
 * @param hostname 域名
 * @returns SEO配置对象
 */
export function getDomainSEO(hostname: string) {
  const config = getDomainConfig(hostname)
  if (!config) return null

  return {
    siteName: config.siteName,
    siteDescription: config.siteDescription,
    keywords: [...config.primaryTags, ...config.secondaryTags],
  }
}
