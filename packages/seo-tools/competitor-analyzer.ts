/**
 * 竞争对手SEO分析Agent
 *
 * 功能：
 * 1. 爬取竞争对手网站的文章列表
 * 2. 分析文章标题、关键词、结构
 * 3. 提取SEO优化建议
 * 4. 生成高质量文章建议
 */

import axios from 'axios'
import * as cheerio from 'cheerio'

// 竞争对手网站配置
export interface CompetitorConfig {
  name: string
  url: string
  blogPath: string
  articleSelector: string
  titleSelector: string
  descriptionSelector?: string
  dateSelector?: string
  enabled: boolean
}

// 分析结果
export interface ArticleAnalysis {
  url: string
  title: string
  description?: string
  date?: string
  keywords: string[]
  wordCount?: number
  headings: string[]
  source: string
}

export interface CompetitorReport {
  competitor: string
  scrapedAt: Date
  totalArticles: number
  articles: ArticleAnalysis[]
  topKeywords: { keyword: string; count: number }[]
  seoRecommendations: string[]
}

// 预定义竞争对手列表
const COMPETITORS: CompetitorConfig[] = [
  {
    name: 'TelegramSHK',
    url: 'https://telegramshk.com',
    blogPath: '/blog',
    articleSelector: '.blog-post, article, .post-item',
    titleSelector: 'h1, h2, .title, .post-title',
    descriptionSelector: '.excerpt, .description, p',
    dateSelector: '.date, time, .post-date',
    enabled: true,
  },
  {
    name: 'TelegramCN',
    url: 'https://telegram-cn.com',
    blogPath: '/article',
    articleSelector: 'article, .article-item',
    titleSelector: 'h1, h2',
    enabled: true,
  },
  {
    name: 'TelegramZH',
    url: 'https://telegramzh.com',
    blogPath: '/post',
    articleSelector: '.post, article',
    titleSelector: 'h1, h2',
    enabled: true,
  },
]

// 常见Telegram关键词库
const TELEGRAM_KEYWORDS = [
  'telegram', 'tg', '电报', '纸飞机', 'telegram下载', 'telegram中文',
  '秘密聊天', '频道', '群组', '机器人', 'bot', '贴纸', 'sticker',
  '两步验证', '端到端加密', '云同步', '代理', 'proxy', 'mtproto',
  '语音通话', '视频通话', 'premium', '会员', '文件传输',
  '安卓', 'android', 'ios', 'iphone', 'windows', 'mac',
  '注册', '登录', '验证码', '安全', '隐私', '设置',
]

// 用户代理
const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
]

function getRandomUserAgent(): string {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)]
}

/**
 * 爬取竞争对手博客页面
 */
async function fetchCompetitorPage(url: string): Promise<string | null> {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': getRandomUserAgent(),
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      },
      timeout: 15000,
    })
    return response.data
  } catch (error: any) {
    console.error(`[CompetitorAnalyzer] 无法访问 ${url}: ${error.message}`)
    return null
  }
}

/**
 * 从HTML中提取关键词
 */
function extractKeywords(text: string): string[] {
  const foundKeywords: string[] = []
  const lowerText = text.toLowerCase()

  for (const keyword of TELEGRAM_KEYWORDS) {
    if (lowerText.includes(keyword.toLowerCase())) {
      foundKeywords.push(keyword)
    }
  }

  return [...new Set(foundKeywords)]
}

/**
 * 分析单篇文章
 */
async function analyzeArticle(
  articleUrl: string,
  source: string
): Promise<ArticleAnalysis | null> {
  const html = await fetchCompetitorPage(articleUrl)
  if (!html) return null

  const $ = cheerio.load(html)

  // 提取标题
  const title = $('h1').first().text().trim() ||
    $('title').text().trim() ||
    $('meta[property="og:title"]').attr('content') || ''

  // 提取描述
  const description = $('meta[name="description"]').attr('content') ||
    $('meta[property="og:description"]').attr('content') ||
    $('p').first().text().trim().substring(0, 200)

  // 提取标题结构
  const headings: string[] = []
  $('h1, h2, h3').each((_, el) => {
    const text = $(el).text().trim()
    if (text && text.length < 100) {
      headings.push(text)
    }
  })

  // 提取正文关键词
  const bodyText = $('article, .content, .post-content, main').text() || $('body').text()
  const keywords = extractKeywords(bodyText)

  // 估算字数
  const wordCount = bodyText.replace(/\s+/g, '').length

  return {
    url: articleUrl,
    title,
    description,
    keywords,
    wordCount,
    headings,
    source,
  }
}

