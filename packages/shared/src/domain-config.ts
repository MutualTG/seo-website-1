/**
 * 多域名蜘蛛池配置系统
 * 每个域名配置不同的标签关键词，实现内容差异化，优化SEO
 */

export interface DomainConfig {
  domain: string
  siteName: string
  siteDescription: string
  // 主要关注的标签（文章标签匹配优先级）
  primaryTags: string[]
  // 次要标签（备用）
  secondaryTags: string[]
  // 是否为主域名
  isPrimary?: boolean
  // 绑定的网站ID（website1, website2, websiteTg）
  websiteId: 'website1' | 'website2' | 'websiteTg'
}

/**
 * 域名配置映射表
 * 根据实际购买的域名进行配置
 */
export const domainConfigs: DomainConfig[] = [
  // ========== Website-1 域名组 (SEO主题) ==========
  {
    domain: 'localhost:3001', // 开发环境
    siteName: 'SEO优化平台',
    siteDescription: '专业的SEO优化与内容营销平台',
    primaryTags: ['seo', 'optimization'],
    secondaryTags: ['content marketing', 'best practices'],
    isPrimary: true,
    websiteId: 'website1',
  },
  // 示例：可添加更多website-1的域名
  // {
  //   domain: 'seo-tools.com',
  //   siteName: 'SEO工具箱',
  //   siteDescription: 'SEO优化工具与教程',
  //   primaryTags: ['seo', 'tools', 'optimization'],
  //   secondaryTags: ['ranking', 'analytics'],
  //   websiteId: 'website1',
  // },
  // {
  //   domain: 'content-marketing-hub.com',
  //   siteName: '内容营销中心',
  //   siteDescription: '内容营销策略与分发',
  //   primaryTags: ['content marketing', 'distribution', 'content syndication'],
  //   secondaryTags: ['seo', 'reach'],
  //   websiteId: 'website1',
  // },

  // ========== Website-2 域名组 (Telegram功能教程) ==========
  {
    domain: 'localhost:3002',
    siteName: 'Telegram中文官网',
    siteDescription: 'Telegram中文版下载、使用教程与功能介绍',
    primaryTags: ['telegram', 'telegram中文', 'tg'],
    secondaryTags: ['telegram功能', 'telegram下载'],
    isPrimary: true,
    websiteId: 'website2',
  },
  {
    domain: 'tg-download-cn.com', // 示例域名
    siteName: 'TG下载中心',
    siteDescription: 'Telegram中文版官方下载',
    primaryTags: ['telegram下载', 'tg下载', '纸飞机下载'],
    secondaryTags: ['telegram安装', 'telegram中文'],
    websiteId: 'website2',
  },
  {
    domain: 'telegram-features.net', // 示例域名
    siteName: 'Telegram功能大全',
    siteDescription: 'Telegram功能介绍与使用技巧',
    primaryTags: ['telegram功能', 'tg功能', 'telegram特点'],
    secondaryTags: ['telegram主题', 'telegram收藏夹', 'telegram画中画'],
    websiteId: 'website2',
  },
  {
    domain: 'tg-tips.org', // 示例域名
    siteName: 'TG使用技巧',
    siteDescription: 'Telegram实用技巧与设置教程',
    primaryTags: ['telegram免打扰', 'telegram主题', 'telegram收藏夹'],
    secondaryTags: ['telegram通知设置', 'tg主题', 'telegram个性化'],
    websiteId: 'website2',
  },
  {
    domain: 'telegram-vs-wechat.com', // 示例域名
    siteName: 'Telegram对比微信',
    siteDescription: 'Telegram与微信功能对比分析',
    primaryTags: ['telegram对比', 'tg vs wechat', '微信'],
    secondaryTags: ['telegram', 'telegram功能'],
    websiteId: 'website2',
  },
  {
    domain: 'tg-account-help.com', // 示例域名
    siteName: 'TG账号帮助',
    siteDescription: 'Telegram账号登录与恢复教程',
    primaryTags: ['telegram手机号', 'telegram登录', 'telegram恢复账号'],
    secondaryTags: ['tg手机号停用', 'telegram中文'],
    websiteId: 'website2',
  },

  // ========== Website-TG 域名组 (Telegram综合) ==========
  {
    domain: 'localhost:3003',
    siteName: 'TG中文纸飞机',
    siteDescription: 'Telegram中文版官方网站 - 下载、教程、功能介绍',
    primaryTags: ['telegram', 'tg', 'telegram中文', '什么是telegram'],
    secondaryTags: ['telegram下载', 'telegram功能'],
    isPrimary: true,
    websiteId: 'websiteTg',
  },
  {
    domain: 'telegram-chinese.com', // 示例域名
    siteName: 'Telegram中文网',
    siteDescription: 'Telegram中文版完整指南',
    primaryTags: ['telegram中文版', 'tg中文', '电报中文'],
    secondaryTags: ['telegram是什么', 'telegram'],
    websiteId: 'websiteTg',
  },
  {
    domain: 'zhifeiji-cn.com', // 示例域名
    siteName: '纸飞机中文站',
    siteDescription: '纸飞机（Telegram）中文教程',
    primaryTags: ['纸飞机下载', 'telegram', 'tg'],
    secondaryTags: ['telegram中文', 'telegram下载'],
    websiteId: 'websiteTg',
  },
]

/**
 * 根据当前域名获取配置
 */
export function getDomainConfig(hostname: string): DomainConfig | null {
  // 处理端口号
  const domain = hostname.toLowerCase()

  // 精确匹配
  let config = domainConfigs.find(c => c.domain.toLowerCase() === domain)

  // 如果没有精确匹配，尝试部分匹配（用于localhost:port）
  if (!config) {
    config = domainConfigs.find(c => domain.includes(c.domain.toLowerCase()))
  }

  // 如果还是没找到，返回对应websiteId的主域名配置
  if (!config && domain.includes('localhost')) {
    if (domain.includes('3001')) {
      config = domainConfigs.find(c => c.websiteId === 'website1' && c.isPrimary)
    } else if (domain.includes('3002')) {
      config = domainConfigs.find(c => c.websiteId === 'website2' && c.isPrimary)
    } else if (domain.includes('3003')) {
      config = domainConfigs.find(c => c.websiteId === 'websiteTg' && c.isPrimary)
    }
  }

  return config || null
}

/**
 * 获取某个网站的所有域名配置
 */
export function getDomainsByWebsite(
  websiteId: 'website1' | 'website2' | 'websiteTg'
): DomainConfig[] {
  return domainConfigs.filter(c => c.websiteId === websiteId)
}

/**
 * 获取推荐的文章标签（用于文章过滤）
 */
export function getRecommendedTags(hostname: string): string[] {
  const config = getDomainConfig(hostname)
  if (!config) return []

  return [...config.primaryTags, ...config.secondaryTags]
}

/**
 * 检查文章是否匹配域名标签
 * @param articleTags 文章的标签
 * @param hostname 当前域名
 * @returns 匹配分数（越高越相关）
 */
export function calculateTagMatchScore(
  articleTags: string[],
  hostname: string
): number {
  const config = getDomainConfig(hostname)
  if (!config) return 0

  let score = 0

  // 主要标签匹配：权重3
  for (const tag of articleTags) {
    if (config.primaryTags.some(pt => tag.toLowerCase().includes(pt.toLowerCase()))) {
      score += 3
    }
  }

  // 次要标签匹配：权重1
  for (const tag of articleTags) {
    if (config.secondaryTags.some(st => tag.toLowerCase().includes(st.toLowerCase()))) {
      score += 1
    }
  }

  return score
}