/**
 * 分析竞争对手网站
 */
export async function analyzeCompetitor(config: CompetitorConfig): Promise<CompetitorReport | null> {
  console.log(`[CompetitorAnalyzer] 开始分析: ${config.name}`)

  const blogUrl = `${config.url}${config.blogPath}`
  const html = await fetchCompetitorPage(blogUrl)

  if (!html) {
    console.log(`[CompetitorAnalyzer] 无法访问 ${config.name}`)
    return null
  }

  const $ = cheerio.load(html)
  const articles: ArticleAnalysis[] = []
  const articleLinks: string[] = []

  // 提取文章链接
  $('a').each((_, el) => {
    const href = $(el).attr('href')
    if (href) {
      // 过滤出可能的文章链接
      if (href.includes('/blog/') || href.includes('/article/') ||
          href.includes('/post/') || href.includes('/news/')) {
        const fullUrl = href.startsWith('http') ? href : `${config.url}${href}`
        if (!articleLinks.includes(fullUrl)) {
          articleLinks.push(fullUrl)
        }
      }
    }
  })

  console.log(`[CompetitorAnalyzer] 找到 ${articleLinks.length} 个文章链接`)

  // 分析前20篇文章（避免请求过多）
  const linksToAnalyze = articleLinks.slice(0, 20)

  for (const link of linksToAnalyze) {
    // 添加延迟避免被封
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

    const analysis = await analyzeArticle(link, config.name)
    if (analysis && analysis.title) {
      articles.push(analysis)
      console.log(`  ✓ ${analysis.title.substring(0, 50)}...`)
    }
  }

  // 统计关键词频率
  const keywordCounts: Record<string, number> = {}
  articles.forEach(article => {
    article.keywords.forEach(kw => {
      keywordCounts[kw] = (keywordCounts[kw] || 0) + 1
    })
  })

  const topKeywords = Object.entries(keywordCounts)
    .map(([keyword, count]) => ({ keyword, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20)

  // 生成SEO建议
  const recommendations = generateSEORecommendations(articles, topKeywords)

  return {
    competitor: config.name,
    scrapedAt: new Date(),
    totalArticles: articles.length,
    articles,
    topKeywords,
    seoRecommendations: recommendations,
  }
}

/**
 * 生成SEO优化建议
 */
function generateSEORecommendations(
  articles: ArticleAnalysis[],
  topKeywords: { keyword: string; count: number }[]
): string[] {
  const recommendations: string[] = []

  // 基于文章数量的建议
  if (articles.length > 50) {
    recommendations.push('竞争对手有大量内容，建议增加博客文章数量到100+篇')
  }

  // 基于关键词的建议
  const highFreqKeywords = topKeywords.filter(k => k.count >= 3).map(k => k.keyword)
  if (highFreqKeywords.length > 0) {
    recommendations.push(`热门关键词: ${highFreqKeywords.join(', ')} - 建议在文章中覆盖这些关键词`)
  }

  // 基于内容结构的建议
  const avgHeadings = articles.reduce((sum, a) => sum + a.headings.length, 0) / articles.length
  if (avgHeadings > 5) {
    recommendations.push('竞争对手文章结构完善，建议每篇文章包含5-10个H2/H3标题')
  }

  // 基于字数的建议
  const avgWordCount = articles.reduce((sum, a) => sum + (a.wordCount || 0), 0) / articles.length
  if (avgWordCount > 1000) {
    recommendations.push(`竞争对手平均字数${Math.round(avgWordCount)}字，建议每篇文章不少于1000字`)
  }

  // 通用建议
  recommendations.push('定期更新内容，保持博客活跃度')
  recommendations.push('添加内部链接，提高网站结构')
  recommendations.push('优化meta标题和描述，包含目标关键词')
  recommendations.push('添加结构化数据（Schema.org）')
  recommendations.push('确保移动端友好和页面加载速度')

  return recommendations
}

/**
 * 分析所有竞争对手
 */
export async function analyzeAllCompetitors(): Promise<CompetitorReport[]> {
  const reports: CompetitorReport[] = []

  for (const competitor of COMPETITORS.filter(c => c.enabled)) {
    try {
      const report = await analyzeCompetitor(competitor)
      if (report) {
        reports.push(report)
      }
    } catch (error: any) {
      console.error(`[CompetitorAnalyzer] 分析 ${competitor.name} 失败:`, error.message)
    }

    // 竞争对手之间添加延迟
    await new Promise(resolve => setTimeout(resolve, 5000))
  }

  return reports
}

/**
 * 基于竞争对手分析生成文章建议
 */
export interface ArticleSuggestion {
  title: string
  slug: string
  targetKeywords: string[]
  outline: string[]
  priority: 'high' | 'medium' | 'low'
  reason: string
}

export function generateArticleSuggestions(reports: CompetitorReport[]): ArticleSuggestion[] {
  const suggestions: ArticleSuggestion[] = []

  // 收集所有竞争对手的热门主题
  const allTitles = reports.flatMap(r => r.articles.map(a => a.title.toLowerCase()))
  const allKeywords = reports.flatMap(r => r.topKeywords.map(k => k.keyword))

  // 常见文章主题模板
  const topicTemplates = [
    {
      title: 'Telegram {年份}最新版下载 - 全平台安装指南',
      keywords: ['telegram下载', 'telegram安装', 'telegram中文'],
      priority: 'high' as const,
    },
    {
      title: 'Telegram秘密聊天功能详解 - 端到端加密教程',
      keywords: ['秘密聊天', '端到端加密', 'telegram安全'],
      priority: 'high' as const,
    },
    {
      title: 'Telegram群组创建与管理完整指南',
      keywords: ['telegram群组', 'tg群', '群组管理'],
      priority: 'medium' as const,
    },
    {
      title: 'Telegram频道运营技巧 - 涨粉方法大全',
      keywords: ['telegram频道', '频道运营', 'telegram推广'],
      priority: 'medium' as const,
    },
    {
      title: 'Telegram机器人Bot使用教程',
      keywords: ['telegram机器人', 'telegram bot', 'tg机器人'],
      priority: 'medium' as const,
    },
    {
      title: 'Telegram代理设置教程 - 解决连接问题',
      keywords: ['telegram代理', 'mtproto', 'telegram翻墙'],
      priority: 'high' as const,
    },
    {
      title: 'Telegram vs WhatsApp对比 - 哪个更安全',
      keywords: ['telegram对比', 'telegram vs whatsapp', '即时通讯'],
      priority: 'medium' as const,
    },
    {
      title: 'Telegram Premium会员功能详解',
      keywords: ['telegram premium', 'telegram会员', 'tg会员'],
      priority: 'low' as const,
    },
    {
      title: '中文纸飞机下载 - Telegram安卓APK下载',
      keywords: ['中文纸飞机下载', '纸飞机apk', 'telegram安卓'],
      priority: 'high' as const,
    },
    {
      title: 'Telegram电脑版下载安装 - Windows/Mac教程',
      keywords: ['telegram电脑版', 'telegram windows', 'telegram mac'],
      priority: 'high' as const,
    },
  ]

  // 根据模板生成建议
  topicTemplates.forEach(template => {
    const title = template.title.replace('{年份}', new Date().getFullYear().toString())
    const slug = title
      .toLowerCase()
      .replace(/[^\u4e00-\u9fa5a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    // 检查竞争对手是否已有类似文章
    const hasCompetitorContent = allTitles.some(t =>
      template.keywords.some(k => t.includes(k.toLowerCase()))
    )

    suggestions.push({
      title,
      slug,
      targetKeywords: template.keywords,
      outline: [
        '引言',
        '主要内容',
        '详细步骤',
        '常见问题',
        '总结',
      ],
      priority: template.priority,
      reason: hasCompetitorContent
        ? '竞争对手已有相关内容，需要更优质的文章'
        : '关键词领域空缺，机会较大',
    })
  })

  // 根据优先级排序
  suggestions.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  return suggestions
}

/**
 * 导出分析报告为Markdown
 */
export function exportReportAsMarkdown(reports: CompetitorReport[]): string {
  let md = `# 竞争对手SEO分析报告\n\n`
  md += `生成时间: ${new Date().toLocaleString('zh-CN')}\n\n`

  for (const report of reports) {
    md += `## ${report.competitor}\n\n`
    md += `- 分析时间: ${report.scrapedAt.toLocaleString('zh-CN')}\n`
    md += `- 文章总数: ${report.totalArticles}\n\n`

    md += `### 热门关键词\n\n`
    report.topKeywords.slice(0, 10).forEach(k => {
      md += `- ${k.keyword} (${k.count}次)\n`
    })

    md += `\n### SEO建议\n\n`
    report.seoRecommendations.forEach(r => {
      md += `- ${r}\n`
    })

    md += `\n### 文章列表\n\n`
    report.articles.slice(0, 10).forEach(a => {
      md += `- [${a.title}](${a.url})\n`
    })

    md += `\n---\n\n`
  }

  return md
}
